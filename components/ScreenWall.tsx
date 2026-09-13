"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import type { CaseStudyGallery, GalleryScreen } from "@/data/projects";

/** Per-column drift direction and strength; alternating signs read as parallax. */
const COLUMN_SPEEDS: Record<number, number[]> = {
  2: [-0.7, 0.55],
  3: [-0.9, 0.7, -0.6],
  5: [-1, 0.6, -0.75, 0.85, -0.5],
};

/** Static stagger so columns start at different heights, like a pinned collage. */
const COLUMN_OFFSETS: Record<number, number[]> = {
  2: [0, 28],
  3: [0, 34, 14],
  5: [0, 40, 12, 56, 24],
};

/** Phone tiles take this share of their column width. */
const PHONE_TILE_WIDTH = 0.52;

/** Two columns of twenty slivers reads as noise, so phones get a subset. */
const PHONE_LIMIT = 10;

function amplitudeFor(width: number) {
  if (width < 640) return 40;
  if (width < 1024) return 64;
  return 92;
}

function useColumnCount() {
  // Starts at the desktop count so SSR and first client render agree; the
  // section sits far below the fold, so a narrow viewport never shows the swap.
  const [cols, setCols] = useState(5);

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 1024px)");
    const mid = window.matchMedia("(min-width: 640px)");
    const sync = () => setCols(wide.matches ? 5 : mid.matches ? 3 : 2);

    sync();
    wide.addEventListener("change", sync);
    mid.addEventListener("change", sync);
    return () => {
      wide.removeEventListener("change", sync);
      mid.removeEventListener("change", sync);
    };
  }, []);

  return cols;
}

/** Shortest-column-first, measured in rendered height (aspect ratio at a fixed
 *  column width), so columns finish at roughly the same depth. */
function distribute(screens: GalleryScreen[], cols: number) {
  const buckets: GalleryScreen[][] = Array.from({ length: cols }, () => []);
  const depths = new Array<number>(cols).fill(0);

  for (const screen of screens) {
    let shortest = 0;
    for (let i = 1; i < cols; i++) {
      if (depths[i] < depths[shortest]) shortest = i;
    }
    buckets[shortest].push(screen);
    // Phones occupy less width, so they are proportionally shorter too.
    const fraction = screen.kind === "phone" ? PHONE_TILE_WIDTH : 1;
    depths[shortest] += (screen.height / screen.width) * fraction;
  }

  return buckets;
}

export function ScreenWall({ gallery }: { gallery: CaseStudyGallery }) {
  const sectionRef = useRef<HTMLElement>(null);
  const columnRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cols = useColumnCount();

  const screens = useMemo(
    () => (cols === 2 ? gallery.screens.slice(0, PHONE_LIMIT) : gallery.screens),
    [gallery.screens, cols],
  );
  const buckets = useMemo(() => distribute(screens, cols), [screens, cols]);
  const offsets = COLUMN_OFFSETS[cols] ?? COLUMN_OFFSETS[5];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const speeds = COLUMN_SPEEDS[cols] ?? COLUMN_SPEEDS[5];
    const shifts = new Array<number>(cols).fill(0);
    let frame = 0;
    let running = false;

    const tick = () => {
      const rect = section.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      // 0 as the section enters from below, 1 as it clears the top.
      const travel = (viewport - rect.top) / (viewport + rect.height);
      const progress = Math.max(-1, Math.min(1, travel * 2 - 1));
      const amplitude = amplitudeFor(window.innerWidth);

      for (let i = 0; i < cols; i++) {
        const target = progress * amplitude * (speeds[i] ?? 0);
        // Ease toward the target so the wall glides instead of tracking 1:1.
        shifts[i] += (target - shifts[i]) * 0.12;
        columnRefs.current[i]?.style.setProperty(
          "--wall-shift",
          `${shifts[i].toFixed(2)}px`,
        );
      }

      frame = running ? requestAnimationFrame(tick) : 0;
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          if (running) return;
          running = true;
          frame = requestAnimationFrame(tick);
        } else {
          running = false;
          if (frame) cancelAnimationFrame(frame);
          frame = 0;
        }
      },
      { rootMargin: "15% 0px" },
    );
    observer.observe(section);

    return () => {
      observer.disconnect();
      running = false;
      if (frame) cancelAnimationFrame(frame);
    };
  }, [cols]);

  return (
    <section ref={sectionRef}>
      <h3 className="font-sans text-[clamp(1.125rem,4vw,1.5rem)] font-semibold tracking-tight text-foreground">
        {gallery.heading}
      </h3>
      {gallery.caption ? (
        <p className="mt-2 max-w-xl font-sans text-[14px] leading-relaxed text-pretty text-foreground/55 sm:mt-3 sm:text-[15px]">
          {gallery.caption}
        </p>
      ) : null}

      <div
        className="screen-wall mt-6 sm:mt-8"
        role="img"
        aria-label={gallery.summary}
      >
        <div
          className="screen-wall-grid"
          style={{ "--wall-cols": cols } as CSSProperties}
        >
          {buckets.map((bucket, column) => (
            <div
              key={column}
              ref={(node) => {
                columnRefs.current[column] = node;
              }}
              className="screen-wall-col"
              style={
                { "--wall-offset": `${offsets[column] ?? 0}px` } as CSSProperties
              }
            >
              {bucket.map((screen) => (
                <figure
                  key={screen.src}
                  className="screen-wall-item"
                  data-tone={screen.tone ?? "light"}
                  data-kind={screen.kind ?? "browser"}
                >
                  <Image
                    src={screen.src}
                    alt=""
                    width={screen.width}
                    height={screen.height}
                    sizes={
                      screen.kind === "phone"
                        ? "(max-width: 640px) 24vw, (max-width: 1024px) 16vw, 115px"
                        : "(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 220px"
                    }
                    // Placeholder screens are SVG; the optimizer declines those.
                    // Real raster exports drop this and optimize normally.
                    unoptimized={screen.src.endsWith(".svg")}
                  />
                </figure>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
