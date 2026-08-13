"use client";

import React from "react";
import { motion } from "motion/react";
import { fredokaHeadline, jakartaSans, institutionalSerif } from "@/app/fonts";
import { ContactForm } from "@/components/ContactForm";

/**
 * Parallel path: parents can write the organization anytime.
 * No "newsletter first, reach out later" funnel framing.
 */
export function ReachOutSection() {
  return (
    <section
      id="reach-out"
      className="relative overflow-hidden border-t border-slate-200 bg-[#f8fafc] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
      aria-labelledby="reach-out-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_0%_0%,rgba(14,165,233,0.1),transparent_50%)]" />

      <div className="relative mx-auto grid w-full max-w-3xl gap-10 lg:max-w-5xl lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-14 xl:max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <p className={`text-[10px] font-black uppercase tracking-[0.22em] text-[#ff6a00] ${jakartaSans.className}`}>
            Talk with StudentStack
          </p>
          <h2
            id="reach-out-heading"
            className={`mt-3 text-[1.85rem] font-semibold leading-[1.08] tracking-[-0.035em] text-slate-900 sm:text-4xl lg:text-[2.55rem] ${fredokaHeadline.className}`}
          >
            Write our student-led team
          </h2>
          <p
            className={`ss-institutional mt-4 max-w-xl text-[1.05rem] font-normal leading-[1.7] text-slate-700 sm:text-lg ${institutionalSerif.className}`}
          >
            Families and students can write us about the daily or a credential pathway. Schools and organizations can
            reach our partnerships desk. Pick the path that fits, and we respond ourselves.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-[0_24px_50px_-36px_rgba(15,23,42,0.35)] sm:p-7"
        >
          <ContactForm />
        </motion.div>
      </div>
    </section>
  );
}
