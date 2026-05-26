import { productImagePath, giftSetImagePath } from "@/lib/product-image";

export type CollectionId =
  | "150ml"
  | "tobacco"
  | "gift-sets"
  | "black-diamond"
  | "arrogate"
  | "signature";

export type BadgeId =
  | "bestseller_ar"
  | "trend"
  | "sale"
  | "limited_stock"
  | "bestseller"
  | "exclusive"
  | "hurry_ar"
  | "new"
  | "limited";

export interface ProductBadge {
  id: BadgeId;
  label: string;
  labelAr?: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: "men" | "women" | "unisex";
  collection: CollectionId;
  price: number;
  compareAtPrice?: number;
  priceLarge?: number;
  compareAtPriceLarge?: number;
  description: string;
  image: string;
  tags: string[];
  inStock: boolean;
  stock: number;
  badges?: ProductBadge[];
  isLimited?: boolean;
  isBestSeller?: boolean;
  isNew?: boolean;
  isTrending?: boolean;
  isExclusive?: boolean;
}

export interface GiftSet {
  id: string;
  name: string;
  collection: CollectionId;
  price: number;
  compareAtPrice?: number;
  description: string;
  image: string;
  products: string[];
  badges?: ProductBadge[];
  isLimited?: boolean;
}

export interface Collection {
  id: CollectionId;
  name: string;
  nameAr: string;
  description: string;
  salePrice?: number;
  compareAtPrice?: number;
}

export const collections: Collection[] = [
  {
    id: "150ml",
    name: "150ML Perfume Collection",
    nameAr: "مجموعة 150 مل",
    description: "Signature Gulf extrait in generous 150ml presentation.",
    salePrice: 2000,
    compareAtPrice: 2400,
  },
  {
    id: "tobacco",
    name: "Tobacco Collection",
    nameAr: "مجموعة التبغ",
    description: "Rich tobacco accords — bold, smoky, unforgettable.",
    salePrice: 1900,
    compareAtPrice: 2500,
  },
  {
    id: "gift-sets",
    name: "Gift Sets & Box Collection",
    nameAr: "علب الهدايا",
    description: "Curated luxury boxes for gifting and discovery.",
    salePrice: 3500,
    compareAtPrice: 4000,
  },
  {
    id: "black-diamond",
    name: "Black Diamond Collection",
    nameAr: "مجموعة Black Diamond",
    description: "Dark, precious, and intensely luxurious.",
    salePrice: 2000,
    compareAtPrice: 2400,
  },
  {
    id: "arrogate",
    name: "Arrogate Collection",
    nameAr: "مجموعة Arrogate",
    description: "Avant-garde niche statements for the bold.",
    salePrice: 2000,
    compareAtPrice: 2400,
  },
  {
    id: "signature",
    name: "Signature Collection",
    nameAr: "التوقيع",
    description: "Timeless ESSEN favourites beyond the sale edit.",
  },
];

const img = productImagePath;

const ROTATING_BADGES: ProductBadge[] = [
  { id: "bestseller_ar", label: "Bestseller", labelAr: "الأكثر مبيعاً" },
  { id: "trend", label: "Trending", labelAr: "تريند" },
  { id: "exclusive", label: "Exclusive", labelAr: "حصري" },
  { id: "hurry_ar", label: "Limited Offer", labelAr: "الحق العرض" },
];

