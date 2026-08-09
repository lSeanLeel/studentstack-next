"use client";

import React from "react";
import { motion } from "motion/react";
import { fredokaHeadline, jakartaSans } from "@/app/fonts";

const arenas = [
  {
    label: "Organization",
    line: "Systems for classes, deadlines, and files, so the week does not collapse into catch-up mode.",
    proof: "Most common early win parents report forwarding to their student.",
  },
  {
    label: "Planning",
    line: "Syllabus to calendar: time blocks, buffers, and what actually gets finished.",
    proof: "Where college mentors see the biggest gap between “busy” and “prepared.”",
  },
  {
    label: "Notetaking",
    line: "Capture in class, then reshape notes into something a high schooler can study from.",
    proof: "A habit that compounds every unit, not a one-week tip.",
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
            className={`mt-3 text-[2rem] font-semibold leading-[1.05] tracking-[-0.035em] text-slate-900 sm:text-4xl lg:text-[2.85rem] ${fredokaHeadline.className}`}
          >
            The advantage is not “using AI.”
            <br className="hidden sm:block" />
            It is staying{" "}
            <span className="text-sky-500">organized</span> with it.
          </h2>
          <p
            className={`mt-5 max-w-2xl text-base font-medium leading-[1.65] tracking-[-0.01em] text-slate-600 sm:text-lg ${jakartaSans.className}`}
          >
            Across campus mentors, the pattern is consistent: high schoolers who learn AI early do not just finish faster.
            They run cleaner weeks. Parents start with our free daily newsletter to learn those habits. Elite is the
            direct path when a student needs a living portal built around the same school use cases.
          </p>

          <dl
            className={`mt-8 grid gap-4 sm:grid-cols-3 sm:gap-6 ${jakartaSans.className}`}
          >
            <div className="rounded-2xl border border-sky-100/90 bg-white/70 px-4 py-3">
              <dt className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">Observed</dt>
              <dd className={`mt-1 text-sm font-semibold text-slate-800 ${fredokaHeadline.className}`}>
                Organization first
              </dd>
            </div>
            <div className="rounded-2xl border border-sky-100/90 bg-white/70 px-4 py-3">
              <dt className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">Taught by</dt>
              <dd className={`mt-1 text-sm font-semibold text-slate-800 ${fredokaHeadline.className}`}>
                Campus mentors
              </dd>
            </div>
            <div className="rounded-2xl border border-sky-100/90 bg-white/70 px-4 py-3">
              <dt className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">Built for</dt>
              <dd className={`mt-1 text-sm font-semibold text-slate-800 ${fredokaHeadline.className}`}>
                Parents &amp; students
              </dd>
            </div>
          </dl>
        </motion.div>

        <ul className="mt-10 divide-y divide-sky-100/90 border-y border-sky-100/90 sm:mt-12">
          {arenas.map((arena, index) => (
            <motion.li
              key={arena.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: 0.4, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="grid gap-2 py-6 sm:grid-cols-[10rem_1fr] sm:items-start sm:gap-8 sm:py-7"
            >
              <span
                className={`text-xl font-semibold tracking-[-0.02em] text-[#ff6a00] sm:text-2xl ${fredokaHeadline.className}`}
              >
                {arena.label}
              </span>
              <div>
                <p className={`text-sm font-medium leading-relaxed text-slate-700 sm:text-base ${jakartaSans.className}`}>
                  {arena.line}
                </p>
                <p className={`mt-1.5 text-xs font-medium text-slate-500 sm:text-[13px] ${jakartaSans.className}`}>
                  {arena.proof}
                </p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
