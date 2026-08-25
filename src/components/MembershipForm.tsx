"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "motion/react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { fredokaHeadline, jakartaSans } from "@/app/fonts";
import { STUDENT_GRADES, type StudentGrade } from "@/lib/portal/certifications";

type FormData = {
  parentEmail: string;
  studentName: string;
  studentGrade: StudentGrade | "";
};

export function MembershipForm({ dark = false }: { dark?: boolean }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: { parentEmail: "", studentName: "", studentGrade: "" },
  });

  const onSubmit = async (data: FormData) => {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/elite-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          parentFullName: "",
          parentEmail: data.parentEmail.trim(),
          studentGrade: data.studentGrade,
          intendedMajor: "Undecided",
          questions: `Student name: ${data.studentName.trim()}`,
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

  const fieldBase = "w-full rounded-2xl px-4 py-3 text-sm font-semibold outline-none transition";
  const fieldClass = dark
    ? `${fieldBase} border-2 border-white/20 bg-white/10 text-white placeholder:text-slate-400 focus:border-sky-400 focus:bg-white/15`
    : `${fieldBase} border-2 border-sky-100 bg-sky-50/50 text-slate-900 focus:border-sky-300 focus:bg-white`;

  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-[1.5rem] border p-5 text-center ${dark ? "border-emerald-500/30 bg-emerald-900/30" : "border-emerald-200 bg-emerald-50/60"} ${jakartaSans.className}`}
      >
        <CheckCircle2 className={`mx-auto mb-3 h-7 w-7 ${dark ? "text-emerald-400" : "text-emerald-600"}`} aria-hidden />
        <p className={`text-sm font-semibold ${dark ? "text-white" : "text-slate-900"}`}>
          Application received.
        </p>
        <p className={`mt-1 text-xs font-medium ${dark ? "text-slate-300" : "text-slate-600"}`}>
          Our team will email you shortly with next steps.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`space-y-3 ${jakartaSans.className}`} noValidate>
      <input
        type="email"
        className={fieldClass}
        placeholder="Parent email"
        {...register("parentEmail", {
          required: "Email is required.",
          pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email." },
        })}
      />
      {errors.parentEmail ? <p className="text-xs font-medium text-rose-400">{errors.parentEmail.message}</p> : null}

      <div className="grid grid-cols-2 gap-3">
        <input
          type="text"
          className={fieldClass}
          placeholder="Student first name"
          {...register("studentName", { required: "Name is required." })}
        />
        <select className={fieldClass} {...register("studentGrade", { required: "Select grade." })}>
          <option value="">Grade</option>
          {STUDENT_GRADES.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
      </div>
      {errors.studentName ? <p className="text-xs font-medium text-rose-400">{errors.studentName.message}</p> : null}
      {errors.studentGrade ? <p className="text-xs font-medium text-rose-400">{errors.studentGrade.message}</p> : null}

      {error ? (
        <p className="rounded-xl border border-rose-300/40 bg-rose-500/10 px-3 py-2 text-xs font-medium text-rose-400">{error}</p>
      ) : null}

      <button
        type="submit"
        disabled={busy}
        className={`inline-flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-3 text-xs font-black uppercase tracking-[0.14em] transition hover:-translate-y-0.5 disabled:opacity-60 ${
          dark
            ? "bg-white text-slate-900 shadow-[0_14px_28px_-18px_rgba(255,255,255,0.3)] hover:bg-sky-100"
            : "bg-slate-900 text-white shadow-[0_14px_28px_-18px_rgba(15,23,42,0.5)] hover:bg-slate-800"
        }`}
      >
        {busy ? "Submitting…" : "Apply your student"}
        {!busy ? <ArrowRight className="h-4 w-4" aria-hidden /> : null}
      </button>
    </form>
  );
}
