"use client";

import { TtsLiveViewport } from "@/components/tts/TtsLiveViewport";
import { TtsOpenCollaboration } from "@/components/tts/TtsOpenCollaboration";
import { TtsTargetCollaboration } from "@/components/tts/TtsTargetCollaboration";

export function TtsProductDemo() {
  return (
    <div className="flex w-full flex-col gap-10 sm:gap-12">
      <TtsLiveViewport label="TikTok Shop Affiliate Target Collaborations">
        {(cursor) => <TtsTargetCollaboration>{cursor}</TtsTargetCollaboration>}
      </TtsLiveViewport>
      <TtsLiveViewport label="TikTok Shop Affiliate Open Collaboration">
        {(cursor) => <TtsOpenCollaboration>{cursor}</TtsOpenCollaboration>}
      </TtsLiveViewport>
    </div>
  );
}
