"use client";

import { useLayoutEffect, useRef } from "react";
import { TtsBrandConnectScreen } from "@/components/tts/TtsBrandConnectScreen";
import { TtsInvitationScreen } from "@/components/tts/TtsInvitationScreen";
import { TtsPhoneFrame } from "@/components/tts/TtsPhoneFrame";
import { useDemoPlayback } from "@/components/tts/useDemoPlayback";

/** Two 410px devices plus the gutter between them. */
const ROW_WIDTH = 852;
const PHONE_HEIGHT = 844;
/** Screen clip inside the titanium shell — drives the auto-scroll distance. */
const SCREEN_HEIGHT = 824;

export function TtsMobileDemo() {
  const stageRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    const camera = cameraRef.current;
    const row = rowRef.current;
    if (!stage || !camera || !row) return;

    const fit = () => {
      const width = stage.clientWidth;
      if (!width) return;

      const pad = width < 640 ? 16 : 32;
      const scale = Math.min(1, (width - pad * 2) / ROW_WIDTH);

      row.style.top = `${pad}px`;
      row.style.transform = `translateX(${Math.round(
        (width - ROW_WIDTH * scale) / 2,
      )}px) scale(${scale})`;
      camera.style.height = `${Math.round(PHONE_HEIGHT * scale + pad * 2)}px`;

      // Each screen scrolls exactly its own overflow, so neither page ever
      // pulls past its last row.
      for (const [selector, prop] of [
        [".tts-demo3-scroll-a", "--tts-a-shift"],
        [".tts-demo3-scroll-b", "--tts-b-shift"],
      ] as const) {
        const page = camera.querySelector<HTMLElement>(selector);
        if (!page) continue;
        const shift = Math.max(0, Math.round(page.scrollHeight - SCREEN_HEIGHT));
        camera.style.setProperty(prop, `${-shift}px`);
      }
    };

    fit();
    void document.fonts?.ready?.then(fit);

    const observer = new ResizeObserver(fit);
    observer.observe(stage);
    window.addEventListener("resize", fit);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", fit);
    };
  }, []);

  useDemoPlayback(cameraRef, "tts-demo3-active");

  return (
    <section className="mt-16 sm:mt-20" aria-label="Creator mobile live demo">
      <div
        ref={stageRef}
        className="tts-collab-stage @container"
        aria-label="Interactive TikTok Shop creator app demo"
      >
        <div className="tts-collab-bezel tts-demo3-bezel">
          <div ref={cameraRef} className="tts-collab-camera">
            <div ref={rowRef} className="tts-demo3-row">
              <TtsPhoneFrame label="Creator invitation detail screen">
                <TtsInvitationScreen />
              </TtsPhoneFrame>
              <TtsPhoneFrame label="Brand Connect Program screen">
                <TtsBrandConnectScreen />
              </TtsPhoneFrame>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
