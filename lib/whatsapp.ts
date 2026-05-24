import { WHATSAPP_NUMBER, BUSINESS_NAME_EN } from "@/lib/constants";
import { formatPrice } from "@/lib/format";
import type { CartItem } from "@/lib/cart-context";
import type { GiftSet, Product } from "@/data/products";
import {
  getGiftSetById,
  getProductById,
  getCompareAtForPrice,
} from "@/data/products";

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function openWhatsApp(message: string): void {
  window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer");
}

function productSizeLabel(product: Product, selectedPrice: number): string {
  if (product.priceLarge && selectedPrice === product.priceLarge) {
    return "100ml";
  }
  if (product.collection === "150ml") return "150ml";
  return "50ml";
}

export function buildCartOrderMessage(
  items: CartItem[],
  subtotal: number,
  customer?: {
    name: string;
    phone: string;
    address: string;
    notes?: string;
  }
): string {
  const lines = items.map((item) => {
    const details =
      item.type === "product"
        ? getProductById(item.id)
        : getGiftSetById(item.id);
    const name = details?.name ?? "Item";
    const lineTotal = item.selectedPrice * item.quantity;
    const size =
      details && item.type === "product"
        ? productSizeLabel(details as Product, item.selectedPrice)
        : "";
    return `• ${name}${size ? ` (${size})` : ""} × ${item.quantity} — ${formatPrice(lineTotal)}`;
  });

  const parts = [
    `مرحباً ${BUSINESS_NAME_EN} — أود تقديم طلب:`,
    "",
    ...lines,
    "",
    `المجموع: ${formatPrice(subtotal)}`,
  ];

  if (customer) {
    parts.push(
      "",
      "--- بيانات العميل ---",
      `الاسم: ${customer.name}`,
      `الهاتف: ${customer.phone}`,
      `العنوان: ${customer.address}`,
      customer.notes ? `ملاحظات: ${customer.notes}` : ""
    );
  }

  parts.push("", "الدفع: عند الاستلام");
  return parts.filter(Boolean).join("\n");
}

export function buildSingleProductMessage(
  product: Product,
  quantity: number,
  selectedPrice: number
): string {
  const compareAt = getCompareAtForPrice(product, selectedPrice);
  const total = selectedPrice * quantity;
  const priceLine = compareAt
    ? `${formatPrice(compareAt * quantity)} → ${formatPrice(total)}`
    : formatPrice(total);

  return [
    `مرحباً ${BUSINESS_NAME_EN} — أود طلب:`,
    "",
    `${product.name} — ${product.brand}`,
    `الحجم: ${productSizeLabel(product, selectedPrice)}`,
    `الكمية: ${quantity}`,
    `الإجمالي: ${priceLine}`,
  ].join("\n");
}

export function buildGiftSetMessage(giftSet: GiftSet): string {
  const priceLine =
    giftSet.compareAtPrice && giftSet.compareAtPrice > giftSet.price
      ? `${formatPrice(giftSet.compareAtPrice)} → ${formatPrice(giftSet.price)}`
      : formatPrice(giftSet.price);
  return [
    `مرحباً ${BUSINESS_NAME_EN} — أهتم بـ:`,
    "",
    giftSet.name,
    `السعر: ${priceLine}`,
    "",
    giftSet.description,
  ].join("\n");
}

export function buildContactMessage(
  name: string,
  phone: string,
  message: string
): string {
  return [
    `مرحباً ${BUSINESS_NAME_EN} — استفسار من الموقع:`,
    "",
    `الاسم: ${name}`,
    `الهاتف: ${phone}`,
    "",
    message,
  ].join("\n");
}
