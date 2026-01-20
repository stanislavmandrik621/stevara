"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Factory,
  Zap,
  Shield,
  Server,
  Cpu,
  RefreshCw,
  Scale,
  AlertTriangle,
  Globe,
  MessageSquare,
} from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
};

const useCases = [
  {
    icon: Factory,
    title: "Промислові об'єкти",
    description:
      "Виробництво, переробка, логістика — резервування критичних процесів, згладжування пікових навантажень, зниження операційних ризиків.",
  },
  {
    icon: Zap,
    title: "Енергетика та ВДЕ",
    description:
      "Сонячні та вітрові електростанції, підстанції, оператори мереж — балансування генерації, мережеві сервіси.",
  },
  {
    icon: Building2,
    title: "Критична інфраструктура",
    description:
      "Муніципальні та державні об'єкти — безперервність життєво важливих сервісів, локальна стійкість до відключень.",
  },
];

const advantages = [
  {
    icon: Server,
    title: "Єдина архітектура (Turnkey)",
    description:
      "Усі ключові компоненти розроблені як частини одного продукту, що зменшує точки відмови та інтеграційні ризики.",
  },
  {
    icon: Cpu,
    title: "Програмна екосистема",
    description:
      "Керування, оптимізація та оновлення є базовими функціями системи, а не зовнішніми надбудовами.",
  },
  {
    icon: Shield,
    title: "Складні мережеві умови",
    description:
      "Megapack орієнтований на експлуатацію в умовах нестабільної мережі, де критична швидка реакція.",
  },
  {
    icon: Scale,
    title: "Передбачуване масштабування",
    description:
      "Високий рівень заводської готовності та масштабування без зміни логіки керування.",
  },
];

const specs = [
  { label: "Ємність", value: "~3.9 МВт·год" },
  { label: "Потужність", value: "до ~1.9 МВт" },
  { label: "Інвертор", value: "вбудований" },
  { label: "Гарантія", value: "15 років" },
  { label: "Температурний діапазон", value: "−20°C…+50°C" },
  { label: "Масштабування", value: "від модулів до проєктів" },
];

