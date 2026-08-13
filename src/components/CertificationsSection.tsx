"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { Award, BadgeCheck, Shield } from "lucide-react";
import { fredokaHeadline, jakartaSans, institutionalSerif } from "@/app/fonts";
import { ProductInterestModal } from "@/components/ProductInterestModal";

type Partner = {
  initials: string;
  name: string;
  short: string;
  tint: string;
};

type Certification = {
  id: string;
  title: string;
  usecase: string;
  partner: Partner;
  outcome: string;
};

/**
 * Placeholder partner institutes for early marketing optics.
 * Not real university degrees or official accreditation.
 */
const partners: Partner[] = [
  {
    initials: "MASB",
    name: "Meridian Academic Standards Board",
    short: "Meridian",
    tint: "from-sky-500 to-cyan-400",
  },
  {
    initials: "CIAL",
    name: "Crestwood Institute for Applied Learning",
    short: "Crestwood",
    tint: "from-orange-500 to-amber-400",
  },
  {
    initials: "HCET",
    name: "Harborline Consortium on Educational Technology",
    short: "Harborline",
    tint: "from-emerald-500 to-teal-400",
  },
  {
    initials: "ALX",
    name: "Aster Learning Exchange",
    short: "Aster",
    tint: "from-violet-500 to-fuchsia-400",
  },
];

const certifications: Certification[] = [
  {
    id: "integrity",
    title: "Academic AI Integrity Practitioner",
    usecase: "Classroom-safe AI use, citation habits, and integrity playbooks.",
    partner: partners[0],
    outcome: "Students finish with a shareable credential on responsible academic AI practice.",
  },
  {
    id: "research",
    title: "AI-Assisted Research Methods",
    usecase: "Source triage, question framing, and evidence logs without ghostwriting papers.",
    partner: partners[1],
    outcome: "Built for students who want research speed with a clear authorship trail.",
  },
  {
    id: "quant",
    title: "Quantitative Workflow with AI",
    usecase: "Spreadsheet, data cleanup, and check-your-work habits for STEM-leaning students.",
    partner: partners[2],
    outcome: "Certifies a repeatable quant workflow, not a claim of mastery in a specific major.",
  },
  {
    id: "creative",
    title: "Creative Process Documentation",
    usecase: "Iteration archives, prompt history, and craft narratives for studio-bound work.",
    partner: partners[3],
    outcome: "Shows how a student directed AI inside a creative process, not that AI made the art.",
  },
];

function PartnerSeal({ partner }: { partner: Partner }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${partner.tint} shadow-[0_10px_24px_-12px_rgba(15,23,42,0.45)]`}
        aria-hidden
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/95">
          <span className={`text-[10px] font-black tracking-tight text-slate-800 ${jakartaSans.className}`}>
            {partner.initials}
          </span>
        </div>
      </div>
      <div>
        <p className={`text-[10px] font-black uppercase tracking-[0.16em] text-slate-400 ${jakartaSans.className}`}>
          Issued with
        </p>
        <p className={`text-sm font-bold text-slate-800 ${jakartaSans.className}`}>{partner.short}</p>
      </div>
    </div>
  );
}

/**
 * Monetization optics: certifications co-branded with placeholder institutes.
 */
export function CertificationsSection() {
  const [interestTitle, setInterestTitle] = useState<string | null>(null);

  return (
    <section
      id="certifications"
      className="relative overflow-hidden border-t border-slate-200 bg-[#0f172a] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
      aria-labelledby="certifications-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_20%_0%,rgba(56,189,248,0.22),transparent_55%),radial-gradient(ellipse_50%_40%_at_100%_80%,rgba(255,106,0,0.16),transparent_50%)]" />

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
            Get certified for real school{" "}
            <span className="text-sky-300">AI use cases</span>
          </h2>
          <p
            className={`ss-institutional mt-4 max-w-2xl text-[1.05rem] font-normal leading-[1.7] text-slate-300 sm:text-lg ${institutionalSerif.className}`}
          >
            Students enroll, complete a focused pathway, and earn a StudentStack credential issued with an education
            partner. Early partners below are placeholder institutes while we finalize formal agreements.
          </p>
        </motion.div>

        <ul className="mt-8 flex flex-wrap gap-3 sm:mt-10">
          {partners.map((partner) => (
            <li
              key={partner.initials}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5"
            >
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br ${partner.tint} text-[9px] font-black text-white ${jakartaSans.className}`}
              >
                {partner.initials}
              </span>
              <span className={`text-xs font-semibold text-slate-200 ${jakartaSans.className}`}>{partner.name}</span>
            </li>
          ))}
        </ul>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:gap-5">
          {certifications.map((cert, index) => (
            <motion.li
              key={cert.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ y: -3 }}
              className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 backdrop-blur-sm sm:p-6"
            >
              <PartnerSeal partner={cert.partner} />
              <div className="mt-5 flex items-start gap-2">
                <Award className="mt-0.5 h-5 w-5 shrink-0 text-sky-300" aria-hidden />
                <h3 className={`text-xl font-semibold tracking-[-0.02em] text-white ${fredokaHeadline.className}`}>
                  {cert.title}
                </h3>
              </div>
              <p className={`mt-2 text-sm font-medium leading-relaxed text-slate-300 ${jakartaSans.className}`}>
                {cert.usecase}
              </p>
              <p className={`mt-3 flex items-start gap-2 text-xs font-semibold leading-relaxed text-slate-400 ${jakartaSans.className}`}>
                <BadgeCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-300" aria-hidden />
                {cert.outcome}
              </p>
              <button
                type="button"
                onClick={() => setInterestTitle(cert.title)}
                className={`mt-5 inline-flex items-center justify-center rounded-2xl bg-sky-400 px-4 py-2.5 text-xs font-black uppercase tracking-[0.14em] text-slate-950 transition hover:-translate-y-0.5 hover:bg-sky-300 ${jakartaSans.className}`}
              >
                Start certification
              </button>
            </motion.li>
          ))}
        </ul>

        <p className={`mt-8 flex items-start gap-2 text-xs font-medium leading-relaxed text-slate-400 ${jakartaSans.className}`}>
          <Shield className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-500" aria-hidden />
          Partner names and seals are provisional for product design. They are not university degrees and do not claim
          accreditation from any specific college.
        </p>
      </div>

      <ProductInterestModal
        open={Boolean(interestTitle)}
        onClose={() => setInterestTitle(null)}
        kind="certification"
        title={interestTitle ?? ""}
      />
    </section>
  );
}
