"use client";

import { motion } from "framer-motion";
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
    <main className="min-h-screen bg-navy-dark">
      <Navbar />

      {/* Hero */}
      <section className="relative bg-navy-deeper overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/3 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[150px] pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
        </div>

        <div className="relative pt-40 pb-20 pad-x">
          <div className="container-wide text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease }}
            >
              <span className="text-2xl uppercase text-primary font-semibold tracking-widest">
                خدماتنا
              </span>
              <h1 className="text-[clamp(2rem,4.5vw,3.8rem)] font-bold text-white mt-4">
                شبكة خدمات متكاملة
              </h1>
              <p className="text-white/40 text-subhead font-light mt-5 max-w-2xl mx-auto leading-[1.95]">
                خبرة احترافية لدعم مشاريعك من الفكرة إلى التنفيذ — نقدم حلولاً
                شاملة تغطي جميع مراحل المشروع المعماري
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="relative bg-navy-dark overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/[0.02] rounded-full blur-[100px] pointer-events-none" />

        <div className="pad-y-lg relative">
          <div className="pad-x container-wide">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {mainServices.map((service, i) => (
                <motion.div
                  key={i}
                  id={service.id}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: i * 0.08, duration: 0.6, ease }}
                  className="group"
                >
                  <div className="glass-card-dark p-8 lg:p-9 h-full flex flex-col hover:-translate-y-2 hover:shadow-card-hover hover:border-primary/30 transition-all duration-500">
                    {/* Icon */}
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary mb-6 group-hover:from-primary group-hover:to-primary-dark group-hover:text-white transition-all duration-500 group-hover:shadow-glow">
                      {service.icon}
                    </div>

                    {/* Title */}
                    <h3 className="font-bold text-white text-lg mb-1 group-hover:text-primary transition-colors duration-400">
                      {service.title}
                    </h3>
                    <span className="text-[10px] text-white/50 tracking-widest uppercase block mb-4 font-body">
                      {service.titleEn}
                    </span>

                    {/* Description */}
                    <p className="text-white/70 text-sm font-normal leading-[1.9] mb-6 flex-1">
                      {service.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-2.5 border-t border-white/[0.05] pt-5">
                      {service.features.map((feature, j) => (
                        <div key={j} className="flex items-center gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors duration-400 flex-shrink-0" />
                          <span className="text-white/70 text-[13px] font-normal">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Link */}
                    <a
                      href={`/services/${service.id}`}
                      className="inline-flex items-center gap-2 text-primary text-sm font-medium hover:gap-3 transition-all duration-300 mt-5"
                    >
                      <span>اعرف أكتر</span>
                      <svg className="w-4 h-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                      </svg>
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="relative bg-navy-dark overflow-hidden">
        <div className="pad-y-lg relative">
          <div className="pad-x container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-center mb-16"
            >
              <span className="text-2xl uppercase text-primary font-semibold tracking-widest">
                منهجية العمل
              </span>
              <h2 className="text-display font-bold text-white mt-4">
                كيف نعمل
              </h2>
              <p className="text-white/70 text-subhead font-light mt-4 max-w-xl mx-auto">
                نتبع منهجية واضحة ومنظمة في تنفيذ مشاريعنا لضمان أعلى جودة
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {processSteps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6, ease }}
                  className="group text-center relative"
                >
                  {/* Connector line */}
                  {i < processSteps.length - 1 && (
                    <div className="hidden md:block absolute top-8 -left-3 w-6 h-px bg-white/10" />
                  )}

                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mx-auto mb-5 group-hover:from-primary group-hover:to-primary-dark transition-all duration-500 group-hover:shadow-glow">
                    <svg className="w-7 h-7 text-primary group-hover:text-white transition-colors duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={step.icon} />
                    </svg>
                  </div>
                  <h4 className="text-white font-semibold text-[15px] mb-2 group-hover:text-primary transition-colors duration-400">
                    {step.title}
                  </h4>
                  <p className="text-white/60 text-sm font-light leading-[1.8]">
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Materials Overview */}
      <section className="relative bg-navy-deeper overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        </div>

        <div className="pad-y-lg relative">
          <div className="pad-x container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-center mb-14"
            >
              <span className="text-2xl uppercase text-primary font-semibold tracking-widest">
                المواد والتقنيات
              </span>
              <h2 className="text-display font-bold text-white mt-4">
                خامات عالية الجودة
              </h2>
              <p className="text-white/35 text-subhead font-light mt-4 max-w-xl mx-auto">
                نستخدم أحدث المواد والتقنيات لضمان الجودة والمتانة والاستدامة
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "GRC",
                  subtitle: "خرسانة مسلحة بالألياف الزجاجية",
                  desc: "خفة الوزن والمتانة العالية مع مرونة التشكيل. يتيح نظام القوالب تكرار القطع بنفس الدقة.",
                  features: ["أسمنت بورتلاندي", "ألياف زجاجية", "إضافات تحسينية"],
                },
                {
                  title: "GRP",
                  subtitle: "بوليمر مسلح بالألياف الزجاجية",
                  desc: "مقاومة استثنائية للتآكل والظروف البيئية القاسية مع تنوع الألوان والأشكال.",
                  features: ["راتنجات بوليمرية", "مواد مصلّبة", "مقاومة التآكل"],
                },
                {
                  title: "GRG",
                  subtitle: "جبس مسلح بالألياف الزجاجية",
                  desc: "مادة متخصصة في التشطيبات الداخلية والديكورات، تجمع بين خفة الوزن ودقة التفاصيل الزخرفية.",
                  features: ["ديكورات داخلية", "دقة زخرفية", "سهل التركيب"],
                },
                {
                  title: "حجر صناعي",
                  subtitle: "تكسيات حجرية صناعية",
                  desc: "أناقة الحجر الطبيعي مع خفة الوزن وثبات لوني ممتاز وسهولة الصيانة.",
                  features: ["مقاومة الطقس", "ثبات لوني", "سهولة التركيب"],
                },
                {
                  title: "فوم",
                  subtitle: "فوم معماري مشكّل",
                  desc: "مادة خفيفة تُستخدم في تشكيل العناصر الزخرفية والكرانيش بتكلفة اقتصادية وسرعة تنفيذ.",
                  features: ["خفة وزن", "تكلفة اقتصادية", "سرعة تركيب"],
                },
              ].map((material, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.7, ease }}
                  className="group glass-card-dark p-8 lg:p-10 hover:-translate-y-2 hover:border-primary/20 transition-all duration-500"
                >
                  <h3 className="text-3xl font-bold text-white mb-1 group-hover:text-primary transition-colors duration-500">
                    {material.title}
                  </h3>
                  <p className="text-white text-xs mb-5">{material.subtitle}</p>
                  <p className="text-white/45 text-sm font-light leading-[1.85] mb-6">
                    {material.desc}
                  </p>
                  <div className="space-y-2.5 border-t border-white/[0.06] pt-5">
                    {material.features.map((f, j) => (
                      <div key={j} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                        <span className="text-white/40 text-[13px]">{f}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-navy-dark overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/[0.02] rounded-full blur-[100px] pointer-events-none" />

        <div className="pad-y-lg relative">
          <div className="pad-x container-wide text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease }}
            >
              <h2 className="text-display font-bold text-white mb-4">
                محتاج خدمة معينة؟
              </h2>
              <p className="text-white/60 text-subhead font-light mb-8 max-w-lg mx-auto">
                تواصل معنا وسنوفر لك الحل الأمثل لمشروعك
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="/#contact" className="btn-primary">
                  <span>تواصل معنا</span>
                  <svg className="w-4 h-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                  </svg>
                </a>
                <a href="/gallery" className="inline-flex items-center gap-2 text-[13px] font-medium px-5 py-3.5 rounded-full border border-white/15 text-white/60 hover:text-primary hover:border-primary/30 transition-all duration-500">
                  <span>معرض الأعمال</span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
