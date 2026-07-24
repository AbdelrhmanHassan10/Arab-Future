"use client";

import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section id="contact" className="relative bg-white overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/[0.03] rounded-full blur-[100px] pointer-events-none" />

      <div className="pad-y relative">
        <div className="pad-x container-wide">
          {/* Header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-14">
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="text-2xl uppercase text-primary font-semibold tracking-widest">
                  تواصل معنا
                </span>
                <h2 className="text-display font-bold text-navy mt-4">
                  ابدأ مشروعك
                </h2>
              </motion.div>
            </div>

            <div className="lg:col-span-5 lg:col-start-7 flex items-end">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="text-subhead text-warm-gray leading-[1.9]"
              >
                نسعد بالتواصل معكم ومناقشة أفكاركم ومشاريعكم المعمارية
              </motion.p>
            </div>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6">
            {/* Contact info - glassmorphism dark */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-4"
            >
              <div className="bg-navy-deeper rounded-[24px] p-8 lg:p-10 h-full flex flex-col justify-between relative overflow-hidden">
                {/* Glow */}
                <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-primary/10 rounded-full blur-[80px] pointer-events-none" />

                <div className="relative">
                  <h3 className="text-white font-semibold text-base mb-8">
                    معلومات التواصل
                  </h3>

                  <div className="space-y-6">
                    {[
                      { label: "الهاتف", value: "+966 53 808 6128", labelEn: "Phone" },
                      { label: "البريد", value: "info@arabfuture.com", labelEn: "Email" },
                      { label: "الموقع", value: "حفصة بنت عمر 3362، حي الروضة 7708، الرياض 13211", labelEn: "Location" },
                    ].map((info, i) => (
                      <div key={i} className="group">
                        <span className="text-[10px] text-white uppercase tracking-widest block mb-1.5 font-body">
                          {info.labelEn}
                        </span>
                        <span dir="auto" className="text-white/70 text-sm group-hover:text-primary transition-colors duration-400">
                          {info.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative mt-12 pt-6 border-t border-white/[0.06]">
                  <span className="text-[10px] text-white uppercase tracking-widest block mb-1.5 font-body">
                    Working Hours
                  </span>
                  <span className="text-white/50 text-sm">
                    السبت — الخميس: 9:00 ص - 5:00 م
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Form - glassmorphism */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="lg:col-span-8"
            >
              <form className="glass-card p-8 lg:p-10 h-full flex flex-col">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                  {[
                    { label: "الاسم الكامل", type: "text", placeholder: "أدخل اسمك" },
                    { label: "البريد الإلكتروني", type: "email", placeholder: "أدخل بريدك" },
                    { label: "رقم الهاتف", type: "tel", placeholder: "أدخل رقم هاتفك" },
                  ].map((field, i) => (
                    <div key={i}>
                      <label className="block text-xs text-navy/45 mb-2">
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        className="w-full px-4 py-3.5 bg-white/60 backdrop-blur-sm border border-navy/[0.08] rounded-xl text-navy text-sm placeholder:text-navy/25 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all duration-400"
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block text-xs text-navy/45 mb-2">
                      نوع المشروع
                    </label>
                    <select className="w-full px-4 py-3.5 bg-white/60 backdrop-blur-sm border border-navy/[0.08] rounded-xl text-navy text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all duration-400 appearance-none cursor-pointer">
                      <option value="">اختر نوع المشروع</option>
                      <option value="residential">سكني</option>
                      <option value="commercial">تجاري</option>
                      <option value="palace">قصر</option>
                      <option value="compound">كمبوند</option>
                      <option value="restoration">ترميم</option>
                      <option value="consulting">استشارة فنية</option>
                      <option value="other">أخرى</option>
                    </select>
                  </div>
                </div>

                <div className="mb-6 flex-1">
                  <label className="block text-xs text-navy/45 mb-2">
                    رسالتك
                  </label>
                  <textarea
                    rows={4}
                    placeholder="أخبرنا عن مشروعك..."
                    className="w-full px-4 py-3.5 bg-white/60 backdrop-blur-sm border border-navy/[0.08] rounded-xl text-navy text-sm placeholder:text-navy/25 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all duration-400 resize-none"
                  />
                </div>

                <div>
                  <button type="submit" className="btn-primary">
                    <span>إرسال الرسالة</span>
                    <svg className="w-4 h-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
