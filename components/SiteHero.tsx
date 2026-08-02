import { LocalTime } from "@/components/LocalTime";

export function SiteHero() {
  return (
    <header className="reveal pb-10 pt-10 md:pb-12 md:pt-14">
      <div className="mb-8 flex justify-end md:mb-10">
        <LocalTime />
      </div>

      <div className="flex items-center gap-5 md:gap-7">
        <div
          className="size-20 shrink-0 rounded-full bg-[#d9d9d9] md:size-[96px]"
          role="img"
          aria-label="Avatar placeholder"
        />

        <div className="min-w-0">
          <h1 className="font-sans text-[clamp(1.75rem,4vw,2.25rem)] font-semibold leading-tight tracking-tight text-foreground">
            Xiaoye Lin{" "}
            <span aria-hidden className="font-normal">
              👋
            </span>
          </h1>
          <p className="mt-1 font-sans text-[15px] italic text-foreground/45">
            shall-yay
          </p>
          <p className="mt-2 max-w-xl font-sans text-[15px] leading-relaxed text-foreground/70 md:text-[16px]">
            AI native, design thoughtful, strategic and useful products
          </p>
        </div>
      </div>
    </header>
  );
}
