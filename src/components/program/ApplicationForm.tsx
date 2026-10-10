"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { fredokaHeadline, jakartaSans } from "@/app/fonts";
import { AI_USE_LEVELS, APPLY_STEPS, COHORT, HEARD_FROM, STUDENT_GRADES } from "@/lib/program";

type FormState = {
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  studentName: string;
  studentGrade: string;
  school: string;
  goals: string;
  aiUse: string;
  heardFrom: string;
  newsletterOptIn: boolean;
  website: string;
};

const EMPTY: FormState = {
  parentName: "",
  parentEmail: "",
  parentPhone: "",
  studentName: "",
  studentGrade: "",
  school: "",
  goals: "",
  aiUse: "",
  heardFrom: "",
  newsletterOptIn: true,
  website: "",
};

const label = `${jakartaSans.className} mb-1.5 block text-[11px] font-black uppercase tracking-[0.16em] text-slate-500`;
const field = `${jakartaSans.className} w-full rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 text-base font-semibold text-slate-900 outline-none transition placeholder:font-medium placeholder:text-slate-400 focus:border-sky-400`;

function Fieldset({ step, title, children }: { step: number; title: string; children: React.ReactNode }) {
  return (
    <fieldset className="rounded-[1.75rem] border border-slate-200/80 bg-white/95 p-5 sm:p-7">
      <legend className="sr-only">{title}</legend>
      <div className="mb-5 flex items-center gap-3">
        <span className={`${fredokaHeadline.className} flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white`}>
          {step}
        </span>
        <h2 className={`${fredokaHeadline.className} text-xl font-semibold tracking-[-0.02em] text-slate-900`}>{title}</h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">{children}</div>
    </fieldset>
  );
}

function Chips<T extends string>({
  name,
  options,
  value,
  onChange,
}: {
  name: string;
  options: readonly T[];
  value: string;
  onChange: (v: T) => void;
}) {
  return (
    <div role="radiogroup" aria-label={name} className="flex flex-wrap gap-2">
      {options.map((o) => {
        const on = value === o;
        return (
          <button
            key={o}
            type="button"
            role="radio"
            aria-checked={on}
            onClick={() => onChange(o)}
            className={`${jakartaSans.className} rounded-2xl border-2 px-4 py-2.5 text-sm font-bold transition ${
              on ? "border-sky-500 bg-sky-50 text-sky-800" : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
            }`}
          >
            {o}
          </button>
        );
      })}
    </div>
  );
}

