"use client";

import { useState, useRef, useEffect } from "react";
import { FiSearch, FiMapPin, FiHome, FiDollarSign, FiChevronDown } from "react-icons/fi";
import Link from "next/link";

export default function HeroSection() {
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [priceRange, setPriceRange] = useState("");
  
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <section className="relative pt-32 pb-24 md:pb-48 bg-white" dir="rtl">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop')",
          backgroundPosition: "center 20%"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-l from-[#082b26]/90 to-[#082b26]/40"></div>
      </div>

      {/* SVG Wave at the bottom */}
      <div className="absolute bottom-0 left-0 w-full z-0 leading-none translate-y-[1px] block">
        <svg viewBox="0 0 1440 120" className="w-full h-[50px] md:h-[150px] block" preserveAspectRatio="none">
          <path d="M0,64L80,74.7C160,85,320,107,480,106.7C640,107,800,85,960,69.3C1120,53,1280,43,1360,37.3L1440,32L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" fill="#eaf5f0" />
        </svg>
      </div>

      <div className="container-custom relative z-10 w-full mt-10 md:mt-24">
        <div className="max-w-2xl text-white">
          <p className="text-[13px] font-medium tracking-wider mb-5 text-white/90">
            منازل أفضل. مستقبل مشرق.
          </p>
          <h1 className="text-5xl md:text-6xl lg:text-[72px] font-bold leading-[1.1] mb-6">
            ابحث عن <br />
            <span className="text-[#84e1bc]">عقار أحلامك</span> <br />
            مع أكواد العقاريه
          </h1>
          <p className="text-[15px] text-white/80 mb-16 max-w-[450px] leading-relaxed">
            نجعل البحث عن العقارات أمراً سهلاً. اكتشف المنازل العصرية، والمواقع المتميزة، والحلول العقارية الموثوقة — كلها في مكان واحد.
          </p>
        </div>
      </div>

      {/* Floating Search Bar */}
      <div className="relative mt-16 md:mt-0 md:absolute md:bottom-28 md:left-1/2 md:-translate-x-1/2 w-[95%] max-w-[1000px] z-[100] mx-auto">
        <div ref={dropdownRef} className="bg-white/90 backdrop-blur-2xl border border-white/60 rounded-[2rem] md:rounded-full p-4 md:p-2.5 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] flex flex-col md:flex-row items-center w-full">
          
          {/* Location */}
          <div className={`relative flex items-center gap-4 px-6 py-3 w-full md:w-[28%] border-b md:border-b-0 border-gray-300/50 cursor-pointer ${openDropdown === 'location' ? 'z-50' : 'z-30'}`} onClick={() => setOpenDropdown(openDropdown === 'location' ? null : 'location')}>
            <FiMapPin className="text-[#082b26] text-[22px] shrink-0" />
            <div className="w-full">
              <p className="text-[11px] text-[#082b26]/70 font-bold mb-1">الموقع</p>
              <div className="flex items-center justify-between">
                <span className="text-[14px] font-bold text-[#082b26]">{location || "اختر الموقع"}</span>
                <FiChevronDown className={`text-[#082b26]/50 text-sm transition-transform ${openDropdown === 'location' ? 'rotate-180' : ''}`} />
              </div>
            </div>
            
            {/* Custom Dropdown */}
            {openDropdown === 'location' && (
              <div className="absolute top-full left-0 right-0 mt-3 bg-white/95 backdrop-blur-xl rounded-[1.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-gray-100 p-2 z-50">
                {["القاهرة الجديدة", "الشيخ زايد", "العاصمة الإدارية", "الساحل الشمالي", "أكتوبر"].map((loc) => (
                  <div 
                    key={loc}
                    className="px-4 py-3 hover:bg-[#148968]/10 hover:text-[#148968] rounded-xl cursor-pointer text-[14px] font-bold text-gray-700 transition-all duration-200"
                    onClick={(e) => {
                      e.stopPropagation();
                      setLocation(loc);
                      setOpenDropdown(null);
                    }}
                  >
                    {loc}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="hidden md:block w-[1px] h-10 bg-gray-300/50 mx-2"></div>

          {/* Property Type */}
          <div className={`relative flex items-center gap-4 px-6 py-3 w-full md:w-[28%] border-b md:border-b-0 border-gray-300/50 cursor-pointer ${openDropdown === 'type' ? 'z-50' : 'z-20'}`} onClick={() => setOpenDropdown(openDropdown === 'type' ? null : 'type')}>
            <FiHome className="text-[#082b26] text-[22px] shrink-0" />
            <div className="w-full">
              <p className="text-[11px] text-[#082b26]/70 font-bold mb-1">نوع العقار</p>
              <div className="flex items-center justify-between">
                <span className="text-[14px] font-bold text-[#082b26]">{propertyType || "أي نوع"}</span>
                <FiChevronDown className={`text-[#082b26]/50 text-sm transition-transform ${openDropdown === 'type' ? 'rotate-180' : ''}`} />
              </div>
            </div>
            
            {/* Custom Dropdown */}
            {openDropdown === 'type' && (
              <div className="absolute top-full left-0 right-0 mt-3 bg-white/95 backdrop-blur-xl rounded-[1.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-gray-100 p-2 z-50">
                {["فيلا", "شقة", "تاون هاوس", "توين هاوس", "شاليه"].map((type) => (
                  <div 
                    key={type}
                    className="px-4 py-3 hover:bg-[#148968]/10 hover:text-[#148968] rounded-xl cursor-pointer text-[14px] font-bold text-gray-700 transition-all duration-200"
                    onClick={(e) => {
                      e.stopPropagation();
                      setPropertyType(type);
                      setOpenDropdown(null);
                    }}
                  >
                    {type}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="hidden md:block w-[1px] h-10 bg-gray-300/50 mx-2"></div>

          {/* Price Range */}
          <div className={`relative flex items-center gap-4 px-6 py-3 w-full md:w-[28%] mb-4 md:mb-0 cursor-pointer ${openDropdown === 'price' ? 'z-50' : 'z-10'}`} onClick={() => setOpenDropdown(openDropdown === 'price' ? null : 'price')}>
            <FiDollarSign className="text-[#082b26] text-[22px] shrink-0" />
            <div className="w-full">
              <p className="text-[11px] text-[#082b26]/70 font-bold mb-1">نطاق السعر</p>
              <div className="flex items-center justify-between">
                <span className="text-[14px] font-bold text-[#082b26]">{priceRange || "أي سعر"}</span>
                <FiChevronDown className={`text-[#082b26]/50 text-sm transition-transform ${openDropdown === 'price' ? 'rotate-180' : ''}`} />
              </div>
            </div>
            
            {/* Custom Dropdown */}
            {openDropdown === 'price' && (
              <div className="absolute top-full left-0 right-0 mt-3 bg-white/95 backdrop-blur-xl rounded-[1.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-gray-100 p-2 z-50">
                {["أقل من 5 مليون", "5 - 10 مليون", "10 - 20 مليون", "أكثر من 20 مليون"].map((price) => (
                  <div 
                    key={price}
                    className="px-4 py-3 hover:bg-[#148968]/10 hover:text-[#148968] rounded-xl cursor-pointer text-[14px] font-bold text-gray-700 transition-all duration-200"
                    onClick={(e) => {
                      e.stopPropagation();
                      setPriceRange(price);
                      setOpenDropdown(null);
                    }}
                  >
                    {price}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Search Button */}
          <div className="w-full md:w-auto px-2 md:px-0 md:mr-auto z-10 relative">
            <Link href={`/units?location=${encodeURIComponent(location)}&type=${encodeURIComponent(propertyType)}&price=${encodeURIComponent(priceRange)}`} className="bg-[#082b26] hover:bg-[#148968] text-white h-[56px] w-full md:w-auto md:px-10 rounded-full flex items-center justify-center gap-2 font-semibold transition-colors shrink-0 shadow-md">
              <FiSearch className="text-xl" />
              <span className="text-[15px]">بحث</span>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
