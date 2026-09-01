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
    detail: "Weekly workflows across partner tools — notetaking, study, and planning built for real school nights.",
    accent: "sky",
  },
  {
    id: "team",
    title: "Ask the team",
    detail: "Policy questions, tool picks, and judgment calls — answered by students still in class.",
    accent: "emerald",
  },
  {
    id: "resources",
    title: "Resources",
    detail: "Opportunities, deadlines, and school context — facts first.",
    accent: "violet",
  },
  {
    id: "guides",
    title: "Guides & coursework",
    detail: "Self-paced checklists plus partner AI literacy courses woven into the program.",
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
  sky: "border-l-[5px] border-l-sky-400 bg-gradient-to-br from-sky-50/90 via-white to-white ring-1 ring-sky-100/60 shadow-[0_1px_2px_rgba(14,165,233,0.05),0_8px_24px_rgba(14,165,233,0.06)]",
  emerald:
    "border-l-[5px] border-l-emerald-400 bg-gradient-to-br from-emerald-50/90 via-white to-white ring-1 ring-emerald-100/60 shadow-[0_1px_2px_rgba(16,185,129,0.05),0_8px_24px_rgba(16,185,129,0.06)]",
  amber:
    "border-l-[5px] border-l-amber-400 bg-gradient-to-br from-amber-50/90 via-white to-white ring-1 ring-amber-100/60 shadow-[0_1px_2px_rgba(245,158,11,0.05),0_8px_24px_rgba(245,158,11,0.06)]",
  violet:
    "border-l-[5px] border-l-violet-400 bg-gradient-to-br from-violet-50/90 via-white to-white ring-1 ring-violet-100/60 shadow-[0_1px_2px_rgba(139,92,246,0.05),0_8px_24px_rgba(139,92,246,0.06)]",
};

const pillarCardHover: Record<PortalPillar["accent"], string> = {
  sky: "hover:border-l-sky-500 hover:from-sky-50 hover:ring-sky-300/70 hover:shadow-[0_4px_6px_rgba(14,165,233,0.08),0_16px_40px_rgba(14,165,233,0.14)]",
  emerald:
    "hover:border-l-emerald-500 hover:from-emerald-50 hover:ring-emerald-300/70 hover:shadow-[0_4px_6px_rgba(16,185,129,0.08),0_16px_40px_rgba(16,185,129,0.14)]",
  amber:
    "hover:border-l-amber-500 hover:from-amber-50 hover:ring-amber-300/70 hover:shadow-[0_4px_6px_rgba(245,158,11,0.08),0_16px_40px_rgba(245,158,11,0.14)]",
  violet:
    "hover:border-l-violet-500 hover:from-violet-50 hover:ring-violet-300/70 hover:shadow-[0_4px_6px_rgba(139,92,246,0.08),0_16px_40px_rgba(139,92,246,0.14)]",
};

const pillarTitle: Record<PortalPillar["accent"], string> = {
  sky: "text-sky-800",
  emerald: "text-emerald-800",
  amber: "text-amber-900",
  violet: "text-violet-800",
};

export function pillarCardClasses(accent: PortalPillar["accent"]) {
  return `${pillarCard[accent]} ${pillarCardHover[accent]}`;
}

export function pillarTitleClasses(accent: PortalPillar["accent"]) {
  return pillarTitle[accent];
}
