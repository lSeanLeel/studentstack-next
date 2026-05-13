"use client";

import React from "react";
import {
  CHEAT_SHEET_BRAND,
  normalizeResearchRows,
  type CheatSheetContent,
} from "@/lib/weekly-cheat-sheet-brand";
import { jakartaSans, fredokaHeadline } from "@/app/fonts";
import { motion } from "motion/react";
import { Mail } from "lucide-react";

type Props = {
  content: CheatSheetContent;
  className?: string;
  compact?: boolean;
};

export function WeeklyEmailPreview({ content, className = "", compact = false }: Props) {
  const safe = {
    ...content,
    researchRows: content.researchRows ?? [],
    qaSubject: content.qaSubject ?? "",
    qaParentLabel: content.qaParentLabel ?? "",
    qaQuestion: content.qaQuestion ?? "",
    qaAnswer: content.qaAnswer ?? "",
    toolListName: content.toolListName ?? "",
    toolEmailSubject: content.toolEmailSubject ?? "",
    toolListItems: content.toolListItems ?? [],
  };
  const rows = normalizeResearchRows(safe);

  return (
    <div
      className={`w-full overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_30px_80px_-40px_rgba(15,23,42,0.35)] ${className}`}
    >
      <div className="border-b border-slate-100 bg-slate-50 px-4 py-3 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500">
              <Mail className="h-4 w-4" />
            </div>
            <div>
              <p className={`text-xs font-black text-slate-900 ${jakartaSans.className}`}>{CHEAT_SHEET_BRAND.productName}</p>
              <p className={`text-[10px] font-bold text-slate-500 ${jakartaSans.className}`}>team@studentstack.org</p>
            </div>
          </div>
          <span
            className={`rounded-lg border border-sky-100 bg-sky-50 px-2 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-sky-700 ${jakartaSans.className}`}
          >
            {safe.weekLabel}
          </span>
        </div>
      </div>

      <div className={`px-4 py-5 sm:px-6 sm:py-6 ${compact ? "space-y-3" : "space-y-4"}`}>
        <div className="rounded-2xl border border-sky-100 bg-gradient-to-br from-sky-50/90 via-white to-violet-50/40 p-4 sm:p-5">
          <p className={`text-[10px] font-black uppercase tracking-[0.2em] text-sky-700 ${jakartaSans.className}`}>
            {CHEAT_SHEET_BRAND.tagline}
          </p>
          <p className={`mt-2 text-xs font-semibold text-slate-600 ${jakartaSans.className}`}>
            Deadlines and gates you can scan in under a minute.
          </p>
        </div>

        <AnimatedSection index={0}>
          <SpreadsheetSection rows={rows} compact={compact} />
        </AnimatedSection>

        <AnimatedSection index={1}>
          <EmailThreadSection content={safe} compact={compact} />
        </AnimatedSection>

        <AnimatedSection index={2}>
          <ForwardedToolsSection content={safe} compact={compact} />
        </AnimatedSection>
      </div>
    </div>
  );
}

function AnimatedSection({ index, children }: { index: number; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 1, y: 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.32, delay: index * 0.06 }}
    >
      {children}
    </motion.div>
  );
}

