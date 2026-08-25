import { redirect } from "next/navigation";

/** Legacy Elite purchase path → community join */
export default function ElitePage() {
  redirect("/join");
}
