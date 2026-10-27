import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { connection } from "next/server";
import teacherPhoto from "@/images/priyanka-singla.png";
import { AboutTeacherSection, ClassesSection, FreeLearningSection, InstagramSection, NotesSection, WhySection } from "@/components/home/home-sections";
import { PublicPage } from "@/components/layout/public-page";
import { WhatsAppEnquiryForm } from "@/components/public/contact-form";
import { siteConfig } from "@/lib/config/site";
import { getPublishedResources } from "@/lib/data/published-notes";
import { buildWhatsAppUrl } from "@/lib/utils/whatsapp";

export const metadata: Metadata = {
  description:
    "Priyanka Singla teaches Mathematics and Social Science to Classes 9 and 10 students following CBSE and ICSE in Ahmadgarh, Punjab, with online and offline learning.",
  alternates: {
    canonical: "/",
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Priyanka Learning Hub",
  alternateName: "Priyanka Learning Hub Ahmadgarh",
  url: "https://priyanka-learning-hub.vercel.app/",
};

export default async function Home() {
  await connection();
  const { resources, hasLoadError } = await getPublishedResources({ limit: 3, signFileUrls: false });
  const demoUrl = buildWhatsAppUrl({ intent: "demo" });
  const phoneUrl = siteConfig.phoneNumber ? `tel:${siteConfig.phoneNumber.replace(/[^\d+]/g, "")}` : null;
  const demoHref = demoUrl || phoneUrl || "/contact";
  const heroFacts = [
    siteConfig.experience,
    `${siteConfig.classes[0].replace("Class ", "Classes ")} & ${siteConfig.classes[1].replace("Class ", "")}`,
    ...siteConfig.subjects,
    ...siteConfig.boards,
    siteConfig.modes.join(" + "),
    siteConfig.location,
  ];

  return (
    <PublicPage>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd).replace(/</g, "\\u003c") }}
      />
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">{siteConfig.name}</span>
            <h1>Priyanka Learning Hub <span>with Priyanka Singla</span></h1>
            <p>Mathematics and Social Science for Classes 9 and 10 following CBSE and ICSE, taught online and offline in {siteConfig.location}.</p>
            <div className="hero-actions">
              <Link className="button" href={demoHref} target={demoUrl ? "_blank" : undefined} rel={demoUrl ? "noreferrer" : undefined}>Book a Free Demo <ArrowRight size={16} /></Link>
              <Link className="button button-light" href="/learning">Explore Free Learning</Link>
            </div>
          </div>
          <div className="portrait-frame">
            <div className="portrait-art portrait-real">
              <Image className="teacher-image" src={teacherPhoto} alt="Priyanka Singla, Mathematics and Social Science teacher at Priyanka Learning Hub" fill sizes="(max-width: 620px) 88vw, (max-width: 1060px) 42vw, 420px" priority />
            </div>
            <div className="portrait-caption">
              <div><strong>{siteConfig.teacherName}</strong><span>Founder & teacher, Priyanka Learning Hub</span></div>
            </div>
          </div>
        </div>
        <div className="container hero-facts" aria-label="Coaching details">
          {heroFacts.map((fact) => <span key={fact}>{fact}</span>)}
        </div>
      </section>
      <WhySection />
      <ClassesSection />
      <FreeLearningSection />
      <NotesSection resources={resources} hasLoadError={hasLoadError} />
      <AboutTeacherSection />
      <section className="cta-section" id="contact">
        <div className="container cta-layout">
          <div className="cta-copy">
            <span className="section-kicker">Start a conversation</span>
            <h2>Have questions or want to book a demo?</h2>
            <p>Get in touch or explore class and study resources.</p>
            <div className="hero-actions">
              {demoUrl && <a className="button" href={demoUrl} target="_blank" rel="noreferrer">Book a Free Demo <ArrowRight size={16} /></a>}
              {phoneUrl && <a className="button button-light" href={phoneUrl}>Call Us <ArrowRight size={16} /></a>}
              <Link className="text-link" href="/classes">Explore Classes <ArrowRight size={15} /></Link>
            </div>
          </div>
          {demoUrl && <WhatsAppEnquiryForm compact />}
        </div>
      </section>
      <InstagramSection />
    </PublicPage>
  );
}
