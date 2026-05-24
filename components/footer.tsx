"use client";

import Link from "next/link";
import { Instagram, Facebook, MessageCircle } from "lucide-react";
import { WHATSAPP_NUMBER, INSTAGRAM_URL, BUSINESS_NAME, BRAND_TAGLINE_AR } from "@/lib/constants";

const footerLinks = {
  shop: [
    { label: "جميع المنتجات", href: "/shop" },
    { label: "رجالي", href: "/shop?category=men" },
    { label: "نسائي", href: "/shop?category=women" },
    { label: "يونيسيكس", href: "/shop?category=unisex" },
    { label: "طقم الهدايا", href: "/gift-sets" },
  ],
  company: [
    { label: "عن العلامة", href: "/about" },
    { label: "تواصل معنا", href: "/contact" },
    { label: "معلومات الشحن", href: "/shipping" },
    { label: "الأسئلة الشائعة", href: "/faq" },
  ],
  support: [
    { label: "تتبع الطلب", href: "/track" },
    { label: "سياسة الاسترجاع", href: "/returns" },
    { label: "سياسة الخصوصية", href: "/privacy" },
    { label: "الشروط والأحكام", href: "/terms" },
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card/80 border-t border-border arabesque-pattern relative">
      {/* Newsletter Section */}
      <div className="border-b border-border/60 relative z-10">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <h3 className="text-2xl sm:text-3xl arabic-display text-foreground mb-4">
              انضم إلى قائمة المميزين
            </h3>
            <p className="text-muted-foreground max-w-md mb-8">
              كن أول من يعرف عن الإصدارات الجديدة، التشكيلات المحدودة، والعروض الحصرية.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
              <input
                type="email"
                placeholder="أدخل بريدك الإلكتروني"
                className="flex-1 bg-background border border-border px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary text-right rounded-sm"
                dir="rtl"
              />
              <button
                type="submit"
                className="px-8 py-3 gold-gradient-bg text-white text-sm tracking-wider hover:opacity-90 transition-opacity luxury-button rounded-sm"
              >
                اشترك الآن
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="text-right">
            <Link href="/" className="inline-block mb-6">
              <span className="text-3xl arabic-display gold-gradient-text">
                {BUSINESS_NAME}
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              {BRAND_TAGLINE_AR}
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              اكتشف أرقى العطور الخليجية الأصلية المستوردة من السعودية. جودة فائقة وروائح تدوم طويلاً.
            </p>
            <div className="flex items-center gap-4">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all duration-300 gold-border-glow"
                aria-label="إنستغرام"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all duration-300 gold-border-glow"
                aria-label="فيسبوك"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-[#25D366] hover:border-[#25D366] transition-all duration-300"
                aria-label="واتساب"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div className="text-right">
            <h4 className="text-sm tracking-wider text-foreground mb-6 arabic-heading">
              المتجر
            </h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="text-right">
            <h4 className="text-sm tracking-wider text-foreground mb-6 arabic-heading">
              الشركة
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div className="text-right">
            <h4 className="text-sm tracking-wider text-foreground mb-6 arabic-heading">
              الدعم
            </h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
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
      <div className="border-t border-border/60 relative z-10">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© {currentYear} {BUSINESS_NAME}. جميع الحقوق محفوظة.</p>
            <p className="flex items-center gap-2">
              <span>التوصيل لجميع أنحاء مصر</span>
              <span className="text-primary">·</span>
              <span>الدفع عند الاستلام</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
