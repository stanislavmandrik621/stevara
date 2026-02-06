"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";

const products = [
  {
    label: "Powerwall",
    title: "Для приватних будинків",
    description:
      "Стабільна робота незалежно від стану мережі та резерв під час відключень.",
    buttonText: "Дізнатись більше",
    image: "/images/powerwall-private-home.jpg",
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
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function HeroStyleButton({ text, isDark = false }: { text: string; isDark?: boolean }) {
  return (
    <div
      className="cta-group"
      style={{ 
        display: 'flex', 
        alignItems: 'center', 
        cursor: 'pointer',
        width: 'fit-content',
      }}
      onMouseEnter={(e) => {
        const btn = e.currentTarget.querySelector('.cta-btn') as HTMLElement;
        const arrow = e.currentTarget.querySelector('.cta-arrow') as HTMLElement;
        const arrowIcon = e.currentTarget.querySelector('.cta-arrow svg') as HTMLElement;
        const span = e.currentTarget.querySelector('.cta-btn span') as HTMLElement;
        if (btn) {
          btn.style.backgroundColor = 'transparent';
          btn.style.borderColor = isDark ? '#ffffff' : '#1d1d1f';
        }
        if (span) span.style.color = isDark ? '#ffffff' : '#1d1d1f';
        if (arrow) {
          arrow.style.backgroundColor = isDark ? '#1d1d1f' : '#ffffff';
          arrow.style.borderColor = isDark ? '#1d1d1f' : '#ffffff';
        }
        if (arrowIcon) arrowIcon.style.color = isDark ? '#ffffff' : '#1d1d1f';
      }}
      onMouseLeave={(e) => {
        const btn = e.currentTarget.querySelector('.cta-btn') as HTMLElement;
        const arrow = e.currentTarget.querySelector('.cta-arrow') as HTMLElement;
        const arrowIcon = e.currentTarget.querySelector('.cta-arrow svg') as HTMLElement;
        const span = e.currentTarget.querySelector('.cta-btn span') as HTMLElement;
        if (btn) {
          btn.style.backgroundColor = isDark ? '#ffffff' : '#1d1d1f';
          btn.style.borderColor = isDark ? '#ffffff' : '#1d1d1f';
        }
        if (span) span.style.color = isDark ? '#1d1d1f' : '#ffffff';
        if (arrow) {
          arrow.style.backgroundColor = isDark ? '#1d1d1f' : '#ffffff';
          arrow.style.borderColor = isDark ? '#ffffff' : '#1d1d1f';
        }
        if (arrowIcon) arrowIcon.style.color = isDark ? '#ffffff' : '#1d1d1f';
      }}
    >
      <div
        className="cta-btn"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          height: '48px',
          padding: '0 24px',
          borderRadius: '100px',
          backgroundColor: isDark ? '#ffffff' : '#1d1d1f',
          border: `2px solid ${isDark ? '#ffffff' : '#1d1d1f'}`,
          transition: 'all 0.25s ease',
        }}
      >
        <span style={{
          fontFamily: 'var(--font-inter), -apple-system, BlinkMacSystemFont, sans-serif',
          fontSize: '14px',
          fontWeight: 600,
          letterSpacing: '0.01em',
          color: isDark ? '#1d1d1f' : '#ffffff',
          transition: 'color 0.25s ease',
        }}>
          {text}
        </span>
      </div>
      
      <div
        className="cta-arrow"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          backgroundColor: isDark ? '#1d1d1f' : '#ffffff',
          border: `2px solid ${isDark ? '#ffffff' : '#1d1d1f'}`,
          marginLeft: '1px',
          transition: 'all 0.25s ease',
        }}
      >
        <ArrowRight style={{ 
          width: '18px', 
          height: '18px',
          color: isDark ? '#ffffff' : '#1d1d1f',
          transform: 'rotate(-45deg)',
        }} />
      </div>
    </div>
  );
}

function ProductBlock({
  label,
  title,
  description,
  buttonText,
  image,
  index,
  isMobile,
}: {
  label: string;
  title: string;
  description: string;
  buttonText: string;
  image: string;
  index: number;
  isMobile: boolean;
}) {
  const isReversed = index % 2 === 1;

  return (
    <div
      style={{
        position: "relative",
        minHeight: isMobile ? "clamp(450px, 80vh, 600px)" : "clamp(500px, 70vh, 700px)",
        display: "flex",
        alignItems: isMobile ? "flex-end" : "center",
        overflow: "hidden",
        paddingBottom: isMobile ? "60px" : 0,
      }}
    >
      {/* Full-width background image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
        }}
      >
        <Image
          src={image}
          alt={label}
          fill
          sizes="100vw"
          style={{ 
            objectFit: "cover", 
            objectPosition: index === 0 ? "center 70%" : "center center" 
          }}
          priority={index === 0}
        />
        {/* Gradient overlay - vertical on mobile, horizontal on desktop */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: isMobile
              ? "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 30%, rgba(0,0,0,0.3) 60%, transparent 100%)"
              : isReversed
                ? "linear-gradient(to left, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.2) 70%, transparent 100%)"
                : "linear-gradient(to right, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.2) 70%, transparent 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          width: "100%",
          maxWidth: "1280px",
          margin: "0 auto",
          padding: isMobile ? "0 24px" : "0 48px",
        }}
      >
        <div
          style={{
            maxWidth: isMobile ? "100%" : "520px",
            marginLeft: isMobile ? 0 : (isReversed ? "auto" : 0),
            marginRight: isMobile ? 0 : (isReversed ? 0 : "auto"),
          }}
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              display: "inline-block",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.6)",
              marginBottom: "20px",
            }}
          >
            {label}
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{ 
              marginBottom: "20px",
              color: "#ffffff",
            }}
          >
            {title}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              margin: 0,
              marginBottom: "32px",
              fontSize: "clamp(1rem, 1.5vw, 1.125rem)",
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.75)",
              maxWidth: "440px",
            }}
          >
            {description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <HeroStyleButton text={buttonText} isDark />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export function DirectionsSection() {
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
      }}
    >
      {products.map((product, index) => (
        <ProductBlock key={product.label} {...product} index={index} isMobile={isMobile} />
      ))}
    </section>
  );
}
