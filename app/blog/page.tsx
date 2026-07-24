"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { articles, categoryColors } from "@/lib/articles";

const ease = [0.16, 1, 0.3, 1] as const;

export default function BlogPage() {
  const featured = articles[0];
  const rest = articles.slice(1);

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
            مقالات
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="text-display-sm md:text-display font-bold text-white mt-4"
          >
            رؤى معمارية
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease }}
            className="text-white/50 mt-4 max-w-lg mx-auto"
          >
            مقالات متخصصة في العمارة والواجهات والخامات
          </motion.p>
        </div>
      </section>

      {/* Featured Article */}
      <section className="bg-white">
        <div className="pad-y pad-x">
          <div className="container-wide">
            <motion.a
              href={`/blog/${featured.id}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease }}
              className="group grid md:grid-cols-2 gap-8 glass-card overflow-hidden cursor-pointer"
            >
              <div className="relative aspect-[4/3] md:aspect-auto overflow-hidden rounded-[20px]">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryColors[featured.category]}`}>
                    {featured.category}
                  </span>
                </div>
              </div>
              <div className="flex flex-col justify-center p-2 md:p-6">
                <div className="flex items-center gap-3 text-sm text-warm-gray mb-4">
                  <span>{featured.date}</span>
                  <span className="w-1 h-1 rounded-full bg-warm-gray/30" />
                  <span>{featured.readTime} قراءة</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-navy group-hover:text-primary transition-colors duration-300 mb-4">
                  {featured.title}
                </h2>
                <p className="text-warm-gray leading-relaxed mb-6">
                  {featured.excerpt}
                </p>
                <span className="text-primary font-medium text-sm flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
                  اقرأ المزيد
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="rotate-180">
                    <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </div>
            </motion.a>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="bg-section-gray">
        <div className="pad-y pad-x">
          <div className="container-wide">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((article, i) => (
                <motion.a
                  key={article.id}
                  href={`/blog/${article.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5, ease }}
                  className="group glass-card overflow-hidden cursor-pointer hover:-translate-y-1 hover:shadow-card-hover transition-all duration-500"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-3 right-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryColors[article.category]}`}>
                        {article.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 md:p-6">
                    <div className="flex items-center gap-3 text-xs text-warm-gray mb-3">
                      <span>{article.date}</span>
                      <span className="w-1 h-1 rounded-full bg-warm-gray/30" />
                      <span>{article.readTime} قراءة</span>
                    </div>
                    <h3 className="text-lg font-bold text-navy group-hover:text-primary transition-colors duration-300 mb-2 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-warm-gray text-sm leading-relaxed line-clamp-2">
                      {article.excerpt}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
