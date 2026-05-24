"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ShoppingBag, MessageCircle } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/format";
import {
  FREE_SHIPPING_THRESHOLD_EGP,
  SHIPPING_FEE_EGP,
} from "@/lib/constants";
import { buildCartOrderMessage, openWhatsApp } from "@/lib/whatsapp";
import ProductImage from "@/components/product-image";
import LuxuryPrice from "@/components/luxury-price";

export function CheckoutContent() {
  const { items, getTotal, getItemDetails, isHydrated, clearCart } = useCart();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  const subtotal = isHydrated ? getTotal() : 0;
  const shipping =
    subtotal >= FREE_SHIPPING_THRESHOLD_EGP ? 0 : SHIPPING_FEE_EGP;
  const total = subtotal + shipping;

  const handleWhatsAppCheckout = () => {
    if (!name.trim() || !phone.trim() || !address.trim()) return;
    const message = buildCartOrderMessage(items, subtotal, {
      name: name.trim(),
      phone: phone.trim(),
      address: address.trim(),
      notes: notes.trim() || undefined,
    });
    const withShipping = [
      message,
      "",
      `الشحن: ${shipping === 0 ? "مجاني" : formatPrice(shipping)}`,
      `الإجمالي النهائي: ${formatPrice(total)}`,
    ].join("\n");
    openWhatsApp(withShipping);
  };

  if (!isHydrated) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center pt-24">
        <div className="h-10 w-10 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center pt-24 pb-16">
        <ShoppingBag className="h-16 w-16 text-muted-foreground/30 mb-6" />
        <h1 className="text-2xl font-serif text-foreground mb-4">
          سلتك فارغة
        </h1>
        <p className="text-muted-foreground mb-8 max-w-md">
          أضف عطوراً فاخرة ثم أكمل طلبك عبر واتساب.
        </p>
        <Link
          href="/shop"
          className="px-8 py-4 bg-primary text-primary-foreground text-xs tracking-[0.2em] uppercase hover:bg-primary/90 transition-colors"
        >
          استكشف المتجر
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 transition-colors"
        >
          <ArrowRight className="h-4 w-4" />
          العودة للمتجر
        </Link>

        <h1 className="text-3xl font-serif font-light text-foreground mb-2">
          إتمام الطلب
        </h1>
        <p className="text-muted-foreground mb-10 text-sm">
          أدخل بياناتك ثم أرسل الطلب مباشرة عبر واتساب — لا دفع إلكتروني على
          الموقع.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.form
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              handleWhatsAppCheckout();
            }}
          >
            <div>
              <label
                htmlFor="name"
                className="block text-xs tracking-widest uppercase text-muted-foreground mb-2"
              >
                الاسم الكامل *
              </label>
              <input
                id="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-card border border-border px-4 py-3 text-sm focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-xs tracking-widest uppercase text-muted-foreground mb-2"
              >
                رقم الهاتف *
              </label>
              <input
                id="phone"
                type="tel"
                required
                dir="ltr"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-card border border-border px-4 py-3 text-sm focus:outline-none focus:border-primary"
                placeholder="01xxxxxxxxx"
              />
            </div>
            <div>
              <label
                htmlFor="address"
                className="block text-xs tracking-widest uppercase text-muted-foreground mb-2"
              >
                العنوان بالتفصيل *
              </label>
              <textarea
                id="address"
                required
                rows={3}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-card border border-border px-4 py-3 text-sm focus:outline-none focus:border-primary resize-none"
              />
            </div>
            <div>
              <label
                htmlFor="notes"
                className="block text-xs tracking-widest uppercase text-muted-foreground mb-2"
              >
                ملاحظات (اختياري)
              </label>
              <textarea
                id="notes"
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-card border border-border px-4 py-3 text-sm focus:outline-none focus:border-primary resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-4 bg-green-600 text-white text-xs tracking-[0.2em] uppercase hover:bg-green-700 transition-colors"
            >
              <MessageCircle className="h-5 w-5" />
              إرسال الطلب عبر واتساب
            </button>
            <button
              type="button"
              onClick={clearCart}
              className="w-full py-2 text-xs text-muted-foreground hover:text-destructive transition-colors"
            >
              إفراغ السلة
            </button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card border border-border/50 p-6 sm:p-8 h-fit"
          >
            <h2 className="font-serif text-xl mb-6">ملخص الطلب</h2>
            <ul className="space-y-5 mb-6">
              {items.map((item) => {
                const details = getItemDetails(item);
                if (!details) return null;
                return (
                  <li key={item.id} className="flex gap-4">
                    <div className="relative w-16 h-16 flex-shrink-0 overflow-hidden">
                      <ProductImage
                        src={details.image}
                        alt={details.name}
                        productId={item.id}
                        isGiftSet={item.type === "giftset"}
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">
                        {details.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        × {item.quantity}
                      </p>
                    </div>
                    <p className="text-sm text-primary shrink-0">
                      {formatPrice(item.selectedPrice * item.quantity)}
                    </p>
                  </li>
                );
              })}
            </ul>
            <div className="space-y-2 text-sm border-t border-border/50 pt-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">المجموع</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">الشحن</span>
                <span>
                  {shipping === 0 ? "مجاني" : formatPrice(shipping)}
                </span>
              </div>
              <div className="flex justify-between text-lg pt-2">
                <span className="font-serif">الإجمالي</span>
                <LuxuryPrice price={total} size="sm" showBadge={false} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
