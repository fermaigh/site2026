/** The pointer-hand graphic every live demo's cursor swaps to on a click. */
export function DemoCursorHand() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/projects/demo-cursor-hand.svg"
      alt=""
      width={24}
      height={25}
      aria-hidden
    />
  );
}
