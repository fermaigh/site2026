import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { ProjectVisual } from "@/components/ProjectVisual";
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
    title: `${project.title} — Jason Kim`,
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
            href={`/#${project.slug}`}
            className="font-sans text-[15px] font-medium text-foreground/55 transition-opacity hover:opacity-100"
          >
            ← Work
          </Link>
        </p>

        <div className="reveal reveal-delay-1 mt-10">
          {project.visual ? <ProjectVisual visual={project.visual} /> : null}
        </div>

        <header className="reveal reveal-delay-2">
          <h1 className="font-serif text-[clamp(2rem,5vw,2.75rem)] font-normal leading-[1.1] tracking-tight text-foreground">
            {project.title}
          </h1>
          <p className="mt-3 font-mono text-[13px] text-foreground/45">
            {project.company} · {project.date}
          </p>
          <p className="mt-6 max-w-2xl font-sans text-[17px] leading-[1.65] text-foreground/80">
            {caseStudy.lead}
          </p>
        </header>

        <div className="mt-16 space-y-14 border-t border-black/[0.06] pt-14 dark:border-white/10 md:mt-20 md:pt-16">
          {caseStudy.sections.map((section, index) => (
            <section
              key={section.heading}
              className={`reveal reveal-delay-${Math.min(index + 1, 3)}`}
            >
              <h2 className="font-serif text-[clamp(1.35rem,3vw,1.65rem)] font-normal tracking-tight text-foreground">
                {section.heading}
              </h2>
              <p className="mt-4 max-w-2xl font-sans text-[17px] leading-[1.65] text-foreground/80">
                {section.body}
              </p>
            </section>
          ))}
        </div>

        <p className="reveal mt-20 border-t border-black/[0.06] pt-10 dark:border-white/10">
          <Link
            href="/"
            className="font-sans text-[15px] font-medium text-foreground underline decoration-black/20 underline-offset-4 transition-colors hover:decoration-foreground/40 dark:decoration-white/20"
          >
            ← Back home
          </Link>
        </p>
      </article>
    </PageShell>
  );
}
