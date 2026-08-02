"use client";

import { motion } from "framer-motion";

const materials = [
  {
    title: "فيلات",
    subtitle: "Villas & Townhouses",
    titleAr: "فيلات وتاون هاوس",
    description: "مساحات واسعة وتصميمات معمارية راقية تلبي تطلعاتك نحو الرفاهية والخصوصية التامة.",
    features: ["مساحات خضراء", "حمام سباحة خاص", "جراج خاص"],
    color: "from-[#CBA365]/20 to-transparent",
    border: "group-hover:border-[#CBA365]/50",
    icon: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z",
  },
  {
    title: "شقق",
    subtitle: "Luxury Apartments",
    titleAr: "شقق سكنية فاخرة",
    description: "شقق بتشطيبات عالمية ومساحات ذكية تناسب العائلات العصرية في أرقى التجمعات السكنية.",
    features: ["إطلالات مميزة", "أمن وحراسة", "مرافق متكاملة"],
    color: "from-blue-500/10 to-transparent",
    border: "group-hover:border-blue-500/30",
    icon: "M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.018-.39.035-.586.053m-16.5 0c.196.018.392.035.586.053m16.5 0c.23.021.46.043.689.066m-17.189-.066c-.23.021-.46.043-.689.066m0 0C2.25 14.97 2.25 15.653 2.25 16.32v.5m0-11.458c0-.796.84-1.42 1.62-.977a48.108 48.108 0 013.413.387m15 0V8.706c0 1.081-.768 2.015-1.837 2.175a48.114 48.114 0 00-3.413-.387M12 5.25v13.5",
  },
  {
    title: "تجاري",
    subtitle: "Commercial Units",
    titleAr: "وحدات تجارية",
    description: "محلات ومقرات تجارية في مواقع استراتيجية تضمن لك أعلى عائد على الاستثمار.",
    features: ["مواقع حيوية", "تصميمات مرنة", "عائد استثماري مضمون"],
    color: "from-white/10 to-transparent",
    border: "group-hover:border-white/30",
    icon: "M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z",
  },
  {
    title: "إداري",
    subtitle: "Office Spaces",
    titleAr: "مكاتب ومقرات إدارية",
    description: "بيئة عمل متطورة تعكس احترافية شركتك مع كافة الخدمات والمرافق الأساسية.",
    features: ["قاعات اجتماعات", "إنترنت فائق السرعة", "إدارة مرافق متكاملة"],
    color: "from-stone-500/20 to-transparent",
    border: "group-hover:border-stone-500/40",
    icon: "M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6z",
  },
  {
    title: "ساحلي",
    subtitle: "Coastal Resorts",
    titleAr: "شاليهات ومنتجعات",
    description: "عقارات ساحلية توفر لك ملاذاً مثالياً للاسترخاء مع إطلالات ساحرة على البحر.",
    features: ["إطلالة على البحر", "شواطئ رملية", "خدمات فندقية"],
    color: "from-teal-500/10 to-transparent",
    border: "group-hover:border-teal-500/30",
    icon: "M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a1.5 1.5 0 01-1.5 1.5H6a1.5 1.5 0 00-1.5 1.5v2.625a1.5 1.5 0 001.5 1.5h1.875a1.5 1.5 0 011.5 1.5v0c0 .355-.186.676-.401.959a1.647 1.647 0 00-.349 1.003c0 1.036 1.007 1.875 2.25 1.875s2.25-.84 2.25-1.875c0-.369-.128-.713-.349-1.003-.215-.283-.401-.604-.401-.959v0a1.5 1.5 0 011.5-1.5H18a1.5 1.5 0 001.5-1.5v-2.625a1.5 1.5 0 00-1.5-1.5h-1.875a1.5 1.5 0 01-1.5-1.5v0z",
  }
];

export default function Materials() {
  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <section id="materials" className="relative bg-navy-deeper overflow-hidden py-24">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/[0.02] rounded-full blur-[150px] pointer-events-none" />

      <div className="container-wide px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-[2px] bg-primary" />
            <span className="text-sm uppercase text-primary font-medium tracking-widest font-body">أنواع العقارات</span>
            <span className="w-8 h-[2px] bg-primary" />
          </div>
          <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-bold text-white leading-tight">
            استثمارات <span className="text-primary italic">متنوعة</span> لتلبية احتياجاتك
          </h2>
          <p className="text-white/50 text-base mt-4 font-light">
            نوفر في سمسار مصر خيارات عقارية شاملة تناسب السكن الفاخر، الاستثمار التجاري، أو قضاء أوقات ممتعة في المنتجعات الساحلية.
          </p>
        </motion.div>

        {/* 3D Glass Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {materials.map((material, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.7, ease }}
              className="group cursor-default perspective-1000"
            >
              <div className={`glass-card-dark h-full p-8 rounded-3xl border border-white/5 transition-all duration-700 relative overflow-hidden transform-gpu hover:-translate-y-2 hover:rotate-y-2 ${material.border} hover:shadow-2xl`}>

                {/* Glow Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${material.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />

                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 text-white/50 group-hover:text-white group-hover:bg-white/10 transition-colors duration-500 border border-white/10 relative z-10">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={material.icon} />
                  </svg>
                </div>

                <div className="relative z-10">
                  <h3 className="text-4xl font-black text-white font-body tracking-tight mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/60 transition-all duration-500">
                    {material.title}
                  </h3>
                  <p className="text-[10px] text-white/40 tracking-[0.2em] uppercase font-body mb-2">
                    {material.subtitle}
                  </p>
                  <h4 className="text-sm font-semibold text-primary mb-4">
                    {material.titleAr}
                  </h4>
                  <p className="text-white/50 text-sm leading-[1.8] font-light mb-6">
                    {material.description}
                  </p>

                  {/* Features List */}
                  <div className="space-y-2 pt-6 border-t border-white/10">
                    {material.features.map((feat, j) => (
                      <div key={j} className="flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-primary/50 group-hover:bg-primary transition-colors" />
                        <span className="text-[13px] text-white/60 group-hover:text-white/80 transition-colors">
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
