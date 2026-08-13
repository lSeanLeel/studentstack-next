"use client";

import React, { useMemo, useState } from "react";
import { motion } from "motion/react";
import {
  ArrowRight,
  CalendarDays,
  Clock3,
  Users,
  Video,
} from "lucide-react";
import { fredokaHeadline, jakartaSans, institutionalSerif } from "@/app/fonts";
import { ProductInterestModal } from "@/components/ProductInterestModal";

type CourseFormat = "live" | "self-paced";

type Course = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  forWhom: string;
  modules: string[];
  format: CourseFormat;
  /** Sort key for timeline buckets */
  timeline: "next-week" | "two-weeks" | "self-paced";
  startsLabel: string;
  duration: string;
  sessions: string;
  seatsLeft: number;
  seatsTotal: number;
  price: number;
  instructor: string;
  track: string;
};

const courses: Course[] = [
  {
    id: "syllabus-os",
    title: "Syllabus OS",
    tagline: "One operating system for every syllabus on the desk",
    description:
      "A live cohort that builds a working weekly OS: intake every syllabus, extract deadlines, set buffers, and keep AI as the sorter. Students leave with a reusable system, not a pile of tips.",
    forWhom:
      "High schoolers carrying AP, IB, or dual-enrollment loads who keep slipping into midweek catch-up.",
    modules: [
      "Syllabus intake & deadline extraction",
      "Week board + buffer rules",
      "AI triage without losing ownership",
      "Sunday reset ritual",
    ],
    format: "live",
    timeline: "next-week",
    startsLabel: "Starts Mon, Aug 18",
    duration: "2 weeks",
    sessions: "4 live sessions · 75 min",
    seatsLeft: 6,
    seatsTotal: 24,
    price: 189,
    instructor: "Maya Chen · UCLA",
    track: "Systems",
  },
  {
    id: "original-voice",
    title: "Original Voice Studio",
    tagline: "Brainstorm with AI. Submit in your own voice.",
    description:
      "Workshop-style writing course for essays and long assignments. Students practice outline help, claim stress-tests, and a rewrite loop that keeps the final draft unmistakably theirs.",
    forWhom:
      "Students in writing-heavy classes, and anyone exploring humanities, English, history, or pre-law paths.",
    modules: [
      "Prompt boundaries that protect voice",
      "Outline → claim → evidence loop",
      "Rewrite clinic with peer critique",
      "Integrity checklist teachers recognize",
    ],
    format: "live",
    timeline: "next-week",
    startsLabel: "Starts Wed, Aug 20",
    duration: "3 weeks",
    sessions: "6 live sessions · 60 min",
    seatsLeft: 4,
    seatsTotal: 18,
    price: 249,
    instructor: "Jordan Ellis · Columbia",
    track: "Writing",
  },
  {
    id: "bench-notes",
    title: "Bench Notes",
    tagline: "Lab-adjacent notes that survive real science classes",
    description:
      "Capture methods, clean observation logs, and turn messy notes into study fuel. Built for science schedules where the notebook is the product.",
    forWhom:
      "Students in biology, chemistry, or research electives, especially those exploring pre-med or life sciences.",
    modules: [
      "Observation capture templates",
      "Method logs teachers can follow",
      "AI cleanup without inventing data",
      "Exam-ready note packs",
    ],
    format: "live",
    timeline: "two-weeks",
    startsLabel: "Starts Mon, Aug 25",
    duration: "2 weeks",
    sessions: "4 live sessions · 70 min",
    seatsLeft: 11,
    seatsTotal: 20,
    price: 219,
    instructor: "Priya Nair · Stanford",
    track: "Life sciences",
  },
  {
    id: "proof-portfolio",
    title: "Proof Portfolio",
    tagline: "Show how you think, not just what a model spat out",
    description:
      "Students build a process portfolio: decision logs, iteration history, and artifacts that make AI-assisted work legible to teachers and future readers.",
    forWhom:
      "Students leaning CS, engineering, or any build-heavy path where process is the proof.",
    modules: [
      "Process artifact standards",
      "Decision logs & version trails",
      "Portfolio assembly workshop",
      "Reviewer walkthrough rehearsal",
    ],
    format: "live",
    timeline: "two-weeks",
    startsLabel: "Starts Mon, Sep 1",
    duration: "3 weeks",
    sessions: "5 live sessions · 75 min",
    seatsLeft: 9,
    seatsTotal: 16,
    price: 279,
    instructor: "Alex Rivera · Caltech",
    track: "CS / engineering",
  },
  {
    id: "case-room",
    title: "Case Room Habits",
    tagline: "Frame, stress-test, and defend with AI as sparring partner",
    description:
      "Self-paced course for discussion-heavy classes. Students learn to frame problems, pressure-test arguments, and prep talking points without outsourcing judgment.",
    forWhom:
      "Students curious about business, econ, policy, debate, or seminar-style classrooms.",
    modules: [
      "Case intake in 20 minutes",
      "Counter-argument drills",
      "AI as sparring partner rules",
      "Discussion day runbook",
    ],
    format: "self-paced",
    timeline: "self-paced",
    startsLabel: "Start anytime",
    duration: "~8 hours",
    sessions: "12 lessons · async",
    seatsLeft: 999,
    seatsTotal: 999,
    price: 129,
    instructor: "Sam Okonkwo · Berkeley",
    track: "Business / policy",
  },
  {
    id: "studio-systems",
    title: "Studio Systems",
    tagline: "Creative iteration with a trail that proves craft",
    description:
      "Self-paced studio course: prompt libraries, reference boards, and archive habits so AI accelerates drafts without erasing authorship.",
    forWhom:
      "Students drawn to design, architecture, film, or visual arts who need a clean process story.",
    modules: [
      "Reference board systems",
      "Iteration archives",
      "Prompt craft for studio briefs",
      "Authorship narrative kit",
    ],
    format: "self-paced",
    timeline: "self-paced",
    startsLabel: "Start anytime",
    duration: "~6 hours",
    sessions: "10 lessons · async",
    seatsLeft: 999,
    seatsTotal: 999,
    price: 99,
    instructor: "Lina Park · RISD-bound mentor desk",
    track: "Arts / design",
  },
];

