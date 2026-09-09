import Image from "next/image";
import { HStack } from "@astryxdesign/core/HStack";
import { LocalTime } from "@/components/LocalTime";

export function LandingTopBar() {
  return (
    <HStack
      hAlign="between"
      vAlign="center"
      gap={4}
      className="reveal pb-6 pt-6 sm:pb-8 sm:pt-10 md:pb-10 md:pt-14"
    >
      <Image
        src="/site-icon.png"
        alt="Xiaoye Lin"
        width={24}
        height={24}
        priority
        className="block size-6 rounded-full"
      />
      <LocalTime />
    </HStack>
  );
}
