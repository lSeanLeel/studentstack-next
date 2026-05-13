import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "motion/react";
import { CheckCircle2, ArrowRight } from "lucide-react";

interface SignupFormData {
  studentName: string;
  studentEmail: string;
  studentGrade: string;
  parentName: string;
  parentEmail: string;
}

export function SignupForm({
  compact = false,
  variant = "default",
  showDescription = true,
  integrated = false,
}: {
  compact?: boolean;
  variant?: "default" | "minimal";
  showDescription?: boolean;
  /** Renders without outer card / max-width so a parent shell can wrap the form. */
  integrated?: boolean;
}) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>();

  const onSubmit = async (data: SignupFormData) => {
    setIsLoading(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          studentName: data.studentName,
          studentEmail: data.studentEmail || "",
          studentGrade: data.studentGrade || "",
          parentName: data.parentName || "",
          parentEmail: data.parentEmail || "",
        }),
      });
      const json = (await res.json().catch(() => ({}))) as { error?: string; hint?: string };
      if (!res.ok) {
        setSubmitError(json.error || "Something went wrong. Try again in a moment.");
        return;
      }
      setIsSubmitted(true);
    } catch {
      setSubmitError("Network error. Check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className={
          integrated
            ? "relative rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50/80 to-white px-6 py-10 text-center sm:px-8"
            : `relative ${variant === "minimal" ? "bg-transparent" : "bg-white shadow-2xl border border-slate-100"} rounded-[2.5rem] ${compact ? "p-6" : "p-10"} text-center`
        }
      >
        <div className="h-16 w-16 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="text-emerald-500 h-8 w-8" />
        </div>
        <h3 className="text-2xl font-black text-slate-900 mb-2">You&apos;re on the list!</h3>
        <p className="text-slate-500 font-medium mb-6">Watch your inbox on Sundays for your StudentStack email.</p>
        <div className="flex items-center justify-center gap-2 text-[10px] font-black text-emerald-600 uppercase tracking-widest">
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
            className={`${compact ? "text-sm" : "text-base"} mx-auto max-w-sm px-4 font-medium leading-relaxed text-slate-500`}
          >
            Keep up with the latest AI launches, tools, and practical tips students can use for school.
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
            <div className="p-3 rounded-2xl bg-red-50 text-red-600 text-xs font-bold text-center border border-red-100">
              {submitError}
            </div>
          )}
          <div className="grid grid-cols-1 gap-4">
            <div className="relative">
              <input
                {...register("studentName", { required: "Student Name is required" })}
                placeholder="Student Name *"
                className={`w-full h-14 bg-slate-50 border-2 ${errors.studentName ? "border-red-100" : "border-transparent"} focus:border-sky-500/20 focus:bg-white rounded-2xl px-6 text-sm font-bold text-slate-900 transition-all outline-none placeholder:text-slate-400`}
              />
            </div>

            <div className="relative">
              <input
                {...register("studentEmail", {
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                placeholder="Student Email"
                className={`w-full h-14 bg-slate-50 border-2 ${errors.studentEmail ? "border-red-100" : "border-transparent"} focus:border-sky-500/20 focus:bg-white rounded-2xl px-6 text-sm font-bold text-slate-900 transition-all outline-none placeholder:text-slate-400`}
              />
            </div>

            <div className="relative">
              <select
                {...register("studentGrade")}
                className={`w-full h-14 bg-slate-50 border-2 ${errors.studentGrade ? "border-red-100" : "border-transparent"} focus:border-sky-500/20 focus:bg-white rounded-2xl px-6 text-sm font-bold text-slate-900 transition-all outline-none appearance-none`}
                defaultValue=""
              >
                <option value="" disabled className="text-slate-400">
                  Student Grade
                </option>
                <option value="8th">8th</option>
                <option value="9th">9th</option>
                <option value="10th">10th</option>
                <option value="11th">11th</option>
                <option value="12th">12th</option>
                <option value="Graduate/College">Graduate/College</option>
              </select>
              <div className="absolute inset-y-0 right-6 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <div className="relative">
              <input
                {...register("parentName")}
                placeholder="Parent Name"
                className={`w-full h-14 bg-slate-50 border-2 ${errors.parentName ? "border-red-100" : "border-transparent"} focus:border-sky-500/20 focus:bg-white rounded-2xl px-6 text-sm font-bold text-slate-900 transition-all outline-none placeholder:text-slate-400`}
              />
            </div>

            <div className="relative">
              <input
                {...register("parentEmail", {
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                placeholder="Parent Email"
                className={`w-full h-14 bg-slate-50 border-2 ${errors.parentEmail ? "border-red-100" : "border-transparent"} focus:border-sky-500/20 focus:bg-white rounded-2xl px-6 text-sm font-bold text-slate-900 transition-all outline-none placeholder:text-slate-400`}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-16 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 shadow-[0_6px_0_0_#1e293b] hover:bg-slate-800 active:translate-y-1 active:shadow-none transition-all disabled:opacity-50 hover:-translate-y-0.5"
          >
            {isLoading ? (
              <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Join the Stack
                <ArrowRight size={18} />
              </>
            )}
          </button>

          <p className="text-[10px] text-center font-bold text-slate-400 uppercase tracking-widest">
            100% free weekly email • No spam, ever.
          </p>
        </form>
      </div>
    </div>
  );
}
