"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { finishingProjects } from "@/lib/finishing";
import { unitsData } from "@/lib/units";
import Link from "next/link";
import { FiCheckCircle, FiHome, FiClock, FiArrowLeft } from "react-icons/fi";

export default function OurWorkPage() {
  const [activeTab, setActiveTab] = useState<"completed" | "in-progress" | "sold">("completed");

  const completedProjects = finishingProjects.filter(p => p.status === "completed");
  const inProgressProjects = finishingProjects.filter(p => p.status === "in-progress");
  const soldUnits = unitsData.filter(u => u.status === "sold");

  return (
    <main className="min-h-screen bg-[#090909] font-body selection:bg-primary/30 selection:text-white">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/projects/project-1.png')] bg-cover opacity-[0.03] mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#090909] via-transparent to-[#090909]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[120px]" />
        
        <div className="container-wide px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary mb-6 text-sm font-bold tracking-widest uppercase shadow-[0_0_20px_rgba(191,154,95,0.15)]">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            سابقة أعمالنا
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 mb-6 drop-shadow-2xl pb-4 leading-normal md:leading-normal">
            نصنع الفخامة في كل تفصيلة
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
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
                  ? "bg-primary text-[#090909] shadow-[0_0_20px_rgba(191,154,95,0.3)] scale-105"
                  : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10"
              }`}
            >
              <tab.icon className={activeTab === tab.id ? "text-[#090909]" : "text-primary"} />
              <span>{tab.label}</span>
              <span className={`min-w-[24px] h-6 px-2 rounded-full flex items-center justify-center text-xs font-black ${
                activeTab === tab.id ? "bg-[#090909]/20 text-[#090909]" : "bg-white/10 text-white"
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
                    className="group rounded-[2rem] overflow-hidden bg-[#111111] border border-white/5 shadow-2xl flex flex-col h-full hover:border-primary/30 transition-all duration-500 hover:-translate-y-2"
                  >
                    <div className="relative h-72 overflow-hidden">
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent opacity-80" />
                      
                      <div className="absolute top-5 right-5 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold text-white border border-white/10 shadow-lg">
                        {project.style}
                      </div>
                      
                      {/* View details overlay on hover */}
                      <div className="absolute inset-0 bg-primary/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                        <Link href={`/our-work/${project.id}`} className="bg-[#090909] text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                          التفاصيل
                          <FiArrowLeft className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                    
                    <div className="p-8 flex flex-col flex-grow relative z-10 bg-[#111111]">
                      <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors">{project.title}</h3>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="text-xs text-gray-400 bg-white/5 px-3 py-1 rounded-full">{project.type}</span>
                        <span className="text-xs text-gray-400 bg-white/5 px-3 py-1 rounded-full">{project.area} م²</span>
                      </div>
                      <p className="text-gray-400 text-sm mb-6 line-clamp-2 leading-relaxed">{project.description}</p>
                      
                      <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                        <Link href={`/our-work/${project.id}`} className="text-primary font-bold hover:text-white transition-colors text-sm flex items-center gap-2">
                          عرض المشروع كامل
                          <FiArrowLeft className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
                {(activeTab === "completed" && completedProjects.length === 0) || (activeTab === "in-progress" && inProgressProjects.length === 0) ? (
                  <div className="col-span-full py-20 text-center text-gray-500 bg-white/5 rounded-[2rem] border border-white/5 border-dashed">
                    لا توجد مشاريع مسجلة حالياً في هذا القسم.
                  </div>
                ) : null}
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
                    className="group rounded-[2rem] overflow-hidden bg-[#111111] border border-white/5 shadow-2xl flex flex-col h-full hover:border-red-500/30 transition-all duration-500 hover:-translate-y-2"
                  >
                    <div className="relative h-72 overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                      <img src={unit.image} alt={unit.title} className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-red-900/20 to-transparent opacity-80" />
                      
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-600 text-white px-8 py-3 rounded-full text-xl font-black transform -rotate-12 border-4 border-[#111111] shadow-[0_0_30px_rgba(220,38,38,0.5)] tracking-wider">
                        تم البيع
                      </div>
                    </div>
                    
                    <div className="p-8 flex flex-col flex-grow bg-[#111111]">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-xl font-bold text-white line-clamp-1">{unit.title}</h3>
                      </div>
                      <p className="text-gray-400 text-sm mb-6 flex items-center gap-2">
                        <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {unit.location}
                      </p>
                      
                      <div className="mt-auto pt-6 border-t border-white/5">
                        <Link href={`/units/${unit.id}`} className="text-red-400 font-bold hover:text-red-300 transition-colors text-sm flex items-center gap-2 group-hover:translate-x-[-4px]">
                          الاطلاع على التفاصيل
                          <FiArrowLeft className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
                {soldUnits.length === 0 && (
                  <div className="col-span-full py-20 text-center text-gray-500 bg-white/5 rounded-[2rem] border border-white/5 border-dashed">
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
