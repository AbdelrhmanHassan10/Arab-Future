"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { articles, categoryColors } from "@/lib/articles";
import type { ArticleSection } from "@/lib/articles";

const ease = [0.16, 1, 0.3, 1] as const;

function RenderSection({ section, index }: { section: ArticleSection; index: number }) {
  switch (section.type) {
    case "heading":
      return (
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease }}
          className="text-2xl md:text-3xl font-bold text-white mt-12 mb-6 flex items-center gap-4"
        >
          <div className="w-1.5 h-8 bg-primary rounded-full flex-shrink-0" />
          {section.text}
        </motion.h2>
      );

    case "paragraph":
      return (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: index * 0.05, ease }}
          className={`text-white/70 text-base md:text-lg leading-[2.2] mb-6 ${
            index === 0 ? "text-lg md:text-xl text-white/90 font-medium leading-[2.1]" : ""
          }`}
        >
          {section.text}
        </motion.p>
      );

    case "list":
      return (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease }}
          className="bg-white/5 border border-white/10 rounded-[2rem] p-6 md:p-10 mb-8 shadow-[0_0_30px_rgba(0,0,0,0.3)]"
        >
          <ul className="space-y-5">
            {section.items?.map((item, i) => (
              <li key={i} className="flex items-start gap-4 group">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5 border border-primary/30 group-hover:bg-primary transition-colors duration-300">
                  <svg className="w-4 h-4 text-primary group-hover:text-navy-deeper transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <span className="text-white/80 text-base md:text-lg leading-[1.8] pt-1">{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      );

    case "highlight":
      return (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease }}
          className="bg-gradient-to-r from-primary/10 to-transparent border-r-4 border-primary rounded-l-[2rem] p-8 md:p-10 mb-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-primary/10 rounded-full blur-[60px] pointer-events-none" />
          <svg className="absolute bottom-4 left-4 w-16 h-16 text-primary/10 -rotate-12 pointer-events-none" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          <div className="relative z-10">
            <p className="text-primary text-lg md:text-xl font-bold leading-[2] text-center md:text-right">
              &ldquo;{section.text}&rdquo;
            </p>
          </div>
        </motion.div>
      );

    default:
      return null;
  }
}

