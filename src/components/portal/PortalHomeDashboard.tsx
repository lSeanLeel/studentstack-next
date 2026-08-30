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
import {
  PortalBadge,
  PortalCard,
  PortalEyebrow,
  PortalPrimaryButton,
  portalCard,
} from "@/components/portal/portal-ui";
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
      <section className={`${portalCard} flex flex-wrap items-center justify-between gap-4 p-5 sm:p-6`}>
        <div className="min-w-0">
          <PortalEyebrow>Welcome back</PortalEyebrow>
          <h1 className={`mt-1 text-2xl font-semibold tracking-[-0.03em] text-slate-900 sm:text-3xl ${fredokaHeadline.className}`}>
            Hey, {displayName}
          </h1>
          <p className={`mt-1 text-sm font-medium text-slate-500 ${jakartaSans.className}`}>
            AI literacy for school · self-paced membership
          </p>
        </div>
        <PortalPrimaryButton href="/portal/toolkit">Open toolkit</PortalPrimaryButton>
      </section>

      <PortalHowItWorks />

      <PortalStartHere />

      <PortalCard>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="max-w-2xl">
            <PortalEyebrow>This week in the toolkit · {dateLabel}</PortalEyebrow>
            <h2 className={`mt-1 text-xl font-semibold tracking-[-0.02em] text-slate-900 sm:text-2xl ${fredokaHeadline.className}`}>
              {tip.title}
            </h2>
            <p className={`mt-2 text-sm font-medium leading-relaxed text-slate-500 ${jakartaSans.className}`}>
              {tip.body}
            </p>
          </div>
          <PortalBadge accent="emerald">Team maintained</PortalBadge>
        </div>
        <Link
          href="/portal/toolkit"
          className={`mt-4 inline-flex items-center gap-2 text-sm font-semibold text-sky-600 hover:text-sky-700 ${jakartaSans.className}`}
        >
          Open AI Toolkit
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </PortalCard>

      <PortalWhatsIncluded />

      <PortalGuidesPreview compact />

      <PortalMessageTeam defaultName={displayName} defaultEmail={email} />
    </div>
  );
}
