"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/components/ToastProvider";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

const contactInfo = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
    label: "رقم الهاتف",
    labelEn: "Phone",
    value: "+20 100 845 0553",
    link: "tel:+201008450553",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
    label: "البريد الإلكتروني",
    labelEn: "Email",
    value: "info@alharagawy-realestate.com",
    link: "mailto:info@alharagawy-realestate.com",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
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
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    label: "ساعات العمل",
    labelEn: "Working Hours",
    value: "الأحد — الخميس: 10:00 ص - 8:00 م",
    link: null,
  },
];

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
        type: "viewing",
        unit_id: 1,
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
    <main className="min-h-screen bg-gray-50 selection:bg-[#20d09f]/30 selection:text-[#082b26] font-body overflow-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative bg-[#082b26] min-h-[60vh] flex items-center pt-32 pb-32">
        <div className="absolute inset-0 bg-[url('/projects/project-3.png')] bg-cover bg-center opacity-[0.03] mix-blend-overlay" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#20d09f]/10 rounded-full blur-[150px] pointer-events-none" />

        <div className="container-wide px-6 relative z-10 text-center">
          {!isMounted ? null : (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease }}
              className="max-w-4xl mx-auto"
            >
              <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 border border-white/10 text-[#20d09f] mb-8 backdrop-blur-md shadow-[0_0_20px_rgba(32,208,159,0.1)]">
                <span className="w-2 h-2 rounded-full bg-[#20d09f] animate-pulse" />
                <span className="text-sm font-bold tracking-widest uppercase">
                  استشارة عقارية مجانية
                </span>
              </div>
              
              <h1 className="text-[clamp(3rem,6vw,5.5rem)] font-black text-white leading-tight font-arabic drop-shadow-2xl">
                خطوتك الأولى نحو <br /> <span className="text-[#20d09f]">الاستثمار الناجح</span>
              </h1>
              
              <p className="text-gray-300 text-xl font-light mt-8 max-w-2xl mx-auto leading-relaxed">
                سواء كنت تبحث عن فيلا فاخرة أو فرصة استثمارية بعائد مرتفع، مستشارونا العقاريون متواجدون على مدار الساعة لمساعدتك.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="relative -mt-20 z-20 pb-20">
        <div className="container-wide px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {!isMounted ? null : (
              <>
                {contactInfo.map((info, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.1, duration: 0.6, ease }}
                    className="h-full"
                  >
                    {info.link ? (
                      <a href={info.link} className="block group h-full">
                        <div className="bg-white p-10 rounded-[2.5rem] hover:-translate-y-4 hover:shadow-2xl hover:border-[#148968]/30 transition-all duration-500 h-full border border-gray-100 shadow-[0_20px_40px_rgba(0,0,0,0.04)] text-center flex flex-col items-center">
                          <div className="w-20 h-20 rounded-[1.5rem] bg-[#148968]/5 flex items-center justify-center text-[#148968] mx-auto mb-6 group-hover:bg-[#148968] group-hover:text-white group-hover:shadow-[#148968]/20 transition-all duration-500">
                            {info.icon}
                          </div>
                          <span className="text-[10px] text-gray-400 tracking-[0.2em] uppercase block mb-3 font-bold">
                            {info.labelEn}
                          </span>
                          <h4 className="text-[#082b26] font-black text-xl mb-3">{info.label}</h4>
                          <p dir="auto" className="text-gray-500 text-[15px] font-medium leading-relaxed group-hover:text-[#148968] transition-colors duration-400">
                            {info.value}
                          </p>
                        </div>
                      </a>
                    ) : (
                      <div className="bg-white p-10 rounded-[2.5rem] h-full border border-gray-100 shadow-[0_20px_40px_rgba(0,0,0,0.04)] text-center flex flex-col items-center">
                        <div className="w-20 h-20 rounded-[1.5rem] bg-[#148968]/5 flex items-center justify-center text-[#148968] mx-auto mb-6">
                          {info.icon}
                        </div>
                        <span className="text-[10px] text-gray-400 tracking-[0.2em] uppercase block mb-3 font-bold">
                          {info.labelEn}
                        </span>
                        <h4 className="text-[#082b26] font-black text-xl mb-3">{info.label}</h4>
                        <p dir="auto" className="text-gray-500 text-[15px] font-medium leading-relaxed">{info.value}</p>
                      </div>
                    )}
                  </motion.div>
                ))}
              </>
            )}
          </div>
        </div>
      </section>

      {/* Form + Map */}
      <section className="relative py-20 pb-32">
        <div className="container-wide px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Form */}
            <div className="lg:col-span-7">
              {!isMounted ? null : (
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                  className="bg-white p-10 md:p-14 rounded-[3rem] border border-gray-100 shadow-xl"
                >
                  <h2 className="text-4xl font-black text-[#082b26] mb-4">
                    أرسل لنا طلبك
                  </h2>
                  <p className="text-gray-500 text-base mb-12">
                    تواصل مع أكواد العقاريه للتسويق العقاري والتشطيبات عبر النموذج أدناه وسيقوم أحد خبرائنا العقاريين بالتواصل معك خلال ساعة واحدة.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="block text-sm font-bold text-[#082b26]">الاسم الكامل</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="أدخل اسمك الكريم"
                          className="w-full px-6 py-5 bg-gray-50 border border-gray-200 rounded-[1.5rem] text-[#082b26] text-sm placeholder:text-gray-400 focus:outline-none focus:border-[#148968] focus:bg-white focus:shadow-[0_0_0_4px_rgba(20,137,104,0.1)] transition-all duration-300"
                        />
                      </div>
                      <div className="space-y-3 md:col-span-2">
                        <label className="block text-sm font-bold text-[#082b26]">رقم الهاتف</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="010 xxxx xxxx"
                          className="w-full px-6 py-5 bg-gray-50 border border-gray-200 rounded-[1.5rem] text-[#082b26] text-sm placeholder:text-gray-400 focus:outline-none focus:border-[#148968] focus:bg-white focus:shadow-[0_0_0_4px_rgba(20,137,104,0.1)] transition-all duration-300 text-right"
                          dir="ltr"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="block text-sm font-bold text-[#082b26]">تفاصيل الطلب (اختياري)</label>
                      <textarea
                        rows={5}
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="هل تبحث عن منطقة معينة؟ أو ميزانية محددة؟ أخبرنا بالتفاصيل..."
                        className="w-full px-6 py-5 bg-gray-50 border border-gray-200 rounded-[1.5rem] text-[#082b26] text-sm placeholder:text-gray-400 focus:outline-none focus:border-[#148968] focus:bg-white focus:shadow-[0_0_0_4px_rgba(20,137,104,0.1)] transition-all duration-300 resize-none"
                      />
                    </div>

                    <div className="pt-4">
                      <button type="submit" disabled={isLoading} className={`w-full flex items-center justify-center gap-4 px-8 py-6 bg-[#082b26] text-white hover:bg-[#148968] font-black text-lg rounded-[1.5rem] transition-all duration-300 ${isLoading ? 'opacity-70 cursor-not-allowed' : 'shadow-lg hover:shadow-xl hover:-translate-y-1'}`}>
                        <span>{isLoading ? "جاري الإرسال..." : "إرسال الطلب الآن"}</span>
                        {!isLoading && (
                          <svg className="w-6 h-6 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
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
            <div className="lg:col-span-5 flex flex-col gap-8">
              {!isMounted ? null : (
                <>
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-xl relative overflow-hidden"
                  >
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#148968]/5 rounded-full blur-[40px]" />
                    <h3 className="text-2xl font-black text-[#082b26] mb-8 relative z-10">أسئلة متكررة</h3>
                    <div className="space-y-8 relative z-10">
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
                          a: "بالتأكيد! لدينا قسم متخصص لإعادة البيع يمتلك قاعدة بيانات ضخمة من العملاء المستعدين للشراء.",
                        },
                      ].map((faq, i) => (
                        <div key={i} className="group">
                          <h4 className="text-[#082b26] font-bold text-[15px] mb-3 leading-relaxed flex items-start gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#148968] mt-2 flex-shrink-0" />
                            <span>{faq.q}</span>
                          </h4>
                          <p className="text-gray-500 text-sm leading-[1.8] pr-4">{faq.a}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="rounded-[3rem] overflow-hidden relative border border-gray-200 shadow-lg flex-1"
                  >
                    <div className="absolute inset-0 bg-[url('/projects/project-9.png')] bg-cover bg-center" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#082b26]/90 via-[#082b26]/60 to-transparent" />
                    
                    <div className="absolute bottom-10 left-10 right-10 text-center">
                      <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mx-auto mb-4 border border-white/20">
                        <svg className="w-8 h-8 text-[#20d09f]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        </svg>
                      </div>
                      <h4 className="text-white font-black text-xl mb-2">بني سويف، مصر</h4>
                      <p className="text-gray-300 text-sm font-medium">الحي الأول، شرق النيل</p>
                    </div>
                  </motion.div>
                </>
              )}
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
