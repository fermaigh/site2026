import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="flex items-center justify-between py-8 md:py-10">
      <Link
        href="/"
        className="font-sans text-[15px] font-medium tracking-tight text-foreground transition-opacity hover:opacity-60"
      >
        jason kim
      </Link>
      <nav>
        <Link
          href="/about"
          className="font-sans text-[15px] font-medium tracking-tight text-foreground transition-opacity hover:opacity-60"
        >
          About
        </Link>
      </nav>
    </header>
  );
}
