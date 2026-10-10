"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { institutionalSerif, jakartaSans } from "@/app/fonts";
import { HeroHeadline } from "./HeroHeadline";
import {
  APPLY_STEPS,
  COHORT,
  CURRICULUM,
  DISTINCTIVES,
  FOUNDER,
  HERO,
  MONTHLY_CYCLE,
  NEWSLETTER,
  PARTNERS,
  TEAM_SCHOOLS,
  THESIS,
} from "@/lib/program";

const serif = institutionalSerif.className;
const sans = jakartaSans.className;

export const buttonPrimary = `${sans} inline-flex items-center justify-center rounded-md bg-ink px-6 py-3.5 text-[0.95rem] font-semibold text-white transition-colors hover:bg-[#1d3359] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2`;

/** Two-column section: heading on the left, content on the right (stacks on mobile). */
function Section({
  id,
  title,
  intro,
  children,
  tone = "white",
}: {
  id: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
  tone?: "white" | "wash";
}) {
  return (
    <section id={id} className={`scroll-mt-20 border-t border-rule ${tone === "wash" ? "bg-wash" : "bg-white"}`}>
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[17rem_1fr] lg:gap-16">
        <div>
          <h2 className={`${serif} text-[1.9rem] font-semibold leading-[1.15] tracking-[-0.01em] text-ink sm:text-[2.2rem]`}>{title}</h2>
          {intro ? <p className={`${sans} mt-3 max-w-xs text-[0.95rem] leading-relaxed text-muted`}>{intro}</p> : null}
        </div>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}

/* Hero ---------------------------------------------------------------- */

export function ProgramHero() {
  return (
    <section className="bg-white pt-24 sm:pt-28">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 pb-14 pt-8 sm:px-8 sm:pb-20 sm:pt-14 lg:grid-cols-[1fr_22rem] lg:gap-16">
        <div>
          <HeroHeadline />
          <p className={`${sans} mt-4 max-w-[60ch] text-[1.05rem] leading-[1.7] text-body sm:text-lg`}>{HERO.lede}</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link href="/apply" className={buttonPrimary}>
              Apply for {COHORT.monthLabel.split(" ")[0]}
            </Link>
            <a href="#newsletter" className={`${sans} text-[0.95rem] font-semibold text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent`}>
              Or read our free newsletter first
            </a>
          </div>
        </div>

        <aside aria-label="Admissions" className="self-start rounded-md border border-rule bg-wash">
          <div className="border-b border-rule px-6 py-5">
            <p className={`${sans} text-sm font-semibold text-accent`}>Now accepting applications</p>
            <p className={`${serif} mt-1 text-2xl font-semibold text-ink`}>{COHORT.monthLabel} cohort</p>
          </div>
          <dl className={`${sans} divide-y divide-rule px-6 text-[0.95rem]`}>
            {[
              ["Enrollment", `${COHORT.seats} families`],
              ["Students", COHORT.grades],
              ["Format", COHORT.format],
              ["Admission", "By application"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 py-3">
                <dt className="text-muted">{k}</dt>
                <dd className="text-right font-semibold text-ink">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="px-6 pb-6 pt-2">
            <Link href="/apply" className={`${buttonPrimary} w-full`}>
              Start an application
            </Link>
          </div>
        </aside>
      </div>

      <div className="border-t border-rule">
        <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
          <ul aria-label="Universities our team attends" className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
            {TEAM_SCHOOLS.map((s) => (
              <li key={s.name} className={`${sans} flex items-center gap-2 text-[1rem] font-bold`} style={{ color: s.color }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.logo} alt={s.wordmark ? s.name : ""} className="h-7 w-auto" />
                {s.wordmark ? null : s.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* Why ----------------------------------------------------------------- */

export function ThesisSection() {
  return (
    <Section id="about" title={THESIS.heading} tone="wash">
      <div className={`${serif} max-w-[64ch] space-y-5 text-[1.15rem] leading-[1.75] text-ink sm:text-[1.25rem]`}>
        {THESIS.paragraphs.map((p) => (
          <p key={p.slice(0, 20)}>{p}</p>
        ))}
      </div>
      <p className={`${sans} mt-6 text-[0.95rem] text-body`}>
        <span className="font-semibold text-ink">{FOUNDER.name}</span>
        <span className="block text-muted sm:ml-2 sm:inline">{FOUNDER.title}</span>
      </p>
      <dl className="mt-12 grid gap-x-10 gap-y-8 border-t border-rule pt-10 sm:grid-cols-2">
        {DISTINCTIVES.map((d) => (
          <div key={d.title}>
            <dt className={`${sans} text-base font-semibold text-ink`}>{d.title}</dt>
            <dd className={`${sans} mt-1.5 text-[0.95rem] leading-relaxed text-body`}>{d.body}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}

/* Curriculum ---------------------------------------------------------- */

export function CurriculumSection() {
  return (
    <Section id="program" title="What students learn" intro="Each month's lessons cover these areas, adjusted for the student's grade.">
      <dl className="divide-y divide-rule border-y border-rule">
        {CURRICULUM.map((c) => (
          <div key={c.topic} className="grid gap-1 py-5 sm:grid-cols-[12rem_1fr] sm:gap-8">
            <dt className={`${sans} text-base font-semibold text-ink`}>{c.topic}</dt>
            <dd className={`${sans} text-[0.98rem] leading-relaxed text-body`}>{c.detail}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}

/* Monthly cycle ------------------------------------------------------- */

export function MonthlyCycleSection() {
  return (
    <Section
      id="monthly"
      title="How the lessons stay current"
      intro="Our team works on a four-week cycle, so what students learn reflects the tools and policies in place that month."
      tone="wash"
    >
      <ol className="grid gap-px overflow-hidden rounded-md border border-rule bg-rule sm:grid-cols-2">
        {MONTHLY_CYCLE.map((s) => (
          <li key={s.title} className="bg-white p-6">
            <p className={`${sans} text-sm text-muted`}>{s.week}</p>
            <h3 className={`${serif} mt-1 text-xl font-semibold text-ink`}>{s.title}</h3>
            <p className={`${sans} mt-2 text-[0.95rem] leading-relaxed text-body`}>{s.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

/* Founder ------------------------------------------------------------- */

export function FounderSection() {
  return (
    <section className="border-t border-rule bg-white">
      <figure className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
        <blockquote className={`${serif} text-[1.5rem] leading-[1.5] text-ink sm:text-[1.85rem]`}>
          <p>&ldquo;{FOUNDER.quote}&rdquo;</p>
        </blockquote>
        <figcaption className={`${sans} mt-6 text-[0.95rem] text-body`}>
          <span className="font-semibold text-ink">{FOUNDER.name}</span>
          <span className="block text-muted sm:inline sm:before:mx-2 sm:before:content-['/']">{FOUNDER.title}</span>
        </figcaption>
      </figure>
    </section>
  );
}

/* Partners ------------------------------------------------------------ */

export function PartnersSection() {
  const anyNamed = PARTNERS.some((p) => p.name);
  return (
    <Section
      id="partners"
      title="Educational partners"
      intro="We work with organizations that add something specific to a student's month."
      tone="wash"
    >
      <dl className="grid gap-px overflow-hidden rounded-md border border-rule bg-rule sm:grid-cols-2">
        {PARTNERS.map((p) => (
          <div key={p.role} className="bg-white p-6">
            <dt className={`${sans} flex items-center justify-between gap-3 text-base font-semibold text-ink`}>
              {p.name ?? p.role}
              {p.logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.logo} alt="" className="h-6 w-auto" />
              ) : null}
            </dt>
            {p.name ? <p className={`${sans} text-sm text-muted`}>{p.role}</p> : null}
            <dd className={`${sans} mt-2 text-[0.95rem] leading-relaxed text-body`}>{p.benefit}</dd>
          </div>
        ))}
      </dl>
      {!anyNamed ? (
        <p className={`${sans} mt-5 text-sm text-muted`}>
          Partners for the {COHORT.monthLabel} cohort are shared with admitted families.
        </p>
      ) : null}
    </Section>
  );
}

/* Admissions ---------------------------------------------------------- */

export function AdmissionsSection() {
  return (
    <Section
      id="admissions"
      title="Admissions"
      intro={`Each monthly cohort is limited to ${COHORT.seats} families so we can review every application personally.`}
    >
      <ol className="border-t border-rule">
        {APPLY_STEPS.map((s, i) => (
          <li key={s.title} className="grid grid-cols-[2.5rem_1fr] gap-4 border-b border-rule py-6">
            <span className={`${serif} text-2xl font-semibold leading-none text-accent`}>{i + 1}</span>
            <div>
              <h3 className={`${sans} text-base font-semibold text-ink`}>{s.title}</h3>
              <p className={`${sans} mt-1.5 max-w-[60ch] text-[0.98rem] leading-relaxed text-body`}>{s.body}</p>
            </div>
          </li>
        ))}
      </ol>
      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
        <Link href="/apply" className={buttonPrimary}>
          Start an application
        </Link>
        <p className={`${sans} text-sm text-muted`}>{COHORT.reviewNote}</p>
      </div>
    </Section>
  );
}

/* Newsletter ---------------------------------------------------------- */

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
      if (!res.ok) throw new Error(data.error ?? "Subscription failed. Try again in a moment.");
      setState("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Subscription failed. Try again in a moment.");
      setState("error");
    }
  }

  return (
    <Section
      id="newsletter"
      title="The StudentStack newsletter"
      intro={`Free, and read by more than ${NEWSLETTER.readerCountLabel} parents.`}
      tone="wash"
    >
      <p className={`${sans} max-w-[60ch] text-[1.02rem] leading-relaxed text-body`}>
        Our team writes about new AI tools, what they mean for high school students, and one thing to try at home.
        It&apos;s a good place to start if you&apos;d like to know us before applying.
      </p>
      {NEWSLETTER.beehiivUrl ? (
        <a href={NEWSLETTER.beehiivUrl} target="_blank" rel="noreferrer" className={`${buttonPrimary} mt-6`}>
          Subscribe
        </a>
      ) : state === "done" ? (
        <p role="status" className={`${sans} mt-6 font-semibold text-ink`}>
          Subscribed. The next issue will arrive at {email}.
        </p>
      ) : (
        <form onSubmit={onSubmit} className="mt-6 flex max-w-xl flex-col gap-3 sm:flex-row">
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className={`${sans} min-w-0 flex-1 rounded-md border border-rule bg-white px-4 py-3 text-base text-ink outline-none placeholder:text-muted focus:border-accent focus:ring-1 focus:ring-accent`}
          />
          <button type="submit" disabled={state === "loading"} className={`${buttonPrimary} gap-2 disabled:opacity-60`}>
            {state === "loading" ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : null}
            Subscribe
          </button>
        </form>
      )}
      {state === "error" ? (
        <p role="alert" className={`${sans} mt-3 text-sm font-semibold text-[#B42318]`}>
          {error}
        </p>
      ) : null}
    </Section>
  );
}

/* Closing ------------------------------------------------------------- */

export function FinalCtaSection() {
  return (
    <section className="border-t border-rule bg-ink">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-14 sm:px-8 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className={`${serif} text-[1.9rem] font-semibold leading-tight text-white sm:text-[2.2rem]`}>
            Applications for the {COHORT.monthLabel} cohort are open.
          </h2>
          <p className={`${sans} mt-2 text-[0.98rem] text-[#C5CFDD]`}>
            The application takes about five minutes. We reply to every family.
          </p>
        </div>
        <Link
          href="/apply"
          className={`${sans} inline-flex shrink-0 items-center justify-center rounded-md bg-white px-6 py-3.5 text-[0.95rem] font-semibold text-ink transition-colors hover:bg-wash`}
        >
          Start an application
        </Link>
      </div>
    </section>
  );
}
