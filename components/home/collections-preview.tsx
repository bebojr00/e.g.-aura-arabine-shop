"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const collections = [
  {
    id: "men",
    name: "For Him",
    description: "Bold, sophisticated fragrances",
    image: "/products/spanish-tobacco-ibraq.jpg",
    href: "/shop?category=men",
  },
  {
    id: "women",
    name: "For Her",
    description: "Elegant, captivating scents",
    image: "/products/pink-diamond-sakura.jpg",
    href: "/shop?category=women",
  },
  {
    id: "unisex",
    name: "Unisex",
    description: "Timeless, versatile fragrances",
    image: "/products/gris-erik-luxury-assaf.jpg",
    href: "/shop?category=unisex",
  },
];

export default function CollectionsPreview() {
  return (
    <section className="py-24 bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm tracking-[0.3em] uppercase text-primary mb-4">
            Explore
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-foreground mb-6">
            Our Collections
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Curated selections for every preference. Find your perfect signature
            scent.
          </p>
        </motion.div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link href={collection.href} className="group block relative">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={collection.image}
                    alt={collection.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <h3 className="text-2xl sm:text-3xl font-serif text-foreground mb-2">
                      {collection.name}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {collection.description}
                    </p>
                    <span className="inline-flex items-center gap-2 text-sm tracking-widest uppercase text-primary group-hover:gap-3 transition-all">
                      Explore
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
