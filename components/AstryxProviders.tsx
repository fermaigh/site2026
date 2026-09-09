"use client";

import type { ComponentProps, ReactNode } from "react";
import { Theme } from "@astryxdesign/core/theme";
import { LinkProvider } from "@astryxdesign/core/Link";
import { neutralTheme } from "@astryxdesign/theme-neutral/built";
import { TransitionLink } from "@/components/TransitionLink";

type LinkLikeProps = ComponentProps<typeof TransitionLink> & {
  href?: string;
};

/**
 * Routes Astryx links through TransitionLink for same-origin navigations,
 * and a plain anchor for mailto/external URLs.
 */
function AstryxAppLink({ href = "", children, ...props }: LinkLikeProps) {
  const isAppRoute =
    typeof href === "string" &&
    href.startsWith("/") &&
    !href.startsWith("//");

  if (!isAppRoute) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  }

  return (
    <TransitionLink href={href} {...props}>
      {children}
    </TransitionLink>
  );
}

export function AstryxProviders({ children }: { children: ReactNode }) {
  return (
    <Theme theme={neutralTheme} mode="light">
      <LinkProvider component={AstryxAppLink}>{children}</LinkProvider>
    </Theme>
  );
}
