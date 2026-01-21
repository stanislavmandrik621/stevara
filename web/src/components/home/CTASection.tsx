"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Phone, Mail, MessageSquare, Calendar, Check } from "lucide-react";

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
  { id: "telegram", label: "Telegram", href: "https://t.me/stevara_energy" },
  { id: "viber", label: "Viber", href: "viber://chat?number=%2B380000000000" },
  { id: "whatsapp", label: "WhatsApp", href: "https://wa.me/380000000000" },
];

const timeSlots = [
  "09:00", "10:00", "11:00", "14:00", "15:00", "16:00",
];

const contactMethods = [
  { id: "phone" as const, title: "Дзвінок", icon: Phone },
  { id: "email" as const, title: "Email", icon: Mail },
  { id: "messenger" as const, title: "Месенджер", icon: MessageSquare },
  { id: "schedule" as const, title: "Запланувати", icon: Calendar },
];

export function CTASection() {
  const [step, setStep] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
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

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

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

  return (
    <section 
      className="section-padding"
      style={{ 
        position: 'relative',
        backgroundColor: '#000000',
      }}
    >
      <div style={{
        width: '100%',
        maxWidth: '1280px',
        margin: '0 auto',
        padding: isMobile ? '0 24px' : '0 48px',
      }}>
        {/* Header - always on top for mobile */}
        {isMobile && step < 5 && (
          <div style={{ marginBottom: '32px' }}>
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
              Контакт
            </span>
            
            <h2 style={{ color: '#ffffff', marginBottom: '0' }}>
              Почнімо розмову
            </h2>
          </div>
        )}

        {/* Two column layout - or single column when success */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: step === 5 ? '1fr' : (isMobile ? '1fr' : '1fr 1.2fr'),
            gap: isMobile ? '0' : 'clamp(60px, 10vw, 120px)',
            alignItems: 'start',
          }}
        >
          {/* Left - Header (sticky on desktop only) - hidden on success */}
          {!isMobile && step < 5 && (
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
                Контакт
              </span>
              
              <h2 style={{ color: '#ffffff', marginBottom: '24px' }}>
                Почнімо розмову
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
                Розкажіть про ваш об'єкт — ми допоможемо зрозуміти, чи підходить вам рішення Tesla Energy.
              </p>
            </div>
          )}

          {/* Right - Form (centered when success) */}
          <div style={{ 
            maxWidth: step === 5 ? '500px' : 'none',
            margin: step === 5 ? '0 auto' : '0',
          }}>
              {/* Progress indicator */}
              {step < 5 && (
                <div style={{ 
                  display: 'flex', 
                  gap: '8px',
                  marginBottom: '48px',
                }}>
                  {[1, 2, 3, 4].map((s) => (
                    <div
                      key={s}
                      style={{
                        flex: 1,
                        height: '2px',
                        backgroundColor: s <= step ? '#ffffff' : 'rgba(255,255,255,0.15)',
                        borderRadius: '1px',
                        transition: 'background-color 0.3s ease',
                      }}
                    />
                  ))}
                </div>
              )}

              {/* Form Steps */}
              <AnimatePresence mode="wait">
                {/* Step 1: Message */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h4 style={{ color: '#fff', margin: 0, marginBottom: '24px' }}>
                      Що вас цікавить?
                    </h4>
                    
                    <textarea
                      ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      onKeyDown={handleKeyPress}
                      placeholder="Опишіть ваш запит..."
                      rows={4}
                      style={{
                        width: '100%',
                        padding: '20px',
                        fontSize: '16px',
                        backgroundColor: 'transparent',
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '4px',
                        color: '#fff',
                        resize: 'none',
                        outline: 'none',
                        transition: 'border-color 0.2s',
                        fontFamily: 'inherit',
                      }}
                      onFocus={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.5)'}
                      onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.2)'}
                    />

                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '32px' }}>
                      <button
                        onClick={() => canProceed() && setStep(2)}
                        disabled={!canProceed()}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '16px 32px',
                          fontSize: '14px',
                          fontWeight: 600,
                          backgroundColor: canProceed() ? '#ffffff' : 'rgba(255,255,255,0.1)',
                          color: canProceed() ? '#000000' : 'rgba(255,255,255,0.3)',
                          border: 'none',
                          borderRadius: '100px',
                          cursor: canProceed() ? 'pointer' : 'not-allowed',
                          transition: 'all 0.2s',
                        }}
                      >
                        Далі
                        <ArrowRight style={{ width: '16px', height: '16px' }} />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Name */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h4 style={{ color: '#fff', margin: 0, marginBottom: '24px' }}>
                      Як до вас звертатися?
                    </h4>
                    
                    <input
                      ref={inputRef as React.RefObject<HTMLInputElement>}
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      onKeyDown={handleKeyPress}
                      placeholder="Ваше ім'я"
                      style={{
                        width: '100%',
                        padding: '20px',
                        fontSize: '16px',
                        backgroundColor: 'transparent',
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '4px',
                        color: '#fff',
                        outline: 'none',
                        transition: 'border-color 0.2s',
                      }}
                      onFocus={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.5)'}
                      onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.2)'}
                    />

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '32px' }}>
                      <button
                        onClick={() => setStep(1)}
                        style={{
                          padding: '16px 0',
                          fontSize: '14px',
                          fontWeight: 500,
                          backgroundColor: 'transparent',
                          color: 'rgba(255,255,255,0.6)',
                          border: 'none',
                          cursor: 'pointer',
                        }}
                      >
                        ← Назад
                      </button>
                      <button
                        onClick={() => canProceed() && setStep(3)}
                        disabled={!canProceed()}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '16px 32px',
                          fontSize: '14px',
                          fontWeight: 600,
                          backgroundColor: canProceed() ? '#ffffff' : 'rgba(255,255,255,0.1)',
                          color: canProceed() ? '#000000' : 'rgba(255,255,255,0.3)',
                          border: 'none',
                          borderRadius: '100px',
                          cursor: canProceed() ? 'pointer' : 'not-allowed',
                          transition: 'all 0.2s',
                        }}
                      >
                        Далі
                        <ArrowRight style={{ width: '16px', height: '16px' }} />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Contact Method */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h4 style={{ color: '#fff', margin: 0, marginBottom: '8px' }}>
                      Як вам зручніше, {formData.name}?
                    </h4>
                    <p style={{ color: 'rgba(255,255,255,0.5)', margin: 0, marginBottom: '32px', fontSize: '15px' }}>
                      Оберіть спосіб зв'язку
                    </p>
                    
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(2, 1fr)',
                      gap: '12px',
                    }}>
                      {contactMethods.map((method) => {
                        const Icon = method.icon;
                        return (
                          <button
                            key={method.id}
                            onClick={() => {
                              setFormData({ ...formData, contactMethod: method.id });
                              setStep(4);
                            }}
                            style={{
                              padding: '24px',
                              backgroundColor: 'transparent',
                              border: '1px solid rgba(255,255,255,0.15)',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              textAlign: 'left',
                              transition: 'all 0.2s',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '16px',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)';
                              e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.03)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                              e.currentTarget.style.backgroundColor = 'transparent';
                            }}
                          >
                            <Icon style={{ width: '24px', height: '24px', color: 'rgba(255,255,255,0.6)' }} />
                            <span style={{ color: '#fff', fontWeight: 500, fontSize: '15px' }}>
                              {method.title}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    <div style={{ marginTop: '32px' }}>
                      <button
                        onClick={() => setStep(2)}
                        style={{
                          padding: '16px 0',
                          fontSize: '14px',
                          fontWeight: 500,
                          backgroundColor: 'transparent',
                          color: 'rgba(255,255,255,0.6)',
                          border: 'none',
                          cursor: 'pointer',
                        }}
                      >
                        ← Назад
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Contact Details */}
                {step === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Phone */}
                    {formData.contactMethod === "phone" && (
                      <>
                        <h4 style={{ color: '#fff', margin: 0, marginBottom: '24px' }}>
                          Ваш номер телефону
                        </h4>
                        
                        <div style={{ display: 'flex', gap: '12px' }}>
                          <span style={{
                            padding: '20px',
                            backgroundColor: 'rgba(255,255,255,0.05)',
                            border: '1px solid rgba(255,255,255,0.15)',
                            borderRadius: '4px',
                            color: 'rgba(255,255,255,0.6)',
                            fontWeight: 500,
                          }}>
                            +380
                          </span>
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
                              padding: '20px',
                              fontSize: '16px',
                              backgroundColor: 'transparent',
                              border: '1px solid rgba(255,255,255,0.2)',
                              borderRadius: '4px',
                              color: '#fff',
                              outline: 'none',
                            }}
                          />
                        </div>
                      </>
                    )}

                    {/* Email */}
                    {formData.contactMethod === "email" && (
                      <>
                        <h4 style={{ color: '#fff', margin: 0, marginBottom: '24px' }}>
                          Ваш email
                        </h4>
                        
                        <input
                          ref={inputRef as React.RefObject<HTMLInputElement>}
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          onKeyDown={handleKeyPress}
                          placeholder="example@email.com"
                          style={{
                            width: '100%',
                            padding: '20px',
                            fontSize: '16px',
                            backgroundColor: 'transparent',
                            border: '1px solid rgba(255,255,255,0.2)',
                            borderRadius: '4px',
                            color: '#fff',
                            outline: 'none',
                          }}
                        />
                      </>
                    )}

                    {/* Messenger */}
                    {formData.contactMethod === "messenger" && (
                      <>
                        <h4 style={{ color: '#fff', margin: 0, marginBottom: '24px' }}>
                          Оберіть месенджер
                        </h4>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
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
                                padding: '20px 24px',
                                backgroundColor: 'transparent',
                                border: '1px solid rgba(255,255,255,0.15)',
                                borderRadius: '4px',
                                color: '#fff',
                                fontWeight: 500,
                                textDecoration: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                transition: 'all 0.2s',
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)';
                                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.03)';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                                e.currentTarget.style.backgroundColor = 'transparent';
                              }}
                            >
                              {messenger.label}
                              <ArrowRight style={{ width: '16px', height: '16px', opacity: 0.5 }} />
                            </a>
                          ))}
                        </div>
                      </>
                    )}

                    {/* Schedule */}
                    {formData.contactMethod === "schedule" && (
                      <>
                        <h4 style={{ color: '#fff', margin: 0, marginBottom: '24px' }}>
                          Оберіть зручний час
                        </h4>
                        
                        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
                          <span style={{
                            padding: '20px',
                            backgroundColor: 'rgba(255,255,255,0.05)',
                            border: '1px solid rgba(255,255,255,0.15)',
                            borderRadius: '4px',
                            color: 'rgba(255,255,255,0.6)',
                            fontWeight: 500,
                          }}>
                            +380
                          </span>
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
                              padding: '20px',
                              fontSize: '16px',
                              backgroundColor: 'transparent',
                              border: '1px solid rgba(255,255,255,0.2)',
                              borderRadius: '4px',
                              color: '#fff',
                              outline: 'none',
                            }}
                          />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                          {timeSlots.map((slot) => (
                            <button
                              key={slot}
                              onClick={() => setFormData({ ...formData, scheduleTime: slot })}
                              style={{
                                padding: '16px',
                                backgroundColor: formData.scheduleTime === slot ? '#ffffff' : 'transparent',
                                border: '1px solid',
                                borderColor: formData.scheduleTime === slot ? '#ffffff' : 'rgba(255,255,255,0.15)',
                                borderRadius: '4px',
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
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '32px' }}>
                        <button
                          onClick={() => setStep(3)}
                          style={{
                            padding: '16px 0',
                            fontSize: '14px',
                            fontWeight: 500,
                            backgroundColor: 'transparent',
                            color: 'rgba(255,255,255,0.6)',
                            border: 'none',
                            cursor: 'pointer',
                          }}
                        >
                          ← Назад
                        </button>
                        <button
                          onClick={handleSubmit}
                          disabled={!canProceed() || isSubmitting}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '16px 32px',
                            fontSize: '14px',
                            fontWeight: 600,
                            backgroundColor: canProceed() ? '#ffffff' : 'rgba(255,255,255,0.1)',
                            color: canProceed() ? '#000000' : 'rgba(255,255,255,0.3)',
                            border: 'none',
                            borderRadius: '100px',
                            cursor: canProceed() ? 'pointer' : 'not-allowed',
                            transition: 'all 0.2s',
                          }}
                        >
                          {isSubmitting ? 'Надсилаємо...' : 'Надіслати'}
                          {!isSubmitting && <ArrowRight style={{ width: '16px', height: '16px' }} />}
                        </button>
                      </div>
                    )}

                    {formData.contactMethod === "messenger" && (
                      <div style={{ marginTop: '32px' }}>
                        <button
                          onClick={() => setStep(3)}
                          style={{
                            padding: '16px 0',
                            fontSize: '14px',
                            fontWeight: 500,
                            backgroundColor: 'transparent',
                            color: 'rgba(255,255,255,0.6)',
                            border: 'none',
                            cursor: 'pointer',
                          }}
                        >
                          ← Назад
                        </button>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Step 5: Success */}
                {step === 5 && (
                  <motion.div
                    key="step5"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    style={{ textAlign: 'center', padding: '40px 0' }}
                  >
                    <div style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '50%',
                      border: '2px solid #ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 32px',
                    }}>
                      <Check style={{ width: '28px', height: '28px', color: '#ffffff' }} />
                    </div>

                    <h3 style={{ color: '#fff', marginBottom: '16px' }}>
                      Дякуємо, {formData.name}!
                    </h3>
                    <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '40px', fontSize: '16px', lineHeight: 1.6 }}>
                      Ми отримали ваш запит і зв'яжемося з вами найближчим часом.
                    </p>

                    <button
                      onClick={resetForm}
                      style={{
                        padding: '16px 32px',
                        fontSize: '14px',
                        fontWeight: 500,
                        backgroundColor: 'transparent',
                        color: 'rgba(255,255,255,0.7)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '100px',
                        cursor: 'pointer',
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
                  marginTop: '40px', 
                  fontSize: '12px', 
                  color: 'rgba(255,255,255,0.35)',
                }}>
                  Надсилаючи форму, ви погоджуєтесь з політикою конфіденційності
                </p>
              )}
            </div>
        </div>
      </div>
    </section>
  );
}
