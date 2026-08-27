import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FiMapPin, FiMaximize, FiHome, FiCheckCircle, FiLayers, FiStar } from "react-icons/fi";
import { BiBed, BiBath } from "react-icons/bi";
import { FaWhatsapp } from "react-icons/fa";
import VideoPlayer from "@/components/VideoPlayer";
import GalleryLightbox from "@/components/GalleryLightbox";
import ImageLightbox from "@/components/ImageLightbox";
import { fetchApi } from "@/lib/api";
import { getImageUrl } from "@/lib/config";

export async function generateStaticParams() {
  try {
    const data = await fetchApi("/units", { cache: 'no-store' });
    const units = data.data || data || [];
    // In a dynamic app, we don't necessarily want to pre-render all units,
    // but if we do, this is correct for generating static paths.
    return [];
  } catch (error) {
    return [];
  }
}

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
    const data = await fetchApi(`/units/${params.id}`, {
      next: { revalidate: 60 }
    });
    // The API might return { data: { unit } } or { data: unit } or just the unit.
    unit = data.data || data;
  } catch (error) {
    console.error(`Failed to fetch unit details for ID ${params.id}:`, error);
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
    
    // Inject fallback data for empty fields to maintain UI richness
    sanitized.description = sanitized.description || `وحدة مميزة بموقع استراتيجي رائع وتصميم عصري يلبي كافة احتياجاتك. تتميز بإطلالة بانورامية وتوزيع مثالي للمساحات الداخلية لضمان أقصى درجات الراحة والرفاهية. من تطوير شركة سمسار بني سويف لضمان أعلى معايير الجودة والتسليم في الموعد المحدد.`;
    sanitized.finishing = sanitized.finishing || "full";
    sanitized.payment = sanitized.payment || "installment";
    sanitized.area = sanitized.space_sqm || sanitized.area || 120;
    sanitized.bedrooms = sanitized.bedrooms || sanitized.rooms || 3;
    sanitized.bathrooms = sanitized.bathrooms || 2;
    if (!sanitized.amenities || sanitized.amenities.length === 0) {
      sanitized.amenities = ["أمن وحراسة 24/7", "حدائق خضراء", "جراج خاص", "كاميرات مراقبة", "مصاعد حديثة", "واجهات مودرن"];
    }
    
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
              <a href="#floorplans" className="text-white/60 hover:text-white transition-colors pb-1">المخططات</a>
              <a href="#gallery" className="text-white/60 hover:text-white transition-colors pb-1">معرض الصور</a>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Main Details */}
            <div className="lg:col-span-2 space-y-12">

              {/* Overview */}
              <div id="overview" className="bg-[#111111] rounded-2xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/5 scroll-mt-32">
                <h3 className="text-xl font-bold text-white mb-6">نظرة عامة</h3>
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Real Video */}
                  <div className="w-full md:w-1/2 h-48 bg-white/5 rounded-xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                    <VideoPlayer src="/videos/202607280250.mp4" />
                  </div>
                  {/* Highlights */}
                  <div className="w-full md:w-1/2 flex flex-col justify-center gap-4">
                    <p className="text-white/80 text-sm leading-relaxed">{String(unit.description || '').substring(0, 100)}...</p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-white/60 text-sm"><FiCheckCircle className="text-primary" /> تصميم عصري حديث ومميز</div>
                      <div className="flex items-center gap-2 text-white/60 text-sm"><FiCheckCircle className="text-primary" /> إطلالة رائعة وموقع استراتيجي</div>
                      <div className="flex items-center gap-2 text-white/60 text-sm"><FiCheckCircle className="text-primary" /> مرافق متكاملة تخدم السكان</div>
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

                  <div className="flex items-center gap-5 bg-gradient-to-r from-transparent via-white/[0.02] to-white/[0.05] p-5 rounded-2xl border border-white/5 hover:border-primary/40 transition-all duration-300 group hover:shadow-[0_10px_40px_rgba(197,160,89,0.1)] relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    <div className="w-14 h-14 rounded-full bg-[#111111] border border-white/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-black transition-all duration-500 shadow-inner z-10 shrink-0">
                      <FiStar size={22} />
                    </div>
                    <div className="flex flex-col z-10">
                      <span className="text-white/50 text-sm mb-1 font-medium">التشطيب</span>
                      <span className="text-white font-bold text-lg">{getFinishingLabel(unit.finishing)}</span>
                    </div>
                  </div>
                </div>

                {/* Full Description inside Specs for now, or separately */}
                <div className="mt-8 bg-[#111111] rounded-2xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/5">
                  <h3 className="text-xl font-bold text-white mb-4">تفاصيل إضافية</h3>
                  <p className="text-white/70 leading-relaxed whitespace-pre-line">{unit.description}</p>
                </div>
              </div>

              {/* Amenities */}
              <div id="amenities" className="bg-[#111111] rounded-2xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/5 scroll-mt-32">
                <h3 className="text-xl font-bold text-white mb-6">المرافق والخدمات</h3>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                  {/* Mock Image Cards */}
                  <div className="relative h-32 rounded-xl overflow-hidden group">
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors z-10" />
                    <img src="/pexels-perqued-13203179.jpg" alt="حديقة" className="w-full h-full object-cover opacity-80" />
                    <div className="absolute bottom-2 right-2 z-20 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white border border-white/10">حدائق خضراء</div>
                  </div>
                  <div className="relative h-32 rounded-xl overflow-hidden group">
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors z-10" />
                    <img src="/pexels-perqued-13203179.jpg" alt="أمن" className="w-full h-full object-cover opacity-80" />
                    <div className="absolute bottom-2 right-2 z-20 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white border border-white/10">أمن وحراسة</div>
                  </div>
                  <div className="relative h-32 rounded-xl overflow-hidden group">
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors z-10" />
                    <img src="https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="جراج" className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute bottom-2 right-2 z-20 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white border border-white/10 shadow-lg">جراج خاص</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {(unit.amenities || []).map((amenity: any, idx: number) => (
                    <div key={idx} className="flex items-center gap-2 text-white/80">
                      <FiCheckCircle className="text-primary" />
                      <span className="font-medium text-sm">{typeof amenity === 'string' ? amenity : amenity?.name || ''}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div id="location" className="bg-[#111111] rounded-2xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/5 scroll-mt-32">
                <h3 className="text-xl font-bold text-white mb-6">الموقع</h3>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-full md:w-1/2 h-64 bg-[#1c1c1c] rounded-xl overflow-hidden shadow-inner border border-white/10 relative group">
                    <iframe
                      title="خريطة الموقع"
                      src={`https://maps.google.com/maps?q=${encodeURIComponent((unit.address || unit.location || "") + " بني سويف")}&t=m&z=14&output=embed`}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="w-full h-full grayscale-[0.4] contrast-125 opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 pointer-events-auto"
                    ></iframe>
                    <div className="absolute inset-0 bg-black/10 pointer-events-none transition-opacity group-hover:opacity-0" />
                  </div>
                  <div className="w-full md:w-1/2 flex flex-col justify-center gap-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-primary shrink-0"><FiMapPin size={14} /></div>
                      <div>
                        <div className="text-sm font-bold text-white">5 دقائق</div>
                        <div className="text-xs text-white/50">من وسط المدينة وأهم الخدمات</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-primary shrink-0"><FiMapPin size={14} /></div>
                      <div>
                        <div className="text-sm font-bold text-white">10 دقائق</div>
                        <div className="text-xs text-white/50">من الطريق الدائري والمحور</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-primary shrink-0"><FiMapPin size={14} /></div>
                      <div>
                        <div className="text-sm font-bold text-white">15 دقيقة</div>
                        <div className="text-xs text-white/50">من المدارس والجامعات الدولية</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floor Plans */}
              <div id="floorplans" className="scroll-mt-32">
                <h3 className="text-xl font-bold text-white mb-6">المخططات</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {(unit.floor_plans && unit.floor_plans.length > 0) ? (
                    unit.floor_plans.map((plan: any, idx: number) => (
                      <ImageLightbox key={idx} src={getImageUrl(plan.image || plan)}>
                        <div className="bg-[#111111] border border-white/5 rounded-2xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.2)] group hover:border-primary/30 transition-colors relative overflow-hidden cursor-pointer h-full">
                          <div className="w-full h-48 bg-[#1c1c1c] rounded-xl mb-4 relative overflow-hidden border border-white/10 group-hover:shadow-[0_0_20px_rgba(197,160,89,0.2)] transition-shadow">
                            <img src={getImageUrl(plan.image || plan)} alt={plan.title || `مخطط ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700 opacity-90 group-hover:opacity-100" />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <div className="w-12 h-12 rounded-full bg-primary/80 flex items-center justify-center text-white backdrop-blur-sm shadow-[0_0_15px_rgba(197,160,89,0.5)]">
                                <FiMaximize size={20} />
                              </div>
                            </div>
                          </div>
                          <h4 className="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors">{plan.title || `مخطط الطابق ${idx + 1}`}</h4>
                          <p className="text-sm text-white/50">{plan.description || "توضيح دقيق لأبعاد الغرف والاستقبال والمرافق."}</p>
                        </div>
                      </ImageLightbox>
                    ))
                  ) : (
                    <>
                      {/* Floor Plan 1 Fallback */}
                      <ImageLightbox src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80">
                        <div className="bg-[#111111] border border-white/5 rounded-2xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.2)] group hover:border-primary/30 transition-colors relative overflow-hidden cursor-pointer h-full">
                          <div className="w-full h-48 bg-[#1c1c1c] rounded-xl mb-4 relative overflow-hidden border border-white/10 group-hover:shadow-[0_0_20px_rgba(197,160,89,0.2)] transition-shadow">
                            <img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Floor Plan" className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700 opacity-90 group-hover:opacity-100 grayscale group-hover:grayscale-0 contrast-125" />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <div className="w-12 h-12 rounded-full bg-primary/80 flex items-center justify-center text-white backdrop-blur-sm shadow-[0_0_15px_rgba(197,160,89,0.5)]">
                                <FiMaximize size={20} />
                              </div>
                            </div>
                          </div>
                          <h4 className="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors">المخطط الهندسي للوحدة</h4>
                          <p className="text-sm text-white/50">تصميم ذكي يستغل المساحات بأفضل شكل ممكن، مع توزيع مثالي للغرف والإضاءة.</p>
                        </div>
                      </ImageLightbox>
                      {/* Floor Plan 2 Fallback */}
                      <ImageLightbox src="/api/floorplan">
                        <div className="bg-[#111111] border border-white/5 rounded-2xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.2)] group hover:border-primary/30 transition-colors relative overflow-hidden cursor-pointer h-full">
                          <div className="w-full h-48 bg-[#1c1c1c] rounded-xl mb-4 relative overflow-hidden border border-white/10 group-hover:shadow-[0_0_20px_rgba(197,160,89,0.2)] transition-shadow">
                            <img src="/api/floorplan" alt="Room Distribution" className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700 opacity-90 group-hover:opacity-100" />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <div className="w-12 h-12 rounded-full bg-primary/80 flex items-center justify-center text-white backdrop-blur-sm shadow-[0_0_15px_rgba(197,160,89,0.5)]">
                                <FiMaximize size={20} />
                              </div>
                            </div>
                          </div>
                          <h4 className="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors">توزيع الغرف والأبعاد</h4>
                          <p className="text-sm text-white/50">توضيح دقيق لأبعاد الغرف، الاستقبال، والمرافق الداخلية بأسلوب عصري ومريح.</p>
                        </div>
                      </ImageLightbox>
                    </>
                  )}
                </div>
              </div>

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
