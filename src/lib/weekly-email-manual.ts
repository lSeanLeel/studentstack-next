/**
 * Manual weekly parent email (from help@studentstack.info).
 * No OpenAI — you paste copy; this module only formats branded HTML + preview data.
 */

export const WEEKLY_EMAIL_FROM = "StudentStack <help@studentstack.info>";

/** Fixed toolkit slots — fill each week in admin. */
export const MANUAL_TOOLKIT_SLOTS = [
  {
    id: "organization",
    label: "Organization & planning",
    hint: "Calendars, tasks, schedules, file chaos",
  },
  {
    id: "notetaking",
    label: "Notetaking",
    hint: "Capture in class, review after",
  },
  {
    id: "studying",
    label: "Studying & exam prep",
    hint: "Flashcards, practice, spaced repetition",
  },
  {
    id: "research",
    label: "Research & sources",
    hint: "Discovery, citations, sanity-checking claims",
  },
  {
    id: "writing",
    label: "Writing & communication",
    hint: "Essays, emails, clarity without doing the work for them",
  },
] as const;

export type ManualToolkitSlotId = (typeof MANUAL_TOOLKIT_SLOTS)[number]["id"];

export type ManualToolkitPick = {
  id: ManualToolkitSlotId;
  toolName: string;
  blurb: string;
  url: string;
};

export type ManualWeeklyEmailPayload = {
  weekLabel: string;
  /** Shown in inbox preview (hidden preheader) */
  preheader: string;
  /** Short greeting under the hero */
  intro: string;
  toolkit: ManualToolkitPick[];
  opportunityBoardUrl: string;
  opportunityBoardButtonText: string;
  featuredSubject: string;
  featuredParentLabel: string;
  featuredQuestion: string;
  featuredAnswer: string;
  footnote: string;
};

const LS_KEY = "studentstack-manual-weekly-email-v1";

export function createDefaultManualWeeklyEmail(): ManualWeeklyEmailPayload {
  const week = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  return {
    weekLabel: `Week of ${week}`,
    preheader: "AI toolkit picks, opportunity board, and one parent question.",
    intro:
      "Hey there — here’s this week’s StudentStack note: a tight AI toolkit (picked by our team), the link to our running opportunity board, and one featured question from a family like yours.",
    toolkit: MANUAL_TOOLKIT_SLOTS.map((s) => ({
      id: s.id,
      toolName: "",
      blurb: "",
      url: "",
    })),
    opportunityBoardUrl: "https://docs.google.com/spreadsheets/",
    opportunityBoardButtonText: "Open the opportunity board",
    featuredSubject: "This week’s featured question",
    featuredParentLabel: "Parent · anonymized",
    featuredQuestion: "",
    featuredAnswer: "",
    footnote:
      "You're receiving this because you signed up at studentstack.info. Reply any time — we read every message.",
  };
}

export function normalizeManualWeeklyEmail(p: ManualWeeklyEmailPayload): ManualWeeklyEmailPayload {
  const byId = Object.fromEntries(p.toolkit.map((t) => [t.id, t])) as Partial<
    Record<ManualToolkitSlotId, ManualToolkitPick>
  >;
  return {
    ...p,
    toolkit: MANUAL_TOOLKIT_SLOTS.map((s) => ({
      id: s.id,
      toolName: byId[s.id]?.toolName?.trim() ?? "",
      blurb: byId[s.id]?.blurb?.trim() ?? "",
      url: byId[s.id]?.url?.trim() ?? "",
    })),
  };
}

export function loadManualWeeklyEmailDraft(): ManualWeeklyEmailPayload | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw == null || raw.trim() === "") return null;
    const parsed = JSON.parse(raw) as ManualWeeklyEmailPayload;
    if (!parsed || typeof parsed !== "object") return null;
    if (!Array.isArray(parsed.toolkit) || parsed.toolkit.length !== MANUAL_TOOLKIT_SLOTS.length) return null;
    return parsed;
  } catch {
    try {
      localStorage.removeItem(LS_KEY);
    } catch {
      /* ignore */
    }
    return null;
  }
}

