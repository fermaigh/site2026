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
            className="inline-flex min-h-11 items-center font-sans text-[15px] font-medium text-foreground/55 transition-opacity hover:opacity-100 active:opacity-80"
          >
            ← Work
          </Link>
        </p>

        <div className="reveal reveal-delay-1 mt-6 overflow-hidden rounded-xl bg-[#d9d9d9] sm:mt-10 sm:rounded-2xl">
          <div className="aspect-[16/10] w-full sm:aspect-[16/9]" />
        </div>

        <header className="reveal reveal-delay-2 mt-8 sm:mt-10">
          <h1 className="font-sans text-[clamp(1.75rem,6vw,2.75rem)] font-semibold leading-[1.1] tracking-tight text-foreground">
            {project.title}
          </h1>
          <p className="mt-4 max-w-2xl font-sans text-[15px] leading-[1.65] text-foreground/80 sm:mt-6 sm:text-[17px]">
            {caseStudy.lead}
          </p>
        </header>

        <div className="mt-12 space-y-10 border-t border-black/[0.06] pt-10 sm:mt-16 sm:space-y-14 sm:pt-14 md:mt-20 md:pt-16">
          {caseStudy.sections.map((section, index) => (
            <section
              key={section.heading}
              className={`reveal reveal-delay-${Math.min(index + 1, 3)}`}
            >
              <h2 className="font-sans text-[clamp(1.125rem,4vw,1.5rem)] font-semibold tracking-tight text-foreground">
                {section.heading}
              </h2>
              <p className="mt-3 max-w-2xl font-sans text-[15px] leading-[1.65] text-foreground/80 sm:mt-4 sm:text-[17px]">
                {section.body}
              </p>
            </section>
          ))}
        </div>

        <p className="reveal mt-14 border-t border-black/[0.06] pt-8 sm:mt-20 sm:pt-10">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center font-sans text-[15px] font-medium text-foreground underline decoration-black/20 underline-offset-4 transition-colors hover:decoration-foreground/40"
          >
            ← Back home
          </Link>
        </p>
      </article>
    </PageShell>
  );
}
