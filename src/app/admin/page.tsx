import { redirect } from "next/navigation";

/** Legacy /admin → operator newsletter studio. */
export default function AdminRedirectPage() {
  redirect("/operator");
}
