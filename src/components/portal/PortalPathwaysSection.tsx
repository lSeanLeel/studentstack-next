"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { fredokaHeadline, jakartaSans } from "@/app/fonts";
import { PortalBadge, PortalCard, PortalProgressBar } from "@/components/portal/portal-ui";
import type { MemberPathway } from "@/lib/portal/pathways";

const accentIcon: Record<MemberPathway["accent"], string> = {
  sky: "bg-sky-100 text-sky-700",
  emerald: "bg-emerald-100 text-emerald-700",
  amber: "bg-amber-100 text-amber-800",
  violet: "bg-violet-100 text-violet-700",
};

export function PortalPathwaysSection({ pathways }: { pathways: MemberPathway[] }) {
  return (
    <section>
      <PortalBadge accent="amber">Work toward</PortalBadge>
      <h2 className={`mt-3 text-2xl font-semibold tracking-[-0.02em] text-slate-900 sm:text-3xl ${fredokaHeadline.className}`}>
        Member pathways
      </h2>
      <p className={`mt-2 max-w-2xl text-sm font-medium leading-relaxed text-slate-600 ${jakartaSans.className}`}>
        Credentials and fluency tracks your student can point to on applications. Organization-issued, maintained by our
        college team.
      </p>

      <ul className="mt-6 grid gap-4 lg:grid-cols-3">
        {pathways.map((path) => (
          <li key={path.id}>
            <PortalCard href={path.href} hover className="flex h-full flex-col !p-5">
              <div className="flex items-start justify-between gap-2">
                <span
                  className={`inline-flex rounded-2xl px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.1em] ${accentIcon[path.accent]} ${jakartaSans.className}`}
                >
                  {path.partnerLabel}
                </span>
                <span className={`text-xs font-bold text-slate-500 ${jakartaSans.className}`}>{path.progress}%</span>
              </div>
              <p className={`mt-4 text-xl font-semibold leading-snug text-slate-900 ${fredokaHeadline.className}`}>
                {path.title}
              </p>
              <p className={`mt-1 text-xs font-bold uppercase tracking-[0.12em] text-slate-400 ${jakartaSans.className}`}>
                {path.subtitle}
              </p>
              <p className={`mt-3 flex-1 text-sm font-medium leading-relaxed text-slate-600 ${jakartaSans.className}`}>
                {path.partnerDetail}
              </p>
              <div className="mt-4">
                <PortalProgressBar value={path.progress} accent={path.accent === "emerald" ? "emerald" : path.accent === "amber" ? "amber" : "sky"} />
              </div>
              <ul className={`mt-4 space-y-2 border-t border-slate-100 pt-4 ${jakartaSans.className}`}>
                {path.steps.map((step) => (
                  <li key={step.id} className="flex gap-2 text-sm font-medium text-slate-700">
                    <span
                      className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${step.done ? "bg-emerald-400" : "bg-slate-200"}`}
                      aria-hidden
                    />
                    <span>
                      <span className="font-semibold text-slate-900">{step.label}</span>
                      <span className="text-slate-500"> · {step.detail}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <span className={`mt-4 inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-[0.12em] text-sky-700 ${jakartaSans.className}`}>
                Open pathway
                <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </span>
            </PortalCard>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function PortalCredibilityStrip({ partners }: { partners: { name: string; role: string; detail: string }[] }) {
  return (
    <section className="rounded-[2rem] border-2 border-slate-800 bg-slate-900 px-5 py-6 text-white sm:px-8">
      <p className={`text-[10px] font-black uppercase tracking-[0.22em] text-sky-200 ${jakartaSans.className}`}>
        Why parents trust membership
      </p>
      <ul className="mt-4 grid gap-4 sm:grid-cols-3">
        {partners.map((p) => (
          <li key={p.name} className="rounded-2xl bg-white/5 px-4 py-4 ring-1 ring-white/10">
            <p className={`text-sm font-semibold text-white ${fredokaHeadline.className}`}>{p.name}</p>
            <p className={`mt-1 text-[10px] font-black uppercase tracking-[0.12em] text-sky-200 ${jakartaSans.className}`}>
              {p.role}
            </p>
            <p className={`mt-2 text-xs font-medium leading-relaxed text-slate-300 ${jakartaSans.className}`}>
              {p.detail}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
