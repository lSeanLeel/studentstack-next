"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { institutionalSerif, jakartaSans } from "@/app/fonts";
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

const serif = institutionalSerif.className;
const sans = jakartaSans.className;
const label = `${sans} mb-1.5 block text-[0.92rem] font-semibold text-ink`;
const field = `${sans} w-full rounded-md border border-rule bg-white px-4 py-3 text-base text-ink outline-none transition placeholder:text-muted focus:border-accent focus:ring-1 focus:ring-accent`;

function Part({ step, title, children }: { step: number; title: string; children: React.ReactNode }) {
  return (
    <fieldset className="border-t border-rule pt-8">
      <legend className="sr-only">{title}</legend>
      <p className={`${sans} text-sm text-muted`} aria-hidden>
        Part {step} of 3
      </p>
      <h2 className={`${serif} mt-1 text-2xl font-semibold text-ink`}>{title}</h2>
      <div className="mt-6 grid gap-5 sm:grid-cols-2">{children}</div>
    </fieldset>
  );
}

function Options<T extends string>({
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
            className={`${sans} rounded-md border px-4 py-2.5 text-[0.95rem] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
              on ? "border-ink bg-ink font-semibold text-white" : "border-rule bg-white text-body hover:border-muted"
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
    const parts = ["utm_source", "utm_medium", "utm_campaign"].map((k) => q.get(k)).filter(Boolean);
    if (parts.length) setUtm(parts.join(" / "));
  }, []);

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) => setForm((f) => ({ ...f, [k]: v }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!form.studentGrade) return setError("Select your student's grade.");
    if (!form.aiUse) return setError("Select how your student uses AI today.");
    setState("loading");
    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, heardFrom: form.heardFrom || undefined, utm }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(data.error ?? "The application didn't go through. Try again in a moment.");
      setState("done");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "The application didn't go through. Try again in a moment.");
      setState("idle");
    }
  }

  if (state === "done") {
    return (
      <div className="mx-auto max-w-2xl">
        <h1 className={`${serif} text-[2.4rem] font-semibold leading-tight text-ink sm:text-5xl`}>Application received</h1>
        <p className={`${sans} mt-4 max-w-[60ch] text-[1.05rem] leading-relaxed text-body`}>
          Thank you{form.parentName ? `, ${form.parentName.split(" ")[0]}` : ""}. We&apos;ll review your application
          and email you at <span className="font-semibold text-ink">{form.parentEmail}</span> to set up a short call
          about {form.studentName || "your student"} and the {COHORT.monthLabel} cohort.
        </p>
        <ol className="mt-10 border-t border-rule">
          {APPLY_STEPS.map((s, i) => (
            <li key={s.title} className={`${sans} flex items-center justify-between gap-4 border-b border-rule py-4 text-[0.98rem]`}>
              <span className={i === 0 ? "text-ink" : "text-body"}>
                <span className="mr-3 text-muted">{i + 1}.</span>
                {s.title}
              </span>
              <span className={`text-sm ${i === 0 ? "font-semibold text-accent" : "text-muted"}`}>
                {i === 0 ? "Done" : i === 1 ? "Next" : ""}
              </span>
            </li>
          ))}
        </ol>
        <Link href="/" className={`${sans} mt-8 inline-block font-semibold text-accent underline underline-offset-4`}>
          Return to StudentStack
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto flex max-w-2xl flex-col gap-10">
      <Part step={1} title="Parent or guardian">
        <label className="block">
          <span className={label}>Full name</span>
          <input className={field} required autoComplete="name" value={form.parentName} onChange={(e) => set("parentName", e.target.value)} />
        </label>
        <label className="block">
          <span className={label}>Email</span>
          <input className={field} type="email" required autoComplete="email" value={form.parentEmail} onChange={(e) => set("parentEmail", e.target.value)} />
        </label>
        <label className="block sm:col-span-2">
          <span className={label}>
            Phone <span className="font-normal text-muted">(optional)</span>
          </span>
          <input className={`${field} sm:max-w-xs`} type="tel" autoComplete="tel" value={form.parentPhone} onChange={(e) => set("parentPhone", e.target.value)} />
        </label>
      </Part>

      <Part step={2} title="Student">
        <label className="block">
          <span className={label}>First name</span>
          <input className={field} required value={form.studentName} onChange={(e) => set("studentName", e.target.value)} />
        </label>
        <label className="block">
          <span className={label}>
            School <span className="font-normal text-muted">(optional)</span>
          </span>
          <input className={field} value={form.school} onChange={(e) => set("school", e.target.value)} />
        </label>
        <div className="sm:col-span-2">
          <span className={label}>Grade</span>
          <Options name="Grade" options={STUDENT_GRADES} value={form.studentGrade} onChange={(v) => set("studentGrade", v)} />
        </div>
        <div className="sm:col-span-2">
          <span className={label}>How does your student use AI today?</span>
          <Options name="Current AI use" options={AI_USE_LEVELS} value={form.aiUse} onChange={(v) => set("aiUse", v)} />
        </div>
        <label className="block sm:col-span-2">
          <span className={label}>What would you like the program to help with?</span>
          <span className={`${sans} mb-2 block text-sm text-muted`}>
            For example: grades in a particular class, staying organized, a research project, or using AI within school rules.
          </span>
          <textarea
            className={`${field} min-h-[130px] resize-y`}
            required
            minLength={10}
            value={form.goals}
            onChange={(e) => set("goals", e.target.value)}
          />
        </label>
      </Part>

      <Part step={3} title="Final details">
        <div className="sm:col-span-2">
          <span className={label}>
            How did you hear about us? <span className="font-normal text-muted">(optional)</span>
          </span>
          <Options name="Referral source" options={HEARD_FROM} value={form.heardFrom} onChange={(v) => set("heardFrom", v)} />
        </div>
        <label className={`${sans} flex items-start gap-3 text-[0.95rem] text-body sm:col-span-2`}>
          <input
            type="checkbox"
            checked={form.newsletterOptIn}
            onChange={(e) => set("newsletterOptIn", e.target.checked)}
            className="mt-0.5 h-5 w-5 rounded border-rule accent-[#13233F]"
          />
          Send me the free StudentStack newsletter as well.
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
      </Part>

      <div className="border-t border-rule pt-8">
        {error ? (
          <p role="alert" className={`${sans} mb-5 rounded-md border border-[#F1C0BA] bg-[#FEF3F2] px-4 py-3 text-[0.95rem] font-semibold text-[#B42318]`}>
            {error}
          </p>
        ) : null}
        <button
          type="submit"
          disabled={state === "loading"}
          className={`${sans} inline-flex w-full items-center justify-center gap-2 rounded-md bg-ink px-6 py-4 text-base font-semibold text-white transition-colors hover:bg-[#1d3359] disabled:opacity-60 sm:w-auto`}
        >
          {state === "loading" ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : null}
          Submit application
        </button>
        <p className={`${sans} mt-4 text-sm text-muted`}>
          Applying is free and doesn&apos;t commit you to enroll. {COHORT.reviewNote}
        </p>
      </div>
    </form>
  );
}
