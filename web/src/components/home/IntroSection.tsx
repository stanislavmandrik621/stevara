"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export function IntroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section 
      style={{ 
        position: 'relative',
        backgroundColor: 'var(--background)'
      }}
    >
      <div style={{
        width: '100%',
        maxWidth: '1280px',
        margin: '0 auto',
        padding: 'clamp(80px, 12vw, 120px) 24px'
      }}>
        <div style={{ maxWidth: '960px', margin: '0 auto', textAlign: 'center' }}>
          {/* Label */}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: 'inline-block',
              fontFamily: 'var(--font-inter), -apple-system, BlinkMacSystemFont, sans-serif',
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--foreground)',
              opacity: 0.5,
              marginBottom: '24px',
            }}
          >
            Про нас
          </motion.span>
          
          {/* Main headline with mixed weights */}
          <motion.h2
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ 
              fontFamily: 'var(--font-dm-serif), Georgia, "Times New Roman", serif',
              fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)',
              fontWeight: 400,
              color: 'var(--foreground)',
              lineHeight: 1.5,
              marginBottom: 0,
            }}
          >
            <span style={{ 
              fontFamily: 'var(--font-inter), -apple-system, BlinkMacSystemFont, sans-serif',
              fontWeight: 700,
            }}>STEVARA</span> — українська інженерна компанія, що впроваджує{' '}
            <span style={{ 
              fontFamily: 'var(--font-dm-serif), Georgia, "Times New Roman", serif',
              fontStyle: 'italic',
            }}>системи накопичення енергії Tesla</span>{' '}
            щоб допомогти вам{' '}
            <span style={{ color: 'var(--foreground-muted)' }}>
              забезпечити енергонезалежність, зменшити витрати та побудувати стійке майбутнє
            </span>
          </motion.h2>
        </div>
      </div>
    </section>
  );
}
