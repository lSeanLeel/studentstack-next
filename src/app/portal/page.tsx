import Link from "next/link";
import { fredokaHeadline, jakartaSans, institutionalSerif } from "@/app/fonts";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getEliteAccessForUser, isEliteActive } from "@/lib/portal/entitlements";
import { ELITE_TOOLKIT_CATEGORIES } from "@/lib/portal/toolkit";
import { EliteGate } from "@/components/portal/EliteGate";

export default async function PortalHomePage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const access = await getEliteAccessForUser(supabase, user);
  const name =
    access.studentName ||
    (user.user_metadata?.full_name as string | undefined)?.trim() ||
    user.email?.split("@")[0] ||
    "there";

  if (!isEliteActive(access)) {
    return <EliteGate />;
  }

  return (
    <div className="space-y-8">
      <section>
        <p className={`text-[10px] font-black uppercase tracking-[0.22em] text-sky-600 ${jakartaSans.className}`}>
          StudentStack Elite
        </p>
        <h1 className={`mt-2 text-3xl font-semibold tracking-[-0.03em] text-slate-900 sm:text-4xl ${fredokaHeadline.className}`}>
          Welcome, {name}
        </h1>
        <p
          className={`ss-institutional mt-3 max-w-2xl text-[0.95rem] font-normal leading-relaxed text-slate-600 sm:text-base ${institutionalSerif.className}`}
        >
          Your private home for the AI toolkit and exclusive resources. Built for high schoolers, informed by how college
          students actually stay ahead in school.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <Link
          href="/portal/toolkit"
          className="rounded-[1.75rem] border border-slate-100 bg-white p-6 transition hover:-translate-y-0.5 hover:border-sky-100"
        >
          <p className="text-[11px] font-black uppercase tracking-[0.16em] text-sky-600">AI toolkit</p>
          <p className={`mt-2 text-2xl font-semibold text-slate-900 ${fredokaHeadline.className}`}>
            {ELITE_TOOLKIT_CATEGORIES.length} categories
          </p>
          <p className="mt-1 text-sm font-medium text-slate-500">
            Organization, notetaking, planning, studying, writing, research.
          </p>
        </Link>
        <Link
          href="/portal/resources"
          className="rounded-[1.75rem] border border-slate-100 bg-white p-6 transition hover:-translate-y-0.5 hover:border-sky-100"
        >
          <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[#ff6a00]">Resources</p>
          <p className={`mt-2 text-2xl font-semibold text-slate-900 ${fredokaHeadline.className}`}>Exclusive lists</p>
          <p className="mt-1 text-sm font-medium text-slate-500">
            Summer programs and opportunity shortlists for Elite students.
          </p>
        </Link>
      </section>
    </div>
  );
}
