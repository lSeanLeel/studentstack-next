"use client";

import React from "react";
import { motion } from "motion/react";
import { CalendarDays, Forward, Newspaper, Sparkles, SunMedium } from "lucide-react";
import { fredokaHeadline, jakartaSans, institutionalSerif } from "@/app/fonts";

const dayParts = [
  {
    icon: SunMedium,
    label: "Morning desk note",
    title: "From students still in class",
    body: "A short open from our college desk: what we are seeing on campus and in high-school adjacent tools this week.",
  },
  {
    icon: Newspaper,
    label: "School AI signal",
    title: "What actually moved",
    body: "One clear signal on AI in school: classroom norms, new tools worth noticing, or a policy shift parents should not miss.",
  },
  {
    icon: Sparkles,
    label: "Toolkit move",
    title: "One workflow, not a dump",
    body: "A concrete organizing habit in Organization, Planning, or Notetaking that a high schooler can run the same day.",
  },
  {
    icon: Forward,
    label: "Forward tonight",
    title: "Parent → student text",
    body: "A ready-to-send note so you can hand the move to your student without rewriting the whole email.",
  },
] as const;

/**
 * Branded description of daily membership contents (aligned with operator AI pipeline).
 */
export function DailyInsideSection() {
  return (
    <section
      id="inside-daily"
      className="relative overflow-hidden border-t border-sky-100/80 bg-transparent px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
      aria-labelledby="inside-daily-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(14,165,233,0.12),transparent_55%),radial-gradient(ellipse_45%_40%_at_100%_80%,rgba(255,106,0,0.08),transparent_50%)]" />

      <div className="relative mx-auto w-full max-w-3xl lg:max-w-5xl xl:max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="max-w-3xl"
        >
          <p className={`text-[10px] font-black uppercase tracking-[0.22em] text-[#ff6a00] ${jakartaSans.className}`}>
            Inside the daily
          </p>
          <h2
            id="inside-daily-heading"
            className={`mt-3 text-[2rem] font-semibold leading-[1.05] tracking-[-0.035em] text-slate-900 sm:text-4xl lg:text-[2.85rem] ${fredokaHeadline.className}`}
          >
            What members get{" "}
            <span className="text-sky-500">every day</span>
          </h2>
          <p
            className={`ss-institutional mt-4 max-w-2xl text-[1.05rem] font-normal leading-[1.7] text-slate-600 sm:text-lg ${institutionalSerif.className}`}
          >
            A tight, same-shape email from our student-led desk. Built to skim in two minutes, then give your high
            schooler one move that keeps them ahead on AI in school.
          </p>
        </motion.div>

        <ol className="mt-10 space-y-4 sm:mt-12">
          {dayParts.map((part, index) => {
            const Icon = part.icon;
            return (
              <motion.li
                key={part.label}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                whileHover={{ y: -2 }}
                className="flex flex-col gap-4 rounded-[1.75rem] border border-sky-100/90 bg-white/90 p-5 shadow-[0_18px_40px_-34px_rgba(15,23,42,0.3)] sm:flex-row sm:items-start sm:gap-6 sm:p-6"
              >
                <div className="flex items-center gap-3 sm:w-44 sm:shrink-0 sm:flex-col sm:items-start sm:gap-2">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-100 text-sky-700">
                    <Icon className="h-5 w-5" strokeWidth={2.25} aria-hidden />
                  </div>
                  <p className={`text-[10px] font-black uppercase tracking-[0.16em] text-sky-600 ${jakartaSans.className}`}>
                    {String(index + 1).padStart(2, "0")} · {part.label}
                  </p>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className={`text-xl font-semibold tracking-[-0.02em] text-slate-900 ${fredokaHeadline.className}`}>
                    {part.title}
                  </h3>
                  <p className={`mt-2 text-sm font-medium leading-relaxed text-slate-600 sm:text-[0.95rem] ${jakartaSans.className}`}>
                    {part.body}
                  </p>
                </div>
              </motion.li>
            );
          })}
        </ol>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className={`mt-8 flex items-center gap-2 text-sm font-medium text-slate-500 ${jakartaSans.className}`}
        >
          <CalendarDays className="h-4 w-4 text-[#ff6a00]" aria-hidden />
          Same format daily. Fresh signal and toolkit each send. Membership unlocks the full desk.
        </motion.p>
      </div>
    </section>
  );
}
