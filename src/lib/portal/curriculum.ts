/** Maps to StudentStack member pathways / certs. */
export type CurriculumTrack = "ss-ais" | "ss-acr" | "toolkit" | "foundations";

export type ExternalCurriculumCourse = {
  id: string;
  organization: string;
  title: string;
  summary: string;
  href: string;
  duration: string;
  format: string;
  credential: string | null;
  tracks: CurriculumTrack[];
  studentStackNote: string;
};

/**
 * Public, free courses from credible organizations.
 * StudentStack curates these into member pathways — we do not claim exclusive partnerships.
 */
export const EXTERNAL_CURRICULUM: ExternalCurriculumCourse[] = [
  {
    id: "ibm-iste-ai-foundations",
    organization: "IBM SkillsBuild + ISTE",
    title: "AI Foundations",
    summary:
      "High school introduction to AI concepts, applications, ethics, and a design challenge. Self-paced with a digital badge.",
    href: "https://skillsbuild.org/students/course-catalog/artificial-intelligence/ai-foundations-powered-by-iste-and-ibm",
    duration: "~15 hours",
    format: "Self-paced online",
    credential: "AI Foundations badge",
    tracks: ["ss-ais", "foundations"],
    studentStackNote:
      "We map this to SS-AIS Module 1–2: what schools allow, disclosure habits, and responsible use before touching generative tools.",
  },
  {
    id: "code-org-ai-foundations",
    organization: "Code.org",
    title: "AI Foundations (high school)",
    summary:
      "Free high school AI + CS curriculum covering literacy, data, ethics, and building with AI. Aligned to CSTA and TeachAI frameworks.",
    href: "https://code.org/en-US/curriculum/artificial-intelligence-foundations",
    duration: "Semester or unit-based",
    format: "Classroom or self-study units",
    credential: "Course completion (teacher-led)",
    tracks: ["foundations", "toolkit"],
    studentStackNote:
      "Strong companion to our AI Toolkit studying and writing workflows — use Code.org for structure, StudentStack for daily prompts.",
  },
  {
    id: "microsoft-genai-toolkit",
    organization: "Microsoft Education",
    title: "Generative AI classroom toolkit",
    summary:
      "Stories and exercises on responsible generative AI: fact-checking, privacy, bias, and wellbeing for ages 13–15.",
    href: "https://learn.microsoft.com/en-us/training/educator-center/instructor-materials/classroom-toolkit-unlock-generative-ai-safely-responsibly",
    duration: "~90 minutes",
    format: "Downloadable lesson toolkit",
    credential: null,
    tracks: ["ss-ais"],
    studentStackNote: "Pairs with SS-AIS integrity scenarios and our toolkit notetaking/writing guardrails.",
  },
  {
    id: "elements-of-ai",
    organization: "University of Helsinki + MinnaLearn",
    title: "Elements of AI",
    summary:
      "Free introduction to what AI is, what it can and cannot do, and how it affects society. No advanced math required.",
    href: "https://www.elementsofai.com/",
    duration: "~30 hours",
    format: "Self-paced online",
    credential: "Certificate of completion",
    tracks: ["foundations", "ss-acr"],
    studentStackNote:
      "Foundation literacy before SS-ACR research-log and application narrative modules — good for 10th–11th graders starting out.",
  },
  {
    id: "google-ai-essentials",
    organization: "Google (Grow with Google)",
    title: "Google AI Essentials",
    summary:
      "Intro to generative AI, productivity use cases, and responsible AI with hands-on prompting. Certificate available via Grow with Google / Coursera.",
    href: "https://grow.google/ai-essentials/",
    duration: "Under 5 hours",
    format: "Self-paced online",
    credential: "Google certificate (see site for access options)",
    tracks: ["toolkit", "foundations"],
    studentStackNote:
      "Use alongside our Organization and Planning toolkit categories. Check Grow with Google for current access and pricing in your region.",
  },
  {
    id: "common-sense-ai-lessons",
    organization: "Common Sense Education",
    title: "AI literacy lessons (grades 6–12)",
    summary:
      "Grab-and-go lessons on AI basics, ethics, media literacy, and classroom-safe use from a trusted K–12 nonprofit.",
    href: "https://www.commonsense.org/education/articles/6-12-educator-resources-for-teaching-about-ai",
    duration: "Unit-based",
    format: "Lesson plans + student activities",
    credential: null,
    tracks: ["ss-ais", "foundations"],
    studentStackNote: "Quick ethics and policy conversations before SS-AIS capstone — especially for families new to AI.",
  },
];

export type CurriculumModule = {
  track: CurriculumTrack;
  label: string;
  summary: string;
  studentStackHref: string;
  externalCourseIds: string[];
};

/** How StudentStack stitches public courses into member pathways. */
export const CURRICULUM_MODULES: CurriculumModule[] = [
  {
    track: "foundations",
    label: "AI foundations",
    summary: "Start here if AI is new. Public courses for literacy before advanced school workflows.",
    studentStackHref: "/portal/toolkit",
    externalCourseIds: ["elements-of-ai", "google-ai-essentials", "code-org-ai-foundations"],
  },
  {
    track: "ss-ais",
    label: "SS-AIS · Safety & integrity",
    summary: "Organization-issued credential path plus IBM, Microsoft, and Common Sense public resources.",
    studentStackHref: "/portal/certifications#ai-safety-integrity",
    externalCourseIds: ["ibm-iste-ai-foundations", "microsoft-genai-toolkit", "common-sense-ai-lessons"],
  },
  {
    track: "ss-acr",
    label: "SS-ACR · College readiness",
    summary: "Research logs, activity storytelling, and application process documentation.",
    studentStackHref: "/portal/certifications#ai-college-readiness",
    externalCourseIds: ["elements-of-ai", "ibm-iste-ai-foundations"],
  },
  {
    track: "toolkit",
    label: "Daily school workflows",
    summary: "Member toolkit maintained by our college team, reinforced by Code.org and Google Essentials.",
    studentStackHref: "/portal/toolkit",
    externalCourseIds: ["google-ai-essentials", "code-org-ai-foundations"],
  },
];

export function getExternalCourse(id: string) {
  return EXTERNAL_CURRICULUM.find((c) => c.id === id);
}

export function coursesForTrack(track: CurriculumTrack) {
  const mod = CURRICULUM_MODULES.find((m) => m.track === track);
  if (!mod) return [];
  return mod.externalCourseIds
    .map((id) => getExternalCourse(id))
    .filter((c): c is ExternalCurriculumCourse => Boolean(c));
}
