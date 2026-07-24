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
    <section className="relative bg-section-gray overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/[0.02] rounded-full blur-[100px] pointer-events-none" />

      <div className="pad-y relative">
        <div className="pad-x container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-14"
          >
            <span className="text-2xl uppercase text-primary font-semibold tracking-widest">
              شركاء النجاح
            </span>
            <h2 className="text-display font-bold text-navy mt-4">
              نفخر بثقة عملائنا
            </h2>
          </motion.div>

          {/* Logos grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 max-w-4xl mx-auto">
            {partners.map((partner, i) => (
              <motion.div
                key={partner.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, duration: 0.5 }}
                className="group glass-card p-5 flex items-center justify-center aspect-[3/2] hover:-translate-y-1 hover:shadow-card-hover hover:border-primary/15 transition-all duration-500"
              >
                <Image
                  src={partner.src}
                  alt={partner.alt}
                  width={140}
                  height={90}
                  className="object-contain max-h-16 w-auto grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="divider" />
    </section>
  );
}
