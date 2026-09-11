"use client";

import { TtsShot } from "@/components/tts/TtsPhoneFrame";

const SHOT_ROOT = "/projects/tts-ui/mobile-demo";

/** iOS status bar as it appears over the dark invitation header. */
function StatusBar({ tone = "light" }: { tone?: "light" | "dark" }) {
  const color = tone === "light" ? "#ffffff" : "#161823";
  return (
    <div className="relative flex h-[47px] items-center justify-between px-[22px]">
      <span
        className="text-[17px] font-semibold tracking-[-0.4px]"
        style={{ color }}
      >
        8:00
      </span>
      <span className="flex items-center gap-[6px]">
        <svg width="21" height="13" viewBox="0 0 21 13" fill="none">
          {[0, 1, 2, 3].map((i) => (
            <rect
              key={i}
              x={i * 5.4}
              y={9 - i * 3}
              width="3.4"
              height={4 + i * 3}
              rx="1"
              fill={color}
              opacity={i === 3 ? 0.45 : 1}
            />
          ))}
        </svg>
        <svg width="18" height="13" viewBox="0 0 18 13" fill="none">
          <path
            d="M9 11.4 1.2 4.1a11 11 0 0 1 15.6 0L9 11.4Z"
            fill={color}
            opacity="0.95"
          />
        </svg>
        <svg width="29" height="14" viewBox="0 0 29 14" fill="none">
          <rect
            x="0.6"
            y="0.6"
            width="24"
            height="12.8"
            rx="4"
            stroke={color}
            strokeOpacity="0.45"
          />
          <rect
            x="2.2"
            y="2.2"
            width="20.8"
            height="9.6"
            rx="2.6"
            fill={color}
          />
          <path
            d="M26.4 4.6v4.8a2.6 2.6 0 0 0 0-4.8Z"
            fill={color}
            opacity="0.5"
          />
        </svg>
      </span>
    </div>
  );
}

function InfoDot({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <circle
        cx="8"
        cy="8"
        r="7"
        stroke="rgba(22,24,35,0.34)"
        strokeWidth="1.2"
      />
      <rect
        x="7.3"
        y="6.6"
        width="1.4"
        height="5"
        rx="0.7"
        fill="rgba(22,24,35,0.5)"
      />
      <circle cx="8" cy="4.6" r="0.85" fill="rgba(22,24,35,0.5)" />
    </svg>
  );
}

function Star() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path
        d="M6 0.8l1.6 3.3 3.6.5-2.6 2.5.6 3.6L6 9l-3.2 1.7.6-3.6L.8 4.6l3.6-.5L6 .8Z"
        fill="rgba(22,24,35,0.72)"
      />
    </svg>
  );
}

/** Commission on each product sits inside the 12%-17% range the High
 *  commission card advertises, so the numbers agree across the screen. */
const PRODUCTS = [
  {
    shot: "invitation-product-1",
    title: "Latex-Free Teardrop Makeup Blender Sponge",
    earn: "1.35",
    price: "8.99",
    rating: "4.9",
    sold: "42.7K",
    cta: "Post video",
    tag: "Sample requested",
  },
  {
    shot: "invitation-product-2",
    title: "Velvet Matte Lipstick in Cherry Rouge",
    earn: "2.64",
    price: "16.50",
    rating: "4.7",
    sold: "9,540",
    cta: "Post video",
    tag: null,
  },
  {
    shot: "invitation-product-3",
    title: "24K Gold Radiance Rich Cream 50ml",
    earn: "5.44",
    price: "32.00",
    rating: "4.8",
    sold: "5.1K",
    cta: "Add",
    tag: null,
  },
];

