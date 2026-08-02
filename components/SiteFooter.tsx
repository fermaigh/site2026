import { Divider } from "@astryxdesign/core/Divider";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <VStack as="footer" gap={3} width="100%" className="py-10 sm:py-12 md:py-14">
      <Divider />
      <Text
        type="supporting"
        color="secondary"
        display="block"
        textWrap="pretty"
      >
        Made with Cursor, hosted on Github, Deployed on Vercel and Designed
        with&nbsp;Xiaoye&nbsp;Lin.
      </Text>
      <Text type="supporting" size="sm" color="secondary" display="block">
        © {year} Xiaoye&nbsp;Lin
      </Text>
    </VStack>
  );
}
