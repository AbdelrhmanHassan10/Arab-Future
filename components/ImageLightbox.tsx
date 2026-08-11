"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";

export default function ImageLightbox({ children, src }: { children: React.ReactNode, src: string }) {
  const [isOpen, setIsOpen] = useState(false);
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

  return (
    <>
      <div onClick={() => setIsOpen(true)}>
        {children}
      </div>

      {mounted && createPortal(
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#090909]/95 backdrop-blur-xl p-4"
            >
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 z-50 w-12 h-12 rounded-full bg-black/50 flex items-center justify-center text-white/80 hover:text-white hover:bg-primary transition-all duration-300 backdrop-blur-md"
              >
                <FiX size={24} />
              </button>

              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative w-full max-w-5xl max-h-[90vh] flex items-center justify-center"
              >
                <img 
                  src={src} 
                  alt="Full Screen" 
                  className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-[0_20px_100px_rgba(0,0,0,0.8)] border border-white/10"
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
