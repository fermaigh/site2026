"use client";

import { useRef } from "react";
import Image from "next/image";
import { LocalTime } from "@/components/LocalTime";

export function LandingTopBar() {
  const logoRef = useRef<HTMLDivElement>(null);

  const handleLogoHover = () => {
    if (!logoRef.current) return;

    // Pick a random animation variant
    const variants = ["coin-flip-1", "coin-flip-2", "coin-flip-3", "coin-flip-4"];
    const randomVariant = variants[Math.floor(Math.random() * variants.length)];

    // Reset animation by removing it, then adding it back
    logoRef.current.style.animation = "none";
    // Trigger reflow to restart animation
    void logoRef.current.offsetWidth;
    logoRef.current.style.animation = `${randomVariant} 2s cubic-bezier(0.34, 1.56, 0.64, 1) 1`;
  };

  return (
    <div className="reveal flex items-center justify-between gap-4 pb-6 pt-6 sm:pb-8 sm:pt-10 md:pb-10 md:pt-14">
      <div
        ref={logoRef}
        className="logo-hover"
        onMouseEnter={handleLogoHover}
      >
        <Image
          src="/site-icon.png"
          alt="Xiaoye Lin"
          width={24}
          height={24}
          priority
          className="block size-6 rounded-full"
        />
      </div>
      <LocalTime />
    </div>
  );
}
