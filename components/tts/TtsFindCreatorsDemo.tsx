"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { TtsIcon } from "@/components/tts/TtsIcon";

const ASSET_ROOT = "/projects/tts-ui/find-creators";

type Creator = {
  avatar: string;
  video: string;
  handle: string;
  nickname: string;
  categories: string;
  followers: string;
  audience: string;
  metrics: [string, string, string, string];
  saved?: boolean;
  growing?: boolean;
  partnered?: boolean;
};

const NAV = [
  { icon: "menu-home", label: "Home" },
  { icon: "menu-quick", label: "Quick access" },
  { divider: true },
  { icon: "menu-orders", label: "Orders" },
  { icon: "menu-products", label: "Products" },
  { icon: "menu-ship", label: "Logistics" },
  { divider: true },
  { icon: "menu-marketing", label: "Marketing" },
  { icon: "menu-crm", label: "Customers" },
  {
    icon: "menu-affiliate",
    label: "Affiliate",
    children: [
      { label: "Collaborations" },
      { label: "Find creators", active: true },
      { label: "Content management" },
      { label: "Samples" },
      { label: "Transactions" },
    ],
  },
  { icon: "menu-live", label: "LIVE & Video" },
  { icon: "menu-growth", label: "Growth" },
  { icon: "menu-more", label: "Partners" },
  { icon: "menu-more", label: "App" },
  { divider: true },
  { icon: "menu-data", label: "Analytics" },
  { icon: "menu-health", label: "Account Health" },
  { icon: "menu-finance", label: "Finances" },
] as const;

const CREATORS: Creator[] = [
  {
    avatar: "tts-creator-avatar-1.png",
    video: "tts-creator-video-1.png",
    handle: "glowwithmia",
    nickname: "Mia Chen",
    categories: "Beauty, Skincare",
    followers: "842.7K",
    audience: "Female 78%, 18–24",
    metrics: ["$18.4K", "1.2K", "286K", "8.70%"],
    saved: true,
  },
  {
    avatar: "tts-creator-avatar-2.png",
    video: "tts-creator-video-2.png",
    handle: "jaytrainsdaily",
    nickname: "Jay Carter",
    categories: "Fitness, Wellness",
    followers: "392.1K",
    audience: "Male 64%, 25–34",
    metrics: ["$9.7K", "824", "154K", "6.20%"],
  },
  {
    avatar: "tts-creator-avatar-3.png",
    video: "tts-creator-video-3.png",
    handle: "stylebysol",
    nickname: "Sofia Reyes",
    categories: "Fashion, Accessories",
    followers: "1.3M",
    audience: "Female 71%, 18–34",
    metrics: ["$32.8K", "2.9K", "611K", "11.40%"],
    growing: true,
    partnered: true,
  },
  {
    avatar: "tts-creator-avatar-4.png",
    video: "tts-creator-video-4.png",
    handle: "snacklabnoah",
    nickname: "Noah Patel",
    categories: "Food, Fitness",
    followers: "218.6K",
    audience: "Male 58%, 18–34",
    metrics: ["$6.2K", "497", "92K", "5.80%"],
    partnered: true,
  },
  {
    avatar: "tts-creator-avatar-5.png",
    video: "tts-creator-video-5.png",
    handle: "amaraathome",
    nickname: "Amara Brooks",
    categories: "Home, Lifestyle",
    followers: "674.9K",
    audience: "Female 69%, 25–44",
    metrics: ["$21.1K", "1.7K", "348K", "9.30%"],
    growing: true,
  },
] as const;

