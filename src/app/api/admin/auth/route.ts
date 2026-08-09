import { NextResponse } from "next/server";
import { z } from "zod";
import {
  clearAdminCookie,
  constantTimeEqual,
  getAdminPassword,
  isAdminAuthorized,
  setAdminCookie,
  verifyOperatorCredentials,
} from "@/lib/admin-auth";
import { getEnvStatus, loadServerEnv } from "@/lib/server-env";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required."),
  password: z.string().min(1, "Password is required."),
});

/** Legacy password-only body still accepted for older clients. */
const legacyLoginSchema = z.object({
  password: z.string().min(1),
});

export async function GET() {
  loadServerEnv();
  const authorized = await isAdminAuthorized();
  return NextResponse.json({
    authorized,
    env: authorized ? getEnvStatus() : undefined,
  });
}

export async function POST(request: Request) {
  loadServerEnv();
  const body = await request.json().catch(() => null);

  const withUser = loginSchema.safeParse(body);
  if (withUser.success) {
    if (!verifyOperatorCredentials(withUser.data.username, withUser.data.password)) {
      return NextResponse.json({ error: "Invalid username or password." }, { status: 401 });
    }
    await setAdminCookie(withUser.data.password);
    return NextResponse.json({ success: true });
  }

  const legacy = legacyLoginSchema.safeParse(body);
  if (legacy.success) {
    if (!constantTimeEqual(legacy.data.password, getAdminPassword())) {
      return NextResponse.json({ error: "Invalid username or password." }, { status: 401 });
    }
    await setAdminCookie(legacy.data.password);
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "Username and password are required." }, { status: 400 });
}

export async function DELETE() {
  await clearAdminCookie();
  return NextResponse.json({ success: true });
}
