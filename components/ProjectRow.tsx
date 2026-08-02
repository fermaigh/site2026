import Image from "next/image";
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
          className="block overflow-hidden rounded-xl bg-[#d9d9d9] transition-opacity hover:opacity-90 active:opacity-80 sm:rounded-2xl"
          aria-label={`${project.title} case study`}
        >
          <div className="relative aspect-[16/10] w-full">
            {project.video ? (
              <video
                className="absolute inset-0 size-full object-cover"
                src={project.video}
                poster={project.thumbnail}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-hidden
              />
            ) : project.thumbnail ? (
              <Image
                src={project.thumbnail}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 540px"
              />
            ) : null}
          </div>
        </TransitionLink>

        <div className="min-w-0 md:pt-1">
          <h2 className="font-sans text-[clamp(1.125rem,4vw,1.5rem)] font-semibold tracking-tight text-foreground">
            <TransitionLink
              href={href}
              className="inline-flex max-w-full items-center gap-1.5 transition-opacity hover:opacity-70 active:opacity-60"
            >
              <span className="min-w-0">{project.title}</span>
              <HoverArrow />
            </TransitionLink>
          </h2>
          <p className="mt-2 max-w-md font-sans text-[14px] leading-relaxed text-pretty text-foreground/55 sm:mt-3 sm:text-[15px] md:text-[16px]">
            {project.description}
          </p>
        </div>
      </div>
    </article>
  );
}
