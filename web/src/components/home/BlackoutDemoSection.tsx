"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Відключення мережі",
    description: "Електромережа падає — штатна ситуація для України",
  },
  {
    number: "02",
    title: "20 мілісекунд",
    description: "Powerwall автоматично перемикається на резерв",
  },
  {
    number: "03",
    title: "Дім працює",
    description: "Ви дізнаєтесь про відключення лише з додатку Tesla",
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

export function BlackoutDemoSection() {
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
        {/* Header - Centered */}
        <div
          style={{
            textAlign: "center",
            maxWidth: "800px",
            margin: "0 auto",
            marginBottom: "clamp(60px, 10vw, 100px)",
          }}
        >
          <FadeIn>
            <span className="text-label" style={{ marginBottom: "20px" }}>
              Миттєвий резерв
            </span>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h2 style={{ marginBottom: "24px" }}>
              Що відбувається під час відключення
            </h2>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p
              className="text-lead"
              style={{
                margin: 0,
                maxWidth: "600px",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              Світло не моргає. Котел не перезапускається. Дім продовжує
              працювати без переривань.
            </p>
          </FadeIn>
        </div>

        {/* Steps - Grid with dividers like ValueSection */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
            gap: "1px",
            backgroundColor: "var(--divider)",
          }}
        >
          {steps.map((step, index) => (
            <FadeIn key={step.number} delay={0.2 + index * 0.1}>
              <div
                style={{
                  backgroundColor: "var(--background)",
                  padding: isMobile ? "32px 0" : "clamp(32px, 5vw, 48px)",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                {/* Number - Large and faded */}
                <span
                  style={{
                    fontFamily:
                      "var(--font-inter), -apple-system, BlinkMacSystemFont, sans-serif",
                    fontSize: isMobile ? "48px" : "clamp(48px, 6vw, 72px)",
                    fontWeight: 200,
                    lineHeight: 1,
                    color: "var(--foreground)",
                    opacity: 0.12,
                  }}
                >
                  {step.number}
                </span>

                {/* Title */}
                <h4 style={{ margin: 0 }}>{step.title}</h4>

                {/* Description */}
                <p
                  style={{
                    margin: 0,
                    fontSize: "clamp(0.95rem, 1.3vw, 1.05rem)",
                    lineHeight: 1.6,
                    color: "var(--foreground-muted)",
                  }}
                >
                  {step.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
