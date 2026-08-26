import { getImageUrl } from "@/lib/config";

export default function ImageGallery({ images, title }: { images: string[], title: string }) {
  if (!images || images.length === 0) return null;

  return (
    <div className="space-y-8 pt-8">
      <h3 className="text-3xl font-bold text-white mb-2 flex items-center gap-4">
        <span className="w-3 h-3 rounded-full bg-primary shadow-[0_0_10px_rgba(191,154,95,0.8)]" />
        معرض الصور
      </h3>
      <p className="text-white/50 mb-8 font-light text-lg">تصفح أدق تفاصيل التشطيب والديكور في هذا المشروع</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {images.map((img, i) => (
          <div 
            key={i} 
            className="rounded-[2rem] overflow-hidden relative group h-[300px] md:h-[400px] shadow-lg border border-white/5"
          >
            <img 
              src={getImageUrl(img, i)} 
              alt={`${title} ${i}`} 
              className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        ))}
      </div>
    </div>
  );
}
