"use client";

import { motion } from "framer-motion";

export default function CeoMessage() {
  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <section className="relative bg-navy-deeper overflow-hidden py-24 md:py-32">
      {/* Abstract Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-navy-deeper to-navy-deeper" />

      <div className="container-wide px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Image Column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease }}
            className="lg:col-span-5 relative z-20"
          >
            <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden group shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              {/* Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                style={{ backgroundImage: `url('/images/avatar.jpeg')` }}
              />

              {/* Overlays */}
              <div className="absolute inset-0 bg-navy-deeper/20 group-hover:bg-transparent transition-colors duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deeper via-navy-deeper/40 to-transparent opacity-90" />

              {/* Border glow */}
              <div className="absolute inset-0 rounded-[2rem] border border-white/10 group-hover:border-primary/50 transition-colors duration-700 pointer-events-none" />

              {/* Title Card Overlay */}
              <div className="absolute bottom-8 left-8 right-8">
                <div className="glass-card-dark p-6 rounded-2xl border border-white/10 backdrop-blur-xl">
                  <h4 className="text-white font-bold text-xl mb-1">محمد ابو الفضل</h4>
                  <p className="text-primary text-sm font-medium tracking-wide">المدير التنفيذي للشركة</p>
                  <div className="w-12 h-px bg-white/20 mt-4" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease, delay: 0.2 }}
            className="lg:col-span-7 z-30"
          >
            <div className="glass-card-dark rounded-[2.5rem] p-8 md:p-12 lg:p-16 border border-white/5 shadow-2xl relative overflow-hidden bg-[#0a0f1c]/80 backdrop-blur-2xl">

              {/* Giant Background Quote Mark */}
              <div className="absolute -top-10 left-10 text-[200px] text-white/5 font-serif leading-none select-none pointer-events-none rotate-180">
                &quot;
              </div>

              <div className="relative z-10">
                <div className="inline-flex items-center gap-4 px-8 py-3.5 rounded-full bg-white/5 border border-white/10 shadow-[0_0_20px_rgba(191,154,95,0.1)] backdrop-blur-md mb-8 hover:bg-white/10 hover:border-primary/30 transition-all duration-300">
                  <span className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                  <span className="text-base md:text-lg text-primary font-bold tracking-widest font-body uppercase">
                    كلمة الإدارة
                  </span>
                  <span className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                </div>

                <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-bold text-white mb-8 leading-[1.4]">
                  نؤمن أن النجاح يقوم على <span className="text-primary">المعرفة والعطاء</span> قبل المنافسة
                </h2>

                <div className="space-y-6 text-white/70 font-light leading-[1.9] text-base md:text-lg">
                  <p>
                    على مدار سنوات من العمل في السوق العقاري المصري، وبفضل الله، راكمنا خبرة متكاملة في تقديم الاستشارات العقارية. تمتد خبراتنا عبر طيف واسع من المشاريع السكنية والتجارية، من الشقق الفاخرة والفيلات المستقلة، وصولاً إلى المقرات الإدارية بأفضل المواقع.
                  </p>
                  <p>
                    نحرص على تقديم الدعم الاستشاري لكافة العملاء لمساعدتهم في اختيار أفضل العقارات وتحديد الأنسب لاستثماراتهم ومستقبل عائلاتهم وفق ميزانياتهم ومتطلباتهم.
                  </p>
                  <p>
                    هدفنا أن نكون الوجهة الأولى والموثوقة للمشورة الصادقة والإرشاد المهني في السوق العقاري، وتمكين كل عميل من اتخاذ القرار الاستثماري الصحيح.
                  </p>
                </div>

                {/* Signature Signature (Fictional cursive text) */}
                <div className="mt-12 pt-8 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <h5 className="text-white font-bold text-lg">سمسار بني سويف</h5>
                    <p className="text-white/40 text-sm mt-1">مستشارك العقاري الموثوق</p>
                  </div>
                  {/* Cursive style signature */}
                  <div className="text-primary/60 font-serif text-3xl italic opacity-50 select-none">
                    Semsar Beni Suef
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
