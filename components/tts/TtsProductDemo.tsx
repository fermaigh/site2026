"use client";

import { useLayoutEffect, useRef } from "react";
import { TtsTargetCollaboration } from "@/components/tts/TtsTargetCollaboration";

const DESIGN_WIDTH = 1440;

function localPoint(camera: HTMLElement, target: HTMLElement) {
  const cam = camera.getBoundingClientRect();
  const el = target.getBoundingClientRect();
  const width = camera.offsetWidth || DESIGN_WIDTH;
  const scale = cam.width / width || 1;
  return {
    x: (el.left + el.width * 0.55 - cam.left) / scale,
    y: (el.top + el.height * 0.45 - cam.top) / scale,
  };
}

export function TtsProductDemo() {
  const stageRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    const screen = screenRef.current;
    const camera = cameraRef.current;
    if (!stage || !screen || !camera) return;

    const update = () => {
      const designH = Math.max(camera.offsetHeight, 880);
      const next = stage.clientWidth / DESIGN_WIDTH;
      if (next > 0) {
        screen.style.transform = `scale(${next})`;
        screen.style.height = `${designH}px`;
        stage.style.aspectRatio = "auto";
        stage.style.height = `${designH * next}px`;
      }

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
    observer.observe(stage);
    observer.observe(camera);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={stageRef}
      className="tts-collab-stage"
      aria-label="TikTok Shop Affiliate Target Collaborations"
    >
      <div className="tts-collab-bezel">
        <div ref={screenRef} className="tts-collab-screen">
          <div ref={cameraRef} className="tts-collab-camera">
            <TtsTargetCollaboration />
            <div className="tts-collab-cursor" aria-hidden="true">
              <svg width="18" height="22" viewBox="0 0 18 22" fill="none">
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
    </div>
  );
}
