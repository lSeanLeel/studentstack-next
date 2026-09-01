"use client";

import React from "react";
import { motion } from "motion/react";
import { jakartaSans, fredokaHeadline } from "@/app/fonts";
import { PARENT_ORIGIN_TIMELINE } from "@/lib/landing/ai-for-school";

export function ParentReachSection() {
  return (
    <section
      id="milestones"
      className="border-t border-slate-800 bg-slate-900 px-4 py-12 sm:px-6 sm:py-14 lg:px-8"
      aria-label="Milestones"
    >
      <div className="mx-auto max-w-2xl">
        <ol>
          {PARENT_ORIGIN_TIMELINE.map((milestone, i) => {
            const isLast = i === PARENT_ORIGIN_TIMELINE.length - 1;

            return (
              <li key={milestone.id} className="grid grid-cols-[5.5rem_1.25rem_1fr] items-start gap-x-3 sm:grid-cols-[6.5rem_1.25rem_1fr] sm:gap-x-4">
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
                    <div className="my-1 w-px flex-1 min-h-[1.75rem] bg-gradient-to-b from-sky-400/50 to-sky-400/10" aria-hidden />
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
    </section>
  );
}
