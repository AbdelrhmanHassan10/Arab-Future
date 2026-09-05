"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ease = [0.16, 1, 0.3, 1] as const;

const sections = [
  {
    title: "المعلومات التي نقوم بجمعها",
    content: [
      "نحرص في الفضل العقاريه على جمع المعلومات الضرورية فقط لتقديم أفضل خدمة عقارية ممكنة. قد نقوم بجمع ومعالجة البيانات التالية:",
    ],
    list: [
      "الاسم الكامل ورقم الهوية (عند الحاجة لإتمام العقود أو المعاينات الرسمية)",
      "رقم الهاتف والبريد الإلكتروني",
      "المنطقة الجغرافية المفضلة للبحث عن عقار",
      "الميزانية المقترحة وتفاصيل الطلب العقاري",
      "أي معلومات أخرى تقدمها من خلال نماذج التواصل أو المعاينة الميدانية",
    ],
    extra: "كما قد يتم جمع بيانات تقنية وتلقائية عند تصفحك للموقع مثل:",
    extraList: [
      "عنوان بروتوكول الإنترنت (IP)",
      "نوع المتصفح والجهاز المستخدم",
      "بيانات الاستخدام وتفضيلات التصفح داخل الموقع",
    ],
  },
  {
    title: "كيفية استخدام المعلومات",
    content: [
      "نستخدم المعلومات التي نجمعها لضمان تجربة سلسة وآمنة، وللأغراض التالية:",
    ],
    list: [
      "التواصل معك والرد على استفساراتك وطلباتك العقارية",
      "تقديم العروض والخدمات الأنسب لك (مثل بيع وشراء العقارات، الاستشارات العقارية، التشطيبات والديكور)",
      "تحديد مواعيد المعاينات الميدانية للعقارات",
      "تحسين جودة خدماتنا وتخصيص تجربة المستخدم",
      "إرسال تنبيهات بالعقارات الجديدة التي تطابق اهتماماتك",
    ],
  },
  {
    title: "حماية البيانات وأمنها",
    content: [
      "نضع خصوصيتك في مقدمة أولوياتنا، ونلتزم باتخاذ كافة الإجراءات الأمنية والتقنية الصارمة لحماية بياناتك من:",
    ],
    list: [
      "الوصول أو الاستخدام غير المصرح به",
      "التعديل أو الإفصاح غير القانوني",
      "الفقد أو التلف العرضي",
    ],
    extra: "نحن نستخدم أنظمة تقنية حديثة ونقيد وصول موظفينا للبيانات إلا في حدود ما تتطلبه مهامهم الوظيفية لخدمتك."
  },
  {
    title: "مشاركة البيانات مع أطراف ثالثة",
    content: [
      "الثقة هي أساس عملنا في الفضل العقاريه. نحن لا نقوم مطلقاً ببيع أو تأجير بياناتك لأي جهة خارجية.",
      "وقد يتم مشاركة البيانات في أضيق الحدود وفي الحالات التالية فقط:",
    ],
    list: [
      "مع الأطراف ذات الصلة المباشرة بإتمام الصفقة العقارية (مثل البائع أو المشتري أو الجهات القانونية) وذلك بعلمك وموافقتك.",
      "مع شركاء التنفيذ (مثل شركات المقاولات أو التشطيبات إذا طلبت هذه الخدمة).",
      "للامتثال للمتطلبات القانونية أو الأوامر القضائية.",
    ],
  },
  {
    title: "ملفات تعريف الارتباط (Cookies)",
    content: [
      "نستخدم ملفات تعريف الارتباط (Cookies) لتحسين تجربتك وتوفير وقتك عند تصفح الموقع، ويشمل ذلك:",
    ],
    list: [
      "حفظ تفضيلاتك وعمليات البحث السابقة عن العقارات",
      "تحليل أداء الموقع لفهم احتياجات الزوار بشكل أفضل",
    ],
    extra: "يمكنك في أي وقت تعديل إعدادات المتصفح الخاص بك لرفض ملفات تعريف الارتباط، ولكن قد يؤثر ذلك على عمل بعض خصائص الموقع.",
  },
  {
    title: "الاحتفاظ بالبيانات",
    content: [
      "نحتفظ ببياناتك الشخصية فقط للفترة اللازمة لتقديم الخدمات العقارية المطلوبة، أو للامتثال لالتزاماتنا القانونية وتوثيق العقود وتسوية النزاعات.",
    ],
  },
  {
    title: "حقوق المستخدم",
    content: [
      "نحترم حقوقك الكاملة فيما يتعلق ببياناتك الشخصية، ويحق لك في أي وقت:",
    ],
    list: [
      "طلب الاطلاع على بياناتك التي نحتفظ بها",
      "طلب تعديل أو تحديث أي معلومات غير دقيقة",
      "طلب حذف بياناتك من سجلاتنا (ما لم يكن هناك مانع قانوني)",
      "سحب موافقتك على استخدام البيانات للأغراض التسويقية",
    ],
  },
  {
    title: "التعديلات على سياسة الخصوصية",
    content: [
      "نحتفظ بحق تحديث أو تعديل هذه السياسة من وقت لآخر لمواكبة التطورات التقنية أو القانونية. سيتم نشر أي تعديل على هذه الصفحة، ونشجعك على مراجعتها بشكل دوري.",
    ],
  },
  {
    title: "التواصل معنا",
    content: [
      "في حال وجود أي استفسار أو مخاوف بخصوص سياسة الخصوصية أو كيفية تعاملنا مع بياناتك، يسعدنا تواصلك معنا عبر:",
    ],
    list: [
      "البريد الإلكتروني: info@alfadl-realestate.com",
      "الهاتف: \u202A+201008450553\u202C",
    ],
  },
];

