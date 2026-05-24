"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, X, Search, Heart } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { BUSINESS_NAME } from "@/lib/constants";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/collections", label: "Collections" },
  { href: "/gift-sets", label: "Gift Sets" },
  { href: "/about", label: "Our Story" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { getItemCount, setIsOpen: setCartOpen } = useCart();
  const itemCount = getItemCount();

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-gold/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Left Actions (Mobile Menu) */}
            <div className="flex lg:hidden">
              <button
                onClick={() => setIsMenuOpen(true)}
                className="text-foreground hover:text-gold transition-colors"
                aria-label="Menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[10px] tracking-widest uppercase text-muted-foreground hover:text-gold transition-colors duration-300 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-gold group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </nav>

            {/* Logo — Centered */}
            <Link href="/" className="flex flex-col items-center absolute left-1/2 -translate-x-1/2 group">
              <span className="text-2xl sm:text-3xl luxury-title text-foreground group-hover:text-gold transition-colors duration-500">
                {BUSINESS_NAME}
              </span>
            </Link>

            {/* Right Actions */}
            <div className="flex items-center gap-5">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="text-muted-foreground hover:text-gold transition-colors duration-300"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>
              <Link
                href="/wishlist"
                className="hidden sm:block text-muted-foreground hover:text-gold transition-colors duration-300"
                aria-label="Wishlist"
              >
                <Heart className="h-5 w-5" />
              </Link>
              <button
                onClick={() => setCartOpen(true)}
                className="relative text-muted-foreground hover:text-gold transition-colors duration-300"
                aria-label="Cart"
              >
                <ShoppingBag className="h-5 w-5" />
                {itemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 h-4 w-4 rounded-full bg-gold text-oud-brown text-[9px] flex items-center justify-center font-bold"
                  >
                    {itemCount}
                  </motion.span>
                )}
              </button>
            </div>
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
              className="border-t border-gold/10 overflow-hidden bg-background/95 backdrop-blur-md"
            >
              <div className="mx-auto max-w-3xl px-4 py-6">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search for your signature scent..."
                    className="w-full bg-transparent border-b border-border py-3 pl-12 pr-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold text-lg font-light transition-colors"
                    autoFocus
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Menu — Slides from Left (LTR) */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.4, ease: "easeOut" }}
              className="fixed top-0 left-0 bottom-0 z-50 w-80 bg-background border-r border-gold/10 shadow-2xl cinematic-grain"
            >
              <div className="flex flex-col h-full relative">
                <div className="absolute inset-0 bg-gradient-to-b from-gold/5 to-transparent pointer-events-none" />
                <div className="flex items-center justify-between p-6 border-b border-gold/10 relative z-10">
                  <span className="text-xl luxury-title text-foreground">
                    {BUSINESS_NAME}
                  </span>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="text-muted-foreground hover:text-gold transition-colors"
                    aria-label="Close menu"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                <nav className="flex-1 overflow-y-auto p-8 relative z-10">
                  <div className="flex flex-col gap-6">
                    {navLinks.map((link, index) => (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.08 }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => setIsMenuOpen(false)}
                          className="block text-sm tracking-[0.2em] uppercase text-muted-foreground hover:text-gold transition-colors"
                        >
                          {link.label}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </nav>
                <div className="p-8 border-t border-gold/10 relative z-10">
                  <Link
                    href="/wishlist"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 text-xs tracking-widest uppercase text-muted-foreground hover:text-gold transition-colors"
                  >
                    <Heart className="h-4 w-4" />
                    <span>Wishlist</span>
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
