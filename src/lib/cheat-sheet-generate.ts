import { z } from "zod";
import type { CheatSheetContent } from "@/lib/weekly-cheat-sheet-brand";

const MAX_FETCH = 40_000;

const jsonResponseSchema = z.object({
  researchRows: z
    .array(
      z.object({
        opportunity: z.string().min(1).max(400),
        deadline: z.string().min(1).max(120),
        gate: z.string().min(1).max(400),
      })
    )
    .min(3)
    .max(8),
  qaSubject: z.string().min(1).max(200),
  qaParentLabel: z.string().min(1).max(120),
  qaQuestion: z.string().min(1).max(2000),
  qaAnswer: z.string().min(1).max(4000),
  toolListName: z.string().min(1).max(120),
  toolEmailSubject: z.string().min(1).max(200),
  toolListItems: z.array(z.string()).min(2).max(12),
});

async function fetchText(url: string): Promise<string> {
  const ctrl = new AbortController();
  const tid = setTimeout(() => ctrl.abort(), 15_000);
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "StudentStackWeeklyEmailBot/1.0",
        Accept: "text/html,text/plain,*/*",
      },
      signal: ctrl.signal,
      redirect: "follow",
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return (await res.text()).slice(0, MAX_FETCH);
  } finally {
    clearTimeout(tid);
  }
}

const systemPrompt = `You draft ONE weekly parent email for StudentStack (college students helping parents of high schoolers use AI responsibly).

Output a single JSON object only (no markdown fence) with these exact keys:
- researchRows: array of 3 to 6 objects, each with keys opportunity, deadline, gate.
  Each row is one line from a gated research spreadsheet: real-sounding programs, scholarships, or summer labs with plausible deadlines and gate/requirements (portal, GPA, grade level, essay length). Not generic filler names: sound like real listings parents Google.
- qaSubject: short email subject line like "Re: …" that a parent would send.
- qaParentLabel: masked sender label only, e.g. "Parent, NorCal, 10th grade" (no real emails).
- qaQuestion: the full body of the parent's email (multi-sentence, natural, worried-practical tone about admissions + AI use).
- qaAnswer: StudentStack team's reply as plain email prose (we / our team), 3 to 6 sentences, specific habits and boundaries, not buzzwords.
- toolListName: short title like "Tools the StudentStack team is using"
- toolEmailSubject: looks like a forwarded internal email subject line including the week.
- toolListItems: 3 to 6 strings, format "Name: one concrete classroom or admissions-adjacent use"

Tone: trusted peers, warm, zero corporate AI voice. No sparkle emoji. Avoid heavy punctuation flourishes.`;

export async function generateWeeklyEmailContent(params: {
  weekLabel: string;
  contextUrl?: string;
  contextNotes?: string;
  openaiKey: string;
}): Promise<CheatSheetContent> {
  let context = params.contextNotes?.trim() ?? "";
  let url: string | undefined;
  const rawUrl = params.contextUrl?.trim() ?? "";
  if (rawUrl) {
    try {
      url = new URL(rawUrl).toString();
    } catch {
      throw new Error("Invalid contextUrl");
    }
  }
  if (url) {
    context = (await fetchText(url)) + "\n\n" + context;
  }

  const userMsg = `Week label for the email header: ${params.weekLabel}

Context (optional notes or fetched page text; inspire only, do not copy verbatim):
${context.slice(0, 24_000) || "(No extra context: use realistic HS admissions + research ops for US families.)"}`;

  const completion = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${params.openaiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "gpt-4o",
      temperature: 0.45,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMsg },
      ],
    }),
  });

  if (!completion.ok) {
    const t = await completion.text();
    throw new Error(`OpenAI: ${t}`);
  }

  const data = (await completion.json()) as { choices?: Array<{ message?: { content?: string } }> };
  const raw = data.choices?.[0]?.message?.content?.trim() ?? "";
  let json: unknown;
  try {
    json = JSON.parse(raw);
  } catch {
    throw new Error("Model returned non-JSON");
  }

  const fields = jsonResponseSchema.safeParse(json);
  if (!fields.success) {
    throw new Error(fields.error.issues[0]?.message ?? "Invalid JSON shape from model");
  }

  return {
    weekLabel: params.weekLabel,
    researchRows: fields.data.researchRows,
    qaSubject: fields.data.qaSubject,
    qaParentLabel: fields.data.qaParentLabel,
    qaQuestion: fields.data.qaQuestion,
    qaAnswer: fields.data.qaAnswer,
    toolListName: fields.data.toolListName,
    toolEmailSubject: fields.data.toolEmailSubject,
    toolListItems: fields.data.toolListItems,
  };
}

export function formatWeekLabelFromDate(d: Date): string {
  return `Week of ${d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`;
}
