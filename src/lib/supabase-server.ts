import { createClient, type SupabaseClient } from "@supabase/supabase-js";

function normalizeSupabaseUrl(raw: string | undefined): string {
  if (!raw) return "";
  let url = raw.trim().replace(/^["']|["']$/g, "");
  while (url.endsWith("/")) url = url.slice(0, -1);
  return url;
}

function normalizeKey(raw: string | undefined): string {
  if (!raw) return "";
  return raw.trim().replace(/^["']|["']$/g, "");
}

/** True when real project credentials are set (not .env.example placeholders). */
export function isSupabaseConfigured(): boolean {
  const url = normalizeSupabaseUrl(process.env.SUPABASE_URL);
  const key = normalizeKey(process.env.SUPABASE_SERVICE_ROLE_KEY);
  if (!url || !key) return false;
  if (url.includes("YOUR_PROJECT_REF") || url.includes("your-project")) return false;
  if (key === "your_service_role_key" || key.length < 20) return false;
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
      "Supabase is not configured. In studentthisisfinal-main/.env.local set SUPABASE_URL (https://xxxx.supabase.co) and SUPABASE_SERVICE_ROLE_KEY from Supabase → Settings → API. Restart npm run dev."
    );
  }

  const supabaseUrl = normalizeSupabaseUrl(process.env.SUPABASE_URL);
  const serviceRoleKey = normalizeKey(process.env.SUPABASE_SERVICE_ROLE_KEY);

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
