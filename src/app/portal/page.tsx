import Link from "next/link";
import { fredokaHeadline, jakartaSans, institutionalSerif } from "@/app/fonts";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getEliteAccessForUser, isEliteActive } from "@/lib/portal/entitlements";
import { ELITE_TOOLKIT_CATEGORIES } from "@/lib/portal/toolkit";
import { ELITE_CERT_MODULES } from "@/lib/portal/certifications";
import { EliteGate } from "@/components/portal/EliteGate";
import { PortalDailyUpdateDesk } from "@/components/portal/PortalDailyUpdateDesk";

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
          Your portal for the AI Toolkit, Admissions Vault, and organization-issued certifications. Prompt the AI desk
          anytime for today&apos;s briefing.
        </p>
      </section>

      <PortalDailyUpdateDesk />

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Link
          href="/portal/toolkit"
          className="rounded-[1.75rem] border border-slate-100 bg-white p-6 transition hover:-translate-y-0.5 hover:border-sky-100"
        >
          <p className="text-[11px] font-black uppercase tracking-[0.16em] text-sky-600">AI toolkit</p>
          <p className={`mt-2 text-2xl font-semibold text-slate-900 ${fredokaHeadline.className}`}>
            {ELITE_TOOLKIT_CATEGORIES.length} categories
          </p>
          <p className="mt-1 text-sm font-medium text-slate-500">Tools we use and how we use them.</p>
        </Link>
        <Link
          href="/portal/vault"
          className="rounded-[1.75rem] border border-slate-100 bg-white p-6 transition hover:-translate-y-0.5 hover:border-sky-100"
        >
          <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[#ff6a00]">Admissions Vault</p>
          <p className={`mt-2 text-2xl font-semibold text-slate-900 ${fredokaHeadline.className}`}>Live board</p>
          <p className="mt-1 text-sm font-medium text-slate-500">Summer programs, research, deadlines.</p>
        </Link>
        <Link
          href="/portal/certifications"
          className="rounded-[1.75rem] border border-slate-100 bg-white p-6 transition hover:-translate-y-0.5 hover:border-sky-100 sm:col-span-2 lg:col-span-1"
        >
          <p className="text-[11px] font-black uppercase tracking-[0.16em] text-emerald-600">Certifications</p>
          <p className={`mt-2 text-2xl font-semibold text-slate-900 ${fredokaHeadline.className}`}>
            {ELITE_CERT_MODULES.length} modules
          </p>
          <p className="mt-1 text-sm font-medium text-slate-500">SS-AIS and SS-ACR for college apps.</p>
        </Link>
      </section>
    </div>
  );
}
