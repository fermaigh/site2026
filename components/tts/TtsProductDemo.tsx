"use client";

import { TtsIcon } from "@/components/tts/TtsIcon";
import { TtsLiveViewport } from "@/components/tts/TtsLiveViewport";
import { TtsTargetCollaboration } from "@/components/tts/TtsTargetCollaboration";

function DemoCursor() {
  return (
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
  );
}

export function TtsProductDemo({
  variant = "target",
}: {
  variant?: "target" | "open";
}) {
  return (
    <TtsLiveViewport
      label={
        variant === "open"
          ? "TikTok Shop Affiliate Open Collaborations"
          : "TikTok Shop Affiliate Target Collaborations"
      }
    >
      <TtsTargetCollaboration variant={variant}>
        <DemoCursor />
      </TtsTargetCollaboration>
    </TtsLiveViewport>
  );
}
