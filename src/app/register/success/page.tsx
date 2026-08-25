import { redirect } from "next/navigation";

export default function RegisterSuccessRedirect() {
  redirect("/join/success");
}
