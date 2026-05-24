"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Gift, Star, MessageCircle } from "lucide-react";
import { giftSets } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import ProductImage from "@/components/product-image";
import LuxuryPrice from "@/components/luxury-price";
import { buildGiftSetMessage, openWhatsApp } from "@/lib/whatsapp";
import { HERO_IMAGE } from "@/lib/product-image";

export default function GiftSetsContent() {
  const { addItem } = useCart();

  return (
    <div className="min-h-screen bg-background">
      <section className="relative bg-card border-b border-border/50 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <ProductImage
            src={HERO_IMAGE}
            alt=""
            className="object-cover"
            priority
          />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary text-xs tracking-[0.25em] uppercase mb-6">
              <Gift className="h-4 w-4" />
              هدايا فاخرة
            </div>
            <h1 className="text-4xl sm:text-5xl font-serif font-light text-foreground mb-4">
              علب الهدايا
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              مجموعات مختارة بعناية — تغليف ملكي وطلب مباشر عبر واتساب.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 border-b border-border/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Gift, title: "تغليف فاخر", desc: "علب عرض جاهزة للإهداء" },
              { icon: Star, title: "اختيار خبير", desc: "أفضل العطور في مجموعة واحدة" },
              {
                icon: MessageCircle,
                title: "طلب واتساب",
                desc: "تأكيد سريع وشحن لكل مصر",
              },
            ].map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-4 p-6 bg-card border border-border/50"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <f.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-serif text-foreground mb-1">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-20">
          {giftSets.map((set, index) => (
            <motion.article
              key={set.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <ProductImage
                    src={set.image}
                    alt={set.name}
                    productId={set.id}
                    isGiftSet
                    className="object-cover"
                  />
                </div>
              </div>

              <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                <p className="text-xs tracking-[0.3em] uppercase text-primary mb-3">
                  علبة هدايا
                </p>
                <h2 className="text-3xl font-serif text-foreground mb-4">
                  {set.name}
                </h2>
                <div className="mb-6">
                  <LuxuryPrice
                    price={set.price}
                    compareAtPrice={set.compareAtPrice}
                    size="md"
                  />
                </div>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {set.description}
                </p>
                <p className="text-sm text-muted-foreground mb-3">
                  يتضمن {set.products.length} عطور
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {set.products.map((pid) => (
                    <Link
                      key={pid}
                      href={`/shop/${pid}`}
                      className="px-3 py-1 bg-card border border-border text-xs hover:border-primary transition-colors"
                    >
                      {pid.replace(/-/g, " ")}
                    </Link>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => addItem(set.id, "giftset", set.price)}
                    className="px-6 py-3 bg-primary text-primary-foreground text-xs tracking-[0.2em] uppercase hover:bg-primary/90 transition-colors"
                  >
                    أضف للسلة
                  </button>
                  <button
                    type="button"
                    onClick={() => openWhatsApp(buildGiftSetMessage(set))}
                    className="inline-flex items-center gap-2 px-6 py-3 border border-green-600 text-green-600 text-xs tracking-[0.2em] uppercase hover:bg-green-600 hover:text-white transition-colors"
                  >
                    <MessageCircle className="h-4 w-4" />
                    واتساب
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="py-16 bg-card border-t border-border/50 text-center">
        <div className="mx-auto max-w-2xl px-4">
          <h2 className="text-2xl font-serif mb-4">تحتاج مساعدة في الاختيار؟</h2>
          <p className="text-muted-foreground mb-8 text-sm">
            تواصل معنا على واتساب لتوصية مخصصة.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-primary text-sm tracking-widest uppercase hover:opacity-80"
          >
            <ArrowLeft className="h-4 w-4" />
            صفحة التواصل
          </Link>
        </div>
      </section>
    </div>
  );
}
