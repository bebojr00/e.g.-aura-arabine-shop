"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ProductCard from "@/components/product-card";
import LuxuryPrice from "@/components/luxury-price";
import {
  collections,
  getProductsByCollection,
  type CollectionId,
} from "@/lib/products";

export default function CollectionsContent() {
  return (
    <div className="min-h-screen bg-background">
      <section className="bg-card border-b border-border/50">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-xs tracking-[0.35em] uppercase text-primary mb-3">
              أورا عربين
            </p>
            <h1 className="text-4xl sm:text-5xl font-serif font-light text-foreground mb-4">
              التشكيلات
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              كل تشكيلة تحكي قصة — من 150 مل إلى التبغ والماس الأسود.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 space-y-20">
        {collections
          .filter((c) => c.id !== "gift-sets")
          .map((collection, sectionIndex) => {
            const items = getProductsByCollection(collection.id as CollectionId);
            if (items.length === 0) return null;

            return (
              <motion.section
                key={collection.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
              >
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
                  <div>
                    <p className="text-xs tracking-[0.3em] uppercase text-primary mb-2">
                      {collection.nameAr}
                    </p>
                    <h2 className="text-2xl sm:text-3xl font-serif text-foreground">
                      {collection.name}
                    </h2>
                    <p className="text-sm text-muted-foreground mt-2 max-w-xl">
                      {collection.description}
                    </p>
                    {collection.salePrice && collection.compareAtPrice && (
                      <div className="mt-3">
                        <LuxuryPrice
                          price={collection.salePrice}
                          compareAtPrice={collection.compareAtPrice}
                          size="sm"
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          سعر موحد للتشكيلة
                        </p>
                      </div>
                    )}
                  </div>
                  <Link
                    href={`/shop?collection=${collection.id}&view=grid`}
                    className="inline-flex items-center gap-2 text-sm text-primary tracking-widest uppercase hover:opacity-80 shrink-0"
                  >
                    عرض الكل
                    <ArrowLeft className="h-4 w-4" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {items.slice(0, 4).map((product, i) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      index={sectionIndex * 4 + i}
                    />
                  ))}
                </div>
              </motion.section>
            );
          })}
      </div>
    </div>
  );
}
