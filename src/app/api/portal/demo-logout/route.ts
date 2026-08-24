import { NextResponse } from "next/server";
import { DEMO_COOKIE, demoCookieOptions } from "@/lib/portal/demo-auth";

export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(DEMO_COOKIE, "", { ...demoCookieOptions(0), maxAge: 0 });
  return response;
}
