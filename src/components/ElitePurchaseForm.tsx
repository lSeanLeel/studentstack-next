"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ArrowRight } from "lucide-react";
import { jakartaSans } from "@/app/fonts";

type FormData = {
  parentEmail: string;
  studentName: string;
  studentEmail: string;
};

export function ElitePurchaseForm() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: { parentEmail: "", studentName: "", studentEmail: "" },
  });

  const onSubmit = async (data: FormData) => {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !json.url) {
        setError(json.error || "Checkout is not available yet.");
        return;
      }
      window.location.href = json.url;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Checkout failed.");
    } finally {
      setBusy(false);
    }
  };

  const fieldClass =
    "w-full rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-sm font-medium text-slate-900 outline-none focus:border-sky-300 focus:bg-white focus:ring-2 focus:ring-sky-200";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`space-y-4 ${jakartaSans.className}`} noValidate>
      <div>
        <label htmlFor="elite-parent-email" className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">
          Parent email (billing)
        </label>
        <input
          id="elite-parent-email"
          type="email"
          autoComplete="email"
          className={fieldClass}
          placeholder="parent@email.com"
          {...register("parentEmail", { required: "Parent email is required." })}
        />
        {errors.parentEmail ? (
          <p className="mt-1 text-xs font-medium text-rose-600">{errors.parentEmail.message}</p>
        ) : null}
      </div>

      <div>
        <label htmlFor="elite-student-name" className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">
          Student name
        </label>
        <input
          id="elite-student-name"
          type="text"
          autoComplete="name"
          className={fieldClass}
          placeholder="Your student’s name"
          {...register("studentName", { required: "Student name is required." })}
        />
        {errors.studentName ? (
          <p className="mt-1 text-xs font-medium text-rose-600">{errors.studentName.message}</p>
        ) : null}
      </div>

      <div>
        <label htmlFor="elite-student-email" className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">
          Student email (portal login)
        </label>
        <input
          id="elite-student-email"
          type="email"
          autoComplete="off"
          className={fieldClass}
          placeholder="student@email.com"
          {...register("studentEmail", { required: "Student email is required." })}
        />
        <p className="mt-1.5 text-xs font-medium text-slate-500">
          This is the login your student will use for the Elite portal.
        </p>
        {errors.studentEmail ? (
          <p className="mt-1 text-xs font-medium text-rose-600">{errors.studentEmail.message}</p>
        ) : null}
      </div>

      {error ? (
        <p className="rounded-2xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-medium text-rose-700">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={busy}
        className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-6 py-3.5 text-xs font-black uppercase tracking-[0.14em] text-white transition hover:bg-slate-800 disabled:opacity-60"
      >
        {busy ? "Starting checkout…" : "Continue to checkout"}
        {!busy ? <ArrowRight className="h-4 w-4" aria-hidden /> : null}
      </button>
    </form>
  );
}
