import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FiMapPin, FiMaximize, FiLayers, FiCheck, FiHome } from "react-icons/fi";
import { BiBed, BiBath } from "react-icons/bi";
import { FaWhatsapp } from "react-icons/fa";
import GalleryLightbox from "@/components/GalleryLightbox";
import { projects } from "../data";

export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id.toString() }));
}

export default function ProjectDetailsPage({ params }: { params: { id: string } }) {
  const project = projects.find((p) => p.id.toString() === params.id);

  if (!project) {
    notFound();
  }

  return (
    <>
      <Navbar />

      <main className="bg-gray-50 min-h-screen pb-24" dir="rtl">
        {/* Full-width Hero Section */}
        <div className="relative w-full h-[50vh] md:h-[80vh] min-h-[400px] flex items-end">
          <div className="absolute inset-0 z-0">
            <img 
              src={project.images[0]} 
              alt={project.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#082b26]/95 via-[#082b26]/50 to-black/60"></div>
          </div>

          <div className="container-wide px-6 relative z-10 w-full mb-12 md:mb-16">
            <div className="max-w-4xl flex flex-col items-start gap-4">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="bg-[#148968] text-white px-4 py-1.5 rounded-lg text-sm font-bold shadow-lg">{project.category}</span>
                {project.featured && <span className="bg-[#20d09f] text-[#082b26] px-4 py-1.5 rounded-lg text-sm font-bold shadow-lg">مميز</span>}
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-2 leading-tight drop-shadow-lg font-arabic">
                {project.title}
              </h1>
              
              <div className="flex items-center text-white/90 text-lg md:text-xl gap-3 drop-shadow-md">
                <FiMapPin className="text-[#20d09f] text-2xl shrink-0" />
                <span className="font-medium">{project.location}</span>
              </div>

              <div className="mt-4 bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl inline-flex flex-col shadow-xl">
                <span className="text-white/80 text-sm font-bold uppercase mb-1">السعر الإجمالي</span>
                <span className="text-3xl md:text-4xl font-extrabold text-[#20d09f] tracking-wide">{project.price}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Layout Container */}
        <div className="container-wide px-6 mt-12">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
            
            {/* Right Column (Content) - 70% width */}
            <div className="w-full lg:w-2/3 space-y-16">
              
              {/* Quick Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 border-b border-gray-200">
                <div className="flex flex-col items-start gap-2">
                  <FiMaximize className="text-[#148968] text-3xl" />
                  <span className="text-gray-500 text-sm font-bold">المساحة</span>
                  <span className="text-[#082b26] font-black text-2xl font-sans">{project.stats.area}</span>
                </div>
                <div className="flex flex-col items-start gap-2">
                  <BiBed className="text-[#148968] text-3xl" />
                  <span className="text-gray-500 text-sm font-bold">غرف النوم</span>
                  <span className="text-[#082b26] font-black text-2xl">{project.stats.beds}</span>
                </div>
                <div className="flex flex-col items-start gap-2">
                  <BiBath className="text-[#148968] text-3xl" />
                  <span className="text-gray-500 text-sm font-bold">الحمامات</span>
                  <span className="text-[#082b26] font-black text-2xl">{project.stats.baths}</span>
                </div>
                <div className="flex flex-col items-start gap-2">
                  <FiHome className="text-[#148968] text-3xl" />
                  <span className="text-gray-500 text-sm font-bold">التشطيب</span>
                  <span className="text-[#082b26] font-black text-xl">{project.finishing}</span>
                </div>
              </div>

              {/* Overview Section */}
              <section className="max-w-none">
                <h3 className="text-3xl font-black text-[#082b26] mb-6">عن المشروع</h3>
                <p className="leading-loose text-lg text-gray-600 whitespace-pre-line font-medium">{project.description}</p>
              </section>

              {/* Gallery Grid */}
              {(project.images && project.images.length > 0) && (
                <section>
                  <h3 className="text-3xl font-black text-[#082b26] mb-8">معرض الصور</h3>
                  <div className="rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white">
                     <GalleryLightbox images={project.images} />
                  </div>
                </section>
              )}

              {/* Amenities Section */}
              {project.amenities && project.amenities.length > 0 && (
                <section>
                  <h3 className="text-3xl font-black text-[#082b26] mb-8">المرافق والخدمات</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                    {project.amenities.map((amenity, idx) => (
                      <div key={idx} className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-[#148968]/10 text-[#148968] flex items-center justify-center shrink-0">
                          <FiCheck size={24} />
                        </div>
                        <span className="font-bold text-[#082b26] text-lg">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Floor Plans Section */}
              {project.floor_plans && project.floor_plans.length > 0 && (
                <section>
                  <h3 className="text-3xl font-black text-[#082b26] mb-8">المخططات الهندسية</h3>
                  <div className="space-y-8">
                    {project.floor_plans.map((plan, idx) => (
                      <div key={idx} className="flex flex-col md:flex-row gap-8 items-center bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
                        <div className="w-full md:w-1/2 h-64 bg-gray-50 rounded-[1.5rem] overflow-hidden relative">
                          <img src={plan.image} alt={plan.title} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                        </div>
                        <div className="w-full md:w-1/2">
                          <h4 className="text-2xl font-bold text-[#082b26] mb-4">{plan.title}</h4>
                          <p className="text-gray-500 leading-relaxed font-medium">{plan.description}</p>
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
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(project.location + " مصر")}&t=m&z=14&output=embed`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </section>

            </div>

            {/* Left Column (Sticky Sidebar) - 30% width */}
            <div className="w-full lg:w-1/3">
              <div className="sticky top-28 space-y-8">
                {/* Premium Dark Booking Card */}
                <div className="bg-[#082b26] rounded-[2.5rem] p-8 md:p-10 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#148968] rounded-full blur-[80px] opacity-20 -mr-20 -mt-20 pointer-events-none"></div>
                  
                  <div className="relative z-10 text-right">
                    <span className="inline-block px-4 py-1.5 bg-white/10 text-white rounded-full text-sm font-bold backdrop-blur-md mb-6 border border-white/10">التفاصيل المالية</span>
                    <h3 className="text-4xl md:text-5xl font-black text-white mb-8">{project.price}</h3>
                    
                    <div className="space-y-6">
                      <div className="flex justify-between items-center pb-4 border-b border-white/10">
                        <span className="text-gray-400 font-medium">نظام السداد</span>
                        <span className="font-bold text-white text-lg">{project.payment}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 font-medium">التشطيب</span>
                        <span className="font-bold text-white text-lg">{project.finishing}</span>
                      </div>
                    </div>

                    <div className="mt-12 space-y-4">
                      <a
                        href={`https://wa.me/201008450553?text=مرحباً، أستفسر عن مشروع ${project.title}`}
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
