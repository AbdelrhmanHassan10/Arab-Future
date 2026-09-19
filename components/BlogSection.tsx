import { FiArrowLeft } from "react-icons/fi";
import Link from "next/link";

export default function BlogSection() {
  const posts = [
    {
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=600&auto=format&fit=crop",
      category: "نصائح عقارية",
      title: "٥ أشياء يجب مراعاتها قبل شراء منزلك الأول",
      date: "٢٠ أبريل ٢٠٢٥",
    },
    {
      image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=600&auto=format&fit=crop",
      category: "اتجاهات السوق",
      title: "اتجاهات السوق العقاري في ٢٠٢٥: ماذا تتوقع؟",
      date: "٢٢ أبريل ٢٠٢٥",
    },
    {
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=600&auto=format&fit=crop",
      category: "تصميم المنزل",
      title: "أفكار تصميم منزل عصري لأسلوب حياة أفضل",
      date: "١٥ أبريل ٢٠٢٥",
    },
  ];

  return (
    <section className="py-24 bg-white" id="blog" dir="rtl">
      <div className="container-custom">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-1 bg-[#148968] rounded-full"></span>
              <p className="text-[#148968] font-bold text-[13px] tracking-widest uppercase">
                أحدث المقالات
              </p>
            </div>
            <h2 className="text-3xl md:text-[38px] font-bold text-gray-900 leading-[1.2]">
              نصائح، اتجاهات، ورؤى <br /> من مدونتنا
            </h2>
          </div>
          <Link href="/blog" className="group flex items-center gap-2 text-gray-500 hover:text-[#148968] transition-colors text-sm font-semibold mt-4 md:mt-0">
            عرض كل المقالات <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post, idx) => (
            <Link href={`/blog/${idx + 1}`} key={idx} className="group cursor-pointer block">
              <div className="relative h-60 rounded-3xl overflow-hidden mb-5">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md text-gray-900 text-[11px] font-bold px-3 py-1.5 rounded-[8px]">
                  {post.category}
                </div>
              </div>
              <h3 className="text-[17px] font-bold text-gray-900 mb-4 leading-[1.4] group-hover:text-[#148968] transition-colors">
                {post.title}
              </h3>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-[13px] font-bold text-[#148968] inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  اقرأ المزيد <FiArrowLeft />
                </span>
                <span className="text-[12px] text-gray-400">{post.date}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
