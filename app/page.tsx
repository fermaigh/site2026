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
        className="reveal reveal-delay-1 h-px w-full bg-black/[0.1]"
        aria-hidden
      />

      <main className="flex flex-col gap-12 py-12 md:gap-16 md:py-16">
        {projects.map((project, index) => (
          <ProjectRow key={project.slug} project={project} index={index} />
        ))}
      </main>

      <SiteFooter />
    </PageShell>
  );
}
