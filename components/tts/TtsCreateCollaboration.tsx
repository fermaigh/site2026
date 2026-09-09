"use client";

import Image from "next/image";
import { TtsIcon } from "@/components/tts/TtsIcon";

const ASSET_ROOT = "/projects/tts-ui";

function SellerTopBar() {
  return (
    <header className="flex h-[60px] items-center justify-between bg-[rgba(0,0,0,0.92)] px-4 text-white">
      <div className="flex items-center gap-4">
        <TtsIcon name="tts-logo" width={72} height={28} />
        <span className="h-4 w-px bg-white/25" />
        <span className="text-[20px] font-medium">Seller Center</span>
        <div className="ml-1 flex h-9 w-[400px] items-center justify-between rounded bg-[#1f2021] px-3">
          <span className="flex items-center gap-2 text-[14px] font-medium text-white/65">
            <TtsIcon name="search-white" size={16} />
            Ask anything
          </span>
          <span className="text-[14px] font-medium text-white/65">⌘+K</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="flex items-center gap-2 px-1 text-[14px] font-medium">
          <TtsIcon name="ai-logo" size={24} />
          Assistant
        </span>
        <span className="flex size-9 items-center justify-center">
          <TtsIcon name="question-circle" size={22} />
        </span>
        <span className="h-4 w-px bg-white/50" />
        <span className="flex items-center gap-1 px-2 py-2 text-[14px] font-medium">
          <TtsIcon name="headset" size={22} />
          Customer Messages
          <span className="ml-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-[#e14140] px-1 text-[12px]">
            8
          </span>
        </span>
        <span className="relative flex size-9 items-center justify-center">
          <TtsIcon name="notice" size={22} />
          <span className="absolute -top-0.5 right-0 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-[#e14140] px-1 text-[12px]">
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
  );
}

function Stepper() {
  return (
    <div className="mt-4 flex w-[852px] items-center text-[16px]">
      {["General info", "Products", "Preferences", "Review"].map(
        (label, index) => (
          <div className="flex items-center" key={label}>
            <span
              className={`flex size-5 items-center justify-center rounded-full text-[12px] ${
                index === 0
                  ? "bg-[#009995] text-white"
                  : "border border-[#d3d4d5] text-[#6c6d6f]"
              }`}
            >
              {index + 1}
            </span>
            <span
              className={`ml-2 whitespace-nowrap ${
                index === 0 ? "font-medium text-[#171718]" : "text-[#6c6d6f]"
              }`}
            >
              {label}
            </span>
            {index < 3 ? (
              <span className="mx-2 h-px w-[72px] bg-[#d3d4d5]" />
            ) : null}
          </div>
        ),
      )}
    </div>
  );
}

function Field({
  label,
  placeholder,
  help,
  calendar,
}: {
  label: string;
  placeholder: string;
  help?: string;
  calendar?: boolean;
}) {
  return (
    <div>
      <p className="text-[14px] font-medium leading-5">
        <span className="text-[#e14140]">*</span> {label}
      </p>
      <div className="mt-2 flex h-8 items-center rounded border border-[#d3d4d5] bg-white px-3 text-[14px] text-[#a9abad]">
        <span className="flex-1">{placeholder}</span>
        {calendar ? (
          <Image
            src={`${ASSET_ROOT}/create-collaboration-calendar.svg`}
            alt=""
            width={16}
            height={16}
          />
        ) : null}
      </div>
      {help ? (
        <p className="mt-1 text-[14px] leading-5 text-black/55">{help}</p>
      ) : null}
    </div>
  );
}

