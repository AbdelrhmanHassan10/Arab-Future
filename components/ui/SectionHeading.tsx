"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  light?: boolean;
  align?: "center" | "left";
}

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function SectionHeading({
  eyebrow,
  title,
  description,
  light = false,
  align = "center",
}: SectionHeadingProps) {
  const isCenter = align === "center";

  return (
    <div className={`mb-14 md:mb-18 ${isCenter ? "text-center" : ""}`}>
      {/* Eyebrow */}
      {eyebrow && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease }}
          className={`mb-4 ${isCenter ? "text-center" : ""}`}
        >
          <span className="text-caption uppercase text-primary font-medium tracking-widest">
            {eyebrow}
          </span>
        </motion.div>
      )}

      {/* Title */}
      <div className="overflow-hidden">
        <motion.h2
          initial={{ y: "100%" }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease, delay: 0.08 }}
          className={`text-display-sm md:text-display font-bold ${
            light ? "text-white" : "text-navy"
          }`}
        >
          {title}
        </motion.h2>
      </div>

      {/* Description */}
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className={`mt-4 text-subhead max-w-2xl font-light leading-[1.9] ${
            isCenter ? "mx-auto" : ""
          } ${light ? "text-white/45" : "text-warm-gray"}`}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
