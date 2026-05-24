"use client";

import { motion } from "framer-motion";
import type { ProductBadge } from "@/data/products";

const badgeStyles: Record<string, string> = {
  bestseller_ar:
    "bg-gold/90 text-oud-brown border-gold/50 luxury-badge-glow",
  trend: "bg-accent/20 text-accent-foreground border-accent/40 luxury-badge-glow",
  sale: "bg-destructive/90 text-destructive-foreground border-destructive/50 luxury-badge-glow",
  limited_stock:
    "bg-black/40 text-gold border-gold/50 backdrop-blur-md animate-badge-pulse",
  bestseller:
    "bg-ivory/90 text-oud-brown border-ivory/30 luxury-badge-glow",
  exclusive:
    "bg-black/60 text-gold border-gold/60 backdrop-blur-md luxury-badge-glow",
  hurry_ar:
    "bg-destructive/80 text-white border-destructive luxury-badge-glow animate-badge-pulse",
  new: "bg-gold/90 text-oud-brown border-gold/50",
  limited: "bg-destructive/90 text-destructive-foreground border-destructive/50",
};

interface LuxuryBadgesProps {
  badges: ProductBadge[];
  max?: number;
  className?: string;
  animate?: boolean;
}

function BadgeLabel({
  badge,
  style,
  animate,
  index,
}: {
  badge: ProductBadge;
  style: string;
  animate: boolean;
  index: number;
}) {
  const label = badge.label;
  const className = `inline-flex w-fit px-3 py-1.5 text-[9px] sm:text-[10px] tracking-[0.2em] uppercase border ${style} font-medium`;

  if (!animate) {
    return <span className={className}>{label}</span>;
  }

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
      whileHover={{ scale: 1.05 }}
      className={className}
    >
      {label}
    </motion.span>
  );
}

export default function LuxuryBadges({
  badges,
  max = 3,
  className = "",
  animate = true,
}: LuxuryBadgesProps) {
  const visible = badges.slice(0, max);

  return (
    <div className={`flex flex-col gap-2 z-10 ${className}`}>
      {visible.map((badge, i) => (
        <BadgeLabel
          key={`${badge.id}-${i}`}
          badge={badge}
          style={badgeStyles[badge.id] ?? badgeStyles.exclusive}
          animate={animate}
          index={i}
        />
      ))}
    </div>
  );
}
