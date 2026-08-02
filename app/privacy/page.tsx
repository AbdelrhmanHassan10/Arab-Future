"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ease = [0.16, 1, 0.3, 1] as const;

const sections = [
  {
    title: "المعلومات التي نقوم بجمعها",
    content: [
      "قد نقوم بجمع ومعالجة البيانات التالية:",
    ],
    list: [
      "الاسم الكامل",
      "رقم الهاتف",
      "البريد الإلكتروني",
      "عنوان المشروع أو الموقع",
      "تفاصيل الطلب أو الخدمة المطلوبة",
      "أي معلومات أخرى تقدمها من خلال نماذج التواصل",
    ],
    extra: "كما قد يتم جمع بيانات تلقائية مثل:",
    extraList: [
      "عنوان IP",
      "نوع المتصفح",
      "بيانات الاستخدام داخل الموقع",
    ],
  },
  {
    title: "كيفية استخدام المعلومات",
    content: [
      "نستخدم المعلومات التي نجمعها للأغراض التالية:",
    ],
    list: [
      "التواصل معك والرد على استفساراتك",
      "تقديم العروض والخدمات (مثل GRC، GRG، GRP، الحجر الصناعي، الفوم، أعمال الهارد سكيب، التصميم الداخلي والتشطيبات)",
      "تحسين جودة خدماتنا وتجربة المستخدم",
      "إدارة العمليات الداخلية وتحليل الأداء",
    ],
  },
  {
    title: "حماية البيانات",
    content: [
      "نلتزم باتخاذ كافة الإجراءات الأمنية والتقنية اللازمة لحماية بياناتك من:",
    ],
    list: [
      "الوصول غير المصرح به",
      "التعديل أو الإفصاح غير القانوني",
      "الفقد أو التلف",
    ],
  },
  {
    title: "مشاركة البيانات مع أطراف ثالثة",
    content: [
      "لا نقوم ببيع أو تأجير بياناتك لأي طرف ثالث.",
      "وقد يتم مشاركة البيانات فقط في الحالات التالية:",
    ],
    list: [
      "لتنفيذ الخدمة (مثل شركاء التنفيذ أو الموردين)",
      "للامتثال للمتطلبات القانونية",
      "لحماية حقوق الشركة أو المستخدمين",
    ],
  },
  {
    title: "ملفات تعريف الارتباط (Cookies)",
    content: [
      "قد يستخدم الموقع ملفات تعريف الارتباط لتحسين تجربة المستخدم، مثل:",
    ],
    list: [
      "حفظ تفضيلات المستخدم",
      "تحليل أداء الموقع",
    ],
    extra: "يمكنك تعطيل الكوكيز من خلال إعدادات المتصفح.",
  },
  {
    title: "الاحتفاظ بالبيانات",
    content: [
      "نحتفظ ببياناتك فقط للفترة اللازمة لتحقيق الأغراض المذكورة في هذه السياسة، أو وفقًا لما يتطلبه القانون.",
    ],
  },
  {
    title: "حقوق المستخدم",
    content: [
      "يحق لك:",
    ],
    list: [
      "طلب الاطلاع على بياناتك",
      "طلب تعديل أو حذف بياناتك",
      "سحب موافقتك على استخدام البيانات",
    ],
  },
  {
    title: "روابط خارجية",
    content: [
      "قد يحتوي الموقع على روابط لمواقع أخرى، ولا نتحمل مسؤولية سياسات الخصوصية الخاصة بهذه المواقع.",
    ],
  },
  {
    title: "التعديلات على سياسة الخصوصية",
    content: [
      "نحتفظ بحق تحديث هذه السياسة في أي وقت، وسيتم نشر أي تعديل على هذه الصفحة.",
    ],
  },
  {
    title: "التواصل معنا",
    content: [
      "في حال وجود أي استفسار بخصوص سياسة الخصوصية:",
    ],
    list: [
      "البريد الإلكتروني: info@arabfuture.com",
      "الهاتف: \u202A+966 53 808 6128\u202C",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-navy-deeper" />
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/[0.06] rounded-full blur-[150px]" />
        </div>

        <div className="relative z-10 text-center pad-x pt-32 pb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="text-2xl uppercase text-primary font-semibold tracking-widest"
          >
            Privacy Policy
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="text-display-sm md:text-display font-bold text-white mt-4"
          >
            سياسة الخصوصية
          </motion.h1>
        </div>
      </section>

      {/* Content */}
      <section className="bg-navy-dark">
        <div className="pad-y pad-x">
          <div className="max-w-[850px] mx-auto">
            {/* Intro */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease }}
              className="glass-card-dark p-8 md:p-10 mb-12"
            >
              <p className="text-white leading-[1.9]">
                تلتزم شركة عرب فيوتشر المحدودة (&quot;نحن&quot; أو &quot;الشركة&quot;) بحماية خصوصية مستخدمي موقعها الإلكتروني، وتوضح هذه السياسة كيفية جمع واستخدام وحماية المعلومات الشخصية الخاصة بك عند استخدام الموقع أو خدماتنا.
              </p>
            </motion.div>

            {/* Sections */}
            <div className="space-y-10">
              {sections.map((section, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease }}
                >
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-primary text-sm font-bold font-body">{idx + 1}</span>
                    </div>
                    <h2 className="text-lg font-bold text-white">{section.title}</h2>
                  </div>

                  {/* Content */}
                  <div className="glass-card-dark p-6 md:p-8">
                    {section.content.map((text, i) => (
                      <p key={i} className="text-white text-[15px] leading-[1.85] mb-4 last:mb-0">
                        {text}
                      </p>
                    ))}

                    {section.list && (
                      <ul className="space-y-3 mt-4">
                        {section.list.map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary/50 mt-2.5 flex-shrink-0" />
                            <span dir="auto" className="text-white text-[15px] leading-[1.85]">{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {section.extra && (
                      <p className="text-white text-[15px] leading-[1.85] mt-5">
                        {section.extra}
                      </p>
                    )}

                    {section.extraList && (
                      <ul className="space-y-3 mt-3">
                        {section.extraList.map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary/50 mt-2.5 flex-shrink-0" />
                            <span dir="auto" className="text-white text-[15px] leading-[1.85]">{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
