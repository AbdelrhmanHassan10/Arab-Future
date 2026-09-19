"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
// Removed static finishing packages
import { FiCheckCircle, FiTool, FiLayout, FiHome, FiImage, FiArrowLeft } from "react-icons/fi";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { useState, useEffect } from "react";
import { getImageUrl } from "@/lib/config";

export default function FinishingPage() {
  const ease = [0.16, 1, 0.3, 1] as const;
  const [projects, setProjects] = useState<any[]>([]);

  const [packages, setPackages] = useState<any[]>([]);

  useEffect(() => {
    // Fetch completed renovation projects from API
    const params = new URLSearchParams();
    params.append("status", "completed");

    fetch(`/api/renovation-projects?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        const res = data.data || data;
        setProjects(Array.isArray(res) ? res : []);
      })
      .catch((err) => {
        console.error("Failed to fetch renovation projects", err);
      });

    // Fetch renovation packages from API
    fetch(`/api/renovation-packages`)
      .then((res) => res.json())
      .then((data) => {
        const res = Array.isArray(data.data || data) ? (data.data || data) : [];
        setPackages(res);
      })
      .catch((err) => {
        console.error("Failed to fetch renovation packages", err);
        setPackages([]);
      });
  }, []);

  return (
    <>
      <Navbar />
      
      {/* Header */}
      <div className="pt-40 pb-32 relative overflow-hidden flex items-center justify-center min-h-[60vh] bg-white border-b border-gray-100">
        <div className="absolute inset-0 z-0">
          <img src="/gallery-9.png" alt="Interior Design" className="w-full h-full object-cover opacity-10" />
          <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white" />
        </div>
        <div className="container-wide px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
          >
            <div className="inline-flex items-center gap-4 px-6 py-2 rounded-full bg-[#148968]/10 border border-[#148968]/20 mb-6 backdrop-blur-md shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#148968] animate-pulse" />
              <span className="text-sm text-[#148968] font-bold tracking-widest font-body uppercase">التشطيبات المتكاملة</span>
              <span className="w-2 h-2 rounded-full bg-[#148968] animate-pulse" />
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#082b26] mb-6 leading-tight font-arabic">
              نحوّل مساحتك إلى <br /> <span className="text-[#148968] drop-shadow-sm">تحفة فنية</span>
            </h1>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">نقدم خدمات تشطيب متكاملة من التصميم وحتى تسليم المفتاح، بأعلى معايير الجودة وباقات تناسب جميع الميزانيات.</p>
          </motion.div>
        </div>
      </div>

      {/* Steps Section */}
      <div className="bg-gray-50 py-24 relative border-b border-gray-100">
        <div className="container-wide px-6 relative z-10">
          <div className="flex flex-col items-center text-center mb-16 md:mb-24 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease }}
            >
              <h2 className="text-3xl md:text-5xl font-bold text-[#082b26] mb-4 font-arabic">
                كيف نعمل؟
              </h2>
              <div className="w-24 h-[2px] bg-[#148968] mx-auto opacity-50 mb-6" />
              <p className="text-gray-500 max-w-2xl mx-auto text-lg">خطوات واضحة ومدروسة لضمان تسليم وحدتك بأفضل شكل وفي الوقت المحدد.</p>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: FiHome, title: "المعاينة والرفع المساحي", desc: "زيارة الموقع ورفع المقاسات ومعرفة متطلبات العميل." },
              { icon: FiLayout, title: "التصميم والتسعير", desc: "عمل تصميم 3D وتقديم مقايسة تفصيلية بالأسعار." },
              { icon: FiTool, title: "التنفيذ والإشراف", desc: "البدء في الأعمال بأيدي أمهر الفنيين وتحت إشراف هندسي كامل." },
              { icon: FiCheckCircle, title: "التسليم والضمان", desc: "تسليم الوحدة بالمواصفات المتفق عليها مع تقديم ضمان للأعمال." },
            ].map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="text-center group"
              >
                <div className="w-24 h-24 mx-auto bg-white rounded-2xl flex items-center justify-center text-[#148968] mb-6 shadow-sm border border-gray-100 relative group-hover:bg-[#148968] group-hover:text-white transition-all duration-500 overflow-hidden group-hover:shadow-md">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <step.icon size={36} className="relative z-10" />
                  <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-white border border-gray-200 text-[#082b26] flex items-center justify-center font-bold text-sm shadow-sm z-20 group-hover:bg-gray-50">
                    {idx + 1}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-[#082b26] mb-3">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Packages Section */}
      <div className="relative bg-white py-32 border-b border-gray-100">
        {/* Top Curved Divider */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-0">
          <svg className="relative block w-full h-[60px] md:h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="#f9fafb"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" fill="#f9fafb" opacity=".5"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="#f9fafb" opacity=".7"></path>
          </svg>
        </div>

        <div className="container-wide px-6 relative z-10">
          <div className="flex flex-col items-center text-center mb-16 md:mb-24 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease }}
            >
              <h2 className="text-3xl md:text-5xl font-bold text-[#082b26] mb-4 font-arabic">
                باقات التشطيب
              </h2>
              <div className="w-24 h-[2px] bg-[#148968] mx-auto opacity-50 mb-6" />
              <p className="text-gray-500 max-w-2xl mx-auto text-lg">باقات مدروسة لتلبي كافة الاحتياجات وتتناسب مع ميزانيتك، مع ضمان الجودة العالية في التنفيذ.</p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center max-w-6xl mx-auto">
            {packages.length > 0 ? packages.sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0)).map((pkg, idx) => (
              <motion.div
                key={pkg.id || idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
                className={`rounded-3xl p-8 relative flex flex-col h-full border ${pkg.is_recommended ? 'bg-[#082b26] border-[#148968]/30 shadow-xl md:scale-110 z-10' : 'bg-white border-gray-200 shadow-sm opacity-90 hover:shadow-md transition-shadow'}`}
              >
                {pkg.is_recommended && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#148968] text-white font-bold px-4 py-1 rounded-full text-sm shadow-md whitespace-nowrap">
                    الأكثر طلباً
                  </div>
                )}
                
                <h3 className={`text-2xl font-bold mb-2 text-center ${pkg.is_recommended ? 'text-white' : 'text-[#082b26]'}`}>{pkg.title}</h3>
                <p className={`text-sm mb-6 text-center ${pkg.is_recommended ? 'text-white/60' : 'text-gray-500'}`}>{pkg.description}</p>
                
                <div className="text-center mb-8">
                  <span className={`text-sm font-medium ${pkg.is_recommended ? 'text-white/60' : 'text-gray-500'}`}>يبدأ من</span>
                  <div className={`text-4xl font-black my-1 font-body ${pkg.is_recommended ? 'text-[#148968]' : 'text-[#148968]'}`}>{pkg.price?.toLocaleString("ar-EG") || '0'}</div>
                  <span className={`text-sm font-medium ${pkg.is_recommended ? 'text-white/60' : 'text-gray-500'}`}>ج.م / للمتر المربع</span>
                </div>

                <div className="space-y-4 mb-8 flex-1">
                  {(Array.isArray(pkg.notes) ? pkg.notes : (typeof pkg.notes === 'string' ? JSON.parse(pkg.notes || '[]') : [])).map((feature: string, fIdx: number) => (
                    <div className="flex items-start gap-3" key={fIdx}>
                      <FiCheckCircle className="text-[#148968] mt-1 shrink-0" size={18} />
                      <span className={`text-sm font-medium leading-relaxed ${pkg.is_recommended ? 'text-white/80' : 'text-gray-600'}`}>{feature}</span>
                    </div>
                  ))}
                </div>

                <a
                  href={`https://wa.me/201008450553?text=مرحباً، أريد الاستفسار عن باقة التشطيب: ${pkg.title}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-4 rounded-xl font-bold text-center transition-all duration-300 flex items-center justify-center gap-2 ${pkg.is_recommended ? 'bg-[#148968] text-white hover:bg-[#0f6c52] shadow-md hover:shadow-lg' : 'bg-gray-50 text-[#082b26] hover:bg-gray-100 border border-gray-200'}`}
                >
                  <FaWhatsapp size={20} />
                  <span>طلب معاينة</span>
                </a>
              </motion.div>
            )) : (
              <div className="col-span-3 text-center py-16 text-gray-400">لا توجد باقات تشطيب حالياً.</div>
            )}
          </div>
        </div>
      </div>

      {/* Projects Portfolio */}
      <div className="relative bg-gray-50 py-32 border-b border-gray-100">
        {/* Top Curved Divider from the previous white section */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-0">
          <svg className="relative block w-full h-[60px] md:h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="#ffffff"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" fill="#ffffff" opacity=".5"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="#ffffff" opacity=".7"></path>
          </svg>
        </div>

        <div className="container-wide px-6 relative z-10">
          <div className="flex flex-col items-center text-center mb-16 md:mb-24 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease }}
            >
              <h2 className="text-3xl md:text-5xl font-bold text-[#082b26] mb-4 font-arabic">
                أعمالنا السابقة
              </h2>
              <div className="w-24 h-[2px] bg-[#148968] mx-auto opacity-50 mb-6" />
              <p className="text-gray-500 max-w-2xl mx-auto text-lg">جولة في بعض من مشاريعنا التي قمنا بتصميمها وتشطيبها وتسليمها لعملائنا بكل فخر.</p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, idx) => (
              <motion.div
                key={project.id || idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group rounded-[2rem] overflow-hidden bg-white border border-gray-100 shadow-sm flex flex-col h-full hover:border-[#148968]/30 hover:shadow-md transition-all duration-500 hover:-translate-y-2"
              >
                <div className="relative h-72 overflow-hidden">
                  <img src={project.main_image_url || getImageUrl(project.main_image || project.image, idx)} alt={project.title} className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80" />
                  
                  <div className="absolute top-5 right-5 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold text-[#148968] border border-gray-100 shadow-sm">
                    {project.style_label || (project.style === "modern" ? "عصري" : project.style === "neo_classic" ? "نيو كلاسيك" : project.style)}
                  </div>
                  
                  {/* View details overlay on hover */}
                  <div className="absolute inset-0 bg-[#148968]/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <Link href={`/our-work/${project.code || project.renovation_code || project.id}`} className="bg-white text-[#082b26] hover:bg-[#148968] hover:text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 shadow-lg">
                      التفاصيل
                      <FiArrowLeft className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
                
                <div className="p-8 flex flex-col flex-grow relative z-10 bg-white">
                  <h3 className="text-2xl font-bold text-[#082b26] mb-3 group-hover:text-[#148968] transition-colors">{project.title}</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs text-gray-500 bg-gray-50 border border-gray-100 px-3 py-1 rounded-full">{project.property_type === "apartment" ? "شقة" : project.property_type === "villa" ? "فيلا" : project.property_type === "commercial_shop" ? "محل تجاري" : project.property_type || "وحدة سكنية"}</span>
                    <span className="text-xs text-gray-500 bg-gray-50 border border-gray-100 px-3 py-1 rounded-full">{project.area_sqm || 150} م²</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-6 line-clamp-2 leading-relaxed">{project.description || "مشروع تشطيب بأعلى معايير الجودة والتصميم العصري."}</p>
                  
                  <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between">
                    <Link href={`/our-work/${project.code || project.renovation_code || project.id}`} className="text-[#148968] font-bold hover:text-[#0f6c52] transition-colors text-sm flex items-center gap-2">
                      عرض المشروع كامل
                      <FiArrowLeft className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
            {projects.length === 0 && (
              <div className="col-span-full py-20 text-center text-gray-400 bg-white rounded-[2rem] border border-gray-200 border-dashed">
                لا توجد مشاريع مسجلة حالياً.
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
}