export const products: Product[] = [
  // —— 150ML Collection ——
  {
    id: "wild-colt-assaf",
    name: "Wild Colt",
    brand: "ASSAF",
    category: "men",
    collection: "150ml",
    price: 2000,
    compareAtPrice: 2400,
    description:
      "Youthful masculine fragrance with strong projection. Energetic and confident — now in 150ml.",
    image: img("wild-colt-assaf"),
    tags: ["150ml", "masculine", "projection"],
    inStock: true,
    stock: 16,
    isNew: true,
    isTrending: true,
  },
  {
    id: "arrogate-comete-assaf",
    name: "Arrogate Comète",
    brand: "ASSAF",
    category: "men",
    collection: "150ml",
    price: 2000,
    compareAtPrice: 2400,
    description:
      "Elegant fresh luxury scent with stellar notes. A cosmic experience in 150ml.",
    image: img("arrogate-comete-assaf"),
    tags: ["150ml", "elegant", "fresh"],
    inStock: true,
    stock: 10,
  },
  {
    id: "gris-erik-luxury-assaf",
    name: "Gris Erik Luxury",
    brand: "ASSAF",
    category: "unisex",
    collection: "150ml",
    price: 2000,
    compareAtPrice: 2400,
    description:
      "High-end niche fragrance with luxurious character. An olfactory masterpiece.",
    image: img("gris-erik-luxury-assaf"),
    tags: ["150ml", "niche", "luxury"],
    inStock: true,
    stock: 5,
    isLimited: true,
    isBestSeller: true,
    isExclusive: true,
  },
  {
    id: "noble-assaf",
    name: "Noble",
    brand: "ASSAF",
    category: "unisex",
    collection: "150ml",
    price: 2000,
    compareAtPrice: 2400,
    description:
      "Premium everyday luxury fragrance. Sophisticated simplicity in 150ml.",
    image: img("noble-assaf"),
    tags: ["150ml", "everyday", "premium"],
    inStock: true,
    stock: 22,
    isBestSeller: true,
  },
  {
    id: "frankel-silver-elixir-assaf",
    name: "Frankel Silver Elixir",
    brand: "ASSAF",
    category: "men",
    collection: "150ml",
    price: 2000,
    compareAtPrice: 2400,
    description:
      "Elegant long-lasting masculine fragrance with silver accords.",
    image: img("frankel-silver-elixir-assaf"),
    tags: ["150ml", "silver", "long-lasting"],
    inStock: true,
    stock: 9,
  },
  {
    id: "rebel-enable-assaf",
    name: "Rebel Enable",
    brand: "ASSAF",
    category: "men",
    collection: "150ml",
    price: 2000,
    compareAtPrice: 2400,
    description:
      "Bold luxury fragrance with premium presentation. For those who dare to stand out.",
    image: img("rebel-enable-assaf"),
    tags: ["150ml", "bold", "luxury"],
    inStock: true,
    stock: 6,
    isLimited: true,
    isNew: true,
  },
  // —— Tobacco Collection ——
  {
    id: "wild-colt-tobacco",
    name: "Wild Colt Tobacco",
    brand: "ASSAF",
    category: "men",
    collection: "tobacco",
    price: 1900,
    compareAtPrice: 2500,
    description:
      "Wild Colt reimagined with deep tobacco richness and smoky warmth.",
    image: img("wild-colt-tobacco"),
    tags: ["tobacco", "smoky", "bold"],
    inStock: true,
    stock: 11,
    isTrending: true,
  },
  {
    id: "spanish-tobacco-ibraq",
    name: "Spanish Tobacco",
    brand: "IBRAQ",
    category: "men",
    collection: "tobacco",
    price: 1900,
    compareAtPrice: 2500,
    description:
      "Strong tobacco fragrance with luxurious depth and high performance.",
    image: img("spanish-tobacco-ibraq"),
    tags: ["tobacco", "luxury", "long-lasting"],
    inStock: true,
    stock: 12,
    isLimited: true,
    isBestSeller: true,
  },
  {
    id: "greek-tobacco",
    name: "Greek Tobacco",
    brand: "IBRAQ",
    category: "men",
    collection: "tobacco",
    price: 1900,
    compareAtPrice: 2500,
    description:
      "Mediterranean tobacco leaf with resinous depth and golden amber.",
    image: img("greek-tobacco"),
    tags: ["tobacco", "amber", "warm"],
    inStock: true,
    stock: 14,
  },
  {
    id: "dominican-tobacco",
    name: "Dominican Tobacco",
    brand: "IBRAQ",
    category: "men",
    collection: "tobacco",
    price: 1900,
    compareAtPrice: 2500,
    description:
      "Caribbean cigar heritage — sweet tobacco, cedar, and dark honey.",
    image: img("dominican-tobacco"),
    tags: ["tobacco", "cedar", "cigar"],
    inStock: true,
    stock: 8,
    isLimited: true,
  },
  {
    id: "brazilian-tobacco",
    name: "Brazilian Tobacco",
    brand: "IBRAQ",
    category: "men",
    collection: "tobacco",
    price: 1900,
    compareAtPrice: 2500,
    description:
      "Exotic Brazilian tobacco with cocoa undertones and velvety smoke.",
    image: img("brazilian-tobacco"),
    tags: ["tobacco", "cocoa", "exotic"],
    inStock: true,
    stock: 10,
  },
  {
    id: "cuban-tobacco",
    name: "Cuban Tobacco",
    brand: "IBRAQ",
    category: "men",
    collection: "tobacco",
    price: 1900,
    compareAtPrice: 2500,
    description:
      "Legendary Cuban tobacco accord — rich, opulent, and commanding.",
    image: img("cuban-tobacco"),
    tags: ["tobacco", "opulent", "classic"],
    inStock: true,
    stock: 7,
    isExclusive: true,
  },
  // —— Black Diamond ——
  {
    id: "black-diamond-incense",
    name: "Black Diamond Incense",
    brand: "Diamond Collection",
    category: "unisex",
    collection: "black-diamond",
    price: 2000,
    compareAtPrice: 2400,
    description:
      "Sacred incense and oud wrapped in black diamond darkness.",
    image: img("black-diamond-incense"),
    tags: ["incense", "oud", "dark"],
    inStock: true,
    stock: 6,
    isLimited: true,
    isExclusive: true,
  },
  {
    id: "blue-diamond-aqua",
    name: "Blue Diamond Aqua",
    brand: "Diamond Collection",
    category: "men",
    collection: "black-diamond",
    price: 2000,
    compareAtPrice: 2400,
    description:
      "Fresh aquatic masculine fragrance with strong projection.",
    image: img("blue-diamond-aqua"),
    tags: ["aquatic", "fresh", "masculine"],
    inStock: true,
    stock: 18,
    isBestSeller: true,
  },
  // —— Arrogate ——
  {
    id: "arrogate-addict",
    name: "Arrogate Addict",
    brand: "Arrogate",
    category: "unisex",
    collection: "arrogate",
    price: 2000,
    compareAtPrice: 2400,
    description:
      "Intoxicating niche blend — addictive, daring, unforgettable.",
    image: img("arrogate-addict"),
    tags: ["niche", "addictive", "bold"],
    inStock: true,
    stock: 8,
    isTrending: true,
  },
  {
    id: "arrogate-collection",
    name: "Arrogate Collection",
    brand: "Arrogate",
    category: "unisex",
    collection: "arrogate",
    price: 2000,
    compareAtPrice: 2400,
    description:
      "The definitive Arrogate statement — avant-garde luxury in a bottle.",
    image: img("arrogate-collection"),
    tags: ["collection", "avant-garde"],
    inStock: true,
    stock: 5,
    isLimited: true,
  },
  {
    id: "frog-blue",
    name: "Frog Blue",
    brand: "Arrogate",
    category: "men",
    collection: "arrogate",
    price: 2000,
    compareAtPrice: 2400,
    description:
      "Electric blue freshness with unexpected depth — a modern icon.",
    image: img("frog-blue"),
    tags: ["fresh", "blue", "modern"],
    inStock: true,
    stock: 12,
    isNew: true,
  },
  // —— Signature (full price) ——
  {
    id: "balas-rose-ibraq",
    name: "Balas Rose",
    brand: "IBRAQ",
    category: "unisex",
    collection: "signature",
    price: 2000,
    priceLarge: 3800,
    description:
      "Elegant rose fragrance suitable for gifts and special occasions.",
    image: img("balas-rose-ibraq"),
    tags: ["rose", "elegant", "gift"],
    inStock: true,
    stock: 8,
    isBestSeller: true,
  },
  {
    id: "pink-diamond-sakura",
    name: "Pink Diamond Sakura",
    brand: "Diamond Collection",
    category: "women",
    collection: "signature",
    price: 2000,
    priceLarge: 2800,
    description:
      "Soft feminine floral luxury scent with delicate cherry blossom notes.",
    image: img("pink-diamond-sakura"),
    tags: ["floral", "feminine", "sakura"],
    inStock: true,
    stock: 15,
    isNew: true,
  },
  {
    id: "nude-coral-diamond",
    name: "Nude Coral Diamond",
    brand: "Diamond Collection",
    category: "women",
    collection: "signature",
    price: 2000,
    priceLarge: 2600,
    description:
      "Fresh summer feminine fragrance with coral and aquatic notes.",
    image: img("nude-coral-diamond"),
    tags: ["fresh", "summer", "feminine"],
    inStock: true,
    stock: 20,
  },
  {
    id: "white-regent-diamond",
    name: "White Regent Diamond",
    brand: "Diamond Collection",
    category: "unisex",
    collection: "signature",
    price: 2000,
    priceLarge: 3300,
    description:
      "Clean luxurious scent suitable for daily use and evenings.",
    image: img("white-regent-diamond"),
    tags: ["clean", "versatile", "elegant"],
    inStock: true,
    stock: 14,
  },
];

