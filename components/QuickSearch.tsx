"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiMapPin, FiHome, FiDollarSign, FiMaximize, FiChevronDown } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { API_URL } from "@/lib/config";

// Reusable Custom Select Component
function CustomSelect({ 
  label, 
  icon: Icon, 
  value, 
  options, 
  onChange 
}: { 
  label: string, 
  icon: React.ElementType, 
  value: string, 
  options: { value: string, label: string }[], 
  onChange: (val: string) => void 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Click outside to close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value) || options[0];

  return (
    <div className="w-full md:flex-1 relative md:border-l border-white/10 px-4 py-2" ref={dropdownRef}>
      <label className="block text-[10px] text-gray-500 font-bold uppercase mb-1">{label}</label>
      
      <div 
        className="flex items-center gap-2 cursor-pointer group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Icon className="text-primary shrink-0" />
        <span className="text-white text-sm flex-1 truncate select-none">{selectedOption.label}</span>
        <FiChevronDown className={`text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} size={14} />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-3 bg-[#111111] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50 py-2 min-w-full"
          >
            {options.map((option) => (
              <div
                key={option.value}
                className={`px-4 py-3 text-sm cursor-pointer transition-colors hover:bg-white/5 flex items-center justify-between ${
                  value === option.value ? "text-primary font-bold bg-white/5" : "text-gray-300"
                }`}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
              >
                {option.label}
                {value === option.value && <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-glow" />}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function QuickSearch() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    type: "",
    location: "",
    priceRange: "",
    rooms: "",
  });
  
  const [areas, setAreas] = useState<{value: string, label: string}[]>([{ value: "", label: "كل المناطق" }]);

  useEffect(() => {
    fetch(`${API_URL}/areas?per_page=100`)
      .then(res => res.json())
      .then(data => {
        const fetched = data.data || data || [];
        const arr = Array.isArray(fetched) ? fetched : (Array.isArray(fetched.data) ? fetched.data : []);
        const formatted = arr.map((area: any) => ({
          value: area.id.toString(),
          label: area.name
        }));
        setAreas([{ value: "", label: "كل المناطق" }, ...formatted]);
      })
      .catch(err => console.error("Failed to fetch areas", err));
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (formData.type) params.append("type", formData.type);
    if (formData.location) params.append("location", formData.location);
    if (formData.priceRange) params.append("priceRange", formData.priceRange);
    if (formData.rooms) params.append("rooms", formData.rooms);
    
    router.push(`/units?${params.toString()}`);
  };

  return (
    <div className="relative py-16 z-30 container-wide px-4 bg-[#090909]">
      <div className="bg-[#111111] border border-white/10 rounded-[2rem] p-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)] max-w-5xl mx-auto backdrop-blur-xl">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">ابحث عن عقارك المثالي</h2>
          <p className="text-gray-400 text-sm">اكتشف مجموعة من أرقى الوحدات العقارية في بني سويف والتجمع</p>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-[#111111] p-4 md:p-3 md:rounded-full rounded-3xl border border-white/10 shadow-2xl"
        >
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3 md:gap-0 items-center">
            
            <CustomSelect
              label="نوع الوحدة"
              icon={FiHome}
              value={formData.type}
              onChange={(val) => setFormData({ ...formData, type: val })}
              options={[
                { value: "", label: "كل الوحدات" },
                { value: "apartment", label: "شقة" },
                { value: "villa", label: "فيلا" },
                { value: "commercial_shop", label: "محل تجاري" },
                { value: "office", label: "مكتب" },
              ]}
            />

            <CustomSelect
              label="المنطقة"
              icon={FiMapPin}
              value={formData.location}
              onChange={(val) => setFormData({ ...formData, location: val })}
              options={areas}
            />

            <CustomSelect
              label="السعر"
              icon={FiDollarSign}
              value={formData.priceRange}
              onChange={(val) => setFormData({ ...formData, priceRange: val })}
              options={[
                { value: "", label: "أي سعر" },
                { value: "0-500000", label: "أقل من 500 ألف" },
                { value: "500000-1000000", label: "500 ألف - مليون" },
                { value: "1000000-3000000", label: "مليون - 3 مليون" },
                { value: "3000000+", label: "أكثر من 3 مليون" },
              ]}
            />

            <CustomSelect
              label="الغرف"
              icon={FiMaximize}
              value={formData.rooms}
              onChange={(val) => setFormData({ ...formData, rooms: val })}
              options={[
                { value: "", label: "الكل" },
                { value: "1", label: "1+ غرف" },
                { value: "2", label: "2+ غرف" },
                { value: "3", label: "3+ غرف" },
                { value: "4", label: "4+ غرف" },
              ]}
            />

            {/* Search Button */}
            <div className="w-full md:w-auto px-2 mt-2 md:mt-0 shrink-0">
              <button type="submit" className="w-full md:w-auto md:px-10 h-14 bg-primary text-navy-deeper font-bold rounded-full md:rounded-full flex items-center justify-center gap-2 hover:bg-[#C5A03F] transition-all duration-300 shadow-glow">
                <FiSearch size={20} />
                <span className="md:hidden">بحث</span>
              </button>
            </div>

          </form>
        </motion.div>
      </div>
    </div>
  );
}
