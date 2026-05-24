"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { giftSets } from "@/lib/products";
import ProductImage from "@/components/product-image";
import LuxuryPrice from "@/components/luxury-price";
import { HERO_IMAGE } from "@/lib/product-image";

export default function GiftSetsPreview() {
  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm tracking-[0.3em] uppercase text-primary mb-4">
              الهدية المثالية
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-foreground mb-6">
              علب الهدايا الفاخرة
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              مجموعات مختارة بعناية في تغليف ملكي — مثالية للمناسبات والإهداء.
            </p>

            <div className="space-y-6 mb-10">
              {giftSets.slice(0, 2).map((set) => (
                <Link
                  key={set.id}
                  href="/gift-sets"
                  className="group flex items-center gap-4 p-4 border border-border/50 hover:border-primary transition-colors"
                >
                  <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden">
                    <ProductImage
                      src={set.image}
                      alt={set.name}
                      productId={set.id}
                      isGiftSet
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif text-foreground group-hover:text-primary transition-colors truncate">
                      {set.name}
                    </h4>
                    <div className="mt-1">
                      <LuxuryPrice
                        price={set.price}
                        compareAtPrice={set.compareAtPrice}
                        size="sm"
                        showBadge={false}
                      />
                    </div>
                  </div>
                  <ArrowLeft className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-all flex-shrink-0" />
                </Link>
              ))}
            </div>

            <Link
              href="/gift-sets"
              className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground text-sm tracking-widest uppercase hover:bg-primary/90 transition-colors"
            >
              كل علب الهدايا
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-square overflow-hidden">
              <ProductImage
                src={giftSets[0]?.image ?? HERO_IMAGE}
                alt="علب هدايا فاخرة"
                productId={giftSets[0]?.id}
                isGiftSet
                className="object-cover"
              />
              <div className="absolute inset-0 border border-primary/20 pointer-events-none" />
            </div>
            <div className="absolute -top-4 -left-4 w-full h-full border border-primary/30 -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
