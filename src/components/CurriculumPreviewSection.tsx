"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, BookOpen, FileText, MessageSquare } from "lucide-react";
import { jakartaSans, fredokaHeadline } from "@/app/fonts";
import { STUDENTSTACK_MODULES } from "@/lib/portal/curriculum";

/** Public-facing curriculum preview for parents (#courses on landing). */
export function CurriculumPreviewSection() {
  const featured = STUDENTSTACK_MODULES.slice(0, 3);

  return (
    <section
      id="courses"
      className="relative overflow-hidden border-t border-slate-100 bg-[#f8fafc] px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
      aria-labelledby="courses-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-[10px] font-black uppercase tracking-[0.22em] text-sky-600 ${jakartaSans.className}`}
          >
            Curriculum
          </motion.p>
          <motion.h2
            id="courses-heading"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`mt-3 text-[2rem] font-semibold tracking-[-0.035em] text-slate-900 sm:text-4xl ${fredokaHeadline.className}`}
          >
            Member modules, not a link list
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`mt-4 text-sm font-medium leading-relaxed text-slate-600 sm:text-base ${jakartaSans.className}`}
          >
            Your student gets lessons, worksheets, and copy-paste prompts our college team maintains — plus SS-AIS and
            SS-ACR credentials. Public org courses are optional supplements, not the product.
          </motion.p>
        </div>

        <ul className="mt-10 grid gap-4 sm:grid-cols-3">
          {featured.map((mod, i) => (
            <motion.li
              key={mod.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.06 * i }}
              className="flex flex-col rounded-[1.75rem] border-2 border-slate-200 bg-white p-5 shadow-[0_10px_0_0_rgba(15,23,42,0.06)]"
            >
              <p className={`text-[10px] font-black uppercase tracking-[0.12em] text-sky-600 ${jakartaSans.className}`}>
                {mod.lessons.length} lessons · ~{mod.estimatedHours} hrs
              </p>
              <p className={`mt-2 flex-1 text-lg font-semibold leading-snug text-slate-900 ${fredokaHeadline.className}`}>
                {mod.label}
              </p>
              <p className={`mt-2 text-xs font-medium text-slate-500 ${jakartaSans.className}`}>{mod.summary}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className={`inline-flex items-center gap-1 rounded-lg bg-sky-50 px-2 py-1 text-[10px] font-bold text-sky-700 ${jakartaSans.className}`}>
                  <BookOpen className="h-3 w-3" aria-hidden />
                  {mod.lessons.length} lessons
                </span>
                <span className={`inline-flex items-center gap-1 rounded-lg bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-700 ${jakartaSans.className}`}>
                  <FileText className="h-3 w-3" aria-hidden />
                  {mod.worksheets.length} worksheets
                </span>
                <span className={`inline-flex items-center gap-1 rounded-lg bg-amber-50 px-2 py-1 text-[10px] font-bold text-amber-800 ${jakartaSans.className}`}>
                  <MessageSquare className="h-3 w-3" aria-hidden />
                  Prompts
                </span>
              </div>
            </motion.li>
          ))}
        </ul>

        <p className={`mx-auto mt-8 max-w-xl text-center text-xs font-medium leading-relaxed text-slate-500 ${jakartaSans.className}`}>
          Membership includes proprietary modules and organization-issued credentials. We reference free public courses
          only as optional extra reading — you are not paying us to Google IBM for you.
        </p>

        <div className="mt-8 flex justify-center">
          <Link
            href="/join"
            className={`inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-6 py-3.5 text-xs font-black uppercase tracking-[0.14em] text-white shadow-[0_12px_0_0_rgba(15,23,42,0.15)] transition hover:-translate-y-0.5 hover:bg-slate-800 ${jakartaSans.className}`}
          >
            Apply for Elite
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
