"use client";

import { useState } from "react";
import { Loader2, Sparkles, Link2, Copy, Check } from "lucide-react";

export function AdminNewsletterGenerator() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [html, setHtml] = useState("");
  const [copied, setCopied] = useState(false);

  async function handleGenerate() {
    setLoading(true);
    setError("");
    setHtml("");
    setCopied(false);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });
      const data = (await response.json()) as { html?: string; error?: string };
      if (!response.ok) {
        setError(data.error ?? "Generation failed");
        return;
      }
      setHtml(data.html ?? "");
    } catch {
      setError("Network error while generating newsletter.");
    } finally {
      setLoading(false);
    }
  }

  async function handleCopy() {
    if (!html) return;
    try {
      await navigator.clipboard.writeText(html);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError("Could not copy to clipboard.");
    }
  }

  return (
    <section className="card-pop p-6">
      <h2 className="text-xl font-black text-slate-900">Newsletter Generator</h2>
      <p className="mt-2 text-sm font-semibold text-slate-600">
        Paste a URL to an AI article or tool page. We fetch it, then GPT-4o drafts a 3-section email (Tool / Use-case /
        Action) as HTML with inline styles.
      </p>
      <div className="relative mt-4">
        <Link2 className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com/ai-tool-announcement"
          className="h-14 w-full rounded-3xl border-2 border-violet-100 bg-violet-50 py-3 pl-11 pr-4 text-sm font-semibold outline-none focus:border-violet-300"
        />
      </div>
      <button
        type="button"
        onClick={handleGenerate}
        disabled={!url.trim() || loading}
        className="button-bubble mt-4 inline-flex items-center gap-2 bg-violet-500 px-6 py-3 text-sm uppercase tracking-widest text-white shadow-[0_8px_0_0_#7c3aed] disabled:opacity-60"
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
        Generate
      </button>

      {error ? <p className="mt-3 rounded-xl bg-rose-100 p-3 text-sm font-bold text-rose-700">{error}</p> : null}

      {html ? (
        <div className="mt-6 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs font-black uppercase tracking-widest text-slate-500">HTML output</p>
            <button
              type="button"
              onClick={handleCopy}
              className="button-bubble inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-[11px] font-black uppercase tracking-widest text-white shadow-[0_6px_0_0_#0f172a]"
            >
              {copied ? <Check className="h-4 w-4 text-emerald-300" /> : <Copy className="h-4 w-4" />}
              {copied ? "Copied" : "Copy to clipboard"}
            </button>
          </div>
          <pre className="max-h-[420px] overflow-auto whitespace-pre-wrap rounded-3xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-700">
            {html}
          </pre>
        </div>
      ) : null}
    </section>
  );
}
