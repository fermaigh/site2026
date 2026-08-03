import { projects } from "@/data/projects";
import { PageShell } from "@/components/PageShell";
import { SiteHero } from "@/components/SiteHero";
import { ProjectRow } from "@/components/ProjectRow";
import { SiteFooter } from "@/components/SiteFooter";

export default function Home() {
  return (
    <PageShell showHeader={false} showFooter={false}>
      <SiteHero />

      <div
        className="reveal reveal-delay-1 h-px w-full bg-foreground/10"
        aria-hidden
      />

      <main className="flex flex-col gap-10 py-8 sm:gap-12 sm:py-12 md:gap-16 md:py-16">
        {projects.map((project, index) => (
          <ProjectRow key={project.slug} project={project} index={index} />
        ))}
      </main>

      <SiteFooter />
    </PageShell>
  );
}
