import Image from "next/image";
import { RichTextContent } from "@/components/RichText";
import {
  richTextToPlain,
  type CaseStudy,
  type CaseStudyBlock,
  type CaseStudyMedia,
  type CaseStudyModule,
  type CaseStudySection,
} from "@/data/projects";

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
      <h2 className="font-sans text-[clamp(1.125rem,4vw,1.5rem)] font-semibold tracking-tight text-foreground">
        {section.heading}
      </h2>
      {section.body ? (
        <p className="mt-3 max-w-2xl font-sans text-[15px] leading-[1.65] text-pretty text-foreground/80 sm:mt-4 sm:text-[17px]">
          <RichTextContent value={section.body} />
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

function CaseStudyModuleMedia({ media }: { media: CaseStudyMedia }) {
  const isVideo = media.type === "video" || media.src.endsWith(".mp4");
  const transform = media.scale ? `scale(${media.scale})` : undefined;

  return (
    <div
      className="relative mt-6 overflow-hidden rounded-xl sm:mt-8 sm:rounded-2xl"
      style={{ backgroundColor: media.background ?? "#d9d9d9" }}
    >
      <div className="relative aspect-[16/10] w-full sm:aspect-[16/9]">
        {isVideo ? (
          <video
            className="absolute inset-0 size-full object-contain"
            style={{ transform }}
            src={media.src}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden
          />
        ) : (
          <Image
            src={media.src}
            alt={media.alt ?? ""}
            fill
            className="object-cover"
            style={{ transform }}
            sizes="(max-width: 1080px) 100vw, 1080px"
          />
        )}
      </div>
    </div>
  );
}

function CaseStudyModuleContent({
  module,
  index,
}: {
  module: CaseStudyModule;
  index: number;
}) {
  return (
    <section
      id={module.id}
      className={`reveal reveal-delay-${Math.min(index + 1, 3)} scroll-mt-24`}
    >
      <div className="flex items-baseline gap-3 sm:gap-4">
        <span className="font-sans text-[13px] font-medium tracking-[0.08em] text-foreground/40 sm:text-[14px]">
          {module.index}
        </span>
        <h2 className="font-sans text-[clamp(1.35rem,4vw,1.75rem)] font-semibold tracking-tight text-foreground">
          {module.title}
        </h2>
      </div>

      {module.focus ? (
        <p className="mt-2 max-w-2xl font-sans text-[13px] leading-relaxed text-foreground/45 sm:text-[14px]">
          {module.focus}
        </p>
      ) : null}

      {module.summary ? (
        <p className="mt-4 max-w-2xl font-sans text-[15px] leading-[1.65] text-pretty text-foreground/80 sm:mt-5 sm:text-[17px]">
          <RichTextContent value={module.summary} />
        </p>
      ) : null}

      {module.media ? <CaseStudyModuleMedia media={module.media} /> : null}

      {module.blocks?.length ? (
        <div className="mt-8 space-y-8 sm:mt-10 sm:space-y-10">
          {module.blocks.map((block) => (
            <CaseStudyBlockContent key={block.heading} block={block} />
          ))}
        </div>
      ) : null}
    </section>
  );
}

export function CaseStudyBody({ caseStudy }: { caseStudy: CaseStudy }) {
  const hasModules = Boolean(caseStudy.modules?.length);
  const hasSections = Boolean(caseStudy.sections?.length);

  return (
    <div className="mt-12 space-y-12 border-t border-foreground/10 pt-10 sm:mt-16 sm:space-y-16 sm:pt-14 md:mt-20 md:pt-16">
      {caseStudy.goal ? (
        <section className="reveal reveal-delay-1">
          <h2 className="font-sans text-[clamp(1.125rem,4vw,1.5rem)] font-semibold tracking-tight text-foreground">
            {caseStudy.goal.heading}
          </h2>
          <p className="mt-3 max-w-2xl font-sans text-[15px] leading-[1.65] text-pretty text-foreground/80 sm:mt-4 sm:text-[17px]">
            <RichTextContent value={caseStudy.goal.body} />
          </p>

          {caseStudy.goal.outcomes?.length ? (
            <div className="mt-6 max-w-2xl sm:mt-8">
              <h3 className="font-sans text-[clamp(1rem,3vw,1.125rem)] font-semibold tracking-tight text-foreground">
                Outcomes
              </h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 font-sans text-[15px] leading-[1.65] text-pretty text-foreground/80 marker:text-foreground/35 sm:mt-4 sm:space-y-3 sm:text-[17px]">
                {caseStudy.goal.outcomes.map((item) => (
                  <li key={richTextToPlain(item)} className="ps-1">
                    <RichTextContent value={item} />
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {hasModules ? (
            <nav
              aria-label="Projects in this case study"
              className="mt-8 max-w-2xl sm:mt-10"
            >
              <p className="font-sans text-[13px] font-medium tracking-tight text-foreground/45 sm:text-[14px]">
                Projects in this case study
              </p>
              <ol className="mt-3 space-y-2">
                {caseStudy.modules!.map((module) => (
                  <li key={module.id}>
                    <a
                      href={`#${module.id}`}
                      className="group inline-flex items-baseline gap-3 font-sans text-[15px] tracking-tight text-foreground transition-opacity hover:opacity-70 active:opacity-60 sm:text-[17px]"
                    >
                      <span className="text-[13px] font-medium tracking-[0.08em] text-foreground/40 sm:text-[14px]">
                        {module.index}
                      </span>
                      <span className="font-semibold underline decoration-foreground/20 underline-offset-4 group-hover:decoration-foreground/40">
                        {module.title}
                      </span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          ) : null}
        </section>
      ) : null}

      {hasModules ? (
        <div className="space-y-14 border-t border-foreground/10 pt-10 sm:space-y-20 sm:pt-14 md:pt-16">
          {caseStudy.modules!.map((module, index) => (
            <CaseStudyModuleContent
              key={module.id}
              module={module}
              index={index}
            />
          ))}
        </div>
      ) : null}

      {hasSections
        ? caseStudy.sections!.map((section, index) => (
            <section
              key={section.heading}
              className={`reveal reveal-delay-${Math.min(index + 1, 3)}`}
            >
              <CaseStudySectionContent section={section} />
            </section>
          ))
        : null}
    </div>
  );
}
