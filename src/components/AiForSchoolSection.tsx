"use client";

import React from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { jakartaSans, fredokaHeadline } from "@/app/fonts";
import { useJoin } from "@/components/join-context";
import { AI_FOR_SCHOOL_CLARITY } from "@/lib/landing/ai-for-school";

export function AiForSchoolSection() {
  const { openJoin } = useJoin();

  return (
    <section
      id="ai-for-school"
      className="border-t border-sky-100 bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
      aria-labelledby="ai-for-school-heading"
    >
      <div className="mx-auto max-w-2xl text-center">
        <p className={`text-[10px] font-black uppercase tracking-[0.22em] text-sky-600 ${jakartaSans.className}`}>
          {AI_FOR_SCHOOL_CLARITY.eyebrow}
        </p>

        <h2
          id="ai-for-school-heading"
          className={`mt-3 text-[clamp(1.65rem,4.5vw,2.35rem)] font-semibold leading-[1.15] tracking-[-0.035em] text-slate-900 ${fredokaHeadline.className}`}
        >
          {AI_FOR_SCHOOL_CLARITY.headlineLead}{" "}
          <span className="text-sky-500">{AI_FOR_SCHOOL_CLARITY.headlineEmphasis}</span>
        </h2>

        <p className={`mt-5 text-base font-medium leading-relaxed text-slate-600 sm:text-lg ${jakartaSans.className}`}>
          {AI_FOR_SCHOOL_CLARITY.subhead}
        </p>

        <p className={`mt-4 text-sm font-semibold text-slate-500 ${jakartaSans.className}`}>
          {AI_FOR_SCHOOL_CLARITY.fomoLine}
        </p>

        <ul className={`mt-10 space-y-2.5 text-left ${jakartaSans.className}`}>
          {AI_FOR_SCHOOL_CLARITY.useCases.map((item, i) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 * i }}
              className="rounded-2xl border border-slate-100 bg-[#f8fafc] px-4 py-3.5 text-sm font-medium text-slate-700 transition hover:border-sky-200 hover:bg-sky-50/50 sm:px-5 sm:text-[0.95rem]"
            >
              {item}
            </motion.li>
          ))}
        </ul>

        <p className={`mt-8 text-sm font-medium leading-relaxed text-slate-500 ${jakartaSans.className}`}>
          {AI_FOR_SCHOOL_CLARITY.teachLine}
        </p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 flex justify-center"
        >
          <button
            type="button"
            onClick={openJoin}
            className={`group inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-8 py-4 text-xs font-black uppercase tracking-[0.14em] text-white shadow-[0_14px_0_0_rgba(15,23,42,0.2)] transition hover:-translate-y-0.5 hover:bg-slate-800 ${jakartaSans.className}`}
          >
            {AI_FOR_SCHOOL_CLARITY.cta.primary}
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
