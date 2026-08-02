import Image from "next/image";
import { LocalTime } from "@/components/LocalTime";

export function SiteHero() {
  return (
    <header className="reveal pb-8 pt-6 sm:pb-10 sm:pt-10 md:pb-12 md:pt-14">
      <div className="mb-6 flex justify-end sm:mb-8 md:mb-10">
        <LocalTime />
      </div>

      <div className="flex items-start gap-4 sm:items-center sm:gap-6 md:gap-8">
        {/* ~2× previous avatar sizes (56/80/96 → 112/160/192) */}
        <div className="relative size-28 shrink-0 overflow-hidden rounded-full bg-[#d9d9d9] sm:size-40 md:size-48">
          <Image
            src="/avatar.webp"
            alt="Xiaoye Lin"
            fill
            priority
            sizes="(max-width: 640px) 112px, (max-width: 768px) 160px, 192px"
            className="object-cover object-[50%_20%]"
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
            shall-yay
          </p>
          <p className="mt-2 max-w-xl font-sans text-[14px] leading-relaxed text-pretty text-foreground/70 sm:text-[15px] md:text-[16px]">
            AI native, design thoughtful, strategic and useful&nbsp;products
          </p>
        </div>
      </div>
    </header>
  );
}
