import { getPortalMember } from "@/lib/portal/session";
import { MemberGate } from "@/components/portal/MemberGate";
import { PortalToolkitView } from "@/components/portal/PortalToolkitView";
import { getToolkitMaintenanceMeta } from "@/lib/portal/toolkit-maintenance";

export default async function PortalToolkitPage() {
  const member = await getPortalMember();
  if (!member) return null;
  if (!member.isMember) return <MemberGate />;

  const meta = getToolkitMaintenanceMeta();

  return (
    <PortalToolkitView
      dateLabel={meta.dateLabel}
      tip={meta.tip}
      displayName={member.displayName}
      email={member.email}
    />
  );
}
