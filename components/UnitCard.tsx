"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FiMapPin, FiMaximize, FiArrowLeft, FiCheckCircle } from "react-icons/fi";
import { BiBed, BiBath } from "react-icons/bi";
import { FaWhatsapp } from "react-icons/fa";
import { Unit } from "@/lib/units";
import { getImageUrl } from "@/lib/config";

const formatPrice = (price: number) => {
  return price.toLocaleString("ar-EG") + " ج.م";
};

const getStatusBadge = (status: Unit["status"]) => {
  switch (status) {
    case "available":
      return (
        <span className="bg-[#28a745]/90 text-white px-3 py-1 rounded-full text-xs font-bold font-body tracking-wider shadow-sm flex items-center gap-1 backdrop-blur-md border border-white/20">
          <FiCheckCircle /> متاحة
        </span>
      );
    case "reserved":
      return (
        <span className="bg-[#ffc107]/90 text-white px-3 py-1 rounded-full text-xs font-bold font-body tracking-wider shadow-sm flex items-center gap-1 backdrop-blur-md border border-white/20">
          محجوزة
        </span>
      );
    case "sold":
      return (
        <span className="bg-[#dc3545]/90 text-white px-3 py-1 rounded-full text-xs font-bold font-body tracking-wider shadow-sm flex items-center gap-1 backdrop-blur-md border border-white/20">
          تم البيع
        </span>
      );
  }
};

const getTypeLabel = (type: Unit["type"]) => {
  switch (type) {
    case "apartment": return "شقة";
    case "villa": return "فيلا";
    case "shop": 
    case "commercial_shop": return "محل تجاري";
    case "office": return "مكتب";
    case "land": return "أرض";
  }
};

import { extractString } from "@/lib/config";



export default function UnitCard({ unit, index }: { unit: Unit; index: number }) {
  const [imgError, setImgError] = useState(false);
  const isSold = extractString(unit.status) === "sold";
  const safeId = extractString(unit.unit_code || unit.id);
  const safeTitle = extractString(unit.title);
  const safeLocation = extractString(unit.address || (unit as any).location);
  const safeType = extractString(unit.type);
  const safeImage = getImageUrl(unit.main_image_url || unit.main_image || (unit as any).image || (unit.images && unit.images.length > 0 ? unit.images[0] : null), index);
  let rawPrice: any = unit.price;
  if (typeof rawPrice === 'object' && rawPrice !== null) {
    rawPrice = rawPrice.price || rawPrice.name || 0;
  }
  const numericPrice = Number(extractString(rawPrice) || 0);

  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50, y: 20 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ type: "spring", stiffness: 60, damping: 20, delay: index * 0.1 }}
      className="bg-[#111111] rounded-[2rem] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.5)] hover:shadow-[0_15px_50px_rgba(191,154,95,0.15)] transition-all duration-300 border border-white/5 flex flex-col group relative"
    >
      {/* Image Container */}
      <div className="relative h-60 w-full overflow-hidden p-2 pb-0">
        <Link href={`/units/${safeId}`} className="block w-full h-full rounded-[1.5rem] overflow-hidden relative">
          <Image
            src={imgError ? `https://placehold.co/800x600/111111/9ca3af.png?text=No+Image` : safeImage}
            alt={safeTitle}
            fill
            onError={() => setImgError(true)}
            className={`object-cover transition-transform duration-700 group-hover:scale-110 ${isSold ? 'grayscale' : ''}`}
          />
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />
        </Link>
        
        {/* Floating Badges */}
        <div className="absolute top-4 right-4 z-10 flex gap-2">
          <span className="bg-[#DFBA7F] text-navy-deeper px-3 py-1.5 rounded-full text-xs font-bold font-body shadow-md border border-[#DFBA7F]/20">
            {getTypeLabel(safeType as any) || safeType}
          </span>
          <span className="bg-black/50 text-white px-3 py-1.5 rounded-full text-xs font-bold font-body shadow-md border border-white/10 backdrop-blur-md">
            {safeId}
          </span>
        </div>
        
        <div className="absolute top-4 left-4 z-10">
          {getStatusBadge(extractString(unit.status) as any)}
        </div>

        {/* Price Tag positioned over the image bottom */}
        <div className="absolute bottom-4 right-4 z-10">
           <span className="text-xl font-black text-white drop-shadow-md">{formatPrice(numericPrice)}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow text-right">
        <div className="mb-4 flex-grow">
          <Link href={`/units/${safeId}`}>
            <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 hover:text-primary transition-colors leading-tight">
              {safeTitle}
            </h3>
          </Link>
          <div className="flex items-center text-white/50 text-sm gap-1.5 mb-4">
            <FiMapPin className="text-primary text-base shrink-0" />
            <span className="line-clamp-1">{safeLocation}</span>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-3 gap-2 border-y border-white/5 py-4 mb-6 bg-white/5 rounded-xl px-2">
          <div className="flex flex-col items-center justify-center gap-1.5">
            <FiMaximize className="text-primary/70" size={18} />
            <span className="text-xs font-bold text-white/90">{extractString(unit.space_sqm || (unit as any).area)} م²</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-1.5 border-x border-white/10">
            <BiBed className="text-primary/70" size={18} />
            <span className="text-xs font-bold text-white/90">{extractString(unit.bedrooms || (unit as any).rooms)} غرف</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-1.5">
            <BiBath className="text-primary/70" size={18} />
            <span className="text-xs font-bold text-white/90">{extractString(unit.bathrooms)} حمام</span>
          </div>
        </div>

        {/* Actions (Two Buttons) */}
        <div className="mt-auto flex items-center gap-3">
          <Link
            href={`/units/${safeId}`}
            className="flex-1 text-center bg-white/5 text-white px-4 py-3 rounded-xl text-sm font-bold hover:bg-white/10 transition-colors flex items-center justify-center gap-2 border border-white/5"
          >
            التفاصيل <FiArrowLeft />
          </Link>
          
          <button
            disabled={isSold}
            onClick={() => {
              if (!isSold) {
                // Open WhatsApp logic here
                window.open(`https://wa.me/201008450553?text=مرحباً، أود الاستفسار عن الوحدة كود: ${safeId}`, '_blank');
              }
            }}
            className={`flex-1 text-center px-4 py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${
              isSold 
                ? 'bg-white/5 text-white/30 cursor-not-allowed border border-white/5' 
                : 'bg-primary text-navy-deeper hover:bg-[#c9a66d] shadow-[0_4px_14px_rgba(191,154,95,0.3)] hover:shadow-[0_6px_20px_rgba(191,154,95,0.4)] cursor-pointer'
            }`}
          >
            <FaWhatsapp className="text-lg" /> {isSold ? 'غير متاحة' : 'معاينة'}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
