"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";

const footerLinks = [
  { label: "Головна", href: "/" },
  { label: "Powerwall", href: "/powerwall" },
  { label: "Про нас", href: "/about" },
  { label: "Контакти", href: "/contacts" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [isMobile, setIsMobile] = useState(false);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === 'dark';

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <footer 
      style={{
        position: 'relative',
        backgroundColor: 'var(--background)',
        overflow: 'hidden',
        borderTop: '1px solid var(--divider)',
      }}
    >
      {/* Large decorative logo watermark - aligned to inner container */}
      <div style={{
        position: 'absolute',
        bottom: isMobile ? '20px' : '30px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: isMobile ? 'calc(100% - 48px)' : 'calc(1280px - 96px)',
        opacity: isDark ? 0.04 : 0.04,
        pointerEvents: 'none',
        userSelect: 'none',
      }}>
        <Image
          src={isDark ? "/images/logo-white.svg" : "/images/logo-black.svg"}
          alt=""
          width={1200}
          height={170}
          style={{
            width: '100%',
            height: 'auto',
          }}
        />
      </div>

      <div style={{
        width: '100%',
        maxWidth: '1280px',
        margin: '0 auto',
        padding: isMobile ? '60px 24px 32px' : '100px 48px 48px',
        position: 'relative',
        zIndex: 10,
      }}>
        {/* Main Content */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1.2fr',
          gap: isMobile ? '48px' : 'clamp(60px, 10vw, 120px)',
          marginBottom: isMobile ? '60px' : '120px',
        }}>
          {/* Left - Brand & CTA */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{
                display: 'inline-block',
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--foreground-muted)',
                marginBottom: '32px',
              }}
            >
              Контакт
            </motion.span>
            
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              style={{
                color: 'var(--foreground)',
                marginBottom: '40px',
                maxWidth: '500px',
              }}
            >
              Готові до{' '}
              <span style={{ color: 'var(--foreground-muted)' }}>
                енергонезалежності?
              </span>
            </motion.h2>

            {/* CTA Button - Hero style */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="footer-cta-group"
              style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', width: 'fit-content' }}
              onMouseEnter={(e) => {
                const btn = e.currentTarget.querySelector('.footer-cta-btn') as HTMLElement;
                const arrow = e.currentTarget.querySelector('.footer-cta-arrow') as HTMLElement;
                const arrowIcon = e.currentTarget.querySelector('.footer-cta-arrow svg') as HTMLElement;
                const span = e.currentTarget.querySelector('.footer-cta-btn span') as HTMLElement;
                if (btn) {
                  btn.style.backgroundColor = 'transparent';
                  btn.style.borderColor = 'var(--foreground)';
                }
                if (span) span.style.color = 'var(--foreground)';
                if (arrow) {
                  arrow.style.backgroundColor = 'var(--foreground)';
                  arrow.style.borderColor = 'var(--foreground)';
                }
                if (arrowIcon) arrowIcon.style.color = 'var(--background)';
              }}
              onMouseLeave={(e) => {
                const btn = e.currentTarget.querySelector('.footer-cta-btn') as HTMLElement;
                const arrow = e.currentTarget.querySelector('.footer-cta-arrow') as HTMLElement;
                const arrowIcon = e.currentTarget.querySelector('.footer-cta-arrow svg') as HTMLElement;
                const span = e.currentTarget.querySelector('.footer-cta-btn span') as HTMLElement;
                if (btn) {
                  btn.style.backgroundColor = 'var(--foreground)';
                  btn.style.borderColor = 'var(--foreground)';
                }
                if (span) span.style.color = 'var(--background)';
                if (arrow) {
                  arrow.style.backgroundColor = 'var(--background)';
                  arrow.style.borderColor = 'var(--foreground)';
                }
                if (arrowIcon) arrowIcon.style.color = 'var(--foreground)';
              }}
            >
              <div
                className="footer-cta-btn"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  height: '52px',
                  padding: '0 28px',
                  borderRadius: '100px',
                  backgroundColor: 'var(--foreground)',
                  border: '2px solid var(--foreground)',
                  transition: 'all 0.25s ease',
                }}
              >
                <span style={{
                  fontFamily: 'var(--font-inter), -apple-system, BlinkMacSystemFont, sans-serif',
                  fontSize: '14px',
                  fontWeight: 600,
                  letterSpacing: '0.01em',
                  color: 'var(--background)',
                  transition: 'color 0.25s ease',
                }}>
                  Зв'язатися з нами
                </span>
              </div>
              
              <div
                className="footer-cta-arrow"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '52px',
                  height: '52px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--background)',
                  border: '2px solid var(--foreground)',
                  marginLeft: '1px',
                  transition: 'all 0.25s ease',
                }}
              >
                <ArrowRight style={{ 
                  width: '18px', 
                  height: '18px',
                  color: 'var(--foreground)',
                  transform: 'rotate(-45deg)',
                  transition: 'color 0.25s ease',
                }} />
              </div>
            </motion.div>
          </div>

          {/* Right - Minimal links */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
          }}>
            <nav style={{
              display: 'flex',
              flexDirection: 'column',
            }}>
              {footerLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '20px 0',
                    borderBottom: '1px solid var(--divider)',
                    color: 'var(--foreground)',
                    fontSize: '16px',
                    fontWeight: 500,
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.paddingLeft = '12px';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.paddingLeft = '0';
                  }}
                >
                  {link.label}
                  <ArrowRight style={{ 
                    width: '16px', 
                    height: '16px',
                    opacity: 0.4,
                    transform: 'rotate(-45deg)',
                  }} />
                </motion.a>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom Bar - Minimal */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'space-between',
            alignItems: isMobile ? 'flex-start' : 'center',
            gap: '24px',
            paddingTop: '32px',
            borderTop: '1px solid var(--divider)',
          }}
        >
          {/* Left */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '32px',
          }}>
            <Image
              src={isDark ? "/images/logo-white.svg" : "/images/logo-black.svg"}
              alt="STEVARA"
              width={120}
              height={17}
              style={{
                height: '17px',
                width: 'auto',
              }}
            />
            <span style={{ 
              fontSize: '13px', 
              color: 'var(--foreground-muted)',
            }}>
              © {currentYear}
            </span>
          </div>
          
          {/* Right - contacts */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '32px',
          }}>
            <a 
              href="mailto:info@stevara.ua" 
              style={{
                fontSize: '13px',
                color: 'var(--foreground-muted)',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--foreground)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--foreground-muted)'}
            >
              info@stevara.ua
            </a>
            <a 
              href="tel:+380441234567" 
              style={{
                fontSize: '13px',
                color: 'var(--foreground-muted)',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--foreground)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--foreground-muted)'}
            >
              +380 (44) 123-45-67
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
