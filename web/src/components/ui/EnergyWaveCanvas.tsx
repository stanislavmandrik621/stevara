"use client";

import { useRef, useEffect } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  speed: number;
}

export function EnergyWaveCanvas({
  containerRef,
}: {
  containerRef: React.RefObject<HTMLElement | null>;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const dpr = window.devicePixelRatio || 1;
    let w = 0;
    let h = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    const particles: Particle[] = [];
    const PARTICLE_COUNT = 600;

    const spawnParticle = (scattered = false): Particle => {
      let x: number, y: number;
      if (scattered) {
        x = Math.random() * w;
        y = Math.random() * h;
      } else {
        const method = Math.random();
        if (method < 0.3) {
          x = Math.random() * w;
          y = Math.random() < 0.5 ? -10 : h + 10;
        } else if (method < 0.6) {
          x = Math.random() < 0.5 ? -10 : w + 10;
          y = Math.random() * h;
        } else {
          x = Math.random() * w;
          y = Math.random() * h;
        }
      }
      return {
        x, y, vx: 0, vy: 0,
        life: 0,
        maxLife: 200 + Math.random() * 400,
        speed: 0.3 + Math.random() * 0.8,
      };
    };

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = spawnParticle(true);
      p.life = Math.random() * p.maxLife;
      particles.push(p);
    }

    let time = 0;
    let animId: number;

    const getField = (
      px: number, py: number, t: number
    ): [number, number] => {
      let fx = 0;
      let fy = 0;

      const sources = [
        { x: w * 0.2, y: h * 0.3, strength: 1, sign: 1 },
        { x: w * 0.8, y: h * 0.7, strength: 1, sign: -1 },
        { x: w * 0.5, y: h * 0.5, strength: 1.5, sign: 1 },
        { x: w * 0.15, y: h * 0.8, strength: 0.7, sign: -1 },
        { x: w * 0.85, y: h * 0.2, strength: 0.7, sign: 1 },
      ];

      for (const src of sources) {
        const dx = px - src.x;
        const dy = py - src.y;
        const dist = Math.sqrt(dx * dx + dy * dy) + 40;
        const angle = Math.atan2(dy, dx);
        const m = 30000 * src.strength;
        const r3 = dist * dist * dist;
        const br = ((2 * m * Math.cos(angle)) / r3) * src.sign;
        const bt = ((m * Math.sin(angle)) / r3) * src.sign;
        fx += br * Math.cos(angle) - bt * Math.sin(angle);
        fy += br * Math.sin(angle) + bt * Math.cos(angle);
      }

      // Waves
      const cdx = px - w * 0.5;
      const cdy = py - h * 0.5;
      const cdist = Math.sqrt(cdx * cdx + cdy * cdy) + 1;
      const wave = Math.sin(cdist * 0.006 - t * 1.8) * 0.3;
      const wave2 = Math.cos(cdist * 0.009 - t * 1.2 + 1.5) * 0.15;
      fx += wave * (-cdy / cdist) + wave2 * (cdx / cdist) * 0.5;
      fy += wave * (cdx / cdist) + wave2 * (cdy / cdist) * 0.5;

      // Ambient
      fx += Math.sin(py * 0.003 + t * 0.4) * 0.12;
      fy += Math.cos(px * 0.003 + t * 0.3) * 0.12;

      // Mouse
      if (mouseRef.current.active) {
        const mdx = px - mouseRef.current.x;
        const mdy = py - mouseRef.current.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy) + 1;
        if (mdist < 350) {
          const falloff = 1 - mdist / 350;
          const mAngle = Math.atan2(mdy, mdx);
          const mStrength = falloff * falloff * 4;
          fx += Math.cos(mAngle + Math.PI * 0.5) * mStrength;
          fy += Math.sin(mAngle + Math.PI * 0.5) * mStrength;
          fx -= (mdx / mdist) * mStrength * 0.5;
          fy -= (mdy / mdist) * mStrength * 0.5;
        }
      }

      const mag = Math.sqrt(fx * fx + fy * fy);
      if (mag > 3) { fx = (fx / mag) * 3; fy = (fy / mag) * 3; }
      return [fx, fy];
    };

    const draw = () => {
      time += 0.016;
      ctx.clearRect(0, 0, w, h);

      // === 1. Field lines — brighter ===
      const lineCount = 32;
      for (let i = 0; i < lineCount; i++) {
        let startX: number, startY: number;
        if (i < lineCount / 4) {
          startX = 0;
          startY = (i / (lineCount / 4)) * h;
        } else if (i < lineCount / 2) {
          startX = ((i - lineCount / 4) / (lineCount / 4)) * w;
          startY = 0;
        } else if (i < (lineCount * 3) / 4) {
          startX = w;
          startY = ((i - lineCount / 2) / (lineCount / 4)) * h;
        } else {
          startX = ((i - (lineCount * 3) / 4) / (lineCount / 4)) * w;
          startY = h;
        }

        let px = startX;
        let py = startY;
        ctx.beginPath();
        ctx.moveTo(px, py);

        for (let s = 0; s < 300; s++) {
          const [fx, fy] = getField(px, py, time);
          px += fx * 2.5;
          py += fy * 2.5;
          if (px < -100 || px > w + 100 || py < -100 || py > h + 100) break;
          ctx.lineTo(px, py);
        }

        ctx.strokeStyle = "rgba(56, 189, 248, 0.06)";
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      // === 2. Particles — brighter, bigger ===
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.life++;

        if (p.life > p.maxLife || p.x < -80 || p.x > w + 80 || p.y < -80 || p.y > h + 80) {
          particles[i] = spawnParticle(false);
          continue;
        }

        const [fx, fy] = getField(p.x, p.y, time);
        p.vx = p.vx * 0.9 + fx * p.speed * 0.2;
        p.vy = p.vy * 0.9 + fy * p.speed * 0.2;
        p.x += p.vx;
        p.y += p.vy;

        const lifeFrac = p.life / p.maxLife;
        const fadeIn = Math.min(1, lifeFrac * 5);
        const fadeOut = lifeFrac > 0.7 ? Math.max(0, 1 - (lifeFrac - 0.7) / 0.3) : 1;
        const lifeAlpha = fadeIn * fadeOut;

        const vel = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        const velBright = Math.min(1, vel * 0.5);

        const alpha = lifeAlpha * (0.2 + velBright * 0.45);
        if (alpha < 0.01) continue;

        // Trail
        const trailLen = Math.min(vel * 6, 22);
        const nx = vel > 0.01 ? p.vx / vel : 0;
        const ny = vel > 0.01 ? p.vy / vel : 0;

        ctx.beginPath();
        ctx.moveTo(p.x - nx * trailLen, p.y - ny * trailLen);
        ctx.lineTo(p.x, p.y);
        ctx.strokeStyle = `rgba(80, 200, 255, ${alpha * 0.6})`;
        ctx.lineWidth = 1 + velBright;
        ctx.stroke();

        // Bright head dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1 + velBright * 1.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(160, 230, 255, ${alpha * 0.7})`;
        ctx.fill();
      }

      // === 3. Source glows — larger and brighter ===
      const glowSources = [
        { x: w * 0.2, y: h * 0.3, r: 200 + Math.sin(time * 0.7) * 20 },
        { x: w * 0.8, y: h * 0.7, r: 200 + Math.cos(time * 0.6) * 20 },
        { x: w * 0.5, y: h * 0.5, r: 300 + Math.sin(time * 0.4) * 40 },
        { x: w * 0.15, y: h * 0.8, r: 150 + Math.sin(time * 0.8) * 15 },
        { x: w * 0.85, y: h * 0.2, r: 150 + Math.cos(time * 0.9) * 15 },
      ];

      for (const gs of glowSources) {
        const g = ctx.createRadialGradient(gs.x, gs.y, 0, gs.x, gs.y, gs.r);
        g.addColorStop(0, "rgba(56, 189, 248, 0.05)");
        g.addColorStop(0.4, "rgba(56, 189, 248, 0.02)");
        g.addColorStop(1, "rgba(56, 189, 248, 0)");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
      }

      // Mouse glow
      if (mouseRef.current.active) {
        const mg = ctx.createRadialGradient(
          mouseRef.current.x, mouseRef.current.y, 0,
          mouseRef.current.x, mouseRef.current.y, 200
        );
        mg.addColorStop(0, "rgba(56, 189, 248, 0.15)");
        mg.addColorStop(0.3, "rgba(56, 189, 248, 0.06)");
        mg.addColorStop(1, "rgba(56, 189, 248, 0)");
        ctx.fillStyle = mg;
        ctx.fillRect(0, 0, w, h);
      }

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [containerRef]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 2,
        pointerEvents: "none",
      }}
    />
  );
}
