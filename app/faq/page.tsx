"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ease = [0.16, 1, 0.3, 1] as const;

const faqCategories = [
  {
    id: "buying",
    title: "شراء العقارات",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
    questions: [
      {
        q: "ما هي الخطوات لشراء عقار عن طريق سمسار مصر؟",
        a: "تبدأ العملية بحجز استشارة مجانية معنا لفهم احتياجاتك. بعدها نقوم بعرض أفضل الخيارات المتاحة، ثم نرتب زيارات ميدانية للمشاريع، وأخيراً نساعدك في إتمام إجراءات التعاقد والتسجيل بكل أمان وموثوقية.",
      },
      {
        q: "هل يتم تحصيل عمولة من المشتري؟",
        a: "لا، نحن في سمسار مصر لا نحصل على أي عمولات من المشتري في المشاريع الجديدة (Primary Market). يتم تحصيل عمولتنا مباشرة من المطور العقاري، مما يضمن لك الحصول على السعر الرسمي بدون أي زيادات.",
      },
      {
        q: "كيف أضمن مصداقية المطور العقاري؟",
        a: "نحن نتعاون فقط مع نخبة المطورين العقاريين في مصر الذين يمتلكون سابقة أعمال قوية وملاءة مالية موثوقة، لضمان استلام عقارك بأعلى جودة وفي الموعد المحدد المدون في العقود.",
      },
    ],
  },
  {
    id: "investment",
    title: "الاستثمار العقاري",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    questions: [
      {
        q: "أين توجد أفضل فرص الاستثمار العقاري حالياً؟",
        a: "تتمركز أفضل الفرص حالياً في العاصمة الإدارية الجديدة، التجمع الخامس (القاهرة الجديدة)، والساحل الشمالي، نظراً للنمو العمراني السريع والطلب العالي جداً على الإيجار وإعادة البيع في هذه المناطق.",
      },
      {
        q: "ما هو متوسط العائد على الاستثمار (ROI) المتوقع؟",
        a: "يختلف العائد باختلاف المنطقة ونوع العقار (سكني، تجاري، إداري)، ولكنه يتراوح عادة بين 10% إلى 15% سنوياً كعائد إيجاري، بالإضافة إلى الزيادة الطبيعية في القيمة الرأسمالية للعقار نفسه.",
      },
      {
        q: "هل العقار التجاري أفضل أم السكني للاستثمار؟",
        a: "العقار التجاري والإداري عادة ما يوفر عائداً إيجارياً أعلى ومستقراً لفترات طويلة مع شركات ومؤسسات كبرى، بينما العقار السكني يتميز بسهولة وسرعة تسييله (إعادة بيعه). المستشار العقاري لدينا سيساعدك في اختيار الأنسب لهدفك.",
      },
    ],
  },
  {
    id: "finance",
    title: "طرق الدفع والتمويل",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    questions: [
      {
        q: "ما هي أنظمة السداد المتاحة؟",
        a: "نوفر خطط سداد مرنة جداً تناسب ميزانيتك، حيث تبدأ المقدمات من 5% فقط، وتصل فترات التقسيط إلى 10 سنوات بدون فوائد (أقساط متساوية) بالتعاون مع معظم المطورين العقاريين.",
      },
      {
        q: "هل السعر يختلف في حالة الدفع الكاش (نقداً)؟",
        a: "نعم بالتأكيد، الدفع الكاش يوفر لك خصومات ضخمة تصل في بعض المشاريع إلى 30% وأحياناً 40% من إجمالي قيمة العقار، مما يجعله خياراً ممتازاً للمستثمرين.",
      },
      {
        q: "هل توفرون برامج التمويل العقاري؟",
        a: "نعم، نمتلك شراكات استراتيجية مع جهات وبنوك التمويل العقاري في مصر لتسهيل حصولك على التمويل المناسب لشراء عقار أحلامك الجاهز للاستلام، ونقوم بمساعدتك في كافة الإجراءات القانونية.",
      },
    ],
  },
];

