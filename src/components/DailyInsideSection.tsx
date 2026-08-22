"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { fredokaHeadline, jakartaSans, institutionalSerif } from "@/app/fonts";

const lines = [
  {
    title: "Gated student access",
    body: "A private portal for members. What lives inside stays inside.",
  },
  {
    title: "Current campus signal",
    body: "AI literacy and school habits shaped by college students still in class.",
  },
  {
    title: "The same loop other families use",
    body: "Programs, credentials, and next moves our team pushes. Not a public list.",
  },
] as const;

export function DailyInsideSection() {
  return (
    <section
      id="membership"
      className="relative overflow-hidden border-t border-sky-100/80 bg-transparent px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
      aria-labelledby="membership-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(14,165,233,0.12),transparent_55%),radial-gradient(ellipse_45%_40%_at_100%_80%,rgba(255,106,0,0.08),transparent_50%)]" />

      <div className="relative mx-auto w-full max-w-3xl lg:max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="max-w-2xl"
        >
          <p className={`text-[10px] font-black uppercase tracking-[0.22em] text-[#ff6a00] ${jakartaSans.className}`}>
            Membership
          </p>
          <h2
            id="membership-heading"
            className={`mt-3 text-[2rem] font-semibold leading-[1.05] tracking-[-0.035em] text-slate-900 sm:text-4xl lg:text-[2.85rem] ${fredokaHeadline.className}`}
          >
            Private access for high schoolers
          </h2>
          <p
            className={`ss-institutional mt-4 max-w-xl text-[1.05rem] font-normal leading-[1.7] text-slate-600 sm:text-lg ${institutionalSerif.className}`}
          >
            Built by college students for the community that already follows the work. Clear enough to join. Deliberately
            light on public detail.
          </p>
        </motion.div>

        <ul className="mt-10 space-y-0 divide-y divide-slate-200 border-y border-slate-200 sm:mt-12">
          {lines.map((line, index) => (
            <motion.li
              key={line.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
              className="grid gap-2 py-6 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] sm:gap-8"
            >
              <h3 className={`text-lg font-semibold tracking-[-0.02em] text-slate-900 ${fredokaHeadline.className}`}>
                {line.title}
              </h3>
              <p className={`text-sm font-medium leading-relaxed text-slate-600 sm:text-[0.95rem] ${jakartaSans.className}`}>
                {line.body}
              </p>
            </motion.li>
          ))}
        </ul>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10"
        >
          <Link
            href="/join"
            className={`${jakartaSans.className} inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-6 py-3.5 text-xs font-black uppercase tracking-[0.14em] text-white transition hover:-translate-y-0.5 hover:bg-slate-800`}
          >
            Join our Community
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
