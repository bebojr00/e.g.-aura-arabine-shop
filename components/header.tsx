"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, X, Search, Heart } from "lucide-react";
import { useCart } from "@/lib/cart-context";

const navLinks = [
  { href: "/", label: "الرئيسية" },
  { href: "/shop", label: "المتجر" },
  { href: "/collections", label: "التشكيلات" },
  { href: "/gift-sets", label: "طقم الهدايا" },
  { href: "/about", label: "عن العلامة" },
  { href: "/contact", label: "تواصل معنا" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { getItemCount, setIsOpen: setCartOpen } = useCart();
  const itemCount = getItemCount();

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/85 backdrop-blur-lg border-b border-gold-light/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Right Actions (RTL: appears left visually) */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="text-foreground hover:text-primary transition-colors duration-300"
                aria-label="بحث"
              >
                <Search className="h-5 w-5" />
              </button>
              <Link
                href="/wishlist"
                className="hidden sm:block text-foreground hover:text-primary transition-colors duration-300"
                aria-label="المفضلة"
              >
                <Heart className="h-5 w-5" />
              </Link>
              <button
                onClick={() => setCartOpen(true)}
                className="relative text-foreground hover:text-primary transition-colors duration-300"
                aria-label="سلة التسوق"
              >
                <ShoppingBag className="h-5 w-5" />
                {itemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold"
                  >
                    {itemCount}
                  </motion.span>
                )}
              </button>
            </div>

            {/* Logo — Centered */}
            <Link href="/" className="flex flex-col items-center absolute left-1/2 -translate-x-1/2">
              <span className="text-2xl sm:text-3xl arabic-display gold-gradient-text">
                أورا عربين
              </span>
              <span className="hidden sm:block text-[9px] tracking-[0.35em] uppercase text-warm-brown/70 mt-0.5">
                Aura Arabine
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm tracking-wider text-foreground/80 hover:text-primary transition-colors duration-300 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 right-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="lg:hidden text-foreground hover:text-primary transition-colors"
              aria-label="القائمة"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="border-t border-border/50 overflow-hidden"
            >
              <div className="mx-auto max-w-7xl px-4 py-4">
                <div className="relative">
                  <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="ابحث عن عطرك..."
                    className="w-full bg-sand/60 border border-border rounded-sm py-3 pr-12 pl-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary text-right"
                    autoFocus
                    dir="rtl"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Menu — Slides from RIGHT (RTL) */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 z-50 bg-oud-brown/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.35 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-80 bg-background border-l border-border shadow-2xl"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-6 border-b border-border">
                  <span className="text-2xl arabic-display gold-gradient-text">
                    أورا عربين
                  </span>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="text-foreground hover:text-primary"
                    aria-label="إغلاق القائمة"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                <nav className="flex-1 overflow-y-auto p-6">
                  <div className="flex flex-col gap-2">
                    {navLinks.map((link, index) => (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.08 }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => setIsMenuOpen(false)}
                          className="block py-3 text-lg text-foreground hover:text-primary transition-colors border-b border-border/30 text-right"
                        >
                          {link.label}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </nav>
                <div className="p-6 border-t border-border">
                  <Link
                    href="/wishlist"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Heart className="h-5 w-5" />
                    <span className="text-sm">المفضلة</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
