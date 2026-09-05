"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const materials = [
  {
    id: 6,
    title: "تخصيص مباشر",
    subtitle: "Direct Allocation",
    titleAr: "أراضي تخصيص مباشر",
    description: "فرص حصرية للحصول على أراضي تخصيص مباشر بمساحات متنوعة تناسب كبرى المشاريع.",
    features: ["مواقع مميزة", "تسهيلات سداد", "تخصيص فوري"],
    image: "/projects/project-14.png"
  },
  {
    id: 7,
    title: "بيع أراضي",
    subtitle: "Lands For Sale",
    titleAr: "بيع أراضي تجارية وسكنية",
    description: "مجموعة متميزة من الأراضي التجارية والسكنية الجاهزة للبناء في أرقى المناطق.",
    features: ["أراضي تجارية", "أراضي سكنية", "مساحات متنوعة"],
    image: "/projects/project-15.png"
  },
  {
    id: 1,
    title: "فيلات",
    subtitle: "Villas",
    titleAr: "فيلات وتاون هاوس",
    description: "مساحات واسعة وتصميمات راقية تلبي تطلعاتك نحو الرفاهية والخصوصية التامة.",
    features: ["مساحات خضراء", "مسبح خاص", "جراج"],
    image: "/projects/project-17.png"
  },
  {
    id: 2,
    title: "شقق",
    subtitle: "Apartments",
    titleAr: "شقق سكنية فاخرة",
    description: "شقق بتشطيبات عالمية ومساحات ذكية تناسب العائلات العصرية في أرقى التجمعات.",
    features: ["إطلالات مميزة", "أمن وحراسة", "مرافق"],
    image: "/projects/project-20.png"
  },
  {
    id: 3,
    title: "تجاري",
    subtitle: "Commercial",
    titleAr: "وحدات تجارية",
    description: "محلات تجارية في مواقع استراتيجية تضمن لك أعلى عائد على الاستثمار.",
    features: ["مواقع حيوية", "تصميم مرن", "عائد مضمون"],
    image: "/projects/project-8.png"
  },
  {
    id: 4,
    title: "إداري",
    subtitle: "Offices",
    titleAr: "مكاتب ومقرات إدارية",
    description: "بيئة عمل متطورة تعكس احترافية شركتك مع كافة الخدمات والمرافق الأساسية.",
    features: ["قاعات اجتماعات", "إنترنت فائق", "إدارة متكاملة"],
    image: "/projects/project-11.png"
  },
  {
    id: 5,
    title: "ساحلي",
    subtitle: "Coastal",
    titleAr: "شاليهات ومنتجعات",
    description: "عقارات ساحلية توفر لك ملاذاً مثالياً للاسترخاء مع إطلالات ساحرة على البحر.",
    features: ["إطلالة بحرية", "شواطئ رملية", "خدمات فندقية"],
    image: "/projects/project-1.png"
  }
];

export default function Materials() {
  const [hoveredIndex, setHoveredIndex] = useState<number>(0);
  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <section id="materials" className="relative bg-[#111111] overflow-hidden py-24 border-t border-white/5">
      {/* Dynamic Backgrounds */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/[0.02] rounded-full blur-[150px] pointer-events-none" />

      <div className="container-wide px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-4 px-8 py-3.5 rounded-full bg-white/5 border border-white/10 shadow-[0_0_20px_rgba(191,154,95,0.1)] backdrop-blur-md mb-8 hover:bg-white/10 hover:border-primary/30 transition-all duration-300">
            <span className="w-3 h-3 rounded-full bg-primary animate-pulse" />
            <span className="text-base md:text-lg text-primary font-bold tracking-widest font-body uppercase">
              أنواع العقارات
            </span>
            <span className="w-3 h-3 rounded-full bg-primary animate-pulse" />
          </div>
          <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-bold text-white leading-tight">
            استثمارات <span className="text-primary">متنوعة</span> لتلبية احتياجاتك
          </h2>
          <p className="text-white/50 text-base mt-4 font-light">
            نوفر في الفضل العقاريه خيارات عقارية شاملة تناسب السكن الفاخر، الاستثمار التجاري، أو قضاء أوقات ممتعة في المنتجعات الساحلية.
          </p>
        </motion.div>

        {/* Expanding Accordion */}
        <div className="flex flex-col lg:flex-row w-full h-[800px] lg:h-[600px] gap-2 lg:gap-4">
          {materials.map((item, index) => {
            const isActive = hoveredIndex === index;

            return (
              <motion.div
                key={item.id}
                onMouseEnter={() => setHoveredIndex(index)}
                onClick={() => setHoveredIndex(index)}
                layout
                initial={false}
                animate={{
                  flex: isActive ? 4 : 1,
                }}
                transition={{ duration: 0.7, ease }}
                className={`relative rounded-3xl overflow-hidden cursor-pointer group ${isActive ? 'shadow-[0_0_40px_rgba(191,154,95,0.2)]' : 'hover:bg-white/5'
                  }`}
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                  style={{ backgroundImage: `url('${item.image}')` }}
                />

                {/* Overlays */}
                <div className={`absolute inset-0 transition-opacity duration-700 ${isActive ? 'bg-gradient-to-t from-navy-deeper via-navy-deeper/50 to-transparent opacity-90' : 'bg-navy-deeper/80 group-hover:bg-navy-deeper/60'
                  }`} />

                {/* Content Container */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">

                  {/* Vertical Title (visible when NOT active) */}
                  <div
                    className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 delay-100 ${isActive ? 'opacity-0 pointer-events-none' : 'opacity-100'
                      }`}
                  >
                    <h3 className="text-white text-2xl lg:text-3xl font-bold lg:-rotate-90 whitespace-nowrap tracking-wider">
                      {item.title}
                    </h3>
                  </div>

                  {/* Expanded Content (visible when active) */}
                  <div
                    className={`transition-all duration-700 transform ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none absolute bottom-0 left-0 right-0 p-8'
                      }`}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-[11px] text-primary uppercase tracking-widest font-body px-3 py-1 border border-primary/30 rounded-full bg-primary/10 backdrop-blur-md">
                        {item.subtitle}
                      </span>
                      <div className="h-px bg-white/20 flex-1" />
                    </div>

                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
                      {item.titleAr}
                    </h3>
                    
                    <p className="text-white/70 text-sm md:text-base leading-relaxed mb-6 max-w-lg">
                      {item.description}
                    </p>

                    <div className="flex flex-wrap gap-2 lg:gap-3">
                      {item.features.map((feat, i) => (
                        <div key={i} className="flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-lg">
                          <div className="w-1 h-1 rounded-full bg-primary" />
                          <span className="text-xs text-white/90 whitespace-nowrap">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
