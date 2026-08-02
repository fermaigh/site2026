import { LocalTime } from "@/components/LocalTime";

export function SiteHero() {
  return (
    <header className="reveal pb-8 pt-6 sm:pb-10 sm:pt-10 md:pb-12 md:pt-14">
      <div className="mb-6 flex justify-end sm:mb-8 md:mb-10">
        <LocalTime />
      </div>

      <div className="flex flex-col gap-5 min-[480px]:flex-row min-[480px]:items-center min-[480px]:gap-6 md:gap-7">
        <div
          className="size-16 shrink-0 rounded-full bg-[#d9d9d9] sm:size-20 md:size-[96px]"
          role="img"
          aria-label="Avatar placeholder"
        />

        <div className="min-w-0 flex-1">
          <h1 className="font-sans text-[clamp(1.625rem,6vw,2.25rem)] font-semibold leading-tight tracking-tight text-foreground">
            Xiaoye Lin{" "}
            <span aria-hidden className="font-normal">
              👋
            </span>
          </h1>
          <p className="mt-1 font-sans text-[14px] italic text-foreground/45 sm:text-[15px]">
            shall-yay
          </p>
          <p className="mt-2 max-w-xl font-sans text-[14px] leading-relaxed text-foreground/70 sm:text-[15px] md:text-[16px]">
            AI native, design thoughtful, strategic and useful products
          </p>
        </div>
      </div>
    </header>
  );
}
