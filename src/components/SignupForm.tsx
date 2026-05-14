import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "motion/react";
import { CheckCircle2, ArrowRight, Sparkles } from "lucide-react";

const TOP_FOCUS_OPTIONS = [
  "Boosting GPA",
  "Finding Research/Internships",
  "Writing",
  "Applying to College",
] as const;

interface SignupFormData {
  studentName: string;
  studentEmail: string;
  parentEmail: string;
  studentGrade: string;
  topFocus: (typeof TOP_FOCUS_OPTIONS)[number] | "";
}

function messageFromSubscribeResponse(json: unknown, status: number): string {
  if (!json || typeof json !== "object") {
    return `Request failed (HTTP ${status}).`;
  }
  const o = json as Record<string, unknown>;
  const parts: string[] = [];
  for (const key of ["error", "message", "details", "hint", "code"] as const) {
    const v = o[key];
    if (typeof v === "string" && v.trim()) parts.push(v.trim());
  }
  const dedup = [...new Set(parts)];
  if (dedup.length) return dedup.join(" · ");
  return `Request failed (HTTP ${status}).`;
}

export function SignupForm({
  compact = false,
  variant = "default",
  showDescription = true,
  /** Renders without outer card / max-width so a parent shell can wrap the form. */
  integrated = false,
  onBusyChange,
}: {
  compact?: boolean;
  variant?: "default" | "minimal";
  showDescription?: boolean;
  integrated?: boolean;
  onBusyChange?: (busy: boolean) => void;
}) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    defaultValues: {
      studentName: "",
      studentEmail: "",
      parentEmail: "",
      studentGrade: "",
      topFocus: "",
    },
  });

  const setBusy = (busy: boolean) => {
    setIsLoading(busy);
    onBusyChange?.(busy);
  };

  const onSubmit = async (data: SignupFormData) => {
    setBusy(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentName: data.studentName,
          studentEmail: data.studentEmail || "",
          parentEmail: data.parentEmail?.trim() ?? "",
          studentGrade: data.studentGrade || "",
          topFocus: data.topFocus,
        }),
      });
      const raw = await res.text();
      let json: unknown = {};
      if (raw) {
        try {
          json = JSON.parse(raw) as unknown;
        } catch {
          json = { error: raw };
        }
      }
      if (!res.ok) {
        const msg = messageFromSubscribeResponse(json, res.status);
        setSubmitError(msg);
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
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 420, damping: 26 }}
        className={
          integrated
            ? "relative rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-50 via-white to-sky-50 px-6 py-12 text-center sm:px-8"
            : `relative ${variant === "minimal" ? "bg-transparent" : "bg-white shadow-2xl border border-slate-100"} rounded-[2.5rem] ${compact ? "p-6" : "p-10"} text-center`
        }
      >
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-100 text-violet-600">
          <Sparkles className="h-8 w-8" aria-hidden />
        </div>
        <h3 className="mb-2 text-3xl font-black tracking-tight text-slate-900">Welcome to the club!</h3>
        <p className="mx-auto mb-2 max-w-sm text-base font-semibold text-slate-600">
          You&apos;re in — watch your inbox for the next StudentStack Sunday send.
        </p>
        <div className="mt-6 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-violet-600">
          <CheckCircle2 className="h-4 w-4" aria-hidden />
          Free weekly AI tips for students
        </div>
      </motion.div>
    );
  }

  return (
    <div
      className={
        integrated
          ? "relative w-full"
          : `relative group ${compact ? "" : "mx-auto w-full max-w-md md:max-w-lg lg:max-w-xl"}`
      }
    >
      {variant === "default" && !compact && !integrated && (
        <div className="absolute -inset-4 rounded-[3rem] bg-gradient-to-r from-sky-500/10 via-blue-500/5 to-sky-500/10 opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-100" />
      )}

      {variant === "default" && showDescription && !integrated && (
        <div className={`text-center ${compact ? "mb-4" : "mb-8"}`}>
          <p
            className={`${compact ? "text-sm font-semibold text-slate-600" : "text-2xl font-black tracking-tight text-slate-900"} mx-auto max-w-md px-4 leading-tight`}
          >
            Sign Up
          </p>
        </div>
      )}

      <div
        className={
          integrated
            ? "relative"
            : `relative ${variant === "minimal" ? "bg-transparent" : "rounded-[2.5rem] border border-slate-100 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.04)]"} ${compact ? "p-6" : "p-8"} backdrop-blur-sm`
        }
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {submitError && (
            <div className="rounded-2xl border border-red-100 bg-red-50 p-3 text-center text-xs font-bold text-red-600">
              {submitError}
            </div>
          )}
          <div className="grid grid-cols-1 gap-4">
            <div className="relative">
              <input
                {...register("studentName", { required: "Student name is required" })}
                placeholder="Student Name *"
                autoComplete="name"
                className={`h-14 w-full rounded-2xl border-2 bg-slate-50 px-6 text-sm font-bold text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:bg-white ${
                  errors.studentName ? "border-red-100" : "border-transparent focus:border-sky-500/20"
                }`}
              />
              {errors.studentName && (
                <p className="mt-1 px-1 text-xs font-bold text-red-500">{errors.studentName.message}</p>
              )}
            </div>

            <div className="relative">
              <input
                {...register("studentEmail", {
                  required: "Student email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="Student Email *"
                className={`h-14 w-full rounded-2xl border-2 bg-slate-50 px-6 text-sm font-bold text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:bg-white ${
                  errors.studentEmail ? "border-red-100" : "border-transparent focus:border-sky-500/20"
                }`}
              />
              {errors.studentEmail && (
                <p className="mt-1 px-1 text-xs font-bold text-red-500">{errors.studentEmail.message}</p>
              )}
            </div>

            <div className="relative">
              <input
                {...register("parentEmail", {
                  required: "Parent email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="Parent Email *"
                className={`h-14 w-full rounded-2xl border-2 bg-slate-50 px-6 text-sm font-bold text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:bg-white ${
                  errors.parentEmail ? "border-red-100" : "border-transparent focus:border-sky-500/20"
                }`}
              />
              {errors.parentEmail && (
                <p className="mt-1 px-1 text-xs font-bold text-red-500">{errors.parentEmail.message}</p>
              )}
            </div>

            <div className="relative">
              <select
                {...register("studentGrade", { required: "Select a grade" })}
                className={`h-14 w-full appearance-none rounded-2xl border-2 bg-slate-50 px-6 text-sm font-bold text-slate-900 outline-none transition-all focus:bg-white ${
                  errors.studentGrade ? "border-red-100" : "border-transparent focus:border-sky-500/20"
                }`}
                defaultValue=""
              >
                <option value="" disabled className="text-slate-400">
                  Grade *
                </option>
                <option value="8th">8th</option>
                <option value="9th">9th</option>
                <option value="10th">10th</option>
                <option value="11th">11th</option>
                <option value="12th">12th</option>
                <option value="Graduate / College">Graduate / College</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-6 flex items-center">
                <svg className="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              {errors.studentGrade && (
                <p className="mt-1 px-1 text-xs font-bold text-red-500">{errors.studentGrade.message}</p>
              )}
            </div>

            <div className="relative">
              <select
                {...register("topFocus", { required: "Choose your top focus" })}
                className={`h-14 w-full appearance-none rounded-2xl border-2 bg-slate-50 px-6 text-sm font-bold text-slate-900 outline-none transition-all focus:bg-white ${
                  errors.topFocus ? "border-red-100" : "border-transparent focus:border-sky-500/20"
                }`}
                defaultValue=""
              >
                <option value="" disabled className="text-slate-400">
                  Top Focus *
                </option>
                {TOP_FOCUS_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-6 flex items-center">
                <svg className="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              {errors.topFocus && (
                <p className="mt-1 px-1 text-xs font-bold text-red-500">{errors.topFocus.message}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="flex h-16 w-full items-center justify-center gap-3 rounded-2xl bg-slate-900 text-sm font-black uppercase tracking-widest text-white shadow-[0_6px_0_0_#1e293b] transition-all hover:-translate-y-0.5 hover:bg-slate-800 active:translate-y-1 active:shadow-none disabled:opacity-50"
          >
            {isLoading ? (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            ) : (
              <>
                Sign Up
                <ArrowRight size={18} aria-hidden />
              </>
            )}
          </button>

          <p className="text-center text-[10px] font-bold uppercase tracking-widest text-slate-400">
            100% free weekly email • No spam, ever.
          </p>
        </form>
      </div>
    </div>
  );
}
