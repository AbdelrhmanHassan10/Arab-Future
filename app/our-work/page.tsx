"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { FiCheckCircle, FiHome, FiClock, FiArrowLeft } from "react-icons/fi";
import { getImageUrl } from "@/lib/config";

export default function OurWorkPage() {
  const [activeTab, setActiveTab] = useState<"completed" | "in-progress" | "sold">("completed");
  const [completedProjects, setCompletedProjects] = useState<any[]>([]);
  const [inProgressProjects, setInProgressProjects] = useState<any[]>([]);
  const [soldUnits, setSoldUnits] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch renovation projects from API
        const projectsRes = await fetch(`/api/renovation-projects`, { cache: 'no-store' });
        if (projectsRes.ok) {
          const projectsData = await projectsRes.json();
          const allProjects = projectsData.data || projectsData || [];
          setCompletedProjects(allProjects.filter((p: any) => p.status === "completed"));
          setInProgressProjects(allProjects.filter((p: any) => p.status === "in_progress" || p.status === "in-progress"));
        }

        // Fetch sold units from API
        const unitsRes = await fetch(`/api/units?status=sold`, { cache: 'no-store' });
        if (unitsRes.ok) {
          const unitsData = await unitsRes.json();
          const units = unitsData.data || unitsData || [];
          setSoldUnits(Array.isArray(units) ? units : []);
        }
      } catch (error) {
        console.error("Failed to fetch our work data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 font-body">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-[#148968] font-bold text-xl animate-pulse">جاري تحميل المشاريع...</div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 font-body selection:bg-[#148968]/30 selection:text-white">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative pt-40 pb-20 overflow-hidden bg-white border-b border-gray-100">
        <div className="absolute inset-0 bg-[url('/projects/project-1.png')] bg-cover opacity-5 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#148968]/5 rounded-full blur-[120px]" />
        
        <div className="container-wide px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#148968]/10 border border-[#148968]/20 text-[#148968] mb-6 text-sm font-bold tracking-widest uppercase shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#148968] animate-pulse" />
            سابقة أعمالنا
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-[#082b26] mb-6 drop-shadow-sm pb-4 leading-normal md:leading-normal font-arabic">
            نصنع الفخامة في كل تفصيلة
          </h1>
          <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            تصفح أحدث مشاريعنا في التشطيب والديكور، ووحداتنا العقارية التي تم تسليمها بنجاح لعملائنا.
          </p>
        </div>
      </div>

      <div className="container-wide px-6 pb-32 relative z-10">
        
        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-16">
          {[
            { id: "completed", label: "مشاريع مكتملة", icon: FiCheckCircle, count: completedProjects.length },
            { id: "in-progress", label: "تحت التنفيذ", icon: FiClock, count: inProgressProjects.length },
            { id: "sold", label: "وحدات مباعة", icon: FiHome, count: soldUnits.length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as "completed" | "in-progress" | "sold")}
              className={`flex items-center gap-3 px-6 py-3.5 rounded-full font-bold transition-all duration-300 ${
                activeTab === tab.id
                  ? "bg-[#148968] text-white shadow-md scale-105"
                  : "bg-white text-gray-500 hover:bg-gray-50 hover:text-[#082b26] border border-gray-200"
              }`}
            >
              <tab.icon className={activeTab === tab.id ? "text-white" : "text-[#148968]"} />
              <span>{tab.label}</span>
              <span className={`min-w-[24px] h-6 px-2 rounded-full flex items-center justify-center text-xs font-black ${
                activeTab === tab.id ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            
            {/* Finishing Projects (Completed & In Progress) */}
            {(activeTab === "completed" || activeTab === "in-progress") && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {(activeTab === "completed" ? completedProjects : inProgressProjects).map((project, idx) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    key={project.id} 
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
                {((activeTab === "completed" && completedProjects.length === 0) || (activeTab === "in-progress" && inProgressProjects.length === 0)) && (
                  <div className="col-span-full py-20 text-center text-gray-400 bg-white rounded-[2rem] border border-gray-200 border-dashed">
                    لا توجد مشاريع مسجلة حالياً في هذا القسم.
                  </div>
                )}
              </div>
            )}

            {/* Sold Units */}
            {activeTab === "sold" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {soldUnits.map((unit, idx) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    key={unit.id} 
                    className="group rounded-[2rem] overflow-hidden bg-white border border-gray-100 shadow-sm flex flex-col h-full hover:border-red-500/30 hover:shadow-md transition-all duration-500 hover:-translate-y-2"
                  >
                    <div className="relative h-72 overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                      <img src={unit.main_image_url || getImageUrl(unit.main_image || unit.image, idx)} alt={unit.title} className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-red-900/20 to-transparent opacity-80" />
                      
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-600 text-white px-8 py-3 rounded-full text-xl font-black transform -rotate-12 border-4 border-white shadow-[0_0_30px_rgba(220,38,38,0.5)] tracking-wider">
                        تم البيع
                      </div>
                    </div>
                    
                    <div className="p-8 flex flex-col flex-grow bg-white">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-xl font-bold text-[#082b26] line-clamp-1 group-hover:text-red-600 transition-colors">{unit.title}</h3>
                      </div>
                      <p className="text-gray-500 text-sm mb-6 flex items-center gap-2">
                        <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {unit.address || (typeof unit.area === 'object' ? unit.area?.name : unit.location) || "بني سويف"}
                      </p>
                      
                      <div className="mt-auto pt-6 border-t border-gray-100">
                        <Link href={`/units/${unit.unit_code || unit.id}`} className="text-red-500 font-bold hover:text-red-600 transition-colors text-sm flex items-center gap-2 group-hover:translate-x-[-4px]">
                          الاطلاع على التفاصيل
                          <FiArrowLeft className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
                {soldUnits.length === 0 && (
                  <div className="col-span-full py-20 text-center text-gray-400 bg-white rounded-[2rem] border border-gray-200 border-dashed">
                    لا توجد وحدات مباعة مسجلة حالياً.
                  </div>
                )}
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </div>
      
      <Footer />
    </main>
  );
}
