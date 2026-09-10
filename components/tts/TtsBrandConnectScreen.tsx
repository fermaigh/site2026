"use client";

import { TtsIcon } from "@/components/tts/TtsIcon";
import { TtsShot } from "@/components/tts/TtsPhoneFrame";

const SHOT_ROOT = "/projects/tts-ui/mobile-demo";

/** Gold gradient used for the programme wordmark and the "Goal" eyebrow. */
const GOLD_TEXT =
  "linear-gradient(90deg, #c3b793 7.2%, #f6ebd1 19.87%, #efe4c8 56.29%, #c6b892 85.8%)";

const CARD =
  "rounded-[8px] border border-white/8 bg-[rgba(153,141,127,0.15)] backdrop-blur-[6px]";

function StatusBarDark() {
  return (
    <div className="flex h-[47px] items-center justify-between px-[22px]">
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
          <path d="M9 11.4 1.2 4.1a11 11 0 0 1 15.6 0L9 11.4Z" fill="#fff" />
        </svg>
        <svg width="29" height="14" viewBox="0 0 29 14" fill="none">
          <rect x="0.6" y="0.6" width="24" height="12.8" rx="4" stroke="#fff" strokeOpacity="0.45" />
          <rect x="2.2" y="2.2" width="20.8" height="9.6" rx="2.6" fill="#fff" />
          <path d="M26.4 4.6v4.8a2.6 2.6 0 0 0 0-4.8Z" fill="#fff" opacity="0.5" />
        </svg>
      </span>
    </div>
  );
}

function InfoFill({ className }: { className?: string }) {
  return (
    <svg className={className} width="12" height="12" viewBox="0 0 12 12" fill="none">
      <circle cx="6" cy="6" r="6" fill="rgba(232,221,188,0.34)" />
      <rect x="5.4" y="5" width="1.2" height="4" rx="0.6" fill="#2a2109" />
      <circle cx="6" cy="3.4" r="0.7" fill="#2a2109" />
    </svg>
  );
}

const BENEFITS = [
  { label: ["Commission", "boost"], shot: "benefit-1" },
  { label: ["Top performed", "brands"], shot: "benefit-2" },
  { label: ["Traffic", "support"], shot: "benefit-3" },
];

const BC_PRODUCTS = [
  { title: "Women Yellow Vest Tops Flowy Tank Top Lace Hem Neckline Summer Vest Blouse", earn: "$3.00", price: "12.99", was: "$19.99", cta: "Get sample" },
  { title: "Olive Green Faux Leather Minimalist Hobo Tote Bag 10", earn: "$3.00", price: "24.50", was: "$32.00", cta: "Get sample" },
  { title: "Women everyday pant for business casual or weekend", earn: "$3.00", price: "18.00", was: "$26.00", cta: "Get sample", label: "Almost sold out" },
  { title: "Women fashion watch", earn: "$3.00", price: "45.00", was: "$60.00", cta: "Get sample" },
  { title: "Ribbed knit cardigan with pearl buttons", earn: "$3.00", price: "29.90", was: "$39.90", cta: "Get sample" },
  { title: "Gold plated layered necklace set", earn: "$3.00", price: "15.00", was: "$22.00", cta: "Get sample" },
];

