"use client";

import React, { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, X } from "lucide-react";
import { fredokaHeadline, jakartaSans } from "@/app/fonts";
import { useOnboarding } from "@/components/onboarding-context";

type Props = {
  open: boolean;
  onClose: () => void;
};

const previewBlocks = [
  {
    label: "The signal",
    body: "What actually changed in AI for school this week, in plain English for busy parents.",
  },
  {
    label: "The toolkit",
    body: "One workflow college students are using right now in lectures, labs, or writing.",
  },
  {
    label: "The move",
    body: "A short action you can forward to your high schooler before the next deadline.",
  },
] as const;

/** Newsletter-site pattern: show a sample issue before asking for the email. */
export function SampleEmailModal({ open, onClose }: Props) {
  const { openOnboarding } = useOnboarding();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          role="presentation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`fixed inset-0 z-[1200] flex min-h-[100dvh] w-full items-center justify-center overflow-y-auto p-4 sm:p-6 ${jakartaSans.className}`}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-900/50"
            aria-hidden
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="sample-email-title"
            initial={{ opacity: 0, y: 22, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-[1201] my-auto w-full max-w-lg rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_30px_90px_-22px_rgba(15,23,42,0.35)] sm:p-8"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-3 top-3 rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-sky-600">Sample issue</p>
            <h2
              id="sample-email-title"
              className={`mt-2 pr-10 text-2xl font-semibold tracking-[-0.03em] text-slate-900 ${fredokaHeadline.className}`}
            >
              What tomorrow&apos;s email looks like
            </h2>
            <p className="mt-2 text-sm font-medium leading-relaxed text-slate-600">
              Short on purpose. Written so a parent can skim it, and a high schooler can use it.
            </p>

            <div className="mt-6 overflow-hidden rounded-[1.5rem] border border-sky-100 bg-gradient-to-b from-sky-50/80 to-white">
              <div className="flex items-center gap-2 border-b border-sky-100/80 px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-sky-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                <span className="ml-2 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">
                  StudentStack Daily
                </span>
              </div>
              <ul className="space-y-0 px-4 py-2">
                {previewBlocks.map((block) => (
                  <li key={block.label} className="border-b border-slate-100 py-4 last:border-b-0">
                    <p className={`text-sm font-semibold text-slate-900 ${fredokaHeadline.className}`}>{block.label}</p>
                    <p className="mt-1 text-sm font-medium leading-relaxed text-slate-600">{block.body}</p>
                  </li>
                ))}
              </ul>
            </div>

            <button
              type="button"
              onClick={() => {
                onClose();
                openOnboarding();
              }}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-6 py-3.5 text-xs font-black uppercase tracking-[0.14em] text-white transition hover:bg-slate-800"
            >
              Get tomorrow&apos;s free email
              <ArrowRight className="h-4 w-4" aria-hidden />
            </button>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
