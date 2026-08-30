"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, CheckSquare, MessageSquare, Wrench } from "lucide-react";
import { fredokaHeadline, jakartaSans } from "@/app/fonts";
import {
  PortalEyebrow,
  PortalLead,
  PortalPageTitle,
  PortalPrimaryButton,
  portalCard,
  portalLabel,
} from "@/components/portal/portal-ui";
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

      <div className="rounded-2xl bg-sky-500/5 px-5 py-4 ring-1 ring-sky-500/15">
        <p className={`text-sm font-medium text-slate-700 ${jakartaSans.className}`}>
          Most members live in the{" "}
          <Link href="/portal/toolkit" className="font-semibold text-sky-600 hover:text-sky-700">
            AI Toolkit
          </Link>{" "}
          week to week. Guides are for when you want structure around integrity or college-bound work.
        </p>
      </div>

      <div className="space-y-8">
        {MEMBER_PLAYBOOKS.map((guide) => (
          <article key={guide.id} id={guide.id} className={`scroll-mt-32 overflow-hidden ${portalCard}`}>
            <div className="border-b border-black/[0.04] bg-gradient-to-r from-amber-500/5 to-white px-5 py-5 sm:px-7">
              <div className="flex flex-wrap items-start gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-800 ring-1 ring-amber-500/20">
                  <CheckSquare className="h-5 w-5" aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <h2 className={`text-2xl font-semibold tracking-[-0.02em] text-slate-900 ${fredokaHeadline.className}`}>
                    {guide.title}
                  </h2>
                  <p className={`mt-1 text-sm font-medium text-slate-500 ${jakartaSans.className}`}>{guide.summary}</p>
                </div>
              </div>
              <p className={`mt-4 text-xs font-semibold text-slate-400 ${jakartaSans.className}`}>
                When to use · {guide.whenToUse}
              </p>
              <p className={`mt-1 text-xs font-medium text-slate-400 ${jakartaSans.className}`}>{guide.format}</p>
            </div>

            <div className="grid gap-6 px-5 py-6 sm:px-7 lg:grid-cols-[1fr_minmax(14rem,18rem)]">
              <div>
                <p className={portalLabel}>Checklist</p>
                <ol className="mt-3 space-y-3">
                  {guide.checklist.map((item, i) => (
                    <li
                      key={item.id}
                      className="flex gap-3 rounded-2xl bg-[#f5f5f7]/80 px-4 py-3.5 ring-1 ring-black/[0.04]"
                    >
                      <span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-[10px] font-semibold text-slate-500 ring-1 ring-black/[0.08] ${jakartaSans.className}`}>
                        {i + 1}
                      </span>
                      <div>
                        <p className={`font-semibold text-slate-900 ${fredokaHeadline.className}`}>{item.label}</p>
                        <p className={`mt-0.5 text-sm font-medium text-slate-500 ${jakartaSans.className}`}>
                          {item.detail}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <aside className="space-y-4">
                <div className="rounded-2xl bg-sky-500/5 p-4 ring-1 ring-sky-500/15">
                  <p className={`flex items-center gap-1.5 text-xs font-semibold text-sky-700 ${jakartaSans.className}`}>
                    <Wrench className="h-3 w-3" aria-hidden />
                    Toolkit links
                  </p>
                  <ul className="mt-2 space-y-2">
                    {guide.toolkitAnchors.map((link) => (
                      <li key={link.href}>
                        <Link href={link.href} className={`text-sm font-semibold text-sky-600 hover:text-sky-700 ${jakartaSans.className}`}>
                          {link.label} →
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl bg-amber-500/5 p-4 ring-1 ring-amber-500/15">
                  <p className={`text-xs font-semibold text-amber-800 ${jakartaSans.className}`}>Org badge (optional)</p>
                  <p className={`mt-2 text-sm font-medium leading-relaxed text-slate-600 ${jakartaSans.className}`}>
                    {guide.badgeNote}
                  </p>
                  <Link
                    href="/portal/message"
                    className={`mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-sky-600 hover:text-sky-700 ${jakartaSans.className}`}
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

      <PortalPrimaryButton href="/portal/toolkit">
        Back to AI Toolkit
        <ArrowRight className="h-4 w-4" aria-hidden />
      </PortalPrimaryButton>
    </div>
  );
}
