export type QuestKind = "ai-literacy" | "high-school";

export type PortalQuest = {
  id: string;
  title: string;
  blurb: string;
  kind: QuestKind;
  xp: number;
  href: string;
  done?: boolean;
};

export type PortalTrack = {
  id: string;
  label: string;
  summary: string;
  kind: QuestKind;
  completed: number;
  total: number;
  href: string;
  accent: string;
};

/** Tasteful progress framing for the member portal (demo baseline). */
export const PORTAL_PROGRESS = {
  level: 3,
  title: "AI for School",
  xp: 240,
  xpToNext: 400,
  streakDays: 4,
};

export const TODAY_QUESTS: PortalQuest[] = [
  {
    id: "q-prompt-tutor",
    title: "Prompt like a tutor, not a cheat code",
    blurb: "Practice one AI-for-school habit: ask for questions you can answer, not answers you paste.",
    kind: "ai-literacy",
    xp: 40,
    href: "/portal/toolkit",
  },
  {
    id: "q-week-plan",
    title: "Build this week's study stack",
    blurb: "Use the toolkit to turn your syllabus into a realistic plan you still own.",
    kind: "ai-literacy",
    xp: 35,
    href: "/portal/toolkit#planning",
  },
  {
    id: "q-summer-scan",
    title: "Scan one summer program fit",
    blurb: "High school advice from students ahead of you: pick one vault listing and write why it fits you.",
    kind: "high-school",
    xp: 30,
    href: "/portal/vault",
  },
];

export const PATH_TRACKS: PortalTrack[] = [
  {
    id: "ai-literacy",
    label: "AI Literacy Path",
    summary: "How we use AI for school without outsourcing your thinking.",
    kind: "ai-literacy",
    completed: 4,
    total: 8,
    href: "/portal/toolkit",
    accent: "sky",
  },
  {
    id: "hs-playbook",
    label: "High School Playbook",
    summary: "Advice and resources for classes, summers, and the path ahead.",
    kind: "high-school",
    completed: 2,
    total: 6,
    href: "/portal/resources",
    accent: "emerald",
  },
  {
    id: "certs",
    label: "AI Certifications",
    summary: "Organization-issued modules you can attach to applications.",
    kind: "ai-literacy",
    completed: 0,
    total: 2,
    href: "/portal/certifications",
    accent: "amber",
  },
];
