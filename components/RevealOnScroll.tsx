"use client";

import { useEffect } from "react";

/** Gap between neighbours in one cascade. */
const STEP_MS = 80;
/** Cap the stagger so a tall screenful never waits seconds for its last block. */
const MAX_STEPS = 4;

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
 * Resolves `.reveal` blocks from blurred to crisp as they reach the viewport,
 * staggered in document order so a screenful arrives top to bottom.
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
          el.style.setProperty(
            "--reveal-stagger",
            `${Math.min(index, MAX_STEPS) * STEP_MS}ms`,
          );
          el.classList.add("is-revealing");
          observer.unobserve(el);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.04 },
    );

    // Hand the element back to plain layout once it has played, so nothing is
    // left clipped or carrying will-change.
    const onAnimationEnd = (event: Event) => {
      const el = event.target as HTMLElement;
      if (!el.classList?.contains("is-revealing")) return;
      el.classList.remove("is-revealing");
      el.classList.add("is-revealed");
      el.style.removeProperty("--reveal-stagger");
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
