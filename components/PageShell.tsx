import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-full flex-1 flex-col px-5 md:px-8">
      <div className="mx-auto w-full max-w-[720px] flex-1">
        <SiteHeader />
        {children}
        <SiteFooter />
      </div>
    </div>
  );
}
