import { getPortalMember } from "@/lib/portal/session";
import { EliteGate } from "@/components/portal/EliteGate";
import { PortalHomeDashboard } from "@/components/portal/PortalHomeDashboard";
import { getToolkitMaintenanceMeta } from "@/lib/portal/toolkit-maintenance";

export default async function PortalHomePage() {
  const member = await getPortalMember();
  if (!member) return null;

  if (!member.elite) {
    return <EliteGate />;
  }

  const meta = getToolkitMaintenanceMeta();

  return (
    <PortalHomeDashboard
      displayName={member.displayName}
      email={member.email}
      dateLabel={meta.dateLabel}
      tip={meta.tip}
      latestChange={meta.latest}
    />
  );
}
