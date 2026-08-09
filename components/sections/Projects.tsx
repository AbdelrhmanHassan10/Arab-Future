"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const projects = [
  {
    title: "فيلا فاخرة - التجمع الخامس",
    category: "فيلات",
    description: "فيلا مستقلة بتصميم عصري مع حمام سباحة خاص وحديقة واسعة.",
    images: ["/projects/project-18.png", "/projects/project-16.png", "/projects/project-17.png"],
  },
  {
    title: "شقة سكنية - مدينتي",
    category: "شقق",
    description: "شقة تشطيب سوبر لوكس بإطلالة رائعة على مساحات خضراء.",
    images: ["/projects/project-19.png", "/projects/project-20.png", "/projects/project-21.png", "/projects/project-22.png"],
  },
  {
    title: "مقر إداري - العاصمة الإدارية",
    category: "تجاري",
    description: "مقر إداري مجهز بالكامل في قلب حي الأعمال بالعاصمة الإدارية.",
    images: ["/projects/project-8.png", "/projects/project-9.png", "/projects/project-10.png"],
  },
  {
    title: "كمبوند تاج سيتي",
    category: "مجمعات سكنية",
    description: "وحدات سكنية متنوعة في مجمع متكامل الخدمات والمرافق.",
    images: ["/projects/project-4.png", "/projects/project-5.png", "/projects/project-6.png", "/projects/project-7.png"],
  },
  {
    title: "تاون هاوس - زايد",
    category: "فيلات",
    description: "تاون هاوس بتصميم كلاسيكي راقي في أفضل أحياء الشيخ زايد.",
    images: ["/projects/project-11.png", "/projects/project-12.png", "/projects/project-13.png"],
  },
  {
    title: "محل تجاري - مول العرب",
    category: "تجاري",
    description: "مساحة تجارية ممتازة تصلح للبراندات العالمية بمرور عالي.",
    images: ["/projects/project-14.png", "/projects/project-15.png"],
  },
];

