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

    let amenities = Array.isArray(sanitized.amenities) && sanitized.amenities.length > 0
      ? sanitized.amenities
      : (Array.isArray(sanitized.features) ? sanitized.features : []);

    if (amenities.length === 0 && typeof sanitized.features === 'string' && sanitized.features.trim()) {
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

      <main className="bg-gray-50 min-h-screen pb-24">
        {/* Full-width Hero Section */}
        <div className="relative w-full h-[50vh] md:h-[80vh] min-h-[400px] flex items-end">
          {/* Background Image / Video */}
          <div className="absolute inset-0 z-0">
            {unit.video_url && !unit.video_url.includes('youtube.com') && !unit.video_url.includes('youtu.be') ? (
              <VideoPlayer src={getImageUrl(unit.video_url)} />
            ) : (
              <img 
                src={getImageUrl(unit.main_image_url || unit.main_image || (unit as any).image || (unit.images?.[0]), unit.id ? String(unit.id).charCodeAt(0) : 0)} 
                alt={unit.title} 
                className="w-full h-full object-cover"
              />
            )}
            {/* Unified smooth gradient overlay for perfect readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#082b26]/95 via-[#082b26]/50 to-black/60"></div>
          </div>

          {/* Hero Content */}
          <div className="container-wide px-6 relative z-10 w-full mb-12 md:mb-16">
            <div className="max-w-4xl flex flex-col items-start gap-4">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="bg-[#148968] text-white px-4 py-1.5 rounded-lg text-sm font-bold shadow-lg">{getTypeLabel(unit.type)}</span>
                <span className="bg-black/40 backdrop-blur-md text-white border border-white/20 px-4 py-1.5 rounded-lg text-sm font-bold shadow-lg">كود: {unit.unit_code || unit.id}</span>
                {unit.status === "available" && <span className="bg-green-500 text-white px-4 py-1.5 rounded-lg text-sm font-bold shadow-lg">متاحة</span>}
                {unit.status === "sold" && <span className="bg-red-500 text-white px-4 py-1.5 rounded-lg text-sm font-bold shadow-lg">تم البيع</span>}
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-2 leading-tight drop-shadow-lg">
                {unit.title}
              </h1>
              
              <div className="flex items-center text-white/90 text-lg md:text-xl gap-3 drop-shadow-md">
                <FiMapPin className="text-[#148968] text-2xl shrink-0" />
                <span className="font-medium">{unit.address || unit.location}</span>
              </div>

              <div className="mt-4 bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl inline-flex flex-col shadow-xl">
                <span className="text-white/80 text-sm font-bold uppercase mb-1">السعر الإجمالي</span>
                <span className="text-3xl md:text-4xl font-extrabold text-[#20d09f] tracking-wide">{formatPrice(unit.price)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Layout Container */}
        <div className="container-wide px-6 mt-12">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
            
            {/* Right Column (Content) - 70% width */}
            <div className="w-full lg:w-2/3 space-y-16">
              
              {/* Quick Stats Grid (Neumorphic/Minimalist) */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 border-b border-gray-200">
                <div className="flex flex-col items-start gap-2">
                  <FiMaximize className="text-[#148968] text-3xl" />
                  <span className="text-gray-500 text-sm font-bold">المساحة</span>
                  <span className="text-[#082b26] font-black text-2xl">{unit.space_sqm || unit.area} م²</span>
                </div>
                <div className="flex flex-col items-start gap-2">
                  <BiBed className="text-[#148968] text-3xl" />
                  <span className="text-gray-500 text-sm font-bold">غرف النوم</span>
                  <span className="text-[#082b26] font-black text-2xl">{unit.bedrooms || unit.rooms}</span>
                </div>
                <div className="flex flex-col items-start gap-2">
                  <BiBath className="text-[#148968] text-3xl" />
                  <span className="text-gray-500 text-sm font-bold">الحمامات</span>
                  <span className="text-[#082b26] font-black text-2xl">{unit.bathrooms}</span>
                </div>
                {unit.floor !== undefined && (
                  <div className="flex flex-col items-start gap-2">
                    <FiLayers className="text-[#148968] text-3xl" />
                    <span className="text-gray-500 text-sm font-bold">الدور</span>
                    <span className="text-[#082b26] font-black text-2xl">{unit.floor === 0 ? "أرضي" : unit.floor}</span>
                  </div>
                )}
              </div>

              {/* Overview Section */}
              <section className="max-w-none">
                <h3 className="text-3xl font-black text-[#082b26] mb-6">عن العقار</h3>
                <p className="leading-loose text-lg text-gray-600 whitespace-pre-line font-medium">{unit.description}</p>
              </section>

              {/* Gallery Grid (Bento Style) */}
              {(unit.images && unit.images.length > 0) && (
                <section>
                  <h3 className="text-3xl font-black text-[#082b26] mb-8">معرض الصور</h3>
                  <div className="rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white">
                     <GalleryLightbox images={(unit.images || []).map((img: string) => getImageUrl(img))} />
                  </div>
                </section>
              )}

              {/* Amenities Section */}
              {unit.amenities && unit.amenities.length > 0 && (
                <section>
                  <h3 className="text-3xl font-black text-[#082b26] mb-8">المرافق والخدمات</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                    {unit.amenities.map((amenity: any, idx: number) => (
                      <div key={idx} className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-[#148968]/10 text-[#148968] flex items-center justify-center shrink-0">
                          <FiCheck size={24} />
                        </div>
                        <span className="font-bold text-[#082b26] text-lg">{typeof amenity === 'string' ? amenity : amenity?.name || ''}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Floor Plans Section */}
              {unit.floor_plans && unit.floor_plans.length > 0 && (
                <section>
                  <h3 className="text-3xl font-black text-[#082b26] mb-8">المخططات الهندسية</h3>
                  <div className="space-y-8">
                    {unit.floor_plans.map((plan: any, idx: number) => (
                      <div key={idx} className="flex flex-col md:flex-row gap-8 items-center bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
                        <div className="w-full md:w-1/2 h-64 bg-gray-50 rounded-[1.5rem] overflow-hidden relative">
                          <img src={getImageUrl(plan.image || plan)} alt={plan.title || `مخطط ${idx + 1}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                        </div>
                        <div className="w-full md:w-1/2">
                          <h4 className="text-2xl font-bold text-[#082b26] mb-4">{plan.title || `مخطط الطابق ${idx + 1}`}</h4>
                          <p className="text-gray-500 leading-relaxed font-medium">{plan.description || "توضيح دقيق لأبعاد الغرف والاستقبال والمرافق الداخلية بأسلوب عصري."}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Location Section */}
              <section>
                <h3 className="text-3xl font-black text-[#082b26] mb-8">الموقع الإستراتيجي</h3>
                <div className="w-full h-[500px] rounded-[2rem] overflow-hidden shadow-xl border-4 border-white">
                  <iframe
                    title="خريطة الموقع"
                    src={`https://maps.google.com/maps?q=${encodeURIComponent((unit.address || unit.location || "") + " بني سويف")}&t=m&z=14&output=embed`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
                {unit.nearby_places && unit.nearby_places.length > 0 && (
                  <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {unit.nearby_places.map((place: any, i: number) => (
                      <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-[#148968]/10 flex items-center justify-center text-[#148968] shrink-0"><FiMapPin size={20} /></div>
                        <div>
                          <span className="block font-bold text-[#082b26]">{place.title}</span>
                          <span className="text-gray-500 text-sm font-medium">{place.distance_text || place.distance}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>

            </div>

            {/* Left Column (Sticky Sidebar) - 30% width */}
            <div className="w-full lg:w-1/3">
              <div className="sticky top-28 space-y-8">
                {/* Premium Dark Booking Card */}
                <div className="bg-[#082b26] rounded-[2.5rem] p-8 md:p-10 shadow-2xl relative overflow-hidden">
                  {/* Decorative background elements */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#148968] rounded-full blur-[80px] opacity-20 -mr-20 -mt-20 pointer-events-none"></div>
                  
                  <div className="relative z-10 text-right">
                    <span className="inline-block px-4 py-1.5 bg-white/10 text-white rounded-full text-sm font-bold backdrop-blur-md mb-6 border border-white/10">التفاصيل المالية</span>
                    <h3 className="text-4xl md:text-5xl font-black text-white mb-8">{formatPrice(unit.price)}</h3>
                    
                    <div className="space-y-6">
                      <div className="flex justify-between items-center pb-4 border-b border-white/10">
                        <span className="text-gray-400 font-medium">نظام السداد</span>
                        <span className="font-bold text-white text-lg">{unit.payment === "cash" ? "كاش" : unit.payment === "installment" ? "تقسيط" : "كاش أو تقسيط"}</span>
                      </div>
                      {unit.downPayment && (
                        <div className="flex justify-between items-center pb-4 border-b border-white/10">
                          <span className="text-gray-400 font-medium">المقدم</span>
                          <span className="font-bold text-white text-lg">{formatPrice(unit.downPayment)}</span>
                        </div>
                      )}
                      {unit.installmentYears && (
                        <div className="flex justify-between items-center pb-4 border-b border-white/10">
                          <span className="text-gray-400 font-medium">سنوات التقسيط</span>
                          <span className="font-bold text-white text-lg">{unit.installmentYears} سنوات</span>
                        </div>
                      )}
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 font-medium">التشطيب</span>
                        <span className="font-bold text-white text-lg">{getFinishingLabel(unit.finishing)}</span>
                      </div>
                    </div>

                    <div className="mt-12 space-y-4">
                      <a
                        href={`https://wa.me/201008450553?text=مرحباً، أستفسر عن الوحدة ${unit.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-[#20d09f] text-[#082b26] font-black py-5 px-6 rounded-2xl flex items-center justify-center gap-3 hover:bg-[#1bb88c] transition-all hover:scale-105 shadow-lg shadow-[#20d09f]/20"
                      >
                        <FaWhatsapp size={24} />
                        <span className="text-xl">تواصل عبر واتساب</span>
                      </a>
                      <a
                        href="tel:+201008450553"
                        className="w-full bg-transparent text-white border border-white/20 font-bold py-5 px-6 rounded-2xl flex items-center justify-center gap-3 hover:bg-white/5 transition-all"
                      >
                        <span className="text-lg">اتصل بنا هاتفياً</span>
                      </a>
                    </div>
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
