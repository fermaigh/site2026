"use client";

import { useEffect, type RefObject } from "react";

/**
 * Runs a demo's CSS animations only while it is inside the viewport, and
 * rewinds the sequence on re-entry so viewers always catch it from the top.
 */
export function useDemoPlayback(
  ref: RefObject<HTMLElement | null>,
  activeClass: string,
) {
  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      node.classList.add(activeClass);
      return;
    }

    const rewind = () => {
      if (typeof node.getAnimations !== "function") return;
      for (const animation of node.getAnimations({ subtree: true })) {
        animation.currentTime = 0;
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) {
          rewind();
          node.classList.add(activeClass);
        } else {
          node.classList.remove(activeClass);
        }
      },
      { rootMargin: "-10% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [ref, activeClass]);
}
