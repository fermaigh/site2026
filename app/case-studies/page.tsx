import type { Metadata } from "next";
import { CaseStudyGate } from "@/components/CaseStudyGate";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Case studies — Xiaoye Lin",
  // Gated work should not turn up in search results or link previews.
  robots: { index: false, follow: false },
};

export default function CaseStudiesPage() {
  return (
    <PageShell>
      <CaseStudyGate />
    </PageShell>
  );
}
