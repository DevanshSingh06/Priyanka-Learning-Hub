import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import brandLogo from "@/images/logo.jpg";
import { siteConfig } from "@/lib/config/site";
import { buildWhatsAppUrl } from "@/lib/utils/whatsapp";

const footerLinks = [
  { title: "Explore", links: [["About", "/about"], ["Classes", "/classes"], ["Results", "/results"], ["Gallery", "/gallery"]] },
  { title: "Resources", links: [["Notes Corner", "/notes"], ["Free Learning", "/learning"], ["Contact", "/contact"]] },
];

export function SiteFooter() {
  const whatsappUrl = buildWhatsAppUrl({ intent: "demo" });

  return (
    <footer className="site-footer" id="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-about">
            <Link className="brand" href="/">
              <Image className="brand-logo" src={brandLogo} alt="Priyanka Learning Hub" />
            </Link>
            <p>A learning space for Class 9 and Class 10 students, built around understanding, practice, and confidence.</p>
          </div>
          {footerLinks.map((group) => (
            <div className="footer-column" key={group.title}>
              <h3>{group.title}</h3>
              {group.links.map(([label, href]) => <Link key={label} href={href}>{label}</Link>)}
            </div>
          ))}
          {(siteConfig.email || siteConfig.phoneNumber || whatsappUrl || siteConfig.instagramUrl || siteConfig.youtubeUrl) && <div className="footer-column">
            <h3>Connect</h3>
            {siteConfig.email && <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>}
            {siteConfig.phoneNumber && <a href={`tel:${siteConfig.phoneNumber.replace(/[^\d+]/g, "")}`}>{siteConfig.phoneNumber}</a>}
            {whatsappUrl && <a href={whatsappUrl} target="_blank" rel="noreferrer">WhatsApp <ArrowUpRight size={13} /></a>}
            {siteConfig.instagramUrl && <a href={siteConfig.instagramUrl} target="_blank" rel="noreferrer">Instagram <ArrowUpRight size={13} /></a>}
            {siteConfig.youtubeUrl && <a href={siteConfig.youtubeUrl} target="_blank" rel="noreferrer">YouTube <ArrowUpRight size={13} /></a>}
          </div>}
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}