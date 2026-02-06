"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import {
  Zap,
  Box,
  SlidersHorizontal,
  Smartphone,
  RefreshCw,
  Sun,
  ShieldCheck,
} from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Автоматичний резерв",
    description:
      "20 мс — і дім продовжує працювати. Котел не перезапускається. Ви дізнаєтесь про відключення лише з застосунку.",
    mobileDescription:
      "Перехід за 20 мс. Дім продовжує працювати без переривань.",
  },
  {
    icon: Box,
    title: "Єдина архітектура",
    description:
      "Один виробник, один продукт, одна система — передбачувана робота рік за роком.",
    mobileDescription:
      "Один виробник. Один продукт. Передбачувана робота роками.",
  },
  {
    icon: SlidersHorizontal,
    title: "Режими під ваш дім",
    description:
      "Пріоритети живлення і рівень резерву визначаєте ви. Система адаптується під ваш стиль життя.",
    mobileDescription:
      "Пріоритети живлення і рівень резерву визначаєте ви.",
  },
  {
    icon: Smartphone,
    title: "Контроль у застосунку",
    description:
      "Вся енергія дому в одному інтерфейсі з єдиною логікою керування.",
    mobileDescription:
      "Вся енергія дому в одному інтерфейсі.",
  },
  {
    icon: RefreshCw,
    title: "Оновлення від Tesla",
    description:
      "Алгоритми і режими оновлюються автоматично. Система стає функціональнішою з часом.",
    mobileDescription:
      "Система стає функціональнішою з часом.",
  },
  {
    icon: Sun,
    title: "Екосистема та зростання",
    description:
      "Сонячна генерація, зарядка авто, додаткові батареї — система адаптується без заміни основи.",
    mobileDescription:
      "Сонце, розширення, нові сценарії — система адаптується.",
  },
  {
    icon: ShieldCheck,
    title: "Гарантія 10 років",
    description:
      "Продукт, спроєктований під десятиліття експлуатації.",
    mobileDescription:
      "Рівень відповідальності виробника.",
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

export function OfficialHighlightsSection() {
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
        backgroundColor: "#0a0a0a",
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
        {/* Two-column header */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: isMobile ? "24px" : "clamp(60px, 8vw, 120px)",
            alignItems: "end",
            marginBottom: "clamp(48px, 8vw, 80px)",
          }}
        >
          {/* Left - title */}
          <div>
            <FadeIn>
              <span className="text-label" style={{ color: "rgba(255,255,255,0.5)", marginBottom: "16px" }}>
                Tesla Powerwall
              </span>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 style={{ color: "#ffffff", margin: 0 }}>
                Інший клас резерву
              </h2>
            </FadeIn>
          </div>

          {/* Right - description */}
          <FadeIn delay={0.2}>
            <p
              style={{
                fontSize: "clamp(0.9375rem, 1.5vw, 1.0625rem)",
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.55)",
                margin: 0,
              }}
            >
              Інтегрована енергетична система для дому, що поєднує збереження
              енергії, автоматичний резерв і керування режимами роботи. Енергія
              доступна тоді, коли вона потрібна.
            </p>
          </FadeIn>
        </div>

        {/* Feature list - clean minimal rows */}
        <div>
          {features.map((item, index) => (
            <FadeIn key={item.title} delay={0.15 + index * 0.04}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile ? "1fr" : "40px 200px 1fr",
                  gap: isMobile ? "8px" : "clamp(24px, 3vw, 40px)",
                  alignItems: isMobile ? "flex-start" : "center",
                  padding: isMobile ? "20px 0" : "clamp(20px, 2.5vw, 28px) 0",
                  borderTop: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {/* Icon */}
                <div
                  style={{
                    color: "rgba(255,255,255,0.35)",
                    display: isMobile ? "none" : "flex",
                    alignItems: "center",
                  }}
                >
                  <item.icon style={{ width: "18px", height: "18px" }} />
                </div>

                {/* Title */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  {isMobile && (
                    <item.icon
                      style={{
                        width: "16px",
                        height: "16px",
                        color: "rgba(255,255,255,0.35)",
                        flexShrink: 0,
                      }}
                    />
                  )}
                  <span
                    style={{
                      fontSize: isMobile ? "15px" : "15px",
                      fontWeight: 600,
                      color: "#ffffff",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {item.title}
                  </span>
                </div>

                {/* Description */}
                <p
                  style={{
                    margin: 0,
                    fontSize: isMobile ? "14px" : "14px",
                    lineHeight: 1.6,
                    color: "rgba(255,255,255,0.45)",
                    paddingLeft: isMobile ? "26px" : "0",
                  }}
                >
                  {isMobile ? item.mobileDescription : item.description}
                </p>
              </div>
            </FadeIn>
          ))}
          {/* Bottom border */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }} />
        </div>
      </div>
    </section>
  );
}
