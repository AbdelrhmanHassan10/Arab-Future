import { FiSearch, FiDollarSign, FiKey, FiTrendingUp, FiArrowLeft } from "react-icons/fi";
import Link from "next/link";

export default function ServicesSection() {
  const services = [
    {
      icon: <FiSearch />,
      title: "شراء عقار",
      desc: "ابحث عن منزل أحلامك",
    },
    {
      icon: <FiDollarSign />,
      title: "بيع عقار",
      desc: "احصل على أفضل قيمة",
    },
    {
      icon: <FiKey />,
      title: "تأجير عقار",
      desc: "مرونة وبدون متاعب",
    },
    {
      icon: <FiTrendingUp />,
      title: "الاستثمار العقاري",
      desc: "ابنِ مستقبلك باختيارات ذكية",
    },
  ];

  return (
    <section className="pt-16 pb-10 bg-[#f8fafa]" id="services" dir="rtl">
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          
          {/* Text Content Section (Right side in RTL) */}
          <div className="lg:w-[55%] w-full">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-1 bg-[#148968] rounded-full"></span>
              <p className="text-[#148968] font-bold text-[13px] tracking-widest uppercase">
                خدماتنا
              </p>
            </div>
            <h2 className="text-3xl md:text-[42px] font-extrabold text-[#082b26] mb-6 leading-[1.25]">
              كل ما تحتاجه <br /> تحت سقف واحد
            </h2>
            <p className="text-gray-500 text-[15px] mb-12 max-w-[95%] leading-relaxed">
              من البيع والشراء إلى استشارات الاستثمار، نقدم خدمات عقارية متكاملة مصممة خصيصاً لتلبية احتياجاتك بكل احترافية وشفافية.
            </p>

            {/* Services Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {services.map((service, idx) => (
                <div key={idx} className="flex items-center gap-4 bg-white p-5 rounded-[20px] shadow-sm border border-gray-100 hover:shadow-md hover:border-[#148968]/30 hover:-translate-y-1 transition-all duration-300 group">
                  <div className="w-[52px] h-[52px] rounded-full bg-[#eaf5f0] flex items-center justify-center text-[#148968] text-[22px] shrink-0 group-hover:bg-[#148968] group-hover:text-white transition-colors duration-300">
                    {service.icon}
                  </div>
                  <div>
                    <h4 className="text-[#082b26] font-bold text-[16px] mb-1">{service.title}</h4>
                    <p className="text-gray-500 text-[13px] leading-tight">{service.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image Section (Left side in RTL) */}
          <div className="lg:w-[45%] w-full relative mt-8 lg:mt-0">
            <div className="rounded-[32px] overflow-hidden h-[500px] w-full shadow-2xl relative group border border-gray-100/50">
              <img 
                src="https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?q=80&w=800&auto=format&fit=crop" 
                alt="خدمات عقارية"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              {/* Arrow Link overlaid on image (Inner corner) */}
              <Link href="/services" className="absolute bottom-6 right-6 w-[60px] h-[60px] rounded-full bg-[#082b26] text-white flex items-center justify-center border-4 border-white/20 hover:bg-[#148968] transition-colors shadow-xl">
                <FiArrowLeft className="text-[22px]" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
