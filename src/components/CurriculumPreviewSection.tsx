"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, ExternalLink } from "lucide-react";
import { jakartaSans, fredokaHeadline } from "@/app/fonts";
import { EXTERNAL_CURRICULUM } from "@/lib/portal/curriculum";

/** Public-facing curriculum preview for parents (#courses on landing). */
export function CurriculumPreviewSection() {
  const featured = EXTERNAL_CURRICULUM.slice(0, 4);

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
            Pathways built on credible, free courses
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`mt-4 text-sm font-medium leading-relaxed text-slate-600 sm:text-base ${jakartaSans.className}`}
          >
            Members follow StudentStack pathways that map to public resources from IBM, Code.org, Microsoft, Google, and
            university partners — plus our daily AI toolkit and organization-issued credentials.
          </motion.p>
        </div>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((course, i) => (
            <motion.li
              key={course.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.06 * i }}
              className="flex flex-col rounded-[1.75rem] border-2 border-slate-200 bg-white p-5 shadow-[0_10px_0_0_rgba(15,23,42,0.06)]"
            >
              <p className={`text-[10px] font-black uppercase tracking-[0.12em] text-sky-600 ${jakartaSans.className}`}>
                {course.organization}
              </p>
              <p className={`mt-2 flex-1 text-lg font-semibold leading-snug text-slate-900 ${fredokaHeadline.className}`}>
                {course.title}
              </p>
              <p className={`mt-2 text-xs font-medium text-slate-500 ${jakartaSans.className}`}>
                {course.duration} · Free
              </p>
              {course.credential ? (
                <p className={`mt-2 text-[10px] font-bold uppercase tracking-[0.1em] text-emerald-700 ${jakartaSans.className}`}>
                  {course.credential}
                </p>
              ) : null}
            </motion.li>
          ))}
        </ul>

        <p className={`mx-auto mt-8 max-w-xl text-center text-xs font-medium leading-relaxed text-slate-500 ${jakartaSans.className}`}>
          StudentStack curates these public courses into member pathways. We are not claiming exclusive partnerships — we
          help students know which free resources to take, in what order, alongside our toolkit.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/join"
            className={`inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-6 py-3.5 text-xs font-black uppercase tracking-[0.14em] text-white shadow-[0_12px_0_0_rgba(15,23,42,0.15)] transition hover:-translate-y-0.5 hover:bg-slate-800 ${jakartaSans.className}`}
          >
            Join for full curriculum map
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
          <a
            href="https://skillsbuild.org/students/course-catalog/artificial-intelligence/ai-foundations-powered-by-iste-and-ibm"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1.5 text-sm font-bold text-sky-700 hover:text-sky-900 ${jakartaSans.className}`}
          >
            Example: IBM AI Foundations
            <ExternalLink className="h-3.5 w-3.5" aria-hidden />
          </a>
        </div>
      </div>
    </section>
  );
}
