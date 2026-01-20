"use client";

import { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import { PowerwallModel } from "./PowerwallModel";
import { MegapackModel } from "./MegapackModel";
import * as THREE from "three";
import { useTheme } from "next-themes";

// Animated model wrapper with entrance animation
function AnimatedModel({ 
  children, 
  delay = 0, 
  targetPosition,
  startOffset = [0, -3, 0]
}: { 
  children: React.ReactNode; 
  delay: number;
  targetPosition: [number, number, number];
  startOffset?: [number, number, number];
}) {
  const groupRef = useRef<THREE.Group>(null);
  const [isVisible, setIsVisible] = useState(false);
  const progressRef = useRef(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    if (isVisible && progressRef.current < 1) {
      // Smooth easing animation
      progressRef.current = Math.min(1, progressRef.current + delta * 0.8);
      const eased = 1 - Math.pow(1 - progressRef.current, 3); // Ease out cubic
      
      // Animate from start position to target
      groupRef.current.position.x = THREE.MathUtils.lerp(
        targetPosition[0] + startOffset[0], 
        targetPosition[0], 
        eased
      );
      groupRef.current.position.y = THREE.MathUtils.lerp(
        targetPosition[1] + startOffset[1], 
        targetPosition[1], 
        eased
      );
      groupRef.current.position.z = THREE.MathUtils.lerp(
        targetPosition[2] + startOffset[2], 
        targetPosition[2], 
        eased
      );
      
      // Scale up animation
      const scale = eased;
      groupRef.current.scale.setScalar(scale);
      
      // Slight rotation during entrance
      groupRef.current.rotation.y = (1 - eased) * 0.3;
    }
  });

  return (
    <group ref={groupRef} scale={0} position={[
      targetPosition[0] + startOffset[0],
      targetPosition[1] + startOffset[1],
      targetPosition[2] + startOffset[2]
    ]}>
      {children}
    </group>
  );
}

function ProductsGroup() {
  return (
    <group>
      {/* Megapack - big in background, appears first */}
      <AnimatedModel 
        delay={800} 
        targetPosition={[3, -1.2, -3]}
        startOffset={[2, -2, -3]}
      >
        <MegapackModel 
          scale={2.6} 
          autoRotate={false} 
          position={[0, 0, 0]}
        />
      </AnimatedModel>

      {/* Powerwall - small in front, appears second */}
      <AnimatedModel 
        delay={1200} 
        targetPosition={[1.5, -2.0, 1.5]}
        startOffset={[1, -2, 0]}
      >
        <PowerwallModel scale={0.55} autoRotate={false} variant="light" />
      </AnimatedModel>
    </group>
  );
}

function SceneLighting({ isDark }: { isDark: boolean }) {
  if (isDark) {
    return (
      <>
        {/* Dark mode - futuristic cool lighting */}
        <ambientLight intensity={0.4} color="#e0f0ff" />
        <directionalLight 
          position={[10, 15, 10]} 
          intensity={1.5} 
          color="#ffffff"
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <directionalLight position={[-8, 6, 5]} intensity={0.6} color="#a0c0ff" />
        <pointLight position={[0, -3, 5]} intensity={0.8} color="#00d4ff" distance={15} />
        <pointLight position={[0, 8, -6]} intensity={0.4} color="#a855f7" distance={20} />
        <pointLight position={[-6, 3, 3]} intensity={0.4} color="#00ffcc" distance={12} />
        <pointLight position={[6, 3, 3]} intensity={0.3} color="#ffffff" distance={12} />
        <hemisphereLight intensity={0.3} color="#ffffff" groundColor="#0066ff" />
      </>
    );
  }
  
  return (
    <>
      {/* Light mode - softer studio lighting */}
      <ambientLight intensity={0.35} color="#fffaf0" />
      <directionalLight 
        position={[10, 15, 10]} 
        intensity={1} 
        color="#ffffff"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <directionalLight position={[-8, 8, 5]} intensity={0.4} color="#fff5e6" />
      <directionalLight position={[0, -5, 8]} intensity={0.2} color="#ffeedd" />
      <pointLight position={[8, 4, 6]} intensity={0.3} color="#ffffff" distance={20} />
      <pointLight position={[-8, 4, 6]} intensity={0.25} color="#ffcc80" distance={20} />
      <hemisphereLight intensity={0.2} color="#ffffff" groundColor="#ffaa66" />
    </>
  );
}

export function HeroScene({ isMobile = false }: { isMobile?: boolean }) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <Canvas
        camera={{ 
          position: isMobile ? [2, 0.5, 8] : [0, 1.5, 12], 
          fov: isMobile ? 45 : 40, 
          near: 0.1, 
          far: 100 
        }}
        dpr={[2, 3]}
        shadows
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          preserveDrawingBuffer: true,
        }}
      >
        <Suspense fallback={null}>
          <SceneLighting isDark={isDark} />

          {/* Products group - same layout, camera adjusted for mobile */}
          <ProductsGroup />
          
        </Suspense>
      </Canvas>
    </div>
  );
}
