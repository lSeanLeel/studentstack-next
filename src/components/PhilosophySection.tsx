"use client";

import React from "react";
import { motion } from "motion/react";
import { Compass, GraduationCap, Layers3 } from "lucide-react";
import { fredokaHeadline, jakartaSans, institutionalSerif } from "@/app/fonts";

const tenets = [
  {
    icon: GraduationCap,
    title: "Still in the work",
    body: "Guidance from students who live campus pressure now, not a corporate curriculum written from outside the classroom.",
  },
  {
    icon: Layers3,
    title: "Organization before tools",
    body: "The edge is a cleaner school week: systems for deadlines, planning, and notes. AI is the accelerator, never the point.",
  },
  {
    icon: Compass,
    title: "Parents guide. Students own it.",
    body: "We educate parents so they can spot the right habits, then hand one concrete move to their high schooler.",
  },
] as const;

/**
 * Institutional trust via student-led philosophy, no product/upsell naming.
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
            The edge of a{" "}
            <span className="text-sky-500">student-led</span> team
          </h2>
          <p
            className={`ss-institutional mt-5 max-w-2xl text-[1.05rem] font-normal leading-[1.7] text-slate-600 sm:text-lg ${institutionalSerif.className}`}
          >
            Free daily for parents. Certifications for students who want a credentialed AI-in-school pathway. Same
            campus judgment underneath both.
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
