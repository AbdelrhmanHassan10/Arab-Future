import { FiArrowLeft, FiStar } from "react-icons/fi";
import Link from "next/link";

export default function Testimonials() {
  const testimonials = [
    {
      quote: "فريق أكواد العقاريه جعل تجربة شراء منزلنا سهلة للغاية. كانوا محترفين، متجاوبين، واهتموا حقاً باحتياجاتنا.",
      name: "سارة محمود",
      location: "القاهرة، مصر",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    {
      quote: "خدمة رائعة ودعم ممتاز من أكواد العقاريهة للنهاية. أوصي بشدة بالتعامل مع أكواد العقاريه العقارية لأي شخص يبحث عن شريك موثوق.",
      name: "أحمد حسن",
      location: "الإسكندرية، مصر",
      avatar: "https://i.pravatar.cc/150?img=11",
    },
    {
      quote: "وجدنا فيلا أحلامنا من خلالكم. كانت العملية سلسة وشفافة وخالية من أي ضغوط.",
      name: "منى علي",
      location: "بني سويف، مصر",
      avatar: "https://i.pravatar.cc/150?img=5",
    },
  ];

  return (
    <section className="py-24 bg-[#f8f9fa]" dir="rtl">
      <div className="container-custom">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-1 bg-[#148968] rounded-full"></span>
              <p className="text-[#148968] font-bold text-[13px] tracking-widest uppercase">
                آراء العملاء
              </p>
            </div>
            <h2 className="text-3xl md:text-[38px] font-bold text-gray-900 leading-[1.2]">
              ماذا يقول عملاؤنا <br /> عنا
            </h2>
          </div>
          <Link href="/reviews" className="group flex items-center gap-2 text-gray-500 hover:text-[#148968] transition-colors text-sm font-semibold mt-4 md:mt-0">
            عرض كل الآراء <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testi, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col justify-between border border-transparent hover:border-gray-100 transition-colors">
              <p className="text-gray-700 text-[15px] font-medium leading-relaxed mb-10">
                "{testi.quote}"
              </p>
              
              <div className="flex items-center gap-4">
                <img 
                  src={testi.avatar} 
                  alt={testi.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-[14px] font-bold text-gray-900">{testi.name}</h4>
                  <p className="text-[12px] text-gray-500">{testi.location}</p>
                  <div className="flex text-[#f59e0b] text-[10px] mt-1.5 gap-0.5">
                    <FiStar className="fill-current" />
                    <FiStar className="fill-current" />
                    <FiStar className="fill-current" />
                    <FiStar className="fill-current" />
                    <FiStar className="fill-current" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
