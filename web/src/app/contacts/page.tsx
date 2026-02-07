"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { CTASection } from "@/components/home";
import { EnergyWaveCanvas } from "@/components/ui/EnergyWaveCanvas";

/* ── FadeIn helper ── */
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

/* ── Contact Info Data ── */
const contactInfo = [
  {
    icon: Phone,
    label: "Телефон",
    value: "+380 (44) 123-45-67",
    href: "tel:+380441234567",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@stevara.ua",
    href: "mailto:info@stevara.ua",
  },
  {
    icon: MapPin,
    label: "Географія",
    value: "Працюємо по всій Україні",
    href: null,
  },
];

export default function ContactsPage() {
  const [isMobile, setIsMobile] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <main className="relative">
      {/* ═══════ HERO — same style as About page ═══════ */}
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
            Контакти
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
            Почнімо розмову
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
            Опишіть ваш контекст, задачу або питання — ми повернемося з
            відповіддю, щоб обговорити можливі підходи та наступні кроки.
          </motion.p>

        </div>
      </section>

      {/* ═══════ CTA FORM — same as homepage ═══════ */}
      <CTASection />

      {/* ═══════ CONTACT INFO BAR ═══════ */}
      <section
        className="section-padding"
        style={{
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
          <div style={{ marginBottom: "clamp(48px, 6vw, 64px)" }}>
            <FadeIn>
              <span
                className="text-label"
                style={{ marginBottom: "16px" }}
              >
                Як зв'язатися
              </span>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 style={{ margin: 0, maxWidth: "600px" }}>
                Контактна інформація
              </h2>
            </FadeIn>
          </div>

          {/* Contact Cards Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
              gap: isMobile ? "0" : "1px",
              backgroundColor: isMobile ? "transparent" : "var(--divider)",
              border: isMobile ? "none" : "1px solid var(--divider)",
            }}
          >
            {contactInfo.map((item, index) => {
              const Icon = item.icon;
              const content = (
                <div
                  style={{
                    padding: isMobile
                      ? "28px 0"
                      : "clamp(32px, 4vw, 48px)",
                    backgroundColor: "var(--background)",
                    borderTop: isMobile ? "1px solid var(--divider)" : "none",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                    transition: "background-color 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (!isMobile)
                      e.currentTarget.style.backgroundColor =
                        "var(--background-secondary)";
                  }}
                  onMouseLeave={(e) => {
                    if (!isMobile)
                      e.currentTarget.style.backgroundColor =
                        "var(--background)";
                  }}
                >
                  <Icon
                    style={{
                      width: "20px",
                      height: "20px",
                      color: "var(--foreground-muted)",
                    }}
                  />
                  <div>
                    <span
                      style={{
                        display: "block",
                        fontSize: "12px",
                        fontWeight: 600,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "var(--foreground-muted)",
                        marginBottom: "8px",
                      }}
                    >
                      {item.label}
                    </span>
                    <span
                      style={{
                        fontSize: "clamp(1rem, 1.4vw, 1.125rem)",
                        fontWeight: 500,
                        color: "var(--foreground)",
                        lineHeight: 1.4,
                      }}
                    >
                      {item.value}
                    </span>
                  </div>

                  {item.href && (
                    <div
                      style={{
                        marginTop: "auto",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        fontSize: "13px",
                        fontWeight: 500,
                        color: "var(--foreground-muted)",
                      }}
                    >
                      <ArrowRight
                        style={{
                          width: "14px",
                          height: "14px",
                          transform: "rotate(-45deg)",
                        }}
                      />
                    </div>
                  )}
                </div>
              );

              return (
                <FadeIn key={item.label} delay={0.15 + index * 0.08}>
                  {item.href ? (
                    <a
                      href={item.href}
                      style={{
                        textDecoration: "none",
                        color: "inherit",
                        display: "block",
                        height: "100%",
                      }}
                    >
                      {content}
                    </a>
                  ) : (
                    content
                  )}
                </FadeIn>
              );
            })}
          </div>
          {isMobile && (
            <div style={{ borderTop: "1px solid var(--divider)" }} />
          )}
        </div>
      </section>

      {/* ═══════ PROCESS SECTION ═══════ */}
      <section
        className="section-padding"
        style={{
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
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1.2fr",
              gap: isMobile ? "0" : "clamp(60px, 10vw, 120px)",
              alignItems: "start",
            }}
          >
            {/* Left - Sticky Title */}
            <div
              style={{
                position: isMobile ? "static" : "sticky",
                top: "120px",
              }}
            >
              <FadeIn>
                <span className="text-label" style={{ marginBottom: "16px" }}>
                  Процес
                </span>
              </FadeIn>
              <FadeIn delay={0.1}>
                <h2 style={{ margin: 0 }}>
                  Як ми{" "}
                  <span style={{ color: "var(--foreground-muted)" }}>
                    працюємо
                  </span>
                </h2>
              </FadeIn>
            </div>

            {/* Right - Steps */}
            <div>
              {[
                {
                  num: "01",
                  title: "Ваш запит",
                  text: "Ви надсилаєте запит з описом об'єкта або задачі. Ми вивчаємо контекст і розуміємо, чим можемо бути корисні.",
                },
                {
                  num: "02",
                  title: "Зворотний зв'язок",
                  text: "Повертаємося з відповіддю у зручному форматі — дзвінок, лист або месенджер. Обговорюємо деталі проєкту.",
                },
                {
                  num: "03",
                  title: "Наступні кроки",
                  text: "Узгоджуємо формат взаємодії, можливості та терміни. Починаємо роботу над проєктом.",
                },
              ].map((step, index) => (
                <FadeIn key={step.num} delay={0.15 + index * 0.1}>
                  <div
                    style={{
                      padding: isMobile ? "28px 0" : "32px 0",
                      borderTop: "1px solid var(--divider)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: "20px",
                        alignItems: "flex-start",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "12px",
                          fontWeight: 600,
                          letterSpacing: "0.1em",
                          color: "var(--foreground-muted)",
                          flexShrink: 0,
                          paddingTop: "4px",
                        }}
                      >
                        {step.num}
                      </span>
                      <div>
                        <h4
                          style={{
                            margin: 0,
                            marginBottom: "8px",
                            fontSize: "clamp(1rem, 1.4vw, 1.125rem)",
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
                    </div>
                  </div>
                </FadeIn>
              ))}
              <div style={{ borderTop: "1px solid var(--divider)" }} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
