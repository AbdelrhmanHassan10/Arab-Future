"use client";

import { FiPhone, FiMail, FiMapPin, FiArrowLeft, FiInstagram, FiLinkedin } from "react-icons/fi";
import { FaTiktok } from "react-icons/fa";
import Link from "next/link";
import { useState, useEffect } from "react";
import { API_URL } from "@/lib/config";

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
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    fetch(`${API_URL}/settings`)
      .then(res => res.json())
      .then(data => {
        // Handle if response is wrapped in 'data'
        const s = data.data || data;
        // Replace legacy names from API
        let stringified = JSON.stringify(s);
        stringified = stringified.replace(/سمسار بني سويف/g, 'الفضل العقاريه').replace(/سمسار مصر/g, 'الفضل العقاريه');
        setSettings(JSON.parse(stringified));
      })
      .catch(console.error);
  }, []);

  const socialLinks = [];
  if (settings?.facebook_url) {
    socialLinks.push({
      name: "Facebook",
      href: settings.facebook_url,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    });
  }

  if (settings?.instagram_url) {
    socialLinks.push({
      name: "Instagram",
      href: settings.instagram_url,
      label: "تابعنا على إنستجرام",
      icon: <FiInstagram className="w-5 h-5" />,
    });
  }
  
  if (settings?.tiktok_url) {
    socialLinks.push({
      name: "TikTok",
      href: settings.tiktok_url,
      label: "تابعنا على تيك توك",
      icon: <FaTiktok className="w-5 h-5" />,
    });
  }
  
  if (settings?.linkedin_url) {
    socialLinks.push({
      name: "LinkedIn",
      href: settings.linkedin_url,
      label: "تابعنا على لينكد إن",
      icon: <FiLinkedin className="w-5 h-5" />,
    });
  }

  const phoneDisplay = settings?.whatsapp_number || "+20 100 845 0553";
  const phoneLink = `tel:${phoneDisplay.replace(/\s+/g, '')}`;
  const address = settings?.address || "بني سويف";
  const aboutText = settings?.about_text || "الوجهة الأولى للتسويق العقاري وإعادة البيع وأعمال التشطيبات المتكاملة في بني سويف والتجمع. نضع خبراتنا بين يديك لضمان أفضل استثمار لك ولعائلتك.";
  const email = settings?.email || "info@alfadl-realestate.com";

  return (
    <footer className="relative bg-[#111111] overflow-hidden pt-20 pb-8 border-t border-white/10">
      
      {/* Massive Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl px-6 pointer-events-none opacity-[0.03] select-none flex justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/samsar_horizontal_transparent.png" alt="الفضل العقاريه" className="w-full h-auto object-contain" />
      </div>

      <div className="pad-x container-wide pt-24 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-8 border-b border-white/10 pb-16">
          
          {/* Brand & Social Column */}
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-4 mb-8 group inline-flex">
              <div className="relative w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center p-2 group-hover:border-primary/50 group-hover:shadow-[0_0_20px_rgba(191,154,95,0.2)] transition-all duration-500">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/samsar_logo_transparent.png" alt="الفضل العقاريه" className="w-full h-full object-contain" />
              </div>
              <div>
                <span className="text-white font-bold text-xl block leading-none font-arabic mb-1 mt-1">
                  الفضل العقاريه
                </span>
                <span className="text-primary tracking-[0.1em] text-[11px] font-bold font-arabic block mt-1">
                  وسيطك العقاري المباشر
                </span>
              </div>
            </Link>
            
            <p className="text-white/50 font-light text-[14px] leading-[2] max-w-sm mb-8">
              {aboutText}
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4 flex-wrap">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80 hover:bg-primary hover:text-navy-deeper hover:scale-110 transition-all duration-500 hover:border-primary hover:shadow-[0_0_15px_rgba(214,174,69,0.4)]"
                  aria-label={social.name}
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
              <a href={phoneLink} className="flex items-center gap-4 group w-fit">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-navy-deeper group-hover:border-primary transition-all duration-300 flex-shrink-0">
                  <FiPhone className="text-xl" />
                </div>
                <div className="text-white/60 group-hover:text-white transition-colors duration-300 text-right">
                  <span className="block text-[10px] uppercase tracking-widest text-primary/70 mb-1 font-body">Phone</span>
                  <span className="text-[15px] font-medium" dir="ltr">{phoneDisplay}</span>
                </div>
              </a>

              {/* Email */}
              <a href={`mailto:${email}`} className="flex items-center gap-4 group w-fit justify-end ml-auto md:ml-0 md:justify-start">
                <div className="text-white/60 group-hover:text-white transition-colors duration-300 text-right md:text-left">
                  <span className="block text-[10px] uppercase tracking-widest text-primary/70 mb-1 font-body">Email</span>
                  <span className="text-[14px] font-medium">{email}</span>
                </div>
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-navy-deeper group-hover:border-primary transition-all duration-300 flex-shrink-0">
                  <FiMail className="text-xl" />
                </div>
              </a>

              {/* Location */}
              <div className="flex items-center gap-4 group w-fit">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-navy-deeper group-hover:border-primary transition-all duration-300 flex-shrink-0">
                  <FiMapPin className="text-xl" />
                </div>
                <div className="text-white/60 text-right">
                  <span className="block text-[10px] uppercase tracking-widest text-primary/70 mb-1 font-body">Location</span>
                  <span className="text-[15px] font-medium whitespace-nowrap">{address}</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-[13px]">
            &copy; {new Date().getFullYear()} الفضل العقاريه — جميع الحقوق محفوظة
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

