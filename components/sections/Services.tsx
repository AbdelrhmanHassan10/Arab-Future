"use client";

import { motion } from "framer-motion";
import { FiHome, FiTool, FiCheckCircle, FiArrowLeft } from "react-icons/fi";
import Link from "next/link";

const servicesData = [
  {
    id: "resale",
    title: "التسويق العقاري (Resale)",
    description: "نساعدك في بيع وشراء العقارات بأمان واحترافية، مع ضمان أفضل استثمار لأموالك في سوق العقارات ببني سويف.",
    icon: FiHome,
    features: [
      "شراء وبيع الوحدات السكنية والتجارية.",
      "التحقق القانوني والهندسي من بيانات الوحدة.",
      "تنظيم وإدارة المعاينات بشكل احترافي.",
      "التفاوض المباشر بين البائع والمشتري.",
      "متابعة دقيقة لجميع إجراءات وعقود البيع."
    ],
    buttonText: "تصفح الوحدات",
    buttonLink: "/units",
    bgPattern: "radial-gradient(circle at 100% 0%, rgba(191,154,95,0.08) 0%, transparent 50%)"
  },
  {
    id: "finishing",
    title: "التشطيبات والتصميم الداخلي",
    description: "نستلم وحدتك على المحارة ونسلمها لك على المفتاح، بتصميمات عصرية تناسب ذوقك وبأعلى جودة في التنفيذ.",
    icon: FiTool,
    features: [
      "تصميم داخلي (3D) وعمل رسومات تنفيذية.",
      "تشطيب كامل (من المحارة للمفتاح).",
      "تشطيب جزئي وتعديلات معمارية.",
      "تجديد وإعادة هيكلة الوحدات القديمة.",
      "إشراف هندسي متكامل على التنفيذ."
    ],
    buttonText: "اطلب عرض سعر",
    buttonLink: "/finishing/request",
    bgPattern: "radial-gradient(circle at 0% 100%, rgba(255,255,255,0.05) 0%, transparent 50%)"
  }
];

export default function Services() {
  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <section id="services" className="relative bg-[#090909] overflow-hidden py-24 md:py-32 border-t border-white/5">

      <div className="container-wide px-6 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            className="inline-flex items-center gap-4 px-8 py-3.5 rounded-full bg-white/5 border border-white/10 shadow-[0_0_20px_rgba(191,154,95,0.1)] backdrop-blur-md mb-8"
          >
            <span className="w-3 h-3 rounded-full bg-primary animate-pulse" />
            <span className="text-base md:text-lg text-primary font-bold tracking-widest font-body uppercase">
              خدماتنــا
            </span>
            <span className="w-3 h-3 rounded-full bg-primary animate-pulse" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="text-3xl md:text-5xl font-black text-white max-w-3xl leading-tight"
          >
            حلول متكاملة لعقارك، من <span className="text-transparent bg-clip-text bg-gradient-to-l from-primary to-[#f3d38e]">الشراء للتشطيب</span>
          </motion.h2>
        </div>

        {/* Services Huge Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {servicesData.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, x: i % 2 === 0 ? 100 : -100, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ type: "spring", stiffness: 50, damping: 20, delay: i * 0.2 }}
              style={{ backgroundImage: service.bgPattern }}
              className="group relative bg-[#111111] rounded-[2.5rem] p-8 md:p-12 border border-white/10 hover:border-primary/40 transition-all duration-500 overflow-hidden flex flex-col h-full shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_60px_rgba(191,154,95,0.1)]"
            >
              {/* Massive faded icon in background */}
              <div className="absolute -bottom-10 -left-10 text-white/[0.02] group-hover:text-primary/[0.05] transition-colors duration-700 pointer-events-none">
                <service.icon className="w-96 h-96 transform -rotate-12" />
              </div>

              {/* Icon Header */}
              <div className="flex items-center gap-6 mb-8 relative z-10">
                <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-navy-deeper transition-all duration-500 flex-shrink-0">
                  <service.icon className="w-10 h-10" />
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-white group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </h3>
              </div>

              {/* Description */}
              <p className="text-white/60 font-light leading-relaxed text-lg mb-10 relative z-10">
                {service.description}
              </p>

              {/* Features List */}
              <div className="mb-12 flex-grow relative z-10">
                <ul className="space-y-4">
                  {service.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-4">
                      <div className="mt-1 flex-shrink-0">
                        <FiCheckCircle className="text-primary text-xl" />
                      </div>
                      <span className="text-white/80 font-medium text-[15px] md:text-base leading-relaxed">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <div className="relative z-10 mt-auto pt-8 border-t border-white/10">
                <Link
                  href={service.buttonLink}
                  className="inline-flex items-center justify-center w-full md:w-auto gap-3 px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-lg hover:bg-primary hover:text-navy-deeper hover:border-primary transition-all duration-300 group/btn"
                >
                  {service.buttonText}
                  <FiArrowLeft className="group-hover/btn:-translate-x-2 transition-transform duration-300" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
