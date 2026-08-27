"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { finishingPackages } from "@/lib/finishing";
import { FiCheckCircle } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

// Custom Select Component
const CustomSelect = ({ options, value, onChange, name }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const selectedOption = options.find((o: any) => o.value === value);

  return (
    <div className={`relative ${isOpen ? 'z-[60]' : 'z-10'}`}>
      {/* Click outside overlay */}
      {isOpen && <div className="fixed inset-0 z-40" onClick={(e) => { e.stopPropagation(); setIsOpen(false); }} />}
      
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full bg-[#161616] border ${isOpen ? 'border-primary ring-2 ring-primary/50' : 'border-white/10 hover:border-white/20'} rounded-xl px-4 py-3 text-white outline-none flex items-center justify-between transition-all relative z-50`}
      >
        <span>{selectedOption?.label}</span>
        <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary' : 'text-white/50'}`} height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><polyline points="6 9 12 15 18 9"></polyline></svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -5, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -5, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 w-full mt-2 bg-[#1a1a1a] border border-white/10 rounded-xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.8)]"
          >
            {options.map((option: any) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange({ target: { name, value: option.value } });
                  setIsOpen(false);
                }}
                className={`w-full text-right px-4 py-3 text-sm transition-colors hover:bg-white/5 ${value === option.value ? 'bg-primary/10 text-primary font-bold' : 'text-white/90'}`}
              >
                {option.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


export default function FinishingRequestPage() {
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    propertyType: "apartment",
    area: "",
    currentStatus: "red-brick",
    package: "medium",
    notes: ""
  });

  const propertyTypeOptions = [
    { value: "apartment", label: "شقة" },
    { value: "villa", label: "فيلا" },
    { value: "commercial_shop", label: "محل تجاري" },
    { value: "office", label: "مكتب" },
    { value: "other", label: "أخرى" },
  ];

  const currentStatusOptions = [
    { value: "red-brick", label: "طوب أحمر" },
    { value: "half-finished", label: "نصف تشطيب (محارة وحلوق)" },
    { value: "renewal", label: "تجديد (تكسير وإعادة تشطيب)" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | { target: { name: string, value: string } }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, ''); // أرقام فقط
    if (val.length > 10) val = val.slice(0, 10); // الحد الأقصى 10 أرقام
    
    // إجبار الرقم على أن يبدأ بـ 1 ثم (0, 1, 2, 5)
    if (val.length >= 1 && val[0] !== '1') val = '';
    if (val.length >= 2 && !['0', '1', '2', '5'].includes(val[1])) val = val[0];

    setFormData({ ...formData, phone: val });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");
    try {
      // Send the request data to the backend API
      const response = await fetch(`/api/requests`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
         throw new Error("Failed to submit request");
      }
      
      setFormStatus("success");
    } catch (error) {
      console.error("Error submitting request:", error);
      setFormStatus("idle");
      alert("حدث خطأ أثناء إرسال الطلب، يرجى المحاولة مرة أخرى.");
    }
  };

  return (
    <>
      <Navbar />
      
      <main className="pt-32 pb-24 bg-navy-deeper min-h-screen">
        <div className="container-wide px-6 max-w-4xl mx-auto">
          
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">طلب معاينة وتسعير</h1>
            <p className="text-white/60 text-lg">املأ النموذج التالي وسيتم التواصل معك من قبل المهندس المختص لتحديد موعد المعاينة المجانية.</p>
          </div>

          <div className="bg-[#111111] rounded-3xl p-8 md:p-12 shadow-soft border border-white/5">
            {formStatus === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-24 h-24 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FiCheckCircle size={48} />
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">تم إرسال طلبك بنجاح!</h2>
                <p className="text-white/60 text-lg mb-8">سيتواصل معك فريق الدعم الهندسي في أقرب وقت.</p>
                <button
                  onClick={() => setFormStatus("idle")}
                  className="bg-primary text-navy-deeper font-bold py-3 px-8 rounded-xl hover:bg-[#D6AE45] transition-colors"
                >
                  إرسال طلب آخر
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* Personal Info */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-4 border-b border-white/10 pb-2">البيانات الشخصية</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-white/80 mb-2">الاسم بالكامل <span className="text-red-500">*</span></label>
                      <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/50 outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-white/80 mb-2">رقم الهاتف <span className="text-red-500">*</span></label>
                      <div className="relative flex items-center" dir="ltr">
                        <input 
                          required 
                          type="tel" 
                          name="phone" 
                          value={formData.phone} 
                          onChange={handlePhoneChange} 
                          maxLength={10}
                          pattern="^1[0125][0-9]{8}$"
                          title="أدخل رقمك المصري بدون +20: يبدأ بـ (10, 11, 12, أو 15) متبوعاً بـ 8 أرقام"
                          placeholder="1000000000"
                          className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:ring-2 focus:ring-primary/50 outline-none text-left relative z-0" 
                        />
                        <span className="absolute left-4 text-white/60 font-bold pointer-events-none z-10">+20</span>
                      </div>
                      <p className="text-xs text-white/40 mt-2 font-medium">يجب أن يبدأ الرقم بـ 10 أو 11 أو 12 أو 15</p>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-white/80 mb-2">البريد الإلكتروني (اختياري)</label>
                      <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/50 outline-none" />
                    </div>
                  </div>
                </div>

                {/* Property Info */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-4 border-b border-white/10 pb-2">بيانات العقار</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-white/80 mb-2">نوع العقار <span className="text-red-500">*</span></label>
                      <CustomSelect 
                        name="propertyType"
                        value={formData.propertyType}
                        onChange={handleChange}
                        options={propertyTypeOptions}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-white/80 mb-2">المساحة (متر مربع) <span className="text-red-500">*</span></label>
                      <input required type="number" name="area" value={formData.area} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/50 outline-none" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-white/80 mb-2">حالة التسليم الحالية <span className="text-red-500">*</span></label>
                      <CustomSelect 
                        name="currentStatus"
                        value={formData.currentStatus}
                        onChange={handleChange}
                        options={currentStatusOptions}
                      />
                    </div>
                  </div>
                </div>

                {/* Package & Notes */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-4 border-b border-white/10 pb-2">الباقة المطلوبة والتفاصيل</h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-white/80 mb-2">اختر الباقة المناسبة لك <span className="text-red-500">*</span></label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {finishingPackages.map((pkg) => (
                          <div
                            key={pkg.id}
                            onClick={() => setFormData({ ...formData, package: pkg.id })}
                            className={`cursor-pointer rounded-xl border-2 p-4 transition-all ${
                              formData.package === pkg.id
                                ? "border-primary bg-primary/10"
                                : "border-white/10 hover:border-white/20 bg-white/5"
                            }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-bold text-white">{pkg.name}</span>
                              <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${formData.package === pkg.id ? "border-primary bg-primary text-white" : "border-white/20"}`}>
                                {formData.package === pkg.id && <FiCheckCircle size={12} className="text-navy-deeper" />}
                              </div>
                            </div>
                            <span className="text-xs text-white/60 block">{pkg.pricePerMeter ? `${pkg.pricePerMeter} ج.م / المتر` : "حسب المعاينة"}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-bold text-white/80 mb-2">ملاحظات إضافية</label>
                      <textarea name="notes" value={formData.notes} onChange={handleChange} rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/50 outline-none resize-none"></textarea>
                    </div>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={formStatus === "submitting"}
                  className="w-full bg-primary text-navy-deeper font-bold text-lg py-4 rounded-xl hover:bg-[#D6AE45] transition-colors disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                >
                  {formStatus === "submitting" ? "جاري الإرسال..." : "تأكيد الطلب"}
                </button>

              </form>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
}
