"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { fredokaHeadline, jakartaSans } from "@/app/fonts";
import { PortalMessageTeam } from "@/components/portal/PortalMessageTeam";
import { PortalGuidesPreview } from "@/components/portal/PortalGuidesPreview";
import { PortalHowItWorks } from "@/components/portal/PortalHowItWorks";
import { PortalStartHere } from "@/components/portal/PortalStartHere";
import { PortalWhatsIncluded } from "@/components/portal/PortalWhatsIncluded";
import { PortalBadge } from "@/components/portal/portal-ui";
import type { ToolkitDailyTip } from "@/lib/portal/toolkit-maintenance";

export function PortalHomeDashboard({
  displayName,
  email,
  dateLabel,
  tip,
}: {
  displayName: string;
  email: string;
  dateLabel: string;
  tip: ToolkitDailyTip;
}) {
  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border-2 border-slate-800 bg-slate-900 px-4 py-3 text-white shadow-[0_8px_0_0_rgba(15,23,42,0.15)] sm:px-5">
        <div className="min-w-0">
          <p className={`text-[10px] font-black uppercase tracking-[0.14em] text-sky-200 ${jakartaSans.className}`}>
            Hey {displayName}
          </p>
          <p className={`truncate text-sm font-medium text-slate-300 ${jakartaSans.className}`}>
            AI literacy for school · self-paced membership
          </p>
        </div>
        <Link
          href="/portal/toolkit"
          className={`shrink-0 rounded-xl bg-white px-3 py-2 text-[10px] font-black uppercase tracking-[0.1em] text-slate-900 transition hover:-translate-y-0.5 ${jakartaSans.className}`}
        >
          Open toolkit
        </Link>
      </div>

      <PortalHowItWorks />

      <PortalStartHere />

      <section className="rounded-[1.75rem] border-2 border-slate-100 bg-white p-5 shadow-[0_10px_0_0_rgba(15,23,42,0.05)] sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="max-w-2xl">
            <p className={`text-[10px] font-black uppercase tracking-[0.2em] text-sky-600 ${jakartaSans.className}`}>
              This week in the toolkit · {dateLabel}
            </p>
            <h2 className={`mt-1 text-xl font-semibold tracking-[-0.02em] text-slate-900 sm:text-2xl ${fredokaHeadline.className}`}>
              {tip.title}
            </h2>
            <p className={`mt-2 text-sm font-medium leading-relaxed text-slate-600 ${jakartaSans.className}`}>
              {tip.body}
            </p>
          </div>
          <PortalBadge>Team maintained</PortalBadge>
        </div>
        <Link
          href="/portal/toolkit"
          className={`mt-4 inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-4 py-2.5 text-[10px] font-black uppercase tracking-[0.12em] text-white transition hover:-translate-y-0.5 hover:bg-slate-800 ${jakartaSans.className}`}
        >
          Open AI Toolkit
          <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </Link>
      </section>

      <PortalWhatsIncluded />

      <PortalGuidesPreview compact />

      <PortalMessageTeam defaultName={displayName} defaultEmail={email} />
    </div>
  );
}
