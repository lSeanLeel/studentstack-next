import { fredokaHeadline, jakartaSans } from "@/app/fonts";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getEliteAccessForUser, isEliteActive } from "@/lib/portal/entitlements";
import { ELITE_TOOLKIT_CATEGORIES } from "@/lib/portal/toolkit";
import { EliteGate } from "@/components/portal/EliteGate";

export default async function PortalToolkitPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const access = await getEliteAccessForUser(supabase, user);
  if (!isEliteActive(access)) return <EliteGate />;

  return (
    <div>
      <h1 className={`text-3xl font-semibold tracking-[-0.03em] text-slate-900 ${fredokaHeadline.className}`}>
        AI Toolkit
      </h1>
      <p className={`mt-2 max-w-2xl text-sm font-medium text-slate-600 sm:text-base ${jakartaSans.className}`}>
        The AI tools we use and how we use them for school. Prompt the Home AI desk for a daily toolkit tip that matches
        your week.
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
                <li key={tool.id} className="rounded-[1.5rem] border border-slate-100 bg-white p-5">
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
