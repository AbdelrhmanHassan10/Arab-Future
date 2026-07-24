import type { Metadata } from "next";
import { Cairo, Inter } from "next/font/google";
import "./globals.css";
import WhatsAppButton from "@/components/WhatsAppButton";
import BackToTop from "@/components/BackToTop";
import PageTransition from "@/components/PageTransition";
import Preloader from "@/components/Preloader";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-arabic",
  display: "swap",
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "عرب فيوتشر | Arab Future - Architectural Excellence",
  description:
    "شركة عرب فيوتشر المحدودة - رواد في الواجهات الزخرفية المسبقة الصنع وترميم المباني التاريخية والحلول الهندسية المعمارية",
  keywords: [
    "architecture",
    "facades",
    "GRC",
    "GRP",
    "Islamic architecture",
    "restoration",
    "Saudi Arabia",
    "واجهات",
    "عمارة",
    "ترميم",
  ],
  openGraph: {
    title: "عرب فيوتشر | Arab Future - Architectural Excellence",
    description:
      "رواد في الواجهات الزخرفية المسبقة الصنع وترميم المباني التاريخية",
    type: "website",
    locale: "ar_SA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className="scroll-smooth">
      <body
        className={`${cairo.variable} ${inter.variable} antialiased`}
      >
        <Preloader />
        <PageTransition>{children}</PageTransition>
        <WhatsAppButton />
        <BackToTop />
      </body>
    </html>
  );
}
