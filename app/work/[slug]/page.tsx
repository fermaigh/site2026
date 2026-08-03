import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { HoverArrow } from "@/components/HoverArrow";
import { PageShell } from "@/components/PageShell";
import {
  getCaseStudyProjects,
  getProject,
  type CaseStudyBlock,
  type CaseStudyBullet,
  type CaseStudySection,
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

function bulletKey(bullet: CaseStudyBullet): string {
  if (typeof bullet === "string") return bullet;
  return bullet.parts
    .map((part) => (typeof part === "string" ? part : part.text))
    .join("");
}

function CaseStudyBulletContent({ bullet }: { bullet: CaseStudyBullet }) {
  if (typeof bullet === "string") return bullet;

  return (
    <>
      {bullet.parts.map((part, index) =>
        typeof part === "string" ? (
          <span key={`${index}-${part}`}>{part}</span>
        ) : (
          <a
            key={`${index}-${part.href}`}
            href={part.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1 font-semibold text-foreground transition-opacity hover:opacity-70 active:opacity-60"
          >
            <span>{part.text}</span>
            <HoverArrow />
          </a>
        ),
      )}
    </>
  );
}

function CaseStudyBlockContent({ block }: { block: CaseStudyBlock }) {
  return (
    <div className="max-w-2xl">
      <h3 className="font-sans text-[clamp(1rem,3vw,1.125rem)] font-semibold tracking-tight text-foreground">
        {block.heading}
      </h3>
      {block.body ? (
        <p className="mt-3 font-sans text-[15px] leading-[1.65] text-pretty text-foreground/80 sm:mt-4 sm:text-[17px]">
          {block.body}
        </p>
      ) : null}
      {block.bullets?.length ? (
        <ul className="mt-3 list-disc space-y-2 pl-5 font-sans text-[15px] leading-[1.65] text-pretty text-foreground/80 marker:text-foreground/35 sm:mt-4 sm:space-y-3 sm:text-[17px]">
          {block.bullets.map((item) => (
            <li key={bulletKey(item)} className="ps-1">
              <CaseStudyBulletContent bullet={item} />
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
      <h2 className="font-sans text-[clamp(1.125rem,4vw,1.5rem)] font-semibold tracking-tight text-foreground">
        {section.heading}
      </h2>
      {section.body ? (
        <p className="mt-3 max-w-2xl font-sans text-[15px] leading-[1.65] text-pretty text-foreground/80 sm:mt-4 sm:text-[17px]">
          {section.body}
        </p>
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
        <div
          className="reveal relative overflow-hidden rounded-xl sm:rounded-2xl"
          style={{
            backgroundColor: project.video
              ? (project.videoBackground ?? "#000000")
              : "#d9d9d9",
          }}
        >
          <div className="relative aspect-[16/10] w-full sm:aspect-[16/9]">
            {project.video ? (
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
            ) : project.thumbnail ? (
              <Image
                src={project.thumbnail}
                alt=""
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1080px) 100vw, 1080px"
              />
            ) : null}
          </div>
        </div>

        <header className="reveal reveal-delay-1 mt-8 sm:mt-10">
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
                    {caseStudy.role}
                  </p>
                ) : null}
                {caseStudy.team ? (
                  <p>
                    <span className="font-medium text-foreground">Team:</span>{" "}
                    {caseStudy.team}
                  </p>
                ) : null}
                {caseStudy.duration ? (
                  <p>
                    <span className="font-medium text-foreground">
                      Duration:
                    </span>{" "}
                    {caseStudy.duration}
                  </p>
                ) : null}
                {caseStudy.ownership ? (
                  <p>
                    <span className="font-medium text-foreground">
                      Ownership:
                    </span>{" "}
                    {caseStudy.ownership}
                  </p>
                ) : null}
              </div>
            ) : null}
            <p>{caseStudy.lead}</p>
          </div>
        </header>

        <div className="mt-12 space-y-10 border-t border-black/[0.06] pt-10 sm:mt-16 sm:space-y-14 sm:pt-14 md:mt-20 md:pt-16">
          {caseStudy.sections.map((section, index) => (
            <section
              key={section.heading}
              className={`reveal reveal-delay-${Math.min(index + 1, 3)}`}
            >
              <CaseStudySectionContent section={section} />
            </section>
          ))}
        </div>
      </article>
    </PageShell>
  );
}
