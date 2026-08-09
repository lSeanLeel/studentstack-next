import { markdownToHtml } from "@/lib/markdown-to-html";

export type NewsletterDesign = {
  presetId: string;
  brandName: string;
  accent: string;
  accentSoft: string;
  ink: string;
  muted: string;
  paper: string;
  headerStyle: "bar" | "stacked" | "minimal";
  bodyFont: "georgia" | "system" | "rounded";
  showPillarBadge: boolean;
  pillarLabel: string;
  footerNote: string;
};

export const DESIGN_PRESETS: Array<{
  id: string;
  label: string;
  hint: string;
  design: Omit<NewsletterDesign, "pillarLabel" | "footerNote" | "brandName">;
}> = [
  {
    id: "sky-classic",
    label: "Sky Classic",
    hint: "Default StudentStack — sky accent",
    design: {
      presetId: "sky-classic",
      accent: "#0ea5e9",
      accentSoft: "#e0f2fe",
      ink: "#0f172a",
      muted: "#475569",
      paper: "#f8fafc",
      headerStyle: "bar",
      bodyFont: "georgia",
      showPillarBadge: true,
    },
  },
  {
    id: "campus-mint",
    label: "Campus Mint",
    hint: "Fresh organizing energy",
    design: {
      presetId: "campus-mint",
      accent: "#059669",
      accentSoft: "#d1fae5",
      ink: "#064e3b",
      muted: "#047857",
      paper: "#f0fdf4",
      headerStyle: "stacked",
      bodyFont: "rounded",
      showPillarBadge: true,
    },
  },
  {
    id: "amber-focus",
    label: "Amber Focus",
    hint: "Warm parent-forward note",
    design: {
      presetId: "amber-focus",
      accent: "#ea580c",
      accentSoft: "#ffedd5",
      ink: "#1c1917",
      muted: "#78716c",
      paper: "#fffbeb",
      headerStyle: "bar",
      bodyFont: "georgia",
      showPillarBadge: true,
    },
  },
  {
    id: "slate-editorial",
    label: "Slate Editorial",
    hint: "Quieter paste-in for Beehiiv",
    design: {
      presetId: "slate-editorial",
      accent: "#334155",
      accentSoft: "#e2e8f0",
      ink: "#0f172a",
      muted: "#64748b",
      paper: "#ffffff",
      headerStyle: "minimal",
      bodyFont: "system",
      showPillarBadge: false,
    },
  },
];

export function createDefaultDesign(pillarLabel = "Organization"): NewsletterDesign {
  const base = DESIGN_PRESETS[0].design;
  return {
    ...base,
    brandName: "StudentStack Daily",
    pillarLabel,
    footerNote:
      "You're receiving StudentStack because you signed up for the free daily on AI for student organization. Reply anytime — we read every note.",
  };
}

function fontStack(bodyFont: NewsletterDesign["bodyFont"]): string {
  if (bodyFont === "rounded") {
    return '"Plus Jakarta Sans", "Nunito Sans", "Segoe UI", sans-serif';
  }
  if (bodyFont === "system") {
    return '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif';
  }
  return 'Georgia, "Times New Roman", Times, serif';
}

function escape(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Beehiiv-ready HTML (paste into Beehiiv body). */
export function buildBeehiivHtml(markdown: string, design: NewsletterDesign): string {
  const bodyInner = markdownToHtml(markdown)
    .replace(/^<div[^>]*>/, "")
    .replace(/<\/div>$/, "");

  const font = fontStack(design.bodyFont);
  const badge = design.showPillarBadge
    ? `<div style="display:inline-block;margin:0 0 16px;padding:6px 12px;border-radius:999px;background:${design.accentSoft};color:${design.accent};font-family:${font};font-size:11px;font-weight:800;letter-spacing:0.14em;text-transform:uppercase;">${escape(
        design.pillarLabel
      )} · organizing angle</div>`
    : "";

  let header = "";
  if (design.headerStyle === "bar") {
    header = `
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px;border-collapse:collapse;">
        <tr>
          <td style="background:${design.accent};border-radius:18px;padding:18px 22px;">
            <div style="font-family:${font};font-size:11px;font-weight:800;letter-spacing:0.18em;text-transform:uppercase;color:rgba(255,255,255,0.85);">Free daily for parents</div>
            <div style="margin-top:6px;font-family:${font};font-size:22px;font-weight:800;color:#ffffff;letter-spacing:-0.02em;">${escape(
              design.brandName
            )}</div>
          </td>
        </tr>
      </table>`;
  } else if (design.headerStyle === "stacked") {
    header = `
      <div style="margin:0 0 20px;padding-bottom:16px;border-bottom:3px solid ${design.accent};">
        <div style="font-family:${font};font-size:11px;font-weight:800;letter-spacing:0.18em;text-transform:uppercase;color:${design.accent};">Student organization · AI</div>
        <div style="margin-top:8px;font-family:${font};font-size:26px;font-weight:800;color:${design.ink};letter-spacing:-0.03em;">${escape(
          design.brandName
        )}</div>
      </div>`;
  } else {
    header = `
      <div style="margin:0 0 18px;">
        <div style="font-family:${font};font-size:13px;font-weight:700;color:${design.muted};">${escape(
          design.brandName
        )}</div>
      </div>`;
  }

  return `<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:${design.paper};">
  <div style="max-width:640px;margin:0 auto;padding:28px 20px 40px;background:${design.paper};color:${design.ink};font-family:${font};font-size:16px;line-height:1.65;">
    ${header}
    ${badge}
    <div style="color:${design.muted};">
      ${bodyInner}
    </div>
    <hr style="border:none;border-top:1px solid ${design.accentSoft};margin:32px 0 16px;" />
    <p style="margin:0;font-size:12px;line-height:1.6;color:${design.muted};font-family:${font};">${escape(
      design.footerNote
    )}</p>
  </div>
</body>
</html>`;
}

export const SAMPLE_DAILY_MARKDOWN = `# Keep the week from collapsing into catch-up

A short daily for parents: how AI helps a high schooler stay organized for school.

## Today's organizing angle · Organization

The students who look “fine” midweek are usually the ones with a reset habit — not more apps. Today’s issue is about a 12-minute folder + deadline reset a parent can forward tonight.

## Signal

AI note-takers and planners keep shipping features. The useful filter for parents: does this help your student *see* their week, or does it just generate more text? Organization first. Speed second.

## Parent note

[EDIT PARENT NOTE HERE]

Hey — quick one. If your student’s week already feels like catch-up by Wednesday, skip the new-tool hunt. Ask them to run one reset: clear the downloads pile, put every due date into one place, and pick three priorities before tomorrow’s first class.

## The toolkit move

**Name:** Weekly reset board (ChatGPT / Claude + any notes app)
**What it does:** Turns a messy syllabus + inbox dump into a one-page week map.
**Student use case:** Paste class names + due dates → ask for a sorted list with buffers → copy into Notes/Google Calendar.

## Forward this

Text your student: “Spend 12 minutes on a week reset — folders, due dates, three priorities. Send me a screenshot of the list when you’re done.”
`;
