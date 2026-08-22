"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { ArrowRight } from "lucide-react";
import { jakartaSans } from "@/app/fonts";
import { INTENDED_MAJORS, STUDENT_GRADES, type IntendedMajor, type StudentGrade } from "@/lib/portal/certifications";

type FormData = {
  parentFullName: string;
  parentEmail: string;
  parentPhone: string;
  studentFirstName: string;
  studentLastName: string;
  studentGrade: StudentGrade | "";
  studentSchool: string;
  intendedMajor: IntendedMajor | "";
};

export function RegisterForm({ dark = false }: { dark?: boolean }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      parentFullName: "",
      parentEmail: "",
      parentPhone: "",
      studentFirstName: "",
      studentLastName: "",
      studentGrade: "",
      studentSchool: "",
      intendedMajor: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/membership-register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          parentFullName: data.parentFullName.trim(),
          parentEmail: data.parentEmail.trim(),
          parentPhone: data.parentPhone.trim() || undefined,
          studentFirstName: data.studentFirstName.trim(),
          studentLastName: data.studentLastName.trim(),
          studentGrade: data.studentGrade,
          studentSchool: data.studentSchool.trim() || undefined,
          intendedMajor: data.intendedMajor || undefined,
        }),
      });
      const json = (await res.json().catch(() => ({}))) as {
        error?: string;
        studentName?: string;
        parentEmail?: string;
      };
      if (!res.ok) {
        setError(json.error ?? `Could not register (${res.status}).`);
        return;
      }
      const params = new URLSearchParams();
      if (json.studentName) params.set("student", json.studentName);
      if (json.parentEmail) params.set("email", json.parentEmail);
      router.push(`/register/success${params.toString() ? `?${params}` : ""}`);
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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`space-y-4 ${jakartaSans.className}`} noValidate>
      <div>
        <label htmlFor="reg-parent-name" className={labelClass}>
          Parent full name
        </label>
        <input
          id="reg-parent-name"
          type="text"
          className={fieldClass}
          placeholder="Alex Parent"
          {...register("parentFullName", { required: "Parent name is required." })}
        />
        {errors.parentFullName ? <p className={`mt-1 ${errorClass}`}>{errors.parentFullName.message}</p> : null}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="reg-parent-email" className={labelClass}>
            Parent email
          </label>
          <input
            id="reg-parent-email"
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
        <div>
          <label htmlFor="reg-parent-phone" className={labelClass}>
            Parent phone <span className="font-bold normal-case tracking-normal opacity-70">(optional)</span>
          </label>
          <input
            id="reg-parent-phone"
            type="tel"
            className={fieldClass}
            placeholder="(555) 555-5555"
            {...register("parentPhone")}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="reg-student-first" className={labelClass}>
            Student first name
          </label>
          <input
            id="reg-student-first"
            type="text"
            className={fieldClass}
            placeholder="Jordan"
            {...register("studentFirstName", { required: "First name is required." })}
          />
          {errors.studentFirstName ? <p className={`mt-1 ${errorClass}`}>{errors.studentFirstName.message}</p> : null}
        </div>
        <div>
          <label htmlFor="reg-student-last" className={labelClass}>
            Student last name
          </label>
          <input
            id="reg-student-last"
            type="text"
            className={fieldClass}
            placeholder="Lee"
            {...register("studentLastName", { required: "Last name is required." })}
          />
          {errors.studentLastName ? <p className={`mt-1 ${errorClass}`}>{errors.studentLastName.message}</p> : null}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="reg-grade" className={labelClass}>
            Student grade
          </label>
          <select id="reg-grade" className={fieldClass} {...register("studentGrade", { required: "Select grade." })}>
            <option value="">Select grade</option>
            {STUDENT_GRADES.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
          {errors.studentGrade ? <p className={`mt-1 ${errorClass}`}>{errors.studentGrade.message}</p> : null}
        </div>
        <div>
          <label htmlFor="reg-major" className={labelClass}>
            Intended major <span className="font-bold normal-case tracking-normal opacity-70">(optional)</span>
          </label>
          <select id="reg-major" className={fieldClass} {...register("intendedMajor")}>
            <option value="">Select major</option>
            {INTENDED_MAJORS.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="reg-school" className={labelClass}>
          High school <span className="font-bold normal-case tracking-normal opacity-70">(optional)</span>
        </label>
        <input
          id="reg-school"
          type="text"
          className={fieldClass}
          placeholder="School name"
          {...register("studentSchool")}
        />
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
        {busy ? "Joining…" : "Join our Community"}
        {!busy ? <ArrowRight className="h-4 w-4" aria-hidden /> : null}
      </button>
    </form>
  );
}
