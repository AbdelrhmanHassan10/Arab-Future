"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";

const projectTypes = [
  { value: "", label: "اختر نوع العقار" },
  { value: "residential", label: "شقة سكنية" },
  { value: "commercial", label: "محل تجاري" },
  { value: "admin", label: "مقر إداري" },
  { value: "villa", label: "فيلا مستقلة" },
  { value: "chalet", label: "شاليه / ساحلي" },
  { value: "consulting", label: "استشارة عقارية" },
  { value: "other", label: "أخرى" },
];

export default function Contact() {
  const ease = [0.16, 1, 0.3, 1] as const;
  const [selectedType, setSelectedType] = useState(projectTypes[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <section id="contact" className="relative py-24 md:py-32 bg-[#090909] overflow-hidden border-t border-white/5">

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxyZWN0IHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgZmlsbD0ibm9uZSIvPgo8cGF0aCBkPSJNMCAwaDQwdjQwSDB6IiBmaWxsPSJub25lIi8+CjxwYXRoIGQ9Ik0wIDEwaDQwTTAgMjBoNDBNMCAzMGg0ME0xMCAwdjQwTTIwIDB2NDBNejAgMHY0MCIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjEiIG9wYWNpdHk9IjEiLz4KPC9zdmc+')] mix-blend-overlay" />

      <div className="container-wide px-6 relative z-10">
        {/* Header */}
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
              تواصل معنا
            </span>
            <span className="w-3 h-3 rounded-full bg-primary animate-pulse" />
          </div>
          <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-bold text-white leading-tight">
            نحن هنا لنبني <span className="text-primary">رؤيتك</span>
          </h2>
          <p className="text-white/50 text-base mt-4 font-light">
            دعنا نناقش تفاصيل مشروعك القادم ونحوله من مجرد فكرة إلى واقع ملموس يحاكي الفخامة.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

          {/* Glass Form (Now First / Right) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
            className="lg:col-span-7"
          >
            <form className="glass-card-dark rounded-[2rem] p-8 lg:p-12 border border-white/5 shadow-2xl relative overflow-hidden group/form flex flex-col">

              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.01] to-transparent pointer-events-none" />

              <div className="relative z-[100] grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {[
                  { label: "الاسم الكامل", type: "text", placeholder: "أدخل اسمك" },
                  { label: "البريد الإلكتروني", type: "email", placeholder: "أدخل بريدك" },
                  { label: "رقم الهاتف", type: "tel", placeholder: "أدخل رقم هاتفك" },
                ].map((field, i) => (
                  <div key={i} className="relative">
                    <label className="block text-right text-xs font-medium text-white/70 mb-2">{field.label}</label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      dir="rtl"
                      className="w-full text-right px-5 py-4 bg-[#090909]/50 border border-white/10 rounded-xl text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-primary focus:bg-white/5 transition-all duration-300 shadow-inner"
                    />
                  </div>
                ))}

                <div className="relative" ref={dropdownRef}>
                  <label className="block text-right text-xs font-medium text-white/70 mb-2">نوع المشروع</label>
                  
                  {/* Custom Select Button */}
                  <div
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className={`w-full flex items-center justify-between px-5 py-4 bg-[#090909]/50 border rounded-xl text-sm cursor-pointer shadow-inner transition-all duration-300 ${isDropdownOpen ? 'border-primary bg-white/5' : 'border-white/10 hover:bg-white/5'}`}
                  >
                    <span className={selectedType.value === "" ? "text-white/50" : "text-white"}>
                      {selectedType.label}
                    </span>
                    <svg className={`w-4 h-4 text-white/50 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </div>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute z-50 w-full mt-2 py-2 bg-[#121827] border border-white/10 rounded-xl shadow-2xl backdrop-blur-xl overflow-hidden"
                      >
                        {projectTypes.map((type, i) => (
                          <div
                            key={i}
                            onClick={() => {
                              setSelectedType(type);
                              setIsDropdownOpen(false);
                            }}
                            className={`px-5 py-3 text-right text-sm cursor-pointer transition-colors ${
                              selectedType.value === type.value
                                ? "bg-primary/20 text-primary font-bold"
                                : "text-white/70 hover:bg-white/5 hover:text-white"
                            }`}
                          >
                            {type.label}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  {/* Hidden input for form submission */}
                  <input type="hidden" name="projectType" value={selectedType.value} />
                </div>
              </div>

              <div className="relative z-10 mb-8 flex-grow">
                <label className="block text-right text-xs font-medium text-white/70 mb-2">رسالتك</label>
                <textarea
                  rows={5}
                  dir="rtl"
                  placeholder="أخبرنا عن مشروعك وتفاصيله..."
                  className="w-full h-full min-h-[120px] text-right px-5 py-4 bg-[#090909]/50 border border-white/10 rounded-xl text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-primary focus:bg-white/5 transition-all duration-300 resize-none shadow-inner"
                />
              </div>

              <div className="relative z-0 mt-auto">
                <button type="submit" className="w-full group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary text-navy-deeper font-bold rounded-xl overflow-hidden transition-all duration-500 hover:shadow-[0_0_20px_rgba(191,154,95,0.3)] hover:-translate-y-1">
                  <span className="relative z-10 text-[15px]">إرسال الرسالة</span>
                  <div className="relative z-10 w-6 h-6 rounded-full bg-navy-deeper/10 flex items-center justify-center group-hover:bg-navy-deeper/20 transition-colors">
                    <svg className="w-3.5 h-3.5 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </button>
              </div>
            </form>
          </motion.div>

          {/* Contact Info Card (Now Second / Left) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="glass-card-dark rounded-[2rem] p-8 lg:p-12 border border-white/5 shadow-2xl h-full flex flex-col relative overflow-hidden group">
              <div className="absolute -top-32 -left-32 w-64 h-64 bg-primary/20 rounded-full blur-[50px] group-hover:bg-primary/30 transition-colors duration-700" />

              <div className="relative z-10 flex-1">
                <h3 className="text-2xl font-bold text-white mb-10 text-right">معلومات التواصل</h3>

                <div className="space-y-8">
                  {[
                    { label: "الهاتف", value: "+20 100 123 4567", icon: "M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.25-3.95-6.847-6.847l1.293-.97c.362-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" },
                    { label: "البريد الإلكتروني", value: "info@semsarmasr.com", icon: "M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" },
                    { label: "الموقع", value: "التجمع الخامس، شارع التسعين، القاهرة، مصر", icon: "M15 10.5a3 3 0 11-6 0 3 3 0 016 0z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" },
                  ].map((info, i) => (
                    <div key={i} className="flex items-center gap-5 group/item">
                      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover/item:bg-primary/20 group-hover/item:border-primary/30 transition-all duration-300">
                        <svg className="w-5 h-5 text-white/50 group-hover/item:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d={info.icon} />
                        </svg>
                      </div>
                      <div className="flex flex-col text-right">
                        <span className="text-[11px] text-white/40 uppercase tracking-wider block mb-1 font-body">
                          {info.label}
                        </span>
                        <span dir="auto" className="text-white/90 text-sm font-medium leading-[1.6]">
                          {info.value}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative mt-12 pt-8 border-t border-white/10 flex items-center justify-start">
                <div className="text-right w-full">
                  <span className="text-[10px] text-primary uppercase tracking-widest block mb-1 font-body font-bold">
                    ساعات العمل
                  </span>
                  <span className="text-white/60 text-sm font-light">
                    السبت — الخميس: 9:00 ص - 5:00 م
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
