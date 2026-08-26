"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
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
    label: "رقم الهاتف",
    labelEn: "Phone",
    value: "01008450553",
    link: "tel:+201008450553",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
    label: "البريد الإلكتروني",
    labelEn: "Email",
    value: "info@semsarbenisuef.com",
    link: "mailto:info@semsarbenisuef.com",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
    label: "المقر الرئيسي",
    labelEn: "Location",
    value: "الحي الأول، شرق النيل، بني سويف",
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
    value: "الأحد — الخميس: 10:00 ص - 8:00 م",
    link: null,
  },
];

import { useToast } from "@/components/ToastProvider";

export default function ContactPage() {
  const [isMounted, setIsMounted] = useState(false);
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone) {
      showToast("يرجى إدخال الاسم ورقم الهاتف", "error");
      return;
    }

    setIsLoading(true);
    try {
      const payload = {
        name: formData.name,
        phone: formData.phone,
        type: "viewing", // Backend only supports 'viewing' currently
        unit_id: 1, // Adding dummy unit_id in case backend validation strictly requires it
        message: formData.message || "لا توجد تفاصيل إضافية",
      };

      const res = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const responseData = await res.json().catch(() => null);

      if (!res.ok) {
        console.error("Backend Error Response:", responseData);
        throw new Error(responseData?.message || "Failed to submit request");
      }

      showToast("تم إرسال طلبك بنجاح! سنتواصل معك قريباً", "success");
      setFormData({ name: "", phone: "", message: "" });
    } catch (error) {
      console.error(error);
      showToast("حدث خطأ أثناء إرسال الطلب (تفاصيل في الكونسول)", "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <main className="min-h-screen bg-navy-dark selection:bg-primary/30 selection:text-white">
      <Navbar />

      {/* Hero */}
      <section className="relative bg-navy-deeper overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
        </div>

        <div className="relative pt-40 pb-20 pad-x">
          <div className="container-wide text-center">
            {!isMounted ? null : (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease }}
              >
                <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary mb-6 shadow-glow">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-sm font-bold tracking-widest uppercase">
                    استشارة عقارية مجانية
                  </span>
                </div>
                
                <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] font-black text-white leading-tight">
                  خطوتك الأولى نحو <br /> <span className="text-primary">الاستثمار الناجح</span>
                </h1>
                
                <p className="text-white/60 text-lg md:text-xl font-medium mt-6 max-w-2xl mx-auto leading-relaxed">
                  سواء كنت تبحث عن فيلا فاخرة أو فرصة استثمارية بعائد مرتفع، مستشارونا العقاريون متواجدون على مدار الساعة لمساعدتك.
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="relative -mt-10 z-10 pb-16">
        <div className="pad-x">
          <div className="container-wide">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {!isMounted ? null : (
                <>
                  {contactInfo.map((info, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + i * 0.1, duration: 0.6, ease }}
                    >
                      {info.link ? (
                        <a href={info.link} className="block group h-full">
                          <div className="glass-card-dark p-8 text-center rounded-[2rem] hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(191,154,95,0.15)] hover:border-primary/30 transition-all duration-500 h-full border border-white/5 bg-navy-dark/80 backdrop-blur-xl">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary mx-auto mb-5 border border-primary/20 group-hover:from-primary group-hover:to-primary-dark group-hover:text-white transition-all duration-500 group-hover:shadow-glow">
                              {info.icon}
                            </div>
                            <span className="text-[11px] text-white/40 tracking-widest uppercase block mb-2 font-body font-bold">
                              {info.labelEn}
                            </span>
                            <h4 className="text-white font-bold text-lg mb-2">{info.label}</h4>
                            <p dir="auto" className="text-white/70 text-base font-medium group-hover:text-primary transition-colors duration-400">
                              {info.value}
                            </p>
                          </div>
                        </a>
                      ) : (
                        <div className="glass-card-dark p-8 text-center rounded-[2rem] h-full border border-white/5 bg-navy-dark/80 backdrop-blur-xl">
                          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary mx-auto mb-5 border border-primary/20">
                            {info.icon}
                          </div>
                          <span className="text-[11px] text-white/40 tracking-widest uppercase block mb-2 font-body font-bold">
                            {info.labelEn}
                          </span>
                          <h4 className="text-white font-bold text-lg mb-2">{info.label}</h4>
                          <p dir="auto" className="text-white/70 text-base font-medium">{info.value}</p>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Form + Map */}
      <section className="relative overflow-hidden pb-24">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/[0.03] rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10">
          <div className="pad-x container-wide">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
              
              {/* Form */}
              <div className="lg:col-span-7">
                {!isMounted ? null : (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="glass-card-dark p-8 md:p-12 rounded-[3rem] border border-white/5"
                  >
                    <h2 className="text-3xl font-black text-white mb-2">
                      أخبرنا عن طلبك
                    </h2>
                    <p className="text-white/50 text-sm font-medium mb-10">
                      تواصل مع سمسار بني سويف عبر النموذج أدناه وسيقوم أحد خبرائنا العقاريين بالتواصل معك خلال ساعة واحدة.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-white/80">الاسم الكامل</label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="أدخل اسمك الكريم"
                            className="w-full px-6 py-4 bg-navy-deeper border border-white/5 rounded-2xl text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all duration-300"
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <label className="block text-sm font-medium text-white/80">رقم الهاتف</label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="010 xxxx xxxx"
                            className="w-full px-6 py-4 bg-navy-deeper border border-white/5 rounded-2xl text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all duration-300 text-right"
                            dir="ltr"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-white/80">تفاصيل الطلب (اختياري)</label>
                        <textarea
                          rows={4}
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="هل تبحث عن منطقة معينة؟ أو ميزانية محددة؟ أخبرنا بالتفاصيل..."
                          className="w-full px-6 py-4 bg-navy-deeper border border-white/5 rounded-2xl text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all duration-300 resize-none"
                        />
                      </div>

                      <div className="pt-4">
                        <button type="submit" disabled={isLoading} className={`w-full flex items-center justify-center gap-3 px-8 py-4 bg-primary text-navy-deeper font-bold rounded-2xl transition-all duration-300 ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-white hover:shadow-[0_0_30px_rgba(191,154,95,0.4)]'}`}>
                          <span>{isLoading ? "جاري الإرسال..." : "إرسال الطلب الآن"}</span>
                          {!isLoading && (
                            <svg className="w-5 h-5 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          )}
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}
              </div>

              {/* Side info (Map + FAQ) */}
              <div className="lg:col-span-5">
                {!isMounted ? null : (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                  >
                    {/* Map placeholder */}
                    <div className="bg-navy-deeper rounded-[3rem] overflow-hidden mb-8 relative border border-white/5 shadow-2xl">
                      <div className="aspect-[4/3] flex items-center justify-center relative group cursor-pointer">
                        <Image 
                          src="/projects/project-9.png"
                          alt="Cairo Skyline"
                          fill
                          className="object-cover opacity-30 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-navy-deeper/90 to-navy-dark/90" />
                        <div className="absolute inset-0 border-[10px] border-white/[0.02] rounded-[3rem] pointer-events-none" />
                        
                        <div className="relative text-center z-10">
                          <div className="w-20 h-20 rounded-full bg-primary/20 backdrop-blur-md flex items-center justify-center mx-auto mb-4 border border-primary/30 shadow-glow group-hover:scale-110 transition-transform duration-500">
                            <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                            </svg>
                          </div>
                          <h4 className="text-white font-bold text-lg mb-1 drop-shadow-lg">القاهرة، مصر</h4>
                          <p className="text-white/60 text-sm font-medium">التجمع الخامس، شارع التسعين</p>
                        </div>
                      </div>
                    </div>

                    {/* FAQ */}
                    <div className="glass-card-dark p-8 md:p-10 rounded-[3rem] border border-white/5">
                      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                        <div className="w-1.5 h-6 bg-primary rounded-full" />
                        أسئلة متكررة
                      </h3>
                      <div className="space-y-6">
                        {[
                          {
                            q: "هل يتم تحصيل عمولة من المشتري؟",
                            a: "لا، نحن لا نحصل على أي عمولات من المشتري عند شراء عقار جديد من المطور مباشرة (Primary).",
                          },
                          {
                            q: "هل تقدمون تسهيلات في السداد؟",
                            a: "نعم، نوفر وحدات بأنظمة سداد مرنة تبدأ من 0% مقدم، وتقسيط يصل إلى 10 سنوات بدون فوائد.",
                          },
                          {
                            q: "هل يمكنكم بيع عقاري الحالي؟",
                            a: "بالتأكيد! لدينا قسم متخصص لإعادة البيع (Resale) يمتلك قاعدة بيانات ضخمة من العملاء المستعدين للشراء.",
                          },
                        ].map((faq, i) => (
                          <div key={i} className="border-b border-white/[0.05] pb-5 last:border-0 last:pb-0">
                            <h4 className="text-white font-bold text-sm mb-2 leading-relaxed">{faq.q}</h4>
                            <p className="text-white/60 text-sm font-medium leading-[1.8]">{faq.a}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
