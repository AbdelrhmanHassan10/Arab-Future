"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import UnitCard from "@/components/UnitCard";
import { Unit } from "@/lib/units";

export default function FeaturedUnits() {
  const ease = [0.16, 1, 0.3, 1] as const;

  const [units, setUnits] = useState<Unit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/units?per_page=6`, { cache: 'no-store' })
      .then(res => res.json())
      .then(data => {
        let fetched = data.data || data || [];
        if (fetched && !Array.isArray(fetched) && Array.isArray(fetched.data)) {
          fetched = fetched.data;
        }
        setUnits(Array.isArray(fetched) ? fetched.slice(0, 6) : []);
      })
      .catch(err => {
        console.error("Failed to fetch featured units:", err);
        setUnits([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="featured-units" className="relative bg-off-white pb-24 pt-32">
      
      {/* Top Curved Divider from the previous dark section */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-0">
        <svg
          className="relative block w-full h-[60px] md:h-[100px]"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            fill="#090909"
            opacity=".15"
          ></path>
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            fill="#090909"
            opacity=".3"
          ></path>
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            fill="#090909"
          ></path>
        </svg>
      </div>

      <div className="container-wide px-6 relative z-10">
        
        {/* Floating Header */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24 relative">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-navy-deeper mb-4">
              عقاراتنا الأحدث والأبرز
            </h2>
            <div className="w-24 h-[2px] bg-primary mx-auto opacity-50 mb-6" />
            
            <Link href="/units" className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-white border border-gray-200 text-navy-dark hover:text-primary hover:border-primary/50 transition-all duration-300 shadow-sm">
              <span className="text-sm font-bold tracking-wider">عرض جميع الوحدات</span>
              <svg className="w-4 h-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
              </svg>
            </Link>
          </motion.div>
        </div>

        {/* Units Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="text-primary font-bold text-lg animate-pulse">جاري تحميل الوحدات...</div>
          </div>
        ) : units.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {units.map((unit, index) => (
              <UnitCard key={unit.id} unit={unit} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-gray-400">لا توجد وحدات متاحة حالياً.</div>
        )}

      </div>
    </section>
  );
}
