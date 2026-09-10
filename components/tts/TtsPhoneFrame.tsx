"use client";

/**
 * Titanium iPhone shell used by the two side-by-side mobile screens in demo 3
 * (Figma frames 1668:51416 and 1668:54121, both 409x843 with a 52px screen
 * radius). The screen is a plain 390px-wide clip so each screen component can
 * be authored at its native design width.
 */
export function TtsPhoneFrame({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <div
      className="relative h-[844px] w-[410px] shrink-0"
      role="img"
      aria-label={label}
    >
      {/* titanium band */}
      <div className="absolute inset-0 rounded-[62px] bg-[linear-gradient(150deg,#f4f0e4_0%,#cbc5b1_28%,#8f8979_58%,#d8d3c0_78%,#efebdd_100%)] shadow-[0_18px_40px_rgba(0,0,0,0.18),0_2px_6px_rgba(0,0,0,0.12)]" />
      <div className="absolute inset-[1px] rounded-[61px] border border-[#524b40]/40" />
      {/* screen bezel */}
      <div className="absolute inset-[4px] rounded-[58px] bg-[#000100]" />
      <div className="absolute inset-[5px] rounded-[57px] border border-white/25" />

      {/* screen */}
      <div className="absolute inset-[10px] overflow-hidden rounded-[52px] bg-black">
        {children}
      </div>

      {/* dynamic island sits above the screen content */}
      <div className="absolute left-1/2 top-[24px] z-30 h-[31px] w-[111px] -translate-x-1/2 rounded-[999px] bg-black" />
      <div className="absolute left-[calc(50%+30px)] top-[35px] z-30 size-[9px] rounded-full bg-[#0b1114]" />

      {/* side buttons (Figma 1668:51417) */}
      <div className="absolute left-[-2px] top-[149px] h-[31px] w-[5px] rounded-l-[2px] bg-[#f0ece3]" />
      <div className="absolute left-[-2px] top-[209px] h-[56px] w-[5px] rounded-l-[2px] bg-[#f0ece3]" />
      <div className="absolute left-[-2px] top-[282px] h-[56px] w-[5px] rounded-l-[2px] bg-[#f0ece3]" />
      <div className="absolute right-[-2px] top-[246px] h-[100px] w-[5px] rounded-r-[2px] bg-[#f0ece3]" />
    </div>
  );
}

/**
 * Raster art from the Figma frames (3D renders, product and creator photos).
 * The exports are not committed yet, so the slot paints a tinted placeholder
 * and layers the real file over it as soon as one lands at `src`. Painting it
 * as a background rather than an <img> keeps a missing file silent instead of
 * rendering a broken-image glyph, and leaves positioning to the caller.
 */
export function TtsShot({
  src,
  className,
  tone = "light",
  style,
}: {
  src: string;
  className?: string;
  tone?: "light" | "gold" | "soft" | "dark";
  style?: React.CSSProperties;
}) {
  // "soft" stands in for a cut-out 3D render: it must not blot out the copy
  // it overlaps, so it fades to transparent instead of filling its box.
  const placeholder =
    tone === "gold"
      ? "linear-gradient(135deg, #7a5f24 0%, #b9922f 45%, #33270f 100%)"
      : tone === "soft"
        ? "radial-gradient(circle at 62% 42%, rgba(214, 172, 78, 0.5) 0%, rgba(184, 141, 52, 0.22) 45%, rgba(184, 141, 52, 0) 72%)"
        : tone === "dark"
          ? "linear-gradient(135deg, #2c2a27 0%, #3a3631 52%, #232221 100%)"
          : "linear-gradient(135deg, #ededed 0%, #dadada 50%, #e9e9e9 100%)";

  return (
    <span
      className={`block overflow-hidden bg-cover bg-center bg-no-repeat ${
        className ?? ""
      }`}
      style={{ backgroundImage: `url("${src}"), ${placeholder}`, ...style }}
      aria-hidden
    />
  );
}
