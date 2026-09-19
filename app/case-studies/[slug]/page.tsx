"use client";

import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { CaseStudyGate } from "@/components/CaseStudyGate";
import { HiringCaseStudy } from "@/components/HiringCaseStudy";

export default function CaseStudyPage() {
  const params = useParams();
  const slug = params.slug as string;

  if (slug === "tiktok-shop-affiliate") {
    return (
      <PageShell>
        <CaseStudyGate />
      </PageShell>
    );
  }

  if (slug === "hiring-app") {
    return (
      <PageShell>
        <HiringCaseStudy />
      </PageShell>
    );
  }

  notFound();
}
