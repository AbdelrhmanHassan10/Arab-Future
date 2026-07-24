"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

const projects = [
  {
    title: "كمبوند السولو",
    category: "مجمعات",
    description: "مجمع سكني متكامل بتصميم عصري يوفر أعلى معايير الراحة والرفاهية مع واجهات مسبقة الصنع",
    images: ["/projects/project-18.png", "/projects/project-16.png", "/projects/project-17.png"],
    material: "GRC + GRP",
    style: "كلاسيكي",
  },
  {
    title: "كمبوند لانوفا فيستا",
    category: "مجمعات",
    description: "مجمع سكني فاخر بواجهات مسبقة الصنع وتفاصيل معمارية دقيقة تعكس مستوى الإتقان",
    images: ["/projects/project-19.png", "/projects/project-20.png", "/projects/project-21.png", "/projects/project-22.png"],
    material: "GRC",
    style: "كلاسيكي",
  },
  {
    title: "مشروع قصر فاخر",
    category: "قصور",
    description: "قصر فاخر بتفاصيل معمارية دقيقة وواجهات زخرفية مميزة تعكس عراقة التصميم الكلاسيكي",
    images: ["/projects/project-8.png", "/projects/project-9.png", "/projects/project-10.png"],
    material: "GRC + حجر صناعي",
    style: "كلاسيكي",
  },
  {
    title: "عمارة سكنية – واجهة كلاسيكية",
    category: "سكني",
    description: "تصميم وتنفيذ واجهات سكنية فاخرة بطابع كلاسيكي يجمع بين الأناقة والعراقة، مع استخدام أجود خامات الـ GRC",
    images: ["/projects/project-1.png", "/projects/project-2.png", "/projects/project-3.png"],
    material: "GRC",
    style: "كلاسيكي",
  },
  {
    title: "عمارة سكنية – تصميم فاخر",
    category: "سكني",
    description: "واجهة عمارة سكنية بتصميم فاخر يعكس الذوق الرفيع والاهتمام بأدق التفاصيل المعمارية",
    images: ["/projects/project-4.png", "/projects/project-5.png", "/projects/project-6.png", "/projects/project-7.png"],
    material: "GRC",
    style: "نيوكلاسيك",
  },
  {
    title: "واجهات كلاسيكية راقية",
    category: "كلاسيك",
    description: "واجهات بطابع كلاسيكي فاخر تجمع بين فخامة التصميم وجودة التنفيذ بأعمدة وتيجان وكرانيش",
    images: ["/projects/project-11.png", "/projects/project-12.png", "/projects/project-13.png"],
    material: "GRC",
    style: "كلاسيكي",
  },
  {
    title: "وحدات زخرفية",
    category: "زخرفي",
    description: "تفاصيل زخرفية فريدة تعكس الحرفية العالية في التنفيذ باستخدام قوالب GRC متخصصة",
    images: ["/projects/project-14.png", "/projects/project-15.png"],
    material: "GRC",
    style: "إسلامي",
  },
];

const categories = ["الكل", "سكني", "قصور", "كلاسيك", "زخرفي", "مجمعات"];

