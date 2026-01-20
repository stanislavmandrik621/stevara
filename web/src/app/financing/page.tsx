"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Wallet,
  Shield,
  CheckCircle2,
  Building,
  CreditCard,
  Calendar,
  TrendingUp,
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

const benefits = [
  "Зменшити початкове інвестиційне навантаження",
  "Зберегти ліквідність і оборотний капітал",
  "Зробити витрати передбачуваними для бюджету",
  "Запустити систему без очікування повного фінансування",
  "Адаптувати інвестиції під реальні потреби проєкту",
];

const leasingFeatures = [
  { label: "Перший внесок", value: "від 10%" },
  { label: "Термін", value: "до 7 років" },
  { label: "Власність", value: "після договору" },
];

const creditFeatures = [
  { label: "Термін", value: "до 10 років" },
  { label: "Власність", value: "одразу" },
  { label: "Умови", value: "індивідуально" },
];

export default function FinancingPage() {
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
                <Wallet className="w-3 h-3" />
                Фінансування
              </Badge>
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-hero mb-6">
              Енергетичні рішення Tesla{" "}
              <span className="text-gradient">доступні з першого дня</span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-subheading mb-10">
              Фінансові інституції працюють зі STEVARA та рішеннями, які ми
              впроваджуємо. Це відкриває нашим клієнтам доступ до продуктів Tesla
              Energy на вигідних умовах.
            </motion.p>

            <motion.div variants={fadeInUp}>
              <Link href="/contacts" className="btn btn-primary">
                <Phone className="w-4 h-4" />
                Запланувати розмову
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Why Possible */}
      <Section dark className="py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-6">
              <Shield className="w-3 h-3" />
              Довіра
            </Badge>
            <h2 className="text-display mb-6">
              Довіра до рішень і{" "}
              <span className="text-accent">інженерного підходу</span>
            </h2>
            <p className="text-body mb-6">
              Фінансування інфраструктурних енергетичних проєктів можливе тоді,
              коли обладнання та підхід до його впровадження є надійними й
              передбачуваними протягом усього життєвого циклу.
            </p>
            <p className="text-body mb-6">
              STEVARA — інженерна компанія, що спеціалізується на впровадженні
              рішень Tesla Energy. Ми працюємо з продуктами, що мають
              стандартизовану архітектуру, підтверджену якість і зрозумілу логіку
              експлуатації.
            </p>
            <p className="text-[var(--foreground-muted)]">
              Саме тому фінансові партнери готові працювати з проєктами STEVARA.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Card className="p-8">
              <h3 className="text-xl font-medium mb-6 flex items-center gap-3">
                <TrendingUp className="w-6 h-6 text-[var(--accent)]" />
                Результат для вас
              </h3>
              <ul className="space-y-4">
                {[
                  "Нижчий поріг входу",
                  "Гнучкі умови",
                  "Прозорий фінансовий процес",
                ].map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 text-lg text-[var(--foreground-muted)]"
                  >
                    <CheckCircle2 className="w-5 h-5 text-[var(--energy)]" />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>
        </div>
      </Section>

      {/* When Financing Makes Sense */}
      <Section className="py-32" grid>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Badge className="mb-4">Коли це має сенс</Badge>
              <h2 className="text-display">
                Коли фінансування є оптимальним рішенням
              </h2>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="p-8">
              <p className="text-lg text-[var(--foreground-muted)] mb-8">
                Фінансування доцільне, коли важливо:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {benefits.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[var(--accent)] flex-shrink-0 mt-0.5" />
                    <span className="text-[var(--foreground-muted)]">{item}</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </Section>

      {/* Financing Models */}
      <Section dark className="py-32">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-4">Моделі</Badge>
            <h2 className="text-display">Моделі фінансування</h2>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Leasing */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 h-full">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-[var(--accent-dim)] text-[var(--accent)]">
                  <Building className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-medium">Лізинг</h3>
              </div>
              <p className="text-[var(--foreground-muted)] mb-8">
                Обладнання фінансується через лізингову модель з можливістю
                переходу у власність після завершення договору. Підходить, коли
                важливо зберегти оборотний капітал.
              </p>
              <div className="space-y-4 mb-8">
                {leasingFeatures.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-3 border-b border-white/5"
                  >
                    <span className="text-[var(--foreground-muted)]">
                      {item.label}
                    </span>
                    <span className="font-medium text-[var(--accent)]">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
              <Link
                href="/contacts"
                className="btn btn-secondary w-full justify-center"
              >
                Запланувати розмову
              </Link>
            </Card>
          </motion.div>

          {/* Credit */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 h-full">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-[var(--energy)]/10 text-[var(--energy)]">
                  <CreditCard className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-medium">Кредитне фінансування</h3>
              </div>
              <p className="text-[var(--foreground-muted)] mb-8">
                Фінансування через банківські або партнерські установи.
                Підходить, коли важлива власність на обладнання з першого дня та
                індивідуальна структура погашення.
              </p>
              <div className="space-y-4 mb-8">
                {creditFeatures.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-3 border-b border-white/5"
                  >
                    <span className="text-[var(--foreground-muted)]">
                      {item.label}
                    </span>
                    <span className="font-medium text-[var(--energy)]">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
              <Link
                href="/contacts"
                className="btn btn-secondary w-full justify-center"
              >
                Запланувати розмову
              </Link>
            </Card>
          </motion.div>
        </div>
      </Section>

      {/* Comparison Table */}
      <Section className="py-32" grid>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-display">Порівняння моделей</h2>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left p-4 font-medium text-[var(--foreground-muted)]">
                      Параметр
                    </th>
                    <th className="text-center p-4 font-medium text-[var(--accent)]">
                      Лізинг
                    </th>
                    <th className="text-center p-4 font-medium text-[var(--energy)]">
                      Кредит
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      param: "Початковий внесок",
                      leasing: "від 10%",
                      credit: "індивідуально",
                    },
                    {
                      param: "Власність",
                      leasing: "після договору",
                      credit: "одразу",
                    },
                    {
                      param: "Термін",
                      leasing: "до 7 років",
                      credit: "до 10 років",
                    },
                  ].map((row, index) => (
                    <tr
                      key={index}
                      className="border-b border-white/5 last:border-0"
                    >
                      <td className="p-4 text-[var(--foreground-muted)]">
                        {row.param}
                      </td>
                      <td className="p-4 text-center">{row.leasing}</td>
                      <td className="p-4 text-center">{row.credit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
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
              Обговоримо фінансування{" "}
              <span className="text-gradient">вашого проєкту</span>
            </h2>
            <p className="text-subheading mb-10">
              Опишіть вашу задачу та базові параметри — ми допоможемо визначити
              оптимальну модель фінансування відповідно до вашого контексту.
            </p>
            <Link
              href="/contacts"
              className="btn btn-primary text-lg px-8 py-4"
            >
              <Calendar className="w-5 h-5" />
              Запланувати розмову
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </Section>
    </>
  );
}
