import Link from "next/link";
import { PageShell } from "@/components/PageShell";

export default function AboutPage() {
  return (
    <PageShell>
      <article className="pb-24">
        <h1 className="reveal font-serif text-[clamp(2rem,5vw,2.75rem)] font-normal leading-tight tracking-tight text-foreground">
          About
        </h1>
        <p className="reveal reveal-delay-1 mt-8 max-w-lg font-sans text-[17px] leading-[1.65] text-foreground/80">
          Product designer focused on systems, clarity, and craft. This page is a
          layout study inspired by public portfolio patterns; replace this copy with
          your own story, resume, and links.
        </p>
        <p className="reveal reveal-delay-2 mt-6">
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
