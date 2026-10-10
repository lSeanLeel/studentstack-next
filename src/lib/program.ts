/**
 * Single source of truth for the program's public-facing facts.
 * Edit values here; every landing section and the /apply page read from this file.
 */

export const COHORT = {
  /** Shown in the hero chip, apply page and CTAs. */
  name: "November cohort",
  startLabel: "Starts November 2026",
  /** Families admitted per monthly cohort. Change to your real cap. */
  seats: 30,
  /** Shown on the cohort section. */
  reviewNote: "Applications are reviewed on a rolling basis until seats fill.",
};

export const NEWSLETTER = {
  readerCountLabel: "2,000+",
  /** Optional: public beehiiv subscribe page. Leave empty to use the built-in form (API route). */
  beehiivUrl: process.env.NEXT_PUBLIC_BEEHIIV_URL ?? "",
};

export const CONTACT_EMAIL = "advising@studentstack.info";

/** The thesis, in three beats. */
export const THESIS = {
  claim: "The students pulling ahead aren't working longer. They're working with AI.",
  support:
    "Top students use AI to stay organized, research faster, study smarter and write with more clarity, all without handing over the thinking. Most high schoolers either don't use it or use it in ways that get them in trouble.",
  who: "The people who know how this is done best are college students at the schools your student is aiming for. They figured it out in the last two years, under the same pressure, and they are still doing it every week.",
};

export const SKILLS = [
  {
    id: "organize",
    title: "Organize",
    line: "Turn a syllabus, a sports schedule and five deadlines into one plan that actually holds.",
  },
  {
    id: "research",
    title: "Research",
    line: "Find real sources fast, check them, and build an argument instead of copying one.",
  },
  {
    id: "study",
    title: "Study",
    line: "Make practice tests, flashcards and explanations from their own class notes.",
  },
  {
    id: "write",
    title: "Write",
    line: "Get feedback on drafts the way a strong editor would, while every word stays theirs.",
  },
  {
    id: "build",
    title: "Build",
    line: "Use AI to start projects and portfolios that show up in college applications.",
  },
  {
    id: "integrity",
    title: "Stay in bounds",
    line: "Know what their teachers and schools allow, and why the line matters.",
  },
] as const;

/** How the team runs each month. */
export const MONTHLY_CYCLE = [
  {
    week: "Week 1",
    title: "Scan",
    body: "Our team tracks every major AI release and school-policy change, then tests what matters on our own coursework.",
  },
  {
    week: "Week 2",
    title: "Build",
    body: "We turn what works into that month's playbook: step-by-step use cases tied to real high school assignments.",
  },
  {
    week: "Week 3",
    title: "Teach",
    body: "The cohort gets the new playbook, organized by grade and subject, ready to use on that week's assignments.",
  },
  {
    week: "Week 4",
    title: "Refine",
    body: "Parents and students tell us what landed. Outdated tools and tips are retired before the next month starts.",
  },
] as const;

/**
 * Educational partners, described by what they bring to a student's month.
 * Set `name` (and optionally `logo` under /public) when a partnership is confirmed;
 * until then the card shows the role without a name.
 */
export type Partner = {
  role: string;
  benefit: string;
  name?: string;
  logo?: string;
};

export const PARTNERS: Partner[] = [
  {
    role: "AI tool partners",
    benefit:
      "Student-appropriate access to the tools we teach, so families aren't paying for five subscriptions to try them.",
  },
  {
    role: "Academic programs",
    benefit:
      "Summer programs, research opportunities and competitions we point students toward when their work is ready.",
  },
  {
    role: "Certification partners",
    benefit:
      "Recognized AI-skills credentials students can earn during the program and list on applications.",
  },
  {
    role: "Educator advisors",
    benefit:
      "Teachers and counselors who review our playbooks so what we teach matches what schools allow.",
  },
];

