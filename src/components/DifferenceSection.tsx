"use client";

import React from "react";
import { motion } from "motion/react";
import { fredokaHeadline, jakartaSans } from "@/app/fonts";

const beats = [
  {
    num: "01",
    title: "Education first for parents",
    body: "Our free daily newsletter teaches how high schoolers can use AI to stay organized for school, without the hype cycle.",
  },
  {
    num: "02",
    title: "Then a direct Edge for students",
    body: "Elite is the subscription path: your student logs into a living portal of school-category tool postings, built by people still in their shoes.",
  },
  {
    num: "03",
    title: "Credible, current, student-led",
    body: "We keep the guidance practical and educational. Other parents already use both the free email and the Elite subscription to stay a step ahead.",
  },
] as const;

export function DifferenceSection() {
  return (
    <section
      id="why-us"
      className="relative overflow-hidden border-t border-slate-100 bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
      aria-labelledby="why-us-heading"
    >
      <div className="relative mx-auto w-full max-w-3xl lg:max-w-5xl xl:max-w-6xl">
        <motion.h2
          id="why-us-heading"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className={`max-w-3xl text-[2rem] font-semibold leading-[1.05] tracking-[-0.04em] text-slate-900 sm:text-5xl lg:text-[3.25rem] ${fredokaHeadline.className}`}
        >
          Stay ahead with{" "}
          <span className="text-[#ff6a00]">AI</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className={`mt-4 max-w-2xl text-base font-medium leading-relaxed text-slate-600 sm:text-lg ${jakartaSans.className}`}
        >
          Lead with learning. Offer the Edge when a family is ready.
        </motion.p>

        <div className="relative mt-10 sm:mt-12 lg:mt-14">
          <div
            className="pointer-events-none absolute bottom-3 left-[1.15rem] top-3 w-px bg-gradient-to-b from-sky-300 via-orange-300 to-emerald-300 sm:left-[1.35rem]"
            aria-hidden
          />

          <ol className="relative max-w-2xl space-y-0">
            {beats.map((beat, index) => (
              <motion.li
                key={beat.num}
                initial={{ opacity: 0, x: 18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.45, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="relative grid grid-cols-[auto_1fr] gap-4 py-5 first:pt-0 last:pb-0 sm:gap-5 sm:py-6"
              >
                <span
                  className={`relative z-10 flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-sky-400 to-sky-500 text-[11px] font-black tracking-wide text-white shadow-[0_8px_0_0_rgba(14,165,233,0.2)] sm:h-11 sm:w-11 sm:text-xs ${jakartaSans.className}`}
                  aria-hidden
                >
                  {beat.num}
                </span>
                <div className="min-w-0 pt-0.5 sm:pt-1">
                  <h3
                    className={`text-lg font-semibold tracking-[-0.02em] text-slate-900 sm:text-xl ${fredokaHeadline.className}`}
                  >
                    {beat.title}
                  </h3>
                  <p
                    className={`mt-1.5 text-sm font-medium leading-relaxed text-slate-600 sm:text-[0.95rem] ${jakartaSans.className}`}
                  >
                    {beat.body}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
