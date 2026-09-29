import type { Metadata } from "next";
import { DemoCallout, PageIntro, PublicPage } from "@/components/layout/public-page";
import { GalleryGrid } from "@/components/public/gallery-grid";

export const metadata: Metadata = { title: "Gallery", description: "A gallery of classes, events, activities, and achievements from Priyanka Learning Hub." };

export default function GalleryPage() {
  return <PublicPage>
    <PageIntro eyebrow="Gallery" title="A place for learning moments." description="Explore photos from classes, events, activities, and achievements." />
    <section className="section gallery-page-section"><div className="container"><GalleryGrid /></div></section>
    <DemoCallout title="Be part of the learning community" text="Explore classes and ask us about upcoming learning opportunities." />
  </PublicPage>;
}