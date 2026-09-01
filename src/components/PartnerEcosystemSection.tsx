"use client";

import React from "react";
import { motion } from "motion/react";
import { ArrowRight, Link2 } from "lucide-react";
import Link from "next/link";
import { jakartaSans, fredokaHeadline } from "@/app/fonts";
import { PARTNER_CATEGORIES, PARTNER_INTEGRATION_STEPS } from "@/lib/landing/ai-for-school";

const accentRing = {
  sky: "bg-sky-100 text-sky-700 ring-sky-200",
  violet: "bg-violet-100 text-violet-700 ring-violet-200",
  amber: "bg-amber-100 text-amber-800 ring-amber-200",
} as const;

export function PartnerEcosystemSection() {
  return (
    <section
      id="partners"
      className="border-t border-sky-100 px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
      aria-labelledby="partners-heading"
      style={{
        backgroundImage:
          "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(167,243,208,0.2), transparent 55%), linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",
      }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className={`text-[10px] font-black uppercase tracking-[0.22em] text-emerald-600 ${jakartaSans.className}`}>
            Partner ecosystem
          </p>
          <h2
            id="partners-heading"
            className={`mt-3 text-[2rem] font-semibold tracking-[-0.035em] text-slate-900 sm:text-4xl ${fredokaHeadline.className}`}
          >
            Vetted AI tools & coursework, integrated for school
          </h2>
          <p className={`mt-4 text-base font-medium leading-relaxed text-slate-600 sm:text-lg ${jakartaSans.className}`}>
            We work directly with founders of AI notetaking apps, study platforms, and literacy course providers — then
            weave them into member workflows. Not a link list. A curriculum.
          </p>
        </div>

        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {PARTNER_CATEGORIES.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <motion.li
                key={cat.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.06 * i }}
                className="rounded-[1.75rem] border-2 border-slate-100 bg-white p-5 shadow-[0_10px_0_0_rgba(15,23,42,0.04)] sm:p-6"
              >
                <span
                  className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl ring-2 ${accentRing[cat.accent]}`}
                >
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <p className={`mt-4 text-lg font-semibold text-slate-900 ${fredokaHeadline.className}`}>{cat.title}</p>
                <p className={`mt-2 text-sm font-medium leading-relaxed text-slate-600 ${jakartaSans.className}`}>
                  {cat.detail}
                </p>
                <p className={`mt-3 flex items-center gap-1.5 text-xs font-semibold text-slate-400 ${jakartaSans.className}`}>
                  <Link2 className="h-3.5 w-3.5" aria-hidden />
                  {cat.examples}
                </p>
              </motion.li>
            );
          })}
        </ul>

        <div className="mt-12 overflow-hidden rounded-[2rem] border-2 border-slate-200 bg-white shadow-[0_14px_0_0_rgba(15,23,42,0.06)]">
          <div className="grid divide-y divide-slate-100 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {PARTNER_INTEGRATION_STEPS.map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 * i }}
                className="p-6 sm:p-7"
              >
                <p className={`text-[10px] font-black tracking-[0.2em] text-sky-600 ${jakartaSans.className}`}>
                  {item.step}
                </p>
                <p className={`mt-2 font-semibold text-slate-900 ${fredokaHeadline.className}`}>{item.title}</p>
                <p className={`mt-2 text-sm font-medium leading-relaxed text-slate-600 ${jakartaSans.className}`}>
                  {item.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/join"
            className={`inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-6 py-3.5 text-xs font-black uppercase tracking-[0.14em] text-white shadow-[0_12px_0_0_rgba(15,23,42,0.2)] transition hover:-translate-y-0.5 hover:bg-slate-800 ${jakartaSans.className}`}
          >
            Apply for access
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
