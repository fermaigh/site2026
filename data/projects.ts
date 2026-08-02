export type CaseStudySection = {
  heading: string;
  body: string;
};

export type CaseStudy = {
  /** One-line outcome shown under the title */
  lead: string;
  sections: CaseStudySection[];
};

export type Project = {
  slug: string;
  title: string;
  company: string;
  date: string;
  description: string;
  href?: string;
  hrefLabel?: string;
  tags?: string[];
  /** Visual variant for the mock strip above the title */
  visual?: "rail" | "interop" | "reels" | "music" | "business" | "keyboard" | "lamp";
  /** When present, the project has a dedicated case study page at /work/[slug] */
  caseStudy?: CaseStudy;
};

export const projects: Project[] = [
  {
    slug: "left-rail",
    title: "Left Rail",
    company: "Figma",
    date: "May 2025",
    description:
      "A scalable file navigation pattern unlocking critical workflows for Figma Design, Sites, and Buzz. Led the product from concept to launch, aligning 5+ teams, driving leadership reviews, and delivering designs.",
    tags: ["Left Rail", "Sites", "Buzz"],
    visual: "rail",
    caseStudy: {
      lead: "One navigation pattern that scales across Design, Sites, and Buzz — without forcing every surface into the same mold.",
      sections: [
        {
          heading: "Context",
          body: "Figma’s product surface was expanding beyond the classic design file. Sites and Buzz needed first-class homes in the product, but file navigation still assumed a single mental model. Teams were inventing local workarounds; people lost context switching between products.",
        },
        {
          heading: "Problem",
          body: "How do you introduce a shared left-rail pattern that unlocks critical workflows for multiple products, stays familiar to existing users, and still leaves room for each surface to feel distinct?",
        },
        {
          heading: "Approach",
          body: "I framed the rail as a system: a stable skeleton for hierarchy and switching, with pluggable regions for product-specific actions. Early prototypes focused on orientation and recoverability — knowing where you are, what you can open next, and how to get back. I partnered with Design, Sites, and Buzz to pressure-test edge cases, then used leadership reviews to lock scope and sequencing.",
        },
        {
          heading: "Outcome",
          body: "Shipped a scalable navigation pattern that unblocks cross-product workflows, reduces one-off nav inventiveness, and gives each team a clear place to extend without rewriting the shell. The work aligned five-plus teams from concept through launch.",
        },
      ],
    },
  },
  {
    slug: "interop",
    title: "Interop",
    company: "Figma",
    date: "Dec 2024",
    description:
      "Drove executive alignment on Figma’s company-wide interop strategy, defining foundational frameworks and patterns to introduce and scale new products including Figma Sites (as a file type) and Figma Draw (as a design mode).",
    tags: ["Sites", "Draw", "Design", "Create"],
    visual: "interop",
  },
  {
    slug: "reels",
    title: "Reels",
    company: "Instagram",
    date: "Aug 2020",
    description:
      "A new way for people to create and discover fun, entertaining videos. Founding member that led the end-to-end experience from concept to launch for Instagram Reels. Reels has since become one of Instagram’s top priorities.",
    visual: "reels",
  },
  {
    slug: "music",
    title: "Music",
    company: "Instagram",
    date: "Jun 2018",
    description:
      "Enabling people to share and connect through the music they love. Designed and scaled Instagram’s first music products, including music and lyrics on Stories, now used globally and fully compliant with music rights.",
    tags: ["9:41", "Album", "Lyrics", "Social music discovery"],
    href: "https://patents.google.com/patent/US11126344B2",
    hrefLabel: "Patented selection flow",
    visual: "music",
  },
  {
    slug: "business",
    title: "Business",
    company: "Instagram",
    date: "Dec 2017",
    description:
      "Led design for features connecting people and businesses, including Feed and Stories ads and the in-app browser. Improved how businesses reached audiences while ensuring ad experiences felt integrated and user-centric.",
    visual: "business",
  },
  {
    slug: "hub-keyboard",
    title: "Hub Keyboard",
    company: "Microsoft",
    date: "Apr 2016",
    description:
      "Bringing everything you need—like contacts and documents—directly into your keyboard, so you can access them from any app without switching. Designed the entire 0 → 1 experience for iOS, including the core app and onboarding flows.",
    tags: ["Type mode", "Search mode"],
    visual: "keyboard",
  },
  {
    slug: "plus-minus",
    title: "Plus Minus",
    company: "Parsons MFA Thesis",
    date: "May 2013",
    description:
      "Plus Minus is a customizable lamp kit that teaches basic circuitry through hands-on assembly. With form, color, conductivity, and magnetism, it lets people of all ages build diverse light forms while fostering creativity and passive learning.",
    tags: ["Attach", "Bulbs"],
    visual: "lamp",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getCaseStudyProjects(): Project[] {
  return projects.filter((project) => project.caseStudy);
}
