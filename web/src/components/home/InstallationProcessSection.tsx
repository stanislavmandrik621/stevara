"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import {
  MessageSquare,
  FileText,
  Wrench,
  Play,
  HeadphonesIcon,
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Консультація",
    description: "Розмова з інженером про ваш об'єкт та потреби",
  },
  {
    number: "02",
    icon: FileText,
    title: "Проєкт",
    description: "Аналіз, конфігурація та технічне рішення",
  },
  {
    number: "03",
    icon: Wrench,
    title: "Монтаж",
    description: "Професійне встановлення сертифікованою командою",
  },
  {
    number: "04",
    icon: Play,
    title: "Запуск",
    description: "Налаштування режимів та перевірка роботи",
  },
  {
    number: "05",
    icon: HeadphonesIcon,
    title: "Супровід",
    description: "Моніторинг, підтримка та сервіс після запуску",
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
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Auto-advance steps when in view
  useEffect(() => {
    if (!isInView) return;

    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <section
      ref={sectionRef}
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
        <div
          style={{
            textAlign: "center",
            maxWidth: "800px",
            margin: "0 auto",
            marginBottom: "clamp(60px, 10vw, 100px)",
          }}
        >
          <FadeIn>
            <span
              style={{
                display: "inline-block",
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.5)",
                marginBottom: "20px",
              }}
            >
              Як працюємо
            </span>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h2 style={{ color: "#ffffff", marginBottom: "24px" }}>
              Від консультації до стабільної роботи
            </h2>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p
              style={{
                margin: 0,
                fontSize: "clamp(1rem, 1.6vw, 1.125rem)",
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.6)",
                maxWidth: "600px",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              Прозорий процес з чітким розумінням кожного етапу
            </p>
          </FadeIn>
        </div>

        {/* Steps - Timeline style */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(5, 1fr)",
            gap: isMobile ? "0" : "1px",
            backgroundColor: isMobile ? "transparent" : "rgba(255,255,255,0.1)",
          }}
        >
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === activeStep;

            return (
              <FadeIn key={step.number} delay={0.2 + index * 0.05}>
                <div
                  onClick={() => setActiveStep(index)}
                  style={{
                    backgroundColor: "#000000",
                    padding: isMobile ? "24px 0" : "clamp(24px, 3vw, 32px)",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                    cursor: "pointer",
                    borderBottom: isMobile
                      ? "1px solid rgba(255,255,255,0.1)"
                      : "none",
                    transition: "background-color 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "rgba(255,255,255,0.03)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#000000";
                  }}
                >
                  {/* Progress indicator */}
                  <div
                    style={{
                      height: "2px",
                      backgroundColor: "rgba(255,255,255,0.1)",
                      borderRadius: "1px",
                      overflow: "hidden",
                      marginBottom: "8px",
                    }}
                  >
                    <motion.div
                      initial={{ width: "0%" }}
                      animate={{
                        width: isActive ? "100%" : index < activeStep ? "100%" : "0%",
                      }}
                      transition={{
                        duration: isActive ? 3 : 0.3,
                        ease: isActive ? "linear" : "easeOut",
                      }}
                      style={{
                        height: "100%",
                        backgroundColor: "#ffffff",
                      }}
                    />
                  </div>

                  {/* Icon */}
                  <div
                    style={{
                      color: isActive
                        ? "#ffffff"
                        : "rgba(255,255,255,0.4)",
                      transition: "color 0.3s ease",
                    }}
                  >
                    <Icon style={{ width: "24px", height: "24px" }} />
                  </div>

                  {/* Number */}
                  <span
                    style={{
                      fontFamily:
                        "var(--font-inter), -apple-system, BlinkMacSystemFont, sans-serif",
                      fontSize: "11px",
                      fontWeight: 600,
                      letterSpacing: "0.1em",
                      color: isActive
                        ? "rgba(255,255,255,0.7)"
                        : "rgba(255,255,255,0.3)",
                      transition: "color 0.3s ease",
                    }}
                  >
                    {step.number}
                  </span>

                  {/* Title */}
                  <h4
                    style={{
                      margin: 0,
                      color: isActive ? "#ffffff" : "rgba(255,255,255,0.6)",
                      fontSize: isMobile ? "1.125rem" : "clamp(1rem, 1.3vw, 1.125rem)",
                      transition: "color 0.3s ease",
                    }}
                  >
                    {step.title}
                  </h4>

                  {/* Description */}
                  <p
                    style={{
                      margin: 0,
                      fontSize: "clamp(0.85rem, 1.1vw, 0.9rem)",
                      lineHeight: 1.5,
                      color: isActive
                        ? "rgba(255,255,255,0.6)"
                        : "rgba(255,255,255,0.4)",
                      transition: "color 0.3s ease",
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
