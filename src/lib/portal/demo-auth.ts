/** Demo student portal credentials for local/preview access. */
export const DEMO_USERNAME = "test";
export const DEMO_PASSWORD = "test";

export const DEMO_COOKIE = "ss_portal_demo";
export const DEMO_COOKIE_VALUE = "1";

export function isDemoCredentials(username: string, password: string) {
  return (
    username.trim().toLowerCase() === DEMO_USERNAME &&
    password === DEMO_PASSWORD
  );
}

export function hasDemoCookieValue(value: string | undefined | null) {
  return value === DEMO_COOKIE_VALUE;
}

export function demoCookieOptions(maxAgeSeconds = 60 * 60 * 24 * 14) {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: maxAgeSeconds,
  };
}
