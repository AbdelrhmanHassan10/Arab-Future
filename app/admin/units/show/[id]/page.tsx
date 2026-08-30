"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { getImageUrl, extractString } from "@/lib/config";
import Link from "next/link";
import { FiArrowRight, FiEdit2, FiMapPin, FiMaximize, FiHome, FiCheckCircle } from "react-icons/fi";
import { BiBed, BiBath } from "react-icons/bi";

export default function AdminUnitShowPage() {
  const params = useParams();
  const router = useRouter();
  const unitRouteKey = params.id as string;

  const [unit, setUnit] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUnit = async () => {
      try {
        const res = await fetch(`/api/admin/units/${unitRouteKey}`);
        if (!res.ok) throw new Error("فشل جلب تفاصيل الوحدة");
        const data = await res.json();
        setUnit(data.data || data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUnit();
  }, [unitRouteKey]);

  if (loading) {
    return <div className="p-10 text-center text-gray-500 font-bold">جاري تحميل بيانات الوحدة...</div>;
  }

  if (!unit) {
    return <div className="p-10 text-center text-red-500 font-bold">لم يتم العثور على الوحدة.</div>;
  }

  const safeTitle = extractString(unit.title);
  const safeDesc = extractString(unit.description);
  const safeAddress = extractString(unit.address);
  
  let rawPrice = unit.price;
  if (typeof rawPrice === 'object' && rawPrice !== null) rawPrice = rawPrice.price || rawPrice.name || 0;
  const safePrice = extractString(rawPrice);

  const displayType = unit.type === "apartment" ? "شقة" : unit.type === "villa" ? "فيلا" : (unit.type === "shop" || unit.type === "commercial_shop") ? "محل تجاري" : unit.type;

  return (
    <div className="space-y-6 max-w-5xl mx-auto admin-dashboard">
      
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-4">
          <Link href="/admin/units" className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50 text-gray-500 hover:bg-gray-100 transition-colors">
            <FiArrowRight size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-navy-dark">تفاصيل الوحدة</h1>
            <p className="text-gray-500 text-sm mt-1">كود الوحدة: <span className="font-bold text-primary">{extractString(unit.unit_code || unit.id)}</span></p>
          </div>
        </div>
        <Link 
          href={`/admin/units/edit/${unitRouteKey}`} 
          className="flex items-center gap-2 px-6 py-2.5 bg-blue-50 text-blue-600 font-bold rounded-xl hover:bg-blue-100 transition-colors"
        >
          <FiEdit2 size={18} />
          <span>تعديل الوحدة</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Info Column */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Main Image */}
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
             <div className="w-full h-80 rounded-xl overflow-hidden bg-gray-100 relative">
               <img 
                 src={getImageUrl(unit.main_image_url || unit.main_image || unit.image)} 
                 alt={safeTitle} 
                 className="w-full h-full object-cover"
                 onError={(e) => { e.currentTarget.src = 'https://placehold.co/800x600/f3f4f6/9ca3af.png?text=No+Image' }} 
               />
               <div className="absolute top-4 right-4 px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-sm font-bold text-navy-dark shadow-sm">
                 {displayType}
               </div>
               <div className={`absolute top-4 left-4 px-4 py-1.5 backdrop-blur-md rounded-full text-sm font-bold shadow-sm ${unit.status === 'available' ? 'bg-green-500/90 text-white' : unit.status === 'reserved' ? 'bg-yellow-500/90 text-white' : 'bg-red-500/90 text-white'}`}>
                 {unit.status === "available" ? "متاحة" : unit.status === "reserved" ? "محجوزة" : "تم البيع"}
               </div>
             </div>
             
             <div className="mt-6">
               <h2 className="text-2xl font-bold text-navy-dark mb-2">{safeTitle}</h2>
               <div className="flex items-center gap-2 text-gray-500 text-sm">
                 <FiMapPin />
                 <span>{safeAddress} {unit.city?.name ? `، ${unit.city.name}` : ''}</span>
               </div>
             </div>

             <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 border-t border-gray-100 pt-6">
               <div>
                 <p className="text-xs text-gray-500 mb-1">السعر</p>
                 <p className="font-bold text-navy-dark text-lg">{Number(safePrice).toLocaleString("ar-EG")} <span className="text-xs">ج.م</span></p>
               </div>
               <div>
                 <p className="text-xs text-gray-500 mb-1">المساحة</p>
                 <div className="flex items-center gap-1 font-bold text-navy-dark">
                   <FiMaximize className="text-primary" />
                   <span>{unit.area} م²</span>
                 </div>
               </div>
               <div>
                 <p className="text-xs text-gray-500 mb-1">غرف النوم</p>
                 <div className="flex items-center gap-1 font-bold text-navy-dark">
                   <BiBed className="text-primary" size={18} />
                   <span>{unit.bedrooms} غرف</span>
                 </div>
               </div>
               <div>
                 <p className="text-xs text-gray-500 mb-1">الحمامات</p>
                 <div className="flex items-center gap-1 font-bold text-navy-dark">
                   <BiBath className="text-primary" size={18} />
                   <span>{unit.bathrooms} حمام</span>
                 </div>
               </div>
             </div>
          </div>

          {/* Description */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-navy-dark mb-4 flex items-center gap-2">
              <FiHome className="text-primary" /> الوصف
            </h3>
            <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{safeDesc || "لا يوجد وصف"}</p>
          </div>

        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          
          {/* Amenities */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-navy-dark mb-4">المرافق والخدمات</h3>
            <div className="flex flex-col gap-3">
              {unit.amenities && unit.amenities.length > 0 ? (
                unit.amenities.map((amenity: any) => (
                  <div key={amenity.id} className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg border border-gray-100">
                    <FiCheckCircle className="text-green-500 shrink-0" />
                    <span>{extractString(amenity.name)}</span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-400">لا توجد مرافق مضافة.</p>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-navy-dark mb-4">تفاصيل إضافية</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-2 border-b border-gray-50">
                <span className="text-gray-500">مفروشة</span>
                <span className="font-bold text-navy-dark">{unit.is_furnished ? 'نعم' : 'لا'}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-50">
                <span className="text-gray-500">قابلة للتمويل</span>
                <span className="font-bold text-navy-dark">{unit.is_mortgageable ? 'نعم' : 'لا'}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-50">
                <span className="text-gray-500">حصرية</span>
                <span className="font-bold text-navy-dark">{unit.is_exclusive ? 'نعم' : 'لا'}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
