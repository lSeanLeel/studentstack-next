"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Lock, MessageSquare, Wrench } from "lucide-react";
import { jakartaSans, fredokaHeadline } from "@/app/fonts";
import { PARENT_PORTAL_SUMMARY } from "@/lib/portal/membership";

/** Landing-page gated preview of the member portal (CSS mock, screenshot-ready). */
export function PortalPreviewSection() {
  const { headline, subhead, pillars } = PARENT_PORTAL_SUMMARY;

  return (
    <section
      id="member-portal"
      className="relative overflow-hidden border-t border-slate-100 bg-white px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
      aria-labelledby="portal-preview-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-[10px] font-black uppercase tracking-[0.22em] text-sky-600 ${jakartaSans.className}`}
          >
            Inside membership
          </motion.p>
          <motion.h2
            id="portal-preview-heading"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`mt-3 text-[2rem] font-semibold tracking-[-0.035em] text-slate-900 sm:text-4xl ${fredokaHeadline.className}`}
          >
            {headline}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`mt-4 text-sm font-medium leading-relaxed text-slate-600 sm:text-base ${jakartaSans.className}`}
          >
            {subhead}
          </motion.p>
        </div>

        <ul className="mx-auto mt-10 grid max-w-4xl gap-3 sm:grid-cols-2">
          {pillars.map((pillar, i) => (
            <motion.li
              key={pillar.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 * i }}
              className="rounded-[1.5rem] border-2 border-slate-200 bg-[#f8fafc] p-4 text-left"
            >
              <p className={`font-semibold text-slate-900 ${fredokaHeadline.className}`}>{pillar.title}</p>
              <p className={`mt-1 text-sm font-medium text-slate-600 ${jakartaSans.className}`}>{pillar.detail}</p>
            </motion.li>
          ))}
        </ul>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.55 }}
          className="relative mx-auto mt-12 max-w-4xl"
        >
          <div className="overflow-hidden rounded-[2rem] border-2 border-slate-800 bg-slate-900 p-2 shadow-[0_24px_0_0_rgba(15,23,42,0.15)] sm:rounded-[2.5rem] sm:p-3">
            <div className="overflow-hidden rounded-[1.5rem] bg-[#eef8ff] sm:rounded-[1.75rem]">
              <div className="flex items-center gap-2 border-b-2 border-sky-100 bg-white px-4 py-3">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-300" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
                </div>
                <div className={`ml-2 flex-1 rounded-xl bg-slate-100 px-3 py-1.5 text-[10px] font-bold text-slate-500 ${jakartaSans.className}`}>
                  studentstack.info/portal
                </div>
                <span className={`rounded-xl bg-emerald-50 px-2 py-1 text-[9px] font-black uppercase tracking-[0.1em] text-emerald-700 ${jakartaSans.className}`}>
                  Member
                </span>
              </div>

              <div className="relative p-4 sm:p-6">
                <div className="mb-4 flex flex-wrap gap-2">
                  {["Home", "Toolkit", "Resources", "Guides"].map((tab, i) => (
                    <span
                      key={tab}
                      className={`rounded-2xl px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.1em] ${jakartaSans.className} ${
                        i === 0 ? "bg-slate-900 text-white" : "bg-white text-slate-500 ring-1 ring-slate-200"
                      }`}
                    >
                      {tab}
                    </span>
                  ))}
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border-2 border-sky-200 bg-white p-4 sm:col-span-2">
                    <p className={`flex items-center gap-1.5 text-[9px] font-black uppercase tracking-[0.12em] text-sky-600 ${jakartaSans.className}`}>
                      <Wrench className="h-3 w-3" aria-hidden />
                      AI Toolkit · self-paced
                    </p>
                    <p className={`mt-2 text-sm font-semibold text-slate-900 ${fredokaHeadline.className}`}>
                      Syllabus → calendar workflow with copy-paste prompts
                    </p>
                  </div>
                  <div className="rounded-2xl border-2 border-emerald-200 bg-emerald-50/80 p-4">
                    <p className={`flex items-center gap-1.5 text-[9px] font-black uppercase tracking-[0.12em] text-emerald-800 ${jakartaSans.className}`}>
                      <MessageSquare className="h-3 w-3" aria-hidden />
                      Message the team
                    </p>
                    <p className={`mt-2 text-sm font-semibold text-slate-900 ${fredokaHeadline.className}`}>
                      College students reply — not a chatbot
                    </p>
                  </div>
                  <div className="rounded-2xl border-2 border-amber-200 bg-amber-50/80 p-4">
                    <p className={`text-[9px] font-black uppercase tracking-[0.12em] text-amber-800 ${jakartaSans.className}`}>
                      Guides · optional
                    </p>
                    <p className={`mt-2 text-sm font-semibold text-slate-900 ${fredokaHeadline.className}`}>
                      Integrity checklist, not video lectures
                    </p>
                  </div>
                </div>

                <div className="pointer-events-none absolute inset-x-0 bottom-0 top-[42%] flex flex-col items-center justify-end bg-gradient-to-t from-[#eef8ff] via-[#eef8ff]/95 to-transparent pb-6 pt-16">
                  <div className="flex items-center gap-2 rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 shadow-[0_10px_0_0_rgba(15,23,42,0.08)]">
                    <Lock className="h-4 w-4 text-sky-600" aria-hidden />
                    <span className={`text-xs font-bold text-slate-700 ${jakartaSans.className}`}>
                      Full portal unlocks with membership
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/join"
            className={`inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-6 py-3.5 text-xs font-black uppercase tracking-[0.14em] text-white shadow-[0_12px_0_0_rgba(15,23,42,0.2)] transition hover:-translate-y-0.5 hover:bg-slate-800 ${jakartaSans.className}`}
          >
            Join our Community
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
