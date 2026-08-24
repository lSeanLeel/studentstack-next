import { getPortalMember } from "@/lib/portal/session";
import { EliteGate } from "@/components/portal/EliteGate";
import { PortalHomeDashboard } from "@/components/portal/PortalHomeDashboard";

export default async function PortalHomePage() {
  const member = await getPortalMember();
  if (!member) return null;

  if (!member.elite) {
    return <EliteGate />;
  }

  return <PortalHomeDashboard displayName={member.displayName} />;
}
