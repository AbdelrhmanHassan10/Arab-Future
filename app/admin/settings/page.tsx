"use client";

import { useState, useEffect } from "react";
import { FiSave } from "react-icons/fi";
import { useToast } from "@/components/ToastProvider";

export default function AdminSettingsPage() {
  const { showToast } = useToast();
  const [settings, setSettings] = useState({
    phone: "",
    whatsapp_number: "",
    facebook_url: "",
    instagram_url: "",
    tiktok_url: "",
    linkedin_url: "",
    address: "",
    about_text: "",
    map_embed_url: ""
  });
  
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/admin/settings");
      if (!res.ok) throw new Error("Failed to fetch settings");
      const data = await res.json();
      const s = data.data || data;
      setSettings({
        phone: s.phone || "",
        whatsapp_number: s.whatsapp_number || "",
        facebook_url: s.facebook_url || "",
        instagram_url: s.instagram_url || "",
        tiktok_url: s.tiktok_url || "",
        linkedin_url: s.linkedin_url || "",
        address: s.address || "",
        about_text: s.about_text || "",
        map_embed_url: s.map_embed_url || ""
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const phoneRegex = /^\+20(10|11|12|15)\d{8}$/;

    if (settings.phone && !phoneRegex.test(settings.phone)) {
      showToast("رقم الهاتف غير صحيح! يجب أن يبدأ بـ +20 يليه 10 أو 11 أو 12 أو 15 ثم 8 أرقام.", "error");
      return;
    }

    if (settings.whatsapp_number && !phoneRegex.test(settings.whatsapp_number)) {
      showToast("رقم الواتساب غير صحيح! يجب أن يبدأ بـ +20 يليه 10 أو 11 أو 12 أو 15 ثم 8 أرقام.", "error");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (!res.ok) throw new Error("Failed to save settings");
      
      showToast("تم حفظ الإعدادات بنجاح", "success");
      fetchSettings();
    } catch (error) {
      console.error(error);
      showToast("حدث خطأ أثناء الحفظ", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  if (loading) {
    return <div className="p-8 text-center text-gray-500">جاري تحميل الإعدادات...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-navy-dark">الإعدادات العامة</h1>
        <p className="text-gray-500 text-sm">تعديل معلومات التواصل والروابط والنصوص الثابتة في الموقع.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 md:p-8 space-y-8">
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold text-navy-dark mb-4 border-b border-gray-100 pb-2">معلومات التواصل</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">رقم الهاتف (للاتصال)</label>
                <input 
                  type="text" name="phone" value={settings.phone} onChange={handleChange} dir="ltr"
                  placeholder="+201008450553" maxLength={13}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/20 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">رقم الواتساب</label>
                <input 
                  type="text" name="whatsapp_number" value={settings.whatsapp_number} onChange={handleChange} dir="ltr"
                  placeholder="+201008450553" maxLength={13}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/20 text-sm"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2">العنوان</label>
                <input 
                  type="text" name="address" value={settings.address} onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/20 text-sm"
                />
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-bold text-navy-dark mb-4 border-b border-gray-100 pb-2">روابط التواصل الاجتماعي</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">فيسبوك (Facebook)</label>
                <input 
                  type="url" name="facebook_url" value={settings.facebook_url} onChange={handleChange} dir="ltr"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/20 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">إنستجرام (Instagram)</label>
                <input 
                  type="url" name="instagram_url" value={settings.instagram_url} onChange={handleChange} dir="ltr"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/20 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">تيك توك (TikTok)</label>
                <input 
                  type="url" name="tiktok_url" value={settings.tiktok_url} onChange={handleChange} dir="ltr"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/20 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">لينكد إن (LinkedIn)</label>
                <input 
                  type="url" name="linkedin_url" value={settings.linkedin_url} onChange={handleChange} dir="ltr"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/20 text-sm"
                />
              </div>
            </div>
          </div>

          {/* Map and About */}
          <div>
            <h3 className="text-lg font-bold text-navy-dark mb-4 border-b border-gray-100 pb-2">نصوص عامة وخرائط</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">نبذة عن الشركة (تظهر في الفوتر)</label>
                <textarea 
                  name="about_text" value={settings.about_text} onChange={handleChange} rows={4}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20 text-sm resize-y"
                />
              </div>
             </div>
          </div>
        </div>

        <div className="bg-gray-50 p-6 border-t border-gray-100 flex justify-end">
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="bg-primary text-navy-deeper font-bold px-8 py-3 rounded-xl flex items-center gap-2 hover:bg-[#D6AE45] transition-colors shadow-sm disabled:opacity-50"
          >
            <FiSave size={20} />
            <span>{isSubmitting ? "جاري الحفظ..." : "حفظ التعديلات"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
