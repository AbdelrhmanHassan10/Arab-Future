"use client";

import { motion } from "framer-motion";
import { FiPhone, FiMail, FiMapPin, FiArrowLeft } from "react-icons/fi";
import Link from "next/link";

const socialLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61576446030602",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/arabfuture_construction/",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@arabfuture13",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    ),
  },
];

const footerLinks = [
  {
    title: "روابط سريعة",
    links: [
      { label: "الرئيسية", href: "/" },
      { label: "الوحدات المتاحة", href: "/units" },
      { label: "أعمالنا", href: "/our-work" },
      { label: "من نحن", href: "/about" },
    ],
  },
  {
    title: "خدماتنا",
    links: [
      { label: "شراء وبيع الوحدات", href: "/units" },
      { label: "التشطيب والتصميم", href: "/finishing" },
      { label: "الاستشارات العقارية", href: "/contact" },
      { label: "تسويق المشاريع", href: "/contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#111111] overflow-hidden pt-20 pb-8 border-t border-white/10">
      
      {/* Massive Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl px-6 pointer-events-none opacity-[0.03] select-none flex justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/samsar_horizontal_transparent.png" alt="سمسار بني سويف" className="w-full h-auto object-contain" />
      </div>

      <div className="pad-x container-wide pt-24 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-8 border-b border-white/10 pb-16">
          
          {/* Brand & Social Column */}
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-4 mb-8 group inline-flex">
              <div className="relative w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center p-2 group-hover:border-primary/50 group-hover:shadow-[0_0_20px_rgba(191,154,95,0.2)] transition-all duration-500">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/samsar_logo_transparent.png" alt="سمسار بني سويف" className="w-full h-full object-contain" />
              </div>
              <div>
                <span className="text-white font-bold text-xl block leading-none font-arabic mb-1">
                  سمسار بني سويف
                </span>
                <span className="text-primary tracking-[0.3em] text-[9px] uppercase font-body block">
                  Semsar Beni Suef
                </span>
              </div>
            </Link>
            
            <p className="text-white/50 font-light text-[14px] leading-[2] max-w-sm mb-10">
              الوجهة الأولى للتسويق العقاري وإعادة البيع وأعمال التشطيبات المتكاملة في بني سويف. نضع خبراتنا بين يديك لضمان أفضل استثمار لك ولعائلتك.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-white/40 hover:text-navy-deeper hover:bg-primary hover:border-primary hover:shadow-[0_10px_20px_rgba(191,154,95,0.3)] hover:-translate-y-1 transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Spacer for large screens */}
          <div className="hidden lg:block lg:col-span-1" />

          {/* Links Columns */}
          {footerLinks.map((group, i) => (
            <div key={i} className="lg:col-span-2">
              <h4 className="text-white font-bold text-lg mb-8 relative inline-block">
                {group.title}
                <span className="absolute -bottom-3 right-0 w-1/2 h-0.5 bg-primary rounded-full" />
              </h4>
              <ul className="space-y-4">
                {group.links.map((link, j) => (
                  <li key={j}>
                    <Link
                      href={link.href}
                      className="text-white/60 text-[14px] hover:text-white flex items-center gap-2 group/link transition-colors duration-300 w-fit"
                    >
                      <FiArrowLeft className="text-primary opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-300" />
                      <span className="group-hover/link:translate-x-1 transition-transform duration-300">{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Info Column */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-bold text-lg mb-8 relative inline-block">
              معلومات التواصل
              <span className="absolute -bottom-3 right-0 w-1/2 h-0.5 bg-primary rounded-full" />
            </h4>
            <div className="space-y-6">
              
              {/* Phone */}
              <a href="tel:+201001234567" dir="ltr" className="flex items-center gap-4 group w-fit justify-end ml-auto md:ml-0 md:justify-start">
                <div className="text-white/60 group-hover:text-white transition-colors duration-300 text-right md:text-left">
                  <span className="block text-[10px] uppercase tracking-widest text-primary/70 mb-1 font-body">Phone</span>
                  <span className="text-[15px] font-medium">+20 100 123 4567</span>
                </div>
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-navy-deeper group-hover:border-primary transition-all duration-300 flex-shrink-0">
                  <FiPhone className="text-xl" />
                </div>
              </a>

              {/* Email */}
              <a href="mailto:info@semsarbenisuef.com" className="flex items-center gap-4 group w-fit justify-end ml-auto md:ml-0 md:justify-start">
                <div className="text-white/60 group-hover:text-white transition-colors duration-300 text-right md:text-left">
                  <span className="block text-[10px] uppercase tracking-widest text-primary/70 mb-1 font-body">Email</span>
                  <span className="text-[14px] font-medium">info@semsarbenisuef.com</span>
                </div>
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-navy-deeper group-hover:border-primary transition-all duration-300 flex-shrink-0">
                  <FiMail className="text-xl" />
                </div>
              </a>

              {/* Location */}
              <div className="flex items-center gap-4 group w-fit justify-end ml-auto md:ml-0 md:justify-start">
                <div className="text-white/60 text-right md:text-left">
                  <span className="block text-[10px] uppercase tracking-widest text-primary/70 mb-1 font-body">Location</span>
                  <span className="text-[15px] font-medium">بني سويف، مصر</span>
                </div>
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-navy-deeper group-hover:border-primary transition-all duration-300 flex-shrink-0">
                  <FiMapPin className="text-xl" />
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-[13px]">
            &copy; {new Date().getFullYear()} سمسار بني سويف — جميع الحقوق محفوظة
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-white/50 text-[13px] hover:text-primary transition-colors duration-300">
              سياسة الخصوصية
            </Link>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <Link href="/terms" className="text-white/50 text-[13px] hover:text-primary transition-colors duration-300">
              الشروط والأحكام
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
