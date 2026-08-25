"use client";

import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  Award,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileBadge2,
  X,
} from "lucide-react";
import { fredokaHeadline, jakartaSans } from "@/app/fonts";

export type CertEnrollment = {
  id: string;
  title: string;
  credential: string;
  tagline: string;
  description: string;
  youGet: string[];
  requirements: string[];
  partner: {
    initials: string;
    name: string;
    role: string;
    tint: string;
    blurb: string;
  };
  startsLabel: string;
  duration: string;
  price: number;
  examFeeIncluded: boolean;
  seatsLeft?: number;
  level: string;
  format: "cohort" | "rolling";
};

function formatPrice(n: number) {
  return `$${n}`;
}

/**
 * Full enrollment modal for a single partner credential pathway.
 */
export function CertificationEnrollModal({
  open,
  onClose,
  cert,
}: {
  open: boolean;
  onClose: () => void;
  cert: CertEnrollment | null;
}) {
  const [parentName, setParentName] = useState("");
  const [studentName, setStudentName] = useState("");
  const [email, setEmail] = useState("");
  const [grade, setGrade] = useState("");
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    setDone(false);
    setError(null);
    setNote("");
    setGrade("");
    setStudentName("");
  }, [open, cert?.id]);

  if (!open || !cert) return null;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: parentName.trim() || "Parent",
          email: email.trim(),
          message: [
            `Enroll: ${cert.title} (${cert.credential})`,
            `Partner: ${cert.partner.name}`,
            `Price: ${formatPrice(cert.price)} · ${cert.startsLabel}`,
            studentName.trim() ? `Student: ${studentName.trim()}` : null,
            grade ? `Grade: ${grade}` : null,
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
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-4">
      <button
        type="button"
        className="absolute inset-0 bg-slate-950/55 backdrop-blur-sm"
        aria-label="Close"
        onClick={onClose}
      />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="cert-enroll-heading"
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="relative max-h-[min(92vh,54rem)] w-full max-w-3xl overflow-y-auto rounded-[2rem] border border-slate-200 bg-white shadow-[0_40px_100px_-48px_rgba(15,23,42,0.55)]"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full bg-white/90 p-2 text-slate-500 shadow-sm transition hover:bg-sky-50 hover:text-sky-700"
          aria-label="Close dialog"
        >
          <X className="h-4 w-4" />
        </button>

        <div className={`bg-gradient-to-br ${cert.partner.tint} px-6 pb-8 pt-8 sm:px-8`}>
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/95 shadow-lg">
              <span className={`text-xs font-black tracking-tight text-slate-900 ${jakartaSans.className}`}>
                {cert.partner.initials}
              </span>
            </div>
            <div className="min-w-0 pt-0.5">
              <p className={`text-[10px] font-black uppercase tracking-[0.2em] text-white/85 ${jakartaSans.className}`}>
                {cert.partner.role} · {cert.partner.name}
              </p>
              <h3
                id="cert-enroll-heading"
                className={`mt-1 text-2xl font-semibold tracking-[-0.03em] text-white sm:text-3xl ${fredokaHeadline.className}`}
              >
                {cert.title}
              </h3>
              <p className={`mt-1 text-sm font-semibold text-white/90 ${jakartaSans.className}`}>{cert.tagline}</p>
            </div>
          </div>
          <p className={`mt-4 max-w-2xl text-sm font-medium leading-relaxed text-white/90 ${jakartaSans.className}`}>
            {cert.partner.blurb}
          </p>
        </div>

        {done ? (
          <div className="px-6 py-8 sm:px-8">
            <p className={`text-[10px] font-black uppercase tracking-[0.22em] text-[#ff6a00] ${jakartaSans.className}`}>
              Enrollment received
            </p>
            <p className={`mt-2 text-2xl font-semibold tracking-[-0.03em] text-slate-900 ${fredokaHeadline.className}`}>
              We will confirm your seat
            </p>
            <p className={`mt-3 text-sm font-medium leading-relaxed text-slate-600 ${jakartaSans.className}`}>
              Thanks for enrolling in {cert.title} with {cert.partner.name}. A StudentStack teammate will email payment
              and rostering next steps for {formatPrice(cert.price)}.
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
          <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="border-b border-slate-100 px-6 py-6 sm:px-8 lg:border-b-0 lg:border-r">
              <p className={`text-sm font-medium leading-relaxed text-slate-600 ${jakartaSans.className}`}>
                {cert.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                <span
                  className={`rounded-full bg-sky-50 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-sky-700 ${jakartaSans.className}`}
                >
                  {cert.level} · {cert.credential}
                </span>
                <span
                  className={`rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-slate-600 ${jakartaSans.className}`}
                >
                  {cert.format === "cohort" ? "Fixed cohort" : "Rolling"}
                </span>
              </div>

              <ul className={`mt-5 space-y-2.5 text-sm font-semibold text-slate-700 ${jakartaSans.className}`}>
                <li className="flex gap-2">
                  <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-sky-500" aria-hidden />
                  {cert.startsLabel}
                </li>
                <li className="flex gap-2">
                  <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-sky-500" aria-hidden />
                  {cert.duration}
                </li>
                <li className="flex gap-2">
                  <Award className="mt-0.5 h-4 w-4 shrink-0 text-[#ff6a00]" aria-hidden />
                  {formatPrice(cert.price)}
                  {cert.examFeeIncluded ? " · exam & credential included" : ""}
                  {typeof cert.seatsLeft === "number" ? ` · ${cert.seatsLeft} seats left` : ""}
                </li>
              </ul>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div>
                  <p className={`text-[10px] font-black uppercase tracking-[0.16em] text-slate-400 ${jakartaSans.className}`}>
                    Included
                  </p>
                  <ul className="mt-2 space-y-2">
                    {cert.youGet.map((item) => (
                      <li key={item} className={`flex gap-2 text-xs font-medium text-slate-600 ${jakartaSans.className}`}>
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" aria-hidden />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className={`text-[10px] font-black uppercase tracking-[0.16em] text-slate-400 ${jakartaSans.className}`}>
                    To earn it
                  </p>
                  <ul className="mt-2 space-y-2">
                    {cert.requirements.map((item) => (
                      <li key={item} className={`flex gap-2 text-xs font-medium text-slate-600 ${jakartaSans.className}`}>
                        <FileBadge2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sky-500" aria-hidden />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <form onSubmit={onSubmit} className="space-y-3.5 bg-[#f8fafc] px-6 py-6 sm:px-8">
              <p className={`text-[10px] font-black uppercase tracking-[0.18em] text-slate-400 ${jakartaSans.className}`}>
                Enrollment · {formatPrice(cert.price)}
              </p>
              <p className={`text-lg font-semibold tracking-[-0.02em] text-slate-900 ${fredokaHeadline.className}`}>
                Reserve a seat
              </p>

              <label className="block">
                <span className={`mb-1 block text-[11px] font-black uppercase tracking-wider text-slate-500 ${jakartaSans.className}`}>
                  Parent name
                </span>
                <input
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  className="w-full rounded-2xl border-2 border-sky-100 bg-white px-4 py-2.5 text-sm font-semibold outline-none focus:border-sky-300"
                  placeholder="Alex Parent"
                />
              </label>

              <label className="block">
                <span className={`mb-1 block text-[11px] font-black uppercase tracking-wider text-slate-500 ${jakartaSans.className}`}>
                  Student name
                </span>
                <input
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full rounded-2xl border-2 border-sky-100 bg-white px-4 py-2.5 text-sm font-semibold outline-none focus:border-sky-300"
                  placeholder="Jordan Student"
                />
              </label>

              <label className="block">
                <span className={`mb-1 block text-[11px] font-black uppercase tracking-wider text-slate-500 ${jakartaSans.className}`}>
                  Email
                </span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-2xl border-2 border-sky-100 bg-white px-4 py-2.5 text-sm font-semibold outline-none focus:border-sky-300"
                  placeholder="you@email.com"
                />
              </label>

              <label className="block">
                <span className={`mb-1 block text-[11px] font-black uppercase tracking-wider text-slate-500 ${jakartaSans.className}`}>
                  Grade
                </span>
                <select
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="w-full rounded-2xl border-2 border-sky-100 bg-white px-4 py-2.5 text-sm font-semibold outline-none focus:border-sky-300"
                >
                  <option value="">Select…</option>
                  <option value="9">9th</option>
                  <option value="10">10th</option>
                  <option value="11">11th</option>
                  <option value="12">12th</option>
                </select>
              </label>

              <label className="block">
                <span className={`mb-1 block text-[11px] font-black uppercase tracking-wider text-slate-500 ${jakartaSans.className}`}>
                  Optional note
                </span>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={2}
                  className="w-full resize-none rounded-2xl border-2 border-sky-100 bg-white px-4 py-2.5 text-sm font-semibold outline-none focus:border-sky-300"
                  placeholder="Timing, school policies, questions…"
                />
              </label>

              {error ? <p className="text-sm font-semibold text-rose-600">{error}</p> : null}

              <button
                type="submit"
                disabled={busy}
                className={`w-full rounded-2xl bg-slate-900 py-3.5 text-xs font-black uppercase tracking-[0.14em] text-white shadow-[0_14px_28px_-18px_rgba(15,23,42,0.55)] transition hover:-translate-y-0.5 hover:bg-slate-800 disabled:opacity-60 ${jakartaSans.className}`}
              >
                {busy ? "Sending…" : `Enroll · ${formatPrice(cert.price)}`}
              </button>
              <p className={`text-center text-[11px] font-medium text-slate-500 ${jakartaSans.className}`}>
                We email payment instructions. No charge on this form.
              </p>
            </form>
          </div>
        )}
      </motion.div>
    </div>
  );
}
