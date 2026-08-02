export type CaseStudySection = {
  heading: string;
  body: string;
};

export type CaseStudy = {
  /** FAANG-style role line shown under the title */
  role?: string;
  /** FAANG-style scope line shown under the title */
  scope?: string;
  /** Intro paragraph shown under the title (and under role/scope when set) */
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
    title: "Hiring app",
    description:
      "An AI-powered hiring platform helping franchise businesses recruit faster and retain employees longer. Led end-to-end product design, simplifying hiring across employers and candidates while reducing time-to-hire and improving employee retention.",
    thumbnail: "/projects/hiring-app.webp",
    video: "/projects/hiring-app.mp4",
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