export function ApplicationForm() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const [error, setError] = useState("");

  const [utm, setUtm] = useState("");
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const parts = ["utm_source", "utm_medium", "utm_campaign"]
      .map((k) => q.get(k))
      .filter(Boolean);
    if (parts.length) setUtm(parts.join(" / "));
  }, []);

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) => setForm((f) => ({ ...f, [k]: v }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!form.studentGrade) return setError("Choose your student's grade.");
    if (!form.aiUse) return setError("Choose how your student uses AI today.");
    setState("loading");
    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, heardFrom: form.heardFrom || undefined, utm }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");
      setState("done");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setState("idle");
    }
  }

  if (state === "done") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-2xl rounded-[2.25rem] border border-emerald-200 bg-white p-8 text-center sm:p-12"
      >
        <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-500" aria-hidden />
        <h1 className={`${fredokaHeadline.className} mt-4 text-4xl font-semibold tracking-[-0.03em] text-slate-900`}>
          Application received
        </h1>
        <p className={`${jakartaSans.className} mx-auto mt-3 max-w-md text-base font-medium leading-relaxed text-slate-600`}>
          Thank you, {form.parentName.split(" ")[0] || "and welcome"}. Our team reads every application. A member of
          the team will email you at <span className="font-bold text-slate-900">{form.parentEmail}</span> to talk
          through {form.studentName || "your student"} and the {COHORT.name}.
        </p>
        <ol className="mx-auto mt-8 max-w-sm space-y-3 text-left">
          {APPLY_STEPS.map((s, i) => (
            <li key={s.title} className={`${jakartaSans.className} flex items-center gap-3 text-sm font-bold ${i === 0 ? "text-emerald-700" : "text-slate-600"}`}>
              <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs ${i === 0 ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-500"}`}>
                {i === 0 ? "✓" : i + 1}
              </span>
              {s.title}
            </li>
          ))}
        </ol>
        <Link href="/" className={`${jakartaSans.className} mt-8 inline-block text-sm font-bold text-sky-700 underline underline-offset-4`}>
          Back to StudentStack
        </Link>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto flex max-w-2xl flex-col gap-4" noValidate={false}>
      <Fieldset step={1} title="About you">
        <label className="block">
          <span className={label}>Your name</span>
          <input className={field} required autoComplete="name" value={form.parentName} onChange={(e) => set("parentName", e.target.value)} />
        </label>
        <label className="block">
          <span className={label}>Email</span>
          <input className={field} type="email" required autoComplete="email" value={form.parentEmail} onChange={(e) => set("parentEmail", e.target.value)} />
        </label>
        <label className="block sm:col-span-2">
          <span className={label}>Phone (optional)</span>
          <input className={field} type="tel" autoComplete="tel" value={form.parentPhone} onChange={(e) => set("parentPhone", e.target.value)} />
        </label>
      </Fieldset>

      <Fieldset step={2} title="About your student">
        <label className="block">
          <span className={label}>Student first name</span>
          <input className={field} required value={form.studentName} onChange={(e) => set("studentName", e.target.value)} />
        </label>
        <label className="block">
          <span className={label}>School (optional)</span>
          <input className={field} value={form.school} onChange={(e) => set("school", e.target.value)} />
        </label>
        <div className="sm:col-span-2">
          <span className={label}>Grade</span>
          <Chips name="Grade" options={STUDENT_GRADES} value={form.studentGrade} onChange={(v) => set("studentGrade", v)} />
        </div>
        <div className="sm:col-span-2">
          <span className={label}>How does your student use AI today?</span>
          <Chips name="AI use" options={AI_USE_LEVELS} value={form.aiUse} onChange={(v) => set("aiUse", v)} />
        </div>
        <label className="block sm:col-span-2">
          <span className={label}>What would you like the program to help with?</span>
          <textarea
            className={`${field} min-h-[120px] resize-y`}
            required
            minLength={10}
            placeholder="Grades, staying organized, a big project, college applications, using AI responsibly..."
            value={form.goals}
            onChange={(e) => set("goals", e.target.value)}
          />
        </label>
      </Fieldset>

      <Fieldset step={3} title="Last thing">
        <div className="sm:col-span-2">
          <span className={label}>How did you hear about us? (optional)</span>
          <Chips name="Heard from" options={HEARD_FROM} value={form.heardFrom} onChange={(v) => set("heardFrom", v)} />
        </div>
        <label className={`${jakartaSans.className} flex items-start gap-3 text-sm font-semibold text-slate-700 sm:col-span-2`}>
          <input
            type="checkbox"
            checked={form.newsletterOptIn}
            onChange={(e) => set("newsletterOptIn", e.target.checked)}
            className="mt-0.5 h-5 w-5 rounded accent-sky-500"
          />
          Also send me the free StudentStack newsletter on AI and school.
        </label>
        {/* Honeypot, hidden from people */}
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
          className="absolute left-[-9999px] h-0 w-0 opacity-0"
          value={form.website}
          onChange={(e) => set("website", e.target.value)}
        />
      </Fieldset>

      {error ? (
        <p role="alert" className={`${jakartaSans.className} rounded-2xl bg-rose-50 px-4 py-3 text-sm font-bold text-rose-700`}>
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={state === "loading"}
        className={`${jakartaSans.className} inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-6 py-4 text-sm font-black uppercase tracking-[0.14em] text-white shadow-[0_14px_28px_-18px_rgba(15,23,42,0.5)] transition hover:-translate-y-0.5 hover:bg-slate-800 disabled:opacity-60`}
      >
        {state === "loading" ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : null}
        Submit application
        {state === "loading" ? null : <ArrowRight className="h-4 w-4" aria-hidden />}
      </button>
      <p className={`${jakartaSans.className} text-center text-xs font-semibold text-slate-500`}>
        Applying is free and doesn&apos;t commit you to anything. {COHORT.reviewNote}
      </p>
    </form>
  );
}
