"use client";

import { useState, useEffect } from "react";
import { FiPlus, FiSearch, FiEdit2, FiTrash2, FiEye, FiMapPin, FiMaximize, FiCheckCircle } from "react-icons/fi";
import { BiBed, BiBath } from "react-icons/bi";
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
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
  const [loadingModal, setLoadingModal] = useState(false);

  const handleOpenModal = async (unit: Unit) => {
    setSelectedUnit(unit);
    setLoadingModal(true);
    try {
      const code = extractString((unit as any).code || unit.unit_code || unit.id);
      const res = await fetch(`/api/admin/units/${code}`);
      if (res.ok) {
        const data = await res.json();
        const fullUnit = data.data || data;
        setSelectedUnit(fullUnit);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingModal(false);
    }
  };

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
      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`[${res.status}] ${errText}`);
      }
      showToast("تم الحذف بنجاح", "success");
      fetchUnits();
    } catch (error: any) {
      console.error(error);
      alert("رسالة الخطأ من الباك إند:\n" + error.message);
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
                        <button 
                          onClick={() => handleOpenModal(unit)}
                          className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors inline-block" 
                          title="عرض التفاصيل"
                        >
                          <FiEye size={16} />
                        </button>
                        <Link href={`/admin/units/edit/${unit.code || unit.unit_code || unit.id}`} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors inline-block" title="تعديل">
                          <FiEdit2 size={16} />
                        </Link>
                        <button
                          onClick={() => handleDelete(safeId)}
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

      {/* Details Modal */}
      {selectedUnit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 sm:p-6 backdrop-blur-md">
          <div className="bg-white rounded-3xl w-full max-w-2xl flex flex-col shadow-2xl animate-fade-rise is-visible relative max-h-[90vh] overflow-hidden">
            <div className="w-full flex-1 overflow-y-auto pb-6" data-lenis-prevent>
            
            {/* Header Image */}
            <div className="w-full h-48 bg-gray-100 relative shrink-0">
              <img 
                src={`${getImageUrl(selectedUnit.main_image_url || selectedUnit.main_image || (selectedUnit as any).image || (selectedUnit.images && selectedUnit.images.length > 0 ? selectedUnit.images[0] : null))}?t=${timestamp}`} 
                alt="Unit" 
                className="w-full h-full object-cover" 
                onError={(e) => { e.currentTarget.src = 'https://placehold.co/800x400/f3f4f6/9ca3af.png?text=No+Image' }} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deeper/90 to-transparent"></div>
              
              <button 
                onClick={() => setSelectedUnit(null)}
                className="absolute top-4 left-4 w-8 h-8 flex items-center justify-center bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full text-white transition-colors"
              >
                ✕
              </button>

              <div className="absolute bottom-4 right-6 left-6 flex justify-between items-end">
                <div>
                  <h2 className="font-bold text-white text-2xl drop-shadow-md flex items-center gap-2">
                    {extractString(selectedUnit.title) || "وحدة بدون عنوان"}
                    {loadingModal && <span className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin"></span>}
                  </h2>
                  <p className="text-gray-300 text-sm mt-1">كود الوحدة: <span className="text-primary font-bold">{extractString((selectedUnit as any).code || selectedUnit.unit_code || selectedUnit.id)}</span></p>
                </div>
                <div className={`px-4 py-1.5 rounded-full text-xs font-bold shadow-sm ${selectedUnit.status === 'available' ? 'bg-green-500 text-white' : selectedUnit.status === 'reserved' ? 'bg-yellow-500 text-white' : 'bg-red-500 text-white'}`}>
                  {selectedUnit.status === "available" ? "متاحة" : selectedUnit.status === "reserved" ? "محجوزة" : "تم البيع"}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 flex flex-col justify-center text-right space-y-1">
                  <span className="text-gray-400 text-xs">السعر</span>
                  <span className="font-bold text-primary text-lg">
                    {Number(extractString((selectedUnit.price as any)?.price || (selectedUnit.price as any)?.name || selectedUnit.price || 0)).toLocaleString("ar-EG")} <span className="text-sm text-navy-dark">ج.م</span>
                  </span>
                </div>
                <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 flex flex-col justify-center text-right space-y-1">
                  <span className="text-gray-400 text-xs">النوع</span>
                  <span className="font-bold text-navy-dark text-base">
                    {(() => {
                      const t = extractString(selectedUnit.type);
                      return t === "apartment" ? "شقة" : t === "villa" ? "فيلا" : (t === "shop" || t === "commercial_shop") ? "محل تجاري" : t;
                    })()}
                  </span>
                </div>
                <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 flex flex-col justify-center text-right space-y-1">
                  <span className="text-gray-400 text-xs flex items-center justify-end gap-1">المساحة <FiMaximize/></span>
                  <span className="font-bold text-navy-dark text-base">
                    {extractString((selectedUnit as any).space_sqm || (selectedUnit as any).space || (selectedUnit as any).area)} م²
                  </span>
                </div>
                
                <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 flex flex-col justify-center text-right space-y-1">
                  <span className="text-gray-400 text-xs flex items-center justify-end gap-1">غرف النوم <BiBed size={14}/></span>
                  <span className="font-bold text-navy-dark text-base">{extractString((selectedUnit as any).bedrooms) || 0}</span>
                </div>
                <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 flex flex-col justify-center text-right space-y-1">
                  <span className="text-gray-400 text-xs flex items-center justify-end gap-1">الحمامات <BiBath size={14}/></span>
                  <span className="font-bold text-navy-dark text-base">{extractString((selectedUnit as any).bathrooms) || 0}</span>
                </div>
                <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 flex flex-col justify-center text-right space-y-1 col-span-2 md:col-span-3">
                  <span className="text-gray-400 text-xs flex items-center justify-end gap-1">العنوان <FiMapPin/></span>
                  <span className="font-bold text-navy-dark text-sm leading-snug break-words">{extractString(selectedUnit.address || (selectedUnit as any).location) || "غير محدد"}</span>
                </div>
              </div>

              {/* Badges / Bools */}
              <div className="flex flex-wrap gap-2 mt-4 justify-start">
                {(selectedUnit as any).is_furnished ? <span className="bg-blue-50 border border-blue-100 text-blue-600 text-xs px-3 py-1.5 rounded-full font-bold">مفروشة</span> : null}
                {(selectedUnit as any).is_mortgageable ? <span className="bg-green-50 border border-green-100 text-green-600 text-xs px-3 py-1.5 rounded-full font-bold">قابلة للتمويل</span> : null}
                {(selectedUnit as any).is_exclusive ? <span className="bg-yellow-50 border border-yellow-100 text-yellow-700 text-xs px-3 py-1.5 rounded-full font-bold">حصرية</span> : null}
                {(selectedUnit as any).finishing ? <span className="bg-purple-50 border border-purple-100 text-purple-600 text-xs px-3 py-1.5 rounded-full font-bold">تشطيب: {extractString((selectedUnit as any).finishing)}</span> : null}
              </div>

              {/* Amenities */}
              {(selectedUnit as any).amenities && (selectedUnit as any).amenities.length > 0 && (
                <div className="mt-6 border-t border-gray-50 pt-4">
                  <h3 className="text-navy-dark font-bold mb-3 text-sm flex items-center gap-2">
                    المرافق والخدمات:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {(selectedUnit as any).amenities.map((amenity: any) => (
                      <div key={amenity.id} className="flex items-center gap-1.5 text-xs text-gray-600 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
                        <FiCheckCircle className="text-green-500 shrink-0" size={12} />
                        <span>{extractString(amenity.name)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5 text-right mt-6">
                <h3 className="text-primary-dark font-bold mb-2 text-sm flex items-center gap-2">
                  <FiSearch className="inline-block" /> الوصف والتفاصيل:
                </h3>
                <p className="text-navy-light font-medium leading-relaxed whitespace-pre-wrap text-sm">
                  {extractString(selectedUnit.description) || "لا يوجد تفاصيل إضافية مضافة لهذه الوحدة."}
                </p>
              </div>

              {/* Images Gallery */}
              {(selectedUnit as any).images && Array.isArray((selectedUnit as any).images) && (selectedUnit as any).images.length > 0 && (
                <div className="mt-6 border-t border-gray-50 pt-4">
                  <h3 className="text-navy-dark font-bold mb-3 text-sm flex items-center gap-2">معرض الصور الإضافية:</h3>
                  <div className="grid grid-cols-4 gap-2">
                    {(selectedUnit as any).images.map((img: string, i: number) => {
                      // Don't duplicate main image if it's in the gallery
                      if (getImageUrl(img) === getImageUrl(selectedUnit.main_image_url || selectedUnit.main_image)) return null;
                      return (
                        <a key={i} href={getImageUrl(img)} target="_blank" rel="noreferrer" className="aspect-square rounded-xl overflow-hidden bg-gray-100 border border-gray-200 block hover:opacity-80 transition-opacity">
                          <img src={getImageUrl(img)} alt={`صورة إضافية ${i + 1}`} className="w-full h-full object-cover" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Floor Plans */}
              {(selectedUnit as any).floor_plans && Array.isArray((selectedUnit as any).floor_plans) && (selectedUnit as any).floor_plans.length > 0 && (
                <div className="mt-6 border-t border-gray-50 pt-4">
                  <h3 className="text-navy-dark font-bold mb-3 text-sm flex items-center gap-2">المخططات الهندسية:</h3>
                  <div className="flex flex-col gap-3">
                    {(selectedUnit as any).floor_plans.map((plan: any, i: number) => (
                      <div key={i} className="bg-gray-50 rounded-2xl p-4 border border-gray-100 flex flex-col items-center">
                        {plan.title && <span className="font-bold text-navy-dark text-sm mb-2">{extractString(plan.title || plan.name)}</span>}
                        <img src={getImageUrl(plan.image || plan.image_url)} alt="مخطط هندسي" className="w-full max-w-sm rounded-xl shadow-sm" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Nearby Places */}
              {((selectedUnit as any).nearby_places || (selectedUnit as any).near_places) && Array.isArray((selectedUnit as any).nearby_places || (selectedUnit as any).near_places) && ((selectedUnit as any).nearby_places || (selectedUnit as any).near_places).length > 0 && (
                <div className="mt-6 border-t border-gray-50 pt-4">
                  <h3 className="text-navy-dark font-bold mb-3 text-sm flex items-center gap-2">الأماكن القريبة:</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {((selectedUnit as any).nearby_places || (selectedUnit as any).near_places).map((place: any, i: number) => (
                      <div key={i} className="bg-gray-50 border border-gray-100 rounded-xl p-3 flex justify-between items-center">
                        <span className="font-bold text-navy-dark text-sm">{extractString(place.name || place.title)}</span>
                        <span className="text-gray-500 text-xs bg-white px-2 py-1 rounded-md shadow-sm border border-gray-50">{extractString(place.distance)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Location Map */}
              {((selectedUnit as any).map_embed_url || (selectedUnit as any).map_url) && (
                <div className="mt-6 border-t border-gray-50 pt-4">
                  <h3 className="text-navy-dark font-bold mb-3 text-sm flex items-center gap-2">الموقع (الخريطة):</h3>
                  <div className="w-full h-48 bg-gray-100 rounded-2xl overflow-hidden border border-gray-200">
                    <iframe src={(selectedUnit as any).map_embed_url || (selectedUnit as any).map_url} className="w-full h-full border-0" loading="lazy"></iframe>
                  </div>
                </div>
              )}

            </div>

            {/* Footer */}
            <div className="p-6 pt-0 flex justify-start">
              <button
                onClick={() => setSelectedUnit(null)}
                className="bg-navy-deeper text-white px-8 py-2.5 rounded-xl font-bold hover:bg-primary transition-colors"
              >
                إغلاق
              </button>
            </div>
            
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
