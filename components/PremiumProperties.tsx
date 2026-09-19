"use client";

import { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import PropertyCard, { PropertyProps } from "./PropertyCard";
import Link from "next/link";

const mockProperties: PropertyProps[] = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop",
    badge: "مميز",
    location: "التجمع الخامس، القاهرة",
    title: "منزل عائلي عصري بحديقة خاصة",
    beds: 4,
    baths: 3,
    sqft: 250,
    price: "١,٢٥٠,٠٠٠ ج",
    category: "منازل",
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop",
    badge: "للبيع",
    location: "الشيخ زايد، الجيزة",
    title: "شقة فاخرة بإطلالة بانورامية",
    beds: 2,
    baths: 2,
    sqft: 150,
    price: "٨٧٥,٠٠٠ ج",
    category: "شقق",
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop",
    badge: "فرصة",
    location: "الساحل الشمالي",
    title: "فيلا على البحر مباشرة",
    beds: 5,
    baths: 4,
    sqft: 420,
    price: "٢,٤٥٠,٠٠٠ ج",
    category: "فيلات",
  },
  {
    id: "4",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=800&auto=format&fit=crop",
    badge: "للبيع",
    location: "المعادي، القاهرة",
    title: "منزل عصري بتصميم أوروبي",
    beds: 3,
    baths: 2,
    sqft: 200,
    price: "١,١٤٠,٠٠٠ ج",
    category: "منازل",
  },
  {
    id: "5",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800&auto=format&fit=crop",
    badge: "حصري",
    location: "بني سويف",
    title: "شقة بإطلالة رائعة وموقع متميز",
    beds: 2,
    baths: 2,
    sqft: 120,
    price: "٩٦٠,٠٠٠ ج",
    category: "شقق",
  },
  {
    id: "6",
    image: "https://images.unsplash.com/photo-1600121848594-d8644e57abab?q=80&w=800&auto=format&fit=crop",
    badge: "للبيع",
    location: "الشروق، القاهرة",
    title: "تاون هاوس فاخر مع مسبح خاص",
    beds: 4,
    baths: 3,
    sqft: 230,
    price: "١,٤٢٠,٠٠٠ ج",
    category: "فيلات",
  },
];

export default function PremiumProperties() {
  const [activeCategory, setActiveCategory] = useState("الكل");
  const categories = ["الكل", "منازل", "شقق", "فيلات", "تجاري", "أراضي"];

  const filteredProperties = activeCategory === "الكل" 
    ? mockProperties 
    : mockProperties.filter(property => property.category === activeCategory);

  return (
    <section className="relative pb-10 pt-20 bg-white" id="properties" dir="rtl">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-[#148968]/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>
      
      <div className="container-custom relative z-10">
        
        {/* Premium Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-1 bg-[#148968] rounded-full"></span>
              <p className="text-[#148968] font-bold text-[13px] tracking-widest uppercase">
                عقارات النخبة
              </p>
            </div>
            <h2 className="text-4xl md:text-[46px] font-extrabold text-[#082b26] leading-tight">
              عقارات فاخرة <br /> <span className="text-transparent bg-clip-text bg-gradient-to-l from-[#148968] to-[#082b26]">لأسلوب حياة استثنائي</span>
            </h2>
          </div>
        </div>

        {/* Custom Scrollbar Style */}
        <style>{`
          .mint-scrollbar::-webkit-scrollbar {
            height: 6px;
          }
          .mint-scrollbar::-webkit-scrollbar-track {
            background: rgba(0,0,0,0.02);
            border-radius: 10px;
          }
          .mint-scrollbar::-webkit-scrollbar-thumb {
            background: #20d09f;
            border-radius: 10px;
          }
        `}</style>

        {/* Ultra Modern Filters (Pill Container) */}
        <div className="flex justify-center md:justify-start mb-12 w-full relative">
          <div className="relative max-w-full">
            <div className="flex items-center p-1.5 bg-gray-50 border border-gray-100 rounded-3xl md:rounded-full overflow-x-auto shadow-inner max-w-full pb-3 mint-scrollbar relative z-10">
              {categories.map((cat, idx) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`whitespace-nowrap px-7 py-3 rounded-full text-[14px] font-bold transition-all duration-400 ${
                    activeCategory === cat
                      ? "bg-[#082b26] text-white shadow-md transform scale-100"
                      : "bg-transparent text-gray-500 hover:text-[#082b26] hover:bg-white hover:shadow-sm"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            {/* Fade effect to indicate scroll on small screens */}
            <div className="absolute top-0 bottom-3 left-0 w-20 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none rounded-l-3xl md:hidden z-20"></div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredProperties.length > 0 ? (
            filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))
          ) : (
            <div className="col-span-full py-10 flex flex-col items-center justify-center text-center">
              <p className="text-gray-500 text-lg mb-2">عذراً، لا توجد عقارات مطابقة لهذا التصنيف حالياً.</p>
              <button 
                onClick={() => setActiveCategory("الكل")}
                className="text-[#148968] font-bold hover:underline"
              >
                العودة لرؤية جميع العقارات
              </button>
            </div>
          )}
        </div>

        {/* View All Button */}
        <div className="flex justify-center">
          <Link href="/units" className="group flex items-center gap-4 bg-[#082b26] hover:bg-[#148968] px-10 py-4 rounded-full text-white transition-all duration-300 text-[16px] font-bold shadow-lg hover:shadow-xl hover:-translate-y-1">
            استكشف كل العقارات 
            <span className="bg-white/10 p-2 rounded-full transition-colors">
              <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
