export type IntendedMajor =
  | "Undecided"
  | "Computer Science"
  | "Engineering"
  | "Biology / Pre-Med"
  | "Business / Economics"
  | "Humanities"
  | "Arts / Design"
  | "Social Sciences"
  | "Other STEM"
  | "Other";

export const INTENDED_MAJORS: IntendedMajor[] = [
  "Undecided",
  "Computer Science",
  "Engineering",
  "Biology / Pre-Med",
  "Business / Economics",
  "Humanities",
  "Arts / Design",
  "Social Sciences",
  "Other STEM",
  "Other",
];

export const STUDENT_GRADES = ["9th", "10th", "11th", "12th"] as const;
export type StudentGrade = (typeof STUDENT_GRADES)[number];

/** Two flagship StudentStack-issued AI certification modules. */
export type CertModule = {
  id: string;
  code: string;
  title: string;
  tagline: string;
  collegeHook: string;
  overview: string;
  modules: { title: string; minutes: number; outcome: string }[];
  badgeUse: string[];
  priceLabel: string;
};

export const MEMBER_CERT_MODULES: CertModule[] = [
  {
    id: "ai-safety-integrity",
    code: "SS-AIS",
    title: "AI Safety & Academic Integrity",
    tagline: "Classroom-safe AI for high schoolers who want to show judgment, not shortcuts.",
    collegeHook:
      "Students already attach this badge to Common App activities and counselor notes as proof they know how to use AI without crossing integrity lines.",
    overview:
      "A StudentStack-issued digital credential covering disclosure habits, detector literacy, citation norms, and school-safe workflows. Built so admissions readers see responsibility, not risk.",
    modules: [
      {
        title: "What schools actually allow",
        minutes: 25,
        outcome: "A one-page policy map you can show a teacher or counselor.",
      },
      {
        title: "Disclosure & citation habits",
        minutes: 30,
        outcome: "Reusable disclosure lines for drafts, labs, and take-homes.",
      },
      {
        title: "Detector literacy without panic",
        minutes: 25,
        outcome: "How to talk about AI tools calmly when asked.",
      },
      {
        title: "Capstone integrity scenario",
        minutes: 40,
        outcome: "Scenario exam + shareable badge (SS-AIS).",
      },
    ],
    badgeUse: [
      "Common App Activities description",
      "Counselor / teacher recommendation talking point",
      "Portfolio or LinkedIn student profile",
    ],
    priceLabel: "Included with membership",
  },
  {
    id: "ai-college-readiness",
    code: "SS-ACR",
    title: "AI for College Readiness",
    tagline: "Organizing, research, and application workflows that stay student-owned.",
    collegeHook:
      "Members use this module to show colleges a disciplined AI workflow for research, planning, and application writing, without outsourcing their voice.",
    overview:
      "A proficiency badge for students who use AI to stay organized for college-bound work: research logs, activity storytelling, and essay process documentation that proves authorship.",
    modules: [
      {
        title: "Research log that proves your path",
        minutes: 30,
        outcome: "An authorship trail for papers and passion projects.",
      },
      {
        title: "Activity storytelling with AI as editor",
        minutes: 25,
        outcome: "Stronger activity blurbs still in your voice.",
      },
      {
        title: "Essay process documentation",
        minutes: 35,
        outcome: "Outline → draft → revise trail counselors understand.",
      },
      {
        title: "Capstone readiness portfolio",
        minutes: 45,
        outcome: "Shareable badge (SS-ACR) + portfolio packet.",
      },
    ],
    badgeUse: [
      "Supplemental materials / portfolio links",
      "Interview talking points",
      "Demonstration of mature AI use for college work",
    ],
    priceLabel: "Included with membership",
  },
];
