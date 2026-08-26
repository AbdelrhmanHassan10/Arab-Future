"use client";

import { useState, useEffect, Suspense } from "react";
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
    
    // If location is used in backend, you can pass it here, e.g., area_id if you have it
    // Or just pass it as 'location' if backend supports it
    if (filters.location) params.append("location", filters.location);

    fetch(`${API_URL}/units?${params.toString()}`)
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
    { value: "commercial_shop", label: "محل تجاري" },
    { value: "office", label: "مكتب" },
    { value: "land", label: "أرض" },
  ];

  const locationOptions = [
    { value: "beni-suef-city", label: "مدينة بني سويف" },
    { value: "new-beni-suef", label: "بني سويف الجديدة" },
    { value: "baba", label: "ببا" },
    { value: "al-wasta", label: "الواسطى" },
  ];

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


  return (
    <>
      <Navbar />

      {/* Header */}
      {/* Slanted Hero Section */}
      <div className="relative h-[500px] md:h-[600px] lg:h-[80vh] w-full overflow-hidden bg-navy-deeper">
        {/* Background Image (Left side visible) */}
        <img
          src="/pexels-perqued-13203179.jpg"
          alt="Units Background"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Top Dark Gradient for Navbar Visibility */}
        <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-black/50 via-black/10 to-transparent z-10 pointer-events-none" />

        {/* Dark Angled Overlay (Right side) */}
        <div
          className="absolute top-0 right-0 h-full w-[90%] md:w-[70%] lg:w-[60%] bg-black/70 z-10 flex flex-col justify-center px-8 md:px-16 lg:px-24"
          style={{ clipPath: "polygon(15% 0, 100% 0, 100% 100%, 0% 100%)" }}
        >
          {/* Content inside slant */}
          <div className="max-w-xl mr-auto lg:mr-24 pt-20">
            <h4 className="text-primary font-bold text-lg lg:text-xl mb-4 font-body tracking-wider">
              الوحدات العقارية
            </h4>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-8">
              اكتشف منزل أحلامك<br />
              <span className="text-white">مع <span className="text-primary">سمسار بني سويف</span></span>
            </h1>

            <div className="w-20 h-1 bg-primary mb-6" />

            <p className="text-white/70 text-base lg:text-lg leading-relaxed max-w-lg">
              تصفح أحدث العقارات المتاحة للبيع والشراء في بني سويف، واستمتع بتجربة بحث متقدمة للوصول إلى بيتك الجديد الذي يلبي كافة تطلعاتك.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-[#090909] py-12 min-h-screen">
        <div className="container-wide px-6">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">الوحدات العقارية</h1>
          <p className="text-gray-400 max-w-2xl text-lg">تصفح أحدث العقارات المتاحة للبيع والاستثمار في أرقى مناطق بني سويف. شقق، فيلات، ومقرات إدارية وتجارية تلبي جميع احتياجاتك.</p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-32">
            <div className="text-primary font-bold text-xl animate-pulse">جاري تحميل الوحدات...</div>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">

            {/* Sidebar Filters */}
            <div className="w-full lg:w-1/4">
              <div className="bg-[#111111] rounded-2xl p-6 border border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                <div className="flex items-center gap-2 mb-6 text-white font-bold text-lg border-b border-white/5 pb-4">
                  <FiFilter className="text-primary" />
                  <span>تصفية النتائج</span>
                </div>

                <div className="space-y-6">
                  {/* Search */}
                  <div>
                    <label className="block text-xs font-bold text-white/50 mb-2">بحث (الاسم أو الكود)</label>
                    <div className="relative">
                      <FiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30" />
                      <input
                        type="text"
                        placeholder="ابحث هنا..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl pr-10 pl-4 py-2.5 text-sm text-white placeholder-white/30 focus:ring-2 focus:ring-primary/40 outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Type */}
                  <div className="relative z-50">
                    <label className="block text-xs font-bold text-white/50 mb-2">نوع الوحدة</label>
                    <CustomSelect 
                      options={typeOptions}
                      value={filters.type}
                      onChange={(val) => setFilters({ ...filters, type: val })}
                    />
                  </div>

                  {/* Location */}
                  <div className="relative z-40">
                    <label className="block text-xs font-bold text-white/50 mb-2">المنطقة</label>
                    <CustomSelect 
                      options={locationOptions}
                      value={filters.location}
                      onChange={(val) => setFilters({ ...filters, location: val })}
                    />
                  </div>

                  {/* Status */}
                  <div className="relative z-30">
                    <label className="block text-xs font-bold text-white/50 mb-2">الحالة</label>
                    <CustomSelect 
                      options={statusOptions}
                      value={filters.status}
                      onChange={(val) => setFilters({ ...filters, status: val })}
                    />
                  </div>

                  {/* Rooms */}
                  <div className="relative z-20">
                    <label className="block text-xs font-bold text-white/50 mb-2">الغرف (أو أكثر)</label>
                    <CustomSelect 
                      options={roomsOptions}
                      value={filters.rooms}
                      onChange={(val) => setFilters({ ...filters, rooms: val })}
                    />
                  </div>

                  {/* Price */}
                  <div>
                    <label className="block text-xs font-bold text-white/50 mb-2">نطاق السعر (جنيه)</label>
                    <div className="flex items-center gap-2">
                      <input type="number" name="priceMin" value={filters.priceMin} placeholder="من" onChange={handleFilterChange} className="w-1/2 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder-white/30 focus:ring-2 focus:ring-primary/40 outline-none transition-all" />
                      <input type="number" name="priceMax" value={filters.priceMax} placeholder="إلى" onChange={handleFilterChange} className="w-1/2 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder-white/30 focus:ring-2 focus:ring-primary/40 outline-none transition-all" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="w-full lg:w-3/4">
              {/* Controls */}
              <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4 bg-[#111111] p-4 rounded-2xl border border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                <p className="text-white/60 font-bold text-sm">
                  تم العثور على <span className="text-primary">{filteredUnits.length}</span> وحدة
                </p>
                <div className="flex items-center gap-2 bg-white/5 p-1 rounded-xl">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-lg transition-colors ${viewMode === "grid" ? "bg-white/10 text-primary" : "text-white/40 hover:text-white"}`}
                  >
                    <FiGrid size={18} />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-lg transition-colors ${viewMode === "list" ? "bg-white/10 text-primary" : "text-white/40 hover:text-white"}`}
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
                <div className="bg-[#111111] rounded-2xl p-12 text-center border border-white/5">
                  <FiSearch className="mx-auto text-white/20 mb-4" size={48} />
                  <h3 className="text-xl font-bold text-white mb-2">لا توجد وحدات تطابق بحثك</h3>
                  <p className="text-white/50">يرجى تعديل فلاتر البحث والمحاولة مرة أخرى.</p>
                </div>
              )}
            </div>

          </div>
        )}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default function UnitsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-navy-deeper flex items-center justify-center text-white">جاري التحميل...</div>}>
      <UnitsContent />
    </Suspense>
  );
}
