"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowRight,
  BookOpenCheck,
  CalendarCheck,
  CheckCircle2,
  Compass,
  FileSearch,
  Hammer,
  Loader2,
  Mail,
  PenLine,
  ShieldCheck,
} from "lucide-react";
import { fredokaHeadline, jakartaSans } from "@/app/fonts";
import {
  ADVANTAGES,
  APPLY_STEPS,
  COHORT,
  MONTHLY_CYCLE,
  NEWSLETTER,
  PARTNERS,
  SKILLS,
  THESIS,
} from "@/lib/program";

const reveal = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
};

function Eyebrow({ children, tone = "sky" }: { children: React.ReactNode; tone?: "sky" | "light" }) {
  return (
    <p
      className={`${jakartaSans.className} text-[11px] font-black uppercase tracking-[0.22em] ${
        tone === "light" ? "text-sky-300" : "text-sky-600"
      }`}
    >
      {children}
    </p>
  );
}

function H2({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <h2
      className={`${fredokaHeadline.className} mt-3 text-[2.1rem] font-semibold leading-[1.02] tracking-[-0.035em] sm:text-5xl ${
        light ? "text-white" : "text-slate-900"
      }`}
    >
      {children}
    </h2>
  );
}

/* ------------------------------------------------------------------ */
/* Thesis                                                              */
/* ------------------------------------------------------------------ */

