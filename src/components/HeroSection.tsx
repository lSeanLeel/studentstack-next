"use client";

import React from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { jakartaSans, fredokaHeadline, institutionalSerif } from "@/app/fonts";

const trustColleges = [
  { name: "UCLA", logo: "/colleges/ucla.png" },
  { name: "Princeton", logo: "/colleges/princeton.png" },
  { name: "Columbia", logo: "/colleges/columbia.png" },
  { name: "Stanford", logo: "/colleges/stanford.png" },
  { name: "Berkeley", logo: "/colleges/berkeley.png" },
] as const;

function HeroBg() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-[linear-gradient(165deg,#0b1220_0%,#132337_42%,#1a3350_72%,#243b55_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_-5%,rgba(56,189,248,0.22),transparent_58%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_45%_40%_at_100%_80%,rgba(16,185,129,0.12),transparent_50%)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#f8fafc] to-transparent" />
      <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.55)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.55)_1px,transparent_1px)] [background-size:72px_72px]" />
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="relative isolate min-h-[100dvh] min-h-screen w-full overflow-hidden px-4 pb-20 pt-28 sm:px-6 sm:pb-24 sm:pt-32">
      <HeroBg />

      <div className="relative z-10 mx-auto flex min-h-[calc(100dvh-5.5rem)] w-full max-w-4xl flex-col items-center justify-center text-center sm:min-h-[calc(100dvh-6.5rem)]">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className={`${jakartaSans.className} text-[11px] font-bold uppercase tracking-[0.28em] text-sky-200/90`}
        >
          For families
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className={`${fredokaHeadline.className} mt-5 font-semibold leading-[0.94] tracking-[-0.045em] text-white`}
        >
          <span className="block text-[clamp(3.1rem,11vw+0.35rem,6.75rem)]">
            Student
            <span className="text-sky-300">Stack</span>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.55 }}
          className={`${institutionalSerif.className} ss-institutional mx-auto mt-6 max-w-2xl text-[1.2rem] font-medium leading-[1.45] tracking-[-0.02em] text-slate-100 sm:text-[1.45rem]`}
        >
          Helping families stay ahead with practical AI for school.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28, duration: 0.5 }}
          className={`${jakartaSans.className} mx-auto mt-4 max-w-xl text-sm font-medium leading-relaxed text-slate-300 sm:text-[0.98rem]`}
        >
          A private membership connecting parents and high schoolers with a college student team still living the tools
          and classroom rules.
        </motion.p>

        <motion.div
          id="apply"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-9 flex w-full max-w-md flex-col items-center gap-3"
        >
          <a
            href="/join"
            className={`${jakartaSans.className} inline-flex w-full max-w-xs items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-xs font-black uppercase tracking-[0.14em] text-slate-900 shadow-[0_18px_40px_-24px_rgba(255,255,255,0.55)] transition hover:-translate-y-0.5 hover:bg-sky-50`}
          >
            Work with us
            <ArrowRight className="h-4 w-4" aria-hidden />
          </a>
          <a
            href="#origin-story"
            className={`${jakartaSans.className} text-[12px] font-semibold text-slate-400 underline decoration-sky-400/40 underline-offset-[0.2em] transition-colors hover:text-sky-200 sm:text-[13px]`}
          >
            How we got here
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.5 }}
          className="mt-14 w-full max-w-2xl border-t border-white/10 pt-8"
        >
          <p className={`${jakartaSans.className} text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400`}>
            Built and maintained by students at
          </p>
          <ul className="mt-5 flex flex-wrap items-center justify-center gap-x-7 gap-y-4 sm:gap-x-9">
            {trustColleges.map((college) => (
              <li key={college.name} className="flex items-center gap-2 opacity-90">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={college.logo}
                  alt=""
                  width={28}
                  height={28}
                  className="h-7 w-7 object-contain brightness-0 invert"
                />
                <span className={`${jakartaSans.className} text-xs font-semibold tracking-wide text-slate-200`}>
                  {college.name}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
