import { classLevels, subjects } from "@/lib/config/content";

export const siteConfig = {
  name: "Priyanka Learning Hub",
  teacherName: "Priyanka Singla",
  url: process.env.NEXT_PUBLIC_SITE_URL || "",
  instagramUrl: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "",
  youtubeUrl: process.env.NEXT_PUBLIC_YOUTUBE_URL || "",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "",
  phoneNumber: process.env.NEXT_PUBLIC_PHONE || "",
  email: process.env.NEXT_PUBLIC_EMAIL || "",
  address: process.env.NEXT_PUBLIC_ADDRESS || "",
  mapsUrl: process.env.NEXT_PUBLIC_MAPS_URL || "",
  classes: classLevels,
  subjects,
  boards: ["CBSE", "ICSE"],
  modes: ["Online", "Offline"],
  experience: "18+ years",
  qualifications: ["M.Sc.", "Diploma in Architecture"],
  location: "Ahmadgarh, Punjab",
  feesText: "Contact for fee details.",
  batchAvailabilityText: "Contact us for current batch availability and timings.",
};