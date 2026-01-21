"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "Чи це офіційні системи Tesla?",
    answer: "Так. Ми працюємо з обладнанням, яке офіційно імпортоване та сертифіковане в Україні.",
  },
  {
    question: "Чи ви офіційний партнер Tesla?",
    answer: "Ми інженерна компанія, що спеціалізується виключно на системах Tesla. Наші інженери пройшли навчання та сертифікацію виробника.",
  },
  {
    question: "Чому ви працюєте тільки з Tesla?",
    answer: "Ми обрали один виробник, щоб знати систему досконало і відповідати за результат, а не пропонувати компромісні альтернативи.",
  },
  {
    question: "З чого починається робота?",
    answer: "З розмови з інженером. Ви описуєте ваш об'єкт — ми допомагаємо зрозуміти, чи підходить рішення.",
  },
  {
    question: "Скільки часу займає встановлення?",
    answer: "Залежить від об'єкта. Після першої розмови ми зможемо зорієнтувати по вашому випадку.",
  },
  {
    question: "Що буде після встановлення?",
    answer: "Супровід після запуску — це частина нашої роботи. Формат визначається договором.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
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
      className="section-padding"
      style={{ 
        position: 'relative',
        backgroundColor: 'var(--background)',
        borderTop: '1px solid var(--divider)',
      }}
    >
      <div 
        style={{
          width: '100%',
          maxWidth: '1280px',
          margin: '0 auto',
          padding: isMobile ? '0 24px' : '0 48px',
        }}
      >
        {/* Header - always on top for mobile */}
        {isMobile && (
          <div style={{ marginBottom: '32px' }}>
            <span className="text-label" style={{ display: 'block', marginBottom: '20px' }}>
              FAQ
            </span>
            <h2>Питання та відповіді</h2>
          </div>
        )}

        {/* Two column layout */}
        <div 
          style={{ 
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 2fr',
            gap: isMobile ? '0' : 'clamp(60px, 10vw, 120px)',
          }}
        >
          {/* Left - Header (sticky on desktop only) */}
          {!isMobile && (
            <div style={{ 
              position: 'sticky',
              top: '120px',
              alignSelf: 'start',
            }}>
              <span className="text-label" style={{ display: 'block', marginBottom: '20px' }}>
                FAQ
              </span>
              <h2>Питання та відповіді</h2>
            </div>
          )}

          {/* Right - Questions */}
          <div>
            {faqs.map((faq, index) => (
              <div 
                key={index}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                style={{
                  borderBottom: '1px solid var(--divider)',
                  cursor: 'pointer',
                  padding: isMobile ? '20px 0' : 'clamp(24px, 4vw, 32px) 0',
                }}
              >
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '32px',
                  }}>
                    {/* Question */}
                    <h4 style={{ 
                      margin: 0,
                      flex: 1,
                      fontSize: 'clamp(1.125rem, 2vw, 1.375rem)',
                      fontWeight: 500,
                    }}>
                      {faq.question}
                    </h4>
                    
                    {/* Minimal toggle icon */}
                    <motion.div
                      style={{
                        position: 'relative',
                        width: '48px',
                        height: '48px',
                        flexShrink: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {/* Horizontal line */}
                      <motion.span
                        style={{
                          position: 'absolute',
                          width: '20px',
                          height: '2px',
                          backgroundColor: 'var(--foreground)',
                          borderRadius: '1px',
                        }}
                      />
                      {/* Vertical line - animates */}
                      <motion.span
                        animate={{ 
                          rotate: openIndex === index ? 90 : 0,
                          opacity: openIndex === index ? 0 : 1,
                        }}
                        transition={{ duration: 0.25 }}
                        style={{
                          position: 'absolute',
                          width: '2px',
                          height: '20px',
                          backgroundColor: 'var(--foreground)',
                          borderRadius: '1px',
                        }}
                      />
                    </motion.div>
                  </div>
                  
                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        style={{ overflow: 'hidden' }}
                      >
                        <p 
                          style={{
                            margin: 0,
                            marginTop: '20px',
                            paddingRight: isMobile ? 0 : '80px',
                            fontSize: 'clamp(1rem, 1.4vw, 1.1rem)',
                            lineHeight: 1.7,
                            color: 'var(--foreground-muted)',
                          }}
                        >
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
