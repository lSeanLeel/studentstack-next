"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, ArrowLeft, CheckCircle2, Shield } from "lucide-react";
import { fredokaHeadline, jakartaSans, institutionalSerif } from "@/app/fonts";
import { INTENDED_MAJORS, STUDENT_GRADES, type IntendedMajor, type StudentGrade } from "@/lib/portal/certifications";
import {
  JOIN_SESSION_KEY,
  isValidEmail,
  joinApplicationSchema,
  mentorReachOutCopy,
  studentFirstNameOnly,
  type JoinApplication,
} from "@/lib/join/types";

type Step = "application" | "mentor" | "payment";

type ApplicationForm = {
  parentFullName: string;
  parentEmail: string;
  parentPhone: string;
  studentFirstName: string;
  studentLastName: string;
  studentEmail: string;
  studentGrade: StudentGrade | "";
  studentSchool: string;
  intendedMajor: IntendedMajor | "";
  backgroundNote: string;
};

type PaymentForm = {
  password: string;
  confirmPassword: string;
};

const fieldClass =
  "w-full rounded-2xl border-2 border-sky-100 bg-sky-50/50 px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition focus:border-sky-300 focus:bg-white";
const labelClass = "mb-1.5 block text-[10px] font-black uppercase tracking-[0.14em] text-slate-500";
const errorClass = "mt-1 text-xs font-medium text-rose-600";

const EMAIL_RULE = {
  required: "Email is required.",
  pattern: {
    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "Enter a valid email.",
  },
} as const;

function loadApplication(): JoinApplication | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(JOIN_SESSION_KEY);
    if (!raw) return null;
    const parsed = joinApplicationSchema.safeParse(JSON.parse(raw));
    if (!parsed.success) {
      sessionStorage.removeItem(JOIN_SESSION_KEY);
      return null;
    }
    return parsed.data;
  } catch {
    sessionStorage.removeItem(JOIN_SESSION_KEY);
    return null;
  }
}

function saveApplication(app: JoinApplication) {
  sessionStorage.setItem(JOIN_SESSION_KEY, JSON.stringify(app));
}

