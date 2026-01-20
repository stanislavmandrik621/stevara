"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";

type ContactMethod = "phone" | "email" | "messenger" | "schedule" | null;

interface FormData {
  message: string;
  name: string;
  contactMethod: ContactMethod;
  phone: string;
  email: string;
  messenger: string;
  scheduleTime: string;
}

const messengerOptions = [
  { id: "telegram", label: "Telegram", href: "https://t.me/stevara_energy", color: "#0088cc" },
  { id: "viber", label: "Viber", href: "viber://chat?number=%2B380000000000", color: "#7360f2" },
  { id: "whatsapp", label: "WhatsApp", href: "https://wa.me/380000000000", color: "#25D366" },
];

const timeSlots = [
  "09:00 - 10:00",
  "10:00 - 11:00",
  "11:00 - 12:00",
  "14:00 - 15:00",
  "15:00 - 16:00",
  "16:00 - 17:00",
];

const contactMethods = [
  { 
    id: "phone" as const, 
    title: "Зателефонуйте мені", 
    description: "Протягом 2 годин",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    )
  },
  { 
    id: "email" as const, 
    title: "Напишіть на email", 
    description: "Детальна відповідь",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2"/>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
      </svg>
    )
  },
  { 
    id: "messenger" as const, 
    title: "Напишіть у месенджер", 
    description: "Telegram, Viber, WhatsApp",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    )
  },
  { 
    id: "schedule" as const, 
    title: "Запланувати дзвінок", 
    description: "Оберіть зручний час",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
        <line x1="16" x2="16" y1="2" y2="6"/>
        <line x1="8" x2="8" y1="2" y2="6"/>
        <line x1="3" x2="21" y1="10" y2="10"/>
      </svg>
    )
  },
];

