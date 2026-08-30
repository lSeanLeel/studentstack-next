import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { fredokaHeadline, jakartaSans } from "@/app/fonts";
import { getPortalMember } from "@/lib/portal/session";
import { MEMBER_RESOURCE_COLLECTIONS, resourceSelectivityLabel } from "@/lib/portal/resources";
import { MemberGate } from "@/components/portal/MemberGate";
import { PortalBadge, PortalEyebrow, PortalLead, PortalPageTitle, portalCard } from "@/components/portal/portal-ui";

const selectivityTone = {
  open: "emerald" as const,
  selective: "amber" as const,
  "highly selective": "orange" as const,
};

export default async function PortalResourcesPage() {
  const member = await getPortalMember();
  if (!member) return null;
  if (!member.isMember) return <MemberGate />;

  return (
    <div className="space-y-10">
      <header>
        <PortalEyebrow>Member-only</PortalEyebrow>
        <PortalPageTitle className="mt-1">Resources</PortalPageTitle>
        <PortalLead>
          Summer programs, competitions, and deadlines — facts first, no click-to-find-out-the-deadline cards.
        </PortalLead>
        <Link
          href="/portal/vault"
          className={`mt-4 inline-flex items-center gap-2 rounded-full bg-[#f5f5f7] px-4 py-2.5 text-sm font-semibold text-slate-700 ring-1 ring-black/[0.06] transition hover:bg-white hover:ring-sky-200/60 ${jakartaSans.className}`}
        >
          Admissions Vault
          <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </Link>
      </header>

      <div className="space-y-10">
        {MEMBER_RESOURCE_COLLECTIONS.map((collection) => (
          <section key={collection.id}>
            <h2 className={`text-2xl font-semibold tracking-[-0.02em] text-slate-900 ${fredokaHeadline.className}`}>
              {collection.label}
            </h2>
            <p className={`mt-1 text-sm font-medium text-slate-500 ${jakartaSans.className}`}>{collection.summary}</p>
            <ul className="mt-4 space-y-3">
              {collection.items.map((item) => (
                <li key={item.id} className={`${portalCard} p-5 transition duration-300 hover:ring-emerald-200/50`}>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <p className={`text-lg font-semibold text-slate-900 ${fredokaHeadline.className}`}>{item.title}</p>
                      <p className={`mt-1.5 text-sm font-medium leading-relaxed text-slate-500 ${jakartaSans.className}`}>
                        {item.blurb}
                      </p>
                    </div>
                    <PortalBadge accent={selectivityTone[item.selectivity]}>
                      {resourceSelectivityLabel(item.selectivity)}
                    </PortalBadge>
                  </div>

                  <dl className={`mt-4 grid gap-2 text-sm sm:grid-cols-3 ${jakartaSans.className}`}>
                    <div className="rounded-xl bg-[#f5f5f7] px-3 py-2 ring-1 ring-black/[0.04]">
                      <dt className={`text-[11px] font-semibold text-slate-400 ${jakartaSans.className}`}>Deadline</dt>
                      <dd className="mt-0.5 font-semibold text-slate-800">{item.deadline}</dd>
                    </div>
                    <div className="rounded-xl bg-[#f5f5f7] px-3 py-2 ring-1 ring-black/[0.04]">
                      <dt className={`text-[11px] font-semibold text-slate-400 ${jakartaSans.className}`}>Cost</dt>
                      <dd className="mt-0.5 font-semibold text-slate-800">{item.cost}</dd>
                    </div>
                    <div className="rounded-xl bg-[#f5f5f7] px-3 py-2 ring-1 ring-black/[0.04]">
                      <dt className={`text-[11px] font-semibold text-slate-400 ${jakartaSans.className}`}>Apply</dt>
                      <dd className="mt-0.5">
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-semibold text-sky-600 hover:text-sky-700"
                        >
                          Official site
                          <ExternalLink className="h-3 w-3" aria-hidden />
                        </a>
                      </dd>
                    </div>
                  </dl>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <PortalBadge key={tag} accent="emerald">
                        {tag}
                      </PortalBadge>
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
