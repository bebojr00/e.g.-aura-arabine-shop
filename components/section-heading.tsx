"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`max-w-2xl mb-14 ${alignClass}`}
    >
      {eyebrow && (
        <p className="text-xs sm:text-sm tracking-[0.35em] uppercase text-primary mb-4">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-foreground tracking-wide">
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-muted-foreground leading-relaxed text-base sm:text-lg">
          {description}
        </p>
      )}
      <div
        className={`mt-8 h-px w-16 bg-gradient-to-r from-primary/80 to-transparent ${
          align === "center" ? "mx-auto" : ""
        }`}
        aria-hidden
      />
    </motion.div>
  );
}
