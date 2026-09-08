"use client";

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
  { icon: "menu-more", label: "Partners" },
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

function Filter({ label, width }: { label: string; width: number }) {
  return (
    <div
      className="flex h-8 items-center justify-between rounded border border-[#d3d4d5] bg-white px-3"
      style={{ width }}
    >
      <span className="whitespace-nowrap text-[14px] leading-5 text-black/65">
        {label}
      </span>
      <TtsIcon name="down-2" size={16} />
    </div>
  );
}

function Badge({ children }: { children: string }) {
  return (
    <span className="inline-flex h-[22px] items-center rounded-full bg-[#ececed] px-2 text-[12px] leading-[18px] text-[#171718]">
      {children}
    </span>
  );
}

export function TtsTargetCollaboration() {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-[#ececed] text-[#171718]">
      <header className="flex h-[60px] shrink-0 items-center justify-between bg-[rgba(0,0,0,0.92)] text-white">
        <div className="flex min-w-0 items-center gap-4 px-4">
          <TtsIcon name="tts-logo" width={80} height={31} />
          <span className="h-4 w-px bg-white/25" />
          <span className="whitespace-nowrap text-[20px] font-medium leading-none">
            Seller Center
          </span>
          <div className="ml-2 flex h-9 w-[400px] max-w-[400px] items-center justify-between rounded bg-[#1f2021] px-3">
            <span className="flex items-center gap-2 text-[14px] font-medium text-white/65">
              <TtsIcon name="search-white" size={16} />
              Ask anything
            </span>
            <span className="text-[14px] font-medium text-white/65">⌘+K</span>
          </div>
        </div>
        <div className="flex items-center gap-2 pr-4">
          <span className="flex items-center gap-2 px-1 text-[14px] font-medium">
            <TtsIcon name="ai-logo" size={24} />
            Assistant
          </span>
          <span className="flex size-9 items-center justify-center">
            <TtsIcon name="question-circle" size={24} />
          </span>
          <span className="h-4 w-px bg-white/50" />
          <span className="flex items-center gap-1 px-4 py-2 text-[14px] font-medium">
            <TtsIcon name="headset" size={24} />
            Customer Messages
            <span className="ml-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-[#e14140] px-1 text-[12px] leading-[18px]">
              8
            </span>
          </span>
          <span className="relative flex size-9 items-center justify-center">
            <TtsIcon name="notice" size={24} />
            <span className="absolute -top-0.5 right-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-[#e14140] px-1 text-[12px] leading-[18px]">
              8
            </span>
          </span>
          <span className="flex h-9 items-center rounded-full bg-white/20 pr-4">
            <span className="flex size-9 items-center justify-center rounded-full bg-[#6c6c6c]">
              <TtsIcon name="concatenate" size={18} />
            </span>
            <span className="pl-2 text-[14px] font-medium">Testaccount</span>
          </span>
        </div>
      </header>

      <div className="flex min-h-0 flex-1 bg-[#f5f5f5]">
        <aside className="w-[220px] shrink-0 overflow-hidden bg-white px-2 py-4">
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
                <div className="flex h-9 items-center gap-2 rounded px-2 text-[14px] leading-5 text-[#171718]">
                  <TtsIcon name={navItem.icon} size={16} />
                  <span className="truncate">{navItem.label}</span>
                </div>
                {navItem.children?.map((child) => (
                  <div
                    key={child.label}
                    className={`relative flex h-9 items-center rounded pl-8 pr-1.5 text-[14px] leading-5 ${
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

        <main className="min-w-0 flex-1 p-6">
          <h2 className="text-[28px] font-bold leading-9 text-[#171718]">
            Collaborations
          </h2>

          <div className="mt-4 flex items-end">
            <div className="flex h-[114px] flex-1 gap-4 rounded-t-lg bg-white p-6 shadow-[0px_-4px_12px_0px_rgba(0,0,0,0.12)]">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-[#e4f6f5]">
                <TtsIcon name="products-selected" size={26} />
              </span>
              <div className="min-w-0">
                <p className="text-[16px] font-medium leading-6 text-black">
                  Work with select creators
                </p>
                <p className="mt-1 text-[14px] leading-5 text-[#6c6d6f]">
                  Get matched with the right creators for your shop, or find
                  and invite them on your own.
                </p>
              </div>
            </div>
            <div className="ml-2 flex h-[108px] flex-1 gap-4 rounded-t-lg bg-[#ececed] px-6 pb-6 pt-4">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-[#d3d4d5]">
                <TtsIcon name="influencer-selected" size={26} />
              </span>
              <div className="min-w-0">
                <p className="text-[16px] font-medium leading-6 text-[#6c6d6f]">
                  Open collaboration with all
                </p>
                <p className="mt-1 text-[14px] leading-5 text-[#6c6d6f]">
                  Set commissions and let eligible creators discover and share
                  your products with their audience.
                </p>
              </div>
            </div>
          </div>

          <div className="-mt-0.5 rounded-b-lg bg-white p-6">
            <div className="flex items-center justify-between">
              <div className="flex h-10 items-center gap-8">
                <span className="text-[16px] font-medium leading-6 text-[#171718]">
                  Platform collaborations
                </span>
                <span className="flex h-10 flex-col items-center justify-between pt-2">
                  <span className="text-[16px] font-medium leading-6 text-[#171718]">
                    Target collaborations
                  </span>
                  <span className="h-0.5 w-full bg-[#008a87]" />
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 rounded bg-black/5 px-3 py-1.5 text-[14px] font-medium text-black/90">
                  Outreach usage
                  <span className="ml-1 rounded bg-[#d8f8c8] px-1.5 text-[12px] leading-[18px] text-[#1b7a1b]">
                    800
                  </span>
                </span>
                <span className="tts-invite-btn flex items-center gap-1 rounded bg-[#008a87] px-3 py-1.5 text-[14px] font-medium text-white">
                  Invite to collaborate
                  <TtsIcon name="down" size={16} />
                </span>
              </div>
            </div>

            <div className="mt-4 flex h-8 items-center gap-2">
              <div className="flex h-8 w-[360px] items-center gap-2 rounded border border-[#d3d4d5] bg-white px-3">
                <span className="flex items-center gap-0.5 text-[14px] text-[#6c6d6f]">
                  Invitation name
                  <TtsIcon name="down-1" size={16} />
                </span>
                <span className="flex-1 text-[14px] text-black/35">Search</span>
                <TtsIcon name="search" size={16} />
              </div>
              <Filter label="All fee structures" width={179} />
              <Filter label="All recruiting methods" width={227} />
              <Filter label="All status" width={124} />
              <span className="px-3 text-[14px] font-medium text-[#017b77]">
                Reset
              </span>
            </div>

            <div className="mt-4 overflow-hidden rounded-lg border border-[#e1e1e2]">
              <table className="w-full border-collapse text-left">
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
                  {ROWS.map((row, index) => (
                    <tr
                      key={row.name}
                      className={`border-t border-[#e1e1e2] bg-white ${
                        index === 0 ? "tts-collab-row-hot" : ""
                      }`}
                    >
                      <td className="px-3 py-3">
                        <p className="text-[16px] font-medium leading-6 text-black/90">
                          {row.name}
                        </p>
                        <p className="mt-1 flex items-center gap-2 text-[14px] leading-5 text-black/65">
                          {row.modified}
                          <span className="h-2 w-px bg-[#d3d4d5]" />
                          {row.products}
                        </p>
                      </td>
                      <td className="px-3 py-3">
                        <Badge>{row.fee}</Badge>
                      </td>
                      <td className="px-3 py-3">
                        <p className="text-[14px] leading-5 text-[#171718]">
                          {row.recruiting}
                        </p>
                        {"progress" in row && row.progress ? (
                          <span className="mt-2 flex h-1.5 w-[75px] overflow-hidden rounded-full bg-[#ececed]">
                            <span
                              className="tts-progress-fill h-full origin-left bg-[#008a87]"
                              style={{ width: `${row.progress}%` }}
                            />
                          </span>
                        ) : null}
                      </td>
                      <td className="px-3 py-3">
                        <span className="flex items-center gap-1.5 text-[14px] leading-5 text-[#171718]">
                          <TtsIcon
                            name={
                              row.status === "Ongoing" ? "dot-green" : "dot-gray"
                            }
                            size={8}
                          />
                          {row.status}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-[14px] leading-5 text-[#171718]">
                        {row.rate}
                      </td>
                      <td className="px-3 py-3 text-[14px] leading-5 text-[#171718]">
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
