"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { FiHome, FiCheckCircle, FiTrendingUp, FiTarget, FiUsers } from "react-icons/fi";
import avatarImage from '../../avatar1.jpeg';
import { useRef } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ease = [0.16, 1, 0.3, 1] as const;

function SectionHeader({ title, subtitle, align = "center" }: { title: string; subtitle: string; align?: "center" | "start" }) {
  return (
    <div className={`flex flex-col ${align === "center" ? "items-center text-center" : "items-start text-right"} mb-16`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease }}
        className="flex items-center gap-3 mb-4"
      >
        <span className="w-8 h-1 bg-[#148968] rounded-full"></span>
        <span className="text-[#148968] font-bold text-[13px] tracking-widest uppercase">
          {subtitle}
        </span>
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.1, ease }}
        className="text-[clamp(2rem,4vw,3.5rem)] font-bold leading-tight text-[#082b26]"
      >
        {title.split(' ').map((word, i, arr) => (
          i === arr.length - 1 ? <span key={i} className="text-[#148968]"> {word}</span> : <span key={i}>{word} </span>
        ))}
      </motion.h2>
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
        <svg className="w-6 h-6 text-[#148968]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
        </svg>
      )
    },
    {
      title: "تحليل السوق",
      desc: "نبحث في قاعدة بياناتنا الواسعة لاختيار أنسب الخيارات.",
      icon: (
        <svg className="w-6 h-6 text-[#148968]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
      )
    },
    {
      title: "المعاينات",
      desc: "جولات ميدانية لرؤية العقارات على أرض الواقع.",
      icon: (
        <svg className="w-6 h-6 text-[#148968]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6.75h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
        </svg>
      )
    },
    {
      title: "التفاوض وإتمام العقد",
      desc: "نضمن لك أفضل سعر وأكثر شروط العقد أماناً.",
      icon: (
        <svg className="w-6 h-6 text-[#148968]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12" />
        </svg>
      )
    },
    {
      title: "استلام العقار",
      desc: "نحتفل معك باستلام مفاتيح مستقبلك الجديد.",
      icon: (
        <svg className="w-6 h-6 text-[#148968]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
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
        <svg className="w-7 h-7 text-[#148968]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
        </svg>
      )
    },
    {
      title: "العميل أولاً",
      desc: "مصلحة العميل هي البوصلة التي توجه كافة قراراتنا.",
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
        </svg>
      )
    },
    {
      title: "الاحترافية",
      desc: "فريق عمل مدرب على أعلى مستوى لتقديم استشارات مبنية على أرقام.",
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
        </svg>
      )
    },
    {
      title: "التطور المستمر",
      desc: "نواكب دائماً أحدث متغيرات السوق العقاري لتقديم الأفضل.",
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.499 4.499 0 0 0-1.757 4.306 4.499 4.499 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
        </svg>
      )
    },
  ];

  // Team Data
  const team = [
    { name: "أحمد حسن", role: "مستشار استثماري أول", img: "/images/avatar.jpeg" },
    { name: "سارة محمود", role: "مديرة المبيعات", img: "/images/avatar.jpeg" },
    { name: "عمر فاروق", role: "خبير التسويق العقاري", img: "/images/avatar.jpeg" },
  ];

  return (
    <main className="min-h-screen bg-white font-body selection:bg-[#148968]/30 selection:text-[#082b26] overflow-hidden">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Full background image */}
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" alt="أكواد العقاريه" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#082b26]/50 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#082b26]/90 via-[#082b26]/30 to-transparent" />
        </div>

        <div className="container-wide px-6 relative z-10 flex flex-col items-center justify-center h-full text-center pb-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease }}
            className="max-w-5xl mx-auto"
          >
            <h1 className="text-[clamp(3rem,8vw,7rem)] font-black text-white leading-tight mb-8 font-arabic drop-shadow-2xl"><br />
              أكواد العقاريه <br />
              <span className="text-[#20d09f]">للتسويق العقاري</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed max-w-3xl mx-auto mb-12">
              خبرة تمتد لأكثر من 20 عاماً في السوق العقاري، بصمة واضحة في العديد من المشروعات الكبرى، وفريق عمل يجمع بين الخبرة والتخصص لخدمة عملائنا الكرام
            </p>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }} 
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        >
          <span className="text-white/60 text-xs tracking-[0.3em] uppercase font-bold">اكتشف</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/60 to-transparent"></div>
        </motion.div>
      </section>

      {/* --- STATS BAR --- */}
      <section className="bg-[#082b26] border-y border-white/10 relative z-20">
        <div className="container-wide px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-x-reverse divide-white/10">
            <div className="text-center">
              <span className="block text-4xl md:text-5xl font-black text-[#20d09f] mb-2">10+</span>
              <span className="text-gray-400 font-bold tracking-wider text-sm">سنوات خبرة</span>
            </div>
            <div className="text-center">
              <span className="block text-4xl md:text-5xl font-black text-[#20d09f] mb-2">500+</span>
              <span className="text-gray-400 font-bold tracking-wider text-sm">عميل سعيد</span>
            </div>
            <div className="text-center">
              <span className="block text-4xl md:text-5xl font-black text-[#20d09f] mb-2">20+</span>
              <span className="text-gray-400 font-bold tracking-wider text-sm">مشروع حصري</span>
            </div>
            <div className="text-center">
              <span className="block text-4xl md:text-5xl font-black text-[#20d09f] mb-2">100%</span>
              <span className="text-gray-400 font-bold tracking-wider text-sm">شفافية</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- OUR STORY (SPLIT LAYOUT) --- */}
      <section className="py-24 md:py-32 bg-white relative">
        <div className="container-wide px-6">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
            <div className="w-full lg:w-1/2 relative">
              <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl relative z-10">
                <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="عن أكواد العقاريه" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-10 -right-10 w-full h-full rounded-[3rem] border-2 border-[#148968]/20 z-0"></div>
              <div className="absolute top-1/2 -left-10 bg-white p-8 rounded-3xl shadow-xl z-20 hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-[#148968]/10 rounded-full flex items-center justify-center text-[#148968]">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <span className="block text-[#082b26] font-black text-2xl">موثوقية</span>
                    <span className="text-gray-500">في كل تعامل</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="w-full lg:w-1/2">
              <SectionHeader align="start" subtitle="Our Vision" title="رؤية تتجاوز البناء" />
              <p className="text-gray-600 text-lg leading-loose mb-8">
                مؤسسة <strong>أكواد العقاريه</strong> ليست مجرد شركة وساطة عقارية، بل هي كيان استشاري متكامل يضع بين يديك خلاصة خبرات ممتدة في السوق العقاري. نحن نؤمن بأن العقار هو الاستثمار الأهم في حياة الفرد، لذلك نلتزم بتقديم حلول متكاملة تضمن لعملائنا اختيار الأنسب والموثوق.
              </p>
              <p className="text-gray-600 text-lg leading-loose mb-10">
                من التجمع الخامس إلى زايد وبني سويف، فريقنا المتخصص يضمن لك أرقى مستويات الخدمة سواء في بيع أو شراء أو تشطيب وحدتك.
              </p>
              <Link href="/projects" className="inline-flex items-center gap-3 text-[#148968] font-bold text-lg hover:gap-5 transition-all">
                <span>تصفح مشاريعنا الحصرية</span>
                <svg className="w-6 h-6 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* --- CEO MESSAGE (REFINED) --- */}
      <section className="relative py-32 bg-[#082b26] overflow-hidden flex items-center min-h-[80vh]">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 w-full h-full bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
        <div className="absolute -top-[30%] -right-[10%] w-[70vw] h-[70vw] rounded-full bg-[#148968] blur-[150px] opacity-20" />
        <div className="absolute -bottom-[20%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-[#20d09f] blur-[150px] opacity-10" />
        
        <div className="container-wide px-6 relative z-10 w-full">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            
            {/* Image Column */}
            <div className="w-full lg:w-5/12 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                {/* Decorative border */}
                <div className="absolute inset-0 rounded-[2.5rem] border border-[#20d09f]/30 transform translate-x-4 translate-y-4 -z-10" />
                
                {/* Image Container */}
                <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#082b26] via-transparent to-transparent z-10 opacity-60" />
                  <img src={avatarImage.src} alt="الرئيس التنفيذي" className="w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-1000" />
                </div>

                {/* Floating Info Card */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="absolute -bottom-8 left-8 right-8 md:-left-12 md:right-auto bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl shadow-2xl"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#20d09f] rounded-full flex items-center justify-center shrink-0">
                      <svg className="w-6 h-6 text-[#082b26]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-white font-black text-xl mb-1">الرئيس التنفيذي</h4>
                      <p className="text-[#20d09f] font-bold text-sm">الرئيس التنفيذي ومؤسس الشركة</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Quote Column */}
            <div className="w-full lg:w-7/12 relative mt-12 lg:mt-0">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Huge Quote Icon */}
                <svg className="absolute -top-16 -right-8 md:-right-16 w-32 h-32 md:w-48 md:h-48 text-[#20d09f]/10 rotate-180 pointer-events-none" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>

                <h3 className="text-[clamp(1.75rem,4vw,3rem)] font-black text-white leading-[1.6] mb-8 relative z-10 font-arabic">
                  <span className="text-transparent bg-clip-text bg-gradient-to-l from-white to-gray-300">"في</span>{" "}
                  <span className="text-[#20d09f] relative inline-block">
                    أكواد العقاريه
                    <span className="absolute -bottom-2 left-0 w-full h-1 bg-[#20d09f]/40 rounded-full" />
                  </span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-l from-white to-gray-300">
                    ، نؤمن بأن العقار ليس مجرد استثمار، بل هو حجر الأساس لبناء مستقبل مزدهر، ونلتزم بتقديم حلول مبتكرة تلبي طموحات عملائنا."
                  </span>
                </h3>

                <div className="flex items-center gap-6 mt-12 border-t border-white/10 pt-8">
                  <div className="flex -space-x-4 space-x-reverse">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-12 h-12 rounded-full border-2 border-[#082b26] bg-gray-300 overflow-hidden relative">
                        <img src={`https://i.pravatar.cc/100?img=${i + 15}`} alt="Client" className="w-full h-full object-cover" />
                      </div>
                    ))}
                    <div className="w-12 h-12 rounded-full border-2 border-[#082b26] bg-[#20d09f] flex items-center justify-center text-[#082b26] font-bold text-xs relative z-10">
                      +500
                    </div>
                  </div>
                  <div>
                    <div className="text-white font-bold text-lg">يثقون بنا</div>
                    <div className="text-[#20d09f] text-sm font-medium">أكثر من 500 عميل وعائلة</div>
                  </div>
                </div>

              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* --- CORE VALUES (MASONRY GRID) --- */}
      <section className="py-32 bg-gray-50 relative">
        <div className="container-wide px-6">
          <SectionHeader subtitle="Core Values" title="قيمنا الجوهرية" align="center" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16 max-w-6xl mx-auto">
            {values.map((val, i) => (
              <div key={i} className={`bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 group ${i === 1 ? 'md:-translate-y-8' : ''} ${i === 3 ? 'lg:col-span-3 lg:w-1/3 lg:mx-auto lg:-translate-y-8' : ''}`}>
                <div className="w-16 h-16 rounded-2xl bg-[#148968]/10 text-[#148968] flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-[#148968] group-hover:text-white transition-all duration-500">
                  {val.icon}
                </div>
                <h3 className="text-2xl font-black text-[#082b26] mb-4">{val.title}</h3>
                <p className="text-gray-500 leading-relaxed font-medium">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-32 relative bg-white">
        <div className="container-wide px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, ease }}
            className="max-w-5xl mx-auto bg-gradient-to-br from-[#082b26] to-[#041512] rounded-[3rem] p-16 md:p-24 relative overflow-hidden shadow-2xl"
          >
            <div className="absolute inset-0 bg-[url('/projects/project-1.png')] bg-cover bg-center opacity-10 mix-blend-overlay" />
            
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 relative z-10 leading-tight">
              جاهز لبدء <span className="text-[#20d09f]">استثمارك؟</span>
            </h2>
            <p className="text-gray-300 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed relative z-10">
              تواصل مع خبراء <strong className="text-white">أكواد العقاريه</strong> اليوم واحصل على استشارة عقارية مجانية مصممة خصيصاً لتناسب أهدافك وطموحاتك.
            </p>

            <Link href="/contact" className="relative z-10 inline-flex items-center justify-center gap-4 px-12 py-6 bg-[#20d09f] text-[#082b26] hover:bg-white font-black text-lg rounded-full overflow-hidden transition-all duration-300 shadow-lg hover:shadow-[#20d09f]/50 hover:scale-105">
              <span>تواصل معنا الآن</span>
              <svg className="w-6 h-6 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
