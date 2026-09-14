"use client";

import { useLayoutEffect, type RefObject } from "react";

/** Distance from `fit`'s top to `el`'s top, unaffected by any transform. */
export function offsetTopWithin(el: HTMLElement, fit: HTMLElement) {
  let y = 0;
  let node: HTMLElement | null = el;
  while (node && node !== fit) {
    y += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return y;
}

/**
 * Renders a demo at the width it was designed for and scales it down to fit a
 * narrower stage — never up, so it stays crisp at full size instead of
 * reflowing into a cramped layout.
 *
 * Scale and height are set together in one pass, so the height can never be
 * measured against a stale scale.
 */
export function useDemoFit(
  stageRef: RefObject<HTMLElement | null>,
  fitRef: RefObject<HTMLElement | null>,
  width: number,
  /** Sized to the scaled content height once the scale is applied. */
  cameraRef?: RefObject<HTMLElement | null>,
  /**
   * Height of the part of the demo that should be visible, in the authored
   * (unscaled) pixels it was built in. Measure with offsets, not bounding
   * boxes: the fit element is transformed, and offsets ignore transforms.
   */
  measure?: (fit: HTMLElement) => number,
) {
  useLayoutEffect(() => {
    const stage = stageRef.current;
    const fit = fitRef.current;
    if (!stage || !fit) return;

    const apply = () => {
      const available = stage.clientWidth;
      if (!available) return;

      const scale = Math.min(1, available / width);
      const transform = `scale(${scale})`;
      if (fit.style.transform !== transform) fit.style.transform = transform;

      const camera = cameraRef?.current;
      if (!camera || !measure) return;

      const height = measure(fit);
      if (height <= 0) return;

      // Bound the fit box to what is actually on screen. Content below still
      // renders and is clipped by the camera, but anything positioned against
      // the bottom edge — a floating panel, say — now resolves inside the
      // frame rather than against the full page height.
      const bounded = `${Math.round(height)}px`;
      if (fit.style.height !== bounded) fit.style.height = bounded;

      const next = `${Math.max(1, Math.round(height * scale))}px`;
      if (camera.style.height !== next) camera.style.height = next;
    };

    apply();
    void document.fonts?.ready?.then(apply);

    const observer = new ResizeObserver(apply);
    observer.observe(stage);
    observer.observe(fit);
    window.addEventListener("resize", apply);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", apply);
    };
  }, [stageRef, fitRef, width, cameraRef, measure]);
}
