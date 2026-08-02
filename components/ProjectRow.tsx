import Image from "next/image";
import type { Project } from "@/data/projects";
import { HoverArrow } from "@/components/HoverArrow";
import { TransitionLink } from "@/components/TransitionLink";

function ProjectLink({
  href,
  isExternal,
  className,
  ariaLabel,
  children,
}: {
  href: string;
  isExternal: boolean;
  className?: string;
  ariaLabel?: string;
  children: React.ReactNode;
}) {
  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        aria-label={ariaLabel}
      >
        {children}
      </a>
    );
  }

  return (
    <TransitionLink href={href} className={className} aria-label={ariaLabel}>
      {children}
    </TransitionLink>
  );
}

export function ProjectRow({
  project,
  index = 0,
}: {
  project: Project;
  index?: number;
}) {
  const isExternal = Boolean(project.externalUrl);
  const href = project.externalUrl ?? `/work/${project.slug}`;
  const delayClass =
    index === 0
      ? "reveal-delay-1"
      : index === 1
        ? "reveal-delay-2"
        : "reveal-delay-3";

  return (
    <article className={`reveal ${delayClass} group`}>
      <div className="grid grid-cols-1 items-start gap-4 sm:gap-5 md:grid-cols-2 md:gap-10 lg:gap-14">
        <ProjectLink
          href={href}
          isExternal={isExternal}
          className="block overflow-hidden rounded-xl bg-[#d9d9d9] transition-opacity hover:opacity-90 active:opacity-80 sm:rounded-2xl"
          ariaLabel={
            isExternal
              ? `${project.title} (opens in a new tab)`
              : `${project.title} case study`
          }
        >
          <div className="relative aspect-[16/10] w-full">
            {project.thumbnail ? (
              <Image
                src={project.thumbnail}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 540px"
              />
            ) : null}
          </div>
        </ProjectLink>

        <div className="min-w-0 md:pt-1">
          <h2 className="font-sans text-[clamp(1.125rem,4vw,1.5rem)] font-semibold tracking-tight text-foreground">
            <ProjectLink
              href={href}
              isExternal={isExternal}
              className="inline-flex max-w-full items-center gap-1.5 transition-opacity hover:opacity-70 active:opacity-60"
            >
              <span className="min-w-0">{project.title}</span>
              <HoverArrow />
            </ProjectLink>
          </h2>
          <p className="mt-2 max-w-md font-sans text-[14px] leading-relaxed text-pretty text-foreground/55 sm:mt-3 sm:text-[15px] md:text-[16px]">
            {project.description}
          </p>
        </div>
      </div>
    </article>
  );
}
