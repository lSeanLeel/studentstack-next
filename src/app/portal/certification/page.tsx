import { redirect } from "next/navigation";

/** Legacy stub → member guides. */
export default function PortalCertificationRedirect() {
  redirect("/portal/guides");
}
