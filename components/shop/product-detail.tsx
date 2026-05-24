"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Heart,
  Share2,
  Minus,
  Plus,
  ShoppingBag,
  MessageCircle,
  ChevronRight,
} from "lucide-react";
import type { Product } from "@/lib/products";
import { products, resolveProductBadges } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import {
  buildSingleProductMessage,
  openWhatsApp,
} from "@/lib/whatsapp";
import ProductCard from "@/components/product-card";
import ProductImage from "@/components/product-image";
import LuxuryPrice from "@/components/luxury-price";
import LuxuryBadges from "@/components/luxury-badges";
import { getCompareAtForPrice } from "@/data/products";

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedPrice, setSelectedPrice] = useState(product.price);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addItem } = useCart();

  const hasLargeSize = Boolean(product.priceLarge);
  const compareAt = getCompareAtForPrice(product, selectedPrice);
  const badges = resolveProductBadges(product, 0, false);

  const relatedProducts = useMemo(
    () =>
      products
        .filter(
          (p) =>
            p.id !== product.id &&
            (p.collection === product.collection || p.category === product.category)
        )
        .slice(0, 4),
    [product]
  );

  const handleAddToCart = () => {
    addItem(product.id, "product", selectedPrice, quantity);
  };

  const handleWhatsAppOrder = () => {
    openWhatsApp(
      buildSingleProductMessage(product, quantity, selectedPrice)
    );
  };

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (navigator.share) {
      await navigator.share({ title: product.name, url });
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(url);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border/50">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">
              الرئيسية
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/shop" className="hover:text-primary transition-colors">
              المتجر
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">{product.name}</span>
          </nav>
        </div>
      </div>

      <section className="py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative aspect-square max-h-[min(85vh,720px)] mx-auto w-full"
            >
              <ProductImage
                src={product.image}
                alt={product.name}
                productId={product.id}
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col"
            >
              <p className="text-xs tracking-[0.35em] uppercase text-primary mb-2">
                {product.brand}
              </p>
              <h1 className="text-3xl sm:text-4xl font-serif font-light text-foreground mb-4">
                {product.name}
              </h1>

              <div className="mb-4">
                <LuxuryBadges badges={badges} max={4} />
              </div>

              <div className="mb-6">
                <LuxuryPrice
                  price={selectedPrice}
                  compareAtPrice={compareAt}
                  size="lg"
                />
              </div>

              {hasLargeSize && (
                <div className="mb-6">
                  <p className="text-xs tracking-widest uppercase text-muted-foreground mb-3">
                    الحجم
                  </p>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedPrice(product.price)}
                      className={`px-5 py-2.5 text-sm border transition-colors ${
                        selectedPrice === product.price
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border text-muted-foreground hover:border-primary/50"
                      }`}
                    >
                      50ml
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedPrice(product.priceLarge ?? product.price)
                      }
                      className={`px-5 py-2.5 text-sm border transition-colors ${
                        selectedPrice === product.priceLarge
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border text-muted-foreground hover:border-primary/50"
                      }`}
                    >
                      100ml
                    </button>
                  </div>
                </div>
              )}

              <p className="text-muted-foreground leading-relaxed mb-8">
                {product.description}
              </p>

              {product.stock > 0 && product.stock <= 10 && (
                <p className="text-sm text-primary mb-4">
                  متبقي {product.stock} قطعة فقط
                </p>
              )}

              <div className="flex items-center gap-4 mb-8">
                <span className="text-sm text-muted-foreground">الكمية</span>
                <div className="flex items-center border border-border">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-10 h-10 flex items-center justify-center hover:text-primary transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-12 text-center text-sm">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-10 h-10 flex items-center justify-center hover:text-primary transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="flex-1 flex items-center justify-center gap-2 py-4 bg-primary text-primary-foreground text-xs tracking-[0.2em] uppercase hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  <ShoppingBag className="h-5 w-5" />
                  أضف للسلة
                </button>
                <button
                  type="button"
                  onClick={handleWhatsAppOrder}
                  className="flex-1 flex items-center justify-center gap-2 py-4 border border-green-600 text-green-600 text-xs tracking-[0.2em] uppercase hover:bg-green-600 hover:text-white transition-colors"
                >
                  <MessageCircle className="h-5 w-5" />
                  طلب عبر واتساب
                </button>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Heart
                    className={`h-5 w-5 ${
                      isWishlisted ? "fill-primary text-primary" : ""
                    }`}
                  />
                  المفضلة
                </button>
                <button
                  type="button"
                  onClick={handleShare}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Share2 className="h-5 w-5" />
                  مشاركة
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section className="py-16 border-t border-border/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-serif text-foreground mb-10 text-center">
              قد يعجبك أيضاً
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
