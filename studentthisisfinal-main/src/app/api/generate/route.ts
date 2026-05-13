import { NextResponse } from "next/server";
import { z } from "zod";
import { isAdminAuthorized } from "@/lib/admin-auth";

const bodySchema = z.object({
  url: z.string().url("Valid URL required."),
});

const MAX_CHARS = 48_000;

const systemPrompt = `Read this context and write a short, friendly, 3-section email (The Tool, The Use-Case, The Action Step) from the perspective of an elite college student writing to a parent of a high schooler.

Requirements:
- Output ONLY clean HTML with inline CSS for a bubbly, friendly brand: rounded corners (about 16px), sky blues (#0ea5e9, #38bdf8), soft violet accents (#a78bfa), slate text (#0f172a), generous padding, clear headings.
- Use safe tags only: div, p, h2, h3, span, ul, li, strong, em, a (href="#" if unsure).
- No markdown. No outer <!DOCTYPE> or <html> wrapper needed; you may emit a fragment-like HTML snippet suitable for pasting into an email composer.
- Keep concise and readable on mobile.

Sections must be labeled clearly:
1) The Tool
2) The Use-Case  
3) The Action Step`;

async function fetchPageText(url: string): Promise<string> {
  const ctrl = new AbortController();
  const tid = setTimeout(() => ctrl.abort(), 15_000);
  let res: Response;
  try {
    res = await fetch(url, {
      headers: {
        "User-Agent": "StudentStackNewsletterBot/1.0 (+studentstack)",
        Accept: "text/html,text/plain,*/*",
      },
      redirect: "follow",
      signal: ctrl.signal,
    });
  } finally {
    clearTimeout(tid);
  }
  if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
  const text = await res.text();
  return text.slice(0, MAX_CHARS);
}

export async function POST(request: Request) {
  const authorized = await isAdminAuthorized();
  if (!authorized) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const json = await request.json().catch(() => null);
  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Bad request" }, { status: 400 });
  }

  const openaiKey = process.env.OPENAI_API_KEY;
  if (!openaiKey) {
    return NextResponse.json({ error: "Missing OPENAI_API_KEY." }, { status: 500 });
  }

  let contextText: string;
  try {
    contextText = await fetchPageText(parsed.data.url);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Could not fetch URL.";
    return NextResponse.json({ error: msg }, { status: 502 });
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${openaiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o",
      temperature: 0.55,
      messages: [
        { role: "system", content: systemPrompt },
        {
          role: "user",
          content: `Source URL: ${parsed.data.url}\n\nPage/content excerpt:\n${contextText}`,
        },
      ],
    }),
  });

  if (!response.ok) {
    const t = await response.text();
    return NextResponse.json({ error: `OpenAI failed: ${t}` }, { status: 502 });
  }

  const data = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const html = data.choices?.[0]?.message?.content?.trim() ?? "";
  return NextResponse.json({ html });
}
