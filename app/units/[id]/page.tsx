import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FiMapPin, FiMaximize, FiHome, FiCheckCircle, FiLayers, FiStar, FiCheck } from "react-icons/fi";
import { BiBed, BiBath } from "react-icons/bi";
import { FaWhatsapp } from "react-icons/fa";
import VideoPlayer from "@/components/VideoPlayer";
import GalleryLightbox from "@/components/GalleryLightbox";
import ImageLightbox from "@/components/ImageLightbox";
import { fetchApi } from "@/lib/api";
import { getImageUrl } from "@/lib/config";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const formatPrice = (price: number) => price?.toLocaleString("ar-EG") + " ج.م";

const getTypeLabel = (type: string) => {
  switch (type) {
    case "apartment": return "شقة";
    case "villa": return "فيلا";
    case "commercial_shop":
    case "shop": return "محل تجاري";
    case "office": return "مكتب";
    case "land": return "أرض";
    default: return type;
  }
};

const getFinishingLabel = (level: string) => {
  switch (level) {
    case "none": return "بدون تشطيب";
    case "half": return "نصف تشطيب";
    case "full": return "تشطيب كامل";
    case "luxury": return "ألترا سوبر لوكس";
    default: return level;
  }
};

export default async function UnitDetailsPage({ params }: { params: { id: string } }) {
  let unit: any = null;
  try {
    let data;
    try {
      data = await fetchApi(`/admin/units/${params.id}`, { cache: 'no-store' });
    } catch (e) {
      data = await fetchApi(`/units/${params.id}`, { cache: 'no-store' });
    }
    unit = data.data || data;
    console.log("UNIT RENDER DATA:", JSON.stringify({
      id: unit.id,
      images: unit.images,
      floor_plans: unit.floor_plans,
      nearby_places: unit.nearby_places,
      video_url: unit.video_url
    }, null, 2));
  } catch (error) {
    console.error(`Failed to fetch unit details for ID ${params.id}:`, error);
  }

  // Fallback: If direct fetch fails (e.g. because params.id is a unit_code like BS-1024 but API expects ID)
  if (!unit) {
    try {
      const listData = await fetchApi("/units", { cache: 'no-store' });
      const unitsList = listData.data || listData || [];
      const found = unitsList.find((u: any) => 
        String(u.id) === String(params.id) || 
        String(u.code) === String(params.id) || 
        String(u.unit_code) === String(params.id) ||
        String(u.slug) === String(params.id)
      );
      
      if (found) {
        try {
          // The public API (/api/units/...) is currently stripping images, floor_plans, and nearby_places!
          // We will try to fetch from the admin API first so that if you are logged in, you can see them.
          let detailData;
          const routeKey = found.code || found.unit_code || found.id;
          try {
            detailData = await fetchApi(`/admin/units/${routeKey}`, { cache: 'no-store' });
          } catch (adminErr) {
            detailData = await fetchApi(`/units/${routeKey}`, { cache: 'no-store' });
          }
          unit = detailData.data || detailData;
        } catch (detailError) {
          console.error(`Failed to fetch full details for ID ${found.id}`, detailError);
          unit = found; // Fallback to the partial list item
        }
      }
    } catch (e) {
      console.error("Fallback fetch failed", e);
    }
  }

  // No local fallback — API is the single source of truth

  if (unit) {
    const sanitized = { ...unit };
    for (const key of Object.keys(sanitized)) {
      const val = sanitized[key];
      if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
        sanitized[key] = val.name || val.title || val.ar || val.en || val.price || val.id || '';
      }
    }
    
    // Map backend fields to frontend variables without injecting dummy text
    sanitized.description = sanitized.description || "لا توجد تفاصيل إضافية لهذه الوحدة حالياً.";
    sanitized.finishing = sanitized.finishing || "none";
    sanitized.payment = sanitized.payment_system || sanitized.payment || "cash";
    sanitized.area = sanitized.space_sqm || sanitized.area || 0;
    sanitized.bedrooms = sanitized.bedrooms || sanitized.rooms || 0;
    sanitized.bathrooms = sanitized.bathrooms || 0;
    
    let amenities = Array.isArray(sanitized.features) ? sanitized.features : (Array.isArray(sanitized.amenities) ? sanitized.amenities : []);
    if (typeof sanitized.features === 'string' && sanitized.features.trim()) {
      try { amenities = JSON.parse(sanitized.features); } catch { amenities = sanitized.features.split(/[،,]/).map((s: string) => s.trim()); }
    }
    sanitized.amenities = amenities;
    
    unit = sanitized;
  }

  if (!unit) {
    notFound();
  }

  return (
    <>
      <Navbar />

      <main className="pt-24 pb-16 bg-[#090909] min-h-screen">
        <div className="container-wide px-6">

          {/* Header & Badges */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8 pt-8">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="bg-white/10 text-white border border-white/10 px-3 py-1 rounded-full text-xs font-bold font-body">{unit.unit_code || unit.id}</span>
                <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-bold font-body">{getTypeLabel(unit.type)}</span>
                {unit.status === "available" && <span className="bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-xs font-bold font-body">متاحة</span>}
                {unit.status === "sold" && <span className="bg-red-500/10 text-red-400 px-3 py-1 rounded-full text-xs font-bold font-body">تم البيع</span>}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{unit.title}</h1>
              <div className="flex items-center text-white/60 text-sm gap-2">
                <FiMapPin className="text-primary" />
                <span>{unit.address || unit.location}</span>
              </div>
            </div>
            <div className="bg-[#111111] p-4 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/5 flex flex-col items-center min-w-[200px]">
              <span className="text-xs font-bold text-white/50 uppercase mb-1">السعر الإجمالي</span>
              <span className="text-2xl font-bold text-primary">{formatPrice(unit.price)}</span>
            </div>
          </div>

          {/* Image Gallery */}
          <div className="flex flex-col md:flex-row gap-4 mb-12 items-stretch">
            <div className={`w-full ${(unit.images || []).length > 1 ? 'md:w-3/4' : ''} rounded-2xl overflow-hidden group relative`}>
              <img src={getImageUrl(unit.main_image_url || unit.main_image || (unit as any).image || (unit.images && unit.images.length > 0 ? unit.images[0] : null), unit.id ? String(unit.id).charCodeAt(0) : 0)} alt={unit.title} className="w-full h-auto max-h-[85vh] object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            
            {(unit.images || []).length > 1 && (
              <div className="hidden md:flex flex-col gap-4 w-full md:w-1/4">
                {(unit.images || []).slice(1, 3).map((img: string, i: number) => (
                  <div key={i} className="flex-1 rounded-2xl overflow-hidden group relative">
                    <img src={getImageUrl(img)} alt={`${unit.title} ${i + 2}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Navigation Tabs */}
          <div className="py-4 mb-8 border-b border-white/5 overflow-x-auto hide-scrollbar">
            <div className="flex items-center gap-6 text-sm font-bold min-w-max px-2">
              <a href="#overview" className="text-primary border-b-2 border-primary pb-1">نظرة عامة</a>
              <a href="#specifications" className="text-white/60 hover:text-white transition-colors pb-1">المواصفات</a>
              <a href="#amenities" className="text-white/60 hover:text-white transition-colors pb-1">المرافق والخدمات</a>
              <a href="#location" className="text-white/60 hover:text-white transition-colors pb-1">الموقع</a>
              {unit.floor_plans && unit.floor_plans.length > 0 && (
                <a href="#floorplans" className="text-white/60 hover:text-white transition-colors pb-1">المخططات</a>
              )}
              {(unit.images && unit.images.length > 0) && (
                <a href="#gallery" className="text-white/60 hover:text-white transition-colors pb-1">معرض الصور</a>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Main Details */}
            <div className="lg:col-span-2 space-y-12">

              {/* Overview */}
              <div id="overview" className="scroll-mt-32 mb-12">
                <div className="flex justify-end w-full mb-6">
                  <h3 className="text-3xl font-bold text-white">نظرة عامة</h3>
                </div>
                <div className="bg-[#111111] rounded-2xl p-4 md:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/5">
                  <div className="flex flex-col-reverse md:flex-row gap-8 items-stretch">
                    
                    {/* Text Details (Right side in RTL because it's first in flex-row) */}
                    <div className="w-full md:w-1/2 flex flex-col justify-center py-4">
                      <p className="text-white/90 text-lg leading-loose mb-8 font-medium">
                        {String(unit.description || '').substring(0, 300)}{unit.description?.length > 300 ? '...' : ''}
                      </p>
                      <div className="space-y-4">
                        {(unit.amenities || unit.features || []).slice(0, 3).map((feat: any, i: number) => (
                          <div key={i} className="flex items-center gap-3 text-white/80">
                            <div className="w-6 h-6 rounded-full border border-primary flex items-center justify-center text-primary shrink-0 bg-primary/10">
                              <FiCheck size={14} strokeWidth={3} />
                            </div>
                            <span className="text-base font-bold">{typeof feat === 'string' ? feat : feat?.name || ''}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Video / Image (Left side in RTL because it's second in flex-row) */}
                    <div className="w-full md:w-1/2 relative rounded-xl overflow-hidden bg-black/50 shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-white/5 flex items-center justify-center min-h-[250px]">
                      {unit.video_url ? (
                        unit.video_url.includes('youtube.com') || unit.video_url.includes('youtu.be') ? (() => {
                          let embedUrl = unit.video_url;
                          try {
                            const urlObj = new URL(unit.video_url);
                            if (urlObj.hostname.includes('youtube.com') && urlObj.pathname === '/watch') {
                              const videoId = urlObj.searchParams.get('v');
                              if (videoId) embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`;
                            } else if (urlObj.hostname.includes('youtu.be')) {
                              const videoId = urlObj.pathname.substring(1);
                              if (videoId) embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`;
                            }
                          } catch (e) {}
                          return <iframe src={embedUrl} className="w-full h-full aspect-video absolute inset-0" allowFullScreen></iframe>;
                        })() : (
                          <VideoPlayer src={unit.video_url} />
                        )
                      ) : (
                        <img src={getImageUrl(unit.main_image_url || unit.main_image || (unit as any).image, unit.id ? String(unit.id).charCodeAt(0) : 0)} alt={unit.title} className="w-full h-full object-cover absolute inset-0 opacity-80 hover:opacity-100 transition-opacity" />
                      )}
                    </div>

                  </div>
                </div>
              </div>

              {/* Specifications */}
              <div id="specifications" className="scroll-mt-32">
                <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                  <span className="w-8 h-[2px] bg-primary rounded-full"></span>
                  المواصفات الأساسية
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {/* Spec Items */}
                  <div className="flex items-center gap-5 bg-gradient-to-r from-transparent via-white/[0.02] to-white/[0.05] p-5 rounded-2xl border border-white/5 hover:border-primary/40 transition-all duration-300 group hover:shadow-[0_10px_40px_rgba(197,160,89,0.1)] relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    <div className="w-14 h-14 rounded-full bg-[#111111] border border-white/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-black transition-all duration-500 shadow-inner z-10 shrink-0">
                      <FiHome size={22} />
                    </div>
                    <div className="flex flex-col z-10">
                      <span className="text-white/50 text-sm mb-1 font-medium">نوع العقار</span>
                      <span className="text-white font-bold text-lg">{getTypeLabel(unit.type)}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-5 bg-gradient-to-r from-transparent via-white/[0.02] to-white/[0.05] p-5 rounded-2xl border border-white/5 hover:border-primary/40 transition-all duration-300 group hover:shadow-[0_10px_40px_rgba(197,160,89,0.1)] relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    <div className="w-14 h-14 rounded-full bg-[#111111] border border-white/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-black transition-all duration-500 shadow-inner z-10 shrink-0">
                      <FiMaximize size={22} />
                    </div>
                    <div className="flex flex-col z-10">
                      <span className="text-white/50 text-sm mb-1 font-medium">المساحة</span>
                      <span className="text-white font-bold text-lg">{unit.space_sqm || unit.area} م²</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-5 bg-gradient-to-r from-transparent via-white/[0.02] to-white/[0.05] p-5 rounded-2xl border border-white/5 hover:border-primary/40 transition-all duration-300 group hover:shadow-[0_10px_40px_rgba(197,160,89,0.1)] relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    <div className="w-14 h-14 rounded-full bg-[#111111] border border-white/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-black transition-all duration-500 shadow-inner z-10 shrink-0">
                      <BiBed size={22} />
                    </div>
                    <div className="flex flex-col z-10">
                      <span className="text-white/50 text-sm mb-1 font-medium">غرف النوم</span>
                      <span className="text-white font-bold text-lg">{unit.bedrooms || unit.rooms}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-5 bg-gradient-to-r from-transparent via-white/[0.02] to-white/[0.05] p-5 rounded-2xl border border-white/5 hover:border-primary/40 transition-all duration-300 group hover:shadow-[0_10px_40px_rgba(197,160,89,0.1)] relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    <div className="w-14 h-14 rounded-full bg-[#111111] border border-white/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-black transition-all duration-500 shadow-inner z-10 shrink-0">
                      <BiBath size={22} />
                    </div>
                    <div className="flex flex-col z-10">
                      <span className="text-white/50 text-sm mb-1 font-medium">الحمامات</span>
                      <span className="text-white font-bold text-lg">{unit.bathrooms}</span>
                    </div>
                  </div>

                  {unit.floor !== undefined && (
                    <div className="flex items-center gap-5 bg-gradient-to-r from-transparent via-white/[0.02] to-white/[0.05] p-5 rounded-2xl border border-white/5 hover:border-primary/40 transition-all duration-300 group hover:shadow-[0_10px_40px_rgba(197,160,89,0.1)] relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                      <div className="w-14 h-14 rounded-full bg-[#111111] border border-white/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-black transition-all duration-500 shadow-inner z-10 shrink-0">
                        <FiLayers size={22} />
                      </div>
                      <div className="flex flex-col z-10">
                        <span className="text-white/50 text-sm mb-1 font-medium">الدور</span>
                        <span className="text-white font-bold text-lg">{unit.floor === 0 ? "أرضي" : unit.floor}</span>
                      </div>
                    </div>
                  )}
        
                  {unit.installment_years && (
                    <div className="flex items-center gap-5 bg-gradient-to-r from-transparent via-white/[0.02] to-white/[0.05] p-5 rounded-2xl border border-white/5 hover:border-primary/40 transition-all duration-300 group hover:shadow-[0_10px_40px_rgba(197,160,89,0.1)] relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                      <div className="w-14 h-14 rounded-full bg-[#111111] border border-white/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-black transition-all duration-500 shadow-inner z-10 shrink-0">
                        <FiLayers size={22} />
                      </div>
                      <div className="flex flex-col z-10">
                        <span className="text-white/50 text-sm mb-1 font-medium">سنوات التقسيط</span>
                        <span className="text-white font-bold text-lg">{unit.installment_years} سنوات</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Full Description inside Specs for now, or separately */}
                <div className="mt-8 bg-[#111111] rounded-2xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/5">
                  <h3 className="text-xl font-bold text-white mb-4">تفاصيل إضافية</h3>
                  <p className="text-white/70 leading-relaxed whitespace-pre-line">{unit.description}</p>
                </div>
              </div>

              {/* Amenities */}
              {unit.amenities && unit.amenities.length > 0 && (
                <div id="amenities" className="bg-[#111111] rounded-2xl p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/5 scroll-mt-32 mb-12">
                  <div className="flex justify-end w-full mb-8">
                    <div className="bg-primary/20 border border-primary/30 px-6 py-2 rounded-lg">
                      <h3 className="text-xl font-bold text-primary">المرافق والخدمات</h3>
                    </div>
                  </div>

                  {/* Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {unit.amenities.slice(0, 3).map((amenity: any, idx: number) => (
                      <div key={idx} className="relative h-48 rounded-2xl overflow-hidden group">
                        <img src={getImageUrl(amenity?.image || (unit.images && unit.images.length > idx ? unit.images[idx] : unit.main_image))} alt={typeof amenity === 'string' ? amenity : amenity?.name || ''} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                        <div className="absolute bottom-4 right-4">
                           <span className="bg-black/60 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-sm font-bold border border-white/10">{typeof amenity === 'string' ? amenity : amenity?.name || ''}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Checklist */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-8">
                    {unit.amenities.map((amenity: any, idx: number) => (
                      <div key={idx} className="flex items-center gap-3 text-white/90">
                        <div className="w-5 h-5 rounded-full border border-primary flex items-center justify-center text-primary shrink-0 bg-primary/10">
                          <FiCheck size={12} strokeWidth={3} />
                        </div>
                        <span className="font-bold text-sm">{typeof amenity === 'string' ? amenity : amenity?.name || ''}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Location */}
              <div id="location" className="bg-[#111111] rounded-2xl p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/5 scroll-mt-32 mb-12">
                <div className="flex justify-end w-full mb-8">
                  <h3 className="text-2xl font-bold text-white">الموقع</h3>
                </div>
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  
                  {/* Left Side: Places List */}
                  <div className="w-full md:w-1/2 flex flex-col justify-center gap-8">
                    {unit.nearby_places && unit.nearby_places.length > 0 ? (
                      unit.nearby_places.map((place: any, i: number) => (
                        <div key={i} className="flex items-center gap-4 text-right">
                          <div className="w-12 h-12 rounded-full bg-[#1c1c1c] border border-white/5 flex items-center justify-center text-primary shrink-0 shadow-[0_0_15px_rgba(197,160,89,0.1)]">
                            <FiMapPin size={20} />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xl font-bold text-white">{place.distance_text || place.distance || place.title}</span>
                            <span className="text-sm text-white/50">{place.title}</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="flex items-center gap-4 text-right">
                        <div className="w-12 h-12 rounded-full bg-[#1c1c1c] border border-white/5 flex items-center justify-center text-primary shrink-0 shadow-[0_0_15px_rgba(197,160,89,0.1)]">
                          <FiMapPin size={20} />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xl font-bold text-white">الموقع الإستراتيجي</span>
                          <span className="text-sm text-white/50">{unit.address || unit.location || 'بني سويف'}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right Side: Map */}
                  <div className="w-full md:w-1/2 h-64 md:h-auto min-h-[300px] bg-[#1c1c1c] rounded-2xl overflow-hidden shadow-inner border border-white/10 relative">
                    <iframe
                      title="خريطة الموقع"
                      src={`https://maps.google.com/maps?q=${encodeURIComponent((unit.address || unit.location || "") + " بني سويف")}&t=m&z=14&output=embed`}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="w-full h-full grayscale-[0.2] contrast-125 opacity-90 transition-all duration-700 pointer-events-auto absolute inset-0"
                    ></iframe>
                  </div>
                </div>
              </div>

              {/* Floor Plans */}
              {unit.floor_plans && unit.floor_plans.length > 0 && (
                <div id="floorplans" className="scroll-mt-32 mb-12">
                  <div className="flex justify-end w-full mb-8">
                    <h3 className="text-2xl font-bold text-white">المخططات</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {unit.floor_plans.map((plan: any, idx: number) => (
                      <div key={idx} className="bg-[#111111] border border-white/5 rounded-2xl p-4 shadow-[0_10px_30px_rgba(0,0,0,0.2)]">
                        <div className="w-full h-64 bg-[#1c1c1c] rounded-xl mb-6 relative overflow-hidden">
                          <img src={getImageUrl(plan.image || plan)} alt={plan.title || `مخطط ${idx + 1}`} className="w-full h-full object-cover grayscale-[0.5] hover:grayscale-0 transition-all duration-500" />
                        </div>
                        <div className="text-right px-2 pb-2">
                          <h4 className="text-xl font-bold text-white mb-2">{plan.title || `مخطط الطابق ${idx + 1}`}</h4>
                          <p className="text-sm text-white/50 leading-relaxed">{plan.description || "توضيح دقيق لأبعاد الغرف والاستقبال والمرافق الداخلية بأسلوب عصري ومريح."}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Gallery */}
              <div id="gallery" className="bg-[#111111] rounded-2xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/5 scroll-mt-32">
                <h3 className="text-xl font-bold text-white mb-6">معرض الصور</h3>
                <GalleryLightbox images={(unit.images || []).map((img: string) => getImageUrl(img))} />
              </div>

            </div>

            {/* Sidebar (Payment & Contact) */}
            <div className="lg:col-span-1">
              <div className="sticky top-6 flex flex-col gap-6 h-[calc(100vh-40px)]">

                {/* Financial Details */}
                <div className="bg-[#111111] rounded-2xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/5 shrink-0">
                  <h3 className="text-lg font-bold text-white mb-4 border-b border-white/5 pb-4">التفاصيل المالية</h3>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-white/50 text-sm">نظام السداد</span>
                      <span className="font-bold text-white">{unit.payment === "cash" ? "كاش" : unit.payment === "installment" ? "تقسيط" : "كاش أو تقسيط"}</span>
                    </div>

                    {unit.downPayment && (
                      <div className="flex justify-between items-center">
                        <span className="text-white/50 text-sm">المقدم</span>
                        <span className="font-bold text-white">{formatPrice(unit.downPayment)}</span>
                      </div>
                    )}

                    {unit.installmentYears && (
                      <div className="flex justify-between items-center">
                        <span className="text-white/50 text-sm">فترة التقسيط</span>
                        <span className="font-bold text-white">{unit.installmentYears} سنوات</span>
                      </div>
                    )}

                    <div className="flex justify-between items-center pt-4 border-t border-white/5">
                      <span className="text-white/50 text-sm">التشطيب</span>
                      <span className="font-bold text-white">{getFinishingLabel(unit.finishing)}</span>
                    </div>
                  </div>
                </div>

                {/* Contact Card */}
                <div className="bg-[#1c1c1c] rounded-2xl p-6 shadow-glow relative overflow-hidden border border-primary/20 flex-1 flex flex-col justify-center items-center text-center">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-[40px] pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/10 rounded-full blur-[40px] pointer-events-none" />

                  <h3 className="text-2xl font-bold text-white mb-4 relative z-10">مهتم بهذه الوحدة؟</h3>
                  <p className="text-white/60 text-sm mb-8 relative z-10 leading-relaxed max-w-[250px]">
                    تواصل معنا الآن لتحديد موعد معاينة أو لمعرفة المزيد من التفاصيل حول هذه الوحدة.
                  </p>

                  <div className="space-y-4 relative z-10 w-full max-w-[280px]">
                    <a
                      href={`https://wa.me/201008450553?text=مرحباً، أستفسر عن الوحدة ${unit.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-[#25D366] text-white font-bold py-4 px-4 rounded-xl flex items-center justify-center gap-3 hover:bg-[#128C7E] transition-all hover:scale-105 shadow-lg"
                    >
                      <FaWhatsapp size={22} />
                      <span>تواصل عبر واتساب</span>
                    </a>
                    <a
                      href="tel:+201008450553"
                      className="w-full bg-white/5 text-white font-bold py-4 px-4 rounded-xl flex items-center justify-center gap-3 hover:bg-white/10 transition-all hover:scale-105 border border-white/10 shadow-lg"
                    >
                      <span>اتصل بنا هاتفياً</span>
                    </a>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
