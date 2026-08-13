"use client";

import React, { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { fredokaHeadline, jakartaSans, institutionalSerif } from "@/app/fonts";

export function EliteInquiryForm({ compact = false }: { compact?: boolean }) {
  const [parentName, setParentName] = useState("");
  const [parentEmail, setParentEmail] = useState("");
  const [studentName, setStudentName] = useState("");
  const [studentGrade, setStudentGrade] = useState("");
  const [school, setSchool] = useState("");
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/elite-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          parentName,
          parentEmail,
          studentName,
          studentGrade,
          school,
          note,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setError(data.error ?? "Could not send inquiry.");
        return;
      }
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Network error.");
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return (
      <div className={`rounded-[1.5rem] border border-emerald-200 bg-emerald-50/80 px-5 py-6 ${jakartaSans.className}`}>
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-hidden />
          <div>
            <p className={`text-lg font-semibold text-slate-900 ${fredokaHeadline.className}`}>Inquiry received</p>
            <p className={`ss-institutional mt-1 text-sm leading-relaxed text-slate-600 ${institutionalSerif.className}`}>
              We’ll review your student’s information and reach out to you at the parent email you shared.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const field =
    "w-full rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-sm font-medium text-slate-900 outline-none focus:border-sky-300 focus:bg-white focus:ring-2 focus:ring-sky-200";

  return (
    <form onSubmit={onSubmit} className={`space-y-3 ${jakartaSans.className}`} noValidate>
      <div className="mb-1">
        <h3
          className={`${compact ? "text-lg" : "text-xl"} font-semibold tracking-[-0.02em] text-slate-900 ${fredokaHeadline.className}`}
        >
          {compact ? "Inquiry" : "Start an Elite inquiry"}
        </h3>
        {!compact ? (
          <p className={`ss-institutional mt-1 text-sm leading-relaxed text-slate-600 ${institutionalSerif.className}`}>
            Tell us about your student. We’ll follow up, no checkout on this page.
          </p>
        ) : (
          <p className="mt-1 text-xs font-medium text-slate-500">Parent + student details. We’ll reach out.</p>
        )}
      </div>

      {error ? (
        <p className="rounded-2xl border border-rose-100 bg-rose-50 px-3 py-2 text-xs font-bold text-rose-700">
          {error}
        </p>
      ) : null}

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block sm:col-span-1">
          <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">
            Parent name
          </span>
          <input required value={parentName} onChange={(e) => setParentName(e.target.value)} className={field} />
        </label>
        <label className="block sm:col-span-1">
          <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">
            Parent email
          </span>
          <input
            required
            type="email"
            value={parentEmail}
            onChange={(e) => setParentEmail(e.target.value)}
            className={field}
          />
        </label>
        <label className="block sm:col-span-1">
          <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">
            Student name
          </span>
          <input required value={studentName} onChange={(e) => setStudentName(e.target.value)} className={field} />
        </label>
        <label className="block sm:col-span-1">
          <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">Grade</span>
          <select
            required
            value={studentGrade}
            onChange={(e) => setStudentGrade(e.target.value)}
            className={field}
          >
            <option value="" disabled>
              Select grade
            </option>
            <option value="8th">8th</option>
            <option value="9th">9th</option>
            <option value="10th">10th</option>
            <option value="11th">11th</option>
            <option value="12th">12th</option>
          </select>
        </label>
      </div>

      <label className="block">
        <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">
          School <span className="font-medium normal-case tracking-normal text-slate-400">(optional)</span>
        </span>
        <input value={school} onChange={(e) => setSchool(e.target.value)} className={field} />
      </label>

      <label className="block">
        <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">
          Anything we should know{" "}
          <span className="font-medium normal-case tracking-normal text-slate-400">(optional)</span>
        </span>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={3}
          className={field}
          placeholder="Goals, timing, how you found StudentStack…"
        />
      </label>

      <button
        type="submit"
        disabled={busy}
        className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-3.5 text-[11px] font-black uppercase tracking-[0.14em] text-white transition hover:bg-slate-800 disabled:opacity-60"
      >
        {busy ? (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
        ) : (
          <>
            Send inquiry
            <ArrowRight className="h-4 w-4" aria-hidden />
          </>
        )}
      </button>
    </form>
  );
}
