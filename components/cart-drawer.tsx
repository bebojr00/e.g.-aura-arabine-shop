"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ShoppingBag, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/format";
import { buildCartOrderMessage, openWhatsApp } from "@/lib/whatsapp";
import ProductImage from "@/components/product-image";

export default function CartDrawer() {
  const {
    items,
    isOpen,
    setIsOpen,
    removeItem,
    updateQuantity,
    getItemCount,
    getTotal,
    getItemDetails,
    isHydrated,
  } = useCart();

  const itemCount = isHydrated ? getItemCount() : 0;
  const total = isHydrated ? getTotal() : 0;

  const handleWhatsAppOrder = () => {
    if (items.length === 0) return;
    openWhatsApp(buildCartOrderMessage(items, total));
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 left-0 bottom-0 z-50 w-full max-w-md bg-background border-r border-border/50 flex flex-col shadow-2xl"
            role="dialog"
            aria-label="سلة التسوق"
          >
            <div className="flex items-center justify-between p-6 border-b border-border/50">
              <div className="flex items-center gap-3">
                <ShoppingBag className="h-5 w-5 text-primary" />
                <span className="text-lg font-serif tracking-wider">
                  السلة ({itemCount})
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-foreground hover:text-primary transition-colors"
                aria-label="إغلاق"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {!isHydrated ? (
                <div className="space-y-4">
                  {[1, 2].map((i) => (
                    <div
                      key={i}
                      className="h-24 bg-muted/30 animate-pulse rounded"
                    />
                  ))}
                </div>
              ) : items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <ShoppingBag className="h-16 w-16 text-muted-foreground/30 mb-4" />
                  <p className="text-muted-foreground mb-6">سلتك فارغة</p>
                  <Link
                    href="/shop"
                    onClick={() => setIsOpen(false)}
                    className="px-6 py-3 border border-primary text-primary text-xs tracking-[0.2em] uppercase hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    تسوق الآن
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => {
                    const details = getItemDetails(item);
                    if (!details) return null;
                    const isGiftSet = item.type === "giftset";

                    return (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex gap-4"
                      >
                        <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden">
                          <ProductImage
                            src={details.image}
                            alt={details.name}
                            productId={item.id}
                            isGiftSet={isGiftSet}
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-serif text-foreground truncate">
                            {details.name}
                          </h4>
                          {"brand" in details && (
                            <p className="text-sm text-muted-foreground">
                              {details.brand}
                            </p>
                          )}
                          <p className="text-primary mt-1 text-sm">
                            {formatPrice(item.selectedPrice * item.quantity)}
                          </p>
                          <div className="flex items-center gap-3 mt-2">
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="w-8 h-8 border border-border flex items-center justify-center hover:border-primary transition-colors"
                              aria-label="تقليل"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="text-sm w-8 text-center">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="w-8 h-8 border border-border flex items-center justify-center hover:border-primary transition-colors"
                              aria-label="زيادة"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => removeItem(item.id)}
                              className="mr-auto text-xs text-muted-foreground hover:text-destructive transition-colors"
                            >
                              حذف
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>

            {isHydrated && items.length > 0 && (
              <div className="border-t border-border/50 p-6 space-y-4">
                <div className="flex items-center justify-between text-lg">
                  <span className="text-muted-foreground">المجموع</span>
                  <span className="font-serif text-foreground">
                    {formatPrice(total)}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  الشحن يُحدد عند التأكيد عبر واتساب
                </p>
                <div className="space-y-3">
                  <Link
                    href="/checkout"
                    onClick={() => setIsOpen(false)}
                    className="block w-full py-4 border border-border text-center text-xs tracking-[0.2em] uppercase hover:border-primary transition-colors"
                  >
                    إتمام الطلب
                  </Link>
                  <button
                    type="button"
                    onClick={handleWhatsAppOrder}
                    className="flex items-center justify-center gap-2 w-full py-4 bg-green-600 text-white text-xs tracking-[0.2em] uppercase hover:bg-green-700 transition-colors"
                  >
                    <MessageCircle className="h-5 w-5" />
                    طلب عبر واتساب
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
