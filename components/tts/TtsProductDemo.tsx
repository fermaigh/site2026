"use client";

import { useEffect, useRef, useState } from "react";
import { TtsTargetCollaboration } from "@/components/tts/TtsTargetCollaboration";

const DESIGN_WIDTH = 1440;

export function TtsProductDemo() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

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

  return (
    <div
      ref={stageRef}
      className="tts-collab-stage"
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
          <div className="tts-collab-camera">
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
