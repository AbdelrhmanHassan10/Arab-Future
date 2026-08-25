"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiCheckCircle, FiAlertCircle, FiInfo } from "react-icons/fi";

type ToastType = "success" | "error" | "info";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: ToastType = "info") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000); // 4 seconds
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[9999] flex flex-col gap-3 pointer-events-none w-full max-w-sm px-4">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="pointer-events-auto bg-[#111111] border border-primary/30 shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-2xl p-4 flex items-center gap-4 w-full relative overflow-hidden"
              dir="rtl"
            >
              {/* Highlight bar */}
              <div className={`absolute right-0 top-0 bottom-0 w-1 ${toast.type === "success" ? "bg-green-500" : toast.type === "error" ? "bg-red-500" : "bg-primary"}`} />
              
              {/* Glow effect */}
              <div className={`absolute top-0 left-0 w-24 h-24 rounded-full blur-[30px] opacity-20 ${toast.type === "success" ? "bg-green-500" : toast.type === "error" ? "bg-red-500" : "bg-primary"}`} />
              
              <div className="relative z-10 shrink-0">
                {toast.type === "success" && <FiCheckCircle className="text-green-400 w-6 h-6 drop-shadow-[0_0_8px_rgba(74,222,128,0.5)]" />}
                {toast.type === "error" && <FiAlertCircle className="text-red-400 w-6 h-6 drop-shadow-[0_0_8px_rgba(248,113,113,0.5)]" />}
                {toast.type === "info" && <FiInfo className="text-primary w-6 h-6 drop-shadow-[0_0_8px_rgba(191,154,95,0.5)]" />}
              </div>
              <div className="relative z-10 text-white font-bold text-sm leading-relaxed font-body flex-1">
                {toast.message}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
