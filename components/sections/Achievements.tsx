"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

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

function CircleProgress({ value, max, label, suffix, color, delay }: {
  value: number; max: number; label: string; suffix: string; color: string; delay: number;
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.7, ease }}
      className="flex flex-col items-center"
    >
      <div className="relative w-32 h-32 md:w-36 md:h-36 mb-5">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          {/* Background circle */}
          <circle
            cx="60" cy="60" r="54"
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="4"
          />
          {/* Progress circle */}
          <circle
            cx="60" cy="60" r="54"
            fill="none"
            stroke={color}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{ transition: "stroke-dashoffset 2s cubic-bezier(0.16, 1, 0.3, 1)" }}
          />
        </svg>
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl md:text-4xl font-bold text-white font-body tabular-nums">
            {count}{suffix}
          </span>
        </div>
      </div>
      <span className="text-white/50 text-sm font-light">{label}</span>
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
      className="group"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-white/70 text-sm">{label}</span>
        <span className="text-white font-bold font-body text-sm tabular-nums">{count}%</span>
      </div>
      <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-l from-primary to-primary/70"
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
    <section className="relative bg-navy-deeper overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-[10%] w-[400px] h-[400px] bg-primary/[0.06] rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-[15%] w-[300px] h-[300px] bg-primary/[0.04] rounded-full blur-[100px]" />

        {/* Floating geometric shapes - hidden on mobile */}
        <motion.div
          animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="hidden md:block absolute top-[15%] left-[8%] w-16 h-16 border border-white/[0.04] rotate-45"
        />
        <motion.div
          animate={{ y: [10, -10, 10], rotate: [45, 50, 45] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="hidden md:block absolute bottom-[20%] right-[12%] w-24 h-24 border border-primary/[0.08] rotate-12 rounded-2xl"
        />
        <motion.div
          animate={{ y: [-8, 8, -8] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="hidden md:block absolute top-[40%] right-[25%] w-3 h-3 bg-primary/20 rounded-full"
        />
        <motion.div
          animate={{ y: [6, -6, 6] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="hidden md:block absolute bottom-[35%] left-[30%] w-2 h-2 bg-white/10 rounded-full"
        />
      </div>

      <div className="pad-y-lg relative">
        <div className="pad-x container-wide">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <span className="text-2xl uppercase text-primary font-semibold tracking-widest">
              إنجازاتنا
            </span>
            <h2 className="text-display font-bold text-white mt-4">
              أرقام تتحدث عنّا
            </h2>
            <p className="text-white/35 text-subhead font-light mt-4 max-w-xl mx-auto">
              سنوات من العمل والإتقان انعكست على أرقام نفخر بها
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            {/* Left: Circle stats */}
            <div className="grid grid-cols-2 gap-8 md:gap-10">
              <CircleProgress value={12} max={20} label="سنة خبرة" suffix="+" color="#E63329" delay={0} />
              <CircleProgress value={350} max={400} label="مشروع منجز" suffix="+" color="#E63329" delay={0.15} />
              <CircleProgress value={50} max={100} label="عميل راضي" suffix="+" color="#E63329" delay={0.3} />
              <CircleProgress value={100} max={100} label="التزام بالجودة" suffix="%" color="#E63329" delay={0.45} />
            </div>

            {/* Right: Bar stats + text */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="mb-10"
              >
                <h3 className="text-white font-bold text-xl mb-3">
                  تخصصاتنا ومستوى الخبرة
                </h3>
                <p className="text-white/35 text-sm font-light leading-[1.9]">
                  نتميز بخبرة عميقة في مختلف مجالات التشطيبات المعمارية
                  والواجهات مسبقة الصنع
                </p>
              </motion.div>

              <div className="space-y-6">
                <BarStat label="واجهات GRC" value={35} maxValue={100} delay={0.1} />
                <BarStat label="واجهات GRP" value={20} maxValue={100} delay={0.2} />
                <BarStat label="واجهات GRG" value={15} maxValue={100} delay={0.25} />
                <BarStat label="الحجر الصناعي" value={5} maxValue={100} delay={0.3} />
                <BarStat label="الترميم المعماري" value={5} maxValue={100} delay={0.4} />
                <BarStat label="التصميم الداخلي" value={10} maxValue={100} delay={0.5} />
              </div>

              {/* Highlight card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.7 }}
                className="mt-10 glass-card-dark p-6 flex items-center gap-5"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm">رضا العملاء أولويتنا</h4>
                  <p className="text-white/35 text-xs font-light mt-0.5">
                    نقدم الدعم الاستشاري لكافة العملاء — حتى غير المتعاقدين معنا
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
