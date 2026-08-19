"use client";

import React from "react";
import { motion } from "motion/react";
import { Brain, Compass, GraduationCap } from "lucide-react";
import { fredokaHeadline, jakartaSans } from "@/app/fonts";

const tenets = [
  {
    icon: Brain,
    title: "AI native, not AI scared",
    body: "Your student is already using AI. The question is whether they are using it well. We teach the version that shows up in real classrooms, not the panic version from the news.",
  },
  {
    icon: GraduationCap,
    title: "22-year-olds, on purpose",
    body: "The tools change semester to semester. A student org sees that in real time. By the time a textbook covers it, the classroom has moved on.",
  },
  {
    icon: Compass,
    title: "Access assigned, not cataloged",
    body: "Each member gets a path our desk sets: tools, programs, and credentials we push them to finish. We do not hand over a link dump.",
  },
] as const;

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
            Young enough to <span className="text-sky-500">know the tools.</span>{" "}
            Serious enough to teach them.
          </h2>
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
                whileHover={{ y: -3, scale: 1.01 }}
                className="rounded-[1.75rem] border border-slate-100 bg-[#f8fafc] p-6 transition-shadow hover:shadow-[0_24px_48px_-28px_rgba(15,23,42,0.35)]"
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
