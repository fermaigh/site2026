import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import {
  getCaseStudyProjects,
  getProject,
} from "@/data/projects";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getCaseStudyProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project?.caseStudy) {
    return { title: "Case study" };
  }

  return {
    title: `${project.title} — Xiaoye Lin`,
    description: project.caseStudy.lead,
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project?.caseStudy) {
    notFound();
  }

  const { caseStudy } = project;

  return (
    <PageShell>
      <article className="pb-8">
        <p className="reveal">
          <Link
            href="/"
            className="font-sans text-[15px] font-medium text-foreground/55 transition-opacity hover:opacity-100"
          >
            ← Work
          </Link>
        </p>

        <div className="reveal reveal-delay-1 mt-10 overflow-hidden rounded-2xl bg-[#d9d9d9]">
          <div className="aspect-[16/9] w-full" />
        </div>

        <header className="reveal reveal-delay-2 mt-10">
          <h1 className="font-sans text-[clamp(2rem,5vw,2.75rem)] font-semibold leading-[1.1] tracking-tight text-foreground">
            {project.title}
          </h1>
          <p className="mt-6 max-w-2xl font-sans text-[17px] leading-[1.65] text-foreground/80">
            {caseStudy.lead}
          </p>
        </header>

        <div className="mt-16 space-y-14 border-t border-black/[0.06] pt-14 md:mt-20 md:pt-16">
          {caseStudy.sections.map((section, index) => (
            <section
              key={section.heading}
              className={`reveal reveal-delay-${Math.min(index + 1, 3)}`}
            >
              <h2 className="font-sans text-[clamp(1.25rem,3vw,1.5rem)] font-semibold tracking-tight text-foreground">
                {section.heading}
              </h2>
              <p className="mt-4 max-w-2xl font-sans text-[17px] leading-[1.65] text-foreground/80">
                {section.body}
              </p>
            </section>
          ))}
        </div>

        <p className="reveal mt-20 border-t border-black/[0.06] pt-10">
          <Link
            href="/"
            className="font-sans text-[15px] font-medium text-foreground underline decoration-black/20 underline-offset-4 transition-colors hover:decoration-foreground/40"
          >
            ← Back home
          </Link>
        </p>
      </article>
    </PageShell>
  );
}
