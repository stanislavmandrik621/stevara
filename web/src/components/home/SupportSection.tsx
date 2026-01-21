"use client";

import { useState, useEffect } from "react";
import { Headphones, Activity, MessageCircle, Calendar } from "lucide-react";

const supportFeatures = [
  {
    icon: Headphones,
    title: "Технічна підтримка",
    description: "Оперативна допомога у форматі, визначеному договором",
  },
  {
    icon: Activity,
    title: "Моніторинг 24/7",
    description: "Автоматичне відстеження стану системи в реальному часі",
  },
  {
    icon: MessageCircle,
    title: "Консультації",
    description: "Експертна допомога у нестандартних ситуаціях",
  },
  {
    icon: Calendar,
    title: "Планові огляди",
    description: "Регулярне обслуговування за узгодженим графіком",
  },
];

export function SupportSection() {
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
        backgroundColor: '#000000',
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
        <div style={{ marginBottom: isMobile ? '32px' : '0' }}>
          {isMobile && (
            <>
              <span 
                style={{
                  display: 'inline-block',
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.5)',
                  marginBottom: '24px',
                }}
              >
                Супровід
              </span>
              
              <h2 style={{ 
                color: '#ffffff',
                marginBottom: '0',
              }}>
                Система під контролем — завжди
              </h2>
            </>
          )}
        </div>

        {/* Two-column layout */}
        <div 
          style={{ 
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: isMobile ? '0' : 'clamp(48px, 8vw, 100px)',
            alignItems: 'start',
          }}
        >
          {/* Left - Sticky header (desktop only) */}
          {!isMobile && (
            <div style={{ 
              position: 'sticky',
              top: '120px',
            }}>
              <span 
                style={{
                  display: 'inline-block',
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.5)',
                  marginBottom: '24px',
                }}
              >
                Супровід
              </span>
              
              <h2 style={{ 
                color: '#ffffff',
                marginBottom: '24px',
              }}>
                Система під контролем — завжди
              </h2>
              
              <p 
                style={{ 
                  margin: 0,
                  fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
                  lineHeight: 1.7,
                  color: 'rgba(255,255,255,0.6)',
                  maxWidth: '400px',
                }}
              >
                Після запуску ми не зникаємо. Моніторинг, підтримка та сервіс — частина нашої роботи.
              </p>
            </div>
          )}

          {/* Right - Feature list */}
          <div 
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: isMobile ? '0' : '1px',
              backgroundColor: isMobile ? 'transparent' : 'rgba(255,255,255,0.1)',
            }}
          >
            {supportFeatures.map((feature, index) => (
              <div 
                key={index}
                style={{
                  backgroundColor: '#000000',
                  padding: isMobile ? '20px 0' : 'clamp(24px, 4vw, 32px)',
                  display: 'flex',
                  gap: '16px',
                  alignItems: 'flex-start',
                  borderBottom: isMobile ? '1px solid rgba(255,255,255,0.1)' : 'none',
                }}
              >
                {/* Icon */}
                <div
                  style={{
                    flexShrink: 0,
                    color: 'rgba(255,255,255,0.4)',
                  }}
                >
                  <feature.icon style={{ 
                    width: '24px', 
                    height: '24px',
                  }} />
                </div>
                
                {/* Content */}
                <div>
                  <h5 style={{ 
                    margin: 0,
                    marginBottom: '8px',
                    color: '#ffffff',
                  }}>
                    {feature.title}
                  </h5>
                  
                  <p style={{ 
                    margin: 0,
                    fontSize: isMobile ? '14px' : 'clamp(0.875rem, 1.2vw, 0.95rem)',
                    lineHeight: 1.6,
                    color: 'rgba(255,255,255,0.5)',
                  }}>
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
