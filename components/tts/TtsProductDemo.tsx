"use client";

import { useLayoutEffect, useRef } from "react";
import { TtsIcon } from "@/components/tts/TtsIcon";
import { TtsTargetCollaboration } from "@/components/tts/TtsTargetCollaboration";

const CANVAS_HEIGHT = 0.512;

export function TtsProductDemo() {
  const cameraRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const camera = cameraRef.current;
    if (!camera) return;

    const clip = () => {
      const ui = camera.querySelector<HTMLElement>(".tts-collab-ui");
      if (!ui) return;
      const next = `${Math.round(ui.offsetHeight * CANVAS_HEIGHT)}px`;
      if (camera.style.height !== next) {
        camera.style.height = next;
      }
    };

    const restartMotion = () => {
      clip();
      for (const el of camera.querySelectorAll<HTMLElement>(
        ".tts-collab-cursor, .tts-cursor-arrow, .tts-cursor-hand, .tts-invite-btn, .tts-invite-menu",
      )) {
        el.style.animation = "none";
        void el.offsetWidth;
        el.style.animation = "";
      }
    };

    clip();
    const ui = camera.querySelector(".tts-collab-ui");
    const observer = new ResizeObserver(clip);
    if (ui) observer.observe(ui);

    const reveal = camera.closest(".reveal");
    reveal?.addEventListener("animationend", restartMotion);

    return () => {
      observer.disconnect();
      reveal?.removeEventListener("animationend", restartMotion);
    };
  }, []);

  return (
    <div
      className="tts-collab-stage @container"
      aria-label="TikTok Shop Affiliate Target Collaborations"
    >
      <div className="tts-collab-bezel">
        <div ref={cameraRef} className="tts-collab-camera">
          <TtsTargetCollaboration>
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
              <span className="tts-cursor-hand">
                <TtsIcon name="cursor-pointer" width={24} height={25} />
              </span>
            </div>
          </TtsTargetCollaboration>
        </div>
      </div>
    </div>
  );
}
