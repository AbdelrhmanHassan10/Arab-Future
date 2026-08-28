"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FiUpload, FiArrowRight, FiSave, FiX } from "react-icons/fi";
import Link from "next/link";
import { extractString, getImageUrl } from "@/lib/config";
import { useConfirm } from "@/components/ConfirmProvider";
import { useToast } from "@/components/ToastProvider";

export default function EditUnitPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { confirm } = useConfirm();
  const { showToast } = useToast();
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
    video_url: "",
    video_description: "",
    featured: "0"
  });

  const [mainImage, setMainImage] = useState<File | null>(null);
  const [existingImage, setExistingImage] = useState<string>("");

  // Nested relation states
  const [selectedAmenities, setSelectedAmenities] = useState<number[]>([]);
  const [galleryImagesList, setGalleryImagesList] = useState<any[]>([]);
  const [floorPlans, setFloorPlans] = useState<any[]>([]);
  const [nearbyPlaces, setNearbyPlaces] = useState<any[]>([]);
  const [attachments, setAttachments] = useState<any[]>([]);

  // UI states for new additions
  const [newImages, setNewImages] = useState<File[]>([]);
  const [newFloorPlan, setNewFloorPlan] = useState({ title: '', description: '', image: null as File | null });
  const [newNearbyPlace, setNewNearbyPlace] = useState({ title: '', distance_text: '' });
  const [newAttachment, setNewAttachment] = useState({ title: '', image: null as File | null });

  useEffect(() => {
    const fetchUnit = async () => {
      try {
        const res = await fetch(`/api/admin/units/${params.id}`);
        let data;

        if (!res.ok) {
          if (res.status === 404 || res.status === 500) {
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
            if (res.status === 401) {
              router.push("/admin/login");
              return;
            }
            throw new Error("فشل في تحميل بيانات الوحدة");
          }
        } else {
          data = await res.json();
        }

        const u = data.data || data;
        setUnitRouteKey(u.code || u.unit_code || u.slug || String(u.id));

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
          video_url: u.video_url || "",
          video_description: u.video_description || "",
          featured: u.featured?.toString() || "0"
        });

        if (u.main_image) {
          setExistingImage(getImageUrl(u.main_image));
        }

        // Populate nested relations
        setSelectedAmenities(u.amenities?.map((a: any) => a.id) || []);
        setGalleryImagesList(u.images || []);
        setFloorPlans(u.floor_plans || []);
        setNearbyPlaces(u.nearby_places || []);
        setAttachments(u.attachments || []);

      } catch (err: any) {
        setError(err.message);
      } finally {
        setFetching(false);
      }
    };
    fetchUnit();

    fetch('/api/admin/amenities')
      .then(r => { if (r.ok) return r.json(); throw new Error("Failed"); })
      .then(data => setAmenities(Array.isArray(data.data) ? data.data : (Array.isArray(data) ? data : [])))
      .catch(() => setAmenities([]));

    fetch('/api/admin/areas')
      .then(r => { if (r.ok) return r.json(); throw new Error("Failed"); })
      .then(data => setAreas(Array.isArray(data.data) ? data.data : (Array.isArray(data) ? data : [])))
      .catch(() => setAreas([]));
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

  const [videoFile, setVideoFile] = useState<File | null>(null);
  const handleVideoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideoFile(e.target.files[0]);
    }
  };

  const toggleAmenity = (id: number) => {
    if (selectedAmenities.includes(id)) {
      setSelectedAmenities(selectedAmenities.filter(a => a !== id));
    } else {
      setSelectedAmenities([...selectedAmenities, id]);
    }
  };

  // ----- Nested Relations Handlers -----

  const refreshUnitData = async () => {
    try {
      const res = await fetch(`/api/admin/units/${unitRouteKey}`);
      if (res.ok) {
        const data = await res.json();
        const u = data.data || data;
        setGalleryImagesList(u.images || []);
        setFloorPlans(u.floor_plans || []);
        setNearbyPlaces(u.nearby_places || []);
        setAttachments(u.attachments || []);
        setSelectedAmenities(u.amenities?.map((a: any) => a.id) || []);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const uploadGalleryImages = async () => {
    if (newImages.length === 0) return;
    const data = new FormData();
    newImages.forEach(img => data.append("images[]", img));
    try {
      const res = await fetch(`/api/admin/units/${unitRouteKey}/images`, { method: "POST", body: data });
      if (!res.ok) throw new Error("فشل رفع الصور");
      showToast("تم رفع الصور بنجاح", "success");
    } catch (e: any) {
      showToast(e.message, "error");
    }
    setNewImages([]);
    await refreshUnitData();
  };

  const deleteGalleryImage = async (id: number) => {
    if (!(await confirm("تأكيد الحذف؟"))) return;
    await fetch(`/api/admin/units/${unitRouteKey}/images/${id}`, { method: "DELETE" });
    showToast("تم حذف الصورة بنجاح", "success");
    await refreshUnitData();
  };

  const addFloorPlan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFloorPlan.title || !newFloorPlan.image) {
      showToast("الاسم والصورة مطلوبان", "error");
      return;
    }
    const data = new FormData();
    data.append("title", newFloorPlan.title);
    data.append("description", newFloorPlan.description);
    data.append("image", newFloorPlan.image);
    await fetch(`/api/admin/units/${unitRouteKey}/floor-plans`, { method: "POST", body: data });
    setNewFloorPlan({ title: '', description: '', image: null });
    await refreshUnitData();
    showToast("تم إضافة المخطط بنجاح", "success");
  };

  const deleteFloorPlan = async (id: number) => {
    if (!(await confirm("تأكيد الحذف؟"))) return;
    await fetch(`/api/admin/units/${unitRouteKey}/floor-plans/${id}`, { method: "DELETE" });
    await refreshUnitData();
    showToast("تم الحذف بنجاح", "success");
  };

  const addNearbyPlace = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNearbyPlace.title || !newNearbyPlace.distance_text) {
      showToast("الاسم والمسافة مطلوبان", "error");
      return;
    }
    await fetch(`/api/admin/units/${unitRouteKey}/nearby-places`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newNearbyPlace)
    });
    setNewNearbyPlace({ title: '', distance_text: '' });
    await refreshUnitData();
    showToast("تم إضافة المكان بنجاح", "success");
  };

  const deleteNearbyPlace = async (id: number) => {
    if (!(await confirm("تأكيد الحذف؟"))) return;
    await fetch(`/api/admin/units/${unitRouteKey}/nearby-places/${id}`, { method: "DELETE" });
    await refreshUnitData();
    showToast("تم الحذف بنجاح", "success");
  };

  const addAttachment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAttachment.title) {
      showToast("اسم المرفق مطلوب", "error");
      return;
    }
    const data = new FormData();
    data.append("title", newAttachment.title);
    if (newAttachment.image) data.append("image", newAttachment.image);
    await fetch(`/api/admin/units/${unitRouteKey}/attachments`, { method: "POST", body: data });
    setNewAttachment({ title: '', image: null });
    await refreshUnitData();
    showToast("تمت إضافة المرفق بنجاح", "success");
  };

  const deleteAttachment = async (id: number) => {
    if (!(await confirm("تأكيد الحذف؟"))) return;
    await fetch(`/api/admin/units/${unitRouteKey}/attachments/${id}`, { method: "DELETE" });
    await refreshUnitData();
    showToast("تم حذف المرفق بنجاح", "success");
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
          if (feats.length > 0) {
            feats.forEach(f => data.append("features[]", f));
          }
        } else if (value !== "" && value !== null) {
          data.append(key, value.toString());
        }
      });
      
      selectedAmenities.forEach(id => {
        data.append("amenity_ids[]", id.toString());
      });

      if (mainImage) {
        data.append("image", mainImage);
        data.append("main_image", mainImage);
      }
      if (videoFile) data.append("video", videoFile);
      data.append("title", formData.title);
      data.append("_method", "PUT"); // Laravel way to update with multipart

      const res = await fetch(`/api/admin/units/${unitRouteKey}`, {
        method: "POST", // Send as POST for Laravel to parse FormData correctly
        body: data,
      });

      const jsonRes = await res.json().catch(() => ({}));

      if (!res.ok) {
        let errMsg = jsonRes.message || "حدث خطأ أثناء تعديل الوحدة";
        if (jsonRes.errors) {
          const validationErrors = Object.values(jsonRes.errors).flat().join(" ، ");
          errMsg = `${errMsg} - ${validationErrors}`;
        }
        showToast(errMsg, "error");
        throw new Error(errMsg);
      }

      // Sync Amenities
      await fetch(`/api/admin/units/${unitRouteKey}/amenities`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amenity_ids: selectedAmenities })
      });

      showToast("تم تعديل الوحدة بنجاح!", "success");

      setTimeout(() => {
        router.push("/admin/units");
        router.refresh();
      }, 1500);
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
          <button onClick={() => setError(null)}><FiX size={20} /></button>
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
                <label className="block text-sm font-bold text-gray-700 mb-2">رابط فيديو (من يوتيوب أو منصة أخرى)</label>
                <input type="url" name="video_url" value={formData.video_url} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/50 outline-none text-navy-dark" placeholder="https://youtube.com/watch?v=..." />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">أو رفع فيديو من الجهاز (Local File)</label>
                <input type="file" accept="video/mp4,video/webm,video/ogg" onChange={handleVideoFileChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-[9px] focus:ring-2 focus:ring-primary/50 outline-none text-navy-dark file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20" />
                {videoFile && <p className="text-xs text-green-600 mt-2">تم اختيار: {videoFile.name}</p>}
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">الصورة الرئيسية (اتركها فارغة لعدم التغيير)</label>

              {existingImage && !mainImage && (
                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-2">الصورة الحالية:</p>
                  <img src={existingImage} alt="Current main image" className="w-32 h-32 object-cover rounded-xl border" />
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
            {loading ? "جاري الحفظ..." : <><FiSave size={20} /> <span>حفظ التعديلات الأساسية</span></>}
          </button>
        </div>
      </form>

      {/* --- EXTRA SECTIONS FOR EXISTING UNIT --- */}
      <div className="space-y-8 mt-12">
        {/* Gallery Images */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-navy-dark mb-4 border-b border-gray-100 pb-2">معرض الصور الإضافية</h3>

          <div className="flex gap-4 overflow-x-auto pb-4 mb-4">
            {galleryImagesList.map((img: any) => (
              <div key={img.id} className="relative group shrink-0 w-32 h-32 rounded-xl overflow-hidden border">
                <img src={getImageUrl(img)} alt="" className="w-full h-full object-cover" />
                <button onClick={() => deleteGalleryImage(img.id)} className="absolute top-2 left-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"><FiX /></button>
              </div>
            ))}
          </div>

          <div className="flex items-end gap-4">
            <div className="flex-1">
              <input type="file" multiple accept="image/*" onChange={(e) => e.target.files && setNewImages(Array.from(e.target.files))} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20" />
            </div>
            <button onClick={uploadGalleryImages} disabled={newImages.length === 0} className="bg-navy-dark text-white px-6 py-2 rounded-xl font-bold disabled:opacity-50 hover:bg-navy-deeper">رفع الصور</button>
          </div>
        </div>

        {/* Floor Plans */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-navy-dark mb-4 border-b border-gray-100 pb-2">المخططات الهندسية</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {floorPlans.map((plan: any) => (
              <div key={plan.id} className="flex gap-4 bg-gray-50 p-4 rounded-xl items-center relative">
                <img src={getImageUrl(plan)} className="w-20 h-20 object-cover rounded-lg" alt="" />
                <div>
                  <h4 className="font-bold text-navy-dark">{plan.title}</h4>
                  <p className="text-xs text-gray-500">{plan.description}</p>
                </div>
                <button onClick={() => deleteFloorPlan(plan.id)} className="absolute top-2 left-2 text-red-500 hover:bg-red-50 p-1 rounded-md"><FiX /></button>
              </div>
            ))}
          </div>

          <form onSubmit={addFloorPlan} className="bg-gray-50 p-4 rounded-xl flex flex-wrap gap-4 items-end">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-bold text-gray-700 mb-1">الاسم (مثال: توزيع الغرف)</label>
              <input type="text" required value={newFloorPlan.title} onChange={e => setNewFloorPlan({ ...newFloorPlan, title: e.target.value })} className="w-full border rounded-lg px-3 py-2 text-navy-dark" />
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-bold text-gray-700 mb-1">صورة المخطط</label>
              <input type="file" required accept="image/*" onChange={e => e.target.files && setNewFloorPlan({ ...newFloorPlan, image: e.target.files[0] })} className="w-full border rounded-lg px-3 py-1.5 bg-white" />
            </div>
            <button type="submit" className="bg-primary text-navy-dark px-6 py-2 rounded-lg font-bold">إضافة مخطط</button>
          </form>
        </div>

        {/* Nearby Places */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-navy-dark mb-4 border-b border-gray-100 pb-2">الأماكن القريبة والموقع</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {nearbyPlaces.map((place: any) => (
              <div key={place.id} className="bg-gray-50 p-4 rounded-xl relative">
                <div className="font-bold text-navy-dark text-sm">{place.title}</div>
                <div className="text-primary text-xs font-bold mt-1">{place.distance_text}</div>
                <button onClick={() => deleteNearbyPlace(place.id)} className="absolute top-2 left-2 text-red-500 hover:bg-red-50 p-1 rounded-md"><FiX /></button>
              </div>
            ))}
          </div>

          <form onSubmit={addNearbyPlace} className="bg-gray-50 p-4 rounded-xl flex flex-wrap gap-4 items-end">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-bold text-gray-700 mb-1">المكان (مثال: الطريق الدائري)</label>
              <input type="text" required value={newNearbyPlace.title} onChange={e => setNewNearbyPlace({ ...newNearbyPlace, title: e.target.value })} className="w-full border rounded-lg px-3 py-2 text-navy-dark" />
            </div>
            <div className="flex-1 min-w-[150px]">
              <label className="block text-sm font-bold text-gray-700 mb-1">المسافة (مثال: 10 دقائق)</label>
              <input type="text" required value={newNearbyPlace.distance_text} onChange={e => setNewNearbyPlace({ ...newNearbyPlace, distance_text: e.target.value })} className="w-full border rounded-lg px-3 py-2 text-navy-dark" />
            </div>
            <button type="submit" className="bg-primary text-navy-dark px-6 py-2 rounded-lg font-bold">إضافة مكان</button>
          </form>
        </div>
      </div>
    </div>
  );
}
