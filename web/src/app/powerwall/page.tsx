"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  ArrowRight,
  Home,
  Store,
  Building,
  Heart,
  Zap,
  Smartphone,
  Battery,
  Shield,
  RefreshCw,
  Gauge,
  Phone,
  CheckCircle2,
  Settings,
  Headphones,
} from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

const HeroScene = dynamic(
  () => import("@/components/three/HeroScene").then((mod) => mod.HeroScene),
  { ssr: false }
);

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
};

const segments = [
  {
    icon: Home,
    title: "Приватні будинки",
    subtitle: "Контроль і автономність",
    features: [
      "Powerwall автоматично переходить на резерв і так само повертається до мережі",
      "У застосунку Tesla ви керуєте режимами, рівнем резерву та бачите стан системи",
      "Backup Reserve фіксує частину енергії для відключень",
      "Система розрахована на роботу з реальними навантаженнями дому",
    ],
  },
  {
    icon: Store,
    title: "Малий бізнес",
    subtitle: "Стандартизація і повторюваність",
    features: [
      "Одна архітектура рішення масштабується на одну локацію або на мережу",
      "Tesla app дає єдиний інтерфейс контролю для всіх точок",
      "Резерв працює автоматично, без процедур для персоналу",
      "Логіка керування оновлюється програмно",
    ],
  },
  {
    icon: Building,
    title: "Комерційні об'єкти",
    subtitle: "Інтеграція і масштаб",
    features: [
      "Powerwall інтегрується як повноцінний елемент енергосистеми об'єкта",
      "Система масштабується без зміни логіки керування",
      "Інтеграція з існуючими системами керування енергією",
      "Зрозумілий перехід до Megapack при зростанні потреб",
    ],
  },
  {
    icon: Heart,
    title: "Соціальні об'єкти",
    subtitle: "Передбачуваність і відповідальність",
    features: [
      "Powerwall автоматично переходить на резерв без ручних перемикань",
      "Стан системи прозоро відображається в застосунку",
      "Єдина архітектура знижує залежність від людського фактора",
      "Готовність до мережевих сценаріїв керування",
    ],
  },
];

const features = [
  {
    icon: Battery,
    title: "Автоматичний резерв",
    description:
      "Powerwall переходить у резерв автоматично. Повернення до мережі без ручних дій.",
  },
  {
    icon: Smartphone,
    title: "Керування через застосунок",
    description:
      "Режими роботи, стан системи і рівень резерву — в одному інтерфейсі Tesla.",
  },
  {
    icon: Shield,
    title: "Backup Reserve",
    description:
      "Ви задаєте рівень енергії, який завжди залишається для резерву.",
  },
  {
    icon: RefreshCw,
    title: "Програмні оновлення",
    description:
      "Логіка керування оновлюється програмно з часом без заміни обладнання.",
  },
];

const specs = [
  { label: "Корисна ємність", value: "13,5 кВт·год" },
  { label: "Безперервна потужність", value: "11,5 кВт" },
  { label: "Пускові струми", value: "до 185 LRA" },
  { label: "Ефективність", value: "до 97,5%" },
  { label: "Масштабування", value: "до 40,5 кВт·год" },
  { label: "Монтаж", value: "внутрішній/зовнішній" },
];

