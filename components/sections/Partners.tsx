"use client";

import { motion } from "framer-motion";

const developers = [
  "إعمار مصر",
  "مجموعة طلعت مصطفى",
  "بالم هيلز",
  "سوديك",
  "أورا للتطوير",
  "ماونتن فيو",
  "مصر إيطاليا",
  "تطوير مصر",
  "حسن علام",
  "تطوير القابضة"
];

// Duplicate to ensure seamless infinite scroll
const marqueeItems = [...developers, ...developers];

export default function Partners() {
  return (
    <section className="relative bg-[#111111] overflow-hidden py-16 md:py-20 border-y border-white/5">
      {/* Decorative Gradient Line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="container-wide px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center md:text-right mb-6 md:mb-0"
          >
            <div className="inline-flex items-center gap-4 px-8 py-3.5 rounded-full bg-white/5 border border-white/10 shadow-[0_0_20px_rgba(191,154,95,0.1)] backdrop-blur-md mb-8 hover:bg-white/10 hover:border-primary/30 transition-all duration-300">
              <span className="w-3 h-3 rounded-full bg-primary animate-pulse" />
              <span className="text-base md:text-lg text-primary font-bold tracking-widest font-body uppercase">
                شركاء النجاح
              </span>
              <span className="w-3 h-3 rounded-full bg-primary animate-pulse" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              أبرز المطورين العقاريين
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-white/40 text-sm font-light max-w-sm text-center md:text-left leading-relaxed"
          >
            شراكات استراتيجية مع كبرى شركات التطوير العقاري في مصر لضمان تقديم أفضل المشاريع لعملائنا بأعلى معايير الجودة.
          </motion.p>
        </div>

        {/* Infinite Marquee Text Pills */}
        <div className="relative flex overflow-hidden py-4 -mx-6 px-6">
          {/* Fade edges matching the new #111111 background */}
          <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-[#111111] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-[#111111] to-transparent z-10 pointer-events-none" />

          {/* 
            RTL Marquee logic: 
            Since document is RTL, flex lays out items Right-to-Left. 
            Moving translateX to 50% moves the whole container to the right by exactly half its width, 
            which perfectly loops the two identical halves.
          */}
          <motion.div
            className="flex w-max"
            animate={{ x: [0, "50%"] }}
            transition={{ 
              repeat: Infinity, 
              ease: "linear", 
              duration: 40 
            }}
          >
            {marqueeItems.map((dev, i) => (
              <div
                key={i}
                className="mx-3 flex items-center justify-center px-8 py-4 glass-card-dark rounded-full cursor-pointer group hover:bg-primary/5 hover:border-primary/50 hover:-translate-y-1 transition-all duration-300"
              >
                <span className="text-white/70 font-bold text-lg md:text-xl whitespace-nowrap group-hover:text-primary transition-colors duration-300">
                  {dev}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
