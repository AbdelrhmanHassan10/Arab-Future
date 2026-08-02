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
      <div className="relative bg-navy-dark">
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
                <h2 className="text-display font-bold text-shimmer-white mb-2">
                  نرسم ملامح الغد
                </h2>
                <h2 className="text-display font-bold text-shimmer mb-10">
                  بإتقان اليوم
                </h2>
              </motion.div>

              <p className="text-white/80 text-subhead max-w-xl mx-auto leading-[1.85] mb-10">
                أن نكون الشريك العقاري الأول والوجهة الدائمة والمفضلة للعملاء
                في عالم العقارات، من خلال تقديم استشارات موثوقة وحلول استثمارية وسكنية
                تفوق التوقعات.
              </p>

              {/* Aspirations */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {[
                  { title: "تطوير السوق العقاري", desc: "محليًا وإقليميًا من خلال تقديم خدمات عقارية احترافية" },
                  { title: "فرص استثمارية", desc: "توفير أفضل الفرص الاستثمارية لتحقيق أعلى العوائد لعملائنا" },
                  { title: "تجارب سكنية", desc: "الارتقاء بمستوى المعيشة وتوفير بيئات سكنية متكاملة" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.08, duration: 0.5 }}
                    className="card-rounded p-8 text-center hover:-translate-y-2 hover:shadow-card-hover hover:border-primary/50 gold-border-glow transition-all duration-500 group"
                  >
                    <h4 className="text-white font-bold text-lg mb-2 group-hover:text-primary transition-colors duration-400">{item.title}</h4>
                    <p className="text-white/70 text-base leading-relaxed group-hover:text-white/90 transition-colors duration-400">{item.desc}</p>
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

                <h2 className="text-display font-bold text-shimmer-white mb-2">
                  بصمة معمارية
                </h2>
                <h2 className="text-display font-bold text-shimmer">
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
                  توفير قيمة حقيقية لجميع أطراف الصناعة: عملاء، مستثمرين، ومطورين،
                  عبر منهج عمل يقوم على المصداقية والشفافية وتلبية التطلعات السكنية والاستثمارية.
                </p>

                {/* Pillars */}
                <div className="space-y-0">
                  {[
                    { label: "الارتقاء بتجربة العميل", desc: "تقديم خدمة استثنائية طوال رحلة البحث عن العقار وما بعدها" },
                    { label: "الاحترافية والمصداقية", desc: "أعلى معايير الشفافية في عرض العقارات والتسعير" },
                    { label: "شراكات استراتيجية", desc: "بناء علاقات قوية مع كبرى شركات التطوير العقاري" },
                    { label: "فهم متطلبات السوق", desc: "تحليل مستمر للسوق لتقديم أفضل الخيارات وأنسبها" },
                    { label: "توفير حلول مبتكرة", desc: "تقديم استشارات عقارية ذكية تناسب مختلف الميزانيات" },
                  ].map((pillar, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.06, duration: 0.5 }}
                      className="flex items-center gap-4 py-4 border-t border-white/[0.06] group/pillar hover:bg-white/[0.02] transition-colors duration-300 rounded-lg px-2 -mx-2 cursor-default"
                    >
                      <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0 group-hover/pillar:scale-150 transition-transform duration-300 group-hover/pillar:shadow-glow" />
                      <span className="text-white/75 text-sm font-medium group-hover/pillar:text-primary transition-colors duration-300">
                        {pillar.label}
                      </span>
                      <span className="text-white/20 text-xs mr-auto">—</span>
                      <span className="text-white/40 text-[13px] group-hover/pillar:text-white/60 transition-colors duration-300">
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
                  رؤية مصر 2030
                </span>
              </div>
              <h3 className="text-display-sm font-bold text-white mb-2">
                المساهمة في التنمية العمرانية
              </h3>
              <p className="text-white/65 text-subhead max-w-2xl leading-[1.85] mb-10">
                نؤمن بأن دورنا يتعدى مجرد الوساطة، ليشمل المساهمة الفاعلة في تحقيق أهداف التنمية العمرانية المستدامة في مصر.
              </p>
            </motion.div>

            {/* Initiatives */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "دعم المدن الذكية",
                  desc: "التسويق للمدن الجديدة والمستدامة مثل العاصمة الإدارية ومدينة الجلالة وغيرها من المدن الذكية.",
                },
                {
                  title: "تطوير الكوادر الشابة",
                  desc: "تدريب مستشارين عقاريين محترفين على أعلى مستوى من الكفاءة لدعم القطاع العقاري.",
                },
                {
                  title: "التحول الرقمي العقاري",
                  desc: "الاعتماد على التقنيات الحديثة لتسهيل عملية بيع وشراء العقارات بأقصى قدر من الشفافية.",
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