/** Why us: the defensible parts, written for parents. */
export const ADVANTAGES = [
  {
    title: "Taught by students still in the room",
    body: "Our team is enrolled at the schools families aim for. We use these tools on real coursework every week, so what we teach is current, not secondhand.",
  },
  {
    title: "Rebuilt every month",
    body: "AI changes monthly, so the program does too. Nothing your student learns is a year-old course recording.",
  },
  {
    title: "Integrity first",
    body: "Every use case is checked against what teachers allow. The goal is a student who thinks better, not one who gets flagged.",
  },
  {
    title: "Small on purpose",
    body: "We cap each cohort so our team can personally review every family and shape each month around the students actually in it.",
  },
] as const;

/** The parent journey, from first click to enrollment. */
export const APPLY_STEPS = [
  {
    title: "Apply",
    body: "A two-minute application about your student: grade, goals and how they use AI today.",
  },
  {
    title: "We review",
    body: "Our team reads every application to make sure the program is the right fit for your student.",
  },
  {
    title: "A personal reply",
    body: "A member of our team emails you directly from StudentStack to talk through your student and answer questions.",
  },
  {
    title: "Enroll for the month",
    body: "Accepted families reserve a seat in that month's cohort. Your student starts with the next playbook.",
  },
] as const;

export const STUDENT_GRADES = ["9th grade", "10th grade", "11th grade", "12th grade"] as const;

export const AI_USE_LEVELS = [
  "Not at all yet",
  "A little, mostly on their own",
  "Regularly, but I'm not sure how",
  "Heavily, and I'd like it to be guided",
] as const;

export const HEARD_FROM = [
  "Instagram",
  "Facebook parent group",
  "Our newsletter",
  "Another parent",
  "Their school",
  "Other",
] as const;

export const FAQ = [
  {
    q: "What is StudentStack?",
    a: "A monthly program for high schoolers, run by college students at top universities. Each month, students learn the newest, most useful ways to use AI for school, with an emphasis on doing it the right way.",
  },
  {
    q: "Is this just teaching kids to cheat with AI?",
    a: "No, and it's the reason we exist. Students already have these tools. We teach them to use AI to organize, research, study and get feedback, while their work and their thinking stay their own. Every playbook is checked against what schools allow.",
  },
  {
    q: "Why college students instead of teachers or tutors?",
    a: "Because they are the ones doing it. Our team learned these workflows in the last two years at competitive schools and uses them every week. The playbooks come from people still in the classroom.",
  },
  {
    q: "Why is there an application?",
    a: "We keep each monthly cohort small so our team can actually know every student. The application helps us understand your student and make sure we can help before you commit.",
  },
  {
    q: "What happens after I apply?",
    a: "We review every application, then a member of our team emails you personally to talk through your student. If it's a fit, you enroll for that month's cohort.",
  },
  {
    q: "What does it cost?",
    a: "Tuition is shared with accepted families during our personal follow-up, along with exactly what that month includes.",
  },
  {
    q: "What grades is this for?",
    a: "High schoolers in 9th through 12th grade. Playbooks are adjusted to where each student is, from building good habits early to managing senior year.",
  },
] as const;

/** Review pipeline in /operator/applications. */
export const APPLICATION_STATUSES = ["new", "contacted", "accepted", "enrolled", "waitlisted", "declined"] as const;
export type ApplicationStatus = (typeof APPLICATION_STATUSES)[number];

/** Prefilled first email when the team reaches out to an applicant. Edit freely. */
export function outreachEmail(a: { parentName: string; studentName: string; cohort: string }) {
  const first = a.parentName.split(" ")[0] || "there";
  return {
    subject: `Your StudentStack application for ${a.studentName}`,
    body: [
      `Hi ${first},`,
      "",
      `Thank you for applying to the StudentStack ${a.cohort} for ${a.studentName}. I read through your application and would love to learn a bit more about what ${a.studentName} is working on this year.`,
      "",
      "Do you have 15 minutes this week for a quick call? I can also answer any questions about how the month works and what tuition includes.",
      "",
      "Best,",
      "The StudentStack team",
    ].join("\n"),
  };
}
