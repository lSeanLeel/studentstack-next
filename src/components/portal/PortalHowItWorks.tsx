"use client";

import React from "react";
import { fredokaHeadline, jakartaSans } from "@/app/fonts";
import { HOW_MEMBERSHIP_WORKS } from "@/lib/portal/membership";

export function PortalHowItWorks() {
  return (
    <section className="rounded-[1.75rem] border-2 border-sky-100 bg-gradient-to-br from-sky-50/80 to-white p-5 sm:p-6">
      <p className={`text-[10px] font-black uppercase tracking-[0.2em] text-sky-600 ${jakartaSans.className}`}>
        How membership works
      </p>
      <p className={`mt-1 max-w-2xl text-sm font-medium text-slate-600 ${jakartaSans.className}`}>
        Self-paced — use what you need the week you need it. No video course to finish.
      </p>
      <ol className="mt-4 grid gap-3 sm:grid-cols-3">
        {HOW_MEMBERSHIP_WORKS.map((step, i) => (
          <li key={step.id} className="rounded-2xl border-2 border-white bg-white/90 p-4 shadow-[0_6px_0_0_rgba(14,165,233,0.08)]">
            <span className={`inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-[11px] font-black text-white ${jakartaSans.className}`}>
              {i + 1}
            </span>
            <p className={`mt-3 font-semibold text-slate-900 ${fredokaHeadline.className}`}>{step.title}</p>
            <p className={`mt-1 text-sm font-medium leading-relaxed text-slate-600 ${jakartaSans.className}`}>
              {step.detail}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
