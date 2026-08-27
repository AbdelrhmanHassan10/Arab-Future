"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FiUpload, FiArrowRight, FiSave, FiX, FiTrash2, FiPlus } from "react-icons/fi";
import Link from "next/link";
import { extractString, getImageUrl } from "@/lib/config";
import { useToast } from "@/components/ToastProvider";

export default function EditFinishingProjectPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { showToast } = useToast();
  
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [projectRouteKey, setProjectRouteKey] = useState<string>(params.id);

  // Basic Info State
  const [formData, setFormData] = useState({
    title: "",
    style: "modern",
    property_type: "apartment",
    status: "completed",
    location: "",
    area_sqm: "",
    execution_duration: "",
    description: "",
    materials_used: "",
    scope_of_work: "",
  });

  // Main Image State
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [existingMainImage, setExistingMainImage] = useState<string>("");

  // Gallery State
  const [galleryImagesList, setGalleryImagesList] = useState<any[]>([]);
  const [galleryImagesToUpload, setGalleryImagesToUpload] = useState<File[]>([]);
  const [uploadingGallery, setUploadingGallery] = useState(false);

  // Challenges State
  const [challengesList, setChallengesList] = useState<any[]>([]);
  const [newChallenge, setNewChallenge] = useState({ title: "", description: "" });
  const [addingChallenge, setAddingChallenge] = useState(false);
  const [editingChallengeId, setEditingChallengeId] = useState<number | null>(null);
  const [editChallengeData, setEditChallengeData] = useState({ title: "", description: "" });

  const fetchProject = async () => {
    setFetching(true);
    try {
      const res = await fetch(`/api/admin/renovation-projects/${params.id}`);
      let data;

      if (!res.ok) {
        if (res.status === 404) {
           const listRes = await fetch(`/api/admin/renovation-projects`);
           if (listRes.ok) {
              const listData = await listRes.json();
              const projectsList = listData.data || listData;
              const found = projectsList.find((p: any) => String(p.id) === String(params.id) || String(p.code) === String(params.id) || String(p.renovation_code) === String(params.id));
              if (found) {
                data = { data: found };
              } else {
                throw new Error("المشروع غير موجود (404)");
              }
           } else {
              throw new Error("فشل في تحميل بيانات المشروع");
           }
        } else {
           if (res.status === 401) {
             router.push("/admin/login");
             return;
           }
           throw new Error("فشل في تحميل بيانات المشروع");
        }
      } else {
        data = await res.json();
      }

      const p = data.data || data;
      setProjectRouteKey(p.code || p.renovation_code || p.id);

      // Parse challenges
      setChallengesList(Array.isArray(p.challenges) ? p.challenges : []);

      // Parse gallery
      setGalleryImagesList(Array.isArray(p.images) ? p.images : []);

      // Parse materials_used
      let materialsStr = "";
      if (Array.isArray(p.materials_used)) {
        materialsStr = p.materials_used.join("، ");
      } else if (typeof p.materials_used === "string") {
        materialsStr = p.materials_used;
      }

      // Parse scope_of_work
      let scopeStr = "";
      if (Array.isArray(p.scope_of_work)) {
        scopeStr = p.scope_of_work.join("، ");
      } else if (typeof p.scope_of_work === "string") {
        scopeStr = p.scope_of_work;
      }

      setFormData({
        title: extractString(p.title),
        style: p.style || "modern",
        property_type: p.property_type || "apartment",
        status: p.status || "completed",
        location: p.location || "",
        area_sqm: p.area_sqm ? String(p.area_sqm) : "",
        execution_duration: p.execution_duration || "",
        description: extractString(p.description),
        materials_used: materialsStr,
        scope_of_work: scopeStr,
      });
      
      if (p.main_image || p.image) {
        setExistingMainImage(getImageUrl(p.main_image || p.image));
      }

    } catch (err: any) {
      showToast(err.message, "error");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchProject();
  }, [params.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setMainImage(e.target.files[0]);
    }
  };

  // ---- Update Basic Info ----
  const handleSubmitBasicInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create FormData if mainImage exists (using POST + _method: PUT), otherwise JSON
      let method, body, headers: any = {};
      
      if (mainImage) {
        const data = new FormData();
        data.append("_method", "PUT");
        data.append("title", formData.title);
        data.append("style", formData.style);
        data.append("property_type", formData.property_type);
        data.append("status", formData.status);
        data.append("location", formData.location);
        if (formData.area_sqm) data.append("area_sqm", formData.area_sqm);
        if (formData.execution_duration) data.append("execution_duration", formData.execution_duration);
        if (formData.description) data.append("description", formData.description);
        
        formData.materials_used.split(/[،,]/).map(s => s.trim()).filter(Boolean).forEach(m => data.append("materials_used[]", m));
        formData.scope_of_work.split(/[،,]/).map(s => s.trim()).filter(Boolean).forEach(s => data.append("scope_of_work[]", s));
        data.append("main_image", mainImage);

        method = "POST";
        body = data;
      } else {
        const materials = formData.materials_used.split(/[،,]/).map(s => s.trim()).filter(Boolean);
        const scope = formData.scope_of_work.split(/[،,]/).map(s => s.trim()).filter(Boolean);

        method = "PUT";
        headers = { "Content-Type": "application/json" };
        body = JSON.stringify({
          ...formData,
          materials_used: materials,
          scope_of_work: scope
        });
      }

      const res = await fetch(`/api/admin/renovation-projects/${projectRouteKey}`, {
        method,
        headers,
        body,
      });

      if (!res.ok) throw new Error("حدث خطأ أثناء تعديل البيانات الأساسية");
      showToast("تم تحديث البيانات الأساسية بنجاح", "success");
      fetchProject();
      setMainImage(null);
    } catch (err: any) {
      showToast(err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  // ---- Gallery ----
  const handleUploadGallery = async () => {
    if (galleryImagesToUpload.length === 0) return;
    setUploadingGallery(true);
    try {
      const data = new FormData();
      galleryImagesToUpload.forEach(img => data.append("images[]", img));
      
      const res = await fetch(`/api/admin/renovation-projects/${projectRouteKey}/images`, {
        method: "POST",
        body: data
      });
      if (!res.ok) throw new Error("Failed to upload images");
      showToast("تم رفع الصور الإضافية", "success");
      setGalleryImagesToUpload([]);
      fetchProject();
    } catch (e) {
      showToast("خطأ أثناء رفع الصور", "error");
    } finally {
      setUploadingGallery(false);
    }
  };

  const handleDeleteGalleryImage = async (imageId: number) => {
    if (!confirm("هل أنت متأكد من حذف هذه الصورة؟")) return;
    try {
      const res = await fetch(`/api/admin/renovation-projects/${projectRouteKey}/images/${imageId}`, {
        method: "DELETE"
      });
      if (!res.ok) throw new Error("Failed");
      showToast("تم حذف الصورة", "success");
      fetchProject();
    } catch (e) {
      showToast("خطأ أثناء الحذف", "error");
    }
  };

  // ---- Challenges ----
  const handleAddChallenge = async () => {
    if (!newChallenge.title.trim()) return;
    setAddingChallenge(true);
    try {
      const res = await fetch(`/api/admin/renovation-projects/${projectRouteKey}/challenges`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newChallenge)
      });
      if (!res.ok) throw new Error("Failed");
      showToast("تمت إضافة التحدي", "success");
      setNewChallenge({ title: "", description: "" });
      fetchProject();
    } catch (e) {
      showToast("خطأ أثناء الإضافة", "error");
    } finally {
      setAddingChallenge(false);
    }
  };

  const handleUpdateChallenge = async (id: number) => {
    if (!editChallengeData.title.trim()) return;
    try {
      const res = await fetch(`/api/admin/renovation-projects/${projectRouteKey}/challenges/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editChallengeData)
      });
      if (!res.ok) throw new Error("Failed");
      showToast("تم تعديل التحدي", "success");
      setEditingChallengeId(null);
      fetchProject();
    } catch (e) {
      showToast("خطأ أثناء التعديل", "error");
    }
  };

  const handleDeleteChallenge = async (id: number) => {
    if (!confirm("هل أنت متأكد من حذف هذا التحدي؟")) return;
    try {
      const res = await fetch(`/api/admin/renovation-projects/${projectRouteKey}/challenges/${id}`, {
        method: "DELETE"
      });
      if (!res.ok) throw new Error("Failed");
      showToast("تم حذف التحدي", "success");
      fetchProject();
    } catch (e) {
      showToast("خطأ أثناء الحذف", "error");
    }
  };

  if (fetching) {
    return <div className="p-8 text-center text-gray-500">جاري تحميل المشروع...</div>;
  }

  return (
    <div className="space-y-6">
      
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/admin/finishing" className="p-2 bg-white rounded-xl shadow-sm hover:bg-gray-50 transition-colors">
            <FiArrowRight size={20} className="text-navy-dark" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-navy-dark">تعديل مشروع: {formData.title}</h1>
            <p className="text-gray-500 text-sm">تعديل تفاصيل مشروع التشطيب.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Left Col - Info */}
        <div className="xl:col-span-2 space-y-6">
          <form onSubmit={handleSubmitBasicInfo} className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 space-y-8">
            <div>
              <h3 className="text-lg font-bold text-navy-dark mb-4 border-b border-gray-100 pb-2">المعلومات الأساسية</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">اسم المشروع <span className="text-red-500">*</span></label>
                  <input required type="text" name="title" value={formData.title} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/50 outline-none text-navy-dark" />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">النمط (Style) <span className="text-red-500">*</span></label>
                  <select name="style" value={formData.style} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/50 outline-none text-navy-dark">
                    <option value="modern">عصري (Modern)</option>
                    <option value="neo_classic">نيو كلاسيك (Neo Classic)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">نوع العقار <span className="text-red-500">*</span></label>
                  <select name="property_type" value={formData.property_type} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/50 outline-none text-navy-dark">
                    <option value="apartment">شقة</option>
                    <option value="villa">فيلا</option>
                    <option value="commercial_shop">محل تجاري</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">الحالة <span className="text-red-500">*</span></label>
                  <select name="status" value={formData.status} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/50 outline-none text-navy-dark">
                    <option value="completed">مكتمل</option>
                    <option value="in_progress">تحت التنفيذ</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">المساحة (م²)</label>
                  <input type="number" name="area_sqm" value={formData.area_sqm} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/50 outline-none text-navy-dark" placeholder="150" />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">مدة التنفيذ</label>
                  <input type="text" name="execution_duration" value={formData.execution_duration} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/50 outline-none text-navy-dark" placeholder="شهرين" />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">الموقع (العنوان) <span className="text-red-500">*</span></label>
                  <input required type="text" name="location" value={formData.location} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/50 outline-none text-navy-dark" />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-navy-dark mb-4 border-b border-gray-100 pb-2">تفاصيل إضافية</h3>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">الوصف الكامل (اختياري)</label>
                  <textarea name="description" value={formData.description} onChange={handleChange} rows={4} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/50 outline-none resize-none text-navy-dark"></textarea>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">الخامات المستخدمة (مفصولة بفاصلة)</label>
                  <input type="text" name="materials_used" value={formData.materials_used} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/50 outline-none text-navy-dark" placeholder="بورسلين هندي، رخام، جبس بورد..." />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">نطاق العمل (مفصولة بفاصلة)</label>
                  <input type="text" name="scope_of_work" value={formData.scope_of_work} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/50 outline-none text-navy-dark" placeholder="تشطيب كامل، سباكة، كهرباء..." />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-navy-dark mb-4 border-b border-gray-100 pb-2">تحديث الصورة الرئيسية</h3>
              {existingMainImage && !mainImage && (
                <div className="mb-4">
                  <img src={existingMainImage} alt="Current main image" className="w-32 h-32 object-cover rounded-xl border border-gray-200" />
                </div>
              )}
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-2xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <FiUpload className="w-8 h-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500 font-bold">{mainImage ? mainImage.name : "اضغط لاختيار صورة رئيسية جديدة"}</p>
                </div>
                <input type="file" className="hidden" accept="image/*" onChange={handleMainImageChange} />
              </label>
            </div>

            <div className="pt-6 border-t border-gray-100 flex justify-end">
              <button disabled={loading} type="submit" className="bg-primary text-navy-deeper font-bold px-8 py-3 rounded-xl flex items-center gap-2 hover:bg-[#D6AE45] transition-colors shadow-sm disabled:opacity-50">
                {loading ? "جاري الحفظ..." : <><FiSave size={20} /> <span>حفظ البيانات الأساسية</span></>}
              </button>
            </div>
          </form>
        </div>

        {/* Right Col - Images & Challenges */}
        <div className="space-y-6">
          
          {/* Gallery Widget */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-navy-dark mb-4 border-b border-gray-100 pb-2">معرض الصور</h3>
            
            {galleryImagesList.length > 0 ? (
              <div className="grid grid-cols-2 gap-3 mb-4">
                {galleryImagesList.map((img: any) => (
                  <div key={img.id} className="relative group rounded-xl overflow-hidden bg-gray-100 aspect-square border border-gray-200">
                    <img src={getImageUrl(img.url || img.image_url)} alt="Gallery" className="w-full h-full object-cover" />
                    <button 
                      onClick={() => handleDeleteGalleryImage(img.id)}
                      className="absolute inset-0 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <FiTrash2 size={24} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm mb-4">لا توجد صور إضافية</p>
            )}

            <div className="space-y-3">
              <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <FiUpload className="w-6 h-6 text-gray-400 mb-1" />
                  <p className="text-xs text-gray-500 font-bold">{galleryImagesToUpload.length > 0 ? `${galleryImagesToUpload.length} صورة محددة` : "اختر صور للرفع"}</p>
                </div>
                <input type="file" className="hidden" accept="image/*" multiple onChange={(e) => setGalleryImagesToUpload(e.target.files ? Array.from(e.target.files) : [])} />
              </label>

              {galleryImagesToUpload.length > 0 && (
                <button 
                  onClick={handleUploadGallery} disabled={uploadingGallery}
                  className="w-full bg-navy-dark text-white font-bold py-2 rounded-xl text-sm hover:bg-navy-deeper transition-colors"
                >
                  {uploadingGallery ? "جاري الرفع..." : "رفع الصور"}
                </button>
              )}
            </div>
          </div>

          {/* Challenges Widget */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-navy-dark mb-4 border-b border-gray-100 pb-2">التحديات والحلول</h3>
            
            <div className="space-y-3 mb-6">
              {challengesList.map((ch: any) => (
                <div key={ch.id} className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                  {editingChallengeId === ch.id ? (
                    <div className="space-y-3">
                      <input 
                        type="text" value={editChallengeData.title} onChange={e => setEditChallengeData({ ...editChallengeData, title: e.target.value })}
                        className="w-full text-sm px-3 py-2 border rounded-lg outline-none focus:ring-1 focus:ring-primary"
                      />
                      <textarea 
                        value={editChallengeData.description} onChange={e => setEditChallengeData({ ...editChallengeData, description: e.target.value })}
                        className="w-full text-sm px-3 py-2 border rounded-lg outline-none focus:ring-1 focus:ring-primary resize-none" rows={2}
                      />
                      <div className="flex justify-end gap-2">
                        <button onClick={() => setEditingChallengeId(null)} className="text-xs text-gray-500 px-2 py-1">إلغاء</button>
                        <button onClick={() => handleUpdateChallenge(ch.id)} className="text-xs bg-primary text-navy-dark font-bold px-3 py-1 rounded-lg">حفظ</button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-sm text-navy-dark">{ch.title}</h4>
                        <div className="flex gap-2">
                          <button onClick={() => { setEditingChallengeId(ch.id); setEditChallengeData({ title: ch.title, description: ch.description }); }} className="text-blue-500 text-xs">تعديل</button>
                          <button onClick={() => handleDeleteChallenge(ch.id)} className="text-red-500 text-xs">حذف</button>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500">{ch.description}</p>
                    </>
                  )}
                </div>
              ))}
              {challengesList.length === 0 && <p className="text-sm text-gray-500 text-center">لا توجد تحديات</p>}
            </div>

            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 border-dashed space-y-3">
              <p className="text-sm font-bold text-gray-600 mb-2">إضافة تحدي جديد</p>
              <input 
                type="text" placeholder="عنوان التحدي" value={newChallenge.title} onChange={e => setNewChallenge({ ...newChallenge, title: e.target.value })}
                className="w-full text-sm px-3 py-2 border border-gray-200 rounded-lg outline-none focus:ring-1 focus:ring-primary"
              />
              <textarea 
                placeholder="التفاصيل والحل" value={newChallenge.description} onChange={e => setNewChallenge({ ...newChallenge, description: e.target.value })}
                className="w-full text-sm px-3 py-2 border border-gray-200 rounded-lg outline-none focus:ring-1 focus:ring-primary resize-none" rows={2}
              />
              <button 
                onClick={handleAddChallenge} disabled={addingChallenge || !newChallenge.title.trim()}
                className="w-full flex items-center justify-center gap-2 bg-white border border-gray-200 text-navy-dark font-bold py-2 rounded-lg text-sm hover:bg-gray-50 disabled:opacity-50 transition-colors"
              >
                <FiPlus /> {addingChallenge ? "جاري الإضافة..." : "إضافة"}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
