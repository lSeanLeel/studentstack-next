"use client";

import React, { useMemo, useState } from "react";
import { ArrowRight, CalendarDays } from "lucide-react";
import { fredokaHeadline, jakartaSans } from "@/app/fonts";
import { PortalMessageTeam } from "@/components/portal/PortalMessageTeam";
import {
  ELITE_TOOLKIT_CATEGORIES,
  type ToolkitCategoryId,
} from "@/lib/portal/toolkit";
import type { ToolkitDailyTip } from "@/lib/portal/toolkit-maintenance";

const ALL = "all" as const;
type FilterId = typeof ALL | ToolkitCategoryId;

export function PortalToolkitView({
  dateLabel,
  tip,
  displayName,
  email,
}: {
  dateLabel: string;
  tip: ToolkitDailyTip;
  displayName: string;
  email: string;
}) {
  const [filter, setFilter] = useState<FilterId>(ALL);

  const categories = useMemo(() => {
    if (filter === ALL) return ELITE_TOOLKIT_CATEGORIES;
    return ELITE_TOOLKIT_CATEGORIES.filter((c) => c.id === filter);
  }, [filter]);

  const tipCategory = ELITE_TOOLKIT_CATEGORIES.find((c) => c.id === tip.categoryId);
  const tipTool = tipCategory?.tools.find((t) => t.id === tip.toolId);

  return (
    <div className="space-y-8">
      <header>
        <div className="flex flex-wrap items-center gap-2">
          <p className={`text-[10px] font-black uppercase tracking-[0.2em] text-sky-600 ${jakartaSans.className}`}>
            Maintained daily
          </p>
          <span className="inline-flex items-center gap-1.5 rounded-xl bg-sky-50 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-sky-700">
            <CalendarDays className="h-3 w-3" aria-hidden />
            {dateLabel}
          </span>
        </div>
        <h1 className={`mt-2 text-3xl font-semibold tracking-[-0.03em] text-slate-900 sm:text-4xl ${fredokaHeadline.className}`}>
          AI Toolkit
        </h1>
        <p className={`mt-2 max-w-2xl text-sm font-medium leading-relaxed text-slate-600 sm:text-base ${jakartaSans.className}`}>
          How college students on StudentStack use AI for school. We review and refresh these workflows so monthly
          members always see current practice, not a static PDF.
        </p>
      </header>

      <section className="overflow-hidden rounded-[2rem] border-2 border-slate-800 bg-slate-900 px-6 py-7 text-white sm:px-8">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className={`text-[10px] font-black uppercase tracking-[0.2em] text-sky-200 ${jakartaSans.className}`}>
              Today from the team
            </p>
            <h2 className={`mt-2 text-2xl font-semibold tracking-[-0.02em] sm:text-3xl ${fredokaHeadline.className}`}>
              {tip.title}
            </h2>
          </div>
          <span className="rounded-2xl bg-white/10 px-3 py-2 text-[10px] font-black uppercase tracking-[0.12em]">
            Updated today
          </span>
        </div>
        <p className={`mt-3 max-w-3xl text-sm font-medium leading-relaxed text-slate-300 sm:text-[0.95rem] ${jakartaSans.className}`}>
          {tip.body}
        </p>
        {tipTool && tipCategory ? (
          <a
            href={`#${tip.categoryId}`}
            className={`mt-5 inline-flex items-center gap-2 text-sm font-bold text-sky-200 hover:text-white ${jakartaSans.className}`}
          >
            Jump to {tipTool.name}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </a>
        ) : null}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_minmax(17rem,20rem)] lg:items-start">
        <div>
          <div className="flex flex-wrap gap-2">
            <FilterChip active={filter === ALL} onClick={() => setFilter(ALL)} label="All" />
            {ELITE_TOOLKIT_CATEGORIES.map((c) => (
              <FilterChip
                key={c.id}
                active={filter === c.id}
                onClick={() => setFilter(c.id)}
                label={c.label}
              />
            ))}
          </div>

          <div className="mt-6 space-y-10">
            {categories.map((category) => (
              <section key={category.id} id={category.id} className="scroll-mt-28">
                <div className="flex flex-wrap items-end justify-between gap-2">
                  <div>
                    <h2 className={`text-2xl font-semibold tracking-[-0.02em] text-slate-900 ${fredokaHeadline.className}`}>
                      {category.label}
                    </h2>
                    <p className={`mt-1 text-sm font-medium text-slate-600 ${jakartaSans.className}`}>
                      {category.summary}
                    </p>
                  </div>
                  <p className={`text-[10px] font-black uppercase tracking-[0.14em] text-slate-400 ${jakartaSans.className}`}>
                    Team reviewed
                  </p>
                </div>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {category.tools.map((tool) => {
                    const featured = tool.id === tip.toolId;
                    return (
                      <li
                        key={tool.id}
                        className={`rounded-[1.5rem] border-2 bg-white p-5 transition hover:-translate-y-0.5 ${
                          featured
                            ? "border-sky-300 shadow-[0_12px_0_0_rgba(14,165,233,0.12)]"
                            : "border-slate-100 shadow-[0_8px_0_0_rgba(15,23,42,0.04)] hover:border-sky-200"
                        }`}
                      >
                        {featured ? (
                          <p className={`text-[10px] font-black uppercase tracking-[0.14em] text-sky-600 ${jakartaSans.className}`}>
                            Featured today
                          </p>
                        ) : (
                          <p className={`text-[10px] font-black uppercase tracking-[0.14em] text-sky-600 ${jakartaSans.className}`}>
                            {tool.product}
                          </p>
                        )}
                        <p className={`mt-1 text-lg font-semibold text-slate-900 ${fredokaHeadline.className}`}>
                          {tool.name}
                        </p>
                        {!featured ? null : (
                          <p className={`mt-1 text-[10px] font-black uppercase tracking-[0.14em] text-slate-400 ${jakartaSans.className}`}>
                            {tool.product}
                          </p>
                        )}
                        <p className={`mt-1.5 text-sm font-medium leading-relaxed text-slate-600 ${jakartaSans.className}`}>
                          {tool.blurb}
                        </p>
                        <p className={`mt-3 text-sm font-semibold leading-relaxed text-slate-800 ${jakartaSans.className}`}>
                          How we use it: {tool.howWeUse}
                        </p>
                        <p className="mt-3 text-[11px] font-black uppercase tracking-[0.14em] text-[#ff6a00]">
                          Best for · {tool.useCase}
                        </p>
                      </li>
                    );
                  })}
                </ul>
              </section>
            ))}
          </div>
        </div>

        <aside className="lg:sticky lg:top-6">
          <PortalMessageTeam defaultName={displayName} defaultEmail={email} compact />
        </aside>
      </section>
    </div>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-2xl px-3 py-2 text-[10px] font-black uppercase tracking-[0.12em] transition ${
        active
          ? "bg-slate-900 text-white"
          : "border border-slate-200 bg-white text-slate-600 hover:border-sky-200 hover:text-sky-700"
      }`}
    >
      {label}
    </button>
  );
}
