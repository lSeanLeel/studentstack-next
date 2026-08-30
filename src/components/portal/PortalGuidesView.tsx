"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, CheckSquare, MessageSquare, Wrench } from "lucide-react";
import { fredokaHeadline, jakartaSans } from "@/app/fonts";
import { PortalEyebrow, PortalLead, PortalPageTitle } from "@/components/portal/portal-ui";
import { MEMBER_PLAYBOOKS } from "@/lib/portal/playbooks";

export function PortalGuidesView() {
  return (
    <div className="space-y-10">
      <header>
        <PortalEyebrow>Optional · self-paced</PortalEyebrow>
        <PortalPageTitle className="mt-1">Member guides</PortalPageTitle>
        <PortalLead>
          Checklists and worksheets — not a video course. Use them when they fit your year; message the team for
          feedback or an organization badge after you finish.
        </PortalLead>
      </header>

      <div className="rounded-[1.5rem] border-2 border-dashed border-sky-200 bg-sky-50/50 px-5 py-4">
        <p className={`text-sm font-semibold text-slate-800 ${jakartaSans.className}`}>
          Most members live in the{" "}
          <Link href="/portal/toolkit" className="font-bold text-sky-700 hover:text-sky-900">
            AI Toolkit
          </Link>{" "}
          week to week. Guides are for when you want structure around integrity or college-bound work.
        </p>
      </div>

      <div className="space-y-8">
        {MEMBER_PLAYBOOKS.map((guide) => (
          <article
            key={guide.id}
            id={guide.id}
            className="scroll-mt-32 overflow-hidden rounded-[1.75rem] border-2 border-slate-200 bg-white shadow-[0_10px_0_0_rgba(15,23,42,0.05)]"
          >
            <div className="border-b-2 border-slate-100 bg-gradient-to-r from-amber-50/80 to-white px-5 py-5 sm:px-7">
              <div className="flex flex-wrap items-start gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-100 text-amber-800">
                  <CheckSquare className="h-5 w-5" aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <h2 className={`text-2xl font-semibold text-slate-900 ${fredokaHeadline.className}`}>{guide.title}</h2>
                  <p className={`mt-1 text-sm font-medium text-slate-600 ${jakartaSans.className}`}>{guide.summary}</p>
                </div>
              </div>
              <p className={`mt-4 text-xs font-bold uppercase tracking-[0.12em] text-slate-500 ${jakartaSans.className}`}>
                When to use · {guide.whenToUse}
              </p>
              <p className={`mt-1 text-xs font-medium text-slate-500 ${jakartaSans.className}`}>{guide.format}</p>
            </div>

            <div className="grid gap-6 px-5 py-6 sm:px-7 lg:grid-cols-[1fr_minmax(14rem,18rem)]">
              <div>
                <p className={`text-[10px] font-black uppercase tracking-[0.14em] text-slate-500 ${jakartaSans.className}`}>
                  Checklist
                </p>
                <ol className="mt-3 space-y-3">
                  {guide.checklist.map((item, i) => (
                    <li
                      key={item.id}
                      className="flex gap-3 rounded-2xl border-2 border-slate-100 bg-[#f8fafc] px-4 py-3.5"
                    >
                      <span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-slate-300 text-[10px] font-black text-slate-500 ${jakartaSans.className}`}>
                        {i + 1}
                      </span>
                      <div>
                        <p className={`font-semibold text-slate-900 ${fredokaHeadline.className}`}>{item.label}</p>
                        <p className={`mt-0.5 text-sm font-medium text-slate-600 ${jakartaSans.className}`}>
                          {item.detail}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <aside className="space-y-4">
                <div className="rounded-2xl border-2 border-sky-100 bg-sky-50/60 p-4">
                  <p className={`flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.12em] text-sky-700 ${jakartaSans.className}`}>
                    <Wrench className="h-3 w-3" aria-hidden />
                    Toolkit links
                  </p>
                  <ul className="mt-2 space-y-2">
                    {guide.toolkitAnchors.map((link) => (
                      <li key={link.href}>
                        <Link href={link.href} className={`text-sm font-bold text-sky-800 hover:text-sky-950 ${jakartaSans.className}`}>
                          {link.label} →
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl border-2 border-amber-100 bg-amber-50/50 p-4">
                  <p className={`text-[10px] font-black uppercase tracking-[0.12em] text-amber-800 ${jakartaSans.className}`}>
                    Org badge (optional)
                  </p>
                  <p className={`mt-2 text-sm font-medium leading-relaxed text-slate-700 ${jakartaSans.className}`}>
                    {guide.badgeNote}
                  </p>
                  <Link
                    href="/portal/message"
                    className={`mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-sky-700 hover:text-sky-900 ${jakartaSans.className}`}
                  >
                    <MessageSquare className="h-4 w-4" aria-hidden />
                    Message the team
                  </Link>
                </div>
              </aside>
            </div>
          </article>
        ))}
      </div>

      <Link
        href="/portal/toolkit"
        className={`inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-[11px] font-black uppercase tracking-[0.12em] text-white transition hover:-translate-y-0.5 hover:bg-slate-800 ${jakartaSans.className}`}
      >
        Back to AI Toolkit
        <ArrowRight className="h-4 w-4" aria-hidden />
      </Link>
    </div>
  );
}
