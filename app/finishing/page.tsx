"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { finishingPackages } from "@/lib/finishing";
import { FiCheckCircle, FiTool, FiLayout, FiHome, FiImage } from "react-icons/fi";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { useState, useEffect } from "react";
import { API_URL, getImageUrl } from "@/lib/config";

export default function FinishingPage() {
  const ease = [0.16, 1, 0.3, 1] as const;
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    // Fetch completed renovation projects from API
    const params = new URLSearchParams();
    params.append("status", "completed");

    fetch(`${API_URL}/renovation-projects?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setProjects(data.data || data || []);
      })
      .catch((err) => {
        console.error("Failed to fetch renovation projects", err);
      });
  }, []);

  return (
    <>
      <Navbar />
      
      {/* Header */}
      <div className="pt-40 pb-32 relative overflow-hidden flex items-center justify-center min-h-[60vh]">
        <div className="absolute inset-0 z-0">
          <img src="/gallery-9.png" alt="Interior Design" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#090909]/50 backdrop-blur-[1px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#090909]/80 via-transparent to-[#090909]" />
        </div>
        <div className="container-wide px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
          >
            <div className="inline-flex items-center gap-4 px-6 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm text-primary font-bold tracking-widest font-body uppercase">التشطيبات المتكاملة</span>
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              نحوّل مساحتك إلى <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#DFBA7F] via-primary to-[#A07B40] drop-shadow-lg">تحفة فنية</span>
            </h1>
            <p className="text-white/60 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">نقدم خدمات تشطيب متكاملة من التصميم وحتى تسليم المفتاح، بأعلى معايير الجودة وباقات تناسب جميع الميزانيات.</p>
          </motion.div>
        </div>
      </div>

      {/* Steps Section */}
      <div className="bg-[#090909] py-24 relative">
        <div className="container-wide px-6 relative z-10">
          <div className="flex flex-col items-center text-center mb-16 md:mb-24 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease }}
            >
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                كيف نعمل؟
              </h2>
              <div className="w-24 h-[2px] bg-primary mx-auto opacity-50 mb-6" />
              <p className="text-white/50 max-w-2xl mx-auto text-lg">خطوات واضحة ومدروسة لضمان تسليم وحدتك بأفضل شكل وفي الوقت المحدد.</p>
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
                <div className="w-24 h-24 mx-auto bg-[#111111] rounded-2xl flex items-center justify-center text-primary mb-6 shadow-inner border border-white/5 relative group-hover:bg-primary group-hover:text-black transition-all duration-500 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <step.icon size={36} className="relative z-10" />
                  <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-[#1c1c1c] border border-white/10 text-white flex items-center justify-center font-bold text-sm shadow-xl z-20 group-hover:bg-black">
                    {idx + 1}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Packages Section */}
      <div className="relative bg-off-white py-32">
        {/* Top Curved Divider */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-0">
          <svg className="relative block w-full h-[60px] md:h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="#090909"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" fill="#090909" opacity=".5"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="#090909" opacity=".7"></path>
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
              <h2 className="text-3xl md:text-5xl font-bold text-navy-deeper mb-4">
                باقات التشطيب
              </h2>
              <div className="w-24 h-[2px] bg-primary mx-auto opacity-50 mb-6" />
              <p className="text-gray-500 max-w-2xl mx-auto text-lg">باقات مدروسة لتلبي كافة الاحتياجات وتتناسب مع ميزانيتك، مع ضمان الجودة العالية في التنفيذ.</p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center max-w-6xl mx-auto">
            {finishingPackages.map((pkg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
                className={`rounded-3xl p-8 relative flex flex-col h-full bg-white border border-gray-100 ${idx === 1 ? 'shadow-2xl md:scale-110 z-10 border-primary/20' : 'shadow-soft opacity-90'}`}
              >
                {idx === 1 && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-black font-bold px-4 py-1 rounded-full text-sm shadow-md whitespace-nowrap border border-white/20">
                    الأكثر طلباً
                  </div>
                )}
                
                <h3 className="text-2xl font-bold text-navy-deeper mb-2 text-center">{pkg.name}</h3>
                <p className="text-gray-500 text-sm mb-6 text-center">{pkg.description}</p>
                
                <div className="text-center mb-8">
                  <span className="text-sm text-gray-500 font-medium">يبدأ من</span>
                  <div className="text-4xl font-black text-navy-deeper my-1 font-body">{pkg.pricePerMeter}</div>
                  <span className="text-sm text-gray-500 font-medium">ج.م / للمتر المربع</span>
                </div>

                <div className="space-y-4 mb-8 flex-1">
                  {pkg.features.map((feature, fIdx) => (
                    <div className="flex items-start gap-3" key={fIdx}>
                      <FiCheckCircle className="text-primary mt-1 shrink-0" size={18} />
                      <span className="text-gray-600 text-sm font-medium leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>

                <a
                  href={`https://wa.me/201001234567?text=مرحباً، أريد الاستفسار عن ${pkg.name} للتشطيب.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-4 rounded-xl font-bold text-center transition-all duration-300 flex items-center justify-center gap-2 ${idx === 1 ? 'bg-primary text-black hover:bg-navy-deeper hover:text-white shadow-md' : 'bg-off-white text-navy-dark hover:bg-gray-200 border border-gray-100'}`}
                >
                  <FaWhatsapp size={20} />
                  <span>طلب معاينة</span>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Projects Portfolio */}
      <div className="relative bg-[#090909] py-32">
        {/* Top Curved Divider from the previous off-white section */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-0">
          <svg className="relative block w-full h-[60px] md:h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="#F7F7F5"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" fill="#F7F7F5" opacity=".5"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="#F7F7F5" opacity=".7"></path>
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
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                أعمالنا السابقة
              </h2>
              <div className="w-24 h-[2px] bg-primary mx-auto opacity-50 mb-6" />
              <p className="text-white/50 max-w-2xl mx-auto text-lg">جولة في بعض من مشاريعنا التي قمنا بتصميمها وتشطيبها وتسليمها لعملائنا بكل فخر.</p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, idx) => (
              <motion.div
                key={project.id || idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
                className="group rounded-3xl overflow-hidden bg-[#111111] border border-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:border-primary/30 transition-all duration-500"
              >
                <div className="relative h-[350px] overflow-hidden">
                  <img src={getImageUrl(project.main_image || project.image, idx)} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent opacity-80" />
                  <div className="absolute top-4 right-4 bg-[#111111]/80 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold text-primary border border-white/5">
                    {project.style}
                  </div>
                  <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md text-white w-10 h-10 rounded-full flex items-center justify-center border border-white/10">
                    <FiImage />
                    <span className="absolute -top-1 -right-1 bg-primary text-black w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold">
                      {project.images?.length || 0}
                    </span>
                  </div>
                </div>
                <div className="p-8 relative">
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors">{project.title}</h3>
                  <p className="text-white/50 mb-8 line-clamp-2 leading-relaxed">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.scope_of_work?.map((service: string, sIdx: number) => (
                      <span key={sIdx} className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-xs text-white/70 font-medium">
                        {service}
                      </span>
                    )) || project.servicesProvided?.map((service: string, sIdx: number) => (
                      <span key={sIdx} className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-xs text-white/70 font-medium">
                        {service}
                      </span>
                    ))}
                  </div>

                  <Link href={`/our-work/${project.id || project.code || ''}`} className="inline-flex items-center gap-2 text-primary font-bold hover:text-white transition-colors group/link">
                    <span>عرض التفاصيل والصور</span>
                    <svg className="w-5 h-5 rotate-180 group-hover/link:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
}
