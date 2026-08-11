"use client";

import { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { FiMaximize, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export default function VideoPlayer({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  return (
    <>
      <div 
        className="w-full h-full relative group cursor-pointer" 
        onClick={() => setIsModalOpen(true)}
      >
        <video
          ref={videoRef}
          src={src}
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
          <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(197,160,89,0.5)]">
            <FiMaximize className="text-white drop-shadow-md" size={28} />
          </div>
        </div>
      </div>

      {mounted && createPortal(
        <AnimatePresence>
          {isModalOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[99999] flex items-center justify-center p-4 md:p-8 lg:p-12 bg-[#090909]/95 backdrop-blur-lg"
            >
              <motion.div 
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative w-full max-w-6xl aspect-video bg-[#111111] rounded-3xl overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.8)] border border-white/10"
              >
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-black/60 flex items-center justify-center text-white/80 hover:text-white hover:bg-primary transition-all duration-300 backdrop-blur-md hover:rotate-90 hover:scale-110"
                >
                  <FiX size={24} />
                </button>
                
                <video
                  src={src}
                  className="w-full h-full object-cover"
                  autoPlay
                  controls
                  playsInline
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
