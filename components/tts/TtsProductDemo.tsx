"use client";

import { useLayoutEffect, useRef } from "react";
import { TtsCreateCollaboration } from "@/components/tts/TtsCreateCollaboration";
import { TtsFindCreatorsDemo } from "@/components/tts/TtsFindCreatorsDemo";
import { TtsIcon } from "@/components/tts/TtsIcon";
import { TtsTargetCollaboration } from "@/components/tts/TtsTargetCollaboration";

const CLIP_PAD = 8;
const VIEWPORT_SCALE = 0.96;

export function TtsProductDemo() {
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
    const playback = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        camera.classList.add("tts-demo1-active");
        playback.disconnect();
      },
      { threshold: 0.35 },
    );
    playback.observe(camera);
    window.addEventListener("resize", clip);

    return () => {
      observer.disconnect();
      playback.disconnect();
      window.removeEventListener("resize", clip);
    };
  }, []);

  return (
    <>
      <div
        className="tts-collab-stage @container"
        aria-label="TikTok Shop Affiliate Target Collaborations"
      >
        <div className="tts-collab-bezel">
          <div ref={cameraRef} className="tts-collab-camera">
            <div className="tts-demo1-list-page">
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
            <TtsCreateCollaboration />
          </div>
        </div>
      </div>
      <TtsFindCreatorsDemo />
    </>
  );
}
