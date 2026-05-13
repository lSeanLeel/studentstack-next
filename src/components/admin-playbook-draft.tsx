"use client";

import { useState, useCallback } from "react";
import { Copy, Check, FileText, Eye } from "lucide-react";

function buildMasterPromptBody(params: {
  toolkitUrl: string;
  toolkitBlurb: string;
  sheetUrl: string;
  boardBlurb: string;
  qaNotes: string;
}): string {
  const tu = params.toolkitUrl.trim() || "https://YOUR-DOMAIN/toolkit";
  const su = params.sheetUrl.trim() || "https://docs.google.com/spreadsheets/YOUR_SHEET_ID/edit";
  /** Public absolute URL so email clients can load the wordmark (path matches Next.js public/). */
  const logoUrl = "https://studentstack.info/logo-transparent.png";

  return [
    "I am a college student writing a weekly newsletter. Using the 3 sections of info provided, write a beautiful HTML email.",
    "",
    "CRITICAL EMAIL HTML RULES:",
    '1. INLINE STYLES ONLY: Do NOT use any CSS classes, Tailwind, or <style> tags in the head. Every single element must use inline `style="..."`.',
    "2. FONT STACK: Use `font-family: 'Fredoka', 'Helvetica Neue', Helvetica, Arial, sans-serif;` on all text elements. Wrap the entire email in a container with this font family.",
    '3. BULLETPROOF LAYOUT: Do not use CSS Grid or Flexbox. Use standard block-level divs or HTML Tables (`<table width="100%" cellpadding="0" cellspacing="0">`) for structure to ensure it works in Outlook and Gmail.',
    "4. SPACING: Use inline `padding` and `Margin` (with a capital M for Outlook support) for spacing.",
    "5. BRANDING: Use soft pastel backgrounds (e.g., `#f0f9ff` to `#faf5ff` gradients simulated with solid colors if necessary) and `#0ea5e9` for accents.",
    "",
    "Format the content into: The Tool, The Opportunities, and The Q&A.",
    "",
    "FOOTER (wordmark — required):",
    "Match the site loading / navbar wordmark: the brand name is two-tone — the word \"Student\" in dark slate `#0f172a`, immediately followed by \"Stack\" in sky `#0ea5e9` (same split as the splash animation). Do NOT render \"StudentStack\" as one flat color or as generic black body text.",
    "Use a single line with two inline-styled spans, for example: <p style=\"margin:0;font-size:20px;font-weight:600;letter-spacing:-0.04em;line-height:1;font-family:'Fredoka','Helvetica Neue',Helvetica,Arial,sans-serif;\"><span style=\"color:#0f172a;\">Student</span><span style=\"color:#0ea5e9;\">Stack</span></p>",
    `Optional: you may also include a small centered logo image (same artwork as the site) with src ${logoUrl} and alt=\"StudentStack\"; images must stay optional extras — the two-tone text wordmark above is required so the footer matches the app when images are blocked.`,
    "",
    "---",
    "SECTION 1 — THE TOOL (toolkit / living page):",
    `- Include one clear call-to-action link or bulletproof button whose href is EXACTLY: ${tu}`,
    "- Summarize this week's highlight in warm, peer-to-peer language:",
    params.toolkitBlurb.trim() || "(Add your blurb in admin.)",
    "",
    "SECTION 2 — THE OPPORTUNITIES (Google Sheet / programs & deadlines):",
    `- Include one clear call-to-action link or bulletproof button whose href is EXACTLY: ${su}`,
    "- Optional context:",
    params.boardBlurb.trim() || "(Add your blurb in admin.)",
    "",
    "SECTION 3 — THE Q&A (featured parent/family question):",
    params.qaNotes.trim() || "(Add question + answer in admin.)",
    "",
    "Also include a short greeting at the top reminding readers the newsletter is free and weekly, written by real university students.",
    'End the body with one line: "Reply to this email; we read every message." (inline-styled like all other text).',
    "",
    "Output ONLY the HTML fragment suitable for pasting into an email sender: no markdown fences, no commentary before or after the HTML.",
  ].join("\n");
}
export function AdminPlaybookDraft() {
  const [toolkitUrl, setToolkitUrl] = useState("");
  const [toolkitBlurb, setToolkitBlurb] = useState("");
  const [sheetUrl, setSheetUrl] = useState("");
  const [boardBlurb, setBoardBlurb] = useState("");
  const [qaNotes, setQaNotes] = useState("");
  const [masterPrompt, setMasterPrompt] = useState("");
  const [pastedHtml, setPastedHtml] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [copied, setCopied] = useState(false);

  const buildPrompt = useCallback(() => {
    const body = buildMasterPromptBody({
      toolkitUrl,
      toolkitBlurb,
      sheetUrl,
      boardBlurb,
      qaNotes,
    });
    setMasterPrompt(body);
    return body;
  }, [toolkitUrl, toolkitBlurb, sheetUrl, boardBlurb, qaNotes]);

  async function copyPrompt() {
    const text = masterPrompt || buildPrompt();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setMasterPrompt(text);
    }
  }

  return (
    <section className="card-pop p-6">
      <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-emerald-800">
        <FileText className="h-3.5 w-3.5" />
        Token-free, matches the site
      </div>
      <h2 className="text-xl font-black text-slate-900">Optional: ChatGPT prompt station</h2>
      <p className="mt-2 text-sm font-semibold text-slate-600">
        Prefer the <strong className="text-slate-800">Branded weekly email</strong> card above for the real send (manual copy, no API). Use this
        section only if you still want a <strong className="text-slate-800">master prompt</strong> to paste into free ChatGPT for alternate HTML.
        Paste your toolkit page URL, Google Sheet URL, and Q&A notes — the prompt asks for living link, Sheet link, and human Q&A without a
        three-column robot layout.
      </p>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <label className="block text-xs font-black uppercase tracking-widest text-slate-500 lg:col-span-2">
          Toolkit page URL (same link every week; you update the page)
          <input
            type="url"
            value={toolkitUrl}
            onChange={(e) => setToolkitUrl(e.target.value)}
            placeholder="https://notion.so/... or yoursite.com/toolkit"
            className="mt-1.5 w-full rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-sky-300"
          />
        </label>
        <label className="block text-xs font-black uppercase tracking-widest text-slate-500 lg:col-span-2">
          This week on the toolkit (short blurb for the email)
          <textarea
            value={toolkitBlurb}
            onChange={(e) => setToolkitBlurb(e.target.value)}
            rows={4}
            className="mt-1.5 w-full rounded-2xl border-2 border-slate-200 bg-white p-3 text-sm font-medium outline-none focus:border-sky-300"
            placeholder="e.g. Added NotebookLM walkthrough + when we use it for finals…"
          />
        </label>
        <label className="block text-xs font-black uppercase tracking-widest text-slate-500 lg:col-span-2">
          Opportunity board (Google Sheet URL)
          <input
            type="url"
            value={sheetUrl}
            onChange={(e) => setSheetUrl(e.target.value)}
            placeholder="https://docs.google.com/spreadsheets/d/.../edit"
            className="mt-1.5 w-full rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-emerald-300"
          />
        </label>
        <label className="block text-xs font-black uppercase tracking-widest text-slate-500 lg:col-span-2">
          Board note (optional: new rows, deadline to highlight, etc.)
          <textarea
            value={boardBlurb}
            onChange={(e) => setBoardBlurb(e.target.value)}
            rows={3}
            className="mt-1.5 w-full rounded-2xl border-2 border-slate-200 bg-white p-3 text-sm font-medium outline-none focus:border-emerald-300"
            placeholder="e.g. Added 2 summer STEM deadlines; see tab 'June'…"
          />
        </label>
        <label className="block text-xs font-black uppercase tracking-widest text-slate-500 lg:col-span-2">
          Featured Q&A (question + your team&apos;s answer)
          <textarea
            value={qaNotes}
            onChange={(e) => setQaNotes(e.target.value)}
            rows={8}
            className="mt-1.5 w-full rounded-2xl border-2 border-slate-200 bg-white p-3 text-sm font-medium outline-none focus:border-violet-300"
            placeholder="Paste the parent/student question and your reply…"
          />
        </label>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => buildPrompt()}
          className="button-bubble inline-flex items-center gap-2 bg-slate-900 px-6 py-3 text-sm font-black uppercase tracking-widest text-white shadow-[0_8px_0_0_#0f172a]"
        >
          Generate master prompt
        </button>
        <button
          type="button"
          onClick={() => void copyPrompt()}
          className="button-bubble inline-flex items-center gap-2 rounded-full border-2 border-slate-200 bg-white px-5 py-3 text-xs font-black uppercase tracking-widest text-slate-800"
        >
          {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
          {copied ? "Copied" : "Copy prompt"}
        </button>
      </div>

      <label className="mt-5 block text-xs font-black uppercase tracking-widest text-slate-500">
        Master prompt (edit or copy)
        <textarea
          value={masterPrompt}
          onChange={(e) => setMasterPrompt(e.target.value)}
          rows={14}
          className="mt-1.5 w-full rounded-2xl border-2 border-slate-200 bg-slate-50 p-4 font-mono text-xs leading-relaxed outline-none focus:border-sky-300"
          placeholder='Click "Generate master prompt" to fill this…'
        />
      </label>

      <label className="mt-5 block text-xs font-black uppercase tracking-widest text-slate-500">
        Paste ChatGPT HTML here
        <textarea
          value={pastedHtml}
          onChange={(e) => setPastedHtml(e.target.value)}
          rows={10}
          className="mt-1.5 w-full rounded-2xl border-2 border-violet-200 bg-violet-50/50 p-4 font-mono text-xs outline-none focus:border-violet-400"
          placeholder="<div>…</div>"
        />
      </label>

      <button
        type="button"
        onClick={() => setShowPreview((v) => !v)}
        className="button-bubble mt-3 inline-flex items-center gap-2 bg-violet-600 px-6 py-3 text-sm font-black uppercase tracking-widest text-white shadow-[0_8px_0_0_#5b21b6]"
      >
        <Eye className="h-4 w-4" />
        {showPreview ? "Hide preview" : "Preview output"}
      </button>

      {showPreview && pastedHtml.trim() ? (
        <div className="mt-4 overflow-hidden rounded-[2rem] border-2 border-slate-200 bg-white shadow-lg">
          <p className="border-b border-slate-100 bg-slate-50 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-slate-500">
            Sandboxed preview
          </p>
          <iframe
            title="Email HTML preview"
            className="h-[min(70vh,560px)] w-full border-0 bg-white"
            sandbox="allow-same-origin"
            srcDoc={pastedHtml}
          />
        </div>
      ) : null}
    </section>
  );
}
