"use client";

import React from "react";
import { Lock } from "lucide-react";
import { BrandWordmark } from "@/components/BrandWordmark";
import { fredokaHeadline, jakartaSans } from "@/app/fonts";
import { PORTAL_PREVIEW_SNAPSHOT } from "@/lib/portal/portal-preview";

const NAV = ["Home", "Toolkit", "Resources", "Guides", "Team"] as const;

/** Abstract product mock — Apple-inspired, not a 1:1 portal clone. */
export function PortalPreviewMock() {
  return (
    <div
      className="overflow-hidden rounded-[2rem] bg-[#f5f5f7] p-2 shadow-[0_24px_80px_-24px_rgba(0,0,0,0.18)] ring-1 ring-black/[0.06] sm:rounded-[2.25rem] sm:p-2.5"
      aria-hidden
    >
      {/* Device chrome */}
      <div className="flex items-center gap-2 rounded-t-[1.35rem] px-3 py-2">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-black/[0.08]" />
          <span className="h-2.5 w-2.5 rounded-full bg-black/[0.08]" />
          <span className="h-2.5 w-2.5 rounded-full bg-black/[0.08]" />
        </div>
        <div
          className={`ml-1 flex-1 rounded-full bg-black/[0.04] px-3 py-1 text-center text-[10px] font-medium text-slate-400 ${jakartaSans.className}`}
        >
          studentstack.info/portal
        </div>
      </div>

      <div className="overflow-hidden rounded-[1.35rem] bg-[#f5f5f7] sm:rounded-[1.5rem]">
        {/* Header */}
        <div className="border-b border-black/[0.06] bg-[#f5f5f7]/90 px-3 py-2.5 backdrop-blur-xl sm:px-4">
          <div className="flex items-center justify-between gap-2">
            <div className="scale-[0.55] origin-left sm:scale-[0.62]">
              <BrandWordmark compact />
            </div>
            <span
              className={`hidden rounded-full bg-emerald-500/10 px-2 py-0.5 text-[9px] font-semibold text-emerald-700 ring-1 ring-emerald-500/20 sm:inline ${jakartaSans.className}`}
            >
              Active
            </span>
          </div>
          <div className="mt-2 flex gap-0.5 overflow-x-auto rounded-full bg-black/[0.04] p-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {NAV.map((label, i) => (
              <span
                key={label}
                className={`shrink-0 rounded-full px-2.5 py-1 text-[9px] font-semibold sm:text-[10px] ${jakartaSans.className} ${
                  i === 0 ? "bg-white text-slate-900 shadow-sm ring-1 ring-black/[0.06]" : "text-slate-500"
                }`}
              >
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Abstract dashboard body */}
        <div className="relative max-h-[28rem] overflow-hidden p-3 sm:max-h-[30rem] sm:p-4">
          <div className="space-y-2.5">
            {/* Hero card */}
            <div className="rounded-2xl bg-white p-3 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.06)] ring-1 ring-black/[0.04] sm:p-3.5">
              <p className={`text-[9px] font-semibold tracking-wide text-sky-600 ${jakartaSans.className}`}>
                Platform home
              </p>
              <p className={`mt-0.5 text-sm font-semibold tracking-[-0.02em] text-slate-900 sm:text-base ${fredokaHeadline.className}`}>
                AI literacy for school
              </p>
              <p className={`mt-1 text-[10px] font-medium leading-relaxed text-slate-500 sm:text-[11px] ${jakartaSans.className}`}>
                Self-paced toolkit, resources, and optional guides — one place.
              </p>
            </div>

            {/* Featured tip */}
            <div className="rounded-2xl bg-white p-3 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.06)] ring-1 ring-black/[0.04] sm:p-3.5">
              <p className={`text-[9px] font-semibold text-sky-600 ${jakartaSans.className}`}>
                This week · {PORTAL_PREVIEW_SNAPSHOT.dateLabel}
              </p>
              <p className={`mt-0.5 text-[11px] font-semibold text-slate-900 sm:text-xs ${fredokaHeadline.className}`}>
                {PORTAL_PREVIEW_SNAPSHOT.tipTitle}
              </p>
              <p className={`mt-1 line-clamp-2 text-[9px] font-medium leading-relaxed text-slate-500 sm:text-[10px] ${jakartaSans.className}`}>
                {PORTAL_PREVIEW_SNAPSHOT.tipBody}
              </p>
            </div>

            {/* Message teaser */}
            <div className="rounded-2xl bg-white/80 p-3 ring-1 ring-black/[0.04]">
              <p className={`text-[9px] font-semibold text-slate-500 ${jakartaSans.className}`}>Message the team</p>
              <div className="mt-1.5 h-7 rounded-xl bg-black/[0.03] px-2.5">
                <p className={`pt-2 text-[9px] text-slate-400 ${jakartaSans.className}`}>
                  What&apos;s allowed for AI in AP Bio labs?
                </p>
              </div>
            </div>
          </div>

          {/* Soft gate */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col items-center justify-end bg-gradient-to-t from-[#f5f5f7] via-[#f5f5f7]/95 to-transparent pb-3 pt-14">
            <div className="flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-2 shadow-sm ring-1 ring-black/[0.06] backdrop-blur-sm">
              <Lock className="h-3.5 w-3.5 text-sky-600" aria-hidden />
              <span className={`text-[10px] font-semibold text-slate-600 ${jakartaSans.className}`}>
                Unlocks with membership
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
