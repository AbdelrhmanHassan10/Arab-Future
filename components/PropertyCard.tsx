import { FiHeart, FiArrowLeft, FiMapPin } from "react-icons/fi";
import { BiBed, BiBath, BiArea } from "react-icons/bi";
import Link from "next/link";

export interface PropertyProps {
  id: string;
  image: string;
  title: string;
  location: string;
  beds: number;
  baths: number;
  sqft: number;
  price: string;
  badge: string;
  category?: string;
}

export default function PropertyCard({ property }: { property: PropertyProps }) {
  return (
    <div className="group relative w-full h-full flex flex-col rounded-[32px] bg-white p-3 hover:shadow-[0_30px_60px_-15px_rgba(20,137,104,0.15)] transition-all duration-500 border border-gray-100/60 hover:-translate-y-1" dir="rtl">
      
      {/* Premium Image Section */}
      <div className="relative w-full h-[260px] rounded-[24px] overflow-hidden">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
        />
        {/* Dynamic Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#082b26]/90 via-transparent to-black/10 pointer-events-none transition-opacity duration-500 group-hover:opacity-100"></div>
        
        {/* Top Badges */}
        <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
          <span className="bg-white/95 backdrop-blur-md text-[#082b26] text-[11px] font-bold px-4 py-1.5 rounded-full shadow-lg">
            {property.badge}
          </span>
        </div>

        {/* Floating Location Badge */}
        <div className="absolute bottom-4 right-4 z-10 flex items-center gap-1.5 text-white/90">
          <FiMapPin className="text-sm" />
          <span className="text-[12px] font-medium tracking-wide drop-shadow-md">{property.location}</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="pt-6 px-3 pb-2 flex flex-col flex-1">
        {/* Title and Price */}
        <div className="flex justify-between items-start mb-5 gap-2">
          <h3 className="text-[19px] font-bold text-[#082b26] leading-snug group-hover:text-[#148968] transition-colors line-clamp-2">
            {property.title}
          </h3>
          <div className="text-[18px] font-bold text-[#148968] whitespace-nowrap mt-1 bg-[#eaf5f0] px-3 py-1 rounded-lg">
            {property.price}
          </div>
        </div>

        <hr className="border-gray-100 mb-5" />

        {/* Stylish Specs Row */}
        <div className="flex items-center justify-between text-gray-500 mb-7">
          <div className="flex flex-col items-center gap-1.5">
            <div className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center text-[#148968] group-hover:bg-[#eaf5f0] transition-colors">
              <BiBed className="text-[18px]" />
            </div>
            <span className="text-[12px] font-medium text-gray-600">{property.beds} غرف</span>
          </div>
          
          <div className="w-px h-8 bg-gray-200/60"></div>

          <div className="flex flex-col items-center gap-1.5">
            <div className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center text-[#148968] group-hover:bg-[#eaf5f0] transition-colors">
              <BiBath className="text-[18px]" />
            </div>
            <span className="text-[12px] font-medium text-gray-600">{property.baths} حمامات</span>
          </div>

          <div className="w-px h-8 bg-gray-200/60"></div>

          <div className="flex flex-col items-center gap-1.5">
            <div className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center text-[#148968] group-hover:bg-[#eaf5f0] transition-colors">
              <BiArea className="text-[18px]" />
            </div>
            <span className="text-[12px] font-medium text-gray-600">{property.sqft} متر²</span>
          </div>
        </div>

        {/* Expanding Action Link */}
        <Link href={`/units/${property.id}`} className="mt-auto w-full py-3.5 rounded-2xl bg-[#f4f7f6] text-[#082b26] font-bold text-[14px] flex items-center justify-center gap-2 group-hover:bg-[#082b26] group-hover:text-white transition-all duration-300">
          <span>التفاصيل</span>
          <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
