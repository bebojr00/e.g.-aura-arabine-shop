"use client";

import { motion, cubicBezier } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const collections = [
  {
    id: "men",
    name: "For Him",
    description: "Bold, sophisticated fragrances crafted for power.",
    image: "/products/spanish-tobacco-ibraq.jpg",
    href: "/shop?category=men",
  },
  {
    id: "women",
    name: "For Her",
    description: "Elegant, captivating scents of pure grace.",
    image: "/products/pink-diamond-sakura.jpg",
    href: "/shop?category=women",
  },
  {
    id: "unisex",
    name: "Unisex",
    description: "Timeless, versatile masterpieces.",
    image: "/products/gris-erik-luxury-assaf.jpg",
    href: "/shop?category=unisex",
  },
];

export default function CollectionsPreview() {
  const easeInOutCubic = cubicBezier(0.65, 0, 0.35, 1);

  return (
    <section className="py-40 bg-background cinematic-grain relative border-t border-gold/10">
      <div className="absolute inset-0 fog-overlay opacity-30 pointer-events-none" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-150px" }}
          transition={{ duration: 1.2, ease: easeInOutCubic }}
          className="text-center mb-32"
        >
          <p className="text-[10px] tracking-[0.5em] uppercase text-gold mb-8 font-medium">
            Curated Elegance
          </p>
          <h2 className="text-5xl sm:text-6xl md:text-7xl luxury-title text-foreground mb-10 drop-shadow-xl">
            The Collections
          </h2>
        </motion.div>

        {/* Collections Grid - Editorial Stagger */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.id}
              className={`w-full ${index === 1 ? 'md:mt-32' : ''}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, delay: index * 0.2, ease: easeInOutCubic }}
            >
              <Link href={collection.href} className="group block relative luxury-glass h-[600px] overflow-hidden transform transition-all duration-700 hover:shadow-[0_40px_60px_rgba(0,0,0,0.8)] hover:-translate-y-4">
                <div className="absolute inset-0">
                  <Image
                    src={collection.image}
                    alt={collection.name}
                    fill
                    className="object-cover transition-transform duration-[2000ms] group-hover:scale-110 opacity-70"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-12 flex flex-col items-center text-center">
                  <h3 className="text-4xl font-serif text-ivory mb-4 group-hover:text-gold transition-colors duration-700 drop-shadow-md">
                    {collection.name}
                  </h3>
                  <p className="text-sm text-ivory/70 font-light mb-8 opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 delay-100">
                    {collection.description}
                  </p>
                  <span className="magnetic-button inline-flex items-center gap-4 text-[11px] tracking-[0.4em] uppercase text-gold">
                    Explore
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-3 transition-transform duration-700" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