function Lightbox({
  project,
  onClose,
}: {
  project: (typeof projects)[0];
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(0);
  const total = project.images.length;

  const next = useCallback(() => setCurrent((p) => (p + 1) % total), [total]);
  const prev = useCallback(() => setCurrent((p) => (p - 1 + total) % total), [total]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") next();
      if (e.key === "ArrowRight") prev();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose, next, prev]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] flex items-center justify-center"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-navy-deeper/95 backdrop-blur-sm" />

      <div
        className="relative z-10 w-full max-w-5xl mx-4 md:mx-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-[16/10] rounded-[20px] overflow-hidden bg-navy-dark mt-14">
          <button
            onClick={onClose}
            className="absolute top-4 left-4 w-11 h-11 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/80 transition-all duration-300 z-20 border border-white/20"
          >
            <svg width="20" height="20" viewBox="0 0 18 18" fill="none">
              <path d="M4.5 4.5L13.5 13.5M4.5 13.5L13.5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease }}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${project.images[current]}')` }}
            />
          </AnimatePresence>

          {total > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white/80 hover:bg-black/50 hover:text-white transition-all duration-300"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M7 4L12 9L7 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                onClick={next}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white/80 hover:bg-black/50 hover:text-white transition-all duration-300"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M11 4L6 9L11 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </>
          )}

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/40 backdrop-blur-sm rounded-full px-4 py-1.5 text-white/80 text-xs font-body">
            {current + 1} / {total}
          </div>
        </div>

        <div className="mt-5 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="px-3 py-1 bg-primary/20 rounded-full text-[11px] text-primary font-medium">{project.material}</span>
            <span className="px-3 py-1 bg-white/10 rounded-full text-[11px] text-white/60 font-medium">{project.style}</span>
          </div>
          <h3 className="text-white font-bold text-xl mb-2">{project.title}</h3>
          <p className="text-white/50 text-sm">{project.description}</p>
        </div>

        {total > 1 && (
          <div className="flex justify-center gap-2 mt-5">
            {project.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                  i === current
                    ? "border-primary opacity-100 scale-105"
                    : "border-transparent opacity-40 hover:opacity-70"
                }`}
              >
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url('${img}')` }}
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("الكل");
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null);

  const filtered =
    activeCategory === "الكل"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <>
      <main className="min-h-screen bg-white">
        <Navbar />

        {/* Hero */}
        <section className="relative bg-navy-deeper overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[150px] pointer-events-none" />
          </div>

          <div className="relative pt-40 pb-20 pad-x">
            <div className="container-wide text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease }}
              >
                <span className="text-sm uppercase text-primary font-semibold tracking-widest">
                  أعمالنا
                </span>
                <h1 className="text-[clamp(2rem,4.5vw,3.8rem)] font-bold text-white mt-4">
                  مشاريع نفخر بها
                </h1>
                <p className="text-white/50 text-subhead mt-5 max-w-2xl mx-auto leading-[1.95]">
                  كل مشروع هو قصة نجاح — نقدم واجهات وديكورات مسبقة الصنع بأعلى معايير الجودة
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Filter + Grid */}
        <section className="relative bg-section-gray overflow-hidden">
          <div className="pad-y-lg relative">
            <div className="pad-x container-wide">
              {/* Filter tabs */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-wrap justify-center gap-2 mb-14"
              >
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-5 py-2.5 text-[13px] rounded-full transition-all duration-500 ${
                      activeCategory === cat
                        ? "bg-primary text-white shadow-glow"
                        : "glass-card text-navy/50 hover:text-navy/80"
                    }`}
                  >
                    {cat}
                    {cat !== "الكل" && (
                      <span className="mr-1.5 text-[11px] opacity-50">
                        ({projects.filter(p => p.category === cat).length})
                      </span>
                    )}
                  </button>
                ))}
              </motion.div>

              {/* Projects - alternating layout */}
              <motion.div layout className="space-y-8">
                <AnimatePresence mode="popLayout">
                  {filtered.map((project, i) => (
                    <motion.div
                      key={project.title}
                      layout
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.97 }}
                      transition={{ duration: 0.6, delay: i * 0.05, ease }}
                      className="group cursor-pointer"
                      onClick={() => setSelectedProject(project)}
                    >
                      <div className="glass-card overflow-hidden hover:shadow-card-hover hover:border-primary/15 transition-all duration-500">
                        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-0`}>
                          {/* Image */}
                          <div className={`relative aspect-[16/10] lg:aspect-auto lg:min-h-[350px] overflow-hidden ${
                            i % 2 !== 0 ? "lg:order-2" : ""
                          }`}>
                            <div
                              className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.2s] ease-expo-out group-hover:scale-105"
                              style={{ backgroundImage: `url('${project.images[0]}')` }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-navy-deeper/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            {/* Category badge */}
                            <div className="absolute top-5 right-5">
                              <span className="inline-block px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-[11px] text-navy font-medium shadow-soft">
                                {project.category}
                              </span>
                            </div>

                            {/* Image count */}
                            {project.images.length > 1 && (
                              <div className="absolute bottom-5 left-5 flex items-center gap-1.5 bg-black/40 backdrop-blur-sm rounded-full px-3 py-1.5">
                                <svg className="w-3.5 h-3.5 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5a2.25 2.25 0 002.25-2.25V5.25a2.25 2.25 0 00-2.25-2.25H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                                </svg>
                                <span className="text-white/70 text-[11px] font-body">{project.images.length} صور</span>
                              </div>
                            )}

                            {/* Hover overlay */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                              <div className="w-14 h-14 rounded-full bg-primary/80 flex items-center justify-center shadow-glow">
                                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
                                </svg>
                              </div>
                            </div>
                          </div>

                          {/* Info */}
                          <div className={`p-8 lg:p-12 flex flex-col justify-center ${
                            i % 2 !== 0 ? "lg:order-1" : ""
                          }`}>
                            <div className="flex items-center gap-3 mb-4">
                              <span className="px-3 py-1 bg-primary/8 rounded-full text-[11px] text-primary font-medium">
                                {project.material}
                              </span>
                              <span className="px-3 py-1 bg-navy/[0.04] rounded-full text-[11px] text-navy/50 font-medium">
                                {project.style}
                              </span>
                            </div>

                            <h3 className="text-navy font-bold text-xl lg:text-2xl mb-4 group-hover:text-primary transition-colors duration-400 leading-snug">
                              {project.title}
                            </h3>

                            <p className="text-warm-gray leading-[1.9] mb-6">
                              {project.description}
                            </p>

                            <div className="flex items-center gap-2 text-primary text-sm font-medium">
                              <span>عرض الصور</span>
                              <svg className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              {/* Gallery CTA */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="text-center mt-16"
              >
                <p className="text-warm-gray text-sm mb-5">
                  عايز تشوف صور حقيقية من مشاريعنا؟
                </p>
                <Link href="/gallery" className="btn-primary">
                  <span>معرض الأعمال</span>
                  <svg className="w-4 h-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                  </svg>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative bg-navy-deeper overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[120px] pointer-events-none" />
          </div>

          <div className="pad-y relative">
            <div className="pad-x container-wide text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease }}
              >
                <h2 className="text-display font-bold text-white mb-4">
                  عندك مشروع جديد؟
                </h2>
                <p className="text-white/50 text-subhead mb-8 max-w-lg mx-auto">
                  خلينا نحول فكرتك لواجهة معمارية مميزة
                </p>
                <a href="/contact" className="btn-primary">
                  <span>تواصل معنا</span>
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        <Footer />
      </main>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedProject && (
          <Lightbox
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
