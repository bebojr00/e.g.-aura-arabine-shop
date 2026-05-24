"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { giftSets } from "@/lib/products";
import ProductImage from "@/components/product-image";
import LuxuryPrice from "@/components/luxury-price";
import { HERO_IMAGE } from "@/lib/product-image";

export default function GiftSetsPreview() {
  return (
    <section className="py-32 bg-black relative cinematic-grain overflow-hidden border-t border-gold/10">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-full bg-gradient-to-l from-gold/10 to-transparent pointer-events-none blur-3xl" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <p className="text-[10px] tracking-[0.4em] uppercase text-gold mb-6 font-medium">
              The Perfect Gift
            </p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl luxury-title text-foreground mb-8">
              Luxury Sets
            </h2>
            <p className="text-muted-foreground font-light leading-relaxed mb-12">
              Curated collections presented in royal packaging. The ultimate expression of appreciation and refined taste.
            </p>

            <div className="space-y-6 mb-12">
              {giftSets.slice(0, 2).map((set) => (
                <Link
                  key={set.id}
                  href="/gift-sets"
                  className="group flex items-center gap-6 p-6 glass-card border border-gold/20 hover:border-gold/50 transition-all duration-500 hover:shadow-[0_0_20px_rgba(193,155,75,0.15)]"
                >
                  <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden bg-black/40">
                    <ProductImage
                      src={set.image}
                      alt={set.name}
                      productId={set.id}
                      isGiftSet
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="luxury-heading text-lg text-foreground group-hover:text-gold transition-colors truncate mb-2">
                      {set.name}
                    </h4>
                    <LuxuryPrice
                      price={set.price}
                      compareAtPrice={set.compareAtPrice}
                      size="sm"
                      showBadge={false}
                    />
                  </div>
                  <ArrowRight className="h-5 w-5 text-gold/50 group-hover:text-gold group-hover:translate-x-1 transition-all flex-shrink-0" />
                </Link>
              ))}
            </div>

            <Link
              href="/gift-sets"
              className="inline-flex items-center gap-4 px-10 py-5 bg-gold text-oud-brown text-[10px] tracking-[0.3em] uppercase hover:bg-gold-light transition-all duration-500 shadow-[0_0_15px_rgba(193,155,75,0.2)]"
            >
              View All Sets
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative aspect-square overflow-hidden glass-card p-2 border border-gold/20">
              <div className="relative w-full h-full overflow-hidden bg-black">
                <ProductImage
                  src={giftSets[0]?.image ?? HERO_IMAGE}
                  alt="Luxury Gift Sets"
                  productId={giftSets[0]?.id}
                  isGiftSet
                  className="object-cover w-full h-full hover:scale-105 transition-transform duration-1000 opacity-80"
                />
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 border-t border-r border-gold/30 pointer-events-none" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 border-b border-l border-gold/30 pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
