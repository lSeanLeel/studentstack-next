"use client";

import React from "react";
import { Mail } from "lucide-react";
import { jakartaSans, fredokaHeadline } from "@/app/fonts";
import { BrandWordmark } from "@/components/BrandWordmark";
import {
  MANUAL_TOOLKIT_SLOTS,
  type ManualWeeklyEmailPayload,
} from "@/lib/weekly-email-manual";

type Props = {
  data: ManualWeeklyEmailPayload;
  className?: string;
};

export function ManualWeeklyEmailPreview({ data, className = "" }: Props) {
  const sheet = data.opportunityBoardUrl.trim();

  return (
    <div
      className={`w-full max-w-[600px] overflow-hidden rounded-[1.75rem] border border-slate-200/90 bg-white shadow-[0_28px_80px_-40px_rgba(15,23,42,0.42)] ${className}`}
    >
      {/* Email chrome */}
      <div className="border-b border-slate-100 bg-slate-50 px-4 py-3 sm:px-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-sky-600 shadow-sm">
              <Mail className="h-4 w-4" aria-hidden />
            </div>
            <div>
              <p className={`text-xs font-black text-slate-900 ${jakartaSans.className}`}>help@studentstack.info</p>
              <p className={`text-[10px] font-bold uppercase tracking-widest text-slate-500 ${jakartaSans.className}`}>
                Weekly send · preview
              </p>
            </div>
          </div>
          <span
            className={`rounded-xl border border-sky-100 bg-sky-50 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-sky-700 ${jakartaSans.className}`}
          >
            {data.weekLabel}
          </span>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-gradient-to-br from-slate-900 via-sky-950 to-sky-900 px-6 py-7 sm:px-8 sm:py-8">
        <p className={`text-[11px] font-black uppercase tracking-[0.28em] text-sky-200/90 ${jakartaSans.className}`}>
          StudentStack
        </p>
        <h2
          className={`mt-2 text-2xl font-semibold leading-tight tracking-[-0.03em] text-white sm:text-[1.65rem] ${fredokaHeadline.className}`}
        >
          Weekly parent email
        </h2>
        <p className={`mt-2 text-sm font-medium text-sky-100/90 ${jakartaSans.className}`}>{data.weekLabel}</p>
      </div>

      <div className="space-y-5 px-5 py-6 sm:px-7 sm:py-7">
        {data.intro.trim() ? (
          <p className={`text-sm leading-relaxed text-slate-600 sm:text-[15px] ${jakartaSans.className}`}>{data.intro}</p>
        ) : null}

        {/* AI Toolkit */}
        <section className="overflow-hidden rounded-2xl border border-sky-100/90 bg-gradient-to-br from-sky-50/90 via-white to-violet-50/50 shadow-[0_16px_44px_-28px_rgba(14,165,233,0.45)]">
          <div className="border-b border-sky-100/80 bg-white/60 px-4 py-3.5 sm:px-5">
            <p className={`text-[10px] font-black uppercase tracking-[0.22em] text-sky-700 ${jakartaSans.className}`}>
              AI toolkit
            </p>
            <h3 className={`mt-1 text-lg font-semibold text-slate-900 sm:text-xl ${fredokaHeadline.className}`}>
              This week&apos;s picks (by category)
            </h3>
            <p className={`mt-1 text-xs font-semibold text-slate-600 sm:text-[13px] ${jakartaSans.className}`}>
              Curated by your team — one standout tool per lane. No AI auto-fill here.
            </p>
          </div>
          <ul className="divide-y divide-slate-100/90 bg-white/80">
            {data.toolkit.map((slot, i) => {
              const meta = MANUAL_TOOLKIT_SLOTS.find((m) => m.id === slot.id);
              const label = meta?.label ?? slot.id;
              const hint = meta?.hint;
              const stripe = i % 2 === 0 ? "bg-slate-50/40" : "bg-white";
              return (
                <li key={slot.id} className={`relative ${stripe}`}>
                  <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-sky-500 to-violet-400" aria-hidden />
                  <div className="pl-4 pr-4 py-4 sm:pl-5 sm:pr-5">
                    <p className={`text-[10px] font-black uppercase tracking-[0.16em] text-sky-700 ${jakartaSans.className}`}>
                      {label}
                    </p>
                    {hint ? (
                      <p className={`mt-0.5 text-[10px] font-medium text-slate-400 ${jakartaSans.className}`}>{hint}</p>
                    ) : null}
                    <p className={`mt-2 text-base font-semibold text-slate-900 ${fredokaHeadline.className}`}>
                      {slot.toolName.trim() || "— Add tool name —"}
                    </p>
                    <p className={`mt-1.5 text-sm leading-relaxed text-slate-600 ${jakartaSans.className}`}>
                      {slot.blurb.trim() || "One line: why this tool matters this week."}
                    </p>
                    {slot.url.trim() ? (
                      <p className={`mt-2 text-xs font-bold text-sky-600 ${jakartaSans.className}`}>
                        <span className="break-all">{slot.url.trim()}</span>
                      </p>
                    ) : (
                      <p className={`mt-2 text-xs font-semibold italic text-slate-400 ${jakartaSans.className}`}>No link yet</p>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        {/* Sheet CTA */}
        <section className="overflow-hidden rounded-2xl border border-teal-100 bg-gradient-to-br from-teal-50 via-white to-emerald-50/50 shadow-[0_14px_36px_-26px_rgba(13,148,136,0.4)]">
          <div className="px-4 py-4 sm:px-5 sm:py-5">
            <p className={`text-[10px] font-black uppercase tracking-[0.2em] text-teal-800 ${jakartaSans.className}`}>
              Opportunity board
            </p>
            <h3 className={`mt-1 text-lg font-semibold text-teal-950 ${fredokaHeadline.className}`}>
              Google Sheet · programs &amp; deadlines
            </h3>
            <p className={`mt-2 text-sm leading-relaxed text-teal-900/80 ${jakartaSans.className}`}>
              Same link every week — you maintain rows in Google Sheets. Parents tap through to the live board.
            </p>
            {sheet ? (
              <div className="mt-4">
                <a
                  href={sheet.startsWith("http") ? sheet : `https://${sheet}`}
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-flex rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 px-6 py-3.5 text-xs font-black uppercase tracking-[0.12em] text-white shadow-[0_12px_28px_-14px_rgba(14,165,233,0.75)] transition-transform hover:-translate-y-0.5 ${jakartaSans.className}`}
                >
                  {data.opportunityBoardButtonText.trim() || "Open the opportunity board"}
                </a>
              </div>
            ) : (
              <p className={`mt-3 text-xs font-semibold text-teal-700/80 ${jakartaSans.className}`}>Paste your Sheet URL in admin.</p>
            )}
          </div>
        </section>

        {/* Featured Q&A */}
        <section className="overflow-hidden rounded-2xl border border-violet-100 bg-white shadow-[0_18px_44px_-30px_rgba(109,40,217,0.35)]">
          <div className="border-b border-violet-100 bg-gradient-to-r from-violet-50/90 to-slate-50/80 px-4 py-3.5 sm:px-5">
            <p className={`text-[10px] font-black uppercase tracking-[0.2em] text-violet-700 ${jakartaSans.className}`}>
              Featured parent question
            </p>
            <p className={`mt-1 text-sm font-bold text-slate-900 ${jakartaSans.className}`}>
              {data.featuredSubject.trim() || "Subject line for this thread"}
            </p>
            <p className={`mt-1 text-xs font-semibold text-slate-500 ${jakartaSans.className}`}>
              From: {data.featuredParentLabel.trim() || "Parent (anonymized)"}
            </p>
          </div>
          <div className="border-b border-slate-100 px-4 py-4 sm:px-5">
            <p className={`whitespace-pre-wrap text-sm leading-relaxed text-slate-700 ${jakartaSans.className}`}>
              {data.featuredQuestion.trim() || "Paste the anonymized parent question…"}
            </p>
          </div>
          <div className="border-l-4 border-sky-500 bg-gradient-to-b from-sky-50/80 to-white px-4 py-4 sm:px-5">
            <p className={`text-[10px] font-black uppercase tracking-[0.18em] text-sky-800 ${jakartaSans.className}`}>
              StudentStack team
            </p>
            <p className={`mt-2 whitespace-pre-wrap text-sm leading-relaxed text-slate-800 ${jakartaSans.className}`}>
              {data.featuredAnswer.trim() || "Your reply to families…"}
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="rounded-2xl border border-slate-100 bg-slate-50/80 px-4 py-5 text-center sm:px-5">
          <div className="flex justify-center">
            <BrandWordmark className="!text-[1.25rem] !leading-none md:!text-[1.45rem] md:!leading-none" />
          </div>
          <p className={`mt-2 text-xs font-semibold text-slate-500 ${jakartaSans.className}`}>
            <a href="mailto:help@studentstack.info" className="text-sky-600 hover:underline">
              help@studentstack.info
            </a>
            <span className="mx-2 text-slate-300">·</span>
            <a href="https://studentstack.info" className="text-sky-600 hover:underline">
              studentstack.info
            </a>
          </p>
          <p className={`mt-3 text-[11px] leading-relaxed text-slate-400 ${jakartaSans.className}`}>{data.footnote}</p>
        </footer>
      </div>
    </div>
  );
}
