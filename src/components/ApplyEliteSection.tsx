"use client";

import React from "react";
import { motion } from "motion/react";
import { fredokaHeadline, jakartaSans, institutionalSerif } from "@/app/fonts";
import { EliteApplyForm } from "@/components/EliteApplyForm";

export function ApplyEliteSection() {
  return (
    <section
      id="apply"
      className="relative overflow-hidden border-t border-slate-100 bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
      aria-labelledby="apply-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_0%_0%,rgba(14,165,233,0.1),transparent_55%),radial-gradient(ellipse_45%_40%_at_100%_100%,rgba(255,106,0,0.08),transparent_50%)]" />

      <div className="relative mx-auto grid w-full max-w-3xl gap-10 lg:max-w-5xl lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-14 xl:max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <p className={`text-[10px] font-black uppercase tracking-[0.22em] text-[#ff6a00] ${jakartaSans.className}`}>
            Apply for membership
          </p>
          <h2
            id="apply-heading"
            className={`mt-3 text-[1.85rem] font-semibold leading-[1.08] tracking-[-0.035em] text-slate-900 sm:text-4xl lg:text-[2.55rem] ${fredokaHeadline.className}`}
          >
            Apply your student from this page
          </h2>
          <p
            className={`ss-institutional mt-4 max-w-xl text-[1.05rem] font-normal leading-[1.65] text-slate-700 sm:text-lg ${institutionalSerif.className}`}
          >
            Parents who found our work are already putting their high schooler in. You do not need your student sitting
            next to you. Our team follows up within 24 hours about next steps.
          </p>
          <p className={`mt-4 text-sm font-semibold leading-relaxed text-slate-600 ${jakartaSans.className}`}>
            Membership is the gated access our organization keeps for high schoolers. The families who wait usually wait
            because they wanted to ask their kid first. You can apply now.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="rounded-[1.75rem] border border-slate-200 bg-[#f8fafc] p-5 shadow-[0_24px_50px_-36px_rgba(15,23,42,0.35)] sm:p-7"
        >
          <EliteApplyForm />
        </motion.div>
      </div>
    </section>
  );
}
