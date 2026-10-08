/**
 * Parent-facing landing copy and origin story.
 * Milestone metrics below are storytelling placeholders until ops replaces them with verified numbers.
 */

export const AI_FOR_SCHOOL_CLARITY = {
  eyebrow: "For parents",
  headlineLead: "Learn how students are using AI to",
  headlineEmphasis: "streamline school",
  subhead:
    "We teach step-by-step workflows for the use cases high schoolers actually face: planning, studying, writing, and research. Practical systems, not one-off prompts.",
  fomoLine: "Most families are still guessing. Members get the playbook.",
  useCases: [
    "Weekly planning from a real syllabus",
    "Studying without restarting notes every night",
    "Outlining essays within the rules",
    "Research with sources worth citing",
  ],
  teachLine: "Inside the portal: weekly toolkit, guides, and our college team when they get stuck.",
  cta: {
    primary: "Learn the AI Advantage",
  },
} as const;

export type OriginMilestone = {
  id: string;
  date: string;
  dateTime: string;
  phase: string;
  title: string;
  detail: string;
  credential: string;
  icon: "notes" | "masterminds" | "briefings" | "reach" | "membership" | "ongoing";
};

export const PARENT_ORIGIN_TIMELINE: OriginMilestone[] = [
  {
    id: "notes",
    date: "Mar 12, 2025",
    dateTime: "2025-03-12",
    phase: "Open notes",
    title: "Free AI literacy notes for parents",
    detail:
      "We started by publishing plain-language guides on how high schoolers can use AI for planning, studying, and writing without breaking school rules.",
    credential: "2,400+ parent readers in the first release cycle",
    icon: "notes",
  },
  {
    id: "masterminds",
    date: "Apr 19, 2025",
    dateTime: "2025-04-19",
    phase: "Live rooms",
    title: "College admissions masterminds",
    detail:
      "Parents joined live sessions with college students to ask what actually changes in class once AI is part of everyday schoolwork.",
    credential: "Sessions hosted with mentors from UCLA, Princeton, Columbia, Berkeley, and Stanford",
    icon: "masterminds",
  },
  {
    id: "briefings",
    date: "May 28, 2025",
    dateTime: "2025-05-28",
    phase: "Cadence",
    title: "Weekly parent briefings",
    detail:
      "A standing briefing rhythm so families could keep up as tools and school policies shifted week to week.",
    credential: "12 consecutive weeks of parent briefings before membership launched",
    icon: "briefings",
  },
  {
    id: "instagram",
    date: "Oct 7, 2025",
    dateTime: "2025-10-07",
    phase: "Reach",
    title: "20K families and students on Instagram",
    detail:
      "The public channel became a discovery layer: short explainers parents could forward, and a signal that demand was bigger than free notes alone.",
    credential: "20,000 followers across parent and high-school audiences",
    icon: "reach",
  },
  {
    id: "network",
    date: "Jan 14, 2026",
    dateTime: "2026-01-14",
    phase: "Membership",
    title: "Private membership opens",
    detail:
      "Families who wanted more than public posts got gated portal access: toolkit, school workflows, and direct questions to the college team.",
    credential: "Invite-only membership for high school families",
    icon: "membership",
  },
  {
    id: "community",
    date: "Sep 2026",
    dateTime: "2026-09-01",
    phase: "Now",
    title: "Still updating every week",
    detail:
      "The portal stays current because AI and school policy do not sit still. The same college team refreshes the toolkit and answers as the year moves.",
    credential: "Weekly toolkit updates maintained by the student-led team",
    icon: "ongoing",
  },
];
