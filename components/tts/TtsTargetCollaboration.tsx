"use client";

import type { ReactNode } from "react";
import { TtsIcon } from "@/components/tts/TtsIcon";
import { TtsInviteMenu } from "@/components/tts/TtsInviteMenu";

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

const ROWS = [
  {
    name: "Summer Glow Skincare Launch",
    modified: "Last modified on 12/18/2026",
    products: "5 products",
    fee: "Commission only",
    recruiting: "Platform outreach",
    progress: 50,
    status: "Ongoing",
    rate: "39%",
    creators: "40",
  },
  {
    name: "Labor Day Gift Guide 2026",
    modified: "Last modified on 06/12/2026",
    products: "26 products",
    fee: "Commission only",
    recruiting: "Manual outreach",
    status: "Completed",
    rate: "76%",
    creators: "80",
  },
  {
    name: "Active Wear Spring Refresh",
    modified: "Last modified on 04/03/2026",
    products: "13 products",
    fee: "Flat fee based",
    recruiting: "Manual outreach",
    status: "Ongoing",
    rate: "54%",
    creators: "40",
  },
  {
    name: "Protein Snack Bar Sampling",
    modified: "Last modified on 02/29/2026",
    products: "3 products",
    fee: "Commission only",
    recruiting: "Platform outreach",
    progress: 50,
    status: "Ongoing",
    rate: "10%",
    creators: "40",
  },
  {
    name: "Home Fragrance Collection Drop",
    modified: "Last modified on 12/18/2026",
    products: "5 products",
    fee: "Flat fee based",
    recruiting: "Manual outreach",
    status: "Ongoing",
    rate: "40%",
    creators: "40",
  },
] as const;

function Filter({ label }: { label: string }) {
  return (
    <div className="flex h-8 min-w-0 flex-1 items-center justify-between gap-2 rounded border border-[#d3d4d5] bg-white px-3 @[900px]:max-w-[227px] @[900px]:flex-none">
      <span className="truncate text-[13px] leading-5 text-black/65 @[700px]:text-[14px]">
        {label}
      </span>
      <TtsIcon name="down-2" size={16} />
    </div>
  );
}

