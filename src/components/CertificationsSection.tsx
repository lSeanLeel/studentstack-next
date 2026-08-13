"use client";

import React, { useMemo, useState } from "react";
import { motion } from "motion/react";
import {
  ArrowRight,
  Award,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileBadge2,
} from "lucide-react";
import { fredokaHeadline, jakartaSans, institutionalSerif } from "@/app/fonts";
import { ProductInterestModal } from "@/components/ProductInterestModal";

type CertFormat = "cohort" | "rolling";

type Certification = {
  id: string;
  title: string;
  credential: string;
  tagline: string;
  description: string;
  youGet: string[];
  requirements: string[];
  partner: {
    initials: string;
    name: string;
    role: string;
    tint: string;
  };
  format: CertFormat;
  timeline: "next-week" | "two-weeks" | "rolling";
  startsLabel: string;
  duration: string;
  price: number;
  examFeeIncluded: boolean;
  seatsLeft?: number;
  level: string;
};

const certifications: Certification[] = [
  {
    id: "integrity",
    title: "Academic AI Integrity Practitioner",
    credential: "SS-AAIP",
    tagline: "The classroom-safe AI credential",
    description:
      "A structured pathway covering allowed vs risky AI use, citation habits, detector literacy, and a take-home integrity playbook schools can actually understand.",
    youGet: [
      "Digital credential + verifiable ID",
      "Integrity playbook PDF for teachers/parents",
      "Capstone scenario assessment",
    ],
    requirements: ["Complete 5 modules", "Pass scenario exam (80%+)", "Submit playbook draft"],
    partner: {
      initials: "MASB",
      name: "Meridian Academic Standards Board",
      role: "Standards partner",
      tint: "from-sky-500 to-cyan-400",
    },
    format: "cohort",
    timeline: "next-week",
    startsLabel: "Cohort opens Tue, Aug 19",
    duration: "10 days · exam on day 10",
    price: 149,
    examFeeIncluded: true,
    seatsLeft: 14,
    level: "Level 1",
  },
  {
    id: "research",
    title: "AI-Assisted Research Methods",
    credential: "SS-AARM",
    tagline: "Research speed with an authorship trail",
    description:
      "Students learn source triage, question framing, evidence logs, and disclosure language so AI accelerates research without ghostwriting the paper.",
    youGet: [
      "Credential issued with Crestwood Institute",
      "Annotated research log template",
      "Oral defense of one research sprint",
    ],
    requirements: ["Complete research sprint", "Oral defense (15 min)", "Pass methods quiz"],
    partner: {
      initials: "CIAL",
      name: "Crestwood Institute for Applied Learning",
      role: "Issuing partner",
      tint: "from-orange-500 to-amber-400",
    },
    format: "cohort",
    timeline: "two-weeks",
    startsLabel: "Cohort opens Mon, Aug 25",
    duration: "3 weeks · defense in week 3",
    price: 229,
    examFeeIncluded: true,
    seatsLeft: 10,
    level: "Level 2",
  },
  {
    id: "quant",
    title: "Quantitative Workflow with AI",
    credential: "SS-QWA",
    tagline: "Clean data habits for STEM-leaning students",
    description:
      "Spreadsheet cleanup, check-your-work loops, and documentation standards for quantitative homework and projects. Certifies a workflow, not a fake STEM major.",
    youGet: [
      "Credential with Harborline Consortium",
      "Quant checklist pack",
      "Timed workflow exam",
    ],
    requirements: ["Module set + practice sets", "Timed workflow exam", "Error-log submission"],
    partner: {
      initials: "HCET",
      name: "Harborline Consortium on Educational Technology",
      role: "Technology partner",
      tint: "from-emerald-500 to-teal-400",
    },
    format: "cohort",
    timeline: "two-weeks",
    startsLabel: "Cohort opens Wed, Aug 27",
    duration: "2 weeks · exam window included",
    price: 199,
    examFeeIncluded: true,
    seatsLeft: 16,
    level: "Level 1",
  },
  {
    id: "creative",
    title: "Creative Process Documentation",
    credential: "SS-CPD",
    tagline: "Prove craft inside an AI-assisted studio process",
    description:
      "Rolling enrollment for arts-leaning students. Build an iteration archive, prompt history, and craft narrative that shows direction, not that AI made the work.",
    youGet: [
      "Credential with Aster Learning Exchange",
      "Process portfolio review",
      "Shareable studio statement",
    ],
    requirements: ["Submit process portfolio", "Pass portfolio review", "Complete ethics module"],
    partner: {
      initials: "ALX",
      name: "Aster Learning Exchange",
      role: "Creative partner",
      tint: "from-violet-500 to-fuchsia-400",
    },
    format: "rolling",
    timeline: "rolling",
    startsLabel: "Rolling start · review weekly",
    duration: "Complete in 2–4 weeks",
    price: 179,
    examFeeIncluded: true,
    level: "Level 1",
  },
];

