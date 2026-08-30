/** How students actually use membership — honest, repeatable. */
export type HowItWorksStep = {
  id: string;
  title: string;
  detail: string;
};

export const HOW_MEMBERSHIP_WORKS: HowItWorksStep[] = [
  {
    id: "need",
    title: "Start with what’s due",
    detail: "Essay, exam, new syllabus, research paper — pick a scenario or open the toolkit category that fits.",
  },
  {
    id: "toolkit",
    title: "Run a workflow",
    detail: "Copy a prompt, follow the steps, do the work yourself. The toolkit is self-paced — no lecture to sit through.",
  },
  {
    id: "team",
    title: "Message us when stuck",
    detail: "College students on our team answer questions about your school, a workflow, or a guide checklist.",
  },
];

export type StartHereScenario = {
  id: string;
  label: string;
  detail: string;
  href: string;
  accent: "sky" | "emerald" | "amber" | "violet";
};

export const START_HERE_SCENARIOS: StartHereScenario[] = [
  {
    id: "essay",
    label: "Essay or paper due",
    detail: "Outline first, draft yourself, clarity pass last.",
    href: "/portal/toolkit#writing",
    accent: "amber",
  },
  {
    id: "semester",
    label: "New semester",
    detail: "Syllabus → assignment list → weekly plan.",
    href: "/portal/toolkit#organization",
    accent: "sky",
  },
  {
    id: "exam",
    label: "Exam coming up",
    detail: "Practice questions from your notes only.",
    href: "/portal/toolkit#studying",
    accent: "emerald",
  },
  {
    id: "research",
    label: "Research project",
    detail: "Find sources, log claims, check before submit.",
    href: "/portal/toolkit#research",
    accent: "violet",
  },
  {
    id: "integrity",
    label: "Not sure what AI is allowed",
    detail: "Integrity guide checklist — start here.",
    href: "/portal/guides#integrity-at-school",
    accent: "sky",
  },
  {
    id: "summer",
    label: "Summer / opportunities",
    detail: "Deadlines and costs upfront.",
    href: "/portal/resources",
    accent: "emerald",
  },
];

export type MembershipInclude = {
  id: string;
  title: string;
  detail: string;
  href: string;
  optional?: boolean;
};

/** Parent-safe summary of portal value — no video course implied. */
export const MEMBERSHIP_INCLUDES: MembershipInclude[] = [
  {
    id: "toolkit",
    title: "AI Toolkit",
    detail: "Weekly workflows and copy-paste prompts for real school tasks — organization through research.",
    href: "/portal/toolkit",
  },
  {
    id: "team",
    title: "College team inbox",
    detail: "Message students at UCLA, Princeton, Columbia, and peers who maintain the portal.",
    href: "/portal/message",
  },
  {
    id: "resources",
    title: "Resources & vault",
    detail: "Summer programs, competitions, and deadlines with links and costs — member shortlists.",
    href: "/portal/resources",
  },
  {
    id: "guides",
    title: "Self-paced guides",
    detail: "Optional checklists for integrity and college-bound work. Not video courses — work through at your speed.",
    href: "/portal/guides",
    optional: true,
  },
];

/** Short lines for landing / parent preview. */
export const PARENT_PORTAL_SUMMARY = {
  headline: "A student portal, not a course catalog",
  subhead:
    "Members get a living AI toolkit, a direct line to our college team, and optional self-paced guides. No promised video library — we ship workflows you use the week you need them.",
  pillars: [
    {
      title: "AI Toolkit",
      detail: "Step-by-step workflows updated by college students.",
    },
    {
      title: "Ask the team",
      detail: "Real replies from students still in school — not chatbot tips.",
    },
    {
      title: "Resources",
      detail: "Opportunities and deadlines with facts upfront.",
    },
    {
      title: "Guides (optional)",
      detail: "Checklists for integrity and applications — earn an org badge if you finish.",
    },
  ],
};
