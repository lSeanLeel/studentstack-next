import { cookies } from "next/headers";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { DEMO_COOKIE, hasDemoCookieValue } from "@/lib/portal/demo-auth";
import {
  getEliteAccessForUser,
  isEliteActive,
  type EliteAccess,
} from "@/lib/portal/entitlements";

export type PortalMember = {
  kind: "demo" | "supabase";
  email: string;
  displayName: string;
  access: EliteAccess;
  /** Active paid membership (internal tier may still be stored as "elite" in Supabase). */
  isMember: boolean;
};

export async function hasDemoPortalSession() {
  const jar = await cookies();
  return hasDemoCookieValue(jar.get(DEMO_COOKIE)?.value);
}

export async function getPortalMember(): Promise<PortalMember | null> {
  if (await hasDemoPortalSession()) {
    return {
      kind: "demo",
      email: "test",
      displayName: "Test",
      access: {
        tier: "elite",
        status: "active",
        parentEmail: null,
        studentName: "Test",
      },
      isMember: true,
    };
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "";
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
  if (!url || !anon) return null;

  try {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return null;

    const access = await getEliteAccessForUser(supabase, user);
    const displayName =
      access.studentName ||
      (user.user_metadata?.full_name as string | undefined)?.trim() ||
      user.email?.split("@")[0] ||
      "there";

    return {
      kind: "supabase",
      email: user.email || "",
      displayName,
      access,
      isMember: isEliteActive(access),
    };
  } catch {
    return null;
  }
}
