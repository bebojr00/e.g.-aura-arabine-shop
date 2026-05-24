import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Tajawal, Amiri } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import Header from "@/components/header";
import Footer from "@/components/footer";
import WhatsAppButton from "@/components/whatsapp-button";
import CartDrawer from "@/components/cart-drawer";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-tajawal",
  display: "swap",
});

const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-amiri",
  display: "swap",
});

export const metadata: Metadata = {
  title: "أورا عربين | عطور فاخرة من قلب الخليج",
  description:
    "اكتشف أرقى العطور الخليجية الأصيلة المستوردة من المملكة العربية السعودية. تشكيلات فاخرة، عطور تدوم طويلاً، ومجموعات هدايا ملكية. تسوق الآن في مصر.",
  keywords: [
    "عطور فاخرة",
    "عطور خليجية",
    "عطور سعودية",
    "عطور عربية",
    "نيش فراجرانس",
    "عطور مصر",
    "أورا عربين",
    "luxury perfume egypt",
    "gulf perfume",
    "arabic fragrance",
    "aura arabine",
  ],
  authors: [{ name: "أورا عربين" }],
  openGraph: {
    title: "أورا عربين | عطور فاخرة من قلب الخليج",
    description:
      "عطور خليجية أصيلة مستوردة من المملكة العربية السعودية. جودة لا تُضاهى، رائحة تدوم طويلاً.",
    type: "website",
    locale: "ar_EG",
    alternateLocale: "en_EG",
  },
};

export const viewport: Viewport = {
  themeColor: "#f5f0e8",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className="bg-background">
      <body
        className={`${cormorant.variable} ${tajawal.variable} ${amiri.variable} font-sans antialiased`}
      >
        <CartProvider>
          <Header />
          <CartDrawer />
          <main className="min-h-screen pt-20">{children}</main>
          <Footer />
          <WhatsAppButton />
        </CartProvider>
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
