"use client";

import { motion } from "framer-motion";
import { Droplets, Clock, Award, Truck, Shield, Gift } from "lucide-react";

const features = [
  {
    icon: Droplets,
    title: "Premium Quality",
    description:
      "Original imported fragrances from the finest perfume houses of Saudi Arabia.",
  },
  {
    icon: Clock,
    title: "Long Lasting",
    description:
      "High concentration formulas that last all day with exceptional sillage.",
  },
  {
    icon: Award,
    title: "Authentic Scents",
    description:
      "100% genuine products with certificates of authenticity guaranteed.",
  },
  {
    icon: Truck,
    title: "Egypt-Wide Delivery",
    description:
      "Fast, secure shipping to all governorates with tracking available.",
  },
  {
    icon: Shield,
    title: "Secure Payments",
    description: "Cash on delivery available. Safe and convenient transactions.",
  },
  {
    icon: Gift,
    title: "Gift Ready",
    description:
      "Luxurious packaging perfect for gifting. Premium unboxing experience.",
  },
];

export default function WhyChooseUs() {
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
            The ESSEN Difference
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-foreground mb-6">
            Why Choose Us
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Experience the pinnacle of Gulf perfumery with unparalleled service
            and authenticity.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group p-8 border border-border hover:border-primary/50 transition-colors"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-serif text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
