"use client";

import { useEffect, type RefObject } from "react";

/**
 * Rewinding is a nicety: engines differ on whether a paused CSS animation can
 * be seeked, so a failure here must never keep the demo from playing.
 */
function rewind(node: HTMLElement) {
  let animations: Animation[] = [];

  if (typeof node.getAnimations !== "function") return;

  try {
    animations = node.getAnimations({ subtree: true });
  } catch {
    try {
      animations = node.getAnimations();
    } catch {
      return;
    }
  }

  for (const animation of animations) {
    try {
      animation.currentTime = 0;
    } catch {
      // ignore
    }
  }
}

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

    let observer: IntersectionObserver;
    try {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry) return;
          if (entry.isIntersecting) {
            node.classList.add(activeClass);
            rewind(node);
          } else {
            node.classList.remove(activeClass);
          }
        },
        { rootMargin: "-10% 0px" },
      );
      observer.observe(node);
    } catch {
      node.classList.add(activeClass);
      return;
    }

    return () => observer.disconnect();
  }, [ref, activeClass]);
}
