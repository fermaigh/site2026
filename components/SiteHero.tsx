import Image from "next/image";
import { AspectRatio } from "@astryxdesign/core/AspectRatio";
import { Heading } from "@astryxdesign/core/Heading";
import { HStack } from "@astryxdesign/core/HStack";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { LandingTopBar } from "@/components/LandingTopBar";

export function SiteHero() {
  return (
    <header>
      <LandingTopBar />

      <HStack
        gap={4}
        vAlign="start"
        className="reveal reveal-delay-1 pb-8 sm:items-center sm:gap-6 sm:pb-10 md:gap-7 md:pb-12"
      >
        <AspectRatio
          ratio={1}
          shape="ellipse"
          className="size-[75px] shrink-0 bg-muted sm:size-[107px] md:size-32"
        >
          <Image
            src="/avatar.webp"
            alt="Xiaoye Lin"
            fill
            priority
            sizes="(max-width: 640px) 75px, (max-width: 768px) 107px, 128px"
            className="hero-avatar-image"
          />
        </AspectRatio>

        <VStack gap={1} className="min-w-0 flex-1">
          <Heading level={1} textWrap="balance">
            Xiaoye Lin <span className="font-normal">👋</span>
          </Heading>
          <Text
            type="supporting"
            color="secondary"
            display="block"
            className="italic"
          >
            shall-yay
          </Text>
          <Text
            type="body"
            color="secondary"
            display="block"
            textWrap="pretty"
            className="max-w-xl"
          >
            AI native, design thoughtful, strategic and useful&nbsp;products
          </Text>
        </VStack>
      </HStack>
    </header>
  );
}
