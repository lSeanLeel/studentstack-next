"use client";

import React from "react";
import { motion } from "motion/react";
import { Newspaper, Radar, Sparkles } from "lucide-react";
import { fredokaHeadline, jakartaSans } from "@/app/fonts";

const pulses = [
  {
    icon: Radar,
    title: "Stay current",
    line: "A short daily on AI in school, without the doomscroll.",
  },
  {
    icon: Newspaper,
    title: "Parent-ready",
    line: "Written so you can skim, then forward one move to your student.",
  },
  {
    icon: Sparkles,
    title: "Student-led",
    line: "Shaped by people still living campus tools and classroom norms.",
  },
] as const;

/**
 * Vague newsletter strip for social traffic who already know the pitch.
 */
export function NewsletterPulseSection() {
  return (
    <section
      id="newsletter"
      className="relative overflow-hidden border-t border-sky-100/80 bg-transparent px-4 py-12 sm:px-6 sm:py-14 lg:px-8"
      aria-labelledby="newsletter-pulse-heading"
    >
      <div className="relative mx-auto w-full max-w-3xl lg:max-w-5xl xl:max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
        >
          <div className="max-w-xl">
            <p className={`text-[10px] font-black uppercase tracking-[0.22em] text-[#ff6a00] ${jakartaSans.className}`}>
              Free daily
            </p>
            <h2
              id="newsletter-pulse-heading"
              className={`mt-2 text-[1.65rem] font-semibold leading-[1.1] tracking-[-0.03em] text-slate-900 sm:text-3xl ${fredokaHeadline.className}`}
            >
              The newsletter keeps you from falling behind
            </h2>
            <p className={`mt-2 text-sm font-medium leading-relaxed text-slate-600 sm:text-base ${jakartaSans.className}`}>
              You already know AI is moving. We keep the signal short so you stay educated with other parents, not buried
              in another feed.
            </p>
          </div>
          <a
            href="#hero-cta"
            className={`inline-flex items-center justify-center rounded-2xl border-2 border-sky-200 bg-white px-4 py-2.5 text-xs font-black uppercase tracking-[0.14em] text-sky-700 shadow-[0_10px_24px_-18px_rgba(14,165,233,0.5)] transition hover:-translate-y-0.5 hover:border-sky-300 ${jakartaSans.className}`}
          >
            Join free
          </a>
        </motion.div>

        <ul className="mt-8 grid gap-3 sm:grid-cols-3 sm:gap-4">
          {pulses.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.li
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                className="rounded-[1.5rem] border border-sky-100/80 bg-white/80 px-4 py-4"
              >
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-sky-100 text-sky-700">
                  <Icon className="h-4 w-4" strokeWidth={2.25} aria-hidden />
                </div>
                <h3 className={`mt-3 text-base font-semibold text-slate-900 ${fredokaHeadline.className}`}>
                  {item.title}
                </h3>
                <p className={`mt-1 text-sm font-medium leading-snug text-slate-600 ${jakartaSans.className}`}>
                  {item.line}
                </p>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
