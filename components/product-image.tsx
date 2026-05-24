"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  PLACEHOLDER_IMAGE,
  productImageCandidates,
  giftSetImageCandidates,
} from "@/lib/product-image";

interface ProductImageProps {
  src: string;
  alt: string;
  productId?: string;
  isGiftSet?: boolean;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  containerClassName?: string;
  priority?: boolean;
  sizes?: string;
}

export default function ProductImage({
  src,
  alt,
  productId,
  isGiftSet = false,
  fill = true,
  width,
  height,
  className,
  containerClassName,
  priority,
  sizes = "(max-width: 768px) 100vw, 33vw",
}: ProductImageProps) {
  const fallbacks = useMemo(() => {
    const candidates = productId
      ? isGiftSet
        ? giftSetImageCandidates(productId)
        : productImageCandidates(productId)
      : [];
    return [...new Set([src, ...candidates, PLACEHOLDER_IMAGE])];
  }, [src, productId, isGiftSet]);

  const [fallbackIndex, setFallbackIndex] = useState(0);
  const currentSrc = fallbacks[fallbackIndex] ?? PLACEHOLDER_IMAGE;

  useEffect(() => {
    setFallbackIndex(0);
  }, [src, productId, isGiftSet]);

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-card",
        fill && "w-full h-full",
        containerClassName
      )}
    >
      <Image
        src={currentSrc}
        alt={alt}
        fill={fill && !width}
        width={width}
        height={height}
        className={className}
        priority={priority}
        sizes={sizes}
        onError={() => {
          setFallbackIndex((i) => (i < fallbacks.length - 1 ? i + 1 : i));
        }}
      />
    </div>
  );
}
