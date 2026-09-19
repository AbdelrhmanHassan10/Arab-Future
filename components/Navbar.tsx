"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  FiSearch, FiMenu, FiX, FiPhone, FiMail,
  FiHome, FiGrid, FiMapPin, FiInfo, FiHeadphones, FiStar, FiChevronLeft
} from "react-icons/fi";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const isHome = pathname === '/';

  useEffect(() => {
    setMounted(true);
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const isAtBottom = window.innerHeight + currentScrollY >= document.documentElement.scrollHeight - 100;
      
      setScrolled(currentScrollY > 20);

      if (!isHome) {
        setIsVisible(true);
        setLastScrollY(currentScrollY);
        return;
      }

      // Handle hide on scroll down for Home page
      if (currentScrollY < 10) {
        setIsVisible(true);
      } else if (isAtBottom) {
        setIsVisible(false);
      } else if (currentScrollY > lastScrollY && currentScrollY > 150) {
        setIsVisible(false); // Hide
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true); // Show
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastScrollY, isHome]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMobileMenuOpen]);

  const links = [
    { name: "الرئيسية", href: "/", icon: <FiHome className="text-[22px]" /> },
    { name: "المشروعات", href: "/projects", icon: <FiGrid className="text-[22px]" /> },
    { name: "العقارات", href: "/units", icon: <FiMapPin className="text-[22px]" /> },
    { name: "من نحن", href: "/about", icon: <FiInfo className="text-[22px]" /> },
    { name: "الخدمات", href: "/services", icon: <FiHeadphones className="text-[22px]" /> },
    { name: "المدونة", href: "/blog", icon: <FiStar className="text-[22px]" /> },
    { name: "اتصل بنا", href: "/contact", icon: <FiMail className="text-[22px]" /> },
  ];

  // Determine if the current page has a light background at the top
  const isLightTop = 
    pathname === '/our-work' || 
    pathname === '/finishing' || 
    pathname === '/faq' || 
    pathname === '/terms' || 
    pathname === '/privacy';

  return (
    <>
      <header 
        className={`${isHome ? 'fixed' : 'absolute'} w-full z-50 transition-all duration-500 ${
          isHome && !isVisible ? "-top-[120%]" : "top-0"
        } ${
          scrolled && isHome
            ? "bg-white/95 backdrop-blur-xl shadow-sm border-b border-gray-100 py-2 md:py-3" 
            : "bg-transparent py-4"
        }`}
        dir="rtl"
      >
        <div className="container-custom mx-auto flex items-center justify-between px-4 lg:px-8">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center relative z-10 group"
          >
            <img 
              src="/9ad8ad5c-11aa-49e7-aab4-bb775b6bb248.png" 
              alt="أكواد العقاريه" 
              className={`h-12 md:h-[3.2rem] lg:h-[3.5rem] w-auto object-contain relative z-10 transition-all duration-500 group-hover:scale-105 scale-125 lg:scale-125 origin-right ${
                !(scrolled && isHome || isLightTop) 
                  ? "brightness-0 invert opacity-95 hover:opacity-100" 
                  : ""
              }`}
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className={`hidden lg:flex items-center gap-8 text-[15px] font-medium transition-colors duration-300 ${scrolled && isHome || isLightTop ? "text-gray-600" : "text-white/90"}`}>
            {links.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  className={`transition-all duration-300 relative group ${
                    isActive 
                      ? ((scrolled && isHome) || isLightTop ? "text-[#148968] font-bold" : "text-[#20d09f] font-bold")
                      : "hover:text-[#20d09f]"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#20d09f]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Actions & Mobile Menu Toggle */}
          <div className="flex items-center gap-3 md:gap-5">
            <Link href="/contact" className={`hidden md:flex px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 ${
              (scrolled && isHome) || isLightTop
                ? "bg-[#082b26] text-white hover:bg-[#148968]" 
                : "bg-[#20d09f] text-[#082b26] hover:bg-white"
            }`}>
              استشارة مجانية
            </Link>

            <button 
              className={`lg:hidden p-2 transition-all duration-300 rounded-full flex items-center justify-center ${
                (scrolled && isHome) || isLightTop
                  ? "text-[#082b26] hover:bg-gray-100" 
                  : "text-white hover:bg-white/10"
              }`}
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <FiMenu className="text-3xl" />
            </button>
          </div>
        </div>
      </header>

      {/* Elegant & Clean Mobile Menu Overlay - Portaled to escape transform context */}
      {mounted && createPortal(
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed inset-0 z-[9999] bg-[#edf6f2] flex flex-col overflow-hidden overscroll-none touch-none"
              dir="rtl"
            >
              {/* Soft Background Graphics */}
              <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-40">
                <div className="absolute top-[-100px] right-[-50px] w-[300px] h-[300px] bg-[#d5ede1] rounded-full blur-[80px]" />
                <div className="absolute bottom-[-100px] left-[-50px] w-[300px] h-[300px] bg-[#d5ede1] rounded-full blur-[80px]" />
              </div>

              {/* Curved Header */}
              <div className="relative z-10 flex items-center justify-between px-4 py-4 bg-[#082b26] rounded-b-[1.5rem] shadow-[0_10px_30px_rgba(8,43,38,0.1)] shrink-0">
                <div className="flex flex-col">
                  <span className="font-extrabold text-[20px] text-white leading-none mb-1 flex items-center gap-1.5">
                    <FiHome className="text-[#20d09f] text-lg" />
                    أكواد العقاريه
                  </span>
                  <span className="text-[#20d09f] text-[9px] font-bold tracking-wide">عقارك .. بأمان</span>
                </div>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 shadow-sm transition-colors"
                >
                  <FiX className="text-xl" />
                </button>
              </div>

              {/* Navigation Links List */}
              <div className="relative z-10 flex flex-col px-4 mt-3 gap-1.5 shrink-0">
                {links.map((link) => {
                  const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                  return (
                    <Link 
                      key={link.name}
                      href={link.href} 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center justify-between px-4 py-2.5 rounded-xl transition-colors ${
                        isActive 
                          ? "bg-[#082b26] text-white shadow-md" 
                          : "bg-[#e2efe9] text-[#082b26] hover:bg-white"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-7 h-7 rounded-full flex items-center justify-center ${isActive ? 'bg-white/10' : 'bg-white text-[#148968] shadow-sm'}`}>
                          {/* Scale down the imported icons safely via a wrapper */}
                          <span className="scale-[0.8]">{link.icon}</span>
                        </span>
                        <span className="text-[14px] font-bold">{link.name}</span>
                      </div>
                      <FiChevronLeft className={`text-base ${isActive ? 'text-white/50' : 'text-gray-400'}`} />
                    </Link>
                  );
                })}
              </div>

              <div className="flex-1"></div>

              {/* Bottom Banner - Compact */}
              <div className="relative z-10 mx-4 mt-auto mb-3 rounded-2xl overflow-hidden shadow-md border border-[#148968]/20 shrink-0">
                <div className="absolute inset-0 bg-gradient-to-r from-[#148968] to-[#082b26] z-0">
                  <img 
                    src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800" 
                    alt="Villa" 
                    className="w-full h-full object-cover opacity-20 mix-blend-overlay" 
                  />
                </div>
                <div className="relative z-10 p-3.5 flex items-center justify-between text-right">
                  <div>
                    <h3 className="text-white text-[14px] font-extrabold mb-0.5">اكتشف أفضل العقارات</h3>
                    <p className="text-[#20d09f] text-[10px] font-semibold">فرص استثمارية حقيقية</p>
                  </div>
                  <Link 
                    href="/projects" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center w-9 h-9 bg-[#20d09f] text-[#082b26] rounded-full shadow-md hover:scale-105 transition-transform shrink-0"
                  >
                    <FiChevronLeft className="text-lg" />
                  </Link>
                </div>
              </div>

              {/* Footer Contact Info */}
              <div className="relative z-10 px-4 pb-[calc(1rem+env(safe-area-inset-bottom))] flex items-center justify-between gap-3 shrink-0">
                <a href="tel:+201008450553" className="flex-1 flex flex-col items-center justify-center gap-1 bg-white py-2.5 rounded-xl shadow-[0_5px_15px_rgba(8,43,38,0.05)] border border-gray-100 hover:border-[#20d09f] transition-colors">
                  <div className="w-7 h-7 rounded-full bg-[#edf6f2] flex items-center justify-center text-[#148968]">
                    <FiPhone className="text-sm" />
                  </div>
                  <span className="text-[11px] font-bold text-[#082b26]" dir="ltr">+20 100 845 0553</span>
                </a>
                <a href="mailto:info@alharagawy.com" className="flex-1 flex flex-col items-center justify-center gap-1 bg-white py-2.5 rounded-xl shadow-[0_5px_15px_rgba(8,43,38,0.05)] border border-gray-100 hover:border-[#20d09f] transition-colors">
                  <div className="w-7 h-7 rounded-full bg-[#edf6f2] flex items-center justify-center text-[#148968]">
                    <FiMail className="text-sm" />
                  </div>
                  <span className="text-[10px] font-bold text-[#082b26]">info@alharagawy.com</span>
                </a>
              </div>

            </motion.div>
          )}
        </AnimatePresence>, 
        document.body
      )}
    </>
  );
}