export function JoinFlow({ initialStep = "application" }: { initialStep?: Step }) {
  const [step, setStep] = useState<Step>("application");
  const [application, setApplication] = useState<JoinApplication | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const stored = loadApplication();
    if (!stored) {
      setStep("application");
      return;
    }
    setApplication(stored);
    if (initialStep === "payment" || initialStep === "mentor") {
      setStep(initialStep);
    }
  }, [initialStep]);

  const appForm = useForm<ApplicationForm>({
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      parentFullName: "",
      parentEmail: "",
      parentPhone: "",
      studentFirstName: "",
      studentLastName: "",
      studentEmail: "",
      studentGrade: "",
      studentSchool: "",
      intendedMajor: "",
      backgroundNote: "",
    },
  });

  const payForm = useForm<PaymentForm>({
    mode: "onBlur",
    defaultValues: { password: "", confirmPassword: "" },
  });

  useEffect(() => {
    if (!application) return;
    appForm.reset({
      parentFullName: application.parentFullName,
      parentEmail: application.parentEmail,
      parentPhone: application.parentPhone || "",
      studentFirstName: application.studentFirstName,
      studentLastName: application.studentLastName || "",
      studentEmail: application.studentEmail,
      studentGrade: application.studentGrade,
      studentSchool: application.studentSchool || "",
      intendedMajor: (application.intendedMajor || "") as IntendedMajor | "",
      backgroundNote: application.backgroundNote || "",
    });
  }, [application, appForm]);

  const mentor = useMemo(
    () => (application ? mentorReachOutCopy(application) : null),
    [application]
  );

  const goToPayment = () => {
    if (!application || !isValidEmail(application.studentEmail)) {
      setError("Enter a valid student email. That email is their portal username.");
      setStep("application");
      return;
    }
    setError(null);
    setStep("payment");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onApplication = appForm.handleSubmit((data) => {
    setError(null);
    const parentEmail = data.parentEmail.trim().toLowerCase();
    const studentEmail = data.studentEmail.trim().toLowerCase();

    if (!isValidEmail(parentEmail)) {
      appForm.setError("parentEmail", { message: "Enter a valid parent email." });
      return;
    }
    if (!isValidEmail(studentEmail)) {
      appForm.setError("studentEmail", { message: "Enter a valid student email. This is their username." });
      return;
    }
    if (parentEmail === studentEmail) {
      setError("Student email (username) must be different from the parent billing email.");
      return;
    }

    const payload: JoinApplication = {
      parentFullName: data.parentFullName.trim(),
      parentEmail,
      parentPhone: data.parentPhone.trim() || undefined,
      studentFirstName: data.studentFirstName.trim(),
      studentLastName: data.studentLastName.trim() || undefined,
      studentEmail,
      studentGrade: data.studentGrade as StudentGrade,
      studentSchool: data.studentSchool.trim() || undefined,
      intendedMajor: (data.intendedMajor || undefined) as IntendedMajor | undefined,
      backgroundNote: data.backgroundNote.trim() || undefined,
    };

    const checked = joinApplicationSchema.safeParse(payload);
    if (!checked.success) {
      setError(checked.error.issues[0]?.message ?? "Check the highlighted fields.");
      return;
    }

    saveApplication(checked.data);
    setApplication(checked.data);
    setStep("mentor");
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  const onPayment = payForm.handleSubmit(async (data) => {
    if (!application) {
      setError("Complete the application first.");
      setStep("application");
      return;
    }
    if (!isValidEmail(application.studentEmail)) {
      setError("Enter a valid student email. That email is their portal username.");
      setStep("application");
      return;
    }
    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/join/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...application, password: data.password }),
      });
      const json = (await res.json().catch(() => ({}))) as { url?: string; error?: string };
      if (!res.ok || !json.url) {
        const msg = json.error ?? `Could not start payment (${res.status}).`;
        setError(msg);
        if (/student email/i.test(msg)) {
          setStep("application");
        }
        return;
      }
      window.location.href = json.url;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Checkout failed.");
    } finally {
      setBusy(false);
    }
  });

  const stepIndex = step === "application" ? 0 : step === "mentor" ? 1 : 2;
  const firstName = application ? studentFirstNameOnly(application) : "";

  return (
    <div className={`${jakartaSans.className}`}>
      <ol className="mb-8 flex items-center justify-center gap-2 sm:gap-3" aria-label="Join steps">
        {(["Application", "Mentor", "Payment"] as const).map((label, i) => {
          const active = i === stepIndex;
          const done = i < stepIndex;
          return (
            <li key={label} className="flex items-center gap-2 sm:gap-3">
              <span
                className={`inline-flex h-7 min-w-7 items-center justify-center rounded-full px-2 text-[10px] font-black uppercase tracking-[0.12em] ${
                  active || done ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-400"
                }`}
                aria-current={active ? "step" : undefined}
              >
                {i + 1}
              </span>
              {active ? (
                <span className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-800">
                  {label}
                </span>
              ) : null}
              {i < 2 ? <span className="h-px w-5 bg-slate-200 sm:w-6" aria-hidden /> : null}
            </li>
          );
        })}
      </ol>

      <AnimatePresence mode="wait">
        {step === "application" ? (
          <motion.form
            key="application"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            onSubmit={onApplication}
            className="space-y-4"
            noValidate
          >
            <div>
              <h1 className={`text-2xl font-semibold tracking-[-0.03em] text-slate-900 sm:text-3xl ${fredokaHeadline.className}`}>
                Join our Community
              </h1>
              <p className={`ss-institutional mt-2 text-sm leading-relaxed text-slate-600 sm:text-base ${institutionalSerif.className}`}>
                Private membership for high schoolers, built by college students. We help your student with modern,
                practical advice for school and what comes next.
              </p>
            </div>

            <div>
              <label className={labelClass} htmlFor="join-parent-name">Parent full name</label>
              <input id="join-parent-name" className={fieldClass} {...appForm.register("parentFullName", { required: "Parent name is required." })} />
              {appForm.formState.errors.parentFullName ? <p className={errorClass}>{appForm.formState.errors.parentFullName.message}</p> : null}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass} htmlFor="join-parent-email">Parent email</label>
                <input
                  id="join-parent-email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  className={fieldClass}
                  placeholder="parent@email.com"
                  {...appForm.register("parentEmail", EMAIL_RULE)}
                />
                {appForm.formState.errors.parentEmail ? <p className={errorClass}>{appForm.formState.errors.parentEmail.message}</p> : null}
              </div>
              <div>
                <label className={labelClass} htmlFor="join-parent-phone">
                  Parent phone <span className="normal-case tracking-normal opacity-70">(optional)</span>
                </label>
                <input id="join-parent-phone" type="tel" className={fieldClass} {...appForm.register("parentPhone")} />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass} htmlFor="join-student-first">Student first name</label>
                <input
                  id="join-student-first"
                  className={fieldClass}
                  placeholder="Jordan"
                  {...appForm.register("studentFirstName", { required: "Student first name is required." })}
                />
                {appForm.formState.errors.studentFirstName ? <p className={errorClass}>{appForm.formState.errors.studentFirstName.message}</p> : null}
              </div>
              <div>
                <label className={labelClass} htmlFor="join-student-last">
                  Student last name <span className="normal-case tracking-normal opacity-70">(optional)</span>
                </label>
                <input id="join-student-last" className={fieldClass} {...appForm.register("studentLastName")} />
              </div>
            </div>

            <div>
              <label className={labelClass} htmlFor="join-student-email">Student email (username)</label>
              <input
                id="join-student-email"
                type="email"
                inputMode="email"
                autoComplete="off"
                className={fieldClass}
                placeholder="student@email.com"
                {...appForm.register("studentEmail", {
                  required: "Student email is required.",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid student email. This is their username.",
                  },
                })}
              />
              <p className="mt-1.5 text-xs font-medium text-slate-500">
                Must be a real email address. This is their StudentStack username.
              </p>
              {appForm.formState.errors.studentEmail ? <p className={errorClass}>{appForm.formState.errors.studentEmail.message}</p> : null}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass} htmlFor="join-grade">Student grade</label>
                <select id="join-grade" className={fieldClass} {...appForm.register("studentGrade", { required: "Select a grade." })}>
                  <option value="">Select grade</option>
                  {STUDENT_GRADES.map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
                {appForm.formState.errors.studentGrade ? <p className={errorClass}>{appForm.formState.errors.studentGrade.message}</p> : null}
              </div>
              <div>
                <label className={labelClass} htmlFor="join-major">
                  Intended major <span className="normal-case tracking-normal opacity-70">(optional)</span>
                </label>
                <select id="join-major" className={fieldClass} {...appForm.register("intendedMajor")}>
                  <option value="">Select major</option>
                  {INTENDED_MAJORS.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className={labelClass} htmlFor="join-school">
                High school <span className="normal-case tracking-normal opacity-70">(optional)</span>
              </label>
              <input id="join-school" className={fieldClass} {...appForm.register("studentSchool")} />
            </div>

            <div>
              <label className={labelClass} htmlFor="join-note">
                Student background <span className="normal-case tracking-normal opacity-70">(optional)</span>
              </label>
              <textarea
                id="join-note"
                rows={3}
                className={`${fieldClass} min-h-[5.5rem] resize-y`}
                placeholder="Courses, extracurriculars, sports, summer programs, research interests…"
                {...appForm.register("backgroundNote")}
              />
            </div>

            {error ? <p className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-medium text-rose-700">{error}</p> : null}

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-6 py-3.5 text-xs font-black uppercase tracking-[0.14em] text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
            >
              Continue
              <ArrowRight className="h-4 w-4" aria-hidden />
            </button>
          </motion.form>
        ) : null}

        {step === "mentor" && application && mentor ? (
          <motion.div
            key="mentor"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-6"
          >
            <div className="rounded-[1.5rem] border border-sky-100 bg-sky-50/60 p-6 sm:p-8">
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-sky-700 shadow-sm">
                <Shield className="h-5 w-5" aria-hidden />
              </div>
              <h1 className={`text-2xl font-semibold tracking-[-0.03em] text-slate-900 sm:text-3xl ${fredokaHeadline.className}`}>
                {mentor.headline}
              </h1>
              <p className={`ss-institutional mt-4 text-[1.05rem] leading-[1.7] text-slate-700 ${institutionalSerif.className}`}>
                {mentor.body}
              </p>
              <p className="mt-4 text-sm font-medium text-slate-500">{mentor.aside}</p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => setStep("application")}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 px-5 py-3 text-xs font-black uppercase tracking-[0.14em] text-slate-700 transition hover:border-sky-200 hover:text-sky-700"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden />
                Back
              </button>
              <button
                type="button"
                onClick={goToPayment}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-slate-900 px-6 py-3.5 text-xs font-black uppercase tracking-[0.14em] text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
              >
                Continue to payment
                <ArrowRight className="h-4 w-4" aria-hidden />
              </button>
            </div>
          </motion.div>
        ) : null}

        {step === "payment" && application ? (
          <motion.form
            key="payment"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            onSubmit={onPayment}
            className="space-y-4"
            noValidate
          >
            <div>
              <h1 className={`text-2xl font-semibold tracking-[-0.03em] text-slate-900 sm:text-3xl ${fredokaHeadline.className}`}>
                Create login and pay
              </h1>
              <p className={`ss-institutional mt-2 text-sm leading-relaxed text-slate-600 ${institutionalSerif.className}`}>
                Set {firstName}&apos;s portal password, then complete secure checkout. After payment, we email login
                details to {application.parentEmail}, and {firstName}&apos;s mentor emails them at{" "}
                {application.studentEmail}.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-600">
              <p><span className="font-bold text-slate-800">Username</span>: {application.studentEmail}</p>
              <p className="mt-1"><span className="font-bold text-slate-800">Billing email</span>: {application.parentEmail}</p>
            </div>

            <div>
              <label className={labelClass} htmlFor="join-password">Create password</label>
              <input
                id="join-password"
                type="password"
                autoComplete="new-password"
                className={fieldClass}
                {...payForm.register("password", {
                  required: "Password is required.",
                  minLength: { value: 8, message: "At least 8 characters." },
                })}
              />
              {payForm.formState.errors.password ? <p className={errorClass}>{payForm.formState.errors.password.message}</p> : null}
            </div>

            <div>
              <label className={labelClass} htmlFor="join-password-confirm">Confirm password</label>
              <input
                id="join-password-confirm"
                type="password"
                autoComplete="new-password"
                className={fieldClass}
                {...payForm.register("confirmPassword", { required: "Confirm your password." })}
              />
              {payForm.formState.errors.confirmPassword ? <p className={errorClass}>{payForm.formState.errors.confirmPassword.message}</p> : null}
            </div>

            {error ? <p className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-medium text-rose-700">{error}</p> : null}

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => setStep("mentor")}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 px-5 py-3 text-xs font-black uppercase tracking-[0.14em] text-slate-700 transition hover:border-sky-200 hover:text-sky-700"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden />
                Back
              </button>
              <button
                type="submit"
                disabled={busy}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-slate-900 px-6 py-3.5 text-xs font-black uppercase tracking-[0.14em] text-white transition hover:-translate-y-0.5 hover:bg-slate-800 disabled:opacity-60"
              >
                {busy ? "Starting checkout…" : "Continue to secure checkout"}
                {!busy ? <ArrowRight className="h-4 w-4" aria-hidden /> : null}
              </button>
            </div>
          </motion.form>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export function JoinSuccessPanel({
  studentName,
  parentEmail,
}: {
  studentName?: string;
  parentEmail?: string;
}) {
  const first = studentName?.trim().split(/\s+/)[0];
  return (
    <div className={`text-center ${jakartaSans.className}`}>
      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-[1.25rem] bg-emerald-50 text-emerald-600">
        <CheckCircle2 className="h-8 w-8" aria-hidden />
      </div>
      <p className="text-[10px] font-black uppercase tracking-[0.22em] text-emerald-600">Payment confirmed</p>
      <h1 className={`mt-2 text-2xl font-semibold tracking-[-0.03em] text-slate-900 sm:text-3xl ${fredokaHeadline.className}`}>
        {first ? `${first} is in` : "Welcome to the community"}
      </h1>
      <p className={`ss-institutional mx-auto mt-4 max-w-md text-sm leading-relaxed text-slate-600 sm:text-base ${institutionalSerif.className}`}>
        Portal access is active. {first ? `${first}'s` : "Your student's"} matched mentor will email them next.
        {parentEmail ? (
          <>
            {" "}
            Watch <span className="font-semibold text-slate-800">{parentEmail}</span> for the welcome email with login
            details.
          </>
        ) : (
          <> Watch the parent email on file for the welcome email with login details.</>
        )}
      </p>
    </div>
  );
}
