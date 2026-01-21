"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

function useCountUp(target: number, duration = 1200) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let start: number | null = null;
    let frameId: number;

    const step = (timestamp: number) => {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setValue(Math.round(progress * target));
      if (progress < 1) frameId = window.requestAnimationFrame(step);
    };

    frameId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(frameId);
  }, [target, duration]);

  return value;
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const statOfficial = useCountUp(100);
  const statWarranty = useCountUp(10);
  
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <section 
      ref={sectionRef}
      style={{ 
        position: 'relative',
        height: '100dvh',
        minHeight: isMobile ? '600px' : '700px',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Background Image */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'url(/images/bg-hero-tesla.jpeg)',
        backgroundSize: 'cover',
        backgroundPosition: isMobile ? '50% center' : 'left center',
        zIndex: 0,
      }} />
      
      {/* Dark overlay for text readability */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: isMobile 
          ? 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.3) 100%)'
          : 'linear-gradient(to right, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.2) 100%)',
        zIndex: 1,
      }} />

      {/* Animated Certified Badge - Mobile only, top left */}
      {isMobile && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          style={{
            position: 'absolute',
            top: '80px',
            left: '20px',
            zIndex: 20,
            width: '70px',
            height: '70px',
          }}
        >
          {/* Rotating text circle */}
          <motion.svg
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            viewBox="0 0 100 100"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
            }}
          >
            <defs>
              <path
                id="circlePathMobile"
                d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
              />
            </defs>
            <text
              fill="rgba(255,255,255,0.7)"
              fontSize="9"
              fontWeight="500"
              letterSpacing="0.12em"
            >
              <textPath href="#circlePathMobile">
                СЕРТИФІКОВАНО • ОФІЦІЙНИЙ ПАРТНЕР • 
              </textPath>
            </text>
          </motion.svg>
          
          {/* Center icon */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="rgba(255,255,255,0.9)" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z"/>
            </svg>
          </div>
        </motion.div>
      )}

      {/* Main Content */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        position: 'relative',
        zIndex: 10,
        padding: isMobile ? '80px 20px 40px' : '140px 0 80px',
      }}>
        <div style={{
          width: '100%',
          maxWidth: '1280px',
          margin: '0 auto',
          padding: isMobile ? '0' : '0 48px',
        }}>
          {/* Two column layout on desktop */}
          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'space-between',
            alignItems: isMobile ? 'flex-start' : 'flex-end',
            gap: isMobile ? '40px' : '60px',
          }}>
            {/* Left column - Text content */}
            <div style={{ maxWidth: isMobile ? '100%' : '600px' }}>
              {/* Main Title - DM Serif Display */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontFamily: 'var(--font-dm-serif), Georgia, "Times New Roman", serif',
                  fontSize: isMobile ? 'clamp(28px, 7.5vw, 40px)' : 'clamp(44px, 4.5vw, 64px)',
                  fontWeight: 400,
                  letterSpacing: '-0.01em',
                  lineHeight: 1.15,
                  color: '#ffffff',
                  marginBottom: '20px',
                }}
              >
                Енергонезалежність для вашого дому та бізнесу.
              </motion.h1>

              {/* Description - Inter clean sans */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                style={{
                  fontFamily: 'var(--font-inter), -apple-system, BlinkMacSystemFont, sans-serif',
                  fontSize: isMobile ? '15px' : '17px',
                  fontWeight: 400,
                  lineHeight: 1.7,
                  color: 'rgba(255,255,255,0.75)',
                  maxWidth: '440px',
                  marginBottom: '32px',
                }}
              >
                Офіційний імпортер Tesla Energy в Україні. Системи накопичення енергії Powerwall та Megapack з повним інженерним супроводом.
              </motion.p>

              {/* CTA Button Group - both react on hover */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="cta-group"
                style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                onMouseEnter={(e) => {
                  const btn = e.currentTarget.querySelector('.hero-cta-btn') as HTMLElement;
                  const arrow = e.currentTarget.querySelector('.hero-cta-arrow') as HTMLElement;
                  const arrowIcon = e.currentTarget.querySelector('.hero-cta-arrow svg') as HTMLElement;
                  const span = e.currentTarget.querySelector('.hero-cta-btn span') as HTMLElement;
                  if (btn) {
                    btn.style.backgroundColor = 'transparent';
                    btn.style.borderColor = '#ffffff';
                  }
                  if (span) span.style.color = '#ffffff';
                  if (arrow) {
                    arrow.style.backgroundColor = '#1d1d1f';
                    arrow.style.borderColor = '#1d1d1f';
                  }
                  if (arrowIcon) arrowIcon.style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  const btn = e.currentTarget.querySelector('.hero-cta-btn') as HTMLElement;
                  const arrow = e.currentTarget.querySelector('.hero-cta-arrow') as HTMLElement;
                  const arrowIcon = e.currentTarget.querySelector('.hero-cta-arrow svg') as HTMLElement;
                  const span = e.currentTarget.querySelector('.hero-cta-btn span') as HTMLElement;
                  if (btn) {
                    btn.style.backgroundColor = '#ffffff';
                    btn.style.borderColor = '#ffffff';
                  }
                  if (span) span.style.color = '#1d1d1f';
                  if (arrow) {
                    arrow.style.backgroundColor = '#1d1d1f';
                    arrow.style.borderColor = '#ffffff';
                  }
                  if (arrowIcon) arrowIcon.style.color = '#ffffff';
                }}
              >
                {/* White pill button */}
                <div
                  className="hero-cta-btn"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    height: '48px',
                    padding: '0 24px',
                    borderRadius: '100px',
                    backgroundColor: '#ffffff',
                    border: '2px solid #ffffff',
                    transition: 'all 0.25s ease',
                  }}
                >
                  <span style={{
                    fontFamily: 'var(--font-inter), -apple-system, BlinkMacSystemFont, sans-serif',
                    fontSize: '14px',
                    fontWeight: 600,
                    letterSpacing: '0.01em',
                    color: '#1d1d1f',
                    transition: 'color 0.25s ease',
                  }}>
                    Замовити консультацію
                  </span>
                </div>
                
                {/* Dark circle arrow button */}
                <div
                  className="hero-cta-arrow"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    backgroundColor: '#1d1d1f',
                    border: '2px solid #ffffff',
                    marginLeft: '1px',
                    transition: 'all 0.25s ease',
                  }}
                >
                  <ArrowRight style={{ 
                    width: '18px', 
                    height: '18px',
                    color: '#ffffff',
                    transform: 'rotate(-45deg)',
                  }} />
                </div>
              </motion.div>
            </div>

            {/* Right column - Stats + Certified Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              style={{
                display: isMobile ? 'grid' : 'flex',
                gridTemplateColumns: isMobile ? '1fr 1fr' : 'none',
                alignItems: isMobile ? 'start' : 'flex-end',
                gap: isMobile ? '24px' : '48px',
                width: isMobile ? '100%' : 'auto',
              }}
            >
              {/* Animated Certified Badge - hidden on mobile */}
              {!isMobile && (
                <div style={{
                  position: 'relative',
                  width: '100px',
                  height: '100px',
                }}>
                  {/* Rotating text circle */}
                  <motion.svg
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    viewBox="0 0 100 100"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                    }}
                  >
                    <defs>
                      <path
                        id="circlePath"
                        d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                      />
                    </defs>
                    <text
                      fill="rgba(255,255,255,0.7)"
                      fontSize="9"
                      fontWeight="500"
                      letterSpacing="0.12em"
                    >
                      <textPath href="#circlePath">
                        СЕРТИФІКОВАНО • ОФІЦІЙНИЙ ПАРТНЕР • 
                      </textPath>
                    </text>
                  </motion.svg>
                  
                  {/* Center icon */}
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <svg 
                      width="22" 
                      height="22" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="rgba(255,255,255,0.9)" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z"/>
                    </svg>
                  </div>
                </div>
              )}

              {/* Stat 1 - Official equipment */}
              <div>
                <div style={{
                  fontFamily: 'var(--font-inter), -apple-system, BlinkMacSystemFont, sans-serif',
                  fontSize: isMobile ? '40px' : '56px',
                  fontWeight: 700,
                  color: '#ffffff',
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                  marginBottom: '8px',
                  display: 'flex',
                  alignItems: 'baseline',
                }}>
                  <span>{statOfficial}</span>
                  <span style={{ 
                    fontSize: '0.5em',
                    fontWeight: 500,
                    opacity: 0.6,
                    marginLeft: '2px',
                  }}>%</span>
                </div>
                <div style={{
                  fontFamily: 'var(--font-inter), -apple-system, BlinkMacSystemFont, sans-serif',
                  fontSize: isMobile ? '12px' : '13px',
                  color: 'rgba(255,255,255,0.6)',
                  fontWeight: 500,
                  letterSpacing: '0.01em',
                }}>
                  Офіційне обладнання
                </div>
              </div>

              {/* Stat 2 - Warranty */}
              <div>
                <div style={{
                  fontFamily: 'var(--font-inter), -apple-system, BlinkMacSystemFont, sans-serif',
                  fontSize: isMobile ? '40px' : '56px',
                  fontWeight: 700,
                  color: '#ffffff',
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                  marginBottom: '8px',
                  display: 'flex',
                  alignItems: 'baseline',
                }}>
                  <span>{statWarranty}</span>
                  <span style={{ 
                    fontSize: '0.5em',
                    fontWeight: 500,
                    opacity: 0.6,
                    marginLeft: '2px',
                  }}>+</span>
                </div>
                <div style={{
                  fontFamily: 'var(--font-inter), -apple-system, BlinkMacSystemFont, sans-serif',
                  fontSize: isMobile ? '12px' : '13px',
                  color: 'rgba(255,255,255,0.6)',
                  fontWeight: 500,
                  letterSpacing: '0.01em',
                }}>
                  Років гарантії
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