function SellerHeader() {
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
        <span className="tts-find-ai-assistant relative hidden items-center gap-2 rounded px-2 py-1 text-[14px] font-medium @[900px]:flex">
          <TtsIcon name="ai-logo" size={24} />
          Assistant
          <AssistantCursor />
        </span>
        <span className="flex size-8 items-center justify-center @[700px]:size-9">
          <TtsIcon name="question-circle" size={22} />
        </span>
        <span className="hidden h-4 w-px bg-white/50 @[900px]:block" />
        <span className="hidden items-center gap-1 px-2 py-2 text-[14px] font-medium @[900px]:flex">
          <TtsIcon name="headset" size={22} />
          Customer Messages
          <span className="ml-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-[#e14140] px-1 text-[12px]">
            8
          </span>
        </span>
        <span className="relative flex size-8 items-center justify-center @[700px]:size-9">
          <TtsIcon name="notice" size={22} />
          <span className="absolute -top-0.5 right-0 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-[#e14140] px-1 text-[12px]">
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

function SellerNav() {
  return (
    <aside className="w-12 shrink-0 bg-white px-1 py-3 @[700px]:w-[220px] @[700px]:px-2 @[700px]:py-4">
      {NAV.map((item, index) => {
        if ("divider" in item && item.divider) {
          return (
            <div
              key={`divider-${index}`}
              className="my-1 h-px w-full bg-[#e1e1e2]"
            />
          );
        }
        if (!("label" in item)) return null;
        return (
          <div key={item.label}>
            <div className="flex h-8 items-center justify-center gap-2 rounded px-1 text-[13px] leading-5 text-[#171718] @[700px]:h-9 @[700px]:justify-start @[700px]:px-2 @[700px]:text-[14px]">
              <TtsIcon name={item.icon} size={16} />
              <span className="hidden truncate @[700px]:inline">
                {item.label}
              </span>
            </div>
            {"children" in item
              ? item.children.map((child) => (
                  <div
                    key={child.label}
                    className={`relative hidden h-9 items-center rounded pl-8 pr-1.5 text-[14px] leading-5 @[700px]:flex ${
                      "active" in child && child.active
                        ? "bg-[#ebebeb] text-[#017b77]"
                        : "text-[#6c6d6f]"
                    }`}
                  >
                    {"active" in child && child.active ? (
                      <span className="absolute inset-y-1 left-0 w-[3px] rounded-r bg-[#008a87]" />
                    ) : null}
                    <span className="truncate">{child.label}</span>
                  </div>
                ))
              : null}
          </div>
        );
      })}
    </aside>
  );
}

function SelectBox({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex h-9 min-w-[190px] flex-none items-center justify-between gap-2 whitespace-nowrap rounded border border-black/15 bg-white px-3 text-[13px] text-black/65 @[800px]:w-[210px] @[800px]:text-[14px]">
      <span className="whitespace-nowrap">{children}</span>
      <TtsIcon name="down-2" size={16} />
    </span>
  );
}

function AssistantCursor() {
  return (
    <span className="tts-find-cursor" aria-hidden>
      <svg
        className="tts-find-cursor-arrow"
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
      <span className="tts-find-cursor-hand">
        <TtsIcon name="cursor-pointer" width={24} height={25} />
      </span>
    </span>
  );
}

function PanelCursor() {
  return (
    <span className="tts-find-panel-cursor" aria-hidden>
      <svg
        className="tts-find-panel-cursor-arrow"
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
      <span className="tts-find-panel-cursor-hand">
        <TtsIcon name="cursor-pointer" width={24} height={25} />
      </span>
    </span>
  );
}

function AssistantAsset({
  name,
  size = 16,
}: {
  name: string;
  size?: number;
}) {
  return (
    <Image
      src={`${ASSET_ROOT}/${name}.svg`}
      alt=""
      width={size}
      height={size}
      className="shrink-0"
      style={{ width: size, height: size }}
    />
  );
}

function AssistantPanel() {
  const prompts = [
    "Who are the most popular creators in my category",
    "Find recent fast-growing creators",
    "Find potential creators that matches my products",
  ];

  return (
    <aside
      className="tts-find-assistant-panel absolute bottom-4 right-4 top-[76px] z-40 w-[400px] overflow-hidden rounded-2xl bg-white text-[#171718] shadow-[0_0_32px_rgba(0,0,0,0.2)]"
      aria-label="Ai Assistant"
    >
      <div className="tts-find-assistant-home absolute inset-0 flex flex-col">
        <div className="flex h-[56px] shrink-0 items-center border-b border-[#d3d4d5] px-3">
          <span className="flex size-8 items-center justify-center">
            <AssistantAsset name="assistant-sidebar" />
          </span>
          <span className="ml-2 flex-1 text-[16px] font-medium">
            Ai Assistant
          </span>
          <span className="flex size-8 items-center justify-center">
            <AssistantAsset name="assistant-reduce" />
          </span>
        </div>

        <div className="flex min-h-0 flex-1 flex-col items-center justify-center px-4">
          <Image
            src={`${ASSET_ROOT}/assistant-logo.svg`}
            alt=""
            width={96}
            height={96}
            className="size-24"
          />
          <p className="mt-6 max-w-[330px] text-center text-[28px] font-bold leading-9">
            Hi testaccount! How can I help you today?
          </p>
          <div className="mt-6 flex w-full flex-col gap-3">
            {prompts.map((prompt) => (
              <div
                key={prompt}
                className="flex items-center gap-2 rounded bg-[#f5f5f5] p-2 text-[14px] leading-5"
              >
                <span className="flex size-4 rotate-90 items-center justify-center">
                  <AssistantAsset name="assistant-prompt-arrow" />
                </span>
                <span className="truncate">{prompt}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="shrink-0 p-4">
          <div className="flex gap-2 overflow-visible">
            {[
              ["assistant-search", "Find creator"],
              ["assistant-document", "Send invite"],
              ["assistant-gift", "Samples"],
            ].map(([icon, label]) => (
              <span
                key={label}
                className={`flex h-8 shrink-0 items-center gap-2 rounded-full border border-[#d3d4d5] px-3 text-[14px] ${
                  label === "Send invite"
                    ? "tts-find-send-invite relative overflow-visible"
                    : ""
                }`}
              >
                <AssistantAsset name={icon} />
                {label}
                {label === "Send invite" ? <PanelCursor /> : null}
              </span>
            ))}
          </div>
          <AssistantInput />
        </div>
      </div>

      <div className="tts-find-assistant-chat absolute inset-0 flex flex-col bg-white">
        <div className="flex h-[56px] shrink-0 items-center px-4">
          <AssistantAsset name="assistant-chat-logo" size={24} />
          <span className="ml-2 flex-1 text-[16px] font-medium">
            Ai Assistant
          </span>
          {["assistant-chat-plus", "assistant-expand", "assistant-close"].map(
            (icon) => (
              <span
                key={icon}
                className="flex size-8 items-center justify-center"
              >
                <AssistantAsset name={icon} />
              </span>
            ),
          )}
        </div>

        <div className="min-h-0 flex-1 overflow-hidden px-4 pt-4 text-[14px] leading-5">
          <div className="flex justify-end">
            <span className="rounded-lg bg-[#d2f3f1] p-3">Send invite</span>
          </div>
          <div className="mt-6 flex items-center gap-2 text-[#6c6d6f]">
            <AssistantAsset name="assistant-thought" />
            <span>Thought for 4s</span>
            <AssistantAsset name="assistant-right" />
          </div>
          <p className="mt-3">
            OK. Do you have any product on mind? Select from your shop or paste
            product IDs.
          </p>
          <div className="mt-4 rounded-lg border border-[#d3d4d5] p-3">
            <p className="font-medium">
              Select the product you would like to promote
            </p>
            <div className="mt-3 flex gap-3">
              <span className="flex h-8 flex-1 items-center justify-center font-medium text-[#017b77]">
                Skip
              </span>
              <span className="flex h-8 flex-1 items-center justify-center rounded bg-[#009995] font-medium text-white">
                Select
              </span>
            </div>
          </div>
        </div>
        <div className="shrink-0 p-4">
          <AssistantInput />
        </div>
      </div>
    </aside>
  );
}

function AssistantInput() {
  return (
    <div className="mt-4 flex h-12 items-center rounded-3xl border border-[#d3d4d5] px-3">
      <span className="min-w-0 flex-1 truncate text-[14px] text-[#b7b8b9]">
        Ask assistant anything...
      </span>
      <span className="flex size-8 items-center justify-center rounded-full bg-[#ececed]">
        <AssistantAsset name="assistant-send" />
      </span>
    </div>
  );
}

function CreatorRow({
  creator,
  index,
}: {
  creator: Creator;
  index: number;
}) {
  return (
    <div
      className="grid min-w-[760px] grid-cols-[28px_minmax(240px,1fr)_90px_90px_90px_90px_90px_148px] items-center border-b border-black/10 bg-white"
      {...(index === 3 ? { "data-tts-find-clip-end": "" } : {})}
    >
      <span className="ml-3 size-4 rounded border border-black/25 bg-white" />
      <div className="flex min-w-0 items-start gap-2.5 px-3 py-4">
        <Image
          src={`${ASSET_ROOT}/${creator.avatar}`}
          alt=""
          width={56}
          height={56}
          className="size-14 shrink-0 rounded-full object-cover"
        />
        <div className="min-w-0">
          <div className="flex min-w-0 items-center gap-1.5">
            <span className="truncate text-[14px] font-medium text-black/90">
              {creator.handle}
            </span>
            {creator.growing ? (
              <span className="shrink-0 rounded bg-[#d8f5e3] px-1 text-[11px] font-medium leading-[18px] text-[#009e3d]">
                Fast growing
              </span>
            ) : null}
            {creator.partnered ? (
              <span className="hidden shrink-0 rounded bg-black/5 px-1 text-[11px] font-medium leading-[18px] text-[#595959] @[900px]:inline">
                Partnered before
              </span>
            ) : null}
          </div>
          <p className="text-[12px] leading-[18px] text-black/35">
            {creator.nickname}
          </p>
          <p className="truncate text-[12px] leading-[18px] text-black/55">
            Categories:{" "}
            <span className="text-black/90">{creator.categories}</span>
          </p>
          <p className="truncate text-[12px] leading-[18px] text-black/55">
            Followers:{" "}
            <span className="text-black/90">
              {creator.followers}, {creator.audience}
            </span>
          </p>
        </div>
      </div>
      <div className="relative mx-auto h-[82px] w-16 overflow-hidden rounded-md">
        <Image
          src={`${ASSET_ROOT}/${creator.video}`}
          alt=""
          fill
          sizes="64px"
          className="object-cover"
        />
        <span className="absolute inset-0 bg-black/10" />
        <Image
          src={`${ASSET_ROOT}/play.svg`}
          alt=""
          width={16}
          height={16}
          className="absolute left-1/2 top-1/2 size-4 -translate-x-1/2 -translate-y-1/2"
        />
      </div>
      {creator.metrics.map((value) => (
        <span
          key={value}
          className="justify-self-end border-b border-dotted border-black/25 text-[13px] text-black/90"
        >
          {value}
        </span>
      ))}
      <div className="flex items-center justify-end gap-1 pr-3">
        <span className="flex h-11 w-[92px] items-center justify-center rounded-sm bg-[#009995] text-[14px] font-medium text-white">
          Invite
        </span>
        <span className="flex size-11 items-center justify-center rounded-sm bg-black/5">
          <Image
            src={`${ASSET_ROOT}/${creator.saved ? "bookmark.svg" : "heart.svg"}`}
            alt=""
            width={16}
            height={16}
            className="size-4"
          />
        </span>
      </div>
    </div>
  );
}

function FindCreatorsScreen() {
  return (
    <div className="tts-collab-ui @container flex w-[1440px] min-w-[1440px] flex-col bg-[#f5f5f5] text-[#171718]">
      <SellerHeader />
      <div className="flex min-w-0">
        <SellerNav />
        <main className="min-w-0 flex-1 bg-[#f5f5f5] p-3 @[700px]:ml-[91px] @[700px]:w-[1038px] @[700px]:flex-none @[700px]:px-0 @[700px]:py-4">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-[22px] font-bold leading-8 @[700px]:text-[28px] @[700px]:leading-9">
              Find Creators
            </h2>
            <span className="hidden items-center gap-2 rounded bg-black/5 px-4 py-2 text-[13px] font-medium @[600px]:flex @[700px]:text-[14px]">
              Remaining creator limit
              <span className="rounded-full bg-[#dbf5dd] px-1.5 text-[12px] text-[#1a6d31]">
                350
              </span>
            </span>
          </div>

          <div className="mt-3 flex gap-2">
            <div className="flex h-11 min-w-0 flex-1 items-center gap-2 rounded border border-black/15 bg-white px-3 @[900px]:max-w-[540px]">
              <span className="min-w-0 flex-1 truncate text-[13px] text-black/35 @[700px]:text-[14px]">
                Search by username, products, hashtags or keywords in content
              </span>
              <TtsIcon name="search" size={16} />
            </div>
            <div className="flex h-11 shrink-0 items-center gap-2 rounded bg-[linear-gradient(105deg,rgba(248,143,164,.14),rgba(228,174,255,.14),rgba(74,218,226,.14))] px-3 text-[14px] font-medium text-black/65 @[700px]:px-4 @[700px]:text-[16px]">
              <Image
                src={`${ASSET_ROOT}/ai-find.svg`}
                alt=""
                width={26}
                height={24}
                className="size-6"
              />
              <span className="hidden @[500px]:inline">AI find creators</span>
            </div>
          </div>

          <section className="mt-3 overflow-hidden rounded-lg bg-white">
            <div className="flex items-center gap-3 border-b border-black/10 px-3 py-3 text-[13px] @[700px]:gap-5 @[700px]:text-[14px]">
              <span className="text-black/65">Filter by</span>
              <span className="flex h-9 min-w-[110px] items-center justify-center rounded bg-[#d8f3f2] font-medium text-[#087a77]">
                Creators
              </span>
              <span className="flex h-9 min-w-[110px] items-center justify-center rounded bg-black/5">
                Followers
              </span>
              <span className="hidden h-9 min-w-[110px] items-center justify-center rounded bg-black/5 @[600px]:flex">
                Performance
              </span>
            </div>
            <div className="flex flex-wrap gap-2 px-3 py-3">
              <SelectBox>Product category ⓘ</SelectBox>
              <SelectBox>Follower size</SelectBox>
              <SelectBox>Avg. commission rate ⓘ</SelectBox>
              <SelectBox>Content type ⓘ</SelectBox>
              <SelectBox>Creator agency</SelectBox>
              <span className="flex h-9 items-center gap-2 px-1 text-[13px] text-black/65 @[700px]:text-[14px]">
                <span className="size-4 rounded border border-black/20" />
                Fast growing ⓘ
              </span>
            </div>
          </section>

          <section className="mt-3 overflow-hidden rounded-lg bg-white">
            <div className="flex min-h-[60px] flex-wrap items-center gap-3 px-3 py-3 @[700px]:gap-5">
              <span className="size-4 rounded border border-black/25" />
              <span className="text-[13px] text-black/90 @[700px]:text-[14px]">
                0/50 selected
              </span>
              <span className="rounded bg-[#009995] px-4 py-2 text-[13px] font-medium text-white @[700px]:text-[14px]">
                Batch invite
              </span>
              <span className="hidden rounded bg-black/5 px-4 py-2 text-[13px] font-medium text-black/90 @[600px]:inline @[700px]:text-[14px]">
                ♧&nbsp; Batch add to Managed Creators
              </span>
              <span className="ml-auto text-[13px] text-black/65 @[700px]:text-[14px]">
                Sort by <strong className="font-medium text-black/90">Relevancy⌄</strong>
              </span>
              <span className="hidden rounded border border-black/15 px-3 py-1.5 text-[#008a87] @[700px]:inline">
                ☷
              </span>
            </div>
            <div className="overflow-x-auto">
              <div className="grid min-w-[760px] grid-cols-[28px_minmax(240px,1fr)_90px_90px_90px_90px_90px_148px] items-center bg-[#f7f7f7] py-3 text-[11px] text-black/55 @[700px]:text-[12px]">
                <span />
                <span className="px-3">Creator</span>
                <span className="text-center">Top video</span>
                <span className="text-right">Revenue</span>
                <span className="text-right">Units sold</span>
                <span className="text-right">Avg. views</span>
                <span className="text-right">Engagement</span>
                <span />
              </div>
              {CREATORS.map((creator, index) => (
                <CreatorRow creator={creator} index={index} key={index} />
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export function TtsFindCreatorsDemo() {
  const cameraRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const camera = cameraRef.current;
    if (!camera) return;

    const clip = () => {
      const marker = camera.querySelector<HTMLElement>(
        "[data-tts-find-clip-end]",
      );
      if (!marker) return;
      const next = `${Math.max(
        Math.round(
          marker.getBoundingClientRect().bottom -
            camera.getBoundingClientRect().top +
            8,
        ),
        1,
      )}px`;
      if (camera.style.height !== next) camera.style.height = next;
    };

    clip();
    void document.fonts?.ready?.then(clip);
    const observer = new ResizeObserver(clip);
    observer.observe(camera);
    window.addEventListener("resize", clip);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", clip);
    };
  }, []);

  return (
    <section
      className="mt-16 sm:mt-20"
      aria-label="Find creators live demo"
    >
      <div
        className="tts-collab-stage @container"
        aria-label="Interactive TikTok Shop Find Creators demo"
      >
        <div className="tts-collab-bezel">
          <div ref={cameraRef} className="tts-collab-camera">
            <FindCreatorsScreen />
            <AssistantPanel />
          </div>
        </div>
      </div>
    </section>
  );
}
