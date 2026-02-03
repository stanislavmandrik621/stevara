"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, CreditCard } from "lucide-react";
import Link from "next/link";

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

export function FinancingTeaserSection() {
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
      style={{
        position: "relative",
        backgroundColor: "var(--background)",
        borderTop: "1px solid var(--divider)",
        borderBottom: "1px solid var(--divider)",
        padding: isMobile ? "48px 0" : "clamp(48px, 6vw, 64px) 0",
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
        <FadeIn>
          <div
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              alignItems: isMobile ? "flex-start" : "center",
              justifyContent: "space-between",
              gap: isMobile ? "24px" : "40px",
            }}
          >
            {/* Left - Content */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "20px",
                flex: 1,
              }}
            >
              {/* Icon */}
              <div
                style={{
                  flexShrink: 0,
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  backgroundColor: "var(--accent-dim)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CreditCard
                  style={{
                    width: "24px",
                    height: "24px",
                    color: "var(--foreground)",
                  }}
                />
              </div>

              {/* Text */}
              <div>
                <h4
                  style={{
                    margin: 0,
                    marginBottom: "8px",
                    fontSize: isMobile ? "1.125rem" : "1.25rem",
                  }}
                >
                  Доступні програми фінансування
                </h4>
                <p
                  style={{
                    margin: 0,
                    fontSize: "clamp(0.9rem, 1.3vw, 1rem)",
                    lineHeight: 1.6,
                    color: "var(--foreground-muted)",
                    maxWidth: "500px",
                  }}
                >
                  Розстрочка та кредитування для придбання систем Tesla
                  Powerwall. Дізнайтесь про умови.
                </p>
              </div>
            </div>

            {/* Right - CTA */}
            <Link
              href="/financing"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "14px 24px",
                backgroundColor: "var(--foreground)",
                color: "var(--background)",
                borderRadius: "100px",
                fontSize: "14px",
                fontWeight: 600,
                textDecoration: "none",
                whiteSpace: "nowrap",
                transition: "opacity 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "0.85";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "1";
              }}
            >
              Дізнатись більше
              <ArrowRight style={{ width: "16px", height: "16px" }} />
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
