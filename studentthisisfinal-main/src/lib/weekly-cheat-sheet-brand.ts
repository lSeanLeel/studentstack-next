/**
 * StudentStack weekly email: branded section names + HTML assembly.
 * Used by landing preview copy and admin email export.
 */

export type ResearchSpreadsheetRow = {
  opportunity: string;
  deadline: string;
  gate: string;
};

export const CHEAT_SHEET_BRAND = {
  productName: "StudentStack",
  tagline: "Weekly Parent Email",
  sections: {
    researchList: {
      id: "research",
      title: "High School AI Research Tracker",
      shortLabel: "Research tracker",
      spreadsheetTitle: "StudentStack gated research sheet (weekly export)",
      description:
        "Curated deadlines, programs, and opportunities, skimmed for busy families. No essay-length briefings.",
    },
    teamQA: {
      id: "qa",
      title: "Featured Parent Q&A",
      shortLabel: "Parent Q&A",
      description:
        "Real college students answer how they actually use AI for classes, research, and staying organized, so you can coach your teen with confidence.",
    },
    toolRoster: {
      id: "tools",
      titleSuffix: "this week",
      titlePrefix: "StudentStack",
      rosterName: "Tools our team is using",
      shortLabel: "Team tools",
      description:
        "Our running roster of vetted AI tools for school, refreshed so you’re not chasing random TikTok picks.",
    },
  },
} as const;

export type CheatSheetContent = {
  weekLabel: string;
  /** Legacy one-line bullets; migrated to researchRows when missing */
  researchBullets?: string[];
  researchRows: ResearchSpreadsheetRow[];
  qaSubject: string;
  qaParentLabel: string;
  qaQuestion: string;
  qaAnswer: string;
  toolListName: string;
  toolEmailSubject: string;
  toolListItems: string[];
};

/** Normalize older payloads or bullet-only content into spreadsheet rows */
export function normalizeResearchRows(c: Pick<CheatSheetContent, "researchRows" | "researchBullets">): ResearchSpreadsheetRow[] {
  if (Array.isArray(c.researchRows) && c.researchRows.length) return c.researchRows;
  const bullets = c.researchBullets?.filter(Boolean) ?? [];
  return bullets.map((text) => ({
    opportunity: text,
    deadline: "N/A",
    gate: "See weekly sheet",
  }));
}

/** Paste from Google Sheets: tab-separated columns, or pipe-separated in one line */
export function parseResearchRowsFromPaste(text: string): ResearchSpreadsheetRow[] {
  const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  const rows: ResearchSpreadsheetRow[] = [];
  for (const line of lines) {
    const pipe = line.split("|").map((s) => s.trim());
    if (pipe.length >= 3) {
      rows.push({
        opportunity: pipe[0],
        deadline: pipe[1],
        gate: pipe.slice(2).join(" | "),
      });
      continue;
    }
    const tab = line.split("\t").map((s) => s.trim());
    if (tab.length >= 3) {
      rows.push({
        opportunity: tab[0],
        deadline: tab[1],
        gate: tab.slice(2).join(" "),
      });
    }
  }
  return rows;
}

export function formatResearchRowsForEditor(rows: ResearchSpreadsheetRow[]): string {
  return rows.map((r) => `${r.opportunity} | ${r.deadline} | ${r.gate}`).join("\n");
}

