"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const isFirst = useRef(true);
  const isMobile = useRef(false);

  useEffect(() => {
    isMobile.current = window.innerWidth < 768;
  }, []);

  useEffect(() => {
    // Skip transition on first load
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }

    // Simpler transition on mobile
    if (isMobile.current) return;

    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      {/* Curtain overlay - desktop only */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="curtain"
            className="fixed inset-0 z-[200] flex items-center justify-center bg-navy-deeper"
            initial={{ clipPath: "circle(0% at 50% 50%)" }}
            animate={{ clipPath: "circle(150% at 50% 50%)" }}
            exit={{ opacity: 0 }}
            transition={{
              clipPath: { duration: 0.6, ease: [0.87, 0, 0.13, 1] },
              opacity: { duration: 0.4, delay: 0.1 },
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center gap-4"
            >
              <div className="relative w-12 h-12">
                <motion.div
                  animate={{ rotate: [0, 180, 360] }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                  className="absolute inset-0 border-[1.5px] border-primary rotate-45"
                />
                <motion.div
                  animate={{ rotate: [45, 225, 405] }}
                  transition={{ duration: 1.2, ease: "easeInOut", delay: 0.1 }}
                  className="absolute inset-[5px] border-[1.5px] border-white/20 rotate-45"
                />
              </div>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 48 }}
                transition={{ delay: 0.3, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="h-[2px] bg-primary rounded-full"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page content */}
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </>
  );
}
