"use client";

import { motion } from "framer-motion";
import { formatPrice } from "@/lib/format";
import { getDiscountPercent } from "@/lib/pricing";

interface LuxuryPriceProps {
  price: number;
  compareAtPrice?: number;
  size?: "sm" | "md" | "lg" | "default";
  showBadge?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: {
    current: "text-base",
    old: "text-sm",
    badge: "text-[10px] px-2 py-0.5",
  },
  md: {
    current: "text-lg sm:text-xl",
    old: "text-sm",
    badge: "text-[10px] px-2.5 py-1",
  },
  lg: {
    current: "text-2xl sm:text-3xl",
    old: "text-lg",
    badge: "text-xs px-3 py-1",
  },
  default: {
    current: "text-lg sm:text-xl",
    old: "text-sm",
    badge: "text-[10px] px-2.5 py-1",
  },
};

export default function LuxuryPrice({
  price,
  compareAtPrice,
  size = "md",
  showBadge = true,
  className = "",
}: LuxuryPriceProps) {
  const discount = getDiscountPercent(price, compareAtPrice);
  const onSale = discount !== null;
  const s = sizeClasses[size];

  return (
    <div className={`flex flex-wrap items-center gap-2 sm:gap-3 ${className}`}>
      {onSale && (
        <motion.span
          initial={{ opacity: 0, x: -6 }}
          animate={{ opacity: 1, x: 0 }}
          className={`line-through text-muted-foreground/80 decoration-muted-foreground/60 ${s.old}`}
        >
          {formatPrice(compareAtPrice!)}
        </motion.span>
      )}
      <motion.span
        key={price}
        initial={onSale ? { scale: 0.95, opacity: 0 } : false}
        animate={{ scale: 1, opacity: 1 }}
        className={`font-medium tracking-wide ${
          onSale ? "text-primary gold-gradient-text" : "text-primary"
        } ${s.current}`}
      >
        {formatPrice(price)}
      </motion.span>
      {onSale && showBadge && discount !== null && (
        <motion.span
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={`luxury-sale-badge ${s.badge}`}
        >
          −{discount}%
        </motion.span>
      )}
    </div>
  );
}