export const DEFAULT_WEEKLY_EMAIL_SAMPLE: CheatSheetContent = {
  weekLabel: "Week of May 11, 2026",
  researchRows: [
    {
      opportunity: "USC SHINE AI (high school research cohort)",
      deadline: "May 15, 11:59 PT",
      gate: "Transcript + 1 mentor ref; gated application portal",
    },
    {
      opportunity: "AI4ALL Regional Summer Lab",
      deadline: "May 22",
      gate: "Open to 10th and 11th; fee waiver on request",
    },
    {
      opportunity: "STEM Bridge Scholarship (essay + STEM portfolio)",
      deadline: "June 1",
      gate: "300-word prompt; uploaded PDF only",
    },
  ],
  qaSubject: "Re: Junior year + ChatGPT: school-safe workflow?",
  qaParentLabel: "Parent, Bay Area, 11th grade",
  qaQuestion:
    "Hi StudentStack. My kid drafts essays in Google Docs then drops them into ChatGPT for ‘grammar.’ Teachers are talking about AI detectors. What’s a realistic rule we can actually stick to?",
  qaAnswer:
    "Thanks for writing in. We coach families to treat AI like a tutor that never submits the final: brainstorm and outlines only in-session, then your student rewrites every sentence in their own voice. Many of our students keep a one-line citation at the top of drafts (“Brainstormed with ChatGPT on 5/10”) so teachers see transparency without drama. Happy to share the exact prompt templates we use; reply to this thread.",
  toolEmailSubject: "Fwd: Tools the StudentStack team is using (week of May 11)",
  toolListName: "Tools the StudentStack team is using",
  toolListItems: [
    "NotebookLM: syllabus PDF to 10-minute oral quiz cards.",
    "Perplexity: quick source leads; we still click through and cite.",
    "Notion AI: meeting notes from counselor calls to a task list for parents.",
  ],
};

