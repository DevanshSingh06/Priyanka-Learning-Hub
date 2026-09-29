import type { Metadata } from "next";
import { DemoCallout, EmptyState, PageIntro, PublicPage } from "@/components/layout/public-page";

export const metadata: Metadata = { title: "Student Results & Feedback", description: "Student achievements and family feedback from Priyanka Learning Hub, shared only when verified and approved." };

export default function ResultsPage() {
  return <PublicPage>
    <PageIntro eyebrow="Student success" title="Progress, shared with care." description="A space for verified student achievements and feedback shared with permission." />
    <section className="section success-page-section"><div className="container">
      <div className="section-heading"><span className="section-kicker">Student results & feedback</span><h2>Every milestone deserves accuracy.</h2><p>Results and family feedback are shared only with context and permission.</p></div>
      <EmptyState title="No results or testimonials are available yet" message="Please check back for verified student achievements and approved family feedback." />
    </div></section>
    <DemoCallout title="Start your own learning journey" text="Ask about available learning support for Class 9 or Class 10." />
  </PublicPage>;
}