function FAQItem({ q, a, isOpen, onToggle }: {
  q: string; a: string; isOpen: boolean; onToggle: () => void;
}) {
  return (
    <motion.div
      initial={false}
      animate={{ backgroundColor: isOpen ? "rgba(255, 255, 255, 0.03)" : "rgba(255, 255, 255, 0)" }}
      className={`border border-white/5 rounded-2xl overflow-hidden transition-colors duration-500 mb-4 shadow-lg ${isOpen ? 'border-primary/20' : ''}`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 text-right group bg-navy-dark hover:bg-white/5 transition-colors duration-300"
      >
        <span className={`text-base md:text-lg font-bold transition-colors duration-300 ${isOpen ? "text-primary" : "text-white group-hover:text-primary/80"}`}>
          {q}
        </span>
        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 mr-4 border ${
          isOpen ? "bg-primary text-navy-deeper border-primary rotate-180" : "bg-transparent text-white/40 border-white/10 group-hover:border-primary/30 group-hover:text-primary"
        }`}>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease }}
            className="bg-navy-dark/50"
          >
            <div className="text-white/70 text-[15px] leading-relaxed p-6 pt-0 pl-16">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState(faqCategories[0].id);
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const toggleItem = (key: string) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const activeCategoryData = faqCategories.find((c) => c.id === activeCategory);

  return (
    <>
      <main className="min-h-screen bg-navy-deeper selection:bg-primary/30 selection:text-white pb-20">
        <Navbar />

        {/* --- HERO SECTION --- */}
        <section ref={heroRef} className="relative h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden pt-20">
          {!isMounted ? null : (
            <>
              <motion.div style={{ y, opacity }} className="absolute inset-0 w-full h-full">
                <div className="absolute inset-0 bg-[url('/projects/project-8.png')] bg-cover bg-center scale-110 opacity-20 mix-blend-luminosity" />
                <div className="absolute inset-0 bg-gradient-to-b from-navy-deeper via-navy-deeper/80 to-navy-deeper" />
                <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none" />
                <div className="absolute bottom-0 left-1/3 w-[300px] h-[300px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
              </motion.div>
            </>
          )}

          <div className="container-wide px-6 relative z-10 text-center">
            {!isMounted ? null : (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease }}
              >
                <span className="inline-block py-1.5 px-4 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-6 shadow-[0_0_15px_rgba(191,154,95,0.2)]">
                  Semsar Masr FAQ
                </span>
                <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] font-black text-white leading-tight mb-4">
                  إجابات <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#DFBA7F] via-primary to-[#A07B40]">واضحة</span> لاستثمارك الناجح
                </h1>
                <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
                  جمعنا لك أهم الاستفسارات التي تتبادر إلى ذهنك حول شراء العقارات والاستثمار في مصر، لنوفر لك رؤية كاملة وشفافة.
                </p>
              </motion.div>
            )}
          </div>
        </section>

        {!isMounted ? null : (
          <>
            {/* --- SPLIT LAYOUT FAQ --- */}
            <section className="py-12 relative z-20">
              <div className="container-wide px-6">
                <div className="flex flex-col lg:flex-row gap-12 items-start">
                  
                  {/* Left Sidebar: Categories */}
                  <div className="w-full lg:w-1/3 lg:sticky lg:top-32 space-y-4">
                    <h3 className="text-white text-xl font-bold mb-6 pr-4 border-r-4 border-primary">أقسام الاستفسارات</h3>
                    <div className="flex flex-col gap-3">
                      {faqCategories.map((category) => {
                        const isActive = activeCategory === category.id;
                        return (
                          <button
                            key={category.id}
                            onClick={() => setActiveCategory(category.id)}
                            className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 border ${
                              isActive 
                                ? "bg-primary/10 border-primary/30 text-primary shadow-glow" 
                                : "bg-navy-dark border-white/5 text-white/60 hover:bg-white/5 hover:text-white"
                            }`}
                          >
                            <div className={`p-2 rounded-xl transition-colors ${isActive ? "bg-primary text-navy-deeper" : "bg-white/5 text-current"}`}>
                              {category.icon}
                            </div>
                            <span className="font-bold text-lg">{category.title}</span>
                            
                            {isActive && (
                              <motion.div 
                                layoutId="activeTabIndicator"
                                className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-l-full"
                              />
                            )}
                          </button>
                        )
                      })}
                    </div>
                    
                    {/* Trust Card */}
                    <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 flex gap-4 items-start">
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 text-primary">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" /></svg>
                      </div>
                      <div>
                        <h4 className="text-white font-bold mb-1">شفافية مطلقة</h4>
                        <p className="text-white/60 text-sm leading-relaxed">نحن نؤمن بأن الثقة تبدأ من الشفافية الكاملة في كافة التفاصيل والإجراءات.</p>
                      </div>
                    </div>
                  </div>

                  {/* Right Content: Accordions */}
                  <div className="w-full lg:w-2/3">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeCategory}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.4, ease }}
                      >
                        <div className="mb-8">
                          <h2 className="text-3xl font-bold text-white mb-2">{activeCategoryData?.title}</h2>
                          <p className="text-white/50">اعثر على جميع الإجابات المتعلقة بهذا القسم.</p>
                        </div>
                        
                        <div>
                          {activeCategoryData?.questions.map((item, qIdx) => {
                            const key = `${activeCategory}-${qIdx}`;
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
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </section>

            {/* --- PREMIUM CTA SECTION --- */}
            <section className="py-24 relative overflow-hidden">
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
               <div className="container-wide px-6 relative z-10 text-center">
                  <div 
                    className="max-w-4xl mx-auto glass-card-dark rounded-[3rem] p-12 md:p-20 border border-primary/20 relative overflow-hidden shadow-glow"
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-60 animate-pulse-slow" />
                    
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 relative z-10">
                      لم تجد إجابة لسؤالك؟
                    </h2>
                    <p className="text-white/60 mb-10 max-w-xl mx-auto leading-relaxed relative z-10">
                      مستشارونا العقاريون متواجدون دائماً للإجابة على جميع استفساراتك وتقديم النصيحة التي تناسب أهدافك.
                    </p>
                    
                    <Link href="/contact" className="relative z-10 inline-flex items-center justify-center gap-3 px-10 py-5 bg-primary text-navy-deeper font-bold rounded-full overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(191,154,95,0.4)] group">
                      <span className="relative z-10 text-[16px]">تواصل مع مستشار عقاري</span>
                      <div className="relative z-10 w-8 h-8 rounded-full bg-navy-deeper/10 flex items-center justify-center transition-colors group-hover:bg-navy-deeper/20">
                        <svg className="w-4 h-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                        </svg>
                      </div>
                    </Link>
                  </div>
               </div>
            </section>
          </>
        )}

        <Footer />
      </main>
    </>
  );
}
