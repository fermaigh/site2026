import type { Metadata } from "next";
import { NotFoundToy } from "@/components/NotFoundToy";
import { PageShell } from "@/components/PageShell";
import { TransitionLink } from "@/components/TransitionLink";

export const metadata: Metadata = {
  title: "Page not found — Xiaoye Lin",
};

export default function NotFound() {
  return (
    <PageShell>
      <article className="pb-16 sm:pb-24">
        <div className="reveal">
          <NotFoundToy />
        </div>

        <h1 className="reveal reveal-delay-1 mt-10 font-sans text-[clamp(1.75rem,6vw,2.75rem)] font-semibold leading-[1.1] tracking-tight text-foreground sm:mt-12">
          Page not found
        </h1>
        <p className="reveal reveal-delay-2 mt-4 max-w-md font-sans text-[15px] leading-[1.65] text-pretty text-foreground/80 sm:mt-5 sm:text-[17px]">
          This link is broken, or the page has moved. Everything else is still
          where it should be.
        </p>

        <p className="reveal reveal-delay-3 mt-7 sm:mt-8">
          <TransitionLink
            href="/"
            className="inline-flex min-h-11 items-center rounded-full border border-foreground/15 bg-foreground px-5 font-sans text-[14px] font-medium text-background transition-opacity hover:opacity-80 active:opacity-70"
          >
            Back to work
          </TransitionLink>
        </p>
      </article>
    </PageShell>
  );
}
