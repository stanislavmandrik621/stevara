"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform, useSpring } from "framer-motion";
import { Shield, Award, HandshakeIcon } from "lucide-react";

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

const trustPoints = [
  {
    icon: Shield,
    title: "Офіційні системи Tesla",
    description: "Обладнання офіційно імпортоване, має підтвердження відповідності та сертифіковане в Україні.",
  },
  {
    icon: Award,
    title: "Сертифікована команда",
    description: "Інженери STEVARA пройшли навчання та сертифікацію Tesla. Роботи виконуються за стандартами виробника.",
  },
  {
    icon: HandshakeIcon,
    title: "Відповідальність за роботу системи",
    description: "Ми відповідаємо за коректну роботу системи, а не лише за її встановлення.",
  },
];

export function TrustSection() {
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const smoothOpacity = useSpring(opacity, { stiffness: 100, damping: 30 });

  return (
    <section 
      ref={sectionRef}
      style={{ 
        position: 'relative',
        padding: '16px 16px',
        backgroundColor: 'var(--background)',
      }}
    >
      {/* Dark background card */}
      <motion.div 
        style={{
          opacity: smoothOpacity,
          maxWidth: '1366px',
          margin: '0 auto',
          backgroundColor: '#18181b',
          borderRadius: '24px',
          padding: 'clamp(48px, 8vw, 80px) 0',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative gradient */}
        <div style={{
          position: 'absolute',
          top: '-20%',
          right: '-10%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'var(--brand-orange)',
          opacity: 0.08,
          filter: 'blur(100px)',
        }} />

        <div style={{
          width: '100%',
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 clamp(16px, 4vw, 24px)',
          position: 'relative',
          zIndex: 1,
        }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 'clamp(40px, 6vw, 72px)' }}>
            <FadeIn>
              <span style={{
                display: 'inline-block',
                fontSize: '13px',
                fontWeight: 600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#ffffff',
                opacity: 0.5,
                marginBottom: '16px',
              }}>
                Довіра
              </span>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 style={{ color: '#ffffff' }}>Чому нам довіряють</h2>
            </FadeIn>
          </div>

          {/* 3-column grid - responsive */}
          <div className="grid-responsive-3">
            {trustPoints.map((point, index) => (
              <FadeIn key={index} delay={0.2 + index * 0.1}>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: '16px',
                }}>
                  {/* Icon */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '48px',
                    height: '48px',
                    borderRadius: '14px',
                    backgroundColor: 'var(--brand-orange)',
                  }}>
                    <point.icon style={{ 
                      width: '24px', 
                      height: '24px', 
                      color: '#000',
                    }} />
                  </div>
                  
                  {/* Title */}
                  <h4 style={{ margin: 0, color: '#ffffff' }}>
                    {point.title}
                  </h4>
                  
                  {/* Description */}
                  <p style={{ 
                    margin: 0,
                    fontSize: 'clamp(0.9375rem, 1.5vw, 1.125rem)',
                    lineHeight: 1.7,
                    color: 'rgba(255,255,255,0.65)',
                  }}>
                    {point.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
