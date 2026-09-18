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
            concentrate attention makes it hard for sellers to find the real fit,
            promotes an unhealthy environment on our platform in long term.
          </p>

          <figure className="mt-8 sm:mt-10">
            <div className="aspect-[1750/742] w-full overflow-hidden rounded-xl border border-foreground/10 bg-gradient-to-b from-foreground/[0.05] to-foreground/[0.03] p-12">
              <div className="flex h-full items-center justify-between gap-12">
                <div className="flex-1">
                  <p className="mb-4 font-sans text-sm font-medium text-foreground/60">Sellers</p>
                  <div className="grid grid-cols-3 gap-4">
                    {[...Array(9)].map((_, i) => (
                      <div key={i} className="flex flex-col items-center gap-2">
                        <div className="rounded-lg border-2 border-pink-400/30 bg-gradient-to-br from-pink-100/40 to-pink-50/20 p-3 sm:p-4">
                          <svg className="h-6 w-6 text-pink-600/60 sm:h-8 sm:w-8" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                          </svg>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col items-center gap-3 sm:gap-4">
                  <svg className="h-12 w-12 text-amber-400 sm:h-16 sm:w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>

                <div className="flex-1">
                  <p className="mb-4 font-sans text-sm font-medium text-foreground/60">Top creators</p>
                  <div className="flex flex-col gap-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="rounded-lg border border-amber-300/40 bg-gradient-to-br from-amber-50/60 to-amber-50/20 p-3 sm:p-4">
                          <div className="h-8 w-8 rounded-full bg-amber-300/50 sm:h-10 sm:w-10" />
                        </div>
                        <span className="text-xs font-semibold text-foreground/70 sm:text-sm">@creator</span>
                      </div>
                    ))}
                    <div className="mt-2 text-right">
                      <p className="font-sans text-xs font-semibold text-teal-600 sm:text-sm">20% seen</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </figure>

          <p className="mt-6 font-sans text-[15px] leading-[1.65] text-pretty text-foreground/80 sm:mt-8 sm:text-[17px]">
            In today&apos;s product, when our users try to create a collaboration
            invite, they rely on a handful of familiar performance metrics to
            determine who to send to.
          </p>

          <figure className="mt-8 sm:mt-10">
            <div className="aspect-[1440/960] w-full overflow-hidden rounded-xl border border-foreground/10 bg-foreground/[0.03] p-8">
              <div className="flex h-full flex-col gap-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-sans text-lg font-semibold text-foreground">Add creators</h3>
                  <button className="text-foreground/40 hover:text-foreground/60">✕</button>
                </div>

                <div className="flex gap-4 border-b border-foreground/10 pb-4">
                  <button className="font-sans text-sm font-medium text-foreground">Recommended creators</button>
                  <button className="font-sans text-sm font-medium text-foreground/40 hover:text-foreground/60">Manage creators</button>
                </div>

                <div className="flex-1 overflow-x-auto">
                  <table className="w-full font-sans text-sm">
                    <thead>
                      <tr className="border-b border-foreground/10">
                        <th className="py-3 text-left font-medium text-foreground/60">Creators</th>
                        <th className="py-3 text-right font-medium text-foreground/60">Video</th>
                        <th className="py-3 text-right font-medium text-foreground/60">Revenue</th>
                        <th className="py-3 text-right font-medium text-foreground/60">Items sold</th>
                        <th className="py-3 text-right font-medium text-foreground/60">Avg. video views</th>
                        <th className="py-3 text-right font-medium text-foreground/60">Engagement</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { name: "Marcus Webb", handle: "@sportboosts", revenue: "$45.5k", items: "1,323", views: "$4.3k", engagement: "23.8%" },
                        { name: "Kayla Tran", handle: "@trendthatvibe", revenue: "$124M", items: "4,545", views: "12k", engagement: "46.90%" },
                        { name: "Priya Nair", handle: "@priyaglows", revenue: "$10k", items: "53.9k", views: "$4.3k", engagement: "12.4%" },
                      ].map((creator, i) => (
                        <tr key={i} className="border-b border-foreground/5 hover:bg-foreground/[0.02]">
                          <td className="py-4">
                            <div className="flex items-center gap-3">
                              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-300 to-blue-200" />
                              <div>
                                <p className="font-medium text-foreground">{creator.name}</p>
                                <p className="text-xs text-foreground/50">{creator.handle}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 text-right text-foreground/60">—</td>
                          <td className="py-4 text-right font-medium text-foreground">{creator.revenue}</td>
                          <td className="py-4 text-right text-foreground/60">{creator.items}</td>
                          <td className="py-4 text-right text-foreground/60">{creator.views}</td>
                          <td className="py-4 text-right font-medium text-foreground">{creator.engagement}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button className="rounded-full border border-foreground/15 px-5 py-2 font-sans text-sm font-medium text-foreground hover:bg-foreground/[0.02]">Cancel</button>
                  <button className="rounded-full bg-teal-500 px-5 py-2 font-sans text-sm font-medium text-white hover:bg-teal-600">Add</button>
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
