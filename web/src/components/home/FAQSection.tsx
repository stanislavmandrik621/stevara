"use client";

import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

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
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const smoothOpacity = useSpring(opacity, { stiffness: 100, damping: 30 });

  return (
    <section 
      ref={sectionRef}
      style={{ 
        position: 'relative',
        padding: 'clamp(40px, 6vw, 60px) 0',
        backgroundColor: 'var(--background)',
      }}
    >
      <motion.div 
        style={{
          opacity: smoothOpacity,
          width: '100%',
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 clamp(16px, 4vw, 24px)',
        }}
      >
        {/* Top divider line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{
            height: '1px',
            backgroundColor: 'var(--foreground)',
            opacity: 0.1,
            transformOrigin: 'left',
            marginBottom: 'clamp(32px, 5vw, 48px)',
          }}
        />

        {/* Two column layout - responsive */}
        <div className="grid-responsive-12" style={{ gap: 'clamp(32px, 6vw, 80px)' }}>
          {/* Left - Header */}
          <div className="lg-col-span-4">
            <FadeIn>
              <span className="text-label" style={{ display: 'block', marginBottom: '24px' }}>
                FAQ
              </span>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2>Питання та відповіді</h2>
            </FadeIn>
          </div>

          {/* Right - Questions */}
          <div className="lg-col-span-8">
            {faqs.map((faq, index) => (
              <FadeIn key={index} delay={0.2 + index * 0.05}>
                <div 
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  style={{
                    borderBottom: index < faqs.length - 1 ? '1px solid' : 'none',
                    borderColor: 'rgba(128,128,128,0.15)',
                    cursor: 'pointer',
                    paddingBottom: 'clamp(20px, 4vw, 32px)',
                    marginBottom: 'clamp(20px, 4vw, 32px)',
                  }}
                >
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: '16px',
                  }}>
                    <h4 style={{ 
                      margin: 0,
                      fontSize: 'clamp(1.125rem, 2vw, 1.375rem)',
                      color: openIndex === index ? 'var(--brand-orange)' : 'var(--foreground)',
                      transition: 'color 0.3s ease',
                    }}>
                      {faq.question}
                    </h4>
                    <motion.span
                      animate={{ rotate: openIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        fontSize: '24px',
                        fontWeight: 300,
                        color: openIndex === index ? 'var(--brand-orange)' : 'var(--foreground)',
                        opacity: 0.5,
                        flexShrink: 0,
                        lineHeight: 1,
                      }}
                    >
                      {openIndex === index ? '−' : '+'}
                    </motion.span>
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
                          className="text-lead"
                          style={{
                            marginTop: '16px',
                            marginBottom: 0,
                          }}
                        >
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
