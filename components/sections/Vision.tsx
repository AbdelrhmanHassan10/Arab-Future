"use client";

import { motion } from "framer-motion";

export default function Vision() {
  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <section id="vision" className="relative bg-[#0a0f1c] overflow-hidden py-24 lg:py-32">
      {/* Background Glow */}
      <div className="absolute top-1/4 -left-1/4 w-[800px] h-[800px] bg-primary/[0.03] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary/[0.02] rounded-full blur-[100px] pointer-events-none" />

      <div className="container-wide px-6 relative z-10">
        
        {/* --- VISION BLOCK --- */}
        <div className="mb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center gap-4 px-8 py-3.5 rounded-full bg-white/5 border border-white/10 shadow-[0_0_20px_rgba(191,154,95,0.1)] backdrop-blur-md mb-8 hover:bg-white/10 hover:border-primary/30 transition-all duration-300">
              <span className="w-3 h-3 rounded-full bg-primary animate-pulse" />
              <span className="text-base md:text-lg text-primary font-bold tracking-widest font-body uppercase">
                رؤيتنا
              </span>
              <span className="w-3 h-3 rounded-full bg-primary animate-pulse" />
            </div>
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-bold text-white mb-6 leading-tight">
              نرسم ملامح الغد <span className="text-primary">بإتقان</span> اليوم
            </h2>
            <p className="text-white/60 text-lg md:text-xl leading-relaxed font-light">
              أن نكون الشريك العقاري الأول والوجهة الدائمة والمفضلة للعملاء
              في عالم العقارات، من خلال تقديم استشارات موثوقة وحلول استثمارية وسكنية
              تفوق التوقعات.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {[
              { title: "تطوير السوق العقاري", desc: "محليًا وإقليميًا من خلال تقديم خدمات عقارية احترافية ترتقي بالصناعة وتضع معايير جديدة." },
              { title: "فرص استثمارية", desc: "توفير أفضل الفرص الاستثمارية المدروسة بعناية لتحقيق أعلى العوائد الممكنة لعملائنا." },
              { title: "تجارب سكنية", desc: "الارتقاء بمستوى المعيشة وتوفير بيئات سكنية متكاملة تضمن الرفاهية والراحة المستدامة." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.7, ease }}
                className="glass-card-dark p-8 md:p-10 rounded-[2rem] border border-white/5 hover:border-primary/30 transition-all duration-500 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <h4 className="text-xl font-bold text-white mb-4 group-hover:text-primary transition-colors duration-300">
                    {item.title}
                  </h4>
                  <p className="text-white/50 text-sm md:text-base leading-[1.8] font-light">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* --- MISSION BLOCK --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-start mb-32">
          {/* Left / Sticky Header */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
            className="lg:col-span-5 lg:sticky lg:top-32"
          >
            <div className="inline-flex items-center gap-4 px-8 py-3.5 rounded-full bg-white/5 border border-white/10 shadow-[0_0_20px_rgba(191,154,95,0.1)] backdrop-blur-md mb-8 hover:bg-white/10 hover:border-primary/30 transition-all duration-300">
              <span className="w-3 h-3 rounded-full bg-primary animate-pulse" />
              <span className="text-base md:text-lg text-primary font-bold tracking-widest font-body uppercase">
                رسالتنا
              </span>
              <span className="w-3 h-3 rounded-full bg-primary animate-pulse" />
            </div>
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-bold text-white mb-6 leading-tight">
              بصمة معمارية <br/>
              <span className="text-white/40">تتجاوز الزمن</span>
            </h2>
            <p className="text-white/60 text-lg leading-relaxed font-light mb-8">
              توفير قيمة حقيقية لجميع أطراف الصناعة: عملاء، مستثمرين، ومطورين،
              عبر منهج عمل يقوم على المصداقية والشفافية وتلبية التطلعات السكنية والاستثمارية.
            </p>
          </motion.div>

          {/* Right / Pillars List */}
          <div className="lg:col-span-7 space-y-4">
            {[
              { label: "الارتقاء بتجربة العميل", desc: "تقديم خدمة استثنائية طوال رحلة البحث عن العقار وما بعدها، لضمان رضا العميل التام." },
              { label: "الاحترافية والمصداقية", desc: "تطبيق أعلى معايير الشفافية في عرض العقارات والتسعير لبناء ثقة مستدامة." },
              { label: "شراكات استراتيجية", desc: "بناء وتطوير علاقات قوية مع كبرى شركات التطوير العقاري لضمان تنوع وتميز العروض." },
              { label: "فهم متطلبات السوق", desc: "تحليل مستمر ودقيق للسوق لتقديم أفضل الخيارات وأنسبها للتغيرات الاقتصادية." },
              { label: "توفير حلول مبتكرة", desc: "تقديم استشارات عقارية ذكية ومرنة تناسب مختلف الميزانيات والأهداف." },
            ].map((pillar, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6, ease }}
                className="glass-card-dark p-6 md:p-8 rounded-2xl border border-white/5 flex flex-col md:flex-row md:items-center gap-4 md:gap-8 group hover:bg-white/[0.03] transition-colors duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
                  <span className="text-primary font-bold">{i + 1}</span>
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-2">{pillar.label}</h4>
                  <p className="text-white/50 text-sm md:text-base font-light leading-relaxed">{pillar.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* --- VISION 2030 BLOCK --- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="glass-card-dark p-10 md:p-16 rounded-[3rem] border border-white/10 relative overflow-hidden"
        >
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-50" />
          
          <div className="relative z-10 flex flex-col lg:flex-row gap-12 lg:gap-20">
            <div className="lg:w-1/3">
              <div className="inline-flex items-center gap-4 px-8 py-3.5 rounded-full bg-white/5 border border-white/10 shadow-[0_0_20px_rgba(191,154,95,0.1)] backdrop-blur-md mb-8 hover:bg-white/10 hover:border-primary/30 transition-all duration-300">
                <span className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                <span className="text-base md:text-lg text-primary font-bold tracking-widest font-body uppercase">
                  رؤية مصر 2030
                </span>
                <span className="w-3 h-3 rounded-full bg-primary animate-pulse" />
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                المساهمة في <br/> التنمية العمرانية
              </h3>
              <p className="text-white/60 text-base leading-relaxed font-light">
                نؤمن بأن دورنا يتعدى مجرد الوساطة، ليشمل المساهمة الفاعلة في تحقيق أهداف التنمية العمرانية المستدامة في مصر.
              </p>
            </div>

            <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
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
                  title: "التحول الرقمي",
                  desc: "الاعتماد على التقنيات الحديثة لتسهيل عملية بيع وشراء العقارات بأقصى قدر من الشفافية.",
                },
              ].map((init, i) => (
                <div key={i} className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full shadow-[0_0_10px_rgba(191,154,95,0.8)]" />
                    <h4 className="font-bold text-white text-lg">
                      {init.title}
                    </h4>
                  </div>
                  <p className="text-white/50 text-sm font-light leading-relaxed pr-5">
                    {init.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
