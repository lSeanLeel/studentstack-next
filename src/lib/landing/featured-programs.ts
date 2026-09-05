/**
 * Featured programs shared with the parent community.
 * Independent offerings we surface for families — not StudentStack curriculum.
 * Keep claims accurate: do not imply institutional affiliation beyond what each program states.
 */

export type FeaturedDeadline = {
  label: string;
  date: string;
  dateTime: string;
  status: "upcoming" | "closed" | "rolling";
};

export type FeaturedProgram = {
  id: string;
  org: string;
  title: string;
  blurb: string;
  hostNote: string;
  imageSrc: string;
  imageAlt: string;
  logoSrc?: string;
  href: string;
  programDates: string;
  deadlines: FeaturedDeadline[];
  tags: string[];
};

export const FEATURED_PROGRAMS_INTRO = {
  eyebrow: "Parent network",
  headline: "Programs we share with families",
  subhead:
    "Parents in our community keep asking what else is worth a look beyond AI for school. When a program is credible and time-sensitive, we feature it here.",
  partnershipCta:
    "Run a student program and want to reach our parent network? Write us about a partnership feature.",
} as const;

export const FEATURED_PROGRAMS: FeaturedProgram[] = [
  {
    id: "iyrc-medicine-summer-2026",
    org: "The IYRC",
    title: "Medicine and Research Summer Program",
    blurb:
      "A virtual 10-week summer program where high schoolers learn medicine and research basics from physicians, researchers, and medical students at Columbia University VP&S and UCLA.",
    hostNote:
      "Directed with faculty and fellows tied to Columbia University Vagelos College of Physicians and Surgeons (VP&S). Independent IYRC program; not a Columbia University admissions offering.",
    imageSrc: "/partners/iyrc/summer-2026.png",
    imageAlt: "IYRC Medicine and Research Summer Program 2026 promotional graphic",
    logoSrc: "/partners/iyrc/logo.png",
    href: "https://www.the-iyrc.org/summerprogram.html",
    programDates: "June 20 – August 29, 2026 · Saturdays · Virtual",
    deadlines: [
      {
        label: "Final application deadline",
        date: "May 20, 2026",
        dateTime: "2026-05-20",
        status: "closed",
      },
      {
        label: "Earlier rolling deadlines",
        date: "Nov 1 – Apr 15 (closed)",
        dateTime: "2026-04-15",
        status: "closed",
      },
    ],
    tags: ["Medicine", "Research", "High school"],
  },
  {
    id: "iyrc-stem-winter-2026",
    org: "The IYRC",
    title: "STEM Winter Program",
    blurb:
      "Virtual winter programming in environmental science, physics, biology, technology, and epidemiology, ending with a research proposal.",
    hostNote: "Led by advanced faculty, students, and researchers through The IYRC.",
    imageSrc: "/partners/iyrc/stem-winter.png",
    imageAlt: "IYRC STEM Winter Program 2026 update graphic",
    logoSrc: "/partners/iyrc/logo.png",
    href: "https://www.the-iyrc.org/",
    programDates: "November 21, 2026 – January 16, 2027",
    deadlines: [
      {
        label: "Early application deadline",
        date: "August 31, 2026",
        dateTime: "2026-08-31",
        status: "upcoming",
      },
    ],
    tags: ["STEM", "Research", "Winter"],
  },
  {
    id: "iyrc-medical-humanities-2026",
    org: "The IYRC",
    title: "Medical Humanities: Narrative Medicine & Public Health",
    blurb:
      "A four-week virtual program on the humanistic side of medicine: narrative medicine, public health, and patient-centered care.",
    hostNote: "Student-run programming hosted with Columbia University VP&S.",
    imageSrc: "/partners/iyrc/research-day.jpg",
    imageAlt: "Students presenting research at a Columbia VP&S / IYRC-related academic event",
    logoSrc: "/partners/iyrc/logo.png",
    href: "https://www.the-iyrc.org/",
    programDates: "August 2 – 30, 2026",
    deadlines: [
      {
        label: "Program window",
        date: "Aug 2 – 30, 2026",
        dateTime: "2026-08-02",
        status: "upcoming",
      },
    ],
    tags: ["Medical humanities", "Public health"],
  },
];
