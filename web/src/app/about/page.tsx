"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Users,
  Target,
  Zap,
  Shield,
  Award,
  MapPin,
  CheckCircle2,
  Phone,
} from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
};

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="gradient-top" />
        <div className="grid-bg" />

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
              <Badge className="mb-6">
                <Users className="w-3 h-3" />
                Про компанію
              </Badge>
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-hero mb-6">
              Інженерна команда{" "}
              <span className="text-gradient">Tesla Energy</span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-subheading max-w-3xl">
              STEVARA — українська інженерна компанія, яка спеціалізується на
              впровадженні систем накопичення енергії Tesla для приватних
              будинків, бізнесу та інфраструктурних об'єктів.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* How We Work */}
      <Section dark className="py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-6">
              <Target className="w-3 h-3" />
              Наш підхід
            </Badge>
            <h2 className="text-display mb-6">
              Інженерний підхід замість{" "}
              <span className="text-accent">шаблонних рішень</span>
            </h2>
            <p className="text-body mb-8">
              Ми розглядаємо системи накопичення енергії як частину
              інфраструктури об'єкта, а не як окремий пристрій. Ми працюємо не
              як продавець обладнання, а як інженерний партнер.
            </p>

            <div className="space-y-4">
              <p className="text-[var(--foreground-muted)]">
                Кожен проєкт починається з розуміння:
              </p>
              {[
                "Як працює електросистема вашого об'єкта",
                "Які навантаження та сценарії використання є критичними",
                "У яких режимах система має працювати під час перебоїв",
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-[var(--energy)] flex-shrink-0 mt-1" />
                  <span className="text-[var(--foreground-muted)]">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-dim)] to-transparent rounded-3xl blur-3xl opacity-30" />
            <Card className="relative p-8 lg:p-12">
              <div className="text-center">
                <div className="text-6xl lg:text-7xl font-bold text-gradient mb-4">
                  100%
                </div>
                <p className="text-xl text-[var(--foreground-muted)]">
                  Передбачувана робота системи після запуску
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </Section>

      {/* Why Only Tesla */}
      <Section className="py-32" grid>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-6">
              <Zap className="w-3 h-3" />
              Наш фокус
            </Badge>
            <h2 className="text-display mb-6">
              Чому ми працюємо тільки з{" "}
              <span className="text-gradient">Tesla</span>
            </h2>
            <p className="text-subheading mb-12">
              Ми не пропонуємо альтернативи для здешевлення. Tesla — це
              перевірена технологія, передбачуваний сервіс і зрозуміла
              екосистема.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-8 lg:p-12 text-left">
              <p className="text-lg text-[var(--foreground-muted)] leading-relaxed">
                Ми обрали фокус на одному виробнику, щоб глибоко знати
                архітектуру систем, логіку їх роботи та вимоги до інтеграції.
                Такий підхід дозволяє відповідати за результат і не пропонувати
                компромісні альтернативи.
              </p>
            </Card>
          </motion.div>
        </div>
      </Section>

      {/* Team & Certifications */}
      <Section dark className="py-32">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-4">
              <Award className="w-3 h-3" />
              Команда
            </Badge>
            <h2 className="text-display">
              Працюємо за стандартами виробника
            </h2>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              icon: Award,
              title: "Сертифіковані інженери",
              description:
                "Інженери STEVARA пройшли навчання та сертифікацію Tesla",
            },
            {
              icon: Users,
              title: "Власна команда",
              description:
                "Ми виконуємо проєкти власною командою, без передачі ключових етапів субпідрядникам",
            },
            {
              icon: Shield,
              title: "Офіційне обладнання",
              description:
                "Обладнання офіційно імпортоване з підтвердженням відповідності та сертифіковане в Україні",
            },
            {
              icon: Target,
              title: "Єдиний стандарт",
              description:
                "Роботи виконуються за стандартами Tesla на всіх етапах: від проєктування до введення в експлуатацію",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-8 h-full">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-[var(--accent-dim)] text-[var(--accent)]">
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

      {/* Geography */}
      <Section className="py-32" grid>
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-6">
              <MapPin className="w-3 h-3" />
              Географія
            </Badge>
            <h2 className="text-display mb-6">
              Реалізуємо проєкти{" "}
              <span className="text-gradient">по всій Україні</span>
            </h2>
            <p className="text-subheading mb-8">
              Ми турбуємося, щоб надійні та безпечні рішення Tesla були доступні
              в будь-якому куточку України.
            </p>
            <p className="text-body">
              Формат взаємодії, виїзди та супровід визначаються типом об'єкта та
              погоджуються на етапі обговорення проєкту.
            </p>
          </motion.div>
        </div>
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
              Якщо вам важливо зрозуміти, чи підходить рішення на базі Tesla
              саме для вашого об'єкта — ми готові обговорити це з вами.
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
