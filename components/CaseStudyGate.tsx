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
            <div className="aspect-[1750/742] w-full overflow-hidden rounded-xl border border-foreground/10 bg-foreground/[0.03]" />
          </figure>

          <p className="mt-6 font-sans text-[15px] leading-[1.65] text-pretty text-foreground/80 sm:mt-8 sm:text-[17px]">
            In today's product, when our users try to create a collaboration
            invite, they rely on a handful of familiar performance metrics to
            determine who to send to while creating an invite.
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