export function ThesisSection() {
  return (
    <section id="thesis" className="scroll-mt-24 px-4 pb-20 sm:px-6 sm:pb-28">
      <motion.div
        {...reveal}
        className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-slate-900 px-6 py-14 text-white sm:rounded-[3.5rem] sm:px-14 sm:py-20"
      >
        <div className="pointer-events-none absolute -right-28 -top-28 h-80 w-80 rounded-full bg-sky-500/20 blur-3xl" aria-hidden />
        <div className="pointer-events-none absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-emerald-400/10 blur-3xl" aria-hidden />

        <div className="relative grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
          <div>
            <Eyebrow tone="light">Our thesis</Eyebrow>
            <p className={`${fredokaHeadline.className} mt-4 text-[2rem] font-semibold leading-[1.05] tracking-[-0.03em] sm:text-[3.25rem]`}>
              {THESIS.claim}
            </p>
          </div>
          <div className={`${jakartaSans.className} flex flex-col justify-end gap-5 text-[0.98rem] font-medium leading-relaxed text-slate-300 sm:text-lg`}>
            <p>{THESIS.support}</p>
            <p className="border-l-2 border-sky-400 pl-4 text-white">{THESIS.who}</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* What students learn                                                 */
/* ------------------------------------------------------------------ */

const SKILL_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  organize: CalendarCheck,
  research: FileSearch,
  study: BookOpenCheck,
  write: PenLine,
  build: Hammer,
  integrity: ShieldCheck,
};

export function ProgramSection() {
  return (
    <section id="program" className="scroll-mt-24 px-4 pb-20 sm:px-6 sm:pb-28">
      <div className="mx-auto max-w-6xl">
        <motion.div {...reveal} className="max-w-2xl">
          <Eyebrow>The program</Eyebrow>
          <H2>
            What top students do with AI, <span className="text-sky-500">taught step by step.</span>
          </H2>
          <p className={`${jakartaSans.className} mt-4 text-base font-medium leading-relaxed text-slate-600 sm:text-lg`}>
            Every month your student gets a new playbook of real use cases, tied to the assignments high schoolers
            actually have.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 sm:gap-4">
          {SKILLS.map((s, i) => {
            const Icon = SKILL_ICONS[s.id] ?? Compass;
            const isIntegrity = s.id === "integrity";
            return (
              <motion.div
                key={s.id}
                {...reveal}
                transition={{ ...reveal.transition, delay: i * 0.05 }}
                className={`rounded-[1.75rem] border p-5 sm:p-6 ${
                  isIntegrity ? "border-emerald-200 bg-emerald-50/80" : "border-slate-200/80 bg-white/90"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${
                      isIntegrity ? "bg-emerald-500 text-white" : "bg-sky-100 text-sky-600"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className={`${fredokaHeadline.className} text-xl font-semibold tracking-[-0.02em] text-slate-900`}>
                    {s.title}
                  </h3>
                </div>
                <p className={`${jakartaSans.className} mt-3 text-sm font-medium leading-relaxed text-slate-600 sm:text-[0.95rem]`}>
                  {s.line}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* How the team runs each month                                        */
/* ------------------------------------------------------------------ */

export function MonthlyCycleSection() {
  return (
    <section id="monthly" className="scroll-mt-24 border-y border-slate-100 bg-white px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div {...reveal} className="max-w-2xl">
          <Eyebrow>How we run each month</Eyebrow>
          <H2>
            AI changes every month. <span className="text-sky-500">So does the program.</span>
          </H2>
          <p className={`${jakartaSans.className} mt-4 text-base font-medium leading-relaxed text-slate-600 sm:text-lg`}>
            A course recorded last year is already out of date. Our team works on a monthly cycle so your student
            always learns what works right now.
          </p>
        </motion.div>

        <ol className="relative mt-12 grid gap-4 md:grid-cols-4 md:gap-5">
          <div
            className="pointer-events-none absolute left-0 right-[24%] top-[1.4rem] hidden h-[2px] bg-gradient-to-r from-sky-200 via-sky-300 to-emerald-300 md:block"
            aria-hidden
          />
          {MONTHLY_CYCLE.map((step, i) => (
            <motion.li
              key={step.title}
              {...reveal}
              transition={{ ...reveal.transition, delay: i * 0.08 }}
              className="relative flex gap-4 md:block"
            >
              <div
                className={`${fredokaHeadline.className} relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-white text-lg font-semibold text-white shadow-[0_6px_0_0_rgba(15,23,42,0.08)] ${
                  i === MONTHLY_CYCLE.length - 1 ? "bg-emerald-500" : "bg-sky-500"
                }`}
              >
                {i + 1}
              </div>
              <div className="md:mt-5">
                <p className={`${jakartaSans.className} text-[11px] font-black uppercase tracking-[0.18em] text-slate-400`}>
                  {step.week}
                </p>
                <h3 className={`${fredokaHeadline.className} mt-1 text-2xl font-semibold tracking-[-0.02em] text-slate-900`}>
                  {step.title}
                </h3>
                <p className={`${jakartaSans.className} mt-2 text-sm font-medium leading-relaxed text-slate-600`}>
                  {step.body}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Why us (defensible advantages)                                      */
/* ------------------------------------------------------------------ */

export function AdvantageSection() {
  return (
    <section id="why-us" className="scroll-mt-24 px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div {...reveal} className="max-w-2xl">
          <Eyebrow>Why StudentStack</Eyebrow>
          <H2>
            Hard to copy, <span className="text-sky-500">because of who builds it.</span>
          </H2>
        </motion.div>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {ADVANTAGES.map((a, i) => (
            <motion.div
              key={a.title}
              {...reveal}
              transition={{ ...reveal.transition, delay: i * 0.06 }}
              className="flex gap-4 rounded-[1.75rem] border border-slate-200/80 bg-white/90 p-6 sm:p-7"
            >
              <CheckCircle2 className="mt-1 h-6 w-6 shrink-0 text-sky-500" aria-hidden />
              <div>
                <h3 className={`${fredokaHeadline.className} text-xl font-semibold tracking-[-0.02em] text-slate-900 sm:text-2xl`}>
                  {a.title}
                </h3>
                <p className={`${jakartaSans.className} mt-2 text-sm font-medium leading-relaxed text-slate-600 sm:text-[0.95rem]`}>
                  {a.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Educational partners                                                */
/* ------------------------------------------------------------------ */

export function PartnersSection() {
  const anyNamed = PARTNERS.some((p) => p.name);
  return (
    <section id="partners" className="scroll-mt-24 border-y border-slate-100 bg-white px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div {...reveal} className="max-w-2xl">
          <Eyebrow>Educational partners</Eyebrow>
          <H2>
            Partners chosen for <span className="text-sky-500">what they give your student.</span>
          </H2>
          <p className={`${jakartaSans.className} mt-4 text-base font-medium leading-relaxed text-slate-600 sm:text-lg`}>
            We don&apos;t collect logos. Each partner fills a specific gap in a student&apos;s month, from tool access to
            credentials that show up on applications.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {PARTNERS.map((p, i) => (
            <motion.div
              key={p.role}
              {...reveal}
              transition={{ ...reveal.transition, delay: i * 0.06 }}
              className="flex flex-col rounded-[1.75rem] border border-slate-200/80 bg-[#f8fafc] p-6 sm:p-7"
            >
              <div className="flex items-center justify-between gap-3">
                <p className={`${jakartaSans.className} text-[11px] font-black uppercase tracking-[0.18em] text-sky-600`}>
                  {p.role}
                </p>
                {p.logo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.logo} alt={p.name ?? ""} className="h-7 w-auto object-contain" />
                ) : null}
              </div>
              {p.name ? (
                <h3 className={`${fredokaHeadline.className} mt-2 text-xl font-semibold text-slate-900`}>{p.name}</h3>
              ) : null}
              <p className={`${jakartaSans.className} mt-2 text-sm font-medium leading-relaxed text-slate-700 sm:text-[0.95rem]`}>
                {p.benefit}
              </p>
            </motion.div>
          ))}
        </div>
        {!anyNamed ? (
          <p className={`${jakartaSans.className} mt-6 text-sm font-semibold text-slate-500`}>
            Partner details for the {COHORT.name} are shared with accepted families.
          </p>
        ) : null}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Limited cohort + how to join                                        */
/* ------------------------------------------------------------------ */

export function CohortSection() {
  return (
    <section id="cohort" className="scroll-mt-24 px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
        <motion.div
          {...reveal}
          className="relative self-start overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-sky-500 to-sky-600 p-8 text-white sm:p-10"
        >
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/15 blur-2xl" aria-hidden />
          <Eyebrow tone="light">
            <span className="text-sky-100">Limited cohort</span>
          </Eyebrow>
          <p className={`${fredokaHeadline.className} mt-4 text-[5.5rem] font-semibold leading-none tracking-[-0.05em] sm:text-[7rem]`}>
            {COHORT.seats}
          </p>
          <p className={`${fredokaHeadline.className} text-2xl font-semibold tracking-[-0.02em]`}>families per month</p>
          <p className={`${jakartaSans.className} mt-5 max-w-sm text-sm font-medium leading-relaxed text-sky-50 sm:text-base`}>
            We keep cohorts small so our team can personally review every family. When the month is full, new
            applicants are considered for the next one.
          </p>
          <p className={`${jakartaSans.className} mt-6 inline-flex rounded-full bg-white/15 px-4 py-2 text-xs font-black uppercase tracking-[0.16em]`}>
            {COHORT.name} · {COHORT.startLabel.replace("Starts ", "starts ")}
          </p>
        </motion.div>

        <motion.div {...reveal}>
          <Eyebrow>How to join</Eyebrow>
          <H2>
            Admission is <span className="text-sky-500">by application.</span>
          </H2>
          <ol className="mt-8 space-y-5">
            {APPLY_STEPS.map((s, i) => (
              <li key={s.title} className="flex gap-4">
                <span
                  className={`${fredokaHeadline.className} flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-900 text-base font-semibold text-white`}
                >
                  {i + 1}
                </span>
                <div>
                  <h3 className={`${fredokaHeadline.className} text-xl font-semibold tracking-[-0.02em] text-slate-900`}>
                    {s.title}
                  </h3>
                  <p className={`${jakartaSans.className} mt-1 text-sm font-medium leading-relaxed text-slate-600 sm:text-[0.95rem]`}>
                    {s.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
          <Link
            href="/apply"
            className={`${jakartaSans.className} mt-8 inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-6 py-3.5 text-xs font-black uppercase tracking-[0.14em] text-white transition hover:-translate-y-0.5 hover:bg-slate-800`}
          >
            Start your application
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
          <p className={`${jakartaSans.className} mt-3 text-xs font-semibold text-slate-500`}>{COHORT.reviewNote}</p>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Newsletter (beehiiv)                                                */
/* ------------------------------------------------------------------ */

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    setError("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ parentEmail: email, intent: "newsletter" }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(data.error ?? "Could not subscribe.");
      setState("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not subscribe.");
      setState("error");
    }
  }

  return (
    <section id="newsletter" className="scroll-mt-24 px-4 pb-20 sm:px-6 sm:pb-28">
      <motion.div
        {...reveal}
        className="mx-auto grid max-w-6xl items-center gap-8 rounded-[2.5rem] border border-amber-200/80 bg-gradient-to-br from-amber-50 to-white p-8 sm:p-12 lg:grid-cols-2"
      >
        <div>
          <Eyebrow>Free newsletter</Eyebrow>
          <H2>
            Join {NEWSLETTER.readerCountLabel} parents <span className="text-sky-500">staying ahead of AI.</span>
          </H2>
          <p className={`${jakartaSans.className} mt-4 text-base font-medium leading-relaxed text-slate-600`}>
            What's new in AI, what it means for high schoolers, and one thing to try at home. Written by
            our college team. Free.
          </p>
        </div>

        {NEWSLETTER.beehiivUrl ? (
          <a
            href={NEWSLETTER.beehiivUrl}
            target="_blank"
            rel="noreferrer"
            className={`${jakartaSans.className} inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-6 py-4 text-xs font-black uppercase tracking-[0.14em] text-white transition hover:bg-slate-800`}
          >
            <Mail className="h-4 w-4" aria-hidden />
            Subscribe free
          </a>
        ) : state === "done" ? (
          <div className={`${jakartaSans.className} flex items-center gap-3 rounded-2xl bg-emerald-50 p-5 text-sm font-bold text-emerald-800`}>
            <CheckCircle2 className="h-5 w-5 shrink-0" aria-hidden />
            You&apos;re in. Look for our next issue in your inbox.
          </div>
        ) : (
          <form onSubmit={onSubmit} className="flex w-full flex-col gap-3 sm:flex-row">
            <label htmlFor="newsletter-email" className="sr-only">
              Parent email
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Parent email"
              className={`${jakartaSans.className} min-w-0 flex-1 rounded-2xl border-2 border-slate-200 bg-white px-4 py-3.5 text-base font-semibold text-slate-900 outline-none transition focus:border-sky-400`}
            />
            <button
              type="submit"
              disabled={state === "loading"}
              className={`${jakartaSans.className} inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-6 py-3.5 text-xs font-black uppercase tracking-[0.14em] text-white transition hover:bg-slate-800 disabled:opacity-60`}
            >
              {state === "loading" ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : null}
              Subscribe free
            </button>
            {state === "error" ? (
              <p role="alert" className={`${jakartaSans.className} text-sm font-semibold text-rose-600 sm:basis-full`}>
                {error}
              </p>
            ) : null}
          </form>
        )}
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Final call to action                                                */
/* ------------------------------------------------------------------ */

export function FinalCtaSection() {
  return (
    <section className="px-4 pb-24 sm:px-6">
      <motion.div {...reveal} className="mx-auto max-w-3xl text-center">
        <h2 className={`${fredokaHeadline.className} text-[2.25rem] font-semibold leading-[1.02] tracking-[-0.035em] text-slate-900 sm:text-6xl`}>
          Give your student the <span className="text-sky-500">head start</span> top students already have.
        </h2>
        <p className={`${jakartaSans.className} mx-auto mt-5 max-w-xl text-base font-medium text-slate-600 sm:text-lg`}>
          Applications for the {COHORT.name} take about two minutes. We reply to every family personally.
        </p>
        <Link
          href="/apply"
          className={`${jakartaSans.className} mt-8 inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-8 py-4 text-xs font-black uppercase tracking-[0.14em] text-white shadow-[0_14px_28px_-18px_rgba(15,23,42,0.5)] transition hover:-translate-y-0.5 hover:bg-slate-800 sm:text-sm`}
        >
          Apply now
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </motion.div>
    </section>
  );
}
