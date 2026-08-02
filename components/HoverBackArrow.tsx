/**
 * Mirror of the landing-page HoverArrow: on hover/press the current
 * arrow exits left while a second arrow enters from the right,
 * clipped inside a tight overflow-hidden box.
 */
export function HoverBackArrow({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`relative inline-block size-[0.9em] shrink-0 overflow-hidden align-[-0.08em] ${className}`}
    >
      <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-x-[110%] group-active:-translate-x-[110%]">
        ←
      </span>
      <span className="absolute inset-0 flex items-center justify-center translate-x-[110%] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0 group-active:translate-x-0">
        ←
      </span>
    </span>
  );
}
