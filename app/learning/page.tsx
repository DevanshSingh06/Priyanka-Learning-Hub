import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { DemoCallout, PageIntro, PublicPage } from "@/components/layout/public-page";
import { LearningExplorer } from "@/components/public/resource-explorers";
import { siteConfig } from "@/lib/config/site";

export const metadata: Metadata = { title: "Free Learning", description: "Watch free learning lessons from Priyanka Learning Hub on YouTube. Class 9 and Class 10 Mathematics and Social Science support." };

export default function LearningPage() {
  return <PublicPage>
    <PageIntro eyebrow="Free learning" title="Small lessons. Stronger understanding." description="Explore learning videos for Class 9 and Class 10." />
    {siteConfig.youtubeUrl && <div className="channel-link-wrap"><a className="text-link" href={siteConfig.youtubeUrl} target="_blank" rel="noreferrer">Visit the YouTube channel <ArrowRight size={15} /></a></div>}
    <section className="section resource-page-section"><div className="container"><LearningExplorer /></div></section>
    <DemoCallout title="Want guided learning?" text="Explore the class options or request a free demo conversation." />
  </PublicPage>;
}