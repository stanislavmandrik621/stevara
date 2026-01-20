"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Send,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  MessageSquare,
  Clock,
  Users,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
};

const objectTypes = [
  "Приватний будинок",
  "Комерційний об'єкт",
  "Промисловий об'єкт",
  "Інфраструктурний об'єкт",
  "Інше",
];

export default function ContactsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    objectType: "",
    message: "",
    consent: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="gradient-top" />
        <div className="grid-bg" />

        <div className="container relative z-10">
          <motion.div
            initial="initial"
            animate="animate"
            variants={{
              animate: { transition: { staggerChildren: 0.1 } },
            }}
            className="max-w-3xl"
          >
            <motion.div variants={fadeInUp}>
              <Badge className="mb-6">
                <MessageSquare className="w-3 h-3" />
                Контакти
              </Badge>
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-hero mb-6">
              Зв'язатися з{" "}
              <span className="text-gradient">STEVARA</span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-subheading">
              Опишіть ваш контекст, задачу або питання — ми повернемося з
              відповіддю, щоб обговорити можливі підходи та наступні кроки.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <Section className="py-20">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Form */}
          <div className="lg:col-span-2">
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16"
              >
                <div className="inline-flex p-4 rounded-full bg-[var(--energy)]/10 text-[var(--energy)] mb-6">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
                <h2 className="text-2xl font-medium mb-4">Дякуємо!</h2>
                <p className="text-[var(--foreground-muted)] max-w-md mx-auto">
                  Ми отримали ваш запит і зв'яжемося, щоб узгодити зручний час
                  дзвінка.
                </p>
              </motion.div>
            ) : (
              <motion.form
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium mb-2"
                    >
                      Ім'я *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="input"
                      placeholder="Ваше ім'я"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium mb-2"
                    >
                      Телефон *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="input"
                      placeholder="+380"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-2"
                    >
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="input"
                      placeholder="your@email.com"
                    />
                  </div>

                  {/* City */}
                  <div>
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium mb-2"
                    >
                      Місто / Область
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="input"
                      placeholder="Київ"
                    />
                  </div>
                </div>

                {/* Object Type */}
                <div>
                  <label
                    htmlFor="objectType"
                    className="block text-sm font-medium mb-2"
                  >
                    Тип об'єкту
                  </label>
                  <select
                    id="objectType"
                    name="objectType"
                    value={formData.objectType}
                    onChange={handleChange}
                    className="input appearance-none cursor-pointer"
                  >
                    <option value="">Оберіть тип об'єкту</option>
                    {objectTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2"
                  >
                    Повідомлення / Контекст *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="input textarea"
                    placeholder="Опишіть ваш об'єкт, задачу або питання..."
                    rows={5}
                  />
                </div>

                {/* Consent */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="consent"
                    name="consent"
                    required
                    checked={formData.consent}
                    onChange={handleChange}
                    className="mt-1 w-4 h-4 rounded border-[var(--glass-border)] bg-transparent text-[var(--accent)] focus:ring-[var(--accent)] focus:ring-offset-0"
                  />
                  <label
                    htmlFor="consent"
                    className="text-sm text-[var(--foreground-muted)]"
                  >
                    Я погоджуюсь з{" "}
                    <a
                      href="/privacy"
                      className="text-[var(--accent)] hover:underline"
                    >
                      Політикою конфіденційності
                    </a>{" "}
                    та даю згоду на обробку персональних даних
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Надсилається...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Ініціювати обговорення
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* How We Work */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="p-6">
                <h3 className="text-lg font-medium mb-4">Як ми працюємо</h3>
                <ul className="space-y-4">
                  {[
                    {
                      icon: MessageSquare,
                      text: "Ми ознайомлюємося з вашим запитом і контекстом",
                    },
                    {
                      icon: Clock,
                      text: "Повертаємося з відповіддю у зручному форматі",
                    },
                    {
                      icon: Users,
                      text: "Узгоджуємо подальші кроки залежно від задачі",
                    },
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-[var(--accent-dim)] text-[var(--accent)]">
                        <item.icon className="w-4 h-4" />
                      </div>
                      <span className="text-sm text-[var(--foreground-muted)]">
                        {item.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="p-6">
                <h3 className="text-lg font-medium mb-4">
                  Контактна інформація
                </h3>
                <ul className="space-y-4">
                  <li>
                    <a
                      href="mailto:info@stevara.ua"
                      className="flex items-center gap-3 text-[var(--foreground-muted)] hover:text-white transition-colors"
                    >
                      <Mail className="w-5 h-5 text-[var(--accent)]" />
                      info@stevara.ua
                    </a>
                  </li>
                  <li>
                    <a
                      href="tel:+380441234567"
                      className="flex items-center gap-3 text-[var(--foreground-muted)] hover:text-white transition-colors"
                    >
                      <Phone className="w-5 h-5 text-[var(--accent)]" />
                      +380 (44) 123-45-67
                    </a>
                  </li>
                  <li className="flex items-center gap-3 text-[var(--foreground-muted)]">
                    <MapPin className="w-5 h-5 text-[var(--accent)]" />
                    Працюємо по всій Україні
                  </li>
                </ul>
              </Card>
            </motion.div>
          </div>
        </div>
      </Section>
    </>
  );
}
