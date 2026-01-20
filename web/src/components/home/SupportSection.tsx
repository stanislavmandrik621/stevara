"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform, useSpring } from "framer-motion";
import { Headphones, Activity, MessageCircle, Calendar } from "lucide-react";

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

const supportFeatures = [
  {
    icon: Headphones,
    title: "Технічна підтримка",
    description: "У форматі, визначеному договором",
  },
  {
    icon: Activity,
    title: "Моніторинг",
    description: "Ми бачимо, якщо щось не так",
  },
  {
    icon: MessageCircle,
    title: "Консультації",
    description: "У разі нестандартних ситуацій",
  },
  {
    icon: Calendar,
    title: "Планові огляди",
    description: "За узгодженою програмою",
  },
];

export function SupportSection() {
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
      className="section-padding"
      style={{ 
        position: 'relative',
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
        {/* Main content - centered statement */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(40px, 8vw, 80px)' }}>
          <FadeIn>
            <span className="text-label" style={{ display: 'block', marginBottom: '24px' }}>
              Супровід
            </span>
          </FadeIn>
          
          <FadeIn delay={0.1}>
            <h2 style={{ marginBottom: '24px' }}>
              Система, яка залишається<br className="hide-mobile" /> під контролем
            </h2>
          </FadeIn>
          
          <FadeIn delay={0.2}>
            <p className="text-lead" style={{ 
              maxWidth: '600px', 
              margin: '0 auto',
            }}>
              Ми залишаємось на зв'язку після введення системи в експлуатацію. 
              Високоякісний та швидкий сервіс — це наш пріоритет.
            </p>
          </FadeIn>
        </div>

        {/* 4-column feature grid - responsive */}
        <div className="grid-responsive-4">
          {supportFeatures.map((feature, index) => (
            <FadeIn key={index} delay={0.3 + index * 0.1}>
              <motion.div 
                style={{
                  padding: 'clamp(24px, 4vw, 32px) clamp(20px, 3vw, 24px)',
                  borderRadius: '20px',
                  backgroundColor: 'var(--background-secondary)',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  gap: '14px',
                }}
                whileHover={{ 
                  y: -8,
                  backgroundColor: 'var(--brand-orange)',
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Icon */}
                <motion.div 
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '48px',
                    height: '48px',
                    borderRadius: '14px',
                    backgroundColor: 'var(--brand-orange)',
                  }}
                  whileHover={{
                    backgroundColor: '#000',
                  }}
                >
                  <feature.icon style={{ 
                    width: '24px', 
                    height: '24px', 
                    color: '#000',
                  }} />
                </motion.div>
                
                {/* Title */}
                <h5 style={{ margin: 0 }}>
                  {feature.title}
                </h5>
                
                {/* Description */}
                <p className="text-muted" style={{ 
                  margin: 0,
                  fontSize: '15px',
                  lineHeight: 1.5,
                }}>
                  {feature.description}
                </p>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
