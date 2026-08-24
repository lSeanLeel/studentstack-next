import { fredokaHeadline, jakartaSans } from "@/app/fonts";
import { getPortalMember } from "@/lib/portal/session";
import { ELITE_VAULT_COLLECTIONS } from "@/lib/portal/vault";
import { EliteGate } from "@/components/portal/EliteGate";

export default async function PortalVaultPage() {
  const member = await getPortalMember();
  if (!member) return null;
  if (!member.elite) return <EliteGate />;

  return (
    <div>
      <p className={`text-[10px] font-black uppercase tracking-[0.2em] text-[#ff6a00] ${jakartaSans.className}`}>
        High school opportunities
      </p>
      <h1 className={`mt-1 text-3xl font-semibold tracking-[-0.03em] text-slate-900 ${fredokaHeadline.className}`}>
        Super Opportunity & Admissions Vault
      </h1>
      <p className={`mt-2 max-w-2xl text-sm font-medium text-slate-600 sm:text-base ${jakartaSans.className}`}>
        A living board of summer programs, research, and competitive deadlines. Pair it with AI-for-school habits from
        the toolkit when you plan applications.
      </p>

      <div className="mt-8 space-y-10">
        {ELITE_VAULT_COLLECTIONS.map((collection) => (
          <section key={collection.id} id={collection.id} className="scroll-mt-24">
            <h2 className={`text-2xl font-semibold tracking-[-0.02em] text-slate-900 ${fredokaHeadline.className}`}>
              {collection.label}
            </h2>
            <p className={`mt-1 text-sm font-medium text-slate-600 ${jakartaSans.className}`}>{collection.summary}</p>
            <ul className="mt-4 space-y-3">
              {collection.items.map((item) => (
                <li
                  key={item.id}
                  className="rounded-[1.5rem] border-2 border-slate-100 bg-white p-5 shadow-[0_8px_0_0_rgba(15,23,42,0.04)]"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <p className={`text-lg font-semibold text-slate-900 ${fredokaHeadline.className}`}>{item.title}</p>
                    <span className="rounded-xl bg-sky-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-sky-700">
                      {item.selectivity.replace("-", " ")}
                    </span>
                  </div>
                  <p className={`mt-1.5 text-sm font-medium leading-relaxed text-slate-600 ${jakartaSans.className}`}>
                    {item.blurb}
                  </p>
                  {item.deadline ? (
                    <p className="mt-3 text-[11px] font-black uppercase tracking-[0.14em] text-[#ff6a00]">
                      Timeline · {item.deadline}
                    </p>
                  ) : null}
                  <div className="mt-3 flex flex-wrap gap-2">
                    {item.fit.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-xl bg-slate-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-600"
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
