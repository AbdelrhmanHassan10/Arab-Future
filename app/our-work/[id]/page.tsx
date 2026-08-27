import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ImageGallery from "@/components/ImageGallery";
import { fetchApi } from "@/lib/api";
import { getImageUrl } from "@/lib/config";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ProjectDetailsPage({ params }: { params: { id: string } }) {
  let project: any = null;

  try {
    const data = await fetchApi(`/renovation-projects/${params.id}`, { cache: 'no-store' });
    project = data.data || data;
  } catch (error) {
    console.error(`Failed to fetch renovation project details for ID ${params.id}:`, error);
  }

  // Fallback: If direct fetch fails (e.g. because params.id is a code like fp-02 but API expects ID)
  if (!project) {
    try {
      const listData = await fetchApi("/renovation-projects", { cache: 'no-store' });
      const projectsList = listData.data || listData || [];
      project = projectsList.find((p: any) => 
        String(p.id) === String(params.id) || 
        String(p.code) === String(params.id) || 
        String(p.slug) === String(params.id)
      );
    } catch (e) {
      console.error("Fallback fetch failed", e);
    }
  }

  // No local fallback — API is the single source of truth

  if (project) {
    const sanitized = { ...project };
    for (const key of Object.keys(sanitized)) {
      if (key === 'clientReview') continue;
      
      const val = sanitized[key];
      if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
        sanitized[key] = val.name || val.title || val.ar || val.en || val.id || '';
      }
    }
    project = sanitized;
  }

  if (!project) {
    notFound();
  }

  // Map backend fields to frontend variables
  project.area = project.area_sqm || project.area || 0;
  project.duration = project.execution_duration || project.duration || "غير محدد";
  let translatedType = project.property_type || project.type;
  if (translatedType === "apartment") translatedType = "شقة";
  else if (translatedType === "villa") translatedType = "فيلا";
  else if (translatedType === "commercial_shop" || translatedType === "shop") translatedType = "محل تجاري";
  project.type = translatedType || "وحدة سكنية";
  project.description = project.description || "لا توجد تفاصيل إضافية لهذا المشروع حالياً.";

  // Ensure arrays exist for rendering
  let rawImages = project.images_urls || project.images || (project.main_image_url ? [project.main_image_url] : (project.image ? [project.image] : []));
  if (!Array.isArray(rawImages)) rawImages = [];
  project.images = rawImages.map((img: any) => typeof img === 'string' ? img : (img.url || img.image_url || img.file_path || ""));
  
  // Filter out the main image from the gallery
  const galleryImages = project.images.filter((img: string) => img && img !== project.main_image_url && img !== project.main_image);
  
  let materials = Array.isArray(project.materials_used) ? project.materials_used : (Array.isArray(project.materialsUsed) ? project.materialsUsed : []);
  if (typeof project.materials_used === 'string' && project.materials_used.trim()) {
    try { materials = JSON.parse(project.materials_used); } catch { materials = project.materials_used.split(/[،,]/).map((s: string) => s.trim()); }
  }
  project.materialsUsed = materials;

  let services = Array.isArray(project.scope_of_work) ? project.scope_of_work : (Array.isArray(project.servicesProvided) ? project.servicesProvided : []);
  if (typeof project.scope_of_work === 'string' && project.scope_of_work.trim()) {
    try { services = JSON.parse(project.scope_of_work); } catch { services = project.scope_of_work.split(/[،,]/).map((s: string) => s.trim()); }
  }
  project.servicesProvided = services;


  return (
    <main className="min-h-screen bg-[#090909] font-body selection:bg-primary/30 selection:text-white">
      <Navbar />
      
      {/* --- HERO SECTION --- */}
      <div className="relative pt-40 pb-24 min-h-[85vh] flex flex-col justify-end overflow-hidden group">
        <div className="absolute inset-0 z-0">
          <img src={project.main_image_url || getImageUrl(project.main_image || project.image, 0)} alt={project.title} className="w-full h-full object-cover transition-transform duration-[20s] group-hover:scale-110" />
          <div className="absolute inset-0 bg-[#090909]/40 mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-[#090909]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#090909]/50 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-60" />
        </div>
        
        <div className="container-wide px-6 relative z-10">
          <Link href="/finishing" className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20 transition-all mb-10 group backdrop-blur-md">
            <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
            <span className="font-bold text-sm">العودة للمشاريع</span>
          </Link>
          
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="bg-primary/10 border border-primary/20 text-primary px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase backdrop-blur-md shadow-[0_0_15px_rgba(191,154,95,0.2)]">
              {project.style_label || project.style || "تشطيب متكامل"}
            </span>
            <span className="bg-white/5 border border-white/10 text-white/90 px-4 py-1.5 rounded-full text-xs font-bold backdrop-blur-md">
              {project.type}
            </span>
            <span className="bg-white/5 border border-white/10 text-white/70 px-4 py-1.5 rounded-full text-xs font-bold backdrop-blur-md">
              {project.area} م²
            </span>
            {project.status && (
              <span className={`px-4 py-1.5 rounded-full text-xs font-bold backdrop-blur-md border ${project.status === 'completed' || project.status === 'مكتمل' ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-orange-500/10 border-orange-500/20 text-orange-400'}`}>
                {project.status === 'completed' ? 'مكتمل' : (project.status === 'in_progress' ? 'قيد التنفيذ' : project.status)}
              </span>
            )}
          </div>
          
          <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-black text-white mb-6 leading-tight drop-shadow-2xl">
            {project.title}
          </h1>
          
          <div className="flex items-center text-gray-300 gap-3">
            <svg className="w-6 h-6 text-primary drop-shadow-[0_0_8px_rgba(191,154,95,0.5)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-xl md:text-2xl font-light">{project.location || "غير محدد"}</span>
          </div>
        </div>
      </div>

      {/* --- CONTENT SECTION --- */}
      <div className="container-wide px-6 pb-32 relative z-10 -mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-[#111111] border border-white/5 rounded-[2rem] p-6 flex flex-col justify-center relative overflow-hidden group hover:border-primary/20 transition-colors">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/5 rounded-full blur-[20px] group-hover:bg-primary/20 transition-colors duration-500" />
                <svg className="w-8 h-8 text-primary mb-4 drop-shadow-[0_0_8px_rgba(191,154,95,0.5)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
                <span className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">المساحة الإجمالية</span>
                <span className="text-2xl font-bold text-white">{project.area} م²</span>
              </div>
              <div className="bg-[#111111] border border-white/5 rounded-[2rem] p-6 flex flex-col justify-center relative overflow-hidden group hover:border-primary/20 transition-colors">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/5 rounded-full blur-[20px] group-hover:bg-primary/20 transition-colors duration-500" />
                <svg className="w-8 h-8 text-primary mb-4 drop-shadow-[0_0_8px_rgba(191,154,95,0.5)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">مدة التنفيذ</span>
                <span className="text-2xl font-bold text-white">{project.duration}</span>
              </div>
              <div className="bg-[#111111] border border-white/5 rounded-[2rem] p-6 flex flex-col justify-center relative overflow-hidden group hover:border-primary/20 transition-colors">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/5 rounded-full blur-[20px] group-hover:bg-primary/20 transition-colors duration-500" />
                <svg className="w-8 h-8 text-primary mb-4 drop-shadow-[0_0_8px_rgba(191,154,95,0.5)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.492-3.053c.217-.266.358-.592.404-.939L15 9.75M11.42 15.17l-3.052 2.492c-.347.046-.673.187-.939.404l-1.429 1.428M9.75 15l-1.428-1.429c-.217-.266-.358-.592-.404-.939L7.5 11.25M9.75 15l1.429-1.428c.266-.217.592-.358.939-.404l1.428-1.429M7.5 11.25L3 17.25A2.652 2.652 0 006.75 21l6.002-4.5" />
                </svg>
                <span className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">نوع المشروع</span>
                <span className="text-2xl font-bold text-white">{project.type}</span>
              </div>
            </div>

            {/* Description */}
            <div className="bg-[#111111] border border-white/5 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-20" />
              <h3 className="text-3xl font-bold text-white mb-6 flex items-center gap-4">
                <span className="w-3 h-3 rounded-full bg-primary shadow-[0_0_10px_rgba(191,154,95,0.8)]" />
                رؤية التصميم
              </h3>
              <p className="text-white/70 leading-[2.2] text-lg md:text-xl font-light">
                {project.description}
              </p>
            </div>

            {/* Project Challenges */}
            {project.challenges && project.challenges.length > 0 && (
              <div className="bg-[#1a1a1a] border border-white/5 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden shadow-[0_0_30px_rgba(191,154,95,0.03)]">
                <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px]" />
                <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-4 relative z-10">
                  <span className="w-3 h-3 rounded-full bg-primary shadow-[0_0_10px_rgba(191,154,95,0.8)]" />
                  التحديات والحلول
                </h3>
                <div className="space-y-6 relative z-10">
                  {project.challenges.map((ch: any, idx: number) => (
                    <div key={ch.id || idx} className="flex flex-col md:flex-row gap-6 bg-[#111111] p-6 rounded-[1.5rem] border border-white/5">
                      <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                        <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={idx % 2 === 0 ? "M13 10V3L4 14h7v7l9-11h-7z" : "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"} />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-xl mb-2">{ch.title}</h4>
                        <p className="text-white/60 leading-relaxed text-sm md:text-base">
                          {ch.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Gallery (Using Client Component) */}
            {galleryImages.length > 0 && (
              <ImageGallery images={galleryImages} title={project.title} />
            )}

            {/* Before / After */}
            {project.beforeAfter && project.beforeAfter.length > 0 && (
              <div className="bg-[#111111] border border-white/5 rounded-[2.5rem] p-8 md:p-12 mt-16">
                <h3 className="text-3xl font-bold text-white mb-10 flex items-center gap-4">
                  <span className="w-3 h-3 rounded-full bg-primary shadow-[0_0_10px_rgba(191,154,95,0.8)]" />
                  مراحل التنفيذ (قبل وبعد)
                </h3>
                <div className="space-y-16">
                  {project.beforeAfter.map((stage: { before: string, after: string }, idx: number) => (
                    <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative">
                      {/* VS Badge */}
                      <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-[#090909] rounded-full z-10 border border-white/10 items-center justify-center font-black text-2xl text-primary shadow-[0_0_30px_rgba(191,154,95,0.2)]">
                        VS
                      </div>

                      <div className="relative rounded-[2rem] overflow-hidden h-[400px] border border-white/5 group">
                        <img src={stage.before} alt="قبل التشطيب" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                        <div className="absolute bottom-6 right-6 bg-black/60 backdrop-blur-md text-white/80 px-6 py-2 rounded-full text-sm font-bold border border-white/10">
                          قبل العمل
                        </div>
                      </div>
                      
                      <div className="relative rounded-[2rem] overflow-hidden h-[400px] border border-primary/30 group shadow-[0_0_30px_rgba(191,154,95,0.1)]">
                        <img src={stage.after} alt="بعد التشطيب" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                        <div className="absolute bottom-6 right-6 bg-primary text-[#090909] px-6 py-2 rounded-full text-sm font-bold shadow-[0_0_15px_rgba(191,154,95,0.5)]">
                          النتيجة النهائية
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            <div className="sticky top-32 space-y-8">
              
              {/* Materials */}
              <div className="bg-[#111111] border border-white/5 rounded-[2rem] p-8">
                <h3 className="text-xl font-bold text-white mb-6 border-b border-white/5 pb-6 flex items-center gap-3">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                  الخامات المستخدمة
                </h3>
                {project.materialsUsed && project.materialsUsed.length > 0 && (
                  <div className="space-y-5">
                    {project.materialsUsed.map((mat: string, idx: number) => (
                      <div key={idx} className="flex items-center gap-4 group">
                        <div className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                          <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="font-medium text-gray-300 group-hover:text-white transition-colors">{mat}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Services */}
              <div className="bg-[#111111] border border-white/5 rounded-[2rem] p-8">
                <h3 className="text-xl font-bold text-white mb-6 border-b border-white/5 pb-6 flex items-center gap-3">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  نطاق الأعمال
                </h3>
                {project.servicesProvided && project.servicesProvided.length > 0 && (
                  <div className="flex flex-wrap gap-2.5">
                    {project.servicesProvided.map((service: string, idx: number) => (
                      <span key={idx} className="bg-white/5 border border-white/10 px-5 py-2.5 rounded-full text-sm text-gray-300 font-medium hover:bg-white/10 hover:border-white/20 transition-colors">
                        {service}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Review */}
              {project.clientReview && (
                <div className="bg-[#1a1a1a] rounded-[2rem] p-8 border border-primary/20 relative overflow-hidden group shadow-[0_0_30px_rgba(191,154,95,0.05)]">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] group-hover:bg-primary/20 transition-colors duration-700" />
                  <div className="relative z-10 flex flex-col items-center text-center">
                    <div className="flex gap-1.5 mb-6 text-[#DFBA7F]">
                      {[...Array(project.clientReview.rating)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 drop-shadow-[0_0_5px_rgba(223,186,127,0.5)]" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <svg className="w-12 h-12 text-white/5 mb-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                    <p className="text-lg text-white/90 italic mb-8 leading-[2]">&quot;{project.clientReview.text || ''}&quot;</p>
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xl mb-3">
                      {(project.clientReview.name || "ع").charAt(0)}
                    </div>
                    <div className="font-bold text-white text-lg">{project.clientReview.name || "عميل مميز"}</div>
                    <div className="text-primary/60 text-xs mt-1 uppercase tracking-widest font-bold">رأي العميل</div>
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="bg-gradient-to-br from-[#DFBA7F] to-[#A07B40] rounded-[2rem] p-10 relative overflow-hidden shadow-glow">
                <div className="absolute inset-0 bg-[url('/projects/project-1.png')] bg-cover opacity-10 mix-blend-overlay" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#A07B40] to-transparent opacity-50" />
                <div className="relative z-10 text-center">
                  <h3 className="text-3xl font-black text-[#090909] mb-4">احصل على تصميم مشابه</h3>
                  <p className="text-[#090909]/80 text-sm mb-8 font-bold leading-relaxed">
                    فريقنا المتخصص جاهز لتحويل رؤيتك إلى واقع ملموس بأعلى معايير الجودة.
                  </p>
                  
                  <a
                    href="https://wa.me/201008450553?text=مرحباً، أريد الاستفسار عن تفاصيل وأسعار التشطيبات"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#090909] text-white font-bold py-4 px-6 rounded-2xl flex items-center justify-center gap-3 hover:bg-black hover:scale-105 transition-all duration-300 shadow-xl group"
                  >
                    <svg className="w-6 h-6 text-green-500 group-hover:animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.88-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.347-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.876 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                    </svg>
                    تواصل عبر واتساب
                  </a>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
      
      <Footer />
    </main>
  );
}
