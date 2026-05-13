import { NextResponse } from "next/server";
import { z } from "zod";
import { isAdminAuthorized } from "@/lib/admin-auth";
import { CHEAT_SHEET_BRAND, buildCheatSheetEmailHtml } from "@/lib/weekly-cheat-sheet-brand";
import { generateWeeklyEmailContent } from "@/lib/cheat-sheet-generate";

const requestSchema = z.object({
  weekLabel: z.string().min(1).max(120),
  contextUrl: z.string().max(2000).optional(),
  contextNotes: z.string().max(20_000).optional(),
});

export async function POST(request: Request) {
  const authorized = await isAdminAuthorized();
  if (!authorized) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json().catch(() => null);
  const parsed = requestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Bad request" }, { status: 400 });
  }

  const key = process.env.OPENAI_API_KEY;
  if (!key) return NextResponse.json({ error: "Missing OPENAI_API_KEY" }, { status: 500 });

  try {
    const content = await generateWeeklyEmailContent({
      weekLabel: parsed.data.weekLabel.trim(),
      contextUrl: parsed.data.contextUrl?.trim() || undefined,
      contextNotes: parsed.data.contextNotes?.trim() || undefined,
      openaiKey: key,
    });

    const html = buildCheatSheetEmailHtml(content);
    return NextResponse.json({
      html,
      content,
      sectionTitles: CHEAT_SHEET_BRAND.sections,
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Generation failed";
    const status = msg.includes("Invalid contextUrl") ? 400 : 502;
    return NextResponse.json({ error: msg }, { status });
  }
}
