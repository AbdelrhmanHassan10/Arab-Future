"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card-dark border border-primary/30 shadow-[0_0_15px_rgba(191,154,95,0.2)] mb-6"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
        </span>
        <span className="text-xs font-medium text-white/90 tracking-widest uppercase font-body">
          {subtitle}
        </span>
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.1, ease }}
        className="text-[clamp(2rem,4vw,3.5rem)] font-bold text-white leading-tight"
      >
        {title.split(' ').map((word, i, arr) => (
          i === arr.length - 1 ? <span key={i} className="text-primary italic"> {word}</span> : <span key={i}>{word} </span>
        ))}
      </motion.h2>
    </div>
  );
}

// --- 2. Real Estate Data ---
const projects = [
  {
    id: 1,
    title: "فيلا كراون الفاخرة",
    location: "التجمع الخامس، القاهرة الجديدة",
    category: "فيلات",
    description: "فيلا مستقلة بتصميم عصري فائق الفخامة، تتميز بمسبح خاص وحديقة واسعة مع إطلالة بانورامية لا تُنسى.",
    price: "25,000,000 ج.م",
    stats: { beds: 5, baths: 6, area: "850 م²" },
    images: ["/projects/project-1.png", "/projects/project-2.png", "/projects/project-3.png"],
    featured: true, 
  },
  {
    id: 2,
    title: "بنتهاوس سكاي لاين",
    location: "الشيخ زايد",
    category: "شقق",
    description: "بنتهاوس فاخر في أعلى نقطة بالمدينة، تشطيبات ألترا سوبر لوكس مع تراس ضخم وحمام سباحة علوي.",
    price: "12,500,000 ج.م",
    stats: { beds: 3, baths: 3, area: "320 م²" },
    images: ["/projects/project-4.png", "/projects/project-5.png", "/projects/project-6.png"],
    featured: false,
  },
  {
    id: 3,
    title: "مقر إداري برستيج",
    location: "العاصمة الإدارية الجديدة",
    category: "تجاري",
    description: "مساحة مكتبية ذكية في قلب حي المال والأعمال، مجهزة بأحدث التقنيات وبنية تحتية متطورة للشركات الكبرى.",
    price: "8,000,000 ج.م",
    stats: { beds: 0, baths: 2, area: "150 م²" },
    images: ["/projects/project-7.png", "/projects/project-8.png", "/projects/project-9.png"],
    featured: false,
  },
  {
    id: 4,
    title: "تاون هاوس الزمرد",
    location: "المستقبل سيتي",
    category: "فيلات",
    description: "تاون هاوس بتصميم مودرن وسط مساحات خضراء شاسعة، مثالي للعائلات التي تبحث عن الهدوء والرقي.",
    price: "15,000,000 ج.م",
    stats: { beds: 4, baths: 4, area: "400 م²" },
    images: ["/projects/project-10.png", "/projects/project-11.png", "/projects/project-12.png"],
    featured: false,
  },
  {
    id: 5,
    title: "شاليه لاجونا المائي",
    location: "الساحل الشمالي",
    category: "شاليهات",
    description: "شاليه صف أول على اللاجونا الكريستالية، يجمع بين الفخامة والهدوء في واحدة من أرقى قرى الساحل.",
    price: "9,500,000 ج.م",
    stats: { beds: 2, baths: 2, area: "120 م²" },
    images: ["/projects/project-13.png", "/projects/project-14.png"],
    featured: true, 
  },
  {
    id: 6,
    title: "دوبلكس جاردن",
    location: "أكتوبر بارك",
    category: "شقق",
    description: "شقة دوبلكس بحديقة خاصة ومدخل مستقل، توفر خصوصية تامة وتصميم داخلي يستغل المساحات بعبقرية.",
    price: "11,000,000 ج.م",
    stats: { beds: 4, baths: 3, area: "280 م²" },
    images: ["/projects/project-15.png", "/projects/project-16.png", "/projects/project-17.png"],
    featured: false,
  },
  {
    id: 7,
    title: "توين هاوس الكرمة",
    location: "التجمع الأول",
    category: "فيلات",
    description: "توين هاوس بتشطيبات كلاسيكية راقية في كمبوند متكامل الخدمات مع نادي اجتماعي ومناطق ترفيهية.",
    price: "18,000,000 ج.م",
    stats: { beds: 5, baths: 5, area: "500 م²" },
    images: ["/projects/project-18.png", "/projects/project-19.png", "/projects/project-20.png"],
    featured: false,
  },
  {
    id: 8,
    title: "قصر الأندلس",
    location: "المنصورية",
    category: "فيلات",
    description: "قصر فائق الفخامة بتصميم أندلسي عريق، يمتد على مساحة شاسعة مع حدائق غناء ونوافير مذهلة.",
    price: "75,000,000 ج.م",
    stats: { beds: 8, baths: 10, area: "2500 م²" },
    images: ["/projects/project-8.png", "/projects/project-9.png", "/projects/project-10.png"],
    featured: true, 
  }
];

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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-navy-deeper/95 backdrop-blur-xl" />

      <div
        className="relative z-10 w-full max-w-6xl h-full md:h-[85vh] flex flex-col md:flex-row glass-card-dark rounded-3xl overflow-hidden shadow-2xl border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 left-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-primary transition-colors z-50"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        {/* Left Side: Images */}
        <div className="relative w-full md:w-2/3 h-[50vh] md:h-full bg-black">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease }}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${project.images[current]}')` }}
            />
          </AnimatePresence>

          {total > 1 && (
            <>
              <button onClick={prev} className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-primary transition-colors">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              </button>
              <button onClick={next} className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-primary transition-colors">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
              </button>
            </>
          )}
          
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-md rounded-full px-4 py-1.5 text-white text-xs font-body tracking-widest">
            {current + 1} / {total}
          </div>
        </div>

        {/* Right Side: Info */}
        <div className="w-full md:w-1/3 p-8 flex flex-col h-[50vh] md:h-full overflow-y-auto custom-scrollbar bg-navy-dark">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-primary/20 text-primary text-xs font-bold rounded-full">{project.category}</span>
            <span className="flex items-center gap-1 text-white/50 text-xs">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
              {project.location}
            </span>
          </div>

          <h3 className="text-3xl font-bold text-white mb-2">{project.title}</h3>
          <p className="text-primary text-2xl font-bold mb-6 font-body">{project.price}</p>
          
          <p className="text-white/60 leading-relaxed text-sm mb-8 pb-8 border-b border-white/10">
            {project.description}
          </p>

          <div className="grid grid-cols-3 gap-4 mb-8">
             <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-white/5 border border-white/5">
                <svg className="w-6 h-6 text-primary mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6.75h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21" /></svg>
                <span className="text-white font-bold">{project.stats.beds}</span>
                <span className="text-white/40 text-xs">غرف</span>
             </div>
             <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-white/5 border border-white/5">
                <svg className="w-6 h-6 text-primary mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.79l.707-1.227m7.583-13.126l.707-1.227" /></svg>
                <span className="text-white font-bold">{project.stats.baths}</span>
                <span className="text-white/40 text-xs">حمامات</span>
             </div>
             <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-white/5 border border-white/5">
                <svg className="w-6 h-6 text-primary mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" /></svg>
                <span className="text-white font-bold font-body">{project.stats.area}</span>
                <span className="text-white/40 text-xs">مساحة</span>
             </div>
          </div>

          <div className="mt-auto">
             <Link href="/contact" className="w-full py-4 bg-primary text-navy-deeper font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-white transition-colors duration-300">
               <span>احجز الآن</span>
               <svg className="w-5 h-5 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" /></svg>
             </Link>
          </div>
        </div>
      </div>
    </motion.div>
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

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <>
      <main className="min-h-screen bg-navy-deeper selection:bg-primary/30 selection:text-white pb-20">
        <Navbar />

        {/* --- SECTION 1: HERO PARALLAX --- */}
        <section ref={heroRef} className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden pt-20">
          {!isMounted ? null : (
            <>
              <motion.div style={{ y, opacity }} className="absolute inset-0 w-full h-full">
                <div className="absolute inset-0 bg-[url('/projects/project-14.png')] bg-cover bg-center scale-110" />
                <div className="absolute inset-0 bg-navy-deeper/80 backdrop-blur-[2px]" />
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[150px] mix-blend-screen" />
              </motion.div>

          <div className="container-wide px-6 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease }}
            >
              <span className="inline-block py-1.5 px-4 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-6">
                Semsar Masr Properties
              </span>
              <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-black text-white leading-tight mb-6">
                اكتشف عقار <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#DFBA7F] via-primary to-[#A07B40]">أحلامك</span>
              </h1>
              <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
                مجموعة منتقاة من أفخم العقارات في مصر، مصممة لتلبية تطلعاتك وتوفير أسلوب حياة استثنائي.
              </p>
            </motion.div>
          </div>
          </>
          )}
        </section>

        {!isMounted ? null : (
        <>
        {/* --- SECTION 2: FEATURED CAROUSEL --- */}
        <section className="py-24 relative overflow-hidden bg-navy-dark">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/[0.03] rounded-full blur-[100px] pointer-events-none" />
          <div className="container-wide px-6 relative z-10">
            <SectionHeader subtitle="Featured Masterpieces" title="المشاريع الاستثنائية" />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
               {featuredProjects.map((project, i) => (
                  <div 
                    key={project.id}
                    className="group cursor-pointer relative overflow-hidden rounded-[2rem] aspect-[4/5] lg:aspect-auto lg:h-[500px]"
                    onClick={() => setSelectedProject(project)}
                  >
                     <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110" style={{ backgroundImage: `url('${project.images[0]}')` }} />
                     <div className="absolute inset-0 bg-gradient-to-t from-navy-deeper via-navy-deeper/50 to-transparent opacity-90" />
                     
                     <div className="absolute inset-x-0 top-0 p-6 flex justify-between items-start z-10">
                        <span className="px-3 py-1 bg-primary text-navy-deeper font-bold text-xs rounded-full shadow-[0_0_15px_rgba(191,154,95,0.5)]">
                          مميز
                        </span>
                        <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                           <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                        </div>
                     </div>

                     <div className="absolute inset-x-0 bottom-0 p-8 z-10">
                        <span className="text-primary/80 text-xs font-bold tracking-widest mb-2 block">{project.category}</span>
                        <h3 className="text-3xl font-bold text-white mb-2 leading-tight group-hover:text-primary transition-colors">{project.title}</h3>
                        <p className="text-white/60 text-sm mb-4 line-clamp-2">{project.description}</p>
                        <p className="text-white font-bold text-xl font-body">{project.price}</p>
                     </div>
                  </div>
               ))}
            </div>
          </div>
        </section>

        {/* --- SECTION 3: ALL PROJECTS (CLEAN GRID) --- */}
        <section className="py-24 relative bg-navy-deeper">
           <div className="container-wide px-6">
              <SectionHeader subtitle="Explore Properties" title="تصفح جميع العقارات" />

              {/* STICKY FILTER BAR */}
              <div className="sticky top-20 z-40 w-full mb-12 flex justify-center">
                 <div className="inline-flex overflow-x-auto custom-scrollbar bg-navy-dark/90 backdrop-blur-xl p-2 rounded-full border border-white/10 shadow-2xl">
                    {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                        activeCategory === cat
                            ? "bg-primary text-navy-deeper shadow-[0_0_15px_rgba(191,154,95,0.4)]"
                            : "text-white/60 hover:text-white hover:bg-white/5"
                        }`}
                    >
                        {cat}
                    </button>
                    ))}
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filtered.map((project, i) => (
                  <div
                      key={project.id}
                      className="group cursor-pointer bg-navy-dark rounded-3xl overflow-hidden border border-white/5 hover:border-primary/30 transition-colors shadow-lg flex flex-col"
                      onClick={() => setSelectedProject(project)}
                  >
                      {/* Image Top Half */}
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                            style={{ backgroundImage: `url('${project.images[0]}')` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy-dark to-transparent opacity-80" />
                        
                        <div className="absolute top-4 right-4">
                           <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[11px] text-white border border-white/20">
                              {project.category}
                           </span>
                        </div>
                      </div>

                      {/* Info Bottom Half */}
                      <div className="p-6 md:p-8 flex-1 flex flex-col">
                         <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                         <p className="text-white/50 text-sm mb-4 flex items-center gap-1">
                           <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
                           {project.location}
                         </p>
                         
                         <div className="flex gap-4 mb-6 text-white/70 text-sm border-t border-white/5 pt-4">
                            <span className="flex items-center gap-1">🛏️ {project.stats.beds}</span>
                            <span className="flex items-center gap-1">🛁 {project.stats.baths}</span>
                            <span className="flex items-center gap-1">📐 {project.stats.area}</span>
                         </div>

                         <div className="mt-auto flex items-center justify-between">
                            <span className="text-white font-bold text-lg font-body">{project.price}</span>
                            <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-navy-deeper transition-colors">
                               <svg className="w-4 h-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                            </div>
                         </div>
                      </div>
                  </div>
                  ))}
              </div>
           </div>
        </section>

        {/* --- SECTION 4: INVESTMENT BENEFITS --- */}
        <section className="py-24 relative bg-navy-dark overflow-hidden">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/[0.02] rounded-full blur-[100px] pointer-events-none" />
           
           <div className="container-wide px-6 relative z-10">
              <SectionHeader subtitle="Why Semsar Masr" title="لماذا تستثمر عن طريقنا؟" />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                 <div className="glass-card-dark p-8 rounded-3xl border border-white/5 text-center group hover:border-primary/30 transition-colors">
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:bg-primary/20">
                      <svg className="w-8 h-8 text-primary drop-shadow-[0_0_10px_rgba(191,154,95,0.5)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">أعلى عائد استثماري</h3>
                    <p className="text-white/60 text-sm leading-relaxed">ننتقي لك المشاريع التي تضمن زيادة مستمرة في القيمة الرأسمالية وأعلى عائد إيجاري في السوق.</p>
                 </div>
                 
                 <div className="glass-card-dark p-8 rounded-3xl border border-white/5 text-center group hover:border-primary/30 transition-colors">
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:bg-primary/20">
                      <svg className="w-8 h-8 text-primary drop-shadow-[0_0_10px_rgba(191,154,95,0.5)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">تسهيلات في السداد</h3>
                    <p className="text-white/60 text-sm leading-relaxed">نمتلك شراكات مع كبار المطورين توفر لعملائنا خطط سداد حصرية ومرنة تمتد لسنوات طويلة بدون فوائد.</p>
                 </div>

                 <div className="glass-card-dark p-8 rounded-3xl border border-white/5 text-center group hover:border-primary/30 transition-colors">
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:bg-primary/20">
                      <svg className="w-8 h-8 text-primary drop-shadow-[0_0_10px_rgba(191,154,95,0.5)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">استشارات مجانية</h3>
                    <p className="text-white/60 text-sm leading-relaxed">مستشارونا العقاريون في خدمتك دائماً لتقديم نصائح مبنية على بيانات دقيقة دون أي رسوم إضافية.</p>
                 </div>
              </div>
           </div>
        </section>

        {/* --- SECTION 5: CTA --- */}
        <section className="py-24 relative">
           <div className="container-wide px-6 relative z-10 text-center">
              <div 
                className="max-w-5xl mx-auto glass-card-dark rounded-[3rem] p-12 md:p-20 border border-primary/20 relative overflow-hidden shadow-glow"
              >
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-60 animate-pulse-slow" />
                
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 relative z-10">
                  هل تبحث عن <span className="text-primary italic">عقار محدد؟</span>
                </h2>
                <p className="text-white/60 mb-10 max-w-xl mx-auto leading-relaxed relative z-10">
                  تواصل معنا الآن، وسيقوم أحد مستشارينا بالبحث في قاعدة بياناتنا الواسعة للعثور على العقار الذي يطابق مواصفاتك تماماً.
                </p>
                
                <Link href="/contact" className="relative z-10 inline-flex items-center justify-center gap-3 px-10 py-5 bg-primary text-navy-deeper font-bold rounded-full overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(191,154,95,0.4)] group">
                  <span className="relative z-10 text-[16px]">احجز استشارتك المجانية</span>
                  <div className="relative z-10 w-8 h-8 rounded-full bg-navy-deeper/10 flex items-center justify-center transition-colors group-hover:bg-navy-deeper/20">
                    <svg className="w-4 h-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                    </svg>
                  </div>
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