/** Left phone — creator-side invitation detail (Figma 1668:51416). */
export function TtsInvitationScreen() {
  return (
    <div className="relative size-full bg-white">
      {/* scrolling page */}
      <div className="tts-demo3-scroll-a absolute inset-x-0 top-0 w-[390px]">
        {/* header */}
        <div className="relative h-[180px] overflow-hidden">
          <TtsShot
            src={`${SHOT_ROOT}/invitation-hero.png`}
            className="absolute inset-0 h-[241px] w-full"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0.92)_100%)]" />
          <div className="relative">
            <div className="h-[47px]" />
            <div className="flex h-[44px] items-center px-[10px]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M15 5l-7 7 7 7"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="flex flex-col gap-[8px] px-[16px] pt-[3px]">
              <p className="text-[32px] font-bold leading-[1.2] text-white">
                Invitation
              </p>
              <p className="text-[13px] leading-[1.3] text-white/95">
                Valid until Jan 19, 2026
              </p>
            </div>
          </div>
        </div>

        {/* tabs */}
        <div className="relative flex h-[40px] items-stretch px-[16px]">
          <div className="relative flex flex-1 items-center justify-center">
            <span className="text-[15px] font-medium text-black">Overview</span>
            <span className="absolute inset-x-0 bottom-0 h-[2px] bg-black" />
          </div>
          <div className="flex flex-1 items-center justify-center">
            <span className="text-[15px] font-medium text-black/50">
              Products (4)
            </span>
          </div>
          <span className="absolute inset-x-0 bottom-0 h-px bg-black/12" />
        </div>

        {/* benefit cards */}
        <div className="flex items-center gap-[8px] px-[16px] py-[8px]">
          <div className="relative flex h-[98px] flex-1 flex-col justify-between rounded-[8px] bg-[#f8f8f8] p-[12px]">
            <div className="flex items-start justify-between">
              <p className="text-[15px] font-bold leading-[1.3] text-[#161823]">
                Free sample
              </p>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect
                  x="2"
                  y="6.5"
                  width="16"
                  height="11.5"
                  rx="1.6"
                  stroke="#fe2c55"
                  strokeWidth="1.5"
                />
                <path
                  d="M2 10.5h16M10 6.5V18"
                  stroke="#fe2c55"
                  strokeWidth="1.5"
                />
                <path
                  d="M10 6.5S8.4 2.4 6.2 3.1 8 6.5 10 6.5Zm0 0s1.6-4.1 3.8-3.4S12 6.5 10 6.5Z"
                  stroke="#fe2c55"
                  strokeWidth="1.4"
                />
              </svg>
            </div>
            <p className="flex items-end gap-[4px] text-[12px] leading-[1.3] text-[rgba(22,24,35,0.75)]">
              Sample approval rate: 33.3%
              <InfoDot className="mb-[1px] shrink-0" />
            </p>
          </div>
          <div className="relative flex h-[98px] flex-1 flex-col justify-between rounded-[8px] bg-[#f8f8f8] p-[12px]">
            <div className="flex items-start justify-between">
              <p className="max-w-[110px] text-[15px] font-bold leading-[1.3] text-[#161823]">
                High commission
              </p>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle
                  cx="10"
                  cy="10"
                  r="8.2"
                  stroke="#fe2c55"
                  strokeWidth="1.5"
                />
                <path
                  d="M10 5v10M12.5 7.4c0-.9-1.1-1.5-2.5-1.5s-2.5.6-2.5 1.6.9 1.4 2.5 1.7 2.6.7 2.6 1.8-1.1 1.7-2.6 1.7-2.6-.6-2.6-1.6"
                  stroke="#fe2c55"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <p className="flex items-end gap-[4px] text-[12px] leading-[1.3] text-[rgba(22,24,35,0.75)]">
              12%-17%
              <InfoDot className="mb-[1px] shrink-0" />
            </p>
          </div>
        </div>

        {/* extra earnings */}
        <div className="px-[16px] pb-[8px]">
          <div className="flex h-[74px] flex-col justify-between rounded-[8px] bg-[#f8f8f8] p-[12px]">
            <div className="flex items-start justify-between">
              <p className="text-[17px] font-bold leading-[1.3] text-black">
                Extra earnings
              </p>
              <span className="text-[13px] font-bold text-[#fe2c55]">AD</span>
            </div>
            <p className="flex items-end gap-[4px] text-[12px] leading-[1.3] text-[rgba(22,24,35,0.75)]">
              2% Shop Ads commission every sale generated
              <InfoDot className="mb-[1px] shrink-0" />
            </p>
          </div>
        </div>

        {/* products */}
        <div className="border-t-[0.5px] border-black/12">
          <div className="flex h-[55px] items-center justify-between px-[16px]">
            <p className="text-[17px] font-bold leading-[1.3] text-[#161823]">
              Products
            </p>
            <span className="flex items-center gap-[4px] text-[16px] text-black/50">
              More
              <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
                <path
                  d="M1.5 1l5 6-5 6"
                  stroke="rgba(0,0,0,0.5)"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
          <div className="flex gap-[12px] overflow-hidden px-[16px] pb-[24px]">
            {PRODUCTS.map((product, index) => (
              <div
                key={index}
                className="flex w-[152px] shrink-0 flex-col gap-[8px]"
              >
                <div className="relative">
                  <TtsShot
                    src={`${SHOT_ROOT}/${product.shot}.svg`}
                    className="size-[152px] rounded-[8px]"
                  />
                  {product.tag ? (
                    <span className="absolute left-[6px] top-[6px] rounded-[4px] bg-[rgba(51,51,51,0.6)] px-[4px] py-[2px] text-[13px] font-medium text-white">
                      {product.tag}
                    </span>
                  ) : null}
                </div>
                <div className="flex flex-col gap-[6px]">
                  <p className="h-[34px] overflow-hidden text-[13px] leading-[1.3] text-black">
                    {product.title}
                  </p>
                  <p className="text-[15px] font-medium leading-[1.3] text-[#fe2c55]">
                    Earn ${product.earn}
                  </p>
                  <p className="flex items-baseline text-[#161823]">
                    <span className="text-[11px] font-medium">$</span>
                    <span className="text-[15px] font-medium">
                      {product.price}
                    </span>
                  </p>
                  <p className="flex items-center gap-[6px] text-[12px] text-[rgba(22,24,35,0.6)]">
                    <span className="flex items-center gap-[3px]">
                      {product.rating}
                      <Star />
                    </span>
                    <span className="h-[11px] w-px bg-black/15" />
                    {product.sold} sold
                  </p>
                </div>
                <button
                  type="button"
                  tabIndex={-1}
                  className="h-[28px] rounded-full bg-[#fe2c55] text-[14px] font-medium text-white"
                >
                  {product.cta}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* preferred content type */}
        <div className="border-t-[0.5px] border-black/12 px-[16px] pb-[16px] pt-[16px]">
          <p className="text-[17px] font-bold leading-[1.3] text-[#161823]">
            Preferred content type
          </p>
          <p className="pt-[8px] text-[15px] leading-[1.3] text-black/70">
            Shoppable LIVE, Short video
          </p>
        </div>

        {/* about this shop */}
        <div className="flex flex-col gap-[16px] border-t-[0.5px] border-black/12 p-[16px]">
          <p className="text-[17px] font-bold leading-[1.3] text-[#161823]">
            About this shop
          </p>
          <div className="flex items-center gap-[12px]">
            <TtsShot
              src={`${SHOT_ROOT}/invitation-shop.svg`}
              className="size-[56px] rounded-full"
            />
            <div className="flex flex-col gap-[4px]">
              <span className="flex items-center gap-[4px]">
                <span className="text-[17px] font-medium text-black">
                  Dewpoint Beauty Co.
                </span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="8" fill="#20d5ec" />
                  <path
                    d="M4.6 8.2l2.2 2.2 4.4-4.4"
                    stroke="#fff"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="w-fit rounded-[4px] bg-[#f7ede2] px-[4px] py-[2px] text-[12px] font-medium text-[#b67a06]">
                Top-Rated Seller
              </span>
              <span className="flex items-center gap-[8px] text-[14px] text-[rgba(22,24,35,0.6)]">
                <span className="flex items-center gap-[4px]">
                  <Star />
                  4.5
                  <InfoDot className="size-[12px]" />
                </span>
                <span className="h-[8px] w-px bg-black/15" />
                66.5K sold
                <span className="h-[8px] w-px bg-black/15" />
                103 collabs
              </span>
            </div>
          </div>
          <span className="flex w-fit items-center gap-[2px] rounded-[4px] bg-black/5 pl-[6px] pr-[2px] py-[2px] text-[13px] font-medium text-black">
            Performs better than 97% of other shops
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M6 4l4 4-4 4"
                stroke="rgba(0,0,0,0.6)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <div className="flex flex-col gap-[8px] rounded-[8px] bg-black/5 px-[16px] py-[12px]">
            <div className="flex gap-[8px]">
              <div className="flex flex-col gap-[2px]">
                <p className="text-[15px] font-semibold leading-[1.3] text-black">
                  Message from the shop
                </p>
                <p className="text-[15px] leading-[1.3] text-black/50">
                  Hi Rebecca, we loved your everyday glam tutorials. We&rsquo;d
                  love to send you our Cherry Rouge lipstick and Gold Radiance
                  cream to try &mdash; samples are on us, and you&rsquo;ll earn
                  12&ndash;17% on every sale from your videos.
                </p>
                <p className="pt-[6px] text-[14px] font-semibold text-[#fe2c55]">
                  View more
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="h-[120px]" />
      </div>

      {/* Pinned status bar: the white-on-dark bar rests over the header, and a
          light bar with dark glyphs fades in once the page scrolls under it. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-40 h-[47px]">
        <StatusBar />
        <div className="tts-demo3-bar-a absolute inset-0 bg-white/95 opacity-0 backdrop-blur-[6px]">
          <StatusBar tone="dark" />
        </div>
      </div>

      {/* pinned action bar */}
      <div className="absolute inset-x-0 bottom-0 z-20 bg-white">
        <div className="flex items-stretch gap-[8px] px-[16px] py-[12px]">
          <span className="flex h-[48px] w-[56px] items-center justify-center rounded-full bg-black/5">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M10 2.4c4.3 0 7.6 2.7 7.6 6.2S14.3 15 10 15c-.9 0-1.7-.1-2.5-.4l-3.6 1.9.9-3.1A6.2 6.2 0 0 1 2.4 8.6C2.4 5.1 5.7 2.4 10 2.4Z"
                fill="rgba(0,0,0,0.7)"
              />
            </svg>
          </span>
          <span className="flex h-[48px] flex-1 items-center justify-center rounded-full bg-black/5 text-[16px] font-medium text-black">
            Not interested
          </span>
          <span className="flex h-[48px] flex-1 items-center justify-center rounded-full bg-[#fe2c55] text-[16px] font-medium text-white">
            Add all
          </span>
        </div>
        <div className="flex h-[34px] items-center justify-center">
          <span className="h-[5px] w-[140px] rounded-full bg-black" />
        </div>
      </div>
    </div>
  );
}
