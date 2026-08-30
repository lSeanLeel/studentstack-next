import { redirect } from "next/navigation";

/** Legacy route → member guides. */
export default function PortalCertificationsRedirect() {
  redirect("/portal/guides");
}
