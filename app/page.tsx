import { Divider } from "@astryxdesign/core/Divider";
import { VStack } from "@astryxdesign/core/VStack";
import { projects } from "@/data/projects";
import { PageShell } from "@/components/PageShell";
import { SiteHero } from "@/components/SiteHero";
import { ProjectRow } from "@/components/ProjectRow";
import { SiteFooter } from "@/components/SiteFooter";

export default function Home() {
  return (
    <PageShell showHeader={false} showFooter={false}>
      <SiteHero />

      <Divider className="reveal reveal-delay-1" />

      <VStack
        as="main"
        gap={10}
        className="py-8 sm:gap-12 sm:py-12 md:gap-16 md:py-16"
      >
        {projects.map((project, index) => (
          <ProjectRow key={project.slug} project={project} index={index} />
        ))}
      </VStack>

      <SiteFooter />
    </PageShell>
  );
}
