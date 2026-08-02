"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { servicesData } from "@/lib/services";

const ease = [0.16, 1, 0.3, 1] as const;

export default function ServicePage() {
  const params = useParams();
  const slug = params.slug as string;
  const service = servicesData.find((s) => s.slug === slug);

  if (!service) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-navy-dark">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">404</h1>
            <p className="text-white/60 mb-6">الخدمة غير موجودة</p>
            <Link href="/services" className="btn-primary"><span>جميع الخدمات</span></Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const otherServices = servicesData.filter((s) => s.slug !== slug);

  return (
    <>
      <Navbar />

      {/* Hero — Full width with background */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-navy-deeper" />
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-primary/[0.08] rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-primary/[0.04] rounded-full blur-[100px]" />
        </div>

        {/* Geometric decoration */}
        <div className="absolute inset-0 pointer-events-none hidden md:block">
          <div className="absolute top-[20%] left-[8%] w-20 h-20 border border-white/[0.04] rotate-45" />
          <div className="absolute bottom-[25%] right-[10%] w-32 h-32 border border-primary/[0.06] rotate-12 rounded-2xl" />
        </div>

        <div className="relative z-10 w-full pt-32 pb-20 pad-x">
          <div className="container-wide">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Text */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease }}
              >
                <Link href="/services" className="inline-flex items-center gap-2 text-white/40 text-sm hover:text-primary transition-colors duration-400 mb-8">
                  <svg className="w-4 h-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                  </svg>
                  <span>جميع الخدمات</span>
                </Link>

                <span className="text-white/60 text-sm font-body tracking-widest uppercase block mb-4">{service.titleEn}</span>
                <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-bold text-white mb-6 leading-tight">
                  {service.title}
                </h1>
                <p className="text-white/60 text-lg leading-relaxed max-w-lg mb-8">
                  {service.heroDesc}
                </p>

                <div className="flex flex-wrap gap-4">
                  <a href="/contact" className="btn-primary">
                    <span>اطلب الخدمة</span>
                    <svg className="w-4 h-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                    </svg>
                  </a>
                  <a href="https://wa.me/966538086128" target="_blank" rel="noopener noreferrer" className="btn-ghost">
                    <span>واتساب</span>
                  </a>
                </div>
              </motion.div>

              {/* Icon card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease }}
                className="hidden lg:flex justify-center"
              >
                <div className="relative">
                  <div className="w-64 h-64 rounded-[32px] bg-white/[0.04] border border-white/[0.08] flex items-center justify-center backdrop-blur-sm">
                    <div className="w-40 h-40 rounded-[24px] bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                      <svg className="w-20 h-20 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d={service.iconPath} />
                      </svg>
                    </div>
                  </div>
                  {/* Floating badge */}
                  <div className="absolute -bottom-4 -right-4 bg-primary rounded-2xl px-5 py-3 shadow-glow">
                    <span className="text-white text-sm font-bold">عرب فيوتشر</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-navy-dark border-b border-white/[0.06]">
        <div className="pad-x container-wide">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-10">
            {[
              { number: "350+", label: "مشروع منجز" },
              { number: "12+", label: "سنة خبرة" },
              { number: "100%", label: "التزام بالجودة" },
              { number: "50+", label: "عميل راضي" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5, ease }}
                className="text-center"
              >
                <div className="text-2xl md:text-3xl font-bold text-primary font-body">{stat.number}</div>
                <div className="text-white/60 text-sm mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-navy-dark">
        <div className="pad-y-lg pad-x">
          <div className="container-wide">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Content — 8 cols */}
              <div className="lg:col-span-8">
                {service.sections.map((section, i) => {
                  switch (section.type) {
                    case "heading":
                      return (
                        <motion.h2
                          key={i}
                          initial={{ opacity: 0, y: 15 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, ease }}
                          className="text-xl md:text-2xl font-bold text-white mt-12 mb-5 flex items-center gap-3"
                        >
                          <div className="w-1.5 h-8 bg-primary rounded-full flex-shrink-0" />
                          {section.text}
                        </motion.h2>
                      );

                    case "paragraph":
                      return (
                        <motion.p
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, ease }}
                          className={`text-white/70 text-[16px] md:text-[17px] leading-[2.1] mb-6 ${i === 0 ? "text-[18px] md:text-[19px] text-white font-medium leading-[2] border-r-4 border-primary pr-6 py-2" : ""}`}
                        >
                          {section.text}
                        </motion.p>
                      );

                    case "list":
                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, ease }}
                          className="glass-card-dark rounded-[20px] p-6 md:p-8 mb-6 border border-white/[0.04]"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {section.items?.map((item, j) => (
                              <div key={j} className="flex items-start gap-3 bg-white/[0.04] border border-white/[0.04] rounded-xl p-4 hover:bg-white/[0.08] hover:border-primary/30 transition-all duration-300">
                                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                                  <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                  </svg>
                                </div>
                                <span className="text-white/80 text-[15px] leading-[1.7] pt-1">{item}</span>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      );

                    case "highlight":
                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, ease }}
                          className="bg-navy-deeper rounded-[20px] p-8 md:p-10 mb-8 relative overflow-hidden border border-primary/20"
                        >
                          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/[0.06] rounded-full blur-[80px]" />
                          <div className="relative flex gap-5">
                            <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                              <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                              </svg>
                            </div>
                            <p className="text-white text-[16px] md:text-[17px] leading-[1.9]">{section.text}</p>
                          </div>
                        </motion.div>
                      );

                    default:
                      return null;
                  }
                })}
              </div>

              {/* Sidebar — 4 cols */}
              <div className="lg:col-span-4">
                <div className="sticky top-28 space-y-6">
                  {/* Quick contact card */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease }}
                    className="glass-card-dark p-7"
                  >
                    <h4 className="font-bold text-white text-base mb-4">تواصل معنا</h4>
                    <div className="space-y-4 mb-6">
                      <a href="tel:+966538086128" dir="ltr" className="flex items-center gap-3 text-white/60 hover:text-primary transition-colors duration-300">
                        <div className="w-9 h-9 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                          </svg>
                        </div>
                        <span className="text-sm">+966 53 808 6128</span>
                      </a>
                      <a href="mailto:info@arabfuture.com" className="flex items-center gap-3 text-white/60 hover:text-primary transition-colors duration-300">
                        <div className="w-9 h-9 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                          </svg>
                        </div>
                        <span className="text-sm">info@arabfuture.com</span>
                      </a>
                    </div>
                    <a href="https://wa.me/966538086128" target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 rounded-xl hover:bg-[#1da851] transition-colors duration-300 text-sm font-medium">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      تواصل عبر واتساب
                    </a>
                  </motion.div>

                  {/* Other services */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1, ease }}
                    className="glass-card-dark p-7"
                  >
                    <h4 className="font-bold text-white text-base mb-5">خدمات أخرى</h4>
                    <div className="space-y-2">
                      {otherServices.map((s) => (
                        <a
                          key={s.slug}
                          href={`/services/${s.slug}`}
                          className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/[0.04] transition-all duration-300 group"
                        >
                          <div className="w-9 h-9 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:shadow-glow transition-all duration-300">
                            <svg className="w-4 h-4 text-primary group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d={s.iconPath} />
                            </svg>
                          </div>
                          <div>
                            <span className="text-white/80 text-sm font-medium group-hover:text-primary transition-colors duration-300 block">{s.title}</span>
                            <span className="text-white/40 text-[10px] font-body tracking-wider uppercase">{s.titleEn}</span>
                          </div>
                        </a>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="bg-navy-dark">
        <div className="pad-y pad-x">
          <div className="container-wide text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="text-2xl uppercase text-primary font-semibold tracking-widest">منهجية العمل</span>
              <h2 className="text-display-sm font-bold text-white mt-4 mb-12">كيف ننفذ {service.title}؟</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { step: "01", title: "الاستشارة", desc: "نستمع لمتطلباتك ونفهم رؤيتك" },
                { step: "02", title: "التخطيط", desc: "نضع خطة تفصيلية وجدول زمني" },
                { step: "03", title: "التنفيذ", desc: "ننفذ بأعلى معايير الجودة" },
                { step: "04", title: "التسليم", desc: "نسلم المشروع مع ضمان الجودة" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5, ease }}
                  className="relative"
                >
                  {i < 3 && <div className="hidden md:block absolute top-10 -left-3 w-6 h-px bg-white/10" />}
                  <div className="glass-card-dark p-6 hover:-translate-y-1 hover:shadow-card-hover hover:border-primary/30 transition-all duration-500 group">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:shadow-glow transition-all duration-500">
                      <span className="text-primary font-bold text-lg font-body group-hover:text-white transition-colors duration-500">{item.step}</span>
                    </div>
                    <h4 className="text-white font-semibold mb-2 group-hover:text-primary transition-colors duration-400">{item.title}</h4>
                    <p className="text-white/60 text-sm">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
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
              <h2 className="text-display-sm font-bold text-white mb-4">جاهز تبدأ مشروعك؟</h2>
              <p className="text-white/50 text-subhead mb-8 max-w-lg mx-auto">
                تواصل معنا اليوم واحصل على استشارة مجانية لخدمة {service.title}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="/contact" className="btn-primary">
                  <span>تواصل معنا</span>
                  <svg className="w-4 h-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                  </svg>
                </a>
                <a href="/projects" className="btn-ghost"><span>شاهد مشاريعنا</span></a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
