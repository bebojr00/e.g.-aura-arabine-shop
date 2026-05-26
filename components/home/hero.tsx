"use client";

import { motion, useScroll, useTransform, cubicBezier } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductImage from "@/components/product-image";
import { HERO_IMAGE } from "@/lib/product-image";
import { BRAND_TAGLINE_EN, BUSINESS_NAME_EN } from "@/lib/constants";
import { useRef, useEffect, useState } from "react";

export default function Hero() {
  const ref = useRef(null);
  const [mounted, setMounted] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const yFg = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  // Luxury easing curve
  const easeInOutCubic = cubicBezier(0.65, 0, 0.35, 1);

  return (
    <section
      ref={ref}
      className="relative h-screen min-h-[900px] flex items-center justify-center overflow-hidden bg-black cinematic-grain"
    >
      {/* Background Image Layer with Parallax */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: yBg, opacity, scale }}
        initial={{ scale: 1.15, filter: "blur(10px)" }}
        animate={{ scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 3, ease: easeInOutCubic }}
      >
        <ProductImage
          src={HERO_IMAGE}
          alt="Luxury Gulf Fragrances"
          priority
          sizes="100vw"
          className="object-cover w-full h-full opacity-80"
        />

        {/* Deep Atmospheric Overlays */}
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
        <div className="vignette" />

        {/* Animated Smoke & Flare */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold/10 via-transparent to-transparent opacity-60 animate-smoke pointer-events-none" />
        <div className="absolute top-[20%] left-[30%] w-[40vw] h-[40vw] bg-gold/5 rounded-full blur-[100px] animate-flare pointer-events-none" />
      </motion.div>

      {/* Floating Particles */}
      {mounted && (
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-gold/40 rounded-full blur-[1px]"
              initial={{
                x: `${Math.random() * 100}vw`,
                y: `${Math.random() * 100}vh`,
                opacity: 0,
                scale: Math.random() * 2 + 0.5,
              }}
              animate={{
                y: [
                  `${Math.random() * 100}vh`,
                  `${Math.random() * -20}vh`,
                ],
                x: `+=${Math.random() * 50 - 25}px`,
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>
      )}

      {/* Foreground Content with Parallax */}
      <motion.div
        className="relative z-20 mx-auto max-w-7xl px-4 flex flex-col items-center text-center"
        style={{ y: yFg }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1.5,
            delay: 0.8,
            ease: easeInOutCubic,
          }}
          className="flex flex-col items-center"
        >
          <motion.p
            className="luxury-subheading text-[10px] text-gold mb-8"
            initial={{ opacity: 0, letterSpacing: "0.2em" }}
            animate={{ opacity: 1, letterSpacing: "0.4em" }}
            transition={{
              duration: 2,
              delay: 1.2,
              ease: easeInOutCubic,
            }}
          >
            {BUSINESS_NAME_EN}
          </motion.p>

          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl luxury-heading text-ivory mb-10 drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] max-w-5xl leading-[1.1] tracking-tight">
            <motion.span
              className="block mb-2"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1.5,
                delay: 1.5,
                ease: easeInOutCubic,
              }}
            >
              Imported From
            </motion.span>

            <motion.span
              className="block gold-gradient-text"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1.5,
                delay: 1.8,
                ease: easeInOutCubic,
              }}
            >
              Saudi Arabia
            </motion.span>
          </h1>

          <motion.p
            className="text-lg sm:text-xl text-sand-dark/80 leading-relaxed mb-16 max-w-2xl font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 2,
              delay: 2.2,
              ease: easeInOutCubic,
            }}
          >
            {BRAND_TAGLINE_EN}. Crafted for presence, engineered for longevity.
            Discover your signature scent today.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.5,
              delay: 2.5,
              ease: easeInOutCubic,
            }}
          >
            <Link
              href="/shop"
              className="magnetic-button luxury-button group inline-flex items-center justify-center px-12 py-6 bg-gold text-oud-brown text-[11px] uppercase tracking-[0.2em] shadow-[0_0_30px_rgba(193,155,75,0.2)]"
            >
              <span className="relative z-10 flex items-center gap-4 font-medium">
                Discover The Collection
                <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-transform duration-500" />
              </span>
            </Link>

            <Link
              href="/gift-sets"
              className="magnetic-button group inline-flex items-center justify-center px-12 py-6 border border-gold/30 text-ivory text-[11px] uppercase tracking-[0.2em] hover:border-gold hover:text-gold transition-all duration-700 luxury-glass"
            >
              Luxury Gift Sets
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 3.5 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6 z-20"
      >
        <span className="text-[9px] tracking-[0.4em] uppercase text-sand-dark/50 font-light">
          Scroll to explore
        </span>

        <motion.div
          animate={{ y: [0, 15, 0], opacity: [0.2, 1, 0.2] }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: easeInOutCubic,
          }}
          className="w-[1px] h-20 bg-gradient-to-b from-gold via-gold/50 to-transparent"
        />
      </motion.div>
    </section>
  );
}