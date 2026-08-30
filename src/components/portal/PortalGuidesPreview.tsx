"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, CheckSquare } from "lucide-react";
import { fredokaHeadline, jakartaSans } from "@/app/fonts";
import { PortalEyebrow, portalCard, portalCardHover } from "@/components/portal/portal-ui";
import { MEMBER_PLAYBOOKS } from "@/lib/portal/playbooks";

export function PortalGuidesPreview({ compact = false }: { compact?: boolean }) {
  return (
    <section>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <PortalEyebrow className="text-amber-700">Optional · self-paced</PortalEyebrow>
          <h2 className={`mt-1 text-xl font-semibold tracking-[-0.02em] text-slate-900 sm:text-2xl ${fredokaHeadline.className}`}>
            Member guides
          </h2>
          {!compact ? (
            <p className={`mt-1 max-w-2xl text-sm font-medium text-slate-500 ${jakartaSans.className}`}>
              Checklists — not video courses. Work through at your speed; message the team when you want feedback or an
              org badge.
            </p>
          ) : null}
        </div>
        <Link
          href="/portal/guides"
          className={`text-sm font-semibold text-sky-600 hover:text-sky-700 ${jakartaSans.className}`}
        >
          All guides →
        </Link>
      </div>

      <ul className={`mt-4 grid gap-3 ${compact ? "sm:grid-cols-2" : "lg:grid-cols-2"}`}>
        {MEMBER_PLAYBOOKS.map((guide) => (
          <li key={guide.id}>
            <Link
              href={`/portal/guides#${guide.id}`}
              className={`group flex h-full flex-col ${portalCard} ${portalCardHover} p-4 hover:ring-amber-200/50`}
            >
              <div className="flex items-start gap-2">
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-800 ring-1 ring-amber-500/20">
                  <CheckSquare className="h-4 w-4" aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <p className={`font-semibold text-slate-900 ${fredokaHeadline.className}`}>{guide.title}</p>
                  <p className={`mt-1 line-clamp-2 text-sm font-medium text-slate-500 ${jakartaSans.className}`}>
                    {guide.summary}
                  </p>
                </div>
              </div>
              <p className={`mt-3 text-xs font-medium text-slate-400 ${jakartaSans.className}`}>
                {guide.checklist.length} checklist items · {guide.format.split("·")[0].trim()}
              </p>
              <span className={`mt-3 inline-flex items-center gap-1 text-sm font-semibold text-sky-600 ${jakartaSans.className}`}>
                Open guide
                <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
