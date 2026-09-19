"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { articles, categoryColors } from "@/lib/articles";

const ease = [0.16, 1, 0.3, 1] as const;

export default function BlogPage() {
  const [isMounted, setIsMounted] = useState(false);
  const featured = articles[0];
  const rest = articles.slice(1);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <>
      <main className="min-h-screen bg-gray-50 selection:bg-[#20d09f]/30 selection:text-[#082b26] pb-0 font-body overflow-hidden">
        <Navbar />

        {/* --- MAGAZINE HERO (FEATURED ARTICLE) --- */}
        <section ref={heroRef} className="relative min-h-[90vh] flex items-center pt-32 pb-20 overflow-hidden bg-[#082b26]">
          <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-[#20d09f]/10 rounded-full blur-[150px] pointer-events-none" />
          
          {!isMounted ? null : (
            <div className="container-wide px-6 relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
              
              {/* Text Content */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease }}
                className="w-full lg:w-1/2 text-center lg:text-right"
              >
                <div className="inline-flex items-center gap-4 mb-8">
                  <span className={`px-5 py-2 rounded-full text-xs font-bold tracking-widest uppercase ${categoryColors[featured.category]} shadow-[0_0_20px_rgba(32,208,159,0.3)]`}>
                    {featured.category}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[#20d09f]" />
                  <span className="text-gray-300 text-sm font-medium flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#20d09f]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {featured.readTime}
                  </span>
                </div>
                
                <Link href={`/blog/${featured.id}`}>
                  <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] font-black text-white leading-[1.2] mb-6 hover:text-[#20d09f] transition-colors duration-500 cursor-pointer drop-shadow-2xl">
                    {featured.title}
                  </h1>
                </Link>
                
                <p className="text-gray-400 text-lg md:text-xl font-light leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0">
                  {featured.excerpt}
                </p>
                
                <Link href={`/blog/${featured.id}`} className="inline-flex items-center justify-center gap-4 px-10 py-5 bg-[#20d09f] text-[#082b26] hover:bg-white rounded-full font-black text-lg transition-all duration-300 shadow-lg hover:shadow-[#20d09f]/50 hover:scale-105 group">
                  <span>اقرأ المقال بالكامل</span>
                  <svg className="w-6 h-6 rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </motion.div>

              {/* Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease }}
                className="w-full lg:w-1/2 relative"
              >
                <div className="aspect-[4/5] rounded-[3rem] overflow-hidden relative shadow-[0_30px_60px_rgba(0,0,0,0.5)] border-4 border-white/5 group">
                  <Image
                    src={featured.image}
                    alt={featured.title}
                    fill
                    className="object-cover transition-transform duration-[2s] group-hover:scale-110"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#082b26]/80 via-transparent to-transparent opacity-60" />
                </div>
                {/* Floating Date Badge */}
                <div className="absolute -bottom-6 -right-6 md:bottom-10 md:-right-10 bg-white p-6 rounded-[2rem] shadow-2xl z-20 flex flex-col items-center justify-center border border-gray-100">
                   <span className="text-4xl font-black text-[#148968]">24</span>
                   <span className="text-gray-500 font-bold tracking-widest uppercase text-xs">أكتوبر</span>
                </div>
              </motion.div>

            </div>
          )}

          {/* Scroll Indicator */}
          <motion.div 
            animate={{ y: [0, 10, 0] }} 
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
          >
            <span className="text-white/60 text-xs tracking-[0.3em] uppercase font-bold">تصفح</span>
            <div className="w-px h-12 bg-gradient-to-b from-[#20d09f] to-transparent"></div>
          </motion.div>
        </section>

        {!isMounted ? null : (
          <>
            {/* --- ARTICLES GRID --- */}
            <section className="py-32 relative z-20 bg-gray-50">
              <div className="container-wide px-6">
                
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                  <div>
                    <h2 className="text-4xl md:text-5xl font-black text-[#082b26] mb-4">
                      أحدث المقالات
                    </h2>
                    <p className="text-gray-500 text-lg">ابق على اطلاع بأحدث النصائح والأخبار في عالم العقارات</p>
                  </div>
                  
                  <div className="flex items-center gap-2 bg-white p-2 rounded-full border border-gray-200 shadow-sm">
                    {['الكل', 'نصائح استثمارية', 'تصميم داخلي'].map((filter, idx) => (
                       <button key={idx} className={`px-6 py-3 rounded-full text-sm font-bold transition-all ${idx === 0 ? 'bg-[#148968] text-white' : 'text-gray-500 hover:bg-gray-100'}`}>
                         {filter}
                       </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {rest.map((article, i) => (
                    <motion.div
                      key={article.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.6, ease }}
                    >
                      <Link href={`/blog/${article.id}`} className="block group h-full">
                        <div className="bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 group-hover:border-[#148968]/30 transition-all duration-500 hover:shadow-2xl hover:-translate-y-4 h-full flex flex-col">
                          
                          {/* Image Box */}
                          <div className="relative aspect-[4/3] overflow-hidden m-4 rounded-[2rem]">
                            <Image
                              src={article.image}
                              alt={article.title}
                              fill
                              className="object-cover transition-transform duration-[1.5s] ease-expo-out group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                            
                            <div className="absolute top-4 right-4">
                              <span className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase ${categoryColors[article.category]} shadow-md backdrop-blur-md`}>
                                {article.category}
                              </span>
                            </div>
                          </div>
                          
                          {/* Content Box */}
                          <div className="p-8 pt-4 flex flex-col flex-1 relative">
                            <div className="flex items-center justify-between mb-6">
                               <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
                                 <span>{article.date}</span>
                               </div>
                               <div className="flex items-center gap-2 text-[#148968] text-xs font-bold bg-[#148968]/5 px-3 py-1.5 rounded-full">
                                 <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                   <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                 </svg>
                                 {article.readTime}
                               </div>
                            </div>
                            
                            <h3 className="text-2xl font-black text-[#082b26] mb-4 leading-tight group-hover:text-[#148968] transition-colors duration-300 line-clamp-2">
                              {article.title}
                            </h3>
                            
                            <p className="text-gray-500 text-base leading-[1.8] line-clamp-3 mb-8 flex-1">
                              {article.excerpt}
                            </p>
                            
                            <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-6">
                              <span className="text-[#148968] font-bold text-sm group-hover:text-[#082b26] transition-colors">اقرأ المزيد</span>
                              <div className="w-10 h-10 rounded-full bg-gray-50 group-hover:bg-[#148968] flex items-center justify-center transition-colors duration-300">
                                <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                                </svg>
                              </div>
                            </div>
                          </div>
                          
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-20 text-center">
                   <button className="px-10 py-4 bg-white border border-gray-200 text-[#082b26] hover:bg-[#082b26] hover:text-white rounded-full font-bold transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1">
                      عرض المزيد من المقالات
                   </button>
                </div>
              </div>
            </section>
          </>
        )}

        {/* --- NEWSLETTER CTA --- */}
        <section className="py-24 relative bg-white border-t border-gray-100">
          <div className="container-wide px-6">
            <div className="bg-[#082b26] rounded-[3rem] p-12 md:p-20 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12 shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#20d09f]/20 rounded-full blur-[80px]" />
              
              <div className="md:w-1/2 relative z-10 text-center md:text-right">
                <h3 className="text-3xl md:text-5xl font-black text-white mb-4">النشرة العقارية</h3>
                <p className="text-gray-300 text-lg">اشترك ليصلك أحدث المقالات، تحليلات السوق، والنصائح الاستثمارية حصرياً.</p>
              </div>

              <div className="md:w-1/2 w-full relative z-10">
                 <div className="relative flex items-center bg-white/10 p-2 rounded-full border border-white/20 backdrop-blur-md">
                   <input type="email" placeholder="أدخل بريدك الإلكتروني" className="w-full bg-transparent text-white px-6 py-4 outline-none placeholder-white/50 font-medium" />
                   <button className="absolute left-2 top-2 bottom-2 px-8 bg-[#20d09f] hover:bg-white text-[#082b26] rounded-full font-black transition-colors shadow-md">
                     اشترك
                   </button>
                 </div>
                 <p className="text-white/40 text-xs mt-4 text-center md:text-right px-4">لن نقوم بإرسال رسائل مزعجة، يمكنك إلغاء الاشتراك في أي وقت.</p>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
