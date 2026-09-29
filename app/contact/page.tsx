import type { Metadata } from "next";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { EmptyState, PageIntro, PublicPage } from "@/components/layout/public-page";
import { WhatsAppEnquiryForm } from "@/components/public/contact-form";
import { siteConfig } from "@/lib/config/site";
import { buildWhatsAppUrl } from "@/lib/utils/whatsapp";

export const metadata: Metadata = { title: "Contact & Free Demo", description: "Contact Priyanka Learning Hub in Ahmadgarh, Punjab, for Class 9 and 10 coaching in Mathematics and Social Science." };

function ContactValue({ value, label, href, icon: Icon }: { value: string; label: string; href: string; icon: typeof Phone }) {
  return <div className="contact-detail"><span className="contact-detail-icon"><Icon size={18} /></span><div><span className="contact-detail-label">{label}</span><a href={href}>{value}<ArrowUpRight size={14} /></a></div></div>;
}

export default function ContactPage() {
  const whatsappUrl = buildWhatsAppUrl({ intent: "demo" });
  const whatsappAvailable = Boolean(whatsappUrl);

  return <PublicPage>
    <PageIntro eyebrow="Contact" title="Let’s talk about what you need." description="Reach out with a question about Class 9 or Class 10 learning support." />
    <section className="section contact-page-section"><div className="container contact-layout">
      <div className="contact-information"><span className="section-kicker">Get in touch</span><h2>We&apos;re here to help you find a starting point.</h2>
        {(siteConfig.phoneNumber || siteConfig.email || siteConfig.address) ? <div className="contact-detail-list">
          {siteConfig.phoneNumber && <ContactValue label="Phone" value={siteConfig.phoneNumber} href={`tel:${siteConfig.phoneNumber.replace(/[^\d+]/g, "")}`} icon={Phone} />}
          {siteConfig.email && <ContactValue label="Email" value={siteConfig.email} href={`mailto:${siteConfig.email}`} icon={Mail} />}
          {siteConfig.address && <div className="contact-detail"><span className="contact-detail-icon"><MapPin size={18} /></span><div><span className="contact-detail-label">Address</span><span className="contact-placeholder">{siteConfig.address}</span></div></div>}
        </div> : null}
        {(siteConfig.instagramUrl || siteConfig.youtubeUrl) && <div className="contact-socials"><h3>Social channels</h3>{siteConfig.instagramUrl && <a href={siteConfig.instagramUrl} target="_blank" rel="noreferrer">Instagram <ArrowUpRight size={14} /></a>}{siteConfig.youtubeUrl && <a href={siteConfig.youtubeUrl} target="_blank" rel="noreferrer">YouTube <ArrowUpRight size={14} /></a>}</div>}
        {whatsappUrl && <a className="button whatsapp-cta" href={whatsappUrl} target="_blank" rel="noreferrer">Book a Free Demo on WhatsApp <ArrowUpRight size={16} /></a>}
        {!siteConfig.phoneNumber && !siteConfig.email && !siteConfig.address && !siteConfig.instagramUrl && !siteConfig.youtubeUrl && !whatsappAvailable && <EmptyState title="Contact options are unavailable right now" message="Please check back for contact information." />}
        {siteConfig.mapsUrl && <div className="map-placeholder"><MapPin size={20} /><strong>Location</strong>{siteConfig.address && <span>{siteConfig.address}</span>}<a href={siteConfig.mapsUrl} target="_blank" rel="noreferrer">Open map <ArrowUpRight size={14} /></a></div>}
      </div>
      {whatsappAvailable && <div className="contact-form-wrap"><div className="contact-form-heading"><span className="section-kicker">Free demo enquiry</span><h2>Tell us a little about your goals.</h2><p>Your message will open in WhatsApp so you can review and send it.</p></div><WhatsAppEnquiryForm /></div>}
    </div></section>
  </PublicPage>;
}