"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useToast } from "@/components/ToastProvider";

export default function Contact() {
  const ease = [0.16, 1, 0.3, 1] as const;
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
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
        message: formData.message || "لا توجد تفاصيل إضافية",
      };

      console.log("🚀 [DEBUG] Data being sent to Backend:", payload);

      const res = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      console.log("🚀 [DEBUG] Response Status:", res.status);
      
      const responseData = await res.json().catch(() => null);
      console.log("🚀 [DEBUG] Response Data:", responseData);

      if (!res.ok) {
        console.error("Backend Error Response:", responseData);
        throw new Error(responseData?.message || "Failed to submit request");
      }

      showToast("تم إرسال طلبك بنجاح! سنتواصل معك قريباً", "success");
      
      // Reset form
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error("🚀 [DEBUG] Request Failed:", error);
      showToast("حدث خطأ أثناء إرسال الطلب (التفاصيل في الكونسول).", "error");
    } finally {
      setIsLoading(false);
    }
  };

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
            <form onSubmit={handleSubmit} className="glass-card-dark rounded-[2rem] p-8 lg:p-12 border border-white/5 shadow-2xl relative overflow-hidden group/form flex flex-col">

              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.01] to-transparent pointer-events-none" />

              <div className="relative z-[100] grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="relative">
                  <label className="block text-right text-xs font-medium text-white/70 mb-2">الاسم الكامل</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="أدخل اسمك"
                    dir="rtl"
                    className="w-full text-right px-5 py-4 bg-[#090909]/50 border border-white/10 rounded-xl text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-primary focus:bg-white/5 transition-all duration-300 shadow-inner"
                  />
                </div>
                <div className="relative">
                  <label className="block text-right text-xs font-medium text-white/70 mb-2">البريد الإلكتروني</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="أدخل بريدك"
                    dir="rtl"
                    className="w-full text-right px-5 py-4 bg-[#090909]/50 border border-white/10 rounded-xl text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-primary focus:bg-white/5 transition-all duration-300 shadow-inner"
                  />
                </div>
                <div className="relative md:col-span-2">
                  <label className="block text-right text-xs font-medium text-white/70 mb-2">رقم الهاتف</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="أدخل رقم هاتفك"
                    dir="rtl"
                    className="w-full text-right px-5 py-4 bg-[#090909]/50 border border-white/10 rounded-xl text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-primary focus:bg-white/5 transition-all duration-300 shadow-inner"
                  />
                </div>
              </div>

              <div className="relative z-10 mb-8 flex-grow">
                <label className="block text-right text-xs font-medium text-white/70 mb-2">رسالتك</label>
                <textarea
                  rows={5}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  dir="rtl"
                  placeholder="أخبرنا عن مشروعك وتفاصيله..."
                  className="w-full h-full min-h-[120px] text-right px-5 py-4 bg-[#090909]/50 border border-white/10 rounded-xl text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-primary focus:bg-white/5 transition-all duration-300 resize-none shadow-inner"
                />
              </div>

              <div className="relative z-0 mt-auto">
                <button 
                  type="submit" 
                  disabled={isLoading}
                  className={`w-full group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary text-navy-deeper font-bold rounded-xl overflow-hidden transition-all duration-500 ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-[0_0_20px_rgba(191,154,95,0.3)] hover:-translate-y-1'}`}
                >
                  <span className="relative z-10 text-[15px]">
                    {isLoading ? "جاري الإرسال..." : "إرسال الرسالة"}
                  </span>
                  {!isLoading && (
                    <div className="relative z-10 w-6 h-6 rounded-full bg-navy-deeper/10 flex items-center justify-center group-hover:bg-navy-deeper/20 transition-colors">
                      <svg className="w-3.5 h-3.5 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  )}
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
                    { label: "الهاتف", value: "+20 100 845 0553", icon: "M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.25-3.95-6.847-6.847l1.293-.97c.362-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" },
                    { label: "البريد الإلكتروني", value: "info@alfadl-realestate.com", icon: "M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" },
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

