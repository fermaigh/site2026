"use client";

import { useState, useSyncExternalStore, type FormEvent } from "react";

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

function ConcentrationDiagram() {
  return (
    <div className="rounded-xl border border-foreground/10 bg-foreground/[0.03] p-5 sm:p-8">
      <svg
        viewBox="0 0 1024 480"
        className="w-full"
        style={{ maxWidth: "100%", height: "auto" }}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <style>{`
            .diagram-text { font-family: system-ui, sans-serif; font-size: 13px; font-weight: 600; }
            .diagram-label { font-size: 10px; text-transform: uppercase; letter-spacing: 0.5px; opacity: 0.5; font-weight: 500; }
            .store-icon { fill: none; stroke: rgba(0,0,0,0.15); stroke-width: 1.5; }
            .seller { fill: rgba(0,0,0,0.08); }
            .creator-top { fill: rgba(0,0,0,0.12); }
            .creator-other { fill: rgba(0,0,0,0.05); }
            .connection-line { stroke: rgba(0,0,0,0.1); stroke-width: 2; stroke-dasharray: 4,4; }
          `}</style>
        </defs>

        {/* Sellers Section - Left */}
        <g>
          <text x="80" y="28" className="diagram-label" text-anchor="middle">
            Sellers
          </text>

          {/* 3x3 Grid of stores */}
          {[0, 1, 2].map((row) =>
            [0, 1, 2].map((col) => {
              const x = 20 + col * 80;
              const y = 50 + row * 90;
              return (
                <g key={`seller-${row}-${col}`}>
                  {/* Store box */}
                  <rect x={x} y={y} width="60" height="75" rx="3" className="store-icon" />
                  {/* Door indicator */}
                  <circle cx={x + 20} cy={y + 50} r="8" className="seller" />
                  <circle cx={x + 45} cy={y + 50} r="8" className="seller" />
                </g>
              );
            })
          )}
        </g>

        {/* Center - Flow Diagram */}
        <g>
          {/* Arrow pointing down then right */}
          <line x1="280" y1="100" x2="380" y2="150" className="connection-line" />
          <polygon points="380,150 375,145 378,155" fill="rgba(0,0,0,0.1)" />
        </g>

        {/* Creators Section - Right */}
        <g>
          <text x="700" y="28" className="diagram-label" text-anchor="middle">
            Creators
          </text>

          {/* Top 3 Creators - Highlighted */}
          {[0, 1, 2].map((i) => {
            const x = 580 + i * 90;
            const y = 50;
            return (
              <g key={`creator-top-${i}`}>
                <rect x={x} y={y} width="65" height="65" rx="2" className="store-icon" />
                <circle cx={x + 32.5} cy={y + 32.5} r="14" className="creator-top" />
              </g>
            );
          })}

          {/* Other Creators - 6 in grid */}
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const row = Math.floor(i / 3);
            const col = i % 3;
            const x = 580 + col * 90;
            const y = 140 + row * 90;
            return (
              <g key={`creator-other-${i}`}>
                <rect x={x} y={y} width="65" height="65" rx="2" className="store-icon" opacity="0.5" />
                <circle cx={x + 32.5} cy={y + 32.5} r="12" className="creator-other" />
              </g>
            );
          })}
        </g>

        {/* Right side - 20% indicator */}
        <g>
          <text x="920" y="28" className="diagram-label" text-anchor="middle">
            20% Seen
          </text>
          <circle cx="920" cy="85" r="25" fill="none" stroke="rgba(0,0,0,0.1)" stroke-width="2" />
          <circle cx="920" cy="85" r="18" fill="rgba(0,0,0,0.05)" />
        </g>
      </svg>

      <p className="mt-6 border-t border-foreground/10 pt-4 font-sans text-[13px] text-foreground/55 sm:mt-7">
        Invites pile onto the same three creators — and only{" "}
        <span className="font-semibold text-foreground">20%</span> ever get
        seen.
      </p>
    </div>
  );
}

