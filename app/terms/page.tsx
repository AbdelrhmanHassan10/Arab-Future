"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ease = [0.16, 1, 0.3, 1] as const;

const sections = [
  {
    id: "0",
    titleAr: "معلومات الشركة (مطلوبة قانونيًا)",
    titleEn: "Company Information (Legally Required)",
    contentAr: [
      "شركة عرب فيوتشر المحدودة",
      "العنوان: حفصة بنت عمر 3362، حي الروضة 7708، الرياض 13211، المملكة العربية السعودية",
      "البريد الإلكتروني: info@arabfuture.com",
      "الهاتف: +966 53 808 6128",
    ],
    contentEn: [
      "Arab Future Limited Company",
      "Address: Hafsa Bint Omar 3362, Al Rawdah 7708, Riyadh 13211, Saudi Arabia",
      "Email: info@arabfuture.com",
      "Phone: +966 53 808 6128",
    ],
  },
  {
    id: "1",
    titleAr: "التعريفات",
    titleEn: "Definitions",
    contentAr: [
      "\"الموقع\": يشير إلى الموقع الإلكتروني الخاص بشركة عرب فيوتشر المحدودة.",
      "\"الخدمات\": تشمل جميع الخدمات التي تقدمها الشركة مثل أعمال GRC، GRG، GRP، الحجر الصناعي، الفوم، الهارد سكيب، التصميم الداخلي، والتشطيبات.",
    ],
    contentEn: [
      "\"The Website\": refers to the official website of Arab Future Limited Company.",
      "\"The Services\": include all services provided by the Company such as GRC, GRG, GRP works, artificial stone, foam, hardscape, interior design, and finishes.",
    ],
  },
  {
    id: "2",
    titleAr: "أهلية المستخدم",
    titleEn: "User Eligibility",
    contentAr: [
      "باستخدامك للموقع، تقر بأنك بلغت السن القانوني (18 سنة فأكثر) أو لديك موافقة ولي الأمر إذا كنت قاصرًا.",
    ],
    contentEn: [
      "By using the Website, you confirm that you are of legal age (18 years or older) or have the consent of your legal guardian if you are a minor.",
    ],
  },
  {
    id: "3",
    titleAr: "استخدام الموقع",
    titleEn: "Use of the Website",
    contentAr: [
      "يجب أن يكون استخدام الموقع لأغراض قانونية فقط.",
      "يُحظر تمامًا استخدام الموقع لأي غرض غير مشروع أو يضر بالشركة أو بالمستخدمين الآخرين.",
      "يُمنع محاولة اختراق الموقع أو تعطيله أو الوصول إليه بطرق غير مصرح بها.",
    ],
    contentEn: [
      "The Website must be used for lawful purposes only.",
      "Any unlawful use that harms the Company or other users is strictly prohibited.",
      "Attempting to hack, disable, or access the Website by unauthorized means is forbidden.",
    ],
  },
  {
    id: "4",
    titleAr: "الخدمات",
    titleEn: "Services",
    contentAr: [
      "تخضع جميع الخدمات لدراسة كل مشروع على حدة.",
      "يتم تحديد الأسعار النهائية بعد المعاينة الميدانية أو تقديم التفاصيل الكاملة للطلب.",
      "يحق للشركة قبول أو رفض أي طلب دون إبداء الأسباب.",
      "يتم إبرام العقد الفعلي فقط بعد تقديم عرض سعر مكتوب وموافقة العميل كتابيًا.",
    ],
    contentEn: [
      "All services are subject to individual project assessment.",
      "Final prices are determined after on-site inspection or submission of complete request details.",
      "The Company reserves the right to accept or reject any request without stating reasons.",
      "A binding contract is formed only after a written quotation is provided and the client gives written approval.",
    ],
  },
  {
    id: "5",
    titleAr: "دقة المعلومات",
    titleEn: "Accuracy of Information",
    contentAr: [
      "يتحمل المستخدم كامل المسؤولية عن صحة ودقة البيانات التي يقدمها.",
      "الشركة غير مسؤولة عن أي نتائج أو أضرار تنتج عن تقديم معلومات غير دقيقة أو غير صحيحة.",
    ],
    contentEn: [
      "The user bears full responsibility for the accuracy and correctness of the information provided.",
      "The Company is not liable for any results or damages arising from inaccurate or incorrect information.",
    ],
  },
  {
    id: "6",
    titleAr: "الخصوصية وحماية البيانات",
    titleEn: "Privacy and Data Protection",
    contentAr: [
      "تلتزم شركة عرب فيوتشر المحدودة بمعالجة البيانات الشخصية وفقًا لأحكام نظام حماية البيانات الشخصية الصادر بقرار مجلس الوزراء رقم (98) بتاريخ 16/3/1445هـ ولوائحه التنفيذية.",
      "نحصل على موافقتك الصريحة قبل جمع أو معالجة بياناتك الشخصية، ولك الحق في الوصول أو التصحيح أو الحذف أو الاعتراض أو سحب الموافقة في أي وقت.",
    ],
    contentEn: [
      "Arab Future Limited Company is committed to processing personal data in accordance with the Personal Data Protection Law issued by Council of Ministers Resolution No. (98) dated 16/3/1445 AH and its executive regulations.",
      "We obtain your explicit consent before collecting or processing your personal data, and you have the right to access, correct, delete, object to, or withdraw consent at any time.",
    ],
  },
  {
    id: "7",
    titleAr: "الملكية الفكرية",
    titleEn: "Intellectual Property",
    contentAr: [
      "جميع محتويات الموقع (نصوص، صور، تصميمات، شعارات، فيديوهات، إلخ) مملوكة لشركة عرب فيوتشر المحدودة أو مرخصة لها.",
      "يُحظر نسخ أو إعادة استخدام أو توزيع أي محتوى بدون إذن كتابي مسبق من الشركة.",
    ],
    contentEn: [
      "All content on the Website (texts, images, designs, logos, videos, etc.) is owned by or licensed to Arab Future Limited Company.",
      "Copying, reusing, or distributing any content without prior written permission from the Company is strictly prohibited.",
    ],
  },
  {
    id: "8",
    titleAr: "حدود المسؤولية",
    titleEn: "Limitation of Liability",
    contentAr: [
      "لا تتحمل الشركة أي مسؤولية عن الأعطال التقنية أو انقطاع الخدمة أو الفيروسات.",
      "لا تتحمل الشركة أي مسؤولية عن أي خسائر مباشرة أو غير مباشرة ناتجة عن استخدام الموقع.",
      "استخدامك للموقع يكون على مسؤوليتك الشخصية الكاملة.",
    ],
    contentEn: [
      "The Company shall not be liable for technical failures, service interruptions, or viruses.",
      "The Company shall not be liable for any direct or indirect losses arising from use of the Website.",
      "Your use of the Website is at your own full personal risk.",
    ],
  },
  {
    id: "9",
    titleAr: "الروابط الخارجية",
    titleEn: "External Links",
    contentAr: [
      "قد يحتوي الموقع على روابط لمواقع خارجية. الشركة غير مسؤولة عن محتواها أو سياساتها أو ممارساتها.",
    ],
    contentEn: [
      "The Website may contain links to external websites. The Company is not responsible for their content, policies, or practices.",
    ],
  },
  {
    id: "10",
    titleAr: "التعديلات على الشروط",
    titleEn: "Amendments to the Terms",
    contentAr: [
      "تحتفظ الشركة بحق تعديل هذه الشروط والأحكام في أي وقت. يُعتبر استمرارك في استخدام الموقع بعد التعديل موافقة منك على النسخة المعدلة.",
    ],
    contentEn: [
      "The Company reserves the right to amend these Terms and Conditions at any time. Your continued use of the Website after any amendment constitutes your acceptance of the revised version.",
    ],
  },
  {
    id: "11",
    titleAr: "إنهاء الاستخدام",
    titleEn: "Termination of Use",
    contentAr: [
      "يحق للشركة إيقاف أو منع أي مستخدم من استخدام الموقع في حال مخالفة أي من هذه الشروط، دون إشعار مسبق، ودون تحمل أي مسؤولية عن البيانات أو المحتوى الذي أدخله المستخدم سابقًا.",
    ],
    contentEn: [
      "The Company may suspend or prohibit any user from using the Website in the event of any breach of these Terms, without prior notice, and without any liability for data or content previously entered by the user.",
    ],
  },
  {
    id: "12",
    titleAr: "القوة القاهرة",
    titleEn: "Force Majeure",
    contentAr: [
      "لا تتحمل الشركة أي مسؤولية عن التأخير أو عدم التنفيذ الناتج عن أحداث خارجة عن إرادتها (حرائق، فيضانات، إضرابات، أوبئة، قرارات حكومية، إلخ).",
    ],
    contentEn: [
      "The Company shall not be liable for any delay or failure to perform resulting from events beyond its reasonable control (fire, flood, strikes, epidemics, government orders, etc.).",
    ],
  },
  {
    id: "13",
    titleAr: "التعويض",
    titleEn: "Indemnification",
    contentAr: [
      "يتحمل المستخدم تعويض الشركة وإبراء ذمتها عن أي خسائر أو مطالبات أو مصاريف تنتج عن مخالفة هذه الشروط أو تقديم بيانات خاطئة.",
    ],
    contentEn: [
      "The user shall indemnify and hold the Company harmless from any losses, claims, or expenses arising from breach of these Terms or submission of incorrect data.",
    ],
  },
  {
    id: "14",
    titleAr: "قابلية الفصل",
    titleEn: "Severability",
    contentAr: [
      "إذا اعتبر أي بند من هذه الشروط باطلاً أو غير قابل للتنفيذ، فإن باقي البنود تبقى سارية المفعول بكامل قوتها.",
    ],
    contentEn: [
      "If any provision of these Terms is held invalid or unenforceable, the remaining provisions shall remain in full force and effect.",
    ],
  },
  {
    id: "15",
    titleAr: "القانون الحاكم",
    titleEn: "Governing Law",
    contentAr: [
      "تخضع هذه الشروط والأحكام لقوانين المملكة العربية السعودية، وتختص المحاكم السعودية المختصة حصريًا بالفصل في أي نزاع ينشأ عنها أو يتعلق بها.",
    ],
    contentEn: [
      "These Terms and Conditions are governed by the laws of the Kingdom of Saudi Arabia, and the competent Saudi courts shall have exclusive jurisdiction over any dispute arising out of or in connection with them.",
    ],
  },
  {
    id: "16",
    titleAr: "التواصل",
    titleEn: "Contact Us",
    contentAr: [
      "البريد الإلكتروني: info@arabfuture.com",
      "الهاتف: +966 53 808 6128",
    ],
    contentEn: [
      "Email: info@arabfuture.com",
      "Phone: +966 53 808 6128",
    ],
  },
];

