"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, BookOpen, Wrench } from "lucide-react";
import { fredokaHeadline, jakartaSans } from "@/app/fonts";
import { PortalMessageTeam } from "@/components/portal/PortalMessageTeam";
import { PortalCredibilityStrip, PortalPathwaysSection } from "@/components/portal/PortalPathwaysSection";
import { PortalBadge, PortalPanel } from "@/components/portal/portal-ui";
import { CREDIBILITY_STACK, MEMBER_PATHWAYS } from "@/lib/portal/pathways";
import type { ToolkitDailyTip } from "@/lib/portal/toolkit-maintenance";

const modules = [
  {
    href: "/portal/toolkit",
    label: "AI Toolkit",
    blurb: "Daily workflows we maintain for school. Updated by the college team, not a static PDF.",
    icon: Wrench,
    chip: "Updated daily",
    tone: "border-sky-200 bg-sky-50 text-sky-700",
  },
  {
    href: "/portal/resources",
    label: "Resources",
    blurb: "High school advice, summer shortlists, and intel from students ahead of you.",
    icon: BookOpen,
    chip: "Member-only",
    tone: "border-emerald-200 bg-emerald-50 text-emerald-800",
  },
] as const;

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
    <div className="space-y-10">
      <PortalPanel dark>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <span className={`inline-flex rounded-xl border border-white/20 bg-white/10 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-sky-100 ${jakartaSans.className}`}>
              Member access
            </span>
            <h1 className={`mt-3 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl ${fredokaHeadline.className}`}>
              Hey {displayName}
            </h1>
            <p className={`mt-3 max-w-xl text-sm font-medium leading-relaxed text-slate-300 sm:text-base ${jakartaSans.className}`}>
              Your membership unlocks our AI toolkit, resources, and pathways. Built and maintained by college
              students who still sit in the classrooms that matter.
            </p>
          </div>
          <div className="rounded-2xl bg-white/10 px-4 py-3 ring-1 ring-white/15">
            <p className={`text-[10px] font-black uppercase tracking-[0.14em] text-sky-200 ${jakartaSans.className}`}>
              Status
            </p>
            <p className={`mt-1 text-lg font-semibold text-white ${fredokaHeadline.className}`}>Active member</p>
          </div>
        </div>
      </PortalPanel>

      <PortalPanel>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="max-w-2xl">
            <p className={`text-[10px] font-black uppercase tracking-[0.2em] text-sky-600 ${jakartaSans.className}`}>
              Toolkit · {dateLabel}
            </p>
            <h2 className={`mt-1 text-2xl font-semibold tracking-[-0.02em] text-slate-900 ${fredokaHeadline.className}`}>
              {tip.title}
            </h2>
            <p className={`mt-3 text-sm font-medium leading-relaxed text-slate-600 ${jakartaSans.className}`}>
              {tip.body}
            </p>
          </div>
          <PortalBadge>Team maintained</PortalBadge>
        </div>
        <Link
          href="/portal/toolkit"
          className={`mt-5 inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-[11px] font-black uppercase tracking-[0.12em] text-white transition hover:-translate-y-0.5 hover:bg-slate-800 ${jakartaSans.className}`}
        >
          Open AI Toolkit
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </PortalPanel>

      <section>
        <p className={`text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ${jakartaSans.className}`}>
          Membership includes
        </p>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2">
          {modules.map((mod, i) => {
            const Icon = mod.icon;
            return (
              <motion.li
                key={mod.href}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i }}
              >
                <Link
                  href={mod.href}
                  className="group flex h-full flex-col rounded-[1.75rem] border-2 border-slate-200 bg-white p-6 shadow-[0_12px_0_0_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:border-sky-300"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl border-2 ${mod.tone}`}>
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <span
                      className={`rounded-xl border px-2 py-1 text-[10px] font-black uppercase tracking-[0.1em] ${mod.tone} ${jakartaSans.className}`}
                    >
                      {mod.chip}
                    </span>
                  </div>
                  <p className={`mt-4 text-2xl font-semibold text-slate-900 ${fredokaHeadline.className}`}>{mod.label}</p>
                  <p className={`mt-2 flex-1 text-sm font-medium leading-relaxed text-slate-600 ${jakartaSans.className}`}>
                    {mod.blurb}
                  </p>
                  <span className={`mt-4 inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-[0.12em] text-slate-500 group-hover:text-sky-700 ${jakartaSans.className}`}>
                    Open
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                  </span>
                </Link>
              </motion.li>
            );
          })}
        </ul>
      </section>

      <PortalPathwaysSection pathways={MEMBER_PATHWAYS} />

      <PortalCredibilityStrip partners={CREDIBILITY_STACK} />

      <PortalMessageTeam defaultName={displayName} defaultEmail={email} />
    </div>
  );
}
