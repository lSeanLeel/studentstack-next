"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { fredokaHeadline, jakartaSans } from "@/app/fonts";

/**
 * Soft, parent-facing Elite framing. No hard product grid / pricing push.
 * Emphasizes college-student support for high schoolers.
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
            When free is not enough
          </p>
          <h2
            id="elite-heading"
            className={`mt-3 text-[1.85rem] font-semibold leading-[1.08] tracking-[-0.035em] text-slate-900 sm:text-4xl lg:text-[2.55rem] ${fredokaHeadline.className}`}
          >
            A student solution for high school support
          </h2>
          <p
            className={`mt-4 max-w-xl text-base font-medium leading-relaxed text-slate-600 sm:text-lg ${jakartaSans.className}`}
          >
            The daily newsletter is how families start. For students who want a private home base, StudentStack Elite
            opens a portal built around how college students actually work: an AI toolkit for school, plus exclusive
            resources like summer programs and opportunity lists.
          </p>
          <p
            className={`mt-3 max-w-xl text-base font-medium leading-relaxed text-slate-600 sm:text-lg ${jakartaSans.className}`}
          >
            Parents gift access. Students log in. The brand stays student-led; the work stays practical.
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
            Inside Elite
          </p>
          <ul className={`mt-5 space-y-4 text-sm font-medium leading-relaxed text-slate-700 ${jakartaSans.className}`}>
            <li>
              <span className={`${fredokaHeadline.className} font-semibold text-slate-900`}>AI toolkit</span>
              <span className="mt-1 block text-slate-600">
                Organization, notetaking, planning, studying, writing, and research.
              </span>
            </li>
            <li>
              <span className={`${fredokaHeadline.className} font-semibold text-slate-900`}>Exclusive resources</span>
              <span className="mt-1 block text-slate-600">
                Summer programs and opportunity lists sourced for high schoolers.
              </span>
            </li>
            <li>
              <span className={`${fredokaHeadline.className} font-semibold text-slate-900`}>Student portal</span>
              <span className="mt-1 block text-slate-600">
                One login for your student. You buy it once as the parent.
              </span>
            </li>
          </ul>
          <Link
            href="/elite"
            className={`mt-7 inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.14em] text-sky-700 transition-colors hover:text-sky-900 ${jakartaSans.className}`}
          >
            Learn about Elite
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
