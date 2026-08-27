"use client";

import { useState, useEffect } from "react";
import { FiPlus, FiSearch, FiEdit2, FiTrash2, FiX, FiCheck } from "react-icons/fi";
import { useToast } from "@/components/ToastProvider";
import { useConfirm } from "@/components/ConfirmProvider";

export default function AdminPlansPage() {
  const { showToast } = useToast();
  const { confirm } = useConfirm();
  const [plans, setPlans] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // Form state
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    is_recommended: false,
    notes: [""]
  });

  const fetchPlans = async () => {
    try {
      const res = await fetch("/api/admin/plans");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      const fetched = data.data || data;
      setPlans(Array.isArray(fetched) ? fetched : []);
    } catch (error) {
      console.error(error);
      setPlans([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleNoteChange = (index: number, value: string) => {
    const newNotes = [...formData.notes];
    newNotes[index] = value;
    setFormData(prev => ({ ...prev, notes: newNotes }));
  };

  const addNote = () => setFormData(prev => ({ ...prev, notes: [...prev.notes, ""] }));
  const removeNote = (index: number) => setFormData(prev => ({ ...prev, notes: prev.notes.filter((_, i) => i !== index) }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.price) return;

    setIsSubmitting(true);
    try {
      const url = editingId ? `/api/admin/plans/${editingId}` : "/api/admin/plans";
      const method = editingId ? "PUT" : "POST";

      const payload = {
        ...formData,
        price: parseFloat(formData.price),
        notes: formData.notes.filter(n => n.trim() !== "") // Clean empty notes
      };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to save");
      
      showToast(`تم ${editingId ? 'تعديل' : 'إضافة'} الخطة بنجاح`, "success");
      await fetchPlans();
      handleCancel();
    } catch (error) {
      console.error(error);
      showToast("حدث خطأ أثناء الحفظ", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (plan: any) => {
    setEditingId(plan.id);
    setFormData({
      title: plan.title || "",
      description: plan.description || "",
      price: plan.price?.toString() || "",
      is_recommended: !!plan.is_recommended,
      notes: Array.isArray(plan.notes) && plan.notes.length > 0 ? plan.notes : [""]
    });
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!await confirm("هل أنت متأكد من حذف هذه الخطة؟ لا يمكن التراجع.")) return;

    try {
      const res = await fetch(`/api/admin/plans/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      showToast("تم حذف الخطة بنجاح", "success");
      await fetchPlans();
    } catch (error) {
      console.error(error);
      showToast("حدث خطأ أثناء الحذف", "error");
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({ title: "", description: "", price: "", is_recommended: false, notes: [""] });
  };

  const filteredPlans = plans.filter(p => p.title?.includes(searchTerm));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-navy-dark">باقات التشطيب</h1>
          <p className="text-gray-500 text-sm">إدارة الباقات وخطط الأسعار لتشطيب العقارات.</p>
        </div>
        {!showForm && (
          <button 
            onClick={() => setShowForm(true)}
            className="bg-primary text-navy-deeper font-bold px-6 py-2.5 rounded-xl flex items-center gap-2 hover:bg-[#D6AE45] transition-colors shadow-sm whitespace-nowrap"
          >
            <FiPlus size={20} />
            <span>إضافة باقة جديدة</span>
          </button>
        )}
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm max-w-3xl">
          <h3 className="font-bold text-navy-dark text-lg mb-6 border-b border-gray-100 pb-2">
            {editingId ? "تعديل باقة" : "إضافة باقة جديدة"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">اسم الباقة <span className="text-red-500">*</span></label>
              <input 
                type="text" name="title" value={formData.title} onChange={handleChange} required
                placeholder="مثال: الخطة الذهبية"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/20 text-sm"
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">السعر (للمتر المربع) <span className="text-red-500">*</span></label>
              <input 
                type="number" name="price" value={formData.price} onChange={handleChange} required
                placeholder="15000"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/20 text-sm"
              />
            </div>

            <div className="flex items-center">
              <label className="flex items-center gap-3 cursor-pointer mt-7">
                <input 
                  type="checkbox" name="is_recommended" checked={formData.is_recommended} onChange={handleChange}
                  className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span className="text-sm font-bold text-gray-700">تحديد كباقة مميزة (Recommended)</span>
              </label>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">وصف مختصر</label>
              <textarea 
                name="description" value={formData.description} onChange={handleChange} rows={2}
                placeholder="أفضل باقة تشطيب متكاملة..."
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20 text-sm resize-none"
              />
            </div>
            
            <div className="md:col-span-2 border-t border-gray-100 pt-4 mt-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">المميزات (Notes)</label>
              <div className="space-y-3">
                {formData.notes.map((note, index) => (
                  <div key={index} className="flex gap-2">
                    <input 
                      type="text" value={note} onChange={(e) => handleNoteChange(index, e.target.value)}
                      placeholder="مثال: ضمان سنتين، خصم 10%..."
                      className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20"
                    />
                    {formData.notes.length > 1 && (
                      <button type="button" onClick={() => removeNote(index)} className="px-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors">
                        <FiX />
                      </button>
                    )}
                  </div>
                ))}
                <button type="button" onClick={addNote} className="text-sm font-bold text-primary hover:underline">+ إضافة ميزة أخرى</button>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-6 border-t border-gray-100">
            <button 
              type="submit" disabled={isSubmitting}
              className="bg-navy-dark text-white px-8 py-2.5 rounded-xl text-sm font-bold hover:bg-navy-deeper transition-colors disabled:opacity-50"
            >
              {isSubmitting ? "جاري الحفظ..." : "حفظ الباقة"}
            </button>
            <button 
              type="button" onClick={handleCancel}
              className="bg-gray-100 text-gray-600 px-8 py-2.5 rounded-xl text-sm font-bold hover:bg-gray-200 transition-colors"
            >
              إلغاء
            </button>
          </div>
        </form>
      )}

      {!showForm && (
        <>
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative w-full sm:w-96">
              <FiSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="ابحث باسم الباقة..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl pr-12 pl-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {loading ? (
              <div className="p-12 text-center text-gray-500">جاري التحميل...</div>
            ) : filteredPlans.length === 0 ? (
              <div className="p-12 text-center text-gray-500">لا توجد باقات لعرضها.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-right whitespace-nowrap">
                  <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 text-xs uppercase font-bold tracking-wider">
                    <tr>
                      <th className="px-6 py-4">اسم الباقة</th>
                      <th className="px-6 py-4">السعر</th>
                      <th className="px-6 py-4">مميزة؟</th>
                      <th className="px-6 py-4 w-1/3">الوصف</th>
                      <th className="px-6 py-4 text-left">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filteredPlans.map((plan) => (
                      <tr key={plan.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-bold text-navy-dark">{plan.title}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-bold text-primary">{plan.price} ج.م</div>
                        </td>
                        <td className="px-6 py-4">
                          {plan.is_recommended ? (
                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold flex items-center w-fit gap-1"><FiCheck /> نعم</span>
                          ) : (
                            <span className="bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-xs font-bold w-fit block">لا</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-gray-500 truncate max-w-xs">{plan.description || "لا يوجد"}</p>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button 
                              onClick={() => handleEdit(plan)}
                              className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                              title="تعديل"
                            >
                              <FiEdit2 size={18} />
                            </button>
                            <button 
                              onClick={() => handleDelete(plan.id)}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                              title="حذف"
                            >
                              <FiTrash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
