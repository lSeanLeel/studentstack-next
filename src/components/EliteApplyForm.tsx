"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "motion/react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { fredokaHeadline, jakartaSans } from "@/app/fonts";
import { INTENDED_MAJORS, STUDENT_GRADES, type IntendedMajor, type StudentGrade } from "@/lib/portal/certifications";

type FormData = {
  parentFullName: string;
  parentEmail: string;
  studentGrade: StudentGrade | "";
  intendedMajor: IntendedMajor | "";
  questions: string;
};

export function EliteApplyForm({ compact = false }: { compact?: boolean }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      parentFullName: "",
      parentEmail: "",
      studentGrade: "",
      intendedMajor: "",
      questions: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/elite-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          parentFullName: data.parentFullName.trim(),
          parentEmail: data.parentEmail.trim(),
          studentGrade: data.studentGrade,
          intendedMajor: data.intendedMajor,
          questions: data.questions.trim(),
        }),
      });
      const json = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setError(json.error ?? `Could not submit (${res.status}).`);
        return;
      }
      setDone(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Network error.");
    } finally {
      setBusy(false);
    }
  };

  const fieldClass =
    "w-full rounded-2xl border-2 border-sky-100 bg-sky-50/50 px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition focus:border-sky-300 focus:bg-white";

  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-[1.75rem] border border-emerald-200 bg-emerald-50/60 p-6 text-center ${jakartaSans.className}`}
      >
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-emerald-600 shadow-sm">
          <CheckCircle2 className="h-7 w-7" aria-hidden />
        </div>
        <h3 className={`text-2xl font-semibold tracking-[-0.03em] text-slate-900 ${fredokaHeadline.className}`}>
          Application Received
        </h3>
        <p className="mx-auto mt-3 max-w-md text-sm font-medium leading-relaxed text-slate-600">
          You will hear from our team by email shortly with next steps for your student.
        </p>
      </motion.div>
    );
  }

  return (
    <form
      id="apply-membership"
      onSubmit={handleSubmit(onSubmit)}
      className={`space-y-4 ${jakartaSans.className} ${compact ? "" : ""}`}
      noValidate
    >
      <div>
        <label htmlFor="elite-parent-name" className="mb-1.5 block text-[11px] font-black uppercase tracking-[0.14em] text-slate-500">
          Parent full name
        </label>
        <input
          id="elite-parent-name"
          className={fieldClass}
          placeholder="Alex Parent"
          {...register("parentFullName", { required: "Parent name is required." })}
        />
        {errors.parentFullName ? (
          <p className="mt-1 text-xs font-medium text-rose-600">{errors.parentFullName.message}</p>
        ) : null}
      </div>

      <div>
        <label htmlFor="elite-parent-email" className="mb-1.5 block text-[11px] font-black uppercase tracking-[0.14em] text-slate-500">
          Parent email
        </label>
        <input
          id="elite-parent-email"
          type="email"
          className={fieldClass}
          placeholder="parent@email.com"
          {...register("parentEmail", {
            required: "Parent email is required.",
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email." },
          })}
        />
        {errors.parentEmail ? (
          <p className="mt-1 text-xs font-medium text-rose-600">{errors.parentEmail.message}</p>
        ) : null}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="elite-grade" className="mb-1.5 block text-[11px] font-black uppercase tracking-[0.14em] text-slate-500">
            Student grade level
          </label>
          <select
            id="elite-grade"
            className={fieldClass}
            {...register("studentGrade", { required: "Select a grade." })}
          >
            <option value="">Select…</option>
            {STUDENT_GRADES.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
          {errors.studentGrade ? (
            <p className="mt-1 text-xs font-medium text-rose-600">{errors.studentGrade.message}</p>
          ) : null}
        </div>
        <div>
          <label htmlFor="elite-major" className="mb-1.5 block text-[11px] font-black uppercase tracking-[0.14em] text-slate-500">
            Student intended major
          </label>
          <select
            id="elite-major"
            className={fieldClass}
            {...register("intendedMajor", { required: "Select an intended major." })}
          >
            <option value="">Select…</option>
            {INTENDED_MAJORS.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
          {errors.intendedMajor ? (
            <p className="mt-1 text-xs font-medium text-rose-600">{errors.intendedMajor.message}</p>
          ) : null}
        </div>
      </div>

      <div>
        <label htmlFor="elite-questions" className="mb-1.5 block text-[11px] font-black uppercase tracking-[0.14em] text-slate-500">
          Questions for our team
        </label>
        <textarea
          id="elite-questions"
          rows={4}
          className={`${fieldClass} min-h-[7rem] resize-y`}
          placeholder="Tell us about your student, timing, or what you want them to get from membership…"
          {...register("questions", {
            required: "Add a short note for our team.",
            minLength: { value: 10, message: "Tell us a bit more (at least 10 characters)." },
          })}
        />
        {errors.questions ? <p className="mt-1 text-xs font-medium text-rose-600">{errors.questions.message}</p> : null}
      </div>

      {error ? (
        <p className="rounded-2xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-medium text-rose-700">{error}</p>
      ) : null}

      <button
        type="submit"
        disabled={busy}
        className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-6 py-3.5 text-xs font-black uppercase tracking-[0.14em] text-white shadow-[0_14px_28px_-18px_rgba(15,23,42,0.5)] transition hover:-translate-y-0.5 hover:bg-slate-800 disabled:opacity-60"
      >
        {busy ? "Submitting…" : "Apply for membership"}
        {!busy ? <ArrowRight className="h-4 w-4" aria-hidden /> : null}
      </button>
    </form>
  );
}
