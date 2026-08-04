import { NextResponse } from "next/server";
import { z } from "zod";
import { isAdminAuthorized } from "@/lib/admin-auth";
import { getBeehiivApiKey, getBeehiivPublicationId } from "@/lib/beehiiv-env";
import { markdownToHtml } from "@/lib/markdown-to-html";

const requestSchema = z.object({
  title: z.string().min(1, "title is required."),
  subtitle: z.string().optional(),
  markdownContent: z.string().min(1, "markdownContent is required."),
});

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

  const apiKey = getBeehiivApiKey();
  const publicationId = getBeehiivPublicationId();
  if (!apiKey || !publicationId) {
    return NextResponse.json(
      { error: "Missing BEEHIIV_API_KEY or BEEHIIV_PUBLICATION_ID." },
      { status: 500 }
    );
  }

  const htmlBody = markdownToHtml(parsed.data.markdownContent);

  try {
    const response = await fetch(`https://api.beehiiv.com/v2/publications/${publicationId}/posts`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: parsed.data.title,
        subtitle: parsed.data.subtitle ?? "",
        body_content: htmlBody,
        status: "draft",
      }),
    });

    const json = (await response.json().catch(() => ({}))) as {
      data?: { id?: string };
      errors?: Array<{ message?: string }>;
      message?: string;
    };

    if (!response.ok) {
      const detail =
        json.errors?.[0]?.message ?? json.message ?? `Beehiiv API error (${response.status})`;
      return NextResponse.json({ error: detail }, { status: response.status === 403 ? 403 : 502 });
    }

    const postId = json.data?.id;
    if (!postId) {
      return NextResponse.json({ error: "Beehiiv did not return a post id." }, { status: 502 });
    }

    return NextResponse.json({ success: true, postId });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Beehiiv request failed.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
