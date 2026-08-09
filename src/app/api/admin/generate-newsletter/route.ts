import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import { z } from "zod";
import { isAdminAuthorized } from "@/lib/admin-auth";
import { FOCUS_PILLARS, NEWSLETTER_ANGLE, getFocusPillar } from "@/lib/newsletter/angle";
import { getAnthropicApiKey, loadServerEnv } from "@/lib/server-env";

const requestSchema = z.object({
  seedText: z.string().min(3, "seedText is required."),
  focusPillar: z.enum(["organization", "planning", "notetaking"]).optional(),
  issueDate: z.string().optional(),
});

function buildSystemPrompt(focusId: string): string {
  const pillar = getFocusPillar(focusId);
  const pillars = FOCUS_PILLARS.map((p) => `- ${p.label}: ${p.blurb}`).join("\n");

  return `You are writing StudentStack Daily — ${NEWSLETTER_ANGLE.promise}

AUDIENCE: ${NEWSLETTER_ANGLE.audience}. Busy. Want credibility, not hype.

TODAY'S REQUIRED FOCUS PILLAR: ${pillar.label}
Pillar detail: ${pillar.blurb}
Parent value: ${pillar.parentValue}

THE THREE ARENAS (always stay inside this optic):
${pillars}

NEVER:
${NEWSLETTER_ANGLE.notThis.map((x) => `- ${x}`).join("\n")}

ALWAYS:
${NEWSLETTER_ANGLE.alwaysThis.map((x) => `- ${x}`).join("\n")}

OUTPUT: structured Markdown only (no preamble, no code fences), sections in this exact order:

1. A single # H1 title — concrete, parent-readable, organization-forward (not "AI is changing everything")
2. One short lede paragraph under the title (1–2 sentences)
3. ## Today's organizing angle · ${pillar.label}
   - 2–4 sentences tying the issue to ${pillar.label.toLowerCase()}
4. ## Signal
   - What is worth noticing in AI/education *through an organizing lens* (2–4 sentences)
5. ## Parent note
   - Warm, practical. Include the exact placeholder [EDIT PARENT NOTE HERE] on its own line near the top of this section
6. ## The toolkit move
   - One featured workflow: Name, what it does, one concrete high-school use case for ${pillar.label.toLowerCase()}
7. ## Forward this
   - One short message a parent can copy/text to their student tonight

Optional only if seed research clearly supports it:
8. ## Opportunity radar
   - 1–3 high-school-relevant deadlines with dates when known

Tone: clear, trustworthy, energetic but not hypey. College-student informed. Write for parents who want their kid organized for school.`;
}

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

  const focusPillar = parsed.data.focusPillar ?? "organization";
  const issueDate = parsed.data.issueDate?.trim();

  try {
    const client = new Anthropic({ apiKey });
    const message = await client.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 4096,
      system: buildSystemPrompt(focusPillar),
      messages: [
        {
          role: "user",
          content: [
            issueDate ? `Issue date: ${issueDate}` : null,
            `Focus pillar: ${getFocusPillar(focusPillar).label}`,
            "Use this seed research / link dump / operator notes as source material:",
            "",
            parsed.data.seedText,
          ]
            .filter(Boolean)
            .join("\n"),
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

    return NextResponse.json({ success: true, markdown, focusPillar });
  } catch (error) {
    return NextResponse.json({ error: formatAnthropicError(error) }, { status: 502 });
  }
}
