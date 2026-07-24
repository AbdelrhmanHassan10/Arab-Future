"use client";

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
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease }}
          className="text-xl md:text-2xl font-bold text-navy mt-10 mb-4 flex items-center gap-3"
        >
          <div className="w-1 h-7 bg-primary rounded-full flex-shrink-0" />
          {section.text}
        </motion.h2>
      );

    case "paragraph":
      return (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.05, ease }}
          className={`text-navy/80 text-[16px] md:text-[17px] leading-[2.1] mb-5 ${index === 0 ? "text-[18px] md:text-[19px] text-navy font-medium leading-[2]" : ""}`}
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
          className="bg-section-gray rounded-[16px] p-6 md:p-8 mb-6"
        >
          <ul className="space-y-4">
            {section.items?.map((item, i) => (
              <li key={i} className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <span className="text-navy text-[15px] md:text-[16px] leading-[1.8] pt-1">{item}</span>
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
          className="bg-navy-deeper rounded-[16px] p-6 md:p-8 mb-6 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-primary/[0.06] rounded-full blur-[60px]" />
          <div className="relative flex gap-4">
            <div className="w-1 bg-primary rounded-full flex-shrink-0" />
            <p className="text-white text-[15px] md:text-[16px] leading-[1.9]">
              {section.text}
            </p>
          </div>
        </motion.div>
      );

    default:
      return null;
  }
}

export default function ArticlePage() {
  const params = useParams();
  const id = Number(params.id);
  const article = articles.find((a) => a.id === id);

  if (!article) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-navy mb-4">404</h1>
            <p className="text-warm-gray mb-6">المقال غير موجود</p>
            <Link href="/blog" className="btn-primary">
              <span>العودة للمقالات</span>
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const otherArticles = articles.filter((a) => a.id !== id).slice(0, 3);
  const colorClass = categoryColors[article.category] || "bg-gray-50 text-gray-600";

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-navy-deeper/85" />
        </div>
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/[0.06] rounded-full blur-[150px]" />
        </div>

        <div className="relative z-10 pt-32 pb-16 pad-x">
          <div className="max-w-[850px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
            >
              <Link href="/blog" className="inline-flex items-center gap-2 text-white/50 text-sm hover:text-primary transition-colors duration-400 mb-8">
                <svg className="w-4 h-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                </svg>
                <span>جميع المقالات</span>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease }}
            >
              <div className="flex items-center gap-3 mb-5">
                <span className={`px-4 py-1.5 rounded-full text-xs font-medium ${colorClass}`}>
                  {article.category}
                </span>
                <span className="text-white/50 text-sm">{article.readTime} قراءة</span>
              </div>
              <h1 className="text-[clamp(1.8rem,4vw,3rem)] font-bold text-white mb-5 leading-tight">
                {article.title}
              </h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <img src="/images/logo.png" alt="عرب فيوتشر" className="w-6 h-6 object-contain" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">عرب فيوتشر المحدودة</p>
                    <p className="text-white/50 text-xs">{article.date}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white">
        <div className="pad-y pad-x">
          <div className="max-w-[750px] mx-auto">
            {article.sections.map((section, i) => (
              <RenderSection key={i} section={section} index={i} />
            ))}

            {/* Share + Tags */}
            <div className="mt-12 pt-8 border-t border-navy/[0.06]">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-navy/40 text-sm">التصنيف:</span>
                  <span className={`px-4 py-1.5 rounded-full text-xs font-medium ${colorClass}`}>
                    {article.category}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-navy/40 text-sm">شارك المقال:</span>
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(article.title + " - " + "https://arab.masaratedu.com/blog/" + article.id)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-[#25D366]/10 flex items-center justify-center text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all duration-300"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </a>
                  <a
                    href={`https://x.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent("https://arab.masaratedu.com/blog/" + article.id)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-navy/5 flex items-center justify-center text-navy/40 hover:bg-navy hover:text-white transition-all duration-300"
                  >
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease }}
              className="mt-10 glass-card p-8 md:p-10 text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                <svg className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-navy mb-3">محتاج استشارة فنية؟</h3>
              <p className="text-warm-gray mb-6">فريقنا جاهز يساعدك تختار المادة الأنسب لمشروعك</p>
              <div className="flex justify-center gap-3">
                <Link href="/contact" className="btn-primary">
                  <span>تواصل معنا</span>
                </Link>
                <a href="https://wa.me/966538086128" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium px-5 py-3.5 rounded-full border border-navy/15 text-navy/60 hover:text-[#25D366] hover:border-[#25D366]/30 transition-all duration-500">
                  <span>واتساب</span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {otherArticles.length > 0 && (
        <section className="bg-section-gray">
          <div className="pad-y pad-x">
            <div className="container-wide">
              <h3 className="text-xl font-bold text-navy mb-8 text-center">مقالات أخرى تهمك</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {otherArticles.map((a, i) => (
                  <motion.a
                    key={a.id}
                    href={`/blog/${a.id}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.5, ease }}
                    className="group glass-card overflow-hidden cursor-pointer hover:-translate-y-1 hover:shadow-card-hover transition-all duration-500"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={a.image}
                        alt={a.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-3 right-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryColors[a.category] || "bg-gray-50 text-gray-600"}`}>
                          {a.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-3 text-xs text-warm-gray mb-3">
                        <span>{a.date}</span>
                        <span className="w-1 h-1 rounded-full bg-warm-gray/30" />
                        <span>{a.readTime} قراءة</span>
                      </div>
                      <h3 className="text-base font-bold text-navy group-hover:text-primary transition-colors duration-300 line-clamp-2">
                        {a.title}
                      </h3>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </>
  );
}