const categories = ["الكل", "فيلات", "شقق", "تجاري", "مجمعات سكنية"];

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
      <div className="absolute inset-0 bg-navy-deeper/95 backdrop-blur-xl" />

      <div
        className="relative z-10 w-full max-w-6xl mx-4 md:mx-8 h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 md:top-0 md:-right-16 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white transition-all duration-300 z-50 border border-white/20"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Image Display */}
        <div className="relative flex-1 rounded-3xl overflow-hidden bg-black mt-8 md:mt-0 border border-white/10 shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease }}
              className="absolute inset-0 bg-contain bg-no-repeat bg-center"
              style={{ backgroundImage: `url('${project.images[current]}')` }}
            />
          </AnimatePresence>

          {/* Navigation arrows */}
          {total > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-primary hover:text-navy-deeper transition-all duration-300 border border-white/20"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <button
                onClick={next}
                className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-primary hover:text-navy-deeper transition-all duration-300 border border-white/20"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            </>
          )}

          {/* Counter Badge */}
          <div className="absolute top-6 left-6 bg-black/60 backdrop-blur-md rounded-full px-4 py-1.5 text-white/90 text-sm font-body border border-white/10 shadow-lg">
            {current + 1} / {total}
          </div>
        </div>

        {/* Project info & Thumbnails */}
        <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-6 bg-white/5 p-6 rounded-3xl border border-white/10 backdrop-blur-sm">
          <div className="text-center md:text-right flex-1">
            <h3 className="text-white font-bold text-2xl mb-1">{project.title}</h3>
            <p className="text-white/60 text-sm">{project.description}</p>
          </div>

          {total > 1 && (
            <div className="flex justify-center gap-3">
              {project.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`relative w-20 h-14 rounded-xl overflow-hidden transition-all duration-300 ${i === current ? "ring-2 ring-primary scale-110 shadow-[0_0_15px_rgba(191,154,95,0.4)]" : "opacity-50 hover:opacity-100"
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
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("الكل");
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null);

  const filtered =
    activeCategory === "الكل"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <>
      <section id="projects" className="relative bg-navy-deeper overflow-hidden py-24">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-primary/[0.04] rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-[120px] pointer-events-none" />

        <div className="container-wide px-6 relative z-10">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease }}
              className="max-w-xl"
            >
              <div className="inline-flex items-center gap-4 px-8 py-3.5 rounded-full bg-white/5 border border-white/10 shadow-[0_0_20px_rgba(191,154,95,0.1)] backdrop-blur-md mb-8 hover:bg-white/10 hover:border-primary/30 transition-all duration-300">
                <span className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                <span className="text-base md:text-lg text-primary font-bold tracking-widest font-body uppercase">
                  عقاراتنا
                </span>
                <span className="w-3 h-3 rounded-full bg-primary animate-pulse" />
              </div>
              <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-bold text-white leading-tight">
                عقارات ترتقي لمستوى <span className="text-primary italic">تطلعاتك</span>
              </h2>
            </motion.div>

            {/* Filter Tabs */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease, delay: 0.2 }}
              className="flex flex-wrap gap-2 bg-white/5 p-1.5 rounded-full border border-white/10"
            >
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 text-sm rounded-full transition-all duration-500 font-medium ${activeCategory === cat
                      ? "bg-primary text-navy-deeper shadow-glow"
                      : "text-white/60 hover:text-white hover:bg-white/10"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </motion.div>
          </div>

          {/* Editorial Masonry Grid */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-[250px] md:auto-rows-[300px] grid-flow-row-dense">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => {
                // Determine span for perfect Bento grid packing
                const pos = i % 6;
                let spanClasses = "";
                switch (pos) {
                  case 0:
                    spanClasses = "col-span-1 md:col-span-2 lg:col-span-2 row-span-1 md:row-span-2 lg:row-span-2";
                    break;
                  case 1:
                    spanClasses = "col-span-1 md:col-span-1 lg:col-span-2 row-span-1 md:row-span-1 lg:row-span-1";
                    break;
                  case 2:
                    spanClasses = "col-span-1 md:col-span-1 lg:col-span-1 row-span-1 md:row-span-1 lg:row-span-1";
                    break;
                  case 3:
                    spanClasses = "col-span-1 md:col-span-2 lg:col-span-1 row-span-1 md:row-span-1 lg:row-span-1";
                    break;
                  case 4:
                    spanClasses = "col-span-1 md:col-span-2 lg:col-span-2 row-span-1 md:row-span-2 lg:row-span-2";
                    break;
                  case 5:
                    spanClasses = "col-span-1 md:col-span-2 lg:col-span-2 row-span-1 md:row-span-1 lg:row-span-2";
                    break;
                  default:
                    spanClasses = "col-span-1 md:col-span-1 lg:col-span-1 row-span-1 md:row-span-1 lg:row-span-1";
                }

                return (
                  <motion.div
                    key={project.title}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.6, delay: i * 0.05, ease }}
                    className={`group cursor-pointer rounded-3xl overflow-hidden relative ${spanClasses}`}
                    onClick={() => setSelectedProject(project)}
                  >
                    <div className="absolute inset-0 w-full h-full bg-navy-deeper/50">
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                        style={{ backgroundImage: `url('${project.images[0]}')` }}
                      />
                      {/* Premium Dark Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-deeper via-navy-deeper/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />

                      {/* Hover Overlay with Icon */}
                      <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px]">
                        <div className="w-16 h-16 rounded-full bg-navy-deeper/80 text-primary flex items-center justify-center scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 delay-100 shadow-glow">
                          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                          </svg>
                        </div>
                      </div>

                      {/* Content Positioned at Bottom */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <div className="flex items-center justify-between gap-4 mb-2">
                          <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-primary transition-colors duration-300">
                            {project.title}
                          </h3>
                          <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs text-white/90 border border-white/20 whitespace-nowrap">
                            {project.category}
                          </span>
                        </div>
                        <p className="text-white/60 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 line-clamp-2">
                          {project.description}
                        </p>
                      </div>

                      {/* Top Badges (Images count) */}
                      {project.images.length > 1 && (
                        <div className="absolute top-6 left-6 flex items-center gap-1.5 bg-black/50 backdrop-blur-md border border-white/10 rounded-full px-3 py-1.5">
                          <svg className="w-3.5 h-3.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5a2.25 2.25 0 002.25-2.25V5.25a2.25 2.25 0 00-2.25-2.25H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                          </svg>
                          <span className="text-white/90 text-[11px] font-body font-medium">{project.images.length}</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox Modal */}
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
