import { NextResponse } from "next/server";
import { z } from "zod";
import { generateWeeklyEmailContent, formatWeekLabelFromDate } from "@/lib/cheat-sheet-generate";
import { buildCheatSheetEmailHtml } from "@/lib/weekly-cheat-sheet-brand";

const bodySchema = z.object({
  weekLabel: z.string().min(1).max(120).optional(),
  contextUrl: z.string().max(2000).optional(),
  contextNotes: z.string().max(20_000).optional(),
});

/**
 * Weekly automation hook: call from GitHub Actions, Vercel Cron, etc.
 * Headers: Authorization: Bearer ${CRON_SECRET}
 */
export async function POST(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "CRON_SECRET is not configured" }, { status: 501 });
  }

  const auth = request.headers.get("authorization") ?? "";
  if (auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const key = process.env.OPENAI_API_KEY;
  if (!key) return NextResponse.json({ error: "Missing OPENAI_API_KEY" }, { status: 500 });

  const json = await request.json().catch(() => ({}));
  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Bad request" }, { status: 400 });
  }

  const weekLabel = parsed.data.weekLabel?.trim() || formatWeekLabelFromDate(new Date());

  try {
    const content = await generateWeeklyEmailContent({
      weekLabel,
      contextUrl: parsed.data.contextUrl?.trim() || undefined,
      contextNotes: parsed.data.contextNotes?.trim() || undefined,
      openaiKey: key,
    });

    const html = buildCheatSheetEmailHtml(content);

    return NextResponse.json({
      ok: true,
      weekLabel: content.weekLabel,
      html,
      content,
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Generation failed";
    return NextResponse.json({ error: msg }, { status: 502 });
  }
}
