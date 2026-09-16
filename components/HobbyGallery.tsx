"use client";

import { useState } from "react";

type HobbyPhoto = {
  title: string;
  src?: string;
};

const HOBBY_PHOTOS: HobbyPhoto[] = [
  { title: "Photo one" },
  { title: "Photo two" },
  { title: "Photo three" },
  { title: "Photo four" },
  { title: "Photo five" },
];

/** Fanned resting angle per card, left to right. */
const BASE_ROTATIONS = [-9, -4, 2, 6, 10];

export function HobbyGallery() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="flex items-center justify-center py-4 sm:py-6">
      {HOBBY_PHOTOS.map((photo, index) => {
        const isHovered = hovered === index;
        const rotation = BASE_ROTATIONS[index] ?? 0;

        return (
          <div
            key={photo.title}
            className="relative -ml-8 cursor-pointer transition-transform duration-300 ease-out first:ml-0 sm:-ml-10"
            style={{
              transform: isHovered
                ? "translateY(-14px) rotate(0deg) scale(1.08)"
                : `rotate(${rotation}deg)`,
              zIndex: isHovered ? 50 : index,
            }}
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
          >
            <span
              className={`pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-foreground/15 bg-background px-3 py-1 font-mono text-[12px] text-foreground shadow-sm transition-opacity duration-200 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            >
              {photo.title}
            </span>

            <div className="rounded-md border border-foreground/10 bg-background p-2 shadow-md sm:p-2.5">
              <div className="flex size-24 items-center justify-center rounded-sm bg-foreground/10 text-center font-sans text-[11px] leading-tight text-foreground/35 sm:size-28 md:size-32">
                {photo.title}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
