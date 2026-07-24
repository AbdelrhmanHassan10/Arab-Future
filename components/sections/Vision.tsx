"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";


export default function Vision() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const textY = useTransform(scrollYProgress, [0, 1], [20, -20]);

  return (
    <section id="vision" ref={sectionRef} className="relative overflow-hidden">
      {/* Vision Block */}
      <div className="relative bg-white">
        <div className="pad-y">
          <div className="pad-x container-narrow text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Eyebrow */}
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-8 h-px bg-primary/50" />
                <span className="text-2xl uppercase text-primary font-semibold tracking-widest">
                  رؤيتنا
                </span>
                <div className="w-8 h-px bg-primary/50" />
              </div>

              {/* Quote */}
              <motion.div style={{ y: textY }}>
                <h2 className="text-display font-bold text-navy mb-2">
                  نرسم ملامح الغد
                </h2>
                <h2 className="text-display font-bold text-primary mb-10">
                  بإتقان اليوم
                </h2>
              </motion.div>

              <p className="text-navy/60 text-subhead max-w-xl mx-auto leading-[1.85] mb-10">
                أن نكون الشريك الأول والوجهة الدائمة والمفضلة للعملاء
                في عالم الواجهات والديكورات مسبقة التصنيع، وترميم المباني ذات القيمة،
                من خلال تقديم حلول معمارية عالية الجودة تمزج بين الابتكار والإتقان
              </p>

              {/* Aspirations */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {[
                  { title: "رفع مستوى الصناعة", desc: "محليًا وعالميًا في مجال الواجهات والديكورات" },
                  { title: "بصمة مميزة", desc: "إضفاء لمسة تليق بذوق العملاء وتطلعاتهم" },
                  { title: "نماذج تنفيذية", desc: "ترتقي بالمشهد العمراني وتعيد تعريف معايير الجمال والمتانة" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.08, duration: 0.5 }}
                    className="card-rounded p-8 text-center"
                  >
                    <h4 className="text-navy font-bold text-lg mb-2">{item.title}</h4>
                    <p className="text-warm-gray text-base leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        <div className="divider" />
      </div>

      {/* Mission + Vision 2030 Block */}
      <div className="relative bg-navy-deeper">
        <div className="pad-y">
          <div className="pad-x container-wide">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center mb-16">
              {/* Left */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-6"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-8 h-px bg-primary/50" />
                  <span className="text-2xl uppercase text-primary font-semibold tracking-widest">
                    رسالتنا
                  </span>
                </div>

                <h2 className="text-display font-bold text-white mb-2">
                  بصمة معمارية
                </h2>
                <h2 className="text-display font-bold text-primary">
                  تتجاوز الزمن
                </h2>
              </motion.div>

              {/* Right */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="lg:col-span-5 lg:col-start-8"
              >
                <p className="text-white/70 text-subhead mb-10 leading-[1.85]">
                  توفير قيمة حقيقية لجميع أطراف الصناعة: عملاء، مهندسين، مصنعين،
                  وفنيين، عبر منهج عمل يقوم على الجودة والإتقان وإبراز السمات
                  المعمارية العربية والإسلامية.
                </p>

                {/* Pillars */}
                <div className="space-y-0">
                  {[
                    { label: "الارتقاء بالمنظور البصري", desc: "تصميم وتنفيذ واجهات تعكس جماليات الطراز المعماري بدقة" },
                    { label: "مطابقة المعايير الهندسية", desc: "أعلى معايير الجودة في الخامات ونسب الخلط ونظم التركيب" },
                    { label: "إرضاء العملاء", desc: "وضع احتياجات العميل في مقدمة الأولويات وتقديم استشارات دقيقة" },
                    { label: "الثقافة العربية والإسلامية", desc: "إبراز السمات المعمارية العربية والإسلامية في المشاريع" },
                    { label: "التعاون بين العاملين والعملاء", desc: "بناء تعاون مستمر بين المصانع والفنيين والمصممين والمهندسين" },
                  ].map((pillar, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.06, duration: 0.5 }}
                      className="flex items-center gap-4 py-4 border-t border-white/[0.06]"
                    >
                      <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                      <span className="text-white/75 text-sm font-medium">
                        {pillar.label}
                      </span>
                      <span className="text-white/20 text-xs mr-auto">—</span>
                      <span className="text-white/40 text-[13px]">
                        {pillar.desc}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Vision 2030 — Mega Projects */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-12"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-8 h-px bg-primary/50" />
                <span className="text-2xl uppercase text-primary font-semibold tracking-widest">
                  رؤية 2030
                </span>
              </div>
              <h3 className="text-display-sm font-bold text-white mb-2">
                شراكة في بناء المستقبل
              </h3>
              <p className="text-white/65 text-subhead max-w-2xl leading-[1.85] mb-10">
                نؤمن بأن دورنا يتعدى مجرد البناء، ليشمل المساهمة الفاعلة في
                تحقيق أهداف رؤية المملكة 2030 الطموحة
              </p>
            </motion.div>

            {/* Initiatives */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "التقنيات الحديثة والبناء المستدام",
                  desc: "الاستثمار في ممارسات البناء المستدام لتقليل الأثر البيئي وتعزيز الكفاءة",
                },
                {
                  title: "توطين الكوادر السعودية",
                  desc: "توظيف وتدريب الكوادر السعودية الشابة تماشياً مع برنامج نطاقات ودعم جهود التوطين",
                },
                {
                  title: "دعم المشاريع الكبرى",
                  desc: "المساهمة في المشاريع الضخمة التي تعيد تشكيل مستقبل العمران في المملكة",
                },
              ].map((init, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-2 h-2 bg-primary/40 rounded-full group-hover:bg-primary transition-colors duration-400" />
                    <h4 className="font-arabic font-semibold text-white/80 text-sm">
                      {init.title}
                    </h4>
                  </div>
                  <p className="text-white/40 text-[13px] font-arabic font-light leading-relaxed pr-5">
                    {init.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
