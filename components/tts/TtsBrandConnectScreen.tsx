"use client";

import { TtsIcon } from "@/components/tts/TtsIcon";
import { TtsShot } from "@/components/tts/TtsPhoneFrame";

const SHOT_ROOT = "/projects/tts-ui/mobile-demo";

/** Gold gradient used for the wordmark and the "Goal" eyebrow (1669:54902). */
const GOLD_TEXT =
  "linear-gradient(90deg, #c3b793 7.2%, #f6ebd1 19.87%, #efe4c8 56.29%, #c6b892 85.8%)";

/** Frosted card used by the benefit tiles, goal box and coupon row. */
const CARD =
  "rounded-[8px] border border-white/8 bg-[rgba(153,141,127,0.15)] backdrop-blur-[6px]";

/** rgba(255,255,255,0.13) — ui/shape/neutral-4 on this dark surface. */
const NEUTRAL_4 = "bg-[rgba(255,255,255,0.13)]";

function InfoFill({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
    >
      <circle cx="6" cy="6" r="6" fill="rgba(232,221,188,0.34)" />
      <rect x="5.4" y="5" width="1.2" height="4" rx="0.6" fill="#2a2109" />
      <circle cx="6" cy="3.4" r="0.7" fill="#2a2109" />
    </svg>
  );
}

/** Price-drop chevron inside the discount tag (1669:54960). */
function DropIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <path
        d="M6.5 2.6v6.2m0 0L4 6.4m2.5 2.4 2.5-2.4"
        stroke="#ff576f"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Flame on the "Top 10 selling" label (1669:55007). */
function FlameIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
      <path
        d="M5.5 1c1.6 1.9 3.2 3.2 3.2 5a3.2 3.2 0 0 1-6.4 0C2.3 4.2 3.9 2.9 5.5 1Z"
        fill="#ff576f"
      />
      <path
        d="M5.5 5.2c.8.9 1.4 1.5 1.4 2.3a1.4 1.4 0 0 1-2.8 0c0-.8.6-1.4 1.4-2.3Z"
        fill="#ffe6eb"
      />
    </svg>
  );
}

const BENEFITS = [
  { label: ["Commission", "boost"], shot: "benefit-1" },
  { label: ["Top performed", "brands"], shot: "benefit-2" },
  { label: ["Traffic", "support"], shot: "benefit-3" },
];

/**
 * Six products matched to the photos in the Figma grid rather than to its
 * placeholder titles, which were mismatched (a satin dress labelled as a tote).
 */
const PRODUCTS = [
  {
    shot: "bc-product-1",
    title: "Women Ivory Lace Trim Flowy Tank Top Sleeveless Summer Blouse",
    discount: "50%",
    earn: "3.00",
    wasEarn: "2.46",
    price: "29.99",
    sold: "2.1K",
    label: null,
    cta: "primary",
  },
  {
    shot: "bc-product-2",
    title: "Emerald Satin Slip Midi Dress with Cowl Neck",
    discount: "45%",
    earn: "3.60",
    wasEarn: "2.90",
    price: "35.99",
    sold: "1.8K",
    label: null,
    cta: "primary",
  },
  {
    shot: "bc-product-3",
    title:
      "Women everyday straight-leg trousers for business casual or weekend",
    discount: "50%",
    earn: "3.00",
    wasEarn: null,
    price: "29.99",
    sold: "2.1K",
    label: "Top 10 selling in Women",
    cta: "primary",
  },
  {
    shot: "bc-product-4",
    title: "Women fashion watch with mesh strap",
    discount: "30%",
    earn: "4.50",
    wasEarn: null,
    price: "45.00",
    sold: "860",
    label: null,
    cta: "primary",
  },
  {
    shot: "bc-product-5",
    title: "Oversized square acetate sunglasses UV400",
    discount: "52%",
    earn: "2.10",
    wasEarn: null,
    price: "19.99",
    sold: "3.4K",
    label: null,
    cta: "primary",
  },
  {
    shot: "bc-product-6",
    title: "Centella soothing gel moisturizer 50ml",
    discount: "25%",
    earn: "2.60",
    wasEarn: null,
    price: "24.50",
    sold: "5.7K",
    label: null,
    cta: "neutral",
  },
];

