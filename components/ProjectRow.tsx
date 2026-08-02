import Image from "next/image";
import { AspectRatio } from "@astryxdesign/core/AspectRatio";
import { Heading } from "@astryxdesign/core/Heading";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import type { Project } from "@/data/projects";
import { HoverArrow } from "@/components/HoverArrow";
import { TransitionLink } from "@/components/TransitionLink";

export function ProjectRow({
  project,
  index = 0,
}: {
  project: Project;
  index?: number;
}) {
  const href = `/work/${project.slug}`;
  const delayClass =
    index === 0
      ? "reveal-delay-1"
      : index === 1
        ? "reveal-delay-2"
        : "reveal-delay-3";

  return (
    <article className={`reveal ${delayClass} group`}>
      <div className="grid grid-cols-1 items-start gap-4 sm:gap-5 md:grid-cols-2 md:gap-10 lg:gap-14">
        <TransitionLink
          href={href}
          className="block overflow-hidden rounded-xl bg-muted transition-opacity hover:opacity-90 active:opacity-80 sm:rounded-2xl"
          aria-label={`${project.title} case study`}
        >
          <AspectRatio ratio={16 / 10} fit="cover">
            {project.thumbnail ? (
              <Image
                src={project.thumbnail}
                alt=""
                width={1080}
                height={675}
                sizes="(max-width: 768px) 100vw, 540px"
              />
            ) : null}
          </AspectRatio>
        </TransitionLink>

        <VStack gap={2} className="min-w-0 md:pt-1">
          <Heading level={2}>
            <TransitionLink
              href={href}
              className="inline-flex max-w-full items-center gap-1.5 transition-opacity hover:opacity-70 active:opacity-60"
            >
              <span className="min-w-0">{project.title}</span>
              <HoverArrow />
            </TransitionLink>
          </Heading>
          <Text
            type="body"
            color="secondary"
            display="block"
            textWrap="pretty"
            className="max-w-md"
          >
            {project.description}
          </Text>
        </VStack>
      </div>
    </article>
  );
}
