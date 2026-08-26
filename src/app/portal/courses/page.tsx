import { getPortalMember } from "@/lib/portal/session";
import { EliteGate } from "@/components/portal/EliteGate";
import { PortalCurriculumView } from "@/components/portal/PortalCurriculumView";

export default async function PortalCoursesPage() {
  const member = await getPortalMember();
  if (!member) return null;
  if (!member.elite) return <EliteGate />;

  return <PortalCurriculumView />;
}
