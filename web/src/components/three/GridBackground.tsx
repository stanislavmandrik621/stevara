"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function GridBackground() {
  const gridRef = useRef<THREE.GridHelper>(null);

  useFrame((state) => {
    if (!gridRef.current) return;
    gridRef.current.position.z = (state.clock.elapsedTime * 0.5) % 1;
  });

  return (
    <group position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <gridHelper
        ref={gridRef}
        args={[30, 30, "#00d4ff", "#00d4ff"]}
      />
      <mesh rotation={[0, 0, 0]}>
        <planeGeometry args={[30, 30]} />
        <meshBasicMaterial
          color="#000000"
          transparent
          opacity={0.9}
        />
      </mesh>
    </group>
  );
}
