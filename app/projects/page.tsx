"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { projects } from "./data";

const ease = [0.16, 1, 0.3, 1] as const;

// --- 1. Shared UI Components ---
function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="flex flex-col items-center justify-center text-center mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease }}
        className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white border border-[#20d09f]/30 shadow-sm mb-6"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#20d09f] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#20d09f]"></span>
        </span>
        <span className="text-sm font-bold text-[#148968] tracking-[0.2em] uppercase">
          {subtitle}
        </span>
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.1, ease }}
        className="text-[clamp(2.5rem,5vw,4.5rem)] font-black text-[#082b26] leading-tight"
      >
        {title.split(' ').map((word, i, arr) => (
          i === arr.length - 1 ? <span key={i} className="text-[#20d09f]"> {word}</span> : <span key={i}>{word} </span>
        ))}
      </motion.h2>
    </div>
  );
}



const categories = ["الكل", "فيلات", "شقق", "تجاري", "شاليهات"];

// --- 3. Lightbox Modal ---
function Lightbox({ project, onClose }: { project: (typeof projects)[0]; onClose: () => void }) {
  const [current, setCurrent] = useState(0);
  const total = project.images.length;

  const next = useCallback(() => setCurrent((p) => (p + 1) % total), [total]);
  const prev = useCallback(() => setCurrent((p) => (p - 1 + total) % total), [total]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") next();
      if (e.key === "ArrowRight") prev();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose, next, prev]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease }}
      className="fixed inset-0 z-[100] overflow-y-auto"
      onClick={onClose}
    >
      <div className="fixed inset-0 bg-[#082b26]/60 backdrop-blur-md pointer-events-none" />

      <div className="relative min-h-full flex items-start justify-center p-4 pt-1 md:p-6 md:pt-2">
        <div
          className="relative z-10 w-full max-w-7xl flex flex-col lg:flex-row bg-white rounded-[3rem] overflow-hidden shadow-2xl border border-white/10"
          onClick={(e) => e.stopPropagation()}
        >
        <button
          onClick={onClose}
          className="absolute top-4 left-4 lg:top-6 lg:left-6 w-12 h-12 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-50 hover:text-[#082b26] hover:scale-110 transition-all duration-300 z-50"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        {/* Left Side: Images */}
        <div className="relative w-full lg:w-3/5 min-h-[40vh] lg:min-h-[500px] bg-black overflow-hidden group">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease }}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${project.images[current]}')` }}
            />
          </AnimatePresence>

          {total > 1 && (
            <>
              <button onClick={prev} className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-[#082b26] transition-all opacity-0 group-hover:opacity-100 hover:scale-110 translate-x-4 group-hover:translate-x-0 duration-500">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              </button>
              <button onClick={next} className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-[#082b26] transition-all opacity-0 group-hover:opacity-100 hover:scale-110 -translate-x-4 group-hover:translate-x-0 duration-500">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
              </button>
            </>
          )}
          
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full px-6 py-2 text-white text-sm font-bold tracking-[0.2em] shadow-lg">
            {current + 1} / {total}
          </div>
        </div>

        {/* Right Side: Info */}
        <div className="w-full lg:w-2/5 p-6 lg:p-10 flex flex-col bg-gray-50 relative">
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-gray-50 to-transparent z-10 pointer-events-none" />
          
          <div className="relative z-20">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-4 py-1.5 bg-[#20d09f]/10 text-[#148968] text-xs font-bold tracking-wider rounded-full border border-[#20d09f]/20 shadow-sm">{project.category}</span>
              <span className="flex items-center gap-1.5 text-gray-500 text-sm font-medium">
                <svg className="w-4 h-4 text-[#148968]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
                {project.location}
              </span>
            </div>

            <h3 className="text-2xl lg:text-3xl font-black text-[#082b26] mb-3 leading-tight">{project.title}</h3>
            <p className="text-[#148968] text-2xl font-black mb-6">{project.price}</p>
            
            <p className="text-gray-500 leading-relaxed text-[14px] mb-8 pb-8 border-b border-gray-200">
              {project.description}
            </p>

            <div className="grid grid-cols-3 gap-3 mb-8">
               <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
                  <div className="w-10 h-10 rounded-full bg-[#148968]/5 flex items-center justify-center mb-3 group-hover:bg-[#148968] transition-colors">
                    <svg className="w-5 h-5 text-[#148968] group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6.75h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21" /></svg>
                  </div>
                  <span className="text-[#082b26] font-black text-xl mb-1">{project.stats.beds}</span>
                  <span className="text-gray-400 text-xs font-bold">غرف نوم</span>
               </div>
               <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
                  <div className="w-10 h-10 rounded-full bg-[#148968]/5 flex items-center justify-center mb-3 group-hover:bg-[#148968] transition-colors">
                    <svg className="w-5 h-5 text-[#148968] group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.79l.707-1.227m7.583-13.126l.707-1.227" /></svg>
                  </div>
                  <span className="text-[#082b26] font-black text-xl mb-1">{project.stats.baths}</span>
                  <span className="text-gray-400 text-xs font-bold">حمامات</span>
               </div>
               <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
                  <div className="w-10 h-10 rounded-full bg-[#148968]/5 flex items-center justify-center mb-3 group-hover:bg-[#148968] transition-colors">
                    <svg className="w-5 h-5 text-[#148968] group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" /></svg>
                  </div>
                  <span className="text-[#082b26] font-black text-xl mb-1 font-sans">{project.stats.area}</span>
                  <span className="text-gray-400 text-xs font-bold">مساحة</span>
               </div>
            </div>

            <div className="mt-auto flex flex-col gap-3">
               <Link href={`/projects/${project.id}`} className="w-full py-5 bg-[#082b26] text-white font-black text-lg rounded-[1.5rem] flex items-center justify-center gap-3 hover:bg-[#148968] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02]">
                 <span>عرض التفاصيل الكاملة</span>
                 <svg className="w-6 h-6 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
               </Link>
               <Link href="/contact" className="w-full py-4 bg-white text-[#082b26] border border-gray-200 font-bold text-base rounded-[1.5rem] flex items-center justify-center hover:bg-gray-50 transition-all duration-300">
                 استفسر الآن
               </Link>
            </div>
          </div>
        </div>
        </div>
      </div>
    </motion.div>,
    document.body
  );
}

// --- 4. Main Page Component ---
export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("الكل");
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const filtered = activeCategory === "الكل" ? projects : projects.filter((p) => p.category === activeCategory);
  const featuredProjects = projects.filter((p) => p.featured);

  return (
    <>
      <main className="min-h-screen bg-gray-50 selection:bg-[#20d09f]/30 selection:text-[#082b26] pb-0 font-body">
        <Navbar />

        {/* --- SECTION 1: HERO --- */}
        <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-center justify-center overflow-hidden pt-32 pb-20 bg-[#082b26]">
          {!isMounted ? null : (
            <>
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#082b26] via-[#082b26]/50 to-transparent" />
              <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#20d09f]/10 rounded-full blur-[150px] pointer-events-none" />

              <div className="container-wide px-6 relative z-10 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease }}
                >
                  <span className="inline-block px-6 py-2 border border-white/20 text-white rounded-full text-sm font-bold tracking-widest uppercase mb-8 backdrop-blur-md bg-white/5 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                    أكواد العقاريه للعقارات
                  </span>
                  <h1 className="text-[clamp(3rem,8vw,6rem)] font-black text-white leading-tight mb-8 font-arabic drop-shadow-2xl">
                    اكتشف عقار <br/> <span className="text-[#20d09f]">أحلامك</span>
                  </h1>
                  <p className="text-gray-300 text-lg md:text-2xl max-w-3xl mx-auto font-light leading-relaxed">
                    مجموعة منتقاة من أفخم العقارات في مصر، مصممة لتلبية تطلعاتك وتوفير أسلوب حياة استثنائي وفريد.
                  </p>
                </motion.div>
              </div>
            </>
          )}
        </section>

        {!isMounted ? null : (
        <>
        {/* --- SECTION 2: FEATURED --- */}
        <section className="py-32 relative overflow-hidden bg-gray-50">
          <div className="container-wide px-6 relative z-10">
            <SectionHeader subtitle="Masterpieces" title="المشاريع الاستثنائية" />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
               {featuredProjects.map((project, i) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.8, ease }}
                    key={project.id}
                    className="group cursor-pointer relative overflow-hidden rounded-[2.5rem] aspect-[4/5] lg:aspect-auto lg:h-[600px] shadow-lg hover:shadow-2xl transition-all duration-500"
                    onClick={() => setSelectedProject(project)}
                  >
                     <div className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.5s] group-hover:scale-110" style={{ backgroundImage: `url('${project.images[0]}')` }} />
                     <div className="absolute inset-0 bg-gradient-to-t from-[#082b26]/90 via-[#082b26]/40 to-transparent opacity-90" />
                     
                     <div className="absolute inset-x-0 top-0 p-8 flex justify-between items-start z-10">
                        <span className="px-4 py-1.5 bg-[#20d09f] text-[#082b26] font-bold text-xs tracking-wider rounded-full shadow-lg">
                          مميز
                        </span>
                        <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-75 group-hover:scale-100">
                           <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                        </div>
                     </div>

                     <div className="absolute inset-x-0 bottom-0 p-8 md:p-10 z-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <span className="text-[#20d09f] text-xs font-bold tracking-[0.2em] mb-3 block">{project.category}</span>
                        <h3 className="text-3xl md:text-4xl font-black text-white mb-3 leading-tight group-hover:text-[#20d09f] transition-colors">{project.title}</h3>
                        <p className="text-gray-300 text-sm mb-6 line-clamp-2 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">{project.description}</p>
                        <p className="text-white font-black text-2xl md:text-3xl">{project.price}</p>
                     </div>
                  </motion.div>
               ))}
            </div>
          </div>
        </section>

        {/* --- SECTION 3: ALL PROJECTS --- */}
        <section className="py-32 relative bg-white border-t border-gray-100">
           <div className="container-wide px-6">
              <SectionHeader subtitle="Explore Properties" title="تصفح جميع العقارات" />

              {/* FILTER BAR */}
              <div className="flex justify-center mb-16">
                 <div className="inline-flex overflow-x-auto custom-scrollbar bg-gray-50 p-2 rounded-full border border-gray-100 shadow-inner">
                    {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`whitespace-nowrap px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
                        activeCategory === cat
                            ? "bg-[#082b26] text-white shadow-md scale-105"
                            : "text-gray-500 hover:text-[#148968] hover:bg-white"
                        }`}
                    >
                        {cat}
                    </button>
                    ))}
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                  <AnimatePresence mode="popLayout">
                    {filtered.map((project) => (
                    <motion.div
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.4 }}
                        key={project.id}
                        className="group cursor-pointer bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 hover:border-[#148968]/20 transition-all duration-500 shadow-sm hover:shadow-2xl flex flex-col"
                        onClick={() => setSelectedProject(project)}
                    >
                        {/* Image */}
                        <div className="relative aspect-[4/3] overflow-hidden m-4 rounded-[2rem]">
                          <div
                              className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.5s] group-hover:scale-110"
                              style={{ backgroundImage: `url('${project.images[0]}')` }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#082b26]/60 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
                          
                          <div className="absolute top-4 right-4">
                             <span className="px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold text-white border border-white/20 shadow-md">
                                {project.category}
                             </span>
                          </div>
                        </div>

                        {/* Info */}
                        <div className="p-8 pt-4 flex-1 flex flex-col relative">
                           <h3 className="text-2xl font-black text-[#082b26] mb-3 group-hover:text-[#148968] transition-colors">{project.title}</h3>
                           <p className="text-gray-500 text-sm mb-6 flex items-center gap-2 font-medium">
                             <svg className="w-4 h-4 text-[#148968]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
                             {project.location}
                           </p>
                           
                           <div className="flex justify-between items-center mb-8 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                              <div className="flex flex-col items-center">
                                <span className="text-[#082b26] font-black">{project.stats.beds}</span>
                                <span className="text-gray-400 text-[10px] font-bold">غرف</span>
                              </div>
                              <div className="w-px h-8 bg-gray-200" />
                              <div className="flex flex-col items-center">
                                <span className="text-[#082b26] font-black">{project.stats.baths}</span>
                                <span className="text-gray-400 text-[10px] font-bold">حمام</span>
                              </div>
                              <div className="w-px h-8 bg-gray-200" />
                              <div className="flex flex-col items-center">
                                <span className="text-[#082b26] font-black">{project.stats.area}</span>
                                <span className="text-gray-400 text-[10px] font-bold">مساحة</span>
                              </div>
                           </div>

                           <div className="mt-auto flex items-center justify-between">
                              <span className="text-[#148968] font-black text-xl">{project.price}</span>
                              <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-[#148968] group-hover:text-white transition-colors duration-300">
                                 <svg className="w-5 h-5 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                              </div>
                           </div>
                        </div>
                    </motion.div>
                    ))}
                  </AnimatePresence>
              </div>
           </div>
        </section>

        {/* --- SECTION 4: CTA --- */}
        <section className="py-32 relative bg-white border-t border-gray-100">
           <div className="container-wide px-6 relative z-10 text-center">
              <div 
                className="max-w-5xl mx-auto bg-gradient-to-br from-[#082b26] to-[#041512] rounded-[3rem] p-16 md:p-24 relative overflow-hidden shadow-2xl"
              >
                <div className="absolute inset-0 bg-[url('/projects/project-9.png')] bg-cover bg-center opacity-10 mix-blend-overlay" />
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#20d09f]/20 rounded-full blur-[80px]" />
                
                <h2 className="text-4xl md:text-6xl font-black text-white mb-6 relative z-10 font-arabic leading-tight">
                  تبحث عن <span className="text-[#20d09f]">عقار محدد؟</span>
                </h2>
                <p className="text-gray-300 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed relative z-10">
                  تواصل معنا الآن، وسيقوم أحد مستشارينا بالبحث في قاعدة بياناتنا الواسعة للعثور على العقار الذي يطابق مواصفاتك تماماً.
                </p>
                
                <Link href="/contact" className="relative z-10 inline-flex items-center justify-center gap-4 px-12 py-6 bg-[#20d09f] text-[#082b26] hover:bg-white font-black text-lg rounded-full overflow-hidden transition-all duration-300 shadow-lg hover:shadow-[#20d09f]/50 hover:scale-105">
                  <span>احجز استشارتك المجانية</span>
                  <svg className="w-6 h-6 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
           </div>
        </section>
        </>
        )}
        
        <Footer />
      </main>

      {/* --- LIGHTBOX MODAL --- */}
      <AnimatePresence>
        {selectedProject && (
          <Lightbox project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
