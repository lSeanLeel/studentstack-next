import { fredokaHeadline, jakartaSans } from "@/app/fonts";
import { getPortalMember } from "@/lib/portal/session";
import { ELITE_CERT_MODULES } from "@/lib/portal/certifications";
import { EliteGate } from "@/components/portal/EliteGate";

export default async function PortalCertificationsPage() {
  const member = await getPortalMember();
  if (!member) return null;
  if (!member.elite) return <EliteGate />;

  return (
    <div>
      <p className={`text-[10px] font-black uppercase tracking-[0.2em] text-sky-600 ${jakartaSans.className}`}>
        AI literacy milestones
      </p>
      <h1 className={`mt-1 text-3xl font-semibold tracking-[-0.03em] text-slate-900 ${fredokaHeadline.className}`}>
        Organization-issued AI certifications
      </h1>
      <p className={`mt-2 max-w-2xl text-sm font-medium text-slate-600 sm:text-base ${jakartaSans.className}`}>
        Complete modules, earn StudentStack digital badges, and attach them to college applications. Proof you learned
        AI for school the right way.
      </p>

      <div className="mt-8 space-y-8">
        {ELITE_CERT_MODULES.map((cert) => (
          <article
            key={cert.id}
            id={cert.id}
            className="scroll-mt-24 overflow-hidden rounded-[1.75rem] border-2 border-slate-100 bg-white shadow-[0_10px_0_0_rgba(15,23,42,0.05)]"
          >
            <div className="border-b border-slate-100 bg-gradient-to-r from-sky-50 to-white px-6 py-5 sm:px-8">
              <p className={`text-[10px] font-black uppercase tracking-[0.18em] text-sky-600 ${jakartaSans.className}`}>
                {cert.code} · {cert.priceLabel}
              </p>
              <h2 className={`mt-1 text-2xl font-semibold tracking-[-0.02em] text-slate-900 ${fredokaHeadline.className}`}>
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
                  <li key={mod.title} className="rounded-2xl border border-slate-100 bg-[#f8fafc] px-4 py-3.5">
                    <p className={`text-[10px] font-black uppercase tracking-[0.14em] text-slate-400 ${jakartaSans.className}`}>
                      Module {i + 1} · {mod.minutes} min
                    </p>
                    <p className={`mt-1 font-semibold text-slate-900 ${fredokaHeadline.className}`}>{mod.title}</p>
                    <p className={`mt-1 text-xs font-medium text-slate-500 ${jakartaSans.className}`}>
                      Outcome: {mod.outcome}
                    </p>
                  </li>
                ))}
              </ol>

              <div className="mt-6">
                <p className={`text-[10px] font-black uppercase tracking-[0.14em] text-[#ff6a00] ${jakartaSans.className}`}>
                  Attach to
                </p>
                <ul className={`mt-2 space-y-1.5 text-sm font-medium text-slate-600 ${jakartaSans.className}`}>
                  {cert.badgeUse.map((use) => (
                    <li key={use}>· {use}</li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