export function saveManualWeeklyEmailDraft(data: ManualWeeklyEmailPayload): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(data));
  } catch {
    /* ignore quota */
  }
}

export function clearManualWeeklyEmailDraft(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(LS_KEY);
}

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function nl2br(s: string): string {
  return escapeHtml(s).replace(/\r\n|\r|\n/g, "<br/>");
}

/** Safe href for mail clients (Sheet, toolkit links). */
export function linkifyEmailHref(url: string): string {
  const t = url.trim();
  if (!t) return "#";
  try {
    const u = new URL(t.startsWith("http") ? t : `https://${t}`);
    return u.toString();
  } catch {
    return "#";
  }
}

/**
 * Gmail-safe HTML: tables, inline styles, web-safe fonts (Fredoka not assumed in clients).
 */
export function buildManualWeeklyEmailHtml(p: ManualWeeklyEmailPayload): string {
  const esc = escapeHtml;
  const outerBg = "#f1f5f9";
  const card = "#ffffff";
  const slate900 = "#0f172a";
  const slate600 = "#475569";
  const slate500 = "#64748b";
  const sky600 = "#0284c7";
  const sky500 = "#0ea5e9";
  const sky100 = "#e0f2fe";
  const violetSoft = "#f5f3ff";

  const toolkitRows = p.toolkit
    .map((slot, i) => {
      const meta = MANUAL_TOOLKIT_SLOTS.find((m) => m.id === slot.id);
      const label = meta?.label ?? slot.id;
      const name = slot.toolName.trim() || "— TBD this week —";
      const blurb = slot.blurb.trim() || "Add a one-line note in admin.";
      const url = slot.url.trim();
      const linkHtml = url
        ? `<a href="${esc(linkifyEmailHref(url))}" style="color:${sky600};font-weight:700;text-decoration:underline;font-size:13px;">Open tool</a>`
        : `<span style="font-size:12px;color:${slate500};font-style:italic;">No link</span>`;
      const stripe = i % 2 === 0 ? "#f8fafc" : "#ffffff";
      return `<tr>
        <td style="padding:0;border-bottom:1px solid #e2e8f0;background:${stripe};">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
            <tr>
              <td style="width:4px;background:${sky500};"></td>
              <td style="padding:16px 18px 16px 14px;">
                <p style="margin:0 0 4px 0;font-size:10px;font-weight:800;letter-spacing:0.16em;text-transform:uppercase;color:${sky600};">${esc(label)}</p>
                <p style="margin:0 0 6px 0;font-size:17px;font-weight:700;letter-spacing:-0.02em;color:${slate900};font-family:Georgia,'Times New Roman',serif;">${esc(name)}</p>
                <p style="margin:0 0 10px 0;font-size:14px;line-height:1.55;color:${slate600};font-family:system-ui,-apple-system,'Segoe UI',sans-serif;">${nl2br(blurb)}</p>
                ${linkHtml}
              </td>
            </tr>
          </table>
        </td>
      </tr>`;
    })
    .join("");

  const sheetUrl = linkifyEmailHref(p.opportunityBoardUrl);
  const btnText = p.opportunityBoardButtonText.trim() || "Open the opportunity board";

  const ctaBlock = `
  <table role="presentation" cellspacing="0" cellpadding="0" style="margin:20px 0 4px 0;">
    <tr>
      <td style="border-radius:14px;background:linear-gradient(135deg,${sky500} 0%,#2563eb 100%);box-shadow:0 10px 24px -12px rgba(14,165,233,0.65);">
        <a href="${esc(sheetUrl)}" target="_blank" rel="noopener noreferrer"
          style="display:inline-block;padding:15px 28px;font-family:system-ui,-apple-system,'Segoe UI',sans-serif;font-size:14px;font-weight:800;letter-spacing:0.06em;text-transform:uppercase;color:#ffffff;text-decoration:none;">
          ${esc(btnText)}
        </a>
      </td>
    </tr>
  </table>
  <p style="margin:10px 0 0 0;font-size:12px;line-height:1.45;color:${slate500};font-family:system-ui,-apple-system,sans-serif;">
    Same board every week — we tidy rows and deadlines as we learn them. Always double-check dates on the program&apos;s site before your student applies.
  </p>`;

  const qaBlock = `
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;border-radius:18px;overflow:hidden;border:1px solid #e9d5ff;background:${card};box-shadow:0 16px 40px -28px rgba(109,40,217,0.35);margin-top:8px;">
    <tr>
      <td style="padding:16px 18px;background:linear-gradient(90deg,${violetSoft} 0%,#fafafa 100%);border-bottom:1px solid #ede9fe;">
        <p style="margin:0;font-size:10px;font-weight:800;letter-spacing:0.2em;text-transform:uppercase;color:#6d28d9;font-family:system-ui,-apple-system,sans-serif;">Featured parent question</p>
        <p style="margin:8px 0 0 0;font-size:13px;font-weight:700;color:${slate900};font-family:Georgia,serif;">${esc(p.featuredSubject || "This week")}</p>
        <p style="margin:6px 0 0 0;font-size:12px;color:${slate500};font-family:system-ui,-apple-system,sans-serif;"><strong style="color:${slate600};">From:</strong> ${esc(p.featuredParentLabel || "Parent (anonymized)")}</p>
      </td>
    </tr>
    <tr>
      <td style="padding:18px 20px;font-size:15px;line-height:1.6;color:#334155;font-family:system-ui,-apple-system,sans-serif;border-bottom:1px solid #f1f5f9;">
        ${nl2br(p.featuredQuestion || "(Add the parent question in admin.)")}
      </td>
    </tr>
    <tr>
      <td style="padding:18px 20px;background:linear-gradient(180deg,#f0f9ff 0%,#ffffff 100%);border-left:4px solid ${sky500};">
        <p style="margin:0 0 8px 0;font-size:10px;font-weight:800;letter-spacing:0.18em;text-transform:uppercase;color:${sky600};font-family:system-ui,-apple-system,sans-serif;">StudentStack team</p>
        <p style="margin:0;font-size:15px;line-height:1.6;color:#1e293b;font-family:system-ui,-apple-system,sans-serif;">
          ${nl2br(p.featuredAnswer || "(Add your answer in admin.)")}
        </p>
      </td>
    </tr>
  </table>`;

  const introBlock = p.intro.trim()
    ? `<p style="margin:0 0 18px 0;font-size:15px;line-height:1.65;color:#334155;font-family:system-ui,-apple-system,sans-serif;">${nl2br(p.intro)}</p>`
    : "";

  const foot = p.footnote.trim()
    ? `<p style="margin:0;font-size:12px;line-height:1.55;color:#94a3b8;">${nl2br(p.footnote)}</p>`
    : `<p style="margin:0;font-size:12px;line-height:1.55;color:#94a3b8;">${nl2br(createDefaultManualWeeklyEmail().footnote)}</p>`;

  /** Same two-tone wordmark as IntroAnimation / BrandWordmark (Student #0f172a, Stack #0ea5e9). */
  const wordmarkFooter = `<p style="margin:0;font-size:20px;font-weight:600;letter-spacing:-0.04em;line-height:1;font-family:'Fredoka','Helvetica Neue',Helvetica,Arial,sans-serif;">
    <span style="color:#0f172a;">Student</span><span style="color:#0ea5e9;">Stack</span>
  </p>`;

  return `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${esc(p.weekLabel)} — StudentStack</title>
</head>
<body style="margin:0;padding:0;background:${outerBg};-webkit-text-size-adjust:100%;">
  <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">${esc(p.preheader)}</div>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;background:${outerBg};padding:24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="border-collapse:collapse;max-width:600px;width:100%;">
          <tr>
            <td style="border-radius:28px;overflow:hidden;border:1px solid #cbd5e1;box-shadow:0 28px 80px -40px rgba(15,23,42,0.45);background:${card};">
              <!-- Header -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;background:linear-gradient(135deg,#0f172a 0%,#0c4a6e 55%,#075985 100%);">
                <tr>
                  <td style="padding:26px 28px 22px;">
                    <p style="margin:0;font-size:11px;font-weight:800;letter-spacing:0.28em;text-transform:uppercase;color:#7dd3fc;font-family:system-ui,-apple-system,sans-serif;">StudentStack</p>
                    <h1 style="margin:10px 0 0 0;font-size:26px;font-weight:700;letter-spacing:-0.03em;line-height:1.15;color:#ffffff;font-family:Georgia,'Times New Roman',serif;">Weekly parent email</h1>
                    <p style="margin:8px 0 0 0;font-size:14px;color:#bae6fd;font-family:system-ui,-apple-system,sans-serif;opacity:0.95;">${esc(p.weekLabel)}</p>
                  </td>
                </tr>
              </table>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
                <tr>
                  <td style="padding:24px 26px 8px;">
                    ${introBlock}

                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;border-radius:20px;overflow:hidden;border:1px solid ${sky100};margin-bottom:10px;box-shadow:0 14px 36px -24px rgba(14,165,233,0.45);">
                      <tr>
                        <td style="padding:14px 18px;background:linear-gradient(135deg,#f0f9ff 0%,#ffffff 48%,#faf5ff 100%);border-bottom:1px solid #e0f2fe;">
                          <p style="margin:0;font-size:10px;font-weight:800;letter-spacing:0.22em;text-transform:uppercase;color:${sky600};font-family:system-ui,-apple-system,sans-serif;">AI toolkit</p>
                          <p style="margin:6px 0 0 0;font-size:15px;font-weight:700;color:${slate900};font-family:Georgia,serif;">This week&apos;s picks (by category)</p>
                          <p style="margin:6px 0 0 0;font-size:13px;line-height:1.45;color:${slate600};font-family:system-ui,-apple-system,sans-serif;">Curated by our team — not auto-generated. One standout tool per lane.</p>
                        </td>
                      </tr>
                      ${toolkitRows}
                    </table>

                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;border-radius:20px;overflow:hidden;border:1px solid #ccfbf1;margin-bottom:8px;background:#f0fdfa;">
                      <tr>
                        <td style="padding:16px 18px;border-bottom:1px solid #99f6e4;">
                          <p style="margin:0;font-size:10px;font-weight:800;letter-spacing:0.2em;text-transform:uppercase;color:#0f766e;font-family:system-ui,-apple-system,sans-serif;">Opportunity board</p>
                          <p style="margin:6px 0 0 0;font-size:16px;font-weight:700;color:#134e4a;font-family:Georgia,serif;">Google Sheet · programs &amp; deadlines</p>
                          <p style="margin:6px 0 0 0;font-size:13px;line-height:1.5;color:#115e59;font-family:system-ui,-apple-system,sans-serif;">Living spreadsheet you update — parents always get the same link.</p>
                          ${ctaBlock}
                        </td>
                      </tr>
                    </table>

                    ${qaBlock}

                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top:22px;border-collapse:collapse;">
                      <tr>
                        <td style="padding:18px 4px 8px;text-align:center;">
                          ${wordmarkFooter}
                          <p style="margin:6px 0 0 0;font-size:12px;color:${slate500};font-family:system-ui,-apple-system,sans-serif;">
                            <a href="mailto:help@studentstack.info" style="color:${sky600};font-weight:600;text-decoration:none;">help@studentstack.info</a>
                            &nbsp;·&nbsp;
                            <a href="https://studentstack.info" style="color:${sky600};font-weight:600;text-decoration:none;">studentstack.info</a>
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:0 12px 22px;text-align:center;">
                          ${foot}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`.trim();
}
