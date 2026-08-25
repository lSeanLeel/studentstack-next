"use client";

import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Loader2, RefreshCw } from "lucide-react";
import { fredokaHeadline, jakartaSans } from "@/app/fonts";
import { buildFallbackPortalUpdate, type PortalDailyUpdate } from "@/lib/portal/ai-updates";

/**
 * In-portal AI desk: students prompt for a refreshed daily Elite briefing.
 */
export function PortalDailyUpdateDesk() {
  const [update, setUpdate] = useState<PortalDailyUpdate>(buildFallbackPortalUpdate());
  const [prompt, setPrompt] = useState("");
  const [busy, setBusy] = useState(false);
  const [warning, setWarning] = useState<string | null>(null);
  const [cached, setCached] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/portal/daily-update");
        if (!res.ok) return;
        const json = (await res.json()) as { update?: PortalDailyUpdate; cached?: boolean };
        if (!cancelled && json.update) {
          setUpdate(json.update);
          setCached(Boolean(json.cached));
        }
      } catch {
        /* keep fallback */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const refresh = async (force: boolean) => {
    setBusy(true);
    setWarning(null);
    try {
      const res = await fetch("/api/portal/daily-update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          refresh: force,
          prompt: prompt.trim() || undefined,
        }),
      });
      const json = (await res.json()) as {
        update?: PortalDailyUpdate;
        cached?: boolean;
        warning?: string;
        error?: string;
      };
      if (!res.ok) {
        setWarning(json.error ?? "Could not refresh.");
        return;
      }
      if (json.update) setUpdate(json.update);
      setCached(Boolean(json.cached));
      if (json.warning) setWarning(json.warning);
    } catch {
      setWarning("Network error. Try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <section
      id="daily-ai-desk"
      className="overflow-hidden rounded-[2rem] border border-sky-100 bg-gradient-to-br from-sky-50 via-white to-emerald-50/60 p-6 shadow-[0_24px_60px_-40px_rgba(14,165,233,0.45)] sm:p-8"
      aria-labelledby="daily-ai-heading"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className={`text-[10px] font-black uppercase tracking-[0.2em] text-sky-600 ${jakartaSans.className}`}>
            AI daily desk
          </p>
          <h2
            id="daily-ai-heading"
            className={`mt-2 text-2xl font-semibold tracking-[-0.03em] text-slate-900 sm:text-3xl ${fredokaHeadline.className}`}
          >
            {update.headline}
          </h2>
          <p className={`mt-1 text-xs font-medium text-slate-500 ${jakartaSans.className}`}>
            {update.dateKey}
            {cached ? " · cached for today" : " · fresh"}
          </p>
        </div>
      </div>

      <p className={`mt-4 text-sm font-medium leading-relaxed text-slate-600 sm:text-[0.95rem] ${jakartaSans.className}`}>
        {update.briefing}
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {[
          { label: "Toolkit", body: update.toolkitTip },
          { label: "Vault", body: update.vaultHighlight },
          { label: "Certifications", body: update.certificationNudge },
        ].map((card) => (
          <div key={card.label} className="rounded-[1.35rem] border border-white/80 bg-white/90 p-4">
            <p className={`text-[10px] font-black uppercase tracking-[0.16em] text-sky-600 ${jakartaSans.className}`}>
              {card.label}
            </p>
            <p className={`mt-2 text-sm font-medium leading-relaxed text-slate-700 ${jakartaSans.className}`}>
              {card.body}
            </p>
          </div>
        ))}
      </div>

      <ul className={`mt-5 space-y-2 text-sm font-medium text-slate-700 ${jakartaSans.className}`}>
        {update.applicationMoves.map((move) => (
          <li key={move} className="flex gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ff6a00]" aria-hidden />
            {move}
          </li>
        ))}
      </ul>

      <div className="mt-6 space-y-3 border-t border-sky-100/80 pt-5">
        <label htmlFor="portal-ai-prompt" className="block text-[11px] font-black uppercase tracking-[0.14em] text-slate-500">
          Prompt today&apos;s update
        </label>
        <textarea
          id="portal-ai-prompt"
          rows={2}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g. Focus on research deadlines and SS-AIS Module 2…"
          className="w-full rounded-2xl border-2 border-sky-100 bg-white px-4 py-3 text-sm font-medium text-slate-900 outline-none focus:border-sky-300"
        />
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            disabled={busy}
            onClick={() => refresh(true)}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-[11px] font-black uppercase tracking-[0.14em] text-white transition hover:bg-slate-800 disabled:opacity-60"
          >
            {busy ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <RefreshCw className="h-4 w-4" aria-hidden />}
            {busy ? "Updating…" : "Refresh with AI"}
          </button>
        </div>
        {warning ? (
          <p className="rounded-2xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-medium text-amber-800">
            {warning}
          </p>
        ) : null}
      </div>
    </section>
  );
}

export function PortalDailyUpdateDeskMotion() {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <PortalDailyUpdateDesk />
    </motion.div>
  );
}
