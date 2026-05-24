"use client";

import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { WHATSAPP_NUMBER } from "@/lib/constants";

export default function WhatsAppButton() {
  const handleClick = () => {
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("مرحباً! أريد الاستفسار عن العطور 🌹")}`,
      "_blank"
    );
  };

  return (
    <motion.button
      onClick={handleClick}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.93 }}
      className="fixed bottom-6 left-6 z-40 w-14 h-14 bg-[#25D366] text-white rounded-full shadow-xl flex items-center justify-center hover:bg-[#1fba5a] transition-colors animate-gold-pulse"
      aria-label="تواصل عبر واتساب"
      style={{
        boxShadow: "0 4px 20px rgba(37,211,102,0.40), 0 2px 8px rgba(0,0,0,0.15)",
      }}
    >
      <MessageCircle className="h-7 w-7" />
      {/* Pulse ring */}
      <span className="absolute inset-0 rounded-full bg-[#25D366]/30 animate-ping" />
    </motion.button>
  );
}
