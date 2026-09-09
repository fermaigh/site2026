import { Button } from "@astryxdesign/core/Button";
import { Heading } from "@astryxdesign/core/Heading";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { PageShell } from "@/components/PageShell";

export default function AboutPage() {
  return (
    <PageShell>
      <VStack as="article" gap={8} className="pb-16 sm:pb-24">
        <Heading level={1} className="reveal">
          about me
        </Heading>

        <Text
          type="large"
          color="secondary"
          display="block"
          textWrap="pretty"
          className="reveal reveal-delay-1 max-w-2xl"
        >
          I&apos;ve been designing products for one of the world&apos;s largest
          creator commerce platforms. I lead the design of complex B2B
          experiences that enable sellers, creators, and agencies to collaborate
          more effectively, from campaign tools and management to AI-powered
          seller tools. My work combines systems thinking, product strategy, and
          execution to ship scalable solutions that improve user adoption,
          operational efficiency, and business growth across global&nbsp;markets.
        </Text>

        <VStack className="reveal reveal-delay-2">
          <Button
            label="Download resume"
            variant="primary"
            href="/Resume_XiaoyeLin.pdf"
          />
        </VStack>
      </VStack>
    </PageShell>
  );
}
