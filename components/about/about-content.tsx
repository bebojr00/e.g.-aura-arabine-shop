"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, Globe, Heart, Award } from "lucide-react";

const values = [
  {
    icon: Sparkles,
    title: "Authenticity",
    description:
      "Every fragrance in our collection is 100% original, imported directly from the finest perfume houses of Saudi Arabia.",
  },
  {
    icon: Globe,
    title: "Heritage",
    description:
      "We honor the rich tradition of Gulf perfumery, bringing centuries-old craftsmanship to modern Egypt.",
  },
  {
    icon: Heart,
    title: "Passion",
    description:
      "Our love for exceptional fragrances drives us to curate only the most extraordinary scents for our clients.",
  },
  {
    icon: Award,
    title: "Excellence",
    description:
      "We are committed to providing an unparalleled luxury experience, from selection to delivery.",
  },
];

const stats = [
  { value: "1000+", label: "Happy Customers" },
  { value: "50+", label: "Premium Fragrances" },
  { value: "100%", label: "Authentic Products" },
  { value: "24/7", label: "Customer Support" },
];

export default function AboutContent() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-24 bg-card border-b border-border overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <Image
            src="/products/hero.jpg"
            alt="About ESSEN"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <p className="text-sm tracking-[0.3em] uppercase text-primary mb-4">
              Our Story
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-foreground mb-6">
              The Art of
              <span className="block gold-gradient-text">Gulf Perfumery</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              ESSEN was born from a passion for bringing the finest Gulf
              fragrances to discerning collectors in Egypt. We believe that a
              truly exceptional perfume is more than a scent—it&apos;s an
              experience, a memory, a signature.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl font-serif text-foreground mb-6">
                Why Gulf Perfumes Are Different
              </h2>
              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <p>
                  Gulf perfumes represent the pinnacle of fragrance artistry.
                  For centuries, the Arabian Peninsula has been the crossroads
                  of the world&apos;s finest ingredients—oud from Southeast
                  Asia, roses from Taif, amber from the Baltic, and musk from
                  ancient trade routes.
                </p>
                <p>
                  What sets Gulf perfumes apart is their exceptional
                  concentration and longevity. Unlike many Western fragrances,
                  these scents are crafted to last from dawn to dusk and beyond,
                  with projection that leaves a lasting impression wherever you
                  go.
                </p>
                <p>
                  At ESSEN, we work directly with the most respected perfume
                  houses in Saudi Arabia to bring you fragrances that embody
                  this rich heritage—authentic, luxurious, and truly
                  unforgettable.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-[4/5]">
                <Image
                  src="/products/gris-erik-luxury-assaf.jpg"
                  alt="Luxury Gulf Perfume"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-full h-full border border-primary/30 -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-card border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-sm tracking-[0.3em] uppercase text-primary mb-4">
              What We Stand For
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif text-foreground">
              Our Values
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <value.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-serif text-foreground mb-3">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl sm:text-5xl font-serif gold-gradient-text mb-2">
                  {stat.value}
                </div>
                <p className="text-sm tracking-widest uppercase text-muted-foreground">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-card border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-3xl sm:text-4xl font-serif text-foreground mb-6">
              Experience the ESSEN Difference
            </h2>
            <p className="text-muted-foreground mb-10">
              Discover why thousands of fragrance enthusiasts trust us for their
              luxury perfume needs. Browse our collection and find your
              signature scent today.
            </p>
            <Link
              href="/shop"
              className="group inline-flex items-center gap-3 px-10 py-5 bg-primary text-primary-foreground text-sm tracking-widest uppercase hover:bg-primary/90 transition-colors"
            >
              Explore Our Collection
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
