"use client";

import React from "react";
import { motion } from "motion/react";
import { fredokaHeadline, jakartaSans } from "@/app/fonts";

const arenas = [
  {
    label: "Organization",
    line: "Keep classes, deadlines, and files from stacking into chaos before the week even starts.",
  },
  {
    label: "Planning",
    line: "Turn a syllabus into a real week: blocks, buffers, and what actually gets done.",
  },
  {
    label: "Notetaking",
    line: "Capture in class, then reshape notes into something a high schooler can study from.",
  },
] as const;

export function AiAdvantageSection() {
  return (
    <section
      id="ai-advantage"
      className="relative overflow-hidden border-t border-sky-100/80 bg-transparent px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
      aria-labelledby="ai-advantage-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_50%_-5%,rgba(255,106,0,0.1),transparent_55%),radial-gradient(ellipse_55%_45%_at_0%_80%,rgba(125,211,252,0.16),transparent_50%)]" />

      <div className="relative mx-auto w-full max-w-3xl lg:max-w-5xl xl:max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <p className={`text-[10px] font-black uppercase tracking-[0.22em] text-[#ff6a00] ${jakartaSans.className}`}>
            The AI Advantage
          </p>
          <h2
            id="ai-advantage-heading"
            className={`mt-3 text-[1.85rem] font-semibold leading-[1.08] tracking-[-0.035em] text-slate-900 sm:text-4xl lg:text-[2.55rem] ${fredokaHeadline.className}`}
          >
            AI for staying organized in{" "}
            <span className="text-sky-500">high school</span>
          </h2>
          <p
            className={`mt-5 max-w-2xl text-base font-medium leading-relaxed text-slate-600 sm:text-lg ${jakartaSans.className}`}
          >
            From the college-student side of the same pressure, we saw a simple Edge: students who learn AI early do not
            just move faster. They stay organized. Parents start with our free daily newsletter to learn those habits.
            When a family wants the direct path, Elite puts the student in a portal built around those school use cases.
          </p>
        </motion.div>

        <ul className="mt-10 divide-y divide-sky-100/90 border-y border-sky-100/90 sm:mt-12">
          {arenas.map((arena, index) => (
            <motion.li
              key={arena.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: 0.4, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="grid gap-2 py-6 sm:grid-cols-[10rem_1fr] sm:items-baseline sm:gap-8 sm:py-7"
            >
              <span
                className={`text-xl font-semibold tracking-[-0.02em] text-[#ff6a00] sm:text-2xl ${fredokaHeadline.className}`}
              >
                {arena.label}
              </span>
              <p className={`text-sm font-medium leading-relaxed text-slate-600 sm:text-base ${jakartaSans.className}`}>
                {arena.line}
              </p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
