"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

const valuePoints = [
  {
    number: "01",
    title: "Інтеграція",
    description: "Підключення в електромережу вашого об'єкта під ваші реальні умови",
  },
  {
    number: "02", 
    title: "Налаштування",
    description: "Система працює так, як потрібно саме вам — логіка роботи під ваші задачі",
  },
  {
    number: "03",
    title: "Підтримка",
    description: "Після запуску ви не залишаєтесь самі — ми завжди на зв'язку",
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
        position: 'relative',
        backgroundColor: 'var(--background)',
        borderTop: '1px solid var(--divider)',
      }}
    >
      <div 
        style={{ 
          width: '100%',
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 clamp(24px, 4vw, 48px)',
        }}
      >
        {/* Header - Centered */}
        <div style={{ 
          textAlign: 'center',
          maxWidth: '800px',
          margin: '0 auto',
          marginBottom: 'clamp(60px, 10vw, 100px)',
        }}>
          <FadeIn>
            <span className="text-label" style={{ marginBottom: '20px' }}>
              Наш підхід
            </span>
          </FadeIn>
          
          <FadeIn delay={0.1}>
            <h2 style={{ marginBottom: '24px' }}>
              Одна команда — повна відповідальність
            </h2>
          </FadeIn>
          
          <FadeIn delay={0.2}>
            <p 
              className="text-lead" 
              style={{ 
                margin: 0,
                maxWidth: '600px',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              Від першої розмови до стабільної роботи — весь проєкт веде одна команда
            </p>
          </FadeIn>
        </div>

        {/* Value Points - Horizontal layout */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: '1px',
            backgroundColor: 'var(--divider)',
          }}
        >
          {valuePoints.map((point, index) => (
            <FadeIn key={point.number} delay={0.2 + index * 0.1}>
              <div
                style={{
                  backgroundColor: 'var(--background)',
                  padding: isMobile ? '32px 0' : 'clamp(32px, 5vw, 48px)',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                }}
              >
                {/* Number */}
                <span
                  style={{
                    fontFamily: 'var(--font-inter), -apple-system, BlinkMacSystemFont, sans-serif',
                    fontSize: isMobile ? '48px' : 'clamp(48px, 6vw, 72px)',
                    fontWeight: 200,
                    lineHeight: 1,
                    color: 'var(--foreground)',
                    opacity: 0.12,
                  }}
                >
                  {point.number}
                </span>
                
                {/* Title */}
                <h4 style={{ margin: 0 }}>
                  {point.title}
                </h4>
                
                {/* Description */}
                <p
                  style={{
                    margin: 0,
                    fontSize: 'clamp(0.95rem, 1.3vw, 1.05rem)',
                    lineHeight: 1.6,
                    color: 'var(--foreground-muted)',
                  }}
                >
                  {point.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
