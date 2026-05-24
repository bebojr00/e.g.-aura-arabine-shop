"use client";

import { motion } from "framer-motion";
import ProductCard from "@/components/product-card";
import { getBestSellers } from "@/lib/products";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function BestSellers() {
  const bestSellers = getBestSellers();

  return (
    <section className="py-40 relative bg-background cinematic-grain overflow-hidden">
      {/* Cinematic Lighting & Atmosphere */}
      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-black/0 via-gold/5 to-black/0 pointer-events-none" />
      <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-gold/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="fog-overlay opacity-30" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-150px" }}
          transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1] }}
          className="text-center mb-32"
        >
          <p className="text-[10px] tracking-[0.5em] uppercase text-gold mb-8 font-medium">
            The Icons
          </p>
          <h2 className="text-5xl sm:text-6xl md:text-7xl luxury-title text-foreground mb-10 drop-shadow-xl">
            Bestsellers
          </h2>
          <p className="text-muted-foreground/80 max-w-2xl mx-auto font-light leading-loose text-lg">
            Discover our most sought-after fragrances. A curated selection of masterpieces that define modern Gulf luxury and sophisticated elegance.
          </p>
        </motion.div>

        {/* Products Grid - Asymmetrical Editorial Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-24 items-start">
          {bestSellers.map((product, index) => (
            <motion.div
              key={product.id}
              className={`w-full ${index % 2 === 1 ? 'lg:mt-24 sm:mt-16' : ''}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, delay: index * 0.2, ease: [0.65, 0, 0.35, 1] }}
            >
              <ProductCard product={product} index={index} />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.65, 0, 0.35, 1] }}
          className="text-center mt-32"
        >
          <Link
            href="/shop"
            className="magnetic-button group inline-flex items-center gap-6 px-12 py-6 border border-gold/30 text-[11px] tracking-[0.4em] uppercase text-gold hover:bg-gold/5 transition-all duration-700 hover:border-gold/80"
          >
            Explore The Full Collection
            <ArrowRight className="h-5 w-5 group-hover:translate-x-3 transition-transform duration-700" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
