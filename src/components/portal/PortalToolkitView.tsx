"use client";

import React, { useMemo, useState } from "react";
import { ArrowRight, CalendarDays } from "lucide-react";
import { fredokaHeadline, jakartaSans } from "@/app/fonts";
import { PortalMessageTeam } from "@/components/portal/PortalMessageTeam";
import { PortalBadge, PortalEyebrow, PortalLead, PortalPageTitle, PortalPanel } from "@/components/portal/portal-ui";
import { ELITE_TOOLKIT_CATEGORIES, type ToolkitCategoryId } from "@/lib/portal/toolkit";
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
          <PortalEyebrow>Maintained daily</PortalEyebrow>
          <PortalBadge accent="sky">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-3 w-3" aria-hidden />
              {dateLabel}
            </span>
          </PortalBadge>
        </div>
        <PortalPageTitle className="mt-2">AI Toolkit</PortalPageTitle>
        <PortalLead>
          How we use AI for school, refreshed by the college team every week. Membership keeps this current, not a PDF
          from last semester.
        </PortalLead>
      </header>

      <PortalPanel dark>
        <PortalEyebrow className="!text-sky-200">Today from the team</PortalEyebrow>
        <h2 className={`mt-2 text-2xl font-semibold tracking-[-0.02em] sm:text-3xl ${fredokaHeadline.className}`}>
          {tip.title}
        </h2>
        <p className={`mt-3 max-w-3xl text-sm font-medium leading-relaxed text-slate-300 ${jakartaSans.className}`}>
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
      </PortalPanel>

      <section className="grid gap-6 lg:grid-cols-[1fr_minmax(18rem,22rem)] lg:items-start">
        <div>
          <div className="flex flex-wrap gap-2">
            <FilterChip active={filter === ALL} onClick={() => setFilter(ALL)} label="All" />
            {ELITE_TOOLKIT_CATEGORIES.map((c) => (
              <FilterChip key={c.id} active={filter === c.id} onClick={() => setFilter(c.id)} label={c.label} />
            ))}
          </div>

          <div className="mt-6 space-y-10">
            {categories.map((category) => (
              <section key={category.id} id={category.id} className="scroll-mt-32">
                <h2 className={`text-2xl font-semibold tracking-[-0.02em] text-slate-900 ${fredokaHeadline.className}`}>
                  {category.label}
                </h2>
                <p className={`mt-1 text-sm font-medium text-slate-600 ${jakartaSans.className}`}>{category.summary}</p>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {category.tools.map((tool) => {
                    const featured = tool.id === tip.toolId;
                    return (
                      <li
                        key={tool.id}
                        className={`rounded-[1.5rem] border-2 bg-white p-5 transition hover:-translate-y-0.5 ${
                          featured
                            ? "border-sky-300 shadow-[0_14px_0_0_rgba(14,165,233,0.12)]"
                            : "border-slate-200 shadow-[0_10px_0_0_rgba(15,23,42,0.05)] hover:border-sky-200"
                        }`}
                      >
                        <p
                          className={`text-[10px] font-black uppercase tracking-[0.14em] ${featured ? "text-sky-600" : "text-slate-400"} ${jakartaSans.className}`}
                        >
                          {featured ? "Featured today" : tool.product}
                        </p>
                        <p className={`mt-1 text-lg font-semibold text-slate-900 ${fredokaHeadline.className}`}>
                          {tool.name}
                        </p>
                        <p className={`mt-1.5 text-sm font-medium leading-relaxed text-slate-600 ${jakartaSans.className}`}>
                          {tool.blurb}
                        </p>
                        <p className={`mt-3 rounded-2xl bg-slate-50 px-3 py-2.5 text-sm font-semibold leading-relaxed text-slate-800 ${jakartaSans.className}`}>
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

        <aside className="lg:sticky lg:top-24">
          <PortalMessageTeam defaultName={displayName} defaultEmail={email} compact />
        </aside>
      </section>
    </div>
  );
}

function FilterChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-2xl px-3.5 py-2 text-[10px] font-black uppercase tracking-[0.12em] transition shadow-[0_4px_0_0_rgba(15,23,42,0.06)] ${
        active
          ? "bg-slate-900 text-white shadow-[0_6px_0_0_rgba(15,23,42,0.2)]"
          : "border-2 border-slate-200 bg-white text-slate-600 hover:border-sky-200"
      } ${jakartaSans.className}`}
    >
      {label}
    </button>
  );
}
