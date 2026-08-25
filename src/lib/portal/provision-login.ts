import { getServiceSupabase } from "@/lib/portal/entitlements";
import { generateElitePortalPassword } from "@/lib/portal/password";
import { sendWelcomeCredentialsEmail } from "@/lib/email/welcome";

export { generateElitePortalPassword } from "@/lib/portal/password";

/**
 * Create or update the student auth user after membership payment.
 * Uses parent-chosen password when provided; otherwise generates one.
 * Sends welcome credentials email to the parent.
 */
export async function provisionEliteStudentLogin(opts: {
  entitlementId?: string | null;
  studentEmail: string;
  parentEmail?: string | null;
  studentName?: string | null;
  password?: string | null;
}) {
  const supabase = getServiceSupabase();
  const studentEmail = opts.studentEmail.trim().toLowerCase();
  const parentEmail = (opts.parentEmail || "").trim().toLowerCase() || null;
  const studentName = opts.studentName?.trim() || null;
  const origin = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000";

  let password = opts.password?.trim() || null;

  if (!password && opts.entitlementId) {
    const { data: pendingCred } = await supabase
      .from("elite_login_credentials")
      .select("temporary_password")
      .eq("entitlement_id", opts.entitlementId)
      .eq("delivered", false)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    password = pendingCred?.temporary_password || null;
  }

  if (!password) {
    password = generateElitePortalPassword();
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("id")
    .eq("email", studentEmail)
    .maybeSingle();

  let userId = profile?.id as string | undefined;

  if (userId) {
    await supabase.auth.admin.updateUserById(userId, {
      password,
      email_confirm: true,
      user_metadata: {
        full_name: studentName,
        parent_email: parentEmail,
        product: "studentstack_membership",
      },
    });
  } else {
    const { data: created, error } = await supabase.auth.admin.createUser({
      email: studentEmail,
      password,
      email_confirm: true,
      user_metadata: {
        full_name: studentName,
        parent_email: parentEmail,
        product: "studentstack_membership",
      },
    });

    if (error || !created.user) {
      await supabase.auth.admin.inviteUserByEmail(studentEmail, {
        data: {
          full_name: studentName,
          parent_email: parentEmail,
          product: "studentstack_membership",
        },
        redirectTo: `${origin}/login`,
      });
      return { temporaryPassword: null as string | null, userId: null as string | null, invited: true };
    }
    userId = created.user.id;
  }

  await supabase.from("profiles").upsert({
    id: userId,
    email: studentEmail,
    full_name: studentName,
    membership_tier: "elite",
    membership_status: "active",
  });

  const { data: existingCred } = opts.entitlementId
    ? await supabase
        .from("elite_login_credentials")
        .select("id")
        .eq("entitlement_id", opts.entitlementId)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle()
    : { data: null };

  if (existingCred?.id) {
    await supabase
      .from("elite_login_credentials")
      .update({
        student_email: studentEmail,
        parent_email: parentEmail,
        student_name: studentName,
        temporary_password: password,
        delivered: false,
      })
      .eq("id", existingCred.id);
  } else {
    await supabase.from("elite_login_credentials").insert({
      entitlement_id: opts.entitlementId || null,
      student_email: studentEmail,
      parent_email: parentEmail,
      student_name: studentName,
      temporary_password: password,
      delivered: false,
    });
  }

  let emailSent = false;
  if (parentEmail) {
    const result = await sendWelcomeCredentialsEmail({
      parentEmail,
      studentName: studentName || "your student",
      studentEmail,
      password,
      loginUrl: `${origin}/login`,
    });
    emailSent = result.sent;

    if (opts.entitlementId) {
      await supabase
        .from("elite_login_credentials")
        .update({ delivered: result.sent })
        .eq("entitlement_id", opts.entitlementId);
    }

    if (!result.sent) {
      await supabase.from("contact_messages").insert({
        name: studentName || "Membership parent",
        email: parentEmail,
        message: [
          "MEMBERSHIP LOGIN CREDENTIALS (deliver to parent)",
          `Student email (login): ${studentEmail}`,
          `Password: ${password}`,
          "Student signs in at /login. Ask them to change the password after first visit.",
        ].join("\n"),
      });
    }
  }

  return { temporaryPassword: password, userId, invited: false, emailSent };
}
