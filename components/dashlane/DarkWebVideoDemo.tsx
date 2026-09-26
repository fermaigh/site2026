export function DarkWebVideoDemo() {
  return (
    <section aria-label="Dark Web Insight live demo">
      <h3 className="mb-8 font-sans text-[clamp(1.125rem,4vw,1.5rem)] font-semibold tracking-tight text-foreground">
        Dark Web Insight Dashboard
      </h3>
      <div className="w-full overflow-hidden rounded-[20px] bg-[#f5f5f5] shadow-[0_6px_16px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.04)]">
        <video
          className="block h-auto w-full rounded-[20px]"
          src="/projects/dark-web-insight-live-demo.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          aria-label="Dark Web Insight product walkthrough"
        />
      </div>
    </section>
  );
}