export default function MegapackPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="gradient-top" />
        <div className="grid-bg" />

        {/* Industrial gradient effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--power)]/5 via-transparent to-transparent" />

        <div className="container relative z-10">
          <motion.div
            initial="initial"
            animate="animate"
            variants={{
              animate: { transition: { staggerChildren: 0.1 } },
            }}
            className="max-w-4xl"
          >
            <motion.div variants={fadeInUp}>
              <Badge variant="warning" className="mb-6">
                <Building2 className="w-3 h-3" />
                Commercial / Industrial
              </Badge>
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-hero mb-6">
              Tesla{" "}
              <span className="bg-gradient-to-r from-[var(--power)] to-[var(--accent)] bg-clip-text text-transparent">
                Megapack
              </span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-subheading mb-6">
              Індустріальна система накопичення енергії, що задовольняє високі
              вимоги щодо надійності, масштабу та керованості.
            </motion.p>

            <motion.p variants={fadeInUp} className="text-body mb-10 max-w-3xl">
              Tesla Megapack — індустріальна система накопичення енергії,
              розроблена як єдина інтегрована платформа для енергетичних
              компаній, девелоперів генерації та великих споживачів.
            </motion.p>

            <motion.div variants={fadeInUp}>
              <Link href="/contacts" className="btn btn-primary">
                <MessageSquare className="w-4 h-4" />
                Обговорити ваш проєкт
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Ukrainian Context */}
      <Section dark className="py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Badge variant="warning" className="mb-6">
              <Globe className="w-3 h-3" />
              Український контекст
            </Badge>
            <h2 className="text-display mb-6">
              Чому накопичення енергії критичне{" "}
              <span className="text-[var(--power)]">для України</span>
            </h2>
            <p className="text-body mb-8">
              Українська енергосистема працює в умовах дефіциту маневрової
              генерації, регулярних аварійних режимів і підвищених вимог до
              швидкого відновлення електропостачання.
            </p>
            <p className="text-body">
              Для великих об'єктів та інфраструктури ключовим стає не просто
              наявність резерву, а керована гнучкість, здатна стабільно працювати
              в нестандартних режимах мережі.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Card className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <AlertTriangle className="w-6 h-6 text-[var(--power)]" />
                <h3 className="text-xl font-medium">Ключові виклики</h3>
              </div>
              <ul className="space-y-4">
                {[
                  "Нестабільні режими частоти та напруги",
                  "Потреба в миттєвій реакції під час аварій",
                  "Обмежені можливості швидкого введення пікових потужностей",
                  "Високі наслідки простоїв для промисловості",
                ].map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-[var(--foreground-muted)]"
                  >
                    <div className="w-2 h-2 rounded-full bg-[var(--power)] mt-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>
        </div>
      </Section>

      {/* Use Cases */}
      <Section className="py-32" grid>
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-4">Сценарії</Badge>
            <h2 className="text-display mb-4">
              Де подібні рішення мають сенс
            </h2>
            <p className="text-body max-w-2xl mx-auto">
              Індустріальні системи накопичення енергії можуть розглядатися для
              об'єктів, де перебої в електропостачанні мають системні наслідки.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {useCases.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-8 h-full text-center">
                <div className="inline-flex p-4 rounded-2xl bg-[var(--power)]/10 text-[var(--power)] mb-6">
                  <item.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-medium mb-4">{item.title}</h3>
                <p className="text-[var(--foreground-muted)]">
                  {item.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Platform */}
      <Section dark className="py-32">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge variant="warning" className="mb-4">
              <Server className="w-3 h-3" />
              Платформа
            </Badge>
            <h2 className="text-display mb-4">
              Система, спроєктована як єдине ціле
            </h2>
            <p className="text-body max-w-3xl mx-auto">
              Tesla Megapack постачається як єдиний інженерний модуль: накопичення
              енергії, інвертори, термальна система та керування. Архітектура
              проєктувалася як цілісна, а не як набір компонентів.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            {
              icon: Cpu,
              title: "Powerhub",
              description:
                "Централізований моніторинг і керування всією системою",
            },
            {
              icon: Zap,
              title: "Autobidder",
              description:
                "Автоматизоване керування режимами та участь у ринкових механізмах",
            },
            {
              icon: RefreshCw,
              title: "OTA Updates",
              description:
                "Розвиток логіки керування протягом життєвого циклу системи",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 text-center h-full">
                <div className="inline-flex p-3 rounded-xl bg-[var(--accent-dim)] text-[var(--accent)] mb-4">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="font-medium mb-2">{item.title}</h3>
                <p className="text-sm text-[var(--foreground-muted)]">
                  {item.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Why Megapack */}
      <Section className="py-32" grid>
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-4">Переваги</Badge>
            <h2 className="text-display">
              Не просто батарея — інфраструктурна платформа
            </h2>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {advantages.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-8 h-full">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-[var(--power)]/10 text-[var(--power)]">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">{item.title}</h3>
                    <p className="text-[var(--foreground-muted)]">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Specifications */}
      <Section dark className="py-32">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Badge variant="warning" className="mb-4">
                Megapack 2XL
              </Badge>
              <h2 className="text-display">Орієнтовні характеристики</h2>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Card className="p-8">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {specs.map((spec, index) => (
                  <div key={index} className="text-center p-4">
                    <div className="text-3xl font-bold bg-gradient-to-r from-[var(--power)] to-[var(--accent)] bg-clip-text text-transparent mb-2">
                      {spec.value}
                    </div>
                    <div className="text-sm text-[var(--foreground-muted)]">
                      {spec.label}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-center text-sm text-[var(--foreground-subtle)] mt-6 pt-6 border-t border-white/5">
                * Фінальні параметри та конфігурація визначаються на етапі
                проєктування та узгодження з виробником.
              </p>
            </Card>
          </motion.div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="py-32" grid>
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-display mb-6">
              Зв'язок щодо{" "}
              <span className="bg-gradient-to-r from-[var(--power)] to-[var(--accent)] bg-clip-text text-transparent">
                Tesla Megapack
              </span>
            </h2>
            <p className="text-subheading mb-10">
              STEVARA працює з рішеннями Tesla Energy. Якщо для вас важливо
              визначити, у яких сценаріях Megapack є релевантним — залиште запит
              з коротким описом вашого контексту.
            </p>
            <Link
              href="/contacts"
              className="btn btn-primary text-lg px-8 py-4"
            >
              <MessageSquare className="w-5 h-5" />
              Ініціювати обговорення
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </Section>
    </>
  );
}
