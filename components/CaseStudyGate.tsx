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

/** Relative invite volume per creator — the point is the cliff after the top three. */
const INVITE_SHARE = [92, 78, 64, 8, 6, 5, 4, 3, 3];

function ConcentrationDiagram() {
  return (
    <div className="rounded-xl border border-foreground/10 bg-foreground/[0.03] p-5 sm:p-8">
      <div className="flex flex-col gap-7 sm:flex-row sm:items-center sm:gap-8">
        <div className="sm:flex-1">
          <p className="font-mono text-[11px] uppercase tracking-wider text-foreground/45">
            Sellers
          </p>
          <div className="mt-3 grid grid-cols-6 gap-1.5 sm:gap-2">
            {Array.from({ length: 24 }, (_, i) => (
              <span
                key={i}
                className="aspect-square rounded-[5px] border border-foreground/15 bg-foreground/[0.07]"
              />
            ))}
          </div>
        </div>

        <div
          className="flex items-center justify-center gap-2 text-foreground/35 sm:w-28 sm:flex-col"
          aria-hidden
        >
          <span className="h-px flex-1 bg-current sm:h-10 sm:w-px sm:flex-none" />
          <span className="font-mono text-[10px] uppercase tracking-wider whitespace-nowrap">
            invites
          </span>
          <span className="h-px flex-1 bg-current sm:h-10 sm:w-px sm:flex-none" />
        </div>

        <div className="sm:flex-1">
          <p className="font-mono text-[11px] uppercase tracking-wider text-foreground/45">
            Creators
          </p>
          <div className="mt-3 flex flex-col gap-1.5">
            {INVITE_SHARE.map((share, i) => (
              <div key={i} className="flex items-center gap-2">
                <span
                  className={`size-5 shrink-0 rounded-full ${
                    i < 3 ? "bg-foreground/80" : "bg-foreground/10"
                  }`}
                />
                <span className="h-2 flex-1 overflow-hidden rounded-full bg-foreground/[0.06]">
                  <span
                    className={`block h-full rounded-full ${
                      i < 3 ? "bg-foreground/80" : "bg-foreground/15"
                    }`}
                    style={{ width: `${share}%` }}
                  />
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

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
    revenue: "$45.5K",
    items: "1,323",
    views: "4.3K",
    engagement: "23.8%",
  },
  {
    name: "Kayla Tran",
    handle: "@alignedwithkay",
    revenue: "$1.24M",
    items: "4,545",
    views: "12K",
    engagement: "46.90%",
  },
  {
    name: "Priya Nair",
    handle: "@priyaglows",
    revenue: "$10K",
    items: "53.9K",
    views: "4.3K",
    engagement: "12.4%",
  },
  {
    name: "Skincare Pro",
    handle: "@skincarepro",
    revenue: "$8.2K",
    items: "12.4K",
    views: "2.1K",
    engagement: "9.7%",
  },
];

const METRIC_COLUMNS = [
  "Revenue",
  "Items sold",
  "Avg. video views",
  "Engagement rate",
] as const;

function InviteDrawer() {
  return (
    <div className="rounded-xl border border-foreground/10 bg-foreground/[0.03] p-4 sm:p-6">
      <div className="flex items-baseline justify-between">
        <p className="font-sans text-[15px] font-semibold text-foreground">
          Add creators
        </p>
        <span className="font-mono text-[11px] text-foreground/40">
          0/50 selected
        </span>
      </div>

      <div className="mt-4 flex gap-5 border-b border-foreground/10">
        <span className="-mb-px border-b-2 border-foreground pb-2 font-sans text-[13px] font-medium text-foreground">
          Recommended creators
        </span>
        <span className="pb-2 font-sans text-[13px] text-foreground/40">
          Manage creators
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="mt-1 w-full min-w-[640px] border-collapse text-left">
          <thead>
            <tr>
              <th className="py-3 pr-4 font-sans text-[11px] font-medium text-foreground/45">
                Creator
              </th>
              {METRIC_COLUMNS.map((column) => (
                <th
                  key={column}
                  className="py-3 pl-4 text-right font-sans text-[11px] font-medium text-foreground/45"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {RECOMMENDED.map((creator) => (
              <tr
                key={creator.handle}
                className="border-t border-foreground/[0.07]"
              >
                <td className="py-3 pr-4">
                  <span className="flex items-center gap-2.5">
                    <span className="size-7 shrink-0 rounded-full bg-foreground/10" />
                    <span className="flex flex-col">
                      <span className="font-sans text-[13px] font-medium text-foreground">
                        {creator.name}
                      </span>
                      <span className="font-mono text-[11px] text-foreground/45">
                        {creator.handle}
                      </span>
                    </span>
                  </span>
                </td>
                <td className="py-3 pl-4 text-right font-mono text-[12px] text-foreground/75">
                  {creator.revenue}
                </td>
                <td className="py-3 pl-4 text-right font-mono text-[12px] text-foreground/75">
                  {creator.items}
                </td>
                <td className="py-3 pl-4 text-right font-mono text-[12px] text-foreground/75">
                  {creator.views}
                </td>
                <td className="py-3 pl-4 text-right font-mono text-[12px] text-foreground/75">
                  {creator.engagement}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-5 flex justify-end gap-2.5 border-t border-foreground/10 pt-4">
        <span className="rounded-full border border-foreground/15 px-4 py-1.5 font-sans text-[13px] text-foreground/70">
          Cancel
        </span>
        <span className="rounded-full bg-foreground px-4 py-1.5 font-sans text-[13px] font-medium text-background">
          Add
        </span>
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
