import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { AspectRatio } from "@astryxdesign/core/AspectRatio";
import { Divider } from "@astryxdesign/core/Divider";
import { Heading } from "@astryxdesign/core/Heading";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
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
      <VStack as="article" gap={8} className="pb-8">
        <AspectRatio
          ratio={16 / 9}
          fit="cover"
          className="reveal overflow-hidden rounded-xl bg-muted sm:rounded-2xl"
        >
          {project.thumbnail ? (
            <Image
              src={project.thumbnail}
              alt=""
              width={1600}
              height={900}
              priority
              sizes="(max-width: 1080px) 100vw, 1080px"
            />
          ) : null}
        </AspectRatio>

        <VStack gap={4} className="reveal reveal-delay-1 sm:gap-6">
          <Heading level={1}>{project.title}</Heading>
          <Text
            type="large"
            color="secondary"
            display="block"
            textWrap="pretty"
            className="max-w-2xl"
          >
            {caseStudy.lead}
          </Text>
        </VStack>

        <Divider />

        <VStack gap={10} className="sm:gap-14">
          {caseStudy.sections.map((section, index) => (
            <VStack
              key={section.heading}
              gap={3}
              className={`reveal reveal-delay-${Math.min(index + 1, 3)} sm:gap-4`}
            >
              <Heading level={2}>{section.heading}</Heading>
              <Text
                type="large"
                color="secondary"
                display="block"
                textWrap="pretty"
                className="max-w-2xl"
              >
                {section.body}
              </Text>
            </VStack>
          ))}
        </VStack>
      </VStack>
    </PageShell>
  );
}