export const giftSets: GiftSet[] = [
  {
    id: "diamond-collection-box",
    name: "Diamond Collection",
    collection: "gift-sets",
    price: 3500,
    compareAtPrice: 4000,
    description:
      "Our finest Diamond fragrances in a luxurious presentation box.",
    image: giftSetImagePath("diamond-collection-box"),
    products: ["blue-diamond-aqua", "black-diamond-incense", "pink-diamond-sakura"],
    isLimited: true,
    badges: [{ id: "sale", label: "Sale", labelAr: "تخفيض" }],
  },
  {
    id: "match-discovery-set",
    name: "MATCH Collection",
    collection: "gift-sets",
    price: 3500,
    compareAtPrice: 4000,
    description:
      "Discover your perfect scent with our curated bestselling edit.",
    image: giftSetImagePath("match-discovery-set"),
    products: ["spanish-tobacco-ibraq", "balas-rose-ibraq", "noble-assaf"],
    isLimited: true,
    badges: [{ id: "bestseller_ar", label: "Bestseller", labelAr: "الأكثر مبيعاً" }],
  },
  {
    id: "assaf-bakhur-collection",
    name: "Bakhur Collection",
    collection: "gift-sets",
    price: 3500,
    compareAtPrice: 4000,
    description:
      "Traditional Arabian bakhur paired with signature ASSAF fragrances.",
    image: giftSetImagePath("assaf-bakhur-collection"),
    products: ["gris-erik-luxury-assaf", "noble-assaf", "wild-colt-assaf"],
    badges: [{ id: "exclusive", label: "Exclusive", labelAr: "حصري" }],
  },
];