export function TtsTargetCollaboration({
  children,
}: {
  children?: ReactNode;
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
            <div className="relative z-[1] flex min-h-[88px] min-w-0 flex-1 gap-3 rounded-t-lg bg-white p-3 shadow-[0px_-4px_12px_0px_rgba(0,0,0,0.12)] @[700px]:min-h-[114px] @[700px]:gap-4 @[700px]:p-6">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#e4f6f5] @[700px]:size-11">
                <TtsIcon name="products-selected" size={22} />
              </span>
              <div className="min-w-0">
                <p className="text-[14px] font-medium leading-5 text-black @[700px]:text-[16px] @[700px]:leading-6">
                  Work with select creators
                </p>
                <p className="mt-1 hidden text-[14px] leading-5 text-[#6c6d6f] @[700px]:block">
                  Get matched with the right creators for your shop, or find
                  and invite them on your own.
                </p>
              </div>
            </div>
            <div className="mt-1.5 flex min-h-[80px] min-w-0 flex-1 gap-3 rounded-t-lg bg-[#ECECED] px-3 pb-3 pt-2 @[700px]:min-h-[108px] @[700px]:gap-4 @[700px]:px-6 @[700px]:pb-6 @[700px]:pt-4">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#d3d4d5] @[700px]:size-11">
                <TtsIcon name="influencer-selected" size={22} />
              </span>
              <div className="min-w-0">
                <p className="text-[14px] font-medium leading-5 text-[#6c6d6f] @[700px]:text-[16px] @[700px]:leading-6">
                  Open collaboration with all
                </p>
                <p className="mt-1 hidden text-[14px] leading-5 text-[#6c6d6f] @[700px]:block">
                  Set commissions and let eligible creators discover and share
                  your products with their audience.
                </p>
              </div>
            </div>
          </div>

          <div className="relative z-10 -mt-2 rounded-b-lg bg-white p-3 @[700px]:p-6">
            <div className="flex flex-col gap-3 @[800px]:flex-row @[800px]:items-center @[800px]:justify-between">
              <div className="flex h-9 items-center gap-5 @[700px]:h-10 @[700px]:gap-8">
                <span className="text-[14px] font-medium leading-6 text-[#171718] @[700px]:text-[16px]">
                  Platform collaborations
                </span>
                <span className="flex h-9 flex-col items-center justify-between pt-1.5 @[700px]:h-10 @[700px]:pt-2">
                  <span className="text-[14px] font-medium leading-6 text-[#171718] @[700px]:text-[16px]">
                    Target collaborations
                  </span>
                  <span className="h-0.5 w-full bg-[#008a87]" />
                </span>
              </div>
              <div className="relative flex flex-wrap items-center gap-2">
                <span className="flex items-center gap-1 rounded bg-black/5 px-3 py-1.5 text-[13px] font-medium text-black/90 @[700px]:text-[14px]">
                  Outreach usage
                  <span className="ml-1 rounded bg-[#d8f8c8] px-1.5 text-[12px] leading-[18px] text-[#1b7a1b]">
                    800
                  </span>
                </span>
                <span className="tts-invite-anchor">
                  <span className="tts-invite-btn flex items-center gap-1 rounded bg-[#008a87] px-3 py-1.5 text-[13px] font-medium text-white @[700px]:text-[14px]">
                    <span className="tts-invite-aim">Invite to collaborate</span>
                    <TtsIcon name="down" size={16} />
                  </span>
                  {children}
                </span>
                <div className="absolute right-0 top-[calc(100%+8px)] z-30 w-[min(32rem,calc(100cqi-4.5rem))]">
                  <TtsInviteMenu />
                </div>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2 @[700px]:mt-4">
              <div className="flex h-8 min-w-[12rem] flex-1 items-center gap-2 rounded border border-[#d3d4d5] bg-white px-3 @[900px]:max-w-[360px] @[900px]:flex-none">
                <span className="flex shrink-0 items-center gap-0.5 text-[13px] text-[#6c6d6f] @[700px]:text-[14px]">
                  Invitation name
                  <TtsIcon name="down-1" size={16} />
                </span>
                <span className="min-w-0 flex-1 truncate text-[13px] text-black/35 @[700px]:text-[14px]">
                  Search
                </span>
                <TtsIcon name="search" size={16} />
              </div>
              <Filter label="All fee structures" />
              <Filter label="All recruiting methods" />
              <Filter label="All status" />
              <span className="px-2 text-[13px] font-medium text-[#017b77] @[700px]:px-3 @[700px]:text-[14px]">
                Reset
              </span>
            </div>

            <div className="mt-3 overflow-x-auto rounded-lg border border-[#e1e1e2] @[700px]:mt-4">
              <table className="w-full min-w-[640px] border-collapse text-left">
                <thead>
                  <tr className="bg-[#f9f9f9] text-[12px] font-medium leading-[18px] text-[#171718]">
                    <th className="px-3 py-3 font-medium">Collaboration name</th>
                    <th className="px-3 py-3 font-medium">Fee structure</th>
                    <th className="px-3 py-3 font-medium">Recruiting method</th>
                    <th className="px-3 py-3 font-medium">Status</th>
                    <th className="px-3 py-3 font-medium">
                      Sample approval rate
                    </th>
                    <th className="px-3 py-3 font-medium">Creator</th>
                    <th className="px-3 py-3 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {ROWS.map((row) => (
                    <tr
                      key={row.name}
                      className="border-t border-[#e1e1e2] bg-white"
                      {...(row.name === "Active Wear Spring Refresh"
                        ? { "data-tts-clip-end": "" }
                        : {})}
                    >
                      <td className="px-3 py-3">
                        <p className="text-[14px] font-medium leading-6 text-black/90 @[700px]:text-[16px]">
                          {row.name}
                        </p>
                        <p className="mt-1 flex flex-wrap items-center gap-2 text-[13px] leading-5 text-black/65 @[700px]:text-[14px]">
                          {row.modified}
                          <span className="h-2 w-px bg-[#d3d4d5]" />
                          {row.products}
                        </p>
                      </td>
                      <td className="px-3 py-3 text-[13px] leading-5 text-[#171718] @[700px]:text-[14px]">
                        {row.fee}
                      </td>
                      <td className="px-3 py-3">
                        <p className="text-[13px] leading-5 text-[#171718] @[700px]:text-[14px]">
                          {row.recruiting}
                        </p>
                        {"progress" in row && row.progress ? (
                          <span className="mt-2 flex h-1.5 w-[75px] overflow-hidden rounded-full bg-[#ececed]">
                            <span
                              className="h-full bg-[#008a87]"
                              style={{ width: `${row.progress}%` }}
                            />
                          </span>
                        ) : null}
                      </td>
                      <td className="px-3 py-3">
                        <span className="flex items-center gap-1.5 text-[13px] leading-5 text-[#171718] @[700px]:text-[14px]">
                          <TtsIcon
                            name={
                              row.status === "Ongoing" ? "dot-green" : "dot-gray"
                            }
                            size={8}
                          />
                          {row.status}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-[13px] leading-5 text-[#171718] @[700px]:text-[14px]">
                        {row.rate}
                      </td>
                      <td className="px-3 py-3 text-[13px] leading-5 text-[#171718] @[700px]:text-[14px]">
                        {row.creators}
                      </td>
                      <td className="px-3 py-3">
                        <span className="flex items-center gap-1">
                          <span className="rounded border border-[#d3d4d5] px-2 py-0.5 text-[12px] font-medium text-[#171718]">
                            View
                          </span>
                          <span className="flex size-6 items-center justify-center rounded border border-[#d3d4d5]">
                            <TtsIcon name="more" size={16} />
                          </span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
