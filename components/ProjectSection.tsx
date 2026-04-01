import type { Project } from "@/data/projects";
import { ProjectVisual } from "@/components/ProjectVisual";

export function ProjectSection({ project }: { project: Project }) {
  return (
    <section
      id={project.slug}
      className="scroll-mt-24 border-t border-black/[0.06] py-16 first:border-t-0 first:pt-0 dark:border-white/10 md:py-20"
    >
      {project.visual ? <ProjectVisual visual={project.visual} /> : null}

      <h2 className="font-serif text-[clamp(1.75rem,4vw,2.25rem)] font-normal leading-tight tracking-tight text-foreground">
        {project.title}
      </h2>

      <p className="mt-3 font-mono text-[13px] text-foreground/45">
        {project.company} · {project.date}
      </p>

      <p className="mt-6 max-w-2xl font-sans text-[17px] leading-[1.65] text-foreground/80">
        {project.description}
      </p>

      {project.href && project.hrefLabel ? (
        <p className="mt-4 font-sans text-[15px]">
          <a
            href={project.href}
            className="underline decoration-black/20 underline-offset-4 transition-colors hover:decoration-foreground/40 dark:decoration-white/20"
            target="_blank"
            rel="noopener noreferrer"
          >
            {project.hrefLabel}
          </a>
        </p>
      ) : null}

      {project.tags && project.tags.length > 0 ? (
        <ul className="mt-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-black/[0.08] px-3 py-1 font-sans text-[12px] text-foreground/55 dark:border-white/10"
            >
              {tag}
            </li>
          ))}
        </ul>
      ) : null}

      <div className="mt-8">
        <a
          href={`#${project.slug}`}
          className="inline-flex items-center gap-1 font-sans text-[14px] font-medium text-foreground transition-opacity hover:opacity-60"
        >
          go to
          <span aria-hidden className="text-foreground/40">
            →
          </span>
        </a>
      </div>
    </section>
  );
}
