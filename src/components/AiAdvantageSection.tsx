"use client";

import React from "react";
import { motion } from "motion/react";
import { CalendarCheck2, FolderKanban, PenLine } from "lucide-react";
import { fredokaHeadline, jakartaSans } from "@/app/fonts";

const arenas = [
  {
    label: "Organization",
    icon: FolderKanban,
    line: "Systems for classes, deadlines, and files — so the week does not collapse into catch-up mode.",
    proof: "The early win parents most often forward to their student.",
  },
  {
    label: "Planning",
    icon: CalendarCheck2,
    line: "Syllabus to calendar: time blocks, buffers, and what actually gets finished.",
    proof: "Where campus mentors see the gap between “busy” and “prepared.”",
  },
  {
    label: "Notetaking",
    icon: PenLine,
    line: "Capture in class, then reshape notes into something a high schooler can study from.",
    proof: "A habit that compounds every unit — not a one-week tip.",
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
            Across campus, the pattern is consistent: high schoolers who learn AI early do not just finish faster — they
            run cleaner weeks. Our free daily teaches parents that organizing lens first.
          </p>
        </motion.div>

        <ul className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-3 sm:gap-5">
          {arenas.map((arena, index) => {
            const Icon = arena.icon;
            return (
              <motion.li
                key={arena.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                whileHover={{ y: -3 }}
                className="rounded-[1.75rem] border border-sky-100/90 bg-white/80 p-5 shadow-[0_18px_40px_-32px_rgba(15,23,42,0.3)] sm:p-6"
              >
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-100 text-sky-700">
                  <Icon className="h-5 w-5" strokeWidth={2.25} aria-hidden />
                </div>
                <h3 className={`mt-4 text-xl font-semibold tracking-[-0.02em] text-[#ff6a00] ${fredokaHeadline.className}`}>
                  {arena.label}
                </h3>
                <p className={`mt-2 text-sm font-medium leading-relaxed text-slate-700 ${jakartaSans.className}`}>
                  {arena.line}
                </p>
                <p className={`mt-3 border-t border-slate-100 pt-3 text-xs font-semibold text-slate-500 ${jakartaSans.className}`}>
                  {arena.proof}
                </p>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
