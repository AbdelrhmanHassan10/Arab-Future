"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const projects = [
  {
    title: "كمبوند السولو",
    category: "مجمعات",
    description: "مجمع سكني متكامل بتصميم عصري يوفر أعلى معايير الراحة والرفاهية",
    images: ["/projects/project-18.png", "/projects/project-16.png", "/projects/project-17.png"],
  },
  {
    title: "كمبوند لانوفا فيستا",
    category: "مجمعات",
    description: "مجمع سكني فاخر بواجهات مسبقة الصنع وتفاصيل معمارية دقيقة",
    images: ["/projects/project-19.png", "/projects/project-20.png", "/projects/project-21.png", "/projects/project-22.png"],
  },
  {
    title: "مشروع قصر فاخر",
    category: "قصور",
    description: "قصر فاخر بتفاصيل معمارية دقيقة وواجهات زخرفية مميزة تعكس عراقة التصميم",
    images: ["/projects/project-8.png", "/projects/project-9.png", "/projects/project-10.png"],
  },
  {
    title: "عمارة سكنية – واجهة كلاسيكية",
    category: "سكني",
    description: "تصميم وتنفيذ واجهات سكنية فاخرة بطابع كلاسيكي يجمع بين الأناقة والعراقة",
    images: ["/projects/project-1.png", "/projects/project-2.png", "/projects/project-3.png"],
  },
  {
    title: "عمارة سكنية – تصميم فاخر",
    category: "سكني",
    description: "واجهة عمارة سكنية بتصميم فاخر يعكس الذوق الرفيع والاهتمام بأدق التفاصيل",
    images: ["/projects/project-4.png", "/projects/project-5.png", "/projects/project-6.png", "/projects/project-7.png"],
  },
  {
    title: "واجهات كلاسيكية راقية",
    category: "كلاسيك",
    description: "واجهات بطابع كلاسيكي فاخر تجمع بين فخامة التصميم وجودة التنفيذ",
    images: ["/projects/project-11.png", "/projects/project-12.png", "/projects/project-13.png"],
  },
  {
    title: "وحدات زخرفية",
    category: "زخرفي",
    description: "تفاصيل زخرفية فريدة تعكس الحرفية العالية في التنفيذ",
    images: ["/projects/project-14.png", "/projects/project-15.png"],
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
      {/* Backdrop */}
      <div className="absolute inset-0 bg-navy-deeper/95 backdrop-blur-sm" />

      {/* Content */}
      <div
        className="relative z-10 w-full max-w-5xl mx-4 md:mx-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        <div className="relative aspect-[16/10] rounded-[20px] overflow-hidden bg-navy-dark mt-14">
          {/* Close button */}
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

          {/* Navigation arrows */}
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

          {/* Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/40 backdrop-blur-sm rounded-full px-4 py-1.5 text-white/80 text-xs font-body">
            {current + 1} / {total}
          </div>
        </div>

        {/* Project info */}
        <div className="mt-5 text-center">
          <h3 className="text-white font-bold text-xl mb-2">{project.title}</h3>
          <p className="text-white/50 text-sm">{project.description}</p>
        </div>

        {/* Thumbnails */}
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

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("الكل");
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null);

  const filtered =
    activeCategory === "الكل"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <>
      <section id="projects" className="relative bg-navy-deeper overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="pad-y-lg relative">
          <div className="pad-x container-wide">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-center mb-14"
            >
              <span className="text-2xl uppercase text-primary font-semibold tracking-widest">
                أعمالنا
              </span>
              <h2 className="text-display font-bold text-white mt-4">
                مشاريع تتحدث عن نفسها
              </h2>
              <p className="text-white/50 text-subhead mt-4 max-w-xl mx-auto">
                نفخر بكل مشروع نفذناه، فكل واجهة هي قصة نجاح مستقلة
              </p>
            </motion.div>

            {/* Filter tabs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-wrap justify-center gap-2 mb-14"
            >
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 text-[13px] rounded-full transition-all duration-500 font-arabic ${
                    activeCategory === cat
                      ? "bg-primary text-navy-deeper font-bold shadow-glow"
                      : "bg-white/[0.06] text-white/50 border border-white/[0.08] hover:bg-white/[0.1] hover:text-white/80"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </motion.div>

            {/* Projects Grid */}
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filtered.map((project, i) => (
                  <motion.div
                    key={project.title}
                    layout
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.6, delay: i * 0.05, ease }}
                    className="group cursor-pointer"
                    onClick={() => setSelectedProject(project)}
                  >
                    <div className="glass-card-dark rounded-[20px] overflow-hidden hover:-translate-y-2 hover:shadow-glass-dark hover:border-primary/20 transition-all duration-500">
                      {/* Image */}
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <div
                          className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.2s] ease-expo-out group-hover:scale-110"
                          style={{ backgroundImage: `url('${project.images[0]}')` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy-deeper/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Category badge */}
                        <div className="absolute top-4 right-4">
                          <span className="inline-block px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-[11px] text-white/90 font-medium border border-white/10">
                            {project.category}
                          </span>
                        </div>

                        {/* Image count badge */}
                        {project.images.length > 1 && (
                          <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-black/40 backdrop-blur-sm rounded-full px-3 py-1.5">
                            <svg className="w-3.5 h-3.5 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5a2.25 2.25 0 002.25-2.25V5.25a2.25 2.25 0 00-2.25-2.25H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                            </svg>
                            <span className="text-white/70 text-[11px] font-body">{project.images.length}</span>
                          </div>
                        )}

                        {/* Hover overlay */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <div className="w-12 h-12 rounded-full bg-primary/80 flex items-center justify-center shadow-glow">
                            <svg className="w-5 h-5 text-navy-deeper" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* Info */}
                      <div className="p-6">
                        <h3 className="text-white font-semibold text-[15px] mb-2 group-hover:text-primary transition-colors duration-400 leading-snug">
                          {project.title}
                        </h3>
                        <p className="text-white/40 text-sm leading-relaxed">
                          {project.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

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