export default function TermsPage() {
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
            Terms & Conditions
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="text-display-sm md:text-display font-bold text-white mt-4"
          >
            الشروط والأحكام
          </motion.h1>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-navy-dark">
        <div className="pad-y pad-x">
          <div className="max-w-[850px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease }}
              className="glass-card-dark p-8 md:p-10 mb-12"
            >
              <p className="text-white leading-[1.9] mb-4">
                باستخدامك لموقع شركة عرب فيوتشر المحدودة، فإنك توافق على الالتزام بالشروط والأحكام التالية:
              </p>
              <p className="text-white/70 text-sm leading-[1.9]" dir="ltr">
                By using the website of Arab Future Limited Company, you agree to be bound by the following Terms and Conditions.
              </p>
            </motion.div>

            {/* Sections */}
            <div className="space-y-10">
              {sections.map((section, idx) => (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease }}
                >
                  {/* Section header */}
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-primary text-sm font-bold font-body">{idx}</span>
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-white">{section.titleAr}</h2>
                      <span className="text-xs text-white/50 font-body">{section.titleEn}</span>
                    </div>
                  </div>

                  {/* Arabic content */}
                  <div className="glass-card-dark p-6 md:p-8 mb-3">
                    <ul className="space-y-3">
                      {section.contentAr.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary/50 mt-2.5 flex-shrink-0" />
                          <span dir="auto" className="text-white text-[15px] leading-[1.85]">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* English content */}
                  <div className="px-6 md:px-8">
                    <ul className="space-y-2" dir="ltr">
                      {section.contentEn.map((item, i) => (
                        <li key={i} className="text-white/70 text-sm leading-[1.85]">
                          {item}
                        </li>
                      ))}
                    </ul>
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
              className="mt-14 bg-navy-deeper rounded-[20px] p-8 md:p-10 text-center"
            >
              <p className="text-white leading-[1.9] mb-3">
                باستخدامك لهذا الموقع، فإنك تقر وتوافق بالكامل على هذه الشروط والأحكام، وتقر بأنك قرأتها وفهمتها تمامًا.
              </p>
              <p className="text-white/50 text-sm leading-[1.9]" dir="ltr">
                By using this Website, you fully acknowledge and agree to these Terms and Conditions, and confirm that you have read and understood them completely.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
