"use client";

import React from "react";
import { motion } from "motion/react";
import { jakartaSans, fredokaHeadline } from "@/app/fonts";
import { PARENT_ORIGIN_STORY, PARENT_ORIGIN_TIMELINE } from "@/lib/landing/ai-for-school";

export function ParentReachSection() {
  return (
    <section
      id="our-story"
      className="relative overflow-hidden border-t border-sky-100 px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
      aria-labelledby="parent-reach-heading"
      style={{
        backgroundImage:
          "radial-gradient(ellipse 80% 55% at 0% 0%, rgba(125,211,252,0.22), transparent 55%), radial-gradient(ellipse 70% 50% at 100% 100%, rgba(253,230,138,0.18), transparent 50%), linear-gradient(180deg, #f8fafc 0%, #ffffff 45%, #f0f9ff 100%)",
      }}
    >
      <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(rgba(14,165,233,0.14)_1px,transparent_1px)] [background-size:18px_18px]" aria-hidden />

      <div className="relative mx-auto max-w-4xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className={`text-[10px] font-black uppercase tracking-[0.22em] text-sky-600 ${jakartaSans.className}`}>
            {PARENT_ORIGIN_STORY.eyebrow}
          </p>
          <h2
            id="parent-reach-heading"
            className={`mt-3 text-[2rem] font-semibold tracking-[-0.035em] text-slate-900 sm:text-4xl ${fredokaHeadline.className}`}
          >
            {PARENT_ORIGIN_STORY.headline}
          </h2>
          <p className={`mt-4 text-base font-medium leading-relaxed text-slate-600 sm:text-lg ${jakartaSans.className}`}>
            {PARENT_ORIGIN_STORY.subhead}
          </p>
        </div>

        <ol className="relative mt-14 sm:mt-16">
          <div
            className="absolute bottom-3 left-[1.125rem] top-3 w-0.5 rounded-full bg-gradient-to-b from-sky-300 via-sky-400 to-emerald-400 sm:left-1/2 sm:-translate-x-1/2"
            aria-hidden
          />

          {PARENT_ORIGIN_TIMELINE.map((milestone, i) => {
            const isEven = i % 2 === 0;
            const isLast = i === PARENT_ORIGIN_TIMELINE.length - 1;

            return (
              <li key={milestone.id} className="relative pb-10 last:pb-0 sm:pb-14">
                <motion.article
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: 0.05 * i, duration: 0.45 }}
                  className={`relative sm:grid sm:grid-cols-2 sm:gap-10 ${isEven ? "" : "sm:[&>div:first-child]:order-2"}`}
                >
                  <div className={`hidden sm:block ${isEven ? "sm:pr-6" : "sm:pl-6"}`} aria-hidden />

                  <div
                    className={`pl-12 sm:pl-0 ${isEven ? "sm:pr-10 sm:text-right" : "sm:pl-10 sm:text-left"}`}
                  >
                    <div
                      className={`rounded-[1.75rem] border-2 border-white bg-white/90 p-5 shadow-[0_14px_0_0_rgba(14,165,233,0.1)] backdrop-blur-sm transition hover:-translate-y-0.5 hover:shadow-[0_18px_0_0_rgba(14,165,233,0.14)] sm:p-6 ${
                        isLast ? "ring-2 ring-sky-200/80" : ""
                      }`}
                    >
                      <p
                        className={`text-[10px] font-black uppercase tracking-[0.2em] text-sky-600 ${jakartaSans.className}`}
                      >
                        <time dateTime={milestone.dateTime}>{milestone.date}</time>
                        <span className="mx-2 text-sky-300" aria-hidden>
                          ·
                        </span>
                        {milestone.era}
                      </p>
                      <h3 className={`mt-2 text-xl font-semibold tracking-[-0.03em] text-slate-900 sm:text-2xl ${fredokaHeadline.className}`}>
                        {milestone.title}
                      </h3>
                      <p className={`mt-3 text-sm font-medium leading-relaxed text-slate-600 sm:text-base ${jakartaSans.className}`}>
                        {milestone.detail}
                      </p>
                    </div>
                  </div>
                </motion.article>

                <motion.span
                  initial={{ scale: 0.6, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.08 * i, type: "spring", stiffness: 320, damping: 22 }}
                  className={`absolute left-3 top-6 z-10 flex h-5 w-5 items-center justify-center rounded-full border-[3px] border-white shadow-[0_4px_12px_rgba(14,165,233,0.35)] sm:left-1/2 sm:top-8 sm:-translate-x-1/2 ${
                    isLast ? "bg-emerald-400" : "bg-sky-400"
                  }`}
                  aria-hidden
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${isLast ? "bg-white" : "bg-sky-100"}`} />
                </motion.span>
              </li>
            );
          })}
        </ol>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`mx-auto mt-12 max-w-xl text-center text-sm font-medium leading-relaxed text-slate-500 sm:text-base ${jakartaSans.className}`}
        >
          {PARENT_ORIGIN_STORY.closing}
        </motion.p>
      </div>
    </section>
  );
}