const timelineMeta = {
  "next-week": {
    eyebrow: "Next week",
    title: "Certification cohort opening",
    blurb: "Fixed start. Exam date included in the price.",
  },
  "two-weeks": {
    eyebrow: "In two weeks",
    title: "Upcoming certification cohorts",
    blurb: "Reserve a seat before the roster locks.",
  },
  rolling: {
    eyebrow: "Rolling enrollment",
    title: "Start when ready",
    blurb: "Submit on your schedule. Reviews run every week.",
  },
} as const;

function formatPrice(n: number) {
  return `$${n}`;
}

function CertProductRow({
  cert,
  index,
  onEnroll,
}: {
  cert: Certification;
  index: number;
  onEnroll: (cert: Certification) => void;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.2) }}
      className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04]"
    >
      <div className="flex flex-col lg:flex-row">
        <div className="flex-1 border-b border-white/10 p-6 sm:p-8 lg:border-b-0 lg:border-r lg:border-white/10">
          <div className="flex flex-wrap items-center gap-3">
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${cert.partner.tint} shadow-[0_12px_28px_-14px_rgba(56,189,248,0.8)]`}
              aria-hidden
            >
              <span className={`text-[10px] font-black text-white ${jakartaSans.className}`}>{cert.partner.initials}</span>
            </div>
            <div>
              <p className={`text-[10px] font-black uppercase tracking-[0.16em] text-slate-400 ${jakartaSans.className}`}>
                {cert.partner.role}
              </p>
              <p className={`text-sm font-bold text-white ${jakartaSans.className}`}>{cert.partner.name}</p>
            </div>
            <span
              className={`ml-auto rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-sky-200 ${jakartaSans.className}`}
            >
              {cert.level} · {cert.credential}
            </span>
          </div>

          <h3 className={`mt-6 text-2xl font-semibold tracking-[-0.03em] text-white sm:text-3xl ${fredokaHeadline.className}`}>
            {cert.title}
          </h3>
          <p className={`mt-1 text-base font-semibold text-sky-300 ${jakartaSans.className}`}>{cert.tagline}</p>
          <p className={`mt-4 text-sm font-medium leading-relaxed text-slate-300 sm:text-[0.95rem] ${jakartaSans.className}`}>
            {cert.description}
          </p>

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div>
              <p className={`text-[10px] font-black uppercase tracking-[0.18em] text-slate-500 ${jakartaSans.className}`}>
                Included
              </p>
              <ul className="mt-3 space-y-2">
                {cert.youGet.map((item) => (
                  <li key={item} className={`flex gap-2 text-sm font-medium text-slate-200 ${jakartaSans.className}`}>
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className={`text-[10px] font-black uppercase tracking-[0.18em] text-slate-500 ${jakartaSans.className}`}>
                To earn it
              </p>
              <ul className="mt-3 space-y-2">
                {cert.requirements.map((item) => (
                  <li key={item} className={`flex gap-2 text-sm font-medium text-slate-200 ${jakartaSans.className}`}>
                    <FileBadge2 className="mt-0.5 h-4 w-4 shrink-0 text-sky-300" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col justify-between bg-black/25 p-6 sm:p-8 lg:w-[19.5rem] xl:w-[21rem]">
          <div>
            <p className={`text-[10px] font-black uppercase tracking-[0.18em] text-slate-500 ${jakartaSans.className}`}>
              Certification price
            </p>
            <p className={`mt-2 text-4xl font-semibold tracking-[-0.04em] text-white ${fredokaHeadline.className}`}>
              {formatPrice(cert.price)}
            </p>
            <p className={`mt-1 text-xs font-semibold text-slate-400 ${jakartaSans.className}`}>
              {cert.examFeeIncluded ? "Includes exam & credential issuance" : "Exam billed separately"}
            </p>

            <ul className={`mt-6 space-y-3 text-sm font-semibold text-slate-200 ${jakartaSans.className}`}>
              <li className="flex items-start gap-2.5">
                <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-sky-300" aria-hidden />
                <span>{cert.startsLabel}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-sky-300" aria-hidden />
                <span>{cert.duration}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Award className="mt-0.5 h-4 w-4 shrink-0 text-[#ff9a4d]" aria-hidden />
                <span>
                  {cert.format === "cohort" ? "Fixed cohort" : "Rolling enrollment"}
                  {typeof cert.seatsLeft === "number" ? ` · ${cert.seatsLeft} seats left` : ""}
                </span>
              </li>
            </ul>
          </div>

          <button
            type="button"
            onClick={() => onEnroll(cert)}
            className={`mt-8 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-sky-400 px-4 py-3.5 text-xs font-black uppercase tracking-[0.14em] text-slate-950 shadow-[0_16px_32px_-18px_rgba(56,189,248,0.65)] transition hover:-translate-y-0.5 hover:bg-sky-300 ${jakartaSans.className}`}
          >
            Enroll · {formatPrice(cert.price)}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </button>
        </div>
      </div>
    </motion.article>
  );
}

/**
 * Productized certification pathways as stacked listings with prices and timelines.
 */
export function CertificationsSection() {
  const [interest, setInterest] = useState<{ title: string; detail: string } | null>(null);

  const grouped = useMemo(() => {
    const order: Certification["timeline"][] = ["next-week", "two-weeks", "rolling"];
    return order
      .map((key) => ({
        key,
        ...timelineMeta[key],
        items: certifications.filter((c) => c.timeline === key),
      }))
      .filter((g) => g.items.length > 0);
  }, []);

  return (
    <section
      id="certifications"
      className="relative overflow-hidden border-t border-slate-900 bg-[#0b1220] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
      aria-labelledby="certifications-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_15%_0%,rgba(56,189,248,0.2),transparent_55%),radial-gradient(ellipse_45%_40%_at_100%_90%,rgba(255,106,0,0.14),transparent_50%)]" />

      <div className="relative mx-auto w-full max-w-3xl lg:max-w-5xl xl:max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="max-w-3xl"
        >
          <p className={`text-[10px] font-black uppercase tracking-[0.22em] text-[#ff9a4d] ${jakartaSans.className}`}>
            Certifications
          </p>
          <h2
            id="certifications-heading"
            className={`mt-3 text-[2rem] font-semibold leading-[1.05] tracking-[-0.035em] text-white sm:text-4xl lg:text-[2.85rem] ${fredokaHeadline.className}`}
          >
            Earn a credential.{" "}
            <span className="text-sky-300">Pick a cohort.</span>
          </h2>
          <p
            className={`ss-institutional mt-4 max-w-2xl text-[1.05rem] font-normal leading-[1.7] text-slate-300 sm:text-lg ${institutionalSerif.className}`}
          >
            Paid certification pathways for concrete AI-in-school use cases. Clear price, clear timeline, issuing partner
            on the credential, and an exam or review built into enrollment.
          </p>
        </motion.div>

        <div className="mt-12 space-y-14 sm:mt-14">
          {grouped.map((group) => (
            <div key={group.key}>
              <div className="mb-5 flex flex-col gap-1 border-b border-white/10 pb-4 sm:mb-6 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className={`text-[10px] font-black uppercase tracking-[0.2em] text-sky-300 ${jakartaSans.className}`}>
                    {group.eyebrow}
                  </p>
                  <h3 className={`mt-1 text-xl font-semibold tracking-[-0.02em] text-white sm:text-2xl ${fredokaHeadline.className}`}>
                    {group.title}
                  </h3>
                </div>
                <p className={`text-sm font-medium text-slate-400 ${jakartaSans.className}`}>{group.blurb}</p>
              </div>

              <div className="space-y-5">
                {group.items.map((cert, index) => (
                  <CertProductRow
                    key={cert.id}
                    cert={cert}
                    index={index}
                    onEnroll={(c) =>
                      setInterest({
                        title: c.title,
                        detail: `${c.startsLabel} · ${formatPrice(c.price)} · ${c.credential}`,
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
        kind="certification"
        title={interest ? `${interest.title} (${interest.detail})` : ""}
      />
    </section>
  );
}
