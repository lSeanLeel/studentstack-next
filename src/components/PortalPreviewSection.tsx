"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { jakartaSans, fredokaHeadline } from "@/app/fonts";
import { PortalPreviewMock } from "@/components/portal/PortalPreviewMock";
import { PARENT_ORIGIN_TIMELINE } from "@/lib/landing/ai-for-school";

/** Landing-page gated preview of the member portal, with origin milestones. */
export function PortalPreviewSection() {
  return (
    <section
      id="member-portal"
      className="relative overflow-hidden border-t border-sky-100 px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
      aria-labelledby="portal-preview-heading"
      style={{
        backgroundImage:
          "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(125,211,252,0.25), transparent 60%), linear-gradient(180deg, #f0f9ff 0%, #ffffff 45%, #f8fafc 100%)",
      }}
    >
      <div className="pointer-events-none absolute -right-24 top-20 h-64 w-64 rounded-full bg-emerald-200/30 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -left-16 bottom-10 h-48 w-48 rounded-full bg-sky-200/40 blur-3xl" aria-hidden />

      <div className="relative mx-auto max-w-6xl">
        <div className="mt-0 grid items-start gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-12">
          <div>
            <h2 id="portal-preview-heading" className="sr-only">
              How we got here
            </h2>
            <ol className="rounded-[2rem] border border-slate-800 bg-slate-900 px-4 py-8 sm:px-6 sm:py-10">
              {PARENT_ORIGIN_TIMELINE.map((milestone, i) => {
                const isLast = i === PARENT_ORIGIN_TIMELINE.length - 1;

                return (
                  <li
                    key={milestone.id}
                    className="grid grid-cols-[5.5rem_1.25rem_1fr] items-start gap-x-3 sm:grid-cols-[6.5rem_1.25rem_1fr] sm:gap-x-4"
                  >
                    <time
                      dateTime={milestone.dateTime}
                      className={`pt-1 text-right text-[10px] font-black uppercase tracking-[0.1em] text-sky-300/90 sm:text-[11px] ${jakartaSans.className}`}
                    >
                      {milestone.date}
                    </time>

                    <div className="flex flex-col items-center">
                      <motion.span
                        initial={{ scale: 0.6, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.04 * i, type: "spring", stiffness: 340, damping: 24 }}
                        className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ring-2 ring-slate-900 ${
                          isLast ? "bg-emerald-400" : "bg-sky-400"
                        }`}
                        aria-hidden
                      />
                      {!isLast ? (
                        <div
                          className="my-1 min-h-[1.75rem] w-px flex-1 bg-gradient-to-b from-sky-400/50 to-sky-400/10"
                          aria-hidden
                        />
                      ) : null}
                    </div>

                    <motion.p
                      initial={{ opacity: 0, y: 6 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-20px" }}
                      transition={{ delay: 0.05 * i, duration: 0.35 }}
                      className={`pb-7 text-[0.95rem] font-semibold leading-snug tracking-[-0.02em] text-white sm:pb-8 sm:text-base ${fredokaHeadline.className} ${
                        isLast ? "pb-0" : ""
                      }`}
                    >
                      {milestone.title}
                    </motion.p>
                  </li>
                );
              })}
            </ol>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.12, duration: 0.5 }}
            className="lg:sticky lg:top-24"
          >
            <PortalPreviewMock />
          </motion.div>
        </div>

        <div className="mt-12 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
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
