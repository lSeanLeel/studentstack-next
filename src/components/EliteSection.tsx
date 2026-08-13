"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { fredokaHeadline, jakartaSans, institutionalSerif } from "@/app/fonts";
import { EliteInquiryForm } from "@/components/EliteInquiryForm";

/**
 * v4: Elite as a soft parent inquiry, not a portal product tour.
 */
export function EliteSection() {
  return (
    <section
      id="elite"
      className="relative overflow-hidden border-t border-slate-200 bg-[#f8fafc] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
      aria-labelledby="elite-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_100%_0%,rgba(14,165,233,0.08),transparent_55%)]" />

      <div className="relative mx-auto grid w-full max-w-3xl gap-10 lg:max-w-5xl lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-14 xl:max-w-6xl">
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
            Want something more for your student?
          </h2>
          <p
            className={`ss-institutional mt-4 max-w-xl text-[1.05rem] font-normal leading-[1.65] text-slate-700 sm:text-lg ${institutionalSerif.className}`}
          >
            Most families start with the free daily. If you want us to look at Elite for your student, send a short
            inquiry, parent contact plus a few student details, and we’ll reach out.
          </p>
          <p
            className={`ss-institutional mt-3 max-w-xl text-[1.05rem] font-normal leading-[1.65] text-slate-600 sm:text-lg ${institutionalSerif.className}`}
          >
            No payment on this page. Just a conversation when it’s a fit.
          </p>
          <Link
            href="/elite"
            className={`mt-7 inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.14em] text-sky-700 transition-colors hover:text-sky-900 ${jakartaSans.className}`}
          >
            Open full inquiry form
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-[0_24px_50px_-36px_rgba(15,23,42,0.35)] sm:p-7"
        >
          <EliteInquiryForm compact />
        </motion.div>
      </div>
    </section>
  );
}
