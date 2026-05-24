"use client";

import Link from "next/link";
import { Instagram, Facebook, MessageCircle } from "lucide-react";
import { WHATSAPP_NUMBER, INSTAGRAM_URL, BUSINESS_NAME } from "@/lib/constants";

const footerLinks = {
  shop: [
    { label: "All Fragrances", href: "/shop" },
    { label: "Men", href: "/shop?category=men" },
    { label: "Women", href: "/shop?category=women" },
    { label: "Unisex", href: "/shop?category=unisex" },
    { label: "Gift Sets", href: "/gift-sets" },
  ],
  company: [
    { label: "Our Story", href: "/about" },
    { label: "Contact Us", href: "/contact" },
    { label: "Shipping Info", href: "/shipping" },
    { label: "FAQ", href: "/faq" },
  ],
  support: [
    { label: "Track Order", href: "/track" },
    { label: "Returns Policy", href: "/returns" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-gold/10 relative overflow-hidden cinematic-grain">
      <div className="absolute inset-0 fog-overlay opacity-20 pointer-events-none" />
      
      {/* Newsletter Section */}
      <div className="border-b border-gold/10 relative z-10 bg-black/40">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <h3 className="text-3xl sm:text-4xl luxury-title text-foreground mb-6">
              Join the Inner Circle
            </h3>
            <p className="text-muted-foreground max-w-md mb-10 font-light">
              Be the first to experience new releases, limited collections, and exclusive invitations.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-background/50 border border-gold/20 px-6 py-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold transition-colors font-light text-sm"
              />
              <button
                type="submit"
                className="px-10 py-4 bg-gold text-oud-brown text-xs tracking-[0.2em] uppercase hover:bg-gold-light transition-colors shadow-[0_0_15px_rgba(193,155,75,0.2)] font-medium"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          {/* Brand */}
          <div className="text-left">
            <Link href="/" className="inline-block mb-8">
              <span className="text-3xl luxury-title text-foreground">
                {BUSINESS_NAME}
              </span>
            </Link>
            <p className="text-muted-foreground text-sm font-light leading-relaxed mb-8 pr-4">
              Discover the finest authentic Gulf fragrances, imported directly from Saudi Arabia. Engineered for extraordinary presence and longevity.
            </p>
            <div className="flex items-center gap-5">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full border border-gold/20 flex items-center justify-center text-muted-foreground hover:text-gold hover:border-gold transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full border border-gold/20 flex items-center justify-center text-muted-foreground hover:text-gold hover:border-gold transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full border border-gold/20 flex items-center justify-center text-muted-foreground hover:text-[#25D366] hover:border-[#25D366] transition-all duration-300"
                aria-label="WhatsApp"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div className="text-left">
            <h4 className="text-[10px] tracking-[0.2em] uppercase text-gold mb-8">
              Shop
            </h4>
            <ul className="space-y-4">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors font-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="text-left">
            <h4 className="text-[10px] tracking-[0.2em] uppercase text-gold mb-8">
              House
            </h4>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors font-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div className="text-left">
            <h4 className="text-[10px] tracking-[0.2em] uppercase text-gold mb-8">
              Client Care
            </h4>
            <ul className="space-y-4">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors font-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gold/10 relative z-10 bg-black/60">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs tracking-widest uppercase text-muted-foreground/60">
            <p>© {currentYear} {BUSINESS_NAME}. All Rights Reserved.</p>
            <p className="flex items-center gap-3">
              <span>Nationwide Delivery</span>
              <span className="text-gold">·</span>
              <span>Cash on Delivery</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
