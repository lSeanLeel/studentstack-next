import { NextResponse } from "next/server";
import { z } from "zod";
import { clearAdminCookie, constantTimeEqual, getAdminPassword, isAdminAuthorized, setAdminCookie } from "@/lib/admin-auth";
import { getEnvStatus, loadServerEnv } from "@/lib/server-env";

const loginSchema = z.object({
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
  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Password is required." }, { status: 400 });
  }

  const expected = getAdminPassword();
  if (!constantTimeEqual(parsed.data.password, expected)) {
    return NextResponse.json({ error: "Invalid password." }, { status: 401 });
  }

  await setAdminCookie(parsed.data.password);
  return NextResponse.json({ success: true });
}

export async function DELETE() {
  await clearAdminCookie();
  return NextResponse.json({ success: true });
}
