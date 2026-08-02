"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ease = [0.16, 1, 0.3, 1] as const;

const faqCategories = [
  {
    title: "المواد والخامات",
    questions: [
      {
        q: "ما هو GRC؟",
        a: "GRC (Glass Reinforced Concrete) هو خرسانة مسلحة بالألياف الزجاجية، تم تصميمها لتكون خفيفة الوزن وقوية التحمل في آن واحد. يُستخدم بشكل أساسي في واجهات الفلل والمشاريع الكبيرة لأنه يتحمل الحرارة والرطوبة والعوامل الجوية. عملائنا يحبون GRC لأنه يعطيهم شكل جمالي فاخر بدون زيادة وزن المبنى.",
      },
      {
        q: "ما هو GRP؟",
        a: "GRP (Glass Reinforced Plastic) هو بلاستيك مقوى بالألياف الزجاجية. خفيف جداً، مقاوم للماء، ويستخدم عادة في المجسمات الخارجية، القباب، والنوافير. هو الحل الأمثل إذا كنت تريد ديكور خارجي معقد أو مجسم خفيف يتحمل الشمس والمطر.",
      },
      {
        q: "ما هو GRG؟",
        a: "GRG (Glass Reinforced Gypsum) هو جبس مسلح بالألياف الزجاجية، متخصص للديكورات الداخلية. مثالي للأسقف المعلقة والقباب الداخلية والزخارف الدقيقة، حيث يعطي لمسة فخمة وراقية لكل القاعات والمساجد والفنادق.",
      },
    ],
  },
  {
    title: "الاستخدامات",
    questions: [
      {
        q: "ما هي استخدامات كل مادة؟",
        a: "GRC: واجهات فلل وقصور، أعمدة، كرانيش، قباب خارجية.\nGRP: قباب، نوافير، مجسمات خارجية، ديكورات خفيفة.\nGRG: أسقف داخلية، زخارف دقيقة، قاعات وفنادق.\nالفوم: كرانيش وزوايا سريعة، تحسين شكل الواجهات الاقتصادية.",
      },
      {
        q: "هل GRC هو الأفضل للواجهات؟",
        a: "نعم، لأنه يجمع بين القوة والجمال وخفة الوزن، ويسمح بتنفيذ أي تصميم معقد. العملاء اللي استخدموه لاحظوا سرعة التركيب وصيانة أقل مقارنة بالحجر الطبيعي.",
      },
    ],
  },
  {
    title: "الصيانة والعمر الافتراضي",
    questions: [
      {
        q: "هل يمكن معالجة GRC بالدهانات؟",
        a: "نعم، يمكن استخدام دهانات خاصة مقاومة للعوامل الجوية لتجميل السطح وحمايته لأطول فترة ممكنة، مع الحفاظ على المظهر العصري للمشروع.",
      },
      {
        q: "هل عمر GRC طويل؟",
        a: "بالتأكيد، العمر الافتراضي يمكن أن يصل إلى 30–50 سنة مع صيانة بسيطة مثل تنظيف الواجهة وإعادة الدهانات عند الحاجة. هذا هو السبب اللي يجعل العملاء يثقون فيه لمشاريعهم الفخمة.",
      },
    ],
  },
];

function FAQItem({ q, a, isOpen, onToggle }: {
  q: string; a: string; isOpen: boolean; onToggle: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease }}
      className="border-b border-white/[0.06] last:border-0"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 md:py-6 text-right group"
      >
        <span className={`text-base md:text-lg font-medium transition-colors duration-300 ${isOpen ? "text-primary" : "text-white"}`}>
          {q}
        </span>
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 mr-4 ${
          isOpen ? "bg-primary text-white rotate-180" : "bg-white/[0.04] text-white/40 group-hover:bg-primary/20 group-hover:text-primary"
        }`}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3.5 5.25L7 8.75L10.5 5.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease }}
          >
            <div className="text-white/70 text-[15px] leading-relaxed pb-5 md:pb-6 pl-12 space-y-2">
              {a.split("\n").map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (key: string) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

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
            className="text-caption text-primary font-medium tracking-widest uppercase"
          >
            الأسئلة الشائعة
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="text-display-sm md:text-display font-bold text-white mt-4"
          >
            كيف يمكننا مساعدتك؟
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease }}
            className="text-white/50 mt-4 max-w-lg mx-auto"
          >
            إجابات على أكثر الأسئلة شيوعاً حول خدماتنا ومنتجاتنا
          </motion.p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="bg-navy-dark">
        <div className="pad-y pad-x">
          <div className="max-w-[800px] mx-auto space-y-14">
            {faqCategories.map((category, catIdx) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: catIdx * 0.1, duration: 0.6, ease }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary text-sm font-bold font-body">{catIdx + 1}</span>
                  </div>
                  <h2 className="text-xl font-bold text-white">{category.title}</h2>
                </div>

                <div className="bg-section-gray border border-white/[0.04] rounded-[20px] px-6 md:px-8">
                  {category.questions.map((item, qIdx) => {
                    const key = `${catIdx}-${qIdx}`;
                    return (
                      <FAQItem
                        key={key}
                        q={item.q}
                        a={item.a}
                        isOpen={!!openItems[key]}
                        onToggle={() => toggleItem(key)}
                      />
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="max-w-[800px] mx-auto mt-16 text-center"
          >
            <div className="glass-card-dark p-8 md:p-12">
              <h3 className="text-xl font-bold text-white mb-3">لم تجد إجابة سؤالك؟</h3>
              <p className="text-white/70 mb-6">
                تواصل معنا مباشرة وسنكون سعداء بالإجابة على جميع استفساراتك
              </p>
              <a href="/contact" className="btn-primary">
                <span>تواصل معنا</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}
