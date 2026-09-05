"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface GalleryImage {
  src: string;
  title: string;
  category: string;
}

const galleryImages: GalleryImage[] = [
  // فلل فاخرة
  { src: "/projects/project-1.png", title: "فيلا كراون الفخمة — واجهة خارجية", category: "فلل فاخرة" },
  { src: "/projects/project-2.png", title: "فيلا كراون — مسبح خاص", category: "فلل فاخرة" },
  { src: "/projects/project-3.png", title: "فيلا كراون — حديقة بانورامية", category: "فلل فاخرة" },
  { src: "/projects/project-10.png", title: "تاون هاوس الزمرد", category: "فلل فاخرة" },
  { src: "/projects/project-11.png", title: "فيلا بحديقة واسعة", category: "فلل فاخرة" },
  { src: "/projects/project-12.png", title: "تصميم فيلا نيوكلاسيك", category: "فلل فاخرة" },
  { src: "/projects/project-18.png", title: "توين هاوس الكرمة", category: "فلل فاخرة" },

  // شقق فندقية
  { src: "/projects/project-4.png", title: "بنتهاوس سكاي لاين", category: "شقق فندقية" },
  { src: "/projects/project-5.png", title: "إطلالة بانورامية من التراس", category: "شقق فندقية" },
  { src: "/projects/project-6.png", title: "شقة فندقية ألترا مودرن", category: "شقق فندقية" },
  { src: "/projects/project-15.png", title: "دوبلكس جاردن", category: "شقق فندقية" },
  { src: "/projects/project-16.png", title: "دوبلكس جاردن — مدخل خاص", category: "شقق فندقية" },

  // مساحات تجارية
  { src: "/projects/project-7.png", title: "مقر إداري برستيج", category: "مساحات تجارية" },
  { src: "/projects/project-8.png", title: "مساحات عمل ذكية", category: "مساحات تجارية" },
  { src: "/projects/project-9.png", title: "واجهة المبنى الإداري", category: "مساحات تجارية" },

  // إطلالات
  { src: "/projects/project-13.png", title: "شاليه لاجونا المائي", category: "إطلالات بحرية" },
  { src: "/projects/project-14.png", title: "شاليه صف أول على اللاجونا", category: "إطلالات بحرية" },
  { src: "/projects/project-17.png", title: "إطلالة ساحرة وقت الغروب", category: "إطلالات بحرية" },

  // قصور
  { src: "/projects/project-20.png", title: "قصر الأندلس — تصميم عريق", category: "قصور" },
  { src: "/projects/project-19.png", title: "قصر الأندلس — نوافير", category: "قصور" },
];

const categories = ["الكل", "فلل فاخرة", "شقق فندقية", "مساحات تجارية", "إطلالات بحرية", "قصور"];

