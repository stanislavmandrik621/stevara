"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Check } from "lucide-react";

type Language = "en" | "ua";

const languages = [
  { code: "en" as Language, name: "English" },
  { code: "ua" as Language, name: "Українська" },
];

export function LanguageToggle() {
  const [lang, setLang] = React.useState<Language>("ua");
  const [isOpen, setIsOpen] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (newLang: Language) => {
    setLang(newLang);
    setIsOpen(false);
  };

  return (
    <div style={{ position: 'relative' }} ref={dropdownRef}>
      {/* Trigger Button - Globe icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          transition: 'all 0.2s ease',
          border: '1px solid',
          cursor: 'pointer',
          backgroundColor: isOpen ? 'var(--foreground)' : (isHovered ? 'var(--glass-light)' : 'transparent'),
          borderColor: isOpen ? 'var(--foreground)' : 'var(--glass-border)',
          color: isOpen ? 'var(--background)' : 'var(--foreground)',
        }}
        aria-label="Select language"
      >
        <Globe style={{ width: '18px', height: '18px' }} />
        {/* Small language badge */}
        <span 
          style={{
            position: 'absolute',
            bottom: '-2px',
            right: '-2px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '18px',
            height: '18px',
            borderRadius: '50%',
            backgroundColor: 'var(--background)',
            border: '1px solid var(--glass-border)',
            fontSize: '8px',
            fontWeight: 700,
            color: 'var(--foreground)',
            textTransform: 'uppercase',
          }}
        >
          {lang}
        </span>
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.15 }}
            style={{
              position: 'absolute',
              top: 'calc(100% + 12px)',
              right: 0,
              minWidth: '140px',
              backgroundColor: 'var(--background)',
              borderRadius: '12px',
              border: '1px solid var(--glass-border)',
              padding: '6px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
              zIndex: 9999,
            }}
          >
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleSelect(language.code)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: lang === language.code ? 600 : 400,
                  backgroundColor: lang === language.code ? 'rgba(0, 0, 0, 0.06)' : 'transparent',
                  color: 'var(--foreground)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background-color 0.15s ease',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => {
                  if (lang !== language.code) {
                    e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.04)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (lang !== language.code) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <span>{language.name}</span>
                {lang === language.code && (
                  <Check style={{ width: '14px', height: '14px', color: 'var(--accent)' }} />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
