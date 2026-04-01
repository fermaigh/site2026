import Image from "next/image";
import { projects } from "@/data/projects";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ProjectSection } from "@/components/ProjectSection";

export default function Home() {
  return (
    <div className="flex min-h-full flex-1 flex-col px-5 md:px-8">
      <div className="mx-auto w-full max-w-[720px] flex-1">
        <SiteHeader />

        <div className="pb-4 md:pb-8">
          <div className="relative mx-auto mb-8 h-28 w-28 overflow-hidden rounded-full bg-zinc-200 ring-1 ring-black/[0.06] dark:bg-zinc-800 dark:ring-white/10 md:h-32 md:w-32">
            <Image
              src="/profile.svg"
              alt="Profile photo"
              width={128}
              height={128}
              className="h-full w-full object-cover"
              priority
            />
          </div>

          <h1 className="font-serif text-[clamp(2rem,5vw,2.75rem)] font-normal leading-[1.1] tracking-tight text-foreground">
            Jason Kim
          </h1>
          <p className="mt-4 max-w-lg font-sans text-[17px] leading-relaxed text-foreground/75">
            Product Designer at Google DeepMind
          </p>
          <p className="mt-2 font-sans text-[15px] text-foreground/45">
            Previously at Figma, Instagram, Microsoft
          </p>
        </div>

        <main>
          {projects.map((project) => (
            <ProjectSection key={project.slug} project={project} />
          ))}
        </main>

        <SiteFooter />
      </div>
    </div>
  );
}
