/**
 * Single source of truth for the program's public-facing facts and copy.
 * Edit values here; every landing section and the /apply page read from this file.
 */

export const COHORT = {
  name: "November cohort",
  /** Used in the admissions box and headings. */
  monthLabel: "November 2026",
  /** Families admitted per monthly cohort. Change to your real cap. */
  seats: 30,
  grades: "Grades 9–12",
  format: "Monthly, online",
  reviewNote: "Applications are reviewed as they arrive until the cohort is full.",
};

export const NEWSLETTER = {
  readerCountLabel: "2,000",
  /** Optional: public beehiiv subscribe page. Leave empty to use the built-in form. */
  beehiivUrl: process.env.NEXT_PUBLIC_BEEHIIV_URL ?? "",
};

export const CONTACT_EMAIL = "advising@studentstack.info";

/** Schools the team attends. Logos live in /public/colleges. */
/** `wordmark: true` means the logo already spells the name, so the text label is hidden. */
export const TEAM_SCHOOLS: { name: string; logo: string; color: string; wordmark?: boolean }[] = [
  { name: "UCLA", logo: "/colleges/ucla.png", color: "#2774AE", wordmark: true },
  { name: "UC Berkeley", logo: "/colleges/berkeley.png", color: "#003262" },
  { name: "Stanford", logo: "/colleges/stanford.png", color: "#8C1515" },
  { name: "Princeton", logo: "/colleges/princeton.png", color: "#E77500" },
  { name: "Columbia", logo: "/colleges/columbia.png", color: "#003DA5" },
];

export const HERO = {
  /** Headline reads: `${before} **${emphasis}** ${after} ${USE_CASES[i].phrase}` */
  before: "Learn from top students",
  emphasis: "maximizing AI",
  after: "to stay ahead in school and",
  lede: "Our team of undergraduates at UCLA, Berkeley, Stanford, Princeton and Columbia rewrites the lessons every month, so your student learns the methods that work now, within the rules schools set.",
};

/** Rotating headline phrases. `example` shows under the headline for the current phrase. */
export const USE_CASES = [
  { id: "organize", phrase: "stay better organized", example: "Turn five syllabi, a practice schedule and every deadline into one weekly plan." },
  { id: "study", phrase: "build better study habits", example: "Make practice tests and flashcards from their own class notes before an exam." },
  { id: "research", phrase: "do better research", example: "Find credible sources, check whether they hold up, and keep citations in order." },
  { id: "write", phrase: "improve their writing", example: "Get detailed comments on a draft they wrote, without AI writing any of it." },
  { id: "build", phrase: "start stronger projects", example: "Plan and launch independent work that belongs on a college application." },
] as const;

export const THESIS = {
  heading: "Why this program exists",
  /** Written in the founder's voice and signed with FOUNDER below. */
  paragraphs: [
    "I'm Sean Lee, a computer science and statistics student at UCLA. Over the past two years, I've watched the strongest students around me use AI to plan their weeks, research faster and study from their own notes, while the thinking and the writing stay their own.",
    "Most high school students haven't been shown how to do this. Some avoid AI entirely. Others use it in ways that break school rules and teach them very little. The gap between those students grows every semester.",
    "College students are well placed to close it. We learned these habits recently, under the same pressure your student is under now, and we still use them every week. We remember what high school coursework asks for, and we know which shortcuts backfire.",
    "StudentStack is how our team passes that on, one month at a time.",
  ],
};

export const DISTINCTIVES = [
  {
    title: "Written by current students",
    body: "Every lesson comes from an undergraduate who uses the method in their own classes this term.",
  },
  {
    title: "Revised every month",
    body: "AI tools and school policies change quickly. We rewrite lessons monthly so nothing is out of date.",
  },
  {
    title: "Within school rules",
    body: "Each lesson explains what teachers typically allow and where the limits are.",
  },
  {
    title: "Limited enrollment",
    body: "We admit a set number of families each month and read every application ourselves.",
  },
] as const;