export default function PowerwallPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="gradient-top" />
        <div className="grid-bg" />
        <HeroScene />

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
                <Home className="w-3 h-3" />
                Residential
              </Badge>
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-hero mb-6">
              Tesla <span className="text-gradient">Powerwall</span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-subheading mb-10">
              Одне рішення для різних об'єктів — від приватного будинку до
              комерційного простору. Енергія доступна тоді, коли вона потрібна.
            </motion.p>

            <motion.div variants={fadeInUp}>
              <Link
                href="/contacts"
                className="btn btn-primary"
              >
                <Phone className="w-4 h-4" />
                Запросити дзвінок з інженером
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* For Whom Section */}
      <Section dark className="py-32">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-4">Для кого</Badge>
            <h2 className="text-display mb-4">Один продукт — різні потреби</h2>
            <p className="text-body max-w-3xl mx-auto">
              Tesla Powerwall — це цілісна енергетична система з автоматичним
              керуванням і контролем через застосунок. Від приватного будинку до
              комерційного об'єкта змінюються лише сценарії та масштаб.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {segments.map((segment, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-8 h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-[var(--accent-dim)] text-[var(--accent)]">
                    <segment.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium">{segment.title}</h3>
                    <p className="text-sm text-[var(--accent)]">
                      {segment.subtitle}
                    </p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {segment.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-[var(--energy)] flex-shrink-0 mt-1" />
                      <span className="text-sm text-[var(--foreground-muted)]">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* How It Works */}
      <Section className="py-32" grid>
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-4">
              <Zap className="w-3 h-3" />
              Як працює
            </Badge>
            <h2 className="text-display mb-4">
              Керована енергія без зайвої складності
            </h2>
            <p className="text-body max-w-2xl mx-auto">
              Powerwall працює як єдина система: резерв, керування і контроль
              об'єднані в одному рішенні. Уся логіка роботи закладена в
              продукті.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 text-center h-full">
                <div className="inline-flex p-4 rounded-2xl bg-[var(--accent-dim)] text-[var(--accent)] mb-4">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="font-medium mb-2">{feature.title}</h3>
                <p className="text-sm text-[var(--foreground-muted)]">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Card className="inline-block px-8 py-4">
            <p className="text-[var(--accent)] font-medium">
              Powerwall — це система, а не батарея. Енергія працює за вашим
              сценарієм.
            </p>
          </Card>
        </motion.div>
      </Section>

      {/* Why Powerwall */}
      <Section dark className="py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-6">Переваги</Badge>
            <h2 className="text-display mb-6">
              Інший підхід до{" "}
              <span className="text-accent">енергії вашого простору</span>
            </h2>
            <p className="text-body mb-8">
              Powerwall спроєктований як єдина система: акумулятор, інвертор,
              керування та резервне перемикання працюють разом за однією логікою.
            </p>

            <ul className="space-y-4">
              {[
                "Єдина архітектура — силова частина і керування узгоджені",
                "Автоматичний перехід на резерв менш ніж за секунду",
                "Потужність для реальних навантажень без обмежень",
                "Керування через застосунок Tesla в реальному часі",
                "Backup Reserve — енергія за вашим пріоритетом",
                "Програмні оновлення — система розвивається без заміни",
              ].map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-[var(--accent)] flex-shrink-0 mt-0.5" />
                  <span className="text-[var(--foreground-muted)]">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Card className="p-8">
              <h3 className="text-xl font-medium mb-6 flex items-center gap-3">
                <Gauge className="w-6 h-6 text-[var(--accent)]" />
                Технічні характеристики
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {specs.map((spec, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg bg-[var(--background-secondary)]"
                  >
                    <div className="text-2xl font-bold text-gradient mb-1">
                      {spec.value}
                    </div>
                    <div className="text-xs text-[var(--foreground-muted)]">
                      {spec.label}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </Section>

      {/* STEVARA Service */}
      <Section className="py-32" grid>
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-4">
              <Shield className="w-3 h-3" />
              STEVARA
            </Badge>
            <h2 className="text-display">
              Інженерний результат і сервіс протягом гарантії
            </h2>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Implementation */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 h-full">
              <div className="flex items-center gap-3 mb-6">
                <Settings className="w-6 h-6 text-[var(--accent)]" />
                <h3 className="text-xl font-medium">На етапі впровадження</h3>
              </div>
              <ul className="space-y-3">
                {[
                  "Інтеграція в електромережу з урахуванням фаз і реальних навантажень",
                  "Визначення ліній, які працюють під час відключень",
                  "Налаштування режимів роботи і рівня резерву",
                  "Запуск із перевіркою в реальних сценаріях",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[var(--energy)] flex-shrink-0 mt-1" />
                    <span className="text-[var(--foreground-muted)]">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>

          {/* Support */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 h-full">
              <div className="flex items-center gap-3 mb-6">
                <Headphones className="w-6 h-6 text-[var(--accent)]" />
                <h3 className="text-xl font-medium">Сервіс і гарантійний супровід</h3>
              </div>
              <ul className="space-y-3">
                {[
                  "Консультації у разі змін сценаріїв або запитань",
                  "Моніторинг ключових параметрів роботи Powerwall",
                  "Планові технічні перевірки",
                  "Взаємодія з Tesla у випадку гарантійних питань",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[var(--energy)] flex-shrink-0 mt-1" />
                    <span className="text-[var(--foreground-muted)]">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-8 text-[var(--foreground-muted)]"
        >
          Powerwall — це система на роки. STEVARA відповідає за інженерний
          результат і супровід у межах гарантії.
        </motion.p>
      </Section>

      {/* CTA Section */}
      <Section dark className="py-32">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-display mb-6">
              Почнімо з{" "}
              <span className="text-gradient">інженерної розмови</span>
            </h2>
            <p className="text-subheading mb-10">
              Розкажіть про ваш будинок чи комерційний простір, споживачів і
              очікування. Ми чесно скажемо, чи Powerwall — правильне рішення
              саме для вас.
            </p>
            <Link
              href="/contacts"
              className="btn btn-primary text-lg px-8 py-4"
            >
              <Phone className="w-5 h-5" />
              Запросити дзвінок з інженером
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </Section>
    </>
  );
}
