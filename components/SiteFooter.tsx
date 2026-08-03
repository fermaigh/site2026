export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-black/[0.06] py-10 sm:py-12 md:py-14">
      <p className="w-full font-sans text-[13px] leading-relaxed text-pretty text-foreground/70 sm:text-[15px]">
        Designed by Xiaoye Lin, made with Cursor, hosted on Github, deployed on
        Vercel.
      </p>
      <p className="mt-3 font-sans text-[12px] text-foreground/40 sm:mt-4 sm:text-[13px]">
        © {year} Xiaoye Lin
      </p>
    </footer>
  );
}
