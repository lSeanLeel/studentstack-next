"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, CheckSquare } from "lucide-react";
import { fredokaHeadline, jakartaSans, institutionalSerif } from "@/app/fonts";
import { MEMBER_PLAYBOOKS } from "@/lib/portal/playbooks";

/**
 * Optional member guides on the marketing site — honest self-paced framing.
 */
export function CertificationsSection() {
  return (
    <section
      id="guides"
      className="relative overflow-hidden border-t border-slate-900 bg-[#0b1220] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
      aria-labelledby="guides-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_15%_0%,rgba(56,189,248,0.2),transparent_55%),radial-gradient(ellipse_45%_40%_at_100%_90%,rgba(255,106,0,0.14),transparent_50%)]" />

      <div className="relative mx-auto w-full max-w-3xl lg:max-w-5xl xl:max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="max-w-3xl"
        >
          <p className={`text-[10px] font-black uppercase tracking-[0.22em] text-[#ff9a4d] ${jakartaSans.className}`}>
            Optional · included with membership
          </p>
          <h2
            id="guides-heading"
            className={`mt-3 text-[2rem] font-semibold leading-[1.05] tracking-[-0.035em] text-white sm:text-4xl lg:text-[2.85rem] ${fredokaHeadline.className}`}
          >
            Self-paced guides, not video courses
          </h2>
          <p
            className={`ss-institutional mt-4 max-w-2xl text-[1.05rem] font-normal leading-[1.7] text-slate-300 sm:text-lg ${institutionalSerif.className}`}
          >
            Most of the value is the living AI toolkit and our college team. Guides are checklists for integrity and
            college-bound work — students finish on their own time and can earn an organization badge after team review.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {MEMBER_PLAYBOOKS.map((guide, index) => (
            <motion.article
              key={guide.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-6"
            >
              <div className="flex items-start gap-3">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-amber-500/20 text-amber-200">
                  <CheckSquare className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <h3 className={`text-xl font-semibold text-white ${fredokaHeadline.className}`}>{guide.title}</h3>
                  <p className={`mt-2 text-sm font-medium leading-relaxed text-slate-300 ${jakartaSans.className}`}>
                    {guide.summary}
                  </p>
                </div>
              </div>
              <p className={`mt-4 text-xs font-medium text-slate-400 ${jakartaSans.className}`}>
                {guide.checklist.length} checklist items · {guide.format}
              </p>
            </motion.article>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/join"
            className={`inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-xs font-black uppercase tracking-[0.14em] text-slate-900 transition hover:-translate-y-0.5 hover:bg-sky-100 ${jakartaSans.className}`}
          >
            Join membership
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
