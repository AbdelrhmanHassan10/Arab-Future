"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";

interface GalleryImage {
  src: string;
  title: string;
  category: string;
}

const galleryImages: GalleryImage[] = [
  // عمارات سكنية
  { src: "/gallery/gallery-1.png", title: "عمارة سكنية — واجهة كلاسيكية", category: "سكني" },
  { src: "/gallery/gallery-2.png", title: "عمارة سكنية — تصميم فاخر", category: "سكني" },
  { src: "/gallery/gallery-3.png", title: "واجهة سكنية — نيوكلاسيك", category: "سكني" },
  { src: "/gallery/gallery-4.png", title: "عمارة — أعمدة وبلكونات", category: "سكني" },
  { src: "/gallery/gallery-5.png", title: "واجهة سكنية — تفاصيل زخرفية", category: "سكني" },
  { src: "/gallery/gallery-6.png", title: "مبنى سكني — واجهة GRC", category: "سكني" },
  { src: "/gallery/gallery-7.png", title: "عمارة — كرانيش وحليات", category: "سكني" },

  // قصور
  { src: "/gallery/gallery-8.png", title: "قصر فاخر — واجهة رئيسية", category: "قصور" },
  { src: "/gallery/gallery-9.png", title: "قصر — تفاصيل زخرفية", category: "قصور" },
  { src: "/gallery/gallery-10.png", title: "قصر — أعمدة وتيجان", category: "قصور" },

  // كلاسيك
  { src: "/gallery/gallery-11.png", title: "واجهة كلاسيكية راقية", category: "كلاسيك" },
  { src: "/gallery/gallery-12.png", title: "تصميم كلاسيكي — واجهة فاخرة", category: "كلاسيك" },
  { src: "/gallery/gallery-13.png", title: "واجهة — طراز كلاسيكي فاخر", category: "كلاسيك" },

  // زخرفي
  { src: "/gallery/gallery-14.png", title: "وحدات زخرفية — تفاصيل دقيقة", category: "زخرفي" },
  { src: "/gallery/gallery-15.png", title: "زخارف واجهات — حرفية عالية", category: "زخرفي" },

  // كمبوند السولو
  { src: "/gallery/gallery-16.png", title: "كمبوند السولو — واجهة رئيسية", category: "مجمعات" },
  { src: "/gallery/gallery-17.png", title: "كمبوند السولو — تفاصيل", category: "مجمعات" },
  { src: "/gallery/gallery-18.png", title: "كمبوند السولو — تصميم عصري", category: "مجمعات" },

  // كمبوند لانوفا فيستا
  { src: "/gallery/gallery-19.png", title: "لانوفا فيستا — واجهة فاخرة", category: "مجمعات" },
  { src: "/gallery/gallery-20.png", title: "لانوفا فيستا — تصميم كلاسيكي", category: "مجمعات" },
  { src: "/gallery/gallery-21.png", title: "لانوفا فيستا — تفاصيل معمارية", category: "مجمعات" },
  { src: "/gallery/gallery-22.png", title: "لانوفا فيستا — واجهات متعددة", category: "مجمعات" },

  // معرض عام
  { src: "/gallery/gallery-23.png", title: "مشروع معماري — تصميم مميز", category: "أعمال متنوعة" },
  { src: "/gallery/gallery-24.png", title: "واجهة — تنفيذ احترافي", category: "أعمال متنوعة" },
  { src: "/gallery/gallery-25.png", title: "مشروع — تفاصيل معمارية", category: "أعمال متنوعة" },
  { src: "/gallery/gallery-26.png", title: "تصميم وتنفيذ — جودة عالية", category: "أعمال متنوعة" },
];

const categories = ["الكل", "سكني", "قصور", "كلاسيك", "زخرفي", "مجمعات", "أعمال متنوعة"];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("الكل");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered =
    activeCategory === "الكل"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

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
    <main className="min-h-screen bg-navy-deeper">
      <Navbar />
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[150px] pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
        </div>

        <div className="relative pt-32 pb-16 pad-x">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-white/40 text-sm hover:text-primary transition-colors duration-400 mb-10"
              >
                <svg className="w-4 h-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                </svg>
                <span>الرئيسية</span>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <span className="text-caption uppercase text-primary font-medium tracking-widest">
                معرض الأعمال
              </span>
              <h1 className="text-[clamp(2rem,4vw,3.5rem)] font-bold text-white mt-4">
                أعمالنا بالصور
              </h1>
              <p className="text-white/35 text-subhead font-light mt-4 max-w-xl mx-auto">
                استعرض مشاريعنا المنجزة واكتشف دقة التنفيذ وجمال التصميم في كل مشروع
              </p>
              <div className="mt-6 text-white/20 text-sm">
                {galleryImages.length} صورة
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="pad-x">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-2 mb-12"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 text-[13px] rounded-full transition-all duration-500 ${
                  activeCategory === cat
                    ? "bg-primary text-white shadow-glow"
                    : "bg-white/[0.06] text-white/50 border border-white/[0.08] hover:bg-white/[0.1] hover:text-white/80 backdrop-blur-sm"
                }`}
              >
                {cat}
                {cat !== "الكل" && (
                  <span className="mr-1.5 text-[11px] opacity-50">
                    ({galleryImages.filter(img => img.category === cat).length})
                  </span>
                )}
              </button>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Gallery Grid - Masonry */}
      <div className="pad-x pb-20">
        <div className="container-wide">
          <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-5 space-y-5">
            <AnimatePresence mode="popLayout">
              {filtered.map((image, i) => (
                <motion.div
                  key={image.src}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.03,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="group cursor-pointer break-inside-avoid"
                  onClick={() => setLightbox(i)}
                >
                  <div className="relative overflow-hidden rounded-[20px] bg-white/[0.04] border border-white/[0.06] hover:border-primary/20 transition-all duration-500">
                    <Image
                      src={image.src}
                      alt={image.title}
                      width={600}
                      height={400}
                      className="w-full h-auto object-cover transition-transform duration-[1.2s] ease-expo-out group-hover:scale-105"
                      unoptimized
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-deeper/90 via-navy-deeper/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-5">
                      <div>
                        <span className="inline-block px-3 py-1 bg-primary/20 backdrop-blur-sm rounded-full text-[10px] text-primary font-medium mb-2 border border-primary/20">
                          {image.category}
                        </span>
                        <h3 className="text-white font-semibold text-sm">
                          {image.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && filtered[lightbox] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center"
            onClick={() => setLightbox(null)}
          >
            {/* Close */}
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-6 left-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all duration-300 z-10"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Nav arrows */}
            {lightbox > 0 && (
              <button
                onClick={(e) => { e.stopPropagation(); setLightbox(lightbox - 1); }}
                className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all duration-300 z-10"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>
            )}
            {lightbox < filtered.length - 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); setLightbox(lightbox + 1); }}
                className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all duration-300 z-10"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            )}

            {/* Image */}
            <motion.div
              key={lightbox}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-[90vw] max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={filtered[lightbox].src}
                alt={filtered[lightbox].title}
                width={1400}
                height={900}
                className="max-w-full max-h-[85vh] object-contain rounded-[16px]"
                unoptimized
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent rounded-b-[16px]">
                <span className="text-primary text-xs font-medium">
                  {filtered[lightbox].category}
                </span>
                <h3 className="text-white font-semibold mt-1">
                  {filtered[lightbox].title}
                </h3>
                <span className="text-white text-xs mt-1 block">
                  {lightbox + 1} / {filtered.length}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
