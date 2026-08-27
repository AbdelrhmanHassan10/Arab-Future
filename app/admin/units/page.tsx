"use client";

import { useState, useEffect } from "react";
import { FiPlus, FiSearch, FiEdit2, FiTrash2 } from "react-icons/fi";
import { getImageUrl, extractString } from "@/lib/config";
import { Unit } from "@/lib/units";
import Link from "next/link";
import { useToast } from "@/components/ToastProvider";
import { useConfirm } from "@/components/ConfirmProvider";

export default function AdminUnitsPage() {
  const { showToast } = useToast();
  const { confirm } = useConfirm();
  const [units, setUnits] = useState<Unit[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  const [timestamp, setTimestamp] = useState(Date.now());

  const fetchUnits = async () => {
    try {
      const res = await fetch("/api/admin/units");
      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Status ${res.status}: ${errText}`);
      }
      const data = await res.json();
      const fetchedUnits = data.data || data;
      setUnits(Array.isArray(fetchedUnits) ? fetchedUnits : []);
      setTimestamp(Date.now()); // Update timestamp to refresh images
      setLoading(false);
    } catch (error: any) {
      console.error("Failed to fetch units:", error?.message || error);
      showToast("خطأ في جلب الوحدات: " + (error?.message || ""), "error");
      setUnits([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUnits();
  }, []);

  const handleDelete = async (unit_code: string) => {
    if (!await confirm("هل أنت متأكد من حذف هذه الوحدة؟ لا يمكن التراجع عن هذا الإجراء.")) return;

    try {
      const res = await fetch(`/api/admin/units/${unit_code}`, { method: 'DELETE' });
      if (!res.ok) throw new Error("Failed to delete unit");
      showToast("تم الحذف بنجاح", "success");
      fetchUnits();
    } catch (error) {
      console.error(error);
      showToast("حدث خطأ أثناء الحذف", "error");
    }
  };

  const handleToggleStatus = async (unit: Unit) => {
    const newStatus = unit.status === "available" ? "sold" : "available";
    const code = extractString(unit.unit_code || unit.id);
    try {
      const res = await fetch(`/api/admin/units/${code}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      });
      if (!res.ok) throw new Error("Failed to update status");
      showToast("تم تحديث حالة الوحدة", "success");
      fetchUnits();
    } catch (error) {
      console.error(error);
      showToast("حدث خطأ أثناء تحديث الحالة", "error");
    }
  };

  const filteredUnits = units.filter(u => {
    const uAny = u as any;
    const titleStr = typeof uAny?.title === 'object' ? (uAny.title?.name || uAny.title?.ar || uAny.title?.en || '') : String(uAny?.title || '');
    const idStr = typeof uAny?.id === 'object' || typeof uAny?.unit_code === 'object' ? (uAny.unit_code?.name || uAny.id?.name || '') : String(uAny?.unit_code || uAny?.id || '');
    const matchesSearch = titleStr.includes(searchTerm) || idStr.includes(searchTerm);
    const matchesStatus = statusFilter === "all" || uAny?.status === statusFilter;
    return matchesSearch && matchesStatus;
  });


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
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-600 focus:outline-none"
        >
          <option value="all">جميع الحالات</option>
          <option value="available">متاحة</option>
          <option value="reserved">محجوزة</option>
          <option value="sold">تم البيع</option>
        </select>
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
                {filteredUnits.map((unit, index) => {
                  const safeId = extractString((unit as any).code || unit.unit_code || unit.id);
                  const safeTitle = extractString(unit.title);
                  const safeLocation = extractString(unit.address || (unit as any).location);
                  const safeType = extractString(unit.type);
                  let rawPrice: any = unit.price;
                  if (typeof rawPrice === 'object' && rawPrice !== null) {
                    rawPrice = rawPrice.price || rawPrice.name || 0;
                  }
                  const safePrice = extractString(rawPrice);
                  const displayType = safeType === "apartment" ? "شقة" : safeType === "villa" ? "فيلا" : (safeType === "shop" || safeType === "commercial_shop") ? "محل تجاري" : safeType;

                  return (
                  <tr key={safeId || Math.random().toString()} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
                          <img src={`${getImageUrl(unit.main_image_url || unit.main_image || (unit as any).image || (unit.images && unit.images.length > 0 ? unit.images[0] : null), index)}?t=${timestamp}`} alt={safeId} className="w-full h-full object-cover" onError={(e) => { e.currentTarget.src = 'https://placehold.co/800x600/f3f4f6/9ca3af.png?text=No+Image' }} />
                        </div>
                        <span className="font-bold text-navy-dark text-sm bg-gray-100 px-2 py-1 rounded-md">{safeId}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-sm text-navy-dark max-w-[200px] truncate">{safeTitle}</div>
                      <div className="text-xs text-gray-500 max-w-[200px] truncate">{safeLocation}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600 font-medium">
                        {displayType}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-bold text-navy-dark">{Number(safePrice || 0).toLocaleString("ar-EG")} ج.م</span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleToggleStatus(unit)}
                        className={`px-3 py-1 rounded-full text-xs font-bold inline-block transition-transform hover:scale-105 ${unit.status === "available" ? "bg-green-100 text-green-600" : unit.status === "reserved" ? "bg-yellow-100 text-yellow-600" : "bg-red-100 text-red-600"}`}
                      >
                        {unit.status === "available" ? "متاحة" : unit.status === "reserved" ? "محجوزة" : "تم البيع"}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-left">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/admin/units/edit/${safeId}`} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors inline-block" title="تعديل">
                          <FiEdit2 size={16} />
                        </Link>
                        <button
                          onClick={() => handleDelete(String(safeId))}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          title="حذف"
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )})}
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
