"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { fredokaHeadline, jakartaSans } from "@/app/fonts";

/**
 * Soft parent-facing Elite subscription framing.
 * Vague on mechanics; specific on student school use cases.
 */
export function EliteSection() {
  return (
    <section
      id="elite"
      className="relative overflow-hidden border-t border-slate-100 bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
      aria-labelledby="elite-heading"
    >
      <div className="relative mx-auto grid w-full max-w-3xl gap-10 lg:max-w-5xl lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16 xl:max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <p className={`text-[10px] font-black uppercase tracking-[0.22em] text-[#ff6a00] ${jakartaSans.className}`}>
            StudentStack Elite
          </p>
          <h2
            id="elite-heading"
            className={`mt-3 text-[1.85rem] font-semibold leading-[1.08] tracking-[-0.035em] text-slate-900 sm:text-4xl lg:text-[2.55rem] ${fredokaHeadline.className}`}
          >
            Their Edge, built by students still in the work
          </h2>
          <p
            className={`mt-4 max-w-xl text-base font-medium leading-relaxed text-slate-600 sm:text-lg ${jakartaSans.className}`}
          >
            Parents start with our free daily newsletter to learn how their student can use AI to stay organized for
            school. Elite is the next step: a private student portal where your high schooler checks ongoing posts for
            the tools we use in real school categories.
          </p>
          <p
            className={`mt-3 max-w-xl text-base font-medium leading-relaxed text-slate-600 sm:text-lg ${jakartaSans.className}`}
          >
            Think of it as their tailored Edge: living, challenge-driven, and designed from the college-student side of
            the same pressure. A growing set of parents already subscribe so their student can log in on their own.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="rounded-[2rem] border border-sky-100 bg-gradient-to-br from-sky-50 via-white to-orange-50/60 p-7 sm:p-8"
        >
          <p className={`text-[11px] font-black uppercase tracking-[0.18em] text-slate-500 ${jakartaSans.className}`}>
            Inside the portal
          </p>
          <ul className={`mt-5 space-y-4 text-sm font-medium leading-relaxed text-slate-700 ${jakartaSans.className}`}>
            <li>
              <span className={`${fredokaHeadline.className} font-semibold text-slate-900`}>School-use postings</span>
              <span className="mt-1 block text-slate-600">
                Organization, notetaking, planning, and related workflows students actually open for class.
              </span>
            </li>
            <li>
              <span className={`${fredokaHeadline.className} font-semibold text-slate-900`}>A living Edge</span>
              <span className="mt-1 block text-slate-600">
                An intricate, progress-oriented space that keeps updating as school tools change.
              </span>
            </li>
            <li>
              <span className={`${fredokaHeadline.className} font-semibold text-slate-900`}>Parent subscribes</span>
              <span className="mt-1 block text-slate-600">
                Student logs in. Quiet, credible support, without turning school into another app chase.
              </span>
            </li>
          </ul>
          <Link
            href="/elite"
            className={`mt-7 inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.14em] text-sky-700 transition-colors hover:text-sky-900 ${jakartaSans.className}`}
          >
            Explore the subscription
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
