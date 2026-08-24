import { fredokaHeadline, jakartaSans } from "@/app/fonts";
import { getPortalMember } from "@/lib/portal/session";
import { ELITE_TOOLKIT_CATEGORIES } from "@/lib/portal/toolkit";
import { EliteGate } from "@/components/portal/EliteGate";

export default async function PortalToolkitPage() {
  const member = await getPortalMember();
  if (!member) return null;
  if (!member.elite) return <EliteGate />;

  return (
    <div>
      <p className={`text-[10px] font-black uppercase tracking-[0.2em] text-sky-600 ${jakartaSans.className}`}>
        AI literacy track
      </p>
      <h1 className={`mt-1 text-3xl font-semibold tracking-[-0.03em] text-slate-900 ${fredokaHeadline.className}`}>
        AI Toolkit
      </h1>
      <p className={`mt-2 max-w-2xl text-sm font-medium text-slate-600 sm:text-base ${jakartaSans.className}`}>
        Tools we use for school, and how we use them so AI sharpens your work instead of replacing it. Complete quests
        from Home to level this track.
      </p>

      <div className="mt-8 space-y-8">
        {ELITE_TOOLKIT_CATEGORIES.map((category) => (
          <section key={category.id} id={category.id} className="scroll-mt-24">
            <h2 className={`text-2xl font-semibold tracking-[-0.02em] text-slate-900 ${fredokaHeadline.className}`}>
              {category.label}
            </h2>
            <p className={`mt-1 text-sm font-medium text-slate-600 ${jakartaSans.className}`}>{category.summary}</p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {category.tools.map((tool) => (
                <li
                  key={tool.id}
                  className="rounded-[1.5rem] border-2 border-slate-100 bg-white p-5 shadow-[0_8px_0_0_rgba(15,23,42,0.04)] transition hover:-translate-y-0.5 hover:border-sky-200"
                >
                  <p className={`text-[10px] font-black uppercase tracking-[0.14em] text-sky-600 ${jakartaSans.className}`}>
                    {tool.product}
                  </p>
                  <p className={`mt-1 text-lg font-semibold text-slate-900 ${fredokaHeadline.className}`}>{tool.name}</p>
                  <p className={`mt-1.5 text-sm font-medium leading-relaxed text-slate-600 ${jakartaSans.className}`}>
                    {tool.blurb}
                  </p>
                  <p className={`mt-3 text-sm font-semibold leading-relaxed text-slate-800 ${jakartaSans.className}`}>
                    How we use it: {tool.howWeUse}
                  </p>
                  <p className="mt-3 text-[11px] font-black uppercase tracking-[0.14em] text-[#ff6a00]">
                    Best for · {tool.useCase}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
