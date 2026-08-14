"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, CheckCircle2, Lock } from "lucide-react";
import { fredokaHeadline, jakartaSans } from "@/app/fonts";

type Props = {
  size?: "hero" | "cta";
  className?: string;
  submitLabel?: string;
};

const MEMBERSHIP_PRICE = 40;

/**
 * Membership join: email first ("Join the daily"), then reveal $40/mo.
 */
export function EmailCapture({
  size = "hero",
  className = "",
  submitLabel = "Join the daily",
}: Props) {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stage, setStage] = useState<"capture" | "price" | "done">("capture");

  async function onCapture(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ parentEmail: email.trim(), intent: "membership_lead" }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        // Still advance to price if already signed / soft failures; block on hard validation.
        if (res.status === 400) {
          setError(data.error ?? `Could not continue (${res.status}).`);
          return;
        }
      }
      setStage("price");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Network error.");
    } finally {
      setBusy(false);
    }
  }

  async function onStartMembership() {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/stripe/membership", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ parentEmail: email.trim() }),
      });
      const data = (await res.json().catch(() => ({}))) as { url?: string; error?: string; pending?: boolean };
      if (res.ok && data.url) {
        window.location.href = data.url;
        return;
      }
      if (res.ok && data.pending) {
        setStage("done");
        return;
      }
      setError(data.error ?? "Could not start membership. Try again or email help@studentstack.info.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Network error.");
    } finally {
      setBusy(false);
    }
  }

  const hero = size === "hero";

  if (stage === "done") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className={`flex items-start gap-3 rounded-[1.5rem] border border-emerald-200 bg-white/95 px-5 py-4 text-left shadow-sm ${className}`}
      >
        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" aria-hidden />
        <div className={jakartaSans.className}>
          <p className="text-sm font-bold text-slate-900">You&apos;re on the list.</p>
          <p className="mt-1 text-xs font-medium leading-relaxed text-slate-600">
            We saved {email}. A StudentStack teammate will email your ${MEMBERSHIP_PRICE}/mo membership next steps.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className={`w-full ${className} ${jakartaSans.className}`}>
      <AnimatePresence mode="wait" initial={false}>
        {stage === "capture" ? (
          <motion.form
            key="capture"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            onSubmit={onCapture}
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
            <p className="mt-2 text-center text-[11px] font-medium text-slate-500 sm:text-left">
              Parent email only · Cancel anytime
            </p>
          </motion.form>
        ) : (
          <motion.div
            key="price"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="overflow-hidden rounded-[1.75rem] border-2 border-sky-200 bg-white p-5 text-left shadow-[0_24px_50px_-36px_rgba(14,165,233,0.45)] sm:p-6"
          >
            <p className={`text-[10px] font-black uppercase tracking-[0.2em] text-[#ff6a00] ${jakartaSans.className}`}>
              StudentStack Daily membership
            </p>
            <p className={`mt-2 text-2xl font-semibold tracking-[-0.03em] text-slate-900 sm:text-3xl ${fredokaHeadline.className}`}>
              ${MEMBERSHIP_PRICE}
              <span className="text-lg font-semibold text-slate-500">/mo</span>
            </p>
            <p className="mt-2 text-sm font-medium leading-relaxed text-slate-600">
              Unlock the full daily for {email}: school AI signal, toolkit move, and a forwardable parent note from our
              student-led desk.
            </p>
            <button
              type="button"
              onClick={() => void onStartMembership()}
              disabled={busy}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-3.5 text-xs font-black uppercase tracking-[0.14em] text-white transition hover:-translate-y-0.5 hover:bg-slate-800 disabled:opacity-60"
            >
              {busy ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              ) : (
                <>
                  <Lock className="h-4 w-4" aria-hidden />
                  Continue · ${MEMBERSHIP_PRICE}/mo
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => setStage("capture")}
              className="mt-3 w-full text-center text-[11px] font-bold text-slate-500 underline decoration-slate-300 underline-offset-2 hover:text-sky-700"
            >
              Use a different email
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      {error ? <p className="mt-2 text-center text-xs font-bold text-rose-600 sm:text-left">{error}</p> : null}
    </div>
  );
}
