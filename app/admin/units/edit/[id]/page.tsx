"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { FiUpload, FiArrowRight, FiSave, FiX, FiTrash2 } from "react-icons/fi";
import Link from "next/link";

export default function EditUnitPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    type: "apartment",
    status: "available",
    location: "",
    price: "",
    area: "",
    rooms: "",
    bathrooms: "",
    floor: "",
    finishing: "full",
    payment: "cash",
    downPayment: "",
    installmentYears: "",
    description: "",
    amenities: "",
    featured: "0"
  });

  const [mainImage, setMainImage] = useState<File | null>(null);
  const [existingMainImage, setExistingMainImage] = useState<string>("");
  const [galleryImages, setGalleryImages] = useState<FileList | null>(null);

  useEffect(() => {
    fetch(`/api/admin/units/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Unit not found");
        return res.json();
      })
      .then(data => {
        const unit = data.data || data;
        setFormData({
          title: unit.title || "",
          type: unit.type || "apartment",
          status: unit.status || "available",
          location: unit.location || "",
          price: unit.price || "",
          area: unit.area || "",
          rooms: unit.rooms || "",
          bathrooms: unit.bathrooms || "",
          floor: unit.floor || "",
          finishing: unit.finishing || "full",
          payment: unit.payment || "cash",
          downPayment: unit.downPayment || "",
          installmentYears: unit.installmentYears || "",
          description: unit.description || "",
          amenities: Array.isArray(unit.amenities) ? unit.amenities.join("، ") : (unit.amenities || ""),
          featured: unit.featured ? "1" : "0"
        });
        setExistingMainImage(unit.main_image || unit.image || "");
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value.toString());
      });
      if (mainImage) {
        data.append("main_image", mainImage);
      }
      // Laravel trick for PUT with FormData
      data.append("_method", "PUT");

      const res = await fetch(`/api/admin/units/${id}`, {
        method: "POST", // Use POST for FormData in Laravel PUT spoofing
        body: data,
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "حدث خطأ أثناء حفظ الوحدة");
      }

      alert("تم الحفظ بنجاح!");
      router.refresh();
      setSaving(false);
    } catch (err: any) {
      setError(err.message);
      setSaving(false);
    }
  };

  const handleGallerySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!galleryImages || galleryImages.length === 0) return;
    
    try {
      const data = new FormData();
      Array.from(galleryImages).forEach(file => {
        data.append("images[]", file);
      });

      const res = await fetch(`/api/admin/units/${id}/images`, {
        method: "POST",
        body: data,
      });

      if (!res.ok) throw new Error("فشل في رفع الصور");
      alert("تم رفع الصور بنجاح");
      setGalleryImages(null);
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (loading) return <div className="py-20 text-center font-bold text-gray-500">جاري التحميل...</div>;

  return (
    <div className="space-y-6">
      
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/admin/units" className="p-2 bg-white rounded-xl shadow-sm hover:bg-gray-50 transition-colors">
            <FiArrowRight size={20} className="text-navy-dark" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-navy-dark">تعديل الوحدة: {formData.title}</h1>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl font-bold flex items-center justify-between">
          <span>{error}</span>
          <button onClick={() => setError(null)}><FiX size={20}/></button>
        </div>
      )}

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-gray-100 space-y-8">
        
        {/* Basic Info */}
        <div>
          <h3 className="text-lg font-bold text-navy-dark mb-4 border-b border-gray-100 pb-2">المعلومات الأساسية</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">عنوان الوحدة <span className="text-red-500">*</span></label>
              <input required type="text" name="title" value={formData.title} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/50 outline-none" />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">النوع <span className="text-red-500">*</span></label>
              <select name="type" value={formData.type} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/50 outline-none">
                <option value="apartment">شقة</option>
                <option value="villa">فيلا</option>
                <option value="shop">محل تجاري</option>
                <option value="office">مكتب</option>
                <option value="land">أرض</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">الحالة <span className="text-red-500">*</span></label>
              <select name="status" value={formData.status} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/50 outline-none">
                <option value="available">متاحة</option>
                <option value="reserved">محجوزة</option>
                <option value="sold">مباعة</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">الموقع (العنوان) <span className="text-red-500">*</span></label>
              <input required type="text" name="location" value={formData.location} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/50 outline-none" />
            </div>
          </div>
        </div>

        {/* Specs & Finance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">السعر (ج.م) <span className="text-red-500">*</span></label>
                <input required type="number" name="price" value={formData.price} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/50 outline-none" />
            </div>
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">المساحة (م²)</label>
                <input type="number" name="area" value={formData.area} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/50 outline-none" />
            </div>
        </div>
        
        {/* More fields could be added similarly to Add Form, abbreviated here for clarity but let's add the essentials */}
        <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">الوصف الكامل</label>
              <textarea name="description" value={formData.description} onChange={handleChange} rows={5} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/50 outline-none resize-none"></textarea>
        </div>

        <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">تحديث الصورة الرئيسية (سيتم استبدال الحالية إن وجدت)</label>
            {existingMainImage && !mainImage && <img src={existingMainImage} alt="current" className="w-32 h-32 object-cover rounded-xl mb-4 border border-gray-200" />}
            <input type="file" accept="image/*" onChange={(e) => setMainImage(e.target.files?.[0] || null)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3" />
        </div>

        <div className="pt-6 border-t border-gray-100 flex justify-end gap-4">
          <button disabled={saving} type="submit" className="bg-primary text-navy-deeper font-bold px-8 py-3 rounded-xl flex items-center gap-2 hover:bg-[#D6AE45] transition-colors shadow-sm disabled:opacity-50">
            {saving ? "جاري الحفظ..." : <><FiSave size={20} /> <span>حفظ التعديلات</span></>}
          </button>
        </div>
      </form>

      {/* Gallery Form */}
      <form onSubmit={handleGallerySubmit} className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-gray-100 space-y-6">
        <h3 className="text-lg font-bold text-navy-dark mb-4 border-b border-gray-100 pb-2">معرض الصور (Gallery)</h3>
        <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">رفع صور إضافية</label>
            <input type="file" multiple accept="image/*" onChange={(e) => setGalleryImages(e.target.files)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3" />
        </div>
        <div className="flex justify-end">
            <button type="submit" disabled={!galleryImages} className="bg-navy-dark text-white font-bold px-6 py-2.5 rounded-xl hover:bg-navy-deeper disabled:opacity-50">
                رفع الصور
            </button>
        </div>
      </form>
    </div>
  );
}
