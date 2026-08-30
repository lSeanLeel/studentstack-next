"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { fredokaHeadline, jakartaSans } from "@/app/fonts";
import { START_HERE_SCENARIOS } from "@/lib/portal/membership";

const accentRing: Record<(typeof START_HERE_SCENARIOS)[number]["accent"], string> = {
  sky: "border-sky-200 hover:border-sky-300 hover:bg-sky-50/50",
  emerald: "border-emerald-200 hover:border-emerald-300 hover:bg-emerald-50/50",
  amber: "border-amber-200 hover:border-amber-300 hover:bg-amber-50/50",
  violet: "border-violet-200 hover:border-violet-300 hover:bg-violet-50/50",
};

export function PortalStartHere() {
  return (
    <section>
      <p className={`text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ${jakartaSans.className}`}>
        Start here
      </p>
      <p className={`mt-1 text-sm font-medium text-slate-600 ${jakartaSans.className}`}>
        Pick what matches your week — everything links to a workflow or guide.
      </p>
      <ul className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {START_HERE_SCENARIOS.map((scenario) => (
          <li key={scenario.id}>
            <Link
              href={scenario.href}
              className={`group flex h-full items-start justify-between gap-2 rounded-2xl border-2 bg-white p-3.5 transition hover:-translate-y-0.5 ${accentRing[scenario.accent]}`}
            >
              <div className="min-w-0">
                <p className={`font-semibold text-slate-900 ${fredokaHeadline.className}`}>{scenario.label}</p>
                <p className={`mt-0.5 text-xs font-medium text-slate-600 ${jakartaSans.className}`}>{scenario.detail}</p>
              </div>
              <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-slate-400 group-hover:text-sky-600" aria-hidden />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
