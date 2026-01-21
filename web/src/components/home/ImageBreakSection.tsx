"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function ImageBreakSection() {
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.6, 1, 1, 0.6]);

  return (
    <section 
      ref={sectionRef}
      style={{ 
        position: 'relative',
        height: 'clamp(400px, 60vh, 600px)',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center center',
          filter: 'grayscale(100%) contrast(1.1)',
        }}
      >
        <source src="/video/bg-energy.mp4" type="video/mp4" />
      </video>
      
      {/* Dark overlay */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.6)',
        }}
      />

      {/* Content */}
      <motion.div 
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          padding: '0 clamp(24px, 4vw, 48px)',
          maxWidth: '900px',
          opacity,
        }}
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{
            fontFamily: 'var(--font-dm-serif), Georgia, "Times New Roman", serif',
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
            fontWeight: 400,
            lineHeight: 1.4,
            color: '#ffffff',
            margin: 0,
          }}
        >
          Енергонезалежність — це не розкіш,
          <br />
          <span style={{ opacity: 0.7 }}>
            а необхідність для стабільного життя
          </span>
        </motion.p>
      </motion.div>
    </section>
  );
}
