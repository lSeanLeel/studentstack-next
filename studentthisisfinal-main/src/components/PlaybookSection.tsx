"use client";

import React from "react";
import { motion } from "motion/react";
import { MailPlus, Table2, Mail, MessageCircle } from "lucide-react";
import { jakartaSans, fredokaHeadline } from "@/app/fonts";
import { useOnboarding } from "@/components/onboarding-context";

/** Landing preview of what parents receive: link-first toolkit, Sheet board, and human Q&A (no “playbook” jargon). */
export function PlaybookSection() {
  const { openOnboarding } = useOnboarding();

  return (
    <section
      id="weekly-email"
      className="relative overflow-hidden bg-gradient-to-b from-white via-sky-50/25 to-violet-50/20 pb-10 pt-24 sm:pb-12 sm:pt-28"
      aria-label="What we send each week"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_65%_45%_at_80%_20%,rgba(167,139,250,0.08),transparent)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_10%_60%,rgba(14,165,233,0.1),transparent)]" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:gap-8">
          {/* 1. Toolkit (link-first) */}
          <motion.article
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="relative overflow-hidden rounded-[2rem] border-2 border-sky-200/90 bg-gradient-to-br from-sky-50 via-white to-cyan-50/50 p-8 shadow-[0_24px_56px_-26px_rgba(14,165,233,0.5)] sm:p-10"
          >
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-sky-200/30 blur-2xl" />
            <p className={`relative text-[11px] font-black uppercase tracking-[0.2em] text-sky-700 ${jakartaSans.className}`}>
              01. AI toolkit
            </p>
            <h3 className={`relative mt-2 text-[1.95rem] font-semibold text-slate-900 sm:text-[2.2rem] ${fredokaHeadline.className}`}>
              One link. Always up to date.
            </h3>
            <p className={`relative mt-3 max-w-2xl text-base font-medium leading-relaxed text-slate-600 ${jakartaSans.className}`}>
              We keep a single page with the latest AI tools our team actually uses. The email doesn&apos;t dump a new list
              every Sunday, so you tap <strong className="text-slate-800">the same link</strong> and see what we added or
              changed.
            </p>
            <motion.button
              type="button"
              onClick={() => openOnboarding()}
              aria-label="Sign up for the free weekly email to get the toolkit link"
              className={`relative mt-5 inline-flex cursor-pointer items-center gap-2 rounded-2xl border-2 border-slate-900/10 bg-white px-4 py-3 text-left shadow-md outline-none ring-sky-400 transition hover:border-sky-300 hover:bg-sky-50/80 focus-visible:ring-2 ${jakartaSans.className}`}
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            >
              <MailPlus className="h-4 w-4 shrink-0 text-sky-600" aria-hidden />
              <span className="text-sm font-bold text-sky-800">
                Join free: we&apos;ll email you the link each week
              </span>
            </motion.button>
          </motion.article>

          {/* 2. Opportunity board (Google Sheet) */}
          <motion.article
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="relative overflow-hidden rounded-[2rem] border-2 border-emerald-200/90 bg-white p-0 shadow-[0_20px_50px_-28px_rgba(16,185,129,0.35)]"
          >
            <div className="flex items-center gap-2 border-b border-slate-200 bg-[#0f9d58] px-4 py-2.5">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-white/90" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/50" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/50" />
              </div>
              <span className={`text-[11px] font-bold text-white ${jakartaSans.className}`}>
                Opportunity board (Google Sheet)
              </span>
            </div>
            <div className="bg-gradient-to-b from-slate-50/90 to-white p-5 sm:p-7">
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-[0_8px_28px_-18px_rgba(15,23,42,0.12)] sm:p-6">
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
                      Summer programs, research opportunities with college professors, and competition deadlines. Each week the
                      email links to <strong className="text-slate-800">the same Sheet</strong>. We tidy rows and add what&apos;s
                      new.
                    </p>
                  </div>
                </div>
                <div
                  className={`mt-5 flex flex-wrap items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50/50 px-3 py-2.5 text-xs font-semibold text-slate-600 ${jakartaSans.className}`}
                  role="presentation"
                >
                  <span className="rounded-lg bg-white px-2 py-1 font-mono text-[10px] font-bold text-emerald-800 shadow-sm ring-1 ring-emerald-100">
                    sheets.google.com
                  </span>
                  <span className="font-mono text-slate-400">/ … / edit</span>
                </div>
              </div>
            </div>
          </motion.article>

          {/* 3. Email replies */}
          <motion.article
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.45, delay: 0.15 }}
            className="rounded-[2rem] border-2 border-violet-200/90 bg-gradient-to-br from-violet-50/80 via-white to-fuchsia-50/40 p-5 shadow-[0_20px_50px_-28px_rgba(139,92,246,0.35)] sm:p-7"
          >
            <div className="rounded-2xl border border-violet-200/80 bg-white p-5 shadow-[0_8px_28px_-18px_rgba(109,40,217,0.15)] sm:p-6">
              <p className={`text-[11px] font-black uppercase tracking-[0.2em] text-violet-700 ${jakartaSans.className}`}>
                03. Questions from families
              </p>
              <h3 className={`mt-2 text-xl font-semibold text-slate-900 sm:text-[1.65rem] ${fredokaHeadline.className}`}>
                Real parent + student emails
              </h3>
              <div className={`mt-5 space-y-3 ${jakartaSans.className}`}>
                <div className="flex gap-3 rounded-xl border border-slate-100 bg-slate-50/80 px-3.5 py-3">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-violet-600" aria-hidden />
                  <p className="text-sm font-medium leading-snug text-slate-700">
                    Reach us anytime at{" "}
                    <a href="mailto:help@studentstack.info" className="font-bold text-slate-900 underline decoration-violet-300 underline-offset-2 hover:text-violet-800">
                      help@studentstack.info
                    </a>
                    .
                  </p>
                </div>
                <div className="flex gap-3 rounded-xl border border-slate-100 bg-slate-50/80 px-3.5 py-3">
                  <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-violet-600" aria-hidden />
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
