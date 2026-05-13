"use client";

import React, { useEffect, useId, useState } from "react";
import { Check, Copy, Download, LayoutTemplate, RotateCcw } from "lucide-react";
import { jakartaSans } from "@/app/fonts";
import {
  MANUAL_TOOLKIT_SLOTS,
  createDefaultManualWeeklyEmail,
  loadManualWeeklyEmailDraft,
  normalizeManualWeeklyEmail,
  saveManualWeeklyEmailDraft,
  clearManualWeeklyEmailDraft,
  type ManualWeeklyEmailPayload,
  type ManualToolkitPick,
} from "@/lib/weekly-email-manual";
import { ManualWeeklyEmailPreview } from "./ManualWeeklyEmailPreview";

const inputClass =
  "w-full rounded-xl border-2 border-slate-200 bg-white px-3.5 py-2.5 text-sm font-semibold text-slate-900 outline-none transition-colors focus:border-slate-900 focus:ring-2 focus:ring-slate-200";
const labelClass = "mb-1 block text-xs font-bold uppercase tracking-widest text-slate-500";

function updateSlot(
  toolkit: ManualToolkitPick[],
  id: ManualToolkitPick["id"],
  patch: Partial<Omit<ManualToolkitPick, "id">>
): ManualToolkitPick[] {
  return toolkit.map((s) => (s.id === id ? { ...s, ...patch } : s));
}

