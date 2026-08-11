"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const isFirst = useRef(true);

  useEffect(() => {
    // Only trigger the Palace Gates transition on actual navigation, 
    // to avoid any hydration mismatches on the very first server load.
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }

    setIsLoading(true);
    // Allow time for the doors to close, show the logo, then open
    const timer = setTimeout(() => setIsLoading(false), 1400);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="premium-gates"
            className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden pointer-events-none"
          >
            {/* Left Door */}
            <motion.div
              className="absolute top-0 left-0 w-1/2 h-full bg-navy-deeper border-r border-primary/20 pointer-events-auto shadow-[10px_0_30px_rgba(0,0,0,0.5)]"
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            />
            
            {/* Right Door */}
            <motion.div
              className="absolute top-0 right-0 w-1/2 h-full bg-navy-deeper border-l border-primary/20 pointer-events-auto shadow-[-10px_0_30px_rgba(0,0,0,0.5)]"
              initial={{ x: "100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            />

            {/* Center Content (Logo and Welcome) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.2, filter: "blur(10px)" }}
              transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
              className="relative z-10 flex flex-col items-center pointer-events-auto"
            >
              {/* Glowing background behind logo */}
              <div className="absolute inset-0 w-[200px] h-[200px] bg-primary/20 rounded-full blur-[60px] -z-10 flex items-center justify-center" />
              
              <div className="relative w-56 h-24 mb-4">
                <Image
                  src="/samsar_horizontal_transparent.png"
                  alt="سمسار بني سويف"
                  fill
                  className="object-contain drop-shadow-[0_0_15px_rgba(191,154,95,0.4)]"
                  priority
                />
              </div>
              <div className="overflow-hidden">
                <motion.h2 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="text-white font-bold text-2xl tracking-wide mb-1"
                >
                  سمسار بني سويف
                </motion.h2>
                <motion.p 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="text-primary text-[11px] tracking-[0.4em] uppercase font-bold"
                >
                  Premium Real Estate
                </motion.p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page content */}
      <motion.div
        key={pathname}
        initial={{ opacity: 0, filter: "blur(5px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        {children}
      </motion.div>
    </>
  );
}
