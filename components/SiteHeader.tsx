import { TransitionLink } from "@/components/TransitionLink";
import { HoverBackArrow } from "@/components/HoverBackArrow";

const LINKEDIN_URL = "https://www.linkedin.com/in/xiaoyelin/";
const EMAIL_HREF = "mailto:fermaigh@gmail.com";

export function SiteHeader({ backHref = "/" }: { backHref?: string }) {
  return (
    <header className="flex w-full items-center justify-between gap-4 py-5 sm:py-6 md:py-7">
      <TransitionLink
        href={backHref}
        className="group inline-flex min-h-11 items-center gap-1.5 font-sans text-[15px] font-medium tracking-tight text-foreground transition-opacity hover:opacity-70 active:opacity-60"
      >
        <HoverBackArrow />
        <span>Back</span>
      </TransitionLink>

      <nav className="flex items-center gap-4 sm:gap-6 md:gap-8">
        <TransitionLink
          href="/about"
          className="inline-flex min-h-11 items-center font-sans text-[14px] tracking-tight text-foreground transition-opacity hover:opacity-60 active:opacity-50 sm:text-[15px]"
        >
          About me
        </TransitionLink>
        <a
          href={EMAIL_HREF}
          className="inline-flex min-h-11 items-center font-sans text-[14px] tracking-tight text-foreground transition-opacity hover:opacity-60 active:opacity-50 sm:text-[15px]"
        >
          Email me
        </a>
        <a
          href={LINKEDIN_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="inline-flex min-h-11 items-center justify-center text-foreground transition-opacity hover:opacity-60 active:opacity-50"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden
          >
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.06-2.065 2.064 2.064 0 112.06 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </a>
      </nav>
    </header>
  );
}