function CreatorPreview() {
  return (
    <aside className="absolute left-[879px] top-[88px] w-[220px]">
      <p className="text-[14px] font-medium">Creator preview</p>
      <div className="relative mt-5 h-[576px] overflow-hidden rounded-[7px] bg-white shadow-sm">
        <div className="h-[124px] bg-gradient-to-b from-[#555] to-black px-2 pt-2 text-white">
          <div className="flex justify-between text-[9px]">
            <span>9:41</span>
            <span>▮▮ ◉</span>
          </div>
          <p className="mt-12 text-[19px] font-bold">Invitation</p>
          <p className="mt-1 text-[9px] text-white/60">
            Valid until Aug 21, 2026
          </p>
        </div>
        <div className="flex h-6 border-b border-black/10 text-[8px]">
          <span className="flex flex-1 items-center justify-center border-b border-black">
            Overview
          </span>
          <span className="flex flex-1 items-center justify-center text-black/55">
            Products (3)
          </span>
        </div>
        <div className="p-2 text-[9px]">
          <p className="font-bold">About this shop</p>
          <div className="mt-3 flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-full bg-black/20">
              ◫
            </span>
            <span>
              <strong className="block">SkinCare Shop</strong>
              <span className="text-black/55">★ 4.5 · 66.5K sold · 103 collabs</span>
            </span>
          </div>
          <div className="mt-5 border-t pt-4">
            <p className="font-bold">Preferred content type</p>
            <p className="mt-3">Short Video</p>
          </div>
          <div className="mt-5 border-t pt-4">
            <p className="font-bold">Incentives</p>
            {[
              ["Free sample", "Not set"],
              ["Commission rate", "Not set"],
              ["Product price", "Not set"],
            ].map(([label, value]) => (
              <div className="mt-3 flex justify-between" key={label}>
                <span>{label}</span>
                <span className="text-black/55">{value}</span>
              </div>
            ))}
          </div>
          <div className="mt-5 border-t pt-4">
            <p className="font-bold">Products</p>
          </div>
        </div>
        <div className="absolute bottom-3 left-2 right-2 flex h-7 items-center justify-center rounded-lg bg-[#fe2c55] text-[9px] font-medium text-white">
          Accept
        </div>
      </div>
    </aside>
  );
}

export function TtsCreateCollaboration() {
  return (
    <div className="tts-demo1-next-page absolute inset-0 z-40 w-[1440px] min-w-[1440px] bg-[#f5f5f5] text-[#171718]">
      <SellerTopBar />
      <div className="relative ml-[200px] w-[1100px] py-4">
        <div className="flex h-9 items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded bg-[#ececed]">
            <Image
              src={`${ASSET_ROOT}/create-collaboration-back.svg`}
              alt=""
              width={16}
              height={16}
            />
          </span>
          <h2 className="text-[28px] font-bold leading-9">
            Create collaboration
          </h2>
        </div>
        <Stepper />

        <section className="mt-4 w-[852px] rounded-lg bg-white p-6">
          <h3 className="text-[20px] font-medium leading-7">General info</h3>
          <div className="mt-6 grid grid-cols-[400px_368px] gap-9">
            <div>
              <p className="text-[14px] font-medium">Notes</p>
              <ul className="ml-[18px] mt-1 list-disc text-[12px] leading-[18px] text-[#848688]">
                <li>
                  Name this invitation something you&apos;ll recognize later
                  (e.g., purpose, event). Creators won&apos;t see this name.
                </li>
                <li>
                  Your invitation goal determines how TikTok Shop matches
                  creators for you.
                </li>
                <li>
                  Once this invitation expires, creators can no longer accept it
                  or earn the offered commission.
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <Field label="Invitation name" placeholder="Invitation name" />
              <div>
                <p className="text-[14px] font-medium">
                  <span className="text-[#e14140]">*</span> Invitation goal
                </p>
                <div className="mt-2 space-y-2 text-[14px]">
                  {[
                    "Boost sales",
                    "Increase views and engagement",
                    "Get high quality content",
                  ].map((label, index) => (
                    <p className="flex items-center gap-2" key={label}>
                      <span
                        className={`size-4 rounded-full ${
                          index === 0
                            ? "border-[5px] border-[#009995]"
                            : "border border-[#d3d4d5]"
                        }`}
                      />
                      {label}
                    </p>
                  ))}
                </div>
              </div>
              <Field
                label="Recruiting end date"
                placeholder="Recruitment end date"
                help="At least 7 days from today"
                calendar
              />
              <Field
                label="Collaboration valid until"
                placeholder="Collaboration end date"
                help="At least 30 days after the recruiting period ends"
                calendar
              />
            </div>
          </div>
        </section>
        <CreatorPreview />
      </div>
    </div>
  );
}
