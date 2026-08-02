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

function CircleProgress({ value, max, label, suffix, delay }: {
  value: number; max: number; label: string; suffix: string; delay: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const count = useCounter(value, 2000, inView);
  const percentage = (value / max) * 100;
  const circumference = 2 * Math.PI * 54;
  const strokeDashoffset = circumference - (circumference * (inView ? percentage : 0)) / 100;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.7, ease }}
      className="flex flex-col items-center relative group"
    >
      <div className="absolute inset-0 bg-primary/5 rounded-full blur-[30px] group-hover:bg-primary/20 transition-all duration-700 pointer-events-none" />
      <div className="relative w-36 h-36 md:w-40 md:h-40 mb-6 flex items-center justify-center">
        {/* 3D Glass Background */}
        <div className="absolute inset-2 rounded-full glass-card-dark border border-white/5 shadow-[inset_0_4px_20px_rgba(255,255,255,0.05)]" />

        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 120 120">
          <circle
            cx="60" cy="60" r="54"
            fill="none"
            stroke="rgba(255,255,255,0.03)"
            strokeWidth="3"
          />
          <circle
            cx="60" cy="60" r="54"
            fill="none"
            stroke="url(#goldGradient)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{ transition: "stroke-dashoffset 2s cubic-bezier(0.16, 1, 0.3, 1)" }}
            className="drop-shadow-[0_0_8px_rgba(191,154,95,0.8)]"
          />
          <defs>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#DFBA7F" />
              <stop offset="50%" stopColor="#BF9A5F" />
              <stop offset="100%" stopColor="#A07B40" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center Text */}
        <div className="absolute flex flex-col items-center justify-center">
          <span className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-white/60 font-body tabular-nums tracking-tighter">
            {count}{suffix}
          </span>
        </div>
      </div>
      <span className="text-white/70 text-sm font-medium tracking-wide uppercase">{label}</span>
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
    <section className="relative bg-navy-deeper overflow-hidden py-24">
      {/* 3D Decorative Grid Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '50px 50px', transform: 'perspective(1000px) rotateX(60deg) scale(2.5)', transformOrigin: 'top center' }} />

      {/* Ambient Lights */}
      <div className="absolute top-1/4 right-[10%] w-[500px] h-[500px] bg-primary/[0.04] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-[10%] w-[400px] h-[400px] bg-[#DFBA7F]/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="container-wide px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="text-center mb-20 max-w-2xl mx-auto"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-[2px] bg-primary" />
            <span className="text-sm uppercase text-primary font-medium tracking-widest font-body">إنجازاتنا</span>
            <span className="w-8 h-[2px] bg-primary" />
          </div>
          <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-bold text-white leading-tight">
            أرقام تعكس <span className="text-primary italic">الثقة</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center">
          {/* Left: 3D Circle Stats Grid */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-8 md:gap-12">
            <CircleProgress value={10} max={20} label="سنة خبرة" suffix="+" delay={0} />
            <CircleProgress value={1000} max={1500} label="عقار تم بيعه" suffix="+" delay={0.15} />
            <CircleProgress value={50} max={100} label="مطور عقاري" suffix="+" delay={0.3} />
            <CircleProgress value={100} max={100} label="رضا العملاء" suffix="%" delay={0.45} />
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
