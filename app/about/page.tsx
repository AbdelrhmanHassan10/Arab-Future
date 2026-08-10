"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ease = [0.16, 1, 0.3, 1] as const;

// --- 1. Reusable Glowing Pill Header ---
function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="flex flex-col items-center justify-center text-center mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card-dark border border-primary/30 shadow-[0_0_15px_rgba(191,154,95,0.2)] mb-6"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
        </span>
        <span className="text-xs font-medium text-white/90 tracking-widest uppercase font-body">
          {subtitle}
        </span>
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.1, ease }}
        className="text-[clamp(2rem,4vw,3.5rem)] font-bold text-white leading-tight"
      >
        {title.split(' ').map((word, i, arr) => (
          i === arr.length - 1 ? <span key={i} className="text-primary"> {word}</span> : <span key={i}>{word} </span>
        ))}
      </motion.h2>
    </div>
  );
}

// --- 2. Marquee Component ---
function PartnersMarquee() {
  const partners = [
    "إعمار مصر", "طلعت مصطفى", "بالم هيلز", "سوديك", "أورا للتطوير", "ماونتن فيو", "مصر إيطاليا", "تطوير مصر"
  ];
  
  return (
    <div className="py-12 border-y border-white/5 bg-white/[0.01] overflow-hidden flex relative" dir="ltr">
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-navy-deeper to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-navy-deeper to-transparent z-10" />
      
      <motion.div 
        animate={{ x: [0, "-50%"] }}
        transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
        className="flex w-max"
      >
        {[...Array(2)].map((_, idx) => (
          <div key={idx} className="flex gap-16 pr-16 items-center w-max">
            {partners.map((partner, i) => (
              <div key={i} className="flex items-center gap-4 text-white/40 hover:text-white transition-colors duration-300">
                <span className="w-2 h-2 rounded-full bg-primary/40" />
                <span className="text-xl md:text-2xl font-bold tracking-wide whitespace-nowrap">{partner}</span>
              </div>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function AboutPage() {
  const heroRef = useRef(null);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  // Client Journey Data
  const journeySteps = [
    { 
      title: "الاستشارة الأولى", 
      desc: "جلسة لفهم متطلباتك وميزانيتك بدقة.", 
      icon: (
        <svg className="w-6 h-6 text-primary drop-shadow-[0_0_8px_rgba(191,154,95,0.5)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
        </svg>
      )
    },
    { 
      title: "تحليل السوق", 
      desc: "نبحث في قاعدة بياناتنا الواسعة لاختيار أنسب الخيارات.", 
      icon: (
        <svg className="w-6 h-6 text-primary drop-shadow-[0_0_8px_rgba(191,154,95,0.5)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
      )
    },
    { 
      title: "المعاينات", 
      desc: "جولات ميدانية لرؤية العقارات على أرض الواقع.", 
      icon: (
        <svg className="w-6 h-6 text-primary drop-shadow-[0_0_8px_rgba(191,154,95,0.5)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6.75h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
        </svg>
      )
    },
    { 
      title: "التفاوض وإتمام العقد", 
      desc: "نضمن لك أفضل سعر وأكثر شروط العقد أماناً.", 
      icon: (
        <svg className="w-6 h-6 text-primary drop-shadow-[0_0_8px_rgba(191,154,95,0.5)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12" />
        </svg>
      )
    },
    { 
      title: "استلام العقار", 
      desc: "نحتفل معك باستلام مفاتيح مستقبلك الجديد.", 
      icon: (
        <svg className="w-6 h-6 text-primary drop-shadow-[0_0_8px_rgba(191,154,95,0.5)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
        </svg>
      )
    },
  ];

  // Core Values Data
  const values = [
    { 
      title: "الشفافية المطلقة", 
      desc: "وضوح تام في كافة التعاملات والأسعار دون رسوم خفية.", 
      icon: (
        <svg className="w-7 h-7 text-primary drop-shadow-[0_0_10px_rgba(191,154,95,0.5)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
        </svg>
      )
    },
    { 
      title: "العميل أولاً", 
      desc: "مصلحة العميل هي البوصلة التي توجه كافة قراراتنا.", 
      icon: (
        <svg className="w-7 h-7 text-primary drop-shadow-[0_0_10px_rgba(191,154,95,0.5)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
        </svg>
      )
    },
    { 
      title: "الاحترافية", 
      desc: "فريق عمل مدرب على أعلى مستوى لتقديم استشارات مبنية على أرقام.", 
      icon: (
        <svg className="w-7 h-7 text-primary drop-shadow-[0_0_10px_rgba(191,154,95,0.5)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
        </svg>
      )
    },
    { 
      title: "التطور المستمر", 
      desc: "نواكب دائماً أحدث متغيرات السوق العقاري لتقديم الأفضل.", 
      icon: (
        <svg className="w-7 h-7 text-primary drop-shadow-[0_0_10px_rgba(191,154,95,0.5)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.499 4.499 0 0 0-1.757 4.306 4.499 4.499 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
        </svg>
      )
    },
  ];

  // Team Data
  const team = [
    { name: "أحمد حسن", role: "مستشار استثماري أول", img: "/projects/project-15.png" },
    { name: "سارة محمود", role: "مديرة المبيعات", img: "/projects/project-16.png" },
    { name: "عمر فاروق", role: "خبير التسويق العقاري", img: "/projects/project-17.png" },
  ];

  return (
    <main className="min-h-screen bg-navy-deeper selection:bg-primary/30 selection:text-white overflow-hidden">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section ref={heroRef} className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-navy-deeper">
          <div className="absolute inset-0 bg-[url('/projects/project-1.png')] bg-cover bg-center opacity-[0.03] mix-blend-overlay" />
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[150px] mix-blend-screen animate-float opacity-50" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#CBA365]/10 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow opacity-50" />
        </div>

        <div className="container-wide px-6 relative z-10 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease }}
            className="mb-8"
          >
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border border-primary/20 flex items-center justify-center mx-auto mb-8 bg-white/5 backdrop-blur-xl shadow-glow">
              <img src="/images/logo.png" alt="سمسار مصر" className="w-16 h-16 md:w-20 md:h-20 object-contain drop-shadow-2xl" />
            </div>
            
            <div className="overflow-hidden">
              <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/60 leading-[1.1] mb-6 drop-shadow-2xl">
                سمسار مصر
              </h1>
              <p className="text-xl md:text-2xl text-white/60 font-light max-w-2xl mx-auto leading-relaxed">
                رؤية عقارية… تتجاوز التوقعات
              </p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="mt-20 animate-bounce text-white/40"
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </div>
      </section>

      {/* --- BENTO GRID INTRODUCTION --- */}
      <section className="py-24 relative">
        <div className="container-wide px-6 relative z-10">
          <SectionHeader subtitle="Our Story" title="تاريخ من الثقة والإتقان" />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto auto-rows-[250px]">
            {/* Main Intro Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1, ease }}
              className="col-span-1 md:col-span-2 lg:col-span-2 row-span-1 md:row-span-2 glass-card-dark rounded-[2rem] p-8 md:p-12 border border-white/5 relative overflow-hidden group flex flex-col justify-between"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/20 transition-colors duration-700" />
              <svg className="w-12 h-12 text-primary/40 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6.75h1.5m-1.5 3h1.5m-1.5 3h1.5M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
              </svg>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">من نحن</h3>
                <p className="text-white/60 leading-[1.9] text-sm md:text-base">
                  سمسار مصر ليست مجرد شركة وساطة عقارية، بل هي كيان استشاري متكامل يضع بين يديك خلاصة خبرات ممتدة في السوق العقاري المصري. نحن نؤمن بأن العقار هو الاستثمار الأهم في حياة الفرد، لذلك نلتزم بتقديم حلول متكاملة تضمن لعملائنا اختيار الأنسب.
                </p>
              </div>
            </motion.div>

            {/* Stat Card 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2, ease }}
              className="col-span-1 lg:col-span-1 row-span-1 glass-card-dark rounded-[2rem] p-8 border border-white/5 flex flex-col items-center justify-center text-center group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-500" />
              <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 mb-2 group-hover:scale-110 transition-transform duration-500">10+</span>
              <span className="text-primary font-medium tracking-widest text-sm uppercase">سنوات خبرة</span>
            </motion.div>

            {/* Stat Card 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3, ease }}
              className="col-span-1 lg:col-span-1 row-span-1 bg-primary rounded-[2rem] p-8 flex flex-col items-center justify-center text-center group shadow-glow"
            >
              <span className="text-5xl font-black text-navy-deeper mb-2 group-hover:scale-110 transition-transform duration-500">500+</span>
              <span className="text-navy-deeper/70 font-bold tracking-widest text-sm uppercase">عميل سعيد</span>
            </motion.div>

            {/* Quality & Standards Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4, ease }}
              className="col-span-1 md:col-span-3 lg:col-span-2 row-span-1 glass-card-dark rounded-[2rem] p-8 border border-white/5 relative overflow-hidden flex items-end group"
            >
               <div className="absolute inset-0 opacity-20 bg-[url('/projects/project-3.png')] bg-cover bg-center grayscale mix-blend-overlay transition-transform duration-1000 group-hover:scale-110" />
               <div className="absolute inset-0 bg-gradient-to-t from-navy-deeper to-transparent" />
               <div className="relative z-10">
                 <h4 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">تغطية جغرافية شاملة</h4>
                 <p className="text-white/60 text-sm">نغطي أرقى أحياء التجمع الخامس، زايد، العاصمة الإدارية، وغيرها من المواقع الحيوية.</p>
               </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- CORE VALUES SECTION --- */}
      <section className="py-24 relative overflow-hidden bg-[#0a0f1c]">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/[0.02] rounded-full blur-[100px] pointer-events-none" />
        <div className="container-wide px-6 relative z-10">
          <SectionHeader subtitle="Core Values" title="قيمنا الجوهرية" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {values.map((val, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease }}
                className="glass-card-dark p-8 rounded-[2rem] border border-white/5 hover:border-primary/30 transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl mb-6 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                  {val.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{val.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- INTERACTIVE CLIENT JOURNEY --- */}
      <section className="py-32 relative overflow-hidden" ref={containerRef}>
        <div className="absolute left-0 top-1/2 w-[500px] h-[500px] bg-primary/[0.03] rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />
        <div className="container-wide px-6 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            
            <div className="lg:w-1/3">
              <SectionHeader subtitle="Your Journey" title="رحلتك معنا نحو عقار أحلامك" />
              <p className="text-white/60 leading-relaxed text-center lg:text-right max-w-md mx-auto lg:mx-0">
                منذ اللحظة الأولى لتواصلك معنا وحتى استلام مفاتيح عقارك، نرافقك خطوة بخطوة لنضمن لك تجربة استثمارية خالية من المتاعب.
              </p>
            </div>

            <div className="lg:w-2/3 relative">
              {/* Vertical glowing line */}
              <div className="absolute top-0 bottom-0 right-[27px] md:right-1/2 md:translate-x-1/2 w-1 bg-white/5 rounded-full overflow-hidden hidden md:block">
                <motion.div 
                   style={{ y }} 
                   className="w-full h-1/2 bg-gradient-to-b from-transparent via-primary to-transparent" 
                />
              </div>

              <div className="space-y-12">
                {journeySteps.map((step, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: i % 2 === 0 ? 30 : -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, ease }}
                    className={`relative flex items-center gap-8 ${i % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"}`}
                  >
                    {/* Icon Circle */}
                    <div className="hidden md:flex absolute right-0 md:right-1/2 md:translate-x-1/2 w-14 h-14 rounded-full bg-navy-deeper border-4 border-[#0a0f1c] items-center justify-center z-10 shadow-[0_0_20px_rgba(191,154,95,0.2)]">
                      <span className="text-xl">{step.icon}</span>
                    </div>

                    {/* Content Card */}
                    <div className="w-full md:w-1/2">
                      <div className={`glass-card-dark p-6 rounded-[2rem] border border-white/5 hover:border-primary/20 transition-colors ${i % 2 === 0 ? "md:mr-12" : "md:ml-12"}`}>
                        <div className="flex items-center gap-4 mb-2">
                          <span className="text-2xl md:hidden">{step.icon}</span>
                          <span className="text-primary/50 text-xs font-bold tracking-widest font-body">STEP 0{i + 1}</span>
                        </div>
                        <h4 className="text-xl font-bold text-white mb-2">{step.title}</h4>
                        <p className="text-white/60 text-sm leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- LEADERSHIP & TEAM SECTION --- */}
      <section className="py-24 relative bg-navy-deeper/50">
        <div className="container-wide px-6 relative z-10">
          <SectionHeader subtitle="Our Experts" title="فريق الخبراء" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {team.map((member, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease }}
                className="relative group rounded-[2.5rem] overflow-hidden aspect-[3/4]"
              >
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url('${member.img}')` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deeper via-navy-deeper/20 to-transparent opacity-80" />
                
                <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h4 className="text-2xl font-bold text-white mb-1 group-hover:text-primary transition-colors">{member.name}</h4>
                  <p className="text-white/70 text-sm mb-4">{member.role}</p>
                  
                  <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    <button className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-primary hover:text-navy-deeper transition-colors">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                    </button>
                    <button className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-primary hover:text-navy-deeper transition-colors">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CEO MESSAGE --- */}
      <section className="py-24 relative overflow-hidden">
        <div className="container-wide px-6 relative z-10">
          <div className="max-w-6xl mx-auto glass-card-dark rounded-[3rem] border border-white/5 overflow-hidden flex flex-col lg:flex-row shadow-[0_0_40px_rgba(191,154,95,0.03)]">
            
            <div className="lg:w-2/5 relative min-h-[400px] lg:min-h-[500px]">
              <div className="absolute inset-0 bg-[url('/projects/project-14.png')] bg-cover bg-center" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deeper via-navy-deeper/40 to-transparent lg:bg-gradient-to-r" />
            </div>

            <div className="lg:w-3/5 p-10 md:p-16 flex flex-col justify-center relative bg-white/[0.01]">
              <svg className="absolute top-10 right-10 w-20 h-20 text-white/5 rotate-180" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card-dark border border-white/10 mb-6">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-xs text-white/80 uppercase font-body tracking-widest">CEO Message</span>
                </div>
                
                <h3 className="text-3xl font-bold text-white mb-6">كلمة الإدارة</h3>
                <p className="text-lg md:text-xl text-white/80 leading-[2] font-light mb-8 italic">
                  "في سمسار مصر، نحن لا نبيع مجرد جدران وأسقف، بل نصنع مستقبلاً ونؤسس لحياة أفضل. كل عميل يضع ثقته فينا يمنحنا شرفاً ومسؤولية كبرى. هدفنا الدائم هو أن نظل المستشار المؤتمن الذي يرشدك نحو الخيار الأمثل، سواء كنت تبحث عن منزل لعائلتك أو استثمار يؤمن مستقبلك."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xl">
                    M
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg mb-0.5">محمد عبد الرحمن</h4>
                    <span className="text-primary/70 text-xs font-body uppercase tracking-wider">المدير التنفيذي</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-32 relative">
         <div className="container-wide px-6 relative z-10 text-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, ease }}
              className="max-w-4xl mx-auto glass-card-dark rounded-[3rem] p-12 md:p-20 border border-primary/20 relative overflow-hidden shadow-glow"
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-60 animate-pulse-slow" />
              
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 relative z-10">
                مستعد لاتخاذ <span className="text-primary">قرارك الاستثماري؟</span>
              </h2>
              <p className="text-white/60 mb-10 max-w-xl mx-auto leading-relaxed relative z-10">
                فريقنا من المستشارين العقاريين جاهز دائماً للرد على استفساراتك ومساعدتك في اختيار العقار الأنسب لاحتياجاتك.
              </p>
              
              <a href="/contact" className="relative z-10 inline-flex items-center justify-center gap-3 px-10 py-5 bg-primary text-navy-deeper font-bold rounded-full overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(191,154,95,0.4)] group">
                <span className="relative z-10 text-[16px]">تواصل معنا الآن</span>
                <div className="relative z-10 w-8 h-8 rounded-full bg-navy-deeper/10 flex items-center justify-center transition-colors group-hover:bg-navy-deeper/20">
                  <svg className="w-4 h-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                  </svg>
                </div>
              </a>
            </motion.div>
         </div>
      </section>

      {/* --- MARQUEE SECTION --- */}
      <PartnersMarquee />

      <Footer />
    </main>
  );
}
