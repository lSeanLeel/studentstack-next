"use client";

import React, { useMemo, useState } from "react";
import { ArrowRight, CalendarDays, Check, ChevronDown, Copy } from "lucide-react";
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
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = useMemo(() => {
    if (filter === ALL) return ELITE_TOOLKIT_CATEGORIES;
    return ELITE_TOOLKIT_CATEGORIES.filter((c) => c.id === filter);
  }, [filter]);

  const tipCategory = ELITE_TOOLKIT_CATEGORIES.find((c) => c.id === tip.categoryId);
  const tipTool = tipCategory?.tools.find((t) => t.id === tip.toolId);

  async function copyPrompt(toolId: string, text: string) {
    await navigator.clipboard.writeText(text);
    setCopiedId(toolId);
    window.setTimeout(() => setCopiedId(null), 2000);
  }

  return (
    <div className="space-y-8">
      <header>
        <div className="flex flex-wrap items-center gap-2">
          <PortalEyebrow>Updated weekly</PortalEyebrow>
          <PortalBadge accent="sky">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-3 w-3" aria-hidden />
              {dateLabel}
            </span>
          </PortalBadge>
        </div>
        <PortalPageTitle className="mt-2">AI Toolkit</PortalPageTitle>
        <PortalLead>
          Step-by-step workflows and copy-paste prompts we actually use in college. Not generic tips — real sequences
          you can run today.
        </PortalLead>
      </header>

      <PortalPanel className="!py-5 sm:!px-6">
        <PortalEyebrow>Today&apos;s pick</PortalEyebrow>
        <h2 className={`mt-1 text-xl font-semibold tracking-[-0.02em] sm:text-2xl ${fredokaHeadline.className}`}>
          {tip.title}
        </h2>
        <p className={`mt-2 max-w-3xl text-sm font-medium leading-relaxed text-slate-600 ${jakartaSans.className}`}>
          {tip.body}
        </p>
        {tipTool && tipCategory ? (
          <a
            href={`#${tip.categoryId}`}
            className={`mt-3 inline-flex items-center gap-2 text-sm font-bold text-sky-700 hover:text-sky-900 ${jakartaSans.className}`}
          >
            Jump to {tipTool.name}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </a>
        ) : null}
      </PortalPanel>

      <section className="grid gap-6 lg:grid-cols-[1fr_minmax(18rem,22rem)] lg:items-start">
        <div>
          <label className={`block text-[10px] font-black uppercase tracking-[0.14em] text-slate-500 ${jakartaSans.className}`}>
            Filter by category
          </label>
          <div className="relative mt-2 max-w-xs">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as FilterId)}
              className={`w-full appearance-none rounded-2xl border-2 border-slate-200 bg-white py-2.5 pl-4 pr-10 text-sm font-bold text-slate-800 shadow-[0_4px_0_0_rgba(15,23,42,0.05)] focus:border-sky-300 focus:outline-none ${jakartaSans.className}`}
            >
              <option value={ALL}>All categories</option>
              {ELITE_TOOLKIT_CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
            <ChevronDown
              className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              aria-hidden
            />
          </div>

          <div className="mt-6 space-y-10">
            {categories.map((category) => (
              <section key={category.id} id={category.id} className="scroll-mt-32">
                <h2 className={`text-2xl font-semibold tracking-[-0.02em] text-slate-900 ${fredokaHeadline.className}`}>
                  {category.label}
                </h2>
                <p className={`mt-1 text-sm font-medium text-slate-600 ${jakartaSans.className}`}>{category.summary}</p>
                <ul className="mt-4 space-y-4">
                  {category.tools.map((tool) => {
                    const featured = tool.id === tip.toolId;
                    return (
                      <li
                        key={tool.id}
                        className={`rounded-[1.5rem] border-2 bg-white p-5 ${
                          featured
                            ? "border-sky-300 shadow-[0_10px_0_0_rgba(14,165,233,0.1)]"
                            : "border-slate-200 shadow-[0_8px_0_0_rgba(15,23,42,0.04)]"
                        }`}
                      >
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <div>
                            <p
                              className={`text-[10px] font-black uppercase tracking-[0.14em] ${featured ? "text-sky-600" : "text-slate-400"} ${jakartaSans.className}`}
                            >
                              {featured ? "Featured today" : tool.product}
                            </p>
                            <p className={`mt-1 text-lg font-semibold text-slate-900 ${fredokaHeadline.className}`}>
                              {tool.name}
                            </p>
                          </div>
                          <p className="text-[11px] font-black uppercase tracking-[0.12em] text-[#ff6a00]">
                            {tool.useCase}
                          </p>
                        </div>
                        <p className={`mt-2 text-sm font-medium leading-relaxed text-slate-600 ${jakartaSans.className}`}>
                          {tool.blurb}
                        </p>

                        <div className="mt-4">
                          <p className={`text-[10px] font-black uppercase tracking-[0.12em] text-slate-500 ${jakartaSans.className}`}>
                            How we use it
                          </p>
                          <p className={`mt-1 text-sm font-semibold leading-relaxed text-slate-800 ${jakartaSans.className}`}>
                            {tool.howWeUse}
                          </p>
                        </div>

                        <div className="mt-4">
                          <p className={`text-[10px] font-black uppercase tracking-[0.12em] text-slate-500 ${jakartaSans.className}`}>
                            Step-by-step
                          </p>
                          <ol className={`mt-2 space-y-2 ${jakartaSans.className}`}>
                            {tool.workflow.map((step, i) => (
                              <li key={i} className="flex gap-2 text-sm font-medium text-slate-700">
                                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sky-100 text-[10px] font-black text-sky-700">
                                  {i + 1}
                                </span>
                                {step}
                              </li>
                            ))}
                          </ol>
                        </div>

                        {tool.prompts.length > 0 ? (
                          <div className="mt-4 space-y-2">
                            <p className={`text-[10px] font-black uppercase tracking-[0.12em] text-slate-500 ${jakartaSans.className}`}>
                              Copy-paste prompts
                            </p>
                            {tool.prompts.map((prompt) => {
                              const copyKey = `${tool.id}-${prompt.label}`;
                              return (
                                <div key={copyKey} className="rounded-2xl bg-slate-50 p-3">
                                  <div className="flex items-start justify-between gap-2">
                                    <p className={`text-xs font-bold text-slate-700 ${jakartaSans.className}`}>
                                      {prompt.label}
                                    </p>
                                    <button
                                      type="button"
                                      onClick={() => copyPrompt(copyKey, prompt.text)}
                                      className={`inline-flex shrink-0 items-center gap-1 rounded-lg bg-white px-2 py-1 text-[10px] font-black uppercase tracking-[0.08em] text-slate-600 ring-1 ring-slate-200 hover:text-sky-700 ${jakartaSans.className}`}
                                    >
                                      {copiedId === copyKey ? (
                                        <>
                                          <Check className="h-3 w-3" aria-hidden />
                                          Copied
                                        </>
                                      ) : (
                                        <>
                                          <Copy className="h-3 w-3" aria-hidden />
                                          Copy
                                        </>
                                      )}
                                    </button>
                                  </div>
                                  <p className={`mt-2 whitespace-pre-wrap text-xs font-medium leading-relaxed text-slate-600 ${jakartaSans.className}`}>
                                    {prompt.text}
                                  </p>
                                </div>
                              );
                            })}
                          </div>
                        ) : null}
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
