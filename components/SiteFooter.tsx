export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-black/[0.06] py-14">
      <p className="max-w-xl font-sans text-[15px] leading-relaxed text-foreground/70">
        Made with Cursor, hosted on Github, Deployed on Vercel and Designed with
        Xiaoye Lin.
      </p>
      <p className="mt-4 font-sans text-[13px] text-foreground/40">
        © {year} Xiaoye Lin
      </p>
    </footer>
  );
}
