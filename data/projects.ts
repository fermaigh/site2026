export type RichTextLink = {
  text: string;
  href: string;
};

/** Plain string, or mixed text + links for inline hyperlinks */
export type RichText =
  | string
  | {
      parts: Array<string | RichTextLink>;
    };

export function richTextToPlain(value: RichText): string {
  if (typeof value === "string") return value;
  return value.parts
    .map((part) => (typeof part === "string" ? part : part.text))
    .join("");
}

export type CaseStudyBlock = {
  heading: string;
  body?: string;
  bullets?: RichText[];
};

export type CaseStudySection = {
  heading: string;
  body?: string;
  blocks?: CaseStudyBlock[];
};

export type CaseStudy = {
  /** FAANG-style meta lines shown under the title */
  role?: string;
  team?: string;
  duration?: string;
  ownership?: string;
  /** Intro paragraph shown under the title (and under meta lines when set) */
  lead: RichText;
  sections: CaseStudySection[];
};

export type Project = {
  slug: string;
  title: string;
  description: RichText;
  /** Grey placeholder until a real thumbnail is added */
  thumbnail?: string;
  /** Autoplaying muted loop video shown in place of the still thumbnail when set */
  video?: string;
  /** Thumbnail container background (defaults to black for video, grey otherwise) */
  thumbnailBackground?: string;
  /** Scale applied to the thumbnail media inside its container (1 = fill) */
  thumbnailScale?: number;
  /** Vertical nudge of the thumbnail media, in percent (negative moves up) */
  thumbnailOffsetY?: number;
  /** When present, the project has a dedicated case study page at /work/[slug] */
  caseStudy?: CaseStudy;
};

