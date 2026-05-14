"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { jakartaSans } from "@/app/fonts";
import { SignupForm } from "@/components/SignupForm";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function OnboardingModal({ open, onClose }: Props) {
  const [formBusy, setFormBusy] = useState(false);
  const blocking = formBusy;

  useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !blocking) onClose();
    };
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open, onClose, blocking]);

  useEffect(() => {
    if (!open) setFormBusy(false);
  }, [open]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          role="presentation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`fixed inset-0 z-[1200] flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-y-auto overflow-x-hidden p-4 sm:p-6 ${jakartaSans.className}`}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-900/50"
            aria-hidden
            onClick={() => !blocking && onClose()}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="onboarding-title"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-[1201] my-auto w-full max-w-[min(100%,440px)] shrink-0 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_30px_90px_-22px_rgba(15,23,42,0.35)] sm:p-7"
          >
            <button
              type="button"
              onClick={onClose}
              disabled={blocking}
              className="absolute right-3 top-3 rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800 disabled:pointer-events-none disabled:opacity-40"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative pt-1">
              <h2 id="onboarding-title" className="pr-10 text-center text-xl font-black text-slate-900">
                Sign Up
              </h2>
              <div className="mt-5">
                <SignupForm integrated showDescription={false} variant="default" onBusyChange={setFormBusy} />
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
