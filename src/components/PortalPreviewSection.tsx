"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { jakartaSans, fredokaHeadline } from "@/app/fonts";
import { PortalPreviewMock } from "@/components/portal/PortalPreviewMock";
import {
  PORTAL_PREVIEW_PILLARS,
  pillarCardClasses,
  pillarTitleClasses,
} from "@/lib/portal/portal-preview";

/** Landing-page gated preview of the member portal (CSS mock, screenshot-ready). */
export function PortalPreviewSection() {
  return (
    <section
      id="member-portal"
      className="relative overflow-hidden border-t border-sky-100 px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
      aria-labelledby="portal-preview-heading"
      style={{
        backgroundImage:
          "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(125,211,252,0.25), transparent 60%), linear-gradient(180deg, #f0f9ff 0%, #ffffff 45%, #f8fafc 100%)",
      }}
    >
      <div className="pointer-events-none absolute -right-24 top-20 h-64 w-64 rounded-full bg-emerald-200/30 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -left-16 bottom-10 h-48 w-48 rounded-full bg-sky-200/40 blur-3xl" aria-hidden />

      <div className="relative mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <motion.h2
            id="portal-preview-heading"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-[clamp(2rem,5vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-slate-900 ${fredokaHeadline.className}`}
          >
            AI literacy for school, in one place
          </motion.h2>
        </div>

        <div className="mt-12 grid items-start gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-12">
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 lg:gap-3.5">
            {PORTAL_PREVIEW_PILLARS.map((pillar, i) => (
              <motion.li
                key={pillar.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.025, y: -4 }}
                transition={{ delay: 0.06 * i, type: "spring", stiffness: 420, damping: 28 }}
                className={`cursor-default rounded-3xl p-4 transition-[box-shadow,background-color,border-color] duration-300 sm:p-5 ${pillarCardClasses(pillar.accent)}`}
              >
                <p className={`text-lg font-semibold sm:text-xl ${pillarTitleClasses(pillar.accent)} ${fredokaHeadline.className}`}>
                  {pillar.title}
                </p>
                <p className={`mt-2 text-sm font-medium leading-relaxed text-slate-600 ${jakartaSans.className}`}>
                  {pillar.detail}
                </p>
              </motion.li>
            ))}
          </ul>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.12, duration: 0.5 }}
            className="lg:sticky lg:top-24"
          >
            <PortalPreviewMock />
          </motion.div>
        </div>

        <div className="mt-12 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/join"
            className={`inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-6 py-3.5 text-xs font-black uppercase tracking-[0.14em] text-white shadow-[0_12px_0_0_rgba(15,23,42,0.2)] transition hover:-translate-y-0.5 hover:bg-slate-800 ${jakartaSans.className}`}
          >
            Join our Community
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
          <Link
            href="/login"
            className={`text-sm font-bold text-sky-700 underline decoration-sky-300 underline-offset-4 hover:text-sky-900 ${jakartaSans.className}`}
          >
            Student login
          </Link>
        </div>
      </div>
    </section>
  );
}
