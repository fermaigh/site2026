import Image from "next/image";
import { LocalTime } from "@/components/LocalTime";

export function LandingTopBar() {
  return (
    <div className="reveal flex items-center justify-between gap-4 pb-6 pt-6 sm:pb-8 sm:pt-10 md:pb-10 md:pt-14">
      <Image
        src="/site-icon.png"
        alt="Xiaoye Lin"
        width={24}
        height={24}
        priority
        className="size-6 rounded-full"
      />
      <LocalTime />
    </div>
  );
}