export function buildCheatSheetEmailHtml(c: CheatSheetContent): string {
  const esc = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const toolItems = c.toolListItems ?? [];
  const rows = normalizeResearchRows(c);
  const tableRows = rows
    .map(
      (r) =>
        `<tr><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;font-size:14px;color:#0f172a;font-weight:600;">${esc(r.opportunity)}</td><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;font-size:13px;color:#475569;white-space:nowrap;">${esc(r.deadline)}</td><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;font-size:13px;color:#334155;">${esc(r.gate)}</td></tr>`
    )
    .join("");
  const researchTable = rows.length
    ? `<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;margin:14px 0 0 0;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;"><thead><tr style="background:#f8fafc;"><th align="left" style="padding:10px 12px;font-size:10px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;color:#64748b;">Opportunity</th><th align="left" style="padding:10px 12px;font-size:10px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;color:#64748b;">Deadline</th><th align="left" style="padding:10px 12px;font-size:10px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;color:#64748b;">Gate / apply</th></tr></thead><tbody>${tableRows}</tbody></table><p style="margin:10px 0 0 0;font-size:12px;color:#64748b;">Verify deadlines on each program’s site before your student applies.</p>`
    : `<p style="margin:12px 0 0 0;font-size:15px;color:#64748b;font-style:italic;">Add rows in admin or generate for this week.</p>`;

  const qaBlock = `
    <div style="border-radius:18px;border:1px solid #e2e8f0;background:#fff;padding:0;margin-bottom:14px;overflow:hidden;box-shadow:0 10px 30px -18px rgba(15,23,42,0.12);">
      <div style="padding:14px 16px;border-bottom:1px solid #f1f5f9;background:#fafafa;">
        <p style="margin:0;font-size:11px;font-weight:700;color:#64748b;">${esc(c.qaSubject || "Parent question")}</p>
        <p style="margin:6px 0 0 0;font-size:12px;color:#0f172a;"><strong>From:</strong> ${esc(c.qaParentLabel || "Parent")} &lt;parents@studentstack.mail&gt;</p>
      </div>
      <div style="padding:16px 18px;font-size:15px;line-height:1.55;color:#334155;border-bottom:1px solid #f1f5f9;">${esc(c.qaQuestion || "")}</div>
      <div style="padding:16px 18px;background:#f8fafc;border-left:4px solid #0ea5e9;">
        <p style="margin:0 0 8px 0;font-size:10px;font-weight:800;letter-spacing:0.14em;text-transform:uppercase;color:#0284c7;">StudentStack team</p>
        <p style="margin:0;font-size:15px;line-height:1.55;color:#1e293b;">${esc(c.qaAnswer || "")}</p>
      </div>
    </div>`;

  const li = (items: string[]) =>
    items
      .filter(Boolean)
      .map(
        (t) =>
          `<li style="margin:0 0 10px 0;padding-left:4px;font-family:system-ui,-apple-system,sans-serif;font-size:15px;line-height:1.5;color:#334155;">${esc(t)}</li>`
      )
      .join("");

  const toolSectionTitle = `${esc(c.toolListName)} <span style="color:#0284c7;">(${esc(CHEAT_SHEET_BRAND.sections.toolRoster.titleSuffix)})</span>`;

  const toolsBlock = toolItems.length
    ? `<ul style="margin:0;padding:16px 20px 18px 36px;">${li(toolItems)}</ul>`
    : `<p style="margin:0;padding:16px 18px;font-size:15px;color:#64748b;font-style:italic;">Tools for this week: fill in admin.</p>`;

  return `
<div style="max-width:560px;margin:0 auto;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f8fafc;border-radius:24px;overflow:hidden;border:1px solid #e0f2fe;">
  <div style="background:linear-gradient(135deg,#0f172a 0%,#0c4a6e 100%);padding:20px 22px;color:#fff;">
    <p style="margin:0;font-size:10px;font-weight:800;letter-spacing:0.22em;text-transform:uppercase;color:#7dd3fc;">${esc(CHEAT_SHEET_BRAND.productName)}</p>
    <h1 style="margin:8px 0 0 0;font-size:22px;font-weight:700;letter-spacing:-0.02em;color:#fff;">${esc(CHEAT_SHEET_BRAND.tagline)}</h1>
    <p style="margin:6px 0 0 0;font-size:13px;color:#bae6fd;opacity:0.95;">${esc(c.weekLabel)}</p>
  </div>
  <div style="padding:20px 22px;background:#ffffff;">
    <div style="border-radius:16px;border:1px solid #bae6fd;background:linear-gradient(135deg,#f0f9ff 0%,#ffffff 50%,#faf5ff 100%);padding:16px 18px;margin-bottom:16px;">
      <p style="margin:0;font-size:10px;font-weight:800;letter-spacing:0.2em;text-transform:uppercase;color:#0284c7;">${esc(CHEAT_SHEET_BRAND.tagline)}</p>
      <p style="margin:8px 0 0 0;font-size:12px;font-weight:600;color:#475569;line-height:1.45;">Deadlines and gates you can scan in under a minute.</p>
    </div>

    <div style="margin-bottom:16px;border-radius:16px;border:1px solid #e2e8f0;overflow:hidden;background:#fff;box-shadow:0 10px 30px -18px rgba(15,23,42,0.12);">
      <div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:8px;background:#0f766e;padding:8px 12px;">
        <span style="font-size:10px;font-weight:800;letter-spacing:0.14em;text-transform:uppercase;color:#fff;">${esc(CHEAT_SHEET_BRAND.sections.researchList.spreadsheetTitle)}</span>
        <span style="font-size:9px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.9);background:rgba(255,255,255,0.15);padding:4px 8px;border-radius:6px;">Sheet export</span>
      </div>
      <div style="padding:12px 14px 14px;">
        <p style="margin:0 0 8px 0;font-size:11px;font-weight:700;color:#475569;">${esc(CHEAT_SHEET_BRAND.sections.researchList.title)}</p>
        ${researchTable}
      </div>
    </div>

    ${qaBlock}

    <div style="margin-top:16px;border-radius:16px;border:1px solid #e0f2fe;overflow:hidden;background:#fff;box-shadow:0 10px 30px -18px rgba(14,165,233,0.2);">
      <div style="padding:12px 14px;background:#f0f9ff;border-bottom:1px solid #bae6fd;">
        <p style="margin:0;font-size:10px;font-weight:800;letter-spacing:0.18em;text-transform:uppercase;color:#0369a1;">Forwarded to parents</p>
        <p style="margin:6px 0 0 0;font-size:11px;font-weight:700;color:#475569;">${esc(c.toolEmailSubject || "This week’s tools")}</p>
        <h3 style="margin:8px 0 0 0;font-size:16px;font-weight:600;color:#0f172a;">${toolSectionTitle}</h3>
      </div>
      ${toolsBlock}
    </div>
  </div>
</div>`.trim();
}
