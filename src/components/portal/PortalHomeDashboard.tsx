"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Award, BookOpen, Wrench } from "lucide-react";
import { fredokaHeadline, jakartaSans } from "@/app/fonts";
import { PortalMessageTeam } from "@/components/portal/PortalMessageTeam";
import type { ToolkitDailyTip } from "@/lib/portal/toolkit-maintenance";

const modules = [
  {
    href: "/portal/toolkit",
    label: "AI Toolkit",
    blurb: "Tools and workflows we maintain for school, updated by the college team.",
    icon: Wrench,
    tone: "text-sky-600 bg-sky-50",
  },
  {
    href: "/portal/resources",
    label: "Resources",
    blurb: "High school advice and shortlists curated alongside the toolkit.",
    icon: BookOpen,
    tone: "text-emerald-700 bg-emerald-50",
  },
  {
    href: "/portal/certifications",
    label: "Certifications",
    blurb: "Organization-issued AI modules you can attach to applications.",
    icon: Award,
    tone: "text-amber-700 bg-amber-50",
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
      <section className="relative overflow-hidden rounded-[2rem] border-2 border-slate-800 bg-slate-900 px-6 py-8 text-white sm:rounded-[2.5rem] sm:px-8 sm:py-10">
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-sky-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 left-8 h-48 w-48 rounded-full bg-emerald-400/15 blur-3xl" />
        <div className="relative z-10">
          <p className={`text-[10px] font-black uppercase tracking-[0.22em] text-sky-200 ${jakartaSans.className}`}>
            Member portal
          </p>
          <h1 className={`mt-2 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl ${fredokaHeadline.className}`}>
            Welcome back, {displayName}
          </h1>
          <p className={`mt-3 max-w-2xl text-sm font-medium leading-relaxed text-slate-300 sm:text-base ${jakartaSans.className}`}>
            AI for school, taught the right way, plus high school resources from college students. Your membership keeps
            the toolkit current.
          </p>
        </div>
      </section>

      <section className="overflow-hidden rounded-[2rem] border border-sky-100 bg-gradient-to-br from-sky-50 via-white to-emerald-50/50 p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className={`text-[10px] font-black uppercase tracking-[0.2em] text-sky-600 ${jakartaSans.className}`}>
              Toolkit today · {dateLabel}
            </p>
            <h2 className={`mt-1 text-2xl font-semibold tracking-[-0.02em] text-slate-900 ${fredokaHeadline.className}`}>
              {tip.title}
            </h2>
          </div>
          <span className="rounded-2xl bg-white px-3 py-2 text-[10px] font-black uppercase tracking-[0.12em] text-sky-700 shadow-sm">
            Team maintained
          </span>
        </div>
        <p className={`mt-3 max-w-3xl text-sm font-medium leading-relaxed text-slate-600 sm:text-[0.95rem] ${jakartaSans.className}`}>
          {tip.body}
        </p>
        <Link
          href="/portal/toolkit"
          className={`mt-5 inline-flex items-center gap-2 text-sm font-bold text-sky-700 transition hover:text-sky-900 ${jakartaSans.className}`}
        >
          Open AI Toolkit
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </section>

      <section>
        <p className={`text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ${jakartaSans.className}`}>
          Inside membership
        </p>
        <h2 className={`mt-1 text-2xl font-semibold tracking-[-0.02em] text-slate-900 ${fredokaHeadline.className}`}>
          What you have access to
        </h2>
        <ul className="mt-4 grid gap-4 sm:grid-cols-3">
          {modules.map((mod, i) => {
            const Icon = mod.icon;
            return (
              <motion.li
                key={mod.href}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.06 * i, duration: 0.35 }}
              >
                <Link
                  href={mod.href}
                  className="group flex h-full flex-col rounded-[1.75rem] border-2 border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-sky-300"
                >
                  <span className={`inline-flex h-10 w-10 items-center justify-center rounded-2xl ${mod.tone}`}>
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <p className={`mt-4 text-xl font-semibold text-slate-900 ${fredokaHeadline.className}`}>{mod.label}</p>
                  <p className={`mt-2 flex-1 text-sm font-medium leading-relaxed text-slate-600 ${jakartaSans.className}`}>
                    {mod.blurb}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-[0.12em] text-slate-500 transition group-hover:text-sky-700">
                    Open
                    <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" aria-hidden />
                  </span>
                </Link>
              </motion.li>
            );
          })}
        </ul>
      </section>

      <PortalMessageTeam defaultName={displayName} defaultEmail={email} />
    </div>
  );
}
