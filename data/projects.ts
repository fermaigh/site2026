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
  description: string;
  /** Grey placeholder until a real thumbnail is added */
  thumbnail?: string;
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
    description: "Description goes here for about 2-4 paragraph",
    thumbnail: "/projects/hiring-app.webp",
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
