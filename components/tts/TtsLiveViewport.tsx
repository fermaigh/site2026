"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";

const CLIP_PAD = 8;
const VIEWPORT_SCALE = 0.96;

export function TtsLiveViewport({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  const cameraRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const camera = cameraRef.current;
    if (!camera) return;

    const clip = () => {
      const ui = camera.querySelector<HTMLElement>(".tts-collab-ui");
      if (!ui) return;
      const marker = ui.querySelector<HTMLElement>("[data-tts-clip-end]");
      const cut = marker
        ? Math.round(
            (marker.getBoundingClientRect().bottom -
              ui.getBoundingClientRect().top +
              CLIP_PAD) *
              VIEWPORT_SCALE,
          )
        : Math.round(ui.offsetHeight * 0.73 * VIEWPORT_SCALE);
      const next = `${Math.max(cut, 1)}px`;
      if (camera.style.height !== next) {
        camera.style.height = next;
      }
    };

    clip();
    void document.fonts?.ready?.then(clip);

    const stage = camera.closest(".tts-collab-stage");
    let lastWidth = 0;
    const observer = new ResizeObserver((entries) => {
      const width = Math.round(entries[0]?.contentRect.width ?? 0);
      if (width === lastWidth) return;
      lastWidth = width;
      clip();
    });
    if (stage) observer.observe(stage);
    window.addEventListener("resize", clip);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", clip);
    };
  }, []);

  return (
    <div className="tts-collab-stage @container" aria-label={label}>
      <div className="tts-collab-bezel">
        <div ref={cameraRef} className="tts-collab-camera">
          {children}
        </div>
      </div>
    </div>
  );
}
