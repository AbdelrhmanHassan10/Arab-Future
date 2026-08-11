"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { finishingPackages } from "@/lib/finishing";
import { FiCheckCircle } from "react-icons/fi";
import { motion } from "framer-motion";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");
    // Simulate API call
    setTimeout(() => {
      setFormStatus("success");
    }, 1500);
  };

  return (
    <>
      <Navbar />
      
      <main className="pt-32 pb-24 bg-off-white min-h-screen">
        <div className="container-wide px-6 max-w-4xl mx-auto">
          
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-navy-dark mb-4">طلب معاينة وتسعير</h1>
            <p className="text-gray-500 text-lg">املأ النموذج التالي وسيتم التواصل معك من قبل المهندس المختص لتحديد موعد المعاينة المجانية.</p>
          </div>

          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-soft border border-gray-100">
            {formStatus === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FiCheckCircle size={48} />
                </div>
                <h2 className="text-3xl font-bold text-navy-dark mb-4">تم إرسال طلبك بنجاح!</h2>
                <p className="text-gray-500 text-lg mb-8">سيتواصل معك فريق الدعم الهندسي في أقرب وقت.</p>
                <button
                  onClick={() => setFormStatus("idle")}
                  className="bg-navy-deeper text-white font-bold py-3 px-8 rounded-xl hover:bg-black transition-colors"
                >
                  إرسال طلب آخر
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* Personal Info */}
                <div>
                  <h3 className="text-xl font-bold text-navy-dark mb-4 border-b border-gray-100 pb-2">البيانات الشخصية</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">الاسم بالكامل <span className="text-red-500">*</span></label>
                      <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">رقم الهاتف <span className="text-red-500">*</span></label>
                      <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} dir="ltr" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 outline-none text-right" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-gray-700 mb-2">البريد الإلكتروني (اختياري)</label>
                      <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 outline-none" />
                    </div>
                  </div>
                </div>

                {/* Property Info */}
                <div>
                  <h3 className="text-xl font-bold text-navy-dark mb-4 border-b border-gray-100 pb-2">بيانات العقار</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">نوع العقار <span className="text-red-500">*</span></label>
                      <select required name="propertyType" value={formData.propertyType} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 outline-none">
                        <option value="apartment">شقة</option>
                        <option value="villa">فيلا</option>
                        <option value="shop">محل تجاري</option>
                        <option value="office">مكتب</option>
                        <option value="other">أخرى</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">المساحة (متر مربع) <span className="text-red-500">*</span></label>
                      <input required type="number" name="area" value={formData.area} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 outline-none" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-gray-700 mb-2">حالة التسليم الحالية <span className="text-red-500">*</span></label>
                      <select required name="currentStatus" value={formData.currentStatus} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 outline-none">
                        <option value="red-brick">طوب أحمر</option>
                        <option value="half-finished">نصف تشطيب (محارة وحلوق)</option>
                        <option value="renewal">تجديد (تكسير وإعادة تشطيب)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Package & Notes */}
                <div>
                  <h3 className="text-xl font-bold text-navy-dark mb-4 border-b border-gray-100 pb-2">الباقة المطلوبة والتفاصيل</h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">اختر الباقة المناسبة لك <span className="text-red-500">*</span></label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {finishingPackages.map((pkg) => (
                          <div
                            key={pkg.id}
                            onClick={() => setFormData({ ...formData, package: pkg.id })}
                            className={`cursor-pointer rounded-xl border-2 p-4 transition-all ${
                              formData.package === pkg.id
                                ? "border-primary bg-primary/5"
                                : "border-gray-100 hover:border-gray-200"
                            }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-bold text-navy-dark">{pkg.name}</span>
                              <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${formData.package === pkg.id ? "border-primary bg-primary text-white" : "border-gray-300"}`}>
                                {formData.package === pkg.id && <FiCheckCircle size={12} />}
                              </div>
                            </div>
                            <span className="text-xs text-gray-500 block">{pkg.pricePerMeter ? `${pkg.pricePerMeter} ج.م / المتر` : "حسب المعاينة"}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">ملاحظات إضافية</label>
                      <textarea name="notes" value={formData.notes} onChange={handleChange} rows={4} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 outline-none resize-none"></textarea>
                    </div>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={formStatus === "submitting"}
                  className="w-full bg-primary text-navy-deeper font-bold text-lg py-4 rounded-xl hover:bg-[#D6AE45] transition-colors disabled:opacity-70 disabled:cursor-not-allowed shadow-glow"
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
