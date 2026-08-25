"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "motion/react";
import { ArrowRight, Building2, CheckCircle2, GraduationCap } from "lucide-react";
import { fredokaHeadline, jakartaSans } from "@/app/fonts";

type Audience = "student" | "enterprise";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
  organization?: string;
  role?: string;
  grade?: string;
}

export function ContactForm({
  onBusyChange,
  onSubmittedChange,
}: {
  onBusyChange?: (busy: boolean) => void;
  onSubmittedChange?: (submitted: boolean) => void;
}) {
  const [audience, setAudience] = useState<Audience>("student");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    onSubmittedChange?.(isSubmitted);
  }, [isSubmitted, onSubmittedChange]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    defaultValues: { name: "", email: "", message: "", organization: "", role: "", grade: "" },
  });

  const setBusy = (busy: boolean) => {
    setIsLoading(busy);
    onBusyChange?.(busy);
  };

  const switchAudience = (next: Audience) => {
    setAudience(next);
    setSubmitError(null);
    reset({ name: "", email: "", message: "", organization: "", role: "", grade: "" });
  };

  const onSubmit = async (data: ContactFormData) => {
    setBusy(true);
    setSubmitError(null);
    try {
      const audienceLabel = audience === "student" ? "Student / Family" : "Enterprise / School";
      const details = [
        `Audience: ${audienceLabel}`,
        audience === "enterprise" && data.organization?.trim()
          ? `Organization: ${data.organization.trim()}`
          : null,
        audience === "enterprise" && data.role?.trim() ? `Role: ${data.role.trim()}` : null,
        audience === "student" && data.grade?.trim() ? `Grade: ${data.grade.trim()}` : null,
        "",
        data.message.trim(),
      ]
        .filter((line) => line !== null)
        .join("\n");

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name.trim(),
          email: data.email.trim(),
          message: details,
          audience,
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
          setSubmitError(`HTTP ${res.status}: could not send message.`);
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
          {audience === "enterprise"
            ? "Thanks for reaching out. Our partnerships desk will follow up soon."
            : "Thanks for reaching out. A StudentStack teammate will get back to you soon."}
        </p>
      </motion.div>
    );
  }

  const fieldClass =
    "w-full rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-sm font-medium text-slate-900 outline-none transition focus:border-sky-300 focus:bg-white focus:ring-2 focus:ring-sky-200";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`space-y-4 ${jakartaSans.className}`} noValidate>
      <div>
        <p className="mb-2 text-left text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">I am contacting as</p>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => switchAudience("student")}
            className={`flex items-center justify-center gap-2 rounded-2xl border-2 px-3 py-3 text-left transition ${
              audience === "student"
                ? "border-sky-400 bg-sky-50 text-sky-900 shadow-[0_10px_24px_-18px_rgba(14,165,233,0.55)]"
                : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
            }`}
            aria-pressed={audience === "student"}
          >
            <GraduationCap className="h-4 w-4 shrink-0" aria-hidden />
            <span className="text-xs font-black uppercase tracking-[0.08em]">Student / Family</span>
          </button>
          <button
            type="button"
            onClick={() => switchAudience("enterprise")}
            className={`flex items-center justify-center gap-2 rounded-2xl border-2 px-3 py-3 text-left transition ${
              audience === "enterprise"
                ? "border-orange-300 bg-orange-50 text-[#9a3412] shadow-[0_10px_24px_-18px_rgba(255,106,0,0.45)]"
                : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
            }`}
            aria-pressed={audience === "enterprise"}
          >
            <Building2 className="h-4 w-4 shrink-0" aria-hidden />
            <span className="text-xs font-black uppercase tracking-[0.08em]">Enterprise</span>
          </button>
        </div>
        <p className={`mt-2 text-left text-xs font-medium leading-relaxed text-slate-500 ${fredokaHeadline.className}`}>
          {audience === "student"
            ? "Parents and students: questions about the daily, credentials, or your high schooler."
            : "Schools, districts, and organizations: partnerships, workshops, and licensing."}
        </p>
      </div>

      <div>
        <label htmlFor="contact-name" className="mb-1.5 block text-left text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">
          {audience === "enterprise" ? "Your name" : "Name"}
        </label>
        <input
          id="contact-name"
          type="text"
          autoComplete="name"
          className={fieldClass}
          placeholder={audience === "enterprise" ? "Alex Morgan" : "Your name"}
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
          placeholder={audience === "enterprise" ? "you@school.edu" : "you@email.com"}
          {...register("email", {
            required: "Email is required.",
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email." },
          })}
        />
        {errors.email ? <p className="mt-1 text-left text-xs font-medium text-rose-600">{errors.email.message}</p> : null}
      </div>

      {audience === "enterprise" ? (
        <>
          <div>
            <label
              htmlFor="contact-org"
              className="mb-1.5 block text-left text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500"
            >
              Organization
            </label>
            <input
              id="contact-org"
              type="text"
              className={fieldClass}
              placeholder="School, district, or company"
              {...register("organization", { required: "Organization is required." })}
            />
            {errors.organization ? (
              <p className="mt-1 text-left text-xs font-medium text-rose-600">{errors.organization.message}</p>
            ) : null}
          </div>
          <div>
            <label
              htmlFor="contact-role"
              className="mb-1.5 block text-left text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500"
            >
              Role
            </label>
            <input
              id="contact-role"
              type="text"
              className={fieldClass}
              placeholder="Counselor, principal, partnerships…"
              {...register("role", { required: "Role is required." })}
            />
            {errors.role ? <p className="mt-1 text-left text-xs font-medium text-rose-600">{errors.role.message}</p> : null}
          </div>
        </>
      ) : (
        <div>
          <label
            htmlFor="contact-grade"
            className="mb-1.5 block text-left text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500"
          >
            Student grade <span className="normal-case tracking-normal text-slate-400">(optional)</span>
          </label>
          <select id="contact-grade" className={fieldClass} defaultValue="" {...register("grade")}>
            <option value="">Select…</option>
            <option value="9">9th</option>
            <option value="10">10th</option>
            <option value="11">11th</option>
            <option value="12">12th</option>
            <option value="other">Other / parent only</option>
          </select>
        </div>
      )}

      <div>
        <label htmlFor="contact-message" className="mb-1.5 block text-left text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">
          Message
        </label>
        <textarea
          id="contact-message"
          rows={4}
          className={`${fieldClass} min-h-[7.5rem] resize-y`}
          placeholder={
            audience === "enterprise"
              ? "Tell us about your school or organization and what you are exploring…"
              : "Tell us about your student and what you are hoping for…"
          }
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
        {isLoading ? "Sending…" : audience === "enterprise" ? "Contact partnerships" : "Send message"}
        {!isLoading ? <ArrowRight className="h-4 w-4" aria-hidden /> : null}
      </button>
    </form>
  );
}