/** Right phone — Brand Connect Program landing (Figma 1668:54121). */
export function TtsBrandConnectScreen() {
  return (
    <div className="relative size-full bg-[#131313]">
      <div className="tts-demo3-scroll-b absolute inset-x-0 top-0 w-[390px]">
        {/* hero */}
        <div className="relative">
          <div className="absolute inset-x-0 top-0 h-[868px] bg-[linear-gradient(177.6deg,#523800_0.4%,#131313_52%)]" />
          {/* head illustration collage */}
          <div className="absolute right-0 top-[95px] h-[184px] w-[201px]">
            <TtsShot
              src={`${SHOT_ROOT}/brand-connect-hero.png`}
              tone="soft"
              className="absolute inset-0 size-full"
            />
            <div className="absolute inset-x-0 bottom-[-24px] h-[103px] bg-[linear-gradient(180deg,rgba(64,49,15,0)_0%,#2d220c_100%)]" />
          </div>

          <div className="relative">
            <StatusBarDark />
            <div className="flex h-[44px] items-center justify-between px-[16px]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M15 5l-7 7 7 7"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <TtsIcon name="tts-logo" width={100} height={20} />
              <span className="flex items-center gap-[14px]">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <circle cx="11" cy="11" r="9.2" stroke="#fff" strokeWidth="1.6" />
                  <path
                    d="M8.7 8.4c0-1.3 1-2.2 2.3-2.2s2.3.9 2.3 2.1c0 1.6-2.2 1.7-2.2 3.4"
                    stroke="#fff"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  <circle cx="11" cy="15.4" r="1" fill="#fff" />
                </svg>
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <rect x="2.4" y="7.6" width="17.2" height="12.4" rx="1.8" stroke="#fff" strokeWidth="1.6" />
                  <path d="M2.4 12.2h17.2M11 7.6V20" stroke="#fff" strokeWidth="1.6" />
                  <path
                    d="M11 7.6S9.2 3.2 6.8 4s1.9 3.6 4.2 3.6Zm0 0s1.8-4.4 4.2-3.6-1.9 3.6-4.2 3.6Z"
                    stroke="#fff"
                    strokeWidth="1.5"
                  />
                </svg>
              </span>
            </div>

            {/* wordmark */}
            <div className="p-[16px]">
              <p
                className="max-w-[200px] bg-clip-text text-[36px] font-extrabold italic leading-[0.9] text-transparent"
                style={{ backgroundImage: GOLD_TEXT }}
              >
                Brand Connect Program
              </p>
            </div>

            <p className="px-[16px] pb-[16px] text-[15px] leading-[1.3] text-[rgba(232,221,188,0.9)]">
              Hit the goal for big rewards by posting products and picking up
              tasks to finish.
            </p>

            {/* benefits */}
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
                    <p className="text-[15px] leading-[1.3] text-[rgba(232,221,188,0.9)]">
                      {benefit.label[0]}
                      <br />
                      {benefit.label[1]}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* main goal */}
            <div className="flex flex-col gap-[8px] px-[16px] py-[8px]">
              <div className={`relative flex h-[188px] items-start justify-between p-[16px] ${CARD}`}>
                <div className="flex w-[218px] flex-col gap-[26px]">
                  <div className="flex flex-col gap-[8px]">
                    <div className="flex items-center gap-[8px]">
                      <span
                        className="bg-clip-text text-[16px] font-extrabold italic leading-[0.9] text-transparent"
                        style={{ backgroundImage: GOLD_TEXT }}
                      >
                        Goal
                      </span>
                      <span className="text-[12px] italic leading-[1.3] text-[#e8ddbc]">
                        Feb 24 - March 31, 2026
                      </span>
                    </div>
                    <p className="text-[24px] font-bold leading-[1.25] tracking-[0.24px] text-[#e8ddbc]">
                      Post 10 videos for $10,000 GMV
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-[13px] leading-[1.3] text-[#e8ddbc]">
                      To earn{" "}
                      <span className="text-[14px] font-medium text-[#d38621]">
                        $1,000 cash
                      </span>
                    </p>
                    <p className="flex items-center gap-[4px] text-[12px] leading-[1.3] text-[#e8ddbc]">
                      with a special badge
                      <InfoFill />
                    </p>
                  </div>
                </div>
                <TtsShot
                  src={`${SHOT_ROOT}/goal-badge.png`}
                  tone="gold"
                  className="size-[94px] rounded-[8px]"
                />
                <span className="absolute bottom-[16px] right-[16px] flex h-[28px] min-w-[64px] items-center justify-center gap-[4px] rounded-full bg-white/8 px-[10px] text-[13px] font-semibold text-[rgba(232,221,188,0.55)]">
                  Track progress
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M2.6 7h8.2M7.6 3.4 11.2 7l-3.6 3.6"
                      stroke="rgba(232,221,188,0.55)"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>

              {/* coupon */}
              <div className={`flex h-[59px] items-center gap-[8px] px-[16px] py-[8px] ${CARD}`}>
                <p className="flex-1 text-[13px] leading-[1.3] text-[#e8ddbc]">
                  Coupons are available to use. First come first serve.
                </p>
                <span className="flex h-[28px] shrink-0 items-center justify-center rounded-full bg-[#fe2c55]/40 px-[14px] text-[13px] font-semibold text-white">
                  Claim
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* product list */}
        <div className="relative px-[16px] pt-[16px]">
          <p className="text-[20px] font-bold leading-[1.25] text-[#e8ddbc]">
            Get started
          </p>
          <p className="pt-[8px] text-[15px] leading-[1.3] text-[rgba(232,221,188,0.7)]">
            Get samples from the products below or start from the tasks.
          </p>

          {/* segmented control */}
          <div className="mt-[16px] flex h-[40px] items-center rounded-[8px] bg-white/6 p-[4px]">
            <span className="flex h-full flex-1 items-center justify-center rounded-[6px] bg-[rgba(232,221,188,0.92)] text-[14px] font-semibold text-[#2a2109]">
              Products
            </span>
            <span className="flex h-full flex-1 items-center justify-center text-[14px] font-medium text-[rgba(232,221,188,0.7)]">
              Tasks
            </span>
          </div>

          {/* filter chips */}
          <div className="mt-[16px] flex gap-[8px] overflow-hidden">
            {["Free sample", "New", "High commission"].map((chip) => (
              <span
                key={chip}
                className="flex h-[30px] shrink-0 items-center rounded-full border border-white/10 bg-white/5 px-[12px] text-[13px] text-[rgba(232,221,188,0.85)]"
              >
                {chip}
              </span>
            ))}
          </div>

          {/* two-column product grid */}
          <div className="mt-[16px] grid grid-cols-2 gap-x-[16px] gap-y-[16px] pb-[180px]">
            {BC_PRODUCTS.map((product, index) => (
              <div key={index} className="flex flex-col gap-[8px]">
                <TtsShot
                  src={`${SHOT_ROOT}/bc-product-${index + 1}.png`}
                  tone="dark"
                  className="h-[173px] w-full rounded-[8px]"
                />
                <p className="h-[34px] overflow-hidden text-[13px] leading-[1.3] text-[rgba(232,221,188,0.92)]">
                  {product.title}
                </p>
                {product.label ? (
                  <span className="w-fit rounded-[4px] bg-[#fe2c55]/15 px-[4px] py-[1px] text-[12px] text-[#ff7a90]">
                    {product.label}
                  </span>
                ) : null}
                <p className="text-[15px] font-medium leading-[1.3] text-[#d38621]">
                  Earn {product.earn}
                </p>
                <p className="flex items-baseline gap-[6px]">
                  <span className="flex items-baseline text-[#e8ddbc]">
                    <span className="text-[11px] font-medium">$</span>
                    <span className="text-[15px] font-medium">
                      {product.price}
                    </span>
                  </span>
                  <span className="text-[12px] text-[rgba(232,221,188,0.45)] line-through">
                    {product.was}
                  </span>
                </p>
                <span className="flex h-[32px] items-center justify-center rounded-full bg-white/10 text-[13px] font-semibold text-[#e8ddbc]">
                  {product.cta}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* pinned join bar */}
      <div className="absolute inset-x-0 bottom-0 z-20 border-t-[0.5px] border-white/20 bg-[#121212] pt-[8px]">
        <div className="px-[20px]">
          <p className="py-[8px] text-center text-[14px] leading-[1.3] text-white/88">
            By clicking &quot;Join&quot;, you agree to disclose your sales
            performance and rank to creators who join the competition.
          </p>
          <span className="mt-[8px] flex h-[52px] items-center justify-center rounded-full bg-[#fe2c55] text-[16px] font-semibold text-white">
            Join
          </span>
        </div>
        <div className="flex h-[34px] items-center justify-center">
          <span className="h-[5px] w-[140px] rounded-full bg-white" />
        </div>
      </div>
    </div>
  );
}
