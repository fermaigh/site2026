import { VStack } from "@astryxdesign/core/VStack";
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
    <VStack
      width="100%"
      minHeight="100%"
      paddingInline={4}
      className="flex-1 bg-body pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[env(safe-area-inset-top)] sm:px-6 md:px-10 lg:px-16"
    >
      <VStack width="100%" maxWidth={1080} className="mx-auto flex-1">
        {showHeader ? <SiteHeader /> : null}
        {children}
        {showFooter ? <SiteFooter /> : null}
      </VStack>
    </VStack>
  );
}
