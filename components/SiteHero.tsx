import Image from "next/image";
import { LocalTime } from "@/components/LocalTime";

export function SiteHero() {
  return (
    <header className="reveal pb-8 pt-6 sm:pb-10 sm:pt-10 md:pb-12 md:pt-14">
      <div className="mb-6 flex justify-end sm:mb-8 md:mb-10">
        <LocalTime />
      </div>

      <div className="flex items-start gap-4 sm:items-center sm:gap-6 md:gap-7">
        {/* Previous sizes ÷ 1.5 (112/160/192 → 75/107/128) */}
        <div className="relative size-[75px] shrink-0 translate-x-[15%] overflow-hidden rounded-full bg-[#d9d9d9] sm:size-[107px] md:size-32">
          <Image
            src="/avatar.webp"
            alt="Xiaoye Lin"
            fill
            priority
            sizes="(max-width: 640px) 75px, (max-width: 768px) 107px, 128px"
            className="scale-[1.45] object-cover object-[48%_12%] translate-x-[15%]"
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
