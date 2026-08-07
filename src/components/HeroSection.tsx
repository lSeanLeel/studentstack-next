"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight } from "lucide-react";
import { jakartaSans, fredokaHeadline } from "@/app/fonts";
import { useOnboarding } from "@/components/onboarding-context";

/** Order alternates cool (blue) and warm (orange / crimson) so similar reds never sit back-to-back. */
const featuredColleges = [
  { name: "UCLA", color: "#2774AE" },
  { name: "Princeton", color: "#E77500" },
  { name: "Columbia", color: "#003DA5" },
  { name: "Stanford", color: "#8C1515" },
  { name: "Caltech", color: "#FF6C0C" },
  { name: "Berkeley", color: "#003262" },
  { name: "Harvard", color: "#A51C30" },
  { name: "Yale", color: "#00356B" },
  { name: "MIT", color: "#A31F34" },
];

function CyclingColleges() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredColleges.length);
    }, 4200);
    return () => clearInterval(interval);
  }, []);

  const current = featuredColleges[currentIndex];

  return (
    <span className="relative inline-flex h-[1.15em] min-w-[4.5ch] items-baseline justify-center align-baseline sm:min-w-[5.5ch]">
      <AnimatePresence mode="wait">
        <motion.span
          key={current.name}
          initial={{ opacity: 0, y: 18, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: [0.92, 1.08, 1] }}
          exit={{ opacity: 0, y: -14, scale: 1.02 }}
          transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
          className="absolute inset-x-0 top-0 text-center"
          style={{ color: current.color }}
        >
          {current.name}
        </motion.span>
      </AnimatePresence>
      <span className="invisible" aria-hidden>
        Stanford
      </span>
    </span>
  );
}

/** Full-bleed product plane: oversized weekly-email mock as atmosphere, not a floating card. */
function HeroEmailPlane() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_-10%,#bae6fd_0%,transparent_55%),radial-gradient(ellipse_60%_50%_at_100%_40%,#a5f3fc_0%,transparent_50%),radial-gradient(ellipse_55%_45%_at_0%_70%,#fde68a_0%,transparent_45%),linear-gradient(180deg,#f0f9ff_0%,#ffffff_48%,#ecfeff_100%)]" />
      <div className="absolute inset-0 opacity-[0.35] [background-image:radial-gradient(rgba(14,165,233,0.18)_1px,transparent_1px)] [background-size:22px_22px]" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-1/2 top-[42%] w-[min(140vw,72rem)] -translate-x-1/2 sm:top-[38%]"
      >
        <div className="mx-auto origin-top scale-[1.05] rotate-[-1.5deg] opacity-70 blur-[0.2px] sm:scale-100">
          <div className="rounded-t-[2.5rem] border border-sky-200/60 bg-white/70 px-6 pb-24 pt-5 shadow-[0_40px_100px_-40px_rgba(14,165,233,0.45)] backdrop-blur-sm sm:px-10 sm:pt-7">
            <div className="mb-6 flex items-center gap-2 border-b border-sky-100/80 pb-4">
              <span className="h-2.5 w-2.5 rounded-full bg-sky-300" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
              <span className={`ml-3 text-[11px] font-bold uppercase tracking-[0.18em] text-sky-700/80 ${jakartaSans.className}`}>
                Sunday · StudentStack Weekly
              </span>
            </div>
            <div className="space-y-4">
              <div className="h-4 w-2/5 rounded-full bg-sky-200/70" />
              <div className="h-8 w-4/5 rounded-2xl bg-slate-200/80" />
              <div className="h-3 w-full rounded-full bg-slate-100" />
              <div className="h-3 w-[92%] rounded-full bg-slate-100" />
              <div className="mt-6 grid grid-cols-3 gap-3">
                <div className="h-28 rounded-[1.5rem] bg-sky-100/90" />
                <div className="h-28 rounded-[1.5rem] bg-emerald-100/90" />
                <div className="h-28 rounded-[1.5rem] bg-amber-100/80" />
              </div>
              <div className="mt-4 h-3 w-3/4 rounded-full bg-slate-100" />
              <div className="h-3 w-2/3 rounded-full bg-slate-100" />
            </div>
          </div>
        </div>
      </motion.div>

      <div className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-white via-white/90 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/80 to-transparent" />
    </div>
  );
}

export function HeroSection() {
  const { openOnboarding } = useOnboarding();

  return (
    <section className="relative isolate min-h-[100dvh] min-h-screen w-full overflow-hidden px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-32">
      <HeroEmailPlane />

      <div className="relative z-10 mx-auto flex min-h-[calc(100dvh-5.5rem)] w-full max-w-[80rem] flex-col items-center justify-center text-center sm:min-h-[calc(100dvh-6.5rem)]">
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
              animate={{
                opacity: 1,
                y: 0,
                rotate: [-8, 4, -1.5, 0],
                scale: [0.85, 1.1, 0.98, 1],
              }}
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
          className={`${fredokaHeadline.className} mt-6 max-w-4xl text-[clamp(1.35rem,3.2vw+0.55rem,2.35rem)] font-semibold leading-[1.15] tracking-[-0.03em] text-slate-800 sm:mt-8`}
        >
          Learn AI from <CyclingColleges /> students
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.55 }}
          className={`${jakartaSans.className} mx-auto mt-5 max-w-xl text-base font-medium leading-relaxed text-slate-600 sm:mt-6 sm:text-lg`}
        >
          A free weekly email for parents of high schoolers — AI tools, study workflows, and honest takes from the college students who actually use them.
        </motion.p>

        <motion.div
          id="hero-cta"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 flex w-full max-w-md flex-col items-center gap-3 sm:mt-10 sm:max-w-none sm:flex-row sm:justify-center sm:gap-4"
        >
          <motion.button
            type="button"
            onClick={() => openOnboarding()}
            whileHover={{ y: -3, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`${jakartaSans.className} inline-flex w-full items-center justify-center gap-2 rounded-[1.35rem] bg-slate-900 px-7 py-4 text-sm font-black uppercase tracking-[0.14em] text-white shadow-[0_16px_0_0_rgba(15,23,42,0.12)] transition-colors hover:bg-slate-800 sm:w-auto sm:px-9 sm:py-4 sm:text-[0.8125rem]`}
          >
            Get the free email
            <ArrowRight className="h-4 w-4" aria-hidden />
          </motion.button>
          <motion.a
            href="#weekly-email"
            whileHover={{ y: -2 }}
            className={`${jakartaSans.className} inline-flex w-full items-center justify-center rounded-[1.35rem] border-2 border-sky-200 bg-white/80 px-7 py-4 text-sm font-bold text-sky-800 backdrop-blur-sm transition-colors hover:border-sky-300 hover:bg-sky-50 sm:w-auto sm:px-8 sm:text-[0.8125rem]`}
          >
            See what&apos;s inside
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
