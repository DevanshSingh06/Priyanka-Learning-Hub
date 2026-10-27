import type { Metadata } from "next";
import { siteConfig } from "@/lib/config/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://priyanka-learning-hub.vercel.app"),
  title: {
    default: `${siteConfig.name} | CBSE & ICSE Coaching in Ahmadgarh`,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "Priyanka Singla teaches Mathematics and Social Science to Classes 9 and 10 students following CBSE and ICSE in Ahmadgarh, Punjab, with online and offline learning.",
  keywords: ["Priyanka Learning Hub", "Class 9 coaching", "Class 10 coaching", "Mathematics", "Social Science", "CBSE", "ICSE", "Ahmadgarh", "Punjab"],
  openGraph: {
    title: siteConfig.name,
    description:
      "Class 9 and 10 Mathematics and Social Science coaching in Ahmadgarh, Punjab, with Priyanka Singla.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
