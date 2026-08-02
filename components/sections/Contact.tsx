"use client";

import { motion } from "framer-motion";

export default function Contact() {
  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <section id="contact" className="relative bg-[#0a0f1c] overflow-hidden py-24 lg:py-32">
      {/* Dynamic Backgrounds */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/[0.03] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#DFBA7F]/[0.02] rounded-full blur-[150px] pointer-events-none" />

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
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-[2px] bg-primary" />
            <span className="text-sm uppercase text-primary font-medium tracking-widest font-body">تواصل معنا</span>
            <span className="w-8 h-[2px] bg-primary" />
          </div>
          <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-bold text-white leading-tight">
            نحن هنا لنبني <span className="text-primary italic">رؤيتك</span>
          </h2>
          <p className="text-white/50 text-base mt-4 font-light">
            دعنا نناقش تفاصيل مشروعك القادم ونحوله من مجرد فكرة إلى واقع ملموس يحاكي الفخامة.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

          {/* Contact Info Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
            className="lg:col-span-5 relative"
          >
            <div className="glass-card-dark rounded-3xl p-8 lg:p-12 border border-white/5 shadow-2xl h-full flex flex-col relative overflow-hidden group">
              <div className="absolute -top-32 -left-32 w-64 h-64 bg-primary/20 rounded-full blur-[50px] group-hover:bg-primary/30 transition-colors duration-700" />

              <div className="relative z-10 flex-1">
                <h3 className="text-2xl font-bold text-white mb-10">معلومات التواصل</h3>

                <div className="space-y-8">
                  {[
                    { label: "الهاتف", value: "+20 100 123 4567", icon: "M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.25-3.95-6.847-6.847l1.293-.97c.362-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" },
                    { label: "البريد الإلكتروني", value: "info@semsarmasr.com", icon: "M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" },
                    { label: "الموقع", value: "التجمع الخامس، شارع التسعين، القاهرة، مصر", icon: "M15 10.5a3 3 0 11-6 0 3 3 0 016 0z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" },
                  ].map((info, i) => (
                    <div key={i} className="flex items-start gap-5 group/item">
                      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover/item:bg-primary/20 group-hover/item:border-primary/30 transition-all duration-300">
                        <svg className="w-5 h-5 text-white/50 group-hover/item:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d={info.icon} />
                        </svg>
                      </div>
                      <div>
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

              <div className="relative mt-12 pt-8 border-t border-white/10 flex items-center justify-between">
                <div>
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

          {/* Glass Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <form className="glass-card-dark rounded-3xl p-8 lg:p-12 border border-white/10 shadow-2xl relative overflow-hidden group/form h-full flex flex-col justify-between">

              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.01] to-transparent pointer-events-none" />

              <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {[
                  { label: "الاسم الكامل", type: "text", placeholder: "أدخل اسمك" },
                  { label: "البريد الإلكتروني", type: "email", placeholder: "أدخل بريدك" },
                  { label: "رقم الهاتف", type: "tel", placeholder: "أدخل رقم هاتفك" },
                ].map((field, i) => (
                  <div key={i} className="relative">
                    <label className="block text-xs font-medium text-white/70 mb-2">{field.label}</label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      className="w-full px-5 py-4 bg-navy-deeper/50 border border-white/10 rounded-xl text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-primary focus:bg-white/5 transition-all duration-300 shadow-inner"
                    />
                  </div>
                ))}

                <div className="relative">
                  <label className="block text-xs font-medium text-white/70 mb-2">نوع المشروع</label>
                  <select className="w-full px-5 py-4 bg-navy-deeper/50 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-primary focus:bg-white/5 transition-all duration-300 appearance-none cursor-pointer shadow-inner">
                    <option value="">اختر نوع العقار</option>
                    <option value="residential">شقة سكنية</option>
                    <option value="commercial">محل تجاري</option>
                    <option value="admin">مقر إداري</option>
                    <option value="villa">فيلا مستقلة</option>
                    <option value="chalet">شاليه / ساحلي</option>
                    <option value="consulting">استشارة عقارية</option>
                    <option value="other">أخرى</option>
                  </select>
                  <div className="absolute left-5 top-[46px] pointer-events-none text-white/50">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="relative z-10 mb-8 flex-1">
                <label className="block text-xs font-medium text-white/70 mb-2">رسالتك</label>
                <textarea
                  rows={5}
                  placeholder="أخبرنا عن مشروعك وتفاصيله..."
                  className="w-full h-[calc(100%-24px)] px-5 py-4 bg-navy-deeper/50 border border-white/10 rounded-xl text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-primary focus:bg-white/5 transition-all duration-300 resize-none shadow-inner"
                />
              </div>

              <div className="relative z-10">
                <button type="submit" className="w-full group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary text-navy-deeper font-bold rounded-xl overflow-hidden transition-all duration-500 hover:shadow-[0_0_20px_rgba(191,154,95,0.3)]">
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

        </div>
      </div>
    </section>
  );
}
