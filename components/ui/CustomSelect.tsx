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
        className={`w-full flex items-center justify-between border border-gray-200 px-4 py-2.5 text-sm text-[#082b26] focus:ring-2 focus:ring-[#148968]/40 outline-none transition-all ${
          isOpen ? "bg-white rounded-t-xl rounded-b-none border-b-0" : "bg-gray-50 rounded-xl"
        }`}
      >
        <span className="text-[#082b26]">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <FiChevronDown className="text-gray-400" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 w-full bg-white border border-gray-200 border-t-0 rounded-b-xl overflow-hidden shadow-lg z-50"
          >
            <ul className="max-h-60 overflow-y-auto custom-scrollbar">
              <li
                onClick={() => {
                  onChange("");
                  setIsOpen(false);
                }}
                className={`px-4 py-2.5 text-sm cursor-pointer transition-colors ${
                  value === ""
                    ? "bg-[#148968]/10 text-[#148968] font-bold"
                    : "text-gray-700 hover:bg-gray-50 hover:text-[#082b26]"
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
                      ? "bg-[#148968]/10 text-[#148968] font-bold"
                      : "text-gray-700 hover:bg-gray-50 hover:text-[#082b26]"
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
