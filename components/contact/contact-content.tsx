"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  MessageCircle,
  Phone,
  MapPin,
  Clock,
  Instagram,
  Send,
} from "lucide-react";
import {
  WHATSAPP_NUMBER,
  WHATSAPP_DISPLAY,
  INSTAGRAM_URL,
  BUSINESS_NAME,
} from "@/lib/constants";
import { buildContactMessage, buildWhatsAppUrl } from "@/lib/whatsapp";

const contactInfo = [
  {
    icon: MessageCircle,
    title: "واتساب",
    value: WHATSAPP_DISPLAY,
    href: buildWhatsAppUrl("مرحباً! أريد الاستفسار عن العطور."),
    description: "رد سريع للطلبات والاستفسارات",
  },
  {
    icon: Phone,
    title: "هاتف",
    value: WHATSAPP_DISPLAY,
    href: `tel:+${WHATSAPP_NUMBER}`,
    description: "اتصل أو راسلنا على واتساب",
  },
  {
    icon: MapPin,
    title: "التوصيل",
    value: "جميع أنحاء مصر",
    href: "#",
    description: "متجر إلكتروني — شحن لكل المحافظات",
  },
  {
    icon: Instagram,
    title: "إنستغرام",
    value: "@aurafr_ara",
    href: INSTAGRAM_URL,
    description: "عروض ووصول جديد",
  },
];

const workingHours = [
  { day: "السبت — الخميس", hours: "10:00 ص — 10:00 م" },
  { day: "الجمعة", hours: "2:00 م — 10:00 م" },
];

export default function ContactContent() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const body = [
      formData.subject ? `الموضوع: ${formData.subject}` : "",
      formData.message,
    ]
      .filter(Boolean)
      .join("\n\n");
    const url = buildWhatsAppUrl(
      buildContactMessage(formData.name, formData.phone, body)
    );
    window.open(url, "_blank", "noopener,noreferrer");
    setIsSubmitting(false);
    setFormData({ name: "", phone: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-background">
      <section className="bg-card border-b border-border/50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <p className="text-sm tracking-[0.3em] uppercase text-primary mb-4">
              {BUSINESS_NAME}
            </p>
            <h1 className="text-4xl sm:text-5xl font-serif text-foreground mb-4">
              تواصل معنا
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              أسئلة عن العطور أو مساعدة في الاختيار؟ فريقنا جاهز عبر واتساب.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <motion.a
                key={info.title}
                href={info.href}
                target={info.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  info.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-6 bg-card border border-border/50 hover:border-primary transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <info.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-serif text-foreground mb-1">{info.title}</h3>
                <p className="text-primary mb-2">{info.value}</p>
                <p className="text-sm text-muted-foreground">{info.description}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl sm:text-3xl font-serif text-foreground mb-6">
                أرسل رسالة
              </h2>
              <p className="text-muted-foreground mb-8">
                يُفتح واتساب مع رسالتك جاهزة — لا حاجة لبريد إلكتروني.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm tracking-widest uppercase text-foreground mb-2"
                    >
                      الاسم *
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full bg-card border border-border py-3 px-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
                      placeholder="اسمك"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm tracking-widest uppercase text-foreground mb-2"
                    >
                      الهاتف *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      required
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full bg-card border border-border py-3 px-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
                      placeholder="01xxxxxxxxx"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm tracking-widest uppercase text-foreground mb-2"
                  >
                    الموضوع
                  </label>
                  <select
                    id="subject"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    className="w-full bg-card border border-border py-3 px-4 text-foreground focus:outline-none focus:border-primary cursor-pointer"
                  >
                    <option value="">اختر الموضوع</option>
                    <option value="طلب">استفسار طلب</option>
                    <option value="توصية">توصية عطر</option>
                    <option value="جملة">جملة</option>
                    <option value="أخرى">أخرى</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm tracking-widest uppercase text-foreground mb-2"
                  >
                    الرسالة *
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full bg-card border border-border py-3 px-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary resize-none"
                    placeholder="اكتب رسالتك..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-green-600 text-white text-sm tracking-widest uppercase hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <MessageCircle className="h-5 w-5" />
                  {isSubmitting ? "جاري الفتح..." : "إرسال عبر واتساب"}
                </button>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-10"
            >
              <div>
                <h3 className="text-xl font-serif text-foreground mb-6 flex items-center gap-3">
                  <Clock className="h-5 w-5 text-primary" />
                  ساعات العمل
                </h3>
                <div className="space-y-3">
                  {workingHours.map((schedule) => (
                    <div
                      key={schedule.day}
                      className="flex items-center justify-between py-3 border-b border-border/50"
                    >
                      <span className="text-foreground">{schedule.day}</span>
                      <span className="text-muted-foreground">
                        {schedule.hours}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-serif text-foreground mb-6">
                  رد فوري؟
                </h3>
                <p className="text-muted-foreground mb-6">
                  للطلبات والتوصيات، واتساب هو الأسرع.
                </p>
                <a
                  href={buildWhatsAppUrl("مرحباً! أريد الاستفسار عن العطور.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-green-600 text-white text-sm tracking-widest uppercase hover:bg-green-700 transition-colors"
                >
                  <MessageCircle className="h-5 w-5" />
                  محادثة واتساب
                </a>
              </div>

              <div>
                <h3 className="text-xl font-serif text-foreground mb-6">
                  تابعنا
                </h3>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-12 h-12 rounded-full border border-border items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