export function AdminWeeklyEmailComposer() {
  const formId = useId();
  const [data, setData] = useState<ManualWeeklyEmailPayload>(() => createDefaultManualWeeklyEmail());
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const d = loadManualWeeklyEmailDraft();
    if (d) setData(normalizeManualWeeklyEmail(d));
  }, []);

  useEffect(() => {
    saveManualWeeklyEmailDraft(data);
  }, [data]);

  /** Dynamic import keeps `react-dom/server` (pulled by `@react-email/render`) off the initial `/admin` chunk. */
  async function renderEmailHtml(snapshot: ManualWeeklyEmailPayload): Promise<string> {
    const [{ render }, { StudentStackNewsletter }] = await Promise.all([
      import("@react-email/render"),
      import("@/components/emails/StudentStackNewsletter"),
    ]);
    return render(<StudentStackNewsletter {...snapshot} />);
  }

  async function copyHtml() {
    try {
      const html = await renderEmailHtml(data);
      await navigator.clipboard.writeText(html);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  }

  async function downloadHtml() {
    const html = await renderEmailHtml(data);
    const safe = data.weekLabel.replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").slice(0, 48);
    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `studentstack-weekly-${safe || "email"}.html`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function resetDraft() {
    if (!confirm("Clear saved draft and reset to template?")) return;
    clearManualWeeklyEmailDraft();
    setData(createDefaultManualWeeklyEmail());
  }

  return (
    <section className={`card-pop overflow-hidden ${jakartaSans.className}`}>
      <div className="border-b border-slate-100 bg-gradient-to-r from-sky-50/80 via-white to-violet-50/60 px-6 py-5 sm:px-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-200/80 bg-white/90 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-sky-700 shadow-sm">
              <LayoutTemplate className="h-3.5 w-3.5 text-sky-500" aria-hidden />
              Manual weekly send
            </div>
            <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">Branded weekly email</h2>
            <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-600">
              Compose in plain text here — no OpenAI. Paste your Sheet link, write each toolkit row, and fabricate the featured Q&amp;A.
              Copy HTML and paste into Gmail from <strong className="text-slate-800">help@studentstack.info</strong>. Draft auto-saves in
              this browser.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => void copyHtml()}
              className="button-bubble inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-xs font-black uppercase tracking-widest text-white shadow-[0_6px_0_0_#0f172a] transition-transform hover:-translate-y-0.5"
            >
              {copied ? <Check className="h-4 w-4 text-emerald-300" /> : <Copy className="h-4 w-4" />}
              {copied ? "Copied" : "Copy HTML"}
            </button>
            <button
              type="button"
              onClick={() => void downloadHtml()}
              className="button-bubble inline-flex items-center gap-2 rounded-full border-2 border-slate-200 bg-white px-5 py-2.5 text-xs font-black uppercase tracking-widest text-slate-800 shadow-[0_6px_0_0_#e2e8f0] transition-transform hover:-translate-y-0.5"
            >
              <Download className="h-4 w-4" />
              .html file
            </button>
            <button
              type="button"
              onClick={resetDraft}
              className="button-bubble inline-flex items-center gap-2 rounded-full border-2 border-rose-100 bg-rose-50/80 px-4 py-2.5 text-xs font-black uppercase tracking-widest text-rose-800"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(320px,420px)] xl:grid-cols-[1fr_460px]">
        <div className="space-y-6 border-slate-100 p-6 sm:p-8 lg:border-r">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className={labelClass} htmlFor={`${formId}-week`}>
                Week label
              </label>
              <input
                id={`${formId}-week`}
                className={inputClass}
                value={data.weekLabel}
                onChange={(e) => setData((d) => ({ ...d, weekLabel: e.target.value }))}
              />
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass} htmlFor={`${formId}-pre`}>
                Inbox preheader (preview text)
              </label>
              <input
                id={`${formId}-pre`}
                className={inputClass}
                value={data.preheader}
                onChange={(e) => setData((d) => ({ ...d, preheader: e.target.value }))}
              />
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass} htmlFor={`${formId}-intro`}>
                Opening paragraph
              </label>
              <textarea
                id={`${formId}-intro`}
                rows={4}
                className={`${inputClass} resize-y font-medium leading-relaxed`}
                value={data.intro}
                onChange={(e) => setData((d) => ({ ...d, intro: e.target.value }))}
              />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-sky-800">AI toolkit (5 picks)</h3>
            <p className="mt-1 text-xs font-semibold text-slate-500">
              One tool per category — name, one-line blurb, optional link.
            </p>
            <div className="mt-4 space-y-5">
              {MANUAL_TOOLKIT_SLOTS.map((meta) => {
                const slot = data.toolkit.find((t) => t.id === meta.id)!;
                return (
                  <div
                    key={meta.id}
                    className="rounded-2xl border border-slate-200/90 bg-slate-50/50 p-4 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.8)]"
                  >
                    <p className="text-[10px] font-black uppercase tracking-[0.16em] text-sky-700">{meta.label}</p>
                    <p className="text-[11px] font-medium text-slate-400">{meta.hint}</p>
                    <div className="mt-3 space-y-3">
                      <div>
                        <label className={labelClass} htmlFor={`${formId}-tn-${meta.id}`}>
                          Tool name
                        </label>
                        <input
                          id={`${formId}-tn-${meta.id}`}
                          className={inputClass}
                          value={slot.toolName}
                          onChange={(e) =>
                            setData((d) => ({ ...d, toolkit: updateSlot(d.toolkit, meta.id, { toolName: e.target.value }) }))
                          }
                        />
                      </div>
                      <div>
                        <label className={labelClass} htmlFor={`${formId}-bl-${meta.id}`}>
                          Why it matters (1–2 lines)
                        </label>
                        <textarea
                          id={`${formId}-bl-${meta.id}`}
                          rows={2}
                          className={`${inputClass} resize-y font-medium`}
                          value={slot.blurb}
                          onChange={(e) =>
                            setData((d) => ({ ...d, toolkit: updateSlot(d.toolkit, meta.id, { blurb: e.target.value }) }))
                          }
                        />
                      </div>
                      <div>
                        <label className={labelClass} htmlFor={`${formId}-url-${meta.id}`}>
                          Link (optional)
                        </label>
                        <input
                          id={`${formId}-url-${meta.id}`}
                          className={inputClass}
                          placeholder="https://…"
                          value={slot.url}
                          onChange={(e) =>
                            setData((d) => ({ ...d, toolkit: updateSlot(d.toolkit, meta.id, { url: e.target.value }) }))
                          }
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl border border-teal-100 bg-teal-50/30 p-4 sm:p-5">
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-teal-900">Opportunity board</h3>
            <div className="mt-3 space-y-3">
              <div>
                <label className={labelClass} htmlFor={`${formId}-sheet`}>
                  Google Sheet URL
                </label>
                <input
                  id={`${formId}-sheet`}
                  className={inputClass}
                  value={data.opportunityBoardUrl}
                  onChange={(e) => setData((d) => ({ ...d, opportunityBoardUrl: e.target.value }))}
                />
              </div>
              <div>
                <label className={labelClass} htmlFor={`${formId}-btn`}>
                  Button label
                </label>
                <input
                  id={`${formId}-btn`}
                  className={inputClass}
                  value={data.opportunityBoardButtonText}
                  onChange={(e) => setData((d) => ({ ...d, opportunityBoardButtonText: e.target.value }))}
                />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-violet-100 bg-violet-50/25 p-4 sm:p-5">
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-violet-900">Featured parent Q&amp;A</h3>
            <div className="mt-3 space-y-3">
              <div>
                <label className={labelClass} htmlFor={`${formId}-fs`}>
                  Thread title
                </label>
                <input
                  id={`${formId}-fs`}
                  className={inputClass}
                  value={data.featuredSubject}
                  onChange={(e) => setData((d) => ({ ...d, featuredSubject: e.target.value }))}
                />
              </div>
              <div>
                <label className={labelClass} htmlFor={`${formId}-fl`}>
                  From line (anonymized)
                </label>
                <input
                  id={`${formId}-fl`}
                  className={inputClass}
                  value={data.featuredParentLabel}
                  onChange={(e) => setData((d) => ({ ...d, featuredParentLabel: e.target.value }))}
                />
              </div>
              <div>
                <label className={labelClass} htmlFor={`${formId}-fq`}>
                  Question body
                </label>
                <textarea
                  id={`${formId}-fq`}
                  rows={5}
                  className={`${inputClass} resize-y font-medium leading-relaxed`}
                  value={data.featuredQuestion}
                  onChange={(e) => setData((d) => ({ ...d, featuredQuestion: e.target.value }))}
                />
              </div>
              <div>
                <label className={labelClass} htmlFor={`${formId}-fa`}>
                  Your answer
                </label>
                <textarea
                  id={`${formId}-fa`}
                  rows={6}
                  className={`${inputClass} resize-y font-medium leading-relaxed`}
                  value={data.featuredAnswer}
                  onChange={(e) => setData((d) => ({ ...d, featuredAnswer: e.target.value }))}
                />
              </div>
            </div>
          </div>

          <div>
            <label className={labelClass} htmlFor={`${formId}-foot`}>
              Footer small print
            </label>
            <textarea
              id={`${formId}-foot`}
              rows={3}
              className={`${inputClass} resize-y text-sm font-medium text-slate-600`}
              value={data.footnote}
              onChange={(e) => setData((d) => ({ ...d, footnote: e.target.value }))}
            />
          </div>
        </div>

        <div className="bg-slate-100/80 p-6 lg:sticky lg:top-6 lg:max-h-[calc(100vh-4rem)] lg:overflow-y-auto">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Live preview</p>
          <p className="mt-1 text-xs font-semibold text-slate-500">Approximates Gmail; final always verify in a test send.</p>
          <div className="mt-4">
            <ManualWeeklyEmailPreview data={data} />
          </div>
        </div>
      </div>
    </section>
  );
}
