"use client";

import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { WHATSAPP_NUMBER } from "@/lib/constants";

export default function WhatsAppButton() {
  const handleClick = () => {
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello! I would like to inquire about your fragrances 🌹")}`,
      "_blank"
    );
  };

  return (
    <motion.button
      onClick={handleClick}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-green-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-green-500 transition-colors"
      aria-label="Contact on WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="absolute inset-0 rounded-full bg-green-600/30 animate-ping pointer-events-none" />
    </motion.button>
  );
}
