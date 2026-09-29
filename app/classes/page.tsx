import type { Metadata } from "next";
import { ArrowRight, MapPin, Monitor, School } from "lucide-react";
import { DemoCallout, PageIntro, PublicPage } from "@/components/layout/public-page";
import { siteConfig } from "@/lib/config/site";
import { buildWhatsAppUrl } from "@/lib/utils/whatsapp";

export const metadata: Metadata = { title: "Class 9 & 10 Coaching", description: "Mathematics and Social Science coaching for Class 9 and Class 10 CBSE and ICSE students in Ahmadgarh, Punjab, online and offline." };

export default function ClassesPage() {
  return <PublicPage>
    <PageIntro eyebrow="Classes" title="Mathematics and Social Science for Class 9 & 10." description="Explore subject support for CBSE and ICSE students with Priyanka Singla." />
    <section className="section class-directory"><div className="container">
      {siteConfig.classes.map((classLevel) => {
        return <section className="class-directory-group" key={classLevel}>
          <div className="class-directory-heading"><div><span className="section-kicker">Learning pathway</span><h2>{classLevel}</h2></div><div className="class-credential-list">{siteConfig.boards.map((board) => <span key={board}>{board}</span>)}</div></div>
          <div className="subject-grid">{siteConfig.subjects.map((subject) => {
            const subjectUrl = buildWhatsAppUrl({ classLevel, subject, intent: "general" });
            return <article className="subject-card" key={`${classLevel}-${subject}`}><h3>{subject}</h3><p>Concept-focused teaching and individual attention for your course of study.</p>{subjectUrl && <a className="text-link" href={subjectUrl} target="_blank" rel="noreferrer">Enquire about {classLevel} {subject} <ArrowRight size={15} /></a>}</article>;
          })}</div>
        </section>;
      })}
      <div className="class-details-strip"><div><Monitor size={18} /><span>{siteConfig.modes.join(" & ")}</span></div><div><MapPin size={18} /><span>{siteConfig.location}</span></div><div><School size={18} /><span>Offline availability depends on the student&apos;s locality.</span></div></div>
      <div className="class-practical-details"><p>{siteConfig.feesText}</p><p>{siteConfig.batchAvailabilityText}</p></div>
    </div></section>
    <DemoCallout title="Contact us for a free demo class." text="Get in touch to ask about classes and current availability." />
  </PublicPage>;
}