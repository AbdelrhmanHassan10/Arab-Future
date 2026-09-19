import { FiArrowLeft, FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import { HiOutlineChatBubbleBottomCenterText } from "react-icons/hi2";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="bg-[#eaf5f0] relative mt-20" dir="rtl">
      {/* Decorative Background Orbs */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-gradient-to-br from-[#20d09f]/10 to-[#148968]/5 rounded-full blur-[100px] pointer-events-none z-0"></div>
      <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-[#20d09f]/20 rounded-full blur-[100px] pointer-events-none z-0"></div>

      <div className="container-custom pt-20 md:pt-32 pb-32 md:pb-52 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-12">

          {/* Text Content */}
          <div className="lg:w-[50%] relative z-10 text-center lg:text-right">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white rounded-full text-[#148968] font-bold text-[14px] shadow-sm mb-6 border border-[#148968]/10 animate-fade-in-up">
              <HiOutlineChatBubbleBottomCenterText className="text-[18px]" />
              <span>نحن هنا لخدمتك</span>
            </div>
            
            <h2 className="text-4xl md:text-[55px] font-extrabold text-[#082b26] mb-8 leading-[1.25] tracking-tight">
              جاهز للعثور على <br /> 
              <span className="relative inline-block mt-2">
                <span className="relative z-10 text-[#148968]">عقار أحلامك؟</span>
                <svg className="absolute -bottom-2 right-0 w-full h-[15px] text-[#20d09f]/30 -z-10" viewBox="0 0 200 20" preserveAspectRatio="none">
                  <path d="M0,10 C50,20 150,0 200,10" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round"/>
                </svg>
              </span>
            </h2>
            
            <p className="text-gray-600 text-[16px] md:text-[18px] mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium">
              لنجعل أهدافك العقارية حقيقة. تواصل مع فريق خبرائنا في أكواد العقاريه اليوم لبدء رحلتك نحو المنزل المثالي بكل ثقة وأمان.
            </p>
            
            <Link href="/contact" className="group relative inline-flex items-center justify-center gap-3 bg-[#148968] text-white px-10 py-4 rounded-full text-[16px] font-bold overflow-hidden transition-all duration-300 hover:shadow-[0_15px_30px_rgba(20,137,104,0.3)] hover:-translate-y-1">
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#148968] to-[#20d09f] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative z-10">تواصل معنا الآن</span>
              <FiArrowLeft className="relative z-10 text-xl group-hover:-translate-x-1 transition-transform duration-300" />
            </Link>
          </div>

          {/* Image & Modern Contact Card */}
          <div className="lg:w-[50%] relative z-10 w-full flex justify-center lg:justify-end mt-12 lg:mt-0">
            <div className="relative w-full max-w-[500px]">
              
              {/* Main Image */}
              <div className="relative rounded-[40px] overflow-hidden h-[400px] md:h-[500px] shadow-[0_30px_60px_rgba(0,0,0,0.15)] group">
                <div className="absolute inset-0 bg-[#082b26]/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                <img 
                  src="/pexels-ela-de-pure-1402904686-33599113.jpg" 
                  alt="منزل الأحلام"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
              </div>
              
              {/* Floating Glassmorphic Contact Card */}
              <div className="absolute -bottom-16 lg:-bottom-12 right-4 left-4 lg:right-auto lg:-left-16 bg-white/80 backdrop-blur-2xl rounded-[32px] p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white z-20 flex flex-col gap-6 md:min-w-[320px] transition-transform duration-500 hover:-translate-y-2">
                
                {/* Phone */}
                <div className="flex items-center gap-4 group/item cursor-default">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[#148968] shrink-0 border border-gray-100 group-hover/item:scale-110 group-hover/item:bg-[#148968] group-hover/item:text-white transition-all duration-300">
                    <FiPhone className="text-xl" />
                  </div>
                  <div>
                    <p className="text-[11px] text-gray-400 font-bold uppercase mb-0.5 tracking-wider">اتصل بنا</p>
                    <p className="text-[15px] font-extrabold text-gray-900" dir="ltr">+20 123 456 7890</p>
                  </div>
                </div>
                
                {/* Email */}
                <div className="flex items-center gap-4 group/item cursor-default">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[#148968] shrink-0 border border-gray-100 group-hover/item:scale-110 group-hover/item:bg-[#148968] group-hover/item:text-white transition-all duration-300">
                    <FiMail className="text-xl" />
                  </div>
                  <div>
                    <p className="text-[11px] text-gray-400 font-bold uppercase mb-0.5 tracking-wider">البريد الإلكتروني</p>
                    <p className="text-[15px] font-extrabold text-gray-900">hello@alharagawy.com</p>
                  </div>
                </div>
                
                {/* Location */}
                <div className="flex items-center gap-4 group/item cursor-default">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[#148968] shrink-0 border border-gray-100 group-hover/item:scale-110 group-hover/item:bg-[#148968] group-hover/item:text-white transition-all duration-300">
                    <FiMapPin className="text-xl" />
                  </div>
                  <div>
                    <p className="text-[11px] text-gray-400 font-bold uppercase mb-0.5 tracking-wider">المقر الرئيسي</p>
                    <p className="text-[14px] font-extrabold text-gray-900">١٢٣ شارع العقارات، القاهرة</p>
                  </div>
                </div>

              </div>
            </div>
          </div>

      </div>

      {/* SVG Wave Cut at the bottom */}
      <div className="absolute bottom-0 left-0 w-full z-0 leading-none translate-y-[1px] block">
        <svg viewBox="0 0 1440 120" className="w-full h-[50px] md:h-[150px] block" preserveAspectRatio="none">
          <path d="M0,64L80,74.7C160,85,320,107,480,106.7C640,107,800,85,960,69.3C1120,53,1280,43,1360,37.3L1440,32L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" fill="#082b26" />
        </svg>
      </div>
    </section>
  );
}
