/**
 * Jason Kim–style northeast arrow: on hover the current arrow exits
 * top-right while a second arrow enters from bottom-left, clipped
 * inside a tight overflow-hidden box.
 */
export function HoverArrow({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`relative inline-block size-[0.85em] overflow-hidden align-[-0.05em] ${className}`}
    >
      <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[110%] group-hover:-translate-y-[110%]">
        ↗
      </span>
      <span className="absolute inset-0 flex items-center justify-center translate-x-[-110%] translate-y-[110%] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0 group-hover:translate-y-0">
        ↗
      </span>
    </span>
  );
}
