import { getPortalMember } from "@/lib/portal/session";
import { MemberGate } from "@/components/portal/MemberGate";
import { PortalGuidesView } from "@/components/portal/PortalGuidesView";

export default async function PortalGuidesPage() {
  const member = await getPortalMember();
  if (!member) return null;
  if (!member.isMember) return <MemberGate />;

  return <PortalGuidesView />;
}
