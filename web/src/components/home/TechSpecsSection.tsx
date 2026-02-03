"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Battery, Zap, Clock, Gauge } from "lucide-react";

const specs = [
  {
    icon: Battery,
    value: "13.5",
    unit: "кВт·год",
    label: "Ємність",
    description: "Енергії для дому",
  },
  {
    icon: Zap,
    value: "11.5",
    unit: "кВт",
    label: "Потужність",
    description: "Безперервна віддача",
  },
  {
    icon: Clock,
    value: "<20",
    unit: "мс",
    label: "Перемикання",
    description: "Миттєвий резерв",
  },
  {
    icon: Gauge,
    value: "97.5",
    unit: "%",
    label: "Ефективність",
    description: "Round-trip efficiency",
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

export function TechSpecsSection() {
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
        <div style={{ marginBottom: "clamp(48px, 8vw, 80px)" }}>
          <FadeIn>
            <span
              style={{
                display: "inline-block",
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.6)",
                marginBottom: "16px",
              }}
            >
              Powerwall 3
            </span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 style={{ color: "#ffffff", marginBottom: "16px" }}>
              Технічні характеристики
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p
              style={{
                maxWidth: "600px",
                fontSize: "clamp(1rem, 1.6vw, 1.125rem)",
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.65)",
                margin: 0,
              }}
            >
              Інтегрована система з інвертором, батареєю та інтелектуальним
              керуванням
            </p>
          </FadeIn>
        </div>

        {/* Specs grid */}
        <div className="grid-responsive-4">
          {specs.map((spec, index) => {
            const Icon = spec.icon;
            const hasPrefix = spec.value.startsWith("<");
            const displayValue = spec.value.replace("<", "");

            return (
              <FadeIn key={spec.label} delay={0.2 + index * 0.05}>
                <div
                  style={{
                    height: "100%",
                    padding: "clamp(16px, 3vw, 24px) 0",
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                  }}
                >
                  {/* Icon */}
                  <div style={{ color: "rgba(255,255,255,0.6)" }}>
                    <Icon style={{ width: "24px", height: "24px" }} />
                  </div>

                  {/* Value */}
                  <div
                    style={{
                      fontFamily:
                        "var(--font-inter), -apple-system, BlinkMacSystemFont, sans-serif",
                      fontSize: isMobile ? "36px" : "clamp(40px, 4vw, 52px)",
                      fontWeight: 700,
                      lineHeight: 1,
                      letterSpacing: "-0.02em",
                      color: "#ffffff",
                      display: "flex",
                      alignItems: "baseline",
                    }}
                  >
                    {hasPrefix && (
                      <span
                        style={{
                          fontSize: "0.5em",
                          fontWeight: 500,
                          marginRight: "2px",
                          opacity: 0.7,
                        }}
                      >
                        &lt;
                      </span>
                    )}
                    {displayValue}
                    <span
                      style={{
                        fontSize: "0.35em",
                        fontWeight: 500,
                        marginLeft: "4px",
                        color: "rgba(255,255,255,0.5)",
                      }}
                    >
                      {spec.unit}
                    </span>
                  </div>

                  {/* Label */}
                  <h4 style={{ margin: 0, color: "#ffffff" }}>{spec.label}</h4>

                  {/* Description */}
                  <p
                    style={{
                      margin: 0,
                      fontSize: "clamp(0.875rem, 1.2vw, 0.95rem)",
                      lineHeight: 1.5,
                      color: "rgba(255,255,255,0.55)",
                    }}
                  >
                    {spec.description}
                  </p>
                </div>
              </FadeIn>
            );
          })}
        </div>

        {/* Additional info tags */}
        <FadeIn delay={0.5}>
          <div
            style={{
              marginTop: "clamp(48px, 8vw, 80px)",
              paddingTop: "clamp(32px, 5vw, 48px)",
              borderTop: "1px solid rgba(255,255,255,0.1)",
              display: "flex",
              flexWrap: "wrap",
              gap: isMobile ? "12px" : "24px",
            }}
          >
            {[
              "LFP батарея",
              "Інтегрований інвертор",
              "Гарантія 10 років",
              "Автоматичні оновлення",
            ].map((item) => (
              <span
                key={item}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                <span
                  style={{
                    width: "4px",
                    height: "4px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(255,255,255,0.4)",
                  }}
                />
                {item}
              </span>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
