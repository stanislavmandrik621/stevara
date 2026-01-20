"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Check } from "lucide-react";

const valuePoints = [
  "Інтеграція в електромережу вашого об'єкта, під ваші реальні умови",
  "Налаштування логіки роботи — система працює так, як потрібно вам",
  "Після запуску ви не залишаєтесь самі, ми на зв'язку",
];

export function ValueSection() {
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
      className="section-padding"
      style={{ 
        position: 'relative',
        backgroundColor: 'var(--background)',
      }}
    >
      {/* Container */}
      <motion.div 
        style={{ 
          opacity: smoothOpacity,
          width: '100%',
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 24px',
        }}
      >
        {/* Header */}
        <div 
          className="grid-responsive-12"
          style={{ marginBottom: '48px' }}
        >
          {/* Left - Title */}
          <div className="lg-col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ marginBottom: '24px' }}
            >
              <span className="text-label">Наш підхід</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              Одна команда —<br />
              відповідальність за результат
            </motion.h2>
          </div>

          {/* Right - Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg-col-span-5"
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              paddingBottom: '8px',
            }}
          >
            <p className="text-lead" style={{ margin: 0 }}>
              Ми не передаємо проєкт між підрядниками. Від першої розмови до стабільної роботи відповідає одна команда.
            </p>
          </motion.div>
        </div>

        {/* Value Points - full width with lines */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{
            height: '2px',
            backgroundColor: 'var(--foreground)',
            opacity: 0.15,
            transformOrigin: 'left',
          }}
        />
        
        {valuePoints.map((point, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
          >
            <div 
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '16px',
                padding: '24px 0',
                borderBottom: '2px solid',
                borderColor: 'rgba(128,128,128,0.15)',
              }}
            >
              {/* Check icon */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                backgroundColor: 'var(--brand-orange)',
                flexShrink: 0,
                marginTop: '2px',
              }}>
                <Check style={{ 
                  width: '16px', 
                  height: '16px', 
                  color: '#000',
                  strokeWidth: 3,
                }} />
              </div>
              
              {/* Text */}
              <p className="text-large" style={{ margin: 0 }}>
                {point}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
