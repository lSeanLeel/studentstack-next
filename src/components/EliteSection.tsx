"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { fredokaHeadline, jakartaSans, institutionalSerif } from "@/app/fonts";

/**
 * Soft parent-facing Elite subscription framing (v2).
 * Institutional serif for marketing body; Fredoka for section identity.
 */
export function EliteSection() {
  return (
    <section
      id="elite"
      className="relative overflow-hidden border-t border-slate-200 bg-[#f8fafc] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
      aria-labelledby="elite-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_100%_0%,rgba(14,165,233,0.08),transparent_55%)]" />

      <div className="relative mx-auto grid w-full max-w-3xl gap-10 lg:max-w-5xl lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-14 xl:max-w-6xl">
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
            The student portal subscription
          </h2>
          <p
            className={`ss-institutional mt-4 max-w-xl text-[1.05rem] font-normal leading-[1.65] text-slate-700 sm:text-lg ${institutionalSerif.className}`}
          >
            Parents begin with the free daily newsletter: education on how a high schooler can use AI to stay organized
            for school. Elite is the subscription that follows. Your student receives a private login to a living portal
            of school-category tool postings, maintained from the college-student side of the same work.
          </p>
          <p
            className={`ss-institutional mt-3 max-w-xl text-[1.05rem] font-normal leading-[1.65] text-slate-600 sm:text-lg ${institutionalSerif.className}`}
          >
            We call it their Edge: progress-oriented, continually refreshed, and designed so students check in on their
            own. A growing number of families already subscribe.
          </p>
          <Link
            href="/elite"
            className={`mt-7 inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.14em] text-sky-700 transition-colors hover:text-sky-900 ${jakartaSans.className}`}
          >
            View Elite in detail
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_24px_50px_-36px_rgba(15,23,42,0.35)]"
        >
          <div className="border-b border-slate-100 bg-slate-50/80 px-5 py-3">
            <p className={`text-[10px] font-black uppercase tracking-[0.18em] text-slate-500 ${jakartaSans.className}`}>
              Portal preview
            </p>
            <p className={`mt-1 text-sm font-semibold text-slate-900 ${fredokaHeadline.className}`}>
              This week&apos;s Edge board
            </p>
          </div>
          <ul className={`divide-y divide-slate-100 px-5 ${institutionalSerif.className}`}>
            {[
              { cat: "Organization", post: "Weekly reset for class folders + deadline inbox" },
              { cat: "Planning", post: "Syllabus → three focus blocks before Friday" },
              { cat: "Notetaking", post: "Lecture capture → study sheet in one pass" },
            ].map((row) => (
              <li key={row.cat} className="py-4">
                <p className={`text-[10px] font-black uppercase tracking-[0.16em] text-sky-600 ${jakartaSans.className}`}>
                  {row.cat}
                </p>
                <p className="mt-1 text-[0.95rem] leading-relaxed text-slate-700">{row.post}</p>
              </li>
            ))}
          </ul>
          <div className={`border-t border-slate-100 px-5 py-3 text-xs text-slate-500 ${jakartaSans.className}`}>
            Parent subscribes · Student logs in · Updates continue through the term
          </div>
        </motion.div>
      </div>
    </section>
  );
}
