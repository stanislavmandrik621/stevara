"use client";

import { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
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
      progressRef.current = Math.min(1, progressRef.current + delta * 0.8);
      const eased = 1 - Math.pow(1 - progressRef.current, 3);
      
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
      
      const scale = eased;
      groupRef.current.scale.setScalar(scale);
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

// Centered products group for premium look
function ProductsGroup({ isMobile }: { isMobile: boolean }) {
  if (isMobile) {
    return (
      <group>
        {/* Mobile - simplified centered layout */}
        <AnimatedModel 
          delay={600} 
          targetPosition={[1.5, -1, -2]}
          startOffset={[1, -2, 0]}
        >
          <MegapackModel 
            scale={2} 
            autoRotate={false} 
            position={[0, 0, 0]}
          />
        </AnimatedModel>

        <AnimatedModel 
          delay={900} 
          targetPosition={[-1, -1.5, 1]}
          startOffset={[-1, -2, 0]}
        >
          <PowerwallModel scale={0.5} autoRotate={false} variant="light" />
        </AnimatedModel>
      </group>
    );
  }

  return (
    <group>
      {/* Desktop - premium centered composition */}
      <AnimatedModel 
        delay={600} 
        targetPosition={[2.5, -1.2, -2]}
        startOffset={[2, -2, -2]}
      >
        <MegapackModel 
          scale={2.8} 
          autoRotate={false} 
          position={[0, 0, 0]}
        />
      </AnimatedModel>

      <AnimatedModel 
        delay={900} 
        targetPosition={[-1.5, -2, 1.5]}
        startOffset={[-1, -2, 0]}
      >
        <PowerwallModel scale={0.6} autoRotate={false} variant="light" />
      </AnimatedModel>
    </group>
  );
}

function SceneLighting({ isDark }: { isDark: boolean }) {
  if (isDark) {
    return (
      <>
        {/* Dark mode - clean, minimal lighting */}
        <ambientLight intensity={0.5} color="#ffffff" />
        <directionalLight 
          position={[10, 15, 10]} 
          intensity={1.2} 
          color="#ffffff"
          castShadow
          shadow-mapSize={[2048, 2048]}
        />
        <directionalLight position={[-8, 6, 5]} intensity={0.5} color="#e0e0e0" />
        <pointLight position={[0, -3, 5]} intensity={0.6} color="#ffffff" distance={15} />
        <hemisphereLight intensity={0.3} color="#ffffff" groundColor="#333333" />
      </>
    );
  }
  
  return (
    <>
      {/* Light mode - clean studio lighting */}
      <ambientLight intensity={0.6} color="#ffffff" />
      <directionalLight 
        position={[10, 15, 10]} 
        intensity={1} 
        color="#ffffff"
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <directionalLight position={[-8, 8, 5]} intensity={0.4} color="#f5f5f7" />
      <directionalLight position={[0, -5, 8]} intensity={0.2} color="#ffffff" />
      <pointLight position={[8, 4, 6]} intensity={0.3} color="#ffffff" distance={20} />
      <pointLight position={[-8, 4, 6]} intensity={0.25} color="#f0f0f0" distance={20} />
      <hemisphereLight intensity={0.25} color="#ffffff" groundColor="#e0e0e0" />
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
          position: isMobile ? [0, 0, 8] : [0, 0.5, 10], 
          fov: 40, 
          near: 0.1, 
          far: 100 
        }}
        dpr={[1.5, 2]}
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
          <ProductsGroup isMobile={isMobile} />
        </Suspense>
      </Canvas>
    </div>
  );
}
