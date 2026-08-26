"use client";

import React from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { fredokaHeadline, jakartaSans } from "@/app/fonts";
import { PortalBadge, PortalEyebrow, PortalLead, PortalPageTitle } from "@/components/portal/portal-ui";
import {
  CURRICULUM_MODULES,
  EXTERNAL_CURRICULUM,
  getExternalCourse,
  type CurriculumTrack,
} from "@/lib/portal/curriculum";

const trackAccent: Record<CurriculumTrack, "sky" | "emerald" | "amber" | "violet"> = {
  foundations: "violet",
  "ss-ais": "sky",
  "ss-acr": "amber",
  toolkit: "emerald",
};

export function PortalCurriculumView() {
  return (
    <div className="space-y-10">
      <header>
        <PortalEyebrow>Curriculum</PortalEyebrow>
        <PortalPageTitle className="mt-1">Courses & pathways</PortalPageTitle>
        <PortalLead>
          StudentStack maps credible, public free courses from IBM, Code.org, Microsoft, Google, and more into our
          member pathways. We maintain the daily toolkit; these orgs provide the foundation literacy.
        </PortalLead>
      </header>

      <section className="space-y-6">
        {CURRICULUM_MODULES.map((mod) => (
          <article
            key={mod.track}
            className="overflow-hidden rounded-[2rem] border-2 border-slate-200 bg-white shadow-[0_12px_0_0_rgba(15,23,42,0.06)]"
          >
            <div className="border-b-2 border-slate-100 bg-gradient-to-r from-sky-50/80 to-white px-6 py-5 sm:px-8">
              <PortalBadge accent={trackAccent[mod.track]}>{mod.label}</PortalBadge>
              <p className={`mt-3 max-w-2xl text-sm font-medium leading-relaxed text-slate-600 ${jakartaSans.className}`}>
                {mod.summary}
              </p>
              <Link
                href={mod.studentStackHref}
                className={`mt-3 inline-flex text-xs font-black uppercase tracking-[0.12em] text-sky-700 hover:text-sky-900 ${jakartaSans.className}`}
              >
                Open StudentStack module →
              </Link>
            </div>
            <ul className="divide-y divide-slate-100">
              {mod.externalCourseIds.map((id) => {
                const course = getExternalCourse(id);
                if (!course) return null;
                return (
                  <li key={course.id} className="px-6 py-5 sm:px-8">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="max-w-2xl">
                        <p className={`text-[10px] font-black uppercase tracking-[0.14em] text-slate-400 ${jakartaSans.className}`}>
                          {course.organization} · {course.duration}
                        </p>
                        <h3 className={`mt-1 text-lg font-semibold text-slate-900 ${fredokaHeadline.className}`}>
                          {course.title}
                        </h3>
                        <p className={`mt-1.5 text-sm font-medium text-slate-600 ${jakartaSans.className}`}>
                          {course.summary}
                        </p>
                        {course.credential ? (
                          <p className={`mt-2 text-xs font-bold text-emerald-700 ${jakartaSans.className}`}>
                            Credential: {course.credential}
                          </p>
                        ) : null}
                        <p className={`mt-3 rounded-2xl bg-slate-50 px-3 py-2.5 text-sm font-medium leading-relaxed text-slate-700 ${jakartaSans.className}`}>
                          <span className="font-bold text-slate-900">How we use it: </span>
                          {course.studentStackNote}
                        </p>
                      </div>
                      <a
                        href={course.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex shrink-0 items-center gap-2 rounded-2xl bg-slate-900 px-4 py-2.5 text-[10px] font-black uppercase tracking-[0.12em] text-white transition hover:-translate-y-0.5 hover:bg-slate-800 ${jakartaSans.className}`}
                      >
                        Open free course
                        <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                      </a>
                    </div>
                  </li>
                );
              })}
            </ul>
          </article>
        ))}
      </section>

      <section>
        <PortalEyebrow>Full catalog</PortalEyebrow>
        <h2 className={`mt-2 text-xl font-semibold text-slate-900 ${fredokaHeadline.className}`}>
          All curated public courses
        </h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {EXTERNAL_CURRICULUM.map((course) => (
            <li
              key={course.id}
              className="rounded-[1.5rem] border-2 border-slate-100 bg-white p-4 shadow-[0_8px_0_0_rgba(15,23,42,0.04)]"
            >
              <p className={`text-[10px] font-black uppercase tracking-[0.12em] text-sky-600 ${jakartaSans.className}`}>
                {course.organization}
              </p>
              <p className={`mt-1 font-semibold text-slate-900 ${fredokaHeadline.className}`}>{course.title}</p>
              <p className={`mt-1 text-xs font-medium text-slate-500 ${jakartaSans.className}`}>
                {course.duration} · {course.format}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
