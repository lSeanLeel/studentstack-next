import Link from "next/link";
import { fredokaHeadline, jakartaSans } from "@/app/fonts";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { PORTAL_COURSE_STUBS } from "@/lib/portal/content";

export default async function PortalHomePage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const name =
    (user?.user_metadata?.full_name as string | undefined)?.trim() ||
    user?.email?.split("@")[0] ||
    "there";

  let membershipTier = "free";
  let membershipStatus = "inactive";
  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("membership_tier, membership_status")
      .eq("id", user.id)
      .maybeSingle();
    if (profile) {
      membershipTier = profile.membership_tier ?? "free";
      membershipStatus = profile.membership_status ?? "inactive";
    }
  }

  const published = PORTAL_COURSE_STUBS.filter((c) => c.status === "published");

  return (
    <div className="space-y-8">
      <section>
        <p className={`text-[10px] font-black uppercase tracking-[0.22em] text-sky-600 ${jakartaSans.className}`}>
          Student portal
        </p>
        <h1 className={`mt-2 text-3xl font-semibold tracking-[-0.03em] text-slate-900 sm:text-4xl ${fredokaHeadline.className}`}>
          Welcome back, {name}
        </h1>
        <p className={`mt-3 max-w-2xl text-sm font-medium leading-relaxed text-slate-600 sm:text-base ${jakartaSans.className}`}>
          This is your home for membership, courses, and certification. Billing hooks are ready for Stripe keys when you
          plug them in.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-[1.75rem] border border-slate-100 bg-white p-5">
          <p className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">Membership</p>
          <p className={`mt-2 text-xl font-semibold text-slate-900 ${fredokaHeadline.className}`}>
            {membershipTier === "elite" ? "Elite" : "Free access"}
          </p>
          <p className="mt-1 text-sm font-medium text-slate-500">Status: {membershipStatus}</p>
          <Link href="/portal/membership" className="mt-4 inline-block text-sm font-bold text-sky-700 hover:text-sky-900">
            Manage membership
          </Link>
        </div>
        <div className="rounded-[1.75rem] border border-slate-100 bg-white p-5">
          <p className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">Courses</p>
          <p className={`mt-2 text-xl font-semibold text-slate-900 ${fredokaHeadline.className}`}>
            {published.length} ready
          </p>
          <p className="mt-1 text-sm font-medium text-slate-500">Stub catalog until content is published.</p>
          <Link href="/portal/courses" className="mt-4 inline-block text-sm font-bold text-sky-700 hover:text-sky-900">
            Browse courses
          </Link>
        </div>
        <div className="rounded-[1.75rem] border border-slate-100 bg-white p-5">
          <p className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">Certification</p>
          <p className={`mt-2 text-xl font-semibold text-slate-900 ${fredokaHeadline.className}`}>Track progress</p>
          <p className="mt-1 text-sm font-medium text-slate-500">Certificates issue when a course is completed.</p>
          <Link
            href="/portal/certification"
            className="mt-4 inline-block text-sm font-bold text-sky-700 hover:text-sky-900"
          >
            View certificates
          </Link>
        </div>
      </section>
    </div>
  );
}
