import { PageShell } from "@/components/PageShell";

const highlights = [
  "Designed multiple 0→1 products and scaled core experiences across the TikTok Shop Affiliate ecosystem.",
  "Led end-to-end design for seller, creator, and agency workflows, including AI-powered experiences and managed collaboration services.",
  "Drove cross-functional alignment across product, engineering, research, content design, and business stakeholders to deliver complex, high-impact initiatives.",
  "Delivered measurable business outcomes, including increased adoption, creator engagement, seller collaboration, and GMV growth.",
];

export default function AboutPage() {
  return (
    <PageShell>
      <article className="pb-16 sm:pb-24">
        <h1 className="reveal font-sans text-[clamp(2rem,5vw,2.75rem)] font-semibold leading-tight tracking-tight text-foreground">
          About
        </h1>

        <p className="reveal reveal-delay-1 mt-8 max-w-2xl font-sans text-[15px] leading-[1.65] text-pretty text-foreground/80 sm:text-[17px]">
          I&apos;ve been designing products for one of the world&apos;s largest
          creator commerce platforms. I lead the design of complex B2B
          experiences that enable sellers, creators, and agencies to collaborate
          more effectively, from campaign tools and management to AI-powered
          seller tools. My work combines systems thinking, product strategy, and
          execution to ship scalable solutions that improve user adoption,
          operational efficiency, and business growth across global&nbsp;markets.
        </p>

        <p className="reveal reveal-delay-2 mt-8">
          <a
            href="/Resume_2026.pdf"
            download="Resume_2026.pdf"
            className="inline-flex min-h-11 items-center rounded-full border border-foreground/15 bg-foreground px-5 font-sans text-[14px] font-medium text-background transition-opacity hover:opacity-80 active:opacity-70"
          >
            Download resume
          </a>
        </p>

        <section className="reveal reveal-delay-3 mt-12 max-w-2xl sm:mt-14">
          <h2 className="font-sans text-[clamp(1.125rem,3vw,1.35rem)] font-semibold tracking-tight text-foreground">
            Highlights
          </h2>
          <ul className="mt-5 list-disc space-y-4 pl-5 font-sans text-[15px] leading-[1.65] text-foreground/80 marker:text-foreground/35 sm:text-[17px]">
            {highlights.map((item) => (
              <li key={item} className="ps-1 text-pretty">
                {item}
              </li>
            ))}
          </ul>
        </section>
      </article>
    </PageShell>
  );
}
