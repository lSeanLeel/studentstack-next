import { getPortalMember } from "@/lib/portal/session";
import { EliteGate } from "@/components/portal/EliteGate";
import { PortalMessageTeam } from "@/components/portal/PortalMessageTeam";
import { fredokaHeadline, jakartaSans } from "@/app/fonts";

export default async function PortalMessagePage() {
  const member = await getPortalMember();
  if (!member) return null;
  if (!member.elite) return <EliteGate />;

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <p className={`text-[10px] font-black uppercase tracking-[0.2em] text-sky-600 ${jakartaSans.className}`}>
          Support
        </p>
        <h1 className={`mt-1 text-3xl font-semibold tracking-[-0.03em] text-slate-900 ${fredokaHeadline.className}`}>
          Message the team
        </h1>
        <p className={`mt-2 text-sm font-medium text-slate-600 sm:text-base ${jakartaSans.className}`}>
          Reach the college students who maintain your membership toolkit and resources.
        </p>
      </div>
      <PortalMessageTeam defaultName={member.displayName} defaultEmail={member.email} />
    </div>
  );
}
