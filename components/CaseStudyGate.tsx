"use client";

import {
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type FormEvent,
} from "react";

import { useDemoFit } from "@/components/useDemoFit";

/**
 * Soft gate only. This check runs in the browser, so the passcode ships in the
 * page bundle and anyone willing to read it can get past this. It is a
 * "please ask me" sign, not access control — never put anything behind it that
 * would actually matter if it leaked.
 */
const PASSCODE = "0000";
const SESSION_KEY = "case-studies-unlocked";

/** Nothing to subscribe to: the value only changes on submit, in this tab. */
const subscribeNever = () => () => {};

function readSession() {
  try {
    return sessionStorage.getItem(SESSION_KEY) === "1";
  } catch {
    // Private mode or blocked storage — just ask again.
    return false;
  }
}

function LockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-5"
      aria-hidden
    >
      <rect x="4.5" y="10.5" width="15" height="10" rx="2.6" />
      <path d="M8 10.5V7.8a4 4 0 0 1 8 0v2.7" />
    </svg>
  );
}

/**
 * Illustration for the concentration diagram, authored in Figma at 1750 × 742
 * (Portifolio Site, node 1856-34187). Every coordinate below is that frame's
 * own, so the composition is the Figma one rather than a reinterpretation.
 */
const ART = "/case-studies/concentration";
const STAGE_WIDTH = 1750;
const STAGE_HEIGHT = 742;

/** Storefronts are 190 × 189, laid out 3 × 3 from the frame at (35.5, 47.531). */
const STORE_SIZE = { width: 190, height: 189 };
const STORE_X = [58.548, 262.999, 466.452];
const STORE_Y = [92.522, 281.522, 483.522];

/** Creator cards are 86.249 × 116.168 in both the highlighted and muted frames. */
const CARD_SIZE = { width: 86.249, height: 116.168 };
const TOP_CARD_X = [999.199, 1117.97, 1236.742];
const TOP_CARD_Y = 148.396;
const MUTED_CARD_X = [999.915, 1117.97, 1236.026];
const MUTED_CARD_Y = [380.929, 525.759];

/**
 * Labels are Inter Bold 20/1.124 in the design. In an SVG the y is a baseline,
 * not a box top, so each one is the frame's text-box top plus Inter's ascent
 * within that line box.
 */
function StageLabel({
  x,
  y,
  children,
}: {
  x: number;
  y: number;
  children: string;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      fontSize={20}
      fontWeight={700}
      fill="#000000"
    >
      {children}
    </text>
  );
}

function ConcentrationDiagram() {
  return (
    <div className="rounded-xl border border-foreground/10 bg-foreground/[0.03] p-5 sm:p-8">
      {/*
        The artwork is fixed-colour line art drawn for Figma's #F5F5F5 canvas,
        so it keeps that canvas in both themes — on the dark theme its #333
        strokes would otherwise disappear into the page.
      */}
      <div className="overflow-hidden rounded-lg bg-[#F5F5F5]">
        <svg
          viewBox={`0 0 ${STAGE_WIDTH} ${STAGE_HEIGHT}`}
          // Scales down to the column and never past 1:1, so the composition
          // shrinks as one piece instead of reflowing on a narrow screen.
          className="block h-auto w-full"
          style={{ maxWidth: STAGE_WIDTH }}
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="Nine sellers all sending invites to the same three top creators, while the rest go unseen — only 20% of invites are opened."
        >
          {STORE_Y.map((y, row) =>
            STORE_X.map((x, col) => (
              <image
                key={`store-${row}-${col}`}
                href={`${ART}/seller-store.svg`}
                x={x}
                y={y}
                {...STORE_SIZE}
              />
            )),
          )}

          <image
            href={`${ART}/invites.svg`}
            x={699.446}
            y={224.253}
            width={223.861}
            height={184.127}
          />

          {TOP_CARD_X.map((x, i) => (
            <image
              key={`top-card-${i}`}
              href={`${ART}/creator-card-top.svg`}
              x={x}
              y={TOP_CARD_Y}
              {...CARD_SIZE}
            />
          ))}

          {MUTED_CARD_Y.map((y, row) =>
            MUTED_CARD_X.map((x, col) => (
              <image
                key={`muted-card-${row}-${col}`}
                href={`${ART}/creator-card-muted.svg`}
                x={x}
                y={y}
                {...CARD_SIZE}
              />
            )),
          )}

          <image
            href={`${ART}/arrow.svg`}
            x={1335}
            y={62}
            width={114}
            height={69}
          />

          <image
            href={`${ART}/envelope-open.svg`}
            x={1530.273}
            y={161.869}
            width={139.999}
            height={110.681}
          />

          <StageLabel x={346.942} y={111.69}>
            Sellers
          </StageLabel>
          <StageLabel x={1151.377} y={117.96}>
            Top creators
          </StageLabel>
          <StageLabel x={1591.888} y={122.83}>
            20% seen
          </StageLabel>
        </svg>
      </div>

      <p className="mt-6 border-t border-foreground/10 pt-4 font-sans text-[13px] text-foreground/55 sm:mt-7">
        Invites pile onto the same three creators — and only{" "}
        <span className="font-semibold text-foreground">20%</span> ever get
        seen.
      </p>
    </div>
  );
}

/**
 * Small elevation on the product UI inside each view area, so the screen sits
 * on the page rather than being flush with it. The first view area is a flat
 * illustration and deliberately has none.
 */
const UI_SHADOW = "shadow-[0_2px_10px_rgba(0,0,0,0.08)]";

/* ---- "Add creators" screen — Figma "Portifolio Site", node 1835-111444 ---- */

/**
 * The Seller Center "Add creators" drawer, over the dimmed Invite creators
 * page. Authored in Figma at 1440 x 960; every number below is in that frame's
 * own pixels, and the whole screen is scaled down to the column as one piece
 * rather than reflowing — the same camera/fit rig the other demos use.
 *
 * The design sets TikTok Sans, which this site does not ship. It inherits
 * Inter, as the other Seller Center screens here already do.
 */
const SCREEN = "/projects/tts-ui/add-creators";
const SCREEN_HEIGHT = 960;
/** Module scope so the fit hook's effect does not re-run every render. */
const screenHeight = () => SCREEN_HEIGHT;

/**
 * Head and body column widths disagree in the source file — the head gives
 * Creators 329px against the body's 308px, so the labels sit slightly left of
 * their values. Reproduced as drawn rather than quietly reconciled.
 */
const HEAD_COLUMNS = [329, 90, 126, 127, 127, 127];
const ROW_COLUMNS = [308, 90, 126, 127, 126, 126, 126];

type AddCreatorRow = {
  name: string;
  handle: string;
  pps: string;
  categories: string;
  audience: string;
  avatar: string;
  /** Absent for the part-row at the fold, which is a flat grey block. */
  video?: string;
  /** The first row's still carries a heavier scrim than the rest. */
  videoScrim?: number;
  tags?: string[];
  /** Revenue, items sold, average video views, engagement rate, and the
   *  fifth column the drawer clips — all as typed in the design. */
  metrics: [string, string, string, string, string];
};

const ADD_CREATORS: AddCreatorRow[] = [
  {
    name: "Marcus Webb",
    handle: "@webbworks",
    pps: "4.8/5.0",
    categories: "Sports, Outdoor",
    audience: "174.4K, Male 30%, 25-50",
    avatar: "avatar-marcus.png",
    video: "video-marcus.jpg",
    videoScrim: 0.2,
    metrics: ["$45.5K", "1,323", "$4.3K", "23.8%", "0.8%"],
  },
  {
    name: "Kayla Tran",
    handle: "alignedwithkay",
    pps: "4.3/5.0",
    categories: "Wellness & Supplements,+2",
    audience: "1.2M, Female 70%, 25-50",
    avatar: "avatar-kayla.png",
    video: "video-kayla.jpg",
    tags: ["Previously invited", "Women Fashion", "+2"],
    metrics: ["$1.24M", "4,545", "12k", "46.90%", "0.8%"],
  },
  {
    name: "Priya Nair",
    handle: "@priyaglows",
    pps: "4.9/5.0",
    categories: "Beauty, Fashion",
    audience: "45K, Female 56%, 18-24",
    avatar: "avatar-priya.png",
    video: "video-priya.jpg",
    tags: ["Skin Care Pro"],
    metrics: ["$10K", "53.9K", "$4.3K", "12.4%", "0.8%"],
  },
  {
    name: "Skincare Pro",
    handle: "skincare pro",
    pps: "4.26/5.0",
    categories: "Beauty",
    audience: "320K, Female 65%, 18-30",
    avatar: "avatar-skincare.png",
    metrics: ["$8.2K", "12.4K", "$2.1K", "9.70%", "0.8%"],
  },
];

function ScreenIcon({
  name,
  size,
  className,
}: {
  name: string;
  size: number;
  className?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`${SCREEN}/${name}.svg`}
      alt=""
      width={size}
      height={size}
      className={className}
      style={{ width: size, height: size }}
    />
  );
}

function ScreenImage({
  name,
  width,
  height,
  className,
}: {
  name: string;
  width: number;
  height: number;
  className?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`${SCREEN}/${name}`}
      alt=""
      width={width}
      height={height}
      className={className}
      style={{ width, height }}
    />
  );
}

/** A metric with the design's hairline rule under it. */
function MetricCell({ value, width, rule = true }: { value: string; width: number; rule?: boolean }) {
  return (
    <div
      className="flex shrink-0 flex-col items-center justify-center self-stretch border-b border-[#d3d4d5] p-[12px]"
      style={{ width }}
    >
      <span
        className={`text-right text-[14px] leading-[20px] text-[#262627] ${rule ? "border-b border-[#c3c4c5]" : ""}`}
      >
        {value}
      </span>
    </div>
  );
}

