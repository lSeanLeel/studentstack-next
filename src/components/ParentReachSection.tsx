"use client";

import React from "react";
import { motion } from "motion/react";
import { jakartaSans, fredokaHeadline } from "@/app/fonts";
import { PARENT_REACH_SIGNALS } from "@/lib/landing/ai-for-school";

export function ParentReachSection() {
  return (
    <section
      className="relative overflow-hidden border-t border-slate-100 bg-slate-900 px-4 py-16 text-white sm:px-6 sm:py-24 lg:px-8"
      aria-labelledby="parent-reach-heading"
    >
      <div className="pointer-events-none absolute -right-32 top-0 h-80 w-80 rounded-full bg-sky-500/15 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-emerald-400/10 blur-3xl" aria-hidden />

      <div className="relative mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className={`text-[10px] font-black uppercase tracking-[0.22em] text-sky-300 ${jakartaSans.className}`}>
            Parent reach
          </p>
          <h2
            id="parent-reach-heading"
            className={`mt-3 text-[2rem] font-semibold tracking-[-0.035em] sm:text-4xl ${fredokaHeadline.className}`}
          >
            Built for families navigating AI at school
          </h2>
          <p className={`mt-4 text-base font-medium leading-relaxed text-slate-300 sm:text-lg ${jakartaSans.className}`}>
            StudentStack started with parents — masterminds, briefings, and Q&A — before we opened the member program.
            That audience is still how we stay current.
          </p>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PARENT_REACH_SIGNALS.map((signal, i) => (
            <motion.li
              key={signal.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.06 * i }}
              whileHover={{ y: -3 }}
              className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition hover:border-sky-400/30 hover:bg-white/[0.07] sm:p-6"
            >
              <p className={`text-lg font-semibold text-sky-200 sm:text-xl ${fredokaHeadline.className}`}>
                {signal.stat}
              </p>
              <p className={`mt-2 text-sm font-medium leading-relaxed text-slate-400 ${jakartaSans.className}`}>
                {signal.detail}
              </p>
            </motion.li>
          ))}
        </ul>

        <p className={`mx-auto mt-10 max-w-xl text-center text-sm font-medium text-slate-500 ${jakartaSans.className}`}>
          We publish for parents. Members get the full AI-for-school program — toolkit, partner integrations, and direct
          access to our team.
        </p>
      </div>
    </section>
  );
}
