"use client";

import React from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { jakartaSans, fredokaHeadline } from "@/app/fonts";
import { useJoin } from "@/components/join-context";
import { AI_FOR_SCHOOL_CLARITY, SCHOOL_USE_AREAS } from "@/lib/landing/ai-for-school";

const contrastSurface = {
  sky: "border-sky-200/80 bg-gradient-to-br from-sky-50 to-white shadow-[0_10px_0_0_rgba(14,165,233,0.1)]",
  slate: "border-slate-200 bg-gradient-to-br from-slate-50 to-white shadow-[0_10px_0_0_rgba(15,23,42,0.06)]",
  emerald: "border-emerald-200/80 bg-gradient-to-br from-emerald-50 to-white shadow-[0_10px_0_0_rgba(16,185,129,0.1)]",
} as const;

export function AiForSchoolSection() {
  const { openJoin } = useJoin();

  return (
    <section
      id="ai-for-school"
      className="border-t border-sky-100 bg-white px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
      aria-labelledby="ai-for-school-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className={`text-[10px] font-black uppercase tracking-[0.22em] text-sky-600 ${jakartaSans.className}`}>
            For parents
          </p>
          <h2
            id="ai-for-school-heading"
            className={`mt-3 text-[2rem] font-semibold tracking-[-0.035em] text-slate-900 sm:text-4xl ${fredokaHeadline.className}`}
          >
            {AI_FOR_SCHOOL_CLARITY.headlineLead}{" "}
            <span className="text-sky-500">{AI_FOR_SCHOOL_CLARITY.headlineEmphasis}</span>
          </h2>
          <p className={`mt-4 text-base font-medium leading-relaxed text-slate-600 sm:text-lg ${jakartaSans.className}`}>
            {AI_FOR_SCHOOL_CLARITY.subhead}
          </p>
        </div>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SCHOOL_USE_AREAS.map((area, i) => {
            const Icon = area.icon;
            return (
              <motion.li
                key={area.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 * i }}
                className="rounded-[1.5rem] border-2 border-slate-100 bg-[#f8fafc] p-4 text-center sm:p-5"
              >
                <span className="mx-auto inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-100 text-sky-700 ring-2 ring-sky-200">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <p className={`mt-3 font-semibold text-slate-900 ${fredokaHeadline.className}`}>{area.title}</p>
                <p className={`mt-1 text-sm font-medium text-slate-500 ${jakartaSans.className}`}>{area.detail}</p>
              </motion.li>
            );
          })}
        </ul>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {AI_FOR_SCHOOL_CLARITY.contrasts.map((block, i) => (
            <motion.article
              key={block.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.06 * i }}
              className={`rounded-[1.75rem] border-2 p-5 sm:p-6 ${contrastSurface[block.accent]}`}
            >
              <p className={`text-[10px] font-black uppercase tracking-[0.18em] text-slate-500 ${jakartaSans.className}`}>
                {block.label}
              </p>
              <ul className={`mt-4 space-y-2.5 ${jakartaSans.className}`}>
                {block.points.map((point) => (
                  <li key={point} className="flex gap-2 text-sm font-medium leading-relaxed text-slate-700">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500" aria-hidden />
                    {point}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 flex justify-center"
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
