import type { Metadata } from "next";
import Image from "next/image";
import { DemoCallout, EmptyState, PageIntro, PublicPage } from "@/components/layout/public-page";
import { results } from "@/lib/data/public-content";

export const metadata: Metadata = { title: "Student Results & Feedback", description: "Student achievements and family feedback from Priyanka Learning Hub, shared only when verified and approved." };

export default function ResultsPage() {
  return <PublicPage>
    <PageIntro eyebrow="Student success" title="Progress, shared with care." description="A space for verified student achievements and feedback shared with permission." />
    <section className="section success-page-section"><div className="container">
      <div className="section-heading"><span className="section-kicker">Student results & feedback</span><h2>Every milestone deserves accuracy.</h2><p>Results and family feedback are shared only with context and permission.</p></div>
      {results.length > 0 ? <div className="results-grid">
        {results.map((result) => <article className="result-card" key={result.id}>
          <div className="result-photo">
            <Image src={result.photo} alt={result.alt} fill sizes="(max-width: 620px) calc(100vw - 36px), (max-width: 1160px) 50vw, 560px" />
          </div>
          <div className="result-card-body">
            <h3>{result.studentName}</h3>
            <p className="result-card-class">Class {result.className.replace(/th$/, "")} · {result.board}</p>
            <p className="result-card-type">{result.resultType}</p>
            <dl className="result-card-marks">
              <div><dt>Maths</dt><dd>{result.maths}</dd></div>
              <div><dt>SST</dt><dd>{result.sst}</dd></div>
            </dl>
          </div>
        </article>)}
      </div> : <EmptyState title="No results or testimonials are available yet" message="Please check back for verified student achievements and approved family feedback." />}
    </div></section>
    <DemoCallout title="Start your own learning journey" text="Ask about available learning support for Class 9 or Class 10." />
  </PublicPage>;
}