export default function PrivacyPage() {
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
            سياسة الخصوصية
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
            className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed"
          >
            نحن نقدر ثقتك بنا ونلتزم بحماية بياناتك الشخصية بأعلى معايير الأمان.
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
              <div className="absolute inset-0 bg-[url('/projects/project-3.png')] bg-cover bg-center opacity-5 grayscale mix-blend-overlay" />
              <p className="text-white/80 leading-[2] text-lg relative z-10">
                تلتزم <strong className="text-white">الفضل العقاريه</strong> للوساطة والاستشارات العقارية بحماية خصوصية عملائها الكرام. توضح هذه الوثيقة بوضوح وشفافية تامة كيفية جمع واستخدام وحماية المعلومات الشخصية الخاصة بك عند تواصلك معنا أو استخدامك لموقعنا الإلكتروني لضمان استثمار آمن وتجربة موثوقة.
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
                        <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-primary to-[#A07B40]">0{idx + 1}</span>
                      </div>
                      {/* Vertical line connector (hidden on last item) */}
                      {idx !== sections.length - 1 && (
                        <div className="hidden md:block absolute top-20 bottom-[-64px] left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-white/10 to-transparent" />
                      )}
                    </div>

                    {/* Section Content */}
                    <div className="flex-grow pt-2">
                      <h2 className="text-2xl font-bold text-white mb-6 group-hover:text-primary transition-colors">{section.title}</h2>
                      
                      <div className="space-y-4">
                        {section.content.map((text, i) => (
                          <p key={i} className="text-white/70 text-lg leading-[1.9]">
                            {text}
                          </p>
                        ))}

                        {section.list && (
                          <ul className="space-y-4 mt-6 bg-[#1a1a1a]/50 rounded-2xl p-6 border border-white/5">
                            {section.list.map((item, i) => (
                              <li key={i} className="flex items-start gap-4">
                                <div className="w-2 h-2 rounded-full bg-primary mt-2.5 flex-shrink-0 shadow-[0_0_10px_rgba(191,154,95,0.5)]" />
                                <span className="text-white/80 text-lg leading-[1.8]">{item}</span>
                              </li>
                            ))}
                          </ul>
                        )}

                        {section.extra && (
                          <p className="text-white/70 text-lg leading-[1.9] mt-6 italic border-r-2 border-primary/30 pr-4">
                            {section.extra}
                          </p>
                        )}

                        {section.extraList && (
                          <ul className="space-y-3 mt-4 pr-6">
                            {section.extraList.map((item, i) => (
                              <li key={i} className="flex items-center gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-white/30 flex-shrink-0" />
                                <span className="text-white/60 text-[16px]">{item}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
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