type Product = (typeof PRODUCTS)[number];

/** Product card — Pic 173px, tag, title, price block, capsule CTA (1669:54957). */
function ProductCard({ product }: { product: Product }) {
  return (
    <div className="flex w-full flex-col gap-[8px]">
      <div className="relative h-[173px] w-full overflow-hidden rounded-[8px] bg-[#fafafa]">
        <TtsShot
          src={`${SHOT_ROOT}/${product.shot}.svg`}
          className="absolute inset-0 size-full rounded-[8px]"
        />
        <span className="absolute left-[8px] top-[8px] flex items-center gap-px rounded-[4px] bg-[#ffe6eb] p-[2px]">
          <DropIcon />
          <span className="text-[11px] font-medium tracking-[0.1951px] text-[#ff576f]">
            {product.discount}
          </span>
        </span>
      </div>

      <div className="flex w-full flex-col gap-[8px]">
        <div className="flex w-full flex-col gap-[6px]">
          <p className="h-[34px] overflow-hidden text-[13px] leading-[1.3] tracking-[0.1261px] text-[#f6f6f6]">
            {product.title}
          </p>

          {product.label ? (
            <span className="flex h-[18px] w-fit items-center justify-center gap-[3px] rounded-[4px] bg-[rgba(254,44,85,0.12)] px-[4px]">
              <FlameIcon />
              <span className="text-[11px] font-semibold leading-[1.3] text-[#ff576f]">
                {product.label}
              </span>
            </span>
          ) : null}

          <div className="flex w-full flex-col gap-[2px]">
            <div className="flex items-center gap-[4px]">
              <span className="text-[15px] font-medium leading-[1.3] tracking-[0.0607px] text-[#ff3b5c]">
                Earn ${product.earn}
              </span>
              {product.wasEarn ? (
                <span className="flex items-baseline text-[12px] leading-[1.3] tracking-[0.1608px] text-[#ff576f] line-through opacity-50">
                  <span>$</span>
                  <span>{product.wasEarn}</span>
                </span>
              ) : null}
            </div>
            <div className="flex items-baseline gap-[4px] leading-[1.3]">
              <span className="flex items-baseline font-medium text-[#f6f6f6]">
                <span className="text-[11px] tracking-[0.1951px]">$</span>
                <span className="text-[15px] tracking-[0.0607px]">
                  {product.price}
                </span>
              </span>
              <span className="text-[12px] tracking-[0.1608px] text-white/60">
                {product.sold} sold
              </span>
            </div>
          </div>
        </div>

        <span
          className={`flex h-[32px] w-full items-center justify-center rounded-full p-[8px] text-[14px] font-semibold leading-[1.3] ${
            product.cta === "primary"
              ? "bg-[#fe2c55] text-white"
              : `${NEUTRAL_4} text-[#f6f6f6]`
          }`}
        >
          Get sample
        </span>
      </div>
    </div>
  );
}

/**
 * Right phone — Brand Connect Program, joined state (Figma 1669:54887).
 * The 47px status bar is pinned by the caller; this page keeps a spacer of the
 * same height so the flow offsets still land where the design puts them
 * (title 91, intro 219, benefits 289, goal 419, product list 690).
 */
export function TtsBrandConnectScreen() {
  const columns = [
    [PRODUCTS[0], PRODUCTS[2], PRODUCTS[4]],
    [PRODUCTS[1], PRODUCTS[3], PRODUCTS[5]],
  ];

  return (
    <div className="relative size-full bg-[#121212]">
      <div className="tts-demo3-scroll-b absolute inset-x-0 top-0 w-[390px]">
        {/* BG 2 — hero gradient, collage and colour-dodge wash (1669:54888) */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[868px] bg-[linear-gradient(177.6deg,#523800_0.4%,#131313_52%)]">
          <div className="absolute right-[19px] top-[95px] h-[184px] w-[201px]">
            <TtsShot
              src={`${SHOT_ROOT}/brand-connect-hero.png`}
              fallbackSrc={`${SHOT_ROOT}/brand-connect-hero.svg`}
              tone="soft"
              className="absolute inset-0 size-full bg-contain bg-right-top"
            />
          </div>
          <div className="absolute inset-x-0 top-[176px] h-[103px] bg-[linear-gradient(180deg,rgba(64,49,15,0)_0%,#2d220c_100%)]" />
          <div className="absolute left-[-79px] top-[-76px] h-[391px] w-[329px] opacity-10 mix-blend-color-dodge">
            <TtsShot
              src={`${SHOT_ROOT}/brand-connect-wash.png`}
              tone="soft"
              className="absolute inset-0 size-full"
            />
          </div>
        </div>

        <div className="relative">
          {/* status bar space — the real bar is pinned above */}
          <div className="h-[47px]" />

          {/* Navigation Bar (1669:54899) */}
          <div className="flex h-[44px] items-center px-[6px]">
            <span className="flex size-[44px] items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M15 5l-7 7 7 7"
                  stroke="#f6f6f6"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="flex-1" />
            <span className="flex size-[44px] items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle
                  cx="12"
                  cy="12"
                  r="9.4"
                  stroke="#f6f6f6"
                  strokeWidth="1.7"
                />
                <path
                  d="M9.5 9.2c0-1.4 1.1-2.4 2.5-2.4s2.5 1 2.5 2.3c0 1.7-2.4 1.9-2.4 3.7"
                  stroke="#f6f6f6"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
                <circle cx="12" cy="16.6" r="1.05" fill="#f6f6f6" />
              </svg>
            </span>
            <span className="flex size-[44px] items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect
                  x="2.8"
                  y="8.4"
                  width="18.4"
                  height="13.2"
                  rx="1.9"
                  stroke="#f6f6f6"
                  strokeWidth="1.7"
                />
                <path
                  d="M2.8 13.2h18.4M12 8.4V21.6"
                  stroke="#f6f6f6"
                  strokeWidth="1.7"
                />
                <path
                  d="M12 8.4S10.1 3.7 7.5 4.6s2 3.8 4.5 3.8Zm0 0s1.9-4.7 4.5-3.8-2 3.8-4.5 3.8Z"
                  stroke="#f6f6f6"
                  strokeWidth="1.6"
                />
              </svg>
            </span>
            {/* TTS_LOGO sits at left 141, top 59 in the design */}
            <span className="absolute left-[141px] top-[59px]">
              <TtsIcon name="tts-logo" width={109} height={20} />
            </span>
          </div>

          {/* Title (1669:54901) */}
          <div className="flex w-[200px] items-center p-[16px]">
            <p
              className="flex-1 bg-clip-text text-[36px] font-extrabold italic leading-[0.9] text-transparent"
              style={{ backgroundImage: GOLD_TEXT }}
            >
              Brand Connect Program
            </p>
          </div>

          {/* Intro (1669:54903) */}
          <div className="flex items-center p-[16px]">
            <p className="w-[357px] text-[15px] leading-[1.3] tracking-[0.0607px] text-[rgba(232,221,188,0.9)]">
              Hit the goal for big rewards by posting products and picking up
              tasks to finish.
            </p>
          </div>

          {/* Benefit list (1669:54905) — runs past the screen edge by design */}
          <div className="flex items-center gap-[8px] overflow-hidden px-[16px]">
            {BENEFITS.map((benefit) => (
              <div
                key={benefit.shot}
                className={`flex h-[130px] w-[140px] shrink-0 flex-col items-end px-[16px] py-[8px] ${CARD}`}
              >
                <InfoFill />
                <div className="flex w-full flex-col gap-[8px]">
                  <TtsShot
                    src={`${SHOT_ROOT}/${benefit.shot}.png`}
                    tone="gold"
                    className="size-[44px] rounded-[6px]"
                  />
                  <p className="text-[15px] leading-[1.3] tracking-[0.0607px] text-[rgba(232,221,188,0.9)]">
                    {benefit.label[0]}
                    <br />
                    {benefit.label[1]}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Main goal (1669:54924) */}
          <div className="flex flex-col gap-[8px] px-[16px] py-[8px]">
            <div
              className={`relative flex h-[188px] items-start justify-between p-[16px] ${CARD}`}
            >
              <div className="flex w-[218px] flex-col gap-[26px]">
                <div className="flex flex-col gap-[8px]">
                  <div className="flex items-center gap-[8px]">
                    <span
                      className="bg-clip-text text-[16px] font-extrabold italic leading-[0.9] text-transparent"
                      style={{ backgroundImage: GOLD_TEXT }}
                    >
                      Goal
                    </span>
                    <span className="w-[143px] text-[12px] italic leading-[1.3] tracking-[0.1608px] text-[#e8ddbc]">
                      Feb 24 - March 31, 2026
                    </span>
                  </div>
                  <p className="text-[24px] font-bold leading-[1.25] tracking-[0.24px] text-[#e8ddbc]">
                    Post 10 videos for $10,000 GMV
                  </p>
                </div>
                <div className="flex flex-col">
                  <p className="text-[13px] font-medium leading-[1.3] tracking-[0.1266px] text-[#e8ddbc]">
                    To earn{" "}
                    <span className="text-[14px] tracking-[0.0931px] text-[#d38621]">
                      $1,000 cash
                    </span>
                  </p>
                  <p className="flex items-center gap-[4px] text-[12px] leading-[1.3] tracking-[0.1608px] text-[#e8ddbc]">
                    with a special badge
                    <InfoFill />
                  </p>
                </div>
              </div>
              <TtsShot
                src={`${SHOT_ROOT}/goal-badge.png`}
                tone="gold"
                className="size-[94px] rounded-[8px] shadow-[0px_2px_5.2px_0px_rgba(0,0,0,0.59)]"
              />
              <span
                className={`absolute left-[211px] top-[134px] flex h-[28px] min-w-[64px] items-center justify-center gap-[4px] rounded-full px-[7px] ${NEUTRAL_4}`}
              >
                <span className="text-[13px] font-semibold leading-[1.3] text-[#f6f6f6]">
                  Track progress
                </span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M2.6 7h8.2M7.6 3.4 11.2 7l-3.6 3.6"
                    stroke="#f6f6f6"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>

            {/* coupon (1669:54943) */}
            <div
              className={`flex h-[59px] items-center gap-[8px] px-[16px] py-[8px] ${CARD}`}
            >
              <p className="flex-1 text-[13px] leading-[1.3] tracking-[0.1266px] text-[#e8ddbc]">
                Coupons are available to use. First come first serve.
              </p>
              <span className="flex h-[28px] shrink-0 items-center justify-center rounded-full bg-[#fe2c55] px-[7px] text-[13px] font-semibold leading-[1.3] text-white">
                Claim
              </span>
            </div>
          </div>

          {/* Product list (1669:54946) */}
          <div className="flex flex-col items-center gap-[16px] p-[16px] backdrop-blur-[4.1px]">
            <div className="flex w-full flex-col gap-[8px]">
              <p className="text-[20px] font-bold leading-[1.25] text-[#e8ddbc]">
                Get started
              </p>
              <p className="w-[358px] text-[15px] leading-[1.3] text-[rgba(232,221,188,0.75)]">
                Get samples from the products below or start from the tasks.
              </p>
            </div>

            {/* Segmented Control (1669:54950) */}
            <div
              className={`flex w-full items-stretch overflow-hidden rounded-full p-[3px] ${NEUTRAL_4}`}
            >
              <span className="flex flex-1 items-center justify-center rounded-full bg-[#3a3a3a] px-[14px] py-[7.5px] text-[15px] font-semibold leading-[1.3] text-[#f6f6f6] shadow-[0px_2px_4px_rgba(0,0,0,0.06)]">
                Products
              </span>
              <span className="flex flex-1 items-center justify-center rounded-full px-[14px] py-[7.5px] text-[15px] font-semibold leading-[1.3] text-white/60">
                Tasks
              </span>
            </div>

            {/* Filter (1669:54951) */}
            <div className="flex w-full items-center gap-[8px]">
              <span
                className={`flex min-w-[32px] items-center justify-center gap-[4px] rounded-[5px] p-[6px] ${NEUTRAL_4}`}
              >
                <span className="text-[14px] font-medium leading-[1.3] tracking-[0.0931px] text-white/60">
                  Category
                </span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M4.5 6.5 8 10l3.5-3.5"
                    stroke="rgba(255,255,255,0.6)"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              {["Price", "In showcase"].map((chip) => (
                <span
                  key={chip}
                  className={`flex min-w-[32px] items-center justify-center rounded-[5px] p-[6px] text-[14px] font-medium leading-[1.3] tracking-[0.0931px] text-white/60 ${NEUTRAL_4}`}
                >
                  {chip}
                </span>
              ))}
            </div>

            {/* two-column grid (1669:54955) */}
            <div className="flex w-full items-start gap-[16px]">
              {columns.map((column, index) => (
                <div
                  key={index}
                  className="flex min-w-0 flex-1 flex-col gap-[16px]"
                >
                  {column.map((product) => (
                    <ProductCard key={product.shot} product={product} />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* clears the pinned bottom nav + home indicator */}
          <div className="h-[120px]" />
        </div>
      </div>

      {/* Bottom Nav Bar (1669:55220) + home indicator */}
      <div className="absolute inset-x-0 bottom-0 z-20 bg-[#121212]">
        <div className="flex items-start gap-[2px] border-t-[0.5px] border-white/20">
          <span className="flex h-[49px] flex-1 flex-col items-center pb-[3px] pt-[2px]">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <circle
                cx="16"
                cy="16"
                r="9.6"
                stroke="rgba(255,255,255,0.9)"
                strokeWidth="1.8"
              />
              <rect
                x="15.1"
                y="14.4"
                width="1.8"
                height="7.2"
                rx="0.9"
                fill="rgba(255,255,255,0.9)"
              />
              <circle cx="16" cy="11.2" r="1.15" fill="rgba(255,255,255,0.9)" />
            </svg>
            <span className="w-full text-center text-[10px] font-semibold leading-[1.3] text-white/90">
              Overview
            </span>
          </span>
          <span className="flex h-[49px] flex-1 flex-col items-center pb-[3px] pt-[2px]">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <circle
                cx="16"
                cy="12.4"
                r="4.4"
                stroke="rgba(255,255,255,0.6)"
                strokeWidth="1.8"
              />
              <path
                d="M7.8 24.4c1.4-3.9 4.6-5.8 8.2-5.8s6.8 1.9 8.2 5.8"
                stroke="rgba(255,255,255,0.6)"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
            <span className="w-full text-center text-[10px] font-semibold leading-[1.3] text-white/60">
              My progress
            </span>
          </span>
        </div>
        <div className="flex h-[34px] items-center justify-center">
          <span className="h-[5px] w-[140px] rounded-full bg-white" />
        </div>
      </div>

      {/* Pinned status bar (design has the Top frame sticky at top-0) */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-40 h-[47px]">
        <div className="tts-demo3-bar-b absolute inset-0 bg-[#3a2c10]/85 opacity-0 backdrop-blur-[6px]" />
        <div className="relative flex h-[47px] items-center justify-between px-[22px]">
          <span className="text-[17px] font-semibold tracking-[-0.4px] text-white">
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
                  fill="#fff"
                />
              ))}
            </svg>
            <svg width="18" height="13" viewBox="0 0 18 13" fill="none">
              <path
                d="M9 11.4 1.2 4.1a11 11 0 0 1 15.6 0L9 11.4Z"
                fill="#fff"
              />
            </svg>
            <svg width="29" height="14" viewBox="0 0 29 14" fill="none">
              <rect
                x="0.6"
                y="0.6"
                width="24"
                height="12.8"
                rx="4"
                stroke="#fff"
                strokeOpacity="0.45"
              />
              <rect
                x="2.2"
                y="2.2"
                width="20.8"
                height="9.6"
                rx="2.6"
                fill="#fff"
              />
              <path
                d="M26.4 4.6v4.8a2.6 2.6 0 0 0 0-4.8Z"
                fill="#fff"
                opacity="0.5"
              />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}
