"use client";

import { useActionState, useEffect } from "react";
import { Loader2, Lock, Sparkles, X } from "lucide-react";
import {
  initialWaitlistState,
  joinWaitlistAction,
  type WaitlistFormState,
} from "@/app/actions/waitlist";

type WaitlistModalProps = {
  open: boolean;
  onClose: () => void;
};

export function WaitlistModal({ open, onClose }: WaitlistModalProps) {
  const [state, formAction, pending] = useActionState<WaitlistFormState, FormData>(
    joinWaitlistAction,
    initialWaitlistState
  );

  useEffect(() => {
    if (state.success) {
      const timer = setTimeout(onClose, 1600);
      return () => clearTimeout(timer);
    }
  }, [onClose, state.success]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/45 backdrop-blur-sm"
        aria-label="Close waitlist modal"
      />
      <div className="relative w-full max-w-xl card-pop p-8 sm:p-10">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full bg-white p-2 text-slate-500 shadow-lg transition hover:scale-105 hover:text-slate-900"
          aria-label="Close modal"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="mb-7">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-violet-100 px-4 py-2 text-xs font-black uppercase tracking-widest text-violet-700">
            <Lock className="h-4 w-4" />
            Cohort Full
          </div>
          <h3 className="text-2xl font-black text-slate-900 sm:text-3xl">
            Cohort Full. We strictly limit our free cohorts to ensure quality. Enter your info to join
            the waitlist.
          </h3>
        </div>

        <form action={formAction} className="space-y-4">
          <label className="block">
            <span className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-500">
              Parent Email
            </span>
            <input
              name="email"
              type="email"
              required
              placeholder="parent@email.com"
              className="w-full rounded-2xl border-2 border-sky-100 bg-sky-50 px-4 py-3 font-bold outline-none transition focus:border-sky-300"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-500">
              Student Grade Level
            </span>
            <select
              name="gradeLevel"
              defaultValue=""
              required
              className="w-full rounded-2xl border-2 border-violet-100 bg-violet-50 px-4 py-3 font-bold outline-none transition focus:border-violet-300"
            >
              <option value="" disabled>
                Select grade
              </option>
              <option value="9">9th Grade</option>
              <option value="10">10th Grade</option>
              <option value="11">11th Grade</option>
              <option value="12">12th Grade</option>
              <option value="other">Other</option>
            </select>
          </label>

          <label className="block">
            <span className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-500">
              Zip Code
            </span>
            <input
              name="zipCode"
              required
              placeholder="90210"
              className="w-full rounded-2xl border-2 border-cyan-100 bg-cyan-50 px-4 py-3 font-bold outline-none transition focus:border-cyan-300"
            />
          </label>

          {state.message ? (
            <p
              className={`rounded-2xl px-4 py-3 text-sm font-bold ${
                state.success ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
              }`}
            >
              {state.message}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={pending}
            className="button-bubble inline-flex w-full items-center justify-center gap-2 bg-slate-900 px-6 py-3 text-sm uppercase tracking-widest text-white shadow-[0_8px_0_0_#0f172a] hover:shadow-[0_10px_0_0_#0f172a] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            Join Waitlist
          </button>
        </form>
      </div>
    </div>
  );
}
