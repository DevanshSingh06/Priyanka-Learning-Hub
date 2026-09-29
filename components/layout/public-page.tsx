import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { siteConfig } from "@/lib/config/site";
import { buildWhatsAppUrl } from "@/lib/utils/whatsapp";

export function PublicPage({ children }: Readonly<{ children: React.ReactNode }>) {
  const whatsappHref = buildWhatsAppUrl({ intent: "general" });

  return <div className="page-shell"><SiteHeader /><main>{children}</main><SiteFooter />{whatsappHref && <a className="whatsapp-float" href={whatsappHref} target="_blank" rel="noreferrer" aria-label="Chat with Priyanka Learning Hub on WhatsApp"><MessageCircle size={22} /><span>WhatsApp</span></a>}</div>;
}

export function PageIntro({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <section className="page-intro"><div className="container page-intro-inner"><span className="section-kicker">{eyebrow}</span><h1>{title}</h1><p>{description}</p></div></section>;
}

export function DemoCallout({ title = "Ready to take the next step?", text = "Talk with us about learning support for Class 9 or Class 10." }: { title?: string; text?: string }) {
  const whatsappUrl = buildWhatsAppUrl({ intent: "demo" });
  const phoneUrl = siteConfig.phoneNumber ? `tel:${siteConfig.phoneNumber.replace(/[^\d+]/g, "")}` : null;
  return <section className="demo-callout"><div className="container demo-callout-inner"><div><span className="section-kicker">A clear next step</span><h2>{title}</h2><p>{text}</p></div><div className="demo-callout-actions">{whatsappUrl ? <a className="button" href={whatsappUrl} target="_blank" rel="noreferrer">Book a Free Demo <ArrowRight size={16} /></a> : phoneUrl ? <a className="button" href={phoneUrl}>Book a Free Demo <ArrowRight size={16} /></a> : <Link className="button" href="/contact">Book a Free Demo <ArrowRight size={16} /></Link>}<Link className="button button-light" href="/notes">Explore Free Resources</Link></div></div></section>;
}

export function EmptyState({ title, message }: { title: string; message: string }) {
  return <div className="empty-state"><span className="empty-state-icon"><MessageCircle size={20} /></span><div><h3>{title}</h3><p>{message}</p></div></div>;
}