"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
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

const trustPoints = [
  {
    number: "01",
    title: "Офіційний імпорт",
    description: "Обладнання Tesla Energy з підтвердженням походження та сертифікацією в Україні",
  },
  {
    number: "02",
    title: "Сертифікована команда",
    description: "Інженери пройшли навчання Tesla — роботи виконуються за стандартами виробника",
  },
  {
    number: "03",
    title: "Гарантія результату",
    description: "Відповідаємо за коректну роботу системи, а не лише за її встановлення",
  },
];

export function TrustSection() {
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
        position: 'relative',
        backgroundColor: 'var(--background)',
        borderTop: '1px solid var(--divider)',
      }}
    >
      <div style={{
        width: '100%',
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 clamp(24px, 4vw, 48px)',
      }}>
        {/* Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: 'clamp(48px, 8vw, 80px)',
        }}>
          {/* Large statement */}
          <div style={{ maxWidth: '900px' }}>
            <FadeIn>
              <span className="text-label" style={{ marginBottom: '24px' }}>
                Довіра
              </span>
            </FadeIn>
            
            <FadeIn delay={0.1}>
              <h2 
                style={{ 
                  marginBottom: '0',
                  fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                  lineHeight: 1.2,
                }}
              >
                Ми не просто встановлюємо обладнання — 
                <span style={{ color: 'var(--foreground-muted)' }}>
                  {' '}ми відповідаємо за його роботу
                </span>
              </h2>
            </FadeIn>
          </div>

          {/* Trust points */}
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
              gap: isMobile ? '40px' : 'clamp(32px, 5vw, 64px)',
            }}
          >
            {trustPoints.map((point, index) => (
              <FadeIn key={index} delay={0.2 + index * 0.1}>
                <div 
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                  }}
                >
                  {/* Number */}
                  <span
                    style={{
                      fontFamily: 'var(--font-inter), -apple-system, BlinkMacSystemFont, sans-serif',
                      fontSize: '13px',
                      fontWeight: 500,
                      color: 'var(--foreground-muted)',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {point.number}
                  </span>
                  
                  {/* Title */}
                  <h4 style={{ margin: 0 }}>
                    {point.title}
                  </h4>
                  
                  {/* Description */}
                  <p style={{ 
                    margin: 0,
                    fontSize: 'clamp(0.9rem, 1.3vw, 1rem)',
                    lineHeight: 1.65,
                    color: 'var(--foreground-muted)',
                  }}>
                    {point.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
