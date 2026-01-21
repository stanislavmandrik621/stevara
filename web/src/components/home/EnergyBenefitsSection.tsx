"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Shield, PiggyBank, Leaf } from "lucide-react";

const benefits = [
  {
    icon: Shield,
    title: "Енергонезалежність і резерв",
    description:
      "Powerwall підтримує резервне живлення і автоматичне перемикання.",
  },
  {
    icon: PiggyBank,
    title: "Оптимізація витрат",
    description:
      "Збережена енергія використовується у пікові години для економії.",
  },
  {
    icon: Leaf,
    title: "Чиста енергія та стійкість",
    description:
      "Інтеграція з сонячною генерацією та стабільність для великих обʼєктів.",
  },
];

function FadeIn({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function EnergyBenefitsSection() {
  return (
    <section
      className="section-padding"
      style={{
        position: "relative",
        backgroundColor: "var(--background)",
        borderTop: "1px solid var(--divider)",
      }}
    >
      {/* Container - 1280px aligned with header */}
      <div
        style={{
          width: "100%",
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 clamp(24px, 4vw, 48px)",
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: "clamp(32px, 6vw, 64px)" }}>
          <FadeIn>
            <span className="text-label" style={{ marginBottom: "16px" }}>
              Чому Tesla Energy
            </span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 style={{ marginBottom: "16px" }}>
              Енергія, яка працює на вас
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p
              className="text-lead"
              style={{
                maxWidth: "680px",
                margin: 0,
              }}
            >
              Ми адаптуємо системи Tesla Energy до умов України для стабільної
              роботи та контролю витрат.
            </p>
          </FadeIn>
        </div>

        {/* Benefits grid */}
        <div className="grid-responsive-3">
          {benefits.map((benefit, index) => (
            <FadeIn key={benefit.title} delay={0.2 + index * 0.1}>
              <div
                style={{
                  height: "100%",
                  padding: "clamp(16px, 3vw, 24px) 0",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                <div
                  style={{
                    color: "var(--foreground-muted)",
                  }}
                >
                  <benefit.icon style={{ width: "24px", height: "24px" }} />
                </div>
                <h4 style={{ margin: 0 }}>{benefit.title}</h4>
                <p
                  style={{
                    margin: 0,
                    fontSize: "clamp(0.95rem, 1.4vw, 1.05rem)",
                    lineHeight: 1.6,
                    color: "var(--foreground-muted)",
                  }}
                >
                  {benefit.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
