import Image from "next/image";
import { LandingTopBar } from "@/components/LandingTopBar";

export function SiteHero() {
  return (
    <header>
      <LandingTopBar />

      <div className="reveal reveal-delay-1 flex items-start gap-4 pb-8 sm:items-center sm:gap-6 sm:pb-10 md:gap-7 md:pb-12">
        {/* Previous sizes ÷ 1.5 (112/160/192 → 75/107/128). Circle stays on the page left edge. */}
        <div className="relative ml-0 size-[75px] shrink-0 overflow-hidden rounded-full bg-[#d9d9d9] sm:size-[107px] md:size-32">
          <Image
            src="/avatar.webp"
            alt="Xiaoye Lin"
            fill
            priority
            sizes="(max-width: 640px) 75px, (max-width: 768px) 107px, 128px"
            className="scale-[1.45] object-cover object-[33%_12%]"
          />
        </div>

        <div className="min-w-0 flex-1">
          <h1 className="font-sans text-[clamp(1.5rem,5.5vw,2.25rem)] font-semibold leading-tight tracking-tight text-foreground">
            Xiaoye Lin{" "}
            <span aria-hidden className="font-normal">
              👋
            </span>
          </h1>
          <p className="mt-1 font-sans text-[14px] italic text-foreground/45 sm:text-[15px]">
            pronounced as &ldquo;shall-yay&rdquo;
          </p>
          <p className="mt-2 max-w-xl font-sans text-[14px] leading-relaxed text-pretty text-foreground/70 sm:text-[15px] md:text-[16px]">
            AI native, design thoughtful, strategic and useful products for
            10+&nbsp;years
          </p>
        </div>
      </div>
    </header>
  );
}
