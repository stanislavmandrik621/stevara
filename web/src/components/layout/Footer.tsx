"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const footerLinks = [
  { label: "Powerwall", href: "/powerwall" },
  { label: "Megapack", href: "/megapack" },
  { label: "Про нас", href: "/about" },
  { label: "Контакти", href: "/contacts" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === 'dark';

  return (
    <footer 
      style={{
        padding: 'clamp(48px, 8vw, 80px) 0 0 0',
        backgroundColor: 'var(--background)',
      }}
    >
      <div style={{
        width: '100%',
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 clamp(16px, 4vw, 24px)',
      }}>
        {/* Top divider line with animation */}
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: '100%' }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            height: '2px',
            backgroundColor: 'var(--foreground)',
            marginBottom: 'clamp(40px, 8vw, 80px)',
          }} 
        />

        {/* Main Content - Two columns on desktop, stacked on mobile */}
        <div className="grid-responsive-2" style={{ marginBottom: 'clamp(60px, 10vw, 100px)' }}>
          {/* Left - Brand & CTA */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: 'clamp(24px, 4vw, 40px)',
                  textDecoration: 'none',
                  cursor: 'default',
                }}
              >
                <div style={{ position: 'relative', width: '32px', height: '32px' }}>
                  <Image 
                    src="/images/logo.svg" 
                    alt="STEVARA Logo" 
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                </div>
                <span style={{
                  color: 'var(--foreground)',
                  fontSize: '16px',
                  fontWeight: 600,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase'
                }}>
                  STEVARA
                </span>
              </span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              style={{
                color: 'var(--foreground)',
                fontSize: 'clamp(28px, 5vw, 48px)',
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                marginBottom: 'clamp(24px, 4vw, 40px)',
                maxWidth: '400px',
              }}
            >
              Готові почати свій проєкт?
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span 
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: 'clamp(14px, 2vw, 18px) clamp(24px, 4vw, 32px)',
                  fontSize: 'clamp(14px, 1.5vw, 16px)',
                  fontWeight: 600,
                  letterSpacing: '0.02em',
                  textDecoration: 'none',
                  borderRadius: '100px',
                  backgroundColor: 'var(--foreground)',
                  color: 'var(--background)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                  cursor: 'default',
                }}
              >
                Зв'язатися з нами
                <ArrowUpRight style={{ width: '18px', height: '18px' }} />
              </span>
            </motion.div>
          </div>

          {/* Right - Links with arrows */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
          }}>
            <nav style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0',
            }}>
              {footerLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
                >
                  <span 
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: 'clamp(14px, 2vw, 20px) 0',
                      borderBottom: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
                      color: 'var(--foreground)',
                      fontSize: 'clamp(16px, 1.5vw, 18px)',
                      fontWeight: 500,
                      textDecoration: 'none',
                      cursor: 'default',
                    }}
                  >
                    {link.label}
                    <ArrowRight style={{ 
                      width: '16px', 
                      height: '16px',
                      opacity: 0.4,
                    }} />
                  </span>
                </motion.div>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="footer-bottom-bar"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px',
            paddingTop: '24px',
            paddingBottom: '32px',
            borderTop: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
          }}
        >
          {/* Left - copyright and location */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '12px',
          }}>
            <p style={{ 
              fontSize: '13px', 
              color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)',
              margin: 0,
            }}>
              © {currentYear} STEVARA
            </p>
            <span className="hide-mobile" style={{
              width: '4px',
              height: '4px',
              borderRadius: '50%',
              backgroundColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
            }} />
            <p style={{ 
              fontSize: '13px', 
              color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)',
              margin: 0,
            }}>
              Працюємо по всій Україні
            </p>
          </div>
          
          {/* Right - contacts */}
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap',
            alignItems: 'center', 
            gap: '16px' 
          }}>
            <a 
              href="mailto:info@stevara.ua" 
              style={{
                fontSize: '13px',
                color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
                fontWeight: 500,
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = isDark ? '#ffffff' : '#000000'}
              onMouseLeave={(e) => e.currentTarget.style.color = isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)'}
            >
              info@stevara.ua
            </a>
            <span className="hide-mobile" style={{
              width: '1px',
              height: '12px',
              backgroundColor: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)',
            }} />
            <a 
              href="tel:+380441234567" 
              style={{
                fontSize: '13px',
                color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
                fontWeight: 500,
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = isDark ? '#ffffff' : '#000000'}
              onMouseLeave={(e) => e.currentTarget.style.color = isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)'}
            >
              +380 (44) 123-45-67
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
