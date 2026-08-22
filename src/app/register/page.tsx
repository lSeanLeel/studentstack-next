import { redirect } from "next/navigation";

/** Legacy path: community join lives at /join */
export default function RegisterRedirectPage() {
  redirect("/join");
}
