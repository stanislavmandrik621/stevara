"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";

function ProductCard({ 
  title, 
  subtitle, 
  description, 
  buttonText,
  bgColor,
  bgImage,
  isDark = true,
}: {
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
  bgColor: string;
  bgImage?: string;
  isDark?: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Scroll-based opacity animation like hero
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start start", "end start"]
  });

  const cardOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const smoothOpacity = useSpring(cardOpacity, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'relative',
      }}
    >
      <motion.div style={{ opacity: smoothOpacity }}>
        <div 
          style={{ 
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            overflow: 'hidden',
            height: 'clamp(420px, 55vw, 480px)',
            borderRadius: 'clamp(20px, 3vw, 32px)',
            textDecoration: 'none',
            backgroundColor: bgColor,
            cursor: 'default',
          }}
        >
          {/* Background Image */}
          {bgImage && (
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${bgImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center bottom',
            }} />
          )}
          
          {/* Gradient overlay from content to image - responsive */}
          {bgImage && (
            <div 
              className={isDark ? "card-gradient-dark" : "card-gradient-light"}
              style={{
                position: 'absolute',
                inset: 0,
                background: isDark
                  ? 'linear-gradient(180deg, rgba(24,24,27,1) 0%, rgba(24,24,27,0.95) 30%, rgba(24,24,27,0.7) 60%, rgba(24,24,27,0.3) 80%, transparent 100%)'
                  : 'linear-gradient(180deg, rgba(255,176,0,1) 0%, rgba(255,176,0,0.95) 30%, rgba(255,176,0,0.7) 60%, rgba(255,176,0,0.3) 80%, transparent 100%)',
                zIndex: 1,
              }} 
            />
          )}

          {/* Content - aligned with 1280px container */}
          <div style={{
            position: 'relative',
            zIndex: 10,
            width: '100%',
            maxWidth: '1280px',
            margin: '0 auto',
            flex: 1,
            display: 'flex',
            padding: '0 clamp(16px, 4vw, 24px)',
          }}>
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                flex: 1,
                padding: 'clamp(32px, 5vw, 56px) 0',
                maxWidth: 'clamp(280px, 80%, 50%)',
              }}
            >
            <div>
              <span style={{
                display: 'inline-block',
                fontSize: 'clamp(10px, 1.2vw, 12px)',
                fontWeight: 600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)',
                marginBottom: 'clamp(16px, 3vw, 24px)',
              }}>
                {subtitle}
              </span>
              <h3 style={{ 
                marginBottom: 'clamp(12px, 2vw, 20px)',
                color: isDark ? '#ffffff' : '#000000',
                fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
              }}>
                {title}
              </h3>
              <p style={{ 
                fontSize: 'clamp(0.875rem, 1.2vw, 1.125rem)',
                lineHeight: 1.7,
                color: isDark ? 'rgba(255,255,255,0.75)' : 'rgba(0,0,0,0.7)',
              }}>
                {description}
              </p>
            </div>

            <div 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: 'clamp(12px, 1.5vw, 14px) clamp(20px, 3vw, 28px)',
                fontSize: 'clamp(13px, 1.2vw, 15px)',
                fontWeight: 600,
                letterSpacing: '0.02em',
                color: isDark ? '#000000' : '#ffffff',
                backgroundColor: isDark ? '#ffffff' : '#000000',
                borderRadius: '100px',
                boxShadow: isDark 
                  ? '0 4px 20px rgba(255,255,255,0.2)'
                  : '0 4px 20px rgba(0,0,0,0.3)',
                width: 'fit-content',
                cursor: 'default',
              }}
            >
              {buttonText}
              <ArrowRight style={{ width: '14px', height: '14px' }} />
            </div>
          </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function DirectionsSection() {
  return (
    <section 
      style={{ 
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '0 24px 24px 24px',
        backgroundColor: 'var(--background)',
      }}
    >
      {/* Stacked cards - same width as hero background (1366px) */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'clamp(12px, 2vw, 24px)',
        width: '100%',
        maxWidth: '1366px',
      }}>
        {/* Powerwall Card */}
        <ProductCard
          subtitle="Powerwall"
          title="Для приватних будинків"
          description="Tesla Powerwall для об'єктів, де важлива стабільна робота незалежно від стану мережі."
          buttonText="Дізнатись більше"
          bgColor="#18181b"
          bgImage="/images/powerwall-house.jpeg"
          isDark={true}
        />

        {/* Megapack Card */}
        <ProductCard
          subtitle="Megapack"
          title="Для бізнесу та інфраструктури"
          description="Tesla Megapack для об'єктів, де критичні надійність, інтеграція з мережею і передбачувана експлуатація."
          buttonText="Обговорити проєкт"
          bgColor="#FFB000"
          bgImage="/images/megapack.avif"
          isDark={false}
        />
      </div>
    </section>
  );
}