function AddCreatorsTableRow({ row }: { row: AddCreatorRow }) {
  const [creator, video, ...metrics] = ROW_COLUMNS;

  return (
    <div className="flex h-[170px] items-start">
      <div className="flex shrink-0 gap-[8px] self-stretch border-b border-[#d3d4d5] py-[12px] pl-[12px]">
        <span className="flex h-[20px] shrink-0 items-center py-px">
          <span className="size-[16px] rounded-[4px] border border-[#d3d4d5] bg-white" />
        </span>
      </div>

      <div
        className="flex shrink-0 flex-col items-start gap-[8px] self-stretch border-b border-[#d3d4d5] px-[12px] py-[20px]"
        style={{ width: creator }}
      >
        <div className="flex w-full items-start gap-[8px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${SCREEN}/${row.avatar}`}
            alt=""
            width={56}
            height={56}
            className="size-[56px] shrink-0 rounded-full object-cover"
          />
          <div className="flex min-w-0 flex-1 flex-col gap-[8px]">
            <div className="flex flex-col justify-center">
              <p className="truncate text-[14px] font-medium leading-[20px] text-[#262627]">
                {row.name}
              </p>
              <p className="text-[12px] leading-[18px] text-[#575757] opacity-90">
                {row.handle}
              </p>
              <div className="flex items-start">
                <span className="text-[12px] leading-[18px] text-[#262627] opacity-90">
                  PPS:
                </span>
                <span className="border-b border-[#c3c4c5] text-right text-[12px] leading-[18px] text-[#262627]">
                  {row.pps}
                </span>
              </div>
            </div>
            <div className="flex flex-col justify-center gap-[2px]">
              <div className="flex w-full items-center gap-[6px]">
                <ScreenIcon name="icon-bag" size={14} />
                <p className="min-w-0 flex-1 text-[12px] leading-[18px] text-[#262627] opacity-90">
                  {row.categories}
                </p>
              </div>
              <div className="flex w-full items-center gap-[6px]">
                <ScreenIcon name="icon-audience" size={14} />
                <p className="min-w-0 flex-1 text-[12px] leading-[18px] text-[#262627] opacity-90">
                  {row.audience}
                </p>
              </div>
            </div>
          </div>
        </div>
        {row.tags?.length ? (
          <div className="flex items-center gap-[4px]">
            {row.tags.map((tag) => (
              <span
                key={tag}
                className="flex h-[20px] max-w-[186px] items-center justify-center overflow-hidden rounded-[10px] bg-[#ececed] px-[6px] text-[12px] leading-[18px] text-[#171718]"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </div>

      <div
        className="flex shrink-0 flex-col items-center justify-center self-stretch border-b border-[#d3d4d5] p-[12px]"
        style={{ width: video }}
      >
        <div className="relative h-[78px] w-[60.667px] overflow-hidden rounded-[8px] bg-[#626262]">
          {row.video ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${SCREEN}/${row.video}`}
                alt=""
                className="absolute inset-0 size-full object-cover"
              />
              <span
                className="absolute inset-0"
                style={{ background: `rgba(0,0,0,${row.videoScrim ?? 0.15})` }}
              />
              <ScreenIcon
                name="icon-play-fill"
                size={16}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              />
            </>
          ) : null}
        </div>
      </div>

      {metrics.map((width, i) => (
        <MetricCell
          key={width + "-" + i}
          value={row.metrics[i]}
          width={width}
          // "Item sold" is the one column the design leaves unruled.
          rule={i !== 1}
        />
      ))}
    </div>
  );
}

/** A completed step in the wizard behind the drawer. */
function PageStep({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="flex h-[76px] w-[852px] shrink-0 items-center justify-between overflow-hidden rounded-[8px] bg-white p-[24px]">
      <div className="flex items-center gap-[12px]">
        <ScreenIcon name={icon} size={icon === "icon-step-done" ? 24 : 23} />
        <p className="whitespace-nowrap text-[20px] font-medium leading-[28px] text-[#171718]">
          {label}
        </p>
      </div>
    </div>
  );
}

/** Red notification pill used twice in the nav. */
function NavBadge({ className }: { className?: string }) {
  return (
    <span
      className={`flex min-h-[16px] min-w-[16px] items-center justify-center rounded-full border border-white bg-[#e14140] p-[4px] text-center text-[12px] font-medium leading-[18px] text-white ${className ?? ""}`}
    >
      8
    </span>
  );
}

function ScreenTopNav() {
  return (
    <div className="flex h-[60px] w-[1440px] items-center bg-[rgba(0,0,0,0.92)] text-white">
      <div className="flex h-full items-center gap-[10px] px-[16px]">
        <div className="flex items-center gap-[16px]">
          <ScreenImage name="nav-logo.svg" width={80} height={31} />
          <span className="h-[16px] w-px bg-white/50" />
          <span className="whitespace-nowrap text-[20px] font-medium">
            Seller Center
          </span>
        </div>
        <div className="flex w-[400px] items-center justify-between rounded-[4px] bg-[#1f2021] px-[12px] py-[8px]">
          <span className="flex items-center gap-[8px]">
            <ScreenIcon name="nav-search" size={16} />
            <span className="whitespace-nowrap text-[14px] font-medium leading-[20px] text-white opacity-65">
              Ask anything
            </span>
          </span>
          <span className="whitespace-nowrap text-[14px] font-medium leading-[20px] text-white opacity-65">
            ⌘+K
          </span>
        </div>
      </div>

      {/* Anchored right: Inter's metrics differ from the design's TikTok Sans,
          so pinning the right edge keeps the account pill where it belongs. */}
      <div className="flex flex-1 items-center justify-end gap-[8px] pr-[16px]">
        <span className="flex items-center gap-[8px]">
          <ScreenIcon name="nav-ai" size={24} />
          <span className="whitespace-nowrap text-[14px] font-medium leading-[20px]">
            Assistant
          </span>
        </span>
        <span className="flex items-center justify-center rounded-[4px] px-[16px] py-[6px]">
          <ScreenIcon name="nav-help" size={24} />
        </span>
        <span className="h-[16px] w-px bg-[#f9f9f9] opacity-50" />
        <span className="flex items-center justify-center gap-[4px] rounded-[4px] px-[16px] py-[8px]">
          <ScreenIcon name="nav-messages" size={24} />
          <span className="whitespace-nowrap text-[14px] font-medium leading-[20px]">
            Customer Messages
          </span>
          <NavBadge />
        </span>
        <span className="flex h-[36px] items-center justify-center rounded-[4px] px-[16px] py-[8px]">
          <span className="relative size-[24px]">
            <ScreenIcon name="nav-notice" size={24} />
            <NavBadge className="absolute left-[15px] top-[-7px]" />
          </span>
        </span>
        <span className="flex h-[36px] items-center px-[16px] py-[4px]">
          <span className="flex h-[36px] items-center gap-[8px] rounded-full bg-white/20 pr-[16px]">
            <span className="flex size-[36px] items-center justify-center rounded-full bg-[#6c6c6c]">
              <ScreenIcon name="nav-account" size={18} />
            </span>
            <span className="max-w-[200px] truncate text-[14px] font-medium leading-[20px]">
              Testaccount
            </span>
          </span>
        </span>
      </div>
    </div>
  );
}

function AddCreatorsScreen() {
  return (
    <div className="tts-collab-ui @container relative h-[960px] w-[1440px] overflow-hidden bg-[#f5f5f5]">
      <ScreenTopNav />

      {/* The Invite creators wizard, almost entirely behind the drawer. */}
      <div className="absolute left-[200px] top-[76px] w-[1040px]">
        <div className="flex h-[36px] items-start gap-[8px]">
          <span className="flex h-[36px] w-[32px] shrink-0 flex-col items-center py-[2px]">
            <span className="flex h-[32px] w-px items-center justify-center rounded-[4px] bg-[#ececed]">
              <ScreenIcon name="icon-left-arrow" size={16} />
            </span>
          </span>
          <p className="whitespace-nowrap text-[28px] font-bold leading-[36px] text-[#171718]">
            Invite creators to collaborate
          </p>
        </div>
        <div className="mt-[16px] flex flex-col gap-[16px]">
          <PageStep icon="icon-step-done" label="Invitation info" />
          <PageStep icon="icon-check-circle" label="Products" />
          <PageStep icon="icon-check-circle" label="Set up free samples" />
          <div className="relative h-[523px] w-[852px] overflow-hidden rounded-[8px] bg-white">
            <div className="flex flex-col items-start p-[24px]">
              <div className="flex items-center gap-[12px]">
                <ScreenIcon name="icon-step-current" size={21} />
                <p className="whitespace-nowrap text-[20px] font-medium leading-[28px] text-[#171718]">
                  Choose creators
                </p>
              </div>
            </div>
            <div className="absolute left-[26px] top-[80px] flex w-[827px] flex-col gap-[16px]">
              <div className="flex h-[36px] w-[442px] items-center rounded-[4px] border border-black/14 bg-white px-[12px]">
                <p className="flex-1 text-[14px] leading-[20px] text-black/35">
                  Search creator by user name or user ID
                </p>
                <ScreenIcon name="icon-search" size={16} />
              </div>
              <div className="flex h-[362px] w-full flex-col items-center overflow-hidden rounded-[4px] border border-black/14 bg-white">
                <div className="flex w-full items-start">
                  <div className="flex shrink-0 gap-[4px] bg-[#f9f9f9] py-[12px] pl-[12px]">
                    <span className="flex h-[20px] shrink-0 items-center py-px">
                      <span className="size-[16px] rounded-[4px] border border-[#d3d4d5] bg-white" />
                    </span>
                  </div>
                  <div className="flex min-w-0 flex-1 gap-[4px] bg-[#f9f9f9] p-[12px]">
                    <p className="text-[12px] font-medium leading-[18px] text-[#171718]">
                      Creators
                    </p>
                  </div>
                </div>
                <div className="flex h-[320px] w-[524px] flex-col items-center justify-center gap-[16px] py-[24px]">
                  <div className="flex w-full flex-col items-center justify-center gap-[8px]">
                    <span className="relative size-[72px] overflow-hidden">
                      <ScreenIcon
                        name="icon-empty"
                        size={45}
                        className="absolute left-[4.5px] top-[4.5px]"
                      />
                    </span>
                    <div className="flex w-full flex-col items-center gap-[4px] text-center text-[14px] leading-[20px]">
                      <p className="w-full font-medium text-black/92">
                        Choose creators to collaborate with
                      </p>
                      <p className="w-full text-black/55">
                        Creators who match well with your shop are more likely
                        to accept your invitation. Invite up to 50 creators to
                        this target collaboration. You can add pre-selected
                        creators in groups, or add them one by one using the
                        search bar.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-[8px]">
                    <span className="flex items-center justify-center rounded-[4px] bg-[#009995] px-[8px] py-[3px] text-[12px] font-medium leading-[18px] text-white">
                      Add recommended creators
                    </span>
                    <span className="flex items-center justify-center rounded-[4px] bg-[#ececed] px-[8px] py-[3px] text-[12px] font-medium leading-[18px] text-[#171718]">
                      Add from Manage creators
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Drawer scrim — pd/color/neutral/overlay */}
      <div className="absolute inset-x-0 bottom-0 top-[60px] bg-[#17171873]" />

      <div
        className="absolute left-[448px] top-[60px] h-[900px] w-[992px] bg-white"
        style={{ boxShadow: "-8px 0 20px rgba(0,0,0,0.122)" }}
      >
        <div className="flex h-[76px] items-start p-[24px]">
          <p className="flex-1 truncate text-[20px] font-medium leading-[28px] text-[#171718]">
            Add creators
          </p>
          <span className="flex size-[24px] shrink-0 items-center justify-center rounded-[4px]">
            <ScreenIcon name="icon-close" size={16} />
          </span>
        </div>

        <div className="absolute left-[24px] top-[76px] h-[736px] w-[944px]">
          <div className="flex h-[24px] items-center gap-[24px]">
            <span className="text-[12px] font-medium leading-[18px] text-[#171718]">
              Add from Manage creators
            </span>
            <span className="flex h-[24px] flex-col items-center justify-between pt-[3px]">
              <span className="text-[12px] font-medium leading-[18px] text-[#171718]">
                Recommended creators
              </span>
              <span className="h-[2px] w-full bg-[#009995]" />
            </span>
          </div>

          <div className="absolute left-0 top-[40px] flex w-[944px] items-start justify-between">
            <div className="flex h-[36px] w-[496px] items-center gap-[8px] overflow-hidden rounded-[4px] border border-black/14 bg-white px-[12px] py-[8px]">
              <span className="flex shrink-0 items-center gap-[2px] whitespace-nowrap text-[14px] leading-[20px] text-[#262627]">
                Recommendation reasons
                <ScreenIcon name="icon-caret-down" size={16} />
              </span>
              <span className="min-w-0 flex-1 text-[14px] leading-[20px] text-[#262627]">
                All
              </span>
              <ScreenIcon name="icon-down" size={16} className="shrink-0" />
            </div>
            <span className="flex items-center justify-center rounded-[4px] px-[12px] py-[6px] text-[14px] font-medium leading-[20px] text-[#b7e5e2]">
              Reset
            </span>
          </div>

          <div className="absolute left-0 top-[92px] h-[644px] w-[944px] overflow-hidden">
            <div className="flex h-[60px] items-start">
              <div className="flex shrink-0 gap-[4px] self-stretch bg-[#f9f9f9] py-[12px] pl-[12px]">
                <span className="flex h-[20px] shrink-0 items-center py-px">
                  <span className="size-[16px] rounded-[4px] border border-[#d3d4d5] bg-white" />
                </span>
              </div>
              {(
                [
                  ["Creators", false],
                  ["Video", false],
                  ["Revenue", true],
                  ["Item sold", true],
                  ["Ave. video \nviews", true],
                  ["Engagement \nrate", true],
                ] as const
              ).map(([label, sortable], i) => (
                <div
                  key={label}
                  className="flex shrink-0 gap-[4px] self-stretch bg-[#f9f9f9] p-[12px]"
                  style={{ width: HEAD_COLUMNS[i] }}
                >
                  <p className="whitespace-pre text-right text-[12px] font-medium leading-[18px] text-[#171718]">
                    {label}
                  </p>
                  {sortable ? (
                    <span className="mt-px shrink-0">
                      <ScreenIcon name="icon-sort" size={16} />
                    </span>
                  ) : null}
                </div>
              ))}
            </div>
            {ADD_CREATORS.map((row) => (
              <AddCreatorsTableRow key={row.name} row={row} />
            ))}
            <span className="absolute right-0 top-0 h-full w-[8px] rounded-full bg-black/[0.02]" />
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 flex h-[88px] items-center justify-end gap-[12px] p-[24px]">
          <p className="min-w-0 flex-1 text-[12px] leading-[18px]">
            <span className="text-[#017b77]">0</span>
            <span className="text-[#6c6d6f]">/50 creator selected</span>
          </p>
          <span className="flex items-center justify-center rounded-[4px] bg-[#ececed] px-[20px] py-[10px] text-[14px] font-medium leading-[20px] text-[#171718]">
            Cancel
          </span>
          <span className="flex items-center justify-center rounded-[4px] bg-[#b7e5e2] px-[20px] py-[10px] text-[14px] font-medium leading-[20px] text-white">
            Add
          </span>
        </div>
      </div>
    </div>
  );
}

function InviteDrawer() {
  const stageRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<HTMLDivElement>(null);
  const fitRef = useRef<HTMLDivElement>(null);

  useDemoFit(stageRef, fitRef, 1440, cameraRef, screenHeight);

  return (
    <div className="rounded-xl border border-foreground/10 bg-foreground/[0.03] p-5 sm:p-8">
      <div ref={stageRef} className="tts-collab-stage">
        <div
          ref={cameraRef}
          className={`tts-collab-camera overflow-hidden rounded-lg ${UI_SHADOW}`}
        >
          <div ref={fitRef} className="tts-demo-fit">
            <AddCreatorsScreen />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---- Creator filter panel — Figma "Portifolio Site", node 1838-134960 ---- */

const FILTER_ART = "/projects/tts-ui/creator-filters";
/** The accordion stack's authored width; its Figma frame adds a 15px inset. */
const FILTER_WIDTH = 819;
const FILTER_FRAME = FILTER_WIDTH + 30;

type FilterControl =
  | { kind: "checkboxes"; label: string; options: string[] }
  | { kind: "select"; label: string; value?: string }
  | { kind: "note"; label: string; description: string };

type FilterSection = {
  title: string;
  subtitle?: string;
  controls: FilterControl[];
  /** Options pre-ticked and selects pre-filled, so the exploratory sections
   *  read as a filled-in wireframe rather than an empty shell. */
  preset?: string[];
};

/**
 * Only the first section is specified in Figma. The rest are placeholder
 * controls standing in for the rest of the exploration — same control
 * vocabulary, dummy values — so the panel reads as an early draft.
 */
const FILTER_SECTIONS: FilterSection[] = [
  {
    title: "Creator demographics",
    subtitle: "Choose the preference",
    controls: [
      { kind: "checkboxes", label: "Creator gender", options: ["Female", "Male"] },
      {
        kind: "checkboxes",
        label: "Creator age",
        options: ["18-24", "25-34", "35-44", "45 -54", "55+"],
      },
      { kind: "select", label: "Category" },
      { kind: "select", label: "Creator language" },
      {
        kind: "note",
        label: "Not invited in past 90 days",
        description:
          "Creators who are in active collaboration even if were invited 90 days ago will excluded",
      },
    ],
  },
  {
    title: "Follower demographics",
    controls: [
      { kind: "checkboxes", label: "Follower gender", options: ["Female", "Male"] },
      {
        kind: "checkboxes",
        label: "Follower age",
        options: ["18-24", "25-34", "35-44", "45 -54", "55+"],
      },
      { kind: "select", label: "Follower location", value: "United States, +2" },
      { kind: "select", label: "Follower interests", value: "Beauty, Wellness" },
    ],
    preset: ["Follower gender:Female", "Follower age:25-34", "Follower age:35-44"],
  },
  {
    title: "Performance",
    controls: [
      {
        kind: "checkboxes",
        label: "Items sold (last 30 days)",
        options: ["<100", "100-1K", "1K-10K", "10K+"],
      },
      { kind: "select", label: "GMV range", value: "$10K - $100K" },
      { kind: "select", label: "Engagement rate", value: "Above 5%" },
      {
        kind: "note",
        label: "Consistent posting cadence",
        description:
          "Creators who posted at least four shoppable videos in the last 30 days",
      },
    ],
    preset: ["Items sold (last 30 days):1K-10K", "Consistent posting cadence"],
  },
  {
    title: "Other",
    controls: [
      { kind: "checkboxes", label: "Account type", options: ["Individual", "Agency"] },
      { kind: "select", label: "Content language", value: "English" },
      {
        kind: "note",
        label: "Accepts free samples",
        description:
          "Only show creators who have sample requests turned on for their shop",
      },
    ],
    preset: ["Account type:Individual", "Accepts free samples"],
  },
];

function FilterIcon({ name }: { name: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`${FILTER_ART}/${name}.svg`}
      alt=""
      width={16}
      height={16}
      className="size-[16px]"
    />
  );
}

function FilterCheckbox({
  label,
  description,
  checked,
  onToggle,
}: {
  label: string;
  description?: string;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={checked}
      className="flex items-start gap-[8px] text-left"
    >
      <span className="flex items-start py-[2px]">
        <span
          className={`flex size-[16px] items-center justify-center overflow-hidden rounded-[4px] ${
            checked
              ? "bg-[#009995]"
              : "border border-[#d3d4d5] bg-white"
          }`}
        >
          {checked ? <FilterIcon name="check" /> : null}
        </span>
      </span>
      <span className="flex flex-col justify-center">
        <span className="whitespace-nowrap text-[14px] leading-[20px] text-[#171718]">
          {label}
        </span>
        {description ? (
          <span className="text-[12px] leading-[18px] text-black/55">
            {description}
          </span>
        ) : null}
      </span>
    </button>
  );
}

/** Non-functional by design — the exploration never specified the menu. */
function FilterSelect({ value }: { value?: string }) {
  return (
    <div className="flex h-[36px] w-full items-center justify-between gap-[4px] overflow-hidden rounded-[4px] border border-[#d3d4d5] bg-white px-[12px] py-[4px]">
      <span className="truncate text-[14px] leading-[20px] text-[#171718]">
        {value ?? ""}
      </span>
      <FilterIcon name="chevron-down" />
    </div>
  );
}

function FilterFieldLabel({ children }: { children: string }) {
  return (
    <span className="whitespace-nowrap text-[14px] font-medium leading-[20px] text-[#171718]">
      {children}
    </span>
  );
}

/**
 * Scales the panel down to its column and re-measures as sections open and
 * close. useDemoFit pins the fit element's height, which a panel that changes
 * height on click cannot use.
 */
function useFilterPanelFit(
  stageRef: React.RefObject<HTMLDivElement | null>,
  cardRef: React.RefObject<HTMLDivElement | null>,
  width: number,
) {
  useLayoutEffect(() => {
    const stage = stageRef.current;
    const card = cardRef.current;
    if (!stage || !card) return;

    const apply = () => {
      const available = stage.clientWidth;
      if (!available) return;
      const scale = Math.min(1, available / width);
      const transform = `scale(${scale})`;
      if (card.style.transform !== transform) card.style.transform = transform;
      // offsetHeight ignores the transform, so this is the authored height.
      const next = `${Math.round(card.offsetHeight * scale)}px`;
      if (stage.style.height !== next) stage.style.height = next;
    };

    apply();
    void document.fonts?.ready?.then(apply);

    const observer = new ResizeObserver(apply);
    observer.observe(stage);
    observer.observe(card);
    window.addEventListener("resize", apply);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", apply);
    };
  }, [stageRef, cardRef, width]);
}

function CreatorFilterPanel() {
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  // Figma shows the first section open and the rest collapsed.
  const [openSections, setOpenSections] = useState<string[]>([
    FILTER_SECTIONS[0].title,
  ]);
  const [ticked, setTicked] = useState<string[]>(() =>
    FILTER_SECTIONS.flatMap((section) => section.preset ?? []),
  );

  useFilterPanelFit(stageRef, cardRef, FILTER_FRAME);

  const toggleSection = (title: string) =>
    setOpenSections((open) =>
      open.includes(title)
        ? open.filter((t) => t !== title)
        : [...open, title],
    );

  const toggleTick = (key: string) =>
    setTicked((on) =>
      on.includes(key) ? on.filter((k) => k !== key) : [...on, key],
    );

  return (
    <figure className="rounded-xl border border-foreground/10 bg-foreground/[0.03] p-6 overflow-hidden">
      <div ref={stageRef} className="relative w-full">
        <div
          ref={cardRef}
          // The Figma frame is a white surface; without it the panel's own
          // text would sit on the page background and vanish on the dark theme.
          className={`absolute left-0 top-0 flex flex-col gap-[8px] rounded-[8px] bg-white px-[15px] py-[16px] font-sans ${UI_SHADOW}`}
          style={{ width: FILTER_FRAME, transformOrigin: "top left" }}
        >
          {FILTER_SECTIONS.map((section) => {
            const isOpen = openSections.includes(section.title);
            const panelId = `filter-${section.title.replace(/\s+/g, "-").toLowerCase()}`;

            return (
              <div
                key={section.title}
                // Figma draws the stroke inside the frame, so it must not add to the
                // box height: an inset outline keeps the 486px/60px heights exact.
                className="flex flex-col gap-[16px] overflow-hidden rounded-[4px] bg-white p-[16px] outline outline-1 -outline-offset-1 outline-[#d3d4d5]"
              >
                <div className="flex w-full items-center gap-[16px]">
                  <div className="flex min-w-0 flex-1 flex-col gap-[2px]">
                    <span className="truncate text-[20px] font-medium leading-[28px] text-[#171718]">
                      {section.title}
                    </span>
                    {section.subtitle ? (
                      <span className="truncate text-[12px] leading-[18px] text-[#6c6d6f]">
                        {section.subtitle}
                      </span>
                    ) : null}
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleSection(section.title)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    aria-label={`${isOpen ? "Collapse" : "Expand"} ${section.title}`}
                    className="flex min-h-[24px] min-w-[24px] items-center justify-center rounded-[4px] p-[4px] transition-colors hover:bg-black/5"
                  >
                    <FilterIcon name={isOpen ? "chevron-up" : "chevron-down"} />
                  </button>
                </div>

                {isOpen ? (
                  <div id={panelId} className="flex w-full flex-col gap-[32px]">
                    {section.controls.map((control) => {
                      if (control.kind === "note") {
                        return (
                          <FilterCheckbox
                            key={control.label}
                            label={control.label}
                            description={control.description}
                            checked={ticked.includes(control.label)}
                            onToggle={() => toggleTick(control.label)}
                          />
                        );
                      }
                      return (
                        <div
                          key={control.label}
                          className="flex w-full flex-col gap-[8px]"
                        >
                          <span className="flex h-[20px] items-center">
                            <FilterFieldLabel>{control.label}</FilterFieldLabel>
                          </span>
                          {control.kind === "select" ? (
                            <FilterSelect value={control.value} />
                          ) : (
                            <div className="flex flex-wrap items-center gap-x-[43px] gap-y-[12px]">
                              {control.options.map((option) => {
                                const key = `${control.label}:${option}`;
                                return (
                                  <FilterCheckbox
                                    key={option}
                                    label={option}
                                    checked={ticked.includes(key)}
                                    onToggle={() => toggleTick(key)}
                                  />
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </figure>
  );
}

/* ---- Describe creators — Figma "Portifolio Site", node 1839-135488 ---- */

/** The text field's authored width; its Figma frame adds a 15px inset. */
const DESCRIBE_WIDTH = 818;
const DESCRIBE_FRAME = DESCRIBE_WIDTH + 30;
const DESCRIBE_LIMIT = 500;

/**
 * The example a seller sees before typing. Figma specifies only the focused,
 * empty state, so this stands in for the resting one: a concrete prompt that
 * shows the kind of description the field expects.
 */
const DESCRIBE_PLACEHOLDER =
  "e.g. Beauty and skincare creators in the US with a mostly female audience aged 18-34. " +
  "I'm looking for people who post tutorial-style videos, have driven at least $10K in " +
  "affiliate GMV in the last 30 days, and are open to receiving free samples.";

function DescribeCreatorsPanel() {
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState("");

  useFilterPanelFit(stageRef, cardRef, DESCRIBE_FRAME);

  return (
    <figure className="rounded-xl border border-foreground/10 bg-foreground/[0.03] p-6 overflow-hidden">
      <div ref={stageRef} className="relative w-full">
        <div
          ref={cardRef}
          // Same white Figma frame as the sibling panel — its title and
          // subtitle sit on this surface, not on the page background.
          className={`absolute left-0 top-0 flex flex-col gap-[8px] rounded-[8px] bg-white px-[15px] py-[17px] font-sans ${UI_SHADOW}`}
          style={{ width: DESCRIBE_FRAME, transformOrigin: "top left" }}
        >
          <div className="flex w-full flex-col justify-center gap-[4px]">
            <p className="whitespace-nowrap text-[16px] font-medium leading-[24px] text-black/92">
              Describe preferred creators
            </p>
            <div className="flex h-[24px] items-start overflow-hidden">
              <p className="w-[669px] text-[14px] leading-[20px] text-[#6c6d6f]">
                Explain creator demographics, sales performance, content style
                and etc.
              </p>
            </div>
          </div>

          {/*
            Figma draws only the focused field, in primary/core-pressed. At
            rest it takes the neutral border its sibling controls use, and
            focus-within restores the specified teal on click.
          */}
          <div className="flex h-[295px] w-full items-end gap-[8px] rounded-[4px] border border-[#d3d4d5] bg-white px-[12px] py-[6px] transition-colors focus-within:border-[#017976]">
            <textarea
              value={value}
              onChange={(event) =>
                setValue(event.target.value.slice(0, DESCRIBE_LIMIT))
              }
              maxLength={DESCRIBE_LIMIT}
              placeholder={DESCRIBE_PLACEHOLDER}
              aria-label="Describe preferred creators"
              className="h-full flex-1 resize-none self-stretch bg-transparent text-[14px] leading-[20px] text-[#171718] caret-[#171718] outline-none placeholder:text-[#a9abad]"
            />
            <span className="shrink-0 rounded-[4px] bg-[#ececed] px-[2px] text-right text-[12px] leading-[18px] text-[#6c6d6f]">
              {value.length}/{DESCRIBE_LIMIT}
            </span>
          </div>
        </div>
      </div>
    </figure>
  );
}

function DeliverableScreenshot() {
  return (
    <figure className="mt-8 sm:mt-10 rounded-xl border border-foreground/10 bg-foreground/[0.03] p-6 overflow-hidden">
      <img
        src="https://www.figma.com/api/mcp/asset/d29a64d4-dbf5-45be-95ca-4085825685ac/daa65.png"
        alt="Final deliverables - Seller landing and creation experience screens"
        className="w-full h-auto rounded-lg"
      />
    </figure>
  );
}

export function CaseStudyGate() {
  // false on the server and through hydration, so there is no mismatch.
  const remembered = useSyncExternalStore(
    subscribeNever,
    readSession,
    () => false,
  );
  const [justUnlocked, setJustUnlocked] = useState(false);
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  const unlocked = remembered || justUnlocked;

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (value !== PASSCODE) {
      setError(true);
      setValue("");
      return;
    }
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // Not remembering is fine; the page still unlocks for this view.
    }
    setError(false);
    setJustUnlocked(true);
  }

  if (unlocked) {
    return (
      <article className="pb-16 sm:pb-24">
        <div className="reveal mt-8">
          <h1 className="font-sans text-[clamp(1.75rem,6vw,2.75rem)] font-semibold leading-[1.1] tracking-tight text-foreground">
            Bridge the gap for two-sided marketplace at a scale
          </h1>
          <p className="mt-6 font-sans text-[15px] leading-[1.65] text-pretty text-foreground/80 sm:text-[17px]">
            Much of my work focuses on designing multi-sided marketplaces at scale.
            This case study shows how I bring useful, trustworthy, and strategic thinking to a complex matching problem at TikTok Shop—partnering with global cross-functional teams on an ecosystem generating ~$11.4M in daily affiliate GMV.
          </p>
        </div>

        <div className="reveal reveal-delay-1 mt-12 h-px bg-foreground/10" />

        <section className="reveal reveal-delay-2 mt-12">
          <h2 className="font-sans text-[clamp(1.125rem,4vw,1.5rem)] font-semibold tracking-tight text-foreground">
            Context
          </h2>

          <p className="mt-4 font-sans text-[15px] leading-[1.65] text-pretty text-foreground/80 sm:mt-5 sm:text-[17px]">
            Over time, seller attention increasingly concentrated on top creators. This made it harder for users to discover the right fit, while creating an unhealthy marketplace dynamic for the platform.
          </p>

          <figure className="mt-8 sm:mt-10">
            <ConcentrationDiagram />
          </figure>

          <p className="mt-6 font-sans text-[15px] leading-[1.65] text-pretty text-foreground/80 sm:mt-8 sm:text-[17px]">
            Today, sellers rely on a set of familiar performance metrics when deciding which creators to invite, reinforcing the same behavior rather than helping them discover better matches.
          </p>

          <figure className="mt-8 sm:mt-10">
            <InviteDrawer />
            <figcaption className="mt-4 font-sans text-[13px] leading-[1.6] text-foreground/60 sm:text-[14px]">
              Today's experience: Sellers manually select creators by browsing through lists and filtering by familiar metrics like follower count, engagement rate, and past collaboration history.
            </figcaption>
          </figure>

          <p className="mt-8 font-sans text-[15px] leading-[1.65] text-pretty text-foreground/80 sm:mt-10 sm:text-[17px]">
            The company wanted to test a new <span className="font-semibold">platform-driven approach</span> alongside the existing experience. I was brought in to define what that experience should be: creating meaningful value for sellers while driving <span className="font-semibold">adoption and collaboration success</span> for the business.
          </p>

          <div className="mt-12 h-px bg-foreground/10" />

          <h3 className="mt-6 font-sans text-[clamp(1rem,4vw,1.25rem)] font-semibold tracking-tight text-foreground">
            Shaping the Product Direction
          </h3>
          <p className="mt-4 font-sans text-[15px] leading-[1.65] text-pretty text-foreground/80 sm:mt-5 sm:text-[17px]">
            I explored patterns across other platforms and brought two directions to the team: structured inputs that guide decisions, and a more open-ended approach that gives sellers greater control.
          </p>

          <div className="grid grid-cols-1 gap-6 mt-8 sm:grid-cols-2 sm:mt-10">
            {/* Left View — Figma node 1838-134960 */}
            <CreatorFilterPanel />

            {/* Right View — Figma node 1839-135488 */}
            <DescribeCreatorsPanel />
          </div>

          <p className="mt-6 font-sans text-[15px] leading-[1.65] text-pretty text-foreground/80 sm:mt-8 sm:text-[17px]">
            By evaluating the rationale, strengths, and tradeoffs behind each direction, I landed on a new approach that guides seller intent without over-constraining it.
          </p>

          {/* Full-width Creator Preference Card */}
          <figure className="mt-8 sm:mt-10 rounded-xl border border-foreground/10 bg-foreground/[0.03] p-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="space-y-6">
                {/* Header Section */}
                <div className="space-y-1">
                  <h3 className="font-sans text-[16px] font-semibold text-foreground">
                    Describe your preference
                  </h3>
                  <p className="text-[14px] text-foreground/60">
                    Your input will help targeting right creators.
                  </p>
                </div>

                {/* Textarea Section */}
                <div className="space-y-2">
                  <div className="border border-foreground/15 rounded p-4 bg-foreground/[0.01] min-h-[140px]">
                    <p className="font-sans text-[14px] leading-[1.6] text-foreground/80">
                      Creators in my category who post routine videos, show before-and-after results, and honest product reviews. Audience skews female, 18–35, highly engaged. We'd love creators who are consistent, genuine, and open to long-term collaboration. Bonus if they've worked with beauty or personal care brands before.
                    </p>
                  </div>
                  <div className="flex justify-end">
                    <span className="text-[12px] text-foreground/50 bg-foreground/[0.05] px-3 py-1 rounded">
                      400/500
                    </span>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-foreground/10" />

                {/* Add more criteria */}
                <div className="flex items-center gap-2 cursor-pointer group">
                  <span className="text-foreground/40 group-hover:text-foreground/60 transition-colors text-[14px]">
                    ▼
                  </span>
                  <div className="flex items-center gap-2">
                    <h4 className="font-sans text-[16px] font-semibold text-foreground">
                      Add more criteria
                    </h4>
                    <svg
                      className="size-4 text-foreground/50"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 16v-4m0-4v.01" />
                    </svg>
                  </div>
                </div>

                {/* Three buttons */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {[
                    {
                      title: "Creator demography",
                      desc: "Age, language and category etc."
                    },
                    {
                      title: "Creator performance",
                      desc: "Follower, viewers and engagement"
                    },
                    {
                      title: "Target audience",
                      desc: "Location, spending power"
                    }
                  ].map((item) => (
                    <button
                      key={item.title}
                      className="border border-foreground/15 rounded p-4 flex gap-4 items-start hover:bg-foreground/[0.02] transition-colors text-left"
                    >
                      <div className="flex-shrink-0 w-5 h-5 mt-1">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="text-foreground/60"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="M12 8v8M8 12h8" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-sans text-[14px] font-semibold text-foreground">
                          {item.title}
                        </p>
                        <p className="font-sans text-[12px] text-foreground/50 mt-1">
                          {item.desc}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </figure>

          <p className="mt-6 font-sans text-[15px] leading-[1.65] text-pretty text-foreground/80 sm:mt-8 sm:text-[17px]">
            Ideally, sellers would see their matched creator pool evolve in real time as they refine their needs, making the connection between <span className="font-semibold text-foreground">input and outcome visible</span> and building <span className="font-semibold text-foreground">trust in how the platform interprets their intent</span>.
          </p>

          {/* Creator Collaboration Step */}
          <figure className="mt-8 sm:mt-10 rounded-xl border border-foreground/10 bg-foreground/[0.03] p-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              {/* Header and Navigation */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <button className="text-foreground/60 hover:text-foreground">←</button>
                  <h3 className="font-sans text-[20px] font-semibold text-foreground">
                    Create collaboration
                  </h3>
                </div>

                {/* Progress Steps */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-foreground/20 flex items-center justify-center text-[12px] text-foreground">✓</div>
                    <span className="text-[13px] text-foreground/60">General info</span>
                  </div>
                  <div className="w-8 h-px bg-foreground/15" />
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-foreground/20 flex items-center justify-center text-[12px] text-foreground">✓</div>
                    <span className="text-[13px] text-foreground/60">Products</span>
                  </div>
                  <div className="w-8 h-px bg-foreground/15" />
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-foreground text-white flex items-center justify-center text-[12px] font-semibold">●</div>
                    <span className="text-[13px] font-semibold text-foreground">Creators</span>
                  </div>
                  <div className="w-8 h-px bg-foreground/15" />
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-foreground/10 flex items-center justify-center text-[12px] text-foreground/40">4</div>
                    <span className="text-[13px] text-foreground/40">Review</span>
                  </div>
                </div>
              </div>

              {/* Two-column layout */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left content */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Creators matched */}
                  <div className="flex items-center gap-4 p-4 rounded bg-foreground/[0.02] border border-foreground/10">
                    <div className="flex">
                      {[0, 1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="w-8 h-8 rounded-full bg-foreground/20 border-2 border-white flex items-center justify-center text-[10px] font-semibold text-foreground -ml-2 first:ml-0"
                        >
                          C{i + 1}
                        </div>
                      ))}
                    </div>
                    <span className="text-[13px] font-medium text-foreground">
                      125 creators automatically matched
                    </span>
                  </div>

                  {/* Describe preference */}
                  <div>
                    <h4 className="text-[15px] font-semibold text-foreground mb-2">
                      Describe your preference
                    </h4>
                    <p className="text-[13px] text-foreground/60 mb-3">
                      Your input will help breaking matched creators.
                    </p>
                    <div className="border border-foreground/15 rounded p-4 bg-foreground/[0.01] min-h-[100px]">
                      <p className="text-[13px] leading-[1.6] text-foreground/80">
                        Skincare and self-care creators who post routine videos, before-and-after results, and honest product reviews. Audience skews female, 18–35, highly engaged. We'd love creators who are consistent, genuine, and open to long-term collaboration. Bonus if they've worked with beauty or personal care brands before.
                      </p>
                    </div>
                    <div className="flex justify-end mt-2">
                      <span className="text-[11px] text-foreground/50 bg-foreground/[0.05] px-2 py-1 rounded">
                        400/500
                      </span>
                    </div>
                  </div>

                  {/* Add more criteria */}
                  <div className="flex items-center gap-2 cursor-pointer text-foreground/60 hover:text-foreground/80">
                    <span className="text-[13px]">▼</span>
                    <span className="text-[13px] font-medium">Add more criteria</span>
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 16v-4m0-4v.01" />
                    </svg>
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-3 mt-6">
                    <button className="px-6 py-2 border border-foreground/20 rounded text-[14px] font-medium text-foreground/60 hover:text-foreground hover:border-foreground/40">
                      Previous
                    </button>
                    <button className="px-6 py-2 bg-foreground text-white rounded text-[14px] font-medium hover:opacity-80">
                      Next
                    </button>
                  </div>
                </div>

                {/* Right preview panel */}
                <div className="lg:col-span-1 space-y-6">
                  {/* Phone preview */}
                  <div className="flex flex-col items-center">
                    <div className="w-full max-w-xs bg-black rounded-3xl p-3 shadow-lg">
                      <div className="bg-foreground rounded-2xl p-4 aspect-video flex items-center justify-center">
                        <div className="text-center">
                          <p className="text-[11px] font-medium text-white/80 mb-2">Invitation</p>
                          <p className="text-[9px] text-white/60">Preview</p>
                        </div>
                      </div>
                    </div>
                    <p className="text-[12px] text-foreground/50 mt-3">Creator preview</p>
                  </div>

                  {/* Shop info */}
                  <div className="space-y-4 pt-4 border-t border-foreground/10">
                    <div>
                      <p className="text-[12px] font-semibold text-foreground mb-2">About this shop</p>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-foreground/20" />
                        <div>
                          <p className="text-[13px] font-medium text-foreground">SkinCare Shop</p>
                          <p className="text-[11px] text-foreground/50">4.8/5.0 • 154 sales</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="text-[12px] font-semibold text-foreground mb-2">Preferred content type</p>
                      <p className="text-[13px] text-foreground/70">Short video</p>
                    </div>

                    <div>
                      <p className="text-[12px] font-semibold text-foreground mb-2">Incentives</p>
                      <div className="space-y-1 text-[12px]">
                        <div className="flex justify-between">
                          <span className="text-foreground/60">Free sample</span>
                          <span className="text-foreground">Auto-approval</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-foreground/60">Commission rate</span>
                          <span className="text-foreground">12.45%-16.34%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-foreground/60">Product price</span>
                          <span className="text-foreground">$23.99-$123.99</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="text-[12px] font-semibold text-foreground mb-3">Products</p>
                      <div className="flex gap-2 mb-3">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="w-12 h-12 bg-foreground/15 rounded" />
                        ))}
                      </div>
                      <button className="w-full py-2 bg-foreground text-white text-[12px] font-medium rounded hover:opacity-80">
                        Accept
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </figure>

          <p className="mt-6 font-sans text-[15px] leading-[1.65] text-pretty text-foreground/80 sm:mt-8 sm:text-[17px]">
            Engineering validation revealed that real-time matching would be too costly within our constraints. Rather than removing feedback entirely, I preserved the underlying principle with a lighter interaction: <span className="font-semibold text-foreground">acknowledge that the system is capturing and interpreting seller intent as they type</span>.
          </p>

          {/* Create Collaboration Full Interface */}
          <figure className="mt-8 sm:mt-10 rounded-xl border border-foreground/10 bg-foreground/[0.03] p-6">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              {/* Top Navigation Bar */}
              <div className="flex items-center justify-between px-6 py-3 bg-foreground/95 border-b border-foreground/10">
                {/* Left section */}
                <div className="flex items-center gap-6">
                  {/* Logo */}
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-6 bg-white/20 rounded flex items-center justify-center">
                      <span className="text-white text-[10px] font-bold">TikTok</span>
                    </div>
                    <div className="w-px h-4 bg-white/20" />
                    <span className="text-white text-[16px] font-semibold">Seller Center</span>
                  </div>

                  {/* Search */}
                  <div className="hidden sm:flex items-center gap-2 bg-foreground/80 px-3 py-2 rounded text-[13px] max-w-xs">
                    <svg className="w-4 h-4 text-white/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.35-4.35" />
                    </svg>
                    <span className="text-white/60">Ask anything</span>
                    <span className="ml-auto text-white/40 text-[11px]">⌘+K</span>
                  </div>
                </div>

                {/* Right section */}
                <div className="flex items-center gap-4">
                  {/* Assistant */}
                  <div className="flex items-center gap-2 text-white text-[13px]">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M8 12h8" />
                    </svg>
                    <span>Assistant</span>
                  </div>

                  {/* Help */}
                  <button className="p-2 hover:bg-white/10 rounded">
                    <svg className="w-5 h-5 text-white/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 16v-4M12 8h.01" />
                    </svg>
                  </button>

                  {/* Divider */}
                  <div className="w-px h-5 bg-white/20" />

                  {/* Messages */}
                  <div className="flex items-center gap-2 relative">
                    <button className="p-2 hover:bg-white/10 rounded">
                      <svg className="w-5 h-5 text-white/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      </svg>
                    </button>
                    <span className="text-white text-[12px] font-medium">Customer Messages</span>
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 text-white text-[10px] rounded-full flex items-center justify-center font-semibold">
                      8
                    </div>
                  </div>

                  {/* Notifications */}
                  <button className="p-2 hover:bg-white/10 rounded relative">
                    <svg className="w-5 h-5 text-white/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                    </svg>
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 text-white text-[10px] rounded-full flex items-center justify-center font-semibold">
                      8
                    </div>
                  </button>

                  {/* Account */}
                  <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full">
                    <div className="w-6 h-6 bg-foreground/60 rounded-full flex items-center justify-center">
                      <span className="text-white text-[10px] font-bold">T</span>
                    </div>
                    <span className="text-white text-[13px] hidden sm:inline">Testaccount</span>
                  </div>
                </div>
              </div>

              {/* Collaboration Content */}
              <div className="p-8">
                {/* Header */}
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-6">
                    <button className="text-foreground/60 hover:text-foreground">←</button>
                    <h3 className="font-sans text-[24px] font-semibold text-foreground">
                      Create collaboration
                    </h3>
                  </div>

                  {/* Progress Steps */}
                  <div className="flex items-center gap-4">
                    {[
                      { label: "General info", done: true },
                      { label: "Products", done: true },
                      { label: "Creators", active: true },
                      { label: "Review", num: 4 }
                    ].map((step, i) => (
                      <div key={i} className="flex items-center gap-2">
                        {step.done && (
                          <>
                            <div className="w-6 h-6 rounded-full bg-cyan-500 flex items-center justify-center text-white text-xs">✓</div>
                            <span className="text-[13px] text-foreground/60">{step.label}</span>
                          </>
                        )}
                        {step.active && (
                          <>
                            <div className="w-6 h-6 rounded-full bg-cyan-500 text-white flex items-center justify-center text-xs font-semibold">●</div>
                            <span className="text-[13px] font-semibold text-foreground">{step.label}</span>
                          </>
                        )}
                        {step.num && (
                          <>
                            <div className="w-6 h-6 rounded-full bg-foreground/10 flex items-center justify-center text-[11px] text-foreground/40">{step.num}</div>
                            <span className="text-[13px] text-foreground/40">{step.label}</span>
                          </>
                        )}
                        {i < 3 && <div className="w-8 h-px bg-foreground/15" />}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Two-column layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Left content */}
                  <div className="lg:col-span-2">
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-[15px] font-semibold text-foreground mb-1">
                          Describe your preference
                        </h4>
                        <p className="text-[13px] text-cyan-600 flex items-center gap-1">
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" /></svg>
                          Saving...
                        </p>
                      </div>
                      <div className="border-2 border-blue-400 rounded p-4 bg-blue-50/30 min-h-[80px]">
                        <p className="text-[13px] leading-[1.6] text-foreground/80">
                          Skincare and self-care creators who post routine videos, before-and-after results, and honest product reviews. Audience skews female, 18–35, highly engaged. We'd love creators who are consistent, genuine, and open to long-term collaboration. Bonus if they've worked with beauty or personal care brands before.
                        </p>
                      </div>
                      <div className="flex justify-end">
                        <span className="text-[11px] text-foreground/50">400/500</span>
                      </div>

                      {/* Add more criteria */}
                      <div className="flex items-center gap-2 cursor-pointer text-foreground/60 hover:text-foreground/80 pt-2">
                        <span className="text-[13px]">▶</span>
                        <span className="text-[13px] font-medium">Add more criteria</span>
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10" />
                          <path d="M12 16v-4m0-4v.01" />
                        </svg>
                      </div>

                      {/* Action buttons */}
                      <div className="flex gap-3 pt-4">
                        <button className="px-6 py-2 border border-foreground/20 rounded text-[14px] font-medium text-foreground/70 hover:text-foreground hover:border-foreground/40">
                          Previous
                        </button>
                        <button className="px-6 py-2 bg-cyan-600 text-white rounded text-[14px] font-medium hover:bg-cyan-700">
                          Next
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Right preview panel */}
                  <div className="lg:col-span-1 space-y-6">
                    {/* Creator preview header */}
                    <div>
                      <p className="text-[13px] font-semibold text-foreground mb-3">Creator preview</p>
                      <div className="flex flex-col items-center">
                        <div className="w-full max-w-xs bg-black rounded-3xl p-3 shadow-lg">
                          <div className="bg-foreground rounded-2xl p-4 aspect-video flex items-center justify-center">
                            <div className="text-center">
                              <p className="text-[11px] font-medium text-white/80 mb-2">Invitation</p>
                              <p className="text-[9px] text-white/60">Preview</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Overview tab */}
                    <div className="border-b border-foreground/10 pb-2">
                      <button className="text-[13px] font-medium text-foreground">Overview</button>
                    </div>

                    {/* Shop info */}
                    <div className="space-y-3">
                      <div>
                        <p className="text-[12px] font-semibold text-foreground mb-2">About this shop</p>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-foreground/20" />
                          <div>
                            <p className="text-[13px] font-medium text-foreground">SkinCare Shop</p>
                            <p className="text-[11px] text-foreground/50">4.8/5.0 • 154 sales</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="text-[12px] font-semibold text-foreground mb-2">Preferred content type</p>
                        <p className="text-[13px] text-foreground/70">Short video</p>
                      </div>

                      <div>
                        <p className="text-[12px] font-semibold text-foreground mb-2">Incentives</p>
                        <div className="space-y-1 text-[12px]">
                          <div className="flex justify-between">
                            <span className="text-foreground/60">Free sample</span>
                            <span className="text-foreground">Auto-approval</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-foreground/60">Commission rate</span>
                            <span className="text-foreground">12.45%-16.34%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-foreground/60">Product price</span>
                            <span className="text-foreground">$23.99-$123.99</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="text-[12px] font-semibold text-foreground mb-3">Products</p>
                        <div className="flex gap-2 mb-3">
                          {[1, 2, 3].map((i) => (
                            <div key={i} className="w-12 h-12 bg-foreground/15 rounded" />
                          ))}
                        </div>
                        <button className="w-full py-2 bg-red-600 text-white text-[12px] font-medium rounded hover:bg-red-700">
                          Accept
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </figure>

          <p className="mt-8 font-sans text-[15px] leading-[1.65] text-pretty text-foreground/80 sm:mt-10 sm:text-[17px]">
            This tradeoff kept the experience responsive and trustworthy, while giving us a feasible path to ship and learn.
          </p>

          <div className="mt-12 h-px bg-foreground/10" />

          <h2 className="mt-12 font-sans text-[clamp(1.125rem,4vw,1.5rem)] font-semibold tracking-tight text-foreground">
            Balancing User Value &amp; Compliance
          </h2>

          <p className="mt-6 font-sans text-[15px] leading-[1.65] text-pretty text-foreground/80 sm:mt-8 sm:text-[17px]">
            At platform scale, I often balance user value with compliance: Simplifying complex requirements while keeping the experience clear, trustworthy, and actionable.
          </p>

          <p className="mt-4 font-sans text-[15px] leading-[1.65] text-pretty text-foreground/80 sm:text-[17px]">
            In this case, continuous matching introduced a compliance risk: <span className="font-semibold text-foreground">if sellers repeatedly rejected sample requests, the platform could continue recruiting creators until the seller-defined time or sample limits were reached, potentially creating spam and undermining the intent of the experience.</span>
          </p>

          <p className="mt-4 font-sans text-[15px] leading-[1.65] text-pretty text-foreground/80 sm:text-[17px]">
            Legal and Product initially proposed notifying sellers when a collaboration was approaching the outreach threshold.
          </p>

          <figure className="mt-8 sm:mt-10 rounded-xl border border-foreground/10 bg-foreground/[0.03] p-6">
            <div className="bg-background rounded-lg border border-foreground/10 overflow-hidden">
              {/* Top Navigation */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-foreground/10 bg-foreground/[0.02]">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-sm bg-foreground/20" />
                    <span className="font-semibold text-[15px] text-foreground">Seller Center</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button className="p-2 hover:bg-foreground/5 rounded">
                    <svg className="w-5 h-5 text-foreground/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 16v-4M12 8h.01" />
                    </svg>
                  </button>
                  <div className="w-8 h-8 rounded-full bg-foreground/15" />
                </div>
              </div>

              {/* Page Tabs */}
              <div className="border-b border-foreground/10 px-6">
                <div className="flex gap-8 py-4">
                  <div className="pb-3 border-b-2 border-foreground text-[14px] font-medium text-foreground">
                    <svg className="w-4 h-4 mb-1 inline mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z" />
                    </svg>
                    Work with select creators
                  </div>
                  <div className="pb-3 text-[14px] text-foreground/50 hover:text-foreground/70 cursor-pointer">
                    <svg className="w-4 h-4 mb-1 inline mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                    </svg>
                    Set up products for all creators
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Data Blocks */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="border border-foreground/10 rounded-lg p-4 bg-foreground/[0.02]">
                    <p className="text-[13px] text-foreground/60 mb-3">Invitations with sample request review</p>
                    <p className="text-[32px] font-semibold text-foreground">230</p>
                    <p className="text-[12px] text-foreground/50 mt-2 flex items-center gap-1">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M13 9l3 3L8 20H4v-4l9-11z" />
                      </svg>
                      Go to Samples
                    </p>
                  </div>

                  <div className="border border-foreground/10 rounded-lg p-4 bg-foreground/[0.02]">
                    <p className="text-[13px] text-foreground/60 mb-3">All flat fee invites with timely tasks</p>
                    <p className="text-[32px] font-semibold text-foreground">20</p>
                  </div>

                  <div className="border border-foreground/10 rounded-lg p-4 bg-foreground/[0.02] relative">
                    <p className="text-[13px] text-foreground/60 mb-3 flex items-center gap-2">
                      Collaborations nearing invite limit
                      <svg className="w-4 h-4 text-foreground/40 cursor-help" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 16v-4M12 8h.01" />
                      </svg>
                    </p>
                    <p className="text-[32px] font-semibold text-foreground">5</p>
                    <p className="text-[12px] text-foreground/50 mt-2">⟹ Take action</p>
                  </div>
                </div>

                {/* Filters and Controls */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 flex items-center gap-2 border border-foreground/10 rounded-lg px-3 py-2 bg-foreground/[0.02]">
                    <svg className="w-4 h-4 text-foreground/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.35-4.35" />
                    </svg>
                    <input type="text" placeholder="Search collaborations" className="flex-1 text-[13px] bg-transparent outline-none text-foreground placeholder:text-foreground/30" />
                  </div>
                  <select className="px-3 py-2 border border-foreground/10 rounded-lg bg-background text-[13px] text-foreground cursor-pointer">
                    <option>Sort by</option>
                    <option>Recent</option>
                    <option>Active</option>
                  </select>
                  <select className="px-3 py-2 border border-foreground/10 rounded-lg bg-background text-[13px] text-foreground cursor-pointer">
                    <option>Status</option>
                    <option>Pending</option>
                    <option>Active</option>
                  </select>
                  <button className="px-4 py-2 text-[13px] text-foreground/60 hover:text-foreground">Clear filters</button>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-[13px]">
                    <thead>
                      <tr className="border-b border-foreground/10 bg-foreground/[0.02]">
                        <th className="text-left font-medium text-foreground/70 px-4 py-3">Collaboration</th>
                        <th className="text-left font-medium text-foreground/70 px-4 py-3 w-24">Status</th>
                        <th className="text-left font-medium text-foreground/70 px-4 py-3 w-32">Progress</th>
                        <th className="text-left font-medium text-foreground/70 px-4 py-3 w-20">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { name: "Summer Glow Skincare Launch", modified: "06/03/2026", products: "5 products" },
                        { name: "Labor Day Gift Guide 2026", modified: "04/12/2026", products: "47 products" },
                        { name: "Active Wear Spring Refresh", modified: "03/21/2026", products: "156 products" },
                        { name: "Protein Snack Bar Sampling", modified: "01/13/2026", products: "22 products" },
                        { name: "Home Fragrance Collection Drop", modified: "12/18/2026", products: "5 products" },
                        { name: "Holiday Beauty Bundle 2025", modified: "12/01/2026", products: "18 products" },
                      ].map((item, idx) => (
                        <tr key={idx} className="border-b border-foreground/5 hover:bg-foreground/[0.02]">
                          <td className="px-4 py-4">
                            <p className="font-medium text-foreground">{item.name}</p>
                            <p className="text-[12px] text-foreground/50 mt-1">Modified {item.modified} • {item.products}</p>
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-foreground/40" />
                              <span className="text-foreground/60">{idx % 3 === 0 ? "Active" : idx % 3 === 1 ? "Pending" : "Sent"}</span>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="w-20 h-1.5 bg-foreground/10 rounded-full overflow-hidden">
                              <div className={`h-full bg-foreground`} style={{width: `${(idx + 1) * 20}%`}} />
                            </div>
                            <p className="text-[11px] text-foreground/50 mt-1">{(idx + 1) * 20}%</p>
                          </td>
                          <td className="px-4 py-4">
                            <button className="text-foreground/50 hover:text-foreground">
                              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                <circle cx="12" cy="5" r="2" />
                                <circle cx="12" cy="12" r="2" />
                                <circle cx="12" cy="19" r="2" />
                              </svg>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </figure>

          <p className="mt-4 font-sans text-[15px] leading-[1.65] text-pretty text-foreground/80 sm:text-[17px]">
            I saw a gap in this approach: <span className="font-semibold text-foreground">the platform was doing the matching, but sellers would only learn about the consequence after the risk had already accumulated with limited ability to course-correct.</span> This could erode trust in the platform-driven experience.
          </p>

          <p className="mt-4 font-sans text-[15px] leading-[1.65] text-pretty text-foreground/80 sm:text-[17px]">
            I proposed intervening earlier: Surfacing an alert when the sample approval rate begins approaching the threshold, explain what it is, and give sellers a direct path to review pending sample requests and improve the rate.
          </p>

          <figure className="mt-8 sm:mt-10 rounded-xl border border-foreground/10 bg-foreground/[0.03] p-6">
            <div className="bg-background rounded-lg border border-foreground/10 overflow-hidden">
              {/* Top Navigation */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-foreground/10 bg-foreground/[0.02]">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-sm bg-foreground/20" />
                  <span className="font-semibold text-[15px] text-foreground">Seller Center</span>
                </div>
                <div className="flex items-center gap-3">
                  <button className="p-2 hover:bg-foreground/5 rounded">
                    <svg className="w-5 h-5 text-foreground/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 16v-4M12 8h.01" />
                    </svg>
                  </button>
                  <div className="w-8 h-8 rounded-full bg-foreground/15" />
                </div>
              </div>

              {/* Page Header with Back Button */}
              <div className="px-6 py-4 border-b border-foreground/10">
                <div className="flex items-center gap-3">
                  <button className="p-2 hover:bg-foreground/5 rounded text-foreground/60 hover:text-foreground">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <h2 className="text-[18px] font-semibold text-foreground">Collaboration Overview</h2>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex gap-6 px-6 border-b border-foreground/10 bg-foreground/[0.02]">
                <button className="py-4 text-[14px] font-medium text-foreground border-b-2 border-foreground">All</button>
                <button className="py-4 text-[14px] text-foreground/50 hover:text-foreground/70">Active</button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Store Collaboration Boards */}
                <div>
                  <h3 className="text-[15px] font-semibold text-foreground mb-4">Active Collaborations</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { store: "Default Store", desc: "Summer Collection", progress: 65 },
                      { store: "Beauty Hub", desc: "Spring Launch", progress: 45, warning: true },
                      { store: "Fashion Forward", desc: "New Arrivals", progress: 85 },
                      { store: "Home & Living", desc: "Seasonal Update", progress: 30 },
                    ].map((item, idx) => (
                      <div key={idx} className="border border-foreground/10 rounded-lg p-4 bg-foreground/[0.02]">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <p className="text-[13px] font-semibold text-foreground">{item.store}</p>
                            <p className="text-[12px] text-foreground/50 mt-1">{item.desc}</p>
                          </div>
                          <button className="text-foreground/40 hover:text-foreground/60">
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                              <circle cx="12" cy="5" r="2" />
                              <circle cx="12" cy="12" r="2" />
                              <circle cx="12" cy="19" r="2" />
                            </svg>
                          </button>
                        </div>
                        <div className="space-y-2">
                          <div className="w-full h-1.5 bg-foreground/10 rounded-full overflow-hidden">
                            <div className="h-full bg-foreground" style={{width: `${item.progress}%`}} />
                          </div>
                          <p className="text-[11px] text-foreground/50">{item.progress}% Complete</p>
                          {item.warning && (
                            <div className="flex items-center gap-1 mt-2 text-[11px] text-foreground/60">
                              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                                <circle cx="12" cy="12" r="10" />
                              </svg>
                              Attention needed
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Collaborations Table */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[15px] font-semibold text-foreground">All Collaborations</h3>
                    <button className="text-[13px] text-foreground/60 hover:text-foreground">Edit invitations</button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-[12px]">
                      <thead>
                        <tr className="border-b border-foreground/10 bg-foreground/[0.02]">
                          <th className="text-left font-medium text-foreground/70 px-4 py-3">Creator</th>
                          <th className="text-left font-medium text-foreground/70 px-4 py-3">Product</th>
                          <th className="text-left font-medium text-foreground/70 px-4 py-3">Sent Date</th>
                          <th className="text-left font-medium text-foreground/70 px-4 py-3">Status</th>
                          <th className="text-left font-medium text-foreground/70 px-4 py-3">Engagement</th>
                          <th className="text-left font-medium text-foreground/70 px-4 py-3">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { creator: "Sarah Chen", product: "Blender Beauty 美妆蛋", sent: "12/15/2026", status: "Accepted", engagement: "4.2K views" },
                          { creator: "Emma Davis", product: "Essence精华", sent: "12/10/2026", status: "In Review", engagement: "2.1K views" },
                          { creator: "Lisa Wong", product: "Skincare Pro Kit", sent: "12/08/2026", status: "Sent", engagement: "1.8K views" },
                          { creator: "Maya Patel", product: "Glow Serum", sent: "12/05/2026", status: "Accepted", engagement: "5.6K views" },
                        ].map((item, idx) => (
                          <tr key={idx} className="border-b border-foreground/5 hover:bg-foreground/[0.02]">
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-foreground/15" />
                                <span className="text-foreground">{item.creator}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-foreground/70">{item.product}</td>
                            <td className="px-4 py-3 text-foreground/60">{item.sent}</td>
                            <td className="px-4 py-3">
                              <span className={`text-[11px] font-medium px-2 py-1 rounded-full ${
                                item.status === "Accepted" ? "bg-foreground/10 text-foreground" :
                                item.status === "In Review" ? "bg-foreground/5 text-foreground/60" :
                                "bg-foreground/5 text-foreground/50"
                              }`}>
                                {item.status}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-foreground/60">{item.engagement}</td>
                            <td className="px-4 py-3">
                              <button className="text-foreground/50 hover:text-foreground">
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M13 9l3 3L8 20H4v-4l9-11z" />
                                </svg>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </figure>

          <p className="mt-8 font-sans text-[15px] leading-[1.65] text-pretty text-foreground/80 sm:mt-10 sm:text-[17px]">
            This shifted compliance from a <span className="font-semibold">late-stage warning to proactive guidance</span>, which breaks down complex requirements into clear, timely information and an action sellers could take before reaching the threshold.
          </p>

          <div className="mt-12 h-px bg-foreground/10" />

          <h2 className="mt-12 font-sans text-[clamp(1.125rem,4vw,1.5rem)] font-semibold tracking-tight text-foreground">
            Result
          </h2>

          <h3 className="mt-8 font-sans text-[18px] font-semibold tracking-tight text-foreground/80 sm:mt-10">
            Final design deliverable
          </h3>

          <div className="mt-6 space-y-4 sm:mt-8">
            {[
              "The design for Seller landing, creation to post creation experience",
              "Coverage on every general and edge cases",
              "Updates to existing ecosystem touch points for the new feature"
            ].map((item, idx) => (
              <div key={idx} className="flex gap-4 items-start">
                <svg className="w-6 h-6 mt-1 flex-shrink-0 text-foreground" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
                <p className="font-sans text-[15px] leading-[1.65] text-pretty text-foreground/80 sm:text-[17px]">
                  {item}
                </p>
              </div>
            ))}
          </div>

          <DeliverableScreenshot />

          <h3 className="mt-12 font-sans text-[18px] font-semibold tracking-tight text-foreground/80 sm:mt-16">
            Business Impacts
          </h3>

          <div className="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2 sm:mt-8">
            <div className="rounded-xl border border-foreground/10 bg-foreground/[0.03] p-6">
              <h4 className="font-sans text-[20px] font-bold text-foreground mb-3">
                3× higher match rate
              </h4>
              <p className="font-sans text-[13px] text-foreground/80 leading-[1.65]">
                <span className="font-medium text-foreground/70">(content output)</span>
              </p>
              <p className="font-sans text-[15px] leading-[1.65] text-pretty text-foreground/80 mt-4 sm:text-[16px]">
                Platform-matched collaborations generated 3× more content than manual invites within the first 60 days after launch.
              </p>
            </div>

            <div className="rounded-xl border border-foreground/10 bg-foreground/[0.03] p-6">
              <h4 className="font-sans text-[20px] font-bold text-foreground mb-3">
                89% positive seller sentiment
              </h4>
              <p className="font-sans text-[15px] leading-[1.65] text-pretty text-foreground/80 mt-4 sm:text-[16px]">
                Among 543 surveyed sellers, 89% reported positive results from platform-matched collaborations and found the experience easier to use.
              </p>
            </div>
          </div>
        </section>
      </article>
    );
  }

  return (
    <article className="pb-16 sm:pb-24">
      <div className="reveal mx-auto mt-16 w-full max-w-sm sm:mt-24">
        <span className="flex size-11 items-center justify-center rounded-full bg-foreground/5 text-foreground/70">
          <LockIcon />
        </span>

        <h1 className="mt-5 font-sans text-[clamp(1.375rem,5vw,1.75rem)] font-semibold tracking-tight text-foreground">
          Protected
        </h1>
        <p className="mt-2 font-sans text-[15px] leading-[1.65] text-pretty text-foreground/55">
          These case studies are shared privately. Enter the passcode, or get in
          touch and I&apos;ll send it over.
        </p>

        <form onSubmit={onSubmit} className="mt-6">
          <label
            htmlFor="case-study-passcode"
            className="block font-sans text-[13px] font-medium text-foreground/70"
          >
            Passcode
          </label>
          <input
            id="case-study-passcode"
            name="passcode"
            type="password"
            autoComplete="off"
            autoFocus
            value={value}
            aria-invalid={error || undefined}
            aria-describedby={error ? "case-study-passcode-error" : undefined}
            onChange={(event) => {
              setValue(event.target.value);
              if (error) setError(false);
            }}
            className="mt-2 block h-11 w-full rounded-lg border border-foreground/15 bg-transparent px-3 font-sans text-[15px] text-foreground outline-none transition-colors placeholder:text-foreground/30 focus-visible:border-foreground/40"
          />

          {error ? (
            <p
              id="case-study-passcode-error"
              role="alert"
              className="mt-2 font-sans text-[13px] text-[#E11919]"
            >
              That passcode isn&apos;t right. Try again.
            </p>
          ) : null}

          <button
            type="submit"
            className="mt-4 inline-flex min-h-11 items-center rounded-full border border-foreground/15 bg-foreground px-5 font-sans text-[14px] font-medium text-background transition-opacity hover:opacity-80 active:opacity-70"
          >
            Unlock
          </button>
        </form>
      </div>
    </article>
  );
}
