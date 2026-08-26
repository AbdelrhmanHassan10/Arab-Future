"use client";

import { FiPhone, FiMail, FiMapPin, FiArrowLeft } from "react-icons/fi";
import Link from "next/link";

const socialLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/share/19PFyHxhdo/",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
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
            
            <p className="text-white/50 font-light text-[14px] leading-[2] max-w-sm mb-8">
              الوجهة الأولى للتسويق العقاري وإعادة البيع وأعمال التشطيبات المتكاملة في بني سويف. نضع خبراتنا بين يديك لضمان أفضل استثمار لك ولعائلتك.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 w-fit px-6 py-3 rounded-full bg-gradient-to-l from-white/5 to-transparent border border-white/10 hover:border-primary/50 hover:bg-primary/5 transition-all duration-500 group shadow-lg"
                  aria-label={social.name}
                >
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80 group-hover:bg-primary group-hover:text-navy-deeper group-hover:scale-110 transition-all duration-500 group-hover:border-primary group-hover:shadow-[0_0_15px_rgba(214,174,69,0.4)]">
                    {social.icon}
                  </div>
                  <span className="text-white/80 text-[15px] font-bold group-hover:text-white transition-colors duration-500">
                    تابعنا على فيسبوك
                  </span>
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
              <a href="tel:+201008450553" className="flex items-center gap-4 group w-fit">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-navy-deeper group-hover:border-primary transition-all duration-300 flex-shrink-0">
                  <FiPhone className="text-xl" />
                </div>
                <div className="text-white/60 group-hover:text-white transition-colors duration-300 text-right">
                  <span className="block text-[10px] uppercase tracking-widest text-primary/70 mb-1 font-body">Phone</span>
                  <span className="text-[15px] font-medium" dir="ltr">+20 100 845 0553</span>
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
              <div className="flex items-center gap-4 group w-fit">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-navy-deeper group-hover:border-primary transition-all duration-300 flex-shrink-0">
                  <FiMapPin className="text-xl" />
                </div>
                <div className="text-white/60 text-right">
                  <span className="block text-[10px] uppercase tracking-widest text-primary/70 mb-1 font-body">Location</span>
                  <span className="text-[15px] font-medium whitespace-nowrap">الحي الأول، شرق النيل، بني سويف</span>
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
