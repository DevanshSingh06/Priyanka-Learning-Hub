import type { Metadata } from "next";
import { ArrowRight, BookOpenCheck, HeartHandshake, Lightbulb } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import teacherPhoto from "@/images/priyanka-singla.png";
import { DemoCallout, PageIntro, PublicPage } from "@/components/layout/public-page";
import { siteConfig } from "@/lib/config/site";

export const metadata: Metadata = { title: "About Priyanka Singla", description: "Meet Priyanka Singla, with 18+ years teaching Class 9 and Class 10 Mathematics and Social Science for CBSE and ICSE students in Ahmadgarh, Punjab." };

export default function AboutPage() {
  return <PublicPage>
    <PageIntro eyebrow="Meet your teacher" title="Learning begins with understanding." description={`${siteConfig.teacherName} teaches Mathematics and Social Science to Class 9 and Class 10 students following CBSE and ICSE.`} />
    <section className="section profile-section"><div className="container profile-grid">
      <div className="profile-portrait"><Image className="profile-teacher-image" src={teacherPhoto} alt="Priyanka Singla, teacher at Priyanka Learning Hub" fill sizes="(max-width: 620px) 88vw, (max-width: 820px) 44vw, 400px" /></div>
      <div className="profile-copy"><span className="section-kicker">Teacher profile</span><h2>{siteConfig.teacherName}</h2><p className="profile-role">Founder & teacher, Priyanka Learning Hub</p><p>With more than 18 years of teaching experience, Priyanka brings a genuine passion for education and the growth of each student. She focuses on conceptual understanding rather than rote learning, giving students personal attention and room to practise, ask questions, and build confidence.</p><p>For Priyanka, teaching is a meaningful responsibility as well as a passion. The greatest satisfaction comes from seeing students understand, progress, and become academically stronger, not from pursuing fame or commercial success.</p><div className="profile-facts"><div><strong>Qualifications</strong><span>{siteConfig.qualifications[0]}</span><span>{siteConfig.qualifications[1]}</span></div><div><strong>Teaching experience</strong><span>{siteConfig.experience}</span></div></div><div className="about-quick-facts">{[...siteConfig.subjects, ...siteConfig.boards, ...siteConfig.modes, siteConfig.location].map((fact) => <span key={fact}>{fact}</span>)}</div><Link className="text-link" href="/contact">Ask about learning support <ArrowRight size={15} /></Link></div>
    </div></section>
    <section className="section philosophy-section"><div className="container">
      <div className="section-heading"><span className="section-kicker">How we think about learning</span><h2>Clear thinking, steady practice, growing confidence.</h2><p>The learning experience is designed around a simple progression: understand a concept, practise it, then build confidence applying it.</p></div>
      <div className="approach-grid"><article><span><Lightbulb size={20} /></span><h3>Teaching philosophy</h3><p>Prioritize understanding and meaningful student growth over rote learning.</p></article><article><span><BookOpenCheck size={20} /></span><h3>Teaching approach</h3><p>Use clear explanations, purposeful practice, and revision to help students apply concepts.</p></article><article><span><HeartHandshake size={20} /></span><h3>Student support</h3><p>Give personal attention and encourage students to ask questions as they build confidence.</p></article></div>
    </div></section>
    <DemoCallout title="Book a Free Demo" text="Talk with Priyanka Learning Hub about learning support for Class 9 or Class 10." />
  </PublicPage>;
}