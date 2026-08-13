"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { jakartaSans } from "@/app/fonts";

type Props = {
  /** Visual density for hero vs final CTA */
  size?: "hero" | "cta";
  className?: string;
  submitLabel?: string;
};

/**
 * Parent email-only subscribe, no student name / grade / focus required.
 */
export function EmailCapture({
  size = "hero",
  className = "",
  submitLabel = "Get tomorrow’s free email",
}: Props) {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ parentEmail: email.trim() }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        setError(data.error ?? `Could not subscribe (${res.status}).`);
        return;
      }
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Network error.");
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className={`flex items-start gap-3 rounded-[1.5rem] border border-emerald-200 bg-white/95 px-5 py-4 text-left shadow-sm ${className}`}
      >
        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" aria-hidden />
        <div className={jakartaSans.className}>
          <p className="text-sm font-bold text-slate-900">You&apos;re in. Check your inbox.</p>
          <p className="mt-1 text-xs font-medium leading-relaxed text-slate-600">
            Confirmation sometimes lands in Promotions or Spam for first-time signups.
          </p>
        </div>
      </motion.div>
    );
  }

  const hero = size === "hero";

  return (
    <form
      onSubmit={onSubmit}
      className={`w-full ${className} ${jakartaSans.className}`}
      noValidate
    >
      <div
        className={`flex w-full flex-col gap-2 rounded-[1.6rem] border bg-white/95 p-2 shadow-[0_18px_50px_-28px_rgba(14,165,233,0.55)] sm:flex-row sm:items-stretch ${
          hero ? "border-sky-200/90" : "border-sky-200"
        }`}
      >
        <label className="sr-only" htmlFor={`email-capture-${size}`}>
          Parent email
        </label>
        <input
          id={`email-capture-${size}`}
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your parent email"
          className={`min-w-0 flex-1 rounded-[1.25rem] border-0 bg-slate-50/80 px-4 text-sm font-semibold text-slate-900 outline-none ring-0 placeholder:text-slate-400 focus:bg-white ${
            hero ? "py-3.5 sm:py-4" : "py-3.5"
          }`}
        />
        <motion.button
          type="submit"
          disabled={busy || !email.trim()}
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.985 }}
          className={`inline-flex items-center justify-center gap-2 rounded-[1.25rem] bg-gradient-to-b from-sky-500 to-sky-600 px-5 text-[11px] font-black uppercase tracking-[0.12em] text-white shadow-[0_8px_0_0_rgba(2,132,199,0.25)] transition hover:from-sky-400 hover:to-sky-500 disabled:opacity-60 sm:px-6 ${
            hero ? "py-3.5 sm:min-w-[13.5rem]" : "py-3.5 sm:min-w-[12rem]"
          }`}
        >
          {busy ? (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          ) : (
            <>
              <span className="max-w-[11rem] truncate sm:max-w-none">{submitLabel}</span>
              <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
            </>
          )}
        </motion.button>
      </div>
      {error ? (
        <p className="mt-2 text-center text-xs font-bold text-rose-600 sm:text-left">{error}</p>
      ) : (
        <p className="mt-2 text-center text-[11px] font-medium text-slate-500 sm:text-left">
          Free daily · Unsubscribe anytime · No student info required
        </p>
      )}
    </form>
  );
}
