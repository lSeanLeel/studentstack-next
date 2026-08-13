import { NextResponse } from "next/server";
import { loadServerEnv } from "@/lib/server-env";
import { runDailyNewsletterPipeline } from "@/lib/newsletter/run-daily";
import type { FocusPillarId } from "@/lib/newsletter/angle";

export const runtime = "nodejs";
export const maxDuration = 120;

function isAuthorized(request: Request): boolean {
  const cronSecret = process.env.CRON_SECRET?.trim();
  const auth = request.headers.get("authorization") ?? "";
  if (cronSecret && auth === `Bearer ${cronSecret}`) return true;

  // Vercel Cron sends this header on scheduled invocations.
  if (request.headers.get("x-vercel-cron") === "1") return true;

  return false;
}

/**
 * Automated daily draft:
 * 1) pick focus pillar by weekday
 * 2) generate markdown with Claude
 * 3) render Beehiiv HTML
 * 4) optionally push a Beehiiv *draft* (never auto-sends)
 *
 * Secure with CRON_SECRET. Set push=1 to create the Beehiiv draft.
 */
export async function GET(request: Request) {
  loadServerEnv();

  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(request.url);
  const push = url.searchParams.get("push") === "1" || url.searchParams.get("push") === "true";
  const pillarParam = url.searchParams.get("pillar") as FocusPillarId | null;
  const focusPillar =
    pillarParam === "organization" || pillarParam === "planning" || pillarParam === "notetaking"
      ? pillarParam
      : undefined;

  try {
    const result = await runDailyNewsletterPipeline({
      focusPillar,
      pushToBeehiiv: push,
    });

    return NextResponse.json({
      success: true,
      pushed: push,
      focusPillar: result.focusPillar,
      issueDate: result.issueDate,
      title: result.title,
      subtitle: result.subtitle,
      beehiivPostId: result.beehiivPostId ?? null,
      markdownPreview: result.markdown.slice(0, 500),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Daily newsletter pipeline failed.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}

export async function POST(request: Request) {
  return GET(request);
}
