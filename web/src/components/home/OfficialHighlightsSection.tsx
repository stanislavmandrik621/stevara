"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  ShieldCheck,
  BatteryCharging,
  CloudSun,
  Smartphone,
  LayoutGrid,
  PlugZap,
} from "lucide-react";

const highlights = [
  {
    icon: ShieldCheck,
    label: "Офіційні поставки",
    title: "Сертифіковане обладнання",
    description: "Оригінальні системи Tesla Energy з підтвердженням походження.",
  },
  {
    icon: BatteryCharging,
    label: "Backup Protection",
    title: "Резерв для обʼєкта",
    description: "Автоматичне живлення під час відключень мережі.",
  },
  {
    icon: CloudSun,
    label: "Storm Watch",
    title: "Підготовка до негоди",
    description: "Система заряджається перед штормами та ризиками.",
  },
  {
    icon: Smartphone,
    label: "Tesla App",
    title: "Контроль у додатку",
    description: "Моніторинг енергії та батареї в реальному часі.",
  },
  {
    icon: LayoutGrid,
    label: "Модульність",
    title: "Масштабування рішень",
    description: "Єдині стандарти від приватних обʼєктів до інфраструктури.",
  },
  {
    icon: PlugZap,
    label: "All-in-One",
    title: "Інтегрований інвертор",
    description: "Менше зовнішнього обладнання, швидший монтаж.",
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
 
 export function OfficialHighlightsSection() {
   return (
     <section
       className="section-padding"
       style={{
         position: "relative",
         backgroundColor: "#000000",
       }}
     >
       {/* Container - 1280px aligned with header */}
        <div
          style={{
            width: "100%",
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 clamp(24px, 4vw, 48px)",
          }}
        >
         {/* Header */}
         <div style={{ marginBottom: "clamp(32px, 6vw, 64px)" }}>
           <FadeIn>
              <span
                style={{
                  display: "inline-block",
                  fontSize: "12px",
                  fontWeight: 600,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.6)",
                  marginBottom: "16px",
                }}
              >
                Офіційний партнер
              </span>
           </FadeIn>
           <FadeIn delay={0.1}>
            <h2 style={{ color: "#ffffff", marginBottom: "16px" }}>
              Tesla Energy в Україні
            </h2>
           </FadeIn>
           <FadeIn delay={0.2}>
            <p
              style={{
                maxWidth: "680px",
                fontSize: "clamp(1rem, 1.6vw, 1.125rem)",
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.65)",
              }}
            >
              STEVARA імпортує та інтегрує Powerwall і Megapack, забезпечуючи
              запуск і сервіс за стандартами Tesla Energy.
            </p>
           </FadeIn>
         </div>
 
         {/* Feature grid */}
         <div className="grid-responsive-3">
           {highlights.map((item, index) => (
             <FadeIn key={item.title} delay={0.2 + index * 0.05}>
               <div
                 style={{
                   height: "100%",
                   padding: "clamp(16px, 3vw, 24px) 0",
                   display: "flex",
                   flexDirection: "column",
                   gap: "14px",
                 }}
               >
                 <div
                   style={{
                     color: "rgba(255,255,255,0.7)",
                   }}
                 >
                   <item.icon style={{ width: "24px", height: "24px" }} />
                 </div>
                 <span
                   style={{
                     fontSize: "11px",
                     fontWeight: 600,
                     letterSpacing: "0.12em",
                     textTransform: "uppercase",
                     color: "rgba(255,255,255,0.55)",
                   }}
                 >
                   {item.label}
                 </span>
                 <h4 style={{ margin: 0, color: "#ffffff" }}>{item.title}</h4>
                 <p
                   style={{
                     margin: 0,
                     fontSize: "clamp(0.9rem, 1.3vw, 1rem)",
                     lineHeight: 1.6,
                     color: "rgba(255,255,255,0.65)",
                   }}
                 >
                   {item.description}
                 </p>
               </div>
             </FadeIn>
           ))}
         </div>
       </div>
     </section>
   );
 }
