import type { Metadata } from "next";
import { Cairo, Inter } from "next/font/google";
import "./globals.css";
import WhatsAppButton from "@/components/WhatsAppButton";
import BackToTop from "@/components/BackToTop";
import PageTransition from "@/components/PageTransition";
import SmoothScroll from "@/components/SmoothScroll";
import fs from "fs";
import path from "path";

try {
  const rootVideoPath = path.join(process.cwd(), "./202607280250.mp4");
  const publicVideosDir = path.join(process.cwd(), "public", "videos");
  const publicVideoPath = path.join(publicVideosDir, "202607280250.mp4");
  if (fs.existsSync(rootVideoPath)) {
    if (!fs.existsSync(publicVideosDir)) {
      fs.mkdirSync(publicVideosDir, { recursive: true });
    }
    const rootStat = fs.statSync(rootVideoPath);
    const shouldCopy =
      !fs.existsSync(publicVideoPath) ||
      fs.statSync(publicVideoPath).size !== rootStat.size ||
      fs.statSync(publicVideoPath).mtimeMs < rootStat.mtimeMs;
    if (shouldCopy) {
      fs.copyFileSync(rootVideoPath, publicVideoPath);
    }
  }
} catch (e) {
  console.error("Error setting up hero video:", e);
}

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
  title: "سمسار مصر | Semsar Masr - Your Premium Real Estate Broker",
  description:
    "سمسار مصر - وجهتك الأولى لاكتشاف أفضل العقارات في مصر. بيع، شراء، وإيجار العقارات الفاخرة.",
  keywords: [
    "real estate",
    "broker",
    "egypt",
    "property",
    "villas",
    "apartments",
    "سمسار",
    "عقارات",
    "مصر",
    "بيع",
    "شراء",
    "إيجار"
  ],
  openGraph: {
    title: "سمسار مصر | Semsar Masr",
    description:
      "اكتشف منزل أحلامك في مصر مع سمسار مصر.",
    type: "website",
    locale: "ar_EG",
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
        <SmoothScroll>
          <PageTransition>{children}</PageTransition>
        </SmoothScroll>
        <WhatsAppButton />
        <BackToTop />
      </body>
    </html>
  );
}
