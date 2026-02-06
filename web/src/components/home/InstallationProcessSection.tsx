"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import {
  FileSearch,
  Plug,
  Settings,
  HeadphonesIcon,
} from "lucide-react";

const steps = [
  {
    icon: FileSearch,
    title: "Проєктування",
    description:
      "Аналіз об'єкта: фази, потужності, критичні навантаження. Визначення конфігурації системи.",
  },
  {
    icon: Plug,
    title: "Інтеграція",
    description:
      "Інтеграція в електросистему об'єкта з урахуванням її параметрів. Та сама команда, що проєктувала.",
  },
  {
    icon: Settings,
    title: "Налаштування і запуск",
    description:
      "Режими роботи, пріоритети живлення, логіка системи. Перевірка в реальних умовах.",
  },
  {
    icon: HeadphonesIcon,
    title: "Сервіс",
    description:
      "Після запуску система залишається під сервісним наглядом STEVARA.",
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

export function InstallationProcessSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <section
      className="section-padding"
      style={{
        position: "relative",
        backgroundColor: "#000000",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 clamp(24px, 4vw, 48px)",
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: "clamp(48px, 8vw, 72px)" }}>
          <FadeIn>
            <span style={{
              display: "inline-block",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.5)",
              marginBottom: "16px",
            }}>
              Як працюємо
            </span>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h2 style={{ margin: 0, maxWidth: "600px", color: "#ffffff" }}>
              Від аналізу до стабільної роботи
            </h2>
          </FadeIn>
        </div>

        {/* Steps - 4 columns */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(4, 1fr)",
            gap: isMobile ? "0" : "1px",
            backgroundColor: isMobile ? "transparent" : "rgba(255,255,255,0.1)",
          }}
        >
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <FadeIn key={step.title} delay={0.15 + index * 0.08}>
                <div
                  style={{
                    backgroundColor: "#000000",
                    padding: isMobile
                      ? "24px 0"
                      : "clamp(28px, 3vw, 36px)",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                    borderTop: isMobile ? "1px solid rgba(255,255,255,0.1)" : "none",
                  }}
                >
                  {/* Step number + icon */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      marginBottom: "4px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: 600,
                        letterSpacing: "0.08em",
                        color: "rgba(255,255,255,0.5)",
                      }}
                    >
                      0{index + 1}
                    </span>
                    <Icon
                      style={{
                        width: "18px",
                        height: "18px",
                        color: "rgba(255,255,255,0.5)",
                        opacity: 0.6,
                      }}
                    />
                  </div>

                  {/* Title */}
                  <h4
                    style={{
                      margin: 0,
                      fontSize: "clamp(1rem, 1.3vw, 1.0625rem)",
                      color: "#ffffff",
                    }}
                  >
                    {step.title}
                  </h4>

                  {/* Description */}
                  <p
                    style={{
                      margin: 0,
                      fontSize: "clamp(0.8125rem, 1.1vw, 0.875rem)",
                      lineHeight: 1.6,
                      color: "rgba(255,255,255,0.5)",
                    }}
                  >
                    {step.description}
                  </p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
