"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "motion/react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { jakartaSans } from "@/app/fonts";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export function ContactForm({
  onBusyChange,
  onSubmittedChange,
}: {
  onBusyChange?: (busy: boolean) => void;
  onSubmittedChange?: (submitted: boolean) => void;
}) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    onSubmittedChange?.(isSubmitted);
  }, [isSubmitted, onSubmittedChange]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    defaultValues: { name: "", email: "", message: "" },
  });

  const setBusy = (busy: boolean) => {
    setIsLoading(busy);
    onBusyChange?.(busy);
  };

  const onSubmit = async (data: ContactFormData) => {
    setBusy(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name.trim(),
          email: data.email.trim(),
          message: data.message.trim(),
        }),
      });

      if (!res.ok) {
        try {
          const errData = (await res.json()) as { error?: string };
          setSubmitError(
            typeof errData.error === "string" && errData.error.trim()
              ? errData.error.trim()
              : `HTTP ${res.status}`
          );
        } catch {
          setSubmitError(`HTTP ${res.status} — could not send message.`);
        }
        return;
      }

      setIsSubmitted(true);
    } catch (e) {
      const net = e instanceof Error ? e.message : "Unknown error";
      setSubmitError(`Network error: ${net}`);
    } finally {
      setBusy(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className={`flex flex-col items-center px-2 py-6 text-center ${jakartaSans.className}`}
      >
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
          <CheckCircle2 className="h-7 w-7" aria-hidden />
        </div>
        <h3 id="contact-success-title" className="mb-2 text-2xl font-black tracking-tight text-slate-900">
          Message sent
        </h3>
        <p className="max-w-sm text-sm font-medium leading-relaxed text-slate-600">
          Thanks for reaching out. A StudentStack teammate will get back to you soon.
        </p>
      </motion.div>
    );
  }

  const fieldClass =
    "w-full rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-sm font-medium text-slate-900 outline-none transition focus:border-sky-300 focus:bg-white focus:ring-2 focus:ring-sky-200";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`space-y-4 ${jakartaSans.className}`} noValidate>
      <div>
        <label htmlFor="contact-name" className="mb-1.5 block text-left text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">
          Name
        </label>
        <input
          id="contact-name"
          type="text"
          autoComplete="name"
          className={fieldClass}
          placeholder="Your name"
          {...register("name", { required: "Name is required." })}
        />
        {errors.name ? <p className="mt-1 text-left text-xs font-medium text-rose-600">{errors.name.message}</p> : null}
      </div>

      <div>
        <label htmlFor="contact-email" className="mb-1.5 block text-left text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">
          Email
        </label>
        <input
          id="contact-email"
          type="email"
          autoComplete="email"
          className={fieldClass}
          placeholder="you@email.com"
          {...register("email", {
            required: "Email is required.",
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email." },
          })}
        />
        {errors.email ? <p className="mt-1 text-left text-xs font-medium text-rose-600">{errors.email.message}</p> : null}
      </div>

      <div>
        <label htmlFor="contact-message" className="mb-1.5 block text-left text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">
          Message
        </label>
        <textarea
          id="contact-message"
          rows={4}
          className={`${fieldClass} min-h-[7.5rem] resize-y`}
          placeholder="How can we help?"
          {...register("message", {
            required: "Message is required.",
            minLength: { value: 10, message: "Tell us a bit more (at least 10 characters)." },
          })}
        />
        {errors.message ? (
          <p className="mt-1 text-left text-xs font-medium text-rose-600">{errors.message.message}</p>
        ) : null}
      </div>

      {submitError ? (
        <p className="rounded-2xl border border-rose-200 bg-rose-50 px-3 py-2 text-left text-xs font-medium text-rose-700">
          {submitError}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isLoading}
        className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-900 bg-slate-900 px-6 py-3.5 text-xs font-black uppercase tracking-[0.14em] text-white shadow-[0_12px_24px_-16px_rgba(15,23,42,0.5)] transition-all hover:-translate-y-0.5 hover:bg-slate-800 disabled:pointer-events-none disabled:opacity-60"
      >
        {isLoading ? "Sending…" : "Send message"}
        {!isLoading ? <ArrowRight className="h-4 w-4" aria-hidden /> : null}
      </button>
    </form>
  );
}
