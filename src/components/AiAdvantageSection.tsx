"use client";

import React from "react";
import { motion } from "motion/react";
import { fredokaHeadline, jakartaSans } from "@/app/fonts";

const arenas = [
  {
    label: "Lectures",
    line: "Catch up on dense material faster, and walk into class already oriented.",
  },
  {
    label: "Labs",
    line: "Debug, draft, and explore with tools we actually open for coursework.",
  },
  {
    label: "Applications",
    line: "Essays, research, and extracurriculars, where a sharp workflow shows.",
  },
] as const;

export function AiAdvantageSection() {
  return (
    <section
      id="ai-advantage"
      className="relative scroll-mt-28 px-4 py-10 sm:px-6 sm:py-14 lg:px-8"
      aria-labelledby="ai-advantage-heading"
    >
      <div className="mx-auto w-full max-w-3xl lg:max-w-5xl xl:max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl border-t border-sky-100/90 pt-10 sm:pt-12"
        >
          <p
            className={`text-[10px] font-black uppercase tracking-[0.22em] text-[#ff6a00] ${jakartaSans.className}`}
          >
            The AI Advantage
          </p>
          <h2
            id="ai-advantage-heading"
            className={`mt-3 text-[1.75rem] font-semibold leading-[1.1] tracking-[-0.035em] text-slate-900 sm:text-[2.35rem] lg:text-[2.55rem] ${fredokaHeadline.className}`}
          >
            We identified an AI advantage for{" "}
            <span className="text-sky-500">high schoolers</span>
          </h2>
          <p
            className={`mt-4 max-w-2xl text-base font-medium leading-relaxed text-slate-600 sm:mt-5 sm:text-lg ${jakartaSans.className}`}
          >
            As students still in school, we saw peers who learn AI early show up sharper, not just faster. That edge
            shows up in lectures, labs, and applications. It starts in high school. We share the latest tools we use,
            because the “best” one never stays best for long.
          </p>
        </motion.div>

        <ul className="mt-8 grid gap-6 sm:mt-10 sm:grid-cols-3 sm:gap-8">
          {arenas.map((arena, index) => (
            <motion.li
              key={arena.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.4, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="mb-3 h-1 w-10 rounded-full bg-[#ff6a00]/85" aria-hidden />
              <span
                className={`block text-xl font-semibold tracking-[-0.02em] text-slate-900 sm:text-2xl ${fredokaHeadline.className}`}
              >
                {arena.label}
              </span>
              <p className={`mt-2 text-sm font-medium leading-relaxed text-slate-600 sm:text-[0.95rem] ${jakartaSans.className}`}>
                {arena.line}
              </p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
