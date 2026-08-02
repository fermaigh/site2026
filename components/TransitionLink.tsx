"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  startTransition,
  type ComponentProps,
  type MouseEvent,
} from "react";

type TransitionLinkProps = ComponentProps<typeof Link>;

function hrefToString(href: TransitionLinkProps["href"]): string | null {
  if (typeof href === "string") return href;
  if (href && typeof href === "object" && typeof href.pathname === "string") {
    return href.pathname;
  }
  return null;
}

function shouldHandleTransition(event: MouseEvent<HTMLAnchorElement>) {
  if (event.defaultPrevented) return false;
  if (event.button !== 0) return false;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
    return false;
  }
  return true;
}

export function TransitionLink({
  href,
  onClick,
  replace,
  ...props
}: TransitionLinkProps) {
  const router = useRouter();

  return (
    <Link
      href={href}
      onClick={(event) => {
        onClick?.(event);
        if (!shouldHandleTransition(event)) return;

        const nextHref = hrefToString(href);
        if (!nextHref?.startsWith("/") || nextHref.startsWith("//")) return;

        const current = `${window.location.pathname}${window.location.search}`;
        if (nextHref === current || nextHref === window.location.pathname) {
          event.preventDefault();
          return;
        }

        event.preventDefault();

        const navigate = () => {
          startTransition(() => {
            if (replace) router.replace(nextHref);
            else router.push(nextHref);
          });
        };

        if (typeof document !== "undefined" && "startViewTransition" in document) {
          document.startViewTransition(navigate);
          return;
        }

        navigate();
      }}
      replace={replace}
      {...props}
    />
  );
}