const RECOMMENDED = [
  {
    name: "Marcus Webb",
    handle: "@webbworks",
    pps: "PPS 4.8/5.0",
    categories: "Sports, Outdoor",
    followers: "874k",
    range: "Male 30%, 25-50",
    revenue: "$45.5K",
    items: "1,323",
    views: "4.3K",
    engagement: "23.8%",
  },
  {
    name: "Kayla Tran",
    handle: "@alignedwithkay",
    pps: "PPS 4.3/5.0",
    categories: "Wellness & Supplements, +2",
    followers: "1.2M",
    range: "Female 70%, 25-50",
    status: "Previously invited",
    tags: ["Women Fashion", "+2"],
    revenue: "$1.24M",
    items: "4,545",
    views: "12K",
    engagement: "46.90%",
  },
  {
    name: "Priya Nair",
    handle: "@priyaglows",
    pps: "PPS 4.9/5.0",
    categories: "Beauty, Fashion",
    followers: "456k",
    range: "Female 56%, 18-24",
    tags: ["Skin Care Pro"],
    revenue: "$10K",
    items: "53.9K",
    views: "4.3K",
    engagement: "12.4%",
  },
  {
    name: "Skincare Pro",
    handle: "@skincarepro",
    pps: "PPS 4.2/5.0",
    categories: "Beauty",
    followers: "320k",
    range: "Female 65%, 18-30",
    revenue: "$8.2K",
    items: "12.4K",
    views: "2.1K",
    engagement: "9.7%",
  },
];

