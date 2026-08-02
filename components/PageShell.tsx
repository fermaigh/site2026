import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export function PageShell({
  children,
  showHeader = true,
  showFooter = true,
}: {
  children: React.ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
}) {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-[#f7f7f7] px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[env(safe-area-inset-top)] sm:px-6 md:px-10 lg:px-16">
      <div className="mx-auto w-full max-w-[1080px] flex-1">
        {showHeader ? <SiteHeader /> : null}
        {children}
        {showFooter ? <SiteFooter /> : null}
      </div>
    </div>
  );
}
