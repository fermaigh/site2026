import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Heading } from "@astryxdesign/core/Heading";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { PageShell } from "@/components/PageShell";
import { RichTextContent } from "@/components/RichText";
import { TtsProductDemo } from "@/components/tts/TtsProductDemo";
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
    <VStack gap={3} className="max-w-2xl sm:gap-4">
      <Heading level={3}>{block.heading}</Heading>
      {block.body ? (
        <Text
          type="large"
          color="secondary"
          display="block"
          textWrap="pretty"
        >
          <RichTextContent value={block.body} />
        </Text>
      ) : null}
      {block.bullets?.length ? (
        <ul className="flex list-disc flex-col gap-2 pl-5 marker:text-secondary sm:gap-3">
          {block.bullets.map((item) => (
            <li key={richTextToPlain(item)} className="ps-1">
              <Text type="large" color="secondary" display="block" textWrap="pretty">
                <RichTextContent value={item} />
              </Text>
            </li>
          ))}
        </ul>
      ) : null}
    </VStack>
  );
}

function CaseStudySectionContent({ section }: { section: CaseStudySection }) {
  return (
    <VStack gap={3} className="sm:gap-4">
      {section.heading ? <Heading level={2}>{section.heading}</Heading> : null}
      {section.body ? (
        <Text
          type="large"
          color="secondary"
          display="block"
          textWrap="pretty"
          className="max-w-2xl"
        >
          <RichTextContent value={section.body} />
        </Text>
      ) : null}
      {section.bullets?.length ? (
        <ul className="flex max-w-2xl list-disc flex-col gap-2 pl-5 marker:text-secondary sm:gap-3">
          {section.bullets.map((item) => (
            <li key={richTextToPlain(item)} className="ps-1">
              <Text type="large" color="secondary" display="block" textWrap="pretty">
                <RichTextContent value={item} />
              </Text>
            </li>
          ))}
        </ul>
      ) : null}
      {section.blocks?.length ? (
        <VStack gap={8} className="mt-3 sm:mt-4 sm:gap-10">
          {section.blocks.map((block) => (
            <CaseStudyBlockContent key={block.heading} block={block} />
          ))}
        </VStack>
      ) : null}
    </VStack>
  );
}

function MetaLine({ label, value }: { label: string; value: string }) {
  return (
    <Text type="large" color="secondary" display="block">
      <span className="font-medium text-primary">{label}:</span>{" "}
      <strong className="font-semibold text-primary">{value}</strong>
    </Text>
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
      <VStack as="article" gap={0} className="pb-8">
        <VStack gap={4} className="reveal sm:gap-6">
          <Heading level={1}>{project.title}</Heading>
          <VStack gap={4} className="max-w-2xl sm:gap-5">
            {hasMeta ? (
              <VStack gap={1}>
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
              </VStack>
            ) : null}
            {caseStudy.lead ? (
              <Text
                type="large"
                color="secondary"
                display="block"
                textWrap="pretty"
              >
                <RichTextContent value={caseStudy.lead} />
              </Text>
            ) : null}
          </VStack>
        </VStack>

        <VStack
          gap={10}
          className="mt-12 border-t border-secondary/20 pt-10 sm:mt-16 sm:gap-14 sm:pt-14 md:mt-20 md:pt-16"
        >
          {caseStudy.sections.map((section, index) => (
            <section
              key={section.heading ?? `section-${index}`}
              className={`reveal reveal-delay-${Math.min(index + 1, 3)}`}
            >
              <CaseStudySectionContent section={section} />
            </section>
          ))}
        </VStack>

        {caseStudy.closingNote ? (
          <p className="reveal reveal-delay-3 mt-10 max-w-2xl font-sans text-[15px] leading-[1.65] text-[#E11919] sm:mt-12 sm:text-[17px]">
            {caseStudy.closingNote}
          </p>
        ) : null}

        {caseStudy.showcase === "target-collaboration" ? (
          <div className="reveal reveal-delay-3 mt-10 w-full sm:mt-12">
            <TtsProductDemo />
          </div>
        ) : null}
      </VStack>
    </PageShell>
  );
}
