import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export default function AboutPage() {
  return (
    <div className="flex min-h-full flex-1 flex-col px-5 md:px-8">
      <div className="mx-auto w-full max-w-[720px] flex-1">
        <SiteHeader />

        <article className="pb-24">
          <h1 className="font-serif text-[clamp(2rem,5vw,2.75rem)] font-normal leading-tight tracking-tight text-foreground">
            About
          </h1>
          <p className="mt-8 max-w-lg font-sans text-[17px] leading-[1.65] text-foreground/80">
            Product designer focused on systems, clarity, and craft. This page is a
            layout study inspired by public portfolio patterns; replace this copy with
            your own story, resume, and links.
          </p>
          <p className="mt-6">
            <Link
              href="/"
              className="font-sans text-[15px] font-medium text-foreground underline decoration-black/20 underline-offset-4 transition-colors hover:decoration-foreground/40 dark:decoration-white/20"
            >
              ← Back home
            </Link>
          </p>
        </article>

        <SiteFooter />
      </div>
    </div>
  );
}
