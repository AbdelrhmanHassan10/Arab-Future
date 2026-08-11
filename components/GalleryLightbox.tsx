"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiChevronRight, FiChevronLeft, FiMaximize } from "react-icons/fi";

export default function GalleryLightbox({ images }: { images: string[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((img, idx) => (
          <div 
            key={idx} 
            onClick={() => openLightbox(idx)}
            className="h-32 rounded-xl overflow-hidden group relative cursor-pointer shadow-[0_10px_30px_rgba(0,0,0,0.3)] border border-white/5"
          >
            <img src={img} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100" />
            <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
              <div className="w-10 h-10 rounded-full bg-black/50 flex items-center justify-center">
                <FiMaximize className="text-white drop-shadow-md" size={18} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {mounted && createPortal(
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#090909]/95 backdrop-blur-xl"
            >
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 z-50 w-12 h-12 rounded-full bg-black/50 flex items-center justify-center text-white/80 hover:text-white hover:bg-primary transition-all duration-300 backdrop-blur-md"
              >
                <FiX size={24} />
              </button>

              {images.length > 1 && (
                <>
                  <button 
                    onClick={prevImage}
                    className="absolute left-4 md:left-10 z-50 w-14 h-14 rounded-full bg-black/50 flex items-center justify-center text-white/80 hover:text-white hover:bg-primary transition-all duration-300 backdrop-blur-md"
                  >
                    <FiChevronRight size={32} />
                  </button>

                  <button 
                    onClick={nextImage}
                    className="absolute right-4 md:right-10 z-50 w-14 h-14 rounded-full bg-black/50 flex items-center justify-center text-white/80 hover:text-white hover:bg-primary transition-all duration-300 backdrop-blur-md"
                  >
                    <FiChevronLeft size={32} />
                  </button>
                </>
              )}

              <motion.div 
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.9, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9, x: -20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative w-full max-w-5xl max-h-[85vh] p-4 flex items-center justify-center"
              >
                <img 
                  src={images[currentIndex]} 
                  alt={`Gallery Full ${currentIndex + 1}`} 
                  className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-[0_20px_100px_rgba(0,0,0,0.8)] border border-white/10"
                />
              </motion.div>
              
              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-6 py-3 bg-black/40 backdrop-blur-md rounded-full border border-white/10">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`w-12 h-12 rounded-lg overflow-hidden transition-all duration-300 ${idx === currentIndex ? 'ring-2 ring-primary scale-110 opacity-100' : 'opacity-50 hover:opacity-80'}`}
                    >
                      <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
