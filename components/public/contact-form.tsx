"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/config/site";
import { buildWhatsAppUrl } from "@/lib/utils/whatsapp";

export function WhatsAppEnquiryForm({ compact = false }: { compact?: boolean }) {
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("studentName") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const classLevel = String(formData.get("classLevel") || "");
    const subject = String(formData.get("subject") || "").trim();
    const message = String(formData.get("message") || "").trim();

    if (name.length < 2) {
      setError("Please enter a name with at least two characters.");
      return;
    }
    const phoneDigits = phone.replace(/\D/g, "");
    if (!/^[0-9+() -]{7,20}$/.test(phone) || phoneDigits.length < 7 || phoneDigits.length > 15) {
      setError("Enter a valid phone number with 7 to 15 digits.");
      return;
    }
    if (!classLevel) {
      setError("Please choose a class.");
      return;
    }

    const url = buildWhatsAppUrl({ intent: "demo", classLevel, subject, studentName: name, phone, message });
    if (!url) {
      setError("WhatsApp contact is not available right now.");
      return;
    }

    setError("");
    window.location.assign(url);
  }

  return <form className={`enquiry-form contact-enquiry-form${compact ? " enquiry-form-compact" : ""}`} id={compact ? undefined : "enquiry"} noValidate onSubmit={handleSubmit} onChange={() => setError("")}>
    <div className="field"><label htmlFor={compact ? "home-enquiry-name" : "enquiry-name"}>Student name</label><input id={compact ? "home-enquiry-name" : "enquiry-name"} name="studentName" autoComplete="name" required minLength={2} placeholder="Your name" /></div>
    <div className="field"><label htmlFor={compact ? "home-enquiry-class" : "enquiry-class"}>Class</label><select id={compact ? "home-enquiry-class" : "enquiry-class"} name="classLevel" defaultValue="" required><option value="" disabled>Select class</option>{siteConfig.classes.map((classLevel) => <option key={classLevel}>{classLevel}</option>)}</select></div>
    <div className="field"><label htmlFor={compact ? "home-enquiry-subject" : "enquiry-subject"}>Subject <span>(optional)</span></label><select id={compact ? "home-enquiry-subject" : "enquiry-subject"} name="subject" defaultValue=""><option value="">Choose a subject</option>{siteConfig.subjects.map((subject) => <option key={subject}>{subject}</option>)}</select></div>
    <div className="field"><label htmlFor={compact ? "home-enquiry-phone" : "enquiry-phone"}>Phone number</label><input id={compact ? "home-enquiry-phone" : "enquiry-phone"} name="phone" type="tel" autoComplete="tel" inputMode="tel" required pattern="[0-9+() -]{7,20}" placeholder="Your phone number" /></div>
    <div className="field field-wide"><label htmlFor={compact ? "home-enquiry-message" : "enquiry-message"}>Message <span>(optional)</span></label><textarea id={compact ? "home-enquiry-message" : "enquiry-message"} name="message" placeholder="What would you like to know?" /></div>
    <div className="form-bottom"><button className="button" type="submit">Send Enquiry on WhatsApp <ArrowRight size={16} /></button></div>
    {error && <p className="form-error" role="alert">{error}</p>}
  </form>;
}