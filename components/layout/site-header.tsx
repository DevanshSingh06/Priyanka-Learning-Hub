"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import brandLogo from "@/images/logo.jpg";
import { siteConfig } from "@/lib/config/site";
import { buildWhatsAppUrl } from "@/lib/utils/whatsapp";

const navItems = [
  ["Home", "/"],
  ["About", "/about"],
  ["Classes", "/classes"],
  ["Notes", "/notes"],
  ["Free Learning", "/learning"],
  ["Results", "/results"],
  ["Gallery", "/gallery"],
  ["Contact", "/contact"],
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const demoUrl = buildWhatsAppUrl({ intent: "demo" });
  const phoneUrl = siteConfig.phoneNumber ? `tel:${siteConfig.phoneNumber.replace(/[^\d+]/g, "")}` : null;
  const demoHref = demoUrl || phoneUrl || "/contact";

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" href="/" aria-label="Priyanka Learning Hub home">
          <Image className="brand-logo" src={brandLogo} alt="Priyanka Learning Hub" priority />
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map(([label, href]) => <Link className={pathname === href ? "active" : undefined} aria-current={pathname === href ? "page" : undefined} key={href} href={href}>{label}</Link>)}
          <Link className="button header-cta" href={demoHref} target={demoUrl ? "_blank" : undefined} rel={demoUrl ? "noreferrer" : undefined}>Book a Free Demo</Link>
        </nav>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {menuOpen && (
        <nav className="mobile-nav" id="mobile-navigation" aria-label="Mobile navigation">
          {navItems.map(([label, href]) => (
            <Link className={pathname === href ? "active" : undefined} aria-current={pathname === href ? "page" : undefined} key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</Link>
          ))}
          <Link className="button" href={demoHref} target={demoUrl ? "_blank" : undefined} rel={demoUrl ? "noreferrer" : undefined} onClick={() => setMenuOpen(false)}>Book a Free Demo</Link>
        </nav>
      )}
    </header>
  );
}