function InviteDrawer() {
  const [selectedTab, setSelectedTab] = useState<"recommended" | "manage">(
    "recommended"
  );

  return (
    <div className="rounded-xl border border-foreground/10 bg-foreground/[0.03] p-5 sm:p-8 overflow-hidden">
      {/* Modal Preview */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-foreground/20">
        {/* Header */}
        <div className="bg-gradient-to-r from-foreground/95 to-foreground/90 px-6 py-4 flex items-center justify-between text-white">
          <h2 className="text-lg font-semibold">Add creators</h2>
          <button className="text-white/70 hover:text-white text-2xl leading-none">×</button>
        </div>

        {/* Tabs and Filter */}
        <div className="px-6 pt-4">
          <div className="flex gap-6 border-b border-foreground/10">
            <button
              onClick={() => setSelectedTab("recommended")}
              className={`pb-3 text-[13px] font-medium transition-colors ${
                selectedTab === "recommended"
                  ? "border-b-2 border-foreground text-foreground"
                  : "text-foreground/50 hover:text-foreground/70"
              }`}
            >
              Recommended creators
            </button>
            <button
              onClick={() => setSelectedTab("manage")}
              className={`pb-3 text-[13px] transition-colors ${
                selectedTab === "manage"
                  ? "border-b-2 border-foreground text-foreground"
                  : "text-foreground/50 hover:text-foreground/70"
              }`}
            >
              Add from Manage creators
            </button>
          </div>

          {selectedTab === "recommended" && (
            <div className="mt-4 flex items-center gap-4 pb-4">
              <label className="text-[12px] text-foreground/60 font-medium">
                Recommendation reasons
              </label>
              <select className="rounded border border-foreground/20 bg-white px-3 py-1 text-[12px] text-foreground">
                <option>All</option>
                <option>High engagement</option>
                <option>Similar audience</option>
              </select>
              <button className="ml-auto text-[12px] text-blue-500 hover:text-blue-600">
                Reset
              </button>
            </div>
          )}
        </div>

        {/* Table */}
        {selectedTab === "recommended" && (
          <div className="overflow-x-auto max-h-96">
            <table className="w-full border-collapse">
              <thead className="bg-foreground/[0.03]">
                <tr>
                  <th className="w-8 px-4 py-3 text-left">
                    <input type="checkbox" />
                  </th>
                  <th className="px-4 py-3 text-left text-[11px] font-medium text-foreground/60">
                    Creators
                  </th>
                  <th className="px-4 py-3 text-center text-[11px] font-medium text-foreground/60">
                    Video
                  </th>
                  <th className="px-4 py-3 text-right text-[11px] font-medium text-foreground/60">
                    Revenue
                  </th>
                  <th className="px-4 py-3 text-right text-[11px] font-medium text-foreground/60">
                    Item sold
                  </th>
                  <th className="px-4 py-3 text-right text-[11px] font-medium text-foreground/60">
                    Ave. video views
                  </th>
                  <th className="px-4 py-3 text-right text-[11px] font-medium text-foreground/60">
                    Engagement rate
                  </th>
                </tr>
              </thead>
              <tbody>
                {RECOMMENDED.map((creator) => (
                  <tr
                    key={creator.handle}
                    className="border-t border-foreground/10 hover:bg-foreground/[0.02]"
                  >
                    <td className="w-8 px-4 py-4">
                      <input type="checkbox" />
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-[13px] font-medium text-foreground">
                            {creator.name}
                          </p>
                          <p className="text-[11px] text-foreground/50">
                            {creator.handle}
                          </p>
                          <p className="text-[10px] text-foreground/50 mt-1">
                            {creator.pps}
                          </p>
                          <p className="text-[11px] text-foreground/60 mt-1">
                            {creator.categories}
                          </p>
                          <p className="text-[10px] text-foreground/40">
                            {creator.followers} • {creator.range}
                          </p>
                          {creator.status && (
                            <p className="text-[10px] text-foreground/50 italic mt-1">
                              {creator.status}
                            </p>
                          )}
                          {creator.tags && (
                            <div className="mt-2 flex flex-wrap gap-1">
                              {creator.tags.map((tag, i) => (
                                <span
                                  key={i}
                                  className="text-[9px] bg-foreground/[0.08] text-foreground/60 px-1.5 py-0.5 rounded"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <div className="w-14 h-10 bg-foreground/10 rounded" />
                    </td>
                    <td className="px-4 py-4 text-right">
                      <p className="text-[12px] text-foreground/80 font-mono">
                        {creator.revenue}
                      </p>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <p className="text-[12px] text-foreground/80 font-mono">
                        {creator.items}
                      </p>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <p className="text-[12px] text-foreground/80 font-mono">
                        {creator.views}
                      </p>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <p className="text-[12px] text-foreground/80 font-mono">
                        {creator.engagement}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Footer */}
        <div className="px-6 py-4 border-t border-foreground/10 bg-foreground/[0.02] flex items-center justify-between">
          <p className="text-[12px] text-foreground/60">0/50 creator selected</p>
          <div className="flex gap-3">
            <button className="px-6 py-2 rounded-full border border-foreground/20 text-[13px] text-foreground/70 hover:bg-foreground/5">
              Cancel
            </button>
            <button className="px-6 py-2 rounded-full bg-cyan-500 text-white text-[13px] font-medium hover:bg-cyan-600">
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
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
            A big part of my work has been designing for &apos;two-sided
            connection&apos; problem. TikTok Shop generates roughly $11.4M in
            daily GMV from seller-creator affiliate collaborations.
          </p>
        </div>

        <div className="reveal reveal-delay-1 mt-12 h-px bg-foreground/10" />

        <section className="reveal reveal-delay-2 mt-12">
          <h2 className="font-sans text-[clamp(1.125rem,4vw,1.5rem)] font-semibold tracking-tight text-foreground">
            Unhealthy matching - Invite concentrated leads less conversion
          </h2>

          <p className="mt-4 font-sans text-[15px] leading-[1.65] text-pretty text-foreground/80 sm:mt-5 sm:text-[17px]">
            Overtime, we are seeing sellers are gravitating to top creators, the
            concentrate attention makes it hard for sellers to find the real
            fit, promotes an unhealthy environment on our platform in long term.
          </p>

          <figure className="mt-8 sm:mt-10">
            <ConcentrationDiagram />
          </figure>

          <p className="mt-6 font-sans text-[15px] leading-[1.65] text-pretty text-foreground/80 sm:mt-8 sm:text-[17px]">
            In today&apos;s product, when our users try to create a
            collaboration invite, they rely on a handful of familiar performance
            metrics to determine who to send to.
          </p>

          <figure className="mt-8 sm:mt-10">
            <InviteDrawer />
          </figure>

          <p className="mt-6 font-sans text-[15px] leading-[1.65] text-pretty text-foreground/80 sm:mt-8 sm:text-[17px]">
            Took a look at other platforms who might have solved the similar
            business problem, and discovered common patterns.
          </p>
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
