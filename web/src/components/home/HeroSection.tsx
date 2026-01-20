"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";
import { HeroScene } from "@/components/three/HeroScene";
import { useTheme } from "next-themes";

function AnimatedTitle({ children, delay = 0, accent = false }: { 
  children: string; 
  delay?: number;
  accent?: boolean;
}) {
  return (
    <div style={{ overflow: 'visible' }}>
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
        style={{ 
          fontSize: 'clamp(40px, 8vw, 72px)',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          lineHeight: 1.1,
          color: accent ? 'var(--accent)' : 'var(--foreground)'
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// Simple gradient background - adds warm glow at bottom
function GradientBackground({ isDark }: { isDark: boolean }) {
  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      overflow: 'hidden',
      pointerEvents: 'none',
      zIndex: 0,
    }}>
      {/* Main gradient - soft yellow/gold at bottom only */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: isDark
            ? 'linear-gradient(180deg, transparent 0%, transparent 50%, rgba(255,176,0,0.12) 75%, rgba(255,160,0,0.2) 100%)'
            : 'linear-gradient(180deg, transparent 0%, transparent 40%, rgba(255,200,100,0.3) 70%, rgba(255,180,80,0.5) 100%)',
        }}
      />
    </div>
  );
}


export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMobileHero, setIsMobileHero] = useState(false);
  const [isSmallMobile, setIsSmallMobile] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  // Check for mobile hero layout (below 768px) and small mobile (below 580px)
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobileHero(window.innerWidth < 768);
      setIsSmallMobile(window.innerWidth < 580);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePosition({ x, y });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const smoothX = useSpring(mousePosition.x, { stiffness: 30, damping: 20 });
  const smoothY = useSpring(mousePosition.y, { stiffness: 30, damping: 20 });

  const isDark = mounted && resolvedTheme === 'dark';

  // Scroll-based animations for hero container
  const heroContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroContainerRef,
    offset: ["start start", "end start"]
  });

  // Transform values based on scroll - only opacity, no scale to prevent object jumping
  const heroOpacity = useTransform(heroScrollProgress, [0, 0.6], [1, 0]);

  // Spring for smoother animations
  const smoothOpacity = useSpring(heroOpacity, { stiffness: 100, damping: 30 });

  return (
    <section 
      ref={sectionRef}
      style={{ 
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '0 24px 24px 24px',
        backgroundColor: 'var(--background)',
      }}
    >
      {/* Hero Container with scroll animations */}
      <motion.div 
        ref={heroContainerRef}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '1366px',
          borderRadius: '0 0 32px 32px',
          overflow: 'hidden',
          backgroundColor: isDark ? '#0a0a0a' : '#ffffff',
          opacity: smoothOpacity,
        }}>
        {/* Warm yellow/gold gradient background - dark at top, warm at bottom */}
        <div style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          background: isDark 
            ? 'linear-gradient(180deg, #0a0a0a 0%, #141200 25%, #1f1c00 50%, #2a2600 75%, #3d3700 100%)'
            : 'linear-gradient(180deg, #ffffff 0%, #FFFDF8 20%, #FFF9EE 40%, #FFF3DC 70%, #FFECC8 100%)',
          pointerEvents: 'none',
        }} />

        {/* Gradient Background */}
        <GradientBackground isDark={isDark} />

        {/* Subtle noise texture for depth */}
        <div style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          opacity: isDark ? 0.03 : 0.02,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          pointerEvents: 'none',
          borderRadius: '32px',
        }} />

      {/* Large TESLA watermark text - Hidden for now
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 3,
          pointerEvents: 'none',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <motion.span
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            fontSize: '42vw',
            fontWeight: 900,
            letterSpacing: '0.02em',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
            background: isDark 
              ? 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.03) 20%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.03) 80%, rgba(255,255,255,0) 100%)'
              : 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.15) 20%, rgba(255,255,255,0.25) 50%, rgba(255,255,255,0.15) 80%, rgba(255,255,255,0) 100%)',
            backgroundSize: '200% 100%',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            color: 'transparent',
            userSelect: 'none',
          }}
        >
          TESLA
        </motion.span>
      </motion.div>
      */}

      {/* 3D Scene - Desktop: absolute positioned, Mobile: below content */}
      {!isMobileHero && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'absolute',
            top: '-5%',
            left: '22%',
            right: '-10%',
            bottom: '5%',
            pointerEvents: 'none',
            zIndex: 3,
          }}
        >
          <HeroScene />
        </motion.div>
      )}

        {/* Main Content - Same width as header (1280px) */}
        <div style={{
          position: 'relative',
          width: '100%',
          maxWidth: '1280px',
          margin: '0 auto',
          padding: isMobileHero 
            ? '120px 24px 24px 24px' 
            : 'clamp(120px, 20vw, 180px) clamp(16px, 4vw, 24px) clamp(32px, 6vw, 56px) clamp(16px, 4vw, 24px)',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          overflow: 'hidden',
          borderRadius: isMobileHero ? '0 0 32px 32px' : '0',
        }}>
          <div style={{ maxWidth: 'clamp(280px, 80vw, 520px)' }}>
          {/* Badge - Glossy effect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 20px',
              borderRadius: '100px',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.9)'}`,
              background: isDark 
                ? 'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)'
                : 'linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.7) 100%)',
              backdropFilter: 'blur(16px)',
              boxShadow: isDark
                ? '0 4px 16px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.15), inset 0 -1px 0 rgba(0,0,0,0.1)'
                : '0 4px 16px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,1), inset 0 -1px 0 rgba(0,0,0,0.03)',
              marginBottom: '24px',
              width: 'fit-content'
            }}
          >
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: isDark ? '#00d4ff' : '#FFB000',
              boxShadow: isDark ? '0 0 12px #00d4ff' : '0 0 12px rgba(255,176,0,0.6)'
            }} />
            <span style={{
              fontSize: '12px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--foreground)',
              fontWeight: 500,
              opacity: 0.8,
            }}>
              Офіційний імпортер Tesla Energy
            </span>
          </motion.div>

          {/* Title */}
          <h1>
            <AnimatedTitle delay={0.3}>Tesla Powerwall</AnimatedTitle>
            <AnimatedTitle delay={0.4} accent={isDark}>& Megapack</AnimatedTitle>
          </h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-lead"
            style={{
              marginTop: '24px',
              maxWidth: '480px'
            }}
          >
            Для приватних будинків, бізнесу та інфраструктури. 
            Офіційні поставки, інтеграція та супровід.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            style={{
              display: 'flex',
              flexDirection: isSmallMobile ? 'column' : 'row',
              flexWrap: 'wrap',
              gap: '12px',
              marginTop: '32px',
              width: isSmallMobile ? '100%' : 'auto',
            }}
          >
            <span 
              style={{ 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                padding: '14px 28px',
                fontSize: '15px',
                fontWeight: 600,
                letterSpacing: '0.02em',
                textDecoration: 'none',
                borderRadius: '100px',
                transition: 'all 0.3s ease',
                backgroundColor: 'var(--foreground)',
                color: 'var(--background)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                cursor: 'default',
                width: isSmallMobile ? '100%' : 'auto',
              }}
            >
              <span>Запросити дзвінок</span>
              <ArrowRight style={{ width: '16px', height: '16px' }} />
            </span>
            <span 
              style={{ 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '14px 28px',
                fontSize: '15px',
                fontWeight: 500,
                letterSpacing: '0.02em',
                textDecoration: 'none',
                borderRadius: '100px',
                transition: 'all 0.3s ease',
                color: 'var(--foreground)',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)'}`,
                backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.6)',
                backdropFilter: 'blur(10px)',
                cursor: 'default',
                width: isSmallMobile ? '100%' : 'auto',
              }}
            >
              Дізнатись більше
            </span>
          </motion.div>
        </div>

        {/* 3D Scene - Mobile only: below buttons */}
        {isMobileHero && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'relative',
              width: 'calc(100% + 120px)',
              marginLeft: '-100px',
              marginRight: '-20px',
              height: '380px',
              pointerEvents: 'none',
              zIndex: 3,
              marginTop: '-40px',
              marginBottom: '-56px',
            }}
          >
            <HeroScene isMobile={true} />
          </motion.div>
        )}
          
        {/* Scroll Badge - Aligned with content - hidden on mobile */}
        <motion.div 
          className="hide-mobile"
          style={{
            position: 'absolute',
            bottom: 'clamp(24px, 5vw, 56px)',
            right: 'clamp(24px, 5vw, 56px)',
            zIndex: 20,
            cursor: 'pointer',
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
        >
          {/* Rotating text ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            style={{
              position: 'relative',
              width: '80px',
              height: '80px',
            }}
          >
            <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
              <defs>
                <path
                  id="scrollCirclePath"
                  d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                />
              </defs>
              <text style={{ 
                fill: 'var(--foreground)', 
                fontSize: '11px', 
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                fontWeight: 500,
                opacity: 0.5
              }}>
                <textPath href="#scrollCirclePath">
                  ГОРТАЙ  •  ГОРТАЙ  •  ГОРТАЙ  •
                </textPath>
              </text>
            </svg>
          </motion.div>
          
          {/* Center arrow */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <motion.div
              animate={{ y: [0, 3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ArrowDown style={{ 
                width: '14px', 
                height: '14px', 
                color: 'var(--foreground)', 
                opacity: 0.6 
              }} />
            </motion.div>
          </div>
        </motion.div>
      </div>
      </motion.div>
    </section>
  );
}
