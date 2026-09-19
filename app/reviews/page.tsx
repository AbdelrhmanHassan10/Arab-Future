import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import { FiStar } from "react-icons/fi";

const allTestimonials = [
  {
    quote: "فريق أكواد العقاريه جعل تجربة شراء منزلنا سهلة للغاية. كانوا محترفين، متجاوبين، واهتموا حقاً باحتياجاتنا.",
    name: "سارة محمود",
    location: "القاهرة، مصر",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    quote: "خدمة رائعة ودعم ممتاز من البداية للنهاية. أوصي بشدة بالتعامل مع أكواد العقاريه العقارية لأي شخص يبحث عن شريك موثوق.",
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
  {
    quote: "تعاملت مع العديد من الشركات العقارية، لكن أكواد العقاريه تميزوا بمصداقيتهم وشفافيتهم العالية. تجربة استثنائية بكل المقاييس.",
    name: "خالد عبد الرحمن",
    location: "الجيزة، مصر",
    avatar: "https://i.pravatar.cc/150?img=8",
  },
  {
    quote: "فريق عمل متعاون جداً، ساعدوني في اختيار الموقع المناسب لمشروعي التجاري. شكراً جزيلاً لجهودكم.",
    name: "محمد طارق",
    location: "التجمع الخامس، القاهرة",
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    quote: "استجابة سريعة واحترافية في التعامل. لقد وفروا عليّ الكثير من الوقت والجهد في رحلة البحث عن عقار.",
    name: "نورهان سعيد",
    location: "الشيخ زايد، الجيزة",
    avatar: "https://i.pravatar.cc/150?img=9",
  },
];

export default function ReviewsPage() {
  return (
    <>
      <Navbar />
      
      <main className="pt-32 pb-20 bg-[#f8f9fa] min-h-screen" dir="rtl">
        <div className="container-custom">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="w-8 h-1 bg-[#148968] rounded-full"></span>
              <p className="text-[#148968] font-bold text-[14px] tracking-widest uppercase">
                آراء عملائنا
              </p>
              <span className="w-8 h-1 bg-[#148968] rounded-full"></span>
            </div>
            <h1 className="text-4xl md:text-[50px] font-bold text-gray-900 leading-[1.2]">
              تجارب حقيقية من <br /> شركاء نجاحنا
            </h1>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allTestimonials.map((testi, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col justify-between border border-transparent hover:border-[#148968]/20 hover:shadow-lg transition-all duration-300">
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
      </main>

      <CTASection />
      <Footer />
    </>
  );
}
