"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

const reasons = [
  {
    number: "01",
    title: "Тільки Tesla",
    description:
      "STEVARA працює виключно з рішеннями Tesla Energy, зокрема Powerwall. Одна система. Одна експертиза. Одна відповідальність за результат.",
  },
  {
    number: "02",
    title: "Офіційне обладнання",
    description:
      "Імпортоване з підтвердженням походження. Сертифіковане в Україні.",
  },
  {
    number: "03",
    title: "Сертифіковані інженери",
    description:
      "Команда пройшла навчання та сертифікацію Tesla. Роботи виконуються за стандартами виробника — від проєктування до запуску.",
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
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function ValueSection() {
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
        backgroundColor: "var(--background)",
        borderTop: "1px solid var(--divider)",
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
        {/* Two-column layout: title left, items right */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1.4fr",
            gap: isMobile ? "40px" : "clamp(60px, 8vw, 120px)",
            alignItems: "start",
          }}
        >
          {/* Left - sticky title */}
          <div
            style={{
              position: isMobile ? "relative" : "sticky",
              top: isMobile ? "auto" : "120px",
            }}
          >
            <FadeIn>
              <span className="text-label" style={{ marginBottom: "16px" }}>
                Чому STEVARA
              </span>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h2 style={{ margin: 0 }}>
                Одна команда.{" "}
                <span style={{ color: "var(--foreground-muted)" }}>
                  Повна відповідальність.
                </span>
              </h2>
            </FadeIn>
          </div>

          {/* Right - reason items */}
          <div>
            {reasons.map((reason, index) => (
              <FadeIn key={reason.number} delay={0.15 + index * 0.1}>
                <div
                  style={{
                    padding: isMobile ? "28px 0" : "clamp(28px, 3.5vw, 40px) 0",
                    borderTop: "1px solid var(--divider)",
                    display: "flex",
                    gap: isMobile ? "16px" : "clamp(24px, 3vw, 40px)",
                    alignItems: "flex-start",
                  }}
                >
                  {/* Number */}
                  <span
                    style={{
                      fontFamily:
                        "var(--font-inter), -apple-system, BlinkMacSystemFont, sans-serif",
                      fontSize: "13px",
                      fontWeight: 500,
                      color: "var(--foreground-muted)",
                      letterSpacing: "0.05em",
                      flexShrink: 0,
                      paddingTop: "2px",
                    }}
                  >
                    {reason.number}
                  </span>

                  <div>
                    <h4
                      style={{
                        margin: 0,
                        marginBottom: "10px",
                        fontSize: "clamp(1rem, 1.4vw, 1.125rem)",
                      }}
                    >
                      {reason.title}
                    </h4>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "clamp(0.875rem, 1.2vw, 0.9375rem)",
                        lineHeight: 1.65,
                        color: "var(--foreground-muted)",
                      }}
                    >
                      {reason.description}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
            {/* Bottom border */}
            <div style={{ borderTop: "1px solid var(--divider)" }} />
          </div>
        </div>
      </div>
    </section>
  );
}
