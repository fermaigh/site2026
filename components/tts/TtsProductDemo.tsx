"use client";

import { useEffect, useRef, useState } from "react";
import { TtsTargetCollaboration } from "@/components/tts/TtsTargetCollaboration";

const DESIGN_WIDTH = 1440;

function localPoint(camera: HTMLElement, target: HTMLElement) {
  const cam = camera.getBoundingClientRect();
  const el = target.getBoundingClientRect();
  const scale = cam.width / camera.offsetWidth;
  return {
    x: (el.left + el.width * 0.55 - cam.left) / scale,
    y: (el.top + el.height * 0.4 - cam.top) / scale,
  };
}

function wait(ms: number, signal: { cancelled: boolean }) {
  return new Promise<void>((resolve) => {
    window.setTimeout(() => {
      if (!signal.cancelled) resolve();
    }, ms);
  });
}

export function TtsProductDemo() {
  const stageRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);
  const [cursor, setCursor] = useState({ x: 1180, y: 280, opacity: 0 });
  const [menuOpen, setMenuOpen] = useState(false);
  const [invitePressed, setInvitePressed] = useState(false);

  useEffect(() => {
    const node = stageRef.current;
    if (!node) return;

    const update = () => {
      setScale(node.clientWidth / DESIGN_WIDTH);
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const camera = cameraRef.current;
    if (!camera || !scale) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const signal = { cancelled: false };

    const run = async () => {
      while (!signal.cancelled) {
        const inviteBtn = camera.querySelector<HTMLElement>(".tts-invite-btn");
        if (!inviteBtn) {
          await wait(400, signal);
          continue;
        }

        setMenuOpen(false);
        setInvitePressed(false);

        const toBtn = localPoint(camera, inviteBtn);
        setCursor({ x: toBtn.x - 90, y: toBtn.y - 24, opacity: 0 });
        await wait(400, signal);
        if (signal.cancelled) return;

        setCursor({ x: toBtn.x, y: toBtn.y, opacity: 1 });
        await wait(1800, signal);
        if (signal.cancelled) return;

        setInvitePressed(true);
        await wait(280, signal);
        if (signal.cancelled) return;

        setInvitePressed(false);
        setMenuOpen(true);
        await wait(500, signal);
        if (signal.cancelled) return;

        const firstInvite = camera.querySelector<HTMLElement>(
          ".tts-invite-first",
        );
        if (firstInvite) {
          const toRow = localPoint(camera, firstInvite);
          setCursor({ x: toRow.x, y: toRow.y, opacity: 1 });
        }

        await wait(4200, signal);
        if (signal.cancelled) return;

        setCursor((prev) => ({ ...prev, opacity: 0 }));
        setMenuOpen(false);
        await wait(700, signal);
      }
    };

    void run();
    return () => {
      signal.cancelled = true;
    };
  }, [scale]);

  return (
    <div
      ref={stageRef}
      className={`tts-collab-stage${menuOpen ? " is-menu-open" : ""}${
        invitePressed ? " is-invite-pressed" : ""
      }`}
      aria-label="TikTok Shop Affiliate Target Collaborations"
    >
      <div
        className="tts-collab-bezel"
        style={{ visibility: scale ? "visible" : "hidden" }}
      >
        <div
          className="tts-collab-screen"
          style={{ transform: `scale(${scale})` }}
        >
          <div ref={cameraRef} className="tts-collab-camera">
            <TtsTargetCollaboration />
            <div
              className="tts-collab-cursor"
              aria-hidden="true"
              style={{
                opacity: cursor.opacity,
                transform: `translate(${cursor.x}px, ${cursor.y}px)`,
              }}
            >
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
