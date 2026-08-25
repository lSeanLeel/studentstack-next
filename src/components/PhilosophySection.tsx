"use client";

import React from "react";
import { motion } from "motion/react";
import { fredokaHeadline, jakartaSans, institutionalSerif } from "@/app/fonts";

const pillars = [
  {
    index: "01",
    title: "Closer to the classroom",
    body: "Tutors and admissions counselors often teach last year's playbook. Our team is still in class, watching how AI and school standards move this semester.",
  },
  {
    index: "02",
    title: "Built for the families already watching",
    body: "Parents found our free AI notes and admissions masterminds first. Membership is how they put their high schooler inside the same work.",
  },
  {
    index: "03",
    title: "Access, not a public catalog",
    body: "Members do not browse a menu. They get the gated access our community uses to stay ahead. Details stay inside.",
  },
] as const;

export function PhilosophySection() {
  return (
    <section
      id="philosophy"
      className="relative overflow-hidden border-t border-slate-200 bg-[#f8fafc] px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28"
      aria-labelledby="philosophy-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.6)_0%,transparent_40%)]" />

      <div className="relative mx-auto w-full max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="mx-auto flex max-w-md items-center gap-4">
            <div className="h-px flex-1 bg-slate-300" aria-hidden />
            <p className={`shrink-0 text-[10px] font-black uppercase tracking-[0.28em] text-slate-500 ${jakartaSans.className}`}>
              Why StudentStack
            </p>
            <div className="h-px flex-1 bg-slate-300" aria-hidden />
          </div>

          <h2
            id="philosophy-heading"
            className={`mx-auto mt-8 max-w-3xl text-[1.85rem] font-semibold leading-[1.08] tracking-[-0.035em] text-slate-900 sm:text-4xl lg:text-[2.75rem] ${fredokaHeadline.className}`}
          >
            College students changed what parents expect
          </h2>

          <p
            className={`ss-institutional mx-auto mt-5 max-w-2xl text-[1.05rem] font-normal leading-[1.7] text-slate-600 sm:text-lg ${institutionalSerif.className}`}
          >
            We started by publishing free AI literacy for school, then ran parent masterminds on college admissions.
            Families kept asking for a way to put their high schooler inside that work. Membership is that access:
            private, student-built, and designed for the families already ahead.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="mt-14 overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-[0_24px_60px_-40px_rgba(15,23,42,0.18)] sm:rounded-[2rem]"
        >
          <div className="grid divide-y divide-slate-200 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {pillars.map((pillar, index) => (
              <motion.article
                key={pillar.index}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className="group px-7 py-9 sm:px-8 sm:py-10"
              >
                <p
                  className={`text-[11px] font-black tabular-nums tracking-[0.2em] text-slate-400 transition-colors group-hover:text-sky-600 ${jakartaSans.className}`}
                >
                  {pillar.index}
                </p>
                <h3
                  className={`mt-4 text-lg font-semibold tracking-[-0.02em] text-slate-900 sm:text-xl ${fredokaHeadline.className}`}
                >
                  {pillar.title}
                </h3>
                <p
                  className={`ss-institutional mt-3 text-[0.95rem] font-normal leading-[1.65] text-slate-600 ${institutionalSerif.className}`}
                >
                  {pillar.body}
                </p>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
