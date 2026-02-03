"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

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

function FadeIn({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

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
          padding: '0 clamp(24px, 4vw, 48px)',
        }}
      >
        {/* Header - Centered */}
        <div
          style={{
            textAlign: "center",
            maxWidth: "800px",
            margin: "0 auto",
            marginBottom: "clamp(60px, 10vw, 100px)",
          }}
        >
          <FadeIn>
            <span className="text-label" style={{ marginBottom: "20px" }}>
              FAQ
            </span>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h2 style={{ marginBottom: "24px" }}>Питання та відповіді</h2>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p
              className="text-lead"
              style={{
                margin: 0,
                maxWidth: "600px",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              Найпоширеніші запитання про Tesla Powerwall та нашу роботу
            </p>
          </FadeIn>
        </div>

        {/* FAQ Items - Full width to container */}
        <div>
          {faqs.map((faq, index) => (
            <FadeIn key={index} delay={0.2 + index * 0.05}>
              <div
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                style={{
                  borderBottom: "1px solid var(--divider)",
                  cursor: "pointer",
                  padding: isMobile ? "24px 0" : "28px 0",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "24px",
                  }}
                >
                  {/* Question */}
                  <h4
                    style={{
                      margin: 0,
                      flex: 1,
                      fontSize: isMobile ? "1.0625rem" : "1.25rem",
                      fontWeight: 500,
                    }}
                  >
                    {faq.question}
                  </h4>

                  {/* Toggle icon */}
                  <div
                    style={{
                      position: "relative",
                      width: "32px",
                      height: "32px",
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "50%",
                      backgroundColor: openIndex === index ? "var(--foreground)" : "var(--accent-dim)",
                      transition: "background-color 0.25s ease",
                    }}
                  >
                    {/* Horizontal line */}
                    <span
                      style={{
                        position: "absolute",
                        width: "12px",
                        height: "2px",
                        backgroundColor: openIndex === index ? "var(--background)" : "var(--foreground)",
                        borderRadius: "1px",
                        transition: "background-color 0.25s ease",
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
                        position: "absolute",
                        width: "2px",
                        height: "12px",
                        backgroundColor: "var(--foreground)",
                        borderRadius: "1px",
                      }}
                    />
                  </div>
                </div>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      style={{ overflow: "hidden" }}
                    >
                      <p
                        style={{
                          margin: 0,
                          marginTop: "16px",
                          paddingRight: isMobile ? 0 : "56px",
                          fontSize: isMobile ? "0.9375rem" : "1.0625rem",
                          lineHeight: 1.7,
                          color: "var(--foreground-muted)",
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
    </section>
  );
}
