import { fredokaHeadline, jakartaSans } from "@/app/fonts";
import { getPortalMember } from "@/lib/portal/session";
import { MEMBER_VAULT_COLLECTIONS } from "@/lib/portal/vault";
import { MemberGate } from "@/components/portal/MemberGate";
import { PortalBadge, PortalEyebrow, PortalLead, PortalPageTitle, portalCard } from "@/components/portal/portal-ui";

export default async function PortalVaultPage() {
  const member = await getPortalMember();
  if (!member) return null;
  if (!member.isMember) return <MemberGate />;

  return (
    <div className="space-y-8">
      <header>
        <PortalEyebrow className="text-orange-600">Opportunities</PortalEyebrow>
        <PortalPageTitle className="mt-1">Admissions Vault</PortalPageTitle>
        <PortalLead>
          Summer programs, research, and competitive deadlines. Use Resources for advice, then shortlist here.
        </PortalLead>
      </header>

      <div className="space-y-10">
        {MEMBER_VAULT_COLLECTIONS.map((collection) => (
          <section key={collection.id} id={collection.id} className="scroll-mt-24">
            <h2 className={`text-2xl font-semibold tracking-[-0.02em] text-slate-900 ${fredokaHeadline.className}`}>
              {collection.label}
            </h2>
            <p className={`mt-1 text-sm font-medium text-slate-500 ${jakartaSans.className}`}>{collection.summary}</p>
            <ul className="mt-4 space-y-3">
              {collection.items.map((item) => (
                <li key={item.id} className={`${portalCard} p-5 transition duration-300 hover:ring-orange-200/50`}>
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <p className={`text-lg font-semibold text-slate-900 ${fredokaHeadline.className}`}>{item.title}</p>
                    <PortalBadge accent="sky">{item.selectivity.replace("-", " ")}</PortalBadge>
                  </div>
                  <p className={`mt-1.5 text-sm font-medium leading-relaxed text-slate-500 ${jakartaSans.className}`}>
                    {item.blurb}
                  </p>
                  {item.deadline ? (
                    <p className={`mt-3 text-xs font-semibold text-orange-600 ${jakartaSans.className}`}>
                      Timeline · {item.deadline}
                    </p>
                  ) : null}
                  <div className="mt-3 flex flex-wrap gap-2">
                    {item.fit.map((tag) => (
                      <PortalBadge key={tag} accent="slate">
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
