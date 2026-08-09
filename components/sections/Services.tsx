"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const services = [
  {
    slug: "buying",
    title: "شراء العقارات",
    titleEn: "Buying Properties",
    description: "نساعدك في العثور على عقار أحلامك بأفضل الأسعار وفي أرقى المواقع بكل سهولة وأمان.",
    image: "/projects/project-1.png",
  },
  {
    slug: "selling",
    title: "بيع العقارات",
    titleEn: "Selling Properties",
    description: "نقدم لك استراتيجيات تسويق فعالة لبيع عقارك بأعلى عائد وفي أسرع وقت ممكن.",
    image: "/projects/project-2.png",
  },
  {
    slug: "renting",
    title: "إيجار العقارات",
    titleEn: "Renting Properties",
    description: "مجموعة واسعة من الخيارات الإيجارية السكنية والتجارية التي تلبي كافة احتياجاتك.",
    image: "/projects/project-3.png",
  },
  {
    slug: "property-management",
    title: "إدارة الأملاك",
    titleEn: "Property Management",
    description: "خدمات شاملة لإدارة عقاراتك لضمان أعلى عائد استثماري وراحة بال تامة.",
    image: "/projects/project-4.png",
  },
  {
    slug: "consulting",
    title: "استشارات عقارية",
    titleEn: "Real Estate Consulting",
    description: "نصائح وإرشادات مبنية على تحليل دقيق للسوق لمساعدتك في اتخاذ أفضل القرارات الاستثمارية.",
    image: "/projects/project-5.png",
  },
];

export default function Services() {
  const [active, setActive] = useState(0);
  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <section id="services" className="relative bg-[#0a0f1c] overflow-hidden py-24">
      {/* Background Orbs */}
      <div className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] bg-primary/[0.03] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-primary/[0.02] rounded-full blur-[100px] pointer-events-none" />

      <div className="container-wide px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            className="max-w-xl"
          >
            <div className="inline-flex items-center gap-4 px-8 py-3.5 rounded-full bg-white/5 border border-white/10 shadow-[0_0_20px_rgba(191,154,95,0.1)] backdrop-blur-md mb-8 hover:bg-white/10 hover:border-primary/30 transition-all duration-300">
              <span className="w-3 h-3 rounded-full bg-primary animate-pulse" />
              <span className="text-base md:text-lg text-primary font-bold tracking-widest font-body uppercase">
                خدماتنا
              </span>
              <span className="w-3 h-3 rounded-full bg-primary animate-pulse" />
            </div>
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-bold text-white leading-tight">
              خدمات عقارية <br />بمعايير <span className="text-primary italic">عالمية</span>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease, delay: 0.2 }}
          >
            <Link href="/services" className="group flex items-center gap-3 text-white/60 hover:text-primary transition-colors duration-300">
              <span className="text-sm font-medium">عرض جميع الخدمات</span>
              <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-primary/50 transition-colors">
                <svg className="w-4 h-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                </svg>
              </div>
            </Link>
          </motion.div>
        </div>

        {/* Interactive Reveal Layout */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 min-h-[600px]">

          {/* Left: Interactive List */}
          <div className="lg:w-5/12 flex flex-col justify-center w-full">
            <div className="border-t border-white/5" />
            {services.map((service, i) => (
              <div
                key={i}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                className={`group border-b border-white/5 py-6 md:py-8 cursor-pointer transition-all duration-500 ${active === i ? "opacity-100 pl-4 border-primary/30" : "opacity-40 hover:opacity-70"}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-4">
                    <span className={`font-body text-sm font-bold transition-colors duration-500 ${active === i ? "text-primary" : "text-white/30"}`}>
                      0{i + 1}
                    </span>
                    <h3 className={`text-2xl md:text-3xl lg:text-4xl font-bold transition-colors duration-500 ${active === i ? "text-white" : "text-white"}`}>
                      {service.title}
                    </h3>
                  </div>
                  <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-500 ${active === i ? "border-primary bg-primary/10 text-primary rotate-45" : "border-white/10 text-transparent group-hover:border-white/30 group-hover:text-white/50"}`}>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                  </div>
                </div>

                {/* Expanded Description */}
                <motion.div
                  initial={false}
                  animate={{ height: active === i ? "auto" : 0, opacity: active === i ? 1 : 0 }}
                  transition={{ duration: 0.4, ease }}
                  className="overflow-hidden"
                >
                  <p className="text-white/60 text-sm md:text-base leading-[1.8] mt-4 max-w-sm">
                    {service.description}
                  </p>
                  <Link href={`/services/${service.slug}`} className="inline-block mt-4 text-primary text-sm font-medium hover:underline underline-offset-4">
                    اكتشف المزيد
                  </Link>
                </motion.div>
              </div>
            ))}
          </div>

          {/* Right: Image Reveal */}
          <div className="lg:w-7/12 w-full h-[400px] lg:h-auto relative">
            <div className="sticky top-24 w-full h-full lg:h-[700px] rounded-[32px] overflow-hidden glass-card-dark border border-white/10 group">
              <div className="absolute inset-0 bg-navy-deeper/20 z-10 pointer-events-none" />
              <AnimatePresence mode="wait">
                <motion.img
                  key={active}
                  src={services[active].image}
                  alt={services[active].title}
                  initial={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                  transition={{ duration: 0.7, ease }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>

              {/* Floating Content over Image */}
              <div className="absolute bottom-0 left-0 right-0 p-8 z-20 bg-gradient-to-t from-navy-deeper via-navy-deeper/80 to-transparent">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <span className="px-4 py-2 rounded-full glass-card-dark border border-white/20 text-white text-xs uppercase tracking-widest font-body mb-3 inline-block">
                      {services[active].titleEn}
                    </span>
                    <h3 className="text-2xl font-bold text-white">{services[active].title}</h3>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
