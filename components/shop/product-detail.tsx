"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, cubicBezier } from "framer-motion";
import {
  Heart,
  Share2,
  Minus,
  Plus,
  ShoppingBag,
  MessageCircle,
  ChevronRight,
  Wind,
  Clock,
  Sparkles,
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  // Parallax effects
  const { scrollYProgress } = useScroll();
  const yImage = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  const easeInOutCubic = cubicBezier(0.65, 0, 0.35, 1);

  return (
    <div className="min-h-screen bg-black cinematic-grain overflow-hidden">
      {/* Navigation Breadcrumb */}
      <div className="absolute top-0 left-0 w-full z-50 border-b border-gold/10 bg-black/50 backdrop-blur-md">
        <div className="mx-auto max-w-screen-2xl px-6 py-6">
          <nav className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-muted-foreground/60">
            <Link href="/" className="hover:text-gold transition-colors">House</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/shop" className="hover:text-gold transition-colors">Collection</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-gold">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Left: Sticky Massive Image */}
        <div className="relative h-[60vh] lg:h-screen lg:sticky lg:top-0 overflow-hidden bg-black/90">
          <motion.div 
            className="absolute inset-0"
            style={{ y: yImage }}
            initial={{ scale: 1.1, filter: "blur(10px)" }}
            animate={{ scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 2, ease: easeInOutCubic }}
          >
            <ProductImage
              src={product.image}
              alt={product.name}
              productId={product.id}
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover w-full h-full opacity-80"
            />
            {/* Cinematic Gradients */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80 lg:to-black" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
            <div className="vignette" />
            <div className="fog-overlay opacity-50" />
          </motion.div>

          <div className="absolute top-32 left-12 z-20 hidden lg:block">
            <LuxuryBadges badges={badges} max={4} />
          </div>
        </div>

        {/* Right: Scrolling Storytelling */}
        <div className="relative z-10 lg:py-32 px-6 lg:px-20 xl:px-32 bg-black/40 backdrop-blur-3xl lg:backdrop-blur-none lg:bg-transparent">
          <motion.div
            style={{ y: yText }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.5, ease: easeInOutCubic }}
            className="flex flex-col pt-12 lg:pt-0 max-w-2xl"
          >
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="text-[11px] tracking-[0.5em] uppercase text-gold mb-8 font-medium"
            >
              {product.brand}
            </motion.p>
            
            <h1 className="text-6xl sm:text-7xl lg:text-8xl luxury-title text-ivory mb-10 leading-[1.1] drop-shadow-2xl">
              {product.name}
            </h1>

            <div className="mb-12">
              <LuxuryPrice
                price={selectedPrice}
                compareAtPrice={compareAt}
                size="lg"
              />
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none text-ivory/70 leading-loose mb-16 font-light">
              <p className="text-xl">{product.description}</p>
              <p className="mt-8 text-sm text-ivory/50">
                Imported directly from the heart of Saudi Arabia. 
                Each note is meticulously crafted to leave an unforgettable, lingering presence.
              </p>
            </div>

            {hasLargeSize && (
              <div className="mb-16">
                <p className="text-[10px] tracking-[0.3em] uppercase text-gold mb-6">
                  Select Format
                </p>
                <div className="flex gap-6">
                  <button
                    type="button"
                    onClick={() => setSelectedPrice(product.price)}
                    className={`magnetic-button px-10 py-5 text-[11px] tracking-[0.3em] uppercase transition-all duration-700 ${
                      selectedPrice === product.price
                        ? "border border-gold bg-gold/5 text-gold shadow-[0_0_30px_rgba(193,155,75,0.15)]"
                        : "border border-gold/20 text-muted-foreground hover:border-gold/60"
                    }`}
                  >
                    50ml / 1.7oz
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedPrice(product.priceLarge ?? product.price)
                    }
                    className={`magnetic-button px-10 py-5 text-[11px] tracking-[0.3em] uppercase transition-all duration-700 ${
                      selectedPrice === product.priceLarge
                        ? "border border-gold bg-gold/5 text-gold shadow-[0_0_30px_rgba(193,155,75,0.15)]"
                        : "border border-gold/20 text-muted-foreground hover:border-gold/60"
                    }`}
                  >
                    100ml / 3.4oz
                  </button>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-8 mb-16">
              <div className="flex items-center gap-8">
                <span className="text-[10px] tracking-[0.3em] uppercase text-gold/60">Quantity</span>
                <div className="flex items-center border border-gold/20 luxury-glass">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-16 h-16 flex items-center justify-center hover:text-gold transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-12 text-center text-lg font-serif">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-16 h-16 flex items-center justify-center hover:text-gold transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 mb-16">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="magnetic-button luxury-button flex-1 flex items-center justify-center gap-4 py-6 bg-gold text-oud-brown text-[11px] tracking-[0.3em] uppercase shadow-[0_0_30px_rgba(193,155,75,0.2)] disabled:opacity-50"
              >
                <ShoppingBag className="h-4 w-4" />
                <span className="relative z-10 font-medium">Acquire Now</span>
              </button>
              <button
                type="button"
                onClick={handleWhatsAppOrder}
                className="magnetic-button flex-1 flex items-center justify-center gap-4 py-6 border border-[#25D366]/40 text-[#25D366] text-[11px] tracking-[0.3em] uppercase hover:bg-[#25D366]/5 transition-all duration-700 luxury-glass"
              >
                <MessageCircle className="h-4 w-4" />
                Private Client WhatsApp
              </button>
            </div>

            {/* Scent Notes Editorial Block */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: easeInOutCubic }}
              className="mt-24 pt-24 border-t border-gold/10"
            >
              <p className="text-[10px] tracking-[0.5em] uppercase text-gold mb-12">The Composition</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
                <div>
                  <h4 className="luxury-heading text-xl text-ivory mb-4">Top</h4>
                  <p className="text-xs text-ivory/50 font-light leading-loose">Sparkling opening notes that captivate instantly, offering an immediate sense of prestige.</p>
                </div>
                <div>
                  <h4 className="luxury-heading text-xl text-ivory mb-4">Heart</h4>
                  <p className="text-xs text-ivory/50 font-light leading-loose">The rich core of the fragrance, developing over hours into a complex, emotional bouquet.</p>
                </div>
                <div>
                  <h4 className="luxury-heading text-xl text-ivory mb-4">Base</h4>
                  <p className="text-xs text-ivory/50 font-light leading-loose">Deep, resonant woods and musks that anchor the scent, providing extraordinary 24-hour longevity.</p>
                </div>
              </div>
            </motion.div>

            {/* Additional Luxury Traits */}
            <div className="mt-24 grid grid-cols-1 gap-12">
              <div className="luxury-glass p-12 gold-border-glow group">
                <Clock className="w-8 h-8 text-gold mb-6 group-hover:scale-110 transition-transform duration-700" />
                <h3 className="luxury-heading text-2xl text-ivory mb-4">Enduring Legacy</h3>
                <p className="text-sm text-ivory/60 font-light leading-relaxed">
                  Engineered with the highest concentration of premium oils, ensuring your signature presence remains from dawn until dusk.
                </p>
              </div>
              <div className="luxury-glass p-12 gold-border-glow group">
                <Wind className="w-8 h-8 text-gold mb-6 group-hover:scale-110 transition-transform duration-700" />
                <h3 className="luxury-heading text-2xl text-ivory mb-4">Magnetic Sillage</h3>
                <p className="text-sm text-ivory/60 font-light leading-relaxed">
                  A carefully balanced projection that fills the room with elegance, announcing your arrival without overwhelming the senses.
                </p>
              </div>
            </div>

          </motion.div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <section className="py-40 bg-black relative border-t border-gold/10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold/5 via-transparent to-transparent pointer-events-none" />
          <div className="mx-auto max-w-screen-2xl px-6 lg:px-12 relative z-10">
            <h2 className="text-4xl md:text-5xl luxury-title text-ivory mb-20 text-center">
              Explore The Rest
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
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
