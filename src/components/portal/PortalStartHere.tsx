"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { fredokaHeadline, jakartaSans } from "@/app/fonts";
import { PortalEyebrow, portalCard, portalCardHover } from "@/components/portal/portal-ui";
import { START_HERE_SCENARIOS } from "@/lib/portal/membership";

const accentRing: Record<(typeof START_HERE_SCENARIOS)[number]["accent"], string> = {
  sky: "hover:ring-sky-200/60",
  emerald: "hover:ring-emerald-200/60",
  amber: "hover:ring-amber-200/60",
  violet: "hover:ring-violet-200/60",
};

export function PortalStartHere() {
  return (
    <section>
      <PortalEyebrow>Start here</PortalEyebrow>
      <p className={`mt-1 text-sm font-medium text-slate-500 ${jakartaSans.className}`}>
        Pick what matches your week — everything links to a workflow or guide.
      </p>
      <ul className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {START_HERE_SCENARIOS.map((scenario) => (
          <li key={scenario.id}>
            <Link
              href={scenario.href}
              className={`group flex h-full items-start justify-between gap-2 ${portalCard} ${portalCardHover} p-4 ring-1 ring-black/[0.04] ${accentRing[scenario.accent]}`}
            >
              <div className="min-w-0">
                <p className={`font-semibold text-slate-900 ${fredokaHeadline.className}`}>{scenario.label}</p>
                <p className={`mt-0.5 text-xs font-medium text-slate-500 ${jakartaSans.className}`}>{scenario.detail}</p>
              </div>
              <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-slate-400 transition group-hover:text-sky-600" aria-hidden />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
