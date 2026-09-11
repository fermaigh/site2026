"use client";

import { TtsIcon } from "@/components/tts/TtsIcon";

/**
 * Seller Center top bar, shared by both pages of demo 1 so the black nav does
 * not change shape when the Invite flow swaps the list page for the create
 * page. It adapts to the demo viewport width via container queries, which is
 * why it must not be duplicated with fixed sizing.
 */
export function TtsSellerTopBar() {
  return (
    <header className="flex h-[52px] shrink-0 items-center justify-between gap-3 bg-[rgba(0,0,0,0.92)] px-3 text-white @[700px]:h-[60px] @[700px]:px-4">
      <div className="flex min-w-0 items-center gap-2 @[700px]:gap-4">
        <TtsIcon name="tts-logo" width={72} height={28} />
        <span className="hidden h-4 w-px bg-white/25 @[700px]:block" />
        <span className="hidden whitespace-nowrap text-[18px] font-medium leading-none @[700px]:inline @[900px]:text-[20px]">
          Seller Center
        </span>
        <div className="ml-1 hidden h-9 min-w-0 flex-1 items-center justify-between rounded bg-[#1f2021] px-3 @[700px]:flex @[700px]:max-w-[280px] @[900px]:max-w-[400px]">
          <span className="flex min-w-0 items-center gap-2 text-[14px] font-medium text-white/65">
            <TtsIcon name="search-white" size={16} />
            <span className="truncate">Ask anything</span>
          </span>
          <span className="hidden shrink-0 text-[14px] font-medium text-white/65 @[900px]:inline">
            ⌘+K
          </span>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-1 @[700px]:gap-2">
        <span className="hidden items-center gap-2 px-1 text-[14px] font-medium @[900px]:flex">
          <TtsIcon name="ai-logo" size={24} />
          Assistant
        </span>
        <span className="flex size-8 items-center justify-center @[700px]:size-9">
          <TtsIcon name="question-circle" size={22} />
        </span>
        <span className="hidden h-4 w-px bg-white/50 @[900px]:block" />
        <span className="hidden items-center gap-1 px-2 py-2 text-[14px] font-medium @[900px]:flex">
          <TtsIcon name="headset" size={22} />
          Customer Messages
          <span className="ml-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-[#e14140] px-1 text-[12px] leading-[18px]">
            8
          </span>
        </span>
        <span className="relative flex size-8 items-center justify-center @[700px]:size-9">
          <TtsIcon name="notice" size={22} />
          <span className="absolute -top-0.5 right-0 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-[#e14140] px-1 text-[12px] leading-[18px]">
            8
          </span>
        </span>
        <span className="flex h-8 items-center rounded-full bg-white/20 pr-2 @[700px]:h-9 @[700px]:pr-4">
          <span className="flex size-8 items-center justify-center rounded-full bg-[#6c6c6c] @[700px]:size-9">
            <TtsIcon name="concatenate" size={18} />
          </span>
          <span className="hidden pl-2 text-[14px] font-medium @[700px]:inline">
            Testaccount
          </span>
        </span>
      </div>
    </header>
  );
}
