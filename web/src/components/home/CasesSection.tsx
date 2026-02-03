"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

const cases = [
  { image: "/images/case-1.jpg", title: "Сучасний будинок з басейном" },
  { image: "/images/case-2.jpg", title: "Преміум резиденція" },
  { image: "/images/case-3.jpg", title: "Подвійна система з зарядкою Tesla" },
  { image: "/images/case-4.jpg", title: "Заміський будинок" },
  { image: "/images/case-5.jpg", title: "Сімейний будинок" },
  { image: "/images/case-6.jpg", title: "Еко-будинок з сонячними панелями" },
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

export function CasesSection() {
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
        {/* Header */}
        <div style={{ marginBottom: "clamp(40px, 6vw, 60px)" }}>
          <FadeIn>
            <span className="text-label" style={{ marginBottom: "16px" }}>
              Реалізовані проєкти
            </span>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h2 style={{ marginBottom: "16px" }}>Приклади встановлень</h2>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p
              className="text-lead"
              style={{
                margin: 0,
                maxWidth: "500px",
              }}
            >
              Системи Tesla Powerwall в різних типах об'єктів
            </p>
          </FadeIn>
        </div>

        {/* Grid - 3 columns, 2 rows */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
            gap: isMobile ? "16px" : "20px",
          }}
        >
          {cases.map((caseItem, index) => (
            <FadeIn key={index} delay={0.1 * index}>
              <div
                style={{
                  position: "relative",
                  borderRadius: "16px",
                  overflow: "hidden",
                  aspectRatio: "1 / 1",
                }}
              >
                <Image
                  src={caseItem.image}
                  alt={caseItem.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{
                    objectFit: "cover",
                  }}
                />
                {/* Gradient overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 30%, transparent 60%)",
                    pointerEvents: "none",
                  }}
                />
                {/* Title at bottom */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: isMobile ? "20px" : "24px",
                  }}
                >
                  <span
                    style={{
                      fontSize: isMobile ? "14px" : "16px",
                      fontWeight: 500,
                      color: "#ffffff",
                    }}
                  >
                    {caseItem.title}
                  </span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Note */}
        <FadeIn delay={0.7}>
          <p
            style={{
              marginTop: "clamp(32px, 5vw, 48px)",
              fontSize: "13px",
              color: "var(--foreground-muted)",
            }}
          >
            * Зображення наведені як приклади типових проєктів Tesla Powerwall
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
