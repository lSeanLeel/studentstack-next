/** Member pathways — structured progress parents and students can point to. */
export type PathwayStep = {
  id: string;
  label: string;
  detail: string;
  done?: boolean;
};

export type MemberPathway = {
  id: string;
  title: string;
  subtitle: string;
  partnerLabel: string;
  partnerDetail: string;
  accent: "sky" | "emerald" | "amber" | "violet";
  href: string;
  steps: PathwayStep[];
  progress: number;
};

export const MEMBER_PATHWAYS: MemberPathway[] = [
  {
    id: "ss-ais",
    title: "AI Safety & Academic Integrity",
    subtitle: "Organization-issued credential (SS-AIS)",
    partnerLabel: "StudentStack credential",
    partnerDetail:
      "Issued by our student organization. Attach to Common App activities and counselor notes as proof of responsible AI use.",
    accent: "sky",
    href: "/portal/certifications#ai-safety-integrity",
    progress: 0,
    steps: [
      { id: "ais-1", label: "School policy map", detail: "What your school actually allows" },
      { id: "ais-2", label: "Disclosure habits", detail: "Reusable lines for drafts and labs" },
      { id: "ais-3", label: "Integrity capstone", detail: "Scenario exam + SS-AIS badge" },
    ],
  },
  {
    id: "ss-acr",
    title: "AI for College Readiness",
    subtitle: "Organization-issued credential (SS-ACR)",
    partnerLabel: "StudentStack credential",
    partnerDetail:
      "Shows admissions a disciplined workflow for research, planning, and application writing without outsourcing voice.",
    accent: "amber",
    href: "/portal/certifications#ai-college-readiness",
    progress: 0,
    steps: [
      { id: "acr-1", label: "Research log", detail: "Authorship trail for projects" },
      { id: "acr-2", label: "Activity storytelling", detail: "Stronger blurbs in your voice" },
      { id: "acr-3", label: "Readiness portfolio", detail: "Shareable SS-ACR badge" },
    ],
  },
  {
    id: "toolkit-mastery",
    title: "AI Toolkit fluency",
    subtitle: "Daily workflows for school",
    partnerLabel: "Maintained by our college team",
    partnerDetail:
      "Not a static PDF. We refresh prompts and workflows every week so members stay current with how students actually use AI.",
    accent: "emerald",
    href: "/portal/toolkit",
    progress: 35,
    steps: [
      { id: "tk-1", label: "Organization + planning", detail: "Syllabus to weekly blocks", done: true },
      { id: "tk-2", label: "Studying + writing", detail: "Practice and outline habits" },
      { id: "tk-3", label: "Research integrity", detail: "Source scout and claim checks" },
    ],
  },
];

export type CredibilityPartner = {
  id: string;
  name: string;
  role: string;
  detail: string;
};

/** Parent-facing credibility stack — honest framing, no fake logos. */
export const CREDIBILITY_STACK: CredibilityPartner[] = [
  {
    id: "org-certs",
    name: "Organization-issued credentials",
    role: "SS-AIS · SS-ACR",
    detail: "Digital badges students attach to applications and counselor packets.",
  },
  {
    id: "campus-team",
    name: "College student operators",
    role: "UCLA · Princeton · Columbia · Berkeley · Stanford",
    detail: "Portal maintained by students still inside the classrooms that matter.",
  },
  {
    id: "daily-toolkit",
    name: "Daily toolkit updates",
    role: "Member-only",
    detail: "Workflows reviewed weekly so AI advice stays current, not last year's playbook.",
  },
];