export const projects: Project[] = [
  {
    slug: "tiktok-shop-affiliate",
    title: "Scaling TikTok Shop Affiliates",
    description:
      "Led end-to-end design for TikTok Shop Affiliate seller tools, helping millions of merchants worldwide discover, connect with, and manage creator partnerships at scale. Simplified complex workflows, driving creator-led growth and over $1M in weekly GMV.",
    caseStudy: {
      role: "Senior Product Designer",
      team: "Product, Engineering, Content Design, Data Science, Operations, and partner teams",
      duration: "2024–Present",
      ownership:
        "Design POC for seller–creator collaboration across TikTok Shop Affiliate",
      lead: {
        parts: [
          "I lead product design for ",
          {
            text: "TikTok Shop Affiliate seller",
            href: "https://seller.tiktok.com",
          },
          " experiences, helping millions of merchants worldwide discover creators, build partnerships, and grow through affiliate commerce.",
        ],
      },
      sections: [
        {
          heading: "Overview",
          body: "I design scalable tools that simplify creator partnerships—from discovery and outreach to campaigns, samples, commissions, and performance tracking. My work spans product strategy, complex workflows, and global cross-functional delivery.",
          blocks: [
            {
              heading: "Impact",
              bullets: [
                "Supported affiliate campaigns generating over $1M in weekly GMV.",
                "Launched multiple 0-to-1 seller and creator collaboration experiences.",
                "Improved core affiliate workflows serving millions of merchants worldwide.",
                "Advanced AI adoption by piloting new workflows and shipping AI-assisted solutions.",
              ],
            },
            {
              heading: "My contributions",
              bullets: [
                "Led end-to-end design from strategy and discovery through launch.",
                "Designed scalable seller–creator collaboration workflows.",
                "Simplified complex campaign, invitation, sample, and commission experiences.",
                "Aligned multiple teams around shared patterns and priorities.",
                "Established reusable components and standards across seller platforms.",
                "Used AI-assisted tools to accelerate design and ship production experiences.",
              ],
            },
          ],
        },
      ],
    },
  },
  {
    slug: "hiring-app",
    title: "AI-Powered Hiring Platform",
    description: {
      parts: [
        "Led end-to-end design for ",
        { text: "Sprockets", href: "https://sprockets.ai/" },
        ", helping franchise businesses hire faster and retain employees longer. Simplified the experience across employers and candidates while driving measurable business outcomes.",
      ],
    },
    thumbnail: "/projects/hiring-app.webp",
    video: "/projects/hiring-app.mp4",
    caseStudy: {
      role: "Lead Product Designer",
      team: "Founder, 2 PMs, 8 Engineers, 2 Designers",
      duration: "2023–2024",
      ownership: "Hiring Manager, Franchise Owner, Applicant experiences",
      lead:
        "Joined shortly after MVP launch to help scale the product. Partnered with founders and cross-functional teams to identify high-impact opportunities for growth, validate solutions, and deliver customer experiences that accelerated product maturity and business growth.",
      sections: [
        {
          heading: "Overview",
          blocks: [
            {
              heading: "Impact",
              bullets: [
                "↑ 87% interview conversation rate",
                "↓ 27% 90-day employee turnover",
                "Enabled enterprise adoption across brands including McDonald's, Chick-fil-A, Burger King, and Taco Bell",
                {
                  parts: [
                    "Helped scale the product through the company's ",
                    {
                      text: "acquisition by Humanly.io",
                      href: "https://www.humanly.io/blog/humanly-expands-to-create-an-end-to-end-conversational-ai-hiring-platform",
                    },
                  ],
                },
              ],
            },
            {
              heading: "My contributions",
              bullets: [
                "Shaped product strategy and vision alongside company leadership.",
                "Led end-to-end design across multiple product areas, from concept to launch.",
                "Drove product decisions through user research, data, and rapid experimentation.",
                "Influenced roadmap prioritization with founders, product, and engineering.",
                "Established scalable design processes and a design system to accelerate delivery.",
                "Mentored designers and elevated design quality across the organization.",
              ],
            },
          ],
        },
      ],
    },
  },
  {
    slug: "simplifying-enterprise-security",
    title: "Simplifying Enterprise Security",
    description:
      "Led the end-to-end design of Dark Web Monitoring for Dashlane Business, transforming complex security requirements into simple, scalable experiences.",
    video: "/projects/dark-web-monitoring.mp4",
    thumbnailBackground: "#D1DFE3",
    caseStudy: {
      role: "Product Designer",
      team: "Product, Engineering, and cross-functional partners",
      duration: "2023",
      ownership:
        "Feature discovery, domain verification, breach reporting, and remediation",
      lead: {
        parts: [
          "I joined Dashlane’s B2B team in early 2023 and led the design of Dark Web Monitoring for ",
          {
            text: "Dashlane Business",
            href: "https://www.dashlane.com/darkwebinsights",
          },
          ". I partnered with product and engineering to transform complex security requirements into a simple, actionable experience.",
        ],
      },
      sections: [
        {
          heading: "Overview",
          body: "Dark Web Monitoring scans company email domains for potential breaches. Through research and rapid iteration, I designed an experience that helped IT administrators discover risks, understand reports, and take action.",
          blocks: [
            {
              heading: "Impact",
              bullets: [
                "Designed and launched the feature from 0 to 1.",
                "Shaped one of Dashlane Business’s three most-used features among SMB customers.",
              ],
            },
            {
              heading: "My contributions",
              bullets: [
                "Led design from discovery through delivery.",
                "Conducted user and competitive research.",
                "Simplified complex security workflows.",
                "Designed feature discovery and domain verification.",
              ],
            },
          ],
        },
      ],
    },
  },
  {
    slug: "growth-and-monetization",
    title: "Growth & Monetization",
    description:
      "Led the redesign of Dashlane’s new user activation and upsell experiences across platforms, improving key conversion journeys to drive user and revenue growth.",
    thumbnail: "/projects/growth-monetization.webp",
    thumbnailBackground: "#F3B8B1",
    thumbnailScale: 1.25,
    thumbnailOffsetY: -10,
    caseStudy: {
      role: "Product Designer",
      team:
        "18-person cross-functional Growth team across Product, Design, Engineering, Data, and Marketing",
      duration: "2020–2021",
      ownership:
        "Onboarding, subscription plans, and cross-platform upsell experiences",
      lead:
        "I led design across Dashlane’s acquisition and subscription journeys, partnering with a global team to drive user activation, retention, and revenue growth across web, desktop, and mobile.",
      sections: [
        {
          heading: "Overview",
          body: "I redesigned new-user onboarding around Autofill—Dashlane’s core “aha moment”—and led the UX for a global subscription revamp introducing a new mid-tier plan. I also identified early-funnel friction and tested targeted improvements across key conversion touchpoints.",
          blocks: [
            {
              heading: "Impact",
              bullets: [
                "23%+ free-to-paid conversion",
                "5%+ improvement in first-month retention",
                "12% lift in conversion by improving Premium trial visibility",
              ],
            },
            {
              heading: "My contributions",
              bullets: [
                "Designed and launched onboarding that demonstrated Dashlane’s core value (Autofill).",
                "Led cross-platform UX for a global subscription and pricing revamp.",
                "Simplified plan comparison, purchasing, account management, and upgrade experiences.",
                "Designed solutions and supported A/B experiments for quick wins, improving activation and conversion based on behavioral data and churn analysis.",
                "Aligned stakeholders across product, engineering, data, and marketing.",
              ],
            },
          ],
        },
      ],
    },
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getCaseStudyProjects(): Project[] {
  return projects.filter((project) => project.caseStudy);
}
