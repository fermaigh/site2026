"use client";

import { useRef } from "react";
import { DemoCursorHand } from "@/components/DemoCursorHand";
import { TtsCreateCollaboration } from "@/components/tts/TtsCreateCollaboration";
import { TtsFindCreatorsDemo } from "@/components/tts/TtsFindCreatorsDemo";
import { TtsMobileDemo } from "@/components/tts/TtsMobileDemo";
import { TtsTargetCollaboration } from "@/components/tts/TtsTargetCollaboration";
import { useDemoFit } from "@/components/useDemoFit";
import { useDemoPlayback } from "@/components/useDemoPlayback";

/** Seller Center is authored at this width; narrower stages scale down. */
const UI_WIDTH = 1440;

/**
 * The three viewports read as one set, so this demo takes its height from the
 * Find Creators demo below it rather than from its own content. That demo runs
 * its fit first — it is a child of this component — so the value is current.
 */
function matchFindCreatorsHeight() {
  const sibling = document.querySelector<HTMLElement>(
    '[data-tts-demo="find-creators"] .tts-demo-fit',
  );
  const height = sibling ? Number.parseFloat(sibling.style.height) : NaN;
  return Number.isFinite(height) ? height : 0;
}

export function TtsProductDemo() {
  const stageRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<HTMLDivElement>(null);
  const fitRef = useRef<HTMLDivElement>(null);

  useDemoFit(stageRef, fitRef, UI_WIDTH, cameraRef, matchFindCreatorsHeight);

  useDemoPlayback(cameraRef, "tts-demo1-active");

  return (
    <>
      <h3 className="mb-8 font-sans text-[clamp(1.125rem,4vw,1.5rem)] font-semibold tracking-tight text-foreground">
        Seller–Creator Collaboration tooling
      </h3>
      <div
        ref={stageRef}
        className="tts-collab-stage"
        aria-label="TikTok Shop Affiliate Target Collaborations"
      >
        <div className="tts-collab-bezel">
          <div ref={cameraRef} className="tts-collab-camera">
            <div ref={fitRef} className="tts-demo-fit">
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
                      <DemoCursorHand />
                    </span>
                  </div>
                </TtsTargetCollaboration>
              </div>
              <TtsCreateCollaboration />
            </div>
          </div>
        </div>
      </div>
      <TtsFindCreatorsDemo />
      <TtsMobileDemo />
    </>
  );
}
