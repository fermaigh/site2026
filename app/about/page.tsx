import { PageShell } from "@/components/PageShell";

export default function AboutPage() {
  return (
    <PageShell>
      <article className="pb-16 sm:pb-24">
        <div className="reveal mt-8 max-w-2xl space-y-5 font-sans text-[15px] leading-[1.65] text-pretty text-foreground/80 sm:space-y-6 sm:text-[17px]">
          <p>Based in Bellevue, Washington.</p>

          <p>
            I’ve spent the past decade designing digital products, turning
            complex problems into intuitive, easy-to-use experiences. I care
            deeply about the details—not only how a product works, but how it
            looks and feels.
          </p>

          <p>
            Lately, I’ve been building more in code, moving beyond Figma to
            prototype and ship ideas faster. I love seeing ideas go from concept
            to something real.
          </p>

          <p>
            I’m a minimalist and a forever lover of muted everything. Black,
            white, and grey are usually my thing—except when I’m doodling.
          </p>

          <p>
            Outside of work, I spend probably too much time on custom mechanical
            keyboards. It’s one of my favorite ways to spend a rainy day in the
            Pacific&nbsp;Northwest.
          </p>
        </div>

        <p className="reveal reveal-delay-1 mt-8">
          <a
            href="/Resume_XiaoyeLin.pdf"
            download="Resume_XiaoyeLin.pdf"
            className="inline-flex min-h-11 items-center rounded-full border border-foreground/15 bg-foreground px-5 font-sans text-[14px] font-medium text-background transition-opacity hover:opacity-80 active:opacity-70"
          >
            Download resume
          </a>
        </p>
      </article>
    </PageShell>
  );
}
