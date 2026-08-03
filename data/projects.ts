export type CaseStudyBulletLink = {
  text: string;
  href: string;
};

/** Plain string, or mixed text + links for inline hyperlinks */
export type CaseStudyBullet =
  | string
  | {
      parts: Array<string | CaseStudyBulletLink>;
    };

export type CaseStudyBlock = {
  heading: string;
  body?: string;
  bullets?: CaseStudyBullet[];
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
  lead: string;
  sections: CaseStudySection[];
};

export type Project = {
  slug: string;
  title: string;
  description: string;
  /** Grey placeholder until a real thumbnail is added */
  thumbnail?: string;
  /** Autoplaying muted loop video shown in place of the still thumbnail when set */
  video?: string;
  /** Thumbnail container background behind video (defaults to black when video is set) */
  videoBackground?: string;
  /** When present, the project has a dedicated case study page at /work/[slug] */
  caseStudy?: CaseStudy;
};

export const projects: Project[] = [
  {
    slug: "tiktok-shop-affiliate",
    title: "TikTok Shop Affiliate",
    description: "Description goes here for about 2-4 paragraph",
    caseStudy: {
      lead: "Case study details coming soon.",
      sections: [
        {
          heading: "Overview",
          body: "Description goes here for about 2-4 paragraph. Full case study content will be added later.",
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
      duration: "2022–2024",
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
    videoBackground: "#D1DFE3",
    caseStudy: {
      role: "Product Designer",
      team: "Product, Engineering, and cross-functional partners",
      duration: "2023",
      ownership:
        "Feature discovery, domain verification, breach reporting, and remediation",
      lead:
        "I joined Dashlane’s B2B team in early 2023 and led the design of Dark Web Monitoring for Dashlane Business. I partnered with product and engineering to transform complex security requirements into a simple, actionable experience.",
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
    videoBackground: "#F3B8B1",
    caseStudy: {
      lead: "Case study details coming soon.",
      sections: [
        {
          heading: "Overview",
          body: "Description goes here for about 2-4 paragraph. Full case study content will be added later.",
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
