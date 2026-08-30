"use client";

import React from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { jakartaSans, fredokaHeadline } from "@/app/fonts";

function HeroBg() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_-10%,#7dd3fc_0%,transparent_55%),radial-gradient(ellipse_60%_50%_at_100%_30%,#99f6e4_0%,transparent_50%),radial-gradient(ellipse_55%_45%_at_0%_75%,#fde68a_0%,transparent_48%),linear-gradient(180deg,#e0f2fe_0%,#f8fafc_42%,#ecfeff_100%)]" />
      <div className="absolute inset-0 opacity-[0.45] [background-image:radial-gradient(rgba(14,165,233,0.22)_1.2px,transparent_1.2px)] [background-size:20px_20px]" />
      <div className="absolute inset-x-0 bottom-0 h-[28%] bg-gradient-to-t from-[#f8fafc] via-[#f8fafc]/80 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-[62%] bg-gradient-to-b from-[#e0f2fe] via-[#f0f9ff]/95 to-transparent" />
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="relative isolate min-h-[100dvh] min-h-screen w-full overflow-hidden px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-32">
      <HeroBg />

      <div className="relative z-10 mx-auto flex min-h-[calc(100dvh-5.5rem)] w-full max-w-[80rem] -translate-y-12 flex-col items-center justify-center text-center sm:min-h-[calc(100dvh-6.5rem)] sm:-translate-y-16">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className={`${fredokaHeadline.className} font-semibold leading-[0.92] tracking-[-0.045em] text-slate-900`}
        >
          <span className="block text-[clamp(3.25rem,12vw+0.4rem,7.5rem)]">
            Student
            <motion.span
              className="inline-block text-sky-500"
              initial={{ opacity: 0, y: -36, rotate: -8, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, rotate: [-8, 4, -1.5, 0], scale: [0.85, 1.1, 0.98, 1] }}
              transition={{ delay: 0.15, duration: 0.9, ease: [0.34, 1.56, 0.64, 1] }}
            >
              Stack
            </motion.span>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className={`${fredokaHeadline.className} mt-5 max-w-4xl text-[clamp(1.25rem,2.8vw+0.5rem,2.1rem)] font-semibold leading-[1.2] tracking-[-0.03em] text-slate-900 sm:mt-6`}
        >
          The AI Advantage for High Schoolers.
          <span className="mt-1 block text-[clamp(1rem,2.2vw+0.35rem,1.65rem)] font-semibold tracking-[-0.02em] text-slate-700">
            Built by top-tier university students.
          </span>
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className={`${jakartaSans.className} mx-auto mt-4 max-w-lg text-[0.95rem] font-semibold leading-snug text-slate-600 sm:mt-5 sm:text-lg`}
        >
          Your student&apos;s peers are already using AI for school. Join the private platform before they pull further ahead.
        </motion.p>

        <motion.div
          id="apply"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.62, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 flex w-full max-w-xl flex-col items-center gap-3 sm:mt-7"
        >
          <a
            href="/join"
            className={`${jakartaSans.className} inline-flex w-full max-w-xs items-center justify-center gap-2 rounded-2xl bg-slate-900 px-6 py-3.5 text-xs font-black uppercase tracking-[0.14em] text-white shadow-[0_14px_28px_-18px_rgba(15,23,42,0.5)] transition hover:-translate-y-0.5 hover:bg-slate-800`}
          >
            Join our Community
            <ArrowRight className="h-4 w-4" aria-hidden />
          </a>
          <a
            href="#faq"
            className={`${jakartaSans.className} text-[12px] font-bold text-slate-500 underline decoration-sky-300/80 underline-offset-[0.18em] transition-colors hover:text-sky-700 sm:text-[13px]`}
          >
            Questions parents ask us
          </a>
        </motion.div>
      </div>
    </section>
  );
}
