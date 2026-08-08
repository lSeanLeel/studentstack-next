"use client";

import React from "react";
import { motion } from "motion/react";
import { fredokaHeadline, jakartaSans } from "@/app/fonts";

const beats = [
  {
    num: "01",
    title: "Built by students still in class",
    body: "StudentStack is run by college students — not a distant content team. We write from the same pressure, deadlines, and tools high schoolers are about to face.",
  },
  {
    num: "02",
    title: "What we use, we share",
    body: "Every week we see classmates pull ahead with AI in lectures, labs, and applications. We turn those habits into a free email parents can actually pass on.",
  },
  {
    num: "03",
    title: "For the kids coming up behind us",
    body: "Schools move slowly. We don’t. Our job is to get the next generation fluent early — so high schoolers aren’t catching up when college starts.",
  },
] as const;

export function DifferenceSection() {
  return (
    <section
      id="why-us"
      className="relative overflow-hidden border-t border-sky-100/80 bg-transparent px-4 py-16 sm:px-6 sm:py-22 lg:px-8 lg:py-24"
      aria-labelledby="why-us-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_0%_0%,rgba(125,211,252,0.2),transparent_55%),radial-gradient(ellipse_55%_45%_at_100%_100%,rgba(253,224,71,0.14),transparent_50%)]" />
      <div className="pointer-events-none absolute -left-24 top-24 h-56 w-56 rounded-full bg-sky-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-10 h-48 w-48 rounded-full bg-amber-200/35 blur-3xl" />

      <div className="relative mx-auto grid w-full max-w-3xl gap-12 lg:max-w-5xl lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:items-start lg:gap-16 xl:max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="lg:sticky lg:top-32"
        >
          <h2
            id="why-us-heading"
            className={`text-[1.85rem] font-semibold leading-[1.08] tracking-[-0.035em] text-slate-900 sm:text-4xl lg:text-[2.65rem] ${fredokaHeadline.className}`}
          >
            A{" "}
            <span className="font-bold text-sky-500">student</span>
            -run org helping high schoolers{" "}
            <span className="font-semibold text-amber-500">stay ahead with AI</span>
          </h2>
          <p
            className={`mt-5 max-w-md text-base font-medium leading-relaxed text-slate-600 sm:text-lg ${jakartaSans.className}`}
          >
            Advice for school ages out fast. We&apos;re still living it — so families get what&apos;s working{" "}
            <em className="not-italic font-semibold text-slate-800">right now</em>, not a recycled tip sheet.
          </p>
        </motion.div>

        <div className="relative">
          <div
            className="pointer-events-none absolute bottom-3 left-[1.15rem] top-3 w-px bg-gradient-to-b from-sky-300 via-amber-300 to-emerald-300 sm:left-[1.35rem]"
            aria-hidden
          />

          <ol className="relative space-y-0">
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
