"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FiUpload, FiArrowRight, FiSave, FiX } from "react-icons/fi";
import Link from "next/link";
import { extractString, getImageUrl } from "@/lib/config";

export default function EditUnitPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [amenities, setAmenities] = useState<any[]>([]);
  const [areas, setAreas] = useState<any[]>([]);
  const [unitRouteKey, setUnitRouteKey] = useState<string>(params.id);

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
    featured: "0"
  });

  const [mainImage, setMainImage] = useState<File | null>(null);
  const [existingImage, setExistingImage] = useState<string>("");

  useEffect(() => {
    const fetchUnit = async () => {
      try {
        let res = await fetch(`/api/admin/units/${params.id}`);
        let data;
        
        if (!res.ok) {
          if (res.status === 404) {
            // Fallback: try finding it in the list
            const listRes = await fetch(`/api/admin/units`);
            if (listRes.ok) {
              const listData = await listRes.json();
              const unitsList = listData.data || listData;
              const found = unitsList.find((u: any) => String(u.id) === String(params.id) || String(u.code) === String(params.id) || String(u.unit_code) === String(params.id));
              if (found) {
                data = { data: found };
              } else {
                throw new Error("الوحدة غير موجودة (404)");
              }
            } else {
              throw new Error("فشل في تحميل بيانات الوحدة");
            }
          } else {
            throw new Error("فشل في تحميل بيانات الوحدة");
          }
        } else {
          data = await res.json();
        }

        const u = data.data || data;
        setUnitRouteKey(u.code || u.unit_code || u.id);

        setFormData({
          title: extractString(u.title),
          type: u.type || "apartment",
          status: u.status || "available",
          address: u.address || "",
          area_id: u.area_id?.toString() || "1",
          price: u.price?.toString() || "",
          space_sqm: u.space_sqm?.toString() || "",
          bedrooms: u.bedrooms?.toString() || "",
          bathrooms: u.bathrooms?.toString() || "",
          floor: u.floor?.toString() || "",
          finishing: u.finishing || "full",
          payment_system: u.payment_system || "cash",
          down_payment: u.down_payment?.toString() || "",
          installment_years: u.installment_years?.toString() || "",
          description: extractString(u.description),
          features: Array.isArray(u.features) ? u.features.join("، ") : (typeof u.features === 'string' ? u.features : ""),
          featured: u.featured?.toString() || "0"
        });
        
        if (u.main_image) {
          setExistingImage(getImageUrl(u.main_image));
        }

      } catch (err: any) {
        setError(err.message);
      } finally {
        setFetching(false);
      }
    };
    fetchUnit();
    
    fetch('/api/admin/amenities')
      .then(r => r.json())
      .then(data => setAmenities(data.data || data))
      .catch(() => null);

    fetch('/api/admin/areas')
      .then(r => r.json())
      .then(data => setAreas(data.data || data))
      .catch(() => null);
  }, [params.id]);

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setMainImage(e.target.files[0]);
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
          const featsStr = Array.isArray(value) ? (value as string[]).join("، ") : (typeof value === 'string' ? value : "");
          const feats = featsStr.split(/[،,]/).map(f => f.trim()).filter(Boolean);
          feats.forEach(f => data.append("features[]", f));
        } else {
          data.append(key, value.toString());
        }
      });
      if (mainImage) {
        data.append("main_image", mainImage);
        data.append("image", mainImage);
      }
      data.append("_method", "PUT"); // Laravel way to update with multipart

      const res = await fetch(`/api/admin/units/${unitRouteKey}`, {
        method: "POST", // Send as POST for Laravel to parse FormData correctly
        body: data,
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "حدث خطأ أثناء تعديل الوحدة");
      }

      router.push("/admin/units");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (fetching) {
    return <div className="p-8 text-center text-gray-500">جاري تحميل الوحدة...</div>;
  }

  return (
    <div className="space-y-6">
      
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/admin/units" className="p-2 bg-white rounded-xl shadow-sm hover:bg-gray-50 transition-colors">
            <FiArrowRight size={20} className="text-navy-dark" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-navy-dark">تعديل وحدة: {formData.title}</h1>
            <p className="text-gray-500 text-sm">تعديل تفاصيل الوحدة العقارية.</p>
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
              <input required type="text" name="title" value={formData.title} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/50 outline-none text-navy-dark" />
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
              <input required type="text" name="address" value={formData.address} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/50 outline-none text-navy-dark" />
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
              <label className="block text-sm font-bold text-gray-700 mb-2">المرافق والمميزات</label>
              
              <div className="flex flex-wrap gap-2 mb-3">
                {Array.from(new Set([...[
                  "جراج", "حمام سباحة", "أمن 24 ساعة", "أسانسير", "حديقة خاصة", 
                  "رووف", "غاز طبيعي", "تكييف مركزي", "كاميرات مراقبة", "انترنت"
                ], ...amenities.map(a => a.name)])).map((feat, index) => {
                  const featuresStr = Array.isArray(formData.features) ? (formData.features as string[]).join("، ") : (typeof formData.features === 'string' ? formData.features : "");
                  const currentFeatures = featuresStr.split(/[،,]/).map(f => f.trim()).filter(Boolean);
                  const isSelected = currentFeatures.includes(feat);
                  return (
                    <button 
                      key={index}
                      type="button" 
                      onClick={() => toggleFeature(feat)}
                      className={`px-3 py-1.5 text-xs font-bold rounded-full border transition-all ${isSelected ? 'bg-primary text-navy-deeper border-primary shadow-sm' : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50 hover:border-gray-300'}`}
                    >
                      {isSelected ? '✓ ' : '+ '}{feat}
                    </button>
                  )
                })}
              </div>

              <textarea name="features" value={formData.features} onChange={handleChange} rows={2} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/50 outline-none text-navy-dark" placeholder="أو اكتب يدوياً (مفصولة بفاصلة)..."></textarea>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">الصورة الرئيسية (اتركها فارغة لعدم التغيير)</label>
              
              {existingImage && !mainImage && (
                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-2">الصورة الحالية:</p>
                  <img src={existingImage} alt="Current main image" className="w-32 h-32 object-cover rounded-xl" />
                </div>
              )}

              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-2xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <FiUpload className="w-8 h-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500 font-bold">{mainImage ? mainImage.name : "اضغط هنا لاختيار صورة جديدة"}</p>
                </div>
                <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
              </label>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-100 flex justify-end gap-4">
          <Link href="/admin/units" className="px-6 py-3 font-bold text-gray-500 hover:bg-gray-50 rounded-xl transition-colors">إلغاء</Link>
          <button disabled={loading} type="submit" className="bg-primary text-navy-deeper font-bold px-8 py-3 rounded-xl flex items-center gap-2 hover:bg-[#D6AE45] transition-colors shadow-sm disabled:opacity-50">
            {loading ? "جاري الحفظ..." : <><FiSave size={20} /> <span>حفظ التعديلات</span></>}
          </button>
        </div>

      </form>
    </div>
  );
}
