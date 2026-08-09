export type RichTextLink = {
  text: string;
  href: string;
};

export type RichTextBold = {
  bold: string;
};

export type RichTextPart = string | RichTextLink | RichTextBold;

/** Plain string, or mixed text + links + bold spans for inline emphasis */
export type RichText =
  | string
  | {
      parts: RichTextPart[];
    };

function isRichTextLink(part: RichTextPart): part is RichTextLink {
  return typeof part === "object" && "href" in part;
}

function isRichTextBold(part: RichTextPart): part is RichTextBold {
  return typeof part === "object" && "bold" in part;
}

export function richTextToPlain(value: RichText): string {
  if (typeof value === "string") return value;
  return value.parts
    .map((part) => {
      if (typeof part === "string") return part;
      if (isRichTextLink(part)) return part.text;
      return part.bold;
    })
    .join("");
}

export { isRichTextLink, isRichTextBold };

export type CaseStudyBlock = {
  heading: string;
  body?: RichText;
  bullets?: RichText[];
};

export type CaseStudySection = {
  heading: string;
  body?: RichText;
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
      "Led end-to-end design for TikTok Shop Affiliate seller tools, including AI agents and AI-assisted experiences, helping millions of merchants discover, connect with, and manage creator partnerships at scale. Simplified complex workflows, driving creator-led growth and millions in weekly GMV.",
    thumbnail: "/projects/tts_thumb.png",
    thumbnailBackground: "#EFEFEF",
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
          " experiences, helping ",
          { bold: "millions of merchants worldwide" },
          " discover creators, build partnerships, and grow through affiliate commerce.",
        ],
      },
      sections: [
        {
          heading: "Overview",
          body: {
            parts: [
              "I design ",
              { bold: "scalable tools" },
              " that simplify creator partnerships—from discovery and outreach to campaigns, samples, commissions, and performance tracking. My work spans ",
              { bold: "product strategy" },
              ", complex workflows, and ",
              { bold: "global cross-functional delivery" },
              ".",
            ],
          },
          blocks: [
            {
              heading: "Impact",
              bullets: [
                {
                  parts: [
                    "Supported affiliate campaigns generating over ",
                    { bold: "$1M in weekly GMV" },
                    ".",
                  ],
                },
                {
                  parts: [
                    "Launched multiple ",
                    { bold: "0-to-1" },
                    " seller and creator collaboration experiences.",
                  ],
                },
                {
                  parts: [
                    "Improved core affiliate workflows serving ",
                    { bold: "millions of merchants worldwide" },
                    ".",
                  ],
                },
                {
                  parts: [
                    "Advanced ",
                    { bold: "AI adoption" },
                    " by piloting new workflows and shipping AI-assisted solutions.",
                  ],
                },
              ],
            },
            {
              heading: "My contributions",
              bullets: [
                {
                  parts: [
                    { bold: "Led end-to-end design" },
                    " from strategy and discovery through launch.",
                  ],
                },
                {
                  parts: [
                    "Designed scalable ",
                    { bold: "seller–creator collaboration workflows" },
                    ", in traditional feature and ",
                    { bold: "AI Agent flows" },
                  ],
                },
                {
                  parts: [
                    "Simplified complex ",
                    { bold: "campaign, invitation, sample, and commission" },
                    " experiences.",
                  ],
                },
                {
                  parts: [
                    "Aligned multiple teams around ",
                    { bold: "shared patterns and priorities" },
                    ".",
                  ],
                },
                {
                  parts: [
                    "Established ",
                    { bold: "reusable components and standards" },
                    " across seller platforms.",
                  ],
                },
                {
                  parts: [
                    "Used ",
                    { bold: "AI-assisted tools" },
                    " to accelerate design and ship production experiences.",
                  ],
                },
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
    description:
      "Led end-to-end design for Sprockets, helping franchise businesses hire faster and retain employees longer. Simplified the experience across employers and candidates while driving measurable business outcomes.",
    thumbnail: "/projects/hiring-app.webp",
    video: "/projects/hiring-app.mp4",
    caseStudy: {
      role: "Lead Product Designer",
      team: "Founder, 2 PMs, 8 Engineers, 2 Designers",
      duration: "2023–2024",
      ownership: "Hiring Manager, Franchise Owner, Applicant experiences",
      lead: {
        parts: [
          "Joined shortly after ",
          { bold: "MVP launch" },
          " to help scale the product. Partnered with founders and cross-functional teams to identify ",
          { bold: "high-impact opportunities for growth" },
          ", validate solutions, and deliver customer experiences that accelerated product maturity and ",
          { bold: "business growth" },
          ".",
        ],
      },
      sections: [
        {
          heading: "Overview",
          blocks: [
            {
              heading: "Impact",
              bullets: [
                {
                  parts: [
                    "↑ ",
                    { bold: "87% interview conversation rate" },
                  ],
                },
                {
                  parts: [
                    "↓ ",
                    { bold: "27% 90-day employee turnover" },
                  ],
                },
                {
                  parts: [
                    "Enabled ",
                    { bold: "enterprise adoption" },
                    " across brands including ",
                    {
                      bold: "McDonald's, Chick-fil-A, Burger King, and Taco Bell",
                    },
                  ],
                },
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
                {
                  parts: [
                    "Shaped ",
                    { bold: "product strategy and vision" },
                    " alongside company leadership.",
                  ],
                },
                {
                  parts: [
                    { bold: "Led end-to-end design" },
                    " across multiple product areas, from concept to launch.",
                  ],
                },
                {
                  parts: [
                    "Drove product decisions through ",
                    { bold: "user research, data, and rapid experimentation" },
                    ".",
                  ],
                },
                {
                  parts: [
                    "Influenced ",
                    { bold: "roadmap prioritization" },
                    " with founders, product, and engineering.",
                  ],
                },
                {
                  parts: [
                    "Established scalable design processes and a ",
                    { bold: "design system" },
                    " to accelerate delivery.",
                  ],
                },
                {
                  parts: [
                    { bold: "Mentored designers" },
                    " and elevated design quality across the organization.",
                  ],
                },
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
          "I joined Dashlane’s B2B team in early 2023 and led the design of ",
          { bold: "Dark Web Monitoring" },
          " for ",
          {
            text: "Dashlane Business",
            href: "https://www.dashlane.com/darkwebinsights",
          },
          ". I partnered with product and engineering to transform complex security requirements into a ",
          { bold: "simple, actionable experience" },
          ".",
        ],
      },
      sections: [
        {
          heading: "Overview",
          body: {
            parts: [
              "Dark Web Monitoring scans company email domains for potential breaches. Through research and rapid iteration, I designed an experience that helped ",
              { bold: "IT administrators" },
              " discover risks, understand reports, and ",
              { bold: "take action" },
              ".",
            ],
          },
          blocks: [
            {
              heading: "Impact",
              bullets: [
                {
                  parts: [
                    "Designed and launched the feature from ",
                    { bold: "0 to 1" },
                    ".",
                  ],
                },
                {
                  parts: [
                    "Shaped one of Dashlane Business’s ",
                    { bold: "three most-used features" },
                    " among SMB customers.",
                  ],
                },
              ],
            },
            {
              heading: "My contributions",
              bullets: [
                {
                  parts: [
                    { bold: "Led design" },
                    " from discovery through delivery.",
                  ],
                },
                {
                  parts: [
                    "Conducted ",
                    { bold: "user and competitive research" },
                    ".",
                  ],
                },
                {
                  parts: [
                    "Simplified ",
                    { bold: "complex security workflows" },
                    ".",
                  ],
                },
                {
                  parts: [
                    "Designed ",
                    { bold: "feature discovery and domain verification" },
                    ".",
                  ],
                },
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
      lead: {
        parts: [
          "I led design across Dashlane’s ",
          { bold: "acquisition and subscription journeys" },
          ", partnering with a global team to drive ",
          { bold: "user activation, retention, and revenue growth" },
          " across web, desktop, and mobile.",
        ],
      },
      sections: [
        {
          heading: "Overview",
          body: {
            parts: [
              "I redesigned new-user onboarding around ",
              { bold: "Autofill" },
              "—Dashlane’s core “aha moment”—and led the UX for a ",
              { bold: "global subscription revamp" },
              " introducing a new mid-tier plan. I also identified early-funnel friction and tested targeted improvements across key conversion touchpoints.",
            ],
          },
          blocks: [
            {
              heading: "Impact",
              bullets: [
                {
                  parts: [{ bold: "23%+ free-to-paid conversion" }],
                },
                {
                  parts: [
                    { bold: "5%+ improvement in first-month retention" },
                  ],
                },
                {
                  parts: [
                    { bold: "12% lift in conversion" },
                    " by improving Premium trial visibility",
                  ],
                },
              ],
            },
            {
              heading: "My contributions",
              bullets: [
                {
                  parts: [
                    "Designed and launched onboarding that demonstrated Dashlane’s core value (",
                    { bold: "Autofill" },
                    ").",
                  ],
                },
                {
                  parts: [
                    "Led cross-platform UX for a ",
                    { bold: "global subscription and pricing revamp" },
                    ".",
                  ],
                },
                {
                  parts: [
                    "Simplified ",
                    {
                      bold: "plan comparison, purchasing, account management, and upgrade",
                    },
                    " experiences.",
                  ],
                },
                {
                  parts: [
                    "Designed solutions and supported ",
                    { bold: "A/B experiments" },
                    " for quick wins, improving ",
                    { bold: "activation and conversion" },
                    " based on behavioral data and churn analysis.",
                  ],
                },
                {
                  parts: [
                    "Aligned stakeholders across ",
                    { bold: "product, engineering, data, and marketing" },
                    ".",
                  ],
                },
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
