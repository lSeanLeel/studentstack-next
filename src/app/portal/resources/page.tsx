import { fredokaHeadline, jakartaSans } from "@/app/fonts";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getEliteAccessForUser, isEliteActive } from "@/lib/portal/entitlements";
import { ELITE_RESOURCE_COLLECTIONS } from "@/lib/portal/resources";
import { EliteGate } from "@/components/portal/EliteGate";

export default async function PortalResourcesPage() {
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
        Resources
      </h1>
      <p className={`mt-2 max-w-2xl text-sm font-medium text-slate-600 sm:text-base ${jakartaSans.className}`}>
        Exclusive lists for Elite students: summer programs and sourced opportunities, kept practical for high schoolers.
      </p>

      <div className="mt-8 space-y-10">
        {ELITE_RESOURCE_COLLECTIONS.map((collection) => (
          <section key={collection.id}>
            <h2 className={`text-2xl font-semibold tracking-[-0.02em] text-slate-900 ${fredokaHeadline.className}`}>
              {collection.label}
            </h2>
            <p className={`mt-1 text-sm font-medium text-slate-600 ${jakartaSans.className}`}>{collection.summary}</p>
            <ul className="mt-4 space-y-3">
              {collection.items.map((item) => (
                <li key={item.id} className="rounded-[1.5rem] border border-slate-100 bg-white p-5">
                  <p className={`text-lg font-semibold text-slate-900 ${fredokaHeadline.className}`}>{item.title}</p>
                  <p className={`mt-1.5 text-sm font-medium leading-relaxed text-slate-600 ${jakartaSans.className}`}>
                    {item.blurb}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-sky-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-sky-700"
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
