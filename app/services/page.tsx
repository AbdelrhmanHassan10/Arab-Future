"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

const mainServices = [
  {
    id: "project-management",
    title: "إدارة المشاريع",
    titleEn: "Project Management",
    description: "إشراف من البداية للنهاية على جميع مراحل المشروع بأعلى معايير الجودة والالتزام بالجداول الزمنية. نتولى التنسيق الكامل بين جميع الأطراف لضمان تنفيذ سلس واحترافي.",
    features: ["التخطيط والجدولة الزمنية", "متابعة التنفيذ الميداني", "ضبط الجودة والتكاليف", "التنسيق بين الفرق"],
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
      </svg>
    ),
  },
  {
    id: "architectural-design",
    title: "التصميم المعماري",
    titleEn: "Architectural Design",
    description: "مخططات مبتكرة وعملية تجمع بين الجمال الفني والوظيفية لمشاريع استثنائية. نقدم تصاميم تراعي البيئة المحلية وتطلعات العميل مع الالتزام بأحدث المعايير الهندسية.",
    features: ["تصميم الواجهات الخارجية", "المخططات المعمارية", "التصميم ثلاثي الأبعاد", "دراسات الجدوى الفنية"],
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
  },
  {
    id: "interior-design",
    title: "تصميم وتشطيبات داخلية",
    titleEn: "Interior Design & Finishing",
    description: "مساحات أنيقة ومريحة تعكس الذوق الرفيع والتفاصيل الدقيقة في كل زاوية. نصمم بيئات داخلية تجمع بين الراحة والجمال مع مراعاة الطابع المعماري العام.",
    features: ["تصميم المساحات الداخلية", "اختيار المواد والتشطيبات", "الإضاءة والألوان", "الأثاث والديكور"],
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
  },
  {
    id: "hardscape",
    title: "أعمال الهارد سكيب",
    titleEn: "Hardscape Works",
    description: "تصميم وتنفيذ التشكيلات الخارجية للحدائق والمساحات المفتوحة بما يحقق التوازن بين الشكل الجمالي والوظيفة العملية.",
    features: ["الممرات والطرق الداخلية", "الأرضيات الخارجية والإنترلوك", "جلسات خارجية وPergola", "عناصر الديكور الخارجي"],
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
      </svg>
    ),
  },
  {
    id: "maintenance",
    title: "الصيانة والتشغيل",
    titleEn: "Maintenance & Operations",
    description: "خدمات ما بعد التنفيذ وصيانة دورية وتشغيل متكامل لضمان الأداء الأمثل. نحافظ على جودة المشروع واستدامته على المدى الطويل.",
    features: ["الصيانة الدورية والوقائية", "معالجة الأعطال الطارئة", "تجديد الواجهات", "عقود صيانة"],
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.384 3.077A1.5 1.5 0 014.5 16.88V7.12a1.5 1.5 0 011.536-1.367l5.384 3.077M16.5 3.75V7.5M16.5 7.5H20.25M16.5 7.5L12 12m4.5 4.5V20.25M16.5 16.5H20.25M16.5 16.5L12 12" />
      </svg>
    ),
  },
  {
    id: "technical",
    title: "حلول تقنية متخصصة",
    titleEn: "Technical Solutions",
    description: "حلول هندسية فريدة تلبي المتطلبات الخاصة بكل مشروع بتقنيات متقدمة. نوظف أحدث التقنيات في صناعة الواجهات والديكورات مسبقة الصنع.",
    features: ["تقنيات GRC و GRP", "القوالب المتخصصة", "المعالجات السطحية", "أنظمة التركيب المتقدمة"],
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12" />
      </svg>
    ),
  },
  {
    id: "property-management",
    title: "إدارة الأملاك والاستثمار",
    titleEn: "Property Management",
    description: "ندير عقارك باحترافية لضمان تحقيق أعلى العوائد الاستثمارية، مع توفير الصيانة الدورية وتأجير الوحدات.",
    features: ["التأجير والتحصيل", "تقييم العقارات", "الاستشارات الاستثمارية", "دراسة السوق"],
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
      </svg>
    ),
  },
];

