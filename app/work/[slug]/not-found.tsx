import Link from "next/link";
import { PageShell } from "@/components/PageShell";

export default function CaseStudyNotFound() {
  return (
    <PageShell>
      <article className="pb-24">
        <h1 className="font-serif text-[clamp(2rem,5vw,2.75rem)] font-normal tracking-tight text-foreground">
          Case study not found
        </h1>
        <p className="mt-6 max-w-lg font-sans text-[17px] leading-[1.65] text-foreground/80">
          That project doesn’t have a case study page yet.
        </p>
        <p className="mt-8">
          <Link
            href="/"
            className="font-sans text-[15px] font-medium text-foreground underline decoration-black/20 underline-offset-4 transition-colors hover:decoration-foreground/40 dark:decoration-white/20"
          >
            ← Back home
          </Link>
        </p>
      </article>
    </PageShell>
  );
}
