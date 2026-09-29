import type { Metadata } from "next";
import { DemoCallout, PageIntro, PublicPage } from "@/components/layout/public-page";
import { NotesExplorer } from "@/components/public/resource-explorers";

export const metadata: Metadata = { title: "Notes Corner", description: "Search the Priyanka Learning Hub notes corner for Class 9 and Class 10 study resources." };

export default function NotesPage() {
  return <PublicPage>
    <PageIntro eyebrow="Notes corner" title="Find your next useful resource." description="Browse study resources by class, subject, or chapter." />
    <section className="section resource-page-section"><div className="container"><NotesExplorer /></div></section>
    <DemoCallout title="Need a different resource?" text="Tell us what topic or class material you are looking for." />
  </PublicPage>;
}