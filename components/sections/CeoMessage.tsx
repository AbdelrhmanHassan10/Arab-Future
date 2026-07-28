"use client";

import { motion } from "framer-motion";

export default function CeoMessage() {
  return (
    <section className="relative bg-section-gray overflow-hidden">
      <div className="pad-y">
        <div className="pad-x container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-4"
            >
              <div className="relative aspect-[3/4] img-rounded overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center bg-top"
                  style={{
                    backgroundImage: `url('/images/avatar.jpeg')`,
                  }}
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deeper/90 via-transparent to-transparent" />
                {/* Info at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                  <h4 className="text-white font-bold text-lg">المدير التنفيذي</h4>
                  <p className="text-white/60 text-sm mt-1">شركة عرب فيوتشر المحدودة</p>
                  <div className="w-8 h-px bg-primary mx-auto mt-4" />
                </div>
              </div>
            </motion.div>

            {/* Message */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              className="lg:col-span-7 lg:col-start-6"
            >
              <div className="mb-4">
                <span className="text-2xl uppercase text-primary font-semibold tracking-widest">
                  كلمة المدير
                </span>
              </div>

              <h2 className="text-display-sm font-bold text-white mb-8">
                نؤمن أن النجاح يقوم على المعرفة والعطاء قبل المنافسة
              </h2>

              <div className="space-y-5">
                <p className="text-white/70 font-light leading-[1.9]">
                  على مدار سنوات من العمل الهندسي والميداني، وبفضل الله، راكمنا خبرة
                  متكاملة في مجال الديكورات مسبقة الصنع. تمتد خبراتنا عبر طيف واسع
                  من الطرز المعمارية، من فخامة الكلاسيكو الروماني، ورقيّ النيوكلاسيك،
                  وصولًا إلى جماليات الطراز الإسلامي بمراحله المتنوعة.
                </p>
                <p className="text-white/70 font-light leading-[1.9]">
                  نحرص على تقديم الدعم الاستشاري لكافة العملاء — حتى غير المتعاقدين
                  معنا — لمساعدتهم في اختيار أفضل الخامات وتحديد الأنسب لمشروعاتهم
                  وفق ميزانياتهم ومتطلباتهم الفنية.
                </p>
                <p className="text-white/70 font-light leading-[1.9]">
                  هدفنا أن نكون اسمًا يُعرف بالمشورة الصادقة والإرشاد المهني، وتمكين
                  كل صاحب مشروع من اتخاذ القرار الصحيح.
                </p>
              </div>

              {/* Signature line */}
              <div className="mt-8 pt-6 border-t border-white/[0.08]">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-px bg-primary" />
                  <div>
                    <p className="text-white font-semibold text-sm">المدير التنفيذي</p>
                    <p className="text-primary/70 text-xs">شركة عرب فيوتشر المحدودة</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="divider" />
    </section>
  );
}
