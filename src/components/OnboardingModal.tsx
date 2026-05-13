"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, CheckCircle2, Loader2 } from "lucide-react";
import { jakartaSans } from "@/app/fonts";
import { saveSubscriberAction } from "@/app/actions/subscribers";

const GRADES = ["8th", "Freshman", "Sophomore", "Junior", "Senior"] as const;

const GOALS = ["Finding Research/Internships", "Boosting GPA", "Writing Essays"] as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Props = {
  open: boolean;
  onClose: () => void;
};

export function OnboardingModal({ open, onClose }: Props) {
  const formId = useId();
  const parentEmailRef = useRef<HTMLInputElement>(null);
  const studentEmailRef = useRef<HTMLInputElement>(null);
  const [parentEmail, setParentEmail] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [grade, setGrade] = useState<(typeof GRADES)[number] | "">("");
  const [goal, setGoal] = useState<(typeof GOALS)[number] | "">("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !loading) onClose();
    };
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open, onClose, loading]);

  useEffect(() => {
    if (open && !done) {
      const t = requestAnimationFrame(() => parentEmailRef.current?.focus());
      return () => cancelAnimationFrame(t);
    }
  }, [open, done]);

  useEffect(() => {
    if (!open) {
      const t = setTimeout(() => {
        setParentEmail("");
        setStudentEmail("");
        setGrade("");
        setGoal("");
        setError(null);
        setDone(false);
        setLoading(false);
      }, 280);
      return () => clearTimeout(t);
    }
  }, [open]);

  function clearError() {
    setError(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const pEmail = parentEmail.trim();
    if (!pEmail) {
      setError("Enter the parent's email.");
      parentEmailRef.current?.focus();
      return;
    }
    if (!EMAIL_RE.test(pEmail)) {
      setError("That doesn't look like a valid parent email.");
      parentEmailRef.current?.focus();
      return;
    }
    const sEmail = studentEmail.trim();
    if (!sEmail) {
      setError("Enter the student's email.");
      studentEmailRef.current?.focus();
      return;
    }
    if (!EMAIL_RE.test(sEmail)) {
      setError("That doesn't look like a valid student email.");
      studentEmailRef.current?.focus();
      return;
    }
    if (!grade) {
      setError("Select a grade.");
      return;
    }
    if (!goal) {
      setError("Choose a focus area.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await saveSubscriberAction({
        parent_email: pEmail,
        student_email: sEmail,
        student_grade: grade,
        friction_point: goal,
      });
      if (!res.ok) {
        setError(res.message);
        return;
      }
      setDone(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const blocking = loading;

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          role="presentation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[1200] flex items-center justify-center overflow-y-auto overflow-x-hidden p-4 sm:p-6"
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
            aria-describedby={error ? `${formId}-error` : undefined}
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            className={`relative z-[1201] my-auto w-full max-w-[min(100%,420px)] max-h-[min(100dvh-2rem,90vh)] shrink-0 overflow-y-auto overscroll-contain rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_30px_90px_-22px_rgba(15,23,42,0.35)] sm:p-7 ${jakartaSans.className}`}
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

            {done ? (
              <div className="relative pt-1 text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
                  <CheckCircle2 className="h-6 w-6" aria-hidden />
                </div>
                <h2 id="onboarding-success-title" className="text-lg font-black text-slate-900">
                  You&apos;re on the list
                </h2>
                <p className="mt-2 text-sm font-medium text-slate-600">Watch the parent inbox for the next Sunday email.</p>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-6 w-full rounded-2xl bg-slate-900 py-3 text-sm font-black text-white shadow-[0_6px_0_0_#1e293b] transition-transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  Done
                </button>
              </div>
            ) : (
              <div className="relative pt-1">
                <h2 id="onboarding-title" className="pr-10 text-xl font-black text-slate-900">
                  Join to receive our free, weekly email
                </h2>

                <form id={formId} onSubmit={(e) => void handleSubmit(e)} className="mt-5 space-y-4">
                  <div>
                    <label htmlFor={`${formId}-parent-email`} className="mb-1 block text-xs font-bold text-slate-600">
                      Parent email
                    </label>
                    <input
                      ref={parentEmailRef}
                      id={`${formId}-parent-email`}
                      type="email"
                      name="parent_email"
                      autoComplete="email"
                      inputMode="email"
                      value={parentEmail}
                      onChange={(e) => {
                        setParentEmail(e.target.value);
                        clearError();
                      }}
                      disabled={blocking}
                      placeholder="parent@example.com"
                      aria-invalid={Boolean(error && /parent email|parent's email/i.test(error))}
                      className="h-11 w-full rounded-xl border-2 border-slate-200 bg-white px-3.5 text-sm font-semibold text-slate-900 outline-none transition-colors focus:border-slate-900 focus:ring-2 focus:ring-slate-200 disabled:opacity-60"
                    />
                  </div>
                  <div>
                    <label htmlFor={`${formId}-student-email`} className="mb-1 block text-xs font-bold text-slate-600">
                      Student email
                    </label>
                    <input
                      ref={studentEmailRef}
                      id={`${formId}-student-email`}
                      type="email"
                      name="student_email"
                      autoComplete="email"
                      inputMode="email"
                      value={studentEmail}
                      onChange={(e) => {
                        setStudentEmail(e.target.value);
                        clearError();
                      }}
                      disabled={blocking}
                      placeholder="student@example.com"
                      aria-invalid={Boolean(error && /student email/i.test(error))}
                      className="h-11 w-full rounded-xl border-2 border-slate-200 bg-white px-3.5 text-sm font-semibold text-slate-900 outline-none transition-colors focus:border-slate-900 focus:ring-2 focus:ring-slate-200 disabled:opacity-60"
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor={`${formId}-grade`} className="mb-1 block text-xs font-bold text-slate-600">
                        Student grade
                      </label>
                      <select
                        id={`${formId}-grade`}
                        name="grade"
                        value={grade}
                        onChange={(e) => {
                          setGrade(e.target.value as (typeof GRADES)[number]);
                          clearError();
                        }}
                        disabled={blocking}
                        className="h-11 w-full appearance-none rounded-xl border-2 border-slate-200 bg-white px-3.5 text-sm font-semibold text-slate-900 outline-none transition-colors focus:border-slate-900 focus:ring-2 focus:ring-slate-200 disabled:opacity-60"
                      >
                        <option value="">Grade…</option>
                        {GRADES.map((g) => (
                          <option key={g} value={g}>
                            {g}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor={`${formId}-goal`} className="mb-1 block text-xs font-bold text-slate-600">
                        Top focus
                      </label>
                      <select
                        id={`${formId}-goal`}
                        name="goal"
                        value={goal}
                        onChange={(e) => {
                          setGoal(e.target.value as (typeof GOALS)[number]);
                          clearError();
                        }}
                        disabled={blocking}
                        className="h-11 w-full appearance-none rounded-xl border-2 border-slate-200 bg-white px-3.5 text-sm font-semibold text-slate-900 outline-none transition-colors focus:border-slate-900 focus:ring-2 focus:ring-slate-200 disabled:opacity-60"
                      >
                        <option value="">Choose…</option>
                        {GOALS.map((g) => (
                          <option key={g} value={g}>
                            {g}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {error ? (
                    <p
                      id={`${formId}-error`}
                      role="alert"
                      className="rounded-xl bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-800 ring-1 ring-rose-100"
                    >
                      {error}
                    </p>
                  ) : null}

                  <button
                    type="submit"
                    disabled={blocking}
                    className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-slate-900 text-sm font-black text-white shadow-[0_6px_0_0_#1e293b] transition-transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:hover:translate-y-0"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                        Signing up…
                      </>
                    ) : (
                      "Sign up"
                    )}
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
