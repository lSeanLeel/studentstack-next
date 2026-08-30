"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, BookOpen, Wrench } from "lucide-react";
import { fredokaHeadline, jakartaSans } from "@/app/fonts";
import { PortalMessageTeam } from "@/components/portal/PortalMessageTeam";
import { PortalCredibilityStrip, PortalPathwaysSection } from "@/components/portal/PortalPathwaysSection";
import { PortalBadge } from "@/components/portal/portal-ui";
import { CREDIBILITY_STACK, MEMBER_PATHWAYS } from "@/lib/portal/pathways";
import type { ToolkitDailyTip } from "@/lib/portal/toolkit-maintenance";

const modules = [
  {
    href: "/portal/toolkit",
    label: "AI Toolkit",
    blurb: "Workflows and prompts we update every week — not a PDF from last year.",
    icon: Wrench,
    chip: "Updated weekly",
    tone: "border-sky-200 bg-sky-50 text-sky-700",
  },
  {
    href: "/portal/resources",
    label: "Resources",
    blurb: "Summer programs and deadlines with costs and links upfront.",
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
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border-2 border-slate-800 bg-slate-900 px-4 py-3 text-white shadow-[0_8px_0_0_rgba(15,23,42,0.15)] sm:px-5">
        <div className="min-w-0">
          <p className={`text-[10px] font-black uppercase tracking-[0.14em] text-sky-200 ${jakartaSans.className}`}>
            Hey {displayName}
          </p>
          <p className={`truncate text-sm font-medium text-slate-300 ${jakartaSans.className}`}>
            Active member · AI toolkit and resources unlocked
          </p>
        </div>
        <Link
          href="/portal/toolkit"
          className={`shrink-0 rounded-xl bg-white px-3 py-2 text-[10px] font-black uppercase tracking-[0.1em] text-slate-900 transition hover:-translate-y-0.5 ${jakartaSans.className}`}
        >
          Open toolkit
        </Link>
      </div>

      <section className="rounded-[1.75rem] border-2 border-slate-100 bg-white p-5 shadow-[0_10px_0_0_rgba(15,23,42,0.05)] sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="max-w-2xl">
            <p className={`text-[10px] font-black uppercase tracking-[0.2em] text-sky-600 ${jakartaSans.className}`}>
              Toolkit · {dateLabel}
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

      <section>
        <p className={`text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ${jakartaSans.className}`}>
          Jump to
        </p>
        <ul className="mt-3 grid gap-3 sm:grid-cols-2">
          {modules.map((mod, i) => {
            const Icon = mod.icon;
            return (
              <motion.li
                key={mod.href}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.04 * i }}
              >
                <Link
                  href={mod.href}
                  className="group flex h-full items-start gap-4 rounded-[1.5rem] border-2 border-slate-200 bg-white p-4 shadow-[0_8px_0_0_rgba(15,23,42,0.05)] transition hover:-translate-y-0.5 hover:border-sky-300"
                >
                  <span className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border-2 ${mod.tone}`}>
                    <Icon className="h-4 w-4" aria-hidden />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className={`text-lg font-semibold text-slate-900 ${fredokaHeadline.className}`}>{mod.label}</p>
                      <span
                        className={`rounded-lg border px-1.5 py-0.5 text-[9px] font-black uppercase tracking-[0.08em] ${mod.tone} ${jakartaSans.className}`}
                      >
                        {mod.chip}
                      </span>
                    </div>
                    <p className={`mt-1 text-sm font-medium text-slate-600 ${jakartaSans.className}`}>{mod.blurb}</p>
                  </div>
                  <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-slate-400 group-hover:text-sky-600" aria-hidden />
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
