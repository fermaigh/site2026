"use client";

import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { CaseStudyGate } from "@/components/CaseStudyGate";
import { HiringCaseStudy } from "@/components/HiringCaseStudy";

export default function CaseStudyPage() {
  const params = useParams();
  const slug = params.slug as string;

  if (slug === "scaling-tiktok-shop-affiliates") {
    return (
      <PageShell>
        <CaseStudyGate />
      </PageShell>
    );
  }

  if (slug === "ai-powered-hiring-platform") {
    return (
      <PageShell>
        <HiringCaseStudy />
      </PageShell>
    );
  }

  notFound();
}
