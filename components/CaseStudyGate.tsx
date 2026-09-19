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
          </figure>

          <div className="mt-12 h-px bg-foreground/10" />

          <h3 className="mt-6 font-sans text-[clamp(1rem,4vw,1.25rem)] font-semibold tracking-tight text-foreground">
            Shaping the Product Direction
          </h3>
          <p className="mt-4 font-sans text-[15px] leading-[1.65] text-pretty text-foreground/80 sm:mt-5 sm:text-[17px]">
            I explored patterns across other platforms and brought two directions to the team: structured inputs that guide decisions, and a more open-ended approach that gives sellers greater control.
          </p>

          <div className="grid grid-cols-1 gap-6 mt-8 sm:grid-cols-2 sm:mt-10">
            {/* Left View - Creator Demographics Filter */}
            <figure className="rounded-xl border border-foreground/10 bg-foreground/[0.03] p-6 overflow-hidden">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-sans text-[15px] font-semibold text-foreground">
                      Creator demographics
                    </h3>
                    <p className="text-[13px] text-foreground/60 mt-1">
                      Choose the preference
                    </p>
                  </div>
                  <button className="text-foreground/40 hover:text-foreground/60">
                    ↑
                  </button>
                </div>

                <div className="space-y-5 border-b border-foreground/10 pb-5">
                  <div>
                    <p className="text-[13px] font-medium text-foreground mb-2">
                      Creator gender
                    </p>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4" />
                        <span className="text-[13px] text-foreground/70">Female</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4" />
                        <span className="text-[13px] text-foreground/70">Male</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <p className="text-[13px] font-medium text-foreground mb-2">
                      Creator age
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {["18-24", "25-34", "35-44", "45-54", "55+"].map((age) => (
                        <label key={age} className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" className="w-4 h-4" />
                          <span className="text-[12px] text-foreground/70">{age}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-[13px] font-medium text-foreground mb-2 block">
                      Category
                    </label>
                    <select className="w-full px-3 py-2 border border-foreground/15 rounded text-[13px] text-foreground/70 bg-transparent">
                      <option>Select category</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[13px] font-medium text-foreground mb-2 block">
                      Creator language
                    </label>
                    <select className="w-full px-3 py-2 border border-foreground/15 rounded text-[13px] text-foreground/70 bg-transparent">
                      <option>Select language</option>
                    </select>
                  </div>

                  <label className="flex items-start gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 mt-0.5" />
                    <div>
                      <p className="text-[12px] font-medium text-foreground">
                        Not invited in past 90 days
                      </p>
                      <p className="text-[11px] text-foreground/50">
                        Creators who are in active collaboration even if were invited 90 days ago will excluded
                      </p>
                    </div>
                  </label>
                </div>

                <div className="mt-5 space-y-3">
                  {["Follower demographics", "Performance", "Other"].map((section) => (
                    <button
                      key={section}
                      className="w-full flex items-center justify-between px-4 py-3 border border-foreground/10 rounded text-[13px] font-medium text-foreground hover:bg-foreground/[0.02]"
                    >
                      {section}
                      <span className="text-foreground/40">↓</span>
                    </button>
                  ))}
                </div>
              </div>
            </figure>

            {/* Right View - Describe Preferred Creators */}
            <figure className="rounded-xl border border-foreground/10 bg-foreground/[0.03] p-6 overflow-hidden">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div>
                  <h3 className="font-sans text-[15px] font-semibold text-foreground">
                    Describe preferred creators
                  </h3>
                  <p className="text-[13px] text-foreground/60 mt-1">
                    Explain creator demographics, sales performance, content style and etc.
                  </p>
                </div>

                <textarea
                  placeholder="Type here..."
                  maxLength={500}
                  className="w-full mt-4 p-3 border border-cyan-500 rounded text-[13px] text-foreground placeholder:text-foreground/30 resize-none h-48 focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-500"
                />

                <div className="flex justify-end mt-2">
                  <span className="text-[12px] text-foreground/50">0/500</span>
                </div>
              </div>
            </figure>
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
            At platform scale, I often balance user value with platform compliance: Simplifying complex requirements while ensuring the experience remains clear, trustworthy, and sustainable for everyone in the ecosystem.
          </p>

          <p className="mt-4 font-sans text-[15px] leading-[1.65] text-pretty text-foreground/80 sm:text-[17px]">
            In this case, the compliance design had to satisfy was: <span className="font-semibold text-foreground">If sellers repeatedly rejected sample requests, the system could keep recruiting more creators until the requirements (The seller desired time and sample allowance) were reached. This could lead to creator spam and undermine the intent of the matching experience.</span>
          </p>

          <p className="mt-4 font-sans text-[15px] leading-[1.65] text-pretty text-foreground/80 sm:text-[17px]">
            The legal and product team suggested to inform sellers if any of their existing collaboration are about to exceed a certain number.
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
