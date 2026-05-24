export function getDiscountPercent(
  price: number,
  compareAtPrice?: number
): number | null {
  if (!compareAtPrice || compareAtPrice <= price) return null;
  return Math.round(((compareAtPrice - price) / compareAtPrice) * 100);
}

export function isOnSale(compareAtPrice?: number, price?: number): boolean {
  return !!compareAtPrice && !!price && compareAtPrice > price;
}
