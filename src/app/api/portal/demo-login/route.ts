import { NextResponse } from "next/server";
import {
  DEMO_COOKIE,
  DEMO_COOKIE_VALUE,
  demoCookieOptions,
  isDemoCredentials,
} from "@/lib/portal/demo-auth";

export async function POST(request: Request) {
  let body: { username?: string; password?: string } = {};
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const username = typeof body.username === "string" ? body.username : "";
  const password = typeof body.password === "string" ? body.password : "";

  if (!isDemoCredentials(username, password)) {
    return NextResponse.json({ error: "Invalid username or password." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true, demo: true });
  response.cookies.set(DEMO_COOKIE, DEMO_COOKIE_VALUE, demoCookieOptions());
  return response;
}
