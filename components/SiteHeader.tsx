import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="flex items-center justify-between gap-4 py-6 sm:py-8 md:py-10">
      <Link
        href="/"
        className="min-h-11 font-sans text-[15px] font-medium tracking-tight text-foreground transition-opacity hover:opacity-60 active:opacity-50 inline-flex items-center"
      >
        Xiaoye Lin
      </Link>
      <nav>
        <Link
          href="/about"
          className="inline-flex min-h-11 items-center font-sans text-[15px] font-medium tracking-tight text-foreground transition-opacity hover:opacity-60 active:opacity-50"
        >
          About
        </Link>
      </nav>
    </header>
  );
}
