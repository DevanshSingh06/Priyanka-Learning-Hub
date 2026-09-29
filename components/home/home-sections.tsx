import Link from "next/link";
import { ArrowRight, BookOpenCheck, Brain, ClipboardCheck, FileText, HeartHandshake, Play } from "lucide-react";
import { siteConfig } from "@/lib/config/site";
import type { NoteResource } from "@/lib/data/public-content";
import { instagramReels, lessonResources } from "@/lib/data/public-content";
import { buildWhatsAppUrl } from "@/lib/utils/whatsapp";

const features = [
  { title: "18+ years of teaching", description: "Supporting Class 9 and 10 students in Mathematics and Social Science.", icon: BookOpenCheck },
  { title: "Conceptual understanding", description: "Focus on understanding the why behind each idea, not rote learning.", icon: Brain },
  { title: "Personal attention", description: "Room to ask questions, practise, and revisit challenging topics.", icon: HeartHandshake },
  { title: "Student confidence", description: "Build confidence through understanding, practice, and steady progress.", icon: ClipboardCheck },
];

function SectionHeading({ kicker, title, text }: { kicker: string; title: string; text: string }) {
  return <div className="section-heading"><span className="section-kicker">{kicker}</span><h2>{title}</h2><p>{text}</p></div>;
}

export function WhySection() {
  return <section className="section why-section" id="about"><div className="container">
    <SectionHeading kicker="A thoughtful way to learn" title="Why Learn With Priyanka Learning Hub?" text="Learning is built around conceptual understanding, personal attention, practice, and student confidence." />
    <div className="feature-grid">{features.map(({ title, description, icon: Icon }) => <article className="feature-card" key={title}><span className="feature-icon"><Icon size={20} strokeWidth={1.7} /></span><h3>{title}</h3><p>{description}</p></article>)}</div>
  </div></section>;
}

export function ClassesSection() {
  return <section className="section classes-section" id="classes"><div className="container">
    <SectionHeading kicker="Find your starting point" title="Learning for the next big step." text="Mathematics and Social Science learning support for Classes 9 and 10." />
    <div className="class-grid">{siteConfig.classes.map((classLevel) => {
      const classNumber = classLevel.replace("Class ", "");
      const whatsappUrl = buildWhatsAppUrl({ classLevel });
      const phoneHref = siteConfig.phoneNumber ? `tel:${siteConfig.phoneNumber.replace(/[^\d+]/g, "")}` : "/contact";
        return <article className="class-card" key={classLevel}><div className="class-card-top"><span className="class-number">{classNumber}</span></div><h3>{classLevel}</h3><p>Explore the class page for learning support and study resources.</p>{whatsappUrl ? <a className="text-link" href={whatsappUrl} target="_blank" rel="noreferrer">Ask about {classLevel} <ArrowRight size={15} /></a> : <Link className="text-link" href={phoneHref}>Ask about {classLevel} <ArrowRight size={15} /></Link>}</article>;
    })}</div>
  </div></section>;
}

export function InstagramSection() {
  if (!siteConfig.instagramUrl) return null;

  return <section className="social-section"><div className="container social-inner"><div className="social-copy"><span className="section-kicker">Follow along</span><h2>Learning updates on Instagram.</h2><p>Visit Priyanka Learning Hub for learning updates and short-form posts.</p></div><a className="button" href={siteConfig.instagramUrl} target="_blank" rel="noreferrer">Visit Instagram <ArrowRight size={16} /></a><div className="instagram-reels">{instagramReels.map((reel) => <a href={reel.url} key={reel.id} target="_blank" rel="noreferrer">View Instagram Reel <ArrowRight size={15} /></a>)}</div></div></section>;
}

export function FreeLearningSection() {
  return <section className="section home-learning-section"><div className="container">
    <div className="section-topline"><SectionHeading kicker="Free learning" title="Explore lessons on YouTube." text="Watch lessons from Priyanka Learning Hub." /><Link className="text-link" href="/learning">Explore Free Learning <ArrowRight size={15} /></Link></div>
    <div className="home-lessons-grid">{lessonResources.map((lesson) => <a className="home-lesson-link" href={lesson.youtubeUrl || undefined} key={lesson.id} target={lesson.youtubeUrl ? "_blank" : undefined} rel={lesson.youtubeUrl ? "noreferrer" : undefined} aria-disabled={!lesson.youtubeUrl}>
      <span className="lesson-link-play"><Play size={18} fill="currentColor" /></span><span><strong>{lesson.title}</strong><small>YouTube lesson</small></span><ArrowRight size={16} />
    </a>)}</div>
  </div></section>;
}

export function NotesSection({ resources, hasLoadError = false }: { resources: NoteResource[]; hasLoadError?: boolean }) {
  return <section className="section notes-section" id="notes"><div className="container notes-layout"><div>
    <SectionHeading kicker="Notes corner" title="A place for focused study." text="Study resources are being prepared. Check back soon for notes, revision material and important questions." />
    <Link className="button button-light" href="/notes">Explore all notes <ArrowRight size={16} /></Link>
  </div>{!hasLoadError && resources.length > 0 ? <div className="note-list">{resources.slice(0, 3).map((resource) => <Link className="note-row" href="/notes" key={resource.id}>
    <div className="note-icon" aria-hidden="true"><FileText size={19} /></div>
    <div><strong>{resource.title}</strong><span>{resource.classLevel} · {resource.subject} · {resource.resourceType}</span></div>
  </Link>)}</div> : <span className="notes-art" aria-hidden="true"><FileText size={44} strokeWidth={1.2} /></span>}</div></section>;
}

export function AboutTeacherSection() {
  return <section className="section home-about-section"><div className="container home-about-layout">
    <div className="home-about-heading"><span className="section-kicker">About Priyanka</span><h2>Teaching with understanding and personal attention.</h2><Link className="text-link" href="/about">Meet Priyanka <ArrowRight size={15} /></Link></div>
    <p>With more than 18 years of teaching experience, Priyanka brings a genuine passion for education and the growth of each student. She focuses on conceptual understanding rather than rote learning, giving students personal attention and room to practise, ask questions, and build confidence.</p>
  </div></section>;
}