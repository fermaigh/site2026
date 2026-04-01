export function SiteFooter() {
  return (
    <footer className="border-t border-black/[0.06] py-16 dark:border-white/10">
      <a
        href="mailto:jasonkim1006@gmail.com"
        className="font-sans text-[15px] font-medium text-foreground transition-opacity hover:opacity-60"
      >
        jasonkim1006@gmail.com
      </a>
      <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
        <a
          href="https://www.linkedin.com/in/jasonkimdesign/"
          className="font-sans text-[15px] text-foreground/70 transition-opacity hover:opacity-100"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
        <a
          href="https://www.threads.net/@jasonkim"
          className="font-sans text-[15px] text-foreground/70 transition-opacity hover:opacity-100"
          target="_blank"
          rel="noopener noreferrer"
        >
          Threads
        </a>
        <a
          href="https://www.instagram.com/jasonkim/"
          className="font-sans text-[15px] text-foreground/70 transition-opacity hover:opacity-100"
          target="_blank"
          rel="noopener noreferrer"
        >
          Instagram
        </a>
      </div>
    </footer>
  );
}
