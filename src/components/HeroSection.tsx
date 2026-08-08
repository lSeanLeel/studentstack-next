"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { jakartaSans, fredokaHeadline } from "@/app/fonts";
import { useOnboarding } from "@/components/onboarding-context";

/** Order alternates cool (blue) and warm (orange / crimson) so similar reds never sit back-to-back. */
const featuredColleges = [
  { name: "UCLA", color: "#2774AE", logo: "/colleges/ucla.png", showName: false },
  { name: "Princeton", color: "#E77500", logo: "/colleges/princeton.png", showName: true },
  { name: "Columbia", color: "#003DA5", logo: "/colleges/columbia.png", showName: true },
  { name: "Stanford", color: "#8C1515", logo: "/colleges/stanford.png", showName: true },
  { name: "Caltech", color: "#FF6C0C", logo: "/colleges/caltech.png", showName: true },
  { name: "Berkeley", color: "#003262", logo: "/colleges/berkeley.png", showName: true },
  { name: "Harvard", color: "#A51C30", logo: "/colleges/harvard.png", showName: true },
  { name: "Yale", color: "#00356B", logo: "/colleges/yale.png", showName: true },
] as const;

function preloadCollegeLogos() {
  return Promise.all(
    featuredColleges.map(
      (college) =>
        new Promise<void>((resolve) => {
          const img = new window.Image();
          img.decoding = "async";
          img.onload = () => resolve();
          img.onerror = () => resolve();
          img.src = college.logo;
        })
    )
  );
}

const collegeFlipTransition = {
  duration: 0.55,
  ease: [0.22, 1, 0.36, 1] as const,
};

/** Full “Learn AI from ___ students” line — width flexes with each school; college mark flips in. */
function CollegeHeadline() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [logosReady, setLogosReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    preloadCollegeLogos().then(() => {
      if (!cancelled) setLogosReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!logosReady) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredColleges.length);
    }, 3800);
    return () => clearInterval(interval);
  }, [logosReady]);

  const current = featuredColleges[currentIndex];

  return (
    <motion.span
      layout
      className="inline-flex max-w-full flex-wrap items-center justify-center gap-x-[0.18em] gap-y-1"
      style={{ perspective: 900 }}
      aria-live="polite"
      aria-atomic="true"
    >
      <span className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0" aria-hidden>
        {featuredColleges.map((college) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={college.logo} src={college.logo} alt="" width={64} height={48} loading="eager" decoding="async" />
        ))}
      </span>

      <motion.span layout className="leading-none">
        Learn AI from
      </motion.span>

      <span className="relative inline-flex items-center justify-center [transform-style:preserve-3d]">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={current.name}
            layout
            initial={{ opacity: 0, rotateY: 78, rotateZ: -4, y: 14, scale: 0.82 }}
            animate={{
              opacity: logosReady ? 1 : 0,
              rotateY: 0,
              rotateZ: 0,
              y: 0,
              scale: [0.82, 1.08, 1],
            }}
            exit={{ opacity: 0, rotateY: -78, rotateZ: 4, y: -14, scale: 0.82 }}
            transition={collegeFlipTransition}
            className="inline-flex items-center justify-center gap-[0.16em] whitespace-nowrap will-change-transform"
            style={{ color: current.color, transformOrigin: "center center" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <motion.img
              src={current.logo}
              alt=""
              width={64}
              height={48}
              className={`block w-auto shrink-0 object-contain ${
                current.showName ? "h-[0.78em]" : "h-[0.84em] max-w-[2.5em]"
              }`}
              draggable={false}
              loading="eager"
              decoding="sync"
              initial={{ rotate: -12, scale: 0.7 }}
              animate={{ rotate: [ -12, 8, 0 ], scale: [0.7, 1.12, 1] }}
              transition={{ duration: 0.55, ease: [0.34, 1.4, 0.64, 1] }}
            />
            {current.showName ? <span className="leading-none">{current.name}</span> : null}
          </motion.span>
        </AnimatePresence>
      </span>

      <motion.span layout className="leading-none">
        students
      </motion.span>

      <span className="sr-only">{current.name}</span>
    </motion.span>
  );
}

