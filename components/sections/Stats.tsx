"use client";

import { motion } from "framer-motion";

export default function Stats() {
  const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

  return (
    <section className="bg-white py-20 md:py-32 relative overflow-hidden">
      {/* Luxurious Ambient Background */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/[0.04] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-navy-deeper/[0.02] rounded-full blur-[100px] pointer-events-none" />

      {/* Very subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.01] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxyZWN0IHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgZmlsbD0ibm9uZSIvPgo8cGF0aCBkPSJNMCAwaDQwdjQwSDB6IiBmaWxsPSJub25lIi8+CjxwYXRoIGQ9Ik0wIDEwaDQwTTAgMjBoNDBNMCAzMGg0ME0xMCAwdjQwTTIwIDB2NDBNejAgMHY0MCIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9IjEiIG9wYWNpdHk9IjEiLz4KPC9zdmc+')] mix-blend-overlay" />

      <div className="container-wide px-6 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="text-center mb-16 md:mb-24"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-[2px] bg-primary" />
            <span className="text-sm uppercase text-primary font-bold tracking-widest font-body">لماذا الفضل العقاريه</span>
            <span className="w-8 h-[2px] bg-primary" />
          </div>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-navy-deeper leading-tight">
            أرقام تعكس <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#A07B40]">نجاحنا</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {[
            {
              number: "8+",
              label: "سنوات من الخبرة",
              icon: "M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
            },
            {
              number: "100+",
              label: "عقار تم بيعه",
              icon: "M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"
            },
            {
              number: "100%",
              label: "رضا العملاء",
              icon: "M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
            },
            {
              number: "50+",
              label: "مطور عقاري",
              icon: "M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-2.25c0-.414.336-.75.75-.75h4.5c.414 0 .75.336.75.75V21"
            },
          ].map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease, delay: idx * 0.1 }}
              className="group relative bg-off-white rounded-[2rem] p-8 md:p-10 border border-gray-100 hover:border-primary/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(197,160,89,0.1)] overflow-hidden cursor-default"
            >
              {/* Glowing Corner */}
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/10 rounded-full blur-[30px] group-hover:bg-primary/20 transition-colors duration-500" />
              
              {/* Giant Background Icon */}
              <div className="absolute -bottom-6 -left-6 text-gray-100 group-hover:text-primary/[0.03] transition-colors duration-500 transform group-hover:scale-110 group-hover:-rotate-12 pointer-events-none">
                <svg className="w-40 h-40" fill="currentColor" viewBox="0 0 24 24">
                  <path d={stat.icon} />
                </svg>
              </div>

              <div className="relative z-10 flex flex-col items-start text-right">
                <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-8 border border-gray-100 group-hover:scale-110 group-hover:shadow-md transition-all duration-500">
                  <svg className="w-7 h-7 text-primary group-hover:text-primary-dark transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={stat.icon} />
                  </svg>
                </div>
                <div className="text-4xl md:text-5xl font-black text-navy-deeper font-body mb-3 tracking-tighter group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-[#A07B40] transition-all duration-500">
                  {stat.number}
                </div>
                <div className="text-base md:text-lg font-medium text-navy-light/70">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
