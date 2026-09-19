import Link from "next/link";
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin, FiArrowLeft } from "react-icons/fi";
import { HiHome } from "react-icons/hi2";

export default function Footer() {
  const quickLinks = [
    { name: "الرئيسية", href: "/" },
    { name: "عقارات", href: "/units" },
    { name: "من نحن", href: "/about" },
    { name: "الخدمات", href: "/services" },
    { name: "المدونة", href: "/blog" },
    { name: "اتصل بنا", href: "/contact" },
  ];

  const propertyTypes = [
    { name: "منازل", href: "/units?type=house" },
    { name: "شقق", href: "/units?type=apartment" },
    { name: "فيلات", href: "/units?type=villa" },
    { name: "تجاري", href: "/units?type=commercial" },
    { name: "أراضي", href: "/units?type=land" },
  ];

  const supportLinks = [
    { name: "مركز المساعدة", href: "/contact" },
    { name: "سياسة الخصوصية", href: "/privacy" },
    { name: "الشروط والأحكام", href: "/terms" },
    { name: "الأسئلة الشائعة", href: "/faq" },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-[#082b26] to-[#041613] pt-32 pb-8 overflow-hidden" dir="rtl">
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-x-4 gap-y-12 lg:gap-8 mb-16 lg:mb-20">
          
          {/* Brand & Info */}
          <div className="col-span-2 lg:col-span-3 flex flex-col items-center lg:items-start text-center lg:text-right pr-0 md:pr-4">
            <Link href="/" className="flex items-center justify-center lg:justify-start gap-3 text-white font-bold text-3xl mb-6 group">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#20d09f] to-[#148968] flex items-center justify-center text-[#082b26] group-hover:scale-105 transition-transform duration-300 shadow-[0_10px_20px_rgba(32,208,159,0.3)]">
                <HiHome className="text-2xl" />
              </div>
              <span className="tracking-tight">أكواد العقاريه</span>
            </Link>
            <p className="text-white/60 text-[14px] leading-loose mb-8 max-w-[300px] mx-auto lg:mx-0">
              نجعل العثور على عقارك المثالي أمراً سهلاً وموثوقاً. التزامنا هو مساعدتك في كل خطوة نحو منزلك الجديد.
            </p>
            <div className="flex items-center justify-center lg:justify-start gap-4">
              <a href="#" className="w-11 h-11 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-[#20d09f] hover:text-[#082b26] hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(32,208,159,0.2)] transition-all duration-300 border border-white/10">
                <FiFacebook className="text-[17px]" />
              </a>
              <a href="#" className="w-11 h-11 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-[#20d09f] hover:text-[#082b26] hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(32,208,159,0.2)] transition-all duration-300 border border-white/10">
                <FiTwitter className="text-[17px]" />
              </a>
              <a href="#" className="w-11 h-11 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-[#20d09f] hover:text-[#082b26] hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(32,208,159,0.2)] transition-all duration-300 border border-white/10">
                <FiInstagram className="text-[17px]" />
              </a>
              <a href="#" className="w-11 h-11 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-[#20d09f] hover:text-[#082b26] hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(32,208,159,0.2)] transition-all duration-300 border border-white/10">
                <FiLinkedin className="text-[17px]" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1 lg:col-span-2">
            <h4 className="text-white font-bold mb-6 lg:mb-8 text-[15px] lg:text-[16px] tracking-wide relative inline-block">
              روابط سريعة
              <span className="absolute -bottom-2 right-0 w-8 h-1 bg-[#20d09f] rounded-full"></span>
            </h4>
            <ul className="flex flex-col gap-4 lg:gap-5 text-[14px] text-white/60">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="group flex items-center gap-3 hover:text-[#20d09f] transition-colors duration-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-[#20d09f] transition-colors"></span>
                    <span className="group-hover:-translate-x-2 transition-transform duration-300">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Property Types */}
          <div className="col-span-1 lg:col-span-2">
            <h4 className="text-white font-bold mb-6 lg:mb-8 text-[15px] lg:text-[16px] tracking-wide relative inline-block">
              أنواع العقارات
              <span className="absolute -bottom-2 right-0 w-8 h-1 bg-[#20d09f] rounded-full"></span>
            </h4>
            <ul className="flex flex-col gap-4 lg:gap-5 text-[14px] text-white/60">
              {propertyTypes.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="group flex items-center gap-3 hover:text-[#20d09f] transition-colors duration-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-[#20d09f] transition-colors"></span>
                    <span className="group-hover:-translate-x-2 transition-transform duration-300">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="col-span-2 lg:col-span-2">
            <h4 className="text-white font-bold mb-6 lg:mb-8 text-[16px] tracking-wide relative inline-block">
              الدعم
              <span className="absolute -bottom-2 right-0 w-8 h-1 bg-[#20d09f] rounded-full"></span>
            </h4>
            <ul className="grid grid-cols-2 sm:grid-cols-2 lg:flex lg:flex-col gap-4 lg:gap-5 text-[14px] text-white/60">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="group flex items-center gap-3 hover:text-[#20d09f] transition-colors duration-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-[#20d09f] transition-colors"></span>
                    <span className="group-hover:-translate-x-2 transition-transform duration-300">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Newsletter */}
          <div className="col-span-2 lg:col-span-3 flex flex-col items-center lg:items-start text-center lg:text-right mt-4 lg:mt-0">
            <h4 className="text-white font-bold mb-6 lg:mb-8 text-[16px] tracking-wide relative inline-block">
              النشرة البريدية
              <span className="absolute -bottom-2 right-1/2 translate-x-1/2 lg:translate-x-0 lg:right-0 w-8 h-1 bg-[#20d09f] rounded-full"></span>
            </h4>
            <p className="text-white/70 text-[14px] leading-relaxed mb-6 max-w-[300px] lg:max-w-full">
              اشترك في نشرتنا البريدية ليصلك أحدث العروض العقارية وأخبار السوق مباشرة إلى بريدك.
            </p>
            <div className="relative mt-2 w-full max-w-[350px] lg:max-w-full">
              <input 
                type="email" 
                placeholder="بريدك الإلكتروني" 
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-[14px] text-white focus:outline-none focus:border-[#20d09f] focus:bg-white/10 transition-all placeholder:text-white/30"
              />
              <button className="absolute left-2 top-2 bottom-2 px-6 bg-[#20d09f] hover:bg-[#148968] rounded-xl flex items-center justify-center text-[#082b26] hover:text-white font-bold transition-colors duration-300 shadow-[0_5px_15px_rgba(32,208,159,0.2)]">
                اشتراك
              </button>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-4 md:gap-6 pt-8 border-t border-white/10 relative z-10 text-center md:text-right">
          <p className="text-white/40 text-[13px] font-medium mt-2 md:mt-0">
            © {new Date().getFullYear()} <span className="text-white/70">أكواد العقاريه</span> للخدمات العقارية. جميع الحقوق محفوظة.
          </p>
          <div className="flex items-center justify-center gap-6 md:gap-8 text-[13px] font-medium text-white/40">
            <Link href="/privacy" className="hover:text-[#20d09f] transition-colors">سياسة الخصوصية</Link>
            <Link href="/terms" className="hover:text-[#20d09f] transition-colors">الشروط والأحكام</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
