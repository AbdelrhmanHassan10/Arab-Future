"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const navLinks = [
  { label: "الرئيسية", href: "/" },
  { label: "الوحدات", href: "/units" },
  { label: "التشطيبات", href: "/finishing" },
  { label: "أعمالنا", href: "/our-work" },
  { label: "من نحن", href: "/about" },
  { label: "الأسئلة الشائعة", href: "/faq" },
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
        <div className={`transition-all duration-700 ease-expo-out ${scrolled ? "py-2 px-4 md:px-6 lg:px-8" : "py-4 md:py-5 px-6 md:px-10 lg:px-16 xl:px-24"
          }`}>
          <div className={`transition-all duration-700 ease-expo-out ${scrolled
            ? "max-w-[1340px] mx-auto bg-navy-dark/90 backdrop-blur-2xl rounded-full shadow-card px-6 md:px-8 py-3 border border-white/[0.08]"
            : ""
            }`}>
            <div className={`flex items-center justify-between ${!scrolled ? "max-w-[1340px] mx-auto" : ""}`}>
              {/* Logo */}
              <Link href="/" className="group flex items-center gap-5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/samsar_logo_transparent.png" alt="سمسار بني سويف" className="w-16 h-16 md:w-24 md:h-22 object-contain transition-transform duration-500 group-hover:scale-105" />
                
                {/* Separator */}
                <div className="w-[2px] h-16 bg-white/50 rounded-full hidden md:block"></div>
                <div className="w-[2px] h-12 bg-white/50 rounded-full md:hidden"></div>

                <div className="flex flex-col justify-center">
                  <span className="font-bold text-lg md:text-xl block leading-none text-white font-arabic mb-1">
                    سمسار بني سويف
                  </span>
                  <span className="text-[9px] md:text-[10px] tracking-[0.25em] uppercase block font-body text-primary font-bold">
                    Semsar Beni Suef
                  </span>
                </div>
              </Link>

              {/* Desktop Nav — centered pill */}
              <nav className={`hidden lg:flex items-center gap-1 transition-all duration-700 ${scrolled
                ? ""
                : "bg-white/[0.06] backdrop-blur-md rounded-full px-2 py-1.5 border border-white/[0.08]"
                }`}>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-4 py-2 text-[13px] rounded-full transition-all duration-400 ${scrolled
                      ? "text-white/70 hover:text-primary hover:bg-white/[0.06]"
                      : "text-white/60 hover:text-primary hover:bg-white/[0.08]"
                      }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              {/* CTA */}
              <div className="flex items-center gap-4">
                <Link
                  href="/contact"
                  className={`hidden lg:flex items-center gap-2 text-[13px] font-medium px-5 py-2.5 rounded-full transition-all duration-500 ${scrolled
                    ? "bg-primary text-navy-deeper hover:bg-primary-dark hover:shadow-glow"
                    : "bg-white/10 backdrop-blur-md text-white border border-white/15 hover:bg-white/20"
                    }`}
                >
                  <span>تواصل معنا</span>
                </Link>

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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-navy-deeper/80 backdrop-blur-md lg:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              variants={{
                closed: { opacity: 0, y: "-100%" },
                open: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.6,
                    ease: [0.76, 0, 0.24, 1],
                    staggerChildren: 0.08,
                    delayChildren: 0.2
                  }
                }
              }}
              initial="closed"
              animate="open"
              exit="closed"
              onClick={(e) => e.stopPropagation()}
              className="w-full bg-navy-deeper flex flex-col pt-24 pb-10 px-6 rounded-b-[2rem] shadow-[0_30px_60px_rgba(0,0,0,0.6)] border-b border-white/10"
            >
              <nav className="flex flex-col gap-2 w-full" dir="rtl">
                {navLinks.map((link) => (
                  <motion.div
                    key={link.href}
                    variants={{
                      closed: { opacity: 0, x: 30 },
                      open: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
                    }}
                    className="w-full"
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="group flex items-center justify-between text-2xl font-bold text-white/80 hover:text-primary transition-colors duration-300 py-4 border-b border-white/10"
                    >
                      {link.label}
                      <svg className="w-5 h-5 opacity-0 translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                      </svg>
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  variants={{
                    closed: { opacity: 0, y: 20 },
                    open: { opacity: 1, y: 0 }
                  }}
                  className="mt-8 w-full"
                >
                  <Link
                    href="/contact"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center gap-2 w-full bg-primary text-navy-deeper text-lg font-bold py-4 rounded-xl shadow-glow hover:bg-primary-dark transition-all duration-300"
                  >
                    تواصل معنا
                  </Link>
                </motion.div>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
