"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FiUpload, FiArrowRight, FiSave, FiX } from "react-icons/fi";
import Link from "next/link";

export default function AddUnitPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [amenities, setAmenities] = useState<any[]>([]);
  const [areas, setAreas] = useState<any[]>([]);

  const [formData, setFormData] = useState({
    title: "",
    type: "apartment",
    status: "available",
    address: "",
    area_id: "1",
    price: "",
    space_sqm: "",
    bedrooms: "",
    bathrooms: "",
    floor: "",
    finishing: "full",
    payment_system: "cash",
    down_payment: "",
    installment_years: "",
    description: "",
    features: "",
    video_url: "",
    video_description: "",
    featured: "0"
  });

  const [mainImage, setMainImage] = useState<File | null>(null);
  const [galleryImages, setGalleryImages] = useState<File[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<number[]>([]);

  useEffect(() => {
    fetch('/api/admin/amenities')
      .then(r => r.json())
      .then(data => setAmenities(data.data || data))
      .catch(() => null);

    fetch('/api/admin/areas')
      .then(r => r.json())
      .then(data => setAreas(data.data || data))
      .catch(() => null);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleFeature = (feat: string) => {
    const featuresStr = Array.isArray(formData.features) ? (formData.features as string[]).join("، ") : (typeof formData.features === 'string' ? formData.features : "");
    let current = featuresStr.split(/[،,]/).map(f => f.trim()).filter(Boolean);
    if (current.includes(feat)) {
       current = current.filter(f => f !== feat);
    } else {
       current.push(feat);
    }
    setFormData({ ...formData, features: current.join('، ') });
  };

  const toggleAmenity = (id: number) => {
    if (selectedAmenities.includes(id)) {
      setSelectedAmenities(selectedAmenities.filter(a => a !== id));
    } else {
      setSelectedAmenities([...selectedAmenities, id]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setMainImage(e.target.files[0]);
    }
  };

  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setGalleryImages(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'features') {
          const feats = value.split(/[،,]/).map(f => f.trim()).filter(Boolean);
          feats.forEach(f => data.append("features[]", f));
        } else {
          data.append(key, value.toString());
        }
      });
      
      selectedAmenities.forEach(id => {
        data.append("amenity_ids[]", id.toString());
      });

      if (mainImage) {
        data.append("main_image", mainImage);
      }
      
      galleryImages.forEach(img => {
        data.append("images[]", img);
      });

      const res = await fetch("/api/admin/units", {
        method: "POST",
        body: data,
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        let errMsg = errorData.message || "حدث خطأ أثناء حفظ الوحدة";
        if (errorData.errors) {
          const validationErrors = Object.values(errorData.errors).flat().join(" ، ");
          errMsg = `${errMsg} - ${validationErrors}`;
        }
        throw new Error(errMsg);
      }

      router.push("/admin/units");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/admin/units" className="p-2 bg-white rounded-xl shadow-sm hover:bg-gray-50 transition-colors">
            <FiArrowRight size={20} className="text-navy-dark" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-navy-dark">إضافة وحدة جديدة</h1>
            <p className="text-gray-500 text-sm">أدخل تفاصيل الوحدة العقارية لنشرها في الموقع.</p>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl font-bold flex items-center justify-between">
          <span>{error}</span>
          <button onClick={() => setError(null)}><FiX size={20}/></button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-gray-100 space-y-8">
        
        {/* Basic Info */}
        <div>
          <h3 className="text-lg font-bold text-navy-dark mb-4 border-b border-gray-100 pb-2">المعلومات الأساسية</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">عنوان الوحدة <span className="text-red-500">*</span></label>
              <input required type="text" name="title" value={formData.title} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/50 outline-none text-navy-dark" placeholder="مثال: شقة فاخرة للبيع في بني سويف الجديدة" />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">النوع <span className="text-red-500">*</span></label>
              <select name="type" value={formData.type} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/50 outline-none text-navy-dark">
                <option value="apartment">شقة</option>
                <option value="villa">فيلا</option>
                <option value="commercial_shop">محل تجاري</option>
                <option value="office">مكتب</option>
                <option value="land">أرض</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">الحالة <span className="text-red-500">*</span></label>
              <select name="status" value={formData.status} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/50 outline-none text-navy-dark">
                <option value="available">متاحة</option>
                <option value="reserved">محجوزة</option>
                <option value="sold">مباعة</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">المنطقة (الحي) <span className="text-red-500">*</span></label>
              <select name="area_id" value={formData.area_id} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/50 outline-none text-navy-dark">
                {areas.map(area => (
                  <option key={area.id} value={area.id}>{area.name}</option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">الموقع (العنوان) <span className="text-red-500">*</span></label>
              <input required type="text" name="address" value={formData.address} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/50 outline-none text-navy-dark" placeholder="بني سويف، الحي الأول..." />
            </div>
          </div>
        </div>

        {/* Financial Info */}
        <div>
          <h3 className="text-lg font-bold text-navy-dark mb-4 border-b border-gray-100 pb-2">التفاصيل المالية</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">السعر (ج.م) <span className="text-red-500">*</span></label>
              <input required type="number" name="price" value={formData.price} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/50 outline-none text-navy-dark" />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">نظام الدفع <span className="text-red-500">*</span></label>
              <select name="payment_system" value={formData.payment_system} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/50 outline-none text-navy-dark">
                <option value="cash">كاش</option>
                <option value="installment">تقسيط</option>
                <option value="cash_or_installment">كاش أو تقسيط</option>
              </select>
            </div>

            {(formData.payment_system === 'installment' || formData.payment_system === 'cash_or_installment') && (
              <>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">المقدم (ج.م)</label>
                  <input type="number" name="down_payment" value={formData.down_payment} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/50 outline-none text-navy-dark" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">سنوات التقسيط</label>
                  <input type="number" name="installment_years" value={formData.installment_years} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/50 outline-none text-navy-dark" />
                </div>
              </>
            )}
          </div>
        </div>

        {/* Specs */}
        <div>
          <h3 className="text-lg font-bold text-navy-dark mb-4 border-b border-gray-100 pb-2">المواصفات</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">المساحة (م²)</label>
              <input type="number" name="space_sqm" value={formData.space_sqm} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/50 outline-none text-navy-dark" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">الغرف</label>
              <input type="number" name="bedrooms" value={formData.bedrooms} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/50 outline-none text-navy-dark" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">الحمامات</label>
              <input type="number" name="bathrooms" value={formData.bathrooms} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/50 outline-none text-navy-dark" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">الطابق</label>
              <input type="number" name="floor" value={formData.floor} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/50 outline-none text-navy-dark" />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">التشطيب</label>
              <select name="finishing" value={formData.finishing} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/50 outline-none text-navy-dark">
                <option value="none">بدون تشطيب (طوب أحمر)</option>
                <option value="half">نصف تشطيب (محارة وحلوق)</option>
                <option value="full">تشطيب كامل (لوكس)</option>
                <option value="luxury">تشطيب فاخر (سوبر/الترا لوكس)</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">مميزة (في الصفحة الرئيسية)</label>
              <select name="featured" value={formData.featured} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/50 outline-none text-navy-dark">
                <option value="0">لا</option>
                <option value="1">نعم</option>
              </select>
            </div>
          </div>
        </div>

        {/* Description & Amenities */}
        <div>
          <h3 className="text-lg font-bold text-navy-dark mb-4 border-b border-gray-100 pb-2">التفاصيل والصور</h3>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">الوصف الكامل</label>
              <textarea name="description" value={formData.description} onChange={handleChange} rows={5} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/50 outline-none resize-none text-navy-dark"></textarea>
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">المرافق والخدمات الأساسية</label>
              <div className="flex flex-wrap gap-2 mb-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                {amenities.map((amenity) => {
                  const isSelected = selectedAmenities.includes(amenity.id);
                  return (
                    <button 
                      key={amenity.id}
                      type="button" 
                      onClick={() => toggleAmenity(amenity.id)}
                      className={`px-3 py-1.5 text-xs font-bold rounded-full border transition-all ${isSelected ? 'bg-primary text-navy-deeper border-primary shadow-sm' : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50 hover:border-gray-300'}`}
                    >
                      {isSelected ? '✓ ' : '+ '}{amenity.name}
                    </button>
                  )
                })}
              </div>

              <label className="block text-sm font-bold text-gray-700 mb-2">مميزات إضافية مخصصة (اختياري)</label>
              <textarea name="features" value={formData.features} onChange={handleChange} rows={2} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/50 outline-none text-navy-dark" placeholder="اكتب يدوياً (مفصولة بفاصلة مثل: جراج خاص، رووف...)"></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">رابط فيديو (مثال: يوتيوب)</label>
                <input type="url" name="video_url" value={formData.video_url} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/50 outline-none text-navy-dark" placeholder="https://youtube.com/watch?v=..." />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">وصف الفيديو</label>
                <input type="text" name="video_description" value={formData.video_description} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/50 outline-none text-navy-dark" placeholder="فيديو جولة داخل الوحدة..." />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">الصورة الرئيسية (غلاف الوحدة) <span className="text-red-500">*</span></label>
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-2xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
                    <FiUpload className="w-8 h-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500 font-bold">{mainImage ? mainImage.name : "اضغط لاختيار الصورة الرئيسية"}</p>
                  </div>
                  <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                </label>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">معرض الصور (تحديد عدة صور)</label>
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-2xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
                    <FiUpload className="w-8 h-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500 font-bold">{galleryImages.length > 0 ? `تم اختيار ${galleryImages.length} صور` : "اضغط لتحديد أكثر من صورة"}</p>
                  </div>
                  <input type="file" multiple className="hidden" accept="image/*" onChange={handleGalleryChange} />
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-100 flex justify-end gap-4">
          <Link href="/admin/units" className="px-6 py-3 font-bold text-gray-500 hover:bg-gray-50 rounded-xl transition-colors">إلغاء</Link>
          <button disabled={loading} type="submit" className="bg-primary text-navy-deeper font-bold px-8 py-3 rounded-xl flex items-center gap-2 hover:bg-[#D6AE45] transition-colors shadow-sm disabled:opacity-50">
            {loading ? "جاري الحفظ..." : <><FiSave size={20} /> <span>حفظ الوحدة</span></>}
          </button>
        </div>

      </form>
    </div>
  );
}
