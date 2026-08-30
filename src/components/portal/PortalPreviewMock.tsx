"use client";

import React from "react";
import { ArrowRight, Lock } from "lucide-react";
import { BrandWordmark } from "@/components/BrandWordmark";
import { fredokaHeadline, jakartaSans } from "@/app/fonts";
import { HOW_MEMBERSHIP_WORKS, START_HERE_SCENARIOS } from "@/lib/portal/membership";
import { PORTAL_PREVIEW_DEMO } from "@/lib/portal/portal-preview";

const NAV = ["Home", "Toolkit", "Resources", "Guides", "Team"] as const;

/** CSS mock of /portal home — aligned with PortalHomeDashboard + layout. */
export function PortalPreviewMock() {
  const scenarios = START_HERE_SCENARIOS.slice(0, 4);
  const steps = HOW_MEMBERSHIP_WORKS;

  return (
    <div className="overflow-hidden rounded-[2rem] border-2 border-slate-800 bg-slate-900 p-2 shadow-[0_28px_0_0_rgba(15,23,42,0.18)] sm:rounded-[2.25rem] sm:p-2.5">
      {/* Browser chrome */}
      <div className="flex items-center gap-2 rounded-t-[1.35rem] bg-slate-800/90 px-3 py-2">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-400/90" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/90" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/90" />
        </div>
        <div className={`ml-1 flex-1 rounded-lg bg-slate-900/80 px-3 py-1 text-[10px] font-bold text-slate-400 ${jakartaSans.className}`}>
          studentstack.info/portal
        </div>
      </div>

      <div
        className="overflow-hidden rounded-b-[1.35rem] sm:rounded-b-[1.5rem]"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 90% 60% at 50% -15%, rgba(125,211,252,0.45), transparent 55%), radial-gradient(ellipse 50% 40% at 100% 0%, rgba(167,243,208,0.35), transparent 45%), linear-gradient(180deg, #e0f2fe 0%, #f8fafc 35%, #f0fdf4 100%)",
        }}
      >
        {/* Portal header */}
        <div className="border-b-2 border-sky-100/80 bg-white/95 px-3 py-2.5 sm:px-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex min-w-0 items-center gap-2 sm:gap-3">
              <div className="scale-[0.55] origin-left sm:scale-[0.65]">
                <BrandWordmark compact />
              </div>
              <div className="hidden min-w-0 flex-wrap gap-1 sm:flex">
                {NAV.map((label, i) => (
                  <span
                    key={label}
                    className={`rounded-xl px-2 py-1 text-[8px] font-black uppercase tracking-[0.08em] sm:text-[9px] ${jakartaSans.className} ${
                      i === 0 ? "bg-slate-900 text-white shadow-[0_4px_0_0_rgba(15,23,42,0.2)]" : "text-slate-500 ring-1 ring-slate-200 bg-white"
                    }`}
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-1.5">
              <div className="hidden text-right sm:block">
                <p className={`text-[8px] font-black uppercase tracking-[0.1em] text-sky-600 ${jakartaSans.className}`}>Member</p>
                <p className={`text-[10px] font-semibold text-slate-700 ${jakartaSans.className}`}>{PORTAL_PREVIEW_DEMO.displayName}</p>
              </div>
              <span className={`rounded-lg bg-emerald-50 px-1.5 py-0.5 text-[8px] font-black uppercase tracking-[0.08em] text-emerald-700 ring-1 ring-emerald-200 ${jakartaSans.className}`}>
                Active
              </span>
            </div>
          </div>
          <div className="mt-2 flex gap-1 overflow-x-auto sm:hidden">
            {NAV.map((label, i) => (
              <span
                key={label}
                className={`shrink-0 rounded-xl px-2 py-1 text-[8px] font-black uppercase tracking-[0.08em] ${jakartaSans.className} ${
                  i === 0 ? "bg-slate-900 text-white" : "bg-white text-slate-500 ring-1 ring-slate-200"
                }`}
              >
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Portal home body */}
        <div className="relative max-h-[28rem] overflow-hidden p-3 sm:max-h-[32rem] sm:p-4">
          <div className="space-y-3">
            {/* Welcome bar */}
            <div className="flex items-center justify-between gap-2 rounded-xl border-2 border-slate-800 bg-slate-900 px-3 py-2 text-white shadow-[0_6px_0_0_rgba(15,23,42,0.12)]">
              <div className="min-w-0">
                <p className={`text-[8px] font-black uppercase tracking-[0.12em] text-sky-200 ${jakartaSans.className}`}>
                  Hey {PORTAL_PREVIEW_DEMO.displayName}
                </p>
                <p className={`truncate text-[10px] font-medium text-slate-300 sm:text-xs ${jakartaSans.className}`}>
                  AI literacy for school · self-paced membership
                </p>
              </div>
              <span className={`shrink-0 rounded-lg bg-white px-2 py-1 text-[8px] font-black uppercase tracking-[0.08em] text-slate-900 ${jakartaSans.className}`}>
                Open toolkit
              </span>
            </div>

            {/* How it works — compact */}
            <div className="rounded-xl border-2 border-sky-100 bg-gradient-to-br from-sky-50/90 to-white p-2.5 sm:p-3">
              <p className={`text-[8px] font-black uppercase tracking-[0.14em] text-sky-600 ${jakartaSans.className}`}>
                How membership works
              </p>
              <div className="mt-2 grid grid-cols-3 gap-1.5">
                {steps.map((step, i) => (
                  <div key={step.id} className="rounded-lg border border-white bg-white/95 p-2 shadow-[0_3px_0_0_rgba(14,165,233,0.06)]">
                    <span className={`inline-flex h-4 w-4 items-center justify-center rounded-full bg-slate-900 text-[8px] font-black text-white ${jakartaSans.className}`}>
                      {i + 1}
                    </span>
                    <p className={`mt-1 text-[9px] font-semibold leading-tight text-slate-900 sm:text-[10px] ${fredokaHeadline.className}`}>
                      {step.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Start here */}
            <div>
              <p className={`text-[8px] font-black uppercase tracking-[0.14em] text-slate-500 ${jakartaSans.className}`}>Start here</p>
              <div className="mt-1.5 grid grid-cols-2 gap-1.5">
                {scenarios.map((s) => (
                  <div key={s.id} className="rounded-lg border-2 border-slate-200 bg-white px-2 py-1.5">
                    <p className={`text-[9px] font-semibold text-slate-900 sm:text-[10px] ${fredokaHeadline.className}`}>{s.label}</p>
                    <p className={`mt-0.5 line-clamp-1 text-[8px] font-medium text-slate-500 ${jakartaSans.className}`}>{s.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Toolkit pick */}
            <div className="rounded-xl border-2 border-slate-100 bg-white p-2.5 shadow-[0_6px_0_0_rgba(15,23,42,0.04)] sm:p-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className={`text-[8px] font-black uppercase tracking-[0.14em] text-sky-600 ${jakartaSans.className}`}>
                    This week in the toolkit · {PORTAL_PREVIEW_DEMO.dateLabel}
                  </p>
                  <p className={`mt-0.5 text-[11px] font-semibold text-slate-900 sm:text-xs ${fredokaHeadline.className}`}>
                    {PORTAL_PREVIEW_DEMO.tipTitle}
                  </p>
                  <p className={`mt-1 line-clamp-2 text-[9px] font-medium leading-relaxed text-slate-600 sm:text-[10px] ${jakartaSans.className}`}>
                    {PORTAL_PREVIEW_DEMO.tipBody}
                  </p>
                </div>
                <span className={`shrink-0 rounded-md border border-sky-200 bg-sky-50 px-1.5 py-0.5 text-[7px] font-black uppercase tracking-[0.08em] text-sky-700 ${jakartaSans.className}`}>
                  Team
                </span>
              </div>
              <span className={`mt-2 inline-flex items-center gap-1 rounded-lg bg-slate-900 px-2 py-1 text-[8px] font-black uppercase tracking-[0.08em] text-white ${jakartaSans.className}`}>
                Open AI Toolkit
                <ArrowRight className="h-2.5 w-2.5" aria-hidden />
              </span>
            </div>

            {/* Message team teaser */}
            <div className="rounded-xl border-2 border-slate-200 bg-white p-2.5">
              <p className={`text-[8px] font-black uppercase tracking-[0.14em] text-sky-600 ${jakartaSans.className}`}>Message the team</p>
              <div className="mt-1.5 h-6 rounded-lg border border-slate-200 bg-slate-50 px-2">
                <p className={`pt-1.5 text-[9px] text-slate-400 ${jakartaSans.className}`}>What's allowed for AI in AP Bio labs?</p>
              </div>
            </div>
          </div>

          {/* Soft gate — bottom only */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col items-center justify-end bg-gradient-to-t from-[#f0fdf4] via-[#f8fafc]/95 to-transparent pb-3 pt-12">
            <div className="flex items-center gap-1.5 rounded-xl border-2 border-slate-200 bg-white/95 px-3 py-2 shadow-[0_8px_0_0_rgba(15,23,42,0.06)] backdrop-blur-sm">
              <Lock className="h-3.5 w-3.5 text-sky-600" aria-hidden />
              <span className={`text-[10px] font-bold text-slate-700 ${jakartaSans.className}`}>Unlocks with membership</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
