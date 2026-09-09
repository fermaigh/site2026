"use client";

import type { ReactNode } from "react";
import { TtsIcon } from "@/components/tts/TtsIcon";

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
      { label: "Collaborations", active: true },
      { label: "Find creators" },
      { label: "Content management" },
      { label: "Samples" },
      { label: "Transactions" },
    ],
  },
  { icon: "menu-live", label: "LIVE & Video" },
  { icon: "menu-growth", label: "Growth" },
  { icon: "menu-more", label: "App" },
  { divider: true },
  { icon: "menu-data", label: "Analytics" },
  { icon: "menu-health", label: "Account Health" },
  { icon: "menu-finance", label: "Finances" },
] as const;

function ModeCard({
  active,
  icon,
  iconBg,
  title,
  body,
}: {
  active: boolean;
  icon: string;
  iconBg: string;
  title: string;
  body: string;
}) {
  if (active) {
    return (
      <div className="relative z-[1] flex min-h-[88px] min-w-0 flex-1 gap-3 rounded-t-lg bg-white p-3 shadow-[0px_-4px_12px_0px_rgba(0,0,0,0.12)] @[700px]:min-h-[114px] @[700px]:gap-4 @[700px]:p-6">
        <span
          className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${iconBg} @[700px]:size-11`}
        >
          <TtsIcon name={icon} size={22} />
        </span>
        <div className="min-w-0">
          <p className="text-[14px] font-medium leading-5 text-black @[700px]:text-[16px] @[700px]:leading-6">
            {title}
          </p>
          <p className="mt-1 hidden text-[14px] leading-5 text-[#6c6d6f] @[700px]:block">
            {body}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-1.5 flex min-h-[80px] min-w-0 flex-1 gap-3 rounded-t-lg bg-[#ECECED] px-3 pb-3 pt-2 @[700px]:min-h-[108px] @[700px]:gap-4 @[700px]:px-6 @[700px]:pb-6 @[700px]:pt-4">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#d3d4d5] @[700px]:size-11">
        <TtsIcon name={icon} size={22} />
      </span>
      <div className="min-w-0">
        <p className="text-[14px] font-medium leading-5 text-[#6c6d6f] @[700px]:text-[16px] @[700px]:leading-6">
          {title}
        </p>
        <p className="mt-1 hidden text-[14px] leading-5 text-[#6c6d6f] @[700px]:block">
          {body}
        </p>
      </div>
    </div>
  );
}

export function TtsSellerFrame({
  mode,
  children,
}: {
  mode: "select" | "open";
  children: ReactNode;
}) {
  return (
    <div className="tts-collab-ui flex w-full min-w-0 flex-col bg-[#F5F5F5] text-[#171718]">
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

      <div className="flex min-w-0 bg-[#f5f5f5]">
        <aside className="w-12 shrink-0 bg-white px-1 py-3 @[700px]:w-[200px] @[700px]:px-2 @[700px]:py-4">
          {NAV.map((item, index) => {
            if ("divider" in item && item.divider) {
              return (
                <div
                  key={`divider-${index}`}
                  className="my-1 h-px w-full bg-[#e1e1e2]"
                />
              );
            }
            const navItem = item as {
              icon: string;
              label: string;
              children?: readonly { label: string; active?: boolean }[];
            };
            return (
              <div key={navItem.label}>
                <div className="flex h-8 items-center justify-center gap-2 rounded px-1 text-[13px] leading-5 text-[#171718] @[700px]:h-9 @[700px]:justify-start @[700px]:px-2 @[700px]:text-[14px]">
                  <TtsIcon name={navItem.icon} size={16} />
                  <span className="hidden truncate @[700px]:inline">
                    {navItem.label}
                  </span>
                </div>
                {navItem.children?.map((child) => (
                  <div
                    key={child.label}
                    className={`relative hidden h-9 items-center rounded pl-8 pr-1.5 text-[14px] leading-5 @[700px]:flex ${
                      child.active
                        ? "bg-[#ebebeb] text-[#017b77]"
                        : "text-[#6c6d6f]"
                    }`}
                  >
                    {child.active ? (
                      <span className="absolute inset-y-1 left-0 w-[3px] rounded-r bg-[#008a87]" />
                    ) : null}
                    <span className="truncate">{child.label}</span>
                  </div>
                ))}
              </div>
            );
          })}
        </aside>

        <main className="min-w-0 flex-1 bg-[#F5F5F5] p-3 @[700px]:p-6">
          <h2 className="text-[22px] font-bold leading-8 text-[#171718] @[700px]:text-[28px] @[700px]:leading-9">
            Collaborations
          </h2>
          <div className="relative z-20 mt-3 flex items-stretch @[700px]:mt-4">
            <ModeCard
              active={mode === "select"}
              icon="products-selected"
              iconBg="bg-[#e4f6f5]"
              title="Work with select creators"
              body="Get matched with the right creators for your shop, or find and invite them on your own."
            />
            <ModeCard
              active={mode === "open"}
              icon="influencer-selected"
              iconBg="bg-[#e4f6f5]"
              title="Open collaboration with all"
              body="Set commissions and let eligible creators discover and share your products with their audience."
            />
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
