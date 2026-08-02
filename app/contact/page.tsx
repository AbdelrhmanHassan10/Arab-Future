"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

const contactInfo = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
    label: "الهاتف",
    labelEn: "Phone",
    value: "+966 53 808 6128",
    link: "tel:+966538086128",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
    label: "البريد الإلكتروني",
    labelEn: "Email",
    value: "info@arabfuture.com",
    link: "mailto:info@arabfuture.com",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
    label: "الموقع",
    labelEn: "Location",
    value: "حفصة بنت عمر 3362، حي الروضة 7708، الرياض 13211",
    link: null,
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    label: "ساعات العمل",
    labelEn: "Working Hours",
    value: "السبت — الخميس: 9:00 ص - 5:00 م",
    link: null,
  },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-navy-dark">
      <Navbar />

      {/* Hero */}
      <section className="relative bg-navy-deeper">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[150px] pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
        </div>

        <div className="relative pt-40 pb-20 pad-x">
          <div className="container-wide text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease }}
            >
              <span className="text-caption uppercase text-primary font-medium tracking-widest">
                تواصل معنا
              </span>
              <h1 className="text-[clamp(2rem,4.5vw,3.8rem)] font-bold text-white mt-4">
                نسعد بتواصلك
              </h1>
              <p className="text-white/40 text-subhead font-light mt-5 max-w-xl mx-auto leading-[1.95]">
                سواء كنت تخطط لمشروع جديد أو تحتاج استشارة فنية،
                فريقنا جاهز لمساعدتك
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="relative pt-8">
        <div className="pad-x">
          <div className="container-wide">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 relative z-10">
              {contactInfo.map((info, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.08, duration: 0.6, ease }}
                >
                  {info.link ? (
                    <a href={info.link} className="block group h-full">
                      <div className="glass-card-dark p-6 text-center hover:-translate-y-2 hover:shadow-card-hover hover:border-primary/30 transition-all duration-500 h-full">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary mx-auto mb-4 group-hover:from-primary group-hover:to-primary-dark group-hover:text-white transition-all duration-500 group-hover:shadow-glow">
                          {info.icon}
                        </div>
                        <span className="text-[10px] text-white/50 tracking-widest uppercase block mb-1.5 font-body">
                          {info.labelEn}
                        </span>
                        <h4 className="text-white font-semibold text-sm mb-1">{info.label}</h4>
                        <p dir="auto" className="text-white/70 text-sm font-light group-hover:text-primary transition-colors duration-400">
                          {info.value}
                        </p>
                      </div>
                    </a>
                  ) : (
                    <div className="glass-card-dark p-6 text-center h-full">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary mx-auto mb-4">
                        {info.icon}
                      </div>
                      <span className="text-[10px] text-white/50 tracking-widest uppercase block mb-1.5 font-body">
                        {info.labelEn}
                      </span>
                      <h4 className="text-white font-semibold text-sm mb-1">{info.label}</h4>
                      <p dir="auto" className="text-white/70 text-sm font-light">{info.value}</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Form + Map */}
      <section className="relative bg-navy-dark overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/[0.02] rounded-full blur-[120px] pointer-events-none" />

        <div className="pad-y-lg relative">
          <div className="pad-x container-wide">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              {/* Form */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="lg:col-span-7"
              >
                <span className="text-caption uppercase text-primary font-medium tracking-widest">
                  أرسل رسالة
                </span>
                <h2 className="text-display-sm font-bold text-white mt-3 mb-8">
                  أخبرنا عن مشروعك
                </h2>

                <form className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs text-white/60 mb-2">الاسم الكامل</label>
                      <input
                        type="text"
                        placeholder="أدخل اسمك"
                        className="w-full px-5 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-white/60 mb-2">البريد الإلكتروني</label>
                      <input
                        type="email"
                        placeholder="أدخل بريدك"
                        className="w-full px-5 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-white/60 mb-2">رقم الهاتف</label>
                      <input
                        type="tel"
                        placeholder="أدخل رقم هاتفك"
                        className="w-full px-5 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-white/60 mb-2">نوع المشروع</label>
                      <select className="w-full px-5 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl text-white text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-400 appearance-none cursor-pointer">
                        <option value="" className="bg-navy-dark text-white">اختر نوع المشروع</option>
                        <option value="residential" className="bg-navy-dark text-white">سكني</option>
                        <option value="commercial" className="bg-navy-dark text-white">تجاري</option>
                        <option value="palace" className="bg-navy-dark text-white">قصر</option>
                        <option value="compound" className="bg-navy-dark text-white">كمبوند</option>
                        <option value="restoration" className="bg-navy-dark text-white">ترميم</option>
                        <option value="consulting" className="bg-navy-dark text-white">استشارة فنية</option>
                        <option value="other" className="bg-navy-dark text-white">أخرى</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-white/60 mb-2">الموضوع</label>
                    <input
                      type="text"
                      placeholder="موضوع الرسالة"
                      className="w-full px-5 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-white/60 mb-2">رسالتك</label>
                    <textarea
                      rows={6}
                      placeholder="أخبرنا عن مشروعك بالتفصيل..."
                      className="w-full px-5 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-400 resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button type="submit" className="btn-primary">
                      <span>إرسال الرسالة</span>
                      <svg className="w-4 h-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </button>
                  </div>
                </form>
              </motion.div>

              {/* Side info */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="lg:col-span-5"
              >
                {/* Map placeholder */}
                <div className="bg-navy-deeper rounded-[24px] overflow-hidden mb-6 relative">
                  <div className="aspect-[4/3] flex items-center justify-center relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-navy-deeper to-navy-dark" />
                    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[200px] h-[200px] bg-primary/10 rounded-full blur-[60px] pointer-events-none" />
                    <div className="relative text-center">
                      <div className="w-16 h-16 rounded-full bg-white/[0.06] flex items-center justify-center mx-auto mb-4">
                        <svg className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        </svg>
                      </div>
                      <h4 className="text-white font-semibold text-sm">الرياض، المملكة العربية السعودية</h4>
                      <p className="text-white text-xs mt-1">الموقع على الخريطة</p>
                    </div>
                  </div>
                </div>

                {/* FAQ */}
                <div className="glass-card-dark p-7">
                  <h3 className="text-white font-bold text-base mb-5">أسئلة شائعة</h3>
                  <div className="space-y-4">
                    {[
                      {
                        q: "كم يستغرق تنفيذ المشروع؟",
                        a: "يعتمد على حجم المشروع ونوعه. نقدم جدول زمني تفصيلي بعد المعاينة.",
                      },
                      {
                        q: "هل تقدمون استشارات مجانية؟",
                        a: "نعم، نقدم الدعم الاستشاري لكافة العملاء حتى غير المتعاقدين معنا.",
                      },
                      {
                        q: "ما هي مناطق التغطية؟",
                        a: "نعمل في جميع مناطق المملكة العربية السعودية.",
                      },
                    ].map((faq, i) => (
                      <div key={i} className="border-b border-white/[0.05] pb-4 last:border-0 last:pb-0">
                        <h4 className="text-white font-semibold text-sm mb-1.5">{faq.q}</h4>
                        <p className="text-white/70 text-[13px] font-light leading-[1.8]">{faq.a}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
