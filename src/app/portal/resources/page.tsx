import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { fredokaHeadline, jakartaSans } from "@/app/fonts";
import { getPortalMember } from "@/lib/portal/session";
import { MEMBER_RESOURCE_COLLECTIONS, resourceSelectivityLabel } from "@/lib/portal/resources";
import { MemberGate } from "@/components/portal/MemberGate";
import { PortalEyebrow, PortalLead, PortalPageTitle } from "@/components/portal/portal-ui";

const selectivityTone = {
  open: "border-emerald-200 bg-emerald-50 text-emerald-800",
  selective: "border-amber-200 bg-amber-50 text-amber-900",
  "highly selective": "border-rose-200 bg-rose-50 text-rose-800",
} as const;

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
          Summer programs, competitions, and deadlines from college students who went through this recently. Facts first
          — no click-to-find-out-the-deadline cards.
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
        {MEMBER_RESOURCE_COLLECTIONS.map((collection) => (
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
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <p className={`text-lg font-semibold text-slate-900 ${fredokaHeadline.className}`}>{item.title}</p>
                      <p className={`mt-1.5 text-sm font-medium leading-relaxed text-slate-600 ${jakartaSans.className}`}>
                        {item.blurb}
                      </p>
                    </div>
                    <span
                      className={`shrink-0 rounded-xl border px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.1em] ${selectivityTone[item.selectivity]} ${jakartaSans.className}`}
                    >
                      {resourceSelectivityLabel(item.selectivity)}
                    </span>
                  </div>

                  <dl className={`mt-4 grid gap-2 text-sm sm:grid-cols-3 ${jakartaSans.className}`}>
                    <div className="rounded-xl bg-slate-50 px-3 py-2">
                      <dt className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-400">Deadline</dt>
                      <dd className="mt-0.5 font-bold text-slate-800">{item.deadline}</dd>
                    </div>
                    <div className="rounded-xl bg-slate-50 px-3 py-2">
                      <dt className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-400">Cost</dt>
                      <dd className="mt-0.5 font-bold text-slate-800">{item.cost}</dd>
                    </div>
                    <div className="rounded-xl bg-slate-50 px-3 py-2">
                      <dt className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-400">Apply</dt>
                      <dd className="mt-0.5">
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-bold text-sky-700 hover:text-sky-900"
                        >
                          Official site
                          <ExternalLink className="h-3 w-3" aria-hidden />
                        </a>
                      </dd>
                    </div>
                  </dl>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`rounded-xl border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-emerald-800 ${jakartaSans.className}`}
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