const timelineMeta = {
  "next-week": {
    eyebrow: "Starting next week",
    title: "Live cohorts opening soon",
    blurb: "Small groups. Fixed start dates. Seats limited.",
  },
  "two-weeks": {
    eyebrow: "In two weeks",
    title: "Next wave of live courses",
    blurb: "Enroll now to lock a seat before the roster closes.",
  },
  "self-paced": {
    eyebrow: "Self-paced",
    title: "Start on your schedule",
    blurb: "Full curriculum, mentor office hours by request, no live cohort required.",
  },
} as const;

function formatPrice(n: number) {
  return `$${n}`;
}

function CourseProductRow({
  course,
  index,
  onEnroll,
}: {
  course: Course;
  index: number;
  onEnroll: (course: Course) => void;
}) {
  const limited = course.format === "live";

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.2) }}
      className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_24px_50px_-40px_rgba(15,23,42,0.35)]"
    >
      <div className="flex flex-col lg:flex-row">
        <div className="flex-1 border-b border-slate-100 p-6 sm:p-8 lg:border-b-0 lg:border-r">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`rounded-full bg-sky-50 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-sky-700 ${jakartaSans.className}`}
            >
              {course.track}
            </span>
            <span
              className={`rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.14em] ${
                course.format === "live"
                  ? "bg-orange-50 text-[#c2410c]"
                  : "bg-emerald-50 text-emerald-700"
              } ${jakartaSans.className}`}
            >
              {course.format === "live" ? "Live cohort" : "Self-paced"}
            </span>
          </div>

          <h3 className={`mt-4 text-2xl font-semibold tracking-[-0.03em] text-slate-900 sm:text-3xl ${fredokaHeadline.className}`}>
            {course.title}
          </h3>
          <p className={`mt-1 text-base font-semibold text-sky-600 ${jakartaSans.className}`}>{course.tagline}</p>
          <p className={`mt-4 text-sm font-medium leading-relaxed text-slate-600 sm:text-[0.95rem] ${jakartaSans.className}`}>
            {course.description}
          </p>
          <p className={`mt-3 text-sm font-semibold leading-relaxed text-slate-500 ${jakartaSans.className}`}>
            Best fit: {course.forWhom}
          </p>

          <div className="mt-6">
            <p className={`text-[10px] font-black uppercase tracking-[0.18em] text-slate-400 ${jakartaSans.className}`}>
              What you complete
            </p>
            <ol className="mt-3 space-y-2">
              {course.modules.map((mod, i) => (
                <li key={mod} className={`flex gap-3 text-sm font-medium text-slate-700 ${jakartaSans.className}`}>
                  <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-900 text-[11px] font-black text-white">
                    {i + 1}
                  </span>
                  <span className="pt-0.5">{mod}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="flex w-full flex-col justify-between bg-[#f8fafc] p-6 sm:p-8 lg:w-[19.5rem] xl:w-[21rem]">
          <div>
            <p className={`text-[10px] font-black uppercase tracking-[0.18em] text-slate-400 ${jakartaSans.className}`}>
              Enrollment
            </p>
            <p className={`mt-2 text-4xl font-semibold tracking-[-0.04em] text-slate-900 ${fredokaHeadline.className}`}>
              {formatPrice(course.price)}
            </p>
            <p className={`mt-1 text-xs font-semibold text-slate-500 ${jakartaSans.className}`}>
              {course.format === "live" ? "Per student · live cohort" : "Per student · lifetime access"}
            </p>

            <ul className={`mt-6 space-y-3 text-sm font-semibold text-slate-700 ${jakartaSans.className}`}>
              <li className="flex items-start gap-2.5">
                <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-sky-500" aria-hidden />
                <span>{course.startsLabel}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-sky-500" aria-hidden />
                <span>
                  {course.duration} · {course.sessions}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Video className="mt-0.5 h-4 w-4 shrink-0 text-sky-500" aria-hidden />
                <span>{course.instructor}</span>
              </li>
              {limited ? (
                <li className="flex items-start gap-2.5">
                  <Users className="mt-0.5 h-4 w-4 shrink-0 text-[#ff6a00]" aria-hidden />
                  <span>
                    {course.seatsLeft} of {course.seatsTotal} seats left
                  </span>
                </li>
              ) : null}
            </ul>
          </div>

          <button
            type="button"
            onClick={() => onEnroll(course)}
            className={`mt-8 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-4 py-3.5 text-xs font-black uppercase tracking-[0.14em] text-white shadow-[0_16px_32px_-18px_rgba(15,23,42,0.55)] transition hover:-translate-y-0.5 hover:bg-slate-800 ${jakartaSans.className}`}
          >
            Enroll · {formatPrice(course.price)}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </button>
        </div>
      </div>
    </motion.article>
  );
}

/**
 * Productized, timeline-driven course catalog (stacked list, not grid).
 */
export function CoursesSection() {
  const [interest, setInterest] = useState<{ title: string; detail: string } | null>(null);

  const grouped = useMemo(() => {
    const order: Course["timeline"][] = ["next-week", "two-weeks", "self-paced"];
    return order.map((key) => ({
      key,
      ...timelineMeta[key],
      items: courses.filter((c) => c.timeline === key),
    }));
  }, []);

  return (
    <section
      id="courses"
      className="relative overflow-hidden border-t border-slate-200 bg-[#f1f5f9] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
      aria-labelledby="courses-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_45%_at_0%_0%,rgba(14,165,233,0.12),transparent_55%)]" />

      <div className="relative mx-auto w-full max-w-3xl lg:max-w-5xl xl:max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="max-w-3xl"
        >
          <p className={`text-[10px] font-black uppercase tracking-[0.22em] text-[#ff6a00] ${jakartaSans.className}`}>
            Course catalog
          </p>
          <h2
            id="courses-heading"
            className={`mt-3 text-[2rem] font-semibold leading-[1.05] tracking-[-0.035em] text-slate-900 sm:text-4xl lg:text-[2.85rem] ${fredokaHeadline.className}`}
          >
            Enroll in a course.{" "}
            <span className="text-sky-500">Pick a start date.</span>
          </h2>
          <p
            className={`ss-institutional mt-4 max-w-2xl text-[1.05rem] font-normal leading-[1.7] text-slate-600 sm:text-lg ${institutionalSerif.className}`}
          >
            Live cohorts with fixed calendars, plus self-paced tracks you can start tonight. Every course is a full
            product: curriculum, mentor, price, and a clear finish line.
          </p>
        </motion.div>

        <div className="mt-12 space-y-14 sm:mt-14">
          {grouped.map((group) => (
            <div key={group.key}>
              <div className="mb-5 flex flex-col gap-1 border-b border-slate-200 pb-4 sm:mb-6 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className={`text-[10px] font-black uppercase tracking-[0.2em] text-sky-600 ${jakartaSans.className}`}>
                    {group.eyebrow}
                  </p>
                  <h3 className={`mt-1 text-xl font-semibold tracking-[-0.02em] text-slate-900 sm:text-2xl ${fredokaHeadline.className}`}>
                    {group.title}
                  </h3>
                </div>
                <p className={`text-sm font-medium text-slate-500 ${jakartaSans.className}`}>{group.blurb}</p>
              </div>

              <div className="space-y-5">
                {group.items.map((course, index) => (
                  <CourseProductRow
                    key={course.id}
                    course={course}
                    index={index}
                    onEnroll={(c) =>
                      setInterest({
                        title: c.title,
                        detail: `${c.startsLabel} · ${formatPrice(c.price)} · ${c.format === "live" ? "live cohort" : "self-paced"}`,
                      })
                    }
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <ProductInterestModal
        open={Boolean(interest)}
        onClose={() => setInterest(null)}
        kind="course"
        title={interest ? `${interest.title} (${interest.detail})` : ""}
      />
    </section>
  );
}
