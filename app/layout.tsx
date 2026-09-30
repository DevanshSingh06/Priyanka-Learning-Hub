import type { Metadata } from "next";
import { siteConfig } from "@/lib/config/site";
import "./globals.css";

export const metadata: Metadata = {
  ...(siteConfig.url ? { metadataBase: new URL(siteConfig.url) } : {}),
  title: {
    default: `${siteConfig.name} | Class 9 & 10 Coaching`,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "Class 9 and Class 10 coaching in Mathematics and Social Science for CBSE and ICSE students in Ahmadgarh, Punjab. Online and offline learning with Priyanka Singla.",
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
