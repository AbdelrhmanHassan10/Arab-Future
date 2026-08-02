"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const partners = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  src: `/partners/partner-${i + 1}.jpg`,
  alt: `شريك ${i + 1}`,
}));

export default function Partners() {
  return (
    <section className="relative bg-navy-deeper overflow-hidden py-16 md:py-20 border-y border-white/5">
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
            <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
              <span className="w-6 h-[2px] bg-primary" />
              <span className="text-xs uppercase text-primary font-medium tracking-widest font-body">شركاء النجاح</span>
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
            className="text-white/40 text-sm font-light max-w-sm text-center md:text-left"
          >
            شراكات استراتيجية مع كبرى شركات التطوير العقاري في مصر لضمان تقديم أفضل المشاريع لعملائنا.
          </motion.p>
        </div>

        {/* Infinite Marquee Logos */}
        <div className="relative flex overflow-hidden group py-4">
          {/* Fade edges */}
          <div className="absolute inset-y-0 left-0 w-24 md:w-40 bg-gradient-to-r from-navy-deeper to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 md:w-40 bg-gradient-to-l from-navy-deeper to-transparent z-10 pointer-events-none" />

          <div className="flex animate-marquee group-hover:[animation-play-state:paused] whitespace-nowrap min-w-full items-center">
            {[...partners, ...partners, ...partners].map((partner, i) => (
              <div
                key={`${partner.id}-${i}`}
                className="mx-4 md:mx-6 flex items-center justify-center w-[140px] md:w-[180px] h-[80px] group/logo cursor-pointer flex-shrink-0"
              >
                <div className="relative w-full h-full flex items-center justify-center p-4 rounded-2xl border border-transparent group-hover/logo:border-white/10 group-hover/logo:bg-white/[0.02] transition-all duration-500">
                  <Image
                    src={partner.src}
                    alt={partner.alt}
                    width={140}
                    height={90}
                    className="object-contain max-h-12 w-auto grayscale opacity-30 group-hover/logo:grayscale-0 group-hover/logo:opacity-100 transition-all duration-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
