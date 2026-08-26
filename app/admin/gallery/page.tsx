"use client";

import { useState, useEffect } from "react";
import { FiTrash2, FiUploadCloud, FiPlus } from "react-icons/fi";
import { useToast } from "@/components/ToastProvider";
import { useConfirm } from "@/components/ConfirmProvider";

const categories = ["فلل فاخرة", "شقق فندقية", "مساحات تجارية", "إطلالات بحرية", "قصور"];

export default function AdminGalleryPage() {
  const { showToast } = useToast();
  const { confirm } = useConfirm();
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const [newImageFile, setNewImageFile] = useState<File | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState(categories[0]);

  const fetchImages = async () => {
    try {
      const res = await fetch("/api/admin/gallery");
      const data = await res.json();
      setImages(data.data || []);
    } catch (error) {
      console.error(error);
      showToast("حدث خطأ أثناء جلب الصور", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImageFile) {
      showToast("الرجاء اختيار صورة", "error");
      return;
    }
    if (!newTitle) {
      showToast("الرجاء إدخال عنوان الصورة", "error");
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", newImageFile);
      formData.append("title", newTitle);
      formData.append("category", newCategory);

      const res = await fetch("/api/admin/gallery", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");
      
      showToast("تم رفع الصورة بنجاح", "success");
      setShowAddModal(false);
      setNewImageFile(null);
      setNewTitle("");
      fetchImages();
    } catch (error) {
      console.error(error);
      showToast("حدث خطأ أثناء رفع الصورة", "error");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!await confirm("هل أنت متأكد من حذف هذه الصورة؟")) return;
    try {
      const res = await fetch(`/api/admin/gallery?id=${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      showToast("تم الحذف بنجاح", "success");
      fetchImages();
    } catch (error) {
      console.error(error);
      showToast("حدث خطأ أثناء الحذف", "error");
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-navy-dark">معرض الصور</h1>
          <p className="text-gray-500 mt-2">إدارة الصور المعروضة في صفحة المعرض العامة</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-primary-dark transition-all flex items-center gap-2"
        >
          <FiPlus />
          إضافة صورة جديدة
        </button>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : images.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-sm">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiUploadCloud size={32} className="text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-700 mb-2">لا توجد صور</h3>
          <p className="text-gray-500 mb-6">قم بإضافة صور جديدة لمعرض الصور الخاص بك</p>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-primary/10 text-primary px-6 py-2.5 rounded-xl font-bold hover:bg-primary hover:text-white transition-all"
          >
            إضافة صورة
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {images.map((img) => (
            <div key={img.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm group">
              <div className="aspect-[4/3] bg-gray-100 relative">
                <img src={img.src} alt={img.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button onClick={() => handleDelete(img.id)} className="w-10 h-10 bg-white/20 hover:bg-red-500 rounded-full flex items-center justify-center text-white backdrop-blur-sm transition-colors">
                    <FiTrash2 />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <div className="text-xs font-bold text-primary mb-1 bg-primary/10 inline-block px-2 py-1 rounded-md">{img.category}</div>
                <h3 className="font-bold text-gray-800 line-clamp-1">{img.title}</h3>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl p-6 md:p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-navy-dark">صورة جديدة</h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            
            <form onSubmit={handleUpload} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">عنوان الصورة</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  placeholder="مثال: واجهة الفيلا الفاخرة"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">القسم</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                >
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">ملف الصورة</label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setNewImageFile(e.target.files?.[0] || null)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    required
                  />
                  {newImageFile ? (
                    <div className="text-primary font-bold">{newImageFile.name}</div>
                  ) : (
                    <div className="text-gray-500">اضغط هنا لاختيار الصورة</div>
                  )}
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="submit"
                  disabled={isUploading}
                  className="flex-1 bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary-dark transition-all flex items-center justify-center disabled:opacity-50"
                >
                  {isUploading ? "جاري الرفع..." : "رفع وحفظ"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-all"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
