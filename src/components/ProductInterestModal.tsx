"use client";

import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { X } from "lucide-react";
import { fredokaHeadline, jakartaSans } from "@/app/fonts";

type InterestKind = "course" | "certification";

export function ProductInterestModal({
  open,
  onClose,
  kind,
  title,
}: {
  open: boolean;
  onClose: () => void;
  kind: InterestKind;
  title: string;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    setDone(false);
    setError(null);
    setNote("");
  }, [open, title]);

  if (!open) return null;

  const label = kind === "course" ? "course" : "certification";

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim() || "Parent",
          email: email.trim(),
          message: [
            `Interest in ${label}: ${title}`,
            note.trim() ? `Note: ${note.trim()}` : null,
          ]
            .filter(Boolean)
            .join("\n"),
        }),
      });
      if (!res.ok) {
        setError("Could not send. Try again or email help@studentstack.info.");
        return;
      }
      setDone(true);
    } catch {
      setError("Network error. Try again in a moment.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        aria-label="Close"
        onClick={onClose}
      />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="interest-heading"
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="relative w-full max-w-md rounded-[2rem] border border-sky-100 bg-white p-6 shadow-[0_32px_80px_-40px_rgba(15,23,42,0.45)] sm:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full bg-slate-50 p-2 text-slate-500 transition hover:bg-sky-50 hover:text-sky-700"
          aria-label="Close dialog"
        >
          <X className="h-4 w-4" />
        </button>

        {done ? (
          <div>
            <p className={`text-[10px] font-black uppercase tracking-[0.22em] text-[#ff6a00] ${jakartaSans.className}`}>
              Got it
            </p>
            <h3
              id="interest-heading"
              className={`mt-2 text-2xl font-semibold tracking-[-0.03em] text-slate-900 ${fredokaHeadline.className}`}
            >
              We will follow up
            </h3>
            <p className={`mt-3 text-sm font-medium leading-relaxed text-slate-600 ${jakartaSans.className}`}>
              Thanks for your interest in {title}. A StudentStack teammate will email you about next steps.
            </p>
            <button
              type="button"
              onClick={onClose}
              className={`mt-6 w-full rounded-2xl bg-sky-500 py-3 text-sm font-black text-white transition hover:bg-sky-600 ${jakartaSans.className}`}
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <p className={`text-[10px] font-black uppercase tracking-[0.22em] text-[#ff6a00] ${jakartaSans.className}`}>
                {kind === "course" ? "Course interest" : "Certification interest"}
              </p>
              <h3
                id="interest-heading"
                className={`mt-2 text-2xl font-semibold tracking-[-0.03em] text-slate-900 ${fredokaHeadline.className}`}
              >
              Get enrolled
            </h3>
            <p className={`mt-2 text-sm font-medium text-slate-600 ${jakartaSans.className}`}>{title}</p>
            </div>

            <label className="block">
              <span className={`mb-1.5 block text-[11px] font-black uppercase tracking-wider text-slate-500 ${jakartaSans.className}`}>
                Your name
              </span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-2xl border-2 border-sky-100 bg-sky-50/60 px-4 py-3 text-sm font-semibold outline-none transition focus:border-sky-300"
                placeholder="Alex Parent"
              />
            </label>

            <label className="block">
              <span className={`mb-1.5 block text-[11px] font-black uppercase tracking-wider text-slate-500 ${jakartaSans.className}`}>
                Email
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-2xl border-2 border-sky-100 bg-sky-50/60 px-4 py-3 text-sm font-semibold outline-none transition focus:border-sky-300"
                placeholder="you@email.com"
              />
            </label>

            <label className="block">
              <span className={`mb-1.5 block text-[11px] font-black uppercase tracking-wider text-slate-500 ${jakartaSans.className}`}>
                Optional note
              </span>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                className="w-full resize-none rounded-2xl border-2 border-sky-100 bg-sky-50/60 px-4 py-3 text-sm font-semibold outline-none transition focus:border-sky-300"
                placeholder="Grade, intended major, timing…"
              />
            </label>

            {error ? <p className="text-sm font-semibold text-rose-600">{error}</p> : null}

            <button
              type="submit"
              disabled={busy}
              className={`w-full rounded-2xl bg-slate-900 py-3 text-sm font-black text-white shadow-[0_14px_28px_-18px_rgba(15,23,42,0.55)] transition hover:-translate-y-0.5 hover:bg-slate-800 disabled:opacity-60 ${jakartaSans.className}`}
            >
              {busy ? "Sending…" : "Continue enrollment"}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
}
