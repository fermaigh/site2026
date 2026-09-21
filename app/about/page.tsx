"use client";

import { useRef, useEffect } from "react";
import { PageShell } from "@/components/PageShell";
import { HobbyGallery } from "@/components/HobbyGallery";

const EMAIL_HREF = "mailto:fermaigh@gmail.com";

export default function AboutPage() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5;
    }
  }, []);

  return (
    <PageShell>
      <article className="pb-16 sm:pb-24">
        <div className="grid gap-8 md:gap-12 lg:gap-16 md:grid-cols-2 md:items-start">
          <div>
            <div className="reveal mt-8 space-y-5 font-sans text-[15px] leading-[1.65] text-pretty text-foreground/80 sm:space-y-6 sm:text-[17px]">
              <p>
                I&apos;ve spent the past decade working on products where complexity
                is unavoidable—from enterprise security and hiring systems to a
                marketplace connecting millions of sellers and creators.
              </p>

              <p>
                I tend to work best in ambiguous spaces: mapping systems, finding
                the simplest product model underneath them, and staying close
                enough to execution to make sure the details hold together.
              </p>

              <p>
                More recently, AI and code have changed how I work. I&apos;m moving
                beyond static design deliverables into prototypes and production,
                shortening the distance between an idea and something people can
                actually use.
              </p>
            </div>

            <div className="reveal reveal-delay-1 mt-8 flex flex-wrap items-center gap-3">
              <a
                href="/Resume_XiaoyeLin.pdf"
                download="Resume_XiaoyeLin.pdf"
                className="inline-flex min-h-11 items-center rounded-full border border-foreground/15 bg-foreground px-5 font-sans text-[14px] font-medium text-background transition-opacity hover:opacity-80 active:opacity-70"
              >
                Download resume
              </a>
              <a
                href={EMAIL_HREF}
                className="inline-flex min-h-11 items-center rounded-full border border-foreground/15 px-5 font-sans text-[14px] font-medium text-foreground transition-opacity hover:opacity-70 active:opacity-60"
              >
                Email me
              </a>
            </div>
          </div>

          <div className="reveal reveal-delay-1 md:reveal-delay-2 mt-8 md:mt-0 w-full aspect-square rounded-full overflow-hidden">
            <video
              ref={videoRef}
              src="/about-demo.mov"
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
              style={{ backgroundColor: "transparent" }}
            />
          </div>
        </div>

        <section className="reveal reveal-delay-2 mt-16 sm:mt-20 md:mt-24">
          <h2 className="font-sans text-[clamp(1.125rem,4vw,1.5rem)] font-semibold tracking-tight text-foreground">
            Outside of work
          </h2>
          <HobbyGallery />
        </section>
      </article>
    </PageShell>
  );
}
