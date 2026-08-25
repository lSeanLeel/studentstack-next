import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { fredokaHeadline, jakartaSans } from "@/app/fonts";
import { getPortalMember } from "@/lib/portal/session";
import { ELITE_CERT_MODULES } from "@/lib/portal/certifications";
import { MEMBER_PATHWAYS } from "@/lib/portal/pathways";
import { EliteGate } from "@/components/portal/EliteGate";
import { PortalBadge, PortalEyebrow, PortalLead, PortalPageTitle, PortalProgressBar } from "@/components/portal/portal-ui";

export default async function PortalCertificationsPage() {
  const member = await getPortalMember();
  if (!member) return null;
  if (!member.elite) return <EliteGate />;

  return (
    <div className="space-y-10">
      <header>
        <PortalEyebrow>Organization-issued</PortalEyebrow>
        <PortalPageTitle className="mt-1">Member pathways</PortalPageTitle>
        <PortalLead>
          Credentials and fluency tracks your student can work toward and attach to applications. Issued by StudentStack,
          maintained by our college team.
        </PortalLead>
      </header>

      <ul className="grid gap-4 sm:grid-cols-3">
        {MEMBER_PATHWAYS.map((path) => (
          <li
            key={path.id}
            className="rounded-[1.75rem] border-2 border-slate-200 bg-white p-5 shadow-[0_10px_0_0_rgba(15,23,42,0.05)]"
          >
            <PortalBadge accent={path.accent === "emerald" ? "emerald" : path.accent === "amber" ? "amber" : "sky"}>
              {path.partnerLabel}
            </PortalBadge>
            <p className={`mt-3 text-lg font-semibold text-slate-900 ${fredokaHeadline.className}`}>{path.title}</p>
            <p className={`mt-1 text-xs font-bold uppercase tracking-[0.12em] text-slate-400 ${jakartaSans.className}`}>
              {path.subtitle}
            </p>
            <div className="mt-3">
              <PortalProgressBar
                value={path.progress}
                accent={path.accent === "emerald" ? "emerald" : path.accent === "amber" ? "amber" : "sky"}
              />
            </div>
          </li>
        ))}
      </ul>

      <div className="space-y-8">
        {ELITE_CERT_MODULES.map((cert) => (
          <article
            key={cert.id}
            id={cert.id}
            className="scroll-mt-32 overflow-hidden rounded-[2rem] border-2 border-slate-200 bg-white shadow-[0_14px_0_0_rgba(15,23,42,0.06)]"
          >
            <div className="border-b-2 border-slate-100 bg-gradient-to-r from-amber-50 via-white to-sky-50 px-6 py-6 sm:px-8">
              <PortalBadge accent="amber">
                {cert.code} · {cert.priceLabel}
              </PortalBadge>
              <h2 className={`mt-3 text-2xl font-semibold tracking-[-0.02em] text-slate-900 sm:text-3xl ${fredokaHeadline.className}`}>
                {cert.title}
              </h2>
              <p className={`mt-2 text-sm font-semibold leading-relaxed text-emerald-800 ${jakartaSans.className}`}>
                {cert.collegeHook}
              </p>
            </div>
            <div className="px-6 py-6 sm:px-8">
              <p className={`text-sm font-medium leading-relaxed text-slate-600 ${jakartaSans.className}`}>
                {cert.overview}
              </p>
              <p className={`mt-2 text-sm font-semibold text-slate-800 ${jakartaSans.className}`}>{cert.tagline}</p>

              <ol className="mt-6 space-y-3">
                {cert.modules.map((mod, i) => (
                  <li
                    key={mod.title}
                    className="rounded-2xl border-2 border-slate-100 bg-[#f8fafc] px-4 py-4 transition hover:border-sky-200"
                  >
                    <p className={`text-[10px] font-black uppercase tracking-[0.14em] text-slate-400 ${jakartaSans.className}`}>
                      Step {i + 1} · {mod.minutes} min
                    </p>
                    <p className={`mt-1 font-semibold text-slate-900 ${fredokaHeadline.className}`}>{mod.title}</p>
                    <p className={`mt-1 text-xs font-medium text-slate-500 ${jakartaSans.className}`}>
                      Outcome: {mod.outcome}
                    </p>
                  </li>
                ))}
              </ol>

              <div className="mt-6 rounded-2xl border-2 border-orange-100 bg-orange-50/50 px-4 py-4">
                <p className={`text-[10px] font-black uppercase tracking-[0.14em] text-[#ff6a00] ${jakartaSans.className}`}>
                  Attach to
                </p>
                <ul className={`mt-2 space-y-1.5 text-sm font-medium text-slate-700 ${jakartaSans.className}`}>
                  {cert.badgeUse.map((use) => (
                    <li key={use}>· {use}</li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </div>

      <Link
        href="/portal/message"
        className={`inline-flex items-center gap-2 text-sm font-bold text-sky-700 hover:text-sky-900 ${jakartaSans.className}`}
      >
        Ask the team about pathways
        <ArrowRight className="h-4 w-4" aria-hidden />
      </Link>
    </div>
  );
}
