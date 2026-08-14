import { getServiceSupabase } from "@/lib/portal/entitlements";
import { generateElitePortalPassword } from "@/lib/portal/password";

export { generateElitePortalPassword } from "@/lib/portal/password";

/**
 * Create or update the student auth user with a unique password after Elite purchase.
 * Stores a deliverable credential row for parent/ops follow-up.
 */
export async function provisionEliteStudentLogin(opts: {
  entitlementId?: string | null;
  studentEmail: string;
  parentEmail?: string | null;
  studentName?: string | null;
}) {
  const supabase = getServiceSupabase();
  const studentEmail = opts.studentEmail.trim().toLowerCase();
  const parentEmail = (opts.parentEmail || "").trim().toLowerCase() || null;
  const studentName = opts.studentName?.trim() || null;
  const temporaryPassword = generateElitePortalPassword();
  const origin = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000";

  const { data: profile } = await supabase
    .from("profiles")
    .select("id")
    .eq("email", studentEmail)
    .maybeSingle();

  let userId = profile?.id as string | undefined;

  if (userId) {
    await supabase.auth.admin.updateUserById(userId, {
      password: temporaryPassword,
      email_confirm: true,
      user_metadata: {
        full_name: studentName,
        parent_email: parentEmail,
        product: "studentstack_elite",
      },
    });
  } else {
    const { data: created, error } = await supabase.auth.admin.createUser({
      email: studentEmail,
      password: temporaryPassword,
      email_confirm: true,
      user_metadata: {
        full_name: studentName,
        parent_email: parentEmail,
        product: "studentstack_elite",
      },
    });

    if (error || !created.user) {
      await supabase.auth.admin.inviteUserByEmail(studentEmail, {
        data: {
          full_name: studentName,
          parent_email: parentEmail,
          product: "studentstack_elite",
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

  await supabase.from("elite_login_credentials").insert({
    entitlement_id: opts.entitlementId || null,
    student_email: studentEmail,
    parent_email: parentEmail,
    student_name: studentName,
    temporary_password: temporaryPassword,
    delivered: false,
  });

  if (parentEmail) {
    await supabase.from("contact_messages").insert({
      name: studentName || "Elite parent",
      email: parentEmail,
      message: [
        "ELITE LOGIN CREDENTIALS (deliver to parent)",
        `Student email (login): ${studentEmail}`,
        `Temporary password: ${temporaryPassword}`,
        "Student signs in at /login. Ask them to change the password after first visit.",
      ].join("\n"),
    });
  }

  return { temporaryPassword, userId, invited: false };
}
