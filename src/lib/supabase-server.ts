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

function supabaseUrlFromEnv(): string {
  return normalizeSupabaseUrl(
    process.env.SUPABASE_URL ||
      process.env.NEXT_PUBLIC_SUPABASE_URL ||
      process.env.PUBLIC_SUPABASE_URL
  );
}

/** Service role or new secret API key (server-only). */
function serviceRoleKeyFromEnv(): string {
  return normalizeKey(
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
      process.env.SUPABASE_SECRET_KEY ||
      process.env.SUPABASE_SERVICE_KEY
  );
}

/** True when real project credentials are set (not .env.example placeholders). */
export function isSupabaseConfigured(): boolean {
  const url = supabaseUrlFromEnv();
  const key = serviceRoleKeyFromEnv();
  if (!url || !key) return false;
  if (url.includes("YOUR_PROJECT_REF") || url.includes("your-project")) return false;
  const compact = key.replace(/\s/g, "");
  if (compact.length < 20) return false;
  const lower = compact.toLowerCase();
  if (lower === "your_service_role_key" || lower === "your_beehiiv_api_key") return false;
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
      "Supabase is not configured. Set SUPABASE_URL or NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (JWT) or SUPABASE_SECRET_KEY (sb_secret_…) from Supabase → Project Settings → API. Restart npm run dev."
    );
  }

  const supabaseUrl = supabaseUrlFromEnv();
  const serviceRoleKey = serviceRoleKeyFromEnv();

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
