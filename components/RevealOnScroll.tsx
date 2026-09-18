"use client";

import { useEffect } from "react";

/** Gap between neighbours in one cascade. */
const STEP_MS = 70;
/** Cap the stagger so a tall screenful never waits seconds for its last block. */
const MAX_STEPS = 6;

declare global {
  interface Window {
    __revealFailsafe?: number;
  }
}

function inDocumentOrder(a: Element, b: Element) {
  return a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING
    ? -1
    : 1;
}

/**
 * Wipes `.reveal` blocks in as they reach the viewport, staggered in document
 * order so a screenful arrives top to bottom.
 */
export function RevealOnScroll() {
  useEffect(() => {
    const root = document.documentElement;
    // RevealScript armed the page and set a failsafe in case this never ran.
    if (window.__revealFailsafe) {
      clearTimeout(window.__revealFailsafe);
      window.__revealFailsafe = undefined;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      root.classList.remove("reveal-armed");
      return;
    }
    // Also covers the case where the inline script did not run.
    root.classList.add("reveal-armed");

    const observer = new IntersectionObserver(
      (entries) => {
        const arriving = entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => entry.target as HTMLElement)
          .sort(inDocumentOrder);

        arriving.forEach((el, index) => {
          // Get element position for diagonal effect
          const rect = el.getBoundingClientRect();
          const viewportWidth = window.innerWidth;
          const viewportHeight = window.innerHeight;

          // Normalize positions to 0-1 range
          const verticalNorm = Math.max(0, Math.min(1, rect.top / viewportHeight));
          const horizontalNorm = Math.max(0, Math.min(1, rect.left / viewportWidth));

          // Combine position-based delay with document order delay
          // Vertical position weighted more heavily (80%) than horizontal (20%)
          const positionFactor = Math.min(verticalNorm * 0.8 + horizontalNorm * 0.2, 1);
          const positionSteps = Math.ceil(positionFactor * 2); // 0-2 extra steps for subtle diagonal
          const totalSteps = Math.min(index + positionSteps, MAX_STEPS);

          el.style.setProperty(
            "--reveal-delay",
            `${totalSteps * STEP_MS}ms`,
          );
          el.classList.add("is-revealing");
          observer.unobserve(el);
        });
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.01 },
    );

    // Hand the element back to plain layout once it has played, so nothing is
    // left clipped or carrying will-change.
    const onAnimationEnd = (event: Event) => {
      const el = event.target as HTMLElement;
      if (!el.classList?.contains("is-revealing")) return;
      el.classList.remove("is-revealing");
      el.classList.add("is-revealed");
      el.style.removeProperty("--reveal-delay");
    };
    document.addEventListener("animationend", onAnimationEnd, true);

    // State lives in the class list rather than a one-shot flag: React owns
    // `className`, so re-rendering a reused node (the passcode gate swapping
    // its locked view for the unlocked one) drops `is-revealed` and would
    // otherwise strand the block at opacity 0 forever. observe() is idempotent.
    const scan = () => {
      for (const el of document.querySelectorAll<HTMLElement>(".reveal")) {
        if (el.classList.contains("is-revealing")) continue;
        if (el.classList.contains("is-revealed")) continue;
        observer.observe(el);
      }
    };

    // Client-side navigation and late-rendered blocks — the passcode gate
    // unlocking, for instance — add elements after the first scan.
    let queued = 0;
    const mutations = new MutationObserver(() => {
      if (queued) return;
      queued = requestAnimationFrame(() => {
        queued = 0;
        scan();
      });
    });

    const begin = () => {
      scan();
      mutations.observe(document.body, { childList: true, subtree: true });
    };

    // On a first visit the loader covers the page; revealing underneath it
    // would spend the effect where nobody can see it.
    let waitForLoader: MutationObserver | undefined;
    if (root.classList.contains("is-loading")) {
      waitForLoader = new MutationObserver(() => {
        if (root.classList.contains("is-loading")) return;
        waitForLoader?.disconnect();
        waitForLoader = undefined;
        begin();
      });
      waitForLoader.observe(root, {
        attributes: true,
        attributeFilter: ["class"],
      });
    } else {
      begin();
    }

    return () => {
      observer.disconnect();
      mutations.disconnect();
      waitForLoader?.disconnect();
      if (queued) cancelAnimationFrame(queued);
      document.removeEventListener("animationend", onAnimationEnd, true);
    };
  }, []);

  return null;
}
