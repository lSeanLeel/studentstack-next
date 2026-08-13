import { NextResponse } from "next/server";
import { z } from "zod";
import { isAdminAuthorized } from "@/lib/admin-auth";
import { loadServerEnv } from "@/lib/server-env";
import { generateDailyMarkdown } from "@/lib/newsletter/run-daily";

const requestSchema = z.object({
  seedText: z.string().min(3, "seedText is required."),
  focusPillar: z.enum(["organization", "planning", "notetaking"]).optional(),
  issueDate: z.string().optional(),
});

export async function POST(request: Request) {
  loadServerEnv();

  const authorized = await isAdminAuthorized();
  if (!authorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const parsed = requestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid request." }, { status: 400 });
  }

  try {
    const { markdown, focusPillar } = await generateDailyMarkdown({
      seedText: parsed.data.seedText,
      focusPillar: parsed.data.focusPillar,
      issueDate: parsed.data.issueDate,
    });
    return NextResponse.json({ success: true, markdown, focusPillar });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Anthropic request failed.";
    const status = message.includes("Missing ANTHROPIC_API_KEY") ? 500 : 502;
    return NextResponse.json({ error: message }, { status });
  }
}
