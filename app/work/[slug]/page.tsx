import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { RichTextContent } from "@/components/RichText";
import {
  getCaseStudyProjects,
  getProject,
  richTextToPlain,
  type CaseStudyBlock,
  type CaseStudySection,
  type RichText,
} from "@/data/projects";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function caseStudyDescription(
  lead: RichText | undefined,
  sections: CaseStudySection[],
  fallback: RichText,
): string {
  if (lead) return richTextToPlain(lead);
  const context = sections.find((section) => section.body);
  if (context?.body) return richTextToPlain(context.body);
  return richTextToPlain(fallback);
}

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
    description: caseStudyDescription(
      project.caseStudy.lead,
      project.caseStudy.sections,
      project.description,
    ),
  };
}

function CaseStudyBlockContent({ block }: { block: CaseStudyBlock }) {
  return (
    <div className="max-w-2xl">
      <h3 className="font-sans text-[clamp(1rem,3vw,1.125rem)] font-semibold tracking-tight text-foreground">
        {block.heading}
      </h3>
      {block.body ? (
        <p className="mt-3 font-sans text-[15px] leading-[1.65] text-pretty text-foreground/80 sm:mt-4 sm:text-[17px]">
          <RichTextContent value={block.body} />
        </p>
      ) : null}
      {block.bullets?.length ? (
        <ul className="mt-3 list-disc space-y-2 pl-5 font-sans text-[15px] leading-[1.65] text-pretty text-foreground/80 marker:text-foreground/35 sm:mt-4 sm:space-y-3 sm:text-[17px]">
          {block.bullets.map((item) => (
            <li key={richTextToPlain(item)} className="ps-1">
              <RichTextContent value={item} />
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function CaseStudySectionContent({ section }: { section: CaseStudySection }) {
  return (
    <>
      {section.heading ? (
        <h2 className="font-sans text-[clamp(1.125rem,4vw,1.5rem)] font-semibold tracking-tight text-foreground">
          {section.heading}
        </h2>
      ) : null}
      {section.body ? (
        <p
          className={`${section.heading ? "mt-3 sm:mt-4" : ""} max-w-2xl font-sans text-[15px] leading-[1.65] text-pretty text-foreground/80 sm:text-[17px]`}
        >
          <RichTextContent value={section.body} />
        </p>
      ) : null}
      {section.bullets?.length ? (
        <ul
          className={`${section.heading || section.body ? "mt-3 sm:mt-4" : ""} max-w-2xl list-disc space-y-2 pl-5 font-sans text-[15px] leading-[1.65] text-pretty text-foreground/80 marker:text-foreground/35 sm:space-y-3 sm:text-[17px]`}
        >
          {section.bullets.map((item) => (
            <li key={richTextToPlain(item)} className="ps-1">
              <RichTextContent value={item} />
            </li>
          ))}
        </ul>
      ) : null}
      {section.blocks?.length ? (
        <div className="mt-6 space-y-8 sm:mt-8 sm:space-y-10">
          {section.blocks.map((block) => (
            <CaseStudyBlockContent key={block.heading} block={block} />
          ))}
        </div>
      ) : null}
    </>
  );
}

function MetaLine({ label, value }: { label: string; value: string }) {
  return (
    <p>
      <span className="font-medium text-foreground">{label}:</span>{" "}
      <strong className="font-semibold text-foreground">{value}</strong>
    </p>
  );
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project?.caseStudy) {
    notFound();
  }

  const { caseStudy } = project;
  const hasMeta =
    caseStudy.role ||
    caseStudy.team ||
    caseStudy.year ||
    caseStudy.duration ||
    caseStudy.platform ||
    caseStudy.ownership;

  return (
    <PageShell>
      <article className="pb-8">
        <header className="reveal">
          <h1 className="font-sans text-[clamp(1.75rem,6vw,2.75rem)] font-semibold leading-[1.1] tracking-tight text-foreground">
            {project.title}
          </h1>
          <div className="mt-4 max-w-2xl space-y-4 font-sans text-[15px] leading-[1.65] text-pretty text-foreground/80 sm:mt-6 sm:space-y-5 sm:text-[17px]">
            {hasMeta ? (
              <div className="space-y-1">
                {caseStudy.role ? (
                  <MetaLine label="Role" value={caseStudy.role} />
                ) : null}
                {caseStudy.team ? (
                  <MetaLine label="Team" value={caseStudy.team} />
                ) : null}
                {caseStudy.year ? (
                  <MetaLine label="Year" value={caseStudy.year} />
                ) : caseStudy.duration ? (
                  <MetaLine label="Duration" value={caseStudy.duration} />
                ) : null}
                {caseStudy.platform ? (
                  <MetaLine label="Platform" value={caseStudy.platform} />
                ) : null}
                {caseStudy.ownership ? (
                  <MetaLine label="Ownership" value={caseStudy.ownership} />
                ) : null}
              </div>
            ) : null}
            {caseStudy.lead ? (
              <p>
                <RichTextContent value={caseStudy.lead} />
              </p>
            ) : null}
          </div>
        </header>

        <div className="mt-12 space-y-10 border-t border-foreground/10 pt-10 sm:mt-16 sm:space-y-14 sm:pt-14 md:mt-20 md:pt-16">
          {caseStudy.sections.map((section, index) => (
            <section
              key={section.heading ?? `section-${index}`}
              className={`reveal reveal-delay-${Math.min(index + 1, 3)}`}
            >
              <CaseStudySectionContent section={section} />
            </section>
          ))}
        </div>

        {caseStudy.closingNote ? (
          <p className="reveal reveal-delay-3 mt-10 max-w-2xl font-sans text-[15px] leading-[1.65] text-[#E11919] sm:mt-12 sm:text-[17px]">
            {caseStudy.closingNote}
          </p>
        ) : null}
      </article>
    </PageShell>
  );
}
