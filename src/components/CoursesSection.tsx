"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Briefcase,
  Dna,
  FlaskConical,
  Microscope,
  Palette,
  PenLine,
  Terminal,
} from "lucide-react";
import { fredokaHeadline, jakartaSans, institutionalSerif } from "@/app/fonts";
import { ProductInterestModal } from "@/components/ProductInterestModal";

type Course = {
  id: string;
  title: string;
  hook: string;
  forStudents: string;
  icon: typeof PenLine;
  accent: string;
  chip: string;
};

const courses: Course[] = [
  {
    id: "syllabus-os",
    title: "Syllabus OS",
    hook: "Turn a stack of syllabi into one living week system with AI as the sorter, not the boss.",
    forStudents:
      "Especially useful for students juggling AP, IB, or dual-enrollment loads who keep losing the plot by Wednesday.",
    icon: FlaskConical,
    accent: "bg-sky-100 text-sky-700",
    chip: "Systems",
  },
  {
    id: "original-voice",
    title: "Original Voice Studio",
    hook: "Use AI for brainstorms and structure while keeping the final voice unmistakably theirs.",
    forStudents:
      "A natural fit for students exploring humanities, writing-heavy majors, or anything where voice is the product.",
    icon: PenLine,
    accent: "bg-orange-100 text-[#c2410c]",
    chip: "Writing",
  },
  {
    id: "bench-notes",
    title: "Bench Notes",
    hook: "Lab-adjacent workflows: capture methods, clean observation logs, and turn messy notes into study fuel.",
    forStudents:
      "Built with pre-med and life-science explorers in mind, without pretending a course replaces real lab hours.",
    icon: Microscope,
    accent: "bg-emerald-100 text-emerald-700",
    chip: "Life sciences",
  },
  {
    id: "proof-portfolio",
    title: "Proof Portfolio",
    hook: "Document how they think with AI: process artifacts admissions readers can trust more than a shiny prompt dump.",
    forStudents:
      "Especially sharp for students leaning CS, engineering, or any build-heavy path where process is the proof.",
    icon: Terminal,
    accent: "bg-violet-100 text-violet-700",
    chip: "CS / eng",
  },
  {
    id: "case-room",
    title: "Case Room Habits",
    hook: "AI for framing problems, stress-testing arguments, and prepping discussions without outsourcing judgment.",
    forStudents:
      "Useful if your student is curious about business, econ, policy, or debate-heavy classrooms.",
    icon: Briefcase,
    accent: "bg-amber-100 text-amber-800",
    chip: "Business",
  },
  {
    id: "studio-systems",
    title: "Studio Systems",
    hook: "Prompt and archive habits for creative work: iterations, references, and a trail that shows craft.",
    forStudents:
      "For students drawn to design, architecture, film, or visual arts who want AI without erasing authorship.",
    icon: Palette,
    accent: "bg-rose-100 text-rose-700",
    chip: "Arts",
  },
];

/**
 * Monetization: novel AI courses with tasteful major/background framing.
 */
export function CoursesSection() {
  const [interestTitle, setInterestTitle] = useState<string | null>(null);

  return (
    <section
      id="courses"
      className="relative overflow-hidden border-t border-slate-200 bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
      aria-labelledby="courses-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_0%_0%,rgba(14,165,233,0.1),transparent_55%),radial-gradient(ellipse_50%_40%_at_100%_100%,rgba(255,106,0,0.08),transparent_50%)]" />

      <div className="relative mx-auto w-full max-w-3xl lg:max-w-5xl xl:max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="max-w-3xl"
        >
          <p className={`text-[10px] font-black uppercase tracking-[0.22em] text-[#ff6a00] ${jakartaSans.className}`}>
            Courses
          </p>
          <h2
            id="courses-heading"
            className={`mt-3 text-[2rem] font-semibold leading-[1.05] tracking-[-0.035em] text-slate-900 sm:text-4xl lg:text-[2.85rem] ${fredokaHeadline.className}`}
          >
            Go deeper than the daily.{" "}
            <span className="text-sky-500">Learn the craft.</span>
          </h2>
          <p
            className={`ss-institutional mt-4 max-w-2xl text-[1.05rem] font-normal leading-[1.7] text-slate-600 sm:text-lg ${institutionalSerif.className}`}
          >
            Novel courses built by a student-led team. Not generic ChatGPT 101. Each one teaches a real school workflow,
            with notes on who tends to get the most out of it.
          </p>
        </motion.div>

        <ul className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {courses.map((course, index) => {
            const Icon = course.icon;
            return (
              <motion.li
                key={course.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.4, delay: index * 0.04 }}
                whileHover={{ y: -4 }}
                className="flex flex-col rounded-[1.75rem] border border-slate-200 bg-[#f8fafc] p-5 shadow-[0_18px_40px_-34px_rgba(15,23,42,0.35)] sm:p-6"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl ${course.accent}`}>
                    <Icon className="h-5 w-5" strokeWidth={2.25} aria-hidden />
                  </div>
                  <span
                    className={`rounded-full bg-white px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-slate-500 ${jakartaSans.className}`}
                  >
                    {course.chip}
                  </span>
                </div>
                <h3 className={`mt-4 text-xl font-semibold tracking-[-0.02em] text-slate-900 ${fredokaHeadline.className}`}>
                  {course.title}
                </h3>
                <p className={`mt-2 text-sm font-medium leading-relaxed text-slate-700 ${jakartaSans.className}`}>
                  {course.hook}
                </p>
                <p className={`mt-3 border-t border-slate-200/80 pt-3 text-xs font-semibold leading-relaxed text-slate-500 ${jakartaSans.className}`}>
                  {course.forStudents}
                </p>
                <button
                  type="button"
                  onClick={() => setInterestTitle(course.title)}
                  className={`mt-5 inline-flex items-center justify-center rounded-2xl bg-slate-900 px-4 py-2.5 text-xs font-black uppercase tracking-[0.14em] text-white transition hover:-translate-y-0.5 hover:bg-slate-800 ${jakartaSans.className}`}
                >
                  Request access
                </button>
              </motion.li>
            );
          })}
        </ul>

        <p className={`mt-8 flex items-center gap-2 text-sm font-medium text-slate-500 ${jakartaSans.className}`}>
          <Dna className="h-4 w-4 text-sky-500" aria-hidden />
          Courses are for student learners. Parents join the free daily, then help their student pick a path.
        </p>
      </div>

      <ProductInterestModal
        open={Boolean(interestTitle)}
        onClose={() => setInterestTitle(null)}
        kind="course"
        title={interestTitle ?? ""}
      />
    </section>
  );
}
