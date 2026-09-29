import { siteConfig } from "@/lib/config/site";

export type WhatsAppEnquiry = {
  intent?: "general" | "demo";
  classLevel?: string;
  subject?: string;
  studentName?: string;
  phone?: string;
  message?: string;
};

export function buildWhatsAppMessage(details: WhatsAppEnquiry = {}) {
  const classLevel = details.classLevel?.trim();
  const subject = details.subject?.trim();
  let request: string;

  if (subject && classLevel) {
    request = `I would like to enquire about ${classLevel} ${subject}`;
  } else if (details.intent === "demo") {
    request = `I would like to enquire about a free demo class for ${classLevel || "Class 9/10"}`;
  } else if (classLevel) {
    request = `I would like to know more about the classes for ${classLevel}`;
  } else {
    request = "I would like to know more about the classes for Class 9/10";
  }

  const lines = [`Hello ${siteConfig.name}, ${request}.`];
  if (details.studentName?.trim()) lines.push(`Student name: ${details.studentName.trim()}`);
  if (details.phone?.trim()) lines.push(`Phone: ${details.phone.trim()}`);
  if (details.message?.trim()) lines.push(`Message: ${details.message.trim()}`);
  return lines.join("\n");
}

export function buildWhatsAppUrl(details: WhatsAppEnquiry = {}, number = siteConfig.whatsappNumber) {
  const digits = number.replace(/\D/g, "");
  if (digits.length < 7 || digits.length > 15) return null;
  return `https://wa.me/${digits}?text=${encodeURIComponent(buildWhatsAppMessage(details))}`;
}