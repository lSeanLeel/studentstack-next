/** Self-paced member guides — checklists + toolkit links, not video courses. */
export type PlaybookChecklistItem = {
  id: string;
  label: string;
  detail: string;
};

export type MemberPlaybook = {
  id: string;
  title: string;
  summary: string;
  whenToUse: string;
  /** Honest delivery format — no implied video library. */
  format: string;
  /** What the org badge means, without overclaiming admissions impact. */
  badgeNote: string;
  checklist: PlaybookChecklistItem[];
  toolkitAnchors: { label: string; href: string }[];
  /** Guides roll out as checklists; badge requires finishing + team sign-off. */
  availability: "available" | "rolling-out";
};

export const MEMBER_PLAYBOOKS: MemberPlaybook[] = [
  {
    id: "integrity-at-school",
    title: "Using AI without cheating",
    summary:
      "A checklist for disclosure, school rules, and habits that keep you out of integrity trouble — before you lean on ChatGPT for the next assignment.",
    whenToUse: "Start of the year, after a teacher mentions AI, or any time you're unsure what's allowed.",
    format: "Self-paced checklist · worksheets in the toolkit · ask the team if your school is weird",
    badgeNote:
      "Finish the checklist and message the team for review. We can issue an SS-AIS org badge you may list on activities — optional, not required for membership.",
    availability: "available",
    checklist: [
      {
        id: "i1",
        label: "Map what each class allows",
        detail: "Pull syllabus language into one page. If it's silent, note that — don't guess.",
      },
      {
        id: "i2",
        label: "Write your disclosure lines",
        detail: "Two sentences you reuse for labs, essays, and brainstorm-only use.",
      },
      {
        id: "i3",
        label: "Run the pre-submit checklist",
        detail: "Before every turn-in: sources yours? draft yours? AI role disclosed?",
      },
      {
        id: "i4",
        label: "Message the team (optional)",
        detail: "Send your policy map or a tricky scenario — college students reply, not a bot.",
      },
    ],
    toolkitAnchors: [
      { label: "Organization · Syllabus Gem", href: "/portal/toolkit#organization" },
      { label: "Writing · Outline only", href: "/portal/toolkit#writing" },
    ],
  },
  {
    id: "research-and-applications",
    title: "AI for research & applications",
    summary:
      "For juniors and seniors: research logs, activity blurbs, and essay structure — with AI as an editor, not a ghostwriter.",
    whenToUse: "Research papers, summer program apps, or when you're drafting activities and essays.",
    format: "Self-paced checklist · pairs with toolkit research + writing workflows",
    badgeNote:
      "Complete the checklist over a few weeks. SS-ACR org badge is optional after team review — useful for some students, not a membership requirement.",
    availability: "available",
    checklist: [
      {
        id: "r1",
        label: "Set up a research log",
        detail: "One doc: claim · source · your note · open question. One row per source.",
      },
      {
        id: "r2",
        label: "Source scout, then open every link",
        detail: "Use Perplexity or similar for angles — you verify each URL yourself.",
      },
      {
        id: "r3",
        label: "Outline before you draft",
        detail: "Thesis + paragraph jobs only. You write every sentence.",
      },
      {
        id: "r4",
        label: "Claim check before submit",
        detail: "Tag each claim: supported, opinion, or needs citation.",
      },
    ],
    toolkitAnchors: [
      { label: "Research · Source scout", href: "/portal/toolkit#research" },
      { label: "Writing · Outline under pressure", href: "/portal/toolkit#writing" },
    ],
  },
];

/** Legacy export — guides page still anchors by id. */
export const PLAYBOOK_BY_LEGACY_CERT_ID: Record<string, string> = {
  "ai-safety-integrity": "integrity-at-school",
  "ai-college-readiness": "research-and-applications",
};

export function getPlaybook(id: string) {
  return MEMBER_PLAYBOOKS.find((p) => p.id === id);
}
