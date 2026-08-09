import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyBody } from "@/components/CaseStudyBody";
import { PageShell } from "@/components/PageShell";
import { RichTextContent } from "@/components/RichText";
import {
  getCaseStudyProjects,
  getProject,
  richTextToPlain,
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
    description: richTextToPlain(project.caseStudy.lead),
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
        <header className="reveal">
          <h1 className="font-sans text-[clamp(1.75rem,6vw,2.75rem)] font-semibold leading-[1.1] tracking-tight text-foreground">
            {project.title}
          </h1>
          <div className="mt-4 max-w-2xl space-y-4 font-sans text-[15px] leading-[1.65] text-pretty text-foreground/80 sm:mt-6 sm:space-y-5 sm:text-[17px]">
            {caseStudy.role ||
            caseStudy.team ||
            caseStudy.duration ||
            caseStudy.ownership ? (
              <div className="space-y-1">
                {caseStudy.role ? (
                  <p>
                    <span className="font-medium text-foreground">Role:</span>{" "}
                    <strong className="font-semibold text-foreground">
                      {caseStudy.role}
                    </strong>
                  </p>
                ) : null}
                {caseStudy.team ? (
                  <p>
                    <span className="font-medium text-foreground">Team:</span>{" "}
                    <strong className="font-semibold text-foreground">
                      {caseStudy.team}
                    </strong>
                  </p>
                ) : null}
                {caseStudy.duration ? (
                  <p>
                    <span className="font-medium text-foreground">
                      Duration:
                    </span>{" "}
                    <strong className="font-semibold text-foreground">
                      {caseStudy.duration}
                    </strong>
                  </p>
                ) : null}
                {caseStudy.ownership ? (
                  <p>
                    <span className="font-medium text-foreground">
                      Ownership:
                    </span>{" "}
                    <strong className="font-semibold text-foreground">
                      {caseStudy.ownership}
                    </strong>
                  </p>
                ) : null}
              </div>
            ) : null}
            <p>
              <RichTextContent value={caseStudy.lead} />
            </p>
          </div>
        </header>

        <CaseStudyBody caseStudy={caseStudy} />
      </article>
    </PageShell>
  );
}
