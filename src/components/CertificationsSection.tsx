"use client";

import React, { useMemo, useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, CalendarDays, Clock3, Users } from "lucide-react";
import { fredokaHeadline, jakartaSans, institutionalSerif } from "@/app/fonts";
import {
  CertificationEnrollModal,
  type CertEnrollment,
} from "@/components/CertificationEnrollModal";

const pathways: CertEnrollment[] = [
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
      blurb:
        "Meridian sets clear academic-integrity benchmarks for AI in secondary classrooms. This pathway is issued with their standards desk.",
    },
    format: "cohort",
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
      blurb:
        "Crestwood focuses on applied research literacy. Graduates leave with a documented authorship trail teachers can review.",
    },
    format: "cohort",
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
      "Spreadsheet cleanup, check-your-work loops, and documentation standards for quantitative homework and projects.",
    youGet: ["Credential with Harborline Consortium", "Quant checklist pack", "Timed workflow exam"],
    requirements: ["Module set + practice sets", "Timed workflow exam", "Error-log submission"],
    partner: {
      initials: "HCET",
      name: "Harborline Consortium on Educational Technology",
      role: "Technology partner",
      tint: "from-emerald-500 to-teal-400",
      blurb:
        "Harborline partners on educational technology workflows. This credential certifies a repeatable quant process, not a fake STEM major.",
    },
    format: "cohort",
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
      "Rolling enrollment for arts-leaning students. Build an iteration archive, prompt history, and craft narrative that shows direction.",
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
      blurb:
        "Aster champions creative authorship in the AI era. The review board looks for process, iteration, and student direction.",
    },
    format: "rolling",
    startsLabel: "Rolling start · review weekly",
    duration: "Complete in 2–4 weeks",
    price: 179,
    examFeeIncluded: true,
    level: "Level 1",
  },
];

function formatPrice(n: number) {
  return `$${n}`;
}

function PartnerPathway({
  cert,
  index,
  onEnroll,
}: {
  cert: CertEnrollment;
  index: number;
  onEnroll: (cert: CertEnrollment) => void;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.2) }}
      className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04]"
    >
      <div className={`bg-gradient-to-r ${cert.partner.tint} px-6 py-5 sm:px-8`}>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/95 shadow-lg">
            <span className={`text-xs font-black text-slate-900 ${jakartaSans.className}`}>{cert.partner.initials}</span>
          </div>
          <div className="min-w-0 flex-1">
            <p className={`text-[10px] font-black uppercase tracking-[0.2em] text-white/85 ${jakartaSans.className}`}>
              {cert.partner.role}
            </p>
            <h3 className={`text-xl font-semibold tracking-[-0.03em] text-white sm:text-2xl ${fredokaHeadline.className}`}>
              {cert.partner.name}
            </h3>
          </div>
          <p className={`max-w-md text-sm font-medium leading-snug text-white/90 ${jakartaSans.className}`}>
            {cert.partner.blurb}
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row">
        <div className="flex-1 border-b border-white/10 p-6 sm:p-8 lg:border-b-0 lg:border-r lg:border-white/10">
          <p className={`text-[10px] font-black uppercase tracking-[0.16em] text-sky-300 ${jakartaSans.className}`}>
            {cert.level} · {cert.credential}
          </p>
          <h4 className={`mt-2 text-2xl font-semibold tracking-[-0.03em] text-white sm:text-[1.75rem] ${fredokaHeadline.className}`}>
            {cert.title}
          </h4>
          <p className={`mt-1 text-base font-semibold text-sky-200/90 ${jakartaSans.className}`}>{cert.tagline}</p>
          <p className={`mt-4 text-sm font-medium leading-relaxed text-slate-300 ${jakartaSans.className}`}>
            {cert.description}
          </p>
        </div>

        <div className="flex w-full flex-col justify-between bg-black/25 p-6 sm:p-8 lg:w-[18.5rem] xl:w-[20rem]">
          <div>
            <p className={`text-4xl font-semibold tracking-[-0.04em] text-white ${fredokaHeadline.className}`}>
              {formatPrice(cert.price)}
            </p>
            <p className={`mt-1 text-xs font-semibold text-slate-400 ${jakartaSans.className}`}>
              {cert.examFeeIncluded ? "Exam & credential included" : "Exam billed separately"}
            </p>
            <ul className={`mt-5 space-y-2.5 text-sm font-semibold text-slate-200 ${jakartaSans.className}`}>
              <li className="flex gap-2">
                <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-sky-300" aria-hidden />
                {cert.startsLabel}
              </li>
              <li className="flex gap-2">
                <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-sky-300" aria-hidden />
                {cert.duration}
              </li>
              {typeof cert.seatsLeft === "number" ? (
                <li className="flex gap-2">
                  <Users className="mt-0.5 h-4 w-4 shrink-0 text-[#ff9a4d]" aria-hidden />
                  {cert.seatsLeft} seats left
                </li>
              ) : null}
            </ul>
          </div>
          <button
            type="button"
            onClick={() => onEnroll(cert)}
            className={`mt-8 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3.5 text-xs font-black uppercase tracking-[0.14em] text-slate-900 transition hover:-translate-y-0.5 hover:bg-sky-100 ${jakartaSans.className}`}
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
 * Partner-led credential pathways (no "Certifications" section chrome).
 */
export function CertificationsSection() {
  const [active, setActive] = useState<CertEnrollment | null>(null);
  const partners = useMemo(() => pathways, []);

  return (
    <section
      id="certifications"
      className="relative overflow-hidden border-t border-slate-900 bg-[#0b1220] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
      aria-labelledby="partners-heading"
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
            With our partners
          </p>
          <h2
            id="partners-heading"
            className={`mt-3 text-[2rem] font-semibold leading-[1.05] tracking-[-0.035em] text-white sm:text-4xl lg:text-[2.85rem] ${fredokaHeadline.className}`}
          >
            Meridian, Crestwood, Harborline,{" "}
            <span className="text-sky-300">Aster</span>
          </h2>
          <p
            className={`ss-institutional mt-4 max-w-2xl text-[1.05rem] font-normal leading-[1.7] text-slate-300 sm:text-lg ${institutionalSerif.className}`}
          >
            Each partner issues a focused StudentStack pathway for a concrete AI-in-school use case. Clear price, clear
            start date, exam included.
          </p>
        </motion.div>

        <div className="mt-10 space-y-6 sm:mt-12">
          {partners.map((cert, index) => (
            <PartnerPathway key={cert.id} cert={cert} index={index} onEnroll={setActive} />
          ))}
        </div>
      </div>

      <CertificationEnrollModal open={Boolean(active)} onClose={() => setActive(null)} cert={active} />
    </section>
  );
}
