const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp"] as const;

export const PLACEHOLDER_IMAGE = "/placeholder.svg";
export const HERO_IMAGE = "/products/hero.jpg";

function withExtensions(basePath: string): string[] {
  return IMAGE_EXTENSIONS.map((ext) => `${basePath}${ext}`);
}

/** Primary local path for a product image */
export function productImagePath(id: string): string {
  return `/products/${id}.jpg`;
}

/** Primary local path for a gift set image */
export function giftSetImagePath(id: string): string {
  return `/products/gift-sets/${id}.jpg`;
}

/** Fallback chain tried by ProductImage when the primary path 404s */
export function productImageCandidates(id: string): string[] {
  return withExtensions(`/products/${id}`);
}

export function giftSetImageCandidates(id: string): string[] {
  return withExtensions(`/products/gift-sets/${id}`);
}
