export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-black/[0.06] py-10 sm:py-12 md:py-14">
      <p className="max-w-xl font-sans text-[13px] leading-relaxed text-foreground/70 sm:text-[15px]">
        Made with Cursor, hosted on Github, Deployed on Vercel and Designed with
        Xiaoye Lin.
      </p>
      <p className="mt-3 font-sans text-[12px] text-foreground/40 sm:mt-4 sm:text-[13px]">
        © {year} Xiaoye Lin
      </p>
    </footer>
  );
}
