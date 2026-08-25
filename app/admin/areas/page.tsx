"use client";

import { useState, useEffect } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiSearch } from "react-icons/fi";

export default function AdminAreasPage() {
  const [areas, setAreas] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // Form state
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchAreas = async () => {
    try {
      const res = await fetch("/api/admin/areas");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      const fetched = data.data || data;
      setAreas(Array.isArray(fetched) ? fetched : []);
    } catch (error) {
      console.error(error);
      setAreas([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAreas();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSubmitting(true);
    try {
      const url = editingId ? `/api/admin/areas/${editingId}` : "/api/admin/areas";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      if (!res.ok) throw new Error("Failed to save");
      
      await fetchAreas();
      handleCancel();
    } catch (error) {
      console.error(error);
      alert("حدث خطأ أثناء الحفظ");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (area: any) => {
    setEditingId(area.id);
    setName(area.name);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("هل أنت متأكد من حذف هذه المنطقة؟")) return;

    try {
      const res = await fetch(`/api/admin/areas/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      await fetchAreas();
    } catch (error) {
      console.error(error);
      alert("حدث خطأ أثناء الحذف");
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setName("");
  };

  const filteredAreas = areas.filter(a => a.name?.includes(searchTerm));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-navy-dark">المناطق</h1>
          <p className="text-gray-500 text-sm">إدارة المناطق التي تتوفر بها الوحدات العقارية.</p>
        </div>
        {!showForm && (
          <button 
            onClick={() => setShowForm(true)}
            className="bg-primary text-navy-deeper font-bold px-6 py-2.5 rounded-xl flex items-center gap-2 hover:bg-[#D6AE45] transition-colors shadow-sm whitespace-nowrap"
          >
            <FiPlus size={20} />
            <span>إضافة منطقة</span>
          </button>
        )}
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm max-w-xl">
          <h3 className="font-bold text-navy-dark mb-4">{editingId ? "تعديل منطقة" : "إضافة منطقة جديدة"}</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">اسم المنطقة</label>
              <input 
                type="text" 
                value={name}
                onChange={e => setName(e.target.value)}
                required
                placeholder="مثال: بني سويف الجديدة، الحي الثالث"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/20 text-sm"
              />
            </div>
            <div className="flex items-center gap-3">
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-navy-dark text-white px-6 py-2 rounded-xl text-sm font-bold hover:bg-navy-deeper transition-colors disabled:opacity-50"
              >
                {isSubmitting ? "جاري الحفظ..." : "حفظ"}
              </button>
              <button 
                type="button"
                onClick={handleCancel}
                className="bg-gray-100 text-gray-600 px-6 py-2 rounded-xl text-sm font-bold hover:bg-gray-200 transition-colors"
              >
                إلغاء
              </button>
            </div>
          </div>
        </form>
      )}

      {!showForm && (
        <>
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
            <div className="relative w-full md:w-96">
              <FiSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="ابحث باسم المنطقة..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl pr-12 pl-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-right whitespace-nowrap">
              <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 text-xs uppercase font-bold tracking-wider">
                <tr>
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">اسم المنطقة</th>
                  <th className="px-6 py-4 text-left">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {loading ? (
                  <tr>
                    <td colSpan={3} className="px-6 py-8 text-center text-gray-400">جاري التحميل...</td>
                  </tr>
                ) : filteredAreas.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-6 py-8 text-center text-gray-400">لا توجد مناطق.</td>
                  </tr>
                ) : (
                  filteredAreas.map(area => (
                    <tr key={area.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 font-bold text-gray-400 text-sm">{area.id}</td>
                      <td className="px-6 py-4 font-bold text-navy-dark text-sm">{area.name}</td>
                      <td className="px-6 py-4 text-left">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => handleEdit(area)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
                            <FiEdit2 size={16} />
                          </button>
                          <button onClick={() => handleDelete(area.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                            <FiTrash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
