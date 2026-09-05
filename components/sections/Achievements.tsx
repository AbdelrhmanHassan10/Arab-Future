"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

function useCounter(end: number, duration: number = 2000, inView: boolean) {
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    const startTime = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress >= 1) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, end, duration]);

  return count;
}

function StatCard({ value, label, suffix, delay, icon }: {
  value: number; label: string; suffix: string; delay: number; icon: React.ReactNode;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const count = useCounter(value, 2000, inView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.7, ease }}
      className="glass-card-dark p-6 rounded-[2rem] border border-white/5 relative overflow-hidden group hover:border-primary/30 hover:bg-white/[0.06] transition-all duration-500 shadow-lg hover:shadow-2xl hover:-translate-y-1"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[40px] group-hover:bg-primary/20 transition-all duration-500 pointer-events-none" />
      
      <div className="relative z-10 flex flex-col items-start text-right">
        <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors duration-500">
          {icon}
        </div>
        
        <div className="flex items-baseline gap-1 mb-2 dir-ltr">
          <span className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-white/70 font-body tabular-nums tracking-tight">
            {count}
          </span>
          <span className="text-primary font-bold text-xl md:text-2xl">{suffix}</span>
        </div>
        
        <span className="text-white/60 text-sm font-medium tracking-wide">{label}</span>
      </div>
    </motion.div>
  );
}

function BarStat({ label, value, maxValue, delay }: {
  label: string; value: number; maxValue: number; delay: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const count = useCounter(value, 1800, inView);
  const percentage = (value / maxValue) * 100;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6, ease }}
      className="group relative p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] transition-colors duration-300"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-white text-sm font-medium">{label}</span>
        <span className="text-primary font-bold font-body text-sm tabular-nums">{count}%</span>
      </div>
      <div className="h-1.5 bg-black/50 rounded-full overflow-hidden shadow-inner">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-primary to-[#DFBA7F] shadow-[0_0_10px_rgba(191,154,95,0.5)]"
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, ease, delay: delay + 0.2 }}
        />
      </div>
    </motion.div>
  );
}

export default function Achievements() {
  return (
    <section className="relative bg-[#111111] py-24 border-t border-white/5 overflow-hidden">
      {/* 3D Decorative Grid Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '50px 50px', transform: 'perspective(1000px) rotateX(60deg) scale(2.5)', transformOrigin: 'top center' }} />

      <div className="container-wide px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="text-center mb-20 max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-4 px-8 py-3.5 rounded-full bg-white/5 border border-white/10 shadow-[0_0_20px_rgba(191,154,95,0.1)] backdrop-blur-md mb-8 hover:bg-white/10 hover:border-primary/30 transition-all duration-300">
            <span className="w-3 h-3 rounded-full bg-primary animate-pulse" />
            <span className="text-base md:text-lg text-primary font-bold tracking-widest font-body uppercase">
              إنجازاتنا
            </span>
            <span className="w-3 h-3 rounded-full bg-primary animate-pulse" />
          </div>
          <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-bold text-white leading-tight">
            أرقام تعكس <span className="text-primary">الثقة</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center">
          {/* Left: 3D Circle Stats Grid */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-8 md:gap-12">
            <StatCard 
              value={8} 
              label="سنوات خبرة" 
              suffix="+" 
              delay={0} 
              icon={<svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></svg>}
            />
            <StatCard 
              value={100} 
              label="عقار تم بيعه" 
              suffix="+" 
              delay={0.15} 
              icon={<svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" /></svg>}
            />
            <StatCard 
              value={50} 
              label="مطور عقاري" 
              suffix="+" 
              delay={0.3} 
              icon={<svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" /></svg>}
            />
            <StatCard 
              value={100} 
              label="رضا العملاء" 
              suffix="%" 
              delay={0.45} 
              icon={<svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" /></svg>}
            />
          </div>

          {/* Right: Glass Cards with Bars */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease }}
              className="glass-card-dark rounded-3xl p-8 md:p-10 border border-white/10 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 rounded-full blur-[40px]" />

              <h3 className="text-white font-bold text-2xl mb-2 relative z-10">تغطيتنا للسوق العقاري</h3>
              <p className="text-white/50 text-sm font-light leading-[1.8] mb-8 relative z-10">
                نمتلك قاعدة واسعة من العقارات في أهم المناطق الاستراتيجية لضمان تلبية كافة احتياجات عملائنا السكنية والتجارية.
              </p>

              <div className="space-y-4 relative z-10">
                <BarStat label="القاهرة الجديدة والتجمع" value={35} maxValue={100} delay={0.1} />
                <BarStat label="العاصمة الإدارية الجديدة" value={30} maxValue={100} delay={0.2} />
                <BarStat label="الشيخ زايد وأكتوبر" value={15} maxValue={100} delay={0.3} />
                <BarStat label="الساحل الشمالي" value={10} maxValue={100} delay={0.4} />
                <BarStat label="العين السخنة" value={10} maxValue={100} delay={0.5} />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
