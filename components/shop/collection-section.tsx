"use client";

import { motion, cubicBezier } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Collection, Product } from "@/data/products";
import ProductCard from "@/components/product-card";
import LuxuryPrice from "@/components/luxury-price";

interface CollectionSectionProps {
  collection: Collection;
  products: Product[];
  index: number;
}

export default function CollectionSection({
  collection,
  products,
  index,
}: CollectionSectionProps) {
  if (products.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.05, ease: cubicBezier(0.22, 1, 0.36, 1) }}
      className="py-12 sm:py-16 border-b border-border/40 last:border-0"
    >
      <motion.div
        className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 sm:mb-10"
        initial={{ opacity: 0, x: -12 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        <div>
          <p className="text-[10px] sm:text-xs tracking-[0.35em] uppercase text-primary mb-2">
            {collection.nameAr}
          </p>
          <h2 className="text-2xl sm:text-3xl font-serif font-light text-foreground tracking-wide">
            {collection.name}
          </h2>
          <p className="text-sm text-muted-foreground mt-2 max-w-xl">
            {collection.description}
          </p>
          {collection.salePrice && collection.compareAtPrice && (
            <div className="mt-4">
              <LuxuryPrice
                price={collection.salePrice}
                compareAtPrice={collection.compareAtPrice}
                size="md"
              />
            </div>
          )}
        </div>
        <Link
          href={`/shop?collection=${collection.id}`}
          className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-primary hover:text-primary/80 transition-colors shrink-0"
        >
          View all
          <ArrowRight className="h-4 w-4" />
        </Link>
      </motion.div>

      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8"
      >
        {products.slice(0, 3).map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} />
        ))}
      </motion.div>
    </motion.section>
  );
}
