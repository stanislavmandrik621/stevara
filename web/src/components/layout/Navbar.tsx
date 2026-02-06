"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { useTheme } from "next-themes";

const navLinks = [
  { href: "/", label: "Головна" },
  { href: "/about", label: "Про нас" },
  { href: "/powerwall", label: "Powerwall" },
  { href: "/contacts", label: "Контакти" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Track if page is scrolled for background change
      setIsScrolled(currentScrollY > 80);
      
      // Show/hide on scroll
      if (currentScrollY < 200) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY + 10) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY - 5) {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isMobileMenuOpen]);

  const isDark = mounted && resolvedTheme === 'dark';

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ 
          y: isVisible ? 0 : -100, 
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          backgroundColor: isScrolled 
            ? (isDark ? 'rgba(0, 0, 0, 0.95)' : 'rgba(255, 255, 255, 0.98)')
            : 'transparent',
          backdropFilter: isScrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(20px)' : 'none',
          borderBottom: isScrolled 
            ? (isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.08)')
            : '1px solid transparent',
          transition: 'background-color 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease',
        }}
      >
        {/* Container - same as hero content */}
        <div style={{
          width: '100%',
          maxWidth: '1280px',
          margin: '0 auto',
          padding: isMobile ? '16px 24px' : '20px 48px',
        }}>
          {/* Nav content */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            {/* Logo SVG */}
            <Link 
              href="/"
              style={{
                textDecoration: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {/* White logo - visible on hero (not scrolled) or dark mode scrolled */}
              <Image
                src="/images/logo-white.svg"
                alt="STEVARA"
                width={120}
                height={17}
                priority
                style={{
                  display: (!isScrolled || (isScrolled && isDark)) ? 'block' : 'none',
                  height: '17px',
                  width: 'auto',
                }}
              />
              {/* Black logo - visible when scrolled in light mode */}
              <Image
                src="/images/logo-black.svg"
                alt="STEVARA"
                width={120}
                height={17}
                priority
                style={{
                  display: (isScrolled && !isDark) ? 'block' : 'none',
                  height: '17px',
                  width: 'auto',
                }}
              />
            </Link>

            {/* Center nav links - Desktop */}
            {!isMobile && (
              <nav style={{
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                alignItems: 'center',
                gap: '32px',
              }}>
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  const isDisabled = link.href !== "/";
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={(e) => isDisabled && e.preventDefault()}
                      style={{
                        fontSize: '13px',
                        fontWeight: 500,
                        letterSpacing: '0.02em',
                        textDecoration: 'none',
                        color: isScrolled
                          ? (isActive ? 'var(--foreground)' : 'var(--foreground-muted)')
                          : (isActive ? '#ffffff' : 'rgba(255,255,255,0.7)'),
                        transition: 'color 0.2s ease',
                        cursor: isDisabled ? 'default' : 'pointer',
                      }}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>
            )}

            {/* Right side controls */}
            {!isMobile && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ThemeToggle isTransparent={!isScrolled} />
                <LanguageToggle isTransparent={!isScrolled} />
                
                {/* CTA Button - Hero style (right most) */}
                <div
                  className="nav-cta-group"
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    cursor: 'pointer',
                    marginLeft: '12px',
                  }}
                  onMouseEnter={(e) => {
                    const btn = e.currentTarget.querySelector('.nav-cta-btn') as HTMLElement;
                    const arrow = e.currentTarget.querySelector('.nav-cta-arrow') as HTMLElement;
                    const arrowIcon = e.currentTarget.querySelector('.nav-cta-arrow svg') as HTMLElement;
                    const span = e.currentTarget.querySelector('.nav-cta-btn span') as HTMLElement;
                    if (btn) {
                      btn.style.backgroundColor = 'transparent';
                      btn.style.borderColor = isScrolled ? 'var(--foreground)' : '#ffffff';
                    }
                    if (span) span.style.color = isScrolled ? 'var(--foreground)' : '#ffffff';
                    if (arrow) {
                      arrow.style.backgroundColor = isScrolled ? 'var(--foreground)' : '#1d1d1f';
                      arrow.style.borderColor = isScrolled ? 'var(--foreground)' : '#1d1d1f';
                    }
                    if (arrowIcon) arrowIcon.style.color = '#ffffff';
                  }}
                  onMouseLeave={(e) => {
                    const btn = e.currentTarget.querySelector('.nav-cta-btn') as HTMLElement;
                    const arrow = e.currentTarget.querySelector('.nav-cta-arrow') as HTMLElement;
                    const arrowIcon = e.currentTarget.querySelector('.nav-cta-arrow svg') as HTMLElement;
                    const span = e.currentTarget.querySelector('.nav-cta-btn span') as HTMLElement;
                    if (btn) {
                      btn.style.backgroundColor = isScrolled ? 'var(--foreground)' : '#ffffff';
                      btn.style.borderColor = isScrolled ? 'var(--foreground)' : '#ffffff';
                    }
                    if (span) span.style.color = isScrolled ? 'var(--background)' : '#1d1d1f';
                    if (arrow) {
                      arrow.style.backgroundColor = isScrolled ? 'var(--background)' : '#1d1d1f';
                      arrow.style.borderColor = isScrolled ? 'var(--foreground)' : '#ffffff';
                    }
                    if (arrowIcon) arrowIcon.style.color = isScrolled ? 'var(--foreground)' : '#ffffff';
                  }}
                >
                  <div
                    className="nav-cta-btn"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      height: '40px',
                      padding: '0 20px',
                      borderRadius: '100px',
                      backgroundColor: isScrolled ? 'var(--foreground)' : '#ffffff',
                      border: `2px solid ${isScrolled ? 'var(--foreground)' : '#ffffff'}`,
                      transition: 'all 0.25s ease',
                    }}
                  >
                    <span style={{
                      fontFamily: 'var(--font-inter), -apple-system, BlinkMacSystemFont, sans-serif',
                      fontSize: '13px',
                      fontWeight: 600,
                      letterSpacing: '0.01em',
                      color: isScrolled ? 'var(--background)' : '#1d1d1f',
                      transition: 'color 0.25s ease',
                    }}>
                      Запит
                    </span>
                  </div>
                  
                  <div
                    className="nav-cta-arrow"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor: isScrolled ? 'var(--background)' : '#1d1d1f',
                      border: `2px solid ${isScrolled ? 'var(--foreground)' : '#ffffff'}`,
                      marginLeft: '1px',
                      transition: 'all 0.25s ease',
                    }}
                  >
                    <ArrowRight style={{ 
                      width: '16px', 
                      height: '16px',
                      color: isScrolled ? 'var(--foreground)' : '#ffffff',
                      transform: 'rotate(-45deg)',
                    }} />
                  </div>
                </div>
              </div>
            )}

            {/* Mobile menu button */}
            {isMobile && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <ThemeToggle isTransparent={!isScrolled} />
                <LanguageToggle isTransparent={!isScrolled} />
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '40px',
                    height: '40px',
                    borderRadius: '8px',
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    color: isScrolled ? 'var(--foreground)' : '#ffffff',
                    transition: 'color 0.3s ease',
                  }}
                  aria-label="Toggle menu"
                >
                  <Menu style={{ width: '22px', height: '22px' }} />
                </button>
              </div>
            )}
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ 
              position: 'fixed', 
              inset: 0, 
              zIndex: 100, 
              backgroundColor: 'var(--background)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Header with MENU label and close button */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px 24px',
              borderBottom: '1px solid rgba(0,0,0,0.06)',
            }}>
              <span style={{
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--foreground-muted)',
              }}>
                Меню
              </span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(0,0,0,0.04)',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--foreground)',
                }}
                aria-label="Close menu"
              >
                <X style={{ width: '20px', height: '20px' }} />
              </button>
            </div>

            {/* Navigation links */}
            <nav style={{ 
              flex: 1,
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'center', 
              padding: '0 24px',
            }}>
              {navLinks.map((link, index) => {
                const isDisabled = link.href !== "/";
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={link.href}
                      onClick={(e) => {
                        if (isDisabled) {
                          e.preventDefault();
                        } else {
                          setIsMobileMenuOpen(false);
                        }
                      }}
                      style={{
                        display: 'block',
                        padding: '16px 0',
                        fontSize: 'clamp(28px, 7vw, 40px)',
                        fontWeight: 600,
                        letterSpacing: '-0.02em',
                        textDecoration: 'none',
                        color: pathname === link.href ? 'var(--foreground)' : 'var(--foreground-muted)',
                        transition: 'color 0.3s ease',
                        cursor: 'default',
                        borderBottom: '1px solid rgba(0,0,0,0.06)',
                      }}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* Bottom section with button and contacts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              style={{ 
                padding: '24px',
                borderTop: '1px solid rgba(0,0,0,0.06)',
              }}
            >
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                  width: '100%',
                  padding: '18px 32px',
                  backgroundColor: 'var(--foreground)',
                  color: 'var(--background)',
                  fontSize: '15px',
                  fontWeight: 600,
                  letterSpacing: '0.02em',
                  textDecoration: 'none',
                  borderRadius: '14px',
                  cursor: 'default',
                }}
              >
                Залишити запит
                <ArrowRight style={{ width: '16px', height: '16px' }} />
              </span>
              
              {/* Contacts */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '20px',
                paddingTop: '20px',
                borderTop: '1px solid rgba(0,0,0,0.06)',
              }}>
                <a 
                  href="mailto:info@stevara.ua"
                  style={{
                    fontSize: '14px',
                    color: 'var(--foreground-muted)',
                    textDecoration: 'none',
                  }}
                >
                  info@stevara.ua
                </a>
                <a 
                  href="tel:+380441234567"
                  style={{
                    fontSize: '14px',
                    color: 'var(--foreground-muted)',
                    textDecoration: 'none',
                  }}
                >
                  +380 (44) 123-45-67
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
