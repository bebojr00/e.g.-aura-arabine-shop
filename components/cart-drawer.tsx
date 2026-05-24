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
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-background border-l border-gold/10 flex flex-col shadow-2xl cinematic-grain"
            role="dialog"
            aria-label="Shopping Cart"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-gold/5 to-transparent pointer-events-none" />
            
            <div className="flex items-center justify-between p-6 border-b border-gold/10 relative z-10">
              <div className="flex items-center gap-3">
                <ShoppingBag className="h-5 w-5 text-gold" />
                <span className="text-sm tracking-[0.2em] uppercase text-foreground">
                  Cart ({itemCount})
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-muted-foreground hover:text-gold transition-colors"
                aria-label="Close"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 relative z-10">
              {!isHydrated ? (
                <div className="space-y-4">
                  {[1, 2].map((i) => (
                     <div key={i} className="h-24 bg-card animate-pulse border border-border/50" />
                  ))}
                </div>
              ) : items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <ShoppingBag className="h-16 w-16 text-muted-foreground/20 mb-6" />
                  <p className="text-sm tracking-widest uppercase text-muted-foreground mb-8">Your cart is empty</p>
                  <Link
                    href="/shop"
                    onClick={() => setIsOpen(false)}
                    className="luxury-button px-8 py-4 bg-gold text-oud-brown text-[10px] tracking-[0.2em] uppercase hover:bg-gold-light transition-colors shadow-[0_0_15px_rgba(193,155,75,0.2)]"
                  >
                    Discover Fragrances
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
                        className="flex gap-6 glass-card p-4 border border-border/50"
                      >
                        <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden bg-gradient-to-b from-transparent to-black/20">
                          <ProductImage
                            src={details.image}
                            alt={details.name}
                            productId={item.id}
                            isGiftSet={isGiftSet}
                            className="object-cover drop-shadow-xl"
                          />
                        </div>
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div>
                            <h4 className="luxury-heading text-sm text-foreground truncate">
                              {details.name}
                            </h4>
                            {"brand" in details && (
                              <p className="text-[10px] tracking-widest uppercase text-gold mt-1">
                                {details.brand}
                              </p>
                            )}
                            <p className="text-sm font-light text-foreground mt-2">
                              {formatPrice(item.selectedPrice * item.quantity)}
                            </p>
                          </div>
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center gap-3">
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-6 h-6 border border-border flex items-center justify-center hover:border-gold hover:text-gold transition-colors"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="text-xs w-4 text-center">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-6 h-6 border border-border flex items-center justify-center hover:border-gold hover:text-gold transition-colors"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeItem(item.id)}
                              className="text-[10px] uppercase tracking-widest text-muted-foreground hover:text-destructive transition-colors"
                            >
                              Remove
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
              <div className="border-t border-gold/10 p-6 space-y-6 relative z-10 bg-background/50 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">Subtotal</span>
                  <span className="text-lg text-foreground font-light">
                    {formatPrice(total)}
                  </span>
                </div>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground/60 text-center">
                  Shipping calculated via WhatsApp confirmation
                </p>
                <div className="space-y-3">
                  <Link
                    href="/checkout"
                    onClick={() => setIsOpen(false)}
                    className="block w-full py-4 border border-gold text-gold text-center text-xs tracking-[0.2em] uppercase hover:bg-gold/10 transition-colors"
                  >
                    Proceed to Checkout
                  </Link>
                  <button
                    type="button"
                    onClick={handleWhatsAppOrder}
                    className="flex items-center justify-center gap-3 w-full py-4 bg-green-600 text-white text-xs tracking-[0.2em] uppercase hover:bg-green-700 transition-colors shadow-lg"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Order via WhatsApp
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
