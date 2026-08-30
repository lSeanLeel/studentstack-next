export type VaultItem = {
  id: string;
  title: string;
  blurb: string;
  category: "summer" | "research" | "deadline" | "competition";
  deadline?: string;
  fit: string[];
  selectivity: "open" | "selective" | "highly selective";
};

export type VaultCollection = {
  id: string;
  label: string;
  summary: string;
  items: VaultItem[];
};

/**
 * Super Opportunity & Admissions Vault — member portal seed board.
 * Designed to be refreshed via the portal AI desk.
 */
export const MEMBER_VAULT_COLLECTIONS: VaultCollection[] = [
  {
    id: "summer-programs",
    label: "Summer programs",
    summary: "High-signal summer options with fit notes from our student desk.",
    items: [
      {
        id: "sum-research-immersion",
        title: "University research immersion tracks",
        blurb: "Residential research programs where you write a paper and get a mentor letter — tough to get in, free if you do.",
        category: "summer",
        deadline: "Rolling · peak Jan–Mar",
        fit: ["research", "rising juniors", "rising seniors"],
        selectivity: "highly selective",
      },
      {
        id: "sum-stem-boot",
        title: "STEM intensives with portfolio output",
        blurb: "Short programs where you leave with a project artifact admissions can understand.",
        category: "summer",
        deadline: "Feb–Apr typical",
        fit: ["STEM", "builders"],
        selectivity: "selective",
      },
      {
        id: "sum-local-signal",
        title: "Local high-signal alternatives",
        blurb: "Community college dual enrollment, hospital volunteering, and lab assisting that still move the needle.",
        category: "summer",
        deadline: "Varies by region",
        fit: ["accessible", "impact"],
        selectivity: "open",
      },
    ],
  },
  {
    id: "research-opps",
    label: "Research opportunities",
    summary: "Ways to get real research exposure before college.",
    items: [
      {
        id: "res-remote-mentor",
        title: "Remote mentored research sprints",
        blurb: "8–12 week remote projects with a deliverable paper or poster.",
        category: "research",
        deadline: "Monthly cohorts",
        fit: ["research", "writing"],
        selectivity: "selective",
      },
      {
        id: "res-local-lab",
        title: "Local lab / clinic volunteering lanes",
        blurb: "How to cold-email labs and structure a contribution log.",
        category: "research",
        deadline: "Ongoing",
        fit: ["pre-med", "STEM"],
        selectivity: "open",
      },
    ],
  },
  {
    id: "competitive-deadlines",
    label: "Competitive deadlines",
    summary: "A living board of competitions and fellowships worth calendarizing.",
    items: [
      {
        id: "dead-writing",
        title: "National writing & journalism contests",
        blurb: "Deadlines clustered for students who write under guidance.",
        category: "deadline",
        deadline: "Multiple · fall & spring",
        fit: ["humanities", "writing"],
        selectivity: "selective",
      },
      {
        id: "dead-cs",
        title: "CS / hackathon + olympiad windows",
        blurb: "Build proof and contest timelines for CS-leaning students.",
        category: "competition",
        deadline: "Seasonal",
        fit: ["CS", "engineering"],
        selectivity: "selective",
      },
      {
        id: "dead-leadership",
        title: "Service & leadership fellowships",
        blurb: "Roles where impact is measurable, not resume filler.",
        category: "deadline",
        deadline: "Winter–spring",
        fit: ["leadership", "service"],
        selectivity: "highly selective",
      },
    ],
  },
];
