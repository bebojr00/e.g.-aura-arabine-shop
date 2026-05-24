"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Eye } from "lucide-react";
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
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addItem } = useCart();
  const badges = resolveProductBadges(product, index);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product.id, "product", product.price);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      <Link href={`/shop/${product.id}`}>
        <div className="relative aspect-[3/4] overflow-hidden">
          <ProductImage
            src={product.image}
            alt={product.name}
            productId={product.id}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />

          <motion.div
            initial={false}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute inset-0 bg-black/45 flex items-center justify-center gap-3"
          >
            <motion.button
              type="button"
              initial={false}
              animate={{ y: isHovered ? 0 : 12, opacity: isHovered ? 1 : 0 }}
              transition={{ delay: 0.05 }}
              onClick={handleAddToCart}
              className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors"
              aria-label="Add to cart"
            >
              <ShoppingBag className="h-5 w-5" />
            </motion.button>
            <motion.span
              initial={false}
              animate={{ y: isHovered ? 0 : 12, opacity: isHovered ? 1 : 0 }}
              transition={{ delay: 0.1 }}
              className="w-12 h-12 bg-foreground text-background rounded-full flex items-center justify-center"
              aria-hidden
            >
              <Eye className="h-5 w-5" />
            </motion.span>
          </motion.div>

          <div className="absolute top-3 left-3 z-10">
            <LuxuryBadges badges={badges} max={2} />
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsWishlisted(!isWishlisted);
            }}
            className="absolute top-3 right-3 z-10 w-10 h-10 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background transition-colors"
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart
              className={`h-5 w-5 transition-colors ${
                isWishlisted ? "fill-primary text-primary" : "text-foreground"
              }`}
            />
          </button>
        </div>

        <div className="mt-4 space-y-2">
          <p className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
            {product.brand}
          </p>
          <h3 className="font-serif text-lg text-foreground group-hover:text-primary transition-colors line-clamp-1">
            {product.name}
          </h3>
          <LuxuryPrice
            price={product.price}
            compareAtPrice={product.compareAtPrice}
            size="sm"
          />
        </div>
      </Link>
    </motion.div>
  );
}
