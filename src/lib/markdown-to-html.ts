function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function inlineMarkdown(text: string): string {
  return escapeHtml(text)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" style="color:#0ea5e9;text-decoration:underline;">$1</a>');
}

/** Lightweight Markdown → HTML for Beehiiv body_content (headings, lists, paragraphs). */
export function markdownToHtml(markdown: string): string {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const html: string[] = [];
  let inList = false;

  const closeList = () => {
    if (inList) {
      html.push("</ul>");
      inList = false;
    }
  };

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();
    const trimmed = line.trim();

    if (!trimmed) {
      closeList();
      continue;
    }

    if (trimmed.startsWith("### ")) {
      closeList();
      html.push(`<h3 style="margin:20px 0 8px;font-size:18px;font-weight:700;color:#0f172a;">${inlineMarkdown(trimmed.slice(4))}</h3>`);
      continue;
    }

    if (trimmed.startsWith("## ")) {
      closeList();
      html.push(`<h2 style="margin:24px 0 10px;font-size:22px;font-weight:800;color:#0f172a;">${inlineMarkdown(trimmed.slice(3))}</h2>`);
      continue;
    }

    if (trimmed.startsWith("# ")) {
      closeList();
      html.push(`<h1 style="margin:0 0 12px;font-size:28px;font-weight:800;color:#0f172a;">${inlineMarkdown(trimmed.slice(2))}</h1>`);
      continue;
    }

    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      if (!inList) {
        html.push('<ul style="margin:12px 0;padding-left:22px;color:#334155;">');
        inList = true;
      }
      html.push(`<li style="margin:6px 0;line-height:1.6;">${inlineMarkdown(trimmed.slice(2))}</li>`);
      continue;
    }

    closeList();
    html.push(`<p style="margin:12px 0;line-height:1.7;color:#334155;">${inlineMarkdown(trimmed)}</p>`);
  }

  closeList();
  return `<div style="font-family:Georgia,serif;font-size:16px;">${html.join("")}</div>`;
}

export function extractTitleFromMarkdown(markdown: string): string {
  const match = markdown.match(/^#\s+(.+)$/m);
  return match?.[1]?.trim() ?? "";
}

export function extractSubtitleFromMarkdown(markdown: string): string {
  const lines = markdown.split("\n").map((l) => l.trim()).filter(Boolean);
  const titleIndex = lines.findIndex((l) => l.startsWith("# "));
  if (titleIndex >= 0 && lines[titleIndex + 1] && !lines[titleIndex + 1].startsWith("#")) {
    return lines[titleIndex + 1].replace(/^#+\s*/, "");
  }
  return "";
}
