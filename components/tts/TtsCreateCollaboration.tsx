"use client";

import Image from "next/image";
import { TtsSellerTopBar } from "@/components/tts/TtsSellerTopBar";

const ASSET_ROOT = "/projects/tts-ui";
const CREATE_ROOT = `${ASSET_ROOT}/create-collaboration`;

function Stepper() {
  const steps = ["General info", "Products", "Preferences", "Review"];

  return (
    <div className="mt-4 flex w-full max-w-[852px] items-center gap-2 text-[16px]">
      {steps.map((label, index) => (
        <div className="flex min-w-[140px] items-center gap-2" key={label}>
          <span
            className={`flex size-5 shrink-0 items-center justify-center rounded-full text-[12px] ${
              index === 0
                ? "bg-[#009995] text-white"
                : "border border-[#d3d4d5] text-[#6c6d6f]"
            }`}
          >
            {index + 1}
          </span>
          <span
            className={`whitespace-nowrap ${
              index === 0 ? "font-medium text-[#171718]" : "text-[#6c6d6f]"
            }`}
          >
            {label}
          </span>
          {index < steps.length - 1 ? (
            <Image
              src={`${CREATE_ROOT}/steps-line.svg`}
              alt=""
              width={72}
              height={24}
              className="ml-1 h-6 w-[72px]"
            />
          ) : null}
        </div>
      ))}
    </div>
  );
}

