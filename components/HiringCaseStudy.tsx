"use client";

import { useState, useSyncExternalStore, type FormEvent } from "react";

const PASSCODE = "0000";
const SESSION_KEY = "hiring-case-study-unlocked";

const subscribeNever = () => () => {};

function readSession() {
  try {
    return sessionStorage.getItem(SESSION_KEY) === "1";
  } catch {
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

export function HiringCaseStudy() {
  const isUnlocked = useSyncExternalStore(subscribeNever, readSession);
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (value === PASSCODE) {
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        // Private mode or blocked storage
      }
      setValue("");
      // Rerender by triggering a state change
      window.location.reload();
    } else {
      setError(true);
      setValue("");
    }
  }

  if (isUnlocked) {
    return (
      <article className="pb-16 sm:pb-24">
        <header className="reveal">
          <h1 className="font-sans text-[clamp(1.75rem,6vw,2.75rem)] font-semibold leading-[1.1] tracking-tight text-foreground">
            Transfer stealth enterprise to self-service market-ready
          </h1>
          <p className="mt-6 font-sans text-[15px] leading-[1.65] text-pretty text-foreground/80 sm:text-[17px]">
            Work with stakeholders to navigate through ambiguity to clear solution.
          </p>
        </header>

        <div className="mt-12 space-y-10 border-t border-foreground/10 pt-10 sm:mt-16 sm:space-y-14 sm:pt-14 md:mt-20 md:pt-16">
          <section className="reveal">
            <h2 className="font-sans text-[clamp(1.125rem,4vw,1.5rem)] font-semibold tracking-tight text-foreground">
              Context
            </h2>
            <p className="mt-4 font-sans text-[15px] leading-[1.65] text-pretty text-foreground/80 sm:mt-6 sm:text-[17px]">
              Sprockets has launched their MVP that used by internal customer success team to help franchise business (fast food / gas stations) source hourly works and hire better for them, the core technology behind it is an AI analysis on candidates answers from an online assessment. The company faced a bottleneck to continue grow, they planned to refresh the MVP products for more self-serviced within the same target market. I joined the team to see how self-serviced should be fleshed out and still maintain its core value of mvp.
            </p>

            <div className="grid grid-cols-1 gap-6 mt-8 sm:mt-10 sm:grid-cols-2">
              <figure className="rounded-xl border border-foreground/10 bg-foreground/[0.03] p-6 overflow-hidden">
                <div className="flex flex-col items-center justify-center py-12">
                  <h3 className="font-sans text-[16px] font-semibold text-foreground mb-8">
                    Sourcing and filtering
                  </h3>
                  <div className="w-full aspect-video flex items-center justify-center bg-foreground/5 rounded-lg">
                    <img
                      src="https://www.figma.com/api/mcp/asset/95eeec98-a249-4ec3-a55b-6dcd5ee49443/2be08.svg"
                      alt="Sourcing and filtering illustration showing candidate filtering interface"
                      className="w-full h-auto max-w-xs"
                    />
                  </div>
                </div>
              </figure>

              <figure className="rounded-xl border border-foreground/10 bg-foreground/[0.03] p-6 overflow-hidden">
                <div className="flex flex-col items-center justify-center py-12">
                  <h3 className="font-sans text-[16px] font-semibold text-foreground mb-8">
                    Job application
                  </h3>
                  <div className="w-full aspect-video flex items-center justify-center bg-foreground/5 rounded-lg">
                    <img
                      src="https://www.figma.com/api/mcp/asset/f55d7c46-19e4-451d-9e8e-62ae0b37ce1b/6f59c.svg"
                      alt="Job application illustration showing candidate profile and application status"
                      className="w-full h-auto max-w-xs"
                    />
                  </div>
                </div>
              </figure>
            </div>
          </section>
        </div>
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
            htmlFor="hiring-case-study-passcode"
            className="block font-sans text-[13px] font-medium text-foreground/70"
          >
            Passcode
          </label>
          <input
            id="hiring-case-study-passcode"
            name="passcode"
            type="password"
            autoComplete="off"
            autoFocus
            value={value}
            aria-invalid={error || undefined}
            aria-describedby={error ? "hiring-case-study-passcode-error" : undefined}
            onChange={(event) => {
              setValue(event.currentTarget.value);
              if (error) setError(false);
            }}
            className="mt-2 block h-11 w-full rounded-lg border border-foreground/15 bg-transparent px-3 font-sans text-[15px] text-foreground outline-none transition-colors placeholder:text-foreground/30 focus-visible:border-foreground/40"
          />

          {error ? (
            <p
              id="hiring-case-study-passcode-error"
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
