import { DashlaneMobileDemo } from "@/components/dashlane/DashlaneMobileDemo";

const demos = [
  {
    title: "Onboarding",
    src: "/projects/dashlane-onboarding-demo.mp4",
    ariaLabel: "Dashlane onboarding product walkthrough",
  },
] as const;

export function GrowthVideoDemos() {
  return (
    <div className="space-y-12 sm:space-y-16">
      {demos.map((demo) => (
        <section key={demo.title} aria-label={`${demo.title} live demo`}>
          <h3 className="mb-8 font-sans text-[clamp(1.125rem,4vw,1.5rem)] font-semibold tracking-tight text-foreground">
            {demo.title}
          </h3>
          <div className="w-full overflow-hidden rounded-[20px] bg-[#f5f5f5] shadow-[0_6px_16px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.04)]">
            <video
              className="block h-auto w-full rounded-[20px]"
              src={demo.src}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              aria-label={demo.ariaLabel}
            />
          </div>
        </section>
      ))}
      <DashlaneMobileDemo />
    </div>
  );
}
