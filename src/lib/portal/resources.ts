export type ResourceSelectivity = "open" | "selective" | "highly selective";

export type ResourceItem = {
  id: string;
  title: string;
  blurb: string;
  tags: string[];
  href: string;
  deadline: string;
  cost: string;
  selectivity: ResourceSelectivity;
  exclusivity: "elite";
};

export type ResourceCollection = {
  id: string;
  label: string;
  summary: string;
  items: ResourceItem[];
};

const selectivityLabel: Record<ResourceSelectivity, string> = {
  open: "Open / rolling",
  selective: "Selective",
  "highly selective": "Highly selective",
};

export function resourceSelectivityLabel(s: ResourceSelectivity) {
  return selectivityLabel[s];
}

/**
 * Member resources — summer programs and opportunities with upfront facts.
 */
export const ELITE_RESOURCE_COLLECTIONS: ResourceCollection[] = [
  {
    id: "summer-programs",
    label: "Summer programs",
    summary: "Programs we actually applied to or helped siblings get into — with deadlines and costs up front.",
    items: [
      {
        id: "summer-research-starter",
        title: "Research Science Institute (RSI)",
        blurb: "Free 6-week research program at MIT. You leave with a paper and mentor letter — if you get in.",
        tags: ["research", "rising seniors"],
        href: "https://www.cee.org/programs/research-science-institute",
        deadline: "Jan 15 typical",
        cost: "Free (travel stipend varies)",
        selectivity: "highly selective",
        exclusivity: "elite",
      },
      {
        id: "summer-stem-immersive",
        title: "Simons Summer Research Program",
        blurb: "Paid research at Stony Brook. Less brand-name than RSI but real lab work and a poster.",
        tags: ["STEM", "rising seniors"],
        href: "https://www.stonybrook.edu/simons/",
        deadline: "Feb 7 typical",
        cost: "Free + stipend",
        selectivity: "highly selective",
        exclusivity: "elite",
      },
      {
        id: "summer-local-high-signal",
        title: "Community college dual enrollment",
        blurb: "Take calc, CS, or writing at your local CC over the summer. Cheap, shows initiative, no application circus.",
        tags: ["accessible", "any grade"],
        href: "https://www.aacc.edu/",
        deadline: "Rolling · register by May",
        cost: "$50–200/credit typical",
        selectivity: "open",
        exclusivity: "elite",
      },
    ],
  },
  {
    id: "opportunities",
    label: "Opportunities",
    summary: "Competitions and fellowships worth putting on your calendar.",
    items: [
      {
        id: "opp-writing-comps",
        title: "Scholastic Art & Writing Awards",
        blurb: "National writing and art competition. Regional deadlines vary — start in September.",
        tags: ["writing", "grades 7–12"],
        href: "https://www.artandwriting.org/",
        deadline: "Dec–Jan by region",
        cost: "$10/entry (fee waivers available)",
        selectivity: "selective",
        exclusivity: "elite",
      },
      {
        id: "opp-cs-build",
        title: "Congressional App Challenge",
        blurb: "Build an app, submit to your House rep's office. Good if you don't have a fancy internship yet.",
        tags: ["CS", "grades 6–12"],
        href: "https://www.congressionalappchallenge.us/",
        deadline: "Nov 1 typical",
        cost: "Free",
        selectivity: "selective",
        exclusivity: "elite",
      },
      {
        id: "opp-service-leadership",
        title: "Bank of America Student Leaders",
        blurb: "Paid summer nonprofit internship + leadership summit. Strong for service-heavy profiles.",
        tags: ["leadership", "rising juniors & seniors"],
        href: "https://www.bankofamerica.com/student-leaders/",
        deadline: "Jan 16 typical",
        cost: "Free + paid internship",
        selectivity: "highly selective",
        exclusivity: "elite",
      },
    ],
  },
];
