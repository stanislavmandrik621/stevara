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
        padding: '96px 0',
        backgroundColor: 'var(--background)'
      }}
    >
      <div style={{
        width: '100%',
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 24px'
      }}>
        <div style={{ maxWidth: '896px', margin: '0 auto', textAlign: 'center' }}>
          <motion.p
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ 
              fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
              color: 'var(--foreground-muted)',
              lineHeight: 1.6
            }}
          >
            <span style={{ color: 'var(--foreground)' }}>STEVARA</span> — українська інженерна компанія, 
            що впроваджує системи накопичення енергії Tesla. Офіційні поставки, 
            коректна інтеграція, запуск і супровід після введення в експлуатацію.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
