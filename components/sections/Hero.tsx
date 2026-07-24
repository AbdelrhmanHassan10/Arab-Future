"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function Hero() {
  const imageRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!imageRef.current) return;
      const y = window.scrollY;
      setScrollY(y);
      imageRef.current.style.transform = `translateY(${y * 0.15}px) scale(${1 + y * 0.0002})`;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];
  const heroOpacity = Math.max(0, 1 - scrollY / 600);

  return (
    <section
      id="hero"
      className="relative h-[100dvh] min-h-[600px] overflow-hidden bg-navy-deeper"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <div ref={imageRef} className="absolute inset-0 will-change-transform">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('/images/hero.jpeg')`,
            }}
          />
        </div>
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(160deg, rgba(18,19,31,0.92) 0%, rgba(43,45,66,0.78) 50%, rgba(18,19,31,0.95) 100%)",
          }}
        />
        {/* Gradient orbs */}
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/3 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      </div>

      {/* Content */}
      <div
        className="relative z-10 h-full flex flex-col justify-center"
        style={{ opacity: heroOpacity }}
      >
        <div className="px-6 md:px-10 lg:px-16 xl:px-24">
          <div className="max-w-[1340px] mx-auto">
            <div className="max-w-3xl">
              {/* Eyebrow */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease, delay: 0.3 }}
                className="flex items-center gap-3 mb-6"
              >
                <div className="w-8 h-[2px] bg-primary" />
                <span className="text-[13px] text-white/60 tracking-wide font-arabic">
                  Arab Future Ltd
                </span>
              </motion.div>

              {/* Headline */}
              <div className="mb-6">
                <div className="overflow-hidden">
                  <motion.h1
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 1, ease, delay: 0.5 }}
                    className="text-[clamp(2.2rem,5.5vw,4.5rem)] font-bold text-white leading-[1.15] will-change-transform"
                  >
                    رؤية تُرى…
                  </motion.h1>
                </div>
                <div className="h-3 md:h-4" />
                <div className="overflow-hidden">
                  <motion.h1
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 1, ease, delay: 0.65 }}
                    className="text-[clamp(2.2rem,5.5vw,4.5rem)] font-bold text-primary leading-[1.15] will-change-transform"
                  >
                    وأثر يدوم
                  </motion.h1>
                </div>
              </div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease, delay: 0.9 }}
                className="text-[15px] md:text-base text-white/50 font-light leading-[1.95] mb-10 max-w-xl"
              >
                خبرة متكاملة في الديكورات مسبقة الصنع، من الفكرة وحتى التنفيذ
                الكامل للواجهات والديكورات، وترميم المباني ذات القيمة التاريخية والمعمارية
              </motion.p>

              {/* Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease, delay: 1.1 }}
                className="flex flex-wrap items-center gap-4"
              >
                <a href="/projects" className="btn-primary">
                  <span>استكشف مشاريعنا</span>
                  <svg
                    className="w-4 h-4 rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                    />
                  </svg>
                </a>
                <a href="/contact" className="btn-ghost">
                  <span>تواصل معنا</span>
                </a>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Stats bar at bottom - glassmorphism */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 1.4 }}
          className="absolute bottom-0 left-0 right-0 glass-dark"
        >
          <div className="px-6 md:px-10 lg:px-16 xl:px-24">
            <div className="max-w-[1340px] mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/[0.06] rtl:divide-x-reverse">
                {[
                  { number: "12+", label: "سنة خبرة" },
                  { number: "350+", label: "مشروع منجز" },
                  { number: "50+", label: "عميل" },
                  { number: "100%", label: "التزام بالجودة" },
                ].map((stat, i) => (
                  <div key={i} className="py-5 md:py-6 text-center">
                    <div className="text-xl md:text-2xl font-bold text-white font-body tabular-nums">
                      {stat.number}
                    </div>
                    <div className="text-white/35 text-xs mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
