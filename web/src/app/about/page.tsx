"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Award, Users, Shield, Target } from "lucide-react";
import { EnergyWaveCanvas } from "@/components/ui/EnergyWaveCanvas";
import { CTASection } from "@/components/home";

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
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

const teamItems = [
  {
    icon: Award,
    title: "Сертифіковані інженери",
    description:
      "Інженери STEVARA пройшли навчання та сертифікацію Tesla. Роботи виконуються за стандартами виробника.",
  },
  {
    icon: Users,
    title: "Власна команда",
    description:
      "Ми виконуємо проєкти власною командою, без передачі ключових етапів субпідрядникам.",
  },
  {
    icon: Shield,
    title: "Офіційне обладнання",
    description:
      "Обладнання офіційно імпортоване з підтвердженням відповідності та сертифіковане в Україні.",
  },
  {
    icon: Target,
    title: "Єдиний стандарт",
    description:
      "Роботи виконуються за стандартами Tesla на всіх етапах: від проєктування до введення в експлуатацію.",
  },
];

export default function AboutPage() {
  const [isMobile, setIsMobile] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <main className="relative">
      {/* Hero - Dark with large typography */}
      <section
        ref={heroRef}
        style={{
          position: "relative",
          minHeight: isMobile ? "70dvh" : "80dvh",
          display: "flex",
          alignItems: "flex-end",
          backgroundColor: "#0a0a0a",
          overflow: "hidden",
        }}
      >
        {/* Interactive energy wave canvas */}
        <EnergyWaveCanvas containerRef={heroRef} />

        <div
          style={{
            position: "relative",
            zIndex: 10,
            width: "100%",
            maxWidth: "1280px",
            margin: "0 auto",
            padding: isMobile
              ? "140px 24px 60px"
              : "180px clamp(24px, 4vw, 48px) 80px",
          }}
        >
          {/* Label */}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              display: "inline-block",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.5)",
              marginBottom: "24px",
            }}
          >
            Про компанію
          </motion.span>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{
              fontFamily:
                'var(--font-dm-serif), Georgia, "Times New Roman", serif',
              fontSize: isMobile
                ? "clamp(32px, 8vw, 44px)"
                : "clamp(48px, 5vw, 72px)",
              fontWeight: 400,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              color: "#ffffff",
              margin: 0,
              marginBottom: "32px",
              maxWidth: "800px",
            }}
          >
            Інженерна команда Tesla Energy
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            style={{
              margin: 0,
              fontSize: isMobile ? "16px" : "18px",
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.6)",
              maxWidth: "560px",
            }}
          >
            STEVARA — українська інженерна компанія, яка спеціалізується на
            впровадженні систем накопичення енергії Tesla для приватних будинків
            та інфраструктурних об'єктів.
          </motion.p>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            style={{
              display: "flex",
              gap: isMobile ? "32px" : "56px",
              marginTop: isMobile ? "48px" : "64px",
              paddingTop: isMobile ? "32px" : "40px",
              borderTop: "1px solid rgba(255,255,255,0.1)",
              flexWrap: "wrap",
            }}
          >
            {[
              { value: "100%", label: "Офіційне обладнання" },
              { value: "Tesla", label: "Сертифікація інженерів" },
              { value: "Україна", label: "Проєкти по всій країні" },
            ].map((stat) => (
              <div key={stat.label}>
                <div
                  style={{
                    fontSize: isMobile ? "24px" : "28px",
                    fontWeight: 700,
                    color: "#ffffff",
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                    marginBottom: "6px",
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    color: "rgba(255,255,255,0.45)",
                    fontWeight: 500,
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ APPROACH — full-width 3 bordered cards ═══ */}
      <section
        className="section-padding"
        style={{ backgroundColor: "var(--background)" }}
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
          <div style={{ marginBottom: "clamp(48px, 6vw, 72px)" }}>
            <FadeIn>
              <span className="text-label" style={{ marginBottom: "16px" }}>
                Наш підхід
              </span>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 style={{ margin: 0, maxWidth: "680px" }}>
                Інженерний підхід{" "}
                <span style={{ color: "var(--foreground-muted)" }}>
                  замість шаблонних рішень
                </span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p
                style={{
                  margin: 0,
                  marginTop: "20px",
                  fontSize: "clamp(1rem, 1.5vw, 1.125rem)",
                  lineHeight: 1.7,
                  color: "var(--foreground-muted)",
                  maxWidth: "600px",
                }}
              >
                Ми розглядаємо системи накопичення енергії як частину
                інфраструктури об'єкта. Кожен проєкт починається з розуміння:
              </p>
            </FadeIn>
          </div>

          {/* 3-column bordered cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
              gap: isMobile ? "0" : "1px",
              backgroundColor: isMobile ? "transparent" : "var(--divider)",
              border: isMobile ? "none" : "1px solid var(--divider)",
            }}
          >
            {[
              {
                num: "01",
                title: "Аналіз електросистеми",
                text: "Як працює електросистема вашого об'єкта — фази, потужності, критичні навантаження.",
              },
              {
                num: "02",
                title: "Сценарії використання",
                text: "Які навантаження та сценарії використання є критичними для вашого об'єкта.",
              },
              {
                num: "03",
                title: "Режими роботи",
                text: "У яких режимах система має працювати під час перебоїв та в нормальному стані.",
              },
            ].map((step, index) => (
              <FadeIn key={step.num} delay={0.2 + index * 0.08}>
                <div
                  style={{
                    padding: isMobile
                      ? "32px 0"
                      : "clamp(32px, 4vw, 48px)",
                    backgroundColor: "var(--background)",
                    borderTop: isMobile ? "1px solid var(--divider)" : "none",
                    height: "100%",
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      fontSize: "12px",
                      fontWeight: 600,
                      letterSpacing: "0.1em",
                      color: "var(--foreground-muted)",
                      marginBottom: "20px",
                    }}
                  >
                    {step.num}
                  </span>
                  <h4
                    style={{
                      margin: 0,
                      marginBottom: "12px",
                      fontSize: "clamp(1.05rem, 1.5vw, 1.2rem)",
                    }}
                  >
                    {step.title}
                  </h4>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "clamp(0.875rem, 1.2vw, 0.9375rem)",
                      lineHeight: 1.65,
                      color: "var(--foreground-muted)",
                    }}
                  >
                    {step.text}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
          {isMobile && (
            <div style={{ borderTop: "1px solid var(--divider)" }} />
          )}
        </div>
      </section>

      {/* Why Only Tesla - centered cinematic section */}
      <section
        style={{
          backgroundColor: "#000000",
          position: "relative",
          overflow: "hidden",
          padding: isMobile
            ? "clamp(60px, 10vw, 80px) 24px"
            : "clamp(80px, 10vw, 100px) clamp(24px, 4vw, 48px)",
        }}
      >
        {/* Decorative large quote mark */}
        <div
          style={{
            position: "absolute",
            top: isMobile ? "40px" : "60px",
            left: "50%",
            transform: "translateX(-50%)",
            fontFamily:
              'var(--font-dm-serif), Georgia, "Times New Roman", serif',
            fontSize: isMobile ? "200px" : "clamp(300px, 25vw, 400px)",
            lineHeight: 0.8,
            color: "rgba(255,255,255,0.02)",
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          "
        </div>

        <div
          style={{
            width: "100%",
            maxWidth: "900px",
            margin: "0 auto",
            textAlign: "center",
            position: "relative",
            zIndex: 2,
          }}
        >
          <FadeIn>
            <span
              style={{
                display: "inline-block",
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.35)",
                marginBottom: "clamp(32px, 5vw, 56px)",
              }}
            >
              Наш фокус
            </span>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p
              style={{
                margin: 0,
                fontFamily:
                  'var(--font-dm-serif), Georgia, "Times New Roman", serif',
                fontSize: isMobile
                  ? "clamp(22px, 6vw, 32px)"
                  : "clamp(30px, 3.2vw, 44px)",
                fontWeight: 400,
                lineHeight: 1.4,
                color: "#ffffff",
                marginBottom: "clamp(32px, 5vw, 48px)",
              }}
            >
              Ми не пропонуємо альтернативи для здешевлення. Tesla — це
              перевірена технологія, передбачуваний сервіс і зрозуміла
              екосистема.
            </p>
          </FadeIn>

          {/* Divider line */}
          <FadeIn delay={0.2}>
            <div
              style={{
                width: "60px",
                height: "1px",
                backgroundColor: "rgba(255,255,255,0.15)",
                margin: "0 auto",
                marginBottom: "clamp(32px, 5vw, 48px)",
              }}
            />
          </FadeIn>

          <FadeIn delay={0.25}>
            <p
              style={{
                margin: "0 auto",
                fontSize: "clamp(0.9375rem, 1.4vw, 1.0625rem)",
                lineHeight: 1.75,
                color: "rgba(255,255,255,0.5)",
                maxWidth: "560px",
              }}
            >
              Ми обрали фокус на одному виробнику, щоб глибоко знати архітектуру
              систем, логіку їх роботи та вимоги до інтеграції. Такий підхід
              дозволяє відповідати за результат.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Team & Certifications */}
      <section
        className="section-padding"
        style={{
          backgroundColor: "var(--background)",
          borderBottom: "1px solid var(--divider)",
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
          <div style={{ marginBottom: "clamp(48px, 6vw, 72px)" }}>
            <FadeIn>
              <span className="text-label" style={{ marginBottom: "16px" }}>
                Команда
              </span>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h2 style={{ margin: 0, maxWidth: "600px" }}>
                Працюємо за стандартами{" "}
                <span style={{ color: "var(--foreground-muted)" }}>
                  виробника
                </span>
              </h2>
            </FadeIn>
          </div>

          {/* Grid - 2x2 */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: "0",
            }}
          >
            {teamItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <FadeIn key={item.title} delay={0.15 + index * 0.08}>
                  <div
                    style={{
                      padding: isMobile
                        ? "28px 0"
                        : "clamp(32px, 3.5vw, 44px) clamp(24px, 3vw, 40px)",
                      borderTop: "1px solid var(--divider)",
                      borderRight:
                        !isMobile && index % 2 === 0
                          ? "1px solid var(--divider)"
                          : "none",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: "16px",
                        alignItems: "flex-start",
                      }}
                    >
                      <Icon
                        style={{
                          width: "20px",
                          height: "20px",
                          color: "var(--foreground-muted)",
                          flexShrink: 0,
                          marginTop: "2px",
                        }}
                      />
                      <div>
                        <h4
                          style={{
                            margin: 0,
                            marginBottom: "8px",
                            fontSize: "clamp(1rem, 1.4vw, 1.125rem)",
                          }}
                        >
                          {item.title}
                        </h4>
                        <p
                          style={{
                            margin: 0,
                            fontSize: "clamp(0.875rem, 1.2vw, 0.9375rem)",
                            lineHeight: 1.65,
                            color: "var(--foreground-muted)",
                          }}
                        >
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
          <div style={{ borderTop: "1px solid var(--divider)" }} />
        </div>
      </section>

      {/* Geography */}
      <section
        className="section-padding"
        style={{
          backgroundColor: "var(--background)",
          borderBottom: "1px solid var(--divider)",
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
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: isMobile ? "24px" : "clamp(60px, 8vw, 120px)",
              alignItems: "start",
            }}
          >
            <div>
              <FadeIn>
                <span className="text-label" style={{ marginBottom: "16px" }}>
                  Географія
                </span>
              </FadeIn>

              <FadeIn delay={0.1}>
                <h2 style={{ margin: 0 }}>
                  Реалізуємо проєкти{" "}
                  <span style={{ color: "var(--foreground-muted)" }}>
                    по всій Україні
                  </span>
                </h2>
              </FadeIn>
            </div>

            <div>
              <FadeIn delay={0.2}>
                <p
                  style={{
                    margin: 0,
                    marginBottom: "16px",
                    fontSize: "clamp(1rem, 1.5vw, 1.125rem)",
                    lineHeight: 1.7,
                    color: "var(--foreground-muted)",
                  }}
                >
                  Ми турбуємося, щоб надійні та безпечні рішення Tesla були
                  доступні в будь-якому куточку України.
                </p>
              </FadeIn>

              <FadeIn delay={0.25}>
                <p
                  style={{
                    margin: 0,
                    fontSize: "clamp(0.875rem, 1.2vw, 0.9375rem)",
                    lineHeight: 1.65,
                    color: "var(--foreground-muted)",
                  }}
                >
                  Формат взаємодії, виїзди та супровід визначаються типом
                  об'єкта та погоджуються на етапі обговорення проєкту.
                </p>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* CTA — same as homepage */}
      <CTASection />
    </main>
  );
}
