function FooterBrandIcon({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="mx-0.5 inline-flex size-[1.05em] shrink-0 items-center justify-center align-[-0.15em] text-foreground/40"
      aria-hidden
    >
      {children}
    </span>
  );
}

function CursorIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-full">
      <path d="M4 3.5 19.5 12 12.8 13.7 10.2 20.5 4 3.5Z" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-full">
      <path d="M12 2C6.477 2 2 6.584 2 12.253c0 4.537 2.865 8.385 6.839 9.745.5.094.682-.222.682-.493 0-.243-.009-.888-.014-1.743-2.782.62-3.369-1.376-3.369-1.376-.454-1.186-1.11-1.502-1.11-1.502-.908-.638.069-.625.069-.625 1.004.072 1.532 1.06 1.532 1.06.892 1.57 2.341 1.116 2.91.854.091-.664.35-1.116.636-1.372-2.22-.26-4.555-1.14-4.555-5.077 0-1.122.39-2.04 1.029-2.76-.103-.26-.446-1.308.098-2.725 0 0 .84-.276 2.75 1.054A9.3 9.3 0 0 1 12 7.043c.85.004 1.705.118 2.504.346 1.909-1.33 2.747-1.054 2.747-1.054.546 1.417.203 2.465.1 2.725.64.72 1.028 1.638 1.028 2.76 0 3.947-2.338 4.814-4.566 5.067.36.319.68.947.68 1.91 0 1.378-.012 2.488-.012 2.826 0 .273.18.592.688.491C19.138 20.634 22 16.788 22 12.253 22 6.584 17.523 2 12 2Z" />
    </svg>
  );
}

function VercelIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-full">
      <path d="M12 3.5 22 20.5H2L12 3.5Z" />
    </svg>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-foreground/10 py-10 sm:py-12 md:py-14">
      <p className="w-full font-sans text-[13px] leading-relaxed text-pretty text-foreground/70 sm:text-[15px]">
        Designed by Xiaoye Lin, made with
        <FooterBrandIcon>
          <CursorIcon />
        </FooterBrandIcon>
        Cursor, hosted on
        <FooterBrandIcon>
          <GithubIcon />
        </FooterBrandIcon>
        Github, deployed on
        <FooterBrandIcon>
          <VercelIcon />
        </FooterBrandIcon>
        Vercel.
      </p>
      <p className="mt-3 font-sans text-[12px] text-foreground/40 sm:mt-4 sm:text-[13px]">
        © {year} Xiaoye Lin
      </p>
    </footer>
  );
}
