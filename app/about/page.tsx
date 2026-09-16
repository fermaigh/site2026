"use client";

import { useRef, useEffect } from "react";
import { PageShell } from "@/components/PageShell";

const EMAIL_HREF = "mailto:fermaigh@gmail.com";

const HOBBY_PHOTOS = [
  { alt: "Hobby photo 1" },
  { alt: "Hobby photo 2" },
  { alt: "Hobby photo 3" },
  { alt: "Hobby photo 4" },
  { alt: "Hobby photo 5" },
];

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
              <p>Hi there! Based in Bellevue, Washington.</p>

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

          <div className="reveal reveal-delay-1 md:reveal-delay-2 mt-8 md:mt-0">
            <video
              ref={videoRef}
              src="/about-demo.mov"
              autoPlay
              muted
              loop
              playsInline
              className="w-full aspect-square object-contain"
              style={{ backgroundColor: "transparent" }}
            />
          </div>
        </div>

        <section className="reveal reveal-delay-2 mt-16 sm:mt-20 md:mt-24">
          <h2 className="font-sans text-[clamp(1.125rem,4vw,1.5rem)] font-semibold tracking-tight text-foreground">
            Outside of work
          </h2>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:grid-cols-3 sm:gap-4 md:grid-cols-5">
            {HOBBY_PHOTOS.map((photo, index) => (
              <div
                key={photo.alt}
                className={`relative aspect-square overflow-hidden rounded-xl bg-[#d9d9d9] sm:rounded-2xl ${
                  index === 0 ? "col-span-2 sm:col-span-1" : ""
                }`}
              >
                <div className="absolute inset-0 flex items-center justify-center font-sans text-[13px] text-foreground/35">
                  {photo.alt}
                </div>
              </div>
            ))}
          </div>
        </section>
      </article>
    </PageShell>
  );
}
