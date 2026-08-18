"use client";

import React from "react";
import { motion } from "motion/react";
import { Compass, GraduationCap, Sparkles } from "lucide-react";
import { fredokaHeadline, jakartaSans, institutionalSerif } from "@/app/fonts";

const tenets = [
  {
    icon: GraduationCap,
    title: "Still in the rooms that matter",
    body: "We are current college students at campuses parents already take seriously. The habits we talk about are the ones next to us in lecture, not a curriculum written from outside school.",
  },
  {
    icon: Sparkles,
    title: "AI the way students actually use it",
    body: "High school already runs on AI, whether families planned for that or not. The edge is judgment: what to use, what to ignore, and how to stay honest in class. We stay close to that shift because we live it.",
  },
  {
    icon: Compass,
    title: "A student-native org, not a tutoring shop",
    body: "Parents get us in the loop. High schoolers do the work. We push members toward programs, tools, and credentials worth completing. That is a different kind of help than sitting beside one student on one assignment.",
  },
] as const;

/**
 * Why StudentStack: AI thesis + student-native org, for parents.
 */
export function PhilosophySection() {
  return (
    <section
      id="philosophy"
      className="relative overflow-hidden border-t border-slate-100 bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
      aria-labelledby="philosophy-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_100%_0%,rgba(14,165,233,0.08),transparent_55%),radial-gradient(ellipse_50%_40%_at_0%_100%,rgba(255,106,0,0.06),transparent_50%)]" />

      <div className="relative mx-auto w-full max-w-3xl lg:max-w-5xl xl:max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <p className={`text-[10px] font-black uppercase tracking-[0.22em] text-[#ff6a00] ${jakartaSans.className}`}>
            Why StudentStack
          </p>
          <h2
            id="philosophy-heading"
            className={`mt-3 text-[2rem] font-semibold leading-[1.05] tracking-[-0.04em] text-slate-900 sm:text-5xl lg:text-[3.1rem] ${fredokaHeadline.className}`}
          >
            The advantage of a{" "}
            <span className="text-sky-500">student-led</span> desk
          </h2>
          <p
            className={`ss-institutional mt-5 max-w-2xl text-[1.05rem] font-normal leading-[1.7] text-slate-600 sm:text-lg ${institutionalSerif.className}`}
          >
            AI is already inside the high school week. Most families only see the loud version. We see the version
            sitting in college classrooms: students who stay organized, disclose when they should, and use new tools
            without handing over the work. That is the thesis we organize around, and why a student-native org can move
            faster than something built far from campus.
          </p>
        </motion.div>

        <ul className="mt-12 grid gap-6 sm:grid-cols-3 sm:gap-5">
          {tenets.map((tenet, index) => {
            const Icon = tenet.icon;
            return (
              <motion.li
                key={tenet.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.45, delay: index * 0.07 }}
                className="rounded-[1.75rem] border border-slate-100 bg-[#f8fafc] p-6"
              >
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-100 text-sky-700">
                  <Icon className="h-5 w-5" strokeWidth={2.25} aria-hidden />
                </div>
                <h3 className={`mt-4 text-lg font-semibold tracking-[-0.02em] text-slate-900 ${fredokaHeadline.className}`}>
                  {tenet.title}
                </h3>
                <p className={`mt-2 text-sm font-medium leading-relaxed text-slate-600 ${jakartaSans.className}`}>
                  {tenet.body}
                </p>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
