"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { jakartaSans, fredokaHeadline } from "@/app/fonts";
import { ChevronDown } from "lucide-react";

const featuredColleges = [
  { name: "UC Berkeley", color: "#1d4ed8" },
  { name: "Carnegie Mellon", color: "#b91c1c" },
  { name: "Georgia Tech", color: "#a16207" },
  { name: "Cornell", color: "#991b1b" },
  { name: "Northwestern", color: "#6d28d9" },
  { name: "NYU", color: "#7c3aed" },
  { name: "USC", color: "#be123c" },
  { name: "UT Austin", color: "#c2410c" },
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
    <div className="relative flex h-24 items-center justify-center sm:h-28">
      <AnimatePresence mode="wait">
        <motion.span
          key={current.name}
          initial={{ opacity: 0, y: 14, scale: 0.88 }}
          animate={{ opacity: 1, y: 0, scale: [0.9, 1.12, 1.02, 1] }}
          exit={{ opacity: 0, y: -12, scale: 1.03 }}
          transition={{ duration: 0.62, ease: [0.2, 0.8, 0.2, 1] }}
          className={`inline-flex items-center px-2 py-1 text-[clamp(1.8rem,4vw+0.6rem,3.65rem)] font-semibold tracking-[-0.03em] ${fredokaHeadline.className}`}
          style={{ color: current.color }}
        >
          {current.name}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

const WordReveal = ({
  text,
  delay = 0,
  className = "",
}: {
  text: string;
  delay?: number;
  className?: string;
}) => {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden py-1">
          <motion.span
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.8,
              delay: delay + i * 0.08,
              ease: [0.23, 1, 0.32, 1],
            }}
            className="mr-[0.25em] inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
};

export function HeroSection() {
  return (
    <section className="relative isolate min-h-[100dvh] min-h-screen w-full max-w-none overflow-x-hidden bg-gradient-to-b from-white via-sky-50/40 to-violet-50/50 px-4 pb-16 pt-24 sm:px-6 sm:pb-20 sm:pt-28">
      <div className="relative z-10 mx-auto flex min-h-[calc(100dvh-6rem)] w-full max-w-[80rem] flex-col justify-center sm:min-h-[calc(100dvh-7rem)]">
        <div className="flex w-full min-w-0 flex-col items-stretch text-center">
          <div className="relative mb-14 max-w-6xl lg:mb-16">
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.45 }}
              className={`mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-sky-200/80 bg-white/90 px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-sky-700 shadow-sm ${jakartaSans.className}`}
            >
              <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden />
              100% free, weekly email
            </motion.p>
            <h1 className="mx-auto w-full max-w-6xl text-[clamp(2rem,5.8vw+0.45rem,5.3rem)] leading-[0.9] tracking-[-0.04em] text-slate-900 sm:text-7xl lg:text-8xl">
              <span className={`${fredokaHeadline.className} font-semibold`}>
                <WordReveal text="Learn AI from" delay={0.2} />
              </span>
              <div className="h-2 sm:h-4" />
              <CyclingColleges />
              <div className="h-2 sm:h-4" />
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className={`relative inline-block text-slate-900 ${fredokaHeadline.className} font-semibold`}
              >
                students
              </motion.span>
            </h1>
          </div>

          <div id="hero-cta" className="mx-auto mt-6 flex w-full max-w-4xl flex-col items-center scroll-mt-28 sm:mt-8">
            <motion.button
              type="button"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => document.getElementById("weekly-email")?.scrollIntoView({ behavior: "smooth" })}
              className="group max-w-full text-center"
              aria-label="Scroll to what we send every week"
            >
              <motion.span
                className={`inline-flex max-w-full flex-wrap items-center justify-center gap-x-1.5 gap-y-0.5 text-lg font-bold tracking-tight text-sky-700 underline-offset-[0.22em] transition-colors group-hover:text-sky-600 sm:text-xl ${jakartaSans.className}`}
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 1.35, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="group-hover:underline">What we send you every week</span>
                <ChevronDown
                  className="h-[1em] w-[1em] shrink-0 translate-y-[0.06em]"
                  strokeWidth={2.75}
                  aria-hidden
                />
              </motion.span>
            </motion.button>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 sm:bottom-10"
      >
        <div className="h-12 w-px bg-gradient-to-b from-slate-200 to-transparent" />
      </motion.div>
    </section>
  );
}