function Field({
  label,
  placeholder,
  value,
  help,
  calendar,
  optional,
  disabled,
  prefix,
}: {
  label: string;
  placeholder: string;
  value?: string;
  help?: string;
  calendar?: boolean;
  optional?: boolean;
  disabled?: boolean;
  prefix?: string;
}) {
  return (
    <div>
      <p className="text-[14px] font-medium leading-5">
        {optional ? null : <span className="text-[#e14140]">*</span>} {label}
      </p>
      <div
        className={`mt-2 flex h-8 items-center rounded border pr-3 text-[14px] ${
          disabled
            ? "border-[#e1e1e2] bg-[#f5f5f5]"
            : "border-[#d3d4d5] bg-white"
        }`}
      >
        {prefix ? (
          <span className="flex items-center gap-1 pl-3 pr-2">
            {prefix}
            <Image
              src={`${ASSET_ROOT}/down-1.svg`}
              alt=""
              width={16}
              height={16}
            />
          </span>
        ) : null}
        <span
          className={`flex-1 ${prefix ? "" : "pl-3"} ${
            disabled || !value ? "text-[#a9abad]" : "text-[#171718]"
          }`}
        >
          {value ?? placeholder}
        </span>
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

function SectionRow({
  title,
  note,
  children,
}: {
  title: string;
  note: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[minmax(0,400px)_minmax(0,1fr)] gap-9">
      <div>
        <p className="text-[14px] font-medium leading-5">{title}</p>
        <div className="mt-1 text-[12px] leading-[18px] text-[#6c6d6f]">
          {note}
        </div>
      </div>
      <div className="min-w-0 space-y-4">{children}</div>
    </div>
  );
}

function CreatorPreview() {
  return (
    <aside className="w-[220px] shrink-0">
      <p className="text-center text-[14px] font-medium text-black">
        Creator preview
      </p>
      <div className="relative mt-5 h-[576px] overflow-hidden rounded-[7px] bg-white shadow-[0_1px_4px_rgba(0,0,0,0.08)]">
        <div className="relative h-[124px] overflow-hidden bg-gradient-to-b from-[#555] to-black px-2.5 pt-2 text-white">
          <div className="flex items-center justify-between text-[9px]">
            <span className="font-semibold tracking-tight">9:41</span>
            <Image
              src={`${CREATE_ROOT}/status-icons.svg`}
              alt=""
              width={39}
              height={7}
              className="h-[7px] w-[39px]"
            />
          </div>
          <div className="mt-1 flex items-center">
            <Image
              src={`${CREATE_ROOT}/nav-back.svg`}
              alt=""
              width={14}
              height={14}
              className="size-3.5"
            />
          </div>
          <p className="mt-3 text-[19px] font-bold leading-none">Invitation</p>
          <p className="mt-1 text-[9px] text-white/60">
            Valid until Aug 21, 2026
          </p>
        </div>

        <div className="flex h-6 border-b border-black/10 text-[9px]">
          <span className="relative flex flex-1 items-center justify-center font-medium text-black">
            Overview
            <span className="absolute inset-x-0 bottom-0 h-[1.5px] bg-black" />
          </span>
          <span className="flex flex-1 items-center justify-center text-black/55">
            Products (3)
          </span>
        </div>

        <div className="px-2.5 pb-16 pt-3 text-[9px] text-[#161823]">
          <p className="text-[10px] font-bold">About this shop</p>
          <div className="mt-2 flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-full bg-black/20">
              <Image
                src={`${CREATE_ROOT}/media-image.svg`}
                alt=""
                width={19}
                height={19}
              />
            </span>
            <span>
              <strong className="block text-[10px] font-medium">
                SkinCare Shop
              </strong>
              <span className="mt-0.5 flex items-center gap-1 text-[8px] text-black/60">
                <Image
                  src={`${CREATE_ROOT}/star-fill.svg`}
                  alt=""
                  width={7}
                  height={7}
                />
                4.5
                <Image
                  src={`${CREATE_ROOT}/info-circle.svg`}
                  alt=""
                  width={7}
                  height={7}
                />
                <span className="text-black/25">|</span>
                66.5K sold
                <span className="text-black/25">|</span>
                103 collabs
              </span>
            </span>
          </div>
          <span className="mt-2 inline-flex items-center rounded bg-black/5 px-1 py-px text-[6px] text-black/80">
            Performs better than 97% of other shops
            <Image
              src={`${CREATE_ROOT}/chevron-right.svg`}
              alt=""
              width={8}
              height={8}
              className="ml-0.5"
            />
          </span>

          <div className="mt-4 border-t border-black/10 pt-3">
            <p className="text-[10px] font-bold">Preferred content type</p>
            <p className="mt-2 text-[9px] text-black/70">Short Video</p>
          </div>

          <div className="mt-4 border-t border-black/10 pt-3">
            <p className="text-[10px] font-bold">Incentives</p>
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

          <div className="mt-4 border-t border-black/10 pt-3">
            <p className="text-[10px] font-bold">Products</p>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 bg-white px-2.5 pb-5 pt-2">
          <div className="flex h-7 items-center justify-center rounded-lg bg-[#fe2c55] text-[9px] font-medium text-white">
            Accept
          </div>
        </div>
      </div>
    </aside>
  );
}

export function TtsCreateCollaboration() {
  return (
    <div className="tts-demo1-next-page absolute inset-x-0 top-0 z-40 flex w-full flex-col bg-[#f5f5f5] text-[#171718]">
      <TtsSellerTopBar />
      <div className="tts-demo1-create-center flex justify-center px-6 py-4 pb-6">
        <div className="flex w-[1100px] max-w-full gap-7">
          <div className="min-w-0 flex-1">
            <div className="flex h-9 items-center gap-2">
              <span className="flex size-8 items-center justify-center rounded bg-[#ececed]">
                <Image
                  src={`${CREATE_ROOT}/back-arrow.svg`}
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

            {/* Figma Section body 1664:36538 — keep full General info form in view */}
            <section className="mt-4 w-full max-w-[852px] rounded-lg bg-white p-6">
              <h3 className="text-[20px] font-medium leading-7">
                General info
              </h3>
              <div className="mt-6">
                <SectionRow
                  title="Notes"
                  note={
                    <ul className="ml-[18px] list-disc text-[#848688]">
                      <li className="leading-[18px]">
                        Name this invitation something you&apos;ll recognize
                        later (e.g., purpose, event). Creators won&apos;t see
                        this name.
                      </li>
                      <li className="leading-[18px]">
                        Your invitation goal determines how TikTok Shop matches
                        creators for you.
                      </li>
                      <li className="leading-[18px]">
                        Once this invitation expires, creators can no longer
                        accept it or earn the offered commission.
                      </li>
                    </ul>
                  }
                >
                  <Field
                    label="Invitation name"
                    placeholder="Invitation name"
                  />
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
                </SectionRow>
              </div>

              <div className="my-6 h-px bg-[#d3d4d5]" />

              <SectionRow
                title="Contact info"
                note="Share your contact info so invited creators can reach out with questions."
              >
                <Field
                  label="Email address"
                  placeholder="Email address"
                  value="testaccount@xy.com"
                />
                <Field
                  label="Phone"
                  placeholder="Phone number"
                  value="348 348 3423"
                  prefix="US +1"
                />
              </SectionRow>

              <div className="my-6 h-px bg-[#d3d4d5]" />

              <SectionRow
                title="Invitation text"
                note="Introduce yourself and share a bit about why you're excited to collaborate."
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-[#ececed] px-2 py-[3px] text-[12px] font-medium leading-[18px]">
                      Insert creator username
                    </span>
                    <Image
                      src={`${ASSET_ROOT}/question-circle-gray.svg`}
                      alt=""
                      width={16}
                      height={16}
                    />
                  </div>
                  <div className="relative mt-2 h-[140px] rounded border border-[#d3d4d5] bg-white p-3 text-[14px] leading-5 text-[#a9abad]">
                    <p>You may want to include:</p>
                    <p>Your shop or brand introduction</p>
                    <p>Purpose of this invitation</p>
                    <p>Why do you want to collaborate with creators</p>
                    <span className="absolute bottom-2 right-2 rounded bg-[#ececed] px-0.5 text-[12px] leading-[18px] text-[#6c6d6f]">
                      0/500
                    </span>
                  </div>
                </div>
              </SectionRow>

              <div className="my-6 h-px bg-[#d3d4d5]" />

              <SectionRow
                title="Content type"
                note={
                  <span className="text-[#848688]">
                    Smart match currently only supports shoppable video.
                  </span>
                }
              >
                <Field
                  label="Content type"
                  placeholder="Shoppable video"
                  value="Shoppable video"
                  optional
                  disabled
                />
              </SectionRow>
            </section>

            <div
              data-tts-create-end=""
              className="mt-4 flex w-full max-w-[852px] items-center justify-end gap-2 text-[14px] font-medium"
            >
              <span className="flex h-10 items-center rounded bg-[#ececed] px-5 text-[#171718]">
                Discard
              </span>
              <span className="flex h-10 items-center rounded bg-[#b7e5e2] px-5 text-white">
                Next
              </span>
            </div>
          </div>

          <CreatorPreview />
        </div>
      </div>
    </div>
  );
}
