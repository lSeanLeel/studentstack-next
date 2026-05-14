import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/** Strip BOM / CRLF and quotes — Windows `.env` often leaves `\r` on values. */
export function stripEnvValue(raw: string | undefined): string {
  if (!raw) return "";
  return raw
    .replace(/^\uFEFF/, "")
    .replace(/\r/g, "")
    .trim()
    .replace(/^["']|["']$/g, "");
}

function normalizeSupabaseUrl(raw: string | undefined): string {
  let url = stripEnvValue(raw);
  while (url.endsWith("/")) url = url.slice(0, -1);
  return url;
}

function normalizeKey(raw: string | undefined): string {
  return stripEnvValue(raw);
}

/** Supabase service-role keys are JWTs and normally start with `eyJ`. */
function looksLikeSupabaseServiceRoleKey(key: string): boolean {
  if (key.length < 50) return false;
  if (/^your[_\s-]*service[_\s-]*role/i.test(key.replace(/\s/g, ""))) return false;
  return key.startsWith("eyJ");
}

function supabaseUrlFromEnv(): string {
  return normalizeSupabaseUrl(process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL);
}

/** True when real project credentials are set (not .env.example placeholders). */
export function isSupabaseConfigured(): boolean {
  const url = supabaseUrlFromEnv();
  const key = normalizeKey(process.env.SUPABASE_SERVICE_ROLE_KEY);
  if (!url || !key) return false;
  if (url.includes("YOUR_PROJECT_REF") || url.includes("your-project")) return false;
  if (!looksLikeSupabaseServiceRoleKey(key)) return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" && Boolean(parsed.hostname);
  } catch {
    return false;
  }
}

export function getSupabaseServerClient(): SupabaseClient {
  if (!isSupabaseConfigured()) {
    throw new Error(
      "Supabase is not configured. In .env or .env.local set SUPABASE_URL or NEXT_PUBLIC_SUPABASE_URL (https://xxxx.supabase.co) and SUPABASE_SERVICE_ROLE_KEY from Supabase → Settings → API. Restart npm run dev."
    );
  }

  const supabaseUrl = supabaseUrlFromEnv();
  const serviceRoleKey = normalizeKey(process.env.SUPABASE_SERVICE_ROLE_KEY);

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
