import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import { z } from "zod";
import { isAdminAuthorized } from "@/lib/admin-auth";
import { getAnthropicApiKey, loadServerEnv } from "@/lib/server-env";

const requestSchema = z.object({
  seedText: z.string().min(3, "seedText is required."),
});

const systemPrompt = `Act as StudentStack's CCO writing to parents of high schoolers.

Generate structured Markdown for a weekly newsletter issue. Include these sections in order, using clear ## headings:

1. Title — one compelling headline as a single # H1 at the top (no extra heading label)
2. Daily Gist — 2–3 sentence overview of what happened in AI/education this week
3. Parent Note Draft — a warm, practical note to parents; include the exact placeholder [EDIT PARENT NOTE HERE] where the author should personalize
4. AI Toolkit — one featured tool or workflow with name, what it does, and one concrete student use case
5. Opportunity Radar — 2–4 upcoming deadlines or opportunities for high schoolers (programs, competitions, internships) with dates when known

Tone: clear, trustworthy, energetic but not hypey. Write for busy parents. Use bullet lists where helpful. Return Markdown only — no preamble or code fences.`;

function formatAnthropicError(error: unknown): string {
  if (error instanceof Anthropic.APIError) {
    const body = error.error as { error?: { message?: string }; message?: string } | undefined;
    const detail = body?.error?.message ?? body?.message ?? error.message;
    if (detail.includes("credit balance")) {
      return "Anthropic API key is set, but the account has no credits. Add billing at console.anthropic.com → Plans & Billing.";
    }
    return detail;
  }
  return error instanceof Error ? error.message : "Anthropic request failed.";
}

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

  const apiKey = getAnthropicApiKey();
  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "Missing ANTHROPIC_API_KEY. Add it to .env.local in the project root (same folder as package.json), then restart npm run dev. On Vercel, set it under Project Settings → Environment Variables.",
      },
      { status: 500 }
    );
  }

  try {
    const client = new Anthropic({ apiKey });
    const message = await client.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 4096,
      system: systemPrompt,
      messages: [
        {
          role: "user",
          content: `Use this seed research / link dump as source material:\n\n${parsed.data.seedText}`,
        },
      ],
    });

    const markdown = message.content
      .filter((block) => block.type === "text")
      .map((block) => (block.type === "text" ? block.text : ""))
      .join("")
      .trim();

    if (!markdown) {
      return NextResponse.json({ error: "Model returned empty content." }, { status: 502 });
    }

    return NextResponse.json({ success: true, markdown });
  } catch (error) {
    return NextResponse.json({ error: formatAnthropicError(error) }, { status: 502 });
  }
}
