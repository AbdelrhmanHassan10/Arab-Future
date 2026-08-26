"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowLeft } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";

const expertiseData = [
  {
    id: "01",
    title: "شراء العقارات",
    description: "نساعدك في إيجاد أفضل الفرص المتاحة في السوق العقاري والتي تناسب ميزانيتك واحتياجاتك تماماً.",
    link: "/units",
    image: "/projects/project-1.png",
  },
  {
    id: "02",
    title: "بيع العقارات",
    description: "نقوم بتسويق وحدتك العقارية باحترافية للوصول لأفضل مشتري في أسرع وقت وبأعلى عائد ممكن.",
    link: "/contact",
    image: "/projects/project-2.png",
  },
  {
    id: "03",
    title: "إيجار العقارات",
    description: "مجموعة واسعة من الخيارات الإيجارية السكنية والتجارية التي تلبي كافة احتياجاتك.",
    link: "/units",
    image: "/projects/project-3.png",
  },
  {
    id: "04",
    title: "إدارة الأملاك",
    description: "إدارة كاملة لعقاراتك ومتابعة المستأجرين والصيانة لضمان أفضل عائد استثماري وراحة بال تامة.",
    link: "/contact",
    image: "/projects/project-4.png",
  },
  {
    id: "05",
    title: "استشارات عقارية",
    description: "استشارات موثوقة مبنية على دراسة عميقة لسوق العقارات في بني سويف لتوجيه استثمارك بنجاح.",
    link: "/contact",
    image: "/projects/project-5.png",
  },
];

export default function Expertise() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative bg-[#090909] overflow-hidden py-24 md:py-32">

      <div className="container-wide px-6 relative z-10">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
              خدمات عقارية <br />
              <span className="text-primary underline decoration-primary/30 underline-offset-[12px] decoration-4">بمعايير عالمية</span>
            </h2>
          </div>
          <Link
            href="/units"
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-white/10 text-white/70 hover:text-white hover:border-white/30 transition-all duration-300"
          >
            عرض جميع الخدمات <FiArrowLeft />
          </Link>
        </div>

        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Image (Sticky/Fixed height container) */}
          <div className="relative h-[400px] md:h-[600px] w-full rounded-[2rem] overflow-hidden order-2 lg:order-1">
            {expertiseData.map((item, index) => (
              <Image
                key={item.id}
                src={item.image}
                alt={item.title}
                fill
                className={`object-cover transition-all duration-700 ease-in-out ${
                  index === activeIndex ? "opacity-100 scale-100 z-10" : "opacity-0 scale-105 z-0"
                }`}
              />
            ))}
            
            {/* Gradient Overlay for luxury feel */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            {/* Floating Title on Image */}
            <div className="absolute bottom-8 left-8 right-8 z-10 flex flex-col items-center text-center">
              <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white/80 text-[10px] tracking-widest uppercase px-4 py-1.5 rounded-full mb-3 font-body">
                Semsar Expertise
              </span>
              <h3 className="text-2xl md:text-3xl font-bold text-white drop-shadow-md">
                {expertiseData[activeIndex].title}
              </h3>
            </div>
          </div>

          {/* Right Column: Interactive Accordion/List */}
          <div className="flex flex-col border-t border-white/10 order-1 lg:order-2">
            {expertiseData.map((item, index) => {
              const isActive = index === activeIndex;

              return (
                <div
                  key={item.id}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                  className={`group relative border-b border-white/10 py-6 md:py-8 cursor-pointer transition-colors duration-500 ${
                    isActive ? "bg-white/[0.02]" : "hover:bg-white/[0.01]"
                  }`}
                >
                  {/* Active Highlight Line on the right (since RTL) */}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute top-0 right-0 w-1 h-full bg-primary"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}

                  <div className="flex items-start md:items-center gap-6 px-4 md:px-8">
                    
                    {/* Circle / Arrow */}
                    <div className="mt-1 md:mt-0 flex-shrink-0">
                      <div className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-500 ${
                        isActive ? "border-primary text-primary" : "border-white/10 text-transparent"
                      }`}>
                        <FiArrowLeft className={`transition-transform duration-500 ${isActive ? "opacity-100 scale-100" : "opacity-0 scale-50"}`} />
                      </div>
                    </div>

                    {/* Title & Description */}
                    <div className="flex-grow">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className={`text-xl md:text-2xl font-bold transition-colors duration-500 ${
                          isActive ? "text-white" : "text-white/40"
                        }`}>
                          {item.title}
                        </h3>
                        {/* Number */}
                        <span className={`font-body text-sm tracking-widest transition-colors duration-500 ${
                          isActive ? "text-primary" : "text-white/20"
                        }`}>
                          {item.id}
                        </span>
                      </div>
                      
                      {/* Expandable Content */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="overflow-hidden"
                          >
                            <p className="text-white/50 text-sm md:text-base leading-relaxed pt-2 pb-4 max-w-md">
                              {item.description}
                            </p>
                            <Link
                              href={item.link}
                              className="text-primary text-sm font-bold inline-flex items-center gap-2 hover:text-[#c9a66d] transition-colors"
                            >
                              اكتشف المزيد
                            </Link>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
