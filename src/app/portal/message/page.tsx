import { getPortalMember } from "@/lib/portal/session";
import { EliteGate } from "@/components/portal/EliteGate";
import { PortalMessageTeam } from "@/components/portal/PortalMessageTeam";
import { PortalEyebrow, PortalLead, PortalPageTitle } from "@/components/portal/portal-ui";

export default async function PortalMessagePage() {
  const member = await getPortalMember();
  if (!member) return null;
  if (!member.elite) return <EliteGate />;

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <header>
        <PortalEyebrow>Direct line</PortalEyebrow>
        <PortalPageTitle className="mt-1">Message the team</PortalPageTitle>
        <PortalLead>
          College students who maintain the toolkit and resources. Ask anything about AI for school or what to do next.
        </PortalLead>
      </header>
      <PortalMessageTeam defaultName={member.displayName} defaultEmail={member.email} />
    </div>
  );
}