export const CURRICULUM = [
  { topic: "Planning", detail: "Turning syllabi, deadlines and activities into a weekly plan a student can keep." },
  { topic: "Research", detail: "Finding sources, checking whether they hold up, and keeping track of citations." },
  { topic: "Studying", detail: "Building practice questions and flashcards from the student's own class notes." },
  { topic: "Writing feedback", detail: "Getting comments on a draft without having AI write any of it." },
  { topic: "Projects", detail: "Starting and managing independent work that can go on a college application." },
  { topic: "Academic integrity", detail: "Reading a school's AI policy and knowing how to stay within it." },
] as const;

export const MONTHLY_CYCLE = [
  { week: "Week 1", title: "Review", body: "We test new AI tools and read through updated school AI policies." },
  { week: "Week 2", title: "Write", body: "We write the month's lessons around common high school assignments." },
  { week: "Week 3", title: "Release", body: "Lessons go out to enrolled students, organized by grade and subject." },
  { week: "Week 4", title: "Revise", body: "We collect feedback from families and remove anything that no longer applies." },
] as const;

/**
 * Educational partners, described by what they add for students.
 * Set `name` (and optionally `logo` under /public) when a partnership is confirmed.
 */
export type Partner = { role: string; benefit: string; name?: string; logo?: string };

export const PARTNERS: Partner[] = [
  { role: "AI tool providers", benefit: "Student access to the tools we teach, so families don't need to buy several subscriptions." },
  { role: "Academic programs", benefit: "Summer programs, research opportunities and competitions we recommend when a student is ready." },
  { role: "Certification bodies", benefit: "AI-skills credentials students can earn during the program and list on applications." },
  { role: "Educators", benefit: "Teachers and counselors who read our lessons and tell us where schools draw the line." },
];

export const FOUNDER = {
  name: "Sean Lee",
  title: "Founder, UCLA ’28, Computer Science and Statistics",
  quote:
    "I started StudentStack after seeing how far apart students who use AI well and students who don't were getting. We use these tools in our own classes every week. This program is how we pass that on.",
};

export const APPLY_STEPS = [
  { title: "Submit an application", body: "Tell us about your student's grade, goals and current use of AI. It takes about five minutes." },
  { title: "Application review", body: "Our team reads each application to confirm the program is a good fit." },
  { title: "A conversation with our team", body: "We email you from our StudentStack address to set up a short call and answer questions." },
  { title: "Enrollment", body: "Admitted families enroll for the month. Students receive access before the cohort begins." },
] as const;

export const STUDENT_GRADES = ["9th grade", "10th grade", "11th grade", "12th grade"] as const;

export const AI_USE_LEVELS = [
  "Not at all yet",
  "A little, on their own",
  "Regularly, without guidance",
  "Heavily, and I'd like it guided",
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
    a: "A monthly program that teaches high school students to use AI for their schoolwork. It is run by undergraduates at UCLA, Berkeley, Stanford, Princeton and Columbia, and the lessons are rewritten every month.",
  },
  {
    q: "Will this teach my student to cheat?",
    a: "No. Students learn to use AI for planning, research, studying and feedback, while the work they turn in stays their own. Every lesson covers what schools allow.",
  },
  {
    q: "Why are college students teaching this?",
    a: "They learned these methods recently, under the same pressure your student faces, and they still use them every week. That keeps the material practical and current.",
  },
  {
    q: "Why is there an application?",
    a: "Each monthly cohort is limited. The application tells us about your student so we can confirm the program is a good fit before you commit.",
  },
  {
    q: "What happens after I apply?",
    a: "We review your application, then email you from our StudentStack address to set up a short call. If it's a fit, you enroll for that month's cohort.",
  },
  {
    q: "How much does it cost?",
    a: "We share tuition and what the month includes during our call with your family.",
  },
  {
    q: "Which grades is it for?",
    a: "Grades 9 through 12. Lessons are organized by grade, so a freshman and a senior work on different material.",
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
      `Thank you for applying to the StudentStack ${a.cohort} for ${a.studentName}. I've read your application and would like to hear more about what ${a.studentName} is working on this year.`,
      "",
      "Do you have 15 minutes for a call this week? I can also walk you through how the month works and what tuition includes.",
      "",
      "Best,",
      "The StudentStack team",
    ].join("\n"),
  };
}
