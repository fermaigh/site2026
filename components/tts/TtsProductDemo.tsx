"use client";

import { useLayoutEffect, useRef } from "react";
import { TtsTargetCollaboration } from "@/components/tts/TtsTargetCollaboration";

function localPoint(camera: HTMLElement, target: HTMLElement) {
  const cam = camera.getBoundingClientRect();
  const el = target.getBoundingClientRect();
  return {
    x: el.left + el.width * 0.55 - cam.left,
    y: el.top + el.height * 0.45 - cam.top,
  };
}

export function TtsProductDemo() {
  const cameraRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const camera = cameraRef.current;
    if (!camera) return;

    const update = () => {
      const inviteBtn = camera.querySelector<HTMLElement>(".tts-invite-btn");
      const firstInvite = camera.querySelector<HTMLElement>(
        ".tts-invite-first",
      );
      if (inviteBtn) {
        const point = localPoint(camera, inviteBtn);
        camera.style.setProperty("--tts-click-x", `${point.x}px`);
        camera.style.setProperty("--tts-click-y", `${point.y}px`);
      }
      if (firstInvite) {
        const point = localPoint(camera, firstInvite);
        camera.style.setProperty("--tts-row-x", `${point.x}px`);
        camera.style.setProperty("--tts-row-y", `${point.y}px`);
      }
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(camera);
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
