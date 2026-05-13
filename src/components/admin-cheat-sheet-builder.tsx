"use client";

import { useState } from "react";
import { Loader2, Wand2, Copy, Check, FileCode2, CalendarClock } from "lucide-react";
import {
  buildCheatSheetEmailHtml,
  DEFAULT_WEEKLY_EMAIL_SAMPLE,
  formatResearchRowsForEditor,
  parseResearchRowsFromPaste,
  type CheatSheetContent,
} from "@/lib/weekly-cheat-sheet-brand";
import { WeeklyEmailPreview } from "./WeeklyEmailPreview";
import { formatWeekLabelFromDate } from "@/lib/cheat-sheet-generate";

const emptyContent = (week: string): CheatSheetContent => ({
  ...DEFAULT_WEEKLY_EMAIL_SAMPLE,
  weekLabel: week,
});

export function AdminCheatSheetBuilder() {
  const [weekLabel, setWeekLabel] = useState(() => formatWeekLabelFromDate(new Date()));
  const [contextUrl, setContextUrl] = useState("");
  const [contextNotes, setContextNotes] = useState("");
  const [content, setContent] = useState<CheatSheetContent>(() => emptyContent(weekLabel));
  const [researchPaste, setResearchPaste] = useState(() => formatResearchRowsForEditor(DEFAULT_WEEKLY_EMAIL_SAMPLE.researchRows));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const parsedResearch = parseResearchRowsFromPaste(researchPaste);
  const mergedContent: CheatSheetContent = {
    ...content,
    weekLabel: weekLabel.trim() || content.weekLabel,
    researchRows: parsedResearch.length ? parsedResearch : content.researchRows,
  };

  const html = buildCheatSheetEmailHtml({
    ...mergedContent,
    toolListItems: mergedContent.toolListItems.filter(Boolean),
  });

  async function generateAi() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/cheat-sheet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          weekLabel: weekLabel.trim(),
          contextUrl: contextUrl.trim() || undefined,
          contextNotes: contextNotes.trim() || undefined,
        }),
      });
      const data = (await res.json()) as { content?: CheatSheetContent; error?: string };
      if (!res.ok) {
        setError(data.error ?? "Request failed");
        return;
      }
      if (data.content) {
        setContent(data.content);
        setResearchPaste(formatResearchRowsForEditor(data.content.researchRows));
      }
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  function applyWeekFromToday() {
    const label = formatWeekLabelFromDate(new Date());
    setWeekLabel(label);
    setContent((c) => ({ ...c, weekLabel: label }));
  }

  async function copyHtml() {
    try {
      await navigator.clipboard.writeText(html);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError("Copy failed");
    }
  }

  return (
    <section className="card-pop p-6">
      <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-sky-100 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-sky-800">
        <FileCode2 className="h-3.5 w-3.5" />
        Weekly email engine
      </div>
      <h2 className="text-xl font-black text-slate-900">Weekly email builder</h2>
      <p className="mt-2 text-sm font-semibold text-slate-600">
        Build the three blocks parents see: spreadsheet-style research rows, a real parent email thread, and a forwarded “tools
        we use” list. Export HTML for your ESP: same shape every week.
      </p>

      <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50/90 p-4">
        <p className="text-xs font-black uppercase tracking-widest text-slate-500">Weekly automation</p>
        <p className="mt-2 text-sm font-semibold text-slate-600">
          Schedule a job (GitHub Actions, Vercel Cron, etc.) to POST to{" "}
          <code className="rounded bg-white px-1.5 py-0.5 text-xs text-slate-800">/api/admin/cheat-sheet/cron</code> with header{" "}
          <code className="rounded bg-white px-1.5 py-0.5 text-xs">Authorization: Bearer CRON_SECRET</code>. Optional JSON:{" "}
          <code className="text-xs">weekLabel</code>, <code className="text-xs">contextUrl</code>,{" "}
          <code className="text-xs">contextNotes</code>. Set <code className="text-xs">CRON_SECRET</code> and{" "}
          <code className="text-xs">OPENAI_API_KEY</code> in production.
        </p>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="block text-xs font-black uppercase tracking-widest text-slate-500">
          Week label (email header)
          <input
            value={weekLabel}
            onChange={(e) => setWeekLabel(e.target.value)}
            className="mt-1.5 w-full rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-sky-300"
          />
        </label>
        <div className="flex flex-col justify-end gap-2">
          <button
            type="button"
            onClick={applyWeekFromToday}
            className="button-bubble inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 text-xs font-black uppercase tracking-widest text-slate-700 shadow-[0_4px_0_0_#e2e8f0]"
          >
            <CalendarClock className="h-4 w-4" />
            Use this week’s date
          </button>
        </div>
      </div>

      <label className="mt-4 block text-xs font-black uppercase tracking-widest text-slate-500">
        Optional article / tool URL
        <input
          value={contextUrl}
          onChange={(e) => setContextUrl(e.target.value)}
          placeholder="https://…"
          className="mt-1.5 w-full rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-sky-300"
        />
      </label>

      <label className="mt-4 block text-xs font-black uppercase tracking-widest text-slate-500">
        Notes for generation (optional)
        <textarea
          value={contextNotes}
          onChange={(e) => setContextNotes(e.target.value)}
          rows={3}
          className="mt-1.5 w-full rounded-2xl border-2 border-slate-200 bg-slate-50 p-3 text-sm font-medium outline-none focus:border-sky-300"
          placeholder="e.g. emphasize UC prompts, one STEM scholarship, junior spring timeline…"
        />
      </label>

      <button
        type="button"
        onClick={generateAi}
        disabled={loading || !weekLabel.trim()}
        className="button-bubble mt-4 inline-flex items-center gap-2 bg-sky-600 px-6 py-3 text-sm uppercase tracking-widest text-white shadow-[0_8px_0_0_#0369a1] disabled:opacity-50"
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Wand2 className="h-4 w-4" />}
        Generate this week
      </button>

      <div className="mt-6">
        <p className="mb-2 text-xs font-black uppercase tracking-widest text-slate-500">Live preview</p>
        <WeeklyEmailPreview content={mergedContent} compact />
      </div>

      <div className="mt-6 space-y-4 rounded-3xl border border-slate-100 bg-slate-50/80 p-4">
        <h3 className="text-sm font-black text-slate-900">Manual edits</h3>

        <label className="block text-xs font-bold text-slate-600">
          Research sheet (paste from Google Sheets or use{" "}
          <strong className="text-slate-800">Opportunity | Deadline | Gate</strong> per line)
          <textarea
            value={researchPaste}
            onChange={(e) => setResearchPaste(e.target.value)}
            rows={6}
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white p-3 font-mono text-xs leading-relaxed"
          />
        </label>

        <label className="block text-xs font-bold text-slate-600">
          Q&A: subject line
          <input
            value={content.qaSubject}
            onChange={(e) => setContent((c) => ({ ...c, qaSubject: e.target.value }))}
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white p-3 text-sm"
          />
        </label>
        <label className="block text-xs font-bold text-slate-600">
          Q&A: from line (masked parent label)
          <input
            value={content.qaParentLabel}
            onChange={(e) => setContent((c) => ({ ...c, qaParentLabel: e.target.value }))}
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white p-3 text-sm"
          />
        </label>
        <label className="block text-xs font-bold text-slate-600">
          Q&A: parent email body
          <textarea
            value={content.qaQuestion}
            onChange={(e) => setContent((c) => ({ ...c, qaQuestion: e.target.value }))}
            rows={5}
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white p-3 text-sm leading-relaxed"
          />
        </label>
        <label className="block text-xs font-bold text-slate-600">
          Q&A: StudentStack reply
          <textarea
            value={content.qaAnswer}
            onChange={(e) => setContent((c) => ({ ...c, qaAnswer: e.target.value }))}
            rows={5}
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white p-3 text-sm leading-relaxed"
          />
        </label>

        <label className="block text-xs font-bold text-slate-600">
          Tools: forwarded subject (email header feel)
          <input
            value={content.toolEmailSubject}
            onChange={(e) => setContent((c) => ({ ...c, toolEmailSubject: e.target.value }))}
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white p-3 text-sm"
          />
        </label>
        <label className="block text-xs font-bold text-slate-600">
          Tools: section title
          <input
            value={content.toolListName}
            onChange={(e) => setContent((c) => ({ ...c, toolListName: e.target.value }))}
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white p-3 text-sm"
          />
        </label>
        <label className="block text-xs font-bold text-slate-600">
          Tools: list (one per line)
          <textarea
            value={content.toolListItems.join("\n")}
            onChange={(e) =>
              setContent((c) => ({ ...c, toolListItems: e.target.value.split("\n").map((l) => l.trim()) }))
            }
            rows={5}
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white p-3 font-mono text-xs"
          />
        </label>
      </div>

      {error ? <p className="mt-3 rounded-xl bg-rose-100 p-3 text-sm font-bold text-rose-700">{error}</p> : null}

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs font-black uppercase tracking-widest text-slate-500">HTML export</p>
        <button
          type="button"
          onClick={copyHtml}
          className="button-bubble inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-[11px] font-black uppercase tracking-widest text-white"
        >
          {copied ? <Check className="h-4 w-4 text-emerald-300" /> : <Copy className="h-4 w-4" />}
          {copied ? "Copied" : "Copy HTML"}
        </button>
      </div>
      <pre className="mt-2 max-h-[320px] overflow-auto whitespace-pre-wrap rounded-2xl border border-slate-200 bg-white p-4 text-[11px] text-slate-700">
        {html}
      </pre>
    </section>
  );
}
