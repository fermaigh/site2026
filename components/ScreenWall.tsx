"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import type { CaseStudyGallery, GalleryScreen } from "@/data/projects";

/** Per-column drift direction and strength; alternating signs read as parallax. */
const COLUMN_SPEEDS: Record<number, number[]> = {
  2: [-1, 0.7],
  3: [-1, 0.62, -0.8],
};

/** Static stagger, as a share of the crop, so columns start at different
 *  heights without ever exposing the top of a column. */
const OFFSET_FRACTIONS: Record<number, number[]> = {
  2: [0, 0.14],
  3: [0, 0.14, 0.06],
};

/** Two columns of nineteen reads as an endless ribbon on a phone. */
const PHONE_LIMIT = 10;

/** Share of the overflow spent cropping the top of the wall. The rest is
 *  headroom the columns travel through. */
const CROP_SHARE = 0.4;

function useColumnCount() {
  // Starts at the desktop count so SSR and the first client render agree; the
  // wall sits far below the fold, so a narrow viewport never shows the swap.
  const [cols, setCols] = useState(3);

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 1024px)");
    const sync = () => setCols(wide.matches ? 3 : 2);
    sync();
    wide.addEventListener("change", sync);
    return () => wide.removeEventListener("change", sync);
  }, []);

  return cols;
}

/** Shortest-column-first by rendered height (aspect ratio at a fixed column
 *  width), so columns finish at roughly the same depth. */
function distribute(screens: GalleryScreen[], cols: number) {
  const buckets: GalleryScreen[][] = Array.from({ length: cols }, () => []);
  const depths = new Array<number>(cols).fill(0);

  for (const screen of screens) {
    let shortest = 0;
    for (let i = 1; i < cols; i++) {
      if (depths[i] < depths[shortest]) shortest = i;
    }
    buckets[shortest].push(screen);
    depths[shortest] += screen.height / screen.width;
  }

  return buckets;
}

export function ScreenWall({ gallery }: { gallery: CaseStudyGallery }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const columnRefs = useRef<(HTMLDivElement | null)[]>([]);
  // Max travel, derived from real geometry rather than guessed, so the wall
  // can never drift far enough to expose a column edge.
  const amplitudeRef = useRef(0);
  const cols = useColumnCount();

  const screens = useMemo(
    () => (cols === 2 ? gallery.screens.slice(0, PHONE_LIMIT) : gallery.screens),
    [gallery.screens, cols],
  );
  const buckets = useMemo(() => distribute(screens, cols), [screens, cols]);

  // Measure, then derive the crop, the per-column stagger, and the travel that
  // all three can afford. Re-runs whenever images finish loading or the wall
  // is resized.
  useEffect(() => {
    const frame = frameRef.current;
    const grid = gridRef.current;
    if (!frame || !grid) return;

    const fractions = OFFSET_FRACTIONS[cols] ?? OFFSET_FRACTIONS[3];
    const speeds = COLUMN_SPEEDS[cols] ?? COLUMN_SPEEDS[3];

    const measure = () => {
      const frameHeight = frame.getBoundingClientRect().height;
      const heights = columnRefs.current
        .slice(0, cols)
        .map((el) => el?.getBoundingClientRect().height ?? 0);
      if (!frameHeight || heights.some((h) => h <= 0)) return;

      // The shortest column is what limits everything.
      const overflow = Math.min(...heights) - frameHeight;
      if (overflow <= 0) {
        grid.style.setProperty("--wall-crop", "0px");
        amplitudeRef.current = 0;
        return;
      }

      const crop = overflow * CROP_SHARE;
      grid.style.setProperty("--wall-crop", `${crop.toFixed(1)}px`);

      let travel = Infinity;
      for (let i = 0; i < cols; i++) {
        const offset = crop * (fractions[i] ?? 0);
        columnRefs.current[i]?.style.setProperty(
          "--wall-offset",
          `${offset.toFixed(1)}px`,
        );
        // Down-travel is limited by what sits above the frame, up-travel by
        // what sits below it.
        const room = Math.min(crop - offset, overflow - crop + offset);
        travel = Math.min(travel, room / Math.max(Math.abs(speeds[i] ?? 1), 0.01));
      }
      amplitudeRef.current = Math.max(0, travel * 0.85);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(grid);
    observer.observe(frame);
    window.addEventListener("resize", measure);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [cols, screens]);

  // Scroll-linked drift, running only while the wall is on screen.
  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const speeds = COLUMN_SPEEDS[cols] ?? COLUMN_SPEEDS[3];
    const shifts = new Array<number>(cols).fill(0);
    let raf = 0;
    let running = false;

    const tick = () => {
      const rect = frame.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      // 0 as the wall enters from below, 1 as it clears the top.
      const travel = (viewport - rect.top) / (viewport + rect.height);
      const progress = Math.max(-1, Math.min(1, travel * 2 - 1));

      for (let i = 0; i < cols; i++) {
        const target = progress * amplitudeRef.current * (speeds[i] ?? 0);
        // Ease toward the target so the wall glides instead of tracking 1:1.
        shifts[i] += (target - shifts[i]) * 0.12;
        columnRefs.current[i]?.style.setProperty(
          "--wall-shift",
          `${shifts[i].toFixed(2)}px`,
        );
      }

      raf = running ? requestAnimationFrame(tick) : 0;
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          if (running) return;
          running = true;
          raf = requestAnimationFrame(tick);
        } else {
          running = false;
          if (raf) cancelAnimationFrame(raf);
          raf = 0;
        }
      },
      { rootMargin: "15% 0px" },
    );
    observer.observe(frame);

    return () => {
      observer.disconnect();
      running = false;
      if (raf) cancelAnimationFrame(raf);
    };
  }, [cols]);

  return (
    <section>
      {gallery.caption ? (
        <p className="w-full font-sans text-[15px] leading-[1.65] text-pretty text-foreground/80 sm:text-[17px]">
          {gallery.caption}
        </p>
      ) : null}

      <div
        ref={frameRef}
        className="screen-wall mt-6 sm:mt-8"
        role="img"
        aria-label={gallery.summary}
      >
        <div
          ref={gridRef}
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
            >
              {bucket.map((screen) => (
                <figure key={screen.src} className="screen-wall-item">
                  <Image
                    src={screen.src}
                    alt=""
                    width={screen.width}
                    height={screen.height}
                    sizes="(max-width: 640px) 46vw, (max-width: 1024px) 48vw, 380px"
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
