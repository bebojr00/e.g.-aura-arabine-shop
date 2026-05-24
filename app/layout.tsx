import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Playfair_Display, Inter } from "next/font/google";
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

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aura Arabine | Luxury Fragrances from the Gulf",
  description:
    "Discover authentic luxury Gulf fragrances imported from Saudi Arabia. Premium collections, long-lasting scents, and luxury gift sets. Shop now.",
  keywords: [
    "luxury perfume",
    "gulf perfume",
    "saudi fragrance",
    "arabic fragrance",
    "niche fragrance",
    "luxury fragrance egypt",
    "aura arabine",
  ],
  authors: [{ name: "Aura Arabine" }],
  openGraph: {
    title: "Aura Arabine | Elite Perfume Boutique",
    description:
      "Authentic luxury Gulf fragrances imported from Saudi Arabia. Unmatched quality, long-lasting presence.",
    type: "website",
    locale: "en_US",
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
    <html lang="en" dir="ltr" className="bg-background">
      <body
        className={`${cormorant.variable} ${playfair.variable} ${inter.variable} font-sans antialiased`}
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
