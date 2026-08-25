"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ease = [0.16, 1, 0.3, 1] as const;

const sections = [
  {
    title: "معلومات الشركة الأساسية",
    content: [
      "مؤسسة سمسار بني سويف للوساطة والتسويق العقاري",
      "العنوان: بني سويف، جمهورية مصر العربية",
      "البريد الإلكتروني: info@semsarbenisuef.com",
      "الهاتف: \u202A+20 100 123 4567\u202C",
    ],
  },
  {
    title: "التعريفات",
    content: [
      "\"الموقع\": يشير إلى المنصة الإلكترونية الخاصة بسمسار بني سويف.",
      "\"الخدمات\": تشمل جميع الخدمات العقارية مثل الوساطة في البيع والشراء والإيجار، الاستشارات العقارية، التشطيبات والديكور، وإدارة الأملاك.",
    ],
  },
  {
    title: "أهلية المستخدم",
    content: [
      "باستخدامك للموقع أو التعامل معنا، تقر بأنك بلغت السن القانوني للتعاقد (21 سنة فأكثر وفقاً للقانون المصري) وتتمتع بالأهلية القانونية الكاملة لإبرام العقود والاتفاقيات.",
    ],
  },
  {
    title: "شروط تقديم الخدمات العقارية",
    content: [
      "جميع العروض العقارية المعروضة تخضع لتوفرها وقت تأكيد الطلب.",
      "الأسعار المعلنة قابلة للتغيير بناءً على ظروف السوق وتوجيهات المالك.",
      "سمسار بني سويف يقوم بدور الوسيط العقاري ولا يتحمل مسؤولية أي عيوب خفية في العقار، ويُنصح العميل دائماً بالمعاينة النافية للجهالة قبل إتمام التعاقد.",
      "يتم استحقاق عمولة الوساطة العقارية المتفق عليها فور توقيع عقود البيع أو الإيجار بين الأطراف.",
    ],
  },
  {
    title: "استخدام الموقع الإلكتروني",
    content: [
      "يجب أن يكون استخدام الموقع لأغراض قانونية ومشروعة فقط.",
      "يُحظر تمامًا استخدام الموقع لتقديم عروض وهمية أو بيانات مضللة.",
      "يُمنع محاولة اختراق الموقع أو تعطيله أو الوصول إليه بطرق غير مصرح بها.",
    ],
  },
  {
    title: "دقة المعلومات",
    content: [
      "يتحمل المستخدم (سواء كان بائعاً أو مشترياً) كامل المسؤولية عن صحة ودقة البيانات والمستندات التي يقدمها للشركة.",
      "نخلي مسؤوليتنا عن أي نزاعات قانونية تنشأ بسبب تقديم مستندات ملكية غير صحيحة أو بيانات مزيفة من قبل العملاء.",
    ],
  },
  {
    title: "الملكية الفكرية",
    content: [
      "جميع محتويات الموقع (نصوص، صور العقارات الحصرية، تصميمات، شعارات) مملوكة لسمسار بني سويف.",
      "يُحظر نسخ أو إعادة استخدام أي محتوى أو صور عقارية لعرضها في منصات أخرى بدون إذن كتابي مسبق.",
    ],
  },
  {
    title: "الروابط الخارجية",
    content: [
      "قد يحتوي الموقع على روابط لصفحات مشاريع عقارية أو مطورين آخرين. نحن غير مسؤولين عن محتوى تلك المواقع المستقلة.",
    ],
  },
  {
    title: "القوة القاهرة",
    content: [
      "لا تتحمل المؤسسة أي مسؤولية عن التأخير أو عدم التنفيذ الناتج عن أحداث خارجة عن إرادتها (مثل التغيرات المفاجئة في القوانين العقارية، الأزمات الاقتصادية الطارئة، أو الكوارث الطبيعية).",
    ],
  },
  {
    title: "القانون الحاكم وحل النزاعات",
    content: [
      "تخضع هذه الشروط والأحكام للقوانين والتشريعات المعمول بها في جمهورية مصر العربية.",
      "تختص المحاكم المصرية (محاكم بني سويف) حصريًا بالفصل في أي نزاع ينشأ عن أو يتعلق بتقديم خدماتنا.",
    ],
  },
  {
    title: "التعديلات على الشروط",
    content: [
      "تحتفظ سمسار بني سويف بحق تعديل هذه الشروط والأحكام في أي وقت. يُعتبر استمرارك في التعامل معنا أو استخدام الموقع بعد التعديل موافقة صريحة منك على النسخة المعدلة.",
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[40vh] md:min-h-[50vh] flex items-center justify-center overflow-hidden bg-[#090909] pt-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/[0.04] rounded-full blur-[120px] pointer-events-none" />
        
        <div className="container-wide px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#111111] border border-white/10 mb-6"
            dir="ltr"
          >
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-xs text-white/80 uppercase font-body tracking-widest">Legal Document</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 mb-6 drop-shadow-2xl leading-relaxed pb-4"
          >
            الشروط والأحكام
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
            className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed"
          >
            تنظم هذه الشروط والأحكام العلاقة بينك وبين مؤسسة سمسار بني سويف لضمان حقوق جميع الأطراف.
          </motion.p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 relative bg-[#090909]">
        <div className="container-wide px-6 relative z-10 pt-10">
          <div className="max-w-[900px] mx-auto">
            {/* Intro */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease }}
              className="bg-[#1a1a1a] rounded-[2rem] p-8 md:p-12 mb-16 border border-white/5 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-[url('/projects/project-12.png')] bg-cover bg-center opacity-5 grayscale mix-blend-overlay" />
              <p className="text-white/80 leading-[2] text-lg relative z-10">
                باستخدامك لموقع <strong className="text-white">سمسار بني سويف</strong> أو تعاملك معنا، فإنك توافق على الالتزام التام بالشروط والأحكام التالية، والتي تهدف إلى تنظيم وتسهيل المعاملات العقارية لضمان أفضل مستوى من الخدمة وحفظ حقوقك القانونية وحقوق المؤسسة.
              </p>
            </motion.div>

            {/* Sections */}
            <div className="space-y-10 md:space-y-16">
              {sections.map((section, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease }}
                  className="relative group"
                >
                  <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start">
                    {/* Number Indicator */}
                    <div className="flex-shrink-0 relative">
                      <div className="w-16 h-16 rounded-2xl bg-[#1a1a1a] border border-white/10 flex items-center justify-center shadow-lg group-hover:border-primary/30 group-hover:bg-primary/5 transition-all duration-300">
                        <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-primary to-[#A07B40]">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                      </div>
                      {/* Vertical line connector (hidden on last item) */}
                      {idx !== sections.length - 1 && (
                        <div className="hidden md:block absolute top-20 bottom-[-64px] left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-white/10 to-transparent" />
                      )}
                    </div>

                    {/* Section Content */}
                    <div className="flex-grow pt-2">
                      <h2 className="text-2xl font-bold text-white mb-6 group-hover:text-primary transition-colors">{section.title}</h2>
                      
                      <div className="space-y-4 bg-[#1a1a1a]/50 rounded-2xl p-6 md:p-8 border border-white/5">
                        <ul className="space-y-4">
                          {section.content.map((item, i) => (
                            <li key={i} className="flex items-start gap-4">
                              <div className="w-2 h-2 rounded-full bg-primary mt-2.5 flex-shrink-0 shadow-[0_0_10px_rgba(191,154,95,0.5)]" />
                              <span className="text-white/80 text-lg leading-[1.9]">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Footer note */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease }}
              className="mt-16 bg-[#1a1a1a] rounded-[2rem] p-8 md:p-10 border border-white/5 text-center relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 pointer-events-none" />
              <p className="text-white/80 leading-[1.9] text-lg relative z-10">
                باستخدامك لهذا الموقع، فإنك تقر وتوافق بالكامل على هذه الشروط والأحكام، وتقر بأنك قرأتها وفهمتها تمامًا وتوافق على الخضوع للقوانين المصرية في هذا الشأن.
              </p>
            </motion.div>
            
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
