"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, CheckSquare } from "lucide-react";
import { fredokaHeadline, jakartaSans } from "@/app/fonts";
import { MEMBER_PLAYBOOKS } from "@/lib/portal/playbooks";

export function PortalGuidesPreview({ compact = false }: { compact?: boolean }) {
  return (
    <section>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className={`text-[10px] font-black uppercase tracking-[0.2em] text-amber-700 ${jakartaSans.className}`}>
            Optional · self-paced
          </p>
          <h2 className={`mt-1 text-xl font-semibold text-slate-900 sm:text-2xl ${fredokaHeadline.className}`}>
            Member guides
          </h2>
          {!compact ? (
            <p className={`mt-1 max-w-2xl text-sm font-medium text-slate-600 ${jakartaSans.className}`}>
              Checklists — not video courses. Work through at your speed; message the team when you want feedback or an
              org badge.
            </p>
          ) : null}
        </div>
        <Link
          href="/portal/guides"
          className={`text-sm font-bold text-sky-700 hover:text-sky-900 ${jakartaSans.className}`}
        >
          All guides →
        </Link>
      </div>

      <ul className={`mt-4 grid gap-3 ${compact ? "sm:grid-cols-2" : "lg:grid-cols-2"}`}>
        {MEMBER_PLAYBOOKS.map((guide) => (
          <li key={guide.id}>
            <Link
              href={`/portal/guides#${guide.id}`}
              className="group flex h-full flex-col rounded-[1.5rem] border-2 border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-amber-200"
            >
              <div className="flex items-start gap-2">
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-800">
                  <CheckSquare className="h-4 w-4" aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <p className={`font-semibold text-slate-900 ${fredokaHeadline.className}`}>{guide.title}</p>
                  <p className={`mt-1 line-clamp-2 text-sm font-medium text-slate-600 ${jakartaSans.className}`}>
                    {guide.summary}
                  </p>
                </div>
              </div>
              <p className={`mt-3 text-xs font-medium text-slate-500 ${jakartaSans.className}`}>
                {guide.checklist.length} checklist items · {guide.format.split("·")[0].trim()}
              </p>
              <span className={`mt-3 inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-[0.1em] text-sky-700 ${jakartaSans.className}`}>
                Open guide
                <ArrowRight className="h-3 w-3" aria-hidden />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
