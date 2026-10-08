"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowRight,
  BookOpen,
  Users,
  CalendarDays,
  Megaphone,
  Lock,
  RefreshCw,
  type LucideIcon,
} from "lucide-react";
import { jakartaSans, fredokaHeadline, institutionalSerif } from "@/app/fonts";
import { PortalPreviewMock } from "@/components/portal/PortalPreviewMock";
import { PARENT_ORIGIN_TIMELINE, type OriginMilestone } from "@/lib/landing/ai-for-school";

const MILESTONE_ICONS: Record<OriginMilestone["icon"], LucideIcon> = {
  notes: BookOpen,
  masterminds: Users,
  briefings: CalendarDays,
  reach: Megaphone,
  membership: Lock,
  ongoing: RefreshCw,
};

/** Landing-page gated preview of the member portal, with origin milestones. */
export function PortalPreviewSection() {
  return (
    <section
      id="origin-story"
      className="relative overflow-hidden border-t border-slate-200/80 px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
      aria-labelledby="portal-preview-heading"
      style={{
        backgroundImage:
          "radial-gradient(ellipse 70% 45% at 15% 0%, rgba(186,230,253,0.45), transparent 55%), radial-gradient(ellipse 50% 40% at 90% 20%, rgba(167,243,208,0.2), transparent 50%), linear-gradient(180deg, #f8fafc 0%, #ffffff 40%, #f1f5f9 100%)",
      }}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-300/60 to-transparent" aria-hidden />

      <div className="relative mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p
            className={`${jakartaSans.className} text-[11px] font-bold uppercase tracking-[0.24em] text-sky-700/80`}
          >
            How we got here
          </p>
          <h2
            id="portal-preview-heading"
            className={`${fredokaHeadline.className} mt-3 text-[clamp(1.85rem,4vw+0.5rem,2.75rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-slate-900`}
          >
            From free notes to a private membership
          </h2>
          <p
            className={`${institutionalSerif.className} ss-institutional mx-auto mt-4 max-w-xl text-[1.05rem] leading-relaxed text-slate-600 sm:text-[1.15rem]`}
          >
            Parents found the work first. The membership grew from that trust, not from a feature list.
          </p>
        </div>

        <div className="mt-14 grid items-start gap-12 lg:mt-16 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-14">
          <ol className="relative space-y-0">
            {/* Vertical rail */}
            <div
              className="pointer-events-none absolute bottom-8 left-[1.35rem] top-8 w-px bg-gradient-to-b from-sky-300 via-sky-200 to-emerald-300 sm:left-[1.6rem]"
              aria-hidden
            />

            {PARENT_ORIGIN_TIMELINE.map((milestone, i) => {
              const Icon = MILESTONE_ICONS[milestone.icon];
              const isLast = i === PARENT_ORIGIN_TIMELINE.length - 1;

              return (
                <li key={milestone.id} className="relative grid grid-cols-[3.25rem_1fr] gap-x-4 pb-10 last:pb-0 sm:grid-cols-[3.75rem_1fr] sm:gap-x-5 sm:pb-12">
                  <div className="relative z-10 flex justify-center pt-1">
                    <motion.span
                      initial={{ scale: 0.7, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ delay: 0.04 * i, type: "spring", stiffness: 320, damping: 22 }}
                      className={`flex h-11 w-11 items-center justify-center rounded-2xl border shadow-[0_10px_0_0_rgba(15,23,42,0.06)] sm:h-12 sm:w-12 ${
                        isLast
                          ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                          : "border-sky-200 bg-white text-sky-700"
                      }`}
                      aria-hidden
                    >
                      <Icon className="h-5 w-5" strokeWidth={2.25} />
                    </motion.span>
                  </div>

                  <motion.article
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{ delay: 0.05 * i, duration: 0.4 }}
                    className="min-w-0"
                  >
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span
                        className={`${jakartaSans.className} text-[10px] font-black uppercase tracking-[0.16em] text-sky-700/75`}
                      >
                        {milestone.phase}
                      </span>
                      <time
                        dateTime={milestone.dateTime}
                        className={`${jakartaSans.className} text-[11px] font-semibold text-slate-400`}
                      >
                        {milestone.date}
                      </time>
                    </div>

                    <h3
                      className={`${fredokaHeadline.className} mt-1.5 text-[1.15rem] font-semibold leading-snug tracking-[-0.025em] text-slate-900 sm:text-[1.3rem]`}
                    >
                      {milestone.title}
                    </h3>

                    <p
                      className={`${jakartaSans.className} mt-2 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-[0.95rem]`}
                    >
                      {milestone.detail}
                    </p>

                    <p
                      className={`${institutionalSerif.className} ss-institutional mt-3 inline-block border-l-2 border-sky-300/80 pl-3 text-[0.9rem] font-medium leading-snug text-slate-700 sm:text-[0.95rem]`}
                    >
                      {milestone.credential}
                    </p>
                  </motion.article>
                </li>
              );
            })}
          </ol>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.12, duration: 0.5 }}
            className="lg:sticky lg:top-24"
          >
            <p
              className={`${jakartaSans.className} mb-4 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 lg:text-left`}
            >
              Inside the membership
            </p>
            <PortalPreviewMock />
          </motion.div>
        </div>

        <div className="mt-14 flex flex-col items-center gap-3 sm:mt-16 sm:flex-row sm:justify-center">
          <Link
            href="/join"
            className={`inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-6 py-3.5 text-xs font-black uppercase tracking-[0.14em] text-white shadow-[0_12px_0_0_rgba(15,23,42,0.18)] transition hover:-translate-y-0.5 hover:bg-slate-800 ${jakartaSans.className}`}
          >
            Work with us
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
          <Link
            href="/login"
            className={`text-sm font-bold text-sky-700 underline decoration-sky-300 underline-offset-4 hover:text-sky-900 ${jakartaSans.className}`}
          >
            Student login
          </Link>
        </div>
      </div>
    </section>
  );
}
