"use client"; // Force recompile

import { useState, useEffect, Suspense, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import UnitCard from "@/components/UnitCard";
import CustomSelect from "@/components/ui/CustomSelect";
import { Unit } from "@/lib/units";
import { FiGrid, FiList, FiSearch, FiFilter } from "react-icons/fi";
import { useSearchParams } from "next/navigation";
import { API_URL } from "@/lib/config";

function UnitsContent() {
  const searchParams = useSearchParams();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const ease = [0.16, 1, 0.3, 1] as const;

  const [filters, setFilters] = useState({
    type: "",
    location: "",
    status: "",
    priceMin: "",
    priceMax: "",
    rooms: "",
  });
  const [units, setUnits] = useState<Unit[]>([]);
  const [loading, setLoading] = useState(true);
  const [locationOptions, setLocationOptions] = useState<{value: string, label: string}[]>([]);

  useEffect(() => {
    fetch("/api/areas?per_page=100")
      .then((res) => res.json())
      .then((data) => {
        const fetched = data.data || data || [];
        const arr = Array.isArray(fetched) ? fetched : (Array.isArray(fetched.data) ? fetched.data : []);
        const formatted = arr.map((area: any) => ({
          value: area.id.toString(),
          label: area.name,
        }));
        setLocationOptions(formatted);
      })
      .catch((err) => console.error("Failed to fetch areas", err));
  }, []);

  useEffect(() => {
    setLoading(true);
    
    // Construct query parameters matching Laravel API
    const params = new URLSearchParams();
    if (filters.type) params.append("type", filters.type);
    if (filters.status) params.append("status", filters.status);
    if (filters.rooms) params.append("min_rooms", filters.rooms);
    if (filters.priceMin) params.append("min_price", filters.priceMin);
    if (filters.priceMax) params.append("max_price", filters.priceMax);
    if (searchTerm) params.append("q", searchTerm);
    
    if (filters.location) params.append("area_id", filters.location);

    fetch(`/api/units?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        // Handle paginated or flat array response
        let fetched = data.data || data || [];
        if (fetched && !Array.isArray(fetched) && Array.isArray(fetched.data)) {
          fetched = fetched.data;
        }
        setUnits(Array.isArray(fetched) ? fetched : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch units", err);
        setUnits([]);
        setLoading(false);
      });
  }, [filters, searchTerm]);

  const typeOptions = [
    { value: "apartment", label: "شقة" },
    { value: "villa", label: "فيلا" },
    { value: "commercial_shop", label: "محأكواد العقاريه" },
    { value: "office", label: "مكتب" },
    { value: "land", label: "أرض" },
  ];

  // Location options are now fetched dynamically

  const statusOptions = [
    { value: "available", label: "متاحة" },
    { value: "sold", label: "تم البيع" },
  ];

  const roomsOptions = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
  ];

  useEffect(() => {
    if (searchParams) {
      const type = searchParams.get("type") || "";
      const location = searchParams.get("location") || "";
      const rooms = searchParams.get("rooms") || "";
      const priceRange = searchParams.get("priceRange") || "";

      let priceMin = "";
      let priceMax = "";
      if (priceRange) {
        const parts = priceRange.split("-");
        if (parts.length === 2) {
          priceMin = parts[0];
          priceMax = parts[1];
        } else if (priceRange.endsWith("+")) {
          priceMin = priceRange.replace("+", "");
        }
      }

      setFilters(prev => ({
        ...prev,
        type,
        location,
        rooms,
        priceMin,
        priceMax
      }));
    }
  }, [searchParams]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredUnits = units; // We now rely on the backend for filtering

  const hasActiveFilters = searchTerm !== "" || Object.values(filters).some(val => val !== "");
  return (
    <>
      <Navbar />

      {/* --- SECTION 1: HERO PARALLAX --- */}
      <section ref={heroRef} className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden pt-20">
        <motion.div style={{ y, opacity }} className="absolute inset-0 w-full h-full">
          <div className="absolute inset-0 bg-[url('/pexels-perqued-13203179.jpg')] bg-cover bg-center scale-110" />
          <div className="absolute inset-0 bg-gradient-to-l from-[#082b26]/90 to-[#082b26]/40" />
        </motion.div>

        {/* SVG Wave at the bottom to transition to light content smoothly */}
        <div className="absolute bottom-0 left-0 w-full z-0 leading-none translate-y-[1px]">
          <svg viewBox="0 0 1440 120" className="w-full h-[80px] md:h-[120px] block" preserveAspectRatio="none">
            <path d="M0,64L80,74.7C160,85,320,107,480,106.7C640,107,800,85,960,69.3C1120,53,1280,43,1360,37.3L1440,32L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" fill="#f9fafb" />
          </svg>
        </div>

        <div className="container-wide px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
          >
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/10 text-white font-bold text-sm mb-6 border border-white/20 backdrop-blur-md shadow-lg">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#84e1bc] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#84e1bc]"></span>
              </span>
              <span className="tracking-widest">الوحدات المتاحة</span>
            </div>

            <h1 className="text-[clamp(2.5rem,5vw,5rem)] font-black text-white leading-[1.1] tracking-tight mb-6 drop-shadow-lg">
              اكتشف منزل أحلامك
              <br />
              مع <span className="text-[#84e1bc]">أكواد العقاريه العقارية</span>
            </h1>

            <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10 drop-shadow-md">
              تصفح أحدث العقارات المتاحة للبيع والاستثمار في أرقى مناطق بني سويف. شقق، فيلات، ومقرات إدارية وتجارية تلبي جميع احتياجاتك.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="bg-gray-50 py-12 min-h-screen">
        <div className="container-wide px-6">

          <div className="flex flex-col lg:flex-row gap-8">

            {/* Sidebar Filters */}
            <div className="w-full lg:w-1/4">
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
                  <div className="flex items-center gap-2 text-[#082b26] font-bold text-lg">
                    <FiFilter className="text-[#148968]" />
                    <span>تصفية النتائج</span>
                  </div>
                  {hasActiveFilters && (
                    <button 
                      onClick={() => {
                        setSearchTerm("");
                        setFilters({ type: "", location: "", status: "", priceMin: "", priceMax: "", rooms: "" });
                      }}
                      className="text-xs text-red-500 hover:text-red-700 font-bold transition-colors bg-red-50 px-3 py-1.5 rounded-lg"
                    >
                      إلغاء الفلاتر
                    </button>
                  )}
                </div>

                <div className="space-y-6">
                  {/* Search */}
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-2">بحث (الاسم أو الكود)</label>
                    <div className="relative">
                      <FiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="ابحث هنا..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl pr-10 pl-4 py-2.5 text-sm text-[#082b26] placeholder-gray-400 focus:ring-2 focus:ring-[#148968]/40 outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Type */}
                  <div className="relative z-50">
                    <label className="block text-xs font-bold text-gray-500 mb-2">نوع الوحدة</label>
                    <CustomSelect 
                      options={typeOptions}
                      value={filters.type}
                      onChange={(val) => setFilters({ ...filters, type: val })}
                    />
                  </div>

                  {/* Location */}
                  <div className="relative z-40">
                    <label className="block text-xs font-bold text-gray-500 mb-2">المنطقة</label>
                    <CustomSelect 
                      options={locationOptions}
                      value={filters.location}
                      onChange={(val) => setFilters({ ...filters, location: val })}
                    />
                  </div>

                  {/* Status */}
                  <div className="relative z-30">
                    <label className="block text-xs font-bold text-gray-500 mb-2">الحالة</label>
                    <CustomSelect 
                      options={statusOptions}
                      value={filters.status}
                      onChange={(val) => setFilters({ ...filters, status: val })}
                    />
                  </div>

                  {/* Rooms */}
                  <div className="relative z-20">
                    <label className="block text-xs font-bold text-gray-500 mb-2">الغرف (أو أكثر)</label>
                    <CustomSelect 
                      options={roomsOptions}
                      value={filters.rooms}
                      onChange={(val) => setFilters({ ...filters, rooms: val })}
                    />
                  </div>

                  {/* Price */}
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-2">نطاق السعر (جنيه)</label>
                    <div className="flex items-center gap-2">
                      <input type="number" name="priceMin" value={filters.priceMin} placeholder="من" onChange={handleFilterChange} className="w-1/2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm text-[#082b26] placeholder-gray-400 focus:ring-2 focus:ring-[#148968]/40 outline-none transition-all" />
                      <input type="number" name="priceMax" value={filters.priceMax} placeholder="إلى" onChange={handleFilterChange} className="w-1/2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm text-[#082b26] placeholder-gray-400 focus:ring-2 focus:ring-[#148968]/40 outline-none transition-all" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="w-full lg:w-3/4">
              {loading ? (
                <div className="flex justify-center items-center py-32 bg-white rounded-2xl border border-gray-100 shadow-sm h-full min-h-[400px]">
                  <div className="text-[#148968] font-bold text-xl animate-pulse">جاري تحميل الوحدات...</div>
                </div>
              ) : (
                <>
                  {/* Controls */}
                  <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                    <p className="text-gray-500 font-bold text-sm">
                      تم العثور على <span className="text-[#148968]">{filteredUnits.length}</span> وحدة
                    </p>
                    <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-xl">
                      <button
                        onClick={() => setViewMode("grid")}
                        className={`p-2 rounded-lg transition-colors ${viewMode === "grid" ? "bg-white text-[#148968] shadow-sm" : "text-gray-400 hover:text-[#082b26]"}`}
                      >
                        <FiGrid size={18} />
                      </button>
                      <button
                        onClick={() => setViewMode("list")}
                        className={`p-2 rounded-lg transition-colors ${viewMode === "list" ? "bg-white text-[#148968] shadow-sm" : "text-gray-400 hover:text-[#082b26]"}`}
                      >
                        <FiList size={18} />
                      </button>
                    </div>
                  </div>

                  {/* Grid / List */}
                  {filteredUnits.length > 0 ? (
                    <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" : "flex flex-col gap-6"}>
                      {filteredUnits.map((unit, index) => (
                        <div key={unit.id} className={viewMode === "list" ? "md:max-w-4xl" : ""}>
                          <UnitCard unit={unit} index={index} />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
                      <FiSearch className="mx-auto text-gray-300 mb-4" size={48} />
                      <h3 className="text-xl font-bold text-[#082b26] mb-2">لا توجد وحدات تطابق بحثك</h3>
                      <p className="text-gray-500">يرجى تعديل فلاتر البحث والمحاولة مرة أخرى.</p>
                    </div>
                  )}
                </>
              )}
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default function UnitsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center text-[#148968] font-bold">جاري التحميل...</div>}>
      <UnitsContent />
    </Suspense>
  );
}