const processSteps = [
  { title: "الاستشارة", desc: "نستمع لرؤيتك ومتطلباتك ونقدم المشورة الفنية المناسبة", icon: "M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" },
  { title: "التصميم", desc: "نطور التصاميم المعمارية والمخططات التفصيلية لمشروعك", icon: "M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" },
  { title: "التصنيع", desc: "ننتج القطع المعمارية في مصانعنا بأعلى معايير الجودة", icon: "M11.42 15.17l-5.384 3.077A1.5 1.5 0 014.5 16.88V7.12a1.5 1.5 0 011.536-1.367l5.384 3.077M16.5 3.75V7.5M16.5 7.5H20.25M16.5 7.5L12 12m4.5 4.5V20.25M16.5 16.5H20.25M16.5 16.5L12 12" },
  { title: "التركيب", desc: "فريق متخصص يتولى التركيب الميداني بدقة واحترافية", icon: "M21.75 6.75a4.5 4.5 0 01-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 11-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 016.336-4.486l-3.276 3.276a3.004 3.004 0 002.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852z" },
  { title: "التسليم", desc: "مراجعة نهائية وتسليم المشروع مع ضمان الجودة والصيانة", icon: "M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white font-body">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="relative bg-[#082b26] min-h-[70vh] md:min-h-[80vh] overflow-hidden flex items-center pt-32 pb-20">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-20 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#082b26] via-[#082b26]/80 to-transparent" />
        
        <div className="container-wide px-6 relative z-10 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease }}
            className="max-w-4xl"
          >
            <span className="inline-block px-6 py-2 border border-[#20d09f]/30 text-[#20d09f] rounded-full text-sm font-bold tracking-widest uppercase mb-8 backdrop-blur-md bg-[#20d09f]/10 shadow-[0_0_30px_rgba(32,208,159,0.2)]">
              خدماتنا المتكاملة
            </span>
            <h1 className="text-[clamp(3rem,8vw,6.5rem)] font-black text-white mt-4 font-arabic leading-tight drop-shadow-2xl">
              إبداع هندسي <br />
              <span className="text-[#20d09f]">وتنفيذ استثنائي</span>
            </h1>
            <p className="text-gray-300 text-lg md:text-2xl font-light mt-8 max-w-3xl mx-auto leading-relaxed">
              من التخطيط الاستراتيجي وحتى تسليم المفتاح، نقدم باقة متكاملة من الخدمات العقارية والهندسية التي تضع معايير جديدة للفخامة والجودة.
            </p>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }} 
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-16 md:bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        >
        </motion.div>
      </section>

      {/* --- SERVICES BENTO GRID --- */}
      <section className="relative bg-gray-50 py-32">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#148968]/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="container-wide px-6 relative z-10">
          <div className="text-center mb-24 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black text-[#082b26] mb-6">حلولنا الهندسية</h2>
            <p className="text-xl text-gray-500 leading-relaxed">نقدم لك مجموعة متكاملة من الخدمات التي تغطي كل احتياجات مشروعك لضمان تجربة خالية من المتاعب وبأعلى المواصفات.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mainServices.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8, ease }}
                className={`group relative overflow-hidden rounded-[3rem] p-10 md:p-14 border shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col ${
                  i === 0 ? "lg:col-span-2 bg-white border-gray-100" : 
                  i === 3 ? "lg:col-span-2 bg-[#082b26] text-white border-none shadow-[0_30px_60px_rgba(8,43,38,0.3)]" : 
                  "bg-white border-gray-100"
                }`}
              >
                {/* Background Element */}
                {i === 3 && (
                   <div className="absolute right-0 top-0 w-64 h-64 bg-[url('https://images.unsplash.com/photo-1541888081622-38b45610051e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')] bg-cover opacity-20 mix-blend-overlay rounded-bl-[100px]" />
                )}

                {/* Big Number */}
                <div className={`absolute top-6 left-8 text-[140px] leading-none font-black opacity-[0.03] pointer-events-none select-none font-sans ${i === 3 ? "text-white" : "text-[#082b26]"}`}>
                  0{i + 1}
                </div>

                <div className="flex flex-col h-full relative z-10">
                  <div className={`w-20 h-20 rounded-[1.5rem] flex items-center justify-center mb-8 transition-all duration-500 shadow-sm ${
                    i === 3 ? "bg-[#20d09f]/20 text-[#20d09f] group-hover:bg-[#20d09f] group-hover:text-[#082b26]" : 
                    "bg-[#148968]/5 text-[#148968] group-hover:bg-[#148968] group-hover:text-white group-hover:shadow-[#148968]/20"
                  }`}>
                    {service.icon}
                  </div>

                  <h3 className={`text-3xl font-black mb-2 ${i === 3 ? "text-white" : "text-[#082b26]"}`}>
                    {service.title}
                  </h3>
                  <span className={`text-xs tracking-[0.2em] uppercase font-bold block mb-8 ${i === 3 ? "text-[#20d09f]" : "text-[#148968]"}`}>
                    {service.titleEn}
                  </span>
                  
                  <p className={`text-lg leading-[1.8] mb-10 flex-1 ${i === 3 ? "text-gray-300" : "text-gray-500"}`}>
                    {service.description}
                  </p>
                  
                  <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 pt-8 border-t ${i === 3 ? 'border-white/10' : 'border-gray-100'}`}>
                    {service.features.map((feature, j) => (
                      <div key={j} className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${i === 3 ? "bg-[#20d09f]" : "bg-[#148968]"}`} />
                        <span className={`text-[15px] font-medium ${i === 3 ? "text-gray-300" : "text-gray-600"}`}>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PROCESS TIMELINE --- */}
      <section className="relative py-32 bg-[#082b26] overflow-hidden">
        <div className="absolute inset-0 bg-[url('/projects/project-1.png')] bg-cover bg-center opacity-5 mix-blend-overlay" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#20d09f]/10 rounded-full blur-[150px] pointer-events-none" />
        
        <div className="container-wide px-6 relative z-10">
          <div className="text-center mb-24 max-w-3xl mx-auto">
             <h2 className="text-4xl md:text-6xl font-black text-white mb-6">منهجية العمل</h2>
             <p className="text-xl text-gray-300">نحول رؤيتك إلى واقع ملموس عبر خطوات مدروسة ودقيقة تضمن تفوق النتائج وتسليم المشروع في وقته المحدد.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-4 relative">
            {/* Background line connecting all steps for desktop */}
            <div className="hidden md:block absolute top-16 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#20d09f]/30 to-transparent" />

            {processSteps.map((step, i) => (
               <motion.div 
                 key={i} 
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: i * 0.1, duration: 0.6 }}
                 className="relative group pt-8 md:pt-0"
               >
                 <div className="bg-[#0a332d] border border-white/10 rounded-[2.5rem] p-8 h-full hover:-translate-y-4 hover:bg-[#0c4038] hover:border-[#20d09f]/30 transition-all duration-500 relative z-10 shadow-xl">
                   <div className="text-[80px] leading-none font-black text-white/5 absolute -top-6 -right-2 transition-all duration-500 group-hover:text-[#20d09f]/10 group-hover:-top-8">
                     0{i+1}
                   </div>
                   
                   <div className="w-16 h-16 rounded-full bg-[#082b26] border-2 border-[#20d09f]/30 flex items-center justify-center text-[#20d09f] mb-8 relative z-10 group-hover:scale-110 group-hover:bg-[#20d09f] group-hover:text-[#082b26] transition-all duration-500 shadow-[0_0_15px_rgba(32,208,159,0.1)]">
                     <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                       <path strokeLinecap="round" strokeLinejoin="round" d={step.icon} />
                     </svg>
                   </div>
                   
                   <h4 className="text-2xl font-bold text-white mb-4 relative z-10">{step.title}</h4>
                   <p className="text-gray-400 text-[15px] leading-relaxed relative z-10">{step.desc}</p>
                 </div>
               </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- MATERIALS (DARK/LIGHT CARDS) --- */}
      <section className="relative bg-white py-32 overflow-hidden">
        <div className="container-wide px-6">
          <div className="text-center mb-20 max-w-3xl mx-auto">
             <h2 className="text-4xl md:text-5xl font-black text-[#082b26] mb-6">خامات وتقنيات استثنائية</h2>
             <p className="text-xl text-gray-500">نعتمد في أكواد العقاريه على أحدث الخامات التكنولوجية في عالم البناء والديكور لضمان المتانة العالية والتشطيب المثالي.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { title: "GRC", subtitle: "خرسانة مسلحة بالألياف الزجاجية", desc: "خفة الوزن والمتانة العالية مع مرونة التشكيل لتنفيذ أدق التفاصيل المعمارية الخارجية." },
              { title: "GRP", subtitle: "بوليمر مسلح بالألياف الزجاجية", desc: "مقاومة استثنائية للتآكل والظروف البيئية القاسية، مثالي للقباب والأعمدة." },
              { title: "GRG", subtitle: "جبس مسلح بالألياف الزجاجية", desc: "الحل الأمثل للتشطيبات الداخلية والأسقف المعلقة، يجمع بين دقة الزخرفة والوزن الخفيف." },
              { title: "حجر صناعي", subtitle: "تكسيات حجرية صناعية", desc: "أناقة الحجر الطبيعي مع ميزة خفة الوزن وثبات لوني ممتاز لمقاومة العوامل الجوية." },
              { title: "فوم معماري", subtitle: "فوم معماري مشكّل", desc: "الحل الاقتصادي والسريع لتشكيل الكرانيش والديكورات الخارجية بكفاءة وسرعة." },
              { title: "ألواح تكسية حديثة", subtitle: "بديل الرخام والخشب (PVC/WPC)", desc: "خامات مبتكرة توفر مظهر الرخام والخشب الطبيعي بوزن أخف ومقاومة تامة للرطوبة والعوامل الجوية." },
            ].map((material, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-gray-50 rounded-[2.5rem] p-10 border border-gray-100 hover:bg-white hover:shadow-2xl hover:border-[#148968]/20 transition-all duration-500"
              >
                <div className="text-[#148968] font-black text-4xl mb-2">{material.title}</div>
                <div className="text-[#082b26] font-bold text-sm tracking-wide mb-6 pb-6 border-b border-gray-200">{material.subtitle}</div>
                <p className="text-gray-500 leading-relaxed">{material.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-32 relative bg-white">
        <div className="container-wide px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease }}
            className="max-w-5xl mx-auto bg-gradient-to-br from-[#082b26] to-[#041512] rounded-[3rem] p-16 md:p-24 relative overflow-hidden shadow-2xl"
          >
            <div className="absolute inset-0 bg-[url('/projects/project-3.png')] bg-cover bg-center opacity-10 mix-blend-overlay" />
            
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 relative z-10 leading-tight">
              جاهز لتنفيذ <span className="text-[#20d09f]">مشروعك؟</span>
            </h2>
            <p className="text-gray-300 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed relative z-10">
              تواصل مع فريق <strong className="text-white">أكواد العقاريه</strong> الهندسي الآن واحصل على دراسة وتصور مبدئي لمشروعك بأعلى المعايير.
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-6 relative z-10">
              <Link href="/contact" className="w-full md:w-auto inline-flex items-center justify-center gap-4 px-12 py-6 bg-[#20d09f] text-[#082b26] hover:bg-white font-black text-lg rounded-full overflow-hidden transition-all duration-300 shadow-lg hover:shadow-[#20d09f]/50 hover:scale-105">
                <span>ابدأ الآن</span>
                <svg className="w-6 h-6 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link href="/projects" className="w-full md:w-auto inline-flex items-center justify-center gap-4 px-12 py-6 bg-white/5 text-white hover:bg-white/10 font-bold text-lg rounded-full border border-white/10 transition-all duration-300 backdrop-blur-md">
                <span>تصفح أعمالنا</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
