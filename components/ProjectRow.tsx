import Image from "next/image";
import { AspectRatio } from "@astryxdesign/core/AspectRatio";
import { Heading } from "@astryxdesign/core/Heading";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import type { Project } from "@/data/projects";
import { HoverArrow } from "@/components/HoverArrow";
import { RichTextContent } from "@/components/RichText";
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
  const mediaBackground =
    project.thumbnailBackground ?? (project.video ? "#000000" : undefined);
  const mediaTransform =
    [
      project.thumbnailOffsetY
        ? `translateY(${project.thumbnailOffsetY}%)`
        : null,
      project.thumbnailScale ? `scale(${project.thumbnailScale})` : null,
    ]
      .filter(Boolean)
      .join(" ") || undefined;

  return (
    <article className={`reveal ${delayClass} group`}>
      <div className="grid grid-cols-1 items-start gap-4 sm:gap-5 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] md:gap-10 lg:gap-14">
        <TransitionLink
          href={href}
          className="block overflow-hidden rounded-xl bg-muted transition-opacity hover:opacity-90 active:opacity-80 sm:rounded-2xl"
          style={mediaBackground ? { backgroundColor: mediaBackground } : undefined}
          aria-label={`${project.title} case study`}
        >
          {project.video ? (
            <div className="relative aspect-[16/10] w-full">
              <video
                className="absolute inset-0 size-full scale-[0.85] object-contain"
                src={project.video}
                poster={project.thumbnail}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-hidden
              />
            </div>
          ) : (
            <AspectRatio ratio={16 / 10} fit="cover">
              {project.thumbnail ? (
                <Image
                  src={project.thumbnail}
                  alt=""
                  width={1080}
                  height={675}
                  sizes="(max-width: 768px) 100vw, 540px"
                  style={mediaTransform ? { transform: mediaTransform } : undefined}
                />
              ) : null}
            </AspectRatio>
          )}
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
            <RichTextContent value={project.description} />
          </Text>
        </VStack>
      </div>
    </article>
  );
}
