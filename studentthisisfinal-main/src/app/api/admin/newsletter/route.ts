import { NextResponse } from "next/server";
import { z } from "zod";
import { isAdminAuthorized } from "@/lib/admin-auth";

const requestSchema = z.object({
  topic: z.string().min(3, "Topic is required."),
});

const systemPrompt = `You write a polished parent-facing newsletter section for StudentStack Elite.
Return ONLY valid HTML.
Keep tone clear and practical.
Structure:
1) Headline
2) One short intro paragraph
3) Three actionable bullet points
4) One parent takeaway callout
No markdown and no <html>/<body> wrapper.`;

export async function POST(request: Request) {
  const authorized = await isAdminAuthorized();
  if (!authorized) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json().catch(() => null);
  const parsed = requestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message }, { status: 400 });
  }

  const openaiKey = process.env.OPENAI_API_KEY;
  if (!openaiKey) {
    return NextResponse.json(
      { error: "Missing OPENAI_API_KEY. Add it to your environment variables." },
      { status: 500 }
    );
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${openaiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      temperature: 0.6,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `This Week's AI Topic: ${parsed.data.topic}` },
      ],
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    return NextResponse.json({ error: `OpenAI request failed: ${text}` }, { status: 502 });
  }

  const json = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const html = json.choices?.[0]?.message?.content?.trim() || "";
  return NextResponse.json({ html });
}
