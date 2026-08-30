"use client";

import React, { useState } from "react";
import Link from "next/link";
import { getImageUrl, extractString } from "@/lib/config";
import { FiEye, FiSearch, FiCheckCircle, FiMapPin, FiMaximize, FiX } from "react-icons/fi";
import { BiBed, BiBath } from "react-icons/bi";

export default function RecentActivityClient({ dashboardApi, unitsList, requestsList }: any) {
  const [selectedUnit, setSelectedUnit] = useState<any>(null);
  const [loadingModal, setLoadingModal] = useState(false);
  const [timestamp] = useState(Date.now());

  const handleOpenUnitModal = async (unit: any) => {
    setSelectedUnit(unit);
    setLoadingModal(true);
    try {
      const code = extractString(unit.code || unit.unit_code || unit.id);
      const res = await fetch(`/api/admin/units/${code}`);
      if (res.ok) {
        const data = await res.json();
        setSelectedUnit(data.data || data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingModal(false);
    }
  };

  const [selectedRequest, setSelectedRequest] = useState<any>(null);

  const units = dashboardApi.recent_units || unitsList.slice(0, 5);
  const requests = dashboardApi.recent_requests || requestsList.slice(0, 5);

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        
        {/* Recent Units */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center shrink-0">
            <h3 className="font-bold text-navy-dark text-lg">أحدث الوحدات المضافة</h3>
            <Link href="/admin/units" className="text-sm text-primary font-bold hover:underline">عرض الكل</Link>
          </div>
          <div className="p-0">
            {units.map((unit: any) => (
              <div key={unit.id} className="flex items-center justify-between p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                    <img src={unit.main_image_url || getImageUrl(unit.main_image || unit.image, 0)} alt={unit.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-navy-dark line-clamp-1">{unit.title}</h4>
                    <p className="text-xs text-gray-500">
                      {unit.address || (typeof unit.location === 'object' ? unit.location?.name : unit.location) || (typeof unit.area === 'object' ? unit.area?.name : unit.area)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-[11px] font-bold ${unit.status === "available" ? "bg-green-100 text-green-600" : unit.status === "reserved" ? "bg-orange-100 text-orange-600" : "bg-red-100 text-red-600"}`}>
                    {unit.status === "available" ? "متاحة" : unit.status === "sold" ? "مباعة" : unit.status === "reserved" ? "محجوزة" : unit.status}
                  </span>
                  <button 
                    onClick={() => handleOpenUnitModal(unit)}
                    className="p-2 text-gray-500 hover:bg-gray-200 hover:text-navy-dark rounded-lg transition-colors" 
                    title="عرض التفاصيل"
                  >
                    <FiEye size={16} />
                  </button>
                </div>
              </div>
            ))}
            {(!units || units.length === 0) && (
              <div className="p-6 text-center text-gray-500">لا توجد وحدات حتى الآن</div>
            )}
          </div>
        </div>

        {/* Recent Requests */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center shrink-0">
            <h3 className="font-bold text-navy-dark text-lg">أحدث الطلبات</h3>
            <Link href="/admin/requests" className="text-sm text-primary font-bold hover:underline">عرض الكل</Link>
          </div>
          <div className="p-0">
            {requests.map((req: any, idx: number) => (
              <div key={idx} className="flex items-center justify-between p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-navy-deeper text-white flex items-center justify-center font-bold text-sm shrink-0">
                    {req.name?.charAt(0) || '-'}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-navy-dark">{req.name}</h4>
                    <p className="text-xs text-gray-500">{req.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-xs text-gray-400">
                      {new Date(req.created_at || req.time).toLocaleDateString('ar-EG')}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${req.status === "new" || req.status === "جديد" ? "bg-orange-100 text-orange-600" :
                      req.status === "under_review" || req.status === "قيد المراجعة" ? "bg-blue-100 text-blue-600" :
                        "bg-green-100 text-green-600"
                      }`}>
                      {req.status === 'new' ? 'جديد' : req.status === 'under_review' ? 'قيد المراجعة' : req.status === 'completed' ? 'مكتمل' : req.status}
                    </span>
                  </div>
                  <button 
                    onClick={() => setSelectedRequest(req)}
                    className="p-2 text-gray-500 hover:bg-gray-200 hover:text-navy-dark rounded-lg transition-colors" 
                    title="عرض التفاصيل"
                  >
                    <FiEye size={16} />
                  </button>
                </div>
              </div>
            ))}
            {(!requests || requests.length === 0) && (
              <div className="p-6 text-center text-gray-500">لا توجد طلبات حتى الآن</div>
            )}
          </div>
        </div>

      </div>

      {/* Unit Modal */}
      {selectedUnit && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 sm:p-6 backdrop-blur-md">
          <div className="bg-white rounded-3xl w-full max-w-2xl flex flex-col shadow-2xl animate-fade-rise is-visible relative max-h-[90vh] overflow-hidden">
            <div className="w-full flex-1 overflow-y-auto pb-6" data-lenis-prevent>
            
            {/* Header Image */}
            <div className="w-full h-48 bg-gray-100 relative shrink-0">
              <img 
                src={`${getImageUrl(selectedUnit.main_image_url || selectedUnit.main_image || selectedUnit.image || (selectedUnit.images && selectedUnit.images.length > 0 ? selectedUnit.images[0] : null))}?t=${timestamp}`} 
                alt="Unit" 
                className="w-full h-full object-cover" 
                onError={(e) => { e.currentTarget.src = 'https://placehold.co/800x400/f3f4f6/9ca3af.png?text=No+Image' }} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deeper/90 to-transparent"></div>
              
              <button 
                onClick={() => setSelectedUnit(null)}
                className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/40 text-white rounded-full backdrop-blur-md transition-colors"
              >
                <FiX size={20} />
              </button>

              <div className="absolute bottom-4 right-6 left-6 flex justify-between items-end">
                <div>
                  <h2 className="font-bold text-white text-2xl drop-shadow-md flex items-center gap-2">
                    {extractString(selectedUnit.title) || "وحدة بدون عنوان"}
                    {loadingModal && <span className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin"></span>}
                  </h2>
                  <p className="text-gray-300 text-sm mt-1">كود الوحدة: <span className="text-primary font-bold">{extractString(selectedUnit.code || selectedUnit.unit_code || selectedUnit.id)}</span></p>
                </div>
                <span className={`px-4 py-1.5 rounded-full text-xs font-bold shadow-lg backdrop-blur-md border ${
                  selectedUnit.status === "available" ? "bg-green-500/20 text-green-300 border-green-500/30" : 
                  selectedUnit.status === "reserved" ? "bg-orange-500/20 text-orange-300 border-orange-500/30" : 
                  "bg-red-500/20 text-red-300 border-red-500/30"
                }`}>
                  {selectedUnit.status === "available" ? "متاحة" : selectedUnit.status === "sold" ? "مباعة" : selectedUnit.status === "reserved" ? "محجوزة" : selectedUnit.status}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 flex flex-col justify-center text-right space-y-1">
                  <span className="text-gray-400 text-xs">السعر</span>
                  <span className="font-bold text-primary text-lg">
                    {Number(extractString(selectedUnit.price?.price || selectedUnit.price?.name || selectedUnit.price || 0)).toLocaleString("ar-EG")} <span className="text-sm text-navy-dark">ج.م</span>
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
                    {extractString(selectedUnit.space_sqm || selectedUnit.space || selectedUnit.area)} م²
                  </span>
                </div>
                
                <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 flex flex-col justify-center text-right space-y-1">
                  <span className="text-gray-400 text-xs flex items-center justify-end gap-1">غرف النوم <BiBed size={14}/></span>
                  <span className="font-bold text-navy-dark text-base">{extractString(selectedUnit.bedrooms) || 0}</span>
                </div>
                <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 flex flex-col justify-center text-right space-y-1">
                  <span className="text-gray-400 text-xs flex items-center justify-end gap-1">الحمامات <BiBath size={14}/></span>
                  <span className="font-bold text-navy-dark text-base">{extractString(selectedUnit.bathrooms) || 0}</span>
                </div>
                <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 flex flex-col justify-center text-right space-y-1 col-span-2 md:col-span-3">
                  <span className="text-gray-400 text-xs flex items-center justify-end gap-1">العنوان <FiMapPin/></span>
                  <span className="font-bold text-navy-dark text-sm leading-snug break-words">{extractString(selectedUnit.address || selectedUnit.location) || "غير محدد"}</span>
                </div>
              </div>

              {/* Badges / Bools */}
              <div className="flex flex-wrap gap-2 mt-4 justify-start">
                {selectedUnit.is_furnished ? <span className="bg-blue-50 border border-blue-100 text-blue-600 text-xs px-3 py-1.5 rounded-full font-bold">مفروشة</span> : null}
                {selectedUnit.is_mortgageable ? <span className="bg-green-50 border border-green-100 text-green-600 text-xs px-3 py-1.5 rounded-full font-bold">قابلة للتمويل</span> : null}
                {selectedUnit.is_exclusive ? <span className="bg-yellow-50 border border-yellow-100 text-yellow-700 text-xs px-3 py-1.5 rounded-full font-bold">حصرية</span> : null}
                {selectedUnit.finishing ? <span className="bg-purple-50 border border-purple-100 text-purple-600 text-xs px-3 py-1.5 rounded-full font-bold">تشطيب: {extractString(selectedUnit.finishing)}</span> : null}
              </div>

              {/* Amenities */}
              {selectedUnit.amenities && selectedUnit.amenities.length > 0 && (
                <div className="mt-6 border-t border-gray-50 pt-4">
                  <h3 className="text-navy-dark font-bold mb-3 text-sm flex items-center gap-2">
                    المرافق والخدمات:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedUnit.amenities.map((amenity: any) => (
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
              {selectedUnit.images && Array.isArray(selectedUnit.images) && selectedUnit.images.length > 0 && (
                <div className="mt-6 border-t border-gray-50 pt-4">
                  <h3 className="text-navy-dark font-bold mb-3 text-sm flex items-center gap-2">معرض الصور الإضافية:</h3>
                  <div className="grid grid-cols-4 gap-2">
                    {selectedUnit.images.map((img: string, i: number) => {
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
              {selectedUnit.floor_plans && Array.isArray(selectedUnit.floor_plans) && selectedUnit.floor_plans.length > 0 && (
                <div className="mt-6 border-t border-gray-50 pt-4">
                  <h3 className="text-navy-dark font-bold mb-3 text-sm flex items-center gap-2">المخططات الهندسية:</h3>
                  <div className="flex flex-col gap-3">
                    {selectedUnit.floor_plans.map((plan: any, i: number) => (
                      <div key={i} className="bg-gray-50 rounded-2xl p-4 border border-gray-100 flex flex-col items-center">
                        {plan.title && <span className="font-bold text-navy-dark text-sm mb-2">{extractString(plan.title || plan.name)}</span>}
                        <img src={getImageUrl(plan.image || plan.image_url)} alt="مخطط هندسي" className="w-full max-w-sm rounded-xl shadow-sm" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Nearby Places */}
              {(selectedUnit.nearby_places || selectedUnit.near_places) && Array.isArray(selectedUnit.nearby_places || selectedUnit.near_places) && (selectedUnit.nearby_places || selectedUnit.near_places).length > 0 && (
                <div className="mt-6 border-t border-gray-50 pt-4">
                  <h3 className="text-navy-dark font-bold mb-3 text-sm flex items-center gap-2">الأماكن القريبة:</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {(selectedUnit.nearby_places || selectedUnit.near_places).map((place: any, i: number) => (
                      <div key={i} className="bg-gray-50 border border-gray-100 rounded-xl p-3 flex justify-between items-center">
                        <span className="font-bold text-navy-dark text-sm">{extractString(place.name || place.title)}</span>
                        <span className="text-gray-500 text-xs bg-white px-2 py-1 rounded-md shadow-sm border border-gray-50">{extractString(place.distance)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Location Map */}
              {(selectedUnit.map_embed_url || selectedUnit.map_url) && (
                <div className="mt-6 border-t border-gray-50 pt-4">
                  <h3 className="text-navy-dark font-bold mb-3 text-sm flex items-center gap-2">الموقع (الخريطة):</h3>
                  <div className="w-full h-48 bg-gray-100 rounded-2xl overflow-hidden border border-gray-200">
                    <iframe src={selectedUnit.map_embed_url || selectedUnit.map_url} className="w-full h-full border-0" loading="lazy"></iframe>
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

      {/* Request Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 sm:p-6 backdrop-blur-md transition-opacity" data-lenis-prevent>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-6 pb-2 shrink-0">
              <h3 className="text-xl font-bold text-navy-dark flex items-center gap-2">
                تفاصيل الطلب 
                <span className="text-primary font-bold">#{selectedRequest.code || selectedRequest.lead_code || selectedRequest.id}</span>
              </h3>
              <button 
                onClick={() => setSelectedRequest(null)}
                className="p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 rounded-full transition-colors"
              >
                <FiX size={20} />
              </button>
            </div>
            
            <div className="p-6 pt-4 space-y-6 overflow-y-auto flex-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 flex flex-col justify-center text-right space-y-1">
                  <span className="text-gray-400 text-xs">اسم العميل</span>
                  <div className="font-bold text-navy-dark text-base">{selectedRequest.name}</div>
                </div>
                <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 flex flex-col justify-center text-right space-y-1">
                  <span className="text-gray-400 text-xs">رقم الهاتف</span>
                  <div className="font-bold text-navy-dark text-base" dir="ltr">{selectedRequest.phone}</div>
                </div>
                <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 flex flex-col justify-center text-right space-y-1 col-span-2">
                  <span className="text-gray-400 text-xs">تاريخ الطلب</span>
                  <div className="font-bold text-navy-dark text-base">{selectedRequest.created_at ? new Date(selectedRequest.created_at).toLocaleDateString('ar-EG') : (selectedRequest.date || '-')}</div>
                </div>
              </div>
              
              <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5 text-right mt-6">
                <h3 className="text-primary-dark font-bold mb-2 text-sm flex items-center gap-2">
                  <FiSearch className="inline-block" /> نص الرسالة / التفاصيل:
                </h3>
                <p className="text-navy-light font-medium leading-relaxed whitespace-pre-wrap text-sm">
                  {selectedRequest.message || "لا توجد تفاصيل إضافية مرفقة مع هذا الطلب."}
                </p>
              </div>
            </div>
            
            <div className="p-6 pt-0 flex justify-start shrink-0">
              <button 
                onClick={() => setSelectedRequest(null)}
                className="bg-navy-deeper text-white px-8 py-2.5 rounded-xl font-bold hover:bg-primary transition-colors"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
