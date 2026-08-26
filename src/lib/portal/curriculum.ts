/** Maps to StudentStack member pathways / certs. */
export type CurriculumTrack = "ss-ais" | "ss-acr" | "toolkit" | "foundations";

export type StudentStackLesson = {
  id: string;
  title: string;
  duration: string;
  summary: string;
};

export type StudentStackWorksheet = {
  id: string;
  title: string;
  description: string;
};

export type StudentStackModule = {
  id: string;
  slug: string;
  track: CurriculumTrack;
  label: string;
  summary: string;
  estimatedHours: number;
  lessons: StudentStackLesson[];
  worksheets: StudentStackWorksheet[];
  teamPrompts: string[];
  /** External course ids — optional reading, not the product. */
  optionalSupplementIds: string[];
  href: string;
  certHref?: string;
};

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
};

/**
 * Optional public supplements — referenced at the end of pathways, never sold as the membership.
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
  },
  {
    id: "code-org-ai-foundations",
    organization: "Code.org",
    title: "AI Foundations (high school)",
    summary:
      "Free high school AI + CS curriculum covering literacy, data, ethics, and building with AI.",
    href: "https://code.org/en-US/curriculum/artificial-intelligence-foundations",
    duration: "Semester or unit-based",
    format: "Classroom or self-study units",
    credential: "Course completion (teacher-led)",
    tracks: ["foundations", "toolkit"],
  },
  {
    id: "microsoft-genai-toolkit",
    organization: "Microsoft Education",
    title: "Generative AI classroom toolkit",
    summary:
      "Stories and exercises on responsible generative AI: fact-checking, privacy, bias, and wellbeing.",
    href: "https://learn.microsoft.com/en-us/training/educator-center/instructor-materials/classroom-toolkit-unlock-generative-ai-safely-responsibly",
    duration: "~90 minutes",
    format: "Downloadable lesson toolkit",
    credential: null,
    tracks: ["ss-ais"],
  },
  {
    id: "elements-of-ai",
    organization: "University of Helsinki + MinnaLearn",
    title: "Elements of AI",
    summary:
      "Free introduction to what AI is, what it can and cannot do, and how it affects society.",
    href: "https://www.elementsofai.com/",
    duration: "~30 hours",
    format: "Self-paced online",
    credential: "Certificate of completion",
    tracks: ["foundations", "ss-acr"],
  },
  {
    id: "google-ai-essentials",
    organization: "Google (Grow with Google)",
    title: "Google AI Essentials",
    summary:
      "Intro to generative AI, productivity use cases, and responsible AI with hands-on prompting.",
    href: "https://grow.google/ai-essentials/",
    duration: "Under 5 hours",
    format: "Self-paced online",
    credential: "Google certificate (see site for access options)",
    tracks: ["toolkit", "foundations"],
  },
  {
    id: "common-sense-ai-lessons",
    organization: "Common Sense Education",
    title: "AI literacy lessons (grades 6–12)",
    summary:
      "Grab-and-go lessons on AI basics, ethics, media literacy, and classroom-safe use.",
    href: "https://www.commonsense.org/education/articles/6-12-educator-resources-for-teaching-about-ai",
    duration: "Unit-based",
    format: "Lesson plans + student activities",
    credential: null,
    tracks: ["ss-ais", "foundations"],
  },
];

/** Member-only StudentStack curriculum — lessons, worksheets, and prompts we maintain. */
export const STUDENTSTACK_MODULES: StudentStackModule[] = [
  {
    id: "mod-ai-foundations",
    slug: "ai-foundations",
    track: "foundations",
    label: "AI Foundations for School",
    summary:
      "Start here. We walk you through what your school actually allows, how to disclose AI use, and the habits that keep you out of trouble.",
    estimatedHours: 4,
    href: "/portal/courses/ai-foundations",
    lessons: [
      {
        id: "l1",
        title: "Map your school's AI rules",
        duration: "25 min",
        summary: "Pull syllabus language, handbook clauses, and teacher expectations into one page you can reference.",
      },
      {
        id: "l2",
        title: "Disclosure lines that work",
        duration: "20 min",
        summary: "Copy-paste disclosure templates for labs, essays, and group projects — then customize in your voice.",
      },
      {
        id: "l3",
        title: "When AI helps vs. when it hurts",
        duration: "30 min",
        summary: "Scenario walkthroughs: brainstorming OK, drafting not OK, fact-checking always required.",
      },
      {
        id: "l4",
        title: "Build your integrity checklist",
        duration: "20 min",
        summary: "A one-page pre-submit checklist you reuse every assignment.",
      },
    ],
    worksheets: [
      {
        id: "w1",
        title: "School policy scavenger hunt",
        description: "Worksheet to fill in what each teacher allows, with example syllabus quotes.",
      },
      {
        id: "w2",
        title: "Disclosure template bank",
        description: "Five starter lines for different assignment types — edit before you paste.",
      },
    ],
    teamPrompts: [
      "List every place my school handbook mentions AI, plagiarism, or academic integrity. Quote the exact language and page number.",
      "Draft a 2-sentence AI disclosure for a history essay where I used AI only for outline brainstorming.",
    ],
    optionalSupplementIds: ["elements-of-ai", "code-org-ai-foundations"],
  },
  {
    id: "mod-ss-ais",
    slug: "ai-safety-integrity",
    track: "ss-ais",
    label: "SS-AIS · Safety & Integrity",
    summary:
      "Earn our organization-issued credential. Capstone scenarios, integrity habits, and a badge you can attach to applications.",
    estimatedHours: 6,
    href: "/portal/courses/ai-safety-integrity",
    certHref: "/portal/certifications#ai-safety-integrity",
    lessons: [
      {
        id: "ais-l1",
        title: "Integrity scenarios (real cases)",
        duration: "35 min",
        summary: "Walk through 6 situations pulled from actual high school incidents — what would you do?",
      },
      {
        id: "ais-l2",
        title: "Lab & STEM disclosure",
        duration: "25 min",
        summary: "How to document AI use in science labs, coding assignments, and data analysis.",
      },
      {
        id: "ais-l3",
        title: "Capstone exam prep",
        duration: "40 min",
        summary: "Practice the SS-AIS scenario exam with rubric and self-grade sheet.",
      },
    ],
    worksheets: [
      {
        id: "ais-w1",
        title: "Scenario response log",
        description: "Structured template for documenting your reasoning on each integrity scenario.",
      },
      {
        id: "ais-w2",
        title: "SS-AIS capstone rubric",
        description: "Self-assessment rubric matching what we grade for the credential.",
      },
    ],
    teamPrompts: [
      "I'm stuck on scenario 4 in the SS-AIS capstone. Here's my answer — does it meet the rubric for 'disclosure' and 'original work'?",
    ],
    optionalSupplementIds: ["ibm-iste-ai-foundations", "microsoft-genai-toolkit", "common-sense-ai-lessons"],
  },
  {
    id: "mod-research",
    slug: "research-workflows",
    track: "ss-acr",
    label: "Research Workflows",
    summary:
      "Source-finding, note systems, and citation-safe drafting. Build a research log admissions can actually read.",
    estimatedHours: 5,
    href: "/portal/courses/research-workflows",
    certHref: "/portal/certifications#ai-college-readiness",
    lessons: [
      {
        id: "res-l1",
        title: "Research log setup",
        duration: "30 min",
        summary: "One doc template: claim, source, your note, open question. Reuse for every paper.",
      },
      {
        id: "res-l2",
        title: "Source scout without hallucinations",
        duration: "25 min",
        summary: "Use Perplexity or similar to find angles — then open every source yourself.",
      },
      {
        id: "res-l3",
        title: "Claim check before submit",
        duration: "20 min",
        summary: "Paste your draft claims; verify each against your source list.",
      },
    ],
    worksheets: [
      {
        id: "res-w1",
        title: "Research log template",
        description: "Copy-ready Notion/Google Doc structure with example rows filled in.",
      },
      {
        id: "res-w2",
        title: "Source verification checklist",
        description: "Step-by-step before you cite anything.",
      },
    ],
    teamPrompts: [
      "Here are 4 sources I found for my APUSH paper. Help me rank them by reliability and note what each one actually proves.",
      "Review my research log — flag any claims that don't have a matching source row.",
    ],
    optionalSupplementIds: ["elements-of-ai"],
  },
  {
    id: "mod-toolkit-daily",
    slug: "toolkit-workflows",
    track: "toolkit",
    label: "Daily School Workflows",
    summary:
      "The workflows behind our AI Toolkit — syllabus to calendar, lecture notes to flashcards, outline before draft.",
    estimatedHours: 3,
    href: "/portal/toolkit",
    lessons: [
      {
        id: "tk-l1",
        title: "Syllabus → assignment database",
        duration: "20 min",
        summary: "Turn a PDF syllabus into a reviewable assignment list — you verify every date.",
      },
      {
        id: "tk-l2",
        title: "Lecture notes → study cards",
        duration: "25 min",
        summary: "Compress messy notes, then generate Q&A only from what you wrote.",
      },
      {
        id: "tk-l3",
        title: "Outline-only writing pass",
        duration: "30 min",
        summary: "Thesis, evidence map, paragraph jobs — you draft every sentence.",
      },
    ],
    worksheets: [
      {
        id: "tk-w1",
        title: "Weekly planning block template",
        description: "Sunday planning sheet with buffer time built in.",
      },
    ],
    teamPrompts: [
      "Here's my syllabus PDF. Extract assignments and due dates into a table. Flag anything you're unsure about.",
    ],
    optionalSupplementIds: ["google-ai-essentials", "code-org-ai-foundations"],
  },
];

export function getExternalCourse(id: string) {
  return EXTERNAL_CURRICULUM.find((c) => c.id === id);
}

export function getStudentStackModule(slug: string) {
  return STUDENTSTACK_MODULES.find((m) => m.slug === slug);
}

export function modulesForTrack(track: CurriculumTrack) {
  return STUDENTSTACK_MODULES.filter((m) => m.track === track);
}
