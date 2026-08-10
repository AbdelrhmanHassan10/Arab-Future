"use client";

import { motion } from "framer-motion";

const propertyTypes = [
  "فيلات فاخرة",
  "شقق سكنية",
  "عقارات تجارية",
  "تاون هاوس",
  "توين هاوس",
  "شاليهات",
  "بنتهاوس",
];

export default function About() {
  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <section id="about" className="relative bg-navy-deeper overflow-hidden py-24">
      {/* Background Effects */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/[0.03] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-[150px] pointer-events-none" />

      <div className="container-wide px-6 relative z-10">
        {/* Section Header */}
        <div className="mb-12 md:mb-16 text-center max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
          >
            <div className="inline-flex items-center gap-4 px-8 py-3.5 rounded-full bg-white/5 border border-white/10 shadow-[0_0_20px_rgba(191,154,95,0.1)] backdrop-blur-md mb-8 hover:bg-white/10 hover:border-primary/30 transition-all duration-300">
              <span className="w-3 h-3 rounded-full bg-primary animate-pulse" />
              <span className="text-base md:text-lg text-primary font-bold tracking-widest font-body uppercase">
                من نحن
              </span>
              <span className="w-3 h-3 rounded-full bg-primary animate-pulse" />
            </div>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-white leading-tight">
              رؤية عقارية <span className="text-primary">تتجاوز</span> التوقعات
            </h2>
          </motion.div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 auto-rows-[220px] md:auto-rows-[260px]">

          {/* Box 1: Main Introduction (Large) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
            className="row-span-2 lg:col-span-2 glass-card-dark rounded-3xl p-8 md:p-10 relative overflow-hidden group flex flex-col justify-end border border-white/10"
          >
            <div className="absolute inset-0 bg-navy-deeper/40 z-10" />
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110 opacity-60"
              style={{ backgroundImage: "url('/images/about us.jpeg')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-deeper via-navy-deeper/80 to-transparent z-10" />

            <div className="relative z-20 mt-auto">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                تاريخ من الثقة والإتقان
              </h3>
              <p className="text-white/70 text-[15px] md:text-base leading-[1.8] font-light">
                على مدار سنوات من العمل في السوق العقاري المصري، راكمنا خبرة متكاملة في مجال الاستشارات العقارية وإدارة الأملاك، بدءًا من البحث عن العقار المناسب وحتى إتمام صفقات البيع والشراء بسلاسة تامة، لتلبية كافة متطلبات عملائنا وتأمين مستقبلهم الاستثماري.
              </p>
            </div>
          </motion.div>

          {/* Box 2: Experience Stat */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
            className="lg:col-span-1 lg:row-span-1 bg-gradient-to-br from-primary to-[#A07B40] rounded-3xl p-8 relative overflow-hidden group border border-primary/50 shadow-[0_0_30px_rgba(191,154,95,0.15)] flex flex-col items-center justify-center text-center"
          >
            <div className="absolute inset-0 bg-primary/5 opacity-50 mix-blend-overlay" />
            <div className="relative z-10">
              <span className="text-5xl md:text-6xl font-black text-navy-deeper font-body block mb-2 group-hover:scale-110 transition-transform duration-500">
                12+
              </span>
              <span className="text-navy-deeper/80 text-sm font-bold uppercase tracking-wider">
                سنوات من الخبرة
              </span>
            </div>
          </motion.div>

          {/* Box 3: Technical Advice */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease, delay: 0.2 }}
            className="lg:col-span-1 lg:row-span-1 glass-card-dark rounded-3xl p-8 relative overflow-hidden group border border-white/5 flex flex-col"
          >
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-500">
              <svg className="w-6 h-6 text-white/60 group-hover:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.82 1.507-2.09 1.492-.474 3.243-1.464 3.243-3.718 0-3.32-2.73-6-6-6s-6 2.68-6 6c0 2.254 1.751 3.244 3.243 3.718.849.27 1.507 1.107 1.507 2.09V18M12 22.5A.75.75 0 0012 21a.75.75 0 000 1.5z" />
              </svg>
            </div>
            <h4 className="text-lg font-bold text-white mb-2">استشارات عقارية</h4>
            <p className="text-white/50 text-sm leading-[1.7] font-light mt-auto">
              دعم استشاري متخصص لاختيار أفضل العقارات وتحديد الأنسب وفق ميزانيتك الاستثمارية.
            </p>
          </motion.div>

          {/* Box 4: Decorative Facades */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease, delay: 0.3 }}
            className="lg:col-span-1 lg:row-span-1 glass-card-dark rounded-3xl p-8 relative overflow-hidden group border border-white/5 flex flex-col"
          >
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-primary/10 rounded-full blur-[30px] group-hover:bg-primary/20 transition-colors duration-500" />
            <h4 className="text-lg font-bold text-white mb-2 relative z-10">إدارة الأملاك</h4>
            <span className="text-[10px] text-primary/70 tracking-wider uppercase font-body mb-3 relative z-10">Property Management</span>
            <p className="text-white/50 text-sm leading-[1.7] font-light mt-auto relative z-10">
              إدارة متكاملة للعقارات لضمان أعلى عائد استثماري والحفاظ على قيمة الأصول بمرور الوقت.
            </p>
          </motion.div>

          {/* Box 5: Historical Restoration */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease, delay: 0.4 }}
            className="lg:col-span-1 lg:row-span-1 glass-card-dark rounded-3xl p-8 relative overflow-hidden group border border-white/5 flex flex-col"
          >
            <div className="absolute -left-10 -top-10 w-40 h-40 bg-white/5 rounded-full blur-[30px] group-hover:bg-white/10 transition-colors duration-500" />
            <h4 className="text-lg font-bold text-white mb-2 relative z-10">تسويق المشاريع الكبرى</h4>
            <span className="text-[10px] text-primary/70 tracking-wider uppercase font-body mb-3 relative z-10">Projects Marketing</span>
            <p className="text-white/50 text-sm leading-[1.7] font-light mt-auto relative z-10">
              تسويق حصري لأكبر المشاريع العقارية بالتعاون مع كبار المطورين لتقديم فرص استثنائية.
            </p>
          </motion.div>

          {/* Box 6: Architectural Styles Marquee */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease, delay: 0.5 }}
            className="row-span-2 lg:row-span-1 lg:col-span-4 glass-card-dark rounded-3xl p-8 relative overflow-hidden border border-white/5 flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div className="md:w-1/3 text-center md:text-right">
              <h3 className="text-white font-bold text-xl mb-2">خيارات عقارية متنوعة</h3>
              <p className="text-white/50 text-sm font-light">نقدم مجموعة واسعة من الخيارات العقارية التي تتناسب مع مختلف الأذواق والمتطلبات.</p>
            </div>

            <div className="md:w-2/3 flex flex-wrap justify-center md:justify-end gap-3">
              {propertyTypes.map((style, i) => (
                <div
                  key={i}
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-white/70 text-sm hover:bg-primary/20 hover:text-white hover:border-primary/50 transition-all duration-300 cursor-default"
                >
                  {style}
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}