import { FiCheck, FiArrowLeft, FiShield, FiUserCheck, FiUsers, FiSearch } from "react-icons/fi";
import Link from "next/link";

export default function WhyChooseUs() {
  const points = [
    { icon: <FiShield />, title: "قوائم عالية الجودة", desc: "عقارات فاخرة منتقاة بعناية" },
    { icon: <FiUserCheck />, title: "التركيز على العميل", desc: "أهدافك هي أولويتنا" },
    { icon: <FiUsers />, title: "توجيه الخبراء", desc: "من البحث إلى الاستلام" },
    { icon: <FiSearch />, title: "عملية شفافة", desc: "لا رسوم خفية، لا مفاجآت" },
  ];

  return (
    <section className="pt-16 pb-16 bg-[#082b26] relative overflow-hidden" dir="rtl">
      <div className="container-custom">
        <div className="relative flex flex-col lg:flex-row items-stretch min-h-[480px]">
          
          {/* 1. Text Section (Right side in RTL) */}
          <div className="lg:w-[40%] p-10 md:p-16 flex flex-col justify-center relative z-20">
            <p className="text-white/60 font-semibold text-[10px] tracking-widest uppercase mb-4 flex items-center gap-2">
              لماذا تختار أكواد العقاريه
            </p>
            <h2 className="text-3xl md:text-[40px] font-bold text-white mb-6 leading-[1.2]">
              مبني على الثقة، <br /> مدفوع بالتميز
            </h2>
            <p className="text-white/70 text-[14px] md:text-[15px] mb-10 leading-[1.8] max-w-[380px]">
              في أكواد العقاريه العقارية، نتجاوز مجرد القوائم. نقدم تجربة عقارية سلسة مع إرشادات الخبراء، وعمليات شفافة، والتزام بتحقيق أهدافك.
            </p>
            <div>
              <Link href="/about" className="border border-white/20 text-white hover:bg-white hover:text-[#082b26] px-8 py-3.5 rounded-full text-[13px] font-bold transition-all duration-300 inline-flex items-center gap-3 group">
                اعرف المزيد 
                <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* 2. Middle Image Section */}
          <div className="w-full lg:w-[35%] relative h-[300px] lg:h-auto lg:min-h-full flex-1 px-6 lg:px-0 lg:py-10">
            {/* Image Container with rounded corners instead of slanted cut */}
            <div className="w-full h-full rounded-[2rem] shadow-2xl relative overflow-hidden border border-white/10">
              <img 
                src="/images/about us.jpeg" 
                alt="لماذا تختار أكواد العقاريه"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-[#082b26]/10"></div>
            </div>
          </div>

          {/* 3. Features List Section (Left side in RTL) */}
          <div className="lg:w-[25%] p-10 md:py-16 md:pl-16 md:pr-4 flex flex-col justify-center gap-8 relative z-20 bg-[#082b26] lg:bg-transparent">
            {points.map((point, idx) => (
              <div key={idx} className="flex items-center gap-4 group">
                <div className="w-[50px] h-[50px] rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#148968] text-[20px] shrink-0 group-hover:bg-[#148968] group-hover:text-white transition-colors duration-300">
                  {point.icon}
                </div>
                <div>
                  <h4 className="text-white font-bold text-[15px] mb-1">{point.title}</h4>
                  <p className="text-white/50 text-[12px] leading-snug">{point.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
