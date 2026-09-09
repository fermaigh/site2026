"use client";

import type { ReactNode } from "react";
import { TtsAddProductsMenu } from "@/components/tts/TtsAddProductsMenu";
import { TtsIcon } from "@/components/tts/TtsIcon";
import { TtsSellerFrame } from "@/components/tts/TtsSellerFrame";

const PRODUCTS = [
  {
    name: "Vitamin C Serum 30ml",
    sku: "SKU-20418 · Beauty",
    commission: "15%",
    showcase: "LIVE & Video",
    status: "Active",
    creators: "1.2K",
  },
  {
    name: "Hydrating Night Cream",
    sku: "SKU-11802 · Beauty",
    commission: "12%",
    showcase: "Video",
    status: "Active",
    creators: "860",
  },
  {
    name: "SPF 50 Daily Moisturizer",
    sku: "SKU-33091 · Beauty",
    commission: "18%",
    showcase: "LIVE",
    status: "Active",
    creators: "2.4K",
  },
  {
    name: "Lip Sleeping Mask",
    sku: "SKU-44120 · Beauty",
    commission: "10%",
    showcase: "Video",
    status: "Paused",
    creators: "310",
  },
  {
    name: "Hair Strengthening Oil",
    sku: "SKU-55211 · Hair",
    commission: "14%",
    showcase: "LIVE & Video",
    status: "Active",
    creators: "540",
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

export function TtsOpenCollaboration({
  children,
}: {
  children?: ReactNode;
}) {
  return (
    <TtsSellerFrame mode="open">
      <div className="relative z-10 -mt-2 rounded-b-lg bg-white p-3 @[700px]:p-6">
        <div className="flex flex-col gap-3 @[800px]:flex-row @[800px]:items-center @[800px]:justify-between">
          <p className="text-[14px] font-medium leading-6 text-[#171718] @[700px]:text-[16px]">
            Products in open collaboration
          </p>
          <div className="relative flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1 rounded bg-black/5 px-3 py-1.5 text-[13px] font-medium text-black/90 @[700px]:text-[14px]">
              Eligible creators
              <span className="ml-1 rounded bg-[#d8f8c8] px-1.5 text-[12px] leading-[18px] text-[#1b7a1b]">
                12.4K
              </span>
            </span>
            <span className="tts-invite-anchor">
              <span className="tts-invite-btn flex items-center gap-1 rounded bg-[#008a87] px-3 py-1.5 text-[13px] font-medium text-white @[700px]:text-[14px]">
                Add products
                <TtsIcon name="down" size={16} className="tts-invite-chevron" />
              </span>
              {children}
            </span>
            <div className="absolute right-0 top-[calc(100%+8px)] z-30 w-[min(32rem,calc(100cqi-4.5rem))]">
              <TtsAddProductsMenu />
            </div>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2 @[700px]:mt-4">
          <div className="flex h-8 min-w-[12rem] flex-1 items-center gap-2 rounded border border-[#d3d4d5] bg-white px-3 @[900px]:max-w-[360px] @[900px]:flex-none">
            <span className="flex shrink-0 items-center gap-0.5 text-[13px] text-[#6c6d6f] @[700px]:text-[14px]">
              Product name
              <TtsIcon name="down-1" size={16} />
            </span>
            <span className="min-w-0 flex-1 truncate text-[13px] text-black/35 @[700px]:text-[14px]">
              Search
            </span>
            <TtsIcon name="search" size={16} />
          </div>
          <Filter label="All commission" />
          <Filter label="All showcase" />
          <Filter label="All status" />
          <span className="px-2 text-[13px] font-medium text-[#017b77] @[700px]:px-3 @[700px]:text-[14px]">
            Reset
          </span>
        </div>

        <div className="mt-3 overflow-x-auto rounded-lg border border-[#e1e1e2] @[700px]:mt-4">
          <table className="w-full min-w-[640px] border-collapse text-left">
            <thead>
              <tr className="bg-[#f9f9f9] text-[12px] font-medium leading-[18px] text-[#171718]">
                <th className="px-3 py-3 font-medium">Product</th>
                <th className="px-3 py-3 font-medium">Commission</th>
                <th className="px-3 py-3 font-medium">Showcase</th>
                <th className="px-3 py-3 font-medium">Status</th>
                <th className="px-3 py-3 font-medium">Creators</th>
                <th className="px-3 py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {PRODUCTS.map((row) => (
                <tr
                  key={row.name}
                  className="border-t border-[#e1e1e2] bg-white"
                  {...(row.name === "SPF 50 Daily Moisturizer"
                    ? { "data-tts-clip-end": "" }
                    : {})}
                >
                  <td className="px-3 py-3">
                    <p className="text-[14px] font-medium leading-6 text-black/90 @[700px]:text-[16px]">
                      {row.name}
                    </p>
                    <p className="mt-1 text-[13px] leading-5 text-black/65 @[700px]:text-[14px]">
                      {row.sku}
                    </p>
                  </td>
                  <td className="px-3 py-3 text-[13px] leading-5 text-[#171718] @[700px]:text-[14px]">
                    {row.commission}
                  </td>
                  <td className="px-3 py-3 text-[13px] leading-5 text-[#171718] @[700px]:text-[14px]">
                    {row.showcase}
                  </td>
                  <td className="px-3 py-3">
                    <span className="flex items-center gap-1.5 text-[13px] leading-5 text-[#171718] @[700px]:text-[14px]">
                      <TtsIcon
                        name={
                          row.status === "Active" ? "dot-green" : "dot-gray"
                        }
                        size={8}
                      />
                      {row.status}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-[13px] leading-5 text-[#171718] @[700px]:text-[14px]">
                    {row.creators}
                  </td>
                  <td className="px-3 py-3">
                    <span className="flex items-center gap-1">
                      <span className="rounded border border-[#d3d4d5] px-2 py-0.5 text-[12px] font-medium text-[#171718]">
                        Edit
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
    </TtsSellerFrame>
  );
}
