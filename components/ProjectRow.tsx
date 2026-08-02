import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/data/projects";
import { HoverArrow } from "@/components/HoverArrow";

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
      <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-2 md:gap-10 lg:gap-14">
        <Link
          href={href}
          className="block overflow-hidden rounded-2xl bg-[#d9d9d9] transition-opacity hover:opacity-90"
          aria-label={`${project.title} case study`}
        >
          <div className="relative aspect-[16/10] w-full">
            {project.thumbnail ? (
              <Image
                src={project.thumbnail}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 480px"
              />
            ) : null}
          </div>
        </Link>

        <div className="md:pt-1">
          <h2 className="font-sans text-[clamp(1.25rem,2.5vw,1.5rem)] font-semibold tracking-tight text-foreground">
            <Link
              href={href}
              className="inline-flex items-center gap-1.5 transition-opacity hover:opacity-70"
            >
              {project.title}
              <HoverArrow />
            </Link>
          </h2>
          <p className="mt-3 max-w-md font-sans text-[15px] leading-relaxed text-foreground/55 md:text-[16px]">
            {project.description}
          </p>
        </div>
      </div>
    </article>
  );
}
