import { FiShield, FiTag, FiUsers, FiLock, FiCheckCircle, FiMapPin, FiHeadphones } from "react-icons/fi";

export default function FeaturesBar() {
  const features = [
    {
      icon: <FiLock />,
      title: "موثوق ومضمون",
      desc: "عقارات تم التحقق منها بنسبة ١٠٠٪ لضمان حقك وأمانك.",
    },
    {
      icon: <FiMapPin />,
      title: "ضمان أفضل سعر",
      desc: "احصل على أفضل الصفقات والأسعار التنافسية في السوق.",
    },
    {
      icon: <FiHeadphones />,
      title: "دعم الخبراء",
      desc: "فريقنا متواجد دائماً لمساعدتك في كل خطوة.",
    },
    {
      icon: <FiShield />,
      title: "معاملات آمنة",
      desc: "عملية قانونية وشفافة وخالية من أي متاعب.",
    },
  ];

  return (
    <section className="pt-24 pb-32 bg-[#eaf5f0] relative z-0" dir="rtl">
      <div className="container-custom relative z-10">
        
        {/* Modern Grid Layout with Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
          {features.map((feature, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-[28px] p-8 relative overflow-hidden group hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(20,137,104,0.15)] transition-all duration-300 border border-transparent hover:border-[#148968]/10"
            >
              {/* Decorative top right shape */}
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-[#eaf5f0] rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500 pointer-events-none"></div>

              {/* Icon & Badge Container */}
              <div className="flex items-start justify-between mb-8 relative z-10">
                <div className="w-16 h-16 rounded-[20px] bg-[#eaf5f0] flex items-center justify-center text-[#148968] text-2xl group-hover:bg-[#148968] group-hover:text-white transition-colors duration-300 shadow-sm">
                  {feature.icon}
                </div>
                
                <div className="flex items-center justify-center w-8 h-8 bg-green-50 text-[#148968] rounded-full">
                  <FiCheckCircle className="text-lg" />
                </div>
              </div>
              
              {/* Text Content */}
              <div className="relative z-10">
                <h3 className="text-[19px] font-bold text-[#082b26] mb-3 group-hover:text-[#148968] transition-colors">{feature.title}</h3>
                <p className="text-[14px] text-gray-500 leading-[1.8]">
                  {feature.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
