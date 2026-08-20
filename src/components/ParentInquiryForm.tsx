"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "motion/react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { jakartaSans } from "@/app/fonts";

type FormData = {
  name: string;
  email: string;
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
    defaultValues: { name: "", email: "", inquiry: "" },
  });

  const onSubmit = async (data: FormData) => {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name.trim(),
          email: data.email.trim(),
          message: data.inquiry.trim(),
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

  const errorClass = dark ? "text-xs font-medium text-rose-400" : "text-xs font-medium text-rose-600";

  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-[1.5rem] border p-5 text-center ${dark ? "border-emerald-500/30 bg-emerald-900/30" : "border-emerald-200 bg-emerald-50/60"} ${jakartaSans.className}`}
      >
        <CheckCircle2 className={`mx-auto mb-2 h-6 w-6 ${dark ? "text-emerald-400" : "text-emerald-600"}`} aria-hidden />
        <p className={`text-sm font-semibold ${dark ? "text-white" : "text-slate-900"}`}>Message sent.</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`space-y-3 ${jakartaSans.className}`} noValidate>
      <input
        type="text"
        className={fieldClass}
        placeholder="Your name"
        {...register("name", { required: "Name is required." })}
      />
      {errors.name ? <p className={errorClass}>{errors.name.message}</p> : null}

      <input
        type="email"
        className={fieldClass}
        placeholder="Email"
        {...register("email", {
          required: "Email is required.",
          pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email." },
        })}
      />
      {errors.email ? <p className={errorClass}>{errors.email.message}</p> : null}

      <textarea
        rows={4}
        className={`${fieldClass} min-h-[6rem] resize-y`}
        placeholder="Your inquiry"
        {...register("inquiry", {
          required: "Message is required.",
          minLength: { value: 10, message: "Tell us a bit more." },
        })}
      />
      {errors.inquiry ? <p className={errorClass}>{errors.inquiry.message}</p> : null}

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
        className={`inline-flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-3 text-xs font-black uppercase tracking-[0.14em] transition hover:-translate-y-0.5 disabled:opacity-60 ${
          dark
            ? "bg-white text-slate-900 shadow-[0_14px_28px_-18px_rgba(255,255,255,0.3)] hover:bg-sky-100"
            : "bg-slate-900 text-white shadow-[0_14px_28px_-18px_rgba(15,23,42,0.5)] hover:bg-slate-800"
        }`}
      >
        {busy ? "Sending…" : "Send"}
        {!busy ? <ArrowRight className="h-4 w-4" aria-hidden /> : null}
      </button>
    </form>
  );
}
