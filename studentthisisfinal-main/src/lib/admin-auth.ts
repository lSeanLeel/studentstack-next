import crypto from "crypto";
import { cookies } from "next/headers";

const ADMIN_COOKIE = "ss_admin_pw";

export function constantTimeEqual(input: string, expected: string) {
  const a = Buffer.from(input, "utf8");
  const b = Buffer.from(expected, "utf8");
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export async function isAdminAuthorized() {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) return false;

  const cookieStore = await cookies();
  const provided = cookieStore.get(ADMIN_COOKIE)?.value ?? "";
  return constantTimeEqual(provided, adminPassword);
}

export async function setAdminCookie(password: string) {
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE, password, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  });
}

export async function clearAdminCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE);
}
