"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, X, ChevronDown } from "lucide-react";
import ProductCard from "@/components/product-card";
import CollectionSection from "@/components/shop/collection-section";
import {
  products,
  collections,
  categories,
  brands,
  getProductsByCollection,
  type CollectionId,
} from "@/lib/products";

type SortOption = "featured" | "price-low" | "price-high" | "name";

function ShopContentInner() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState(
    () => searchParams.get("q") ?? ""
  );
  const [selectedCategory, setSelectedCategory] = useState(
    () => searchParams.get("category") ?? "all"
  );
  const [selectedBrand, setSelectedBrand] = useState(
    () => searchParams.get("brand") ?? "all"
  );
  const [selectedCollection, setSelectedCollection] = useState(
    () => searchParams.get("collection") ?? "all"
  );
  const [sortBy, setSortBy] = useState<SortOption>(
    () => (searchParams.get("sort") as SortOption) || "featured"
  );
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"collections" | "grid">(
    () => (searchParams.get("view") === "grid" ? "grid" : "collections")
  );

  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (selectedCategory !== "all") params.set("category", selectedCategory);
    if (selectedBrand !== "all") params.set("brand", selectedBrand);
    if (selectedCollection !== "all")
      params.set("collection", selectedCollection);
    if (sortBy !== "featured") params.set("sort", sortBy);
    if (viewMode === "grid") params.set("view", "grid");
    const qs = params.toString();
    router.replace(qs ? `/shop?${qs}` : "/shop", { scroll: false });
  }, [
    searchQuery,
    selectedCategory,
    selectedBrand,
    selectedCollection,
    sortBy,
    viewMode,
    router,
  ]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (selectedBrand !== "all") {
      result = result.filter((p) =>
        p.brand.toLowerCase().includes(selectedBrand.toLowerCase())
      );
    }

    if (selectedCollection !== "all") {
      result = result.filter((p) => p.collection === selectedCollection);
    }

    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        result.sort((a, b) => {
          if (a.isBestSeller && !b.isBestSeller) return -1;
          if (!a.isBestSeller && b.isBestSeller) return 1;
          if (a.isNew && !b.isNew) return -1;
          if (!a.isNew && b.isNew) return 1;
          return 0;
        });
    }

    return result;
  }, [
    searchQuery,
    selectedCategory,
    selectedBrand,
    selectedCollection,
    sortBy,
  ]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedBrand("all");
    setSelectedCollection("all");
    setSortBy("featured");
  };

  const hasActiveFilters =
    searchQuery ||
    selectedCategory !== "all" ||
    selectedBrand !== "all" ||
    selectedCollection !== "all";

  const showCollectionRails =
    viewMode === "collections" &&
    !hasActiveFilters &&
    selectedCollection === "all";

  const filterSidebar = (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm tracking-widest uppercase text-foreground mb-4">
          بحث
        </h3>
        <div className="relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="ابحث عن عطر..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-card border border-border py-3 pr-10 pl-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
          />
        </div>
      </div>

      <div>
        <h3 className="text-sm tracking-widest uppercase text-foreground mb-4">
          التشكيلة
        </h3>
        <div className="space-y-2">
          <button
            type="button"
            onClick={() => setSelectedCollection("all")}
            className={`block w-full text-right py-2 px-3 text-sm transition-colors ${
              selectedCollection === "all"
                ? "bg-primary/10 text-primary border-r-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            الكل
          </button>
          {collections.map((col) => (
            <button
              key={col.id}
              type="button"
              onClick={() => {
                setSelectedCollection(col.id);
                setViewMode("grid");
              }}
              className={`block w-full text-right py-2 px-3 text-sm transition-colors ${
                selectedCollection === col.id
                  ? "bg-primary/10 text-primary border-r-2 border-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {col.nameAr}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm tracking-widest uppercase text-foreground mb-4">
          الفئة
        </h3>
        <div className="space-y-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`block w-full text-right py-2 px-3 text-sm transition-colors ${
                selectedCategory === cat.id
                  ? "bg-primary/10 text-primary border-r-2 border-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat.nameAr}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm tracking-widest uppercase text-foreground mb-4">
          العلامة
        </h3>
        <div className="space-y-2">
          {brands.map((brand) => (
            <button
              key={brand.id}
              type="button"
              onClick={() => setSelectedBrand(brand.id)}
              className={`block w-full text-right py-2 px-3 text-sm transition-colors ${
                selectedBrand === brand.id
                  ? "bg-primary/10 text-primary border-r-2 border-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {brand.name}
            </button>
          ))}
        </div>
      </div>

      {hasActiveFilters && (
        <button
          type="button"
          onClick={clearFilters}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <X className="h-4 w-4" />
          مسح الفلاتر
        </button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <section className="bg-card border-b border-border/50">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <p className="text-xs tracking-[0.35em] uppercase text-primary mb-3">
              أورا عربين
            </p>
            <h1 className="text-4xl sm:text-5xl font-serif font-light text-foreground mb-4">
              المتجر
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              عطور خليجية فاخرة — تشكيلات محدودة، عروض حصرية، وطلب مباشر عبر
              واتساب.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-28">{filterSidebar}</div>
          </aside>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <button
                type="button"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 border border-border text-sm"
              >
                <SlidersHorizontal className="h-4 w-4" />
                فلاتر
              </button>

              <div className="flex items-center gap-2 text-sm">
                <button
                  type="button"
                  onClick={() => setViewMode("collections")}
                  className={`px-3 py-1.5 border transition-colors ${
                    viewMode === "collections"
                      ? "border-primary text-primary"
                      : "border-border text-muted-foreground"
                  }`}
                >
                  تشكيلات
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  className={`px-3 py-1.5 border transition-colors ${
                    viewMode === "grid"
                      ? "border-primary text-primary"
                      : "border-border text-muted-foreground"
                  }`}
                >
                  شبكة
                </button>
              </div>

              <div className="flex items-center gap-4 mr-auto">
                <span className="text-sm text-muted-foreground hidden sm:block">
                  {filteredProducts.length} منتج
                </span>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="appearance-none bg-card border border-border py-2 pl-4 pr-10 text-sm focus:outline-none focus:border-primary cursor-pointer"
                  >
                    <option value="featured">مميز</option>
                    <option value="price-low">السعر: الأقل</option>
                    <option value="price-high">السعر: الأعلى</option>
                    <option value="name">الاسم</option>
                  </select>
                  <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>
            </div>

            <AnimatePresence>
              {isFilterOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="lg:hidden mb-8 p-6 bg-card border border-border overflow-hidden"
                >
                  {filterSidebar}
                </motion.div>
              )}
            </AnimatePresence>

            {showCollectionRails ? (
              <div>
                {collections
                  .filter((c) => c.id !== "gift-sets")
                  .map((collection, index) => (
                    <CollectionSection
                      key={collection.id}
                      collection={collection}
                      products={getProductsByCollection(
                        collection.id as CollectionId
                      )}
                      index={index}
                    />
                  ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredProducts.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-muted-foreground mb-4">
                  لا توجد منتجات تطابق بحثك.
                </p>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-primary hover:text-primary/80 transition-colors text-sm tracking-widest uppercase"
                >
                  مسح الفلاتر
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ShopContent() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[50vh] flex items-center justify-center">
          <div className="h-10 w-10 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        </div>
      }
    >
      <ShopContentInner />
    </Suspense>
  );
}
