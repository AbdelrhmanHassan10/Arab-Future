"use client";

import { useState, useRef, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function CustomSelect({
  options,
  value,
  onChange,
  placeholder = "الكل",
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full text-right" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between border border-white/10 px-4 py-2.5 text-sm text-white focus:ring-2 focus:ring-primary/40 outline-none transition-all ${
          isOpen ? "bg-[#1c1c1c] rounded-t-xl rounded-b-none border-b-0" : "bg-white/5 rounded-xl"
        }`}
      >
        <span className={!selectedOption ? "text-white" : "text-white"}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <FiChevronDown className="text-white/50" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="w-full bg-[#1c1c1c] border border-white/10 border-t-0 rounded-b-xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.7)] z-50"
          >
            <ul className="max-h-60 overflow-y-auto custom-scrollbar">
              <li
                onClick={() => {
                  onChange("");
                  setIsOpen(false);
                }}
                className={`px-4 py-2.5 text-sm cursor-pointer transition-colors ${
                  value === ""
                    ? "bg-primary/20 text-primary font-bold"
                    : "text-white/80 hover:bg-white/5 hover:text-white"
                }`}
              >
                {placeholder}
              </li>
              {options.map((opt) => (
                <li
                  key={opt.value}
                  onClick={() => {
                    onChange(opt.value);
                    setIsOpen(false);
                  }}
                  className={`px-4 py-2.5 text-sm cursor-pointer transition-colors ${
                    value === opt.value
                      ? "bg-primary/20 text-primary font-bold"
                      : "text-white/80 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {opt.label}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
