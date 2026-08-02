/**
 * Same glyph and clipped dual-arrow hover as the landing HoverArrow,
 * rotated so it points left (flat) instead of upper-right.
 */
export function HoverBackArrow({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`relative inline-block size-[0.85em] shrink-0 overflow-hidden align-[-0.05em] ${className}`}
    >
      <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-x-[110%] group-active:-translate-x-[110%]">
        <span className="inline-block rotate-[135deg]">↗</span>
      </span>
      <span className="absolute inset-0 flex items-center justify-center translate-x-[110%] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0 group-active:translate-x-0">
        <span className="inline-block rotate-[135deg]">↗</span>
      </span>
    </span>
  );
}
