"use client";

import { motion } from "framer-motion";

const materials = [
  {
    title: "GRC",
    subtitle: "Glass Reinforced Concrete",
    titleAr: "خرسانة مسلحة بالألياف الزجاجية",
    description:
      "مادة إنشائية متطورة تجمع بين خفة الوزن والمتانة العالية، مثالية للواجهات المعمارية المعقدة والزخرفية. يتيح نظام القوالب في الـ GRC تكرار القطع المعمارية بنفس الكفاءة والدقة دون اختلاف بين قطعة وأخرى",
    features: ["أسمنت بورتلاندي ورمل سيليكا ناعم", "ماء نقي وألياف زجاجية مقاومة للقلويات", "إضافات كيميائية تحسينية", "خفيفة الوزن ومرنة في التشكيل"],
  },
  {
    title: "GRP",
    subtitle: "Glass Reinforced Polymer",
    titleAr: "بوليمر مسلح بالألياف الزجاجية",
    description:
      "مادة مركبة عالية الأداء تتميز بمقاومتها الاستثنائية للتآكل وقدرتها على تحمل الظروف البيئية القاسية",
    features: ["راتنجات بوليمرية وألياف زجاجية", "مواد مصلّبة ومحفّزة", "إضافات محسِّنة ومواد تلوين", "مقاومة عالية للتآكل"],
  },
  {
    title: "GRG",
    subtitle: "Glass Reinforced Gypsum",
    titleAr: "جبس مسلح بالألياف الزجاجية",
    description:
      "مادة متخصصة في التشطيبات الداخلية والديكورات، تجمع بين خفة الوزن ودقة التفاصيل الزخرفية مع سهولة التشكيل لإنتاج عناصر معمارية داخلية فاخرة",
    features: ["جبس عالي الجودة وألياف زجاجية", "مثالي للديكورات الداخلية", "دقة عالية في التفاصيل الزخرفية", "خفيف الوزن وسهل التركيب"],
  },
  {
    title: "حجر صناعي",
    subtitle: "Artificial Stone & Cladding",
    titleAr: "تكسيات حجرية صناعية",
    description:
      "أناقة الحجر، خفة الوزن، ودقة التفاصيل — حجر صناعي عالي الجودة يحاكي الحجر الطبيعي مع مزايا إضافية",
    features: ["مقاومة عالية للعوامل الجوية", "ثبات لوني ممتاز وانتظام المقاسات", "تقليل الهدر وسهولة الصيانة", "تنوع الألوان والملمس"],
  },
  {
    title: "فوم",
    subtitle: "EPS Foam Molding",
    titleAr: "فوم معماري مشكّل",
    description:
      "مادة خفيفة الوزن تُستخدم في تشكيل العناصر الزخرفية والكرانيش والحليات المعمارية، تتميز بسرعة التنفيذ والتكلفة الاقتصادية مع إمكانية تغطيتها بطبقات حماية متعددة",
    features: ["خفة وزن استثنائية", "سرعة في التشكيل والتركيب", "تكلفة اقتصادية مقارنة بالخامات الأخرى", "قابلية التغطية بطبقات حماية وتشطيب"],
  },
];

export default function Materials() {
  return (
    <section id="materials" className="relative bg-navy-dark overflow-hidden">
      <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-primary/[0.05] rounded-full blur-[120px] pointer-events-none" />

      <div className="pad-y relative">
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
              مواد بناء متقدمة
            </h2>
            <p className="text-white/80 text-subhead mt-4 max-w-xl mx-auto">
              نستخدم أحدث المواد والتقنيات في صناعة الواجهات المعمارية لضمان الجودة والاستدامة
            </p>
          </motion.div>

          {/* Materials grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {materials.map((material, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  delay: i * 0.12,
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group"
              >
                <div className="glass-card h-full hover:-translate-y-2 hover:shadow-card-hover hover:border-primary/40 transition-all duration-500">
                  <div className="p-8 lg:p-10 h-full flex flex-col">
                    {/* Title block */}
                    <div className="mb-6">
                      <h3 className="text-3xl lg:text-4xl font-bold text-white mb-1 group-hover:text-primary transition-colors duration-500">
                        {material.title}
                      </h3>
                      <p className="text-[11px] text-primary/70 tracking-[0.15em] uppercase mb-2 font-body">
                        {material.subtitle}
                      </p>
                      <p className="text-sm text-white/70">
                        {material.titleAr}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-white/80 text-[15px] leading-[1.85] mb-8 flex-1">
                      {material.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-3 border-t border-white/[0.08] pt-6">
                      {material.features.map((feature, j) => (
                        <div key={j} className="flex items-center gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary/60 group-hover:bg-primary transition-colors duration-400" />
                          <span className="text-white/70 text-[13px]">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Products showcase */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-16 md:mt-20"
          >
            <h3 className="text-white font-bold text-headline mb-3 text-center">
              منتجاتنا — حلول معمارية وهيكلية راقية
            </h3>
            <p className="text-white/70 text-sm text-center mb-10 max-w-2xl mx-auto leading-[1.85]">
              نقدم مجموعة متكاملة من الحلول المعمارية والإنشائية التي تجمع بين الجمال والمتانة، لتلبية احتياجات المشاريع السكنية والتجارية بأعلى معايير الجودة
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { name: "أعمدة وتيجان", desc: "تصاميم كلاسيكية وعصرية بدقة عالية", iconPath: "M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" },
                { name: "كرانيش وحليات", desc: "زخارف واجهات بتفاصيل متقنة", iconPath: "M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" },
                { name: "بلاطات جدارية", desc: "تكسيات حجرية بأنماط متنوعة", iconPath: "M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" },
                { name: "نوافذ وأقواس", desc: "إطارات معمارية بطرز متعددة", iconPath: "M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" },
                { name: "الأسوار", desc: "تصميم وتنفيذ أسوار خارجية تجمع بين الخصوصية والأمان والمظهر الجمالي، باستخدام خامات عالية الجودة", iconPath: "M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M8.25 21V10.5M15.75 21V10.5M3 10.5h18" },
                { name: "المداخل", desc: "تنفيذ مداخل معمارية مميزة تعكس هوية المكان وتعطي انطباعاً أولياً راقياً مع التكامل بين التصميم والوظيفة", iconPath: "M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125V21m0 0h3.375c.621 0 1.125-.504 1.125-1.125V9.349m0 0a3.001 3.001 0 00-1.524-2.623L12.72 3.042a2.25 2.25 0 00-1.44 0L4.774 6.726A3 3 0 003.25 9.349m16.5 0H3.25m16.5 0v10.526c0 .621-.504 1.125-1.125 1.125H3.375" },
              ].map((product, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="glass-card p-6 text-center hover:-translate-y-1 hover:shadow-card-hover hover:border-primary/40 transition-all duration-500 group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center mx-auto mb-4 group-hover:from-primary group-hover:to-primary-dark group-hover:text-navy-deeper transition-all duration-500">
                    <svg className="w-6 h-6 text-primary group-hover:text-navy-deeper transition-colors duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={product.iconPath} />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-white text-sm mb-2 group-hover:text-primary transition-colors duration-300">{product.name}</h4>
                  <p className="text-white/60 text-xs leading-relaxed">{product.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="divider" />
    </section>
  );
}