function SpreadsheetSection({ rows, compact }: { rows: ReturnType<typeof normalizeResearchRows>; compact: boolean }) {
  return (
    <section
      className={`rounded-2xl border border-slate-200 bg-white ${compact ? "" : "shadow-[0_14px_34px_-28px_rgba(15,23,42,0.45)]"}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 bg-[#0f766e] px-3 py-2 sm:px-4">
        <span className={`text-[10px] font-black uppercase tracking-[0.14em] text-white ${jakartaSans.className}`}>
          {CHEAT_SHEET_BRAND.sections.researchList.spreadsheetTitle}
        </span>
        <span className={`rounded-md bg-white/15 px-2 py-0.5 text-[9px] font-black uppercase tracking-widest text-white/90 ${jakartaSans.className}`}>
          Sheet export
        </span>
      </div>
      <div className="p-1">
        <p className={`px-3 pt-2 text-[11px] font-bold text-slate-600 ${jakartaSans.className}`}>
          {CHEAT_SHEET_BRAND.sections.researchList.title}
        </p>
        <div className="mt-2 overflow-x-auto rounded-xl border border-slate-200">
          <table className={`w-full min-w-[520px] border-collapse text-left ${jakartaSans.className}`}>
            <thead>
              <tr className="bg-slate-50 text-[10px] font-black uppercase tracking-[0.12em] text-slate-500">
                <th className="border-b border-slate-200 px-3 py-2">Opportunity</th>
                <th className="border-b border-slate-200 px-3 py-2 whitespace-nowrap">Deadline</th>
                <th className="border-b border-slate-200 px-3 py-2">Gate / apply</th>
              </tr>
            </thead>
            <tbody>
              {(rows.length ? rows : [{ opportunity: "Add rows in admin", deadline: "N/A", gate: "N/A" }]).map((r, i) => (
                <tr key={`${r.opportunity}-${i}`} className="border-b border-slate-100 last:border-0">
                  <td className={`px-3 py-2.5 text-sm font-semibold text-slate-900 ${fredokaHeadline.className}`}>
                    {r.opportunity}
                  </td>
                  <td className="whitespace-nowrap px-3 py-2.5 text-xs font-bold text-slate-600">{r.deadline}</td>
                  <td className="px-3 py-2.5 text-xs font-medium leading-snug text-slate-600">{r.gate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className={`px-3 py-2 text-[11px] font-medium text-slate-500 ${jakartaSans.className}`}>
          Programs, deadlines, and what to verify before your student applies.
        </p>
      </div>
    </section>
  );
}

function EmailThreadSection({ content, compact }: { content: CheatSheetContent; compact: boolean }) {
  return (
    <section
      className={`rounded-2xl border border-violet-100 bg-white ${compact ? "" : "shadow-[0_14px_34px_-28px_rgba(139,92,246,0.35)]"}`}
    >
      <div className="border-b border-violet-100 bg-violet-50/80 px-4 py-3">
        <p className={`text-[10px] font-black uppercase tracking-[0.18em] text-violet-700 ${jakartaSans.className}`}>
          Questions from families
        </p>
        <h3 className={`mt-1 text-base font-semibold text-slate-900 ${fredokaHeadline.className}`}>
          Ask us anything by replying to the email
        </h3>
        <p className={`mt-1 text-[11px] font-semibold text-slate-600 ${jakartaSans.className}`}>
          Parents and students are always welcome to email us back with questions.
        </p>
      </div>

      <div className="space-y-3 p-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-3">
          <p className={`text-[10px] font-black uppercase tracking-[0.16em] text-slate-500 ${jakartaSans.className}`}>
            Family question
          </p>
          <p className={`mt-1 text-[11px] font-bold text-slate-500 ${jakartaSans.className}`}>{content.qaSubject}</p>
          <p className={`mt-2 text-sm leading-relaxed text-slate-700 ${jakartaSans.className}`}>{content.qaQuestion}</p>
          <p className={`mt-2 text-xs font-semibold text-slate-500 ${jakartaSans.className}`}>
            Sent by {content.qaParentLabel}
          </p>
        </div>

        <div className="rounded-2xl border border-sky-100 bg-sky-50/60 p-3">
          <p className={`text-[10px] font-black uppercase tracking-[0.16em] text-sky-800 ${jakartaSans.className}`}>
            StudentStack answer
          </p>
          <p className={`mt-2 text-sm leading-relaxed text-slate-800 ${jakartaSans.className}`}>{content.qaAnswer}</p>
        </div>

        <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 px-3 py-2.5">
          <p className={`text-[11px] font-bold text-emerald-800 ${jakartaSans.className}`}>
            Reply anytime with your next question - we read every email from parents and students.
          </p>
        </div>
      </div>
    </section>
  );
}

function ForwardedToolsSection({ content, compact }: { content: CheatSheetContent; compact: boolean }) {
  const items = content.toolListItems.filter(Boolean);
  return (
    <section
      className={`rounded-2xl border border-sky-100 bg-white ${compact ? "" : "shadow-[0_14px_34px_-28px_rgba(14,165,233,0.35)]"}`}
    >
      <div className="border-b border-sky-100 bg-sky-50/70 px-4 py-3">
        <p className={`text-[10px] font-black uppercase tracking-[0.18em] text-sky-800 ${jakartaSans.className}`}>
          Forwarded to parents
        </p>
        <p className={`mt-1 text-[11px] font-semibold text-slate-600 ${jakartaSans.className}`}>{content.toolEmailSubject}</p>
        <h3 className={`mt-2 text-base font-semibold text-slate-900 ${fredokaHeadline.className}`}>
          {content.toolListName}{" "}
          <span className="text-sky-600">({CHEAT_SHEET_BRAND.sections.toolRoster.titleSuffix})</span>
        </h3>
      </div>
      <ul className={`divide-y divide-slate-100 px-4 py-2 ${jakartaSans.className}`}>
        {(items.length ? items : ["Add tools in admin."]).map((line, i) => (
          <li key={`${line}-${i}`} className="py-3 text-sm leading-relaxed text-slate-700">
            {line}
          </li>
        ))}
      </ul>
    </section>
  );
}
