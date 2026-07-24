"use client";

import { motion } from "framer-motion";

const architecturalStyles = [
  "الكلاسيكو الروماني",
  "النيوكلاسيك",
  "الطراز الفرنسي",
  "الطراز الإسلامي",
  "الأندلسي",
  "العثماني",
  "الطراز الحديث",
];

export default function About() {
  return (
    <section
      id="about"
      className="relative bg-white overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/[0.02] rounded-full blur-[120px] pointer-events-none" />

      <div className="pad-y relative">
        <div className="pad-x container-wide">
          {/* Top row: section label + intro text */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 mb-14 md:mb-20">
            <div className="lg:col-span-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <span className="text-2xl uppercase text-primary font-semibold tracking-widest">
                  من نحن
                </span>
                <h2 className="text-display font-bold text-navy mt-4">
                  نبني المستقبل
                </h2>
              </motion.div>
            </div>
            <div className="lg:col-span-7 lg:col-start-6 flex items-end">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              >
                <p className="text-subhead text-navy/70 leading-[1.95] mb-5">
                  على مدار سنوات من العمل الهندسي والميداني، راكمنا خبرة متكاملة
                  في مجال الديكورات مسبقة الصنع، بدءًا من الفكرة وحتى التنفيذ الكامل
                  لمشروعات الواجهات والديكورات، وترميم المباني ذات القيمة التاريخية
                  والمعمارية، مستخدمين خامات متعددة تتناسب مع بيئة العمل وتلبي مختلف المتطلبات.
                </p>
                <p className="text-subhead text-navy/70 leading-[1.95]">
                  نؤمن أن النجاح يقوم على المعرفة والعطاء قبل المنافسة؛ لذلك نحرص على
                  تقديم الدعم الاستشاري لكافة العملاء — حتى غير المتعاقدين معنا —
                  لمساعدتهم في اختيار أفضل الخامات وتحديد الأنسب لمشروعاتهم وفق
                  ميزانياتهم ومتطلباتهم الفنية.
                </p>
              </motion.div>
            </div>
          </div>

          {/* Image + specializations */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* Large image */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7 relative"
            >
              <div className="relative aspect-[4/3] lg:aspect-[16/11] rounded-[24px] overflow-hidden image-hover">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url('/images/about us.jpeg')`,
                  }}
                />
              </div>
            </motion.div>

            {/* Specializations - glassmorphism */}
            <div className="lg:col-span-5 lg:pt-8 space-y-4">
              {[
                {
                  title: "الواجهات الزخرفية",
                  titleEn: "Decorative Facades",
                  desc: "تصميم وتنفيذ واجهات وديكورات مسبقة الصنع بخامات متعددة تتناسب مع بيئة العمل وتلبي مختلف المتطلبات الفنية",
                },
                {
                  title: "ترميم المباني التاريخية",
                  titleEn: "Historical Restoration",
                  desc: "الحفاظ على التراث المعماري وإعادة إحياء المباني ذات القيمة التاريخية بأساليب حديثة تحترم الأصالة",
                },
                {
                  title: "النصائح الفنية",
                  titleEn: "Technical Advice",
                  desc: "دعم فني لكافة العملاء — حتى غير المتعاقدين — لمساعدتهم في اختيار أفضل الخامات وتحديد الأنسب وفق ميزانياتهم ومتطلباتهم الفنية",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    delay: i * 0.1,
                    duration: 0.7,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="group glass-card p-6 hover:-translate-y-1 hover:shadow-card-hover hover:border-primary/20 transition-all duration-500"
                >
                  <div className="flex items-baseline gap-3 mb-2">
                    <h4 className="font-semibold text-navy text-[15px] group-hover:text-primary transition-colors duration-400">
                      {item.title}
                    </h4>
                    <span className="text-[10px] text-navy tracking-wider uppercase hidden sm:inline font-body">
                      {item.titleEn}
                    </span>
                  </div>
                  <p className="text-warm-gray text-sm font-light leading-[1.85]">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Architectural Styles */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-16 md:mt-20"
          >
            <h3 className="text-navy font-bold text-headline mb-3 text-center">
              طرز معمارية متنوعة
            </h3>
            <p className="text-warm-gray text-sm font-light text-center mb-8 max-w-2xl mx-auto leading-[1.85]">
              تمتد خبراتنا عبر طيف واسع من الطرز المعمارية، مما يمنحنا القدرة على تقديم حلول دقيقة تتوافق مع ذوق العميل وطبيعة المشروع
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {architecturalStyles.map((style, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04, duration: 0.4 }}
                  className="px-5 py-2.5 bg-section-gray/80 backdrop-blur-sm border border-navy/[0.04] rounded-full text-navy/60 text-sm hover:bg-primary hover:text-white hover:border-primary transition-all duration-400 cursor-default"
                >
                  {style}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="divider" />
    </section>
  );
}
