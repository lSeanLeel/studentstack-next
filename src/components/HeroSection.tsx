"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
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

/** Soft atmosphere only in the hero readable zone; email mock peeks below the CTA. */
function HeroEmailPlane() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_0%,#bae6fd_0%,transparent_55%),radial-gradient(ellipse_50%_40%_at_100%_20%,#a5f3fc_0%,transparent_50%),radial-gradient(ellipse_45%_35%_at_0%_30%,#fde68a_0%,transparent_45%),linear-gradient(180deg,#e0f2fe_0%,#f8fafc_55%,#ecfeff_100%)]" />
      <div className="absolute inset-0 opacity-[0.28] [background-image:radial-gradient(rgba(14,165,233,0.2)_1px,transparent_1px)] [background-size:22px_22px]" />

      {/* Email mock stays under the fold so it never competes with the CTA */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-1/2 top-[88%] w-[min(140vw,70rem)] -translate-x-1/2 sm:top-[86%]"
      >
        <div className="mx-auto origin-top scale-105 rotate-[-1deg] opacity-55 sm:scale-100">
          <div className="rounded-t-[2.5rem] border border-sky-200/50 bg-white/70 px-6 pb-20 pt-4 backdrop-blur-sm sm:px-10">
            <div className="mb-4 flex items-center gap-2 border-b border-sky-100/80 pb-3">
              <span className="h-2 w-2 rounded-full bg-sky-300" />
              <span className="h-2 w-2 rounded-full bg-amber-300" />
              <span className="h-2 w-2 rounded-full bg-emerald-300" />
              <span className="ml-2 h-2 w-28 rounded-full bg-sky-100" />
            </div>
            <div className="space-y-3">
              <div className="h-3 w-1/3 rounded-full bg-sky-200/70" />
              <div className="h-7 w-2/3 rounded-2xl bg-slate-200/60" />
              <div className="grid grid-cols-3 gap-2 pt-2">
                <div className="h-16 rounded-2xl bg-sky-100/80" />
                <div className="h-16 rounded-2xl bg-emerald-100/80" />
                <div className="h-16 rounded-2xl bg-amber-100/70" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Solid readable band behind brand + CTA */}
      <div className="absolute inset-x-0 top-0 h-[78%] bg-gradient-to-b from-[#e0f2fe] via-[#f0f9ff]/97 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-[#f8fafc] via-[#f8fafc]/70 to-transparent" />
    </div>
  );
}

export function HeroSection() {
  const { openOnboarding } = useOnboarding();

  return (
    <section className="relative isolate min-h-[100dvh] min-h-screen w-full overflow-hidden px-4 pb-28 pt-28 sm:px-6 sm:pb-32 sm:pt-32">
      <HeroEmailPlane />

      {/* Top-weighted composition keeps CTA above the decorative email edge */}
      <div className="relative z-10 mx-auto flex w-full max-w-[80rem] flex-col items-center pt-6 text-center sm:pt-10 md:pt-14">
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
          className={`${jakartaSans.className} mx-auto mt-5 max-w-xl text-base font-medium leading-relaxed text-slate-600 sm:mt-6 sm:text-lg`}
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
          className="relative z-20 mt-8 w-full max-w-md sm:mt-10"
        >
          <div className="rounded-[2rem] border border-white/80 bg-white/80 px-5 py-5 shadow-[0_20px_50px_-28px_rgba(14,165,233,0.45)] backdrop-blur-xl sm:px-7 sm:py-6">
            <motion.button
              type="button"
              onClick={() => openOnboarding()}
              whileHover={{ y: -2, scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
              className={`${jakartaSans.className} inline-flex w-full items-center justify-center gap-2 rounded-[1.35rem] bg-slate-900 px-6 py-4 text-sm font-black uppercase tracking-[0.12em] text-white shadow-[0_12px_0_0_rgba(15,23,42,0.14)] transition-colors hover:bg-slate-800 sm:text-[0.8125rem]`}
            >
              Get tomorrow&apos;s free email
              <ArrowRight className="h-4 w-4" aria-hidden />
            </motion.button>
            <p
              className={`${jakartaSans.className} mt-3.5 flex items-center justify-center gap-1.5 text-center text-[13px] font-medium leading-snug text-slate-500 sm:text-sm`}
            >
              <Sparkles className="h-3.5 w-3.5 shrink-0 text-sky-500" aria-hidden />
              <span>
                Trusted by <span className="font-bold text-slate-700">500+</span> parents keeping kids ahead with AI
              </span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
