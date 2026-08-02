"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

const architecturalStyles = [
  "الكلاسيكو الروماني",
  "النيوكلاسيك",
  "الطراز الفرنسي",
  "الطراز الإسلامي",
  "الأندلسي",
  "العثماني",
  "الطراز الحديث",
];

const missionPillars = [
  {
    title: "الارتقاء بالمنظور البصري",
    desc: "تحسين جودة المشهد العمراني من خلال تصميم وتنفيذ واجهات تعكس جماليات الطراز المعماري بدقة.",
  },
  {
    title: "مطابقة المعايير الهندسية والفنية",
    desc: "الالتزام بأعلى معايير الجودة في الخامات، خطوط الإنتاج، نسب الخلط، الإضافات التحسينية، نظم التركيب، وطرق المعالجة بعد التركيب.",
  },
  {
    title: "إرضاء العملاء",
    desc: "وضع احتياجات العميل في مقدمة الأولويات وتقديم استشارات دقيقة.",
  },
  {
    title: "إبراز الثقافة العربية والإسلامية",
    desc: "إبراز السمات المعمارية العربية والإسلامية في المشاريع المختلفة.",
  },
  {
    title: "التعاون بين العاملين والعملاء",
    desc: "بناء تعاون مستمر بين المصانع، الفنيين، المصممين، والمهندسين، وصولًا إلى العميل.",
  },
];

