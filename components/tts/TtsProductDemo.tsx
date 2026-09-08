"use client";

import { useLayoutEffect, useRef } from "react";
import { TtsTargetCollaboration } from "@/components/tts/TtsTargetCollaboration";

const CURSOR_TIP_X = 1.33;
const CURSOR_TIP_Y = 1.36;
const CANVAS_HEIGHT = 0.64;
const LOOP_ANIMATION =
  "tts-cursor-loop 6.5s cubic-bezier(0.22, 1, 0.36, 1) infinite";

function localPoint(camera: HTMLElement, target: HTMLElement) {
  const cam = camera.getBoundingClientRect();
  const el = target.getBoundingClientRect();
  return {
    x: el.left + el.width * 0.5 - cam.left - CURSOR_TIP_X - 20,
    y: el.top + el.height * 0.5 - cam.top - CURSOR_TIP_Y,
  };
}

export function TtsProductDemo() {
  const cameraRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const camera = cameraRef.current;
    if (!camera) return;

    const aimTarget = () => {
      return (
        camera.querySelector<HTMLElement>(".tts-invite-aim") ??
        camera.querySelector<HTMLElement>(".tts-invite-btn")
      );
    };

    const update = () => {
      const ui = camera.querySelector<HTMLElement>(".tts-collab-ui");
      if (ui) {
        const clipped = `${Math.round(ui.offsetHeight * CANVAS_HEIGHT)}px`;
        if (camera.style.height !== clipped) {
          camera.style.height = clipped;
        }
      }

      const aim = aimTarget();
      if (!aim || aim.getBoundingClientRect().width < 8) return false;
      const point = localPoint(camera, aim);
      camera.style.setProperty("--tts-click-x", `${point.x}px`);
      camera.style.setProperty("--tts-click-y", `${point.y}px`);
      return true;
    };

    const restartLoop = () => {
      if (!update()) return;
      const actors = camera.querySelectorAll<HTMLElement>(
        ".tts-collab-cursor, .tts-cursor-arrow, .tts-cursor-hand, .tts-invite-btn, .tts-invite-menu",
      );
      for (const el of actors) {
        const previous = el.style.animation;
        el.style.animation = "none";
        void el.offsetWidth;
        el.style.animation = previous;
      }
      const cursor = camera.querySelector<HTMLElement>(".tts-collab-cursor");
      if (cursor && !cursor.style.animation) {
        cursor.style.animation = LOOP_ANIMATION;
      }
    };

    update();
    const frame = requestAnimationFrame(restartLoop);
    void document.fonts?.ready?.then(restartLoop);
    const reveal = camera.closest(".reveal");
    reveal?.addEventListener("animationend", restartLoop);
    const later = window.setTimeout(restartLoop, 450);

    const observer = new ResizeObserver(update);
    observer.observe(camera);
    const ui = camera.querySelector(".tts-collab-ui");
    if (ui) observer.observe(ui);
    const inviteBtn = camera.querySelector(".tts-invite-btn");
    if (inviteBtn) observer.observe(inviteBtn);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(later);
      reveal?.removeEventListener("animationend", restartLoop);
      observer.disconnect();
    };
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
            <svg
              className="tts-cursor-arrow"
              width="24"
              height="30"
              viewBox="0 0 18 22"
              fill="none"
            >
              <path
                d="M1 1L16.5 12.2L9.4 13.1L13.2 20.4L10.3 21.7L6.4 14.3L1 18.8V1Z"
                fill="#171718"
                stroke="white"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
            </svg>
            <svg
              className="tts-cursor-hand"
              width="26"
              height="28"
              viewBox="0 0 26 28"
              fill="none"
            >
              <path
                d="M8.4 1.3c.9 0 1.6.7 1.6 1.6v7.2h.3c.3-.2.8-.3 1.2-.3.6 0 1.1.2 1.5.5.4-.5 1-.8 1.7-.8 1 0 1.8.7 1.8 1.7v.2c.4-.2.9-.3 1.4-.3 1.1 0 2 .9 2 2v6.3c0 3-2.4 5.4-5.4 5.4h-2c-2.4 0-4.6-1.2-5.9-3.2L3.6 16.7c-.6-.9-.3-2.1.6-2.6.9-.6 2.1-.3 2.6.6l1.6 2.3V2.9c0-.9.7-1.6 1.6-1.6Z"
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
