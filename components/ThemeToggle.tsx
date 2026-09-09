"use client";

import { useTheme } from "@/components/ThemeProvider";

export function ThemeToggle() {
  const { resolved, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={
        resolved === "dark" ? "Switch to light mode" : "Switch to dark mode"
      }
      className="inline-flex size-7 shrink-0 items-center justify-center rounded-sm text-[18px] leading-none text-foreground/40 transition-opacity hover:opacity-70 active:opacity-60 sm:size-8 sm:text-[20px]"
    >
      <span aria-hidden className="-translate-y-px">
        ◐
      </span>
    </button>
  );
}
