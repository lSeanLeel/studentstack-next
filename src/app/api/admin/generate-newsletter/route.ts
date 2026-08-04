import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import { z } from "zod";
import { isAdminAuthorized } from "@/lib/admin-auth";

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

export async function POST(request: Request) {
  const authorized = await isAdminAuthorized();
  if (!authorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const parsed = requestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid request." }, { status: 400 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Missing ANTHROPIC_API_KEY." }, { status: 500 });
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
    const message = error instanceof Error ? error.message : "Anthropic request failed.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
