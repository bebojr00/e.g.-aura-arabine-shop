"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ProductImage from "@/components/product-image";
import { HERO_IMAGE } from "@/lib/product-image";
import { BRAND_TAGLINE_AR, BUSINESS_NAME } from "@/lib/constants";

export default function Hero() {
  return (
    <section className="relative min-h-screen -mt-20 pt-20 flex items-center justify-center overflow-hidden">
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <ProductImage
          src={HERO_IMAGE}
          alt="عطور خليجية فاخرة"
          priority
          sizes="100vw"
          className="object-cover"
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-l from-background/95 via-background/75 to-background/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
      </motion.div>

      <motion.div
        className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="max-w-2xl">
          <p className="text-sm tracking-[0.3em] uppercase text-primary mb-6">
            {BUSINESS_NAME}
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif leading-tight text-foreground mb-6">
            <span className="block">عطور فاخرة</span>
            <span className="block gold-gradient-text">من قلب الخليج</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-10 max-w-lg">
            {BRAND_TAGLINE_AR}. جودة أصيلة، بقاء طويل، وطلب مباشر عبر واتساب.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/shop"
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary text-primary-foreground text-sm tracking-widest uppercase hover:bg-primary/90 transition-colors"
            >
              استكشف المتجر
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/gift-sets"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-foreground/30 text-foreground text-sm tracking-widest uppercase hover:border-primary hover:text-primary transition-colors"
            >
              علب الهدايا
            </Link>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs tracking-widest uppercase text-muted-foreground">
          مرر
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-12 bg-gradient-to-b from-primary to-transparent"
        />
      </motion.div>
    </section>
  );
}