/** Full-bleed product plane: oversized email mock as atmosphere, not a floating card. */
function HeroEmailPlane() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_-10%,#7dd3fc_0%,transparent_55%),radial-gradient(ellipse_60%_50%_at_100%_30%,#99f6e4_0%,transparent_50%),radial-gradient(ellipse_55%_45%_at_0%_75%,#fde68a_0%,transparent_48%),linear-gradient(180deg,#e0f2fe_0%,#f8fafc_42%,#ecfeff_100%)]" />
      <div className="absolute inset-0 opacity-[0.45] [background-image:radial-gradient(rgba(14,165,233,0.22)_1.2px,transparent_1.2px)] [background-size:20px_20px]" />

      <motion.div
        initial={{ opacity: 0, y: 48 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-1/2 top-[68%] w-[min(150vw,78rem)] -translate-x-1/2 sm:top-[62%]"
      >
        <div className="mx-auto origin-top scale-[1.08] rotate-[-1.25deg] opacity-80 sm:scale-100">
          <div className="rounded-t-[2.75rem] border border-sky-300/70 bg-white/85 px-6 pb-28 pt-5 shadow-[0_48px_120px_-36px_rgba(14,165,233,0.55)] backdrop-blur-md sm:px-12 sm:pt-8">
            <div className="mb-6 flex items-center gap-2 border-b border-sky-100 pb-4">
              <span className="h-2.5 w-2.5 rounded-full bg-sky-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              <span className="ml-3 h-2.5 w-36 rounded-full bg-sky-200/90" />
            </div>
            <div className="space-y-4">
              <div className="h-4 w-2/5 rounded-full bg-sky-300/80" />
              <div className="h-9 w-4/5 rounded-2xl bg-slate-300/70" />
              <div className="h-3.5 w-full rounded-full bg-slate-200/90" />
              <div className="h-3.5 w-[92%] rounded-full bg-slate-200/80" />
              <div className="mt-6 grid grid-cols-3 gap-3 sm:gap-4">
                <div className="h-32 rounded-[1.5rem] bg-sky-200/90 sm:h-36" />
                <div className="h-32 rounded-[1.5rem] bg-emerald-200/90 sm:h-36" />
                <div className="h-32 rounded-[1.5rem] bg-amber-200/85 sm:h-36" />
              </div>
              <div className="mt-4 h-3.5 w-3/4 rounded-full bg-slate-200/80" />
              <div className="h-3.5 w-2/3 rounded-full bg-slate-200/70" />
            </div>
          </div>
        </div>
      </motion.div>

      <div className="absolute inset-x-0 bottom-0 h-[28%] bg-gradient-to-t from-[#f8fafc] via-[#f8fafc]/80 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-[62%] bg-gradient-to-b from-[#e0f2fe] via-[#f0f9ff]/95 to-transparent" />
    </div>
  );
}

export function HeroSection() {
  const { openOnboarding } = useOnboarding();

  return (
    <section className="relative isolate min-h-[100dvh] min-h-screen w-full overflow-hidden px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-32">
      <HeroEmailPlane />

      <div className="relative z-10 mx-auto flex min-h-[calc(100dvh-5.5rem)] w-full max-w-[80rem] -translate-y-6 flex-col items-center justify-center text-center sm:min-h-[calc(100dvh-6.5rem)] sm:-translate-y-10">
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
          className={`${fredokaHeadline.className} mt-6 max-w-4xl text-[clamp(1.35rem,3.2vw+0.55rem,2.35rem)] font-semibold leading-[1.25] tracking-[-0.03em] text-slate-800 sm:mt-8`}
        >
          <CollegeHeadline />
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.55 }}
          className={`${jakartaSans.className} mx-auto mt-5 max-w-2xl text-base font-medium leading-relaxed text-slate-600 sm:mt-6 sm:text-lg`}
        >
          A{" "}
          <span className={`${fredokaHeadline.className} font-semibold text-sky-600`}>free</span>, daily newsletter for
          parents of high schoolers! Sharing how we,{" "}
          <a
            href="#faq-who-writes"
            className={`${fredokaHeadline.className} font-semibold text-slate-900 underline decoration-amber-300/80 underline-offset-[0.18em] transition-colors hover:text-sky-700 hover:decoration-sky-300`}
          >
            real students
          </a>
          , use AI to stay ahead of school!
        </motion.p>

        <motion.div
          id="hero-cta"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 flex w-full max-w-md flex-col items-center gap-3 sm:mt-10"
        >
          {/* Above the button so the email-mock backdrop stays visible below */}
          <p
            className={`${jakartaSans.className} text-center text-[13px] font-medium leading-snug text-slate-600 [text-shadow:0_1px_0_rgba(255,255,255,0.85)] sm:text-sm`}
          >
            Join <span className="font-bold text-sky-700">500+</span> parents helping their high schooler stay ahead
            with AI
          </p>
          <motion.button
            type="button"
            onClick={() => openOnboarding()}
            whileHover={{ y: -2, scale: 1.015 }}
            whileTap={{ scale: 0.985 }}
            className={`${jakartaSans.className} inline-flex w-full items-center justify-center gap-2 rounded-[1.5rem] border border-sky-300/60 bg-gradient-to-b from-sky-500 to-sky-600 px-8 py-4 text-sm font-black uppercase tracking-[0.11em] text-white shadow-[0_14px_0_0_rgba(2,132,199,0.28),0_22px_40px_-18px_rgba(14,165,233,0.55)] transition-colors hover:from-sky-400 hover:to-sky-500 sm:w-auto sm:min-w-[19rem] sm:px-10 sm:text-[0.8125rem]`}
          >
            Get tomorrow&apos;s free email
            <ArrowRight className="h-4 w-4" aria-hidden />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
