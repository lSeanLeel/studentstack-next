export type PortalPillar = {
  id: string;
  title: string;
  detail: string;
  accent: "sky" | "emerald" | "amber" | "violet";
};

/** Landing #member-portal — four blocks, no long subhead. */
export const PORTAL_PREVIEW_PILLARS: PortalPillar[] = [
  {
    id: "toolkit",
    title: "AI Toolkit",
    detail: "The AI tools and systems we actually use to organize, plan, and study more efficiently.",
    accent: "sky",
  },
  {
    id: "team",
    title: "Ask the team",
    detail: "The questions you can't ask AI — answered by students still in school.",
    accent: "emerald",
  },
  {
    id: "resources",
    title: "Resources",
    detail: "Opportunities and deadlines with facts upfront.",
    accent: "violet",
  },
  {
    id: "guides",
    title: "Guides (optional)",
    detail: "Self-paced checklists for integrity and applications.",
    accent: "amber",
  },
];

/** Abstract landing mock content — not tied to demo login. */
export const PORTAL_PREVIEW_SNAPSHOT = {
  tipTitle: "Syllabus pass before you trust the calendar",
  tipBody: "Upload the real PDF, ask AI only for deadline extraction, then verify every date yourself.",
  dateLabel: "This week",
};

const pillarCard: Record<PortalPillar["accent"], string> = {
  sky: "border-l-[5px] border-l-sky-400 bg-gradient-to-br from-sky-50 via-white to-white ring-1 ring-sky-100/70 shadow-[0_1px_2px_rgba(14,165,233,0.06),0_10px_28px_rgba(14,165,233,0.08)] hover:ring-sky-200/80",
  emerald:
    "border-l-[5px] border-l-emerald-400 bg-gradient-to-br from-emerald-50 via-white to-white ring-1 ring-emerald-100/70 shadow-[0_1px_2px_rgba(16,185,129,0.06),0_10px_28px_rgba(16,185,129,0.08)] hover:ring-emerald-200/80",
  amber:
    "border-l-[5px] border-l-amber-400 bg-gradient-to-br from-amber-50 via-white to-white ring-1 ring-amber-100/70 shadow-[0_1px_2px_rgba(245,158,11,0.06),0_10px_28px_rgba(245,158,11,0.08)] hover:ring-amber-200/80",
  violet:
    "border-l-[5px] border-l-violet-400 bg-gradient-to-br from-violet-50 via-white to-white ring-1 ring-violet-100/70 shadow-[0_1px_2px_rgba(139,92,246,0.06),0_10px_28px_rgba(139,92,246,0.08)] hover:ring-violet-200/80",
};

const pillarTitle: Record<PortalPillar["accent"], string> = {
  sky: "text-sky-800",
  emerald: "text-emerald-800",
  amber: "text-amber-900",
  violet: "text-violet-800",
};

export function pillarCardClasses(accent: PortalPillar["accent"]) {
  return pillarCard[accent];
}

export function pillarTitleClasses(accent: PortalPillar["accent"]) {
  return pillarTitle[accent];
}
