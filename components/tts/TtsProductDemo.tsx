"use client";

import { useLayoutEffect, useRef } from "react";
import { TtsTargetCollaboration } from "@/components/tts/TtsTargetCollaboration";

const CURSOR_TIP_X = 1.33;
const CURSOR_TIP_Y = 1.36;

function localPoint(camera: HTMLElement, target: HTMLElement) {
  const cam = camera.getBoundingClientRect();
  const el = target.getBoundingClientRect();
  return {
    x: el.left + el.width * 0.5 - cam.left - CURSOR_TIP_X,
    y: el.top + el.height * 0.5 - cam.top - CURSOR_TIP_Y,
  };
}

export function TtsProductDemo() {
  const cameraRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const camera = cameraRef.current;
    if (!camera) return;

    const update = () => {
      const ui = camera.querySelector<HTMLElement>(".tts-collab-ui");
      if (ui) {
        const clipped = `${Math.round(ui.scrollHeight * 0.8)}px`;
        if (camera.style.height !== clipped) {
          camera.style.height = clipped;
        }
      }

      const aim =
        camera.querySelector<HTMLElement>(".tts-invite-aim") ??
        camera.querySelector<HTMLElement>(".tts-invite-btn");
      if (!aim) return;
      const point = localPoint(camera, aim);
      camera.style.setProperty("--tts-click-x", `${point.x}px`);
      camera.style.setProperty("--tts-click-y", `${point.y}px`);
    };

    const start = () => {
      update();
      camera.classList.remove("is-aimed");
      void camera.offsetWidth;
      camera.classList.add("is-aimed");
    };

    start();
    void document.fonts?.ready?.then(start);
    const observer = new ResizeObserver(update);
    observer.observe(camera);
    const ui = camera.querySelector(".tts-collab-ui");
    if (ui) observer.observe(ui);
    const inviteBtn = camera.querySelector(".tts-invite-btn");
    if (inviteBtn) observer.observe(inviteBtn);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="tts-collab-stage @container"
      aria-label="TikTok Shop Affiliate Target Collaborations"
    >
      <div className="tts-collab-bezel">
        <div ref={cameraRef} className="tts-collab-camera">
          <TtsTargetCollaboration />
          <div className="tts-collab-cursor" aria-hidden="true">
            <svg width="24" height="30" viewBox="0 0 18 22" fill="none">
              <path
                d="M1 1L16.5 12.2L9.4 13.1L13.2 20.4L10.3 21.7L6.4 14.3L1 18.8V1Z"
                fill="#171718"
                stroke="white"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
