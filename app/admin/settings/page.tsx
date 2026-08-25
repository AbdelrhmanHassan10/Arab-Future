"use client";

import { useState, useEffect } from "react";
import { FiSave } from "react-icons/fi";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    phone: "",
    whatsapp_number: "",
    facebook_url: "",
    instagram_url: "",
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
    setIsSubmitting(true);
    
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (!res.ok) throw new Error("Failed to save settings");
      
      alert("تم حفظ الإعدادات بنجاح");
      fetchSettings();
    } catch (error) {
      console.error(error);
      alert("حدث خطأ أثناء الحفظ");
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
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/20 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">رقم الواتساب</label>
                <input 
                  type="text" name="whatsapp_number" value={settings.whatsapp_number} onChange={handleChange} dir="ltr"
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
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">رابط الخريطة (Google Maps Embed URL)</label>
                <input 
                  type="url" name="map_embed_url" value={settings.map_embed_url} onChange={handleChange} dir="ltr"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/20 text-sm"
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
