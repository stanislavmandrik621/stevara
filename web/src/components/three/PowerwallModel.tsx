"use client";

import { useRef, useMemo } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { Float, Center } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import * as THREE from "three";

interface PowerwallModelProps {
  scale?: number;
  autoRotate?: boolean;
  variant?: "light" | "dark";
}

export function PowerwallModel({ 
  scale = 1, 
  autoRotate = true,
  variant = "light" 
}: PowerwallModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  
  // Load the OBJ model
  const obj = useLoader(OBJLoader, '/models/powerwall.obj');
  
  // Clone and process the object with correct materials
  const clonedObj = useMemo(() => {
    const clone = obj.clone();
    
    // Calculate bounding box to center and scale the model
    const box = new THREE.Box3().setFromObject(clone);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    
    // Get the largest dimension to normalize scale
    const maxDim = Math.max(size.x, size.y, size.z);
    const normalizeScale = 4 / maxDim;
    
    // Center the model at origin
    clone.position.sub(center);
    clone.scale.setScalar(normalizeScale);
    
    // Dark material for vents, interior, feet
    const darkMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#151515'),
      metalness: 0.2,
      roughness: 0.75,
      side: THREE.FrontSide,
    });
    const ledMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#00ff55'),
      side: THREE.FrontSide,
    });
    ledMaterial.toneMapped = false;
    const logoMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#333333'),
      metalness: 0.1,
      roughness: 0.5,
      side: THREE.FrontSide,
    });
    const switchBodyMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#1a1a1a'),
      metalness: 0.2,
      roughness: 0.6,
      side: THREE.FrontSide,
    });
    const switchIconMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#f5f5f5'),
      metalness: 0.0,
      roughness: 0.4,
      side: THREE.FrontSide,
    });
    // Body material - smooth glossy white (softer highlights)
    const bodyMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#f8f8f8'),
      metalness: 0.0,
      roughness: 0.2,
      clearcoat: 0.3,
      clearcoatRoughness: 0.4,
      reflectivity: 0.4,
      side: THREE.FrontSide,
    });

    const meshes: THREE.Mesh[] = [];
    clone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        meshes.push(child);
      }
    });

    meshes.forEach((child) => {
      const name = child.name;

      if (name === 'Plane001' || name === 'Line001' || name === 'Line002' || 
          name === 'Box002' || name === 'Box003') {
        // Side vents and feet - BLACK
        child.material = darkMaterial;
      } else if (name === 'Tube001') {
        // LED strip - BRIGHT GREEN
        child.material = ledMaterial;
      } else if (name === 'Rectangle002') {
        // TESLA logo - DARK GRAY
        child.material = logoMaterial;
      } else if (name === 'Box001') {
        // Switch body - BLACK
        child.material = switchBodyMaterial;
      } else if (name === 'Box004') {
        // Switch icons - WHITE
        child.material = switchIconMaterial;
      } else {
        // Body panels - white front, dark back via shader
        child.material = bodyMaterial;
      }

      child.castShadow = true;
      child.receiveShadow = true;
    });
    
    return clone;
  }, [obj]);

  useFrame((state) => {
    if (!groupRef.current) return;
    
    if (autoRotate) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.25) * 0.08;
    }
  });

  return (
    <Float
      speed={1.0}
      rotationIntensity={0.05}
      floatIntensity={0.1}
    >
      <group
        ref={groupRef}
        scale={scale}
      >
        <group rotation={[0, -Math.PI / 2 - 0.8, 0]}>
          <Center>
            <primitive object={clonedObj} />
          </Center>
        </group>

        <ambientLight intensity={1.8} />
        <directionalLight position={[5, 6, 8]} intensity={0.8} />
        <directionalLight position={[-5, 4, 6]} intensity={0.6} />
        <directionalLight position={[0, 0, 10]} intensity={0.5} />
        <directionalLight position={[0, 8, 0]} intensity={0.4} />
        <pointLight position={[4, 2, 5]} color="#ffffff" intensity={0.4} distance={15} />
        <pointLight position={[-4, 2, 5]} color="#ffffff" intensity={0.4} distance={15} />
      </group>
    </Float>
  );
}
