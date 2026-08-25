"use client";

import React from "react";
import { motion } from "motion/react";
import {
  BookOpenCheck,
  CalendarCheck2,
  FolderKanban,
  GraduationCap,
  PenLine,
  Scale,
  School,
  Sparkles,
} from "lucide-react";
import { fredokaHeadline, jakartaSans } from "@/app/fonts";

const habits = [
  {
    label: "Organization",
    icon: FolderKanban,
    line: "Deadlines, files, and classes in one clear system.",
  },
  {
    label: "Planning",
    icon: CalendarCheck2,
    line: "Syllabus to week plan without midweek scramble.",
  },
  {
    label: "Notetaking",
    icon: PenLine,
    line: "Capture in class, study from what you keep.",
  },
] as const;

const climate = [
  {
    label: "Classroom rules",
    icon: School,
    line: "What teachers allow, ban, or quietly expect when AI shows up in assignments.",
  },
  {
    label: "Integrity & detection",
    icon: Scale,
    line: "How schools talk about originality, detectors, and fair use of AI.",
  },
  {
    label: "Writing & research",
    icon: BookOpenCheck,
    line: "Where AI helps brainstorm or outline, and where the student still owns the work.",
  },
  {
    label: "College signals",
    icon: GraduationCap,
    line: "How AI-shaped habits look from the admissions and transcript side of high school.",
  },
  {
    label: "New tools daily",
    icon: Sparkles,
    line: "Which apps are noise, and which ones actually change how students work.",
  },
] as const;

/**
 * AI Advantage: bottom-up campus learning, short habit pillars, wider school climate,
 * and the free daily as how parents stay ahead of that climate.
 */
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
            How top students stay ahead of school with{" "}
            <span className="text-sky-500">AI</span>
          </h2>
          <p
            className={`mt-5 max-w-2xl text-base font-medium leading-[1.65] tracking-[-0.01em] text-slate-600 sm:text-lg ${jakartaSans.className}`}
          >
            We learn this bottom up. We use the tools ourselves, see what actually streamlines school, and translate that
            into habits parents can spot: cleaner weeks, not louder tech.
          </p>
        </motion.div>

        <ul className="mt-8 grid gap-3 sm:mt-10 sm:grid-cols-3 sm:gap-4">
          {habits.map((habit, index) => {
            const Icon = habit.icon;
            return (
              <motion.li
                key={habit.label}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                whileHover={{ y: -2, scale: 1.01 }}
                className="rounded-[1.5rem] border border-sky-100/90 bg-white/85 px-4 py-4 shadow-[0_14px_32px_-28px_rgba(15,23,42,0.28)] sm:px-5 sm:py-5"
              >
                <div className="flex items-start gap-3">
                  <div className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-sky-100 text-sky-700">
                    <Icon className="h-4 w-4" strokeWidth={2.25} aria-hidden />
                  </div>
                  <div>
                    <h3 className={`text-lg font-semibold tracking-[-0.02em] text-[#ff6a00] ${fredokaHeadline.className}`}>
                      {habit.label}
                    </h3>
                    <p className={`mt-1 text-sm font-medium leading-snug text-slate-600 ${jakartaSans.className}`}>
                      {habit.line}
                    </p>
                  </div>
                </div>
              </motion.li>
            );
          })}
        </ul>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="mt-12 sm:mt-14"
        >
          <p className={`text-[10px] font-black uppercase tracking-[0.22em] text-sky-600 ${jakartaSans.className}`}>
            The wider school climate
          </p>
          <h3
            className={`mt-3 max-w-2xl text-[1.55rem] font-semibold leading-[1.12] tracking-[-0.03em] text-slate-900 sm:text-3xl ${fredokaHeadline.className}`}
          >
            AI is reshaping more than study systems
          </h3>
          <p
            className={`mt-3 max-w-2xl text-base font-medium leading-[1.65] text-slate-600 sm:text-lg ${jakartaSans.className}`}
          >
            Classrooms, integrity rules, writing norms, and the tool landscape move every week. Parents who only hear
            about one chatbot miss the climate their student is already inside.
          </p>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
            {climate.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.li
                  key={item.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.35, delay: 0.04 + index * 0.04 }}
                  whileHover={{ y: -2 }}
                  className="rounded-[1.5rem] border border-slate-100 bg-white/70 p-4 sm:p-5"
                >
                  <div className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-orange-50 text-[#ff6a00]">
                    <Icon className="h-4 w-4" strokeWidth={2.25} aria-hidden />
                  </div>
                  <h4 className={`mt-3 text-base font-semibold tracking-[-0.02em] text-slate-900 ${fredokaHeadline.className}`}>
                    {item.label}
                  </h4>
                  <p className={`mt-1.5 text-sm font-medium leading-relaxed text-slate-600 ${jakartaSans.className}`}>
                    {item.line}
                  </p>
                </motion.li>
              );
            })}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="mt-10 rounded-[2rem] border border-sky-200/90 bg-gradient-to-br from-sky-50 via-white to-emerald-50 px-6 py-7 shadow-[0_24px_50px_-36px_rgba(14,165,233,0.45)] sm:mt-12 sm:px-8 sm:py-8"
        >
          <p className={`text-[10px] font-black uppercase tracking-[0.22em] text-[#ff6a00] ${jakartaSans.className}`}>
            Why the free daily exists
          </p>
          <p
            className={`mt-3 max-w-3xl text-[1.35rem] font-semibold leading-[1.2] tracking-[-0.03em] text-slate-900 sm:text-2xl ${fredokaHeadline.className}`}
          >
            Our newsletter is how parents stay ahead of this climate.
          </p>
          <p className={`mt-3 max-w-2xl text-base font-medium leading-[1.65] text-slate-600 sm:text-lg ${jakartaSans.className}`}>
            Every day you get updates on the AI news that actually hits school: new tools, shifting classroom norms, and
            the habits top students use. Over time that becomes a comprehensive picture so your high schooler stays
            ahead, not catching up.
          </p>
          <a
            href="#hero-cta"
            className={`mt-6 inline-flex items-center justify-center rounded-2xl bg-sky-500 px-5 py-3 text-sm font-black text-white shadow-[0_12px_28px_-12px_rgba(14,165,233,0.7)] transition hover:scale-[1.02] hover:bg-sky-600 ${jakartaSans.className}`}
          >
            Join the free daily
          </a>
        </motion.div>
      </div>
    </section>
  );
}
