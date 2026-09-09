"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowUpRight, CalendarDays, Users } from "lucide-react";
import { fredokaHeadline, jakartaSans } from "@/app/fonts";
import { ContactForm } from "@/components/ContactForm";
import {
  FEATURED_PROGRAMS,
  type FeaturedDeadline,
  type FeaturedProgram,
} from "@/lib/landing/featured-programs";

function DeadlineStatus({ status }: { status: FeaturedDeadline["status"] }) {
  const label = status === "closed" ? "Closed" : status === "rolling" ? "Rolling" : "Open";
  const className =
    status === "closed"
      ? "bg-slate-200 text-slate-600"
      : status === "rolling"
        ? "bg-amber-100 text-amber-900"
        : "bg-emerald-100 text-emerald-800";
  return (
    <span className={`rounded-full px-2 py-0.5 text-[10px] font-black uppercase tracking-[0.12em] ${className}`}>
      {label}
    </span>
  );
}

function FeaturedProgramCard({ program, featured = false }: { program: FeaturedProgram; featured?: boolean }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4 }}
      className={`overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_20px_48px_-36px_rgba(15,23,42,0.45)] ${
        featured ? "sm:col-span-2" : ""
      }`}
    >
      <a
        href={program.href}
        target="_blank"
        rel="noopener noreferrer"
        className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2"
      >
        <div
          className={`relative overflow-hidden bg-slate-100 ${
            featured ? "aspect-[16/9] sm:aspect-[2.2/1]" : "aspect-[16/10]"
          }`}
        >
          <Image
            src={program.imageSrc}
            alt={program.imageAlt}
            fill
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
            sizes={featured ? "(max-width: 768px) 100vw, 640px" : "(max-width: 768px) 100vw, 320px"}
            priority={featured}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-transparent to-transparent" />
          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-3">
            <div className="flex items-center gap-2">
              {program.logoSrc ? (
                <span className="relative h-9 w-9 overflow-hidden rounded-xl bg-white/95 p-1 shadow-sm">
                  <Image src={program.logoSrc} alt="" fill className="object-contain p-0.5" sizes="36px" />
                </span>
              ) : null}
              <p className={`text-xs font-black uppercase tracking-[0.14em] text-white ${jakartaSans.className}`}>
                {program.org}
              </p>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-slate-800 opacity-90 transition group-hover:opacity-100">
              Details
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
            </span>
          </div>
        </div>

        <div className="space-y-3 p-5 sm:p-6">
          <div className="flex flex-wrap gap-1.5">
            {program.tags.map((tag) => (
              <span
                key={tag}
                className={`rounded-full bg-sky-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-sky-800 ${jakartaSans.className}`}
              >
                {tag}
              </span>
            ))}
          </div>

          <h3
            className={`text-lg font-semibold tracking-[-0.03em] text-slate-900 sm:text-xl ${fredokaHeadline.className}`}
          >
            {program.title}
          </h3>
          <p className={`text-sm font-medium leading-relaxed text-slate-600 ${jakartaSans.className}`}>{program.blurb}</p>
          <p className={`text-xs font-medium leading-relaxed text-slate-500 ${jakartaSans.className}`}>
            {program.hostNote}
          </p>

          <div className={`flex items-start gap-2 text-sm font-semibold text-slate-800 ${jakartaSans.className}`}>
            <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-sky-600" aria-hidden />
            <span>{program.programDates}</span>
          </div>

          <ul className="space-y-2 border-t border-slate-100 pt-3">
            {program.deadlines.map((d) => (
              <li key={`${program.id}-${d.label}`} className="flex items-center justify-between gap-3">
                <div>
                  <p
                    className={`text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400 ${jakartaSans.className}`}
                  >
                    {d.label}
                  </p>
                  <time
                    dateTime={d.dateTime}
                    className={`text-sm font-semibold text-slate-800 ${jakartaSans.className}`}
                  >
                    {d.date}
                  </time>
                </div>
                <DeadlineStatus status={d.status} />
              </li>
            ))}
          </ul>
        </div>
      </a>
    </motion.article>
  );
}

/**
 * Partner / news column for programs we feature for families,
 * paired with an elevated Write Us path for families and partnership inquiries.
 */
export function WriteUsSection() {
  const [lead, ...rest] = FEATURED_PROGRAMS;

  return (
    <section
      id="write-us"
      className="relative overflow-hidden border-t border-slate-200 bg-gradient-to-b from-[#f4f8ff] via-white to-[#fff7ed] py-16 sm:py-24"
      aria-labelledby="write-us-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_90%_10%,rgba(14,165,233,0.12),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_40%_35%_at_10%_90%,rgba(255,106,0,0.08),transparent_50%)]" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start lg:gap-12">
          <div>
            <div className="mb-5 flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-sky-100 text-sky-700">
                <Users className="h-4 w-4" aria-hidden />
              </span>
              <p className={`text-[11px] font-black uppercase tracking-[0.16em] text-slate-500 ${jakartaSans.className}`}>
                Featured for our parent community
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {lead ? <FeaturedProgramCard program={lead} featured /> : null}
              {rest.map((program) => (
                <FeaturedProgramCard key={program.id} program={program} />
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.08 }}
            className="relative lg:sticky lg:top-24"
          >
            <div className="mb-5">
              <h2
                id="write-us-heading"
                className={`text-[2.15rem] font-semibold leading-[1.05] tracking-[-0.04em] text-slate-900 sm:text-4xl ${fredokaHeadline.className}`}
              >
                Write us
              </h2>
              <p className={`mt-2 text-sm font-semibold tracking-[-0.01em] text-slate-500 sm:text-base ${jakartaSans.className}`}>
                Families and partners
              </p>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] border-2 border-slate-800 bg-slate-900 px-5 py-8 shadow-[0_28px_60px_-40px_rgba(15,23,42,0.7)] sm:rounded-[2.5rem] sm:px-7 sm:py-9">
              <div className="pointer-events-none absolute -right-16 top-0 h-40 w-40 rounded-full bg-sky-500/20 blur-3xl" />
              <div className="relative z-10 rounded-[1.5rem] bg-white p-4 sm:p-5">
                <ContactForm />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
