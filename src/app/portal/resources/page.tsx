import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { fredokaHeadline, jakartaSans } from "@/app/fonts";
import { getPortalMember } from "@/lib/portal/session";
import { ELITE_RESOURCE_COLLECTIONS } from "@/lib/portal/resources";
import { EliteGate } from "@/components/portal/EliteGate";
import { PortalEyebrow, PortalLead, PortalPageTitle } from "@/components/portal/portal-ui";

export default async function PortalResourcesPage() {
  const member = await getPortalMember();
  if (!member) return null;
  if (!member.elite) return <EliteGate />;

  return (
    <div className="space-y-10">
      <header>
        <PortalEyebrow>Member-only</PortalEyebrow>
        <PortalPageTitle className="mt-1">Resources</PortalPageTitle>
        <PortalLead>
          High school advice and shortlists from college students ahead of your student. Pair with the AI Toolkit when
          you plan your week.
        </PortalLead>
        <Link
          href="/portal/vault"
          className={`mt-4 inline-flex items-center gap-2 rounded-2xl border-2 border-slate-200 bg-white px-4 py-2.5 text-xs font-black uppercase tracking-[0.12em] text-slate-700 shadow-[0_6px_0_0_rgba(15,23,42,0.06)] transition hover:border-sky-200 hover:text-sky-800 ${jakartaSans.className}`}
        >
          Admissions Vault
          <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </Link>
      </header>

      <div className="space-y-10">
        {ELITE_RESOURCE_COLLECTIONS.map((collection) => (
          <section key={collection.id}>
            <h2 className={`text-2xl font-semibold tracking-[-0.02em] text-slate-900 ${fredokaHeadline.className}`}>
              {collection.label}
            </h2>
            <p className={`mt-1 text-sm font-medium text-slate-600 ${jakartaSans.className}`}>{collection.summary}</p>
            <ul className="mt-4 space-y-3">
              {collection.items.map((item) => (
                <li
                  key={item.id}
                  className="rounded-[1.5rem] border-2 border-slate-200 bg-white p-5 shadow-[0_8px_0_0_rgba(15,23,42,0.04)] transition hover:border-emerald-200"
                >
                  <p className={`text-lg font-semibold text-slate-900 ${fredokaHeadline.className}`}>{item.title}</p>
                  <p className={`mt-1.5 text-sm font-medium leading-relaxed text-slate-600 ${jakartaSans.className}`}>
                    {item.blurb}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`rounded-xl border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-800 ${jakartaSans.className}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
