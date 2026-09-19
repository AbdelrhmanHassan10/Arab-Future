import { FiSearch, FiCalendar, FiCheckSquare, FiHome, FiArrowLeft } from "react-icons/fi";
import Link from "next/link";

export default function ProcessSection() {
  const steps = [
    {
      num: "01",
      icon: <FiSearch />,
      title: "البحث والاستكشاف",
      desc: "تصفح آلاف القوائم الموثوقة بسهولة.",
    },
    {
      num: "02",
      icon: <FiCalendar />,
      title: "تحديد موعد",
      desc: "احجز جولة في الوقت المناسب لك.",
    },
    {
      num: "03",
      icon: <FiCheckSquare />,
      title: "تقديم عرض",
      desc: "احصل على دعم الخبراء في التفاوض.",
    },
    {
      num: "04",
      icon: <FiHome />,
      title: "إتمام الصفقة",
      desc: "انتقل لمنزلك الجديد بكل ثقة.",
    },
  ];

  return (
    <section className="pt-2 pb-20 bg-[#f8fafa] relative z-0" id="process" dir="rtl">
      <div className="container-custom relative">
        {/* Top Area: Text and Image */}
        <div className="flex flex-col lg:flex-row-reverse justify-between items-center mb-14 gap-10 lg:gap-14">
          
          {/* Text Content */}
          <div className="lg:w-1/2 w-full relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-1 bg-[#148968] rounded-full"></span>
              <p className="text-[#148968] font-bold text-[13px] tracking-widest uppercase">
                خطواتنا
              </p>
            </div>
            <h2 className="text-4xl md:text-[48px] font-extrabold text-[#082b26] mb-8 leading-[1.25]">
              عملية بسيطة <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-[#148968] to-[#082b26]">نحو منزلك الجديد</span>
            </h2>
            <p className="text-gray-500 text-[16px] max-w-[420px] leading-relaxed">
              من أول بحث لك وحتى الأوراق النهائية، نجعل العملية سهلة، شفافة، وخالية تماماً من التوتر. رحلتك الاستثمارية تبدأ بخطوات واثقة.
            </p>
          </div>
          
          {/* Premium Image Content */}
          <div className="lg:w-1/2 w-full relative mt-6 lg:mt-0">
            {/* Main Image with sophisticated rounded corners and border */}
            <div className="rounded-[3rem] overflow-hidden h-[420px] w-full shadow-[0_20px_50px_rgba(8,43,38,0.12)] relative border-4 border-white">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#082b26]/20 to-transparent z-10 pointer-events-none transition-opacity duration-500 hover:opacity-0"></div>
              <img 
                src="https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?q=80&w=800&auto=format&fit=crop" 
                alt="خطوات شراء منزل"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000 ease-in-out"
              />
            </div>
            {/* Ultra Premium Floating Card (Glassmorphism) */}
            <div className="absolute -bottom-8 left-4 lg:left-8 bg-white/90 backdrop-blur-xl rounded-[24px] p-4 pr-6 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] flex items-center gap-5 z-20 border border-white/50">
              <div className="flex flex-col text-right">
                <span className="text-[16px] font-extrabold text-[#082b26] leading-snug">
                  منزل أحلامك
                </span>
                <span className="text-[#148968] font-bold text-[13px] mt-1">
                  أقرب مما تتخيل 
                </span>
              </div>
              <Link href="/contact" className="w-[56px] h-[56px] rounded-full bg-[#082b26] text-white flex items-center justify-center shadow-lg hover:bg-[#148968] hover:scale-105 transition-all duration-300 cursor-pointer">
                <FiArrowLeft className="text-[22px]" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Area: Steps inside a wide white card */}
        <div className="bg-white rounded-[40px] p-8 lg:p-12 shadow-[0_30px_60px_-15px_rgba(8,43,38,0.08)] border border-gray-100 relative z-20">
          
          {/* Continuous Progress Line */}
          <div className="hidden lg:block absolute top-[88px] left-[15%] right-[15%] h-[2px] bg-gradient-to-l from-gray-100 via-[#148968]/30 to-gray-100 z-0"></div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10 relative z-10">
            {steps.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center text-center relative group">
                
                {/* Watermark Number on Hover */}
                <div className="absolute -top-6 -right-2 text-[70px] font-black text-gray-50 opacity-0 group-hover:opacity-100 group-hover:-translate-y-2 transition-all duration-500 -z-10 pointer-events-none select-none">
                  {step.num}
                </div>

                {/* Premium Icon Circle Layout */}
                <div className="w-[84px] h-[84px] rounded-full bg-[#f4f7f6] flex items-center justify-center mb-8 relative group-hover:-translate-y-2 transition-transform duration-500 shadow-sm border border-white">
                  {/* Inner White Circle */}
                  <div className="w-[60px] h-[60px] rounded-full bg-white shadow-md flex items-center justify-center text-[#148968] text-[26px] group-hover:bg-[#148968] group-hover:text-white transition-colors duration-500">
                    {step.icon}
                  </div>
                  
                  {/* Floating Step Number Badge */}
                  <div className="absolute -bottom-2 -left-2 w-9 h-9 rounded-full bg-[#082b26] text-white text-[13px] font-bold flex items-center justify-center border-4 border-white shadow-sm group-hover:scale-110 transition-transform duration-300">
                    {step.num}
                  </div>
                </div>

                {/* Connecting Arrow between steps */}
                {idx < steps.length - 1 && (
                  <div className="hidden lg:flex absolute left-[-45px] top-[42px] -translate-y-1/2 text-[#148968] bg-white rounded-full p-2 shadow-sm border border-gray-100 z-20 items-center justify-center">
                    <FiArrowLeft className="text-[20px]" />
                  </div>
                )}

                {/* Text Content */}
                <h3 className="text-[19px] font-bold text-[#082b26] mb-3 group-hover:text-[#148968] transition-colors">{step.title}</h3>
                <p className="text-[14px] text-gray-500 leading-relaxed max-w-[220px] mx-auto lg:mx-0">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
