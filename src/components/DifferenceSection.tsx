"use client";

import React from "react";
import { motion } from "motion/react";
import { GraduationCap, Lightbulb, Rocket } from "lucide-react";
import { fredokaHeadline, jakartaSans } from "@/app/fonts";

const pillars = [
  {
    icon: GraduationCap,
    title: "Student-run, not adult-advised",
    body: "StudentStack is built and written by college students who are living the AI shift in real classes — not a generic edtech playbook rewritten for parents.",
  },
  {
    icon: Lightbulb,
    title: "Our thesis",
    body: "As students, we see every week how AI helps peers stay ahead in school. The families who learn those habits early give their high schoolers a real edge — academically and for what comes next.",
  },
  {
    icon: Rocket,
    title: "Pushing the next generation",
    body: "We’re not waiting for schools to catch up. We turn what works for us into a free daily email so more high schoolers grow up fluent in the tools shaping their future.",
  },
] as const;

export function DifferenceSection() {
  return (
    <section
      id="why-us"
      className="relative overflow-hidden border-t border-sky-100/80 bg-transparent px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
      aria-labelledby="why-us-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_20%_10%,rgba(125,211,252,0.18),transparent_55%),radial-gradient(ellipse_60%_40%_at_90%_80%,rgba(167,243,208,0.16),transparent_50%)]" />

      <div className="relative mx-auto w-full max-w-3xl lg:max-w-4xl xl:max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="max-w-3xl"
        >
          <p className={`text-[10px] font-black uppercase tracking-[0.22em] text-sky-600 ${jakartaSans.className}`}>
            How we’re different
          </p>
          <h2
            id="why-us-heading"
            className={`mt-2.5 text-[1.65rem] font-semibold tracking-[-0.03em] text-slate-900 sm:text-3xl lg:text-[2.35rem] lg:leading-[1.12] ${fredokaHeadline.className}`}
          >
            A student-run org helping high schoolers{" "}
            <span className="text-sky-500">stay ahead with AI</span>
          </h2>
          <p
            className={`mt-4 max-w-2xl text-base font-medium leading-relaxed text-slate-600 sm:mt-5 sm:text-lg ${jakartaSans.className}`}
          >
            Most AI advice for school is written by people who left the classroom years ago. We&apos;re still in it —
            so we know what actually helps students keep up, and what&apos;s just noise.
          </p>
        </motion.div>

        <div className="mt-10 space-y-8 sm:mt-12 sm:space-y-10">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className="flex gap-4 sm:gap-5"
              >
                <div className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-sky-200/80 bg-white text-sky-600 shadow-[0_10px_0_0_rgba(14,165,233,0.1)] sm:h-12 sm:w-12">
                  <Icon className="h-5 w-5 sm:h-[1.35rem] sm:w-[1.35rem]" aria-hidden />
                </div>
                <div className="min-w-0 text-left">
                  <h3
                    className={`text-lg font-semibold tracking-[-0.02em] text-slate-900 sm:text-xl ${fredokaHeadline.className}`}
                  >
                    {pillar.title}
                  </h3>
                  <p className={`mt-1.5 text-sm font-medium leading-relaxed text-slate-600 sm:text-base ${jakartaSans.className}`}>
                    {pillar.body}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
