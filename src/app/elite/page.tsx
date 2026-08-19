import { redirect } from "next/navigation";

/** Legacy route: parent registration lives at /register */
export default function ElitePage() {
  redirect("/register");
}
