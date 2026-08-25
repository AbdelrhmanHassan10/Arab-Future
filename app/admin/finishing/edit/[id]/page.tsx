"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FiUpload, FiArrowRight, FiSave, FiX } from "react-icons/fi";
import Link from "next/link";
import { extractString, getImageUrl } from "@/lib/config";

export default function EditFinishingProjectPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [projectRouteKey, setProjectRouteKey] = useState<string>(params.id);

  const [formData, setFormData] = useState({
    title: "",
    style: "",
    status: "completed",
    location: "",
    description: "",
    challenges: ""
  });

  const [mainImage, setMainImage] = useState<File | null>(null);
  const [existingImage, setExistingImage] = useState<string>("");

  useEffect(() => {
    const fetchProject = async () => {
      try {
        let res = await fetch(`/api/admin/renovation-projects/${params.id}`);
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
             throw new Error("فشل في تحميل بيانات المشروع");
          }
        } else {
          data = await res.json();
        }

        const p = data.data || data;
        setProjectRouteKey(p.code || p.renovation_code || p.id);

        let challengesStr = "";
        if (Array.isArray(p.challenges)) {
          challengesStr = p.challenges.map((c: any) => c.title || c.description || c).join("، ");
        }

        setFormData({
          title: extractString(p.title),
          style: p.style || "",
          status: p.status || "completed",
          location: p.location || "",
          description: extractString(p.description),
          challenges: challengesStr
        });
        
        if (p.main_image || p.image) {
          setExistingImage(getImageUrl(p.main_image || p.image));
        }

      } catch (err: any) {
        setError(err.message);
      } finally {
        setFetching(false);
      }
    };
    fetchProject();
  }, [params.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
        data.append(key, value.toString());
      });
      if (mainImage) {
        data.append("main_image", mainImage);
        data.append("image", mainImage);
      }
      data.append("_method", "PUT");

      const res = await fetch(`/api/admin/renovation-projects/${projectRouteKey}`, {
        method: "POST",
        body: data,
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "حدث خطأ أثناء تعديل المشروع");
      }

      router.push("/admin/finishing");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
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
              <label className="block text-sm font-bold text-gray-700 mb-2">اسم المشروع <span className="text-red-500">*</span></label>
              <input required type="text" name="title" value={formData.title} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/50 outline-none" />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">النمط (Style) <span className="text-red-500">*</span></label>
              <input required type="text" name="style" value={formData.style} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/50 outline-none" />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">الحالة <span className="text-red-500">*</span></label>
              <select name="status" value={formData.status} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/50 outline-none">
                <option value="completed">مكتمل</option>
                <option value="in_progress">تحت التنفيذ</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">الموقع (العنوان) <span className="text-red-500">*</span></label>
              <input required type="text" name="location" value={formData.location} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/50 outline-none" />
            </div>
          </div>
        </div>

        {/* Details & Challenges */}
        <div>
          <h3 className="text-lg font-bold text-navy-dark mb-4 border-b border-gray-100 pb-2">تفاصيل إضافية</h3>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">الوصف الكامل (اختياري)</label>
              <textarea name="description" value={formData.description} onChange={handleChange} rows={5} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/50 outline-none resize-none"></textarea>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">تحديات المشروع (مفصولة بفاصلة)</label>
              <textarea name="challenges" value={formData.challenges} onChange={handleChange} rows={2} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/50 outline-none" placeholder="ضيق الوقت، صعوبة استخراج التصاريح..."></textarea>
            </div>
          </div>
        </div>

        {/* Images */}
        <div>
          <h3 className="text-lg font-bold text-navy-dark mb-4 border-b border-gray-100 pb-2">صورة المشروع</h3>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">الصورة الرئيسية (غلاف المشروع)</label>

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
          <Link href="/admin/finishing" className="px-6 py-3 font-bold text-gray-500 hover:bg-gray-50 rounded-xl transition-colors">إلغاء</Link>
          <button disabled={loading} type="submit" className="bg-primary text-navy-deeper font-bold px-8 py-3 rounded-xl flex items-center gap-2 hover:bg-[#D6AE45] transition-colors shadow-sm disabled:opacity-50">
            {loading ? "جاري الحفظ..." : <><FiSave size={20} /> <span>حفظ التعديلات</span></>}
          </button>
        </div>

      </form>
    </div>
  );
}
