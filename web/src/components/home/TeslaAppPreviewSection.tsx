"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { 
  TrendingUp,
  Bell,
  Settings,
} from "lucide-react";

// App screenshots
const appScreens = [
  "/images/app-screen-1.jpg",
  "/images/app-screen-2.jpg",
  "/images/app-screen-3.jpg",
  "/images/app-screen-4.jpg",
  "/images/app-screen-5.jpg",
];

const features = [
  {
    icon: TrendingUp,
    title: "Моніторинг енергії",
    description: "Споживання, генерація та стан батареї в реальному часі",
  },
  {
    icon: Settings,
    title: "Режими роботи",
    description: "Пріоритети живлення та рівень резерву визначаєте ви",
  },
  {
    icon: Bell,
    title: "Сповіщення",
    description: "Дізнавайтесь про відключення та статус системи миттєво",
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

export function TeslaAppPreviewSection() {
  const [isMobile, setIsMobile] = useState(false);
  const [currentScreen, setCurrentScreen] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Auto-cycle through screens
  useEffect(() => {
    if (!isInView) return;
    
    const interval = setInterval(() => {
      setCurrentScreen((prev) => (prev + 1) % appScreens.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <section
      ref={ref}
      className="section-padding"
      style={{
        position: "relative",
        backgroundColor: "var(--background)",
        borderTop: "1px solid var(--divider)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 clamp(24px, 4vw, 48px)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: isMobile ? "48px" : "clamp(60px, 10vw, 100px)",
            alignItems: "center",
          }}
        >
          {/* Left - Content */}
          <div>
            <FadeIn>
              <span className="text-label" style={{ marginBottom: "20px" }}>
                Tesla App
              </span>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h2 style={{ marginBottom: "24px" }}>
                Контроль у вашому смартфоні
              </h2>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p
                className="text-lead"
                style={{
                  margin: 0,
                  marginBottom: "clamp(32px, 5vw, 48px)",
                }}
              >
                Вся енергія дому в одному інтерфейсі з єдиною логікою керування.
                Де б ви не були.
              </p>
            </FadeIn>

            {/* Features list */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "24px" }}
            >
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <FadeIn key={feature.title} delay={0.3 + index * 0.1}>
                    <div
                      style={{
                        display: "flex",
                        gap: "16px",
                        alignItems: "flex-start",
                      }}
                    >
                      <div
                        style={{
                          flexShrink: 0,
                          color: "var(--foreground-muted)",
                        }}
                      >
                        <Icon style={{ width: "24px", height: "24px" }} />
                      </div>
                      <div>
                        <h5 style={{ margin: 0, marginBottom: "4px" }}>
                          {feature.title}
                        </h5>
                        <p
                          style={{
                            margin: 0,
                            fontSize: "clamp(0.9rem, 1.3vw, 1rem)",
                            lineHeight: 1.6,
                            color: "var(--foreground-muted)",
                          }}
                        >
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </div>

          {/* Right - Phone mockup with cycling screenshots */}
          <FadeIn delay={0.3}>
            <div
              style={{
                display: "flex",
                justifyContent: isMobile ? "center" : "flex-end",
              }}
            >
              {/* Phone frame */}
              <div
                style={{
                  position: "relative",
                  width: isMobile ? "220px" : "260px",
                  backgroundColor: "#1d1d1f",
                  borderRadius: "36px",
                  padding: "8px",
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                }}
              >
                {/* Phone screen with cycling images */}
                <div
                  style={{
                    position: "relative",
                    backgroundColor: "#000",
                    borderRadius: "28px",
                    overflow: "hidden",
                    aspectRatio: "198 / 400",
                  }}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentScreen}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      style={{
                        position: "absolute",
                        inset: 0,
                      }}
                    >
                      <Image
                        src={appScreens[currentScreen]}
                        alt={`Tesla App Screen ${currentScreen + 1}`}
                        fill
                        sizes="260px"
                        style={{
                          objectFit: "cover",
                        }}
                        priority={currentScreen === 0}
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Screen indicator dots */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "6px",
                    marginTop: "12px",
                    paddingBottom: "4px",
                  }}
                >
                  {appScreens.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentScreen(index)}
                      style={{
                        width: index === currentScreen ? "16px" : "6px",
                        height: "6px",
                        borderRadius: "3px",
                        backgroundColor: index === currentScreen 
                          ? "#30d158" 
                          : "rgba(255,255,255,0.3)",
                        border: "none",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                      }}
                      aria-label={`View screen ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
