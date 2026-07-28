"use client";

import { motion } from "framer-motion";

const services = [
  {
    slug: "project-management",
    title: "إدارة المشاريع",
    titleEn: "Project Management",
    description:
      "إشراف من البداية للنهاية على جميع مراحل المشروع بأعلى معايير الجودة والالتزام بالجداول الزمنية",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
      </svg>
    ),
  },
  {
    slug: "architectural-design",
    title: "التصميم المعماري",
    titleEn: "Architectural Design",
    description:
      "مخططات مبتكرة وعملية تجمع بين الجمال الفني والوظيفية لمشاريع استثنائية",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
  },
  {
    slug: "interior-design",
    title: "تصميم وتشطيبات داخلية",
    titleEn: "Interior Design & Finishing",
    description:
      "مساحات أنيقة ومريحة تعكس الذوق الرفيع والتفاصيل الدقيقة في كل مساحة",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
  },
  {
    slug: "hardscape",
    title: "أعمال الهارد سكيب",
    titleEn: "Hardscape Works",
    description:
      "تصميم وتنفيذ التشكيلات الخارجية للحدائق والمساحات المفتوحة بما يحقق التوازن بين الشكل الجمالي والوظيفة العملية",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M8.25 21V10.5M15.75 21V10.5M3 10.5h18M9 6.75h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15" />
      </svg>
    ),
  },
  {
    slug: "maintenance",
    title: "الصيانة والتشغيل",
    titleEn: "Maintenance",
    description:
      "خدمات ما بعد التنفيذ وصيانة دورية وتشغيل متكامل لضمان الأداء الأمثل",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75a4.5 4.5 0 01-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 11-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 016.336-4.486l-3.276 3.276a3.004 3.004 0 002.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852zM4.867 19.125h.008v.008h-.008v-.008z" />
      </svg>
    ),
  },
  {
    slug: "technical",
    title: "حلول تقنية متخصصة",
    titleEn: "Technical Solutions",
    description:
      "حلول هندسية فريدة تلبي المتطلبات الخاصة بكل مشروع بتقنيات متقدمة",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

export default function Services() {
  return (
    <section id="services" className="relative bg-section-gray overflow-hidden">
      {/* Background gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/[0.05] rounded-full blur-[100px] pointer-events-none" />

      <div className="pad-y relative">
        <div className="pad-x container-wide">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-14"
          >
            <span className="text-2xl uppercase text-primary font-semibold tracking-widest">
              خدماتنا
            </span>
            <h2 className="text-display font-bold text-white mt-4">
              خدمات متكاملة
            </h2>
            <p className="text-white/80 text-subhead mt-4 max-w-xl mx-auto">
              خبرة احترافية لدعم مشاريعك من الفكرة إلى التنفيذ
            </p>
          </motion.div>

          {/* Services grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="group"
              >
                <div className="glass-card p-8 lg:p-10 h-full hover:-translate-y-2 hover:shadow-card-hover hover:border-primary/50 transition-all duration-500 relative overflow-hidden group/card">
                  {/* Large Card Number background indicator */}
                  <div className="absolute top-4 left-6 text-6xl font-bold text-white/[0.03] group-hover/card:text-primary/[0.08] transition-colors duration-500 font-body pointer-events-none select-none">
                    {(i + 1).toString().padStart(2, '0')}
                  </div>

                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center text-primary mb-6 group-hover:from-primary group-hover:to-primary-dark group-hover:text-navy-deeper transition-all duration-700 group-hover:shadow-glow group-hover:rotate-[360deg] relative z-10">
                    {service.icon}
                  </div>

                  {/* Title */}
                  <h3 className="font-semibold text-white text-[17px] mb-1.5 group-hover:text-primary transition-colors duration-400 relative z-10">
                    {service.title}
                  </h3>
                  <span className="text-xs text-primary/70 tracking-widest uppercase block mb-4 font-body relative z-10">
                    {service.titleEn}
                  </span>

                  {/* Description */}
                  <p className="text-white/60 text-sm font-normal leading-[1.85] mb-5 relative z-10">
                    {service.description}
                  </p>

                  {/* Link */}
                  <a
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-2 text-primary text-sm font-medium hover:gap-3 transition-all duration-300 relative z-10"
                  >
                    <span>اعرف أكتر</span>
                    <svg className="w-4 h-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                    </svg>
                  </a>

                  {/* Bottom animated accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="divider" />
    </section>
  );
}
