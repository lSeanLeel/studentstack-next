import { ELITE_TOOLKIT_CATEGORIES, type ToolkitCategoryId } from "@/lib/portal/toolkit";

export type ToolkitDailyTip = {
  id: string;
  title: string;
  body: string;
  categoryId: ToolkitCategoryId;
  toolId: string;
};

export type ToolkitChangeNote = {
  id: string;
  dateKey: string;
  title: string;
  detail: string;
};

/** Rotating daily tips so the toolkit feels team-maintained for monthly members. */
export const TOOLKIT_DAILY_TIPS: ToolkitDailyTip[] = [
  {
    id: "tip-syllabus",
    title: "Syllabus pass before you trust the calendar",
    body: "Upload the real PDF, ask AI only for deadline extraction, then verify every date yourself. Today we refreshed the Organization workflows for mid-semester schedule changes.",
    categoryId: "organization",
    toolId: "org-notion-ai",
  },
  {
    id: "tip-notes",
    title: "Compress notes, keep your voice",
    body: "Paste your own lecture notes only. Ask for claims vs examples vs open questions, then rewrite the summary before you study. Updated Notetaking guidance this week.",
    categoryId: "notetaking",
    toolId: "notes-claude",
  },
  {
    id: "tip-week",
    title: "Sunday plan that survives Monday",
    body: "Draft a week with buffers, then cut anything unrealistic. Planning tools were reviewed against how college students actually load homework nights.",
    categoryId: "planning",
    toolId: "plan-claude-projects",
  },
  {
    id: "tip-quiz",
    title: "Practice sets from your materials",
    body: "Build quiz questions from your unit notes, answer without looking, then ask for feedback on reasoning. Studying section updated for unit-exam week.",
    categoryId: "studying",
    toolId: "study-chatgpt",
  },
  {
    id: "tip-outline",
    title: "Structure first, draft yourself",
    body: "Use AI for thesis and paragraph jobs only. You write every sentence. Writing workflows tightened so critique stays on clarity, not ghostwriting.",
    categoryId: "writing",
    toolId: "write-claude",
  },
  {
    id: "tip-sources",
    title: "Scout sources, open them yourself",
    body: "Collect three to five cited sources, open each link, then build your claim map. Research tools reviewed for citation honesty.",
    categoryId: "research",
    toolId: "research-perplexity",
  },
  {
    id: "tip-activities",
    title: "Tighten activity blurbs without inventing facts",
    body: "Paste your draft Common App lines, ask for compression feedback, rewrite yourself. Applications section maintained for current admissions cycles.",
    categoryId: "applications",
    toolId: "apps-claude",
  },
];

export const TOOLKIT_CHANGELOG: ToolkitChangeNote[] = [
  {
    id: "ch-1",
    dateKey: "2026-08-24",
    title: "Organization workflows refreshed",
    detail: "Syllabus Gem and Class OS notes updated for late-summer schedule swaps and new-semester setup.",
  },
  {
    id: "ch-2",
    dateKey: "2026-08-23",
    title: "Writing integrity pass",
    detail: "Outline and voice guidance rewritten so AI stays a critic, not a ghostwriter.",
  },
  {
    id: "ch-3",
    dateKey: "2026-08-22",
    title: "Studying for unit exams",
    detail: "Practice-set and explain-it-back workflows aligned to how we prep for midterms.",
  },
  {
    id: "ch-4",
    dateKey: "2026-08-21",
    title: "Research citation checks",
    detail: "Source scout and claim-check steps clarified for paper season.",
  },
  {
    id: "ch-5",
    dateKey: "2026-08-20",
    title: "Applications activity blurbs",
    detail: "Common App activity compression tips updated for current reader expectations.",
  },
];

export function formatToolkitDateLabel(date = new Date()) {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
}

export function formatPortalDateKey(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

export function getToolkitDailyTip(date = new Date()) {
  const start = new Date(date.getFullYear(), 0, 0);
  const day = Math.floor((date.getTime() - start.getTime()) / 86_400_000);
  return TOOLKIT_DAILY_TIPS[day % TOOLKIT_DAILY_TIPS.length];
}

export function getToolkitMaintenanceMeta(date = new Date()) {
  const tip = getToolkitDailyTip(date);
  const category = ELITE_TOOLKIT_CATEGORIES.find((c) => c.id === tip.categoryId);
  const tool = category?.tools.find((t) => t.id === tip.toolId);
  const latest = TOOLKIT_CHANGELOG[0];
  return {
    tip,
    category,
    tool,
    latest,
    dateLabel: formatToolkitDateLabel(date),
    dateKey: formatPortalDateKey(date),
    maintainedBy: "StudentStack college team",
  };
}
