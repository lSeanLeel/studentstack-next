"use client";

import React from "react";
import { motion } from "motion/react";
import { Clock, ListChecks, MessagesSquare, RefreshCw } from "lucide-react";
import { jakartaSans, fredokaHeadline } from "@/app/fonts";
import { CHEAT_SHEET_BRAND } from "@/lib/weekly-cheat-sheet-brand";

const { sections } = CHEAT_SHEET_BRAND;

export function WhatsInsideSection() {
  return (
    <section
      id="whats-inside"
      className="relative overflow-hidden border-t border-sky-100/80 bg-white px-4 py-20 sm:px-6 sm:py-28 lg:px-8"
      aria-labelledby="whats-inside-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(14,165,233,0.08),transparent)]" />

      <div className="relative mx-auto w-full max-w-3xl text-center lg:max-w-4xl">
        <div
          className={`inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 ${jakartaSans.className}`}
        >
          <Clock className="h-3.5 w-3.5 text-sky-600" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600">
            {CHEAT_SHEET_BRAND.tagline}
          </span>
        </div>

        <h2
          id="whats-inside-heading"
          className={`mt-5 text-3xl font-semibold tracking-[-0.03em] text-slate-900 sm:text-4xl ${fredokaHeadline.className}`}
        >
          What lands in your inbox every Sunday
        </h2>
        <p className={`mx-auto mt-3 max-w-xl text-base font-medium leading-relaxed text-slate-600 sm:text-lg ${jakartaSans.className}`}>
          Same three <strong className="text-slate-900">StudentStack</strong> modules each week: short, skimmable, and
          written for parents. No generic AI essays.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
        className="relative mx-auto mt-12 max-w-lg sm:max-w-xl"
      >
        {/* Device / envelope frame (on-brand, not “neon AI card”) */}
        <div className="rounded-[1.75rem] border border-slate-200/90 bg-slate-50 p-1 shadow-[0_20px_50px_-28px_rgba(15,23,42,0.18)]">
          <div className="overflow-hidden rounded-[1.6rem] border border-slate-100 bg-white">
            <div className="border-b border-slate-100 bg-slate-50/90 px-5 py-4 text-left">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex items-baseline rounded-xl border border-sky-200 bg-white px-2.5 py-1.5 text-sm font-bold tracking-tight shadow-sm ${fredokaHeadline.className}`}
                  >
                    <span className="text-slate-900">Student</span>
                    <span className="text-sky-600">Stack</span>
                  </div>
                  <div>
                    <p className={`text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 ${jakartaSans.className}`}>
                      Weekly send
                    </p>
                    <p className={`text-xs font-semibold text-slate-700 ${jakartaSans.className}`}>Parents, high school</p>
                  </div>
                </div>
                <span
                  className={`shrink-0 rounded-lg border border-sky-100 bg-sky-50 px-2 py-1 text-[10px] font-black text-sky-800 ${jakartaSans.className}`}
                >
                  ~3 min
                </span>
              </div>
            </div>

            <div className="space-y-0 divide-y divide-slate-100">
              <motion.article
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 }}
                className="px-5 py-5 text-left"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-sky-700">
                    <ListChecks className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className={`text-[9px] font-black uppercase tracking-[0.18em] text-sky-600 ${jakartaSans.className}`}>
                      {sections.researchList.shortLabel}
                    </p>
                    <h3 className={`mt-1 text-base font-semibold leading-snug text-slate-900 sm:text-lg ${fredokaHeadline.className}`}>
                      {sections.researchList.title}
                    </h3>
                    <p className={`mt-2 text-sm leading-relaxed text-slate-600 ${jakartaSans.className}`}>
                      {sections.researchList.description}
                    </p>
                  </div>
                </div>
              </motion.article>

              <motion.article
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-violet-50/40 px-5 py-5 text-left"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
                    <MessagesSquare className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className={`text-[9px] font-black uppercase tracking-[0.18em] text-violet-600 ${jakartaSans.className}`}>
                      {sections.teamQA.shortLabel}
                    </p>
                    <h3 className={`mt-1 text-base font-semibold leading-snug text-slate-900 sm:text-lg ${fredokaHeadline.className}`}>
                      {sections.teamQA.title}
                    </h3>
                    <p className={`mt-2 text-sm leading-relaxed text-slate-600 ${jakartaSans.className}`}>
                      {sections.teamQA.description}
                    </p>
                  </div>
                </div>
              </motion.article>

              <motion.article
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 }}
                className="px-5 py-5 text-left"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                    <RefreshCw className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className={`text-[9px] font-black uppercase tracking-[0.18em] text-emerald-700 ${jakartaSans.className}`}>
                      {sections.toolRoster.shortLabel}
                    </p>
                    <h3 className={`mt-1 text-base font-semibold leading-snug text-slate-900 sm:text-lg ${fredokaHeadline.className}`}>
                      <span className="text-slate-800">
                        {sections.toolRoster.titlePrefix} {sections.toolRoster.rosterName}
                      </span>
                      <span className="text-sky-600">, {sections.toolRoster.titleSuffix}</span>
                    </h3>
                    <p className={`mt-2 text-sm leading-relaxed text-slate-600 ${jakartaSans.className}`}>
                      {sections.toolRoster.description}
                    </p>
                  </div>
                </div>
              </motion.article>
            </div>

            <div className="border-t border-slate-100 bg-slate-50/80 px-5 py-3 text-center">
              <p className={`text-[11px] font-semibold text-slate-500 ${jakartaSans.className}`}>
                Build this exact layout for your list in{" "}
                <strong className="text-slate-700">Admin → Weekly email builder</strong>.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
