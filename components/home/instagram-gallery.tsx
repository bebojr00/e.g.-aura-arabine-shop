"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Instagram } from "lucide-react";
import { INSTAGRAM_URL } from "@/lib/constants";

const instagramPosts = [
  { id: 1, image: "/products/spanish-tobacco-ibraq.jpg", likes: 234 },
  { id: 2, image: "/products/balas-rose-ibraq.jpg", likes: 189 },
  { id: 3, image: "/products/pink-diamond-sakura.jpg", likes: 312 },
  { id: 4, image: "/products/blue-diamond-aqua.jpg", likes: 267 },
  { id: 5, image: "/products/gris-erik-luxury-assaf.jpg", likes: 445 },
  { id: 6, image: "/products/gift-sets/match-discovery-set.jpg", likes: 398 },
];

export default function InstagramGallery() {
  return (
    <section className="py-24 bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm tracking-[0.3em] uppercase text-primary mb-4">
            تابعنا
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-foreground mb-6">
            على إنستغرام
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            @aurafr_ara — إصدارات جديدة، عروض حصرية، ولمحات من عالم العطور الفاخرة.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {instagramPosts.map((post, index) => (
            <motion.a
              key={post.id}
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group relative aspect-square overflow-hidden"
            >
              <Image
                src={post.image}
                alt="عطر فاخر"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Instagram className="h-5 w-5 text-white" />
                <span className="text-white text-sm">{post.likes}</span>
              </div>
            </motion.a>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 border border-primary text-primary text-sm tracking-widest uppercase hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <Instagram className="h-5 w-5" />
            @aurafr_ara
          </a>
        </div>
      </div>
    </section>
  );
}
