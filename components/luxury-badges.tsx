"use client";

import { motion } from "framer-motion";
import type { ProductBadge } from "@/data/products";

const badgeStyles: Record<string, string> = {
  bestseller_ar:
    "bg-primary/90 text-primary-foreground border-primary/50 luxury-badge-glow",
  trend: "bg-accent/20 text-accent border-accent/40 luxury-badge-glow",
  sale: "bg-destructive/90 text-destructive-foreground border-destructive/50 luxury-badge-glow",
  limited_stock:
    "bg-background/90 text-primary border-primary/50 backdrop-blur-md",
  bestseller:
    "bg-foreground/90 text-background border-foreground/30 luxury-badge-glow",
  exclusive:
    "bg-card text-primary border-primary/60 backdrop-blur-md luxury-badge-glow",
  hurry_ar:
    "bg-destructive/80 text-white border-destructive luxury-badge-glow animate-badge-pulse",
  new: "bg-primary/90 text-primary-foreground border-primary/50",
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
  const label = badge.labelAr
    ? `${badge.labelAr}${badge.label !== badge.labelAr ? ` · ${badge.label}` : ""}`
    : badge.label;
  const className = `inline-flex w-fit px-2.5 py-1 text-[9px] sm:text-[10px] tracking-[0.15em] uppercase border ${style}`;

  if (!animate) {
    return <span className={className}>{label}</span>;
  }

  return (
    <motion.span
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
      whileHover={{ scale: 1.04 }}
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
    <div className={`flex flex-col gap-1.5 z-10 ${className}`}>
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
