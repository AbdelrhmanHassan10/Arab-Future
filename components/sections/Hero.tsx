"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative h-[100dvh] min-h-[700px] overflow-hidden bg-navy-deeper flex items-center justify-center"
    >
      {/* Parallax Background */}
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0 w-full h-full will-change-transform"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/videos/202607280250.mp4" type="video/mp4" />
        </video>

        {/* Advanced Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deeper/80 via-navy-deeper/50 to-navy-deeper/95" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-60" />
      </motion.div>

      {/* Main Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 container-wide px-6 w-full flex flex-col items-center justify-center text-center mt-12"
      >
        {/* Glowing Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card-dark border border-primary/30 shadow-[0_0_15px_rgba(191,154,95,0.2)] mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          <span className="text-xs font-medium text-white/90 tracking-widest uppercase font-body">
            Semsar Beni Suef
          </span>
        </motion.div>

        {/* Massive Typography */}
        <div className="relative mb-6 w-full max-w-5xl mx-auto">


          <motion.h1
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease, delay: 0.4 }}
            className="relative text-[clamp(2.5rem,6vw,5rem)] font-bold text-white leading-[1.1] mb-2"
          >
            بيتك الجديد أو تشطيب وحدتك... <br />
            <span className="text-primary">
              كله في مكان واحد
            </span>
          </motion.h1>
        </div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.6 }}
          className="text-base md:text-lg text-white/60 font-light leading-[1.9] max-w-2xl mx-auto mb-10"
        >
          نساعدك في العثور على الوحدة المناسبة، ونقدم لك خدمات تشطيب متكاملة داخل بني سويف.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6"
        >
          <Link href="/units" className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary text-navy-deeper font-bold rounded-full overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(191,154,95,0.4)]">
            <span className="relative z-10 text-[15px]">تصفح الوحدات</span>
            <div className="relative z-10 w-6 h-6 rounded-full bg-navy-deeper/10 flex items-center justify-center group-hover:bg-navy-deeper/20 transition-colors">
              <svg className="w-3.5 h-3.5 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
              </svg>
            </div>
          </Link>
          <Link href="/contact" className="group px-8 py-4 text-[15px] font-medium text-white/80 hover:text-white transition-colors duration-300">
            <span className="relative">
              اطلب استشارة
              <span className="absolute -bottom-1 right-0 w-0 h-[2px] bg-primary transition-all duration-500 group-hover:w-full" />
            </span>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