export function CTASection() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    message: "",
    name: "",
    contactMethod: null,
    phone: "",
    email: "",
    messenger: "",
    scheduleTime: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const smoothOpacity = useSpring(opacity, { stiffness: 100, damping: 30 });

  // Auto-focus disabled to prevent scroll on page load
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     inputRef.current?.focus();
  //   }, 300);
  //   return () => clearTimeout(timer);
  // }, [step]);

  const canProceed = () => {
    switch (step) {
      case 1: return formData.message.trim() !== "";
      case 2: return formData.name.trim() !== "";
      case 3: return formData.contactMethod !== null;
      case 4:
        if (formData.contactMethod === "phone") return formData.phone.length >= 9;
        if (formData.contactMethod === "email") return formData.email.includes("@");
        if (formData.contactMethod === "messenger") return true;
        if (formData.contactMethod === "schedule") return formData.phone.length >= 9 && formData.scheduleTime !== "";
        return false;
      default: return true;
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey && canProceed()) {
      e.preventDefault();
      if (step < 4) setStep(step + 1);
      else if (step === 4) handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setStep(5);
  };

  const resetForm = () => {
    setFormData({
      message: "",
      name: "",
      contactMethod: null,
      phone: "",
      email: "",
      messenger: "",
      scheduleTime: "",
    });
    setStep(1);
  };

  const progressPercentage = Math.min((step / 4) * 100, 100);

  return (
    <section 
      ref={sectionRef}
      style={{ 
        position: 'relative',
        padding: 'clamp(12px, 3vw, 24px)',
        backgroundColor: 'var(--background)',
      }}
    >
      {/* Dark background card - same as TrustSection */}
      <motion.div 
        style={{
          opacity: smoothOpacity,
          maxWidth: '1366px',
          margin: '0 auto',
          backgroundColor: '#18181b',
          borderRadius: 'clamp(20px, 3vw, 32px)',
          padding: 'clamp(40px, 8vw, 80px) 0',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative gradient */}
        <div style={{
          position: 'absolute',
          top: '-20%',
          right: '-10%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'var(--brand-orange)',
          opacity: 0.06,
          filter: 'blur(100px)',
        }} />

        {/* Container */}
        <div style={{
          width: '100%',
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 clamp(16px, 4vw, 24px)',
          position: 'relative',
          zIndex: 1,
        }}>
          {/* Two column layout - responsive */}
          <div 
            className="grid-responsive-2"
            style={{
              gap: 'clamp(32px, 6vw, 80px)',
              alignItems: 'start',
            }}
          >
            {/* Left - Header */}
            <div>
              <span style={{
                display: 'inline-block',
                fontSize: '13px',
                fontWeight: 600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.5)',
                marginBottom: '24px',
              }}>
                Контакт
              </span>
              <h2 style={{ color: '#fff', marginBottom: '24px' }}>
                Почнімо з інженерної розмови
              </h2>
              <p style={{
                fontSize: 'clamp(1.0625rem, 1.5vw, 1.25rem)',
                lineHeight: 1.7,
                color: 'rgba(255,255,255,0.6)',
                margin: 0,
              }}>
                Розкажіть про ваш об'єкт — ми відповімо на питання і допоможемо зрозуміти, чи підходить вам рішення Tesla Energy.
              </p>
            </div>

            {/* Right - Form */}
            <div>
              {/* Progress Bar - hidden on step 5 */}
              {step < 5 && (
                <div style={{ marginBottom: '40px' }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    marginBottom: '12px',
                  }}>
                    <span style={{ 
                      fontSize: '13px', 
                      color: 'rgba(255,255,255,0.5)',
                      fontWeight: 500,
                    }}>
                      Крок {step} з 4
                    </span>
                    <span style={{ 
                      fontSize: '13px', 
                      color: 'rgba(255,255,255,0.5)',
                      fontWeight: 500,
                    }}>
                      {Math.round(progressPercentage)}%
                    </span>
                  </div>
                  <div style={{
                    height: '4px',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    borderRadius: '2px',
                    overflow: 'hidden',
                  }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercentage}%` }}
                      transition={{ duration: 0.3 }}
                      style={{
                        height: '100%',
                        backgroundColor: 'var(--brand-orange)',
                        borderRadius: '2px',
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Form Steps */}
              <AnimatePresence mode="wait">
                {/* Step 1: Message */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '16px',
                      marginBottom: '24px',
                    }}>
                      <div style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '16px',
                        backgroundColor: 'var(--brand-orange)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}>
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M7 15h10M7 11h10M7 7h10M3 21V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v16l-4-3H5a2 2 0 0 1-2-2z"/>
                        </svg>
                      </div>
                      <h4 style={{ color: '#fff', margin: 0 }}>Що вас цікавить?</h4>
                    </div>
                    
                    <textarea
                      ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      onKeyDown={handleKeyPress}
                      placeholder="Опишіть ваш запит або питання..."
                      rows={4}
                      style={{
                        width: '100%',
                        padding: '16px 20px',
                        fontSize: '16px',
                        backgroundColor: 'rgba(255,255,255,0.05)',
                        border: '2px solid rgba(255,255,255,0.15)',
                        borderRadius: '16px',
                        color: '#fff',
                        resize: 'none',
                        outline: 'none',
                        transition: 'border-color 0.2s',
                        fontFamily: 'inherit',
                      }}
                      onFocus={(e) => e.target.style.borderColor = 'var(--brand-orange)'}
                      onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.15)'}
                    />

                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
                      <button
                        onClick={() => canProceed() && setStep(2)}
                        disabled={!canProceed()}
                        style={{
                          padding: '14px 28px',
                          fontSize: '15px',
                          fontWeight: 600,
                          backgroundColor: canProceed() ? 'var(--brand-orange)' : 'rgba(255,255,255,0.1)',
                          color: canProceed() ? '#000' : 'rgba(255,255,255,0.3)',
                          border: 'none',
                          borderRadius: '100px',
                          cursor: canProceed() ? 'pointer' : 'not-allowed',
                          transition: 'all 0.2s',
                        }}
                      >
                        Далі
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Name */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '16px',
                      marginBottom: '24px',
                    }}>
                      <div style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '16px',
                        backgroundColor: 'var(--brand-orange)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}>
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                          <circle cx="12" cy="7" r="4"/>
                        </svg>
                      </div>
                      <h4 style={{ color: '#fff', margin: 0 }}>Як до вас звертатися?</h4>
                    </div>
                    
                    <input
                      ref={inputRef as React.RefObject<HTMLInputElement>}
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      onKeyDown={handleKeyPress}
                      placeholder="Ваше ім'я"
                      style={{
                        width: '100%',
                        padding: '16px 20px',
                        fontSize: '16px',
                        backgroundColor: 'rgba(255,255,255,0.05)',
                        border: '2px solid rgba(255,255,255,0.15)',
                        borderRadius: '16px',
                        color: '#fff',
                        outline: 'none',
                        transition: 'border-color 0.2s',
                      }}
                      onFocus={(e) => e.target.style.borderColor = 'var(--brand-orange)'}
                      onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.15)'}
                    />

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '24px' }}>
                      <button
                        onClick={() => setStep(1)}
                        style={{
                          padding: '14px 28px',
                          fontSize: '15px',
                          fontWeight: 600,
                          backgroundColor: 'transparent',
                          color: 'rgba(255,255,255,0.7)',
                          border: '2px solid rgba(255,255,255,0.15)',
                          borderRadius: '100px',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                        }}
                      >
                        Назад
                      </button>
                      <button
                        onClick={() => canProceed() && setStep(3)}
                        disabled={!canProceed()}
                        style={{
                          padding: '14px 28px',
                          fontSize: '15px',
                          fontWeight: 600,
                          backgroundColor: canProceed() ? 'var(--brand-orange)' : 'rgba(255,255,255,0.1)',
                          color: canProceed() ? '#000' : 'rgba(255,255,255,0.3)',
                          border: 'none',
                          borderRadius: '100px',
                          cursor: canProceed() ? 'pointer' : 'not-allowed',
                          transition: 'all 0.2s',
                        }}
                      >
                        Далі
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Contact Method */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '16px',
                      marginBottom: '24px',
                    }}>
                      <div style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '16px',
                        backgroundColor: 'var(--brand-orange)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}>
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="m8 12 2.7 2.7L16 9.3"/>
                          <circle cx="12" cy="12" r="10"/>
                        </svg>
                      </div>
                      <div>
                        <h4 style={{ color: '#fff', margin: 0 }}>Як вам зручніше?</h4>
                        <p style={{ color: 'rgba(255,255,255,0.5)', margin: '4px 0 0', fontSize: '14px' }}>
                          {formData.name}, оберіть спосіб зв'язку
                        </p>
                      </div>
                    </div>
                    
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                      gap: '12px',
                    }}>
                      {contactMethods.map((method) => (
                        <button
                          key={method.id}
                          onClick={() => {
                            setFormData({ ...formData, contactMethod: method.id });
                            setStep(4);
                          }}
                          style={{
                            padding: '24px 20px',
                            backgroundColor: 'rgba(255,255,255,0.03)',
                            border: '2px solid rgba(255,255,255,0.1)',
                            borderRadius: '16px',
                            cursor: 'pointer',
                            textAlign: 'left',
                            transition: 'all 0.2s',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = 'var(--brand-orange)';
                            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.03)';
                          }}
                        >
                          <div style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '12px',
                            backgroundColor: 'rgba(255,255,255,0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '16px',
                            color: '#fff',
                            transition: 'all 0.2s',
                          }}>
                            {method.icon}
                          </div>
                          <div style={{ color: '#fff', fontWeight: 600, marginBottom: '4px', fontSize: '16px' }}>
                            {method.title}
                          </div>
                          <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>
                            {method.description}
                          </div>
                        </button>
                      ))}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '24px' }}>
                      <button
                        onClick={() => setStep(2)}
                        style={{
                          padding: '14px 28px',
                          fontSize: '15px',
                          fontWeight: 600,
                          backgroundColor: 'transparent',
                          color: 'rgba(255,255,255,0.7)',
                          border: '2px solid rgba(255,255,255,0.15)',
                          borderRadius: '100px',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                        }}
                      >
                        Назад
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Contact Details */}
                {step === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Phone */}
                    {formData.contactMethod === "phone" && (
                      <>
                        <div style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '16px',
                          marginBottom: '24px',
                        }}>
                          <div style={{
                            width: '56px',
                            height: '56px',
                            borderRadius: '16px',
                            backgroundColor: 'var(--brand-orange)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            color: '#000',
                          }}>
                            {contactMethods[0].icon}
                          </div>
                          <h4 style={{ color: '#fff', margin: 0 }}>Ваш номер телефону</h4>
                        </div>
                        
                        <div style={{ display: 'flex', gap: '12px' }}>
                          <div style={{
                            padding: '16px 20px',
                            backgroundColor: 'rgba(255,255,255,0.05)',
                            border: '2px solid rgba(255,255,255,0.15)',
                            borderRadius: '16px',
                            color: '#fff',
                            fontWeight: 500,
                          }}>
                            +380
                          </div>
                          <input
                            ref={inputRef as React.RefObject<HTMLInputElement>}
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ 
                              ...formData, 
                              phone: e.target.value.replace(/\D/g, '').slice(0, 9) 
                            })}
                            onKeyDown={handleKeyPress}
                            placeholder="93 123 45 67"
                            style={{
                              flex: 1,
                              padding: '16px 20px',
                              fontSize: '16px',
                              backgroundColor: 'rgba(255,255,255,0.05)',
                              border: '2px solid rgba(255,255,255,0.15)',
                              borderRadius: '16px',
                              color: '#fff',
                              outline: 'none',
                              transition: 'border-color 0.2s',
                            }}
                            onFocus={(e) => e.target.style.borderColor = 'var(--brand-orange)'}
                            onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.15)'}
                          />
                        </div>
                      </>
                    )}

                    {/* Email */}
                    {formData.contactMethod === "email" && (
                      <>
                        <div style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '16px',
                          marginBottom: '24px',
                        }}>
                          <div style={{
                            width: '56px',
                            height: '56px',
                            borderRadius: '16px',
                            backgroundColor: 'var(--brand-orange)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            color: '#000',
                          }}>
                            {contactMethods[1].icon}
                          </div>
                          <h4 style={{ color: '#fff', margin: 0 }}>Ваш email</h4>
                        </div>
                        
                        <input
                          ref={inputRef as React.RefObject<HTMLInputElement>}
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          onKeyDown={handleKeyPress}
                          placeholder="example@email.com"
                          style={{
                            width: '100%',
                            padding: '16px 20px',
                            fontSize: '16px',
                            backgroundColor: 'rgba(255,255,255,0.05)',
                            border: '2px solid rgba(255,255,255,0.15)',
                            borderRadius: '16px',
                            color: '#fff',
                            outline: 'none',
                            transition: 'border-color 0.2s',
                          }}
                          onFocus={(e) => e.target.style.borderColor = 'var(--brand-orange)'}
                          onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.15)'}
                        />
                      </>
                    )}

                    {/* Messenger */}
                    {formData.contactMethod === "messenger" && (
                      <>
                        <div style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '16px',
                          marginBottom: '24px',
                        }}>
                          <div style={{
                            width: '56px',
                            height: '56px',
                            borderRadius: '16px',
                            backgroundColor: 'var(--brand-orange)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            color: '#000',
                          }}>
                            {contactMethods[2].icon}
                          </div>
                          <h4 style={{ color: '#fff', margin: 0 }}>Оберіть месенджер</h4>
                        </div>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '12px' }}>
                          {messengerOptions.map((messenger) => (
                            <a
                              key={messenger.id}
                              href={messenger.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => {
                                setFormData({ ...formData, messenger: messenger.id });
                                setTimeout(() => setStep(5), 500);
                              }}
                              style={{
                                padding: '16px 20px',
                                backgroundColor: messenger.color,
                                borderRadius: '16px',
                                color: '#fff',
                                fontWeight: 600,
                                textAlign: 'center',
                                textDecoration: 'none',
                                transition: 'transform 0.2s, opacity 0.2s',
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'scale(1.02)';
                                e.currentTarget.style.opacity = '0.9';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'scale(1)';
                                e.currentTarget.style.opacity = '1';
                              }}
                            >
                              {messenger.label}
                            </a>
                          ))}
                        </div>
                      </>
                    )}

                    {/* Schedule */}
                    {formData.contactMethod === "schedule" && (
                      <>
                        <div style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '16px',
                          marginBottom: '24px',
                        }}>
                          <div style={{
                            width: '56px',
                            height: '56px',
                            borderRadius: '16px',
                            backgroundColor: 'var(--brand-orange)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            color: '#000',
                          }}>
                            {contactMethods[3].icon}
                          </div>
                          <h4 style={{ color: '#fff', margin: 0 }}>Оберіть час та залиште номер</h4>
                        </div>
                        
                        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
                          <div style={{
                            padding: '16px 20px',
                            backgroundColor: 'rgba(255,255,255,0.05)',
                            border: '2px solid rgba(255,255,255,0.15)',
                            borderRadius: '16px',
                            color: '#fff',
                            fontWeight: 500,
                          }}>
                            +380
                          </div>
                          <input
                            ref={inputRef as React.RefObject<HTMLInputElement>}
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ 
                              ...formData, 
                              phone: e.target.value.replace(/\D/g, '').slice(0, 9) 
                            })}
                            placeholder="93 123 45 67"
                            style={{
                              flex: 1,
                              padding: '16px 20px',
                              fontSize: '16px',
                              backgroundColor: 'rgba(255,255,255,0.05)',
                              border: '2px solid rgba(255,255,255,0.15)',
                              borderRadius: '16px',
                              color: '#fff',
                              outline: 'none',
                              transition: 'border-color 0.2s',
                            }}
                            onFocus={(e) => e.target.style.borderColor = 'var(--brand-orange)'}
                            onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.15)'}
                          />
                        </div>

                        <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '12px', fontSize: '14px' }}>
                          Оберіть зручний час:
                        </p>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '8px' }}>
                          {timeSlots.map((slot) => (
                            <button
                              key={slot}
                              onClick={() => setFormData({ ...formData, scheduleTime: slot })}
                              style={{
                                padding: '14px',
                                backgroundColor: formData.scheduleTime === slot ? 'var(--brand-orange)' : 'rgba(255,255,255,0.05)',
                                border: '2px solid',
                                borderColor: formData.scheduleTime === slot ? 'var(--brand-orange)' : 'rgba(255,255,255,0.1)',
                                borderRadius: '12px',
                                color: formData.scheduleTime === slot ? '#000' : '#fff',
                                fontWeight: 500,
                                fontSize: '14px',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                              }}
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                      </>
                    )}

                    {formData.contactMethod !== "messenger" && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '24px' }}>
                        <button
                          onClick={() => setStep(3)}
                          style={{
                            padding: '14px 28px',
                            fontSize: '15px',
                            fontWeight: 600,
                            backgroundColor: 'transparent',
                            color: 'rgba(255,255,255,0.7)',
                            border: '2px solid rgba(255,255,255,0.15)',
                            borderRadius: '100px',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                          }}
                        >
                          Назад
                        </button>
                        <button
                          onClick={handleSubmit}
                          disabled={!canProceed() || isSubmitting}
                          style={{
                            padding: '14px 28px',
                            fontSize: '15px',
                            fontWeight: 600,
                            backgroundColor: canProceed() ? 'var(--brand-orange)' : 'rgba(255,255,255,0.1)',
                            color: canProceed() ? '#000' : 'rgba(255,255,255,0.3)',
                            border: 'none',
                            borderRadius: '100px',
                            cursor: canProceed() ? 'pointer' : 'not-allowed',
                            transition: 'all 0.2s',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                          }}
                        >
                          {isSubmitting ? (
                            <>
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                style={{ width: '18px', height: '18px', border: '2px solid #000', borderTopColor: 'transparent', borderRadius: '50%' }}
                              />
                              Надсилаємо...
                            </>
                          ) : (
                            'Надіслати'
                          )}
                        </button>
                      </div>
                    )}

                    {formData.contactMethod === "messenger" && (
                      <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '24px' }}>
                        <button
                          onClick={() => setStep(3)}
                          style={{
                            padding: '14px 28px',
                            fontSize: '15px',
                            fontWeight: 600,
                            backgroundColor: 'transparent',
                            color: 'rgba(255,255,255,0.7)',
                            border: '2px solid rgba(255,255,255,0.15)',
                            borderRadius: '100px',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                          }}
                        >
                          Назад
                        </button>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Step 5: Success */}
                {step === 5 && (
                  <motion.div
                    key="step5"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    style={{ textAlign: 'center' }}
                  >
                    <div style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '50%',
                      backgroundColor: '#22c55e',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 24px',
                    }}>
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </div>

                    <h3 style={{ color: '#fff', marginBottom: '16px' }}>
                      Дякуємо, {formData.name}!
                    </h3>
                    <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '32px', fontSize: '17px', lineHeight: 1.6 }}>
                      Ми отримали ваш запит і зв'яжемося з вами найближчим часом.
                    </p>

                    <div style={{
                      padding: '20px 24px',
                      backgroundColor: 'rgba(255,255,255,0.05)',
                      borderRadius: '16px',
                      marginBottom: '32px',
                      textAlign: 'left',
                    }}>
                      <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', marginBottom: '8px' }}>
                        Ваше повідомлення:
                      </p>
                      <p style={{ color: '#fff', margin: 0 }}>
                        {formData.message.length > 100 ? formData.message.slice(0, 100) + '...' : formData.message}
                      </p>
                    </div>

                    <button
                      onClick={resetForm}
                      style={{
                        padding: '14px 28px',
                        fontSize: '15px',
                        fontWeight: 600,
                        backgroundColor: 'transparent',
                        color: 'rgba(255,255,255,0.7)',
                        border: '2px solid rgba(255,255,255,0.15)',
                        borderRadius: '100px',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                    >
                      Надіслати ще один запит
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Privacy Notice */}
              {step < 5 && (
                <p style={{ 
                  marginTop: '32px', 
                  fontSize: '13px', 
                  color: 'rgba(255,255,255,0.4)',
                }}>
                  Надсилаючи форму, ви погоджуєтесь з політикою конфіденційності
                </p>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
