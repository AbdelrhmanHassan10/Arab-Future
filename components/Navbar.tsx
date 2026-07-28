"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const serviceSubLinks = [
  { label: "إدارة المشاريع", href: "/services/project-management" },
  { label: "التصميم المعماري", href: "/services/architectural-design" },
  { label: "تصميم وتشطيبات داخلية", href: "/services/interior-design" },
  { label: "أعمال الهارد سكيب", href: "/services/hardscape" },
  { label: "الصيانة والتشغيل", href: "/services/maintenance" },
  { label: "حلول تقنية متخصصة", href: "/services/technical" },
];

const navLinks = [
  { label: "الرئيسية", href: "/" },
  { label: "من نحن", href: "/about" },
  { label: "خدماتنا", href: "/services", hasDropdown: true },
  { label: "مشاريعنا", href: "/projects" },
  { label: "معرض الأعمال", href: "/gallery" },
  { label: "الأسئلة الشائعة", href: "/faq" },
  { label: "مقالات تهمك", href: "/blog" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div className={`transition-all duration-700 ease-expo-out ${
          scrolled ? "py-2 px-4 md:px-6 lg:px-8" : "py-4 md:py-5 px-6 md:px-10 lg:px-16 xl:px-24"
        }`}>
          <div className={`transition-all duration-700 ease-expo-out ${
            scrolled
              ? "max-w-[1340px] mx-auto bg-navy-dark/90 backdrop-blur-2xl rounded-full shadow-card px-6 md:px-8 py-3 border border-white/[0.08]"
              : ""
          }`}>
            <div className={`flex items-center justify-between ${!scrolled ? "max-w-[1340px] mx-auto" : ""}`}>
              {/* Logo */}
              <a href="/" className="group flex items-center gap-3">
                <img src="/images/logo.png" alt="عرب فيوتشر" className="w-14 h-14 object-contain" />
                <div className="hidden sm:block">
                  <span className="font-bold text-[16px] block leading-none transition-colors duration-500 text-white">
                    عرب فيوتشر المحدودة
                  </span>
                  <span className="text-[9px] tracking-[0.2em] uppercase mt-1 block transition-colors duration-500 font-body text-primary/80">
                    Arab Future Ltd
                  </span>
                </div>
              </a>

              {/* Desktop Nav — centered pill */}
              <nav className={`hidden lg:flex items-center gap-1 transition-all duration-700 ${
                scrolled
                  ? ""
                  : "bg-white/[0.06] backdrop-blur-md rounded-full px-2 py-1.5 border border-white/[0.08]"
              }`}>
                {navLinks.map((link) => (
                  link.hasDropdown ? (
                    <div key={link.href} className="relative group/dropdown">
                      <a
                        href={link.href}
                        className={`relative px-4 py-2 text-[13px] rounded-full transition-all duration-400 flex items-center gap-1 ${
                          scrolled
                            ? "text-white/70 hover:text-primary hover:bg-white/[0.06]"
                            : "text-white/60 hover:text-primary hover:bg-white/[0.08]"
                        }`}
                      >
                        {link.label}
                        <svg className="w-3 h-3 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                      </a>
                      {/* Dropdown */}
                      <div className="absolute top-full right-0 pt-2 opacity-0 invisible group-hover/dropdown:opacity-100 group-hover/dropdown:visible transition-all duration-300">
                        <div className="bg-navy-dark rounded-2xl shadow-card-hover border border-white/[0.08] py-3 min-w-[220px]">
                          {serviceSubLinks.map((sub) => (
                            <a
                              key={sub.href}
                              href={sub.href}
                              className="block px-5 py-2.5 text-[13px] text-white/70 hover:text-primary hover:bg-white/[0.05] transition-all duration-300"
                            >
                              {sub.label}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <a
                      key={link.href}
                      href={link.href}
                      className={`relative px-4 py-2 text-[13px] rounded-full transition-all duration-400 ${
                        scrolled
                          ? "text-white/70 hover:text-primary hover:bg-white/[0.06]"
                          : "text-white/60 hover:text-primary hover:bg-white/[0.08]"
                      }`}
                    >
                      {link.label}
                    </a>
                  )
                ))}
              </nav>

              {/* CTA */}
              <div className="flex items-center gap-4">
                <a
                  href="/contact"
                  className={`hidden lg:flex items-center gap-2 text-[13px] font-medium px-5 py-2.5 rounded-full transition-all duration-500 ${
                    scrolled
                      ? "bg-primary text-navy-deeper hover:bg-primary-dark hover:shadow-glow"
                      : "bg-white/10 backdrop-blur-md text-white border border-white/15 hover:bg-white/20"
                  }`}
                >
                  <span>تواصل معنا</span>
                </a>

                {/* Mobile toggle */}
                <button
                  onClick={() => setMobileOpen(!mobileOpen)}
                  className="lg:hidden w-10 h-10 flex items-center justify-center"
                  aria-label="Toggle menu"
                >
                  <div className="flex flex-col items-end gap-1.5 w-6">
                    <span className={`h-[1.5px] transition-all duration-500 ease-expo-out ${scrolled ? "bg-primary" : "bg-white"} ${mobileOpen ? "w-6 rotate-45 translate-y-[5px]" : "w-6"}`} />
                    <span className={`h-[1.5px] transition-all duration-500 ease-expo-out ${scrolled ? "bg-primary" : "bg-white"} ${mobileOpen ? "w-0 opacity-0" : "w-4"}`} />
                    <span className={`h-[1.5px] transition-all duration-500 ease-expo-out ${scrolled ? "bg-primary" : "bg-white"} ${mobileOpen ? "w-6 -rotate-45 -translate-y-[5px]" : "w-5"}`} />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Fullscreen Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 40px) 40px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
            transition={{ duration: 0.8, ease: [0.87, 0, 0.13, 1] }}
            className="fixed inset-0 z-40 bg-navy-deeper lg:hidden flex items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="text-3xl text-white/70 hover:text-primary transition-colors duration-300 py-2"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-10 w-12 h-px bg-primary"
              />
              <motion.a
                href="/contact"
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="mt-6 text-primary text-lg"
              >
                تواصل معنا
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
