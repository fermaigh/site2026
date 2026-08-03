"use client";

import { useEffect, useRef, useState } from "react";

const PRELOAD_ASSETS = [
  "/site-icon.png",
  "/avatar.webp",
  "/projects/hiring-app.webp",
];

const SESSION_KEY = "page-loader-seen";
const LERP = 0.08;
const EXIT_THRESHOLD = 99.5;
const EXIT_DELAY_MS = 180;
const EXIT_FADE_MS = 420;
const MIN_VISIBLE_MS = 320;

function lerp(current: number, target: number, factor: number) {
  return current + (target - current) * factor;
}

function preloadImage(src: string) {
  return new Promise<void>((resolve) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = src;
  });
}

export function PageLoader() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [display, setDisplay] = useState(0);
  const targetRef = useRef(0);
  const currentRef = useRef(0);
  const startedAtRef = useRef(0);
  const finishedRef = useRef(false);
  const rafRef = useRef(0);

  useEffect(() => {
    setMounted(true);

    try {
      if (sessionStorage.getItem(SESSION_KEY) === "1") {
        return;
      }
    } catch {
      // ignore
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        // ignore
      }
      return;
    }

    setVisible(true);
    startedAtRef.current = performance.now();
    document.documentElement.classList.add("is-loading");

    let loaded = 0;
    const total = PRELOAD_ASSETS.length + 2; // images + fonts + window

    const bump = () => {
      loaded += 1;
      targetRef.current = Math.min(100, (loaded / total) * 100);
    };

    const imageJobs = PRELOAD_ASSETS.map((src) =>
      preloadImage(src).then(bump),
    );

    const fontsJob = (document.fonts?.ready ?? Promise.resolve()).then(bump);

    const windowJob = new Promise<void>((resolve) => {
      if (document.readyState === "complete") {
        resolve();
        return;
      }
      window.addEventListener("load", () => resolve(), { once: true });
    }).then(bump);

    // Safety: never hang the loader if something stalls
    const safety = window.setTimeout(() => {
      targetRef.current = 100;
    }, 2200);

    const finish = () => {
      if (finishedRef.current) return;
      finishedRef.current = true;
      window.clearTimeout(safety);

      const elapsed = performance.now() - startedAtRef.current;
      const wait = Math.max(0, MIN_VISIBLE_MS - elapsed);

      window.setTimeout(() => {
        setDisplay(100);
        setExiting(true);
        window.setTimeout(() => {
          setVisible(false);
          document.documentElement.classList.remove("is-loading");
          try {
            sessionStorage.setItem(SESSION_KEY, "1");
          } catch {
            // ignore
          }
        }, EXIT_FADE_MS);
      }, wait + EXIT_DELAY_MS);
    };

    const tick = () => {
      currentRef.current = lerp(currentRef.current, targetRef.current, LERP);
      const rounded = Math.round(currentRef.current);
      setDisplay(rounded);

      if (currentRef.current >= EXIT_THRESHOLD && targetRef.current >= 100) {
        currentRef.current = 100;
        setDisplay(100);
        finish();
        return;
      }

      rafRef.current = window.requestAnimationFrame(tick);
    };

    rafRef.current = window.requestAnimationFrame(tick);

    void Promise.all([...imageJobs, fontsJob, windowJob]).then(() => {
      targetRef.current = 100;
    });

    return () => {
      window.clearTimeout(safety);
      window.cancelAnimationFrame(rafRef.current);
      document.documentElement.classList.remove("is-loading");
    };
  }, []);

  if (!mounted || !visible) return null;

  return (
    <div
      className={`page-loader${exiting ? " is-exiting" : ""}`}
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <span className="page-loader-counter" aria-hidden>
        {display}%
      </span>
      <span className="sr-only">Loading {display}%</span>
    </div>
  );
}
