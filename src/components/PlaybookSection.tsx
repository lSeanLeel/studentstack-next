"use client";

import React from "react";
import { motion } from "motion/react";
import { MailPlus, Table2, Mail, MessageCircle, FileSpreadsheet, ArrowRight } from "lucide-react";
import { jakartaSans, fredokaHeadline } from "@/app/fonts";
import { useOnboarding } from "@/components/onboarding-context";

/** Landing preview of what parents receive each week. */
export function PlaybookSection() {
  const { openOnboarding } = useOnboarding();

  return (
    <section
      id="weekly-email"
      className="relative overflow-hidden bg-transparent pb-10 pt-8 sm:pb-14 sm:pt-12"
      aria-label="What we send each week"
    >
      <div className="relative mx-auto w-full max-w-4xl px-4 sm:px-6 lg:max-w-5xl lg:px-8 xl:max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mb-10 text-center sm:mb-12"
        >
          <p className={`text-[11px] font-black uppercase tracking-[0.2em] text-sky-600 ${jakartaSans.className}`}>
            The Sunday email
          </p>
          <h2
            id="weekly-email-heading"
            className={`mt-2 text-[1.85rem] font-semibold tracking-[-0.03em] text-slate-900 sm:text-4xl lg:text-[2.6rem] ${fredokaHeadline.className}`}
          >
            What we send you every week
          </h2>
        </motion.div>

        <div className="flex flex-col gap-6 sm:gap-8">
          <motion.article
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="relative overflow-hidden rounded-[2rem] border-2 border-sky-200/90 bg-gradient-to-br from-sky-50 via-white to-cyan-50/50 p-8 shadow-[0_18px_0_0_rgba(14,165,233,0.12)] sm:p-10"
          >
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-sky-200/30 blur-2xl" />
            <p className={`relative text-[11px] font-black uppercase tracking-[0.2em] text-sky-700 ${jakartaSans.className}`}>
              01. AI toolkit
            </p>
            <h3 className={`relative mt-2 text-[1.95rem] font-semibold text-slate-900 sm:text-[2.2rem] ${fredokaHeadline.className}`}>
              One link. Always up to date.
            </h3>
            <p className={`relative mt-3 max-w-2xl text-base font-medium leading-relaxed text-slate-600 ${jakartaSans.className}`}>
              As college students who live in AI tools daily, we share the most useful ones for{" "}
              <strong className="text-slate-800">studying</strong>,{" "}
              <strong className="text-slate-800">organization</strong>,{" "}
              <strong className="text-slate-800">writing</strong>, and other student use-cases.
            </p>
            <motion.button
              type="button"
              onClick={() => openOnboarding()}
              aria-label="Sign up for the free weekly email to get the toolkit link"
              className={`relative mt-5 inline-flex cursor-pointer items-center gap-2 rounded-2xl border-2 border-slate-900/10 bg-white px-4 py-3 text-left shadow-md outline-none ring-sky-400 transition hover:border-sky-300 hover:bg-sky-50/80 focus-visible:ring-2 ${jakartaSans.className}`}
              whileHover={{ y: -3 }}
            >
              <MailPlus className="h-4 w-4 shrink-0 text-sky-600" aria-hidden />
              <span className="text-sm font-bold text-sky-800">
                Sign up: we&apos;ll email you the link each week
              </span>
            </motion.button>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="relative overflow-hidden rounded-[2rem] border-2 border-emerald-200/90 bg-white p-0 shadow-[0_18px_0_0_rgba(16,185,129,0.14)]"
          >
            <div className="flex items-center gap-2 border-b border-slate-200 bg-[#0f9d58] px-4 py-2.5">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-white/90" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/50" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/50" />
              </div>
              <span className={`text-[11px] font-bold text-white ${jakartaSans.className}`}>
                Opportunities for High Schoolers!
              </span>
            </div>
            <div className="bg-gradient-to-b from-slate-50/90 to-white p-5 sm:p-7">
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                    <Table2 className="h-5 w-5" aria-hidden />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className={`text-[11px] font-black uppercase tracking-[0.2em] text-emerald-700 ${jakartaSans.className}`}>
                      02. Programs & deadlines
                    </p>
                    <h3 className={`mt-1.5 text-xl font-semibold text-slate-900 sm:text-[1.65rem] ${fredokaHeadline.className}`}>
                      The &quot;Super&quot; Spreadsheet
                    </h3>
                    <p className={`mt-3 text-sm font-medium leading-relaxed text-slate-600 ${jakartaSans.className}`}>
                      As students who once applied to college, we share summer programs, research opportunities,
                      competition and scholarship deadlines, and more.
                    </p>
                  </div>
                </div>
                <motion.button
                  type="button"
                  onClick={() => openOnboarding()}
                  aria-label="Sign up to access the opportunities spreadsheet"
                  className={`group mt-5 flex w-full items-center justify-between gap-3 rounded-2xl border-2 border-emerald-200/90 bg-white px-4 py-3.5 text-left outline-none ring-emerald-400 transition hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-emerald-50/70 focus-visible:ring-2 sm:px-5 ${jakartaSans.className}`}
                  whileHover={{ y: -2 }}
                >
                  <span className="flex min-w-0 items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                      <FileSpreadsheet className="h-5 w-5" aria-hidden />
                    </span>
                    <span className="text-lg font-bold text-slate-900 sm:text-xl">Sign Up</span>
                  </span>
                  <span className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-emerald-600 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.12em] text-white transition group-hover:bg-emerald-700">
                    Open
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </motion.button>
              </div>
            </div>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.45, delay: 0.15 }}
            className="rounded-[2rem] border-2 border-amber-200/90 bg-gradient-to-br from-amber-50/90 via-white to-orange-50/50 p-5 shadow-[0_18px_0_0_rgba(245,158,11,0.12)] sm:p-7"
          >
            <div className="rounded-2xl border border-amber-200/80 bg-white p-5 sm:p-6">
              <p className={`text-[11px] font-black uppercase tracking-[0.2em] text-amber-700 ${jakartaSans.className}`}>
                03. Questions from families
              </p>
              <h3 className={`mt-2 text-xl font-semibold text-slate-900 sm:text-[1.65rem] ${fredokaHeadline.className}`}>
                Real parent + student emails
              </h3>
              <div className={`mt-5 space-y-3 ${jakartaSans.className}`}>
                <div className="flex gap-3 rounded-xl border border-slate-100 bg-slate-50/80 px-3.5 py-3">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" aria-hidden />
                  <p className="text-sm font-medium leading-snug text-slate-700">
                    Reach us anytime at{" "}
                    <a
                      href="mailto:help@studentstack.info"
                      className="font-bold text-slate-900 underline decoration-amber-300 underline-offset-2 hover:text-amber-800"
                    >
                      help@studentstack.info
                    </a>
                    .
                  </p>
                </div>
                <div className="flex gap-3 rounded-xl border border-slate-100 bg-slate-50/80 px-3.5 py-3">
                  <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" aria-hidden />
                  <p className="text-sm font-medium leading-snug text-slate-700">
                    Our team replies directly and is happy to help with follow-ups.
                  </p>
                </div>
              </div>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