export default function ArticlePage() {
  const [isMounted, setIsMounted] = useState(false);
  const params = useParams();
  const id = Number(params.id);
  const article = articles.find((a) => a.id === id);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <div className="min-h-screen bg-navy-deeper" />;

  if (!article) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-navy-deeper">
          <div className="text-center glass-card-dark p-12 rounded-3xl">
            <h1 className="text-6xl font-black text-primary mb-4">404</h1>
            <p className="text-white/70 mb-8 text-lg">عذراً، المقال الذي تبحث عنه غير موجود.</p>
            <Link href="/blog" className="inline-flex px-8 py-3 bg-white/5 hover:bg-primary text-white hover:text-navy-deeper border border-white/10 hover:border-primary rounded-full transition-colors font-bold">
              العودة للمقالات
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const otherArticles = articles.filter((a) => a.id !== id).slice(0, 3);
  const colorClass = categoryColors[article.category] || "bg-gray-500/20 text-gray-400 border-gray-500/30";

  return (
    <>
      <main className="min-h-screen bg-navy-deeper selection:bg-primary/30 selection:text-white">
        <Navbar />

        {/* --- IMMERSIVE HERO --- */}
        <section className="relative h-[70vh] min-h-[500px] flex items-end pb-16 overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
            {/* Cinematic Gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-navy-deeper via-navy-deeper/80 to-navy-deeper/30" />
            <div className="absolute inset-0 bg-gradient-to-b from-navy-deeper/50 via-transparent to-transparent" />
            <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
          </div>

          <div className="container-wide px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center md:text-right">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease }}
                className="mb-8"
              >
                <Link href="/blog" className="inline-flex items-center gap-2 px-5 py-2 bg-white/5 backdrop-blur-md rounded-full text-white/70 text-sm hover:text-primary hover:bg-white/10 transition-all duration-300 border border-white/10">
                  <svg className="w-4 h-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                  </svg>
                  <span>العودة للمدونة</span>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease }}
              >
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-6">
                  <span className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-widest ${colorClass}`}>
                    {article.category}
                  </span>
                  <div className="flex items-center gap-2 text-white/50 text-sm font-medium">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {article.readTime}
                  </div>
                  <div className="flex items-center gap-2 text-white/50 text-sm font-medium">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                    </svg>
                    {article.date}
                  </div>
                </div>
                
                <h1 className="text-[clamp(2rem,4vw,3.5rem)] font-black text-white leading-[1.2] mb-6 shadow-black drop-shadow-2xl">
                  {article.title}
                </h1>
              </motion.div>
            </div>
          </div>
        </section>

        {/* --- ARTICLE CONTENT --- */}
        <section className="relative z-20 pb-20">
          <div className="container-wide px-6">
            <div className="max-w-3xl mx-auto">
              
              <div className="bg-navy-dark/40 backdrop-blur-3xl rounded-[3rem] p-8 md:p-12 lg:p-16 border border-white/5 shadow-2xl relative -mt-10">
                {article.sections.map((section, i) => (
                  <RenderSection key={i} section={section} index={i} />
                ))}
              </div>

              {/* Share & Tags */}
              <div className="mt-12 p-8 glass-card-dark rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 border border-white/5">
                <div className="flex items-center gap-3">
                  <span className="text-white/40 text-sm font-medium">القسم:</span>
                  <span className={`px-4 py-1.5 rounded-full text-xs font-bold ${colorClass}`}>
                    {article.category}
                  </span>
                </div>
                
                <div className="flex items-center gap-4">
                  <span className="text-white/40 text-sm font-medium">شارك المقال:</span>
                  <div className="flex gap-2">
                    <a
                      href={`https://wa.me/?text=${encodeURIComponent(article.title + " - " + "https://alfadl-realestate.com/blog/" + article.id)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-[#25D366]/10 flex items-center justify-center text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all duration-300 border border-[#25D366]/20 hover:border-transparent"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                    </a>
                    <a
                      href={`https://x.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent("https://alfadl-realestate.com/blog/" + article.id)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:bg-white hover:text-navy-deeper transition-all duration-300 border border-white/10"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* Real Estate CTA */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease }}
                className="mt-12 bg-gradient-to-br from-primary/20 via-navy-dark to-navy-deeper border border-primary/20 rounded-[3rem] p-10 md:p-14 text-center relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px]" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px]" />
                
                <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6 relative z-10 border border-primary/30">
                  <svg className="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.315 48.315 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
                  </svg>
                </div>
                
                <h3 className="text-3xl font-bold text-white mb-4 relative z-10">هل تبحث عن استثمار آمن؟</h3>
                <p className="text-white/70 mb-8 max-w-lg mx-auto text-lg relative z-10">
                  فريقنا من الخبراء العقاريين جاهز لمساعدتك في اتخاذ القرار الصحيح واختيار العقار الذي يحقق أعلى عائد مادي لك.
                </p>
                
                <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
                  <Link href="/contact" className="px-8 py-4 bg-primary text-navy-deeper font-bold rounded-full hover:bg-white hover:shadow-[0_0_30px_rgba(191,154,95,0.4)] transition-all duration-300">
                    تواصل مع خبير عقاري
                  </Link>
                  <a href="https://wa.me/966538086128" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-white/5 text-white border border-white/10 rounded-full hover:bg-[#25D366] hover:border-[#25D366] transition-all duration-300 font-bold flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    استشارة عبر واتسآب
                  </a>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* --- RELATED ARTICLES --- */}
        {otherArticles.length > 0 && (
          <section className="py-20 relative z-20 border-t border-white/5">
            <div className="container-wide px-6">
              <div className="flex items-center justify-between mb-12">
                <h2 className="text-3xl font-bold text-white flex items-center gap-4">
                  <div className="w-2 h-8 bg-primary rounded-full" />
                  مقالات ذات صلة
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {otherArticles.map((a, i) => (
                  <motion.div
                    key={a.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5, ease }}
                  >
                    <Link href={`/blog/${a.id}`} className="block group h-full">
                      <div className="glass-card-dark rounded-3xl overflow-hidden border border-white/5 group-hover:border-primary/30 transition-all duration-500 hover:shadow-[0_10px_30px_rgba(191,154,95,0.1)] hover:-translate-y-2 h-full flex flex-col">
                        
                        <div className="relative aspect-[16/10] overflow-hidden">
                          <Image
                            src={a.image}
                            alt={a.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute top-3 right-3">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-widest ${categoryColors[a.category] || "bg-gray-500/20 text-gray-400 border-gray-500/30"}`}>
                              {a.category}
                            </span>
                          </div>
                        </div>
                        
                        <div className="p-6 flex flex-col flex-1">
                          <div className="flex items-center gap-3 text-xs font-medium text-white/40 mb-3">
                            <span>{a.date}</span>
                            <span className="w-1 h-1 rounded-full bg-primary" />
                            <span>{a.readTime}</span>
                          </div>
                          <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors duration-300 line-clamp-2 leading-snug">
                            {a.title}
                          </h3>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        <Footer />
      </main>
    </>
  );
}
