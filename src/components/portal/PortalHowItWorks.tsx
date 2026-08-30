"use client";

import React from "react";
import { fredokaHeadline, jakartaSans } from "@/app/fonts";
import { PortalEyebrow, portalCard } from "@/components/portal/portal-ui";
import { HOW_MEMBERSHIP_WORKS } from "@/lib/portal/membership";

export function PortalHowItWorks() {
  return (
    <section className={`${portalCard} bg-gradient-to-br from-white via-sky-50/20 to-white p-5 sm:p-6`}>
      <PortalEyebrow>How membership works</PortalEyebrow>
      <p className={`mt-1 max-w-2xl text-sm font-medium text-slate-500 ${jakartaSans.className}`}>
        Self-paced — use what you need the week you need it. No video course to finish.
      </p>
      <ol className="mt-4 grid gap-3 sm:grid-cols-3">
        {HOW_MEMBERSHIP_WORKS.map((step, i) => (
          <li key={step.id} className="rounded-2xl bg-[#f5f5f7]/80 p-4 ring-1 ring-black/[0.04]">
            <span className={`inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-[11px] font-semibold text-white ${jakartaSans.className}`}>
              {i + 1}
            </span>
            <p className={`mt-3 font-semibold text-slate-900 ${fredokaHeadline.className}`}>{step.title}</p>
            <p className={`mt-1 text-sm font-medium leading-relaxed text-slate-500 ${jakartaSans.className}`}>
              {step.detail}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
