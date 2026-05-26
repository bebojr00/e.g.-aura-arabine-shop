"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, cubicBezier } from "framer-motion";
import { ShoppingBag, Eye } from "lucide-react";
import type { Product } from "@/lib/products";
import { resolveProductBadges } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import ProductImage from "@/components/product-image";
import LuxuryPrice from "@/components/luxury-price";
import LuxuryBadges from "@/components/luxury-badges";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { addItem } = useCart();
  const badges = resolveProductBadges(product, index);
  const easeInOutCubic = cubicBezier(0.65, 0, 0.35, 1);
  const customEase = cubicBezier(0.2, 0.8, 0.2, 1);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product.id, "product", product.price);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 1, delay: index * 0.15, ease: easeInOutCubic }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      className="group relative luxury-glass rounded-sm overflow-hidden flex flex-col h-full transform transition-all duration-700 hover:shadow-[0_40px_60px_rgba(0,0,0,0.8)]"
    >
      {/* Spotlight Effect */}
      {isHovered && (
        <div 
          className="absolute inset-0 pointer-events-none transition-opacity duration-500 opacity-50 z-0"
          style={{
            background: `radial-gradient(circle 250px at ${mousePosition.x}px ${mousePosition.y}px, rgba(193, 155, 75, 0.15), transparent 80%)`
          }}
        />
      )}

      <Link href={`/shop/${product.id}`} className="flex flex-col h-full relative z-10">
        <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-b from-black/20 to-black/80">
          <motion.div
            animate={{ 
              y: isHovered ? -30 : 0, 
              scale: isHovered ? 1.08 : 1 
            }}
            transition={{ duration: 1, ease: easeInOutCubic }}
            className="w-full h-full"
          >
            <ProductImage
              src={product.image}
              alt={product.name}
              productId={product.id}
              className="object-cover drop-shadow-[0_30px_30px_rgba(0,0,0,0.8)]"
            />
          </motion.div>

          {/* Deep Cinematic lighting overlay on hover */}
          <motion.div
            initial={false}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex items-end justify-center pb-8 gap-6"
          >
            <motion.button
              type="button"
              initial={false}
              animate={{ y: isHovered ? 0 : 30, opacity: isHovered ? 1 : 0 }}
              transition={{ delay: 0.1, duration: 0.6, ease: customEase }}
              onClick={handleAddToCart}
              className="magnetic-button w-14 h-14 bg-gold text-oud-brown rounded-full flex items-center justify-center hover:bg-gold-light transition-colors shadow-[0_0_20px_rgba(193,155,75,0.5)]"
              aria-label="Add to cart"
            >
              <ShoppingBag className="h-6 w-6" />
            </motion.button>
            <motion.span
              initial={false}
              animate={{ y: isHovered ? 0 : 30, opacity: isHovered ? 1 : 0 }}
              transition={{ delay: 0.2, duration: 0.6, ease: customEase }}
              className="magnetic-button w-14 h-14 glass-card border border-gold/30 text-gold rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.5)]"
              aria-hidden
            >
              <Eye className="h-6 w-6" />
            </motion.span>
          </motion.div>

          <div className="absolute top-6 left-6 z-10">
            <LuxuryBadges badges={badges} max={2} />
          </div>
        </div>

        <div className="p-8 flex flex-col flex-grow justify-between bg-black/60 backdrop-blur-xl border-t border-gold/10">
          <div className="space-y-4 text-center">
            <p className="text-[9px] tracking-[0.4em] uppercase text-gold font-medium">
              {product.brand}
            </p>
            <h3 className="luxury-title text-2xl text-foreground group-hover:text-ivory transition-colors line-clamp-1">
              {product.name}
            </h3>
            <p className="text-[11px] text-muted-foreground/80 line-clamp-2 font-light leading-relaxed">
              {product.description}
            </p>
          </div>
          <div className="mt-8 flex justify-center">
            <LuxuryPrice
              price={product.price}
              compareAtPrice={product.compareAtPrice}
              size="lg"
            />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
