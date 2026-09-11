"use client";

import { useLayoutEffect, useRef } from "react";
import { TtsCreateCollaboration } from "@/components/tts/TtsCreateCollaboration";
import { TtsFindCreatorsDemo } from "@/components/tts/TtsFindCreatorsDemo";
import { TtsIcon } from "@/components/tts/TtsIcon";
import { TtsMobileDemo } from "@/components/tts/TtsMobileDemo";
import { TtsTargetCollaboration } from "@/components/tts/TtsTargetCollaboration";
import { useDemoPlayback } from "@/components/tts/useDemoPlayback";

const CLIP_PAD = 8;
const VIEWPORT_SCALE = 0.96;

export function TtsProductDemo() {
  const cameraRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const camera = cameraRef.current;
    if (!camera) return;

    const clip = () => {
      const ui = camera.querySelector<HTMLElement>(".tts-collab-ui");
      const createPage = camera.querySelector<HTMLElement>(
        ".tts-demo1-next-page",
      );
      const listMarker = ui?.querySelector<HTMLElement>("[data-tts-clip-end]");
      const createMarker = createPage?.querySelector<HTMLElement>(
        "[data-tts-create-end]",
      );

      const listCut = ui
        ? listMarker
          ? Math.round(
              (listMarker.getBoundingClientRect().bottom -
                ui.getBoundingClientRect().top +
                CLIP_PAD) *
                VIEWPORT_SCALE,
            )
          : Math.round(ui.offsetHeight * 0.73 * VIEWPORT_SCALE)
        : 0;

      // Prefer scrollHeight so visibility/transform on the create page
      // cannot collapse the measured body (Figma section 1664:36538).
      const createCut = createPage
        ? Math.round(
            Math.max(
              createPage.scrollHeight,
              createMarker
                ? createMarker.getBoundingClientRect().bottom -
                    createPage.getBoundingClientRect().top
                : 0,
            ) + CLIP_PAD,
          )
        : 0;

      // The three demo viewports read as one set, so demo 1 takes its height
      // from the Find Creators viewport rather than growing to fit the create
      // page. Falling back to the measured content keeps it sane if that demo
      // ever stops rendering.
      const sibling = document.querySelector<HTMLElement>(
        '[data-tts-demo="find-creators"]',
      );
      const siblingHeight = sibling
        ? Math.round(sibling.getBoundingClientRect().height)
        : 0;

      const next =
        siblingHeight > 0
          ? `${siblingHeight}px`
          : `${Math.max(listCut, createCut, 1)}px`;
      if (camera.style.height !== next) {
        camera.style.height = next;
      }
    };

    clip();
    void document.fonts?.ready?.then(clip);

    const stage = camera.closest(".tts-collab-stage");
    const createPage = camera.querySelector(".tts-demo1-next-page");
    let lastWidth = 0;
    const observer = new ResizeObserver((entries) => {
      const width = Math.round(entries[0]?.contentRect.width ?? 0);
      // Always remeasure create-page height changes; only debounce width.
      if (
        entries[0]?.target === stage &&
        width === lastWidth &&
        entries.length === 1
      ) {
        return;
      }
      if (entries[0]?.target === stage) lastWidth = width;
      clip();
    });
    if (stage) observer.observe(stage);
    if (createPage) observer.observe(createPage);
    // Demo 2 sets its own height in a sibling effect, so remeasure when it does.
    const sibling = document.querySelector('[data-tts-demo="find-creators"]');
    if (sibling) observer.observe(sibling);
    window.addEventListener("resize", clip);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", clip);
    };
  }, []);

  useDemoPlayback(cameraRef, "tts-demo1-active");

  return (
    <>
      <h3 className="mb-8 font-sans text-[clamp(1.125rem,4vw,1.5rem)] font-semibold tracking-tight text-foreground">
        Seller–Creator Collaboration tooling
      </h3>
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
      <TtsMobileDemo />
    </>
  );
}
