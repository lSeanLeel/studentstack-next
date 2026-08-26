"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BookOpen, ChevronDown, ChevronUp, ExternalLink, FileText, MessageSquare } from "lucide-react";
import { fredokaHeadline, jakartaSans } from "@/app/fonts";
import { PortalBadge, PortalEyebrow, PortalLead, PortalPageTitle } from "@/components/portal/portal-ui";
import {
  EXTERNAL_CURRICULUM,
  STUDENTSTACK_MODULES,
  type CurriculumTrack,
} from "@/lib/portal/curriculum";

const trackAccent: Record<CurriculumTrack, "sky" | "emerald" | "amber" | "violet"> = {
  foundations: "violet",
  "ss-ais": "sky",
  "ss-acr": "amber",
  toolkit: "emerald",
};

const trackLabel: Record<CurriculumTrack, string> = {
  foundations: "Foundations",
  "ss-ais": "SS-AIS",
  "ss-acr": "SS-ACR",
  toolkit: "Daily workflows",
};

function moduleTitle(label: string) {
  const parts = label.split(" · ");
  return parts.length > 1 ? parts.slice(1).join(" · ") : label;
}

export function PortalCurriculumView() {
  const [supplementsOpen, setSupplementsOpen] = useState(false);

  return (
    <div className="space-y-8">
      <header>
        <PortalEyebrow>Your curriculum</PortalEyebrow>
        <PortalPageTitle className="mt-1">Courses & pathways</PortalPageTitle>
        <PortalLead>
          Lessons, worksheets, and prompts our college team maintains for you. Public org courses are optional
          supplements at the bottom — not what you are paying for.
        </PortalLead>
      </header>

      <ul className="space-y-4">
        {STUDENTSTACK_MODULES.map((mod) => (
          <li key={mod.id}>
            <article className="rounded-[1.75rem] border-2 border-slate-200 bg-white p-5 shadow-[0_10px_0_0_rgba(15,23,42,0.05)] sm:p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <PortalBadge accent={trackAccent[mod.track]}>{trackLabel[mod.track]}</PortalBadge>
                  <h2 className={`mt-2 text-xl font-semibold text-slate-900 sm:text-2xl ${fredokaHeadline.className}`}>
                    {moduleTitle(mod.label)}
                  </h2>
                  <p className={`mt-2 max-w-2xl text-sm font-medium leading-relaxed text-slate-600 ${jakartaSans.className}`}>
                    {mod.summary}
                  </p>
                  <p className={`mt-2 text-xs font-bold text-slate-500 ${jakartaSans.className}`}>
                    {mod.lessons.length} lessons · ~{mod.estimatedHours} hrs · {mod.worksheets.length} worksheets
                  </p>
                </div>
                <Link
                  href={mod.href}
                  className={`shrink-0 rounded-2xl bg-slate-900 px-4 py-2.5 text-[10px] font-black uppercase tracking-[0.12em] text-white transition hover:-translate-y-0.5 hover:bg-slate-800 ${jakartaSans.className}`}
                >
                  Open module
                </Link>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl bg-sky-50/80 px-4 py-3">
                  <p className={`flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.12em] text-sky-700 ${jakartaSans.className}`}>
                    <BookOpen className="h-3 w-3" aria-hidden />
                    Lessons
                  </p>
                  <ul className={`mt-2 space-y-1.5 text-sm font-medium text-slate-700 ${jakartaSans.className}`}>
                    {mod.lessons.slice(0, 3).map((l) => (
                      <li key={l.id} className="truncate">
                        {l.title}
                      </li>
                    ))}
                    {mod.lessons.length > 3 ? (
                      <li className="text-xs text-slate-500">+{mod.lessons.length - 3} more</li>
                    ) : null}
                  </ul>
                </div>
                <div className="rounded-2xl bg-emerald-50/80 px-4 py-3">
                  <p className={`flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.12em] text-emerald-700 ${jakartaSans.className}`}>
                    <FileText className="h-3 w-3" aria-hidden />
                    Worksheets
                  </p>
                  <ul className={`mt-2 space-y-1.5 text-sm font-medium text-slate-700 ${jakartaSans.className}`}>
                    {mod.worksheets.map((w) => (
                      <li key={w.id} className="truncate">
                        {w.title}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl bg-amber-50/80 px-4 py-3">
                  <p className={`flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.12em] text-amber-800 ${jakartaSans.className}`}>
                    <MessageSquare className="h-3 w-3" aria-hidden />
                    Team prompts
                  </p>
                  <p className={`mt-2 line-clamp-3 text-sm font-medium italic text-slate-600 ${jakartaSans.className}`}>
                    &ldquo;{mod.teamPrompts[0]}&rdquo;
                  </p>
                </div>
              </div>

              {mod.certHref ? (
                <Link
                  href={mod.certHref}
                  className={`mt-3 inline-flex text-xs font-bold text-sky-700 hover:text-sky-900 ${jakartaSans.className}`}
                >
                  Credential path →
                </Link>
              ) : null}
            </article>
          </li>
        ))}
      </ul>

      <section className="rounded-[1.5rem] border-2 border-dashed border-slate-200 bg-slate-50/60">
        <button
          type="button"
          onClick={() => setSupplementsOpen((o) => !o)}
          className={`flex w-full items-center justify-between gap-3 px-5 py-4 text-left ${jakartaSans.className}`}
        >
          <div>
            <p className={`text-[10px] font-black uppercase tracking-[0.14em] text-slate-500 ${jakartaSans.className}`}>
              Optional · not included in membership value
            </p>
            <p className={`mt-1 text-sm font-semibold text-slate-700 ${fredokaHeadline.className}`}>
              Public free courses (IBM, Google, etc.)
            </p>
            <p className={`mt-0.5 text-xs font-medium text-slate-500 ${jakartaSans.className}`}>
              You can find these on Google. We list them only if you want extra reading after our modules.
            </p>
          </div>
          {supplementsOpen ? (
            <ChevronUp className="h-5 w-5 shrink-0 text-slate-400" aria-hidden />
          ) : (
            <ChevronDown className="h-5 w-5 shrink-0 text-slate-400" aria-hidden />
          )}
        </button>
        {supplementsOpen ? (
          <ul className="border-t border-slate-200 px-5 py-3">
            {EXTERNAL_CURRICULUM.map((course) => (
              <li key={course.id} className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 py-2.5 last:border-0">
                <div className="min-w-0">
                  <p className={`text-sm font-semibold text-slate-800 ${fredokaHeadline.className}`}>{course.title}</p>
                  <p className={`text-xs text-slate-500 ${jakartaSans.className}`}>
                    {course.organization} · {course.duration}
                  </p>
                </div>
                <a
                  href={course.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex shrink-0 items-center gap-1 text-xs font-bold text-slate-500 hover:text-sky-700 ${jakartaSans.className}`}
                >
                  External link
                  <ExternalLink className="h-3 w-3" aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        ) : null}
      </section>
    </div>
  );
}
