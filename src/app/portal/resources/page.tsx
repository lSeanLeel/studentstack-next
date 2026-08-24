import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { fredokaHeadline, jakartaSans } from "@/app/fonts";
import { getPortalMember } from "@/lib/portal/session";
import { ELITE_RESOURCE_COLLECTIONS } from "@/lib/portal/resources";
import { EliteGate } from "@/components/portal/EliteGate";

export default async function PortalResourcesPage() {
  const member = await getPortalMember();
  if (!member) return null;
  if (!member.elite) return <EliteGate />;

  return (
    <div className="space-y-8">
      <header>
        <p className={`text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 ${jakartaSans.className}`}>
          High school
        </p>
        <h1 className={`mt-1 text-3xl font-semibold tracking-[-0.03em] text-slate-900 sm:text-4xl ${fredokaHeadline.className}`}>
          Resources
        </h1>
        <p className={`mt-2 max-w-2xl text-sm font-medium leading-relaxed text-slate-600 sm:text-base ${jakartaSans.className}`}>
          Curated advice and shortlists from college students: summers, opportunities, and what to do next. Pair these
          with the AI Toolkit when you plan your week.
        </p>
        <Link
          href="/portal/vault"
          className={`mt-4 inline-flex items-center gap-2 text-sm font-bold text-sky-700 hover:text-sky-900 ${jakartaSans.className}`}
        >
          Open Admissions Vault
          <ArrowRight className="h-4 w-4" aria-hidden />
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
                  className="rounded-[1.5rem] border-2 border-slate-100 bg-white p-5 transition hover:border-emerald-200"
                >
                  <p className={`text-lg font-semibold text-slate-900 ${fredokaHeadline.className}`}>{item.title}</p>
                  <p className={`mt-1.5 text-sm font-medium leading-relaxed text-slate-600 ${jakartaSans.className}`}>
                    {item.blurb}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-xl bg-emerald-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-700"
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
