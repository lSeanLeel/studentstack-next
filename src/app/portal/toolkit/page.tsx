import { getPortalMember } from "@/lib/portal/session";
import { EliteGate } from "@/components/portal/EliteGate";
import { PortalToolkitView } from "@/components/portal/PortalToolkitView";
import { getToolkitMaintenanceMeta, TOOLKIT_CHANGELOG } from "@/lib/portal/toolkit-maintenance";

export default async function PortalToolkitPage() {
  const member = await getPortalMember();
  if (!member) return null;
  if (!member.elite) return <EliteGate />;

  const meta = getToolkitMaintenanceMeta();

  return (
    <PortalToolkitView dateLabel={meta.dateLabel} tip={meta.tip} changelog={TOOLKIT_CHANGELOG} />
  );
}
