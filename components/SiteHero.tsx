import { LandingTopBar } from "@/components/LandingTopBar";
import { VideoAvatarFrame } from "@/components/VideoAvatarFrame";
import { PronunciationAudio } from "@/components/PronunciationAudio";

export function SiteHero() {
  return (
    <header>
      <LandingTopBar />

      <div className="reveal reveal-delay-1 hero-section flex items-start gap-4 pb-8 sm:items-center sm:gap-6 sm:pb-10 md:gap-7 md:pb-12">
        <VideoAvatarFrame />

        <div className="min-w-0 flex-1">
          <h1 className="font-sans text-[clamp(1.5rem,5.5vw,2.25rem)] font-semibold leading-tight tracking-tight text-foreground">
            Xiaoye Lin{" "}
            <span aria-hidden className="font-normal wave-emoji inline-block origin-[70%_70%]">
              👋
            </span>
          </h1>
          <p className="mt-1 font-sans text-[14px] italic text-foreground/45 sm:text-[15px]">
            <PronunciationAudio />
          </p>
          <p className="mt-2 max-w-xl font-sans text-[14px] leading-relaxed text-pretty text-foreground/70 sm:text-[15px] md:text-[16px]">
            Product designer turning complex systems into thoughtful, scalable
            products, from marketplaces and enterprise software to AI-native
            experiences.
          </p>
        </div>
      </div>
    </header>
  );
}
