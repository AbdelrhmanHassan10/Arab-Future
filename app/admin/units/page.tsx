"use client";

import { useState, useEffect } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiFilter } from "react-icons/fi";
import { Unit } from "@/lib/units";
import Link from "next/link";

export default function AdminUnitsPage() {
  const [units, setUnits] = useState<Unit[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchUnits = async () => {
    try {
      const res = await fetch("/api/admin/units");
      const data = await res.json();
      const fetchedUnits = data.data || data;
      setUnits(Array.isArray(fetchedUnits) ? fetchedUnits : []);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch units:", error);
      setUnits([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUnits();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذه الوحدة؟")) return;
    
    await fetch(`/api/admin/units/${id}`, { method: 'DELETE' });
    fetchUnits();
  };

  const handleToggleStatus = async (unit: Unit) => {
    const newStatus = unit.status === "available" ? "sold" : "available";
    await fetch(`/api/admin/units/${unit.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus })
    });
    fetchUnits();
  };

  const filteredUnits = units.filter(u => 
    u.title.includes(searchTerm) || u.id.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-navy-dark">إدارة الوحدات</h1>
          <p className="text-gray-500 text-sm">أضف، عدل، أو احذف الوحدات العقارية المعروضة.</p>
        </div>
        <Link 
          href="/admin/units/add"
          className="bg-primary text-navy-deeper font-bold px-6 py-2.5 rounded-xl flex items-center gap-2 hover:bg-[#D6AE45] transition-colors shadow-sm whitespace-nowrap"
        >
          <FiPlus size={20} />
          <span>إضافة وحدة جديدة</span>
        </Link>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <FiSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="ابحث بالاسم أو الكود..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl pr-12 pl-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-100 w-full md:w-auto">
            <FiFilter />
            <span className="text-sm font-bold">تصفية</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
           <div className="p-10 text-center text-gray-500 font-bold">جاري تحميل الوحدات...</div>
        ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-right whitespace-nowrap">
            <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 text-xs uppercase font-bold tracking-wider">
              <tr>
                <th className="px-6 py-4">الكود / الصورة</th>
                <th className="px-6 py-4">العنوان</th>
                <th className="px-6 py-4">النوع</th>
                <th className="px-6 py-4">السعر</th>
                <th className="px-6 py-4">الحالة</th>
                <th className="px-6 py-4 text-left">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredUnits.map((unit) => (
                <tr key={unit.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
                        <img src={unit.image} alt={unit.id} className="w-full h-full object-cover" />
                      </div>
                      <span className="font-bold text-navy-dark text-sm bg-gray-100 px-2 py-1 rounded-md">{unit.id}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-sm text-navy-dark max-w-[200px] truncate">{unit.title}</div>
                    <div className="text-xs text-gray-500 max-w-[200px] truncate">{unit.location}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600 font-medium">
                      {unit.type === "apartment" ? "شقة" : unit.type === "villa" ? "فيلا" : unit.type === "shop" ? "محل" : unit.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-navy-dark">{unit.price.toLocaleString("ar-EG")} ج.م</span>
                  </td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => handleToggleStatus(unit)}
                      className={`px-3 py-1 rounded-full text-xs font-bold inline-block transition-transform hover:scale-105 ${unit.status === "available" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}
                    >
                      {unit.status === "available" ? "متاحة" : "تم البيع"}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-left">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/units/edit/${unit.id}`} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors inline-block" title="تعديل">
                        <FiEdit2 size={16} />
                      </Link>
                      <button 
                        onClick={() => handleDelete(unit.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" 
                        title="حذف"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredUnits.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                    لا توجد وحدات تطابق بحثك.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        )}
      </div>

    </div>
  );
}
