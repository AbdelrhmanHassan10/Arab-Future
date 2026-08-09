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
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <>
      <main className="min-h-screen bg-navy-deeper selection:bg-primary/30 selection:text-white pb-20">
        <Navbar />

        {/* --- MAGAZINE HERO (FEATURED ARTICLE) --- */}
        <section ref={heroRef} className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
          {!isMounted ? null : (
            <>
              <motion.div style={{ y, opacity }} className="absolute inset-0 w-full h-full">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  className="object-cover scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deeper via-navy-deeper/80 to-navy-deeper/30" />
                <div className="absolute inset-0 bg-navy-deeper/40" />
              </motion.div>
            </>
          )}

          <div className="container-wide px-6 relative z-10">
            {!isMounted ? null : (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease }}
                className="max-w-4xl mx-auto text-center"
              >
                <div className="flex items-center justify-center gap-4 mb-8">
                  <span className={`px-5 py-2 rounded-full text-sm font-bold tracking-widest ${categoryColors[featured.category]} shadow-glow`}>
                    {featured.category}
                  </span>
                  <span className="text-white/80 text-sm font-medium flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {featured.readTime}
                  </span>
                </div>
                
                <Link href={`/blog/${featured.id}`}>
                  <h1 className="text-[clamp(2rem,6vw,4.5rem)] font-black text-white leading-[1.2] mb-8 hover:text-primary transition-colors duration-500 cursor-pointer drop-shadow-2xl">
                    {featured.title}
                  </h1>
                </Link>
                
                <p className="text-white/70 text-lg md:text-xl font-medium leading-relaxed mb-10 max-w-2xl mx-auto line-clamp-3 drop-shadow-md">
                  {featured.excerpt}
                </p>
                
                <Link href={`/blog/${featured.id}`} className="inline-flex items-center justify-center gap-3 px-10 py-4 bg-white/10 hover:bg-primary text-white hover:text-navy-deeper border border-white/20 hover:border-primary rounded-full font-bold transition-all duration-300 group">
                  <span>اقرأ المقال بالكامل</span>
                  <div className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-navy-deeper/20 flex items-center justify-center transition-colors">
                    <svg className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                    </svg>
                  </div>
                </Link>
              </motion.div>
            )}
          </div>
        </section>

        {!isMounted ? null : (
          <>
            {/* --- ARTICLES GRID --- */}
            <section className="py-20 relative z-20">
              <div className="container-wide px-6">
                
                <div className="flex items-center justify-between mb-12">
                  <h2 className="text-3xl font-bold text-white flex items-center gap-4">
                    <div className="w-2 h-8 bg-primary rounded-full" />
                    أحدث المقالات
                  </h2>
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
                        <div className="glass-card-dark rounded-3xl overflow-hidden border border-white/5 group-hover:border-primary/30 transition-all duration-500 hover:shadow-[0_10px_40px_rgba(191,154,95,0.15)] hover:-translate-y-2 h-full flex flex-col">
                          
                          {/* Image Box */}
                          <div className="relative aspect-[4/3] overflow-hidden">
                            <Image
                              src={article.image}
                              alt={article.title}
                              fill
                              className="object-cover transition-transform duration-[1.5s] ease-expo-out group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-navy-deeper via-transparent to-transparent opacity-60" />
                            
                            <div className="absolute top-4 right-4">
                              <span className={`px-3 py-1 rounded-full text-[11px] font-bold tracking-wider ${categoryColors[article.category]}`}>
                                {article.category}
                              </span>
                            </div>
                          </div>
                          
                          {/* Content Box */}
                          <div className="p-6 md:p-8 flex flex-col flex-1 relative">
                            {/* Decorative Line */}
                            <div className="absolute top-0 right-8 left-8 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                            
                            <div className="flex items-center gap-4 text-xs font-medium text-white/40 mb-4">
                              <span>{article.date}</span>
                              <span className="w-1 h-1 rounded-full bg-primary" />
                              <span className="flex items-center gap-1">
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {article.readTime}
                              </span>
                            </div>
                            
                            <h3 className="text-xl md:text-2xl font-bold text-white mb-4 leading-snug group-hover:text-primary transition-colors duration-300 line-clamp-2">
                              {article.title}
                            </h3>
                            
                            <p className="text-white/60 text-sm leading-relaxed line-clamp-3 mb-6 flex-1">
                              {article.excerpt}
                            </p>
                            
                            <div className="mt-auto flex items-center gap-2 text-primary text-sm font-bold group-hover:gap-4 transition-all duration-300">
                              <span>اقرأ المزيد</span>
                              <svg className="w-4 h-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                              </svg>
                            </div>
                          </div>
                          
                        </div>
                      </Link>
                    </motion.div>
                  ))}
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
