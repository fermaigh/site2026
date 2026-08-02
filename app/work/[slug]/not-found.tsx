import { PageShell } from "@/components/PageShell";

export default function CaseStudyNotFound() {
  return (
    <PageShell>
      <article className="pb-24">
        <h1 className="font-sans text-[clamp(2rem,5vw,2.75rem)] font-semibold tracking-tight text-foreground">
          Case study not found
        </h1>
        <p className="mt-6 max-w-lg font-sans text-[15px] leading-[1.65] text-pretty text-foreground/80 sm:text-[17px]">
          That project doesn&apos;t have a case study page yet.
        </p>
      </article>
    </PageShell>
  );
}