export const categories = [
  { id: "all", name: "All", nameAr: "الكل" },
  { id: "men", name: "Men", nameAr: "رجال" },
  { id: "women", name: "Women", nameAr: "نساء" },
  { id: "unisex", name: "Unisex", nameAr: "للجنسين" },
] as const;

export const brands = [
  { id: "all", name: "All Brands" },
  { id: "ibraq", name: "IBRAQ" },
  { id: "assaf", name: "ASSAF" },
  { id: "diamond", name: "Diamond Collection" },
  { id: "arrogate", name: "Arrogate" },
] as const;

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getGiftSetById(id: string): GiftSet | undefined {
  return giftSets.find((g) => g.id === id);
}

export function getCollectionById(id: CollectionId): Collection | undefined {
  return collections.find((c) => c.id === id);
}

export function getProductsByCollection(collectionId: CollectionId): Product[] {
  return products.filter((p) => p.collection === collectionId);
}

export function getBestSellers(): Product[] {
  return products.filter((p) => p.isBestSeller);
}

export function getNewArrivals(): Product[] {
  return products.filter((p) => p.isNew);
}

export function getLimitedEdition(): Product[] {
  return products.filter((p) => p.isLimited);
}

export function getOnSaleProducts(): Product[] {
  return products.filter((p) => p.compareAtPrice && p.compareAtPrice > p.price);
}

export function getProductsByCategory(
  category: "men" | "women" | "unisex"
): Product[] {
  return products.filter((p) => p.category === category);
}

export function getProductsByBrand(brand: string): Product[] {
  return products.filter((p) =>
    p.brand.toLowerCase().includes(brand.toLowerCase())
  );
}

/** Resolve display badges: explicit + auto sale/stock + rotating marketing */
export function resolveProductBadges(
  product: Product,
  cardIndex = 0,
  showRotating = true
): ProductBadge[] {
  const result: ProductBadge[] = [...(product.badges ?? [])];

  if (product.compareAtPrice && product.compareAtPrice > product.price) {
    if (!result.some((b) => b.id === "sale")) {
      result.push({ id: "sale", label: "Sale", labelAr: "تخفيض" });
    }
  }
  if (product.isBestSeller && !result.some((b) => b.id === "bestseller_ar")) {
    result.push({
      id: "bestseller_ar",
      label: "Bestseller",
      labelAr: "الأكثر مبيعاً",
    });
  }
  if (product.isTrending && !result.some((b) => b.id === "trend")) {
    result.push({ id: "trend", label: "Trending", labelAr: "تريند" });
  }
  if (product.isExclusive && !result.some((b) => b.id === "exclusive")) {
    result.push({ id: "exclusive", label: "Exclusive", labelAr: "حصري" });
  }
  if (product.isNew && !result.some((b) => b.id === "new")) {
    result.push({ id: "new", label: "New", labelAr: "جديد" });
  }
  if (product.isLimited && !result.some((b) => b.id === "limited")) {
    result.push({ id: "limited", label: "Limited", labelAr: "محدود" });
  }
  if (product.stock > 0 && product.stock <= 10) {
    result.push({
      id: "limited_stock",
      label: `Only ${product.stock} left`,
      labelAr: "كمية محدودة",
    });
  }

  if (showRotating && result.length < 3) {
    const rotate = ROTATING_BADGES[cardIndex % ROTATING_BADGES.length];
    if (!result.some((b) => b.id === rotate.id)) {
      result.push(rotate);
    }
  }

  return result.slice(0, 4);
}

export function getCompareAtForPrice(
  product: Product,
  selectedPrice: number
): number | undefined {
  if (product.compareAtPrice && selectedPrice === product.price) {
    return product.compareAtPrice;
  }
  if (
    product.compareAtPriceLarge &&
    product.priceLarge &&
    selectedPrice === product.priceLarge
  ) {
    return product.compareAtPriceLarge;
  }
  return undefined;
}

/** Local path for optional override in /public/products/ */
export function getLocalProductImagePath(id: string): string {
  return productImagePath(id);
}

export function getLocalGiftSetImagePath(id: string): string {
  return giftSetImagePath(id);
}
