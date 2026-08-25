import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { MembershipStatus, MembershipTier } from "./types";

export type EliteAccess = {
  tier: MembershipTier;
  status: MembershipStatus;
  parentEmail: string | null;
  studentName: string | null;
};

export function getServiceSupabase(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "";
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY || "";
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export async function getEliteAccessForUser(
  supabase: SupabaseClient,
  user: { id: string; email?: string | null }
): Promise<EliteAccess> {
  const email = (user.email || "").trim().toLowerCase();

  const { data: profile } = await supabase
    .from("profiles")
    .select("membership_tier, membership_status")
    .eq("id", user.id)
    .maybeSingle();

  if (profile?.membership_tier === "elite" && profile.membership_status === "active") {
    const { data: entitlement } = await supabase
      .from("elite_entitlements")
      .select("parent_email, student_name")
      .eq("student_email", email)
      .eq("status", "active")
      .maybeSingle();

    return {
      tier: "elite",
      status: "active",
      parentEmail: entitlement?.parent_email ?? null,
      studentName: entitlement?.student_name ?? null,
    };
  }

  if (email) {
    const { data: entitlement } = await supabase
      .from("elite_entitlements")
      .select("parent_email, student_name, status")
      .eq("student_email", email)
      .eq("status", "active")
      .maybeSingle();

    if (entitlement) {
      await supabase.from("profiles").upsert({
        id: user.id,
        email,
        membership_tier: "elite",
        membership_status: "active",
        full_name: entitlement.student_name,
      });

      return {
        tier: "elite",
        status: "active",
        parentEmail: entitlement.parent_email,
        studentName: entitlement.student_name,
      };
    }
  }

  return {
    tier: (profile?.membership_tier as MembershipTier) || "free",
    status: (profile?.membership_status as MembershipStatus) || "inactive",
    parentEmail: null,
    studentName: null,
  };
}

export function isEliteActive(access: EliteAccess) {
  return access.tier === "elite" && access.status === "active";
}

/** Convenience for API routes that only have a user id. */
export async function getPortalAccess(userId: string): Promise<{
  canAccessPortal: boolean;
  access: EliteAccess;
}> {
  const supabase = getServiceSupabase();
  const { data: userData } = await supabase.auth.admin.getUserById(userId);
  const user = userData?.user;
  if (!user) {
    return {
      canAccessPortal: false,
      access: { tier: "free", status: "inactive", parentEmail: null, studentName: null },
    };
  }
  const access = await getEliteAccessForUser(supabase, user);
  return { canAccessPortal: isEliteActive(access), access };
}
