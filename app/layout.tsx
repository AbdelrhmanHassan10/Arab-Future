import type { Metadata } from "next";
import { Cairo } from "next/font/google";
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
  display: "swap",
  variable: "--font-cairo",
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "سمسار بني سويف | Semsar Beni Suef - التسويق العقاري والتشطيبات",
  description:
    "سمسار بني سويف - وجهتك الأولى لاكتشاف أفضل العقارات وتوفير خدمات التشطيب المتكاملة داخل بني سويف. بيع، شراء، وتشطيب.",
  keywords: [
    "real estate",
    "broker",
    "beni suef",
    "property",
    "finishing",
    "سمسار",
    "عقارات",
    "بني سويف",
    "تشطيبات",
    "بيع",
    "شراء",
    "استثمار",
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
    <html lang="ar" dir="rtl" className={`scroll-smooth ${cairo.variable}`}>
      <body
        className="font-arabic antialiased bg-[#090909] text-white"
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
