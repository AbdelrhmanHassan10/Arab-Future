"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { getImageUrl } from "@/lib/config";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiChevronRight, FiChevronLeft, FiMaximize2 } from "react-icons/fi";

export default function ImageGallery({ images, title }: { images: string[], title: string }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  if (!images || images.length === 0) return null;

  const openLightbox = (index: number) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);
  
  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev !== null ? (prev === images.length - 1 ? 0 : prev + 1) : null));
  };
  
  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev !== null ? (prev === 0 ? images.length - 1 : prev - 1) : null));
  };

  return (
    <div className="space-y-8 pt-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h3 className="text-3xl font-bold text-white mb-2 flex items-center gap-4">
            <span className="w-3 h-3 rounded-full bg-primary shadow-[0_0_10px_rgba(191,154,95,0.8)]" />
            معرض الصور
          </h3>
          <p className="text-white/50 font-light text-lg">تصفح أدق تفاصيل التشطيب والديكور في هذا المشروع</p>
        </div>
        <button 
          onClick={() => openLightbox(0)}
          className="flex items-center gap-2 text-primary bg-primary/10 hover:bg-primary/20 px-5 py-2.5 rounded-full transition-colors text-sm font-bold border border-primary/20"
        >
          <FiMaximize2 />
          عرض كل الصور ({images.length})
        </button>
      </div>
      
      {/* Premium Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-3 md:gap-4 h-[50vh] md:h-[65vh]">
        {/* Main large image */}
        <motion.div 
          onClick={() => openLightbox(0)}
          className={`relative group cursor-pointer overflow-hidden rounded-2xl md:rounded-3xl shadow-lg border border-white/5 ${images.length > 1 ? 'md:col-span-2 md:row-span-2' : 'md:col-span-4 md:row-span-2'}`}
        >
          <Image 
            src={getImageUrl(images[0], 0)} alt={`${title} 1`} fill
            className="object-cover transition-transform duration-[2s] group-hover:scale-105" 
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
        </motion.div>

        {/* Smaller images */}
        {images.slice(1, 5).map((img, i) => {
          const isLast = i === 3;
          const hasMore = images.length > 5;
          const actualIndex = i + 1;
          
          let spanClass = "md:col-span-1 md:row-span-1";
          if (images.length === 2) spanClass = "md:col-span-2 md:row-span-2";
          else if (images.length === 3) spanClass = "md:col-span-2 md:row-span-1";
          else if (images.length === 4 && i === 2) spanClass = "md:col-span-2 md:row-span-1";

          return (
            <motion.div 
              key={actualIndex}
              onClick={() => openLightbox(actualIndex)}
              className={`relative group cursor-pointer overflow-hidden rounded-2xl md:rounded-3xl shadow-lg border border-white/5 hidden md:block ${spanClass}`}
            >
              <Image 
                src={getImageUrl(img, actualIndex)} alt={`${title} ${actualIndex + 1}`} fill
                className="object-cover transition-transform duration-[2s] group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
              
              {isLast && hasMore && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center transition-all duration-300 group-hover:bg-black/50">
                  <span className="text-white text-3xl font-light">+{images.length - 5}</span>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {selectedIndex !== null && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[99999] bg-[#050505]/95 backdrop-blur-xl flex items-center justify-center"
              onClick={closeLightbox}
            >
              {/* Top Bar */}
              <div className="absolute top-0 inset-x-0 p-6 flex justify-between items-center z-[110] bg-gradient-to-b from-black/80 to-transparent">
                <div className="text-white font-medium text-lg tracking-widest">{selectedIndex + 1} / {images.length}</div>
                <button 
                  onClick={closeLightbox}
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors backdrop-blur-md"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation Arrows */}
              {images.length > 1 && (
                <>
                  <button 
                    onClick={prevImage}
                    className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center rounded-full bg-black/50 hover:bg-primary text-white border border-white/10 hover:border-primary transition-all z-[110]"
                  >
                    <FiChevronRight className="w-8 h-8" />
                  </button>
                  <button 
                    onClick={nextImage}
                    className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center rounded-full bg-black/50 hover:bg-primary text-white border border-white/10 hover:border-primary transition-all z-[110]"
                  >
                    <FiChevronLeft className="w-8 h-8" />
                  </button>
                </>
              )}

              {/* Main Image Container */}
              <div 
                className="relative w-full h-full p-4 md:p-20 flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <motion.div
                  key={selectedIndex}
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="relative w-full max-w-6xl h-full max-h-[85vh] rounded-xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]"
                >
                  <Image 
                    src={getImageUrl(images[selectedIndex], selectedIndex)} 
                    alt={`${title} ${selectedIndex + 1}`} 
                    fill
                    className="object-contain" 
                    priority
                  />
                </motion.div>
              </div>
              
              {/* Thumbnails (Optional Desktop feature) */}
              <div className="absolute bottom-6 inset-x-0 hidden md:flex justify-center gap-2 z-[110]">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => { e.stopPropagation(); setSelectedIndex(idx); }}
                    className={`relative w-16 h-12 rounded-md overflow-hidden transition-all ${selectedIndex === idx ? 'ring-2 ring-primary scale-110' : 'opacity-40 hover:opacity-100'}`}
                  >
                    <Image src={getImageUrl(img, idx)} alt={`thumb ${idx}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}
