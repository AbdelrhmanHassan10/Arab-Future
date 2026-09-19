import { FiArrowLeft } from "react-icons/fi";
import Link from "next/link";

export default function PropertyTypes() {
  const types = [
    {
      title: "منازل",
      desc: "واسعة ومريحة",
      price: "تبدأ من ٤٥٠,٠٠٠ ج.م",
      image: "/pexels-ela-de-pure-1402904686-33599113.jpg",
      href: "/units"
    },
    {
      title: "شقق",
      desc: "حياة عصرية",
      price: "تبدأ من ٣٢٠,٠٠٠ ج.م",
      image: "/pexels-perqued-13203179.jpg",
      href: "/units"
    },
    {
      title: "فيلات",
      desc: "فخامة وخصوصية",
      price: "تبدأ من ١,٢٠٠,٠٠٠ ج.م",
      image: "/pexels-perqued-13722891.jpg",
      href: "/units"
    },
    {
      title: "تجاري",
      desc: "فرص أعمال مميزة",
      price: "تبدأ من ٧٥٠,٠٠٠ ج.م",
      image: "/images/hero.jpeg",
      href: "/units"
    },
  ];

  return (
    <section className="py-24 bg-[#082b26]" dir="rtl">
      <div className="container-custom">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
          <div className="lg:w-1/2">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-1 bg-[#148968] rounded-full"></span>
              <p className="text-[#148968] font-bold text-[13px] tracking-widest uppercase">
                أنواع العقارات
              </p>
            </div>
            <h2 className="text-3xl md:text-[38px] font-bold text-white mb-4 leading-[1.2]">
              اعثر على العقار المثالي <br /> لاحتياجاتك
            </h2>
          </div>
          <div className="lg:w-1/2 flex md:justify-end items-end">
            <div className="max-w-[400px] md:text-left">
              <p className="text-white/60 text-[14px] mb-6 hidden md:block text-right md:text-left leading-relaxed">
                سواء كنت تبحث عن منزل عائلي، أو شقة عصرية، أو استثمار بعائد مرتفع، لدينا الخيارات المناسبة لك.
              </p>
              <Link href="/units" className="border border-white/20 text-white hover:bg-white/10 px-6 py-2.5 rounded-full text-sm font-semibold transition-colors inline-flex items-center gap-2 float-right md:float-left">
                تصفح كل العقارات <FiArrowLeft />
              </Link>
            </div>
          </div>
        </div>

        {/* Accordion Layout */}
        <div className="flex flex-col lg:flex-row gap-4 h-[800px] lg:h-[500px] w-full">
          {types.map((type, idx) => (
            <Link 
              href={type.href} 
              key={idx} 
              className="relative rounded-[2rem] overflow-hidden flex-1 hover:flex-[3] transition-all duration-700 ease-out group cursor-pointer border border-white/10"
            >
              {/* Background Image */}
              <img 
                src={type.image} 
                alt={type.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#082b26] via-[#082b26]/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-700"></div>
              
              {/* Content */}
              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                {/* Title and Icon container */}
                <div className="flex justify-between items-end w-full">
                  <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-2">{type.title}</h3>
                    
                    {/* Expandable Details */}
                    <div className="overflow-hidden max-h-0 group-hover:max-h-[100px] opacity-0 group-hover:opacity-100 transition-all duration-700 ease-in-out">
                      <p className="text-white/80 text-[15px] mb-2">{type.desc}</p>
                      <span className="text-[#20d09f] font-bold text-[16px] block">{type.price}</span>
                    </div>
                  </div>

                  {/* Arrow Button */}
                  <div className="w-12 h-12 rounded-full bg-white text-[#082b26] flex items-center justify-center shrink-0 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-500 ease-out shadow-lg mb-2">
                    <FiArrowLeft className="text-xl" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
