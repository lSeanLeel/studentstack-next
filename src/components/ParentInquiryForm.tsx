"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "motion/react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { jakartaSans } from "@/app/fonts";
import { STUDENT_GRADES, type StudentGrade } from "@/lib/portal/certifications";

type FormData = {
  parentName: string;
  parentEmail: string;
  studentName: string;
  studentGrade: StudentGrade | "";
  inquiry: string;
};

export function ParentInquiryForm({ dark = false }: { dark?: boolean }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      parentName: "",
      parentEmail: "",
      studentName: "",
      studentGrade: "",
      inquiry: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setBusy(true);
    setError(null);
    try {
      const message = [
        "PARENT INQUIRY",
        data.studentName.trim() ? `Student: ${data.studentName.trim()}` : null,
        data.studentGrade ? `Grade: ${data.studentGrade}` : null,
        "",
        data.inquiry.trim(),
      ]
        .filter(Boolean)
        .join("\n");

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.parentName.trim(),
          email: data.parentEmail.trim(),
          message,
          audience: "student",
        }),
      });
      const json = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setError(json.error ?? `Could not send (${res.status}).`);
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

  const labelClass = dark
    ? "mb-1.5 block text-[10px] font-black uppercase tracking-[0.14em] text-slate-300"
    : "mb-1.5 block text-[10px] font-black uppercase tracking-[0.14em] text-slate-500";

  const errorClass = dark ? "text-xs font-medium text-rose-400" : "text-xs font-medium text-rose-600";

  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-[1.5rem] border p-6 text-center ${dark ? "border-emerald-500/30 bg-emerald-900/30" : "border-emerald-200 bg-emerald-50/60"} ${jakartaSans.className}`}
      >
        <CheckCircle2 className={`mx-auto mb-3 h-7 w-7 ${dark ? "text-emerald-400" : "text-emerald-600"}`} aria-hidden />
        <p className={`text-sm font-semibold ${dark ? "text-white" : "text-slate-900"}`}>Inquiry received.</p>
        <p className={`mt-2 text-xs font-medium leading-relaxed ${dark ? "text-slate-300" : "text-slate-600"}`}>
          A teammate with the right background will follow up at the email you provided.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`space-y-4 ${jakartaSans.className}`} noValidate>
      <div>
        <label htmlFor="inquiry-parent-name" className={labelClass}>
          Parent name
        </label>
        <input
          id="inquiry-parent-name"
          type="text"
          className={fieldClass}
          placeholder="Alex Parent"
          {...register("parentName", { required: "Name is required." })}
        />
        {errors.parentName ? <p className={`mt-1 ${errorClass}`}>{errors.parentName.message}</p> : null}
      </div>

      <div>
        <label htmlFor="inquiry-parent-email" className={labelClass}>
          Parent email
        </label>
        <input
          id="inquiry-parent-email"
          type="email"
          className={fieldClass}
          placeholder="parent@email.com"
          {...register("parentEmail", {
            required: "Email is required.",
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email." },
          })}
        />
        {errors.parentEmail ? <p className={`mt-1 ${errorClass}`}>{errors.parentEmail.message}</p> : null}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="inquiry-student-name" className={labelClass}>
            Student name <span className="font-bold normal-case tracking-normal opacity-70">(optional)</span>
          </label>
          <input
            id="inquiry-student-name"
            type="text"
            className={fieldClass}
            placeholder="Jordan"
            {...register("studentName")}
          />
        </div>
        <div>
          <label htmlFor="inquiry-student-grade" className={labelClass}>
            Student grade <span className="font-bold normal-case tracking-normal opacity-70">(optional)</span>
          </label>
          <select id="inquiry-student-grade" className={fieldClass} {...register("studentGrade")}>
            <option value="">Select grade</option>
            {STUDENT_GRADES.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="inquiry-message" className={labelClass}>
          Your inquiry
        </label>
        <textarea
          id="inquiry-message"
          rows={4}
          className={`${fieldClass} min-h-[7rem] resize-y`}
          placeholder="Tell us about your student, what you are weighing, or what kind of guidance you need…"
          {...register("inquiry", {
            required: "Tell us what you need help with.",
            minLength: { value: 10, message: "Tell us a bit more (at least 10 characters)." },
          })}
        />
        {errors.inquiry ? <p className={`mt-1 ${errorClass}`}>{errors.inquiry.message}</p> : null}
      </div>

      {error ? (
        <p
          className={`rounded-xl border px-3 py-2 text-xs font-medium ${
            dark ? "border-rose-300/40 bg-rose-500/10 text-rose-400" : "border-rose-200 bg-rose-50 text-rose-700"
          }`}
        >
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={busy}
        className={`inline-flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-3.5 text-xs font-black uppercase tracking-[0.14em] transition hover:-translate-y-0.5 disabled:opacity-60 ${
          dark
            ? "bg-white text-slate-900 shadow-[0_14px_28px_-18px_rgba(255,255,255,0.3)] hover:bg-sky-100"
            : "bg-slate-900 text-white shadow-[0_14px_28px_-18px_rgba(15,23,42,0.5)] hover:bg-slate-800"
        }`}
      >
        {busy ? "Sending…" : "Write us"}
        {!busy ? <ArrowRight className="h-4 w-4" aria-hidden /> : null}
      </button>
    </form>
  );
}