const ease = [0.16, 1, 0.3, 1] as const;

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("الكل");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const filtered = activeCategory === "الكل" ? galleryImages : galleryImages.filter((img) => img.category === activeCategory);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  // Handle Lightbox Keys
  useEffect(() => {
    if (lightbox === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowLeft" && lightbox < filtered.length - 1) setLightbox(lightbox + 1);
      if (e.key === "ArrowRight" && lightbox > 0) setLightbox(lightbox - 1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [lightbox, filtered.length]);

  return (
    <>
      <main className="min-h-screen bg-navy-deeper selection:bg-primary/30 selection:text-white pb-20">
        <Navbar />

        {/* --- HERO SECTION --- */}
        <section ref={heroRef} className="relative h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden pt-20">
          {!isMounted ? null : (
            <>
              <motion.div style={{ y, opacity }} className="absolute inset-0 w-full h-full">
                <div className="absolute inset-0 bg-[url('/projects/project-2.png')] bg-cover bg-center scale-110 opacity-30 mix-blend-luminosity" />
                <div className="absolute inset-0 bg-gradient-to-b from-navy-deeper via-navy-deeper/90 to-navy-deeper" />
                <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none" />
                <div className="absolute bottom-0 left-1/3 w-[300px] h-[300px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
              </motion.div>
            </>
          )}

          <div className="container-wide px-6 relative z-10 text-center">
            {!isMounted ? null : (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease }}
              >
                <span className="inline-block py-1.5 px-4 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-6 shadow-[0_0_15px_rgba(191,154,95,0.2)]">
                  Al-Fadl Gallery
                </span>
                <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] font-black text-white leading-tight mb-4">
                  جولة <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#DFBA7F] via-primary to-[#A07B40]">بصرية</span>
                </h1>
                <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
                  استكشف تفاصيل الرقي والفخامة في مجموعة منتقاة من أرقى عقارات مصر، حيث تلتقي دقة التنفيذ بجمال التصميم.
                </p>
                <div className="mt-8 text-primary/80 text-sm font-bold tracking-widest bg-white/5 inline-block px-6 py-2 rounded-full border border-white/5">
                  {galleryImages.length} لقطة حصرية
                </div>
              </motion.div>
            )}
          </div>
        </section>

        {!isMounted ? null : (
          <>
            {/* --- FILTER TABS --- */}
            <div className="sticky top-20 z-40 w-full mb-12 flex justify-center px-4">
              <div className="inline-flex overflow-x-auto custom-scrollbar bg-navy-dark/90 backdrop-blur-xl p-2 rounded-full border border-white/10 shadow-2xl">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${activeCategory === cat
                      ? "bg-primary text-navy-deeper shadow-[0_0_15px_rgba(191,154,95,0.4)]"
                      : "text-white/60 hover:text-white hover:bg-white/5"
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* --- GALLERY GRID --- */}
            <div className="pad-x pb-20">
              <div className="container-wide">
                <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
                  <AnimatePresence mode="popLayout">
                    {filtered.map((image, i) => (
                      <motion.div
                        key={image.src}
                        layout
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{
                          duration: 0.4,
                          ease,
                        }}
                        className="group cursor-pointer break-inside-avoid relative"
                        onClick={() => setLightbox(i)}
                      >
                        <div className="relative overflow-hidden rounded-3xl bg-navy-dark border border-white/5 hover:border-primary/30 transition-all duration-500 shadow-xl">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={image.src}
                            alt={image.title}
                            className="w-full h-auto object-cover transition-transform duration-[1.5s] ease-expo-out group-hover:scale-110"
                            loading="lazy"
                          />

                          {/* Premium Hover Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-navy-deeper via-navy-deeper/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                            <motion.div
                              initial={{ y: 20, opacity: 0 }}
                              whileInView={{ y: 0, opacity: 1 }}
                              className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500"
                            >
                              <span className="inline-block px-3 py-1 bg-primary/20 backdrop-blur-md rounded-full text-[11px] text-white border border-primary/30 mb-3 shadow-glow">
                                {image.category}
                              </span>
                              <h3 className="text-white font-bold text-lg leading-tight mb-2 group-hover:text-primary transition-colors">
                                {image.title}
                              </h3>
                              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white mt-4 border border-white/10 hover:bg-primary hover:text-navy-deeper transition-colors">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
                                </svg>
                              </div>
                            </motion.div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              </div>
            </div>
          </>
        )}

        <Footer />
      </main>

      {/* --- LIGHTBOX MODAL --- */}
      {isMounted && createPortal(
        <AnimatePresence>
          {lightbox !== null && filtered[lightbox] && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[100] bg-navy-deeper/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-8"
              onClick={() => setLightbox(null)}
            >
              <div
                className="relative z-10 w-full max-w-6xl h-full md:h-[85vh] flex flex-col md:flex-row glass-card-dark rounded-[2rem] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setLightbox(null)}
                  className="absolute top-4 left-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-primary transition-colors z-50"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Right Side: Image */}
                <div className="relative w-full md:w-2/3 h-[40vh] md:h-full flex-none bg-black/50">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={lightbox}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, ease }}
                      className="absolute inset-0 bg-contain bg-no-repeat bg-center"
                      style={{ backgroundImage: `url('${filtered[lightbox].src}')` }}
                    />
                  </AnimatePresence>

                  {filtered.length > 1 && (
                    <>
                      <button
                        onClick={(e) => { e.stopPropagation(); setLightbox(lightbox - 1); }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-primary transition-colors z-20"
                      >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); setLightbox(lightbox + 1); }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-primary transition-colors z-20"
                      >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                    </>
                  )}

                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-md rounded-full px-4 py-1.5 text-white text-xs font-bold tracking-widest z-20 flex gap-2" dir="ltr">
                    <bdi>{lightbox + 1} / {filtered.length}</bdi>
                    <span>صورة</span>
                  </div>
                </div>

                {/* Left Side: Info */}
                <div className="w-full md:w-1/3 p-4 md:p-8 flex flex-col flex-1 min-h-0 overflow-y-auto custom-scrollbar bg-navy-dark relative">
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

                  <div className="relative z-10 flex-1 flex flex-col">
                    <div className="mb-4 md:mb-6">
                      <span className="inline-block px-3 py-1 bg-primary/20 text-primary text-xs font-bold rounded-full mb-3 md:mb-4 border border-primary/20">
                        {filtered[lightbox].category}
                      </span>
                      <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                        {filtered[lightbox].title}
                      </h3>
                    </div>

                    <p className="text-white/60 leading-relaxed text-sm mb-4 md:mb-8 pb-4 md:pb-8 border-b border-white/5">
                      استكشف تفاصيل هذا العقار الفاخر وتعرّف على أرقى التصميمات المعمارية التي نقدمها لعملائنا في الفضل العقاريه.
                    </p>

                    <div className="mt-6 md:mt-8">
                      <div className="p-4 md:p-5 rounded-2xl bg-white/5 border border-white/5 mb-4 md:mb-6 text-center">
                        <p className="text-white/80 text-sm mb-1 md:mb-2">هل أعجبك هذا التصميم؟</p>
                        <p className="text-primary text-base font-bold">يمكننا توفيره لك.</p>
                      </div>

                      <Link href="/contact" className="w-full py-3.5 md:py-4 bg-primary text-navy-deeper text-sm md:text-base font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-white hover:shadow-[0_0_30px_rgba(191,154,95,0.4)] transition-all duration-300 group">
                        <span>تواصل للاستفسار</span>
                        <svg className="w-5 h-5 rotate-180 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
