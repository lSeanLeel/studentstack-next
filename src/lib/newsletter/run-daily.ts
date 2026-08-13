import Anthropic from "@anthropic-ai/sdk";
import {
  buildAngleSeed,
  buildNewsletterSystemPrompt,
  getFocusPillar,
  issueDateLabel,
  pillarForDate,
  type FocusPillarId,
} from "@/lib/newsletter/angle";
import { buildBeehiivHtml, createDefaultDesign } from "@/lib/newsletter/beehiiv-template";
import { extractSubtitleFromMarkdown, extractTitleFromMarkdown } from "@/lib/markdown-to-html";
import { getAnthropicApiKey, getBeehiivApiKey, getBeehiivPublicationId } from "@/lib/server-env";

export type DailyDraftResult = {
  focusPillar: FocusPillarId;
  issueDate: string;
  seedText: string;
  markdown: string;
  title: string;
  subtitle: string;
  html: string;
};

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

export async function generateDailyMarkdown(opts: {
  seedText: string;
  focusPillar?: FocusPillarId;
  issueDate?: string;
}): Promise<{ markdown: string; focusPillar: FocusPillarId }> {
  const apiKey = getAnthropicApiKey();
  if (!apiKey) {
    throw new Error(
      "Missing ANTHROPIC_API_KEY. Add it to .env.local, then restart the server. On Vercel, set Project Settings → Environment Variables."
    );
  }

  const focusPillar = opts.focusPillar ?? pillarForDate();
  const issueDate = opts.issueDate?.trim() || issueDateLabel();
  const client = new Anthropic({ apiKey });

  try {
    const message = await client.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 4096,
      system: buildNewsletterSystemPrompt(focusPillar),
      messages: [
        {
          role: "user",
          content: [
            `Issue date: ${issueDate}`,
            `Focus pillar: ${getFocusPillar(focusPillar).label}`,
            "Use this seed research / link dump / operator notes as source material:",
            "",
            opts.seedText,
          ].join("\n"),
        },
      ],
    });

    const markdown = message.content
      .filter((block) => block.type === "text")
      .map((block) => (block.type === "text" ? block.text : ""))
      .join("")
      .trim();

    if (!markdown) {
      throw new Error("Model returned empty content.");
    }

    return { markdown, focusPillar };
  } catch (error) {
    throw new Error(formatAnthropicError(error));
  }
}

export async function runDailyNewsletterPipeline(opts?: {
  seedText?: string;
  focusPillar?: FocusPillarId;
  issueDate?: string;
  pushToBeehiiv?: boolean;
}): Promise<DailyDraftResult & { beehiivPostId?: string }> {
  const focusPillar = opts?.focusPillar ?? pillarForDate();
  const issueDate = opts?.issueDate?.trim() || issueDateLabel();
  const seedText = opts?.seedText?.trim() || buildAngleSeed(focusPillar, issueDate);

  const { markdown } = await generateDailyMarkdown({
    seedText,
    focusPillar,
    issueDate,
  });

  const title = extractTitleFromMarkdown(markdown) || `StudentStack Daily · ${issueDate}`;
  const subtitle = extractSubtitleFromMarkdown(markdown) || getFocusPillar(focusPillar).label;
  const html = buildBeehiivHtml(markdown, createDefaultDesign(getFocusPillar(focusPillar).label));

  let beehiivPostId: string | undefined;
  if (opts?.pushToBeehiiv) {
    beehiivPostId = await pushBeehiivDraft({ title, subtitle, htmlContent: html });
  }

  return {
    focusPillar,
    issueDate,
    seedText,
    markdown,
    title,
    subtitle,
    html,
    beehiivPostId,
  };
}

export async function pushBeehiivDraft(opts: {
  title: string;
  subtitle?: string;
  htmlContent: string;
}): Promise<string> {
  const apiKey = getBeehiivApiKey();
  const publicationId = getBeehiivPublicationId();
  if (!apiKey || !publicationId) {
    throw new Error("Missing BEEHIIV_API_KEY or BEEHIIV_PUBLICATION_ID.");
  }

  const response = await fetch(`https://api.beehiiv.com/v2/publications/${publicationId}/posts`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: opts.title,
      subtitle: opts.subtitle ?? "",
      body_content: opts.htmlContent,
      status: "draft",
    }),
  });

  const json = (await response.json().catch(() => ({}))) as {
    data?: { id?: string };
    errors?: Array<{ message?: string }>;
    message?: string;
  };

  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message ?? json.message ?? `Beehiiv API error (${response.status})`);
  }

  const postId = json.data?.id;
  if (!postId) {
    throw new Error("Beehiiv did not return a post id.");
  }
  return postId;
}
