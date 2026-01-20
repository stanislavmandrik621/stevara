"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface EnergyParticlesProps {
  count?: number;
  color?: string;
  size?: number;
  speed?: number;
}

export function EnergyParticles({
  count = 500,
  color = "#00d4ff",
  size = 0.02,
  speed = 0.3,
}: EnergyParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, velocities] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Spherical distribution
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 3 + Math.random() * 2;

      positions[i3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = r * Math.cos(phi);

      // Random velocities
      velocities[i3] = (Math.random() - 0.5) * speed;
      velocities[i3 + 1] = (Math.random() - 0.5) * speed;
      velocities[i3 + 2] = (Math.random() - 0.5) * speed;
    }

    return [positions, velocities];
  }, [count, speed]);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const positions = pointsRef.current.geometry.attributes.position
      .array as Float32Array;
    const time = state.clock.elapsedTime;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Orbital motion with noise
      positions[i3] += velocities[i3] * 0.01 + Math.sin(time + i) * 0.001;
      positions[i3 + 1] += velocities[i3 + 1] * 0.01 + Math.cos(time + i) * 0.001;
      positions[i3 + 2] += velocities[i3 + 2] * 0.01;

      // Contain within bounds
      const distance = Math.sqrt(
        positions[i3] ** 2 + positions[i3 + 1] ** 2 + positions[i3 + 2] ** 2
      );

      if (distance > 6 || distance < 2) {
        positions[i3] *= 0.99;
        positions[i3 + 1] *= 0.99;
        positions[i3 + 2] *= 0.99;
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.rotation.y = time * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={size}
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
