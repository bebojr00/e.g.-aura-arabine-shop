"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Ahmed Hassan",
    location: "Cairo",
    rating: 5,
    text: "The Spanish Tobacco is absolutely incredible. The projection and longevity are exactly what I was looking for. Finally, real Gulf quality in Egypt!",
    product: "Spanish Tobacco - IBRAQ",
  },
  {
    id: 2,
    name: "Nour El-Din",
    location: "Alexandria",
    rating: 5,
    text: "I ordered the gift set for my wife's birthday. The presentation was stunning and the fragrances are luxurious. She loved every single one.",
    product: "IBRAQ Collection Box",
  },
  {
    id: 3,
    name: "Sara Mohamed",
    location: "Giza",
    rating: 5,
    text: "Pink Diamond Sakura is my new signature scent. Elegant, feminine, and I receive compliments everywhere I go. The quality is unmatched.",
    product: "Pink Diamond Sakura",
  },
  {
    id: 4,
    name: "Omar Khalil",
    location: "Mansoura",
    rating: 5,
    text: "Fast delivery and the perfume exceeded expectations. Gris Erik Luxury is pure sophistication in a bottle. Will definitely order again.",
    product: "Gris Erik Luxury - ASSAF",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-background overflow-hidden">
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
            Testimonials
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-foreground mb-6">
            What Our Clients Say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join thousands of satisfied customers who have discovered the
            essence of luxury.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative p-8 bg-card border border-border"
            >
              {/* Quote Icon */}
              <Quote className="absolute top-6 right-6 h-10 w-10 text-primary/20" />

              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-primary text-primary"
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-foreground leading-relaxed mb-6">
                &quot;{testimonial.text}&quot;
              </p>

              {/* Author */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-serif text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.location}
                  </p>
                </div>
                <p className="text-xs tracking-widest uppercase text-primary">
                  {testimonial.product}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