const stats = [
  { number: "12+", label: "سنة خبرة", desc: "في مجال الواجهات والديكورات" },
  { number: "350+", label: "مشروع منجز", desc: "بين سكني وتجاري وقصور" },
  { number: "50+", label: "عميل", desc: "يثقون في خدماتنا" },
  { number: "5", label: "خامات أساسية", desc: "GRC, GRP, GRG, حجر صناعي, فوم" },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-navy-dark">
      <Navbar />

      {/* Hero */}
      <section className="relative bg-navy-deeper overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{
              backgroundImage: `url('/images/about us.jpeg')`,
            }}
          />
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[150px] pointer-events-none" />
        </div>

        <div className="relative pt-40 pb-20 pad-x">
          <div className="container-wide text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease }}
            >
              <span className="text-2xl uppercase text-primary font-semibold tracking-widest">
                من نحن
              </span>
              <h1 className="text-[clamp(2rem,4.5vw,3.8rem)] font-bold text-white mt-4">
                عرب فيوتشر المحدودة
              </h1>
              <p className="text-white/50 text-subhead mt-5 max-w-2xl mx-auto leading-[1.95]">
                رؤية تُرى… وأثر يدوم
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/[0.02] rounded-full blur-[120px] pointer-events-none" />

        <div className="pad-y-lg relative">
          <div className="pad-x container-wide">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Image */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease }}
              >
                <div className="relative">
                  <div className="aspect-[4/3] rounded-[24px] overflow-hidden image-hover">
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{
                        backgroundImage: `url('/images/about us.jpeg')`,
                      }}
                    />
                  </div>
                </div>
              </motion.div>

              {/* Text */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease, delay: 0.15 }}
              >
                <span className="text-2xl uppercase text-primary font-semibold tracking-widest">
                  مقدمة
                </span>
                <h2 className="text-display-sm font-bold text-white mt-4 mb-6">
                  خبرة متكاملة في عالم العمارة
                </h2>

                <div className="space-y-5">
                  <p className="text-white/70 leading-[1.95]">
                    على مدار سنوات من العمل الهندسي والميداني، وبفضل الله، راكمنا خبرة
                    متكاملة في مجال الديكورات مسبقة الصنع، بدءًا من الفكرة وحتى التنفيذ
                    الكامل لمشروعات الواجهات والديكورات، وترميم المباني ذات القيمة التاريخية
                    والمعمارية، مستخدمين خامات متعددة تتناسب مع بيئة العمل وتلبي مختلف المتطلبات.
                  </p>
                  <p className="text-white/70 leading-[1.95]">
                    تمتد خبراتنا عبر طيف واسع من الطرز المعمارية، من فخامة الكلاسيكو الروماني،
                    ورقيّ النيوكلاسيك، وبساطة الطراز الفرنسي، وصولًا إلى جماليات الطراز الإسلامي
                    والأندلسي والعثماني، وحتى الأساليب الحديثة.
                  </p>
                  <p className="text-white/70 leading-[1.95]">
                    نؤمن أن النجاح يقوم على المعرفة والعطاء قبل المنافسة؛ لذلك نحرص على تقديم
                    الدعم الاستشاري لكافة العملاء — حتى غير المتعاقدين معنا — لمساعدتهم في
                    اختيار أفضل الخامات وتحديد الأنسب لمشروعاتهم وفق ميزانياتهم ومتطلباتهم الفنية.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative bg-navy-deeper overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        </div>

        <div className="pad-y relative">
          <div className="pad-x container-wide">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6, ease }}
                  className="glass-card-dark p-8 text-center hover:-translate-y-1 transition-all duration-500"
                >
                  <div className="text-4xl lg:text-5xl font-bold text-white font-body mb-2">
                    {stat.number}
                  </div>
                  <div className="text-primary text-sm font-semibold mb-1">
                    {stat.label}
                  </div>
                  <div className="text-white text-xs font-light">
                    {stat.desc}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CEO Message */}
      <section className="relative bg-section-gray overflow-hidden">
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/[0.02] rounded-full blur-[100px] pointer-events-none" />

        <div className="pad-y-lg relative">
          <div className="pad-x container-wide">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              {/* Image */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease }}
                className="lg:col-span-4"
              >
                <div className="aspect-[3/4] img-rounded overflow-hidden relative">
                  <div
                    className="absolute inset-0 bg-cover bg-center bg-top"
                    style={{
                      backgroundImage: `url('/images/avatar.jpeg')`,
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-deeper/90 via-transparent to-transparent" />
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
                transition={{ duration: 0.8, ease, delay: 0.15 }}
                className="lg:col-span-7 lg:col-start-6"
              >
                <span className="text-2xl uppercase text-primary font-semibold tracking-widest">
                  كلمة المدير
                </span>
                <h2 className="text-display-sm font-bold text-shimmer-white mt-4 mb-8">
                  نؤمن أن النجاح يقوم على المعرفة والعطاء قبل المنافسة
                </h2>

                <div className="space-y-6">
                  <p className="text-lg md:text-xl text-white/95 font-medium leading-relaxed">
                    على مدار سنوات من العمل الهندسي والميداني، وبفضل الله، راكمنا خبرة
                    متكاملة في مجال الديكورات مسبقة الصنع. تمتد خبراتنا عبر طيف واسع
                    من الطرز المعمارية، من فخامة الكلاسيكو الروماني، ورقيّ النيوكلاسيك،
                    وصولًا إلى جماليات الطراز الإسلامي بمراحله المتنوعة.
                  </p>
                  <p className="text-lg md:text-xl text-white/95 font-medium leading-relaxed">
                    نحرص على تقديم الدعم الاستشاري لكافة العملاء — حتى غير المتعاقدين
                    معنا — لمساعدتهم في اختيار أفضل الخامات وتحديد الأنسب لمشروعاتهم
                    وفق ميزانياتهم ومتطلباتهم الفنية.
                  </p>
                  <p className="text-lg md:text-xl text-white/95 font-medium leading-relaxed">
                    هدفنا أن نكون اسمًا يُعرف بالمشورة الصادقة والإرشاد المهني، وتمكين
                    كل صاحب مشروع من اتخاذ القرار الصحيح.
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-white/[0.08]">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-px bg-primary" />
                    <div>
                      <p className="text-white font-semibold text-sm">المدير التنفيذي</p>
                      <p className="text-shimmer text-xs">شركة عرب فيوتشر المحدودة</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="relative bg-navy-dark overflow-hidden">
        <div className="pad-y-lg relative">
          <div className="pad-x container-wide">
            {/* Vision */}
            <div className="text-center mb-20">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease }}
              >
                <span className="text-2xl uppercase text-primary font-semibold tracking-widest">
                  رؤيتنا
                </span>
                <h2 className="text-display-sm font-bold text-white mt-4 mb-2">
                  نرسم ملامح الغد
                </h2>
                <h2 className="text-display-sm font-bold text-primary mb-8">
                  بإتقان اليوم
                </h2>
                <p className="text-white/60 text-subhead max-w-2xl mx-auto leading-[1.95]">
                  أن نكون الشريك الأول والوجهة الدائمة والمفضلة للعملاء
                  في عالم الواجهات والديكورات مسبقة التصنيع، وترميم المباني ذات القيمة،
                  من خلال تقديم حلول معمارية عالية الجودة تمزج بين الابتكار والإتقان.
                </p>
              </motion.div>

              {/* Aspirations */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12">
                {[
                  { title: "رفع مستوى الصناعة", desc: "محليًا وعالميًا في مجال الواجهات والديكورات مسبقة الصنع" },
                  { title: "بصمة مميزة", desc: "إضفاء لمسة تليق بذوق العملاء وتطلعاتهم في كل مشروع" },
                  { title: "نماذج تنفيذية راقية", desc: "ترتقي بالمشهد العمراني وتعيد تعريف معايير الجمال والمتانة" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.6, ease }}
                    className="glass-card-dark p-7 text-center hover:-translate-y-1 hover:shadow-card-hover hover:border-primary/30 transition-all duration-500"
                  >
                    <h4 className="text-white font-semibold mb-2">{item.title}</h4>
                    <p className="text-white/70 text-sm leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Mission */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease }}
                className="text-center mb-12"
              >
                <span className="text-2xl uppercase text-primary font-semibold tracking-widest">
                  رسالتنا
                </span>
                <h2 className="text-display-sm font-bold text-white mt-4">
                  بصمة معمارية تتجاوز الزمن
                </h2>
                <p className="text-white/60 text-subhead mt-4 max-w-2xl mx-auto leading-[1.95]">
                  توفير قيمة حقيقية لجميع أطراف الصناعة: عملاء، مهندسين، مصنعين،
                  وفنيين، عبر منهج عمل يقوم على الجودة والإتقان
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {missionPillars.map((pillar, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.6, ease }}
                    className="group glass-card-dark p-7 hover:-translate-y-1 hover:shadow-card-hover hover:border-primary/30 transition-all duration-500"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-4 group-hover:from-primary group-hover:to-primary-dark transition-all duration-500">
                      <div className="w-2 h-2 rounded-full bg-primary group-hover:bg-white transition-colors duration-500" />
                    </div>
                    <h4 className="text-white font-semibold text-[15px] mb-2 group-hover:text-primary transition-colors duration-400">
                      {pillar.title}
                    </h4>
                    <p className="text-white/70 text-sm leading-[1.85]">
                      {pillar.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Architectural Styles */}
      <section className="relative bg-section-gray overflow-hidden">
        <div className="pad-y relative">
          <div className="pad-x container-wide text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="text-2xl uppercase text-primary font-semibold tracking-widest">
                تخصصاتنا
              </span>
              <h2 className="text-display-sm font-bold text-white mt-4 mb-4">
                طرز معمارية متنوعة
              </h2>
              <p className="text-white/80 text-subhead max-w-2xl mx-auto leading-[1.95] mb-10">
                تمتد خبراتنا عبر طيف واسع من الطرز المعمارية، مما يمنحنا القدرة
                على تقديم حلول دقيقة تتوافق مع ذوق العميل وطبيعة المشروع
              </p>
            </motion.div>

            <div className="flex flex-wrap justify-center gap-3 mb-16">
              {architecturalStyles.map((style, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04, duration: 0.4 }}
                  className="px-6 py-3 glass-card-dark text-white/80 text-sm hover:bg-primary hover:text-navy-deeper hover:border-primary hover:shadow-glow transition-all duration-400 cursor-default"
                >
                  {style}
                </motion.span>
              ))}
            </div>

            {/* Specializations */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                {
                  title: "الواجهات الزخرفية",
                  titleEn: "Decorative Facades",
                  desc: "تصميم وتنفيذ واجهات وديكورات مسبقة الصنع بخامات متعددة تتناسب مع بيئة العمل",
                },
                {
                  title: "ترميم المباني التاريخية",
                  titleEn: "Historical Restoration",
                  desc: "الحفاظ على التراث المعماري وإعادة إحياء المباني ذات القيمة التاريخية",
                },
                {
                  title: "النصائح الفنية",
                  titleEn: "Technical Advice",
                  desc: "دعم فني لكافة العملاء لمساعدتهم في اختيار أفضل الخامات والحلول",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6, ease }}
                  className="group glass-card-dark p-8 hover:-translate-y-2 hover:shadow-card-hover hover:border-primary/50 gold-border-glow transition-all duration-500 overflow-hidden relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <div className="relative z-10">
                    <h4 className="font-semibold text-white text-base mb-1 group-hover:text-primary transition-colors duration-400">
                      {item.title}
                    </h4>
                    <span className="text-[10px] text-primary/70 tracking-wider uppercase font-body block mb-4">
                      {item.titleEn}
                    </span>
                    <p className="text-white/60 text-sm leading-[1.85]">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-navy-deeper overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[120px] pointer-events-none" />
        </div>

        <div className="pad-y relative">
          <div className="pad-x container-wide text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease }}
            >
              <h2 className="text-display-sm font-bold text-white mb-4">
                جاهز تبدأ مشروعك؟
              </h2>
              <p className="text-white/50 text-subhead mb-8 max-w-lg mx-auto">
                تواصل معنا اليوم وخلينا نحول رؤيتك لواقع معماري مميز
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="/#contact" className="btn-primary">
                  <span>تواصل معنا</span>
                  <svg className="w-4 h-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                  </svg>
                </a>
                <a href="/gallery" className="btn-ghost">
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
