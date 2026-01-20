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
  { href: "/megapack", label: "Megapack" },
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
      
      // Track if page is scrolled for header position
      setIsScrolled(currentScrollY > 50);
      
      // More generous threshold - only hide after scrolling down 200px
      if (currentScrollY < 200) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY + 10) {
        // Only hide if scrolling down by more than 10px (reduces sensitivity)
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY - 5) {
        // Show when scrolling up by more than 5px
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

  // Mobile gets fixed small padding, desktop gets dynamic padding based on scroll
  const getTopPadding = () => {
    if (isMobile) {
      return '16px'; // Fixed small padding on mobile
    }
    return isScrolled ? '12px' : '56px'; // Dynamic on desktop
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ 
          y: isVisible ? 0 : -150, 
          opacity: isVisible ? 1 : 0,
          paddingTop: getTopPadding()
        }}
        transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          paddingBottom: '12px',
        }}
      >
        {/* Container - 1280px max */}
        <div style={{
          width: '100%',
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 24px',
        }}>
          {/* Nav pill - Glass effect */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 20px',
              backgroundColor: isDark ? 'rgba(30, 30, 35, 0.7)' : 'rgba(255, 255, 255, 0.75)',
              backdropFilter: 'blur(24px) saturate(180%)',
              WebkitBackdropFilter: 'blur(24px) saturate(180%)',
              borderRadius: '18px',
              border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(255, 255, 255, 0.9)',
              boxShadow: isDark 
                ? '0 4px 24px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255,255,255,0.05)' 
                : '0 4px 24px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255,255,255,0.8)',
              transition: 'background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
            }}
          >
            <span 
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                textDecoration: 'none',
                height: '44px',
                cursor: 'default',
              }}
            >
              <div style={{ 
                position: 'relative', 
                width: '28px', 
                height: '28px',
              }}>
                <Image 
                  src="/images/logo.svg" 
                  alt="STEVARA Logo" 
                  fill
                  style={{ objectFit: 'contain' }}
                  priority
                />
              </div>
              <span style={{
                color: 'var(--foreground)',
                fontSize: '15px',
                fontWeight: 600,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                transition: 'color 0.3s ease',
              }}>
                STEVARA
              </span>
            </span>

            {!isMobile && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <nav
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '3px',
                    padding: '5px',
                    backgroundColor: isDark ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.04)',
                    borderRadius: '100px',
                    border: isDark ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(255,255,255,0.5)',
                    boxShadow: isDark 
                      ? 'inset 0 2px 4px rgba(0,0,0,0.3), inset 0 1px 2px rgba(0,0,0,0.2)'
                      : 'inset 0 2px 4px rgba(0,0,0,0.06), inset 0 1px 2px rgba(0,0,0,0.04)',
                    height: '44px',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {navLinks.map((link) => {
                    const isActive = pathname === link.href;
                    const isDisabled = link.href !== "/";
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={(e) => isDisabled && e.preventDefault()}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: '0 16px',
                          height: '34px',
                          fontSize: '12px',
                          fontWeight: isActive ? 600 : 500,
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          textDecoration: 'none',
                          borderRadius: '100px',
                          color: isActive ? 'var(--background)' : 'var(--foreground-muted)',
                          backgroundColor: isActive ? 'var(--foreground)' : 'transparent',
                          boxShadow: isActive 
                            ? (isDark 
                              ? '0 2px 8px rgba(0,0,0,0.3), 0 1px 3px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)'
                              : '0 2px 8px rgba(0,0,0,0.15), 0 1px 3px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.2)')
                            : 'none',
                          transition: 'all 0.2s ease',
                          cursor: 'default',
                        }}
                      >
                        {link.label}
                      </Link>
                    );
                  })}
                </nav>

                <div style={{ 
                  height: '44px',
                  width: '1px', 
                  backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)', 
                  margin: '0 6px'
                }} />

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ThemeToggle />
                  <LanguageToggle />
                </div>

                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '0 24px',
                    height: '44px',
                    backgroundColor: 'var(--foreground)',
                    color: 'var(--background)',
                    fontSize: '12px',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    borderRadius: '100px',
                    boxShadow: isDark
                      ? '0 4px 12px rgba(0,0,0,0.4), 0 2px 4px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.15)'
                      : '0 4px 12px rgba(0,0,0,0.15), 0 2px 4px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.25)',
                    transition: 'all 0.2s ease',
                    cursor: 'default',
                  }}
                >
                  <span>Запит</span>
                  <ArrowRight style={{ width: '14px', height: '14px' }} />
                </span>
              </div>
            )}

            {isMobile && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ThemeToggle />
                <LanguageToggle />
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
                    border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.06)',
                    cursor: 'pointer',
                    color: 'var(--foreground)',
                    transition: 'all 0.3s ease',
                  }}
                  aria-label="Toggle menu"
                >
                  <Menu style={{ width: '18px', height: '18px' }} />
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
