import { Button } from "@astryxdesign/core/Button";
import { Heading } from "@astryxdesign/core/Heading";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { PageShell } from "@/components/PageShell";

const highlights = [
  "Designed multiple 0→1 products and scaled core experiences across the TikTok Shop Affiliate ecosystem.",
  "Led end-to-end design for seller, creator, and agency workflows, including AI-powered experiences and managed collaboration services.",
  "Drove cross-functional alignment across product, engineering, research, content design, and business stakeholders to deliver complex, high-impact initiatives.",
  "Delivered measurable business outcomes, including increased adoption, creator engagement, seller collaboration, and GMV growth.",
];

export default function AboutPage() {
  return (
    <PageShell>
      <VStack as="article" gap={8} className="pb-16 sm:pb-24">
        <Heading level={1} className="reveal">
          About
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
            href="/Resume_2026.pdf"
          />
        </VStack>

        <VStack gap={5} className="reveal reveal-delay-3 max-w-2xl sm:mt-2">
          <Heading level={2}>Highlights</Heading>
          <ul className="flex list-disc flex-col gap-4 pl-5 marker:text-secondary">
            {highlights.map((item) => (
              <li key={item} className="ps-1">
                <Text
                  type="large"
                  color="secondary"
                  display="block"
                  textWrap="pretty"
                >
                  {item}
                </Text>
              </li>
            ))}
          </ul>
        </VStack>
      </VStack>
    </PageShell>
  );
}
