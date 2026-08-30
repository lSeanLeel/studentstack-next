import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getPortalAccess } from "@/lib/portal/entitlements";
import { hasDemoPortalSession } from "@/lib/portal/session";
import {
  buildFallbackPortalUpdate,
  formatPortalDateKey,
  parsePortalDailyUpdate,
  type PortalDailyUpdate,
} from "@/lib/portal/ai-updates";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ANTHROPIC_URL = "https://api.anthropic.com/v1/messages";

type Body = {
  refresh?: boolean;
  prompt?: string;
};

function cacheKey(userId: string, dateKey: string) {
  return `portal-daily:${userId}:${dateKey}`;
}

const memoryCache = new Map<string, PortalDailyUpdate>();

async function resolvePortalUserId(): Promise<{ userId: string } | { error: NextResponse }> {
  if (await hasDemoPortalSession()) {
    return { userId: "demo-test" };
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "";
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
  if (!url || !anon) {
    return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  }

  try {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
    }

    const { canAccessPortal } = await getPortalAccess(user.id);
    if (!canAccessPortal) {
      return { error: NextResponse.json({ error: "Membership required" }, { status: 403 }) };
    }

    return { userId: user.id };
  } catch {
    return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  }
}

export async function GET() {
  const auth = await resolvePortalUserId();
  if ("error" in auth) return auth.error;

  const dateKey = formatPortalDateKey();
  const cached = memoryCache.get(cacheKey(auth.userId, dateKey));
  return NextResponse.json({
    update: cached ?? buildFallbackPortalUpdate(dateKey),
    cached: Boolean(cached),
  });
}

export async function POST(request: Request) {
  const auth = await resolvePortalUserId();
  if ("error" in auth) return auth.error;

  const body = (await request.json().catch(() => ({}))) as Body;
  const dateKey = formatPortalDateKey();
  const key = cacheKey(auth.userId, dateKey);
  const existing = memoryCache.get(key);

  if (!body.refresh && existing) {
    return NextResponse.json({ update: existing, cached: true });
  }

  const studentPrompt =
    typeof body.prompt === "string" && body.prompt.trim()
      ? body.prompt.trim().slice(0, 600)
      : "Give me today's StudentStack portal briefing focused on AI for school, high school advice, vault deadlines, and certification progress.";

  const apiKey = process.env.ANTHROPIC_API_KEY?.trim();
  if (!apiKey) {
    const fallback = buildFallbackPortalUpdate(dateKey);
    memoryCache.set(key, fallback);
    return NextResponse.json({
      update: fallback,
      cached: false,
      warning: "AI key not configured. Showing curated member briefing.",
    });
  }

  try {
    const response = await fetch(ANTHROPIC_URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1200,
        temperature: 0.4,
        system: [
          "You write daily updates for StudentStack, a private high-school membership portal.",
          "Return ONLY valid JSON with keys: headline, briefing, toolkitTip, vaultHighlight, certificationNudge, applicationMoves (array of 3 short strings).",
          "Tone: practical, AI-for-school literacy first, high school advice second. No em dashes. No pricing talk.",
          "Certifications available: SS-AIS (AI Safety & Academic Integrity) and SS-ACR (AI for College Readiness).",
          "Vault covers summer programs, research, and competitive deadlines.",
        ].join(" "),
        messages: [
          {
            role: "user",
            content: `Date: ${dateKey}. Student request: ${studentPrompt}`,
          },
        ],
      }),
    });

    if (!response.ok) {
      const fallback = buildFallbackPortalUpdate(dateKey);
      memoryCache.set(key, fallback);
      return NextResponse.json({
        update: fallback,
        cached: false,
        warning: "AI refresh unavailable right now. Showing curated briefing.",
      });
    }

    const payload = (await response.json()) as {
      content?: Array<{ type?: string; text?: string }>;
    };
    const text = payload.content?.find((block) => block.type === "text")?.text ?? "";
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const update = parsePortalDailyUpdate(jsonMatch?.[0] ?? text, dateKey);
    memoryCache.set(key, update);

    return NextResponse.json({ update, cached: false });
  } catch {
    const fallback = buildFallbackPortalUpdate(dateKey);
    memoryCache.set(key, fallback);
    return NextResponse.json({
      update: fallback,
      cached: false,
      warning: "AI refresh failed. Showing curated briefing.",
    });
  }